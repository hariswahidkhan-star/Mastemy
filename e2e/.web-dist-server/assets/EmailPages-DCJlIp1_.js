import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useMutation } from "./useMutation-BVU18dYp.js";
import { r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { n as Notice } from "./misc-Bqc6tFVU.js";
import { t as accountApi } from "./account-CkAe5QCo.js";
import { o as object, p as useForm, s as string, u } from "./zod-piP6K-Dk.js";
import { n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { i as accountError } from "./Mfa-BgmY6MjV.js";
//#region src/pages/account/EmailPages.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Server password rule (IdentityValidation.RequirePassword): ≥10 chars, a letter and a digit. */
function passwordSchema(t) {
	return string().min(10, t("account.password.rule")).max(256, t("account.password.rule")).regex(/[A-Za-z]/, t("account.password.rule")).regex(/[0-9]/, t("account.password.rule"));
}
/** Banner for signed-in users whose address is not verified yet, with a resend action. */
function EmailVerificationBanner() {
	const { t } = useI18n();
	const { user, refreshUser } = useAuth();
	const resend = useMutation({
		mutationFn: () => accountApi.resendEmail(),
		onError: (e) => {
			if (e instanceof ApiError && e.is("email_already_verified")) refreshUser();
		}
	});
	if (!user || user.emailVerified !== false) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container",
		style: { paddingBlockStart: "var(--space-3)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
			tone: "warning",
			title: t("account.verify.bannerTitle"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				style: { flexWrap: "wrap" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("account.verify.bannerText", { email: user.email }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					loading: resend.isPending,
					onClick: () => resend.mutate(),
					children: t("account.verify.resend")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				"aria-live": "polite",
				className: "small",
				style: { margin: 0 },
				children: [resend.isSuccess ? t("account.verify.resent") : null, resend.isError ? accountError(resend.error, t) : null]
			})]
		})
	});
}
/** `/verify-email?token=` — explicit confirmation so link scanners cannot consume the single-use token. */
function VerifyEmailPage() {
	const { t } = useI18n();
	const { user, refreshUser } = useAuth();
	const [params] = useSearchParams();
	const token = params.get("token") ?? "";
	usePageMeta(t("account.verify.title"), void 0, { noindex: true });
	const m = useMutation({
		mutationFn: () => accountApi.verifyEmail(token),
		onSuccess: () => {
			if (user) refreshUser();
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		style: { maxInlineSize: 520 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card stack",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title",
				children: t("account.verify.title")
			}), !token ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: t("account.verify.missingToken")
			}) : m.isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "success",
				children: t("account.verify.done")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/me",
				children: t("account.common.toDashboard")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				children: t("nav.login")
			}) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("account.verify.intro") }),
				m.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: accountError(m.error, t)
				}) : null,
				m.isError && user && user.emailVerified === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					children: t("account.verify.requestNew")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: m.isPending,
					onClick: () => m.mutate(),
					children: t("account.verify.confirm")
				}) })
			] })]
		})
	});
}
function ForgotPasswordPage() {
	const { t } = useI18n();
	usePageMeta(t("account.password.forgotTitle"), void 0, { noindex: true });
	const schema = (0, import_react.useMemo)(() => object({ email: string().trim().email(t("validation.email")) }), [t]);
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: u(schema) });
	const m = useMutation({ mutationFn: (v) => accountApi.forgot(v.email) });
	const notConfigured = m.error instanceof ApiError && m.error.is("email_not_configured");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		style: { maxInlineSize: 480 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card stack",
			onSubmit: handleSubmit((v) => m.mutate(v)),
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-title",
					children: t("account.password.forgotTitle")
				}),
				m.isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "success",
					children: t("account.password.forgotSent")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("account.password.forgotIntro")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("auth.email"),
						error: errors.email?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							autoComplete: "email",
							...register("email")
						})
					}),
					notConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						children: t("account.error.email_not_configured")
					}) : m.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: accountError(m.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: m.isPending,
						style: { inlineSize: "100%" },
						children: t("account.password.sendLink")
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: t("account.password.backToLogin")
					})
				})
			]
		})
	});
}
function ResetPasswordPage() {
	const { t } = useI18n();
	const [params] = useSearchParams();
	const token = params.get("token") ?? "";
	const [done, setDone] = (0, import_react.useState)(false);
	usePageMeta(t("account.password.resetTitle"), void 0, { noindex: true });
	const schema = (0, import_react.useMemo)(() => object({
		password: passwordSchema(t),
		confirm: string()
	}).refine((v) => v.password === v.confirm, {
		message: t("auth.passwordMismatch"),
		path: ["confirm"]
	}), [t]);
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: u(schema) });
	const m = useMutation({
		mutationFn: (v) => accountApi.reset(token, v.password),
		onSuccess: () => setDone(true)
	});
	const invalid = m.error instanceof ApiError && m.error.is("invalid_token");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		style: { maxInlineSize: 480 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card stack",
			onSubmit: handleSubmit((v) => m.mutate(v)),
			noValidate: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title",
				children: t("account.password.resetTitle")
			}), !token ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: t("account.password.missingToken")
			}) : done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "success",
				children: t("account.password.resetDone")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				children: t("nav.login")
			}) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("account.password.new"),
					hint: t("account.password.rule"),
					error: errors.password?.message,
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						autoComplete: "new-password",
						...register("password")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.confirmPassword"),
					error: errors.confirm?.message,
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						autoComplete: "new-password",
						...register("confirm")
					})
				}),
				m.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: accountError(m.error, t)
				}) : null,
				invalid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						children: t("account.password.requestNew")
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: m.isPending,
					style: { inlineSize: "100%" },
					children: t("account.password.resetButton")
				})
			] })]
		})
	});
}
//#endregion
export { passwordSchema as a, VerifyEmailPage as i, ForgotPasswordPage as n, ResetPasswordPage as r, EmailVerificationBanner as t };

//# sourceMappingURL=EmailPages-DCJlIp1_.js.map