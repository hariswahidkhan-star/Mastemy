import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as Button } from "./Button-6CizQUWS.js";
import { t as RichContent } from "./RichContent-C3Tst1Ll.js";
import { c as useCourseResources, n as IMAGE_TYPES } from "./exams-ZvNkLj9c.js";
//#region src/pages/exams/RichEditor.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Markdown editor for question content: write / preview tabs, a math cheat sheet and an image picker
* that inserts `![name](resource:<id>)` for the course's non-premium image resources (the only images
* the server accepts).
*/
function RichEditor({ label, value, onChange, courseId, error, required, rows = 5, hint }) {
	const { t } = useI18n();
	const id = (0, import_react.useId)();
	const [mode, setMode] = (0, import_react.useState)("write");
	const [help, setHelp] = (0, import_react.useState)(false);
	const [picker, setPicker] = (0, import_react.useState)(false);
	const area = (0, import_react.useRef)(null);
	const resources = useCourseResources(picker ? courseId : "");
	const images = (resources.data ?? []).filter((r) => !r.isPremium && IMAGE_TYPES.includes(r.contentType));
	const insert = (snippet) => {
		const el = area.current;
		const start = el?.selectionStart ?? value.length;
		const end = el?.selectionEnd ?? value.length;
		onChange(value.slice(0, start) + snippet + value.slice(end));
		setMode("write");
		requestAnimationFrame(() => {
			if (!area.current) return;
			area.current.focus();
			area.current.selectionStart = area.current.selectionEnd = start + snippet.length;
		});
	};
	const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-err` : null].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: [
			"field",
			"rich-editor",
			error ? "field--error" : ""
		].join(" "),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "field__label",
					htmlFor: id,
					children: [label, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "field__req",
						"aria-hidden": "true",
						children: [" ", "*"]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					role: "group",
					"aria-label": t("exams.editor.tools", { label }),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: mode === "write" ? "secondary" : "ghost",
							"aria-pressed": mode === "write",
							onClick: () => setMode("write"),
							children: t("exams.editor.write")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: mode === "preview" ? "secondary" : "ghost",
							"aria-pressed": mode === "preview",
							onClick: () => setMode("preview"),
							children: t("exams.editor.preview")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							"aria-expanded": help,
							onClick: () => setHelp((h) => !h),
							children: t("exams.editor.mathHelp")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							"aria-expanded": picker,
							onClick: () => setPicker((p) => !p),
							children: t("exams.editor.insertImage")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id,
				ref: area,
				rows,
				className: "input textarea",
				value,
				hidden: mode !== "write",
				"aria-invalid": error ? true : void 0,
				"aria-describedby": describedBy || void 0,
				onChange: (e) => onChange(e.target.value)
			}),
			mode === "preview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rich-editor__preview",
				"aria-label": t("exams.editor.previewOf", { label }),
				children: value.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, { source: value }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: t("exams.editor.empty")
				})
			}) : null,
			help ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rich-editor__help small",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("exams.editor.syntax") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "**bold**" }),
							", ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "*italic*" }),
							", ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "`code`" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "$x^2 + y^2$" }),
							" → ",
							t("exams.editor.inlineMath")
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", { children: [
								"$$\\frac",
								"{a}{b}",
								"$$"
							] }),
							" → ",
							t("exams.editor.displayMath")
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "\\$" }),
							" → ",
							t("exams.editor.literalDollar")
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "| A | B |" }),
							" → ",
							t("exams.editor.tables")
						] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("exams.editor.notAllowed")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "row",
						children: [
							"$x^2$",
							"$\\sqrt{x}$",
							"$\\frac{a}{b}$",
							"$\\sum_{i=1}^{n} x_i$",
							"$\\alpha$"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => insert(s),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: s })
						}, s))
					})
				]
			}) : null,
			picker ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rich-editor__help small",
				"aria-live": "polite",
				children: [resources.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("common.loading") }) : resources.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					children: t("exams.editor.imagesError")
				}) : images.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("exams.editor.noImages") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "row",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: images.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => {
							insert(`![${r.fileName.replace(/[[\]]/g, "")}](resource:${r.id})`);
							setPicker(false);
						},
						children: t("exams.editor.insertNamed", { name: r.fileName })
					}) }, r.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("exams.editor.imageRule")
				})]
			}) : null,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field__hint",
				id: `${id}-hint`,
				children: hint
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field__error",
				id: `${id}-err`,
				role: "alert",
				children: error
			}) : null
		]
	});
}
//#endregion
export { RichEditor as t };

//# sourceMappingURL=RichEditor-C8Ud_54o.js.map