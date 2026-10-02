import { _ as require_react, b as __toESM } from "./I18nProvider-Cc4FX485.js";
//#region src/lib/seo.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var SITE = "Mastemy";
/**
* Present only during server rendering: `usePageMeta` writes into it synchronously so the SSR server can
* emit the same title/description/robots the client would set, without running effects.
*/
var HeadCollectorContext = (0, import_react.createContext)(null);
function fullTitle(title) {
	return title ? `${title} · ${SITE}` : SITE;
}
function setMeta(name, content) {
	let el = document.head.querySelector(`meta[name="${name}"]`);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute("name", name);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
}
/**
* Server-rendered head tags (canonical, hreflang, Open Graph, JSON-LD) carry `data-ssr-path`.
* Once the client navigates elsewhere they describe a different page, so they are removed.
*/
function dropStaleServerHead() {
	const path = window.location.pathname;
	document.head.querySelectorAll("[data-ssr-path]").forEach((el) => {
		if (el.dataset.ssrPath !== path) el.remove();
	});
}
/**
* Sets document title and meta description for the current page.
* `noindex` marks private pages (dashboards, notes, attempts) so they stay out of search indexes.
*/
function usePageMeta(title, description, opts) {
	const noindex = !!opts?.noindex;
	const collector = (0, import_react.useContext)(HeadCollectorContext);
	if (collector) {
		collector.title = title;
		if (description) collector.description = description;
		collector.noindex = collector.noindex || noindex;
	}
	(0, import_react.useEffect)(() => {
		document.title = fullTitle(title);
		if (description) setMeta("description", description);
		setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
		dropStaleServerHead();
	}, [
		title,
		description,
		noindex
	]);
}
//#endregion
export { usePageMeta as i, SITE as n, fullTitle as r, HeadCollectorContext as t };

//# sourceMappingURL=seo-DH3WSmad.js.map