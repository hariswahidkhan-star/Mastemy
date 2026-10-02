import { _ as require_react, b as __toESM } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api } from "./Button-6CizQUWS.js";
import { y as wsKeys } from "./common-BCMvJ35x.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
//#region src/lib/analytics.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** Reads the first-party consent cookie set by the API (`analytics` | `necessary`), or null when absent. */
function readConsentCookie(cookie) {
	for (const part of cookie.split(";")) {
		const [k, ...v] = part.trim().split("=");
		if (k === "mastemy_consent") return decodeURIComponent(v.join("=")).includes("analytics") ? "analytics" : "necessary";
	}
	return null;
}
/**
* Server render only: whether the request carried the consent cookie (the SSR server reads the Cookie
* header). Lets the banner be part of the server HTML for first-time visitors, so it is painted with the
* page instead of appearing late (it would otherwise become the page's Largest Contentful Paint).
*/
var ConsentCookieContext = (0, import_react.createContext)(null);
/** Whether a consent choice is recorded in the cookie: from the request on the server, else document.cookie. */
function useConsentCookieDecided() {
	const server = (0, import_react.useContext)(ConsentCookieContext);
	if (typeof document === "undefined") return server ?? true;
	return readConsentCookie(document.cookie) !== null;
}
/** Consent as the server sees it. Nothing is tracked until `ready && analytics`. */
function useConsent() {
	const { user } = useAuth();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const q = useQuery({
		queryKey: [...wsKeys.consent, user?.id ?? "anon"],
		queryFn: () => api("/api/analytics/consent"),
		enabled: mounted,
		staleTime: 6e5,
		retry: false
	});
	if (!mounted || !q.data) return {
		ready: false,
		decided: true,
		analytics: false
	};
	const cookie = typeof document !== "undefined" ? readConsentCookie(document.cookie) : null;
	return {
		ready: true,
		decided: q.data.source === "account" || cookie !== null,
		analytics: q.data.analytics
	};
}
function useSetConsent() {
	const qc = useQueryClient();
	return async (analytics) => {
		const dto = await api("/api/analytics/consent", {
			method: "PUT",
			body: { analytics }
		});
		await qc.invalidateQueries({ queryKey: wsKeys.consent });
		return dto;
	};
}
/** Sends one event; never throws (telemetry must not affect the page). Callers check consent first. */
function sendEvent(type, courseId, lessonId) {
	api("/api/analytics/events", {
		method: "POST",
		body: { events: [{
			type,
			courseId,
			lessonId,
			ts: (/* @__PURE__ */ new Date()).toISOString()
		}] },
		keepalive: true
	}).catch(() => void 0);
}
/** Records `type` once per (course, lesson) mount, only after the user consented to analytics. */
function useTrackEvent(type, courseId, lessonId) {
	const consent = useConsent();
	const allowed = consent.ready && consent.analytics;
	(0, import_react.useEffect)(() => {
		if (!allowed || !courseId) return;
		sendEvent(type, courseId, lessonId);
	}, [
		allowed,
		type,
		courseId,
		lessonId
	]);
}
/** Returns a function that records an event only when consented (e.g. checkout_start on click). */
function useEventSender() {
	const consent = useConsent();
	return (type, courseId, lessonId) => {
		if (consent.ready && consent.analytics) sendEvent(type, courseId, lessonId);
	};
}
//#endregion
export { useSetConsent as a, useEventSender as i, useConsent as n, useTrackEvent as o, useConsentCookieDecided as r, ConsentCookieContext as t };

//# sourceMappingURL=analytics-Bl_3puqd.js.map