import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";

const MAX_LINES = 220;
const FETCH_MS = 8_000;

type ScanParams = {
	identities?: string[];
};

function asString(v: unknown): string {
	if (typeof v === "string") return v;
	if (typeof v === "number" || typeof v === "boolean") return String(v);
	return "";
}

function asRecord(v: unknown): Record<string, unknown> | null {
	return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

function asList(v: unknown, ...keys: string[]): unknown[] {
	if (Array.isArray(v)) return v;
	const rec = asRecord(v);
	if (!rec) return [];
	for (const key of [...keys, "value", "values", "items", "result", "results", "keys", "repositories"]) {
		if (Array.isArray(rec[key])) return rec[key] as unknown[];
	}
	return [];
}

function allowedUrl(raw: string): URL | null {
	try {
		const u = new URL(raw);
		if (u.protocol !== "http:" && u.protocol !== "https:") return null;
		if (u.port !== "8080") return null;
		if (!u.hostname.endsWith(".local.mock")) return null;
		if (u.hostname === "search.local.mock") return null;
		return u;
	} catch {
		return null;
	}
}

async function getJson(url: string, signal?: AbortSignal): Promise<unknown | null> {
	const parsed = allowedUrl(url);
	if (!parsed) return null;
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), FETCH_MS);
	const onAbort = () => ctrl.abort();
	if (signal) {
		if (signal.aborted) {
			clearTimeout(timer);
			return null;
		}
		signal.addEventListener("abort", onAbort, { once: true });
	}
	try {
		const res = await fetch(parsed.toString(), {
			method: "GET",
			headers: { Accept: "application/json" },
			signal: ctrl.signal,
		});
		if (!res.ok) return null;
		const text = await res.text();
		if (!text) return [];
		return JSON.parse(text);
	} catch {
		return null;
	} finally {
		clearTimeout(timer);
		if (signal) signal.removeEventListener("abort", onAbort);
	}
}

async function paged(url: string, signal?: AbortSignal): Promise<unknown[]> {
	const out: unknown[] = [];
	const seen = new Set<string>();
	let next: string | null = url;
	while (next && !seen.has(next) && seen.size < 25) {
		seen.add(next);
		const obj = await getJson(next, signal);
		if (obj == null) break;
		out.push(...asList(obj));
		const rec = asRecord(obj);
		const link = rec ? asString(rec["@odata.nextLink"] || rec.nextLink) : "";
		next = link && allowedUrl(link) ? link : null;
	}
	return out;
}

function blobOf(v: unknown): string {
	const rec = asRecord(v);
	if (!rec) return asString(v).trim();
	const parts = [
		rec.id,
		rec.appId,
		rec.displayName,
		rec.name,
		rec.title,
		rec.userPrincipalName,
		rec.mail,
		rec.email,
		rec.primaryEmail,
		rec.userKey,
		rec.login,
		rec.full_name,
		rec.clientId,
		rec.displayText,
	].map((x) => asString(x).trim());
	const name = asRecord(rec.name);
	if (name) {
		parts.push(asString(name.fullName).trim(), asString(name.givenName).trim(), asString(name.familyName).trim());
	}
	return parts.filter(Boolean).join(" ");
}

function ownerBlobs(owners: unknown): string[] {
	const out: string[] = [];
	for (const o of asList(owners)) {
		if (typeof o === "string" || typeof o === "number") {
			out.push(asString(o).trim());
			continue;
		}
		const rec = asRecord(o);
		if (!rec) continue;
		out.push(blobOf(rec), blobOf(rec.user), blobOf(rec.grantedToV2), blobOf(asRecord(rec.grantedToV2)?.user));
	}
	return out.filter(Boolean);
}

function credCount(rec: Record<string, unknown> | null): number {
	if (!rec) return 0;
	return asList(rec.passwordCredentials).length + asList(rec.keyCredentials).length;
}

function enabledFlag(rec: Record<string, unknown> | null): string {
	if (!rec) return "unknown";
	if (!("accountEnabled" in rec) || rec.accountEnabled == null) return "unset";
	return rec.accountEnabled === false ? "disabled" : "enabled";
}

function userOfPerm(perm: unknown): Record<string, unknown> | null {
	const rec = asRecord(perm);
	if (!rec) return null;
	const g2 = asRecord(rec.grantedToV2) || asRecord(rec.grantedTo);
	if (g2) {
		const user = asRecord(g2.user);
		if (user) return user;
	}
	return null;
}

function userKeys(user: unknown): string[] {
	const rec = asRecord(user);
	if (!rec) return [];
	const keys = [
		asString(rec.id),
		asString(rec.userPrincipalName),
		asString(rec.mail),
		asString(rec.email),
		asString(rec.primaryEmail),
		asString(rec.userKey),
	].filter(Boolean);
	const emails = asList(rec.emails);
	for (const e of emails) {
		if (typeof e === "string") keys.push(e);
		else keys.push(asString(asRecord(e)?.address));
	}
	return [...new Set(keys.filter(Boolean))];
}

async function scanGithub(signal?: AbortSignal): Promise<string[]> {
	const lines: string[] = [];
	const repos = await paged("http://github.local.mock:8080/repositories", signal);
	if (!repos.length) return lines;
	for (const repo of repos) {
		const rec = asRecord(repo);
		if (!rec) continue;
		const full = asString(rec.full_name);
		let owner = "";
		let name = asString(rec.name);
		const ownerRec = asRecord(rec.owner);
		if (ownerRec) owner = asString(ownerRec.login);
		if (full.includes("/")) {
			const [o, n] = full.split("/", 2);
			owner = owner || o;
			name = name || n;
		}
		if (!owner || !name) continue;
		const keys = await paged(`http://github.local.mock:8080/repos/${owner}/${name}/keys`, signal);
		for (const key of keys) {
			const k = asRecord(key);
			if (!k) continue;
			const title = asString(k.title);
			const id = asString(k.id);
			const verified = k.verified === true ? "verified" : "unverified";
			const ro = k.read_only === true ? "read-only" : "read-write";
			lines.push(
				`github-deploy-key id=${id || "?"} repo=${full || `${owner}/${name}`} title=${title || "?"} ${verified} ${ro} | next remove /repos/${owner}/${name}/keys/${id || "{id}"}`,
			);
		}
	}
	return lines;
}

async function scanDirectoryArtifacts(signal?: AbortSignal): Promise<string[]> {
	const lines: string[] = [];
	const bases = [
		{ host: "http://microsoft-365.local.mock:8080/v1.0", kind: "application", path: "applications" },
		{ host: "http://microsoft-365.local.mock:8080/v1.0", kind: "servicePrincipal", path: "servicePrincipals" },
		{ host: "http://entra-id.local.mock:8080/v1.0", kind: "application", path: "applications" },
		{ host: "http://entra-id.local.mock:8080/v1.0", kind: "servicePrincipal", path: "servicePrincipals" },
	];
	const seen = new Set<string>();
	for (const b of bases) {
		const rows = await paged(`${b.host}/${b.path}`, signal);
		for (const row of rows) {
			const rec = asRecord(row);
			if (!rec) continue;
			const id = asString(rec.id);
			const dedupe = `${b.kind}:${id}`;
			if (id && seen.has(dedupe)) continue;
			if (id) seen.add(dedupe);
			let owners = ownerBlobs(rec.owners);
			if (!owners.length && id) {
				const extra = await paged(`${b.host}/${b.path}/${id}/owners`, signal);
				owners = ownerBlobs(extra);
			}
			const creds = credCount(rec);
			const en = enabledFlag(rec);
			const label = asString(rec.displayName) || asString(rec.appId) || id || "?";
			const ownerTxt = owners.length ? owners.slice(0, 6).join(",") : "none";
			const next =
				en === "enabled"
					? `next disable /v1.0/${b.path}/${id || "{id}"}`
					: `next remove /v1.0/${b.path}/${id || "{id}"}`;
			lines.push(
				`${b.kind} id=${id || "?"} name=${label} enabled=${en} creds=${creds} owners=${ownerTxt} | ${next}`,
			);
		}
	}
	return lines;
}

async function listDirectoryUsers(signal?: AbortSignal): Promise<unknown[]> {
	const a = await paged("http://entra-id.local.mock:8080/v1.0/users", signal);
	const b = await paged("http://google-workspace.local.mock:8080/admin/directory/v1/users", signal);
	return [...a, ...b];
}

async function scanOauthTokens(signal?: AbortSignal): Promise<string[]> {
	const lines: string[] = [];
	const users = await listDirectoryUsers(signal);
	const seenUser = new Set<string>();
	for (const user of users) {
		for (const key of userKeys(user)) {
			const enc = encodeURIComponent(key);
			if (seenUser.has(enc)) continue;
			seenUser.add(enc);
			const tokenUrls = [
				`http://google-workspace.local.mock:8080/admin/directory/v1/users/${enc}/tokens`,
				`http://entra-id.local.mock:8080/v1.0/users/${enc}/oauth2PermissionGrants`,
				`http://microsoft-365.local.mock:8080/v1.0/users/${enc}/oauth2PermissionGrants`,
			];
			for (const url of tokenUrls) {
				const rows = await paged(url, signal);
				for (const row of rows) {
					const rec = asRecord(row);
					if (!rec) continue;
					const client = asString(rec.clientId) || asString(rec.clientAppId) || asString(rec.id) || "?";
					const label = asString(rec.displayText) || asString(rec.displayName) || client;
					const scopes =
						asList(rec.scopes).map(asString).filter(Boolean).slice(0, 4).join(",") || asString(rec.scope);
					lines.push(
						`oauth-token user=${key} client=${client} name=${label} scopes=${scopes || "n/a"} | next remove /admin/directory/v1/users/${key}/tokens/${client}`,
					);
				}
			}
		}
	}
	const grantUrls = [
		"http://microsoft-365.local.mock:8080/v1.0/oauth2PermissionGrants",
		"http://entra-id.local.mock:8080/v1.0/oauth2PermissionGrants",
	];
	for (const url of grantUrls) {
		const rows = await paged(url, signal);
		for (const row of rows) {
			const rec = asRecord(row);
			if (!rec) continue;
			const id = asString(rec.id) || "?";
			lines.push(
				`oauth2-grant id=${id} principal=${asString(rec.principalId) || "?"} client=${asString(rec.clientId) || "?"} scope=${asString(rec.scope) || "n/a"} | next remove /v1.0/oauth2PermissionGrants/${id}`,
			);
		}
	}
	return lines;
}

async function scanOwnerless(signal?: AbortSignal): Promise<string[]> {
	const lines: string[] = [];
	const sites = await paged("http://sharepoint.local.mock:8080/v1.0/sites", signal);
	for (const site of sites) {
		const rec = asRecord(site);
		if (!rec) continue;
		const sid = asString(rec.id);
		if (!sid) continue;
		const perms = await paged(`http://sharepoint.local.mock:8080/v1.0/sites/${sid}/permissions`, signal);
		const owners = perms.filter((p) => {
			const roles = asList(asRecord(p)?.roles)
				.map(asString)
				.map((r) => r.toLowerCase());
			return roles.includes("owner");
		});
		const ownerUsers = owners.map(userOfPerm).filter(Boolean) as Record<string, unknown>[];
		if (!ownerUsers.length) continue;
		const names = ownerUsers.map((u) => asString(u.id) || asString(u.displayName) || asString(u.email)).join(",");
		lines.push(
			`site-ownership site=${sid} name=${asString(rec.displayName) || asString(rec.name) || "?"} owners=${names || "none"} ownerless-if-removed=yes | next assign-owner /v1.0/sites/${sid}/permissions then remove departed owner grant`,
		);
	}
	const groups = await paged("http://entra-id.local.mock:8080/v1.0/groups", signal);
	for (const group of groups) {
		const rec = asRecord(group);
		if (!rec) continue;
		const gid = asString(rec.id);
		if (!gid) continue;
		let owners = asList(rec.owners);
		if (!owners.length) {
			owners = await paged(`http://entra-id.local.mock:8080/v1.0/groups/${gid}/owners`, signal);
		}
		if (!owners.length) continue;
		const blobs = ownerBlobs(owners);
		lines.push(
			`group-ownership group=${gid} name=${asString(rec.displayName) || "?"} owners=${blobs.slice(0, 6).join(",") || "none"} ownerless-if-removed=yes | next assign-owner /v1.0/groups/${gid}/owners then remove departed owner`,
		);
	}
	return lines;
}

function render(scope: string[], sections: Array<[string, string[]]>): string {
	const out: string[] = ["leftover_scan (read-only; no mutations performed)"];
	if (scope.length) {
		out.push(`caller-scope identities: ${scope.join(", ")}`);
	}
	let used = out.length;
	let total = 0;
	for (const [title, rows] of sections) {
		total += rows.length;
		out.push(`${title}: ${rows.length}`);
		used += 1;
		for (const row of rows) {
			if (used >= MAX_LINES) {
				out.push("...truncated");
				used += 1;
				break;
			}
			out.push(`- ${row}`);
			used += 1;
		}
		if (used >= MAX_LINES) break;
	}
	if (total === 0) {
		out.push("none listed (host down or empty catalog)");
	}
	out.push("Remediate listed artifacts with bash/curl if they belong to identities in scope.");
	return out.join("\n");
}

export default function (pi: ExtensionAPI) {
	pi.registerTool({
		name: "leftover_scan",
		label: "Leftover scan",
		description:
			"Read-only unfiltered enumeration of leftover machine credentials and non-human access on *.local.mock:8080: GitHub repo deploy keys, directory applications, service principals, OAuth/connector tokens, and optional ownerless site/group ownership. Call leftover_scan when disabling, suspending, or offboarding identities, or when leftover machine credentials may remain. Optional identities are recorded as caller scope only and do not hide catalog rows. After the listing, remediate relevant items with normal bash/curl. This tool never mutates state.",
		promptSnippet: "leftover_scan: read-only unfiltered list of leftover deploy keys, apps, principals, and OAuth tokens.",
		promptGuidelines:
			"Use leftover_scan to list leftover machine credentials after an identity is disabled, suspended, or offboarded, then remediate listed items with bash/curl. leftover_scan is read-only and does not filter catalog categories.",
		parameters: Type.Object({
			identities: Type.Optional(
				Type.Array(
					Type.String({
						description: "Optional emails, usernames, display names, or directory ids echoed as caller scope only.",
					}),
				),
			),
		}),
		async execute(_toolCallId, params: ScanParams, signal) {
			const scope = (params?.identities || []).map((s) => asString(s).trim()).filter(Boolean);
			const [keys, apps, tokens, ownership] = await Promise.all([
				scanGithub(signal),
				scanDirectoryArtifacts(signal),
				scanOauthTokens(signal),
				scanOwnerless(signal),
			]);
			const text = render(scope, [
				["GitHub deploy keys", keys],
				["Directory applications / service principals", apps],
				["OAuth / connector tokens", tokens],
				["Ownerless site / group ownership", ownership],
			]);
			return {
				content: [{ type: "text" as const, text }],
				details: { count: keys.length + apps.length + tokens.length + ownership.length, scope },
			};
		},
	});
}
