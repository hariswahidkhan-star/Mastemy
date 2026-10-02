import { _ as require_react, b as __toESM, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as Button } from "./Button-6CizQUWS.js";
import { E as useSuggestions, h as suggestionHref } from "./discover-CtKiK6mW.js";
//#region src/components/discover/SearchCombobox.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Debounces a value; the returned value settles `delay` ms after the last change. */
function useDebounced(value, delay = 250) {
	const [v, setV] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const h = window.setTimeout(() => setV(value), delay);
		return () => window.clearTimeout(h);
	}, [value, delay]);
	return v;
}
/**
* Search box with server suggestions, following the WAI-ARIA combobox pattern (list autocomplete):
* the input owns `aria-expanded`/`aria-controls`/`aria-activedescendant`; ArrowUp/Down move through the
* listbox, Enter opens the active suggestion (or submits the text), Escape closes the list then clears.
*/
function SearchCombobox({ id, initial = "", onSubmit, onTextChange, submitLabel, placeholder, label }) {
	const { t } = useI18n();
	const navigate = useNavigate();
	const autoId = (0, import_react.useId)();
	const inputId = id ?? `${autoId}-q`;
	const listId = `${inputId}-list`;
	const [text, setText] = (0, import_react.useState)(initial);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(-1);
	const debounced = useDebounced(text);
	const suggestions = useSuggestions(open ? debounced : "");
	const items = open && debounced.trim().length >= 2 ? suggestions.data ?? [] : [];
	const expanded = open && items.length > 0;
	const wrapRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => setText(initial), [initial]);
	(0, import_react.useEffect)(() => setActive(-1), [debounced]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDoc = (e) => {
			if (!wrapRef.current?.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, [open]);
	const choose = (s) => {
		setOpen(false);
		navigate(suggestionHref(s));
	};
	const onKeyDown = (e) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setOpen(true);
			if (items.length) setActive((a) => (a + 1) % items.length);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			if (items.length) setActive((a) => a <= 0 ? items.length - 1 : a - 1);
		} else if (e.key === "Enter" && expanded && active >= 0) {
			e.preventDefault();
			choose(items[active]);
		} else if (e.key === "Escape") {
			if (expanded) {
				e.preventDefault();
				setOpen(false);
			} else if (text) {
				e.preventDefault();
				setText("");
				onTextChange?.("");
			}
		}
	};
	const submit = (e) => {
		e.preventDefault();
		setOpen(false);
		onSubmit(text.trim());
	};
	const kindLabel = (k) => t(`discover.search.kind.${k}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "combo",
		role: "search",
		onSubmit: submit,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "combo__wrap",
			ref: wrapRef,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: inputId,
					className: "visually-hidden",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: inputId,
					className: "input",
					type: "text",
					inputMode: "search",
					autoComplete: "off",
					role: "combobox",
					"aria-autocomplete": "list",
					"aria-expanded": expanded,
					"aria-controls": listId,
					"aria-activedescendant": expanded && active >= 0 ? `${listId}-${active}` : void 0,
					value: text,
					placeholder,
					onChange: (e) => {
						setText(e.target.value);
						setOpen(true);
						onTextChange?.(e.target.value);
					},
					onFocus: () => setOpen(true),
					onKeyDown
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					id: listId,
					role: "listbox",
					"aria-label": t("discover.search.suggestions"),
					className: "combo__list",
					hidden: !expanded,
					children: items.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						id: `${listId}-${i}`,
						role: "option",
						"aria-selected": i === active,
						className: i === active ? "combo__opt combo__opt--active" : "combo__opt",
						onMouseDown: (e) => e.preventDefault(),
						onClick: () => choose(s),
						onMouseEnter: () => setActive(i),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge--neutral",
							children: kindLabel(s.kind)
						})]
					}, `${s.kind}:${s.key}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "visually-hidden",
					"aria-live": "polite",
					children: expanded ? t("discover.search.count", { n: items.length }) : ""
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "submit",
			children: submitLabel ?? t("courses.searchButton")
		})]
	});
}
//#endregion
export { useDebounced as n, SearchCombobox as t };

//# sourceMappingURL=SearchCombobox-Q3Xl2cLU.js.map