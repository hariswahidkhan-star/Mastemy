import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, t as Button } from "./Button-6CizQUWS.js";
import { a as QueryState, t as Badge } from "./misc-Bqc6tFVU.js";
import { n as Field, r as Input } from "./Field-Di1lkoGg.js";
//#region src/pages/finala/Pickers.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Generic search-then-choose picker: type at least 2 characters, submit, pick from the results. */
function SearchPicker({ label, hint, queryKey, search, renderItem, selected, renderSelected, onChange, minChars = 2 }) {
	const { t } = useI18n();
	const [text, setText] = (0, import_react.useState)("");
	const [term, setTerm] = (0, import_react.useState)("");
	const listId = (0, import_react.useId)();
	const results = useQuery({
		queryKey: [
			"finala",
			"picker",
			queryKey,
			term
		],
		queryFn: () => search(term),
		enabled: term.length >= minChars
	});
	if (selected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "finala-picked",
		role: "group",
		"aria-label": label,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "small muted",
				children: [label, ":"]
			}),
			" ",
			renderSelected(selected),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: () => onChange(null),
				children: t("finala.picker.change")
			})
		]
	});
	const submit = () => setTerm(text.trim());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack finala-picker",
		style: { gap: "var(--space-2)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "row",
			style: { alignItems: "flex-end" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label,
				hint: hint ?? t("finala.picker.hint", { n: minChars }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "search",
					value: text,
					"aria-controls": listId,
					onChange: (e) => setText(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							submit();
						}
					}
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				disabled: text.trim().length < minChars,
				onClick: submit,
				children: t("finala.picker.search")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: listId,
			"aria-live": "polite",
			children: term.length >= minChars ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: results,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("finala.picker.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0,
						gap: "var(--space-1)"
					},
					children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "finala-picker__option",
						onClick: () => onChange(it),
						children: renderItem(it)
					}) }, it.id))
				})
			}) : null
		})]
	});
}
/** Staff user picker (GET /api/admin/users/lookup or the Support equivalent); emails are masked. */
function UserPicker({ label, selected, onChange, endpoint = "/api/admin/users/lookup" }) {
	const { t } = useI18n();
	const show = (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: u.displayName }),
		" ",
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "small muted",
			children: u.maskedEmail
		}),
		" ",
		u.isSuspended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "danger",
			children: t("finala.picker.suspended")
		}) : null
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPicker, {
		label,
		hint: t("finala.picker.userHint"),
		queryKey: endpoint,
		search: (q) => api(`${endpoint}${qs({
			q,
			limit: 10
		})}`),
		selected,
		onChange,
		renderItem: show,
		renderSelected: show
	});
}
/** Staff assessment picker (GET /api/admin/assessments). */
function AssessmentPicker({ label, selected, onChange }) {
	const { t } = useI18n();
	const show = (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: a.title }),
		" ",
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "small muted",
			children: [
				a.courseCode,
				" · ",
				a.courseTitle
			]
		}),
		" ",
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`assessment.mode.${a.mode}`) })
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPicker, {
		label,
		hint: t("finala.picker.assessmentHint"),
		queryKey: "assessments",
		search: (q) => api(`/api/admin/assessments${qs({
			q,
			limit: 20
		})}`),
		selected,
		onChange,
		renderItem: show,
		renderSelected: show
	});
}
/**
* Picks a non-premium image resource for a certificate logo: choose a course from the public catalog, then
* one of its image resources (GET /api/studio/courses/{id}/resources?type=image).
*/
function ImageResourcePicker({ value, onChange }) {
	const { t } = useI18n();
	const [course, setCourse] = (0, import_react.useState)(null);
	const images = useQuery({
		queryKey: [
			"finala",
			"images",
			course?.id
		],
		queryFn: () => api(`/api/studio/courses/${course?.id}/resources${qs({ type: "image" })}`),
		enabled: !!course
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "stack finala-imagepicker",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: t("finala.picker.logo") }),
			value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "small",
				children: [
					t("finala.picker.logoSelected"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono",
						children: value.slice(0, 8)
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => onChange(null),
						children: t("finala.picker.logoRemove")
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finala.picker.logoNone")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPicker, {
				label: t("finala.picker.course"),
				queryKey: "courses",
				search: (q) => api(`/api/courses${qs({
					q,
					page: 1,
					pageSize: 10
				})}`).then((p) => p.items.map((c) => ({
					id: c.id,
					title: c.title
				}))),
				selected: course,
				onChange: setCourse,
				renderItem: (c) => c.title,
				renderSelected: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.title })
			}),
			course ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: images,
				children: (list) => {
					const usable = list.filter((r) => !r.isPremium && r.contentType.startsWith("image/"));
					return usable.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finala.picker.noImages")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "stack",
						style: {
							listStyle: "none",
							padding: 0,
							gap: "var(--space-1)"
						},
						children: usable.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "finala-picker__option",
							"aria-pressed": value === r.id,
							onClick: () => onChange(r.id),
							children: [
								r.fileName,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted",
									children: r.contentType
								})
							]
						}) }, r.id))
					});
				}
			}) : null
		]
	});
}
//#endregion
export { ImageResourcePicker as n, UserPicker as r, AssessmentPicker as t };

//# sourceMappingURL=Pickers-l0FQGv4r.js.map