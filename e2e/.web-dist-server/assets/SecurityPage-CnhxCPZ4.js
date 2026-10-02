import { _ as require_react, b as __toESM, i as require_jsx_runtime, m as useNavigate, o as NavLink, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, n as Notice, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { n as accountKeys, t as accountApi } from "./account-CkAe5QCo.js";
import { o as object, p as useForm, s as string, u } from "./zod-piP6K-Dk.js";
import { n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { a as cleanCode, i as accountError, n as MfaEnrollmentWizard, r as RecoveryCodesPanel } from "./Mfa-BgmY6MjV.js";
import { a as passwordSchema } from "./EmailPages-DCJlIp1_.js";
import { t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { n as OrgSsoLinkSection } from "./Sso-BzD-RKdN.js";
//#region src/pages/account/SecurityPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Sub-navigation shared by the account settings pages. */
function AccountNav() {
	const { t } = useI18n();
	const items = [
		["/me/profile", t("account.nav.profile")],
		["/me/security", t("account.nav.security")],
		["/me/skills", t("account.nav.skills")],
		["/welcome", t("account.nav.goals")],
		["/me/settings/notifications", t("account.nav.notifications")],
		["/me/privacy", t("account.nav.privacy")]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": t("account.nav.label"),
		className: "side-nav",
		style: { marginBlockEnd: "var(--space-4)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "row",
			style: {
				listStyle: "none",
				padding: 0,
				flexWrap: "wrap",
				gap: "var(--space-2)"
			},
			children: items.map(([to, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
				to,
				className: ({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link",
				children: label
			}) }, to))
		})
	});
}
function AccountShell({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title,
				subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountNav, {}),
			children
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card stack",
		style: { marginBlockEnd: "var(--space-5)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "section__title",
			children: title
		}), children]
	});
}
function MfaSection() {
	const { t, fmtDate } = useI18n();
	const { completeLogin } = useAuth();
	const toast = useToast();
	const qc = useQueryClient();
	const status = useQuery({
		queryKey: accountKeys.mfaStatus,
		queryFn: () => accountApi.mfaStatus()
	});
	const [mode, setMode] = (0, import_react.useState)("idle");
	const [code, setCode] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [codes, setCodes] = (0, import_react.useState)(null);
	const reset = () => {
		setMode("idle");
		setCode("");
		setPassword("");
	};
	const regen = useApiMutation(() => accountApi.regenerateCodes(cleanCode(code)), [accountKeys.mfaStatus], (r) => {
		setCodes(r.recoveryCodes);
		reset();
	});
	const disable = useApiMutation(() => accountApi.disableMfa(password, cleanCode(code)), [accountKeys.mfaStatus, accountKeys.profile], () => {
		reset();
		toast.success(t("account.mfa.disabled"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		title: t("account.mfa.title"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: status,
			children: (s) => codes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoveryCodesPanel, {
				codes,
				onDone: () => setCodes(null)
			}) : mode === "enroll" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaEnrollmentWizard, { onDone: (session) => {
				completeLogin(session);
				setMode("idle");
				qc.invalidateQueries({ queryKey: ["account"] });
				toast.success(t("account.mfa.enabledToast"));
			} }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						s.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: t("account.mfa.on")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "warning",
							children: t("account.mfa.off")
						}),
						" ",
						s.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "info",
							children: t("account.mfa.requiredBadge")
						}) : null
					] }),
					s.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "small muted",
						children: [
							t("account.mfa.enabledSince", { date: fmtDate(s.enabledAt) }),
							" ",
							t("account.mfa.remaining", { n: s.remainingRecoveryCodes })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("account.mfa.offHelp")
					}),
					s.enabled && s.remainingRecoveryCodes <= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						children: t("account.mfa.lowCodes")
					}) : null,
					!s.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setMode("enroll"),
						children: t("account.mfa.enable")
					}) }) : mode === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setMode("regen"),
							children: t("account.mfa.regenerate")
						}), !s.required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => setMode("disable"),
							children: t("account.mfa.disable")
						}) : null]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "stack",
						noValidate: true,
						onSubmit: (e) => {
							e.preventDefault();
							if (mode === "regen") regen.mutate(void 0);
							else disable.mutate(void 0);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: mode === "regen" ? t("account.mfa.regenHelp") : t("account.mfa.disableHelp")
							}),
							mode === "disable" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("account.password.current"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									autoComplete: "current-password",
									value: password,
									onChange: (e) => setPassword(e.target.value)
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("account.mfa.codeLabel"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "numeric",
									autoComplete: "one-time-code",
									maxLength: 7,
									value: code,
									onChange: (e) => setCode(e.target.value.replace(/[^0-9 ]/g, ""))
								})
							}),
							regen.isError || disable.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
								tone: "danger",
								children: accountError(regen.error ?? disable.error, t)
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: mode === "disable" ? "danger" : "primary",
									loading: regen.isPending || disable.isPending,
									disabled: cleanCode(code).length !== 6 || mode === "disable" && !password,
									children: mode === "regen" ? t("account.mfa.regenerate") : t("account.mfa.disable")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: () => {
										regen.reset();
										disable.reset();
										reset();
									},
									children: t("common.cancel")
								})]
							})
						]
					})
				]
			})
		})
	});
}
function PasswordSection() {
	const { t } = useI18n();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const toast = useToast();
	const schema = (0, import_react.useMemo)(() => object({
		current: string().min(1, t("validation.required")),
		password: passwordSchema(t),
		confirm: string()
	}).refine((v) => v.password === v.confirm, {
		message: t("auth.passwordMismatch"),
		path: ["confirm"]
	}), [t]);
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: u(schema) });
	const change = useApiMutation((v) => accountApi.changePassword(v.current, v.password), [], () => {
		toast.success(t("account.password.changed"));
		navigate("/login", { replace: true });
		logout();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		title: t("account.password.changeTitle"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "stack",
			noValidate: true,
			onSubmit: handleSubmit((v) => change.mutate(v)),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("account.password.current"),
					error: errors.current?.message,
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						autoComplete: "current-password",
						...register("current")
					})
				}),
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("account.password.changeNote")
				}),
				change.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: accountError(change.error, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: change.isPending,
					children: t("account.password.changeButton")
				}) })
			]
		})
	});
}
/** Short, human description of a user agent string (no fingerprinting, just the obvious parts). */
function describeAgent(ua) {
	if (!ua) return "";
	return [/Edg\//.test(ua) ? "Edge" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "", /Windows/.test(ua) ? "Windows" : /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : /Mac OS X/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : ""].filter(Boolean).join(" · ") || ua.slice(0, 60);
}
function SessionsSection() {
	const { t, fmtDate } = useI18n();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const toast = useToast();
	const sessions = useQuery({
		queryKey: accountKeys.sessions,
		queryFn: accountApi.sessions
	});
	const [confirmAll, setConfirmAll] = (0, import_react.useState)(false);
	const signOut = () => {
		navigate("/login", { replace: true });
		logout();
	};
	const revoke = useApiMutation((s) => accountApi.revokeSession(s.id), [accountKeys.sessions], (_r, s) => {
		if (s.current) signOut();
		else toast.success(t("account.sessions.revoked"));
	});
	const revokeAll = useApiMutation(() => accountApi.revokeAll(), [], () => {
		setConfirmAll(false);
		signOut();
	});
	const when = (iso) => {
		const d = new Date(iso);
		return Number.isNaN(d.getTime()) ? "" : `${fmtDate(iso)} ${d.toLocaleTimeString()}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		title: t("account.sessions.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("account.sessions.note")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: sessions,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("account.sessions.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "table",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
									className: "visually-hidden",
									children: t("account.sessions.title")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("account.sessions.device")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("account.sessions.ip")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("account.sessions.lastUsed")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("account.sessions.started")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("common.actions")
									})
								] }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-session-id": s.id,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												title: s.userAgent,
												children: describeAgent(s.userAgent) || t("account.sessions.unknownDevice")
											}),
											" ",
											s.current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "accent",
												children: t("account.sessions.current")
											}) : null,
											" ",
											s.mfaAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "success",
												children: t("account.sessions.mfa")
											}) : null
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											dir: "ltr",
											children: s.lastIpAddress || s.ipAddress || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: when(s.lastUsedAt) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: when(s.createdAt) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "secondary",
											loading: revoke.isPending && revoke.variables?.id === s.id,
											onClick: () => revoke.mutate(s),
											children: s.current ? t("account.sessions.signOutHere") : t("account.sessions.revoke")
										}) })
									]
								}, s.id)) })
							]
						})
					}),
					revoke.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: accountError(revoke.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						onClick: () => setConfirmAll(true),
						children: t("account.sessions.revokeAll")
					}) })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmAll,
				title: t("account.sessions.revokeAllTitle"),
				body: t("account.sessions.revokeAllBody"),
				confirmLabel: t("account.sessions.revokeAll"),
				danger: true,
				loading: revokeAll.isPending,
				onConfirm: () => revokeAll.mutate(void 0),
				onCancel: () => setConfirmAll(false)
			})
		]
	});
}
function SecurityPage() {
	const { t } = useI18n();
	usePageMeta(t("account.security.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccountShell, {
		title: t("account.security.title"),
		subtitle: t("account.security.subtitle"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionsSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgSsoLinkSection, {})
		]
	});
}
//#endregion
export { describeAgent as i, AccountShell as n, SecurityPage as r, AccountNav as t };

//# sourceMappingURL=SecurityPage-CnhxCPZ4.js.map