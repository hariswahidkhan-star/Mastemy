import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api } from "./Button-6CizQUWS.js";
//#region src/api/finalb.ts
/**
* Final wave B client types and helpers. Every shape mirrors a C# record (file noted per block); the
* server stays the authority for prices, permissions and validation.
*/
/**
* Checkout currency choices from `GET /api/commerce/currencies?packageId=`: one entry per currency. A
* country-specific price only applies with a matching country, so a currency offered only regionally is
* listed when the entered country matches (or with its country list when none is entered).
*/
function currencyChoices(rows, country) {
	const c = country.trim().toUpperCase();
	const byCurrency = /* @__PURE__ */ new Map();
	for (const r of rows) {
		const generic = r.countries.length === 0;
		if (!generic && c && !r.countries.includes(c)) continue;
		const prev = byCurrency.get(r.currency);
		if (!prev || !generic && c !== "" && prev.countries.length === 0) byCurrency.set(r.currency, {
			value: r.currency,
			currency: r.currency,
			amount: r.amount,
			countries: r.countries,
			isBase: r.isBase
		});
	}
	return [...byCurrency.values()].sort((a, b) => a.isBase === b.isBase ? a.currency.localeCompare(b.currency) : a.isBase ? -1 : 1);
}
var ORDER_STATUSES = [
	"Pending",
	"Paid",
	"Failed",
	"Refunded",
	"PartiallyRefunded",
	"Cancelled"
];
var EMPTY_ORDER_FILTERS = {
	status: "",
	email: "",
	courseId: "",
	from: "",
	to: "",
	currency: "",
	coupon: "",
	page: 1,
	pageSize: 25
};
/** Filters → `/api/admin/orders` query string. Dates are whole UTC days (`to` is inclusive). */
function orderQuery(f) {
	return qs({
		status: f.status || void 0,
		email: f.email.trim() || void 0,
		courseId: f.courseId.trim() || void 0,
		from: f.from ? `${f.from}T00:00:00Z` : void 0,
		to: f.to ? `${f.to}T23:59:59Z` : void 0,
		currency: f.currency.trim().toUpperCase() || void 0,
		coupon: f.coupon.trim() || void 0,
		page: f.page > 1 ? f.page : void 0,
		pageSize: f.pageSize !== 25 ? f.pageSize : void 0
	});
}
/** Depth-first ordering of the flat list (children after parent, by sort order then English name). */
function categoryTree(list) {
	const kids = /* @__PURE__ */ new Map();
	const ids = new Set(list.map((c) => c.id));
	for (const c of list) {
		const p = c.parentId !== null && ids.has(c.parentId) ? c.parentId : null;
		kids.set(p, [...kids.get(p) ?? [], c]);
	}
	for (const arr of kids.values()) arr.sort((a, b) => a.sortOrder - b.sortOrder || a.nameEn.localeCompare(b.nameEn));
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	const walk = (p, depth) => {
		for (const c of kids.get(p) ?? []) {
			if (seen.has(c.id)) continue;
			seen.add(c.id);
			out.push({
				cat: c,
				depth
			});
			walk(c.id, depth + 1);
		}
	};
	walk(null, 0);
	return out;
}
/** Ids of a category and all its descendants (cannot become its parent). */
function descendantIds(list, id) {
	const out = /* @__PURE__ */ new Set([id]);
	let grew = true;
	while (grew) {
		grew = false;
		for (const c of list) if (c.parentId !== null && out.has(c.parentId) && !out.has(c.id)) {
			out.add(c.id);
			grew = true;
		}
	}
	return out;
}
function depthOf(list, id) {
	let d = 0;
	let cur = id;
	const byId = new Map(list.map((c) => [c.id, c]));
	while (cur !== null && d <= 50) {
		d++;
		cur = byId.get(cur)?.parentId ?? null;
	}
	return d;
}
/** Height of a subtree (1 = leaf). */
function subtreeHeight(list, id) {
	const children = list.filter((c) => c.parentId === id);
	return 1 + Math.max(0, ...children.map((c) => subtreeHeight(list, c.id)));
}
/**
* Client-side mirror of the server's category checks, to explain problems before saving. Returns a map of
* field → error code (same codes the API uses). The server re-validates everything.
*/
function validateCategory(input, list, editingId) {
	const e = {};
	if (!/^[a-z0-9](?:[a-z0-9-]{0,98}[a-z0-9])?$/.test(input.slug)) e.slug = "invalid_slug";
	else if (list.some((c) => c.slug === input.slug && c.id !== editingId)) e.slug = "slug_taken";
	const name = (s) => s.trim().length >= 1 && s.trim().length <= 100 && !/[<>]/.test(s);
	if (!name(input.nameEn)) e.nameEn = "invalid_name";
	if (!name(input.nameAr)) e.nameAr = "invalid_name";
	if (!Number.isInteger(input.sortOrder) || Math.abs(input.sortOrder) > 1e5) e.sortOrder = "invalid_sort_order";
	if (input.parentId !== null) {
		if (!list.some((c) => c.id === input.parentId)) e.parentId = "invalid_parent";
		else if (editingId !== null && descendantIds(list, editingId).has(input.parentId)) e.parentId = "category_cycle";
		else {
			const height = editingId !== null ? subtreeHeight(list, editingId) : 1;
			if (depthOf(list, input.parentId) + height > 4) e.parentId = "category_too_deep";
		}
	}
	return e;
}
/** Mapped ids for one objective, preloaded into the mapping dialog. */
function mappedIds(m, objectiveId, kind) {
	const o = m?.objectives.find((x) => x.objectiveId === objectiveId);
	if (!o) return [];
	return kind === "lessons" ? o.lessonIds : o.questionIds;
}
/** SSO callback / exchange error codes with translated explanations. */
var SSO_ERROR_CODES = [
	"sso_invalid_state",
	"sso_idp_error",
	"sso_invalid_request",
	"sso_token_exchange_failed",
	"sso_invalid_token",
	"sso_email_missing",
	"sso_email_unverified",
	"sso_domain_not_allowed",
	"sso_link_requires_verified_email",
	"sso_privileged_not_allowed",
	"sso_provider_unavailable",
	"sso_not_available",
	"sso_not_configured",
	"seat_limit_reached",
	"invalid_handoff"
];
/** Only same-site relative paths are followed after SSO (no open redirects). */
function safeReturnTo(v) {
	if (!v || !v.startsWith("/") || v.startsWith("//") || v.startsWith("/\\")) return "/me";
	return v;
}
var ORG_SLUG = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;
var fbKeys = {
	currencies: (packageId) => [
		"commerce",
		"currencies",
		packageId
	],
	policy: [
		"studio",
		"commerce",
		"policy"
	],
	adminCategories: ["admin", "categories"],
	orders: (q) => [
		"admin",
		"orders",
		q
	],
	order: (id) => [
		"admin",
		"order",
		id
	],
	mappings: (courseId, certId) => [
		"studio",
		"course",
		courseId,
		"cert",
		certId,
		"mappings"
	],
	certCourses: (id) => [
		"admin",
		"cert",
		id,
		"courses"
	],
	notes: (q, page) => [
		"discover",
		"notes-library",
		q,
		page
	],
	pathwayAssignments: (org) => [
		"orgs",
		org,
		"pathway-assignments"
	],
	materials: (org) => [
		"orgs",
		org,
		"materials"
	],
	seatRequests: (org) => [
		"orgs",
		org,
		"seat-requests"
	],
	orgOrders: (org) => [
		"orgs",
		org,
		"enterprise-orders"
	],
	sso: (org) => [
		"orgs",
		org,
		"sso"
	],
	staffSeatRequests: (status) => [
		"admin",
		"enterprise",
		"seat-requests",
		status
	],
	staffOrders: [
		"admin",
		"enterprise",
		"orders"
	]
};
function useCurrencyOptions(packageId) {
	return useQuery({
		queryKey: fbKeys.currencies(packageId ?? ""),
		queryFn: () => api(`/api/commerce/currencies${qs({ packageId: packageId ?? "" })}`),
		enabled: !!packageId,
		retry: false,
		staleTime: 6e4
	});
}
function useCommercePolicy() {
	return useQuery({
		queryKey: fbKeys.policy,
		queryFn: () => api("/api/studio/commerce/policy"),
		staleTime: 3e5
	});
}
function useAdminCategories() {
	return useQuery({
		queryKey: fbKeys.adminCategories,
		queryFn: () => api("/api/admin/categories")
	});
}
function fmtBytes(n) {
	if (n < 1024) return `${n} B`;
	const u = [
		"KB",
		"MB",
		"GB",
		"TB"
	];
	let v = n / 1024;
	let i = 0;
	while (v >= 1024 && i < u.length - 1) {
		v /= 1024;
		i++;
	}
	return `${v.toFixed(v >= 10 ? 0 : 1)} ${u[i]}`;
}
//#endregion
export { categoryTree as a, fbKeys as c, orderQuery as d, safeReturnTo as f, validateCategory as g, useCurrencyOptions as h, SSO_ERROR_CODES as i, fmtBytes as l, useCommercePolicy as m, ORDER_STATUSES as n, currencyChoices as o, useAdminCategories as p, ORG_SLUG as r, descendantIds as s, EMPTY_ORDER_FILTERS as t, mappedIds as u };

//# sourceMappingURL=finalb-tCQ9cZ9j.js.map