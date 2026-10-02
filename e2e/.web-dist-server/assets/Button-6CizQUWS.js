import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime } from "./I18nProvider-Cc4FX485.js";
//#region src/api/client.ts
var BASE_URL = "".replace(/\/$/, "");
/** Error thrown for any non-2xx response; carries the RFC 7807 problem body when available. */
var ApiError = class extends Error {
	status;
	type;
	problem;
	constructor(status, problem, fallback) {
		super(problem?.title ?? fallback);
		this.name = "ApiError";
		this.status = status;
		this.type = problem?.type ?? "";
		this.problem = problem;
	}
	/** True when the server reported the given problem `type` (matched on the suffix, e.g. "uploads_disabled"). */
	is(code) {
		return this.type === code || this.type.endsWith(`/${code}`) || this.title === code;
	}
	get title() {
		return this.problem?.title ?? "";
	}
};
var LEGACY_REFRESH_KEY = "mastemy.refreshToken";
var SESSION_HINT_KEY = "mastemy.session";
/** Header required by the API for cookie-based refresh/logout (CSRF guard). */
var CSRF_HEADER = { "X-Requested-With": "mastemy" };
var accessToken = null;
var listeners = /* @__PURE__ */ new Set();
function storageGet(key) {
	try {
		return typeof localStorage === "undefined" ? null : localStorage.getItem(key);
	} catch {
		return null;
	}
}
function storageSet(key, value) {
	try {
		if (typeof localStorage === "undefined") return;
		if (value === null) localStorage.removeItem(key);
		else localStorage.setItem(key, value);
	} catch {}
}
/** One-time migration: refresh tokens used to be kept in localStorage. Removes the stored value and returns it
* so the first refresh can exchange it (the server answers by setting the HttpOnly cookie). */
var legacyToken;
function takeLegacyRefreshToken() {
	if (legacyToken === void 0) {
		legacyToken = storageGet(LEGACY_REFRESH_KEY);
		if (legacyToken) storageSet(LEGACY_REFRESH_KEY, null);
	}
	const t = legacyToken;
	legacyToken = null;
	return t;
}
/** Removes any refresh token left in localStorage by older builds (kept in memory for one migration refresh). */
function purgeLegacyRefreshToken() {
	if (legacyToken === void 0) {
		legacyToken = storageGet(LEGACY_REFRESH_KEY);
		if (legacyToken) storageSet(LEGACY_REFRESH_KEY, null);
	}
}
function getAccessToken() {
	return accessToken;
}
/** True when a refresh cookie probably exists (a session was established in this browser and not ended). */
function hasSessionHint() {
	purgeLegacyRefreshToken();
	return !!legacyToken || storageGet(SESSION_HINT_KEY) === "1";
}
function setSession(auth) {
	accessToken = auth?.accessToken ?? null;
	storageSet(SESSION_HINT_KEY, auth?.accessToken && (!auth.status || auth.status === "ok") ? "1" : null);
	listeners.forEach((l) => l(auth));
}
function onSessionChange(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
var refreshInFlight = null;
function refreshSession() {
	if (refreshInFlight) return refreshInFlight;
	if (!hasSessionHint()) return Promise.resolve(false);
	refreshInFlight = (async () => {
		try {
			const legacy = takeLegacyRefreshToken();
			const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
				method: "POST",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					...CSRF_HEADER
				},
				body: legacy ? JSON.stringify({ refreshToken: legacy }) : "{}"
			});
			if (!res.ok) {
				setSession(null);
				return false;
			}
			setSession(await res.json());
			return true;
		} catch {
			return false;
		} finally {
			refreshInFlight = null;
		}
	})();
	return refreshInFlight;
}
/** Revokes the refresh cookie server-side (best effort) and clears the local session. */
async function logoutSession() {
	try {
		await fetch(`${BASE_URL}/api/auth/logout`, {
			method: "POST",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				...CSRF_HEADER
			},
			body: "{}"
		});
	} catch {}
	setSession(null);
}
function buildInit(path, opts) {
	const headers = {
		Accept: "application/json",
		...opts.headers
	};
	let body;
	if (opts.body instanceof FormData || opts.body instanceof Blob) body = opts.body;
	else if (opts.body !== void 0) {
		headers["Content-Type"] = "application/json";
		body = JSON.stringify(opts.body);
	}
	if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
	return {
		method: opts.method ?? (body ? "POST" : "GET"),
		headers,
		body,
		signal: opts.signal,
		keepalive: opts.keepalive,
		...path.startsWith("/api/auth/") ? { credentials: "include" } : {}
	};
}
async function toError(res) {
	let problem = null;
	try {
		const text = await res.text();
		if (text) {
			const parsed = JSON.parse(text);
			problem = {
				status: parsed.status ?? res.status,
				title: parsed.title ?? res.statusText,
				type: parsed.type ?? "",
				detail: parsed.detail,
				errors: parsed.errors
			};
		}
	} catch {}
	return new ApiError(res.status, problem, res.statusText || `HTTP ${res.status}`);
}
async function apiFetch(path, opts = {}) {
	const url = `${BASE_URL}${path}`;
	let res = await fetch(url, buildInit(path, opts));
	if (res.status === 401 && !opts.noRetry && hasSessionHint()) {
		if (await refreshSession()) res = await fetch(url, buildInit(path, opts));
	}
	if (!res.ok) throw await toError(res);
	return res;
}
async function api(path, opts = {}) {
	const res = await apiFetch(path, opts);
	if (res.status === 204) return void 0;
	if ((res.headers.get("content-type") ?? "").includes("json")) return await res.json();
	return await res.text();
}
function apiUrl(path) {
	return `${BASE_URL}${path}`;
}
/** Download an authenticated resource and hand it to the browser as a file. */
async function downloadFile(path, fileName) {
	const blob = await (await apiFetch(path, { headers: { Accept: "*/*" } })).blob();
	const href = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = href;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(href), 1e3);
}
function qs(params) {
	const sp = new URLSearchParams();
	for (const [k, v] of Object.entries(params)) if (v !== void 0 && v !== null && v !== "") sp.set(k, String(v));
	const s = sp.toString();
	return s ? `?${s}` : "";
}
//#endregion
//#region src/components/ui/Button.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function classes(variant, size, extra) {
	return [
		"btn",
		`btn--${variant}`,
		`btn--${size}`,
		extra
	].filter(Boolean).join(" ");
}
var Button = (0, import_react.forwardRef)(function Button({ variant = "primary", size = "md", loading = false, icon, className, children, disabled, type, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		ref,
		type: type ?? "button",
		className: classes(variant, size, className),
		disabled: disabled || loading,
		"aria-busy": loading || void 0,
		...rest,
		children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "spinner spinner--inline",
			"aria-hidden": "true"
		}) : icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
});
function ButtonLink({ to, variant = "primary", size = "md", className, children, external, ...rest }) {
	if (external) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: to,
		className: classes(variant, size, className),
		target: "_blank",
		rel: "noopener noreferrer",
		...rest,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: classes(variant, size, className),
		...rest,
		children
	});
}
//#endregion
export { apiFetch as a, getAccessToken as c, onSessionChange as d, qs as f, api as i, hasSessionHint as l, setSession as m, ButtonLink as n, apiUrl as o, refreshSession as p, ApiError as r, downloadFile as s, Button as t, logoutSession as u };

//# sourceMappingURL=Button-6CizQUWS.js.map