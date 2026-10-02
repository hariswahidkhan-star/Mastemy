import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { n as PayoutRequestTable, r as StatementDownload } from "./StudioCommerce-C4tMONrc.js";
import { f as qs, i as api, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, n as Notice, r as PageHeader } from "./misc-Bqc6tFVU.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as CStatus, o as commerceError } from "./shared-B2SaZ9p1.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { t as Tabs } from "./Tabs-CKJGcPx4.js";
import { t as InvoicesTable } from "./MeCommerce-CMTNczBH.js";
//#region src/pages/commerce/FinanceConsole.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Validates a partial/full refund amount entered by Finance (the server re-checks against the remaining amount). */
function refundAmountError(raw, t) {
	const n = Number(raw);
	if (raw.trim() === "" || !Number.isFinite(n) || n <= 0) return t("commerce.finance.amountPositive");
	if (!/^\d+(\.\d{1,2})?$/.test(raw.trim())) return t("commerce.finance.amountDecimals");
	return null;
}
function RefundForm({ orderId, onDone }) {
	const { t, fmtMoney } = useI18n();
	const toast = useToast();
	const [order, setOrder] = (0, import_react.useState)(orderId);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [reason, setReason] = (0, import_react.useState)("");
	const [revoke, setRevoke] = (0, import_react.useState)(false);
	const [local, setLocal] = (0, import_react.useState)(null);
	const refund = useApiMutation(() => api(`/api/admin/orders/${order.trim()}/refunds`, {
		method: "POST",
		body: {
			amount: Number(amount),
			reason: reason.trim(),
			revokeEntitlements: revoke
		}
	}), [["finance", "invoices"], ["admin", "refunds"]], (r) => {
		toast.success(t("commerce.finance.refunded", { amount: fmtMoney(r.amount, r.currency) }));
		setAmount("");
		setReason("");
		onDone?.();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "card",
		"aria-labelledby": "refund-h",
		onSubmit: (e) => {
			e.preventDefault();
			const err = !GUID.test(order.trim()) ? t("commerce.finance.orderIdInvalid") : refundAmountError(amount, t);
			setLocal(err);
			if (!err) refund.mutate(void 0);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				id: "refund-h",
				children: t("commerce.finance.refundOrder")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("commerce.finance.refundExplain")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("commerce.finance.orderId"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: order,
						onChange: (e) => setOrder(e.target.value),
						className: "mono",
						required: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("commerce.finance.refundAmount"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: "0.01",
						step: "0.01",
						value: amount,
						onChange: (e) => setAmount(e.target.value),
						required: true
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("orders.reason"),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: reason,
					onChange: (e) => setReason(e.target.value),
					required: true,
					maxLength: 500
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("commerce.finance.revoke"),
				hint: t("commerce.finance.revokeHint"),
				checked: revoke,
				onChange: (e) => setRevoke(e.target.checked)
			}),
			local ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				children: local
			}) : null,
			refund.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(refund.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "form-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: refund.isPending,
					children: t("commerce.finance.issueRefund")
				})
			})
		]
	});
}
function RefundsTab() {
	const { t, fmtMoney, fmtDate } = useI18n();
	const [prefill, setPrefill] = (0, import_react.useState)("");
	const [formKey, setFormKey] = (0, import_react.useState)(0);
	const refunds = useQuery({
		queryKey: [
			"admin",
			"refunds",
			"all"
		],
		queryFn: () => api("/api/admin/refunds")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefundForm, { orderId: prefill }, formKey), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card",
			"aria-labelledby": "refund-list-h",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "refund-list-h",
					children: t("commerce.finance.recentRefunds")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: refunds,
					children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("commerce.finance.noRefunds")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("dashboard.date")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("commerce.finance.orderId")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("commerce.payouts.amount")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("orders.reason")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("dashboard.status")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("common.actions")
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(r.createdAt) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "mono small",
									children: r.orderId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(r.amount, r.currency) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.reason }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: r.status }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => {
										setPrefill(r.orderId);
										setFormKey((k) => k + 1);
									},
									children: t("commerce.finance.refundThis")
								}) })
							] }, r.id)) })]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("commerce.finance.learnerRequestsHint")
				})
			]
		})]
	});
}
function DisputesTab() {
	const { t, fmtMoney, fmtDate } = useI18n();
	const [status, setStatus] = (0, import_react.useState)("");
	const disputes = useQuery({
		queryKey: [
			"finance",
			"disputes",
			status
		],
		queryFn: () => api(`/api/admin/disputes${qs({ status })}`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("commerce.finance.disputesExplain")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("commerce.finance.filterStatus"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: status,
					onChange: (e) => setStatus(e.target.value),
					options: [
						{
							value: "",
							label: t("commerce.common.all")
						},
						{
							value: "Open",
							label: t("commerce.status.Open")
						},
						{
							value: "Won",
							label: t("commerce.status.Won")
						},
						{
							value: "Lost",
							label: t("commerce.status.Lost")
						}
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: disputes,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("commerce.finance.noDisputes")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("dashboard.date")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.dispute")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.orderId")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.payouts.amount")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orders.reason")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("dashboard.status")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(d.createdAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono small",
								children: d.providerDisputeId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono small",
								children: d.orderId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(d.amount, d.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: d.reason || "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: d.status }), d.closedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "small muted",
								children: fmtDate(d.closedAt)
							}) : null] })
						] }, d.id)) })]
					})
				})
			})
		]
	});
}
var isoDay = (d) => d.toISOString().slice(0, 10);
function ReconciliationTab() {
	const { t, fmtMoney } = useI18n();
	const today = /* @__PURE__ */ new Date();
	const [from, setFrom] = (0, import_react.useState)(isoDay(/* @__PURE__ */ new Date(today.getTime() - 25056e5)));
	const [to, setTo] = (0, import_react.useState)(isoDay(today));
	const [range, setRange] = (0, import_react.useState)({
		from,
		to
	});
	const rec = useQuery({
		queryKey: [
			"finance",
			"reconciliation",
			range
		],
		queryFn: () => api(`/api/admin/reconciliation${qs(range)}`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("commerce.finance.reconExplain")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					setRange({
						from,
						to
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.finance.from"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: from,
							onChange: (e) => setFrom(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.finance.to"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: to,
							onChange: (e) => setTo(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "secondary",
						children: t("commerce.finance.show")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: rec,
				children: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: r.mismatchedDays === 0 ? t("commerce.finance.reconOk") : t("commerce.finance.reconMismatch", { n: r.mismatchedDays }) }), r.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("commerce.finance.reconEmpty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "table-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.day")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.prices.currency")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.payments")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.subscriptionPayments")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finalb.recon.platformOnlyPayments")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.ledgerSales")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.salesDiff")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.refunds")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finalb.recon.platformOnlyRefunds")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.reversals")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.refundDiff")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.finance.chargebacks")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("dashboard.status")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: r.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.day }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.currency }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(row.payments, row.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(row.subscriptionPayments, row.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(row.platformOnlyPayments, row.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(row.ledgerSales, row.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(row.salesDifference, row.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(row.refunds, row.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(row.platformOnlyRefunds, row.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(row.ledgerRefundReversals, row.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(row.refundDifference, row.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(row.chargebacks, row.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: row.status }) })
						] }, row.day + row.currency)) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finalb.recon.platformOnlyNote")
					})]
				})] })
			})
		]
	});
}
function PayoutsTab() {
	const { t, fmtDate, fmtMoney } = useI18n();
	const toast = useToast();
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const requests = useQuery({
		queryKey: ["finance", "payout-requests"],
		queryFn: () => api("/api/admin/payout-requests")
	});
	const batches = useQuery({
		queryKey: ["finance", "payout-batches"],
		queryFn: () => api("/api/admin/payout-batches")
	});
	const profiles = useQuery({
		queryKey: ["finance", "payout-profiles"],
		queryFn: () => api("/api/admin/payout-profiles")
	});
	const batch = useApiMutation((ids) => api("/api/admin/payout-requests/batch", {
		method: "POST",
		body: { requestIds: ids }
	}), [["finance", "payout-requests"], ["finance", "payout-batches"]], () => {
		setSelected(/* @__PURE__ */ new Set());
		toast.success(t("commerce.finance.batchCreated"));
	});
	const reject = useApiMutation((id) => api(`/api/admin/payout-requests/${id}/reject`, {
		method: "POST",
		body: { notes: null }
	}), [["finance", "payout-requests"]]);
	const approve = useApiMutation((id) => api(`/api/admin/payout-batches/${id}/approve`, { method: "POST" }), [["finance", "payout-batches"]], () => toast.success(t("commerce.finance.batchApproved")));
	const taxForm = useApiMutation((p) => api(`/api/admin/payout-profiles/${p.userId}/tax-form-status`, {
		method: "PUT",
		body: { status: p.status }
	}), [["finance", "payout-profiles"]]);
	const err = batch.error ?? reject.error ?? approve.error ?? taxForm.error;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(err, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "preq-h",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "preq-h",
						children: t("commerce.payouts.requests")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
						query: requests,
						children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: t("commerce.payouts.noRequests")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayoutRequestTable, {
							list,
							fmtDate,
							select: {
								selected,
								toggle: (id) => setSelected((s) => {
									const n = new Set(s);
									if (n.has(id)) n.delete(id);
									else n.add(id);
									return n;
								})
							},
							actions: (r) => r.status === "Requested" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "danger",
								loading: reject.isPending && reject.variables === r.id,
								onClick: () => reject.mutate(r.id),
								children: t("commerce.common.reject")
							}) : null
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "form-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: selected.size === 0,
							loading: batch.isPending,
							onClick: () => batch.mutate([...selected]),
							children: t("commerce.finance.createBatch", { n: selected.size })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "batch-h",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "batch-h",
						children: t("commerce.finance.batches")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("commerce.finance.batchesExplain")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
						query: batches,
						children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: t("commerce.finance.noBatches")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "stack",
							style: {
								listStyle: "none",
								padding: 0
							},
							children: list.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "card card--flat",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "row row--between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										fmtDate(b.createdAt),
										" ·",
										" ",
										b.lines.map((l) => fmtMoney(l.amount, l.currency)).join(", ") || "—"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: b.status })]
								}), b.status === "Draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									loading: approve.isPending && approve.variables === b.id,
									onClick: () => approve.mutate(b.id),
									children: t("commerce.common.approve")
								}) : null]
							}, b.id))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "pprof-h",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "pprof-h",
					children: t("commerce.finance.profiles")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: profiles,
					children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("commerce.finance.noProfiles")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("commerce.payouts.legalName")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("commerce.payouts.country")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("commerce.payouts.destination")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("commerce.payouts.taxForm")
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.legalName }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.country }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "mono",
									children: p.destinationMasked
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									"aria-label": t("commerce.finance.taxFormFor", { name: p.legalName }),
									value: p.taxFormStatus,
									disabled: taxForm.isPending,
									onChange: (e) => taxForm.mutate({
										userId: p.userId,
										status: e.target.value
									}),
									options: [
										"NotSubmitted",
										"Submitted",
										"Verified",
										"Rejected"
									].map((s) => ({
										value: s,
										label: t(`commerce.status.${s}`)
									}))
								}) })
							] }, p.userId)) })]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "ist-h",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "ist-h",
					children: t("commerce.finance.instructorStatement")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstructorStatement, {})]
			})
		]
	});
}
function InstructorStatement() {
	const { t } = useI18n();
	const [id, setId] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("commerce.finance.instructorId"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: id,
				className: "mono",
				onChange: (e) => setId(e.target.value.trim())
			})
		}), GUID.test(id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatementDownload, { path: `/api/admin/instructors/${id}/statements` }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small muted",
			children: t("commerce.finance.instructorIdHint")
		})]
	});
}
function InvoicesTab() {
	const { t } = useI18n();
	const [year, setYear] = (0, import_react.useState)(String((/* @__PURE__ */ new Date()).getUTCFullYear()));
	const [orderId, setOrderId] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)({
		year,
		orderId: ""
	});
	const invoices = useQuery({
		queryKey: [
			"finance",
			"invoices",
			filter
		],
		queryFn: () => api(`/api/admin/invoices${qs(filter)}`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "row",
			onSubmit: (e) => {
				e.preventDefault();
				setFilter({
					year,
					orderId: GUID.test(orderId.trim()) ? orderId.trim() : ""
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("commerce.payouts.year"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: year,
						onChange: (e) => setYear(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("commerce.finance.orderId"),
					hint: t("commerce.common.optional"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: orderId,
						className: "mono",
						onChange: (e) => setOrderId(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "secondary",
					children: t("commerce.finance.show")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: invoices,
			children: (list) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicesTable, {
				list,
				admin: true
			})
		})]
	});
}
function TaxRatesTab() {
	const { t, fmtDate } = useI18n();
	const rates = useQuery({
		queryKey: ["finance", "tax-rates"],
		queryFn: () => api("/api/admin/tax-rates")
	});
	const [country, setCountry] = (0, import_react.useState)("");
	const [rate, setRate] = (0, import_react.useState)("");
	const save = useApiMutation(() => api(`/api/admin/tax-rates/${country.trim().toUpperCase()}`, {
		method: "PUT",
		body: { ratePercent: Number(rate) }
	}), [["finance", "tax-rates"]], () => {
		setCountry("");
		setRate("");
	});
	const remove = useApiMutation((c) => api(`/api/admin/tax-rates/${c}`, { method: "DELETE" }), [["finance", "tax-rates"]]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("commerce.finance.taxExplain")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					save.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.payouts.country"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: country,
							maxLength: 2,
							onChange: (e) => setCountry(e.target.value.toUpperCase()),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.finance.ratePercent"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "0",
							max: "50",
							step: "0.01",
							value: rate,
							onChange: (e) => setRate(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "secondary",
						loading: save.isPending,
						children: t("commerce.common.save")
					})
				]
			}),
			save.isError || remove.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(save.error ?? remove.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: rates,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("commerce.finance.noTaxRates")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							r.country,
							" · ",
							r.ratePercent,
							"% · ",
							fmtDate(r.updatedAt)
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "danger",
							loading: remove.isPending && remove.variables === r.country,
							onClick: () => remove.mutate(r.country),
							children: t("commerce.common.delete")
						})]
					}, r.country))
				})
			})
		]
	});
}
function AffiliatesTab() {
	const { t } = useI18n();
	const toast = useToast();
	const list = useQuery({
		queryKey: ["finance", "affiliates"],
		queryFn: () => api("/api/admin/affiliates")
	});
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		code: "",
		percent: "10",
		days: "30"
	});
	const create = useApiMutation(() => api("/api/admin/affiliates", {
		method: "POST",
		body: {
			name: form.name.trim(),
			email: form.email.trim(),
			code: form.code.trim(),
			commissionPercent: Number(form.percent),
			attributionWindowDays: Number(form.days)
		}
	}), [["finance", "affiliates"]], () => {
		toast.success(t("commerce.affiliates.created"));
		setForm({
			name: "",
			email: "",
			code: "",
			percent: "10",
			days: "30"
		});
	});
	const toggle = useApiMutation((p) => api(`/api/admin/affiliates/${p.id}/active`, {
		method: "POST",
		body: { active: p.active }
	}), [["finance", "affiliates"]]);
	const origin = typeof window === "undefined" ? "" : window.location.origin;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				"aria-labelledby": "aff-h",
				onSubmit: (e) => {
					e.preventDefault();
					create.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "aff-h",
						children: t("commerce.affiliates.new")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.affiliates.name"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.affiliates.email"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: form.email,
									onChange: (e) => setForm({
										...form,
										email: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.code"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.code,
									onChange: (e) => setForm({
										...form,
										code: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.affiliates.percent"),
								required: true,
								hint: t("commerce.affiliates.percentHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "0.01",
									step: "0.01",
									value: form.percent,
									onChange: (e) => setForm({
										...form,
										percent: e.target.value
									}),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.affiliates.window"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "1",
									max: "90",
									value: form.days,
									onChange: (e) => setForm({
										...form,
										days: e.target.value
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
							children: t("commerce.affiliates.create")
						})
					})
				]
			}),
			toggle.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(toggle.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("commerce.affiliates.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.affiliates.name")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.coupons.code")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.affiliates.percent")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.affiliates.window")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.affiliates.link")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("dashboard.status")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [a.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "small muted",
								children: a.email
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono",
								children: a.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [a.commissionPercent, "%"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t("commerce.affiliates.days", { n: a.attributionWindowDays }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono small",
								children: `${origin}/?aff=${encodeURIComponent(a.code)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								"aria-pressed": a.isActive,
								loading: toggle.isPending && toggle.variables?.id === a.id,
								onClick: () => toggle.mutate({
									id: a.id,
									active: !a.isActive
								}),
								children: a.isActive ? t("commerce.common.deactivate") : t("commerce.common.activate")
							}) })
						] }, a.id)) })]
					})
				})
			})
		]
	});
}
function FinanceConsolePage() {
	const { t } = useI18n();
	const [tab, setTab] = (0, import_react.useState)("refunds");
	usePageMeta(t("commerce.finance.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("commerce.finance.title"),
			subtitle: t("commerce.finance.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
			label: t("commerce.finance.title"),
			value: tab,
			onChange: setTab,
			tabs: [
				{
					id: "refunds",
					label: t("commerce.finance.refundsTab"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefundsTab, {})
				},
				{
					id: "disputes",
					label: t("commerce.finance.disputesTab"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisputesTab, {})
				},
				{
					id: "recon",
					label: t("commerce.finance.reconTab"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReconciliationTab, {})
				},
				{
					id: "payouts",
					label: t("commerce.finance.payoutsTab"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayoutsTab, {})
				},
				{
					id: "invoices",
					label: t("commerce.invoices.title"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicesTab, {})
				},
				{
					id: "tax",
					label: t("commerce.finance.taxTab"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxRatesTab, {})
				},
				{
					id: "affiliates",
					label: t("commerce.affiliates.title"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AffiliatesTab, {})
				}
			]
		})]
	});
}
//#endregion
export { FinanceConsolePage };

//# sourceMappingURL=FinanceConsole-Bhm9hVE2.js.map