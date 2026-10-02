import { _ as require_react, b as __toESM, i as require_jsx_runtime } from "./I18nProvider-Cc4FX485.js";
//#region src/lib/compare.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEY = "mastemy.compare";
/** Pure toggle used by the tray: removes a selected course, or adds it unless the tray is full. */
function toggleCompare(list, item) {
	if (list.some((c) => c.id === item.id)) return { list: list.filter((c) => c.id !== item.id) };
	if (list.length >= 4) return {
		list,
		rejected: "full"
	};
	return { list: [...list, item] };
}
function canCompare(list) {
	return list.length >= 2 && list.length <= 4;
}
function compareHref(list) {
	return `/compare?ids=${list.map((c) => c.id).join(",")}`;
}
var CompareContext = (0, import_react.createContext)(null);
function readStored() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed.filter((c) => c && typeof c.id === "string").slice(0, 4) : [];
	} catch {
		return [];
	}
}
/** Compare selection, kept per browser. Storage is read after mount so server and first client render match. */
function CompareProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setItems(readStored());
		setLoaded(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!loaded) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch {}
	}, [items, loaded]);
	const toggle = (0, import_react.useCallback)((item) => {
		const res = toggleCompare(items, item);
		if (res.rejected) return false;
		setItems(res.list);
		return true;
	}, [items]);
	const value = (0, import_react.useMemo)(() => ({
		items,
		has: (id) => items.some((c) => c.id === id),
		toggle,
		remove: (id) => setItems((list) => list.filter((c) => c.id !== id)),
		clear: () => setItems([])
	}), [items, toggle]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareContext.Provider, {
		value,
		children
	});
}
var NOOP = {
	items: [],
	has: () => false,
	toggle: () => false,
	remove: () => void 0,
	clear: () => void 0
};
function useCompareTray() {
	return (0, import_react.useContext)(CompareContext) ?? NOOP;
}
//#endregion
export { useCompareTray as i, canCompare as n, compareHref as r, CompareProvider as t };

//# sourceMappingURL=compare-CFsa3wCB.js.map