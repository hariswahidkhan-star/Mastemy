import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { a as apiFetch, f as qs, i as api } from "./Button-6CizQUWS.js";
//#region src/api/exams.ts
/**
* Wave 3 question bank / assessment delivery / practice / regrading / certificates (spec §13–§15, §17).
* Shapes mirror the C# records in src/Mastemy.Api/Modules/Questions and Modules/Assessment
* (docs/api-contract-wave3/questions-assessment.md). Enums are serialized as strings.
*/
var COGNITIVE_LEVELS = [
	"Remember",
	"Understand",
	"Apply",
	"Analyze",
	"Evaluate"
];
var IMAGE_TYPES = [
	"image/png",
	"image/jpeg",
	"image/gif",
	"image/webp"
];
var examKeys = {
	caseGroups: (courseId) => [
		"exams",
		"case-groups",
		courseId
	],
	resources: (courseId) => [
		"exams",
		"resources",
		courseId
	],
	shared: (q, page) => [
		"exams",
		"shared",
		q,
		page
	],
	courseChallenges: (courseId, status) => [
		"exams",
		"course-challenges",
		courseId,
		status
	],
	reviewChallenges: (status) => [
		"exams",
		"review-challenges",
		status
	],
	myChallenges: ["exams", "my-challenges"],
	regrades: (status) => [
		"exams",
		"regrades",
		status
	],
	regrade: (id) => [
		"exams",
		"regrade",
		id
	],
	flags: (status) => [
		"exams",
		"flags",
		status
	],
	analytics: (assessmentId) => [
		"exams",
		"analytics",
		assessmentId
	],
	questionAnalytics: (id) => [
		"exams",
		"question-analytics",
		id
	],
	practiceSessions: ["exams", "practice-sessions"],
	practiceSession: (id) => [
		"exams",
		"practice-session",
		id
	],
	bookmarks: ["exams", "bookmarks"],
	due: ["exams", "due"],
	myAccommodations: ["exams", "my-accommodations"],
	accommodations: (userId, includeRevoked) => [
		"exams",
		"accommodations",
		userId,
		includeRevoked
	],
	policy: (assessmentId) => [
		"exams",
		"policy",
		assessmentId
	],
	templates: (includeArchived) => [
		"exams",
		"templates",
		includeArchived
	],
	courseTemplate: (courseId) => [
		"exams",
		"course-template",
		courseId
	],
	myCorrections: ["exams", "my-corrections"],
	myAppeals: ["exams", "my-appeals"],
	corrections: (status) => [
		"exams",
		"corrections",
		status
	],
	appeals: (status) => [
		"exams",
		"appeals",
		status
	],
	recommendations: (attemptId) => [
		"exams",
		"recommendations",
		attemptId
	]
};
var useCaseGroups = (courseId) => useQuery({
	queryKey: examKeys.caseGroups(courseId),
	queryFn: () => api(`/api/studio/courses/${courseId}/case-groups`),
	enabled: !!courseId
});
var useCourseResources = (courseId) => useQuery({
	queryKey: examKeys.resources(courseId),
	queryFn: () => api(`/api/studio/courses/${courseId}/resources`),
	enabled: !!courseId
});
var useMyAccommodations = (enabled = true) => useQuery({
	queryKey: examKeys.myAccommodations,
	queryFn: () => api("/api/me/accommodations"),
	enabled
});
var useBookmarks = () => useQuery({
	queryKey: examKeys.bookmarks,
	queryFn: () => api("/api/me/question-bookmarks")
});
var useDueReviews = () => useQuery({
	queryKey: examKeys.due,
	queryFn: () => api(`/api/practice/review/due${qs({ limit: 50 })}`)
});
var usePracticeSessions = () => useQuery({
	queryKey: examKeys.practiceSessions,
	queryFn: () => api("/api/practice/sessions")
});
var useMyChallenges = () => useQuery({
	queryKey: examKeys.myChallenges,
	queryFn: () => api("/api/me/question-challenges")
});
var useTemplates = (includeArchived = false, enabled = true) => useQuery({
	queryKey: examKeys.templates(includeArchived),
	queryFn: () => api(`/api/certificate-templates${qs({ includeArchived })}`),
	enabled
});
var useShared = (q, page) => useQuery({
	queryKey: examKeys.shared(q, page),
	queryFn: () => api(`/api/studio/shared-questions${qs({
		q,
		page,
		pageSize: 20
	})}`)
});
/** Multipart POST helper (the shared client sends FormData untouched). */
async function postForm(path, form) {
	const res = await apiFetch(path, {
		method: "POST",
		body: form
	});
	const text = await res.text();
	return {
		status: res.status,
		body: text ? JSON.parse(text) : void 0
	};
}
/** Pretty numeric helpers for analytics. */
function fmtStat(v, digits = 2) {
	return v === null || v === void 0 ? "—" : v.toFixed(digits);
}
//#endregion
export { postForm as a, useCourseResources as c, useMyChallenges as d, usePracticeSessions as f, fmtStat as i, useDueReviews as l, useTemplates as m, IMAGE_TYPES as n, useBookmarks as o, useShared as p, examKeys as r, useCaseGroups as s, COGNITIVE_LEVELS as t, useMyAccommodations as u };

//# sourceMappingURL=exams-ZvNkLj9c.js.map