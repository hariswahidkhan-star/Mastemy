import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { i as api, n as ButtonLink, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, n as Notice, o as QueryStatus, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { o as useMySubscriptions, r as useBundles, s as usePlans } from "./commerce-DIIG05BW.js";
import { a as StudyServicesNotice, o as commerceError } from "./shared-B2SaZ9p1.js";
import { n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { i as splitLines, r as newIdempotencyKey } from "./format-B7uvlQ7u.js";
//#region src/pages/commerce/PublicCommerce.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function PlanCard({ plan, current }) {
	const { t, fmtMoney, fmtNumber } = useI18n();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const key = (0, import_react.useRef)(newIdempotencyKey());
	const subscribe = async () => {
		if (!user) {
			navigate(`/login?next=${encodeURIComponent("/plans")}`);
			return;
		}
		setBusy(true);
		setError(null);
		try {
			const res = await api("/api/subscriptions/checkout", {
				method: "POST",
				body: {
					planId: plan.id,
					idempotencyKey: key.current
				}
			});
			window.location.assign(res.checkoutUrl);
		} catch (e) {
			setError(commerceError(e, t));
			setBusy(false);
		}
	};
	const headingId = `plan-${plan.id}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "package",
		"aria-labelledby": headingId,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: headingId,
				style: { marginBlockEnd: "var(--space-2)" },
				children: plan.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "package__price",
				children: t(plan.interval === "year" ? "commerce.plans.perYear" : "commerce.plans.perMonth", { price: fmtMoney(plan.price, plan.currency) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				children: plan.scope === "Category" ? t("commerce.plans.scopeCategory") : t("commerce.plans.scopeAll")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				style: {
					fontWeight: 600,
					marginBlockEnd: "var(--space-1)"
				},
				children: t("commerce.plans.included")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "check-list small",
				children: [splitLines(plan.includedServices).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l }, l)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: plan.aiAllowance > 0 ? t("commerce.plans.aiAllowance", { n: fmtNumber(plan.aiAllowance) }) : t("commerce.plans.noAi") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: plan.renewalTerms
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: plan.freeVideoNotice
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: error
			}) : null,
			current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "success",
				children: t("commerce.plans.current")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => void subscribe(),
				loading: busy,
				style: { inlineSize: "100%" },
				children: t("commerce.plans.subscribe")
			})
		]
	});
}
function SignedInCurrentPlans({ children }) {
	const subs = useMySubscriptions();
	const ids = new Set((subs.data ?? []).filter((s) => s.status === "Active" || s.status === "PastDue").map((s) => s.planId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: subs }), children(ids)] });
}
function PlansPage() {
	const { t } = useI18n();
	const { user } = useAuth();
	const plans = usePlans();
	usePageMeta(t("commerce.plans.title"), t("commerce.plans.subtitle"));
	const grid = (current) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: plans,
		children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("commerce.plans.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid",
			children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
				plan: p,
				current: current.has(p.id)
			}, p.id))
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("commerce.plans.title"),
				subtitle: t("commerce.plans.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyServicesNotice, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginBlockStart: "var(--space-4)" },
				children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedInCurrentPlans, { children: grid }) : grid(/* @__PURE__ */ new Set())
			})
		]
	});
}
function BundlesPage() {
	const { t, fmtMoney } = useI18n();
	const bundles = useBundles();
	usePageMeta(t("commerce.bundles.title"), t("commerce.bundles.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("commerce.bundles.title"),
				subtitle: t("commerce.bundles.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyServicesNotice, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginBlockStart: "var(--space-4)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: bundles,
					children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("commerce.bundles.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid",
						children: list.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "package",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/bundles/${b.id}`,
									children: b.title
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "package__price",
									children: fmtMoney(b.price, b.currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "small muted",
									children: t("commerce.bundles.components", { n: b.components.length })
								})
							]
						}, b.id))
					})
				})
			})
		]
	});
}
function BundleDetailPage() {
	const { id = "" } = useParams();
	const { t, fmtMoney } = useI18n();
	const bundles = useBundles();
	const bundle = bundles.data?.find((b) => b.id === id);
	usePageMeta(bundle?.title ?? t("commerce.bundles.title"), bundle?.description);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		style: { maxInlineSize: 820 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: bundles,
			children: () => !bundle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: t("commerce.bundles.notFound"),
				action: {
					label: t("commerce.bundles.title"),
					to: "/bundles"
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: bundle.title,
					subtitle: bundle.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyServicesNotice, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card",
					style: { marginBlockStart: "var(--space-4)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("commerce.bundles.contents") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "stack",
							style: {
								listStyle: "none",
								padding: 0
							},
							children: bundle.components.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "card card--flat",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "row row--between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtMoney(c.listPrice, bundle.currency) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "check-list small",
										children: splitLines(c.contents).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l }, l))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "small muted",
										children: t("course.accessTerm", { days: c.accessDays })
									})
								]
							}, c.packageId))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("commerce.bundles.separately", { amount: fmtMoney(bundle.componentsListTotal, bundle.currency) }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "package__price",
							children: fmtMoney(bundle.price, bundle.currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: bundle.freeVideoNotice
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: `/checkout/bundle/${bundle.id}`,
							children: t("commerce.bundles.buy")
						})
					]
				})
			] })
		})
	});
}
function GiftRedeemPage() {
	const { t, fmtDate } = useI18n();
	const [params] = useSearchParams();
	const [code, setCode] = (0, import_react.useState)(params.get("code") ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(null);
	usePageMeta(t("commerce.gift.redeemTitle"), void 0, { noindex: true });
	const redeem = async () => {
		setBusy(true);
		setError(null);
		try {
			setDone(await api("/api/gifts/redeem", {
				method: "POST",
				body: { code: code.trim() }
			}));
		} catch (e) {
			setError(commerceError(e, t));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		style: { maxInlineSize: 560 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("commerce.gift.redeemTitle"),
				subtitle: t("commerce.gift.redeemSubtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyServicesNotice, {}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				tone: "success",
				title: t("commerce.gift.redeemed"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("commerce.gift.redeemedBody", { date: fmtDate(done.endsAt) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/me",
					children: t("nav.dashboard")
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				style: { marginBlockStart: "var(--space-4)" },
				onSubmit: (e) => {
					e.preventDefault();
					if (code.trim()) redeem();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("commerce.gift.code"),
					required: true,
					error: error ?? void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: code,
						autoComplete: "off",
						onChange: (e) => setCode(e.target.value),
						required: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "form-actions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: busy,
						disabled: !code.trim(),
						children: t("commerce.gift.redeem")
					})
				})]
			})
		]
	});
}
//#endregion
export { BundleDetailPage, BundlesPage, GiftRedeemPage, PlansPage };

//# sourceMappingURL=PublicCommerce-DCAW1f6m.js.map