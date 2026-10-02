import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { i as api, n as ButtonLink, r as ApiError, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, n as Notice, r as PageHeader } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { a as useMyOrders, i as useMyInvoices, n as problemCode, o as useMySubscriptions, t as commerceKeys } from "./commerce-DIIG05BW.js";
import { a as StudyServicesNotice, n as CStatus, o as commerceError } from "./shared-B2SaZ9p1.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, n as Field } from "./Field-Di1lkoGg.js";
import { n as Dialog, t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
//#region src/pages/commerce/MeCommerce.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Downloads an invoice/credit-note PDF; 503 invoicing_not_configured becomes an explanation, not a failure toast. */
async function downloadInvoice(inv, admin, t) {
	try {
		await downloadFile(`/api/${admin ? "admin" : "me"}/invoices/${inv.id}/pdf`, `${inv.number}.pdf`);
		return null;
	} catch (e) {
		if (e instanceof ApiError && problemCode(e) === "invoicing_not_configured") return t("commerce.invoices.notConfigured");
		return commerceError(e, t);
	}
}
function InvoicesTable({ list, admin }) {
	const { t, fmtDate, fmtMoney } = useI18n();
	const [problem, setProblem] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	if (list.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "muted",
		children: t("commerce.invoices.none")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [problem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "warning",
		children: problem
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "table-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.invoices.number")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.invoices.kind")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.invoices.issued")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.invoices.total")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("common.actions")
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "mono",
					children: inv.number
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: inv.kind === "CreditNote" ? t("commerce.invoices.creditNote") : t("commerce.invoices.invoice") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(inv.issuedAt) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(inv.total, inv.currency) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					loading: busy === inv.id,
					"aria-label": t("commerce.invoices.downloadNamed", { number: inv.number }),
					onClick: () => {
						setBusy(inv.id);
						setProblem(null);
						downloadInvoice(inv, !!admin, t).then((p) => {
							setProblem(p);
							setBusy(null);
						});
					},
					children: t("commerce.invoices.download")
				}) })
			] }, inv.id)) })]
		})
	})] });
}
function GiftCodeButton({ order }) {
	const { t } = useI18n();
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const reveal = async () => {
		setBusy(true);
		setError(null);
		try {
			setResult(await api(`/api/me/orders/${order.id}/gift-code`));
			setConfirm(false);
		} catch (e) {
			setError(e instanceof ApiError && e.status === 404 ? t("commerce.gift.notAGift") : commerceError(e, t));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "ghost",
			onClick: () => setConfirm(true),
			children: t("commerce.gift.showCode")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: confirm,
			title: t("commerce.gift.showCode"),
			body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("commerce.gift.showOnce") }), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				children: error
			}) : null] }),
			confirmLabel: t("commerce.gift.reveal"),
			loading: busy,
			onCancel: () => {
				setConfirm(false);
				setError(null);
			},
			onConfirm: () => void reveal()
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!result,
			title: t("commerce.gift.codeTitle"),
			onClose: () => setResult(null),
			children: result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mono",
					style: { fontSize: "1.25rem" },
					"data-testid": "gift-code",
					children: result.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					children: result.notice
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("commerce.gift.redeemAt", { path: "/gift/redeem" })
				})
			] }) : null
		})
	] });
}
function OrdersTable() {
	const { t, fmtDate, fmtMoney } = useI18n();
	const toast = useToast();
	const orders = useMyOrders();
	const [refunding, setRefunding] = (0, import_react.useState)(null);
	const request = useApiMutation((p) => api(`/api/me/orders/${p.id}/refund-request`, {
		method: "POST",
		body: { reason: p.reason }
	}), [commerceKeys.orders], () => {
		setRefunding(null);
		toast.success(t("orders.refundRequested"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: orders,
		children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: t("orders.none"),
			action: {
				label: t("courses.title"),
				to: "/courses"
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "table-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("dashboard.date")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("orders.items")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("orders.total")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("dashboard.status")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("common.actions")
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					"data-order-id": o.id,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(o.paidAt ?? o.createdAt) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.items.length === 0 ? t("commerce.orders.subscriptionOrder") : o.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							i.packageTitle,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small muted",
								children: ["· ", i.courseTitle]
							})
						] }, i.packageId)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(o.total, o.currency) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: o.status }),
							" ",
							o.isGift ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small",
								"data-testid": "gift-status",
								children: [
									t("finalb.orders.gift"),
									o.giftStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: o.giftStatus })] }) : null,
									" "
								]
							}) : null,
							o.refundStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small",
								children: [
									t("commerce.orders.refundStatus"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: o.refundStatus })
								]
							}) : null
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [
								o.refundEligible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => setRefunding({
										order: o,
										reason: ""
									}),
									children: t("orders.requestRefund")
								}) : null,
								o.isGift && o.status === "Paid" && o.giftStatus === "Active" && !o.giftCodeRevealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftCodeButton, { order: o }) : null,
								o.isGift && o.giftCodeRevealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted",
									children: t("finalb.orders.codeRevealed")
								}) : null
							]
						}) })
					]
				}, o.id)) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!refunding,
				title: t("orders.requestRefund"),
				body: refunding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("commerce.orders.refundRemaining")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("orders.reason"),
						required: true,
						hint: t("commerce.orders.reasonHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: refunding.reason,
							maxLength: 500,
							onChange: (e) => setRefunding({
								...refunding,
								reason: e.target.value
							})
						})
					}),
					request.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: commerceError(request.error, t)
					}) : null
				] }) : null,
				confirmLabel: t("orders.submitRefund"),
				loading: request.isPending,
				onCancel: () => setRefunding(null),
				onConfirm: () => {
					if (refunding && refunding.reason.trim().length >= 3) request.mutate({
						id: refunding.order.id,
						reason: refunding.reason.trim()
					});
				}
			})]
		})
	});
}
function OrdersPage() {
	const { t } = useI18n();
	const [params] = useSearchParams();
	const invoices = useMyInvoices();
	usePageMeta(t("commerce.orders.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("commerce.orders.title"),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/gift/redeem",
					variant: "secondary",
					children: t("commerce.gift.redeemTitle")
				})
			}),
			params.get("paid") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "success",
				title: t("commerce.orders.paidTitle"),
				children: t("commerce.orders.paidBody")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyServicesNotice, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				style: { marginBlockStart: "var(--space-4)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card",
					"aria-labelledby": "orders-h",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "orders-h",
						children: t("orders.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersTable, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card",
					"aria-labelledby": "invoices-h",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "invoices-h",
						children: t("commerce.invoices.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
						query: invoices,
						children: (list) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicesTable, { list })
					})]
				})]
			})
		]
	});
}
function SubscriptionRow({ sub }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const change = useApiMutation((cancel) => api(`/api/me/subscriptions/${sub.id}/${cancel ? "cancel" : "resume"}`, { method: "POST" }), [commerceKeys.subscriptions], (_r, cancel) => {
		setConfirm(false);
		toast.success(cancel ? t("commerce.subs.cancelled") : t("commerce.subs.resumed"));
	});
	const live = sub.status === "Active" || sub.status === "PastDue";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "card card--flat",
		"data-testid": "subscription",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: sub.planName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: sub.status })]
			}),
			sub.status === "PastDue" && sub.graceUntil ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				title: t("commerce.subs.graceTitle"),
				children: t("commerce.subs.grace", { date: fmtDate(sub.graceUntil) })
			}) : null,
			live && sub.currentPeriodEnd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: sub.cancelAtPeriodEnd ? t("commerce.subs.endsOn", { date: fmtDate(sub.currentPeriodEnd) }) : t("commerce.subs.renewsOn", { date: fmtDate(sub.currentPeriodEnd) }) }) : null,
			sub.endedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("commerce.subs.endedOn", { date: fmtDate(sub.endedAt) }) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: sub.renewalTerms
			}),
			change.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(change.error, t)
			}) : null,
			live ? sub.cancelAtPeriodEnd ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				loading: change.isPending,
				onClick: () => change.mutate(false),
				children: t("commerce.subs.resume")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: () => setConfirm(true),
				children: t("commerce.subs.cancel")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirm,
				danger: true,
				title: t("commerce.subs.cancel"),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("commerce.subs.cancelExplain", { date: sub.currentPeriodEnd ? fmtDate(sub.currentPeriodEnd) : "—" }) }),
				confirmLabel: t("commerce.subs.confirmCancel"),
				loading: change.isPending,
				onCancel: () => setConfirm(false),
				onConfirm: () => change.mutate(true)
			})
		]
	});
}
/** Subscription management on /me. */
function SubscriptionsSection() {
	const { t } = useI18n();
	const subs = useMySubscriptions();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		"aria-labelledby": "subs-h",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "row row--between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "subs-h",
				children: t("commerce.subs.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/me/orders",
				children: t("commerce.orders.title")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: subs,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "muted",
				children: [
					t("commerce.subs.none"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/plans",
						children: t("commerce.plans.title")
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "stack",
				style: {
					listStyle: "none",
					padding: 0
				},
				children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionRow, { sub: s }, s.id))
			})
		})]
	});
}
//#endregion
export { downloadInvoice as i, OrdersPage as n, SubscriptionsSection as r, InvoicesTable as t };

//# sourceMappingURL=MeCommerce-CMTNczBH.js.map