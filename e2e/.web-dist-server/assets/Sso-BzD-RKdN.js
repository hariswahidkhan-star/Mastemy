import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { c as getAccessToken, o as apiUrl, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { n as Notice, r as PageHeader, u as Spinner } from "./misc-Bqc6tFVU.js";
import { n as problemCode } from "./commerce-DIIG05BW.js";
import { n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { f as safeReturnTo, i as SSO_ERROR_CODES, r as ORG_SLUG } from "./finalb-tCQ9cZ9j.js";
//#region src/pages/finalb/Sso.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Codes added with domain verification, explicit account linking and browser binding. */
var MORE_SSO_ERROR_CODES = [
	"sso_link_required",
	"sso_session_mismatch",
	"sso_link_email_mismatch",
	"sso_identity_in_use",
	"sso_already_linked",
	"sso_account_suspended",
	"sso_conflict"
];
function ssoErrorMessage(code, t) {
	return SSO_ERROR_CODES.includes(code) || MORE_SSO_ERROR_CODES.includes(code) ? t(`finalb.sso.err.${code}`) : t("finalb.sso.err.generic");
}
/**
* POST to an /api/sso endpoint with cookies included: the SSO browser-binding cookie (HttpOnly, path /api/sso) must
* travel with link-start and exchange, also when the API is on another origin.
*/
async function ssoPost(path, body) {
	const token = getAccessToken();
	const res = await fetch(apiUrl(path), {
		method: "POST",
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...token ? { Authorization: `Bearer ${token}` } : {}
		},
		body: JSON.stringify(body)
	});
	const text = await res.text();
	if (!res.ok) {
		let problem = null;
		try {
			const p = JSON.parse(text);
			problem = {
				status: p.status ?? res.status,
				title: p.title ?? "",
				type: p.type ?? "",
				detail: p.detail
			};
		} catch {}
		throw new ApiError(res.status, problem, res.statusText || `HTTP ${res.status}`);
	}
	return JSON.parse(text);
}
function ssoFailure(e, t) {
	const code = problemCode(e);
	if (code) return ssoErrorMessage(code, t);
	if (e instanceof ApiError && e.status === 429) return t("errors.rateLimited");
	if (e instanceof ApiError && e.status === 401) return t("finalb.sso.linkSignIn");
	return e instanceof TypeError ? t("errors.network") : t("finalb.sso.err.generic");
}
/**
* Security settings: "Link organization SSO". Only a signed-in user (password + MFA when enrolled) can bind an
* organization identity to their account; the identity provider's email must match this account's verified email.
*/
function OrgSsoLinkSection() {
	const { t } = useI18n();
	const [slug, setSlug] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const clean = slug.trim().toLowerCase();
	const valid = ORG_SLUG.test(clean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card stack",
		"aria-labelledby": "sso-link-h",
		style: { marginBlockEnd: "var(--space-5)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "sso-link-h",
				children: t("finalb.sso.linkTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finalb.sso.linkNote")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "stack",
				onSubmit: (e) => {
					e.preventDefault();
					if (!valid || busy) return;
					setBusy(true);
					setError(null);
					ssoPost(`/api/sso/${encodeURIComponent(clean)}/link/start`, { returnTo: "/me/security" }).then((r) => window.location.assign(r.authorizationUrl)).catch((err) => {
						setBusy(false);
						setError(ssoFailure(err, t));
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("finalb.sso.orgSlug"),
						hint: t("finalb.sso.orgSlugHint"),
						error: slug && !valid ? t("finalb.sso.orgSlugInvalid") : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: slug,
							autoComplete: "organization",
							onChange: (e) => setSlug(e.target.value)
						})
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-testid": "sso-link-error",
							children: error
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !valid,
						loading: busy,
						children: t("finalb.sso.linkButton")
					}) })
				]
			})
		]
	});
}
/** Login-page entry: "Sign in with your organization" + organization slug. */
function OrgSignIn({ returnTo }) {
	const { t } = useI18n();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [slug, setSlug] = (0, import_react.useState)("");
	const clean = slug.trim().toLowerCase();
	const valid = ORG_SLUG.test(clean);
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "secondary",
		onClick: () => setOpen(true),
		children: t("finalb.sso.signInOrg")
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "card card--flat",
		"aria-label": t("finalb.sso.signInOrg"),
		onSubmit: (e) => {
			e.preventDefault();
			if (valid) navigate(`/sso/${encodeURIComponent(clean)}${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("finalb.sso.orgSlug"),
			hint: t("finalb.sso.orgSlugHint"),
			error: slug && !valid ? t("finalb.sso.orgSlugInvalid") : void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: slug,
				autoComplete: "organization",
				autoFocus: true,
				onChange: (e) => setSlug(e.target.value)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "submit",
			disabled: !valid,
			children: t("finalb.sso.continue")
		})]
	});
}
/**
* `/sso/:slug`: checks that the organization offers SSO, then sends the browser to the API start endpoint
* (which redirects to the identity provider). Errors (no SSO, server not configured) are explained here
* instead of showing a raw API response.
*/
function SsoStartPage() {
	const { slug = "" } = useParams();
	const [params] = useSearchParams();
	const { t } = useI18n();
	usePageMeta(t("finalb.sso.startTitle"), void 0, { noindex: true });
	const [error, setError] = (0, import_react.useState)(null);
	const started = (0, import_react.useRef)(false);
	const target = apiUrl(`/api/sso/${encodeURIComponent(slug)}/start?returnTo=${encodeURIComponent(safeReturnTo(params.get("returnTo")))}`);
	(0, import_react.useEffect)(() => {
		if (started.current) return;
		started.current = true;
		if (!ORG_SLUG.test(slug)) {
			setError(t("finalb.sso.orgSlugInvalid"));
			return;
		}
		fetch(target, {
			redirect: "manual",
			credentials: "omit"
		}).then(async (res) => {
			if (res.type === "opaqueredirect" || res.status >= 300 && res.status < 400) {
				window.location.assign(target);
				return;
			}
			let code = "";
			try {
				code = ((await res.json()).type ?? "").split("/").pop() ?? "";
			} catch {}
			setError(ssoErrorMessage(code, t));
		}).catch(() => setError(t("errors.network")));
	}, [
		slug,
		target,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page narrow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("finalb.sso.startTitle") }), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			children: t("finalb.sso.backToLogin")
		}) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			label: t("finalb.sso.redirecting"),
			block: true
		})]
	});
}
/** `/sso/complete?handoff=…&returnTo=…` (or `?error=code`): exchanges the one-time handoff for a session. */
function SsoCompletePage() {
	const [params, setParams] = useSearchParams();
	const { t } = useI18n();
	const { completeLogin } = useAuth();
	const navigate = useNavigate();
	usePageMeta(t("finalb.sso.completeTitle"), void 0, { noindex: true });
	const [errorCode] = (0, import_react.useState)(() => params.get("error") ?? "");
	const [linked] = (0, import_react.useState)(() => params.get("linked"));
	const [linkedReturn] = (0, import_react.useState)(() => safeReturnTo(params.get("returnTo") ?? "/me/security"));
	const [error, setError] = (0, import_react.useState)(() => {
		const e = params.get("error");
		if (e) return ssoErrorMessage(e, t);
		if (params.get("linked")) return null;
		return params.get("handoff") ? null : ssoErrorMessage("invalid_handoff", t);
	});
	const ran = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const handoff = params.get("handoff");
		if (ran.current || !handoff || params.get("error") || params.get("linked")) return;
		ran.current = true;
		const returnTo = safeReturnTo(params.get("returnTo"));
		setParams({}, { replace: true });
		ssoPost("/api/sso/exchange", { handoff }).then((res) => {
			completeLogin(res);
			navigate(returnTo, { replace: true });
		}).catch((e) => setError(ssoFailure(e, t)));
	}, [
		params,
		setParams,
		completeLogin,
		navigate,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page narrow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("finalb.sso.completeTitle") }), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-testid": "sso-error",
				children: error
			})
		}), errorCode === "sso_link_required" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card card--flat",
			"aria-labelledby": "sso-link-help-h",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "sso-link-help-h",
					className: "h4",
					children: t("finalb.sso.linkHelpTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("finalb.sso.linkHelp") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "btn btn--primary",
					to: `/login?next=${encodeURIComponent("/me/security")}`,
					children: t("finalb.sso.signInWithPassword")
				}) })
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			children: t("finalb.sso.backToLogin")
		}) })] }) : linked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "success",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-testid": "sso-linked",
				children: t("finalb.sso.linked", { org: linked })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: linkedReturn,
			children: t("finalb.sso.linkedContinue")
		}) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			label: t("finalb.sso.signingIn"),
			block: true
		})]
	});
}
//#endregion
export { ssoErrorMessage as a, SsoStartPage as i, OrgSsoLinkSection as n, SsoCompletePage as r, OrgSignIn as t };

//# sourceMappingURL=Sso-BzD-RKdN.js.map