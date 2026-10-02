import { _ as require_react, b as __toESM, i as require_jsx_runtime } from "./I18nProvider-Cc4FX485.js";
//#region src/components/ui/Tabs.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** WAI-ARIA tabs with roving tabindex; arrow keys follow reading direction (RTL aware). */
function Tabs({ tabs, value, onChange, label }) {
	const baseId = (0, import_react.useId)();
	const refs = (0, import_react.useRef)({});
	const onKeyDown = (e) => {
		const idx = tabs.findIndex((tab) => tab.id === value);
		if (idx < 0) return;
		const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
		let next;
		if (e.key === "ArrowRight") next = rtl ? idx - 1 : idx + 1;
		else if (e.key === "ArrowLeft") next = rtl ? idx + 1 : idx - 1;
		else if (e.key === "Home") next = 0;
		else if (e.key === "End") next = tabs.length - 1;
		else return;
		e.preventDefault();
		next = (next + tabs.length) % tabs.length;
		onChange(tabs[next].id);
		refs.current[tabs[next].id]?.focus();
	};
	const active = tabs.find((tab) => tab.id === value) ?? tabs[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tabs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tabs__list",
			role: "tablist",
			"aria-label": label,
			onKeyDown,
			children: tabs.map((tab) => {
				const selected = tab.id === active?.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					ref: (el) => {
						refs.current[tab.id] = el;
					},
					type: "button",
					role: "tab",
					id: `${baseId}-tab-${tab.id}`,
					"aria-selected": selected,
					"aria-controls": `${baseId}-panel-${tab.id}`,
					tabIndex: selected ? 0 : -1,
					className: selected ? "tabs__tab tabs__tab--active" : "tabs__tab",
					onClick: () => onChange(tab.id),
					children: tab.label
				}, tab.id);
			})
		}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tabs__panel",
			role: "tabpanel",
			id: `${baseId}-panel-${active.id}`,
			"aria-labelledby": `${baseId}-tab-${active.id}`,
			tabIndex: 0,
			children: active.content
		}) : null]
	});
}
//#endregion
export { Tabs as t };

//# sourceMappingURL=Tabs-CKJGcPx4.js.map