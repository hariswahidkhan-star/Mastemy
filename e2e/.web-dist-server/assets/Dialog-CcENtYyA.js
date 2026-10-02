import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as require_react_dom } from "./react-dom-D4zceewu.js";
import { t as Button } from "./Button-6CizQUWS.js";
//#region src/components/ui/Dialog.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = require_react_dom();
var import_jsx_runtime = require_jsx_runtime();
var FOCUSABLE = "a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex=\"-1\"])";
/** Modal dialog with focus trap, Escape to close and focus restoration. */
function Dialog({ open, title, onClose, children, footer, alert, wide }) {
	const titleId = (0, import_react.useId)();
	const panelRef = (0, import_react.useRef)(null);
	const { t } = useI18n();
	const onCloseRef = (0, import_react.useRef)(onClose);
	(0, import_react.useEffect)(() => {
		onCloseRef.current = onClose;
	});
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const previouslyFocused = document.activeElement;
		const panel = panelRef.current;
		(panel?.querySelector(FOCUSABLE) ?? panel)?.focus();
		const onKey = (e) => {
			if (e.key === "Escape") {
				e.stopPropagation();
				onCloseRef.current();
				return;
			}
			if (e.key !== "Tab" || !panel) return;
			const items = Array.from(panel.querySelectorAll(FOCUSABLE));
			if (items.length === 0) return;
			const firstEl = items[0];
			const lastEl = items[items.length - 1];
			if (e.shiftKey && document.activeElement === firstEl) {
				e.preventDefault();
				lastEl.focus();
			} else if (!e.shiftKey && document.activeElement === lastEl) {
				e.preventDefault();
				firstEl.focus();
			}
		};
		document.addEventListener("keydown", onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
			previouslyFocused?.focus?.();
		};
	}, [open]);
	if (!open) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dialog-backdrop",
		onMouseDown: (e) => e.target === e.currentTarget && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: panelRef,
			className: wide ? "dialog dialog--wide" : "dialog",
			role: alert ? "alertdialog" : "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			tabIndex: -1,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dialog__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: titleId,
						className: "dialog__title",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: onClose,
						"aria-label": t("common.close"),
						children: "✕"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dialog__body",
					children
				}),
				footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dialog__footer",
					children: footer
				}) : null
			]
		})
	}), document.body);
}
/** Convenience confirm dialog. */
function ConfirmDialog({ open, title, body, confirmLabel, onConfirm, onCancel, danger, loading }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		title,
		onClose: onCancel,
		alert: danger,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onCancel,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: danger ? "danger" : "primary",
			onClick: onConfirm,
			loading,
			children: confirmLabel
		})] }),
		children: body
	});
}
//#endregion
export { Dialog as n, ConfirmDialog as t };

//# sourceMappingURL=Dialog-CcENtYyA.js.map