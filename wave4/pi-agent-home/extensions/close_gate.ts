import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * Record-only close-gate. Intercepts bash ticket resolve/close only when
 * prior tool results contain record-like hold evidence. Catalog search
 * hits and OAuth scope names are ignored. Headless-safe: no UI.
 */

const MAX_CORPUS = 750_000;

function asString(v: unknown): string {
	if (typeof v === "string") return v;
	if (v == null) return "";
	if (typeof v === "number" || typeof v === "boolean") return String(v);
	return "";
}

function clipAppend(buf: string, extra: string): string {
	if (!extra) return buf;
	const next = buf ? `${buf}\n${extra}` : extra;
	return next.length > MAX_CORPUS ? next.slice(next.length - MAX_CORPUS) : next;
}

function bashCommandFrom(node: unknown): string {
	if (!node || typeof node !== "object") return "";
	const rec = node as Record<string, unknown>;
	const direct = asString(rec.command);
	if (direct) return direct;
	if (rec.args && typeof rec.args === "object") {
		return asString((rec.args as { command?: unknown }).command);
	}
	if (rec.input && typeof rec.input === "object") {
		return asString((rec.input as { command?: unknown }).command);
	}
	return "";
}

function resultText(node: unknown): string {
	if (node == null) return "";
	if (typeof node === "string") return node;
	if (typeof node !== "object") return "";
	const rec = node as Record<string, unknown>;
	const parts: string[] = [];
	const walk = (v: unknown, depth: number) => {
		if (v == null || depth > 8) return;
		if (typeof v === "string") {
			if (v) parts.push(v);
			return;
		}
		if (typeof v !== "object") return;
		if (Array.isArray(v)) {
			for (const item of v) walk(item, depth + 1);
			return;
		}
		const o = v as Record<string, unknown>;
		for (const key of ["text", "content", "result", "output", "message"]) {
			if (key in o) walk(o[key], depth + 1);
		}
	};
	if ("result" in rec) walk(rec.result, 0);
	else walk(rec, 0);
	return parts.join("\n");
}

function isSearchMockCommand(cmd: string): boolean {
	return /search\.local\.mock/i.test(cmd);
}

function isCatalogShaped(text: string): boolean {
	if (!text) return false;
	const hasResults = /"results"\s*:\s*\[/.test(text);
	if (hasResults && /"operationId"\s*:/.test(text) && /"provider"\s*:/.test(text)) {
		return true;
	}
	if (hasResults && /"query"\s*:/.test(text) && /"host"\s*:/.test(text) && /"path"\s*:/.test(text)) {
		return true;
	}
	if (/"oauth-scopes-overview"|oauth-scopes/i.test(text) && /"operationId"\s*:/.test(text)) {
		return true;
	}
	return false;
}

function stripOauthScopeTokens(text: string): string {
	return text.replace(/\b[\w.-]*_legal_hold(?::[\w.-]+)?/gi, "");
}

function hasRecordLikeHold(corpus: string): boolean {
	if (!corpus) return false;
	if (/\bLIT-\d{2,}\b/.test(corpus)) return true;
	if (/litigation\s+hold/i.test(corpus)) return true;
	if (/preservation\s+hold/i.test(corpus)) return true;
	if (/Legal Hold Review/.test(corpus)) return true;
	if (/orgUnitPath[^.\n]{0,80}Legal Hold/i.test(corpus)) return true;
	return false;
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

function isJiraCloseNamed(cmd: string, corpus: string): boolean {
	if (!isJiraTransitionPost(cmd)) return false;
	const id = extractPostedTransitionId(cmd);
	if (!id) return false;
	const catalog = parseTransitionCatalog(corpus);
	const name = catalog.get(id);
	if (!name) return false;
	return nameLooksLikeClose(name);
}

function isTicketResolveOrClose(cmd: string, corpus: string): boolean {
	if (!cmd) return false;
	if (isSnIncidentMutate(cmd) && payloadWantsResolvedOrClosed(cmd)) return true;
	if (isJiraCloseNamed(cmd, corpus)) return true;
	return false;
}

function blockReason(): string {
	return [
		"Resolve/close blocked: record-like hold evidence is present.",
		"Apply an on-hold or routing update instead of resolved/closed.",
	].join(" ");
}

export default function (pi: ExtensionAPI) {
	const commands = new Map<string, string>();
	let corpus = "";

	const rememberCommand = (event: unknown) => {
		const rec = event && typeof event === "object" ? (event as Record<string, unknown>) : {};
		const id = asString(rec.toolCallId);
		const cmd = bashCommandFrom(event);
		if (id && cmd) commands.set(id, cmd);
	};

	const ingestResult = (event: unknown) => {
		const rec = event && typeof event === "object" ? (event as Record<string, unknown>) : {};
		const id = asString(rec.toolCallId);
		const cmd = (id && commands.get(id)) || bashCommandFrom(event);
		if (cmd && isSearchMockCommand(cmd)) return;
		const text = stripOauthScopeTokens(resultText(event));
		if (!text) return;
		if (isCatalogShaped(text)) return;
		corpus = clipAppend(corpus, text);
	};

	pi.on("tool_execution_start", (event) => {
		rememberCommand(event);
	});
	pi.on("tool_execution_end", (event) => {
		rememberCommand(event);
		ingestResult(event);
	});
	pi.on("tool_result", (event) => {
		rememberCommand(event);
		ingestResult(event);
	});

	pi.on("tool_call", (event) => {
		rememberCommand(event);
		const rec = event && typeof event === "object" ? (event as Record<string, unknown>) : {};
		const name = asString(rec.toolName);
		if (name !== "bash") return;
		const cmd = bashCommandFrom(event);
		if (!cmd) return;
		if (!isTicketResolveOrClose(cmd, corpus)) return;
		if (!hasRecordLikeHold(corpus)) return;
		return { block: true, reason: blockReason() };
	});
}
