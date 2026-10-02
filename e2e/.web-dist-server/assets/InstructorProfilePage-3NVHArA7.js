import { h as useParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { a as orNull, n as accountKeys, t as accountApi } from "./account-CkAe5QCo.js";
import { t as CourseCard } from "./CourseCard-D-k-mQGl.js";
//#region src/pages/account/InstructorProfilePage.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Public instructor page: merges the taxonomy directory entry (`/api/instructors/{id}`: live courses,
* ratings) with the account profile (`/api/instructors/{id}/profile`: headline, bio, links). Either may be
* missing (no live course yet / profile not published); both missing means not found.
*/
function InstructorProfilePage() {
	const { id = "" } = useParams();
	const { t, fmtNumber } = useI18n();
	const q = useQuery({
		queryKey: accountKeys.instructor(id),
		queryFn: async () => {
			const [directory, profile] = await Promise.all([orNull(accountApi.instructorDirectory(id)), orNull(accountApi.instructorProfile(id))]);
			return {
				directory,
				profile
			};
		},
		enabled: !!id
	});
	const name = q.data?.profile?.displayName ?? q.data?.directory?.displayName;
	usePageMeta(name ?? t("account.instructor.title"), q.data?.profile?.headline || void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: q,
			children: ({ directory, profile }) => {
				if (!directory && !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("account.instructor.notFound"),
					description: t("account.instructor.notFoundBody"),
					action: {
						label: t("nav.courses"),
						to: "/courses"
					}
				});
				const initials = profile?.initials ?? (name ?? "").split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "stack",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "row",
							style: {
								alignItems: "center",
								flexWrap: "wrap"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								style: {
									inlineSize: 72,
									blockSize: 72,
									borderRadius: "50%",
									display: "grid",
									placeItems: "center",
									fontWeight: 700,
									fontSize: "1.5rem",
									background: "var(--color-accent-soft, var(--color-surface-2, #e8eefc))"
								},
								children: initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "page-title",
									children: name
								}),
								profile?.headline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "page-subtitle",
									children: profile.headline
								}) : null,
								directory ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "small muted",
									style: { margin: 0 },
									children: [t("account.instructor.liveCourses", { n: directory.liveCourseCount }), directory.ratingAverage != null && directory.ratingCount > 0 ? ` · ${t("account.instructor.rating", {
										avg: fmtNumber(Math.round(directory.ratingAverage * 10) / 10),
										n: directory.ratingCount
									})}` : ""]
								}) : null
							] })]
						}),
						profile?.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section__title",
								children: t("account.instructor.about")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pre-wrap",
								children: profile.bio
							})]
						}) : null,
						profile && profile.links.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section__title",
								children: t("account.instructor.links")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: profile.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: l.url,
								target: "_blank",
								rel: "noopener noreferrer nofollow ugc",
								children: l.label
							}) }, l.url)) })]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section__title",
								children: t("account.instructor.courses")
							}), directory && directory.courses.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid",
								children: directory.courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c }, c.id))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "muted",
								children: t("account.instructor.noCourses")
							})]
						})
					]
				});
			}
		})
	});
}
//#endregion
export { InstructorProfilePage };

//# sourceMappingURL=InstructorProfilePage-3NVHArA7.js.map