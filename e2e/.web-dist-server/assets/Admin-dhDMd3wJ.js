import { _ as require_react, b as __toESM, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, n as Notice, r as PageHeader, s as StatusBadge, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { n as Dialog } from "./Dialog-CcENtYyA.js";
import { r as UserPicker } from "./Pickers-l0FQGv4r.js";
import { p as supportApi, t as FinalaError } from "./shared-CFDEeOyq.js";
import { r as CredentialKindBadge } from "./Credentials-ClrgE0yN.js";
//#region src/pages/finala/Admin.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function MfaResetButton({ user }) {
	const { t } = useI18n();
	const { hasRole, user: me, logout } = useAuth();
	const toast = useToast();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [reason, setReason] = (0, import_react.useState)("");
	const ok = reason.trim().length >= 10 && reason.trim().length <= 500;
	const reset = useApiMutation(() => supportApi.mfaReset(user.id, reason.trim()), [["admin", "users"]], () => {
		setOpen(false);
		setReason("");
		toast.success(t("finala.mfa.done", { name: user.displayName }));
	});
	if (!hasRole("SuperAdmin") || me?.id === user.id) return null;
	const needsFresh = reset.error instanceof ApiError && reset.error.is("fresh_mfa_required");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "ghost",
		onClick: () => setOpen(true),
		children: t("finala.mfa.button")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		title: t("finala.mfa.title", { name: user.displayName }),
		onClose: () => setOpen(false),
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: () => setOpen(false),
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "danger",
			disabled: !ok,
			loading: reset.isPending,
			onClick: () => reset.mutate(void 0),
			children: t("finala.mfa.confirm")
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("finala.mfa.explain") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				children: t("finala.mfa.fresh")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("finala.mfa.reason"),
				hint: t("finala.mfa.reasonHint", { n: reason.trim().length }),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 3,
					maxLength: 500,
					value: reason,
					onChange: (e) => setReason(e.target.value)
				})
			}),
			needsFresh ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				tone: "danger",
				title: t("finala.errors.fresh_mfa_required"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: { marginBlockStart: 0 },
					children: t("finala.mfa.reauthBody")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => {
						logout().then(() => navigate(`/login?next=${encodeURIComponent("/admin/users")}&reason=fresh_mfa`));
					},
					children: t("finala.mfa.reauth")
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: reset.error })
		]
	})] });
}
var PIPELINE = [
	"Draft",
	"AwaitingApproval",
	"AwaitingSourceFile",
	"Uploading"
];
function VideoMarkButton({ video }) {
	const { t } = useI18n();
	const toast = useToast();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)("Restricted");
	const [reason, setReason] = (0, import_react.useState)("");
	const ok = reason.trim().length >= 1 && reason.trim().length <= 1e3;
	const mark = useApiMutation(() => api(`/api/admin/youtube/videos/${video.id}/mark`, {
		method: "POST",
		body: {
			status,
			reason: reason.trim()
		}
	}), [["admin", "videos"]], (v) => {
		setOpen(false);
		setReason("");
		toast.success(t("finala.video.marked", { status: t(`status.${v.status}`) }));
	});
	if (PIPELINE.includes(video.status)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "ghost",
		onClick: () => setOpen(true),
		"aria-label": t("finala.video.markFor", { title: video.title }),
		children: t("finala.video.mark")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		title: t("finala.video.title", { title: video.title }),
		onClose: () => setOpen(false),
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: () => setOpen(false),
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "danger",
			disabled: !ok,
			loading: mark.isPending,
			onClick: () => mark.mutate(void 0),
			children: t("finala.video.confirm")
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finala.video.help")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("finala.video.status"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: status,
					onChange: (e) => setStatus(e.target.value),
					options: [{
						value: "Restricted",
						label: t("status.Restricted")
					}, {
						value: "Failed",
						label: t("status.Failed")
					}]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("finala.video.reason"),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 3,
					maxLength: 1e3,
					value: reason,
					onChange: (e) => setReason(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: mark.error })
		]
	})] });
}
function AiUsagePanel({ usage }) {
	const { t, fmtNumber } = useI18n();
	if (!usage || typeof usage !== "object") return null;
	const cost = (n) => new Intl.NumberFormat(void 0, { maximumFractionDigits: 4 }).format(n);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card stack",
		"aria-labelledby": "ai-usage-h",
		"data-testid": "ai-usage",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "ai-usage-h",
				children: t("finala.ai.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "facts",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.ai.calls") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(usage.calls) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.ai.users") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(usage.distinctUsers) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.ai.input") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(usage.inputTokens) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.ai.output") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(usage.outputTokens) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.ai.cacheRead") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(usage.cacheReadTokens) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.ai.cacheWrite") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(usage.cacheWriteTokens) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.ai.cost") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: cost(usage.costEstimate) })] })
				]
			}),
			usage.byFeature.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finala.ai.none")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table small",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", { children: t("finala.ai.byFeature") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finala.ai.feature")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finala.ai.calls")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finala.ai.input")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finala.ai.output")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finala.ai.cost")
							})
						] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: usage.byFeature.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: f.feature }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtNumber(f.calls) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtNumber(f.inputTokens) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtNumber(f.outputTokens) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: cost(f.costEstimate) })
						] }, f.feature)) })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finala.ai.estimate")
			})
		]
	});
}
function SupportUserDetail({ id }) {
	const { t, fmtDate, fmtMoney } = useI18n();
	const toast = useToast();
	const detail = useQuery({
		queryKey: [
			"finala",
			"support-user",
			id
		],
		queryFn: () => supportApi.user(id)
	});
	const resend = useApiMutation(() => supportApi.resend(id), [], () => toast.success(t("finala.support.resent")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: detail,
		children: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card stack",
			"aria-labelledby": "su-h",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "su-h",
					children: u.displayName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "kv",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.support.email") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mono",
							children: u.maskedEmail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.support.verified") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: u.emailVerified ? t("finala.support.yes") : t("finala.support.no") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.support.mfa") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: u.mfaEnabled ? t("finala.support.yes") : t("finala.support.no") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.support.suspended") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: u.isSuspended ? t("finala.support.yes") : t("finala.support.no") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.support.joined") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtDate(u.createdAt) })
					]
				}),
				!u.emailVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					loading: resend.isPending,
					onClick: () => resend.mutate(void 0),
					children: t("finala.support.resend")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: resend.error })] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("finala.support.enrollments") }),
				u.enrollments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("finala.support.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: u.enrollments.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					e.courseTitle,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "small muted",
						children: fmtDate(e.enrolledAt)
					})
				] }, e.courseId)) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("finala.support.orders") }),
				u.orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("finala.support.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: u.orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono small",
						children: o.id.slice(0, 8)
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status }),
					" ",
					fmtMoney(o.total, o.currency),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "small muted",
						children: fmtDate(o.createdAt)
					})
				] }, o.id)) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("finala.support.credentials") }),
				u.certificates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("finala.support.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: u.certificates.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialKindBadge, { kind: c.kind }),
					" ",
					c.courseTitle,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "small muted",
						children: fmtDate(c.issuedAt)
					})
				] }, c.id)) })
			]
		})
	});
}
function SupportOrders() {
	const { t, fmtDate, fmtMoney } = useI18n();
	const [email, setEmail] = (0, import_react.useState)("");
	const [orderId, setOrderId] = (0, import_react.useState)("");
	const [params, setParams] = (0, import_react.useState)(null);
	const guidOk = !orderId.trim() || /^[0-9a-f-]{36}$/i.test(orderId.trim());
	const orders = useQuery({
		queryKey: [
			"finala",
			"support-orders",
			params
		],
		queryFn: () => supportApi.orders(params ?? {}),
		enabled: !!params
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card stack",
		"aria-labelledby": "so-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "so-h",
				children: t("finala.support.orderLookup")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				style: { alignItems: "flex-end" },
				onSubmit: (e) => {
					e.preventDefault();
					if (!guidOk || !email.trim() && !orderId.trim()) return;
					setParams({
						email: email.trim() || void 0,
						orderId: orderId.trim() || void 0
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("finala.support.orderEmail"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("finala.support.orderId"),
						error: guidOk ? void 0 : t("finala.support.orderIdRule"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: orderId,
							onChange: (e) => setOrderId(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "secondary",
						disabled: !email.trim() && !orderId.trim(),
						children: t("finala.picker.search")
					})
				]
			}),
			params ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: orders,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("finala.support.noOrders")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table small",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finala.support.order")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finala.support.buyer")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("dashboard.status")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finala.support.total")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finala.support.courses")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("finala.support.payments")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "mono",
								children: [o.id.slice(0, 8), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "muted",
									children: fmtDate(o.createdAt)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono",
								children: o.maskedBuyerEmail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status }), o.refunds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: o.refunds.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("finala.support.refund", {
								amount: fmtMoney(r.amount, o.currency),
								status: r.status
							}) }, i)) }) : null] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(o.total, o.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.courseTitles.join(", ") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "mono",
								children: [o.maskedPaymentIds.join(", ") || "—", o.invoiceNumbers.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "muted",
									children: o.invoiceNumbers.join(", ")
								}) : null]
							})
						] }, o.id)) })]
					})
				})
			}) : null
		]
	});
}
function SupportPage() {
	const { t } = useI18n();
	usePageMeta(t("finala.support.title"), void 0, { noindex: true });
	const [picked, setPicked] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("finala.support.title"),
				subtitle: t("finala.support.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card stack",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPicker, {
					label: t("finala.support.findUser"),
					selected: picked,
					onChange: setPicked,
					endpoint: "/api/support/users/lookup"
				})
			}),
			picked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportUserDetail, { id: picked.id }, picked.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("finala.support.pickUser") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportOrders, {})
		]
	});
}
//#endregion
export { VideoMarkButton as i, MfaResetButton as n, SupportPage as r, AiUsagePanel as t };

//# sourceMappingURL=Admin-dhDMd3wJ.js.map