import { c as Outlet, i as require_jsx_runtime, o as NavLink, r as useI18n } from "./I18nProvider-Cc4FX485.js";
//#region src/pages/studio/StudioLayout.tsx
var import_jsx_runtime = require_jsx_runtime();
function StudioLayout() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container side-layout",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": t("studio.nav"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "side-nav",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/studio",
						end: true,
						children: t("studio.courses")
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/studio/new",
						children: t("studio.newCourse")
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/studio/earnings",
						children: t("studio.earnings")
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/studio/commerce",
						children: t("commerce.nav.studioPricing")
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/studio/payouts",
						children: t("commerce.nav.payouts")
					}) })
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })]
	});
}
//#endregion
export { StudioLayout };

//# sourceMappingURL=StudioLayout-8NuLl4JS.js.map