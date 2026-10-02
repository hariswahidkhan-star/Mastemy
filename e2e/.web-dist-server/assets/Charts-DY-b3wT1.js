import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
//#region src/pages/workspace/Charts.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** "Nice" axis maximum: 1, 2, 2.5 or 5 × 10^n at or above the data maximum (min 1). */
function niceMax(max) {
	if (!(max > 0)) return 1;
	const exp = Math.pow(10, Math.floor(Math.log10(max)));
	for (const m of [
		1,
		2,
		2.5,
		5,
		10
	]) if (m * exp >= max) return m * exp;
	return 10 * exp;
}
/**
* Single-series column chart (one hue, so no legend: the title names the series). Every bar is a focusable
* hit target with a tooltip on hover/focus; a data table is always available under "Show data".
*/
function ColumnChart({ title, points, format, height = 180 }) {
	const { t, fmtNumber } = useI18n();
	const fmt = format ?? fmtNumber;
	const id = (0, import_react.useId)();
	const [active, setActive] = (0, import_react.useState)(null);
	const max = niceMax(Math.max(0, ...points.map((p) => p.value)));
	const W = 600;
	const padL = 44;
	const padB = 22;
	const plotW = 548;
	const plotH = height - padB - 8;
	const step = points.length ? plotW / points.length : plotW;
	const barW = Math.max(2, Math.min(36, step - 2));
	const y = (v) => 8 + plotH - v / max * plotH;
	const ticks = [
		0,
		max / 2,
		max
	];
	const labelEvery = Math.max(1, Math.ceil(points.length / 8));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "ws-chart",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				id: `${id}-t`,
				className: "ws-chart__title",
				children: title
			}),
			points.length === 0 || points.every((p) => p.value === 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted small",
				children: t("workspace.charts.noData")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ws-chart__plot",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: `0 0 ${W} ${height}`,
					role: "img",
					"aria-labelledby": `${id}-t`,
					preserveAspectRatio: "none",
					style: { direction: "ltr" },
					children: [ticks.map((tk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: padL,
						x2: 592,
						y1: y(tk),
						y2: y(tk),
						className: "ws-chart__grid"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: 38,
						y: y(tk) + 4,
						textAnchor: "end",
						className: "ws-chart__axis",
						children: fmt(tk)
					})] }, tk)), points.map((p, i) => {
						const x = padL + i * step + (step - barW) / 2;
						const top = y(p.value);
						const h = Math.max(0, 8 + plotH - top);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: padL + i * step,
								y: 8,
								width: step,
								height: plotH,
								className: "ws-chart__hit",
								tabIndex: 0,
								role: "img",
								"aria-label": `${p.label}: ${fmt(p.value)}`,
								onMouseEnter: () => setActive(i),
								onMouseLeave: () => setActive(null),
								onFocus: () => setActive(i),
								onBlur: () => setActive(null)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: roundedTop(x, top, barW, h),
								className: active === i ? "ws-chart__bar ws-chart__bar--on" : "ws-chart__bar",
								pointerEvents: "none"
							}),
							i % labelEvery === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: x + barW / 2,
								y: height - 6,
								textAnchor: "middle",
								className: "ws-chart__axis",
								children: p.label.slice(5)
							}) : null
						] }, p.label);
					})]
				}), active !== null && points[active] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ws-chart__tip",
					style: { insetInlineStart: `${(padL + (active + .5) * step) / W * 100}%` },
					role: "status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fmt(points[active].value) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "muted",
						children: [" ", points[active].label]
					})]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				caption: title,
				head: [t("workspace.charts.period"), t("workspace.charts.value")],
				rows: points.map((p) => [p.label, fmt(p.value)])
			})
		]
	});
}
function roundedTop(x, top, w, h) {
	if (h <= 0) return "";
	const r = Math.min(4, w / 2, h);
	const bottom = top + h;
	return `M${x},${bottom}V${top + r}Q${x},${top} ${x + r},${top}H${x + w - r}Q${x + w},${top} ${x + w},${top + r}V${bottom}Z`;
}
/** Horizontal meter rows (e.g. a lesson completion funnel): started vs completed as text + bar of completed share. */
function MeterList({ title, rows }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "ws-chart",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "ws-chart__title",
			children: title
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted small",
			children: t("workspace.charts.noData")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "ws-meters",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between small",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.text })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ws-meter",
				role: "meter",
				"aria-valuemin": 0,
				"aria-valuemax": r.max || 1,
				"aria-valuenow": r.value,
				"aria-valuetext": r.text,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { inlineSize: `${r.max ? r.value / r.max * 100 : 0}%` } })
			})] }, r.key))
		})]
	});
}
function DataTable({ caption, head, rows }) {
	const { t } = useI18n();
	if (rows.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "ws-chart__data",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: t("workspace.charts.showData") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "table-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "table",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
						className: "visually-hidden",
						children: caption
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: head.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: h
					}, h)) }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: r.map((c, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c }, j)) }, i)) })
				]
			})
		})]
	});
}
function StatTile({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ws-stat",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ws-stat__label",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ws-stat__value",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ws-stat__hint small muted",
				children: hint
			}) : null
		]
	});
}
//#endregion
export { StatTile as i, DataTable as n, MeterList as r, ColumnChart as t };

//# sourceMappingURL=Charts-DY-b3wT1.js.map