import { i as require_jsx_runtime } from "./I18nProvider-Cc4FX485.js";
import { n as ButtonLink, t as Button } from "./Button-6CizQUWS.js";
//#region src/components/ui/EmptyState.tsx
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ title, description, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "empty__mark",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "empty__title",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "empty__desc",
				children: description
			}) : null,
			children,
			action ? action.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
				to: action.to,
				variant: "secondary",
				children: action.label
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: action.onClick,
				children: action.label
			}) : null
		]
	});
}
//#endregion
export { EmptyState as t };

//# sourceMappingURL=EmptyState-DxiM9uz0.js.map