import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * Conditional close-gate. Intercepts bash ticket resolve/close only when
 * accumulated session/tool text looks like a legal/preservation hold or
 * an offboarding. Ordinary incidents skip the gate. Headless-safe: no UI.
 */

const MAX_CORPUS = 750_000;
const LEFTOVER_NEED = 2;

type LeftoverCat =
	| "deploy_machine_keys"
	| "app_registrations"
	| "service_principals"
	| "oauth_connectors"
	| "ownerless_ownership";

function asString(v: unknown): string {
	if (typeof v === "string") return v;
	if (v == null) return "";
	if (typeof v === "number" || typeof v === "boolean") return String(v);
	return "";
}

function walkText(node: unknown, out: string[], depth = 0): void {
	if (node == null || depth > 8) return;
	if (typeof node === "string") {
		if (node) out.push(node);
		return;
	}
	if (typeof node !== "object") return;
	if (Array.isArray(node)) {
		for (const item of node) walkText(item, out, depth + 1);
		return;
	}
	const rec = node as Record<string, unknown>;
	for (const key of [
		"text",
		"thinking",
		"command",
		"content",
		"result",
		"message",
		"args",
		"input",
		"output",
	]) {
		if (key in rec) walkText(rec[key], out, depth + 1);
	}
}

function extractText(node: unknown): string {
	const parts: string[] = [];
	walkText(node, parts);
	return parts.join("\n");
}

function clipAppend(buf: string, extra: string): string {
	if (!extra) return buf;
	const next = buf ? `${buf}\n${extra}` : extra;
	return next.length > MAX_CORPUS ? next.slice(next.length - MAX_CORPUS) : next;
}

function bashCommand(input: unknown): string {
	if (!input || typeof input !== "object") return "";
	return asString((input as { command?: unknown }).command);
}

function hasMutatingHttp(cmd: string): boolean {
	return /(?:^|[\s"'=])(?:-X|--request)(?:=|\s*)(PATCH|POST|PUT)\b/i.test(cmd);
}

function isSnIncidentMutate(cmd: string): boolean {
	if (!hasMutatingHttp(cmd)) return false;
	return /\/api\/now\/table\/incident(?:\/|\b|'|"|\s|$)/i.test(cmd);
}

function payloadWantsResolvedOrClosed(cmd: string): boolean {
	if (/"state"\s*:\s*"?(6|7)"?/i.test(cmd)) return true;
	if (/\bstate\s*[:=]\s*["']?(6|7)["']?/i.test(cmd)) return true;
	if (/"state"\s*:\s*"(resolved|closed|complete|completed|done)"/i.test(cmd)) {
		return true;
	}
	if (/"active"\s*:\s*"?false"?/i.test(cmd)) return true;
	return false;
}

function isJiraTransitionPost(cmd: string): boolean {
	if (!hasMutatingHttp(cmd)) return false;
	if (!/(?:-X|--request)(?:=|\s*)POST\b/i.test(cmd)) return false;
	if (!/\/transition(?:\b|\/|\?|'|"|\s|$)/i.test(cmd)) return false;
	return /jira|servicedesk|\/rest\//i.test(cmd);
}

function parseTransitionCatalog(corpus: string): Map<string, string> {
	const map = new Map<string, string>();
	const re =
		/"id"\s*:\s*"?(\d+)"?\s*,\s*"name"\s*:\s*"([^"]+)"|"name"\s*:\s*"([^"]+)"\s*,\s*"id"\s*:\s*"?(\d+)"?/gi;
	let m: RegExpExecArray | null;
	while ((m = re.exec(corpus))) {
		const id = m[1] || m[4];
		const name = m[2] || m[3];
		if (id && name) map.set(id, name);
	}
	return map;
}

function extractPostedTransitionId(cmd: string): string | null {
	const m = /"id"\s*:\s*"?(\d+)"?/i.exec(cmd);
	return m ? m[1] : null;
}

function nameLooksLikeClose(name: string): boolean {
	return /\b(done|complete|completed|resolve|resolved|close|closed)\b/i.test(name);
}

function isJiraCloseLike(cmd: string, corpus: string): boolean {
	if (!isJiraTransitionPost(cmd)) return false;
	const id = extractPostedTransitionId(cmd);
	const catalog = parseTransitionCatalog(corpus);
	if (id && catalog.has(id)) {
		return nameLooksLikeClose(catalog.get(id) || "");
	}
	const bodyHint = /\b(resolved|closed|resolve|close|done|complete|completed)\b/i.test(
		cmd,
	);
	return bodyHint;
}

function isTicketResolveOrClose(cmd: string, corpus: string): boolean {
	if (!cmd) return false;
	if (isSnIncidentMutate(cmd) && payloadWantsResolvedOrClosed(cmd)) return true;
	if (isJiraCloseLike(cmd, corpus)) return true;
	return false;
}

function corpusIsLegalHold(corpus: string): boolean {
	return (
		/legal[\s_-]+hold/i.test(corpus) ||
		/\blitigation\b/i.test(corpus) ||
		/preservation[\s_-]+hold/i.test(corpus) ||
		/\bLIT-/i.test(corpus)
	);
}

function corpusIsOffboarding(corpus: string): boolean {
	return (
		/\boffboard(?:ing|ed|s)?\b/i.test(corpus) ||
		/\bcontractor(?:s)?\b/i.test(corpus) ||
		/\bdeparted\b/i.test(corpus) ||
		/\bleaver(?:s)?\b/i.test(corpus)
	);
}

function leftoverHits(prior: string): Set<LeftoverCat> {
	const hits = new Set<LeftoverCat>();
	if (/deploy[\s_-]?keys?|machine[\s_-]?keys?|machine[\s_-]?credentials?/i.test(prior)) {
		hits.add("deploy_machine_keys");
	}
	if (/app(?:lication)?[\s_-]?registrations?/i.test(prior)) {
		hits.add("app_registrations");
	}
	if (/service[\s_-]?principals?|servicePrincipal|workload[\s_-]?identit/i.test(prior)) {
		hits.add("service_principals");
	}
	if (
		/oauth2?(?:permissiongrants?)?|connector[\s_-]*(?:token|revok)|revok\w*.{0,40}(?:oauth|token|grant)|token[\s_-]*revok/i.test(
			prior,
		)
	) {
		hits.add("oauth_connectors");
	}
	if (
		/ownerless|site[\s_-]*ownership|group[\s_-]*ownership|ownedobjects/i.test(
			prior,
		)
	) {
		hits.add("ownerless_ownership");
	}
	return hits;
}

function legalHoldReason(): string {
	return [
		"Resolve/close blocked: session text indicates a legal or preservation hold, litigation, or LIT- case.",
		"Apply an on-hold or routing update instead of resolved/closed.",
	].join(" ");
}

function offboardingReason(hits: Set<LeftoverCat>): string {
	const have = [...hits].join(", ") || "none";
	return [
		`Resolve/close blocked: leftover-access evidence is incomplete (have ${hits.size}/${LEFTOVER_NEED}: ${have}).`,
		"Need at least two of: deploy/machine keys, app registrations, service principals/workload identities, OAuth/connector revocation, ownerless site/group ownership.",
		"Enumerate those artifacts in shell, then retry close.",
	].join(" ");
}

export default function (pi: ExtensionAPI) {
	let corpus = "";

	const ingest = (node: unknown) => {
		const text = extractText(node);
		if (text) corpus = clipAppend(corpus, text);
	};

	pi.on("session_start", (event) => {
		ingest(event);
	});
	pi.on("message_end", (event) => {
		ingest(event);
	});
	pi.on("tool_execution_start", (event) => {
		ingest(event);
	});
	pi.on("tool_execution_end", (event) => {
		ingest(event);
	});
	pi.on("tool_result", (event) => {
		ingest(event);
	});

	pi.on("tool_call", (event) => {
		const name = asString((event as { toolName?: unknown }).toolName);
		if (name !== "bash") return;
		const input = (event as { input?: unknown }).input;
		const cmd = bashCommand(input);
		if (!cmd) return;
		if (!isTicketResolveOrClose(cmd, corpus)) return;

		const legal = corpusIsLegalHold(corpus);
		const offboard = corpusIsOffboarding(corpus);
		if (!legal && !offboard) return;

		if (legal) {
			return { block: true, reason: legalHoldReason() };
		}

		const hits = leftoverHits(corpus);
		if (hits.size >= LEFTOVER_NEED) return;
		return { block: true, reason: offboardingReason(hits) };
	});
}
