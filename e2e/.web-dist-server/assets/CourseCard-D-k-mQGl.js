import { a as Link, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as Badge } from "./misc-Bqc6tFVU.js";
import { i as WishlistButton, t as CompareToggle } from "./Discovery-D4EXL3Q0.js";
import { t as Duration } from "./Duration-C3eLHxwf.js";
//#region src/components/CourseCard.tsx
var import_jsx_runtime = require_jsx_runtime();
function CourseCard({ course, to }) {
	const { t, fmtNumber } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "course-card-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: to ?? `/courses/${course.slug}`,
			className: "course-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "course-card__band",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "course-card__title",
					children: course.title
				}),
				course.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: course.subtitle
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "course-card__meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`level.${course.level}`) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`language.${course.language}`) }),
						course.status === "Updating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "info",
							children: t("status.Updating")
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "course-card__meta",
					children: [
						typeof course.videoCount === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("course.videoCount", { n: fmtNumber(course.videoCount) }) }) : null,
						typeof course.questionCount === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("course.mcqCount", { n: fmtNumber(course.questionCount) }) }) : null,
						course.totalDurationSeconds ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duration, { seconds: course.totalDurationSeconds }) }) : null
					]
				}),
				course.instructors && course.instructors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					style: { margin: 0 },
					children: course.instructors.map((i) => typeof i === "string" ? i : i.displayName).join(", ")
				}) : null,
				course.ratingCount && course.ratingAverage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					style: { margin: 0 },
					children: t("course.rating", {
						avg: course.ratingAverage.toFixed(1),
						n: fmtNumber(course.ratingCount)
					})
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "course-card__actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WishlistButton, {
				courseId: course.id,
				title: course.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareToggle, { item: {
				id: course.id,
				slug: course.slug,
				title: course.title
			} })]
		})]
	});
}
//#endregion
export { CourseCard as t };

//# sourceMappingURL=CourseCard-D-k-mQGl.js.map