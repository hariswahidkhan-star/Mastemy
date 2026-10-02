import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useMutation } from "./useMutation-BVU18dYp.js";
import { t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { l as errorMessage, n as Notice } from "./misc-Bqc6tFVU.js";
import { n as _enum, o as object, p as useForm, s as string, u } from "./zod-piP6K-Dk.js";
import { i as Select, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { n as MfaEnrollmentWizard, t as MfaChallenge } from "./Mfa-BgmY6MjV.js";
import { t as OrgSignIn } from "./Sso-BzD-RKdN.js";
//#region src/pages/public/AuthPages.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function safeNext(next) {
	return next && next.startsWith("/") && !next.startsWith("//") ? next : "/me";
}
function LoginPage() {
	const { t } = useI18n();
	const { login, completeLogin } = useAuth();
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const [pending, setPending] = (0, import_react.useState)(null);
	usePageMeta(t("auth.loginTitle"), t("auth.loginDescription"));
	const schema = (0, import_react.useMemo)(() => object({
		email: string().trim().email(t("validation.email")),
		password: string().min(1, t("validation.required"))
	}), [t]);
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: u(schema) });
	const m = useMutation({
		mutationFn: (v) => login(v.email, v.password),
		onSuccess: (res) => {
			if (!res.status || res.status === "ok") navigate(safeNext(params.get("next")), { replace: true });
			else setPending(res);
		}
	});
	const finish = (session) => {
		completeLogin(session);
		navigate(safeNext(params.get("next")), { replace: true });
	};
	if (pending?.status === "mfa_required" && pending.mfaToken) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		style: { maxInlineSize: 480 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title",
				style: { marginBlockEnd: "var(--space-4)" },
				children: t("account.mfa.challengeTitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaChallenge, {
				mfaToken: pending.mfaToken,
				onDone: finish,
				onRestart: () => {
					setPending(null);
					m.reset();
				}
			})]
		})
	});
	if (pending?.status === "mfa_enrollment_required" && pending.accessToken) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		style: { maxInlineSize: 640 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title",
				style: { marginBlockEnd: "var(--space-4)" },
				children: t("account.mfa.enrollTitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaEnrollmentWizard, {
				token: pending.accessToken,
				intro: t("account.mfa.requiredIntro"),
				onDone: finish
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		style: { maxInlineSize: 480 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card",
			onSubmit: handleSubmit((v) => m.mutate(v)),
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-title",
					style: { marginBlockEnd: "var(--space-4)" },
					children: t("auth.loginTitle")
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.password"),
					error: errors.password?.message,
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						autoComplete: "current-password",
						...register("password")
					})
				}),
				m.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(m.error, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: m.isPending,
					style: { inlineSize: "100%" },
					children: t("auth.loginButton")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					style: { marginBlockStart: "var(--space-4)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						children: t("account.password.forgotLink")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small",
					style: { marginBlockStart: "var(--space-4)" },
					children: [
						t("auth.noAccount"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							children: t("nav.register")
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgSignIn, {})]
	});
}
function RegisterPage() {
	const { t, lang } = useI18n();
	const { register: registerUser } = useAuth();
	const navigate = useNavigate();
	usePageMeta(t("auth.registerTitle"), t("auth.registerDescription"));
	const schema = (0, import_react.useMemo)(() => object({
		displayName: string().trim().min(2, t("validation.minChars", { n: 2 })).max(80),
		email: string().trim().email(t("validation.email")),
		password: string().min(12, t("auth.passwordRule")).regex(/[A-Za-z]/, t("auth.passwordRule")).regex(/[0-9]/, t("auth.passwordRule")),
		confirm: string(),
		preferredLanguage: _enum(["en", "ar"])
	}).refine((v) => v.password === v.confirm, {
		message: t("auth.passwordMismatch"),
		path: ["confirm"]
	}), [t]);
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: u(schema),
		defaultValues: { preferredLanguage: lang }
	});
	const m = useMutation({
		mutationFn: (v) => registerUser({
			email: v.email,
			password: v.password,
			displayName: v.displayName,
			preferredLanguage: v.preferredLanguage
		}),
		onSuccess: () => navigate("/welcome", { replace: true })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		style: { maxInlineSize: 520 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card",
			onSubmit: handleSubmit((v) => m.mutate(v)),
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-title",
					style: { marginBlockEnd: "var(--space-2)" },
					children: t("auth.registerTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: t("auth.registerNote")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.displayName"),
					error: errors.displayName?.message,
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoComplete: "name",
						...register("displayName")
					})
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.password"),
					hint: t("auth.passwordRule"),
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.preferredLanguage"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						...register("preferredLanguage"),
						options: [{
							value: "en",
							label: t("language.en")
						}, {
							value: "ar",
							label: t("language.ar")
						}]
					})
				}),
				m.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(m.error, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: m.isPending,
					style: { inlineSize: "100%" },
					children: t("auth.registerButton")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small",
					style: { marginBlockStart: "var(--space-4)" },
					children: [
						t("auth.haveAccount"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: t("nav.login")
						})
					]
				})
			]
		})
	});
}
//#endregion
export { LoginPage, RegisterPage };

//# sourceMappingURL=AuthPages-CgbNnmkF.js.map