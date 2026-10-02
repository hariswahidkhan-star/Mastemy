import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, i as Pagination, n as Notice, r as PageHeader } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as CStatus, o as commerceError } from "./shared-B2SaZ9p1.js";
import { i as Select, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { n as Dialog } from "./Dialog-CcENtYyA.js";
import { c as fbKeys, d as orderQuery, m as useCommercePolicy, n as ORDER_STATUSES, t as EMPTY_ORDER_FILTERS } from "./finalb-tCQ9cZ9j.js";
//#region src/pages/finalb/CommerceB.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Read-only commercial limits for instructors (`GET /api/studio/commerce/policy`). */
function CommercePolicyPanel() {
	const { t, fmtNumber } = useI18n();
	const policy = useCommercePolicy();
	if (policy.isPending) return null;
	if (policy.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "warning",
		children: commerceError(policy.error, t)
	});
	const p = policy.data;
	const rows = [
		["couponMax", `${fmtNumber(p.instructorCouponMaxPercent)}%`],
		["reservation", t("finalb.policy.minutes", { n: p.couponReservationMinutes })],
		["promotionMax", `${fmtNumber(p.promotionMaxPercent)}%`],
		["affiliateMax", `${fmtNumber(p.affiliateMaxPercent)}%`],
		["refundWindow", t("finalb.policy.days", { n: p.refundWindowDays })],
		["share", `${fmtNumber(p.instructorSharePercent)}%`],
		["payoutMin", fmtNumber(p.payoutMinimumAmount)],
		["scholarshipEmails", fmtNumber(p.maxScholarshipEmails)],
		["scholarshipDomains", fmtNumber(p.maxScholarshipDomains)],
		["regionalCountries", fmtNumber(p.maxRegionalCountriesPerPrice)]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "card",
		"data-testid": "commerce-policy",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("finalb.policy.title") }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finalb.policy.note")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "grid-2",
				children: rows.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "small muted",
					children: t(`finalb.policy.${k}`)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					style: { margin: 0 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: v })
				})] }, k))
			})
		]
	});
}
function OrderDetail({ id, onClose }) {
	const { t, fmtMoney, fmtDate } = useI18n();
	const q = useQuery({
		queryKey: fbKeys.order(id),
		queryFn: () => api(`/api/admin/orders/${id}`)
	});
	const [pdfError, setPdfError] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		wide: true,
		title: t("finalb.orders.detailTitle"),
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: q,
			children: (d) => {
				const cur = d.order.currency;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stack",
					"data-testid": "order-detail",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mono small",
							children: d.order.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "small muted",
									children: t("finalb.orders.buyer")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: d.order.buyerEmail })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "small muted",
									children: t("dashboard.status")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: d.order.status }),
									" · ",
									d.order.kind
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "small muted",
									children: t("finalb.orders.total")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
									fmtMoney(d.order.total, cur),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "small muted",
										children: [
											"(",
											t("finalb.orders.list"),
											" ",
											fmtMoney(d.listAmount, cur),
											d.order.discountAmount ? ` · −${fmtMoney(d.order.discountAmount, cur)}` : "",
											")"
										]
									})
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "small muted",
									children: t("finalb.orders.source")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
									d.priceSource ?? "—",
									" · ",
									d.country ?? "—",
									d.order.couponCode ? ` · ${d.order.couponCode}` : ""
								] })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("finalb.orders.items") }), d.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("finalb.orders.none")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: d.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							i.courseTitle,
							" · ",
							fmtMoney(i.unitPrice, cur)
						] }, i.id)) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("finalb.orders.payments") }), d.payments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("finalb.orders.none")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: d.payments.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							p.provider,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono small",
								children: p.providerPaymentId
							}),
							" ·",
							" ",
							fmtMoney(p.amount, p.currency),
							" · ",
							fmtDate(p.createdAt)
						] }, p.id)) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("finalb.orders.refunds") }), d.refunds.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("finalb.orders.none")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: d.refunds.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							fmtMoney(r.amount, cur),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: r.status }),
							" · ",
							r.reason,
							" ·",
							" ",
							fmtDate(r.createdAt),
							r.providerRefundId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mono small",
								children: [" · ", r.providerRefundId]
							}) : null
						] }, r.id)) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("finalb.orders.invoices") }),
							d.invoices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("finalb.orders.none")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: d.invoices.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									i.number,
									" · ",
									i.kind,
									" · ",
									fmtMoney(i.total, i.currency),
									" ·",
									" ",
									fmtDate(i.issuedAt)
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => downloadFile(`/api/admin/invoices/${i.id}/pdf`, `${i.number}.pdf`).catch((e) => setPdfError(commerceError(e, t))),
									children: t("finalb.orders.pdf")
								})]
							}, i.id)) }),
							pdfError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
								tone: "danger",
								children: pdfError
							}) : null
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("finalb.orders.ledger") }), d.ledger.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("finalb.orders.none")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "table-wrap",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "table",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("finalb.orders.kind")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("finalb.orders.gross")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("finalb.orders.instructor")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("finalb.orders.platform")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("finalb.orders.batch")
									})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: d.ledger.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: l.kind }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(l.grossAmount, l.currency) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(l.instructorAmount, l.currency) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(l.platformAmount, l.currency) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "mono small",
										children: l.payoutBatchId ?? "—"
									})
								] }, l.id)) })]
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("finalb.orders.disputes") }), d.disputes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("finalb.orders.none")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: d.disputes.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							fmtMoney(x.amount, x.currency),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: x.status }),
							" ·",
							" ",
							x.reason,
							" · ",
							fmtDate(x.createdAt)
						] }, x.id)) })] })
					]
				});
			}
		})
	});
}
/** `/admin/orders`: Finance/Staff order browser with filters and a detail drawer. */
function OrderBrowserPage() {
	const { t, fmtMoney, fmtDate } = useI18n();
	usePageMeta(t("finalb.orders.title"), void 0, { noindex: true });
	const [draft, setDraft] = (0, import_react.useState)(EMPTY_ORDER_FILTERS);
	const [filters, setFilters] = (0, import_react.useState)(EMPTY_ORDER_FILTERS);
	const [open, setOpen] = (0, import_react.useState)(null);
	const query = orderQuery(filters);
	const list = useQuery({
		queryKey: fbKeys.orders(query),
		queryFn: () => api(`/api/admin/orders${query}`),
		retry: false
	});
	const set = (k) => (e) => setDraft((d) => ({
		...d,
		[k]: e.target.value
	}));
	const submit = (e) => {
		e.preventDefault();
		setFilters({
			...draft,
			page: 1
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("finalb.orders.title"),
				subtitle: t("finalb.orders.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				onSubmit: submit,
				"aria-label": t("finalb.orders.filters"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("dashboard.status"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: draft.status,
								onChange: set("status"),
								placeholder: t("finalb.orders.any"),
								options: ORDER_STATUSES.map((s) => ({
									value: s,
									label: s
								}))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("finalb.orders.email"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								value: draft.email,
								onChange: set("email")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("finalb.orders.courseId"),
							hint: t("finalb.orders.courseIdHint"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.courseId,
								onChange: set("courseId")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("commerce.prices.currency"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.currency,
								maxLength: 3,
								onChange: set("currency")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("finalb.orders.from"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: draft.from,
								onChange: set("from")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("finalb.orders.to"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: draft.to,
								onChange: set("to")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("finalb.orders.coupon"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.coupon,
								onChange: set("coupon")
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: t("finalb.orders.search")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => {
							setDraft(EMPTY_ORDER_FILTERS);
							setFilters(EMPTY_ORDER_FILTERS);
						},
						children: t("finalb.orders.reset")
					})]
				})]
			}),
			list.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(list.error, t)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (p) => p.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("finalb.orders.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finalb.orders.count", { n: p.total })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "table",
							"data-testid": "order-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("finalb.orders.created")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("finalb.orders.buyer")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("dashboard.status")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("finalb.orders.total")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("finalb.orders.coupon")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("common.actions")
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: p.items.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								"data-order-id": o.id,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(o.createdAt) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.buyerEmail }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: o.status }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [fmtMoney(o.total, o.currency), o.refundedAmount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "small muted",
										children: [
											" ",
											"· ",
											t("finalb.orders.refunded"),
											" ",
											fmtMoney(o.refundedAmount, o.currency)
										]
									}) : null] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.couponCode ?? "—" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: () => setOpen(o.id),
										children: t("finalb.orders.view")
									}) })
								]
							}, o.id)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
						page: p.page,
						pageSize: p.pageSize,
						total: p.total,
						onPage: (page) => setFilters((f) => ({
							...f,
							page
						}))
					})
				] })
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderDetail, {
				id: open,
				onClose: () => setOpen(null)
			}) : null
		]
	});
}
//#endregion
export { OrderBrowserPage as n, CommercePolicyPanel as t };

//# sourceMappingURL=CommerceB-Sxam9PIm.js.map