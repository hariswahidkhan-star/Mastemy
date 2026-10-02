import { _ as require_react, b as __toESM, i as require_jsx_runtime } from "./I18nProvider-Cc4FX485.js";
import { n as k } from "./marked.esm-nBiO4dKX.js";
import { t as purify_default } from "./purify.es-0sb6rtCe.js";
//#region src/components/Markdown.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Converts untrusted markdown to sanitized HTML. Scripts, event handlers and javascript: URLs are stripped. */
function renderMarkdown(source) {
	const html = k.parse(source ?? "", {
		async: false,
		gfm: true,
		breaks: false
	});
	return purify_default.sanitize(html, {
		USE_PROFILES: { html: true },
		FORBID_TAGS: [
			"style",
			"iframe",
			"form",
			"input",
			"button",
			"object",
			"embed"
		],
		FORBID_ATTR: ["style"]
	});
}
var hookInstalled = false;
function ensureLinkHook() {
	if (hookInstalled) return;
	hookInstalled = true;
	purify_default.addHook("afterSanitizeAttributes", (node) => {
		if (node.tagName === "A" && node.getAttribute("href")?.match(/^https?:/)) {
			node.setAttribute("target", "_blank");
			node.setAttribute("rel", "noopener noreferrer");
		}
	});
}
function Markdown({ source, className }) {
	ensureLinkHook();
	const html = (0, import_react.useMemo)(() => renderMarkdown(source), [source]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ["prose", className].filter(Boolean).join(" "),
		dangerouslySetInnerHTML: { __html: html }
	});
}
//#endregion
export { Markdown as t };

//# sourceMappingURL=Markdown-pkfpt1OJ.js.map