import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as require_react_dom } from "./react-dom-D4zceewu.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { a as apiFetch, c as getAccessToken, i as api, o as apiUrl, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { l as errorMessage, n as Notice } from "./misc-Bqc6tFVU.js";
//#region src/api/workspace.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = require_react_dom();
/**
* Wave 3 "workspace" API surface: authoring productivity, consent-based analytics, study tools, trust & safety,
* operations and AI assistance. Field names mirror the C# records in src/Mastemy.Api/Modules/{Authoring,Analytics,
* StudyTools,Trust,Operations,Ai} (camelCase JSON, enums as strings).
*/
var wsKeys = {
	notes: (lessonId) => [
		"ws",
		"notes",
		lessonId
	],
	revisions: (lessonId) => [
		"ws",
		"revisions",
		lessonId
	],
	history: (courseId) => [
		"ws",
		"history",
		courseId
	],
	checklist: (courseId) => [
		"ws",
		"checklist",
		courseId
	],
	translations: (courseId) => [
		"ws",
		"translations",
		courseId
	],
	templates: ["ws", "templates"],
	agreement: ["ws", "agreement"],
	consent: ["ws", "consent"],
	courseAnalytics: (id, range) => [
		"ws",
		"analytics",
		id,
		range
	],
	questionStats: (id) => [
		"ws",
		"qstats",
		id
	],
	adminDashboard: (range) => [
		"ws",
		"adminDashboard",
		range
	],
	studyPlan: ["ws", "studyPlan"],
	folders: ["ws", "folders"],
	bookmarks: (lessonId) => [
		"ws",
		"bookmarks",
		lessonId ?? "all"
	],
	continueLearning: ["ws", "continue"],
	complaints: (status, page) => [
		"ws",
		"complaints",
		status,
		page
	],
	holds: (all) => [
		"ws",
		"holds",
		all
	],
	suspensions: (all) => [
		"ws",
		"suspensions",
		all
	],
	appeals: (status, page) => [
		"ws",
		"appeals",
		status,
		page
	],
	myAppeals: ["ws", "myAppeals"],
	brokenLinks: ["ws", "brokenLinks"],
	overdue: (months) => [
		"ws",
		"overdue",
		months
	],
	health: ["ws", "health"],
	aiStatus: ["ws", "aiStatus"],
	aiUsageMe: ["ws", "aiUsageMe"],
	conversations: (courseId) => [
		"ws",
		"conversations",
		courseId
	],
	conversation: (id) => [
		"ws",
		"conversation",
		id
	],
	aiAdminUsage: (period) => [
		"ws",
		"aiAdminUsage",
		period
	]
};
/** PUT notes with If-Match; returns the lesson and the new ETag from the response header. */
async function saveNotes(lessonId, etag, body) {
	const res = await apiFetch(`/api/studio/lessons/${lessonId}/notes`, {
		method: "PUT",
		body,
		headers: { "If-Match": etag }
	});
	const lesson = await res.json();
	return {
		lesson,
		etag: res.headers.get("ETag") ?? `"n${lesson.notesVersion}"`
	};
}
async function restoreRevision(lessonId, revision, etag) {
	const res = await apiFetch(`/api/studio/lessons/${lessonId}/revisions/${revision}/restore`, {
		method: "POST",
		headers: { "If-Match": etag }
	});
	const lesson = await res.json();
	return {
		lesson,
		etag: res.headers.get("ETag") ?? `"n${lesson.notesVersion}"`
	};
}
/**
* GET notes. The JSON field is `eTag` (camelCased `ETag`); the `ETag` response header is the authority, so the
* view model exposes it as `etag`.
*/
async function getNotes(lessonId) {
	const res = await apiFetch(`/api/studio/lessons/${lessonId}/notes`);
	const body = await res.json();
	return {
		...body,
		etag: res.headers.get("ETag") ?? body.eTag ?? `"n${body.notesVersion}"`
	};
}
var duplicateModule = (id) => api(`/api/studio/modules/${id}/duplicate`, { method: "POST" });
var duplicateLesson = (id) => api(`/api/studio/lessons/${id}/duplicate`, { method: "POST" });
var bulkLessons = (moduleId, titles) => api(`/api/studio/modules/${moduleId}/lessons/bulk`, {
	method: "POST",
	body: { titles }
});
/** Splits a pasted list into lesson titles: one per line, list markers and numbering stripped, max 200 chars. */
function parseLessonList(text) {
	return text.split(/\r?\n/).map((l) => l.replace(/^\s*(?:[-*•]|\d+[.)])\s+/, "").trim().slice(0, 200)).filter((l) => l.length > 0);
}
var WEEK_DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday"
];
/** Groups plan items into calendar days (UTC date of `scheduledAt`), preserving order. */
function groupByDay(items) {
	const out = [];
	for (const it of items) {
		const day = it.scheduledAt.slice(0, 10);
		const last = out[out.length - 1];
		if (last && last.day === day) last.items.push(it);
		else out.push({
			day,
			items: [it]
		});
	}
	return out;
}
var COMPLAINT_TYPES = [
	"Copyright",
	"Rights",
	"Abuse",
	"Privacy",
	"Other"
];
/** /health/ready answers 503 with the same JSON body when Unhealthy; read the body either way. */
async function fetchHealth() {
	const token = getAccessToken();
	const res = await fetch(apiUrl("/health/ready"), { headers: {
		Accept: "application/json",
		...token ? { Authorization: `Bearer ${token}` } : {}
	} });
	if (res.status !== 200 && res.status !== 503) throw new ApiError(res.status, null, res.statusText);
	return await res.json();
}
/** Pulls the first GUID out of a pasted link or id. */
function extractGuid(text) {
	const m = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.exec(text);
	return m ? m[0].toLowerCase() : null;
}
var ASSIST_KINDS = [
	"Outline",
	"VideoScript",
	"LessonNotes",
	"CaptionCleanup",
	"Metadata"
];
//#endregion
//#region src/pages/workspace/common.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Problem codes that get a dedicated, translated explanation (the rest fall back to the server's title). */
var KNOWN_CODES = [
	"editor_scope",
	"instructor_suspended",
	"precondition_failed",
	"agreement_required",
	"agreement_version_mismatch",
	"ai_not_configured",
	"ai_unavailable",
	"ai_rate_limited",
	"ai_budget_exhausted",
	"ai_refused",
	"ai_invalid_output",
	"exam_in_progress",
	"not_enrolled",
	"content_unavailable",
	"consent_required",
	"translation_language_taken",
	"rate_limited",
	"appeal_pending",
	"appeal_already_decided",
	"not_hidden",
	"complaint_closed",
	"hold_released",
	"video_not_broken",
	"not_linked"
];
function wsError(error, t) {
	if (error instanceof ApiError) {
		for (const code of KNOWN_CODES) if (error.is(code)) return t(`workspace.errors.${code}`);
		if (error.status === 451) return t("workspace.errors.content_unavailable");
	}
	return errorMessage(error, t);
}
function WsError({ error }) {
	const { t } = useI18n();
	if (!error) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "danger",
		children: wsError(error, t)
	});
}
/** GET /api/ai/status (signed-in only). */
function useAiStatus() {
	const { user } = useAuth();
	return useQuery({
		queryKey: [...wsKeys.aiStatus, user?.id ?? "anon"],
		queryFn: () => api("/api/ai/status"),
		enabled: !!user,
		staleTime: 3e5,
		retry: false
	});
}
/**
* Renders `children` only when AI is configured; otherwise a clear note instead of any entry point
* (no dead buttons). While loading it renders nothing.
*/
function AiGate({ children }) {
	const { t } = useI18n();
	const status = useAiStatus();
	if (status.isPending) return null;
	if (status.isError || !status.data?.configured) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "info",
		title: t("workspace.ai.notEnabledTitle"),
		children: t("workspace.ai.notEnabled")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/** Side drawer (modal): focus moves in, Escape closes, focus returns to the opener. */
function Drawer({ open, title, onClose, children }) {
	const { t } = useI18n();
	const id = (0, import_react.useId)();
	const ref = (0, import_react.useRef)(null);
	const closeRef = (0, import_react.useRef)(onClose);
	(0, import_react.useEffect)(() => {
		closeRef.current = onClose;
	});
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.activeElement;
		ref.current?.focus();
		const onKey = (e) => {
			if (e.key === "Escape") closeRef.current();
		};
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("keydown", onKey);
			prev?.focus?.();
		};
	}, [open]);
	if (!open) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ws-drawer-backdrop",
		onMouseDown: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ws-drawer",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": id,
		ref,
		tabIndex: -1,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ws-drawer__head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id,
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: onClose,
				"aria-label": t("common.close"),
				children: "✕"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ws-drawer__body",
			children
		})]
	})] }), document.body);
}
function fmtDateTime(iso, lang) {
	if (!iso) return "";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	return new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en", {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(d);
}
//#endregion
export { restoreRevision as _, wsError as a, WEEK_DAYS as c, duplicateModule as d, extractGuid as f, parseLessonList as g, groupByDay as h, fmtDateTime as i, bulkLessons as l, getNotes as m, Drawer as n, ASSIST_KINDS as o, fetchHealth as p, WsError as r, COMPLAINT_TYPES as s, AiGate as t, duplicateLesson as u, saveNotes as v, wsKeys as y };

//# sourceMappingURL=common-BCMvJ35x.js.map