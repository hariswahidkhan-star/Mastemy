import { _ as require_react, b as __toESM, i as require_jsx_runtime } from "./I18nProvider-Cc4FX485.js";
//#region src/components/ui/Field.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Wraps a single control with an associated label, hint and error message. */
function Field({ label, hint, error, required, children, className }) {
	const id = (0, import_react.useId)();
	const hintId = hint ? `${id}-hint` : void 0;
	const errorId = error ? `${id}-error` : void 0;
	const describedBy = [hintId, errorId].filter(Boolean).join(" ") || void 0;
	const control = (0, import_react.isValidElement)(children) ? (0, import_react.cloneElement)(children, {
		id: children.props.id ?? id,
		"aria-describedby": describedBy,
		"aria-invalid": error ? true : void 0
	}) : children;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: [
			"field",
			error ? "field--error" : "",
			className
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "field__label",
				htmlFor: children.props.id ?? id,
				children: [label, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "field__req",
					"aria-hidden": "true",
					children: [" ", "*"]
				}) : null]
			}),
			control,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field__hint",
				id: hintId,
				children: hint
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field__error",
				id: errorId,
				role: "alert",
				children: error
			}) : null
		]
	});
}
var Input = (0, import_react.forwardRef)(function Input({ className, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		className: ["input", className].filter(Boolean).join(" "),
		...rest
	});
});
var Textarea = (0, import_react.forwardRef)(function Textarea({ className, rows = 4, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref,
		rows,
		className: [
			"input",
			"textarea",
			className
		].filter(Boolean).join(" "),
		...rest
	});
});
var Select = (0, import_react.forwardRef)(function Select({ options, placeholder, className, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		ref,
		className: [
			"input",
			"select",
			className
		].filter(Boolean).join(" "),
		...rest,
		children: [placeholder !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "",
			children: placeholder
		}) : null, options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: o.value,
			children: o.label
		}, o.value))]
	});
});
var Checkbox = (0, import_react.forwardRef)(function Checkbox({ label, hint, error, className, id, ...rest }, ref) {
	const autoId = (0, import_react.useId)();
	const inputId = id ?? autoId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: ["check", className].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref,
				id: inputId,
				type: "checkbox",
				"aria-invalid": error ? true : void 0,
				"aria-describedby": error ? `${inputId}-err` : hint ? `${inputId}-hint` : void 0,
				...rest
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				htmlFor: inputId,
				children: [label, hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "field__hint",
					id: `${inputId}-hint`,
					children: hint
				}) : null]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field__error",
				id: `${inputId}-err`,
				role: "alert",
				children: error
			}) : null
		]
	});
});
//#endregion
export { Textarea as a, Select as i, Field as n, Input as r, Checkbox as t };

//# sourceMappingURL=Field-Di1lkoGg.js.map