import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { i as api, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, l as errorMessage, n as Notice, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as problemCode } from "./commerce-DIIG05BW.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as Dialog, t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { a as categoryTree, c as fbKeys, g as validateCategory, p as useAdminCategories, s as descendantIds } from "./finalb-tCQ9cZ9j.js";
//#region src/pages/finalb/CategoriesAdmin.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var CODES = [
	"invalid_slug",
	"slug_taken",
	"invalid_name",
	"invalid_sort_order",
	"invalid_parent",
	"category_cycle",
	"category_too_deep",
	"category_has_courses",
	"category_has_children",
	"category_has_pathways"
];
function categoryError(e, t) {
	const code = problemCode(e);
	if (CODES.includes(code)) return t(`finalb.categories.err.${code}`);
	return errorMessage(e, t);
}
var blank = (parentId) => ({
	slug: "",
	nameEn: "",
	nameAr: "",
	parentId,
	isAcademy: false,
	sortOrder: 0
});
function CategoryForm({ list, editing, initial, onClose }) {
	const { t, lang } = useI18n();
	const toast = useToast();
	const [f, setF] = (0, import_react.useState)(initial);
	const [sortText, setSortText] = (0, import_react.useState)(String(initial.sortOrder));
	const [touched, setTouched] = (0, import_react.useState)(false);
	const input = {
		...f,
		slug: f.slug.trim().toLowerCase(),
		sortOrder: sortText.trim() === "" ? NaN : Number(sortText)
	};
	const errors = validateCategory(input, list, editing?.id ?? null);
	const save = useApiMutation(() => editing ? api(`/api/admin/categories/${editing.id}`, {
		method: "PUT",
		body: input
	}) : api("/api/admin/categories", {
		method: "POST",
		body: input
	}), [fbKeys.adminCategories, ["categories"]], () => {
		toast.success(t("finalb.categories.saved"));
		onClose();
	});
	const blocked = editing ? descendantIds(list, editing.id) : /* @__PURE__ */ new Set();
	const parentOptions = categoryTree(list).filter((n) => !blocked.has(n.cat.id)).map((n) => ({
		value: String(n.cat.id),
		label: `${"— ".repeat(n.depth)}${lang === "ar" ? n.cat.nameAr : n.cat.nameEn}`
	}));
	const err = (k) => touched && errors[k] ? t(`finalb.categories.err.${errors[k]}`) : void 0;
	const submit = (e) => {
		e.preventDefault();
		setTouched(true);
		if (Object.keys(errors).length === 0) save.mutate(void 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		title: editing ? t("finalb.categories.edit") : t("finalb.categories.create"),
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "stack",
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("finalb.categories.slug"),
					hint: t("finalb.categories.slugHint"),
					error: err("slug"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: f.slug,
						onChange: (e) => setF({
							...f,
							slug: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("finalb.categories.nameEn"),
					error: err("nameEn"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: f.nameEn,
						maxLength: 100,
						onChange: (e) => setF({
							...f,
							nameEn: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("finalb.categories.nameAr"),
					error: err("nameAr"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: f.nameAr,
						dir: "rtl",
						lang: "ar",
						maxLength: 100,
						onChange: (e) => setF({
							...f,
							nameAr: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("finalb.categories.parent"),
					error: err("parentId"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: f.parentId === null ? "" : String(f.parentId),
						placeholder: t("finalb.categories.noParent"),
						options: parentOptions,
						onChange: (e) => setF({
							...f,
							parentId: e.target.value === "" ? null : Number(e.target.value)
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("finalb.categories.sort"),
					error: err("sortOrder"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						inputMode: "numeric",
						value: sortText,
						onChange: (e) => setSortText(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					label: t("finalb.categories.academy"),
					hint: t("finalb.categories.academyHint"),
					checked: f.isAcademy,
					onChange: (e) => setF({
						...f,
						isAcademy: e.target.checked
					})
				}),
				save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: categoryError(save.error, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: save.isPending,
						children: t("common.save")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: onClose,
						children: t("common.cancel")
					})]
				})
			]
		})
	});
}
/** `/admin/categories`: staff tree editor for the catalog categories. */
function AdminCategoriesPage() {
	const { t, lang } = useI18n();
	usePageMeta(t("finalb.categories.title"), void 0, { noindex: true });
	const toast = useToast();
	const cats = useAdminCategories();
	const [form, setForm] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const del = useApiMutation((c) => api(`/api/admin/categories/${c.id}`, { method: "DELETE" }), [fbKeys.adminCategories, ["categories"]], () => {
		toast.success(t("finalb.categories.deleted"));
		setDeleting(null);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("finalb.categories.title"),
				subtitle: t("finalb.categories.subtitle"),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setForm({
						editing: null,
						initial: blank(null)
					}),
					children: t("finalb.categories.create")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: cats,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("finalb.categories.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					"aria-label": t("finalb.categories.tree"),
					children: categoryTree(list).map(({ cat: c, depth }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat row row--between",
						style: { marginInlineStart: `calc(${depth} * var(--space-5, 1.5rem))` },
						"data-category-slug": c.slug,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: lang === "ar" ? c.nameAr : c.nameEn }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small muted",
								children: [
									lang === "ar" ? c.nameEn : c.nameAr,
									" · ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono",
										children: c.slug
									}),
									" ",
									"· ",
									t("finalb.categories.sortShort", { n: c.sortOrder }),
									" ·",
									" ",
									t("finalb.categories.counts", {
										courses: c.courseCount,
										children: c.childCount
									})
								]
							}),
							" ",
							c.isAcademy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "accent",
								children: t("finalb.categories.academyBadge")
							}) : null
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setForm({
										editing: null,
										initial: blank(c.id)
									}),
									children: t("finalb.categories.addChild")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => setForm({
										editing: c,
										initial: {
											slug: c.slug,
											nameEn: c.nameEn,
											nameAr: c.nameAr,
											parentId: c.parentId,
											isAcademy: c.isAcademy,
											sortOrder: c.sortOrder
										}
									}),
									children: t("common.edit")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "danger",
									onClick: () => {
										del.reset();
										setDeleting(c);
									},
									children: t("common.delete")
								})
							]
						})]
					}, c.id))
				})
			}),
			form && cats.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryForm, {
				list: cats.data,
				editing: form.editing,
				initial: form.initial,
				onClose: () => setForm(null)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!deleting,
				danger: true,
				title: t("finalb.categories.deleteTitle", { name: deleting?.nameEn ?? "" }),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("finalb.categories.deleteBody") }), del.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: del.error instanceof ApiError && del.error.status === 409 ? "warning" : "danger",
					title: t("finalb.categories.cannotDelete"),
					children: categoryError(del.error, t)
				}) : null] }),
				confirmLabel: t("common.delete"),
				loading: del.isPending,
				onCancel: () => setDeleting(null),
				onConfirm: () => deleting && del.mutate(deleting)
			})
		]
	});
}
//#endregion
export { AdminCategoriesPage };

//# sourceMappingURL=CategoriesAdmin-iQpMIwbP.js.map