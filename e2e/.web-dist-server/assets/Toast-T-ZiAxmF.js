import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
//#region src/components/ui/Toast.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var ToastContext = (0, import_react.createContext)(null);
function ToastProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const nextId = (0, import_react.useRef)(1);
	const { t } = useI18n();
	const dismiss = (0, import_react.useCallback)((id) => {
		setItems((list) => list.filter((i) => i.id !== id));
	}, []);
	const push = (0, import_react.useCallback)((kind, message) => {
		const id = nextId.current++;
		setItems((list) => [...list.slice(-3), {
			id,
			kind,
			message
		}]);
		window.setTimeout(() => dismiss(id), kind === "error" ? 8e3 : 5e3);
	}, [dismiss]);
	const api = (0, import_react.useMemo)(() => ({
		success: (m) => push("success", m),
		error: (m) => push("error", m),
		info: (m) => push("info", m)
	}), [push]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastContext.Provider, {
		value: api,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "toasts",
			"aria-live": "polite",
			"aria-relevant": "additions",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `toast toast--${item.kind}`,
				role: item.kind === "error" ? "alert" : "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.message }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "toast__close",
					onClick: () => dismiss(item.id),
					"aria-label": t("common.dismiss"),
					children: "✕"
				})]
			}, item.id))
		})]
	});
}
function useToast() {
	const ctx = (0, import_react.useContext)(ToastContext);
	if (!ctx) throw new Error("useToast must be used inside ToastProvider");
	return ctx;
}
//#endregion
export { useToast as n, ToastProvider as t };

//# sourceMappingURL=Toast-T-ZiAxmF.js.map