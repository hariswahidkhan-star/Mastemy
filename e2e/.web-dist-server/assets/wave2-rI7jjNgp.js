import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { c as getAccessToken, f as qs, i as api, o as apiUrl, p as refreshSession, r as ApiError } from "./Button-6CizQUWS.js";
//#region src/api/wave2.ts
/**
* Wave 2 API surface: discovery, discussions, announcements, notifications, issues, resources and captions,
* certificates (PDF/visibility), published snapshots and diffs, YouTube publishing extras and enterprise
* workspaces. Field names mirror the C# DTOs in src/Mastemy.Api/Modules/** (camelCase JSON).
*/
var NOTIFICATION_KINDS = [
	"announcement",
	"reply",
	"review_reply",
	"course_updated",
	"certificate",
	"issue_reported"
];
var ISSUE_CATEGORIES = [
	"VideoUnavailable",
	"ContentError",
	"QuestionError",
	"Other"
];
var ORG_ROLES = [
	"Member",
	"Manager",
	"Admin"
];
var w2keys = {
	wishlist: ["me", "wishlist"],
	recent: ["me", "recently-viewed"],
	compare: (ids) => ["compare", ids],
	related: (courseId) => ["related", courseId],
	discussions: (courseId, params) => [
		"discussions",
		courseId,
		params
	],
	discussionsAll: (courseId) => ["discussions", courseId],
	thread: (id) => ["discussion", id],
	announcements: (courseId) => ["announcements", courseId],
	notifications: ["me", "notifications"],
	notificationPrefs: ["me", "notification-preferences"],
	issues: (courseId) => [
		"studio",
		"issues",
		courseId
	],
	studioResources: (courseId) => [
		"studio",
		"resources",
		courseId
	],
	resourceUsage: (courseId) => [
		"studio",
		"resources",
		courseId,
		"usage"
	],
	lessonResources: (lessonId) => [
		"learn",
		"resources",
		lessonId
	],
	captions: (lessonId) => [
		"learn",
		"captions",
		lessonId
	],
	myCertificates: ["me", "certificates"],
	publishedPreview: (courseId) => [
		"studio",
		"published-preview",
		courseId
	],
	diff: (courseId) => [
		"review",
		"diff",
		courseId
	],
	channelsInfo: [
		"youtube",
		"channels",
		"info"
	],
	adminOrgs: ["admin", "orgs"],
	org: (id) => ["orgs", id],
	orgMembers: (id) => [
		"orgs",
		id,
		"members"
	],
	orgAssignments: (id) => [
		"orgs",
		id,
		"assignments"
	],
	orgReport: (id) => [
		"orgs",
		id,
		"report"
	],
	orgInvitations: (id) => [
		"orgs",
		id,
		"invitations"
	],
	myOrgs: ["me", "organizations"]
};
function useWishlist(enabled = true) {
	return useQuery({
		queryKey: w2keys.wishlist,
		queryFn: () => api("/api/me/wishlist"),
		enabled
	});
}
function useRecentlyViewed() {
	return useQuery({
		queryKey: w2keys.recent,
		queryFn: () => api("/api/me/recently-viewed")
	});
}
function useRelated(courseId) {
	return useQuery({
		queryKey: w2keys.related(courseId),
		queryFn: () => api(`/api/courses/${courseId}/related`)
	});
}
function useCompare(ids) {
	return useQuery({
		queryKey: w2keys.compare(ids),
		queryFn: () => api(`/api/courses/compare${qs({ ids: ids.join(",") })}`),
		enabled: ids.length >= 2 && ids.length <= 4
	});
}
function useNotifications(page = 1, pageSize = 20, unreadOnly = false) {
	return useQuery({
		queryKey: [...w2keys.notifications, {
			page,
			pageSize,
			unreadOnly
		}],
		queryFn: () => api(`/api/me/notifications${qs({
			page,
			pageSize,
			unreadOnly
		})}`)
	});
}
function useMyCertificates() {
	return useQuery({
		queryKey: w2keys.myCertificates,
		queryFn: () => api("/api/me/certificates")
	});
}
function useChannelInfo(enabled = true) {
	return useQuery({
		queryKey: w2keys.channelsInfo,
		queryFn: () => api("/api/youtube/channels"),
		enabled
	});
}
function useMyOrgs() {
	return useQuery({
		queryKey: w2keys.myOrgs,
		queryFn: () => api("/api/me/organizations")
	});
}
function parseProblem(status, statusText, text) {
	let problem = null;
	try {
		if (text) {
			const p = JSON.parse(text);
			problem = {
				status: p.status ?? status,
				title: p.title ?? statusText,
				type: p.type ?? "",
				detail: p.detail
			};
		}
	} catch {}
	return new ApiError(status, problem, statusText || `HTTP ${status}`);
}
function sendOnce(method, path, form, onProgress) {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, apiUrl(path));
		xhr.setRequestHeader("Accept", "application/json");
		const token = getAccessToken();
		if (token) xhr.setRequestHeader("Authorization", `Bearer ${token}`);
		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable && onProgress) onProgress(e.loaded / e.total);
		};
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				let result;
				try {
					result = xhr.responseText ? JSON.parse(xhr.responseText) : void 0;
				} catch {
					result = void 0;
				}
				resolve({
					status: xhr.status,
					result
				});
			} else resolve({
				status: xhr.status,
				error: parseProblem(xhr.status, xhr.statusText, xhr.responseText)
			});
		};
		xhr.onerror = () => resolve({
			status: 0,
			error: new ApiError(0, null, "Network error")
		});
		xhr.send(form);
	});
}
/** Sends one multipart part named `file`, reporting upload progress (0..1). Retries once after a token refresh. */
async function uploadFile(path, file, opts = {}) {
	const form = () => {
		const f = new FormData();
		f.append("file", file, file.name);
		return f;
	};
	const method = opts.method ?? "POST";
	let res = await sendOnce(method, path, form(), opts.onProgress);
	if (res.status === 401 && await refreshSession()) res = await sendOnce(method, path, form(), opts.onProgress);
	if (res.error) throw res.error;
	return res.result;
}
function formatBytes(n, locale = "en") {
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	let v = n;
	let i = 0;
	while (v >= 1024 && i < units.length - 1) {
		v /= 1024;
		i++;
	}
	return `${new Intl.NumberFormat(locale, { maximumFractionDigits: i === 0 ? 0 : 1 }).format(v)} ${units[i]}`;
}
//#endregion
export { uploadFile as a, useMyCertificates as c, useRecentlyViewed as d, useRelated as f, formatBytes as i, useMyOrgs as l, w2keys as m, NOTIFICATION_KINDS as n, useChannelInfo as o, useWishlist as p, ORG_ROLES as r, useCompare as s, ISSUE_CATEGORIES as t, useNotifications as u };

//# sourceMappingURL=wave2-rI7jjNgp.js.map