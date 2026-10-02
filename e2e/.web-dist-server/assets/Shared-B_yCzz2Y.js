import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as Badge } from "./misc-Bqc6tFVU.js";
import { p as loc } from "./discover-CtKiK6mW.js";
/* empty css                  */
import { t as Duration } from "./Duration-C3eLHxwf.js";
import { t as CourseCard } from "./CourseCard-D-k-mQGl.js";
//#region src/components/discover/Shared.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** A titled home/academy row of course cards; renders nothing when empty unless `empty` is given. */
function CourseRow({ id, title, courses, more, empty, extra }) {
	if (courses.length === 0 && !empty) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": id,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section__head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section__title",
					id,
					children: title
				}), more ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: more.to,
					children: more.label
				}) : null]
			}),
			extra,
			courses.length === 0 ? empty : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid",
				children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c }, c.id))
			})
		]
	});
}
function PathwayCard({ p }) {
	const { t, lang } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/pathways/${p.slug}`,
			className: "dcard",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "dcard__title",
					children: loc(lang, p.titleEn, p.titleAr)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					style: { margin: 0 },
					children: loc(lang, p.descriptionEn, p.descriptionAr)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row small",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`level.${p.level}`) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("discover.pathways.courseCount", { n: p.courseCount }) }),
						p.totalDurationSeconds > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duration, { seconds: p.totalDurationSeconds }) : null
					]
				})
			]
		})
	});
}
function CertificationCard({ c }) {
	const { t, fmtDate } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/certifications/${c.slug}`,
			className: "dcard",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "dcard__title",
					children: c.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small muted",
					style: { margin: 0 },
					children: [
						c.issuerName,
						c.examCode ? ` · ${t("discover.cert.examCode")}: ${c.examCode}` : "",
						c.levelOrPart ? ` · ${c.levelOrPart}` : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row small",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "info",
							children: t(`discover.certState.${c.state}`)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`discover.certKind.${c.kind}`) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("discover.cert.lastChecked", { date: fmtDate(c.lastCheckedAt) }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("discover.cert.prepCount", { n: c.preparationCourseCount }) })
					]
				})
			]
		})
	});
}
/**
* Accessible toggletip: a button reveals an explanation on click, focus or hover; Escape hides it.
* Used for rule explanations such as the bestseller rule.
*/
function Toggletip({ label, children }) {
	const id = (0, import_react.useId)();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "tip",
		onMouseEnter: () => setOpen(true),
		onMouseLeave: () => setOpen(false),
		onKeyDown: (e) => {
			if (e.key === "Escape") setOpen(false);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "tip__trigger",
			"aria-expanded": open,
			"aria-controls": id,
			onClick: () => setOpen((o) => !o),
			onBlur: () => setOpen(false),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "ⓘ"
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "small",
					children: label
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			id,
			role: "status",
			className: "tip__bubble",
			hidden: !open,
			children
		})]
	});
}
//#endregion
export { Toggletip as i, CourseRow as n, PathwayCard as r, CertificationCard as t };

//# sourceMappingURL=Shared-B_yCzz2Y.js.map