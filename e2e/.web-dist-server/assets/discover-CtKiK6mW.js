import { v as keepPreviousData } from "./removable-CZPO7fS3.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api } from "./Button-6CizQUWS.js";
//#region src/api/discover.ts
/**
* Taxonomy / discovery / certification directory / backlog client (wave 3).
* Shapes mirror the C# records in src/Mastemy.Api/Modules/Taxonomy/TaxonomyDtos.cs and
* Modules/Catalog/CatalogQueryService.cs (enums are serialized as strings).
*/
var CERT_STATES = [
	"ResearchCandidate",
	"Verified",
	"InProduction",
	"PublishedPreparation",
	"InformationOnly",
	"Retired"
];
/** States that require the verification checks (and make an entry publicly visible when fresh). */
var VERIFIED_STATES = [
	"Verified",
	"InProduction",
	"PublishedPreparation",
	"InformationOnly"
];
var CERT_KINDS = [
	"Examination",
	"Qualification",
	"CompletionAward",
	"ProfessionalCertification"
];
var COLLECTION_KINDS = ["Editorial", "Topic"];
var IDEA_STATES = [
	"Idea",
	"Validating",
	"Approved",
	"InProduction",
	"Published",
	"Rejected"
];
/** Allowed backlog transitions (mirrors BacklogService; the server stays the authority). */
var IDEA_TRANSITIONS = {
	Idea: ["Validating", "Rejected"],
	Validating: [
		"Idea",
		"Approved",
		"Rejected"
	],
	Approved: [
		"Validating",
		"InProduction",
		"Rejected"
	],
	InProduction: [
		"Approved",
		"Published",
		"Rejected"
	],
	Rejected: ["Idea"],
	Published: []
};
var DURATIONS = [
	"short",
	"medium",
	"long",
	"extended"
];
var FRESHNESS_DAYS = [
	30,
	90,
	180,
	365
];
var MIN_RATINGS = [
	"3",
	"3.5",
	"4",
	"4.5"
];
var SORTS = [
	"newest",
	"updated",
	"title"
];
/** Every URL parameter the catalogue understands, in the order it is written back to the URL. */
var SEARCH_PARAMS = [
	"q",
	"category",
	"level",
	"language",
	"sort",
	"instructor",
	"duration",
	"updatedWithinDays",
	"minPrice",
	"maxPrice",
	"minRating",
	"skill",
	"certification",
	"page"
];
var NUMERIC = /^\d+(\.\d+)?$/;
/**
* Reads and normalizes the catalogue query from URL parameters. Invalid values are dropped so a hand-edited
* URL cannot produce a 400 from the server; the server still validates everything it receives.
*/
function readCatalogQuery(params, fixedCategory) {
	const out = {};
	for (const k of SEARCH_PARAMS) {
		const v = params.get(k)?.trim();
		if (v) out[k] = v;
	}
	if (fixedCategory) out.category = fixedCategory;
	if (out.sort && !SORTS.includes(out.sort)) delete out.sort;
	if (out.duration && !DURATIONS.includes(out.duration)) delete out.duration;
	if (out.updatedWithinDays) {
		const n = Number(out.updatedWithinDays);
		if (!Number.isInteger(n) || n < 1 || n > 3650) delete out.updatedWithinDays;
	}
	for (const k of ["minPrice", "maxPrice"]) if (out[k] && !NUMERIC.test(out[k])) delete out[k];
	if (out.minRating) {
		const n = Number(out.minRating);
		if (!NUMERIC.test(out.minRating) || n < 1 || n > 5) delete out.minRating;
	}
	if (out.page) {
		const n = Number(out.page);
		if (!Number.isInteger(n) || n < 1) delete out.page;
	}
	if (out.page === "1") delete out.page;
	return out;
}
/** Returns new URL parameters with one filter changed; any filter change resets paging. */
function withFilter(params, key, value) {
	const next = new URLSearchParams(params);
	if (value) next.set(key, value);
	else next.delete(key);
	if (key !== "page") next.delete("page");
	return next;
}
/** Number of active filters other than free text, sort and paging (for the "clear filters" control). */
function activeFilterCount(q, fixedCategory) {
	return SEARCH_PARAMS.filter((k) => k !== "q" && k !== "sort" && k !== "page" && !(k === "category" && fixedCategory) && !!q[k]).length;
}
var dkeys = {
	home: ["discover", "home"],
	skills: ["discover", "skills"],
	certifications: (p) => [
		"discover",
		"certifications",
		p
	],
	certification: (slug) => [
		"discover-detail",
		"certification",
		slug
	],
	pathways: (level) => [
		"discover",
		"pathways",
		level ?? ""
	],
	pathway: (slug) => [
		"discover-detail",
		"pathway",
		slug
	],
	collection: (slug) => [
		"discover-detail",
		"collection",
		slug
	],
	academy: (slug) => [
		"discover-detail",
		"academy",
		slug
	],
	instructors: (p) => [
		"discover",
		"instructors",
		p
	],
	search: (q) => [
		"courses",
		"search",
		q
	],
	suggestions: (q) => [
		"discover",
		"suggestions",
		q
	]
};
/** Missing lists are treated as empty so a partial response never breaks the page. */
function normalizeHome(h) {
	return {
		featured: h.featured ?? [],
		new: h.new ?? [],
		recentlyUpdated: h.recentlyUpdated ?? [],
		aiSkills: h.aiSkills ?? [],
		certificationPreparation: h.certificationPreparation ?? [],
		beginnerPathways: h.beginnerPathways ?? [],
		bestselling: h.bestselling ?? [],
		bestsellerRule: h.bestsellerRule ?? ""
	};
}
function useHome() {
	return useQuery({
		queryKey: dkeys.home,
		queryFn: () => api("/api/home"),
		select: normalizeHome
	});
}
function usePublicSkills() {
	return useQuery({
		queryKey: dkeys.skills,
		queryFn: () => api("/api/skills"),
		staleTime: 3e5
	});
}
function usePublicCertifications(p = {}) {
	return useQuery({
		queryKey: dkeys.certifications(p),
		queryFn: () => api(`/api/certifications${qs(p)}`),
		placeholderData: keepPreviousData
	});
}
function useCertification(slug) {
	return useQuery({
		queryKey: dkeys.certification(slug),
		queryFn: () => api(`/api/certifications/${encodeURIComponent(slug)}`)
	});
}
function usePathways(level, enabled = true) {
	return useQuery({
		queryKey: dkeys.pathways(level),
		queryFn: () => api(`/api/pathways${qs({ level })}`),
		enabled
	});
}
function usePathway(slug) {
	return useQuery({
		queryKey: dkeys.pathway(slug),
		queryFn: () => api(`/api/pathways/${encodeURIComponent(slug)}`)
	});
}
function useCollection(slug) {
	return useQuery({
		queryKey: dkeys.collection(slug),
		queryFn: () => api(`/api/collections/${encodeURIComponent(slug)}`)
	});
}
function useAcademy(slug) {
	return useQuery({
		queryKey: dkeys.academy(slug),
		queryFn: () => api(`/api/academies/${encodeURIComponent(slug)}`)
	});
}
function useInstructors(p) {
	return useQuery({
		queryKey: dkeys.instructors(p),
		queryFn: () => api(`/api/instructors${qs(p)}`),
		placeholderData: keepPreviousData
	});
}
function useCatalogSearch(q) {
	return useQuery({
		queryKey: dkeys.search(q),
		queryFn: () => api(`/api/courses${qs(q)}`),
		placeholderData: keepPreviousData
	});
}
function useSuggestions(q) {
	const term = q.trim();
	return useQuery({
		queryKey: dkeys.suggestions(term),
		queryFn: ({ signal }) => api(`/api/search/suggestions${qs({ q: term })}`, { signal }),
		enabled: term.length >= 2,
		staleTime: 6e4
	});
}
/** Where a suggestion leads: courses open directly, skills and certifications filter the catalogue. */
function suggestionHref(s) {
	if (s.kind === "course") return `/courses/${encodeURIComponent(s.key)}`;
	if (s.kind === "certification") return `/certifications/${encodeURIComponent(s.key)}`;
	return `/courses?skill=${encodeURIComponent(s.key)}`;
}
/** Localized title for the bilingual taxonomy records (Arabic falls back to English when empty). */
function loc(lang, en, ar) {
	return lang === "ar" && ar ? ar : en;
}
//#endregion
export { usePathways as C, withFilter as D, useSuggestions as E, usePathway as S, usePublicSkills as T, useCatalogSearch as _, FRESHNESS_DAYS as a, useHome as b, MIN_RATINGS as c, activeFilterCount as d, dkeys as f, useAcademy as g, suggestionHref as h, DURATIONS as i, SORTS as l, readCatalogQuery as m, CERT_STATES as n, IDEA_STATES as o, loc as p, COLLECTION_KINDS as r, IDEA_TRANSITIONS as s, CERT_KINDS as t, VERIFIED_STATES as u, useCertification as v, usePublicCertifications as w, useInstructors as x, useCollection as y };

//# sourceMappingURL=discover-CtKiK6mW.js.map