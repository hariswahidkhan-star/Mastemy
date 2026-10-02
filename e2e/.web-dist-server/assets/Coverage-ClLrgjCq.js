import { i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as Badge } from "./misc-Bqc6tFVU.js";
//#region src/components/discover/Coverage.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Per-objective coverage (mapped lessons and Active questions) of a certification by one or all linked courses. */
function CoverageTable({ report, fmt }) {
	const { t } = useI18n();
	if (report.objectiveCount === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "small muted",
		children: t("discover.cert.noBlueprint")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "small",
		children: t("discover.coverage.summary", {
			covered: fmt(report.coveredWeightPercent),
			gaps: report.gapCount,
			n: report.objectiveCount
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "table-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("discover.cert.objCode")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("discover.cert.objTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("discover.cert.objWeight")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("discover.coverage.lessons")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("discover.coverage.questions")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("discover.coverage.status")
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: report.objectives.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "mono",
					children: o.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [fmt(o.weightPercent), "%"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.lessonCount }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.activeQuestionCount }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.gap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "warning",
					children: o.gaps.map((g) => t(`discover.coverage.gap.${g}`)).join(", ")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "success",
					children: t("discover.coverage.covered")
				}) })
			] }, o.objectiveId)) })]
		})
	})] });
}
//#endregion
export { CoverageTable as t };

//# sourceMappingURL=Coverage-ClLrgjCq.js.map