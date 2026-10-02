import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, i as Pagination, r as PageHeader } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { o as useCourses } from "./hooks-D70iOwvH.js";
import { t as CourseCard } from "./CourseCard-D-k-mQGl.js";
import { r as FreeVideoNotice } from "./CourseDetailPage-zKsDgcZ1.js";
//#region src/pages/public/FreeLessonsPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Every published course's video lessons are free on YouTube, so this lists published courses with a direct watch entry. */
function FreeLessonsPage() {
	const { t } = useI18n();
	const [page, setPage] = (0, import_react.useState)(1);
	const courses = useCourses({
		sort: "updated",
		page
	});
	usePageMeta(t("free.title"), t("free.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("free.title"),
				subtitle: t("free.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FreeVideoNotice, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: courses,
				children: (data) => data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("free.empty"),
					description: t("free.emptyBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "visually-hidden",
						children: t("free.listHeading")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid",
						children: data.items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c }, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
						page: data.page,
						pageSize: data.pageSize,
						total: data.total,
						onPage: setPage
					})
				] })
			})
		]
	});
}
//#endregion
export { FreeLessonsPage };

//# sourceMappingURL=FreeLessonsPage-Pk_Uuonq.js.map