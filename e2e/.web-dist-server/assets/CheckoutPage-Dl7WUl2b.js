import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, n as Notice, r as PageHeader, u as Spinner } from "./misc-Bqc6tFVU.js";
import { n as problemCode, r as useBundles } from "./commerce-DIIG05BW.js";
import { a as StudyServicesNotice, c as readAttribution, i as PriceLine, o as commerceError, r as OfferBadge, s as forgetAttribution } from "./shared-B2SaZ9p1.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { i as splitLines, r as newIdempotencyKey } from "./format-B7uvlQ7u.js";
import { h as useCurrencyOptions, o as currencyChoices } from "./finalb-tCQ9cZ9j.js";
//#region src/pages/commerce/CheckoutPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var COUNTRY = /^[A-Za-z]{2}$/;
/** Base price view (title, services) plus the sellable currencies listed by the server. */
function useAvailableCurrencies(packageId, country) {
	const base = useQuery({
		queryKey: [
			"commerce",
			"price",
			packageId,
			"",
			""
		],
		queryFn: () => api(`/api/packages/${packageId}/price`),
		enabled: !!packageId,
		retry: false,
		staleTime: 6e4
	});
	const options = useCurrencyOptions(packageId);
	return {
		base: packageId ? base : void 0,
		currencies: currencyChoices(options.data ?? [], country),
		pending: options.isPending && !!packageId,
		error: options.isError ? options.error : null
	};
}
function CheckoutPage({ kind }) {
	const { id = "" } = useParams();
	const [params] = useSearchParams();
	const { t, fmtMoney } = useI18n();
	const navigate = useNavigate();
	usePageMeta(t("commerce.checkout.title"), void 0, { noindex: true });
	const [currency, setCurrency] = (0, import_react.useState)("");
	const [countryDraft, setCountryDraft] = (0, import_react.useState)("");
	const [country, setCountry] = (0, import_react.useState)("");
	const [couponDraft, setCouponDraft] = (0, import_react.useState)("");
	const [coupon, setCoupon] = (0, import_react.useState)("");
	const [couponError, setCouponError] = (0, import_react.useState)(null);
	const [checkingCoupon, setCheckingCoupon] = (0, import_react.useState)(false);
	const [gift, setGift] = (0, import_react.useState)(kind === "package" && params.get("gift") === "1");
	const [recipientEmail, setRecipientEmail] = (0, import_react.useState)("");
	const [giftMessage, setGiftMessage] = (0, import_react.useState)("");
	const [billingName, setBillingName] = (0, import_react.useState)("");
	const [attribution, setAttribution] = (0, import_react.useState)(() => readAttribution());
	const [attributionNotice, setAttributionNotice] = (0, import_react.useState)(null);
	const [payError, setPayError] = (0, import_react.useState)(null);
	const [paying, setPaying] = (0, import_react.useState)(false);
	const avail = useAvailableCurrencies(kind === "package" ? id : void 0, country);
	const bundles = useBundles();
	const bundle = kind === "bundle" ? bundles.data?.find((b) => b.id === id) : void 0;
	const input = (0, import_react.useMemo)(() => ({
		...kind === "package" ? { packageId: id } : { bundleId: id },
		...currency ? { currency } : {},
		...country ? { country } : {},
		...coupon ? { couponCode: coupon } : {},
		...attribution.referralCode ? { referralCode: attribution.referralCode } : {},
		...attribution.affiliateClickId ? { affiliateClickId: attribution.affiliateClickId } : {},
		...gift ? { gift: true } : {}
	}), [
		kind,
		id,
		currency,
		country,
		coupon,
		attribution,
		gift
	]);
	const quote = useQuery({
		queryKey: [
			"commerce",
			"quote",
			input
		],
		queryFn: () => api("/api/checkout/quote", {
			method: "POST",
			body: input
		}),
		retry: false
	});
	(0, import_react.useEffect)(() => {
		if (!quote.isError) return;
		const code = problemCode(quote.error);
		if (code.startsWith("referral_") && attribution.referralCode) {
			forgetAttribution("referral");
			setAttribution(readAttribution());
			setAttributionNotice(t("commerce.checkout.referralDropped"));
		} else if (code.startsWith("affiliate_") && attribution.affiliateClickId) {
			forgetAttribution("affiliate");
			setAttribution(readAttribution());
			setAttributionNotice(t("commerce.checkout.affiliateDropped"));
		}
	}, [
		quote.isError,
		quote.error,
		attribution,
		t
	]);
	const keyRef = (0, import_react.useRef)(null);
	const idempotencyKey = (sig) => {
		if (!keyRef.current || keyRef.current.sig !== sig) keyRef.current = {
			sig,
			key: newIdempotencyKey()
		};
		return keyRef.current.key;
	};
	const applyCoupon = async () => {
		const code = couponDraft.trim();
		if (!code) return;
		setCheckingCoupon(true);
		setCouponError(null);
		try {
			await api("/api/checkout/quote", {
				method: "POST",
				body: {
					...input,
					couponCode: code
				}
			});
			setCoupon(code);
		} catch (e) {
			setCouponError(commerceError(e, t));
		} finally {
			setCheckingCoupon(false);
		}
	};
	const pay = async () => {
		setPaying(true);
		setPayError(null);
		const body = {
			...input,
			gift: void 0,
			idempotencyKey: "",
			...billingName.trim() ? { billingName: billingName.trim() } : {},
			...gift ? { gift: {
				...recipientEmail.trim() ? { recipientEmail: recipientEmail.trim() } : {},
				...giftMessage.trim() ? { message: giftMessage.trim() } : {}
			} } : {}
		};
		body.idempotencyKey = idempotencyKey(JSON.stringify({
			...body,
			idempotencyKey: ""
		}));
		try {
			const res = await api("/api/checkout", {
				method: "POST",
				body
			});
			if (res.checkoutUrl) window.location.assign(res.checkoutUrl);
			else navigate(`/me/orders?paid=${res.orderId}`);
		} catch (e) {
			setPayError(commerceError(e, t));
		} finally {
			setPaying(false);
		}
	};
	const base = avail.base?.data;
	const title = kind === "package" ? base?.title ?? t("commerce.checkout.title") : bundle?.title ?? "";
	if (kind === "package" && avail.base?.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
		label: t("common.loading"),
		block: true
	});
	if (kind === "package" && avail.base?.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: commerceError(avail.base.error, t)
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		style: { maxInlineSize: 760 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("commerce.checkout.title"),
				subtitle: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyServicesNotice, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				style: { marginBlockStart: "var(--space-4)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card",
						"aria-labelledby": "co-what",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "co-what",
							children: t("commerce.checkout.whatYouGet")
						}), kind === "package" && base ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "check-list small",
							children: splitLines(base.includedServices).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l }, l))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("course.accessTerm", { days: base.accessDays })
						})] }) : bundle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "check-list small",
							children: bundle.components.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								c.title,
								" · ",
								fmtMoney(c.listPrice, bundle.currency)
							] }, c.packageId))
						}) : bundles.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: t("common.loading") }) : null]
					}),
					kind === "package" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card",
						"aria-labelledby": "co-region",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "co-region",
								children: t("commerce.checkout.region")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("commerce.checkout.country"),
									hint: t("commerce.checkout.countryHint"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: countryDraft,
										maxLength: 2,
										autoComplete: "country",
										onChange: (e) => setCountryDraft(e.target.value.toUpperCase()),
										onBlur: () => {
											const c = countryDraft.trim();
											if (c === "" || COUNTRY.test(c)) setCountry(c);
										}
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("commerce.checkout.currency"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										value: currency,
										onChange: (e) => setCurrency(e.target.value),
										options: [{
											value: "",
											label: t("commerce.checkout.defaultCurrency", { currency: base?.currency ?? "" })
										}, ...avail.currencies.filter((c) => c.currency !== base?.currency).map((c) => ({
											value: c.value,
											label: c.countries.length ? t("finalb.checkout.regionalOption", {
												currency: c.currency,
												amount: fmtMoney(c.amount, c.currency),
												countries: c.countries.join(", ")
											}) : `${c.currency} · ${fmtMoney(c.amount, c.currency)}`
										}))]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: avail.pending ? t("common.loading") : avail.error ? commerceError(avail.error, t) : t("commerce.checkout.currencyNote")
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card",
						"aria-labelledby": "co-coupon",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "co-coupon",
							children: t("commerce.checkout.coupon")
						}), coupon ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("commerce.checkout.couponApplied", { code: coupon }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => {
									setCoupon("");
									setCouponDraft("");
								},
								children: t("commerce.checkout.removeCoupon")
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "row",
							onSubmit: (e) => {
								e.preventDefault();
								applyCoupon();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.checkout.couponCode"),
								error: couponError ?? void 0,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: couponDraft,
									onChange: (e) => setCouponDraft(e.target.value)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								variant: "secondary",
								loading: checkingCoupon,
								disabled: !couponDraft.trim(),
								children: t("commerce.checkout.apply")
							})]
						})]
					}),
					kind === "package" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card",
						"aria-labelledby": "co-gift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "co-gift",
								children: t("commerce.gift.title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								label: t("commerce.gift.buyAsGift"),
								checked: gift,
								onChange: (e) => setGift(e.target.checked)
							}),
							gift ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "stack",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "small muted",
										children: t("commerce.gift.explain")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: t("commerce.gift.recipientEmail"),
										hint: t("commerce.gift.recipientHint"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "email",
											value: recipientEmail,
											onChange: (e) => setRecipientEmail(e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: t("commerce.gift.message"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											value: giftMessage,
											maxLength: 500,
											onChange: (e) => setGiftMessage(e.target.value)
										})
									})
								]
							}) : null
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card",
						"aria-labelledby": "co-sum",
						"aria-live": "polite",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "co-sum",
								children: t("commerce.checkout.summary")
							}),
							attributionNotice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
								tone: "info",
								children: attributionNotice
							}) : null,
							attribution.referralCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("commerce.checkout.referralUsed", { code: attribution.referralCode })
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
								query: quote,
								children: (q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stack",
									"data-testid": "quote",
									children: [
										q.offerEndsAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferBadge, { endsAt: q.offerEndsAt }) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
											className: "facts",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("commerce.checkout.listPrice") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtMoney(q.listAmount, q.currency) })] }), q.discount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("commerce.checkout.discount") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["−", fmtMoney(q.discount, q.currency)] })] }) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "small muted",
											children: t("commerce.checkout.total")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceLine, {
											amount: q.amount,
											currency: q.currency,
											compareAt: q.compareAtAmount
										})] }),
										q.amount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
											tone: "success",
											children: t("commerce.checkout.noPaymentNeeded")
										}) : null
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.checkout.billingName"),
								hint: t("commerce.checkout.billingHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: billingName,
									maxLength: 200,
									autoComplete: "name",
									onChange: (e) => setBillingName(e.target.value)
								})
							}),
							payError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
								tone: "danger",
								children: payError
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => void pay(),
									loading: paying,
									disabled: !quote.isSuccess,
									children: quote.data?.amount === 0 ? t("commerce.checkout.confirmFree") : t("commerce.checkout.pay")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/me/orders",
									children: t("commerce.orders.title")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("commerce.checkout.serverPrice")
							})
						]
					})
				]
			})
		]
	});
}
function PackageCheckoutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutPage, { kind: "package" });
}
function BundleCheckoutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutPage, { kind: "bundle" });
}
//#endregion
export { BundleCheckoutPage, CheckoutPage, PackageCheckoutPage };

//# sourceMappingURL=CheckoutPage-Dl7WUl2b.js.map