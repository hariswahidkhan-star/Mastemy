import { i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { f as qs, i as api, r as ApiError } from "./Button-6CizQUWS.js";
import { l as errorMessage, n as Notice } from "./misc-Bqc6tFVU.js";
//#region src/api/finala.ts
/**
* Final-wave learner/staff features (area "finala"): messaging, completion awards and sharing, self-graded
* review, support console, MFA reset, pickers, calendar subscription. Field names mirror the C# records in
* src/Mastemy.Api/Modules (MessagingService.cs, CompletionAwards.cs, MfaResetAndSupport.cs, OrderBrowserService.cs,
* PracticeService.cs, RegradeAndAnalytics.cs, AccommodationService.cs, StudyPlanService.cs, AnalyticsReports.cs).
*/
/** Messaging:MaxBodyLength default (server is the authority; it rejects longer bodies). */
var MESSAGE_MAX = 2e3;
var AUTO_MESSAGE_MAX = 5e3;
var REPORT_MAX = 2e3;
/** Client-side validation mirroring TextRules.PlainText: 1..max chars, no HTML markup. */
function validateMessageBody(body, max = MESSAGE_MAX) {
	const trimmed = body.trim();
	if (!trimmed) return "empty";
	if (trimmed.length > max) return "tooLong";
	if (/<\/?[a-z][^>]*>/i.test(trimmed)) return "html";
	return null;
}
var msgKeys = {
	conversations: ["finala", "conversations"],
	conversation: (id) => [
		"finala",
		"conversation",
		id
	],
	blocks: ["finala", "blocks"],
	reports: (includeHidden) => [
		"finala",
		"msg-reports",
		includeHidden
	],
	autoMessages: (courseId) => [
		"finala",
		"auto-messages",
		courseId
	],
	completionAward: (courseId) => [
		"finala",
		"completion-award",
		courseId
	],
	calendarToken: ["finala", "calendar-token"]
};
var messagingApi = {
	conversations: () => api("/api/messages/conversations"),
	conversation: (id, before) => api(`/api/messages/conversations/${id}${qs({
		before,
		limit: 50
	})}`),
	reply: (id, body) => api(`/api/messages/conversations/${id}/messages`, {
		method: "POST",
		body: { body }
	}),
	toInstructors: (courseId, body) => api(`/api/courses/${courseId}/messages`, {
		method: "POST",
		body: { body }
	}),
	toLearner: (courseId, learnerId, body) => api(`/api/studio/courses/${courseId}/learners/${learnerId}/messages`, {
		method: "POST",
		body: { body }
	}),
	report: (messageId, reason) => api(`/api/messages/${messageId}/report`, {
		method: "POST",
		body: { reason }
	}),
	blocks: () => api("/api/messages/blocks"),
	block: (userId) => api("/api/messages/blocks", {
		method: "POST",
		body: { userId }
	}),
	unblock: (userId) => api(`/api/messages/blocks/${userId}`, { method: "DELETE" }),
	reports: (includeHidden) => api(`/api/moderation/messages/reports${qs({ includeHidden })}`),
	hide: (messageId, reason) => api(`/api/moderation/messages/${messageId}/hide`, {
		method: "POST",
		body: { reason }
	}),
	unhide: (messageId) => api(`/api/moderation/messages/${messageId}/unhide`, { method: "POST" }),
	autoMessages: (courseId) => api(`/api/studio/courses/${courseId}/auto-messages`),
	setAutoMessage: (courseId, kind, body, enabled) => api(`/api/studio/courses/${courseId}/auto-messages/${kind}`, {
		method: "PUT",
		body: {
			body,
			enabled
		}
	})
};
var awardsApi = {
	setting: (courseId) => api(`/api/studio/courses/${courseId}/completion-award`),
	setSetting: (courseId, enabled) => api(`/api/studio/courses/${courseId}/completion-award`, {
		method: "PUT",
		body: { enabled }
	}),
	claim: (courseId) => api(`/api/me/courses/${courseId}/completion-award`, { method: "POST" }),
	share: (id) => api(`/api/me/certificates/${id}/share`)
};
/** Only LinkedIn's own add-to-profile endpoint is opened from the share button. */
function isLinkedInAddUrl(url) {
	try {
		const u = new URL(url);
		return u.protocol === "https:" && u.hostname === "www.linkedin.com" && u.pathname === "/profile/add";
	} catch {
		return false;
	}
}
var SELF_GRADES = [
	0,
	1,
	2,
	3,
	4,
	5
];
var practiceApi = {
	selfGrade: (sessionId, itemId, quality) => api(`/api/practice/sessions/${sessionId}/items/${itemId}/self-grade`, {
		method: "POST",
		body: { quality }
	}),
	bookmarkPracticeItem: (sessionId, itemId) => api(`/api/practice/sessions/${sessionId}/items/${itemId}/bookmark`, { method: "PUT" }),
	bookmarkAttemptItem: (attemptId, itemId) => api(`/api/attempts/${attemptId}/items/${itemId}/bookmark`, { method: "PUT" })
};
var supportApi = {
	lookup: (q) => api(`/api/support/users/lookup${qs({
		q,
		limit: 25
	})}`),
	user: (id) => api(`/api/support/users/${id}`),
	resend: (id) => api(`/api/support/users/${id}/email-verification/resend`, { method: "POST" }),
	orders: (p) => api(`/api/support/orders${qs(p)}`),
	mfaReset: (id, reason) => api(`/api/admin/users/${id}/mfa/reset`, {
		method: "POST",
		body: { reason },
		noRetry: true
	})
};
var calendarApi = {
	status: () => api("/api/me/study-plan/calendar-token"),
	create: () => api("/api/me/study-plan/calendar-token", { method: "POST" }),
	revoke: () => api("/api/me/study-plan/calendar-token", { method: "DELETE" })
};
//#endregion
//#region src/pages/finala/shared.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Problem `type` codes this area explains in its own words (finala.errors.<code>). */
var KNOWN = [
	"messaging_blocked",
	"rate_limited",
	"html_not_allowed",
	"already_reported",
	"invalid_report",
	"invalid_block",
	"fresh_mfa_required",
	"cannot_reset_own_mfa",
	"mfa_not_enabled",
	"invalid_reason",
	"completion_awards_disabled",
	"not_enrolled",
	"course_not_completed",
	"certificate_not_public",
	"verify_url_not_configured",
	"certificate_revoked",
	"not_checked",
	"already_graded",
	"premium_required",
	"attempt_in_progress",
	"regrade_decided",
	"no_study_plan",
	"invalid_state",
	"use_confirm"
];
function finalaError(error, t) {
	if (error instanceof ApiError) {
		const code = KNOWN.find((c) => error.is(c));
		if (code) return t(`finala.errors.${code}`);
		if (error.status === 410) return t("finala.errors.certificate_revoked");
	}
	return errorMessage(error, t);
}
function FinalaError({ error }) {
	const { t } = useI18n();
	if (!error) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "danger",
		children: finalaError(error, t)
	});
}
//#endregion
export { REPORT_MAX as a, calendarApi as c, msgKeys as d, practiceApi as f, MESSAGE_MAX as i, isLinkedInAddUrl as l, validateMessageBody as m, finalaError as n, SELF_GRADES as o, supportApi as p, AUTO_MESSAGE_MAX as r, awardsApi as s, FinalaError as t, messagingApi as u };

//# sourceMappingURL=shared-CFDEeOyq.js.map