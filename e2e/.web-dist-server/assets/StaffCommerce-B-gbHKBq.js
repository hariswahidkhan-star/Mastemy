import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { o as toIso, t as CouponTable } from "./StudioCommerce-C4tMONrc.js";
import { i as api, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, n as Notice, o as QueryStatus, r as PageHeader } from "./misc-Bqc6tFVU.js";
import { n as useApiMutation, r as useCategories } from "./hooks-D70iOwvH.js";
import { t as commerceKeys } from "./commerce-DIIG05BW.js";
import { n as CStatus, o as commerceError } from "./shared-B2SaZ9p1.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { t as Tabs } from "./Tabs-CKJGcPx4.js";
//#region src/pages/commerce/StaffCommerce.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function useApprovedPackages() {
	return useQuery({
		queryKey: [
			"admin",
			"packages",
			"Approved"
		],
		queryFn: () => api("/api/admin/packages?status=Approved")
	});
}
function PlanEditor({ plan }) {
	const { t, fmtMoney } = useI18n();
	const toast = useToast();
	const [name, setName] = (0, import_react.useState)(plan.name);
	const [ai, setAi] = (0, import_react.useState)(String(plan.aiAllowance));
	const [services, setServices] = (0, import_react.useState)(plan.includedServices);
	const save = useApiMutation((body) => api(`/api/admin/plans/${plan.id}`, {
		method: "PUT",
		body
	}), [["admin", "plans"], commerceKeys.plans], () => toast.success(t("commerce.common.saved")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "card card--flat",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
					plan.code,
					" · ",
					fmtMoney(plan.price, plan.currency),
					" / ",
					plan.interval,
					" · ",
					plan.scope
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: plan.isActive ? "Active" : "Inactive" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("commerce.staff.planImmutable")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("commerce.staff.planName"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("commerce.staff.aiAllowance"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: "0",
						value: ai,
						onChange: (e) => setAi(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("commerce.staff.includedServices"),
				hint: t("commerce.staff.servicesHint"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: services,
					onChange: (e) => setServices(e.target.value)
				})
			}),
			save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(save.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					loading: save.isPending,
					onClick: () => save.mutate({
						name: name.trim(),
						aiAllowance: Number(ai),
						includedServices: services
					}),
					children: t("commerce.common.save")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => save.mutate({ isActive: !plan.isActive }),
					children: plan.isActive ? t("commerce.common.deactivate") : t("commerce.common.activate")
				})]
			})
		]
	});
}
function PlansTab() {
	const { t, lang } = useI18n();
	const toast = useToast();
	const cats = useCategories();
	const plans = useQuery({
		queryKey: ["admin", "plans"],
		queryFn: () => api("/api/admin/plans")
	});
	const empty = {
		code: "",
		name: "",
		scope: "AllCourses",
		categoryId: "",
		price: "",
		currency: "USD",
		interval: "month",
		aiAllowance: "0",
		includedServices: ""
	};
	const [f, setF] = (0, import_react.useState)(empty);
	const create = useApiMutation(() => api("/api/admin/plans", {
		method: "POST",
		body: {
			code: f.code.trim(),
			name: f.name.trim(),
			scope: f.scope,
			categoryId: f.scope === "Category" && f.categoryId ? Number(f.categoryId) : null,
			price: Number(f.price),
			currency: f.currency.trim().toUpperCase(),
			interval: f.interval,
			aiAllowance: Number(f.aiAllowance),
			includedServices: f.includedServices
		}
	}), [["admin", "plans"], commerceKeys.plans], () => {
		toast.success(t("commerce.staff.planCreated"));
		setF(empty);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("commerce.staff.planRules")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				"aria-labelledby": "plan-new",
				onSubmit: (e) => {
					e.preventDefault();
					create.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "plan-new",
						children: t("commerce.staff.newPlan")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.planCode"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.code,
									onChange: (e) => setF({
										...f,
										code: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.planName"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.name,
									onChange: (e) => setF({
										...f,
										name: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.scope"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: f.scope,
									onChange: (e) => setF({
										...f,
										scope: e.target.value
									}),
									options: [{
										value: "AllCourses",
										label: t("commerce.plans.scopeAll")
									}, {
										value: "Category",
										label: t("commerce.plans.scopeCategory")
									}]
								})
							}),
							f.scope === "Category" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: cats }) : null,
							f.scope === "Category" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.category"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: f.categoryId,
									onChange: (e) => setF({
										...f,
										categoryId: e.target.value
									}),
									placeholder: t("commerce.common.choose"),
									options: (cats.data ?? []).map((c) => ({
										value: String(c.id),
										label: lang === "ar" ? c.nameAr : c.nameEn
									})),
									required: true
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.price"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "0",
									step: "0.01",
									value: f.price,
									onChange: (e) => setF({
										...f,
										price: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.prices.currency"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.currency,
									maxLength: 3,
									onChange: (e) => setF({
										...f,
										currency: e.target.value.toUpperCase()
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.interval"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: f.interval,
									onChange: (e) => setF({
										...f,
										interval: e.target.value
									}),
									options: [{
										value: "month",
										label: t("commerce.staff.monthly")
									}, {
										value: "year",
										label: t("commerce.staff.yearly")
									}]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.aiAllowance"),
								required: true,
								hint: t("commerce.staff.aiHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "0",
									value: f.aiAllowance,
									onChange: (e) => setF({
										...f,
										aiAllowance: e.target.value
									}),
									required: true
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.staff.includedServices"),
						required: true,
						hint: t("commerce.staff.servicesHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: f.includedServices,
							onChange: (e) => setF({
								...f,
								includedServices: e.target.value
							}),
							required: true
						})
					}),
					create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: commerceError(create.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "form-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							loading: create.isPending,
							children: t("commerce.staff.createPlan")
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: plans,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("commerce.plans.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanEditor, { plan: p }, `${p.id}-${p.name}-${p.aiAllowance}-${p.includedServices}`))
				})
			})
		]
	});
}
function BundlesTab() {
	const { t, fmtMoney } = useI18n();
	const toast = useToast();
	const packages = useApprovedPackages();
	const bundles = useQuery({
		queryKey: [
			...commerceKeys.bundles,
			"admin",
			"all"
		],
		queryFn: () => api("/api/admin/bundles?includeInactive=true")
	});
	const cats = useCategories();
	const [f, setF] = (0, import_react.useState)({
		title: "",
		description: "",
		kind: "Category",
		categoryId: "",
		price: "",
		currency: "USD"
	});
	const [ids, setIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const create = useApiMutation(() => api("/api/admin/bundles", {
		method: "POST",
		body: {
			title: f.title.trim(),
			description: f.description.trim(),
			kind: f.kind,
			categoryId: f.categoryId ? Number(f.categoryId) : null,
			price: Number(f.price),
			currency: f.currency.trim().toUpperCase(),
			packageIds: [...ids]
		}
	}), [commerceKeys.bundles], () => {
		toast.success(t("commerce.staff.bundleCreated"));
		setIds(/* @__PURE__ */ new Set());
		setF({
			...f,
			title: "",
			description: "",
			price: ""
		});
	});
	const status = useApiMutation((p) => api(`/api/admin/bundles/${p.id}/status`, {
		method: "POST",
		body: { active: p.active }
	}), [commerceKeys.bundles]);
	const selectedSum = (packages.data ?? []).filter((p) => ids.has(p.id)).reduce((s, p) => s + p.price, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("commerce.staff.bundleRules")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				"aria-labelledby": "bundle-new",
				onSubmit: (e) => {
					e.preventDefault();
					create.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "bundle-new",
						children: t("commerce.staff.newBundle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.bundleTitle"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.title,
									onChange: (e) => setF({
										...f,
										title: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.bundleKind"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: f.kind,
									onChange: (e) => setF({
										...f,
										kind: e.target.value
									}),
									options: [{
										value: "Category",
										label: t("commerce.staff.kindCategory")
									}, {
										value: "Certification",
										label: t("commerce.staff.kindCertification")
									}]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: cats }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.category"),
								hint: t("commerce.common.optional"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: f.categoryId,
									onChange: (e) => setF({
										...f,
										categoryId: e.target.value
									}),
									placeholder: t("commerce.common.none"),
									options: (cats.data ?? []).map((c) => ({
										value: String(c.id),
										label: c.nameEn
									}))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.price"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "0",
									step: "0.01",
									value: f.price,
									onChange: (e) => setF({
										...f,
										price: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.prices.currency"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.currency,
									maxLength: 3,
									onChange: (e) => setF({
										...f,
										currency: e.target.value.toUpperCase()
									}),
									required: true
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.staff.bundleDescription"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: f.description,
							onChange: (e) => setF({
								...f,
								description: e.target.value
							}),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: t("commerce.staff.bundlePackages") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
								query: packages,
								children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "muted",
									children: t("commerce.staff.noApprovedPackages")
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stack",
									children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										label: `${p.title} · ${p.courseTitle ?? ""} (${fmtMoney(p.price, p.currency)})`,
										checked: ids.has(p.id),
										onChange: () => setIds((s) => {
											const n = new Set(s);
											if (n.has(p.id)) n.delete(p.id);
											else n.add(p.id);
											return n;
										})
									}, p.id))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("commerce.staff.selectedSum", {
									n: ids.size,
									sum: selectedSum.toFixed(2)
								})
							})
						]
					}),
					create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: commerceError(create.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "form-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							loading: create.isPending,
							disabled: ids.size < 2,
							children: t("commerce.staff.createBundle")
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "bundle-active",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "bundle-active",
						children: t("commerce.staff.activeBundles")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finalb.bundles.allNote")
					}),
					status.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: commerceError(status.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
						query: bundles,
						children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: t("commerce.bundles.none")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "stack",
							style: {
								listStyle: "none",
								padding: 0
							},
							children: list.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									b.title,
									" · ",
									fmtMoney(b.price, b.currency),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: b.status })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									loading: status.isPending && status.variables?.id === b.id,
									onClick: () => status.mutate({
										id: b.id,
										active: b.status !== "Active"
									}),
									children: b.status === "Active" ? t("commerce.common.deactivate") : t("finalb.bundles.activate")
								})]
							}, b.id))
						})
					})
				]
			})
		]
	});
}
function OffersTab() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const promos = useQuery({
		queryKey: ["admin", "promotions"],
		queryFn: () => api("/api/admin/promotions")
	});
	const [f, setF] = (0, import_react.useState)({
		name: "",
		percent: "20",
		startsAt: "",
		endsAt: ""
	});
	const create = useApiMutation(() => api("/api/admin/promotions", {
		method: "POST",
		body: {
			name: f.name.trim(),
			percentOff: Number(f.percent),
			startsAt: toIso(f.startsAt),
			endsAt: toIso(f.endsAt)
		}
	}), [["admin", "promotions"]], () => {
		toast.success(t("commerce.staff.offerCreated"));
		setF({
			name: "",
			percent: "20",
			startsAt: "",
			endsAt: ""
		});
	});
	const cancel = useApiMutation((id) => api(`/api/admin/promotions/${id}/cancel`, { method: "POST" }), [["admin", "promotions"]]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("commerce.staff.offerRules")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				"aria-labelledby": "offer-new",
				onSubmit: (e) => {
					e.preventDefault();
					create.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "offer-new",
						children: t("commerce.staff.newOffer")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.offerName"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.name,
									onChange: (e) => setF({
										...f,
										name: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.percentOff"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "5",
									max: "90",
									step: "1",
									value: f.percent,
									onChange: (e) => setF({
										...f,
										percent: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.startsAt"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "datetime-local",
									value: f.startsAt,
									onChange: (e) => setF({
										...f,
										startsAt: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.endsAt"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "datetime-local",
									value: f.endsAt,
									onChange: (e) => setF({
										...f,
										endsAt: e.target.value
									}),
									required: true
								})
							})
						]
					}),
					create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: commerceError(create.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "form-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							loading: create.isPending,
							children: t("commerce.staff.createOffer")
						})
					})
				]
			}),
			cancel.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(cancel.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: promos,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("commerce.offers.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									p.name,
									" · ",
									t("commerce.offers.percent", { n: p.percentOff })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: p.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "small",
								children: [
									t("commerce.offers.window", {
										from: fmtDate(p.startsAt),
										to: fmtDate(p.endsAt)
									}),
									" ",
									"· ",
									t("commerce.staff.optedIn", { n: p.packageIds.length })
								]
							}),
							p.status === "Scheduled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "danger",
								loading: cancel.isPending && cancel.variables === p.id,
								onClick: () => cancel.mutate(p.id),
								children: t("commerce.common.cancel")
							}) : null
						]
					}, p.id))
				})
			})
		]
	});
}
function CouponsTab() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const { user } = useAuth();
	const coupons = useQuery({
		queryKey: ["admin", "coupons"],
		queryFn: () => api("/api/admin/coupons")
	});
	const decide = useApiMutation((p) => api(`/api/admin/coupons/${p.id}/decision`, {
		method: "POST",
		body: {
			decision: p.decision,
			notes: null
		}
	}), [["admin", "coupons"]], (c) => toast.success(t("commerce.staff.couponDecided", { code: c.code })));
	const [f, setF] = (0, import_react.useState)({
		code: "",
		kind: "Scholarship",
		percentOff: "10",
		amountOff: "",
		currency: "",
		scope: "All",
		scopeId: "",
		emails: "",
		domains: "",
		org: "",
		maxRedemptions: "",
		expiresAt: ""
	});
	const list = (v) => v.split(/[\n,;]/).map((s) => s.trim()).filter(Boolean);
	const create = useApiMutation(() => api("/api/admin/coupons", {
		method: "POST",
		body: {
			code: f.code.trim(),
			kind: f.kind,
			percentOff: f.kind === "Percent" ? Number(f.percentOff) : null,
			amountOff: f.kind === "Fixed" ? Number(f.amountOff) : null,
			currency: f.currency.trim().toUpperCase() || null,
			scope: f.scope,
			scopeId: f.scope === "All" ? null : f.scopeId.trim() || null,
			maxRedemptions: f.maxRedemptions ? Number(f.maxRedemptions) : null,
			maxPerUser: 1,
			startsAt: null,
			expiresAt: toIso(f.expiresAt),
			minAmount: null,
			allowedEmails: list(f.emails),
			allowedDomains: list(f.domains),
			allowedOrganizationId: f.org.trim() || null
		}
	}), [["admin", "coupons"]], (c) => {
		toast.success(c.status === "PendingApproval" ? t("commerce.coupons.createdPending", { code: c.code }) : t("commerce.coupons.created", { code: c.code }));
		setF({
			...f,
			code: ""
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				title: t("commerce.staff.secondPersonTitle"),
				children: t("commerce.staff.secondPerson")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				"aria-labelledby": "scoupon-new",
				onSubmit: (e) => {
					e.preventDefault();
					create.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "scoupon-new",
						children: t("commerce.coupons.new")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.code"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.code,
									onChange: (e) => setF({
										...f,
										code: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.kind"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: f.kind,
									onChange: (e) => setF({
										...f,
										kind: e.target.value
									}),
									options: [
										{
											value: "Scholarship",
											label: t("commerce.coupons.kindScholarship")
										},
										{
											value: "Percent",
											label: t("commerce.coupons.kindPercent")
										},
										{
											value: "Fixed",
											label: t("commerce.coupons.kindFixed")
										}
									]
								})
							}),
							f.kind === "Percent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.percentOff"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "0.01",
									max: "99.99",
									step: "0.01",
									value: f.percentOff,
									onChange: (e) => setF({
										...f,
										percentOff: e.target.value
									}),
									required: true
								})
							}) : null,
							f.kind === "Fixed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.amountOff"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "0",
									step: "0.01",
									value: f.amountOff,
									onChange: (e) => setF({
										...f,
										amountOff: e.target.value
									}),
									required: true
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.currency"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.currency,
									maxLength: 3,
									onChange: (e) => setF({
										...f,
										currency: e.target.value.toUpperCase()
									}),
									required: true
								})
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.scope"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: f.scope,
									onChange: (e) => setF({
										...f,
										scope: e.target.value
									}),
									options: [
										"All",
										"Course",
										"Package",
										"Bundle"
									].map((s) => ({
										value: s,
										label: s
									}))
								})
							}),
							f.scope !== "All" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.scopeId"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.scopeId,
									className: "mono",
									onChange: (e) => setF({
										...f,
										scopeId: e.target.value
									}),
									required: true
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.maxRedemptions"),
								hint: t("commerce.common.optional"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "1",
									value: f.maxRedemptions,
									onChange: (e) => setF({
										...f,
										maxRedemptions: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.expiresAt"),
								hint: t("commerce.common.optional"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "datetime-local",
									value: f.expiresAt,
									onChange: (e) => setF({
										...f,
										expiresAt: e.target.value
									})
								})
							})
						]
					}),
					f.kind === "Scholarship" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.allowedEmails"),
								hint: t("commerce.coupons.listHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: f.emails,
									onChange: (e) => setF({
										...f,
										emails: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.allowedDomains"),
								hint: t("commerce.coupons.listHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: f.domains,
									onChange: (e) => setF({
										...f,
										domains: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.orgId"),
								hint: t("commerce.common.optional"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: f.org,
									className: "mono",
									onChange: (e) => setF({
										...f,
										org: e.target.value
									})
								})
							})
						]
					}) : null,
					create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: commerceError(create.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "form-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							loading: create.isPending,
							children: t("commerce.coupons.create")
						})
					})
				]
			}),
			decide.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(decide.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: coupons,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("commerce.coupons.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponTable, {
					list: items,
					fmtDate,
					actions: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [
							c.status === "PendingApproval" ? c.createdBy === user?.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small muted",
								children: t("commerce.staff.ownCoupon")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => decide.mutate({
									id: c.id,
									decision: "Approve"
								}),
								"aria-label": t("commerce.staff.approveCode", { code: c.code }),
								children: t("commerce.common.approve")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => decide.mutate({
									id: c.id,
									decision: "Reject"
								}),
								children: t("commerce.common.reject")
							})] }) : null,
							c.status === "Active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => decide.mutate({
									id: c.id,
									decision: "Disable"
								}),
								children: t("commerce.coupons.disable")
							}) : null,
							c.kind === "Scholarship" && (c.allowedEmails.length > 0 || c.allowedDomains.length > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small muted",
								children: [...c.allowedEmails, ...c.allowedDomains.map((d) => `@${d}`)].slice(0, 3).join(", ").toLowerCase()
							}) : null
						]
					})
				})
			})
		]
	});
}
function PricesTab() {
	const { t, fmtMoney, fmtDate } = useI18n();
	const prices = useQuery({
		queryKey: ["admin", "package-prices"],
		queryFn: () => api("/api/admin/package-prices")
	});
	const packages = useApprovedPackages();
	const byId = new Map((packages.data ?? []).map((p) => [p.id, p]));
	const decide = useApiMutation((p) => api(`/api/admin/package-prices/${p.id}/decision`, {
		method: "POST",
		body: {
			decision: p.decision,
			notes: null
		}
	}), [["admin", "package-prices"]]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("commerce.staff.pricesExplain")
			}),
			decide.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(decide.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: prices,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("commerce.staff.noProposedPrices")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.staff.package")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.prices.amount")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.prices.countries")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("dashboard.date")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("dashboard.status")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("common.actions")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((p) => {
							const pkg = byId.get(p.packageId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: pkg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [pkg.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "small muted",
									children: [
										pkg.courseTitle,
										" ·",
										" ",
										t("commerce.prices.base", { price: fmtMoney(pkg.price, pkg.currency) })
									]
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono small",
									children: p.packageId
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(p.amount, p.currency) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.countries.length ? p.countries.join(", ") : t("commerce.prices.allCountries") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(p.createdAt) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: p.status }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "row",
									children: p.status === "Proposed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => decide.mutate({
											id: p.id,
											decision: "Approve"
										}),
										children: t("commerce.common.approve")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: () => decide.mutate({
											id: p.id,
											decision: "Reject"
										}),
										children: t("commerce.common.reject")
									})] }) : p.status === "Approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: () => decide.mutate({
											id: p.id,
											decision: "Retire"
										}),
										children: t("commerce.staff.retire")
									}) : null
								}) })
							] }, p.id);
						}) })]
					})
				})
			})
		]
	});
}
function StaffCommercePage() {
	const { t } = useI18n();
	const [tab, setTab] = (0, import_react.useState)("plans");
	usePageMeta(t("commerce.staff.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("commerce.staff.title"),
			subtitle: t("commerce.staff.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
			label: t("commerce.staff.title"),
			value: tab,
			onChange: setTab,
			tabs: [
				{
					id: "plans",
					label: t("commerce.plans.title"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlansTab, {})
				},
				{
					id: "bundles",
					label: t("commerce.bundles.title"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BundlesTab, {})
				},
				{
					id: "offers",
					label: t("commerce.offers.title"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OffersTab, {})
				},
				{
					id: "coupons",
					label: t("commerce.staff.couponsTab"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponsTab, {})
				},
				{
					id: "prices",
					label: t("commerce.prices.title"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricesTab, {})
				}
			]
		})]
	});
}
//#endregion
export { StaffCommercePage };

//# sourceMappingURL=StaffCommerce-B-gbHKBq.js.map