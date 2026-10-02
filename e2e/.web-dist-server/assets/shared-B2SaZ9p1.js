import { _ as require_react, b as __toESM, i as require_jsx_runtime, p as useLocation, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { i as api } from "./Button-6CizQUWS.js";
import { l as errorMessage, n as Notice, t as Badge } from "./misc-Bqc6tFVU.js";
import { n as problemCode } from "./commerce-DIIG05BW.js";
//#region src/lib/attribution.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Referral / affiliate attribution captured from `?ref=` and `?aff=` and handed to checkout. Stored in
* sessionStorage only (cookie-less; ends with the tab). Every storage access is guarded: private modes and
* blocked storage must never break the page, and SSR has no `window`.
*/
var KEY = "mastemy.attribution";
var CODE = /^[A-Za-z0-9_-]{2,64}$/;
function storage() {
	try {
		return typeof window === "undefined" ? null : window.sessionStorage;
	} catch {
		return null;
	}
}
function readAttribution(now = /* @__PURE__ */ new Date()) {
	const s = storage();
	if (!s) return {};
	try {
		const raw = s.getItem(KEY);
		if (!raw) return {};
		const a = JSON.parse(raw);
		if (typeof a !== "object" || a === null) return {};
		if (a.affiliateExpiresAt && new Date(a.affiliateExpiresAt).getTime() <= now.getTime()) {
			delete a.affiliateClickId;
			delete a.affiliateExpiresAt;
			delete a.affiliateCode;
		}
		return a;
	} catch {
		return {};
	}
}
function writeAttribution(a) {
	const s = storage();
	if (!s) return;
	try {
		if (Object.keys(a).length === 0) s.removeItem(KEY);
		else s.setItem(KEY, JSON.stringify(a));
	} catch {}
}
/** Drops one part of the attribution (e.g. after the server rejected a referral code for this purchase). */
function forgetAttribution(part) {
	const a = readAttribution();
	if (part === "referral") delete a.referralCode;
	else {
		delete a.affiliateClickId;
		delete a.affiliateExpiresAt;
		delete a.affiliateCode;
	}
	writeAttribution(a);
}
/** Parses `?ref=` / `?aff=` from a query string; invalid codes are ignored. */
function parseAttributionParams(search) {
	const p = new URLSearchParams(search);
	const ref = p.get("ref")?.trim();
	const aff = p.get("aff")?.trim();
	return {
		ref: ref && CODE.test(ref) ? ref : void 0,
		aff: aff && CODE.test(aff) ? aff : void 0
	};
}
/** Builds the shareable course link carrying a referral code. */
function referralLink(origin, slug, code) {
	return `${origin.replace(/\/$/, "")}/courses/${encodeURIComponent(slug)}?ref=${encodeURIComponent(code)}`;
}
//#endregion
//#region src/pages/commerce/shared.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Translated message for a commerce problem code, falling back to the generic error text. */
function commerceError(e, t) {
	const code = problemCode(e);
	if (code) {
		const key = `commerce.errors.${code}`;
		const msg = t(key);
		if (msg !== key) return msg;
	}
	return errorMessage(e, t);
}
var TONES = {
	Active: "success",
	Paid: "success",
	Approved: "success",
	Completed: "success",
	Verified: "success",
	Won: "success",
	ok: "success",
	Scheduled: "info",
	Proposed: "warning",
	PendingApproval: "warning",
	Pending: "warning",
	Requested: "warning",
	Submitted: "warning",
	Open: "warning",
	PastDue: "warning",
	Draft: "neutral",
	Lost: "danger",
	Rejected: "danger",
	Failed: "danger",
	mismatch: "danger",
	Disabled: "neutral",
	Canceled: "neutral",
	Cancelled: "neutral",
	Ended: "neutral",
	Retired: "neutral",
	Inactive: "neutral"
};
/** Status badge for commerce enums; unknown values are shown verbatim rather than as a missing key. */
function CStatus({ status }) {
	const { t } = useI18n();
	const key = `commerce.status.${status}`;
	const label = t(key);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: TONES[status] ?? "neutral",
		children: label === key ? status : label
	});
}
/** Spec §2: shown on every purchase surface. */
function StudyServicesNotice() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "info",
		title: t("commerce.notice.title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: { margin: 0 },
			children: t("commerce.notice.body")
		})
	});
}
/** Scheduled offer badge with its real end time; deliberately no countdown. */
function OfferBadge({ name, endsAt }) {
	const { t, lang } = useI18n();
	const d = new Date(endsAt);
	const when = Number.isNaN(d.getTime()) ? endsAt : new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en", {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "UTC"
	}).format(d);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "accent",
		children: name ? t("commerce.offer.named", {
			name,
			when
		}) : t("commerce.offer.endsAt", { when })
	});
}
/** Regular / compare-at / sale price. Compare-at only when the server says it is honest (non-null). */
function PriceLine({ amount, currency, compareAt }) {
	const { t, fmtMoney } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "package__price",
		"data-testid": "price",
		children: [compareAt != null && compareAt > amount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("s", {
			"aria-label": t("commerce.price.compareAt", { amount: fmtMoney(compareAt, currency) }),
			children: fmtMoney(compareAt, currency)
		}), " "] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtMoney(amount, currency) })]
	});
}
/** Captures `?ref=` / `?aff=` once per value into sessionStorage (affiliate codes become a server click id). */
function AttributionCapture() {
	const { search } = useLocation();
	const seen = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		const { ref, aff } = parseAttributionParams(search);
		if (!ref && !aff) return;
		const sig = `${ref ?? ""}|${aff ?? ""}`;
		if (seen.current === sig) return;
		seen.current = sig;
		const current = readAttribution();
		if (ref) writeAttribution({
			...current,
			referralCode: ref
		});
		if (aff && aff !== current.affiliateCode) api("/api/affiliates/clicks", {
			method: "POST",
			body: { code: aff }
		}).then((click) => writeAttribution({
			...readAttribution(),
			affiliateCode: aff,
			affiliateClickId: click.clickId,
			affiliateExpiresAt: click.attributionExpiresAt
		})).catch(() => {});
	}, [search]);
	return null;
}
//#endregion
export { StudyServicesNotice as a, readAttribution as c, PriceLine as i, referralLink as l, CStatus as n, commerceError as o, OfferBadge as r, forgetAttribution as s, AttributionCapture as t };

//# sourceMappingURL=shared-B2SaZ9p1.js.map