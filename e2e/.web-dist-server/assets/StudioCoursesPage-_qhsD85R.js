import { a as Link, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, n as ButtonLink } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, r as PageHeader, s as StatusBadge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { f as useStudioCourses } from "./hooks-D70iOwvH.js";
//#region src/pages/studio/StudioCoursesPage.tsx
var import_jsx_runtime = require_jsx_runtime();
function StudioCoursesPage() {
	const { t, fmtDate } = useI18n();
	const courses = useStudioCourses();
	usePageMeta(t("studio.courses"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("studio.courses"),
		subtitle: t("studio.coursesSubtitle"),
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
			to: "/studio/new",
			children: t("studio.newCourse")
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: courses,
		children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: t("studio.noCourses"),
			description: t("studio.noCoursesBody"),
			action: {
				label: t("studio.newCourse"),
				to: "/studio/new"
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "table-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("studio.courseTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("dashboard.status")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("studio.modules")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("studio.updated")
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/studio/courses/${c.id}`,
						children: c.title
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.modules?.length ?? 0 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(c.updatedAt) })
				] }, c.id)) })]
			})
		})
	})] });
}
function EarningsPage() {
	const { t, fmtDate, fmtMoney } = useI18n();
	usePageMeta(t("studio.earnings"), void 0, { noindex: true });
	const earnings = useQuery({
		queryKey: ["studio", "earnings"],
		queryFn: () => api("/api/studio/earnings")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("studio.earnings"),
		subtitle: t("studio.earningsSubtitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: earnings,
		children: (e) => {
			const totals = Array.isArray(e.totals) ? e.totals : [];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [totals.map((tot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "facts",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("earnings.gross") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtMoney(tot.grossSales, tot.currency) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("earnings.instructor") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtMoney(tot.instructorAmount, tot.currency) })] })]
				}, tot.currency)), e.entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("earnings.none"),
					description: t("earnings.noneBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("dashboard.date")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("studio.courseTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("earnings.kind")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("earnings.gross")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("earnings.instructor")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("earnings.platform")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: e.entries.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(x.createdAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: x.courseTitle ?? x.courseId }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t(`earnings.kind_${x.kind}`) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(x.grossAmount, x.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(x.instructorAmount, x.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(x.platformAmount, x.currency) })
						] }, x.id)) })]
					})
				})]
			});
		}
	})] });
}
//#endregion
export { EarningsPage, StudioCoursesPage };

//# sourceMappingURL=StudioCoursesPage-_qhsD85R.js.map