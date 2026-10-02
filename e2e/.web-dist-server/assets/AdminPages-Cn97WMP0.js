import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, i as Pagination, l as errorMessage, n as Notice, o as QueryStatus, r as PageHeader, s as StatusBadge, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { i as useChannels, n as useApiMutation, t as keys } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { i as accountError } from "./Mfa-BgmY6MjV.js";
import { i as splitLines } from "./format-B7uvlQ7u.js";
import { n as Dialog, t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { t as asList } from "./list-BPY7bxke.js";
import { i as ROLES } from "./types-C7beT6Ou.js";
import { i as youtubeWatchUrl } from "./youtube-CfgiWCkO.js";
import { i as VideoMarkButton, n as MfaResetButton } from "./Admin-dhDMd3wJ.js";
//#region src/pages/account/AdminUserSecurity.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Users & roles: email-verification / MFA state plus staff actions (resend link, mark verified). */
function AdminUserSecurityCell({ user }) {
	const { t } = useI18n();
	const toast = useToast();
	const resend = useApiMutation(() => api(`/api/admin/users/${user.id}/email-verification/resend`, { method: "POST" }), [], () => toast.success(t("account.admin.resent")));
	const mark = useApiMutation(() => api(`/api/admin/users/${user.id}/email-verification/mark-verified`, { method: "POST" }), [["admin", "users"]], () => toast.success(t("account.admin.marked")));
	const error = resend.error ?? mark.error;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		style: { gap: "var(--space-1)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				user.emailVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "success",
					children: t("account.admin.verified")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "warning",
					children: t("account.admin.unverified")
				}),
				" ",
				user.mfaEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "success",
					children: t("account.admin.mfaOn")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "neutral",
					children: t("account.admin.mfaOff")
				})
			] }),
			!user.emailVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					loading: resend.isPending,
					onClick: () => resend.mutate(void 0),
					children: t("account.admin.resend")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					loading: mark.isPending,
					onClick: () => mark.mutate(void 0),
					children: t("account.admin.markVerified")
				})]
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				role: "alert",
				className: "small field__error",
				children: accountError(error, t)
			}) : null
		]
	});
}
//#endregion
//#region src/pages/admin/AdminPages.tsx
function SettingsPage() {
	const { t } = useI18n();
	const { hasRole } = useAuth();
	const toast = useToast();
	usePageMeta(t("admin.section.settings"), void 0, { noindex: true });
	const canEdit = hasRole("SuperAdmin");
	const settings = useQuery({
		queryKey: ["admin", "settings"],
		queryFn: () => api("/api/admin/settings")
	});
	const [pending, setPending] = (0, import_react.useState)(null);
	const save = useApiMutation((p) => api(`/api/admin/settings/${encodeURIComponent(p.key)}`, {
		method: "PUT",
		body: { value: p.value }
	}), [["admin", "settings"], ["onboarding"]], () => {
		setPending(null);
		toast.success(t("settings.saved"));
	});
	const describe = (key) => {
		const k = `flags.${key}`;
		const v = t(k);
		return v === k ? t("flags.unknown") : v;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("admin.section.settings"),
			subtitle: t("settings.subtitle")
		}),
		!canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "info",
			children: t("settings.readOnly")
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: settings,
			children: (s) => Object.keys(s).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("settings.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "stack",
				style: {
					listStyle: "none",
					padding: 0
				},
				children: Object.entries(s).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "card card--flat",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								flex: 1,
								minInlineSize: 220
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mono",
								style: { fontSize: "var(--text-md)" },
								children: key
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								style: { margin: 0 },
								children: describe(key)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: value ? "success" : "neutral",
								children: value ? t("settings.on") : t("settings.off")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: value ? "secondary" : "primary",
								disabled: !canEdit,
								onClick: () => setPending({
									key,
									value: !value
								}),
								"aria-label": t(value ? "settings.disableFlag" : "settings.enableFlag", { key }),
								children: value ? t("settings.disable") : t("settings.enable")
							})]
						})]
					})
				}, key))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!pending,
			danger: pending?.value === false,
			title: t("settings.confirmTitle", { key: pending?.key ?? "" }),
			body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: pending ? pending.value ? t("settings.confirmEnable") : t("settings.confirmDisable") : null }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("settings.audited")
				}),
				save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(save.error, t)
				}) : null
			] }),
			confirmLabel: pending?.value ? t("settings.enable") : t("settings.disable"),
			loading: save.isPending,
			onCancel: () => setPending(null),
			onConfirm: () => pending && save.mutate(pending)
		})
	] });
}
function UsersPage() {
	const { t } = useI18n();
	const { hasRole, user: me } = useAuth();
	const toast = useToast();
	usePageMeta(t("admin.section.users"), void 0, { noindex: true });
	const [q, setQ] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [suspendTarget, setSuspendTarget] = (0, import_react.useState)(null);
	const users = useQuery({
		queryKey: [
			"admin",
			"users",
			search,
			page
		],
		queryFn: () => api(`/api/admin/users${qs({
			q: search,
			page
		})}`),
		placeholderData: (p) => p
	});
	const isSuper = hasRole("SuperAdmin");
	const canAssign = hasRole("Admin", "SuperAdmin");
	const privileged = [
		"Admin",
		"SuperAdmin",
		"Finance"
	];
	const saveRoles = useApiMutation((e) => api(`/api/admin/users/${e.id}/roles`, {
		method: "PUT",
		body: { roles: e.roles }
	}), [["admin", "users"]], () => {
		setEditing(null);
		toast.success(t("users.rolesSaved"));
	});
	const suspend = useApiMutation((u) => api(`/api/admin/users/${u.id}/suspend`, {
		method: "PUT",
		body: { suspended: !u.isSuspended }
	}), [["admin", "users"]], () => setSuspendTarget(null));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("admin.section.users"),
			subtitle: t("users.subtitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "row",
			role: "search",
			onSubmit: (e) => {
				e.preventDefault();
				setPage(1);
				setSearch(q.trim());
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("users.search"),
				className: "grow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "search",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				children: t("courses.searchButton")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: users,
			children: (d) => d.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("users.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("auth.displayName")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("auth.email")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("users.roles")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("account.admin.security")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("common.actions")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: d.items.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
							u.displayName,
							" ",
							u.isSuspended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: "Restricted" }) : null
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: u.email }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: u.roles.map((r) => t(`role.${r}`)).join(", ") || "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminUserSecurityCell, { user: u }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [
								canAssign ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setEditing({
										user: u,
										roles: [...u.roles]
									}),
									children: t("users.editRoles")
								}) : null,
								canAssign && u.id !== me?.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setSuspendTarget(u),
									children: u.isSuspended ? t("users.unsuspend") : t("users.suspend")
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MfaResetButton, { user: u })
							]
						}) })
					] }, u.id)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
				page: d.page,
				pageSize: d.pageSize,
				total: d.total,
				onPage: setPage
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open: !!editing,
			title: t("users.editRolesFor", { name: editing?.user.displayName ?? "" }),
			onClose: () => setEditing(null),
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => setEditing(null),
				children: t("common.cancel")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				loading: saveRoles.isPending,
				onClick: () => editing && saveRoles.mutate({
					id: editing.user.id,
					roles: editing.roles
				}),
				children: t("common.save")
			})] }),
			children: [editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				style: {
					border: "none",
					padding: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "visually-hidden",
					children: t("users.roles")
				}), ROLES.map((r) => {
					const locked = !isSuper && privileged.includes(r) || r === "SuperAdmin" && editing.user.id === me?.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: t(`role.${r}`),
						hint: locked ? t("users.lockedRole") : void 0,
						checked: editing.roles.includes(r),
						disabled: locked,
						onChange: (e) => setEditing({
							...editing,
							roles: e.target.checked ? [...editing.roles, r] : editing.roles.filter((x) => x !== r)
						})
					}, r);
				})]
			}) : null, saveRoles.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(saveRoles.error, t)
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!suspendTarget,
			danger: !suspendTarget?.isSuspended,
			title: suspendTarget?.isSuspended ? t("users.unsuspend") : t("users.suspend"),
			body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(suspendTarget?.isSuspended ? "users.unsuspendBody" : "users.suspendBody", { name: suspendTarget?.displayName ?? "" }) }), suspend.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(suspend.error, t)
			}) : null] }),
			confirmLabel: suspendTarget?.isSuspended ? t("users.unsuspend") : t("users.suspend"),
			loading: suspend.isPending,
			onCancel: () => setSuspendTarget(null),
			onConfirm: () => suspendTarget && suspend.mutate(suspendTarget)
		})
	] });
}
var APP_STATUSES = [
	"Submitted",
	"InReview",
	"ChangesRequested",
	"Approved",
	"Rejected"
];
function ApplicationsPage() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	usePageMeta(t("admin.section.applications"), void 0, { noindex: true });
	const [status, setStatus] = (0, import_react.useState)("Submitted");
	const [open, setOpen] = (0, import_react.useState)(null);
	const [decision, setDecision] = (0, import_react.useState)("Approve");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [inviteEmail, setInviteEmail] = (0, import_react.useState)("");
	const [inviteCode, setInviteCode] = (0, import_react.useState)(null);
	const apps = useQuery({
		queryKey: [
			"admin",
			"applications",
			status
		],
		queryFn: () => api(`/api/admin/instructor-applications${qs({ status })}`),
		select: asList
	});
	const decide = useApiMutation(() => api(`/api/admin/instructor-applications/${open?.id}/decision`, {
		method: "POST",
		body: {
			decision,
			notes
		}
	}), [["admin", "applications"]], () => {
		setOpen(null);
		setNotes("");
		toast.success(t("review.decided"));
	});
	const invite = useApiMutation(() => api("/api/admin/instructor-invitations", {
		method: "POST",
		body: { email: inviteEmail.trim() }
	}), [], (r) => {
		setInviteCode(r.code);
		setInviteEmail("");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("admin.section.applications"),
			subtitle: t("applications.subtitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card card--flat",
			style: { marginBlockEnd: "var(--space-5)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("applications.inviteTitle") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "row",
					onSubmit: (e) => {
						e.preventDefault();
						if (/^\S+@\S+\.\S+$/.test(inviteEmail.trim())) invite.mutate(void 0);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("auth.email"),
						className: "grow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							value: inviteEmail,
							onChange: (e) => setInviteEmail(e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: invite.isPending,
						disabled: !/^\S+@\S+\.\S+$/.test(inviteEmail.trim()),
						children: t("applications.invite")
					})]
				}),
				invite.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(invite.error, t)
				}) : null,
				inviteCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
					tone: "success",
					title: t("applications.codeTitle"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mono",
						style: {
							fontSize: "var(--text-lg)",
							margin: 0
						},
						children: inviteCode
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						style: { margin: 0 },
						children: t("applications.codeOnce")
					})]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("dashboard.status"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: status,
				onChange: (e) => setStatus(e.target.value),
				options: APP_STATUSES.map((s) => ({
					value: s,
					label: t(`status.${s}`)
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: apps,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("applications.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "stack",
				style: {
					listStyle: "none",
					padding: 0
				},
				children: list.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "card card--flat",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: a.applicantName ?? a.applicantEmail ?? a.userId }),
							" —",
							" ",
							a.headline,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "small muted",
								children: fmtDate(a.createdAt)
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setOpen(a),
								children: t("review.open")
							})]
						})]
					})
				}, a.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!open,
			wide: true,
			title: open?.headline ?? "",
			onClose: () => setOpen(null),
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => setOpen(null),
				children: t("common.cancel")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				loading: decide.isPending,
				disabled: decision !== "Approve" && !notes.trim(),
				onClick: () => decide.mutate(void 0),
				children: t("review.recordDecision")
			})] }),
			children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "kv",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("teach.bio") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								style: { whiteSpace: "pre-wrap" },
								children: open.bio
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("teach.evidence") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								style: { whiteSpace: "pre-wrap" },
								children: open.expertiseEvidence
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("teach.testVideo") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: open.testVideoUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								children: open.testVideoUrl
							}) })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("applications.decision"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: decision,
							onChange: (e) => setDecision(e.target.value),
							options: [
								{
									value: "Approve",
									label: t("applications.approve")
								},
								{
									value: "RequestChanges",
									label: t("review.requestChanges")
								},
								{
									value: "Reject",
									label: t("applications.reject")
								}
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("review.notes"),
						hint: decision !== "Approve" ? t("review.notesRequired") : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})
					}),
					decide.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: errorMessage(decide.error, t)
					}) : null
				]
			}) : null
		})
	] });
}
function PackagesApprovalPage() {
	const { t, fmtMoney } = useI18n();
	const toast = useToast();
	usePageMeta(t("admin.section.packages"), void 0, { noindex: true });
	const list = useQuery({
		queryKey: ["admin", "packages"],
		queryFn: () => api("/api/admin/packages?status=Proposed"),
		select: asList
	});
	const [pending, setPending] = (0, import_react.useState)(null);
	const decide = useApiMutation((p) => api(`/api/admin/packages/${p.pkg.id}/decision`, {
		method: "POST",
		body: { decision: p.decision }
	}), [["admin", "packages"]], () => {
		setPending(null);
		toast.success(t("review.decided"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("admin.section.packages"),
			subtitle: t("packagesAdmin.subtitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "info",
			children: t("packagesAdmin.checklist")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("packagesAdmin.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "stack",
				style: {
					listStyle: "none",
					padding: 0
				},
				children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "card card--flat",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row row--between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: p.title }),
								" ",
								p.courseTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "muted",
									children: ["· ", p.courseTitle]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "small",
									children: [
										fmtMoney(p.price, p.currency),
										" ·",
										" ",
										t("course.accessTerm", { days: p.accessDays })
									]
								})
							] }), p.approvalStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.approvalStatus }) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "check-list small",
							children: splitLines(p.contents).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l }, l))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => setPending({
									pkg: p,
									decision: "Approve"
								}),
								children: t("applications.approve")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setPending({
									pkg: p,
									decision: "Reject"
								}),
								children: t("applications.reject")
							})]
						})
					]
				}, p.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!pending,
			danger: pending?.decision === "Reject",
			title: pending?.decision === "Approve" ? t("applications.approve") : t("applications.reject"),
			body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("packagesAdmin.confirm", { title: pending?.pkg.title ?? "" }) }), decide.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(decide.error, t)
			}) : null] }),
			confirmLabel: t("review.recordDecision"),
			loading: decide.isPending,
			onCancel: () => setPending(null),
			onConfirm: () => pending && decide.mutate(pending)
		})
	] });
}
function RefundsPage() {
	const { t, fmtDate, fmtMoney } = useI18n();
	const toast = useToast();
	usePageMeta(t("admin.section.refunds"), void 0, { noindex: true });
	const list = useQuery({
		queryKey: ["admin", "refunds"],
		queryFn: () => api("/api/admin/refunds"),
		select: asList
	});
	const [pending, setPending] = (0, import_react.useState)(null);
	const decide = useApiMutation((p) => api(`/api/admin/refunds/${p.r.id}/decision`, {
		method: "POST",
		body: { decision: p.decision }
	}), [["admin", "refunds"]], () => {
		setPending(null);
		toast.success(t("review.decided"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("admin.section.refunds"),
			subtitle: t("refunds.subtitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("refunds.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							children: t("refunds.order")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("refunds.amount")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("refunds.reason")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("dashboard.status")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("common.actions")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(r.createdAt) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono small",
							children: r.orderId
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(r.amount, r.currency ?? "USD") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.reason }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.status === "Requested" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => setPending({
									r,
									decision: "Approve"
								}),
								children: t("applications.approve")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setPending({
									r,
									decision: "Reject"
								}),
								children: t("applications.reject")
							})]
						}) : null })
					] }, r.id)) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!pending,
			danger: pending?.decision === "Approve",
			title: pending?.decision === "Approve" ? t("refunds.approveTitle") : t("refunds.rejectTitle"),
			body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: pending?.decision === "Approve" ? t("refunds.approveBody") : t("refunds.rejectBody") }), decide.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(decide.error, t)
			}) : null] }),
			confirmLabel: t("review.recordDecision"),
			loading: decide.isPending,
			onCancel: () => setPending(null),
			onConfirm: () => pending && decide.mutate(pending)
		})
	] });
}
var VIDEO_STATUSES = [
	"Draft",
	"AwaitingApproval",
	"AwaitingSourceFile",
	"Uploading",
	"Processing",
	"InContentReview",
	"Ready",
	"Restricted",
	"Failed"
];
function ChannelsSection() {
	const { t } = useI18n();
	const toast = useToast();
	const channels = useChannels();
	const [draft, setDraft] = (0, import_react.useState)({
		channelId: "",
		title: ""
	});
	const valid = /^UC[A-Za-z0-9_-]{22}$/.test(draft.channelId.trim()) && !!draft.title.trim();
	const create = useApiMutation(() => api("/api/admin/youtube/channels", {
		method: "POST",
		body: {
			channelId: draft.channelId.trim(),
			title: draft.title.trim(),
			mode: "MastemyManaged"
		}
	}), [keys.channels], () => {
		setDraft({
			channelId: "",
			title: ""
		});
		toast.success(t("channels.created"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card card--flat",
		style: { marginBlockEnd: "var(--space-5)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("channels.title") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("channels.help")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: channels }),
			channels.data && channels.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: channels.data.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				c.title,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mono small",
					children: c.channelId
				}),
				" ·",
				" ",
				t(`channelMode.${c.mode}`)
			] }, c.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("channels.none")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					if (valid) create.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("channels.channelId"),
						hint: t("channels.channelIdHint"),
						className: "grow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.channelId,
							onChange: (e) => setDraft({
								...draft,
								channelId: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("channels.name"),
						className: "grow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.title,
							onChange: (e) => setDraft({
								...draft,
								title: e.target.value
							}),
							maxLength: 200
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: create.isPending,
						disabled: !valid,
						children: t("channels.add")
					})
				]
			}),
			create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(create.error, t)
			}) : null
		]
	});
}
function VideosPage() {
	const { t, fmtDate } = useI18n();
	const { hasRole } = useAuth();
	const toast = useToast();
	usePageMeta(t("admin.section.videos"), void 0, { noindex: true });
	const [status, setStatus] = (0, import_react.useState)("");
	const [rejecting, setRejecting] = (0, import_react.useState)(null);
	const list = useQuery({
		queryKey: [
			"admin",
			"videos",
			status
		],
		queryFn: () => api(`/api/admin/youtube/videos${qs({ status })}`),
		select: asList
	});
	const confirm = useApiMutation((p) => api(`/api/admin/youtube/videos/${p.id}/confirm`, {
		method: "POST",
		body: {
			approve: p.approve,
			reason: p.reason
		}
	}), [["admin", "videos"]], (v) => {
		setRejecting(null);
		toast.success(t("video.linked", { status: t(`status.${v.status}`) }));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("admin.section.videos"),
			subtitle: t("videos.subtitle")
		}),
		hasRole("Admin", "SuperAdmin") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelsSection, {}) : null,
		confirm.isError && !rejecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: errorMessage(confirm.error, t)
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("dashboard.status"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: status,
				onChange: (e) => setStatus(e.target.value),
				placeholder: t("videos.all"),
				options: VIDEO_STATUSES.map((s) => ({
					value: s,
					label: t(`status.${s}`)
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("videos.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("video.title")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("playlist.videoId")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("dashboard.status")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("video.statusReason")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("video.lastChecked")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("common.actions")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [v.title, v.courseTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "small muted",
							children: v.courseTitle
						}) : null] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono small",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: youtubeWatchUrl(v.youTubeVideoId),
								target: "_blank",
								rel: "noopener noreferrer",
								children: v.youTubeVideoId
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: v.status }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "small",
							children: v.statusReason ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: v.lastCheckedAt ? fmtDate(v.lastCheckedAt) : "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [v.status === "InContentReview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								loading: confirm.isPending,
								onClick: () => confirm.mutate({
									id: v.id,
									approve: true
								}),
								"aria-label": t("videos.confirmFor", { title: v.title }),
								children: t("videos.confirm")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setRejecting({
									video: v,
									reason: ""
								}),
								children: t("applications.reject")
							})]
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoMarkButton, { video: v })] })
					] }, v.id)) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!rejecting,
			danger: true,
			title: t("videos.rejectTitle"),
			body: rejecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("review.notes"),
				hint: t("review.notesRequired"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: rejecting.reason,
					onChange: (e) => setRejecting({
						...rejecting,
						reason: e.target.value
					})
				})
			}), confirm.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(confirm.error, t)
			}) : null] }) : null,
			confirmLabel: t("review.recordDecision"),
			loading: confirm.isPending,
			onCancel: () => setRejecting(null),
			onConfirm: () => rejecting?.reason.trim() && confirm.mutate({
				id: rejecting.video.id,
				approve: false,
				reason: rejecting.reason.trim()
			})
		})
	] });
}
function AuditPage() {
	const { t } = useI18n();
	usePageMeta(t("admin.section.audit"), void 0, { noindex: true });
	const [entityType, setEntityType] = (0, import_react.useState)("");
	const [applied, setApplied] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const list = useQuery({
		queryKey: [
			"admin",
			"audit",
			applied,
			page
		],
		queryFn: () => api(`/api/admin/audit${qs({
			entityType: applied,
			page
		})}`),
		placeholderData: (p) => p
	});
	const fmt = (iso) => {
		const d = new Date(iso);
		return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("admin.section.audit"),
			subtitle: t("audit.subtitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "row",
			onSubmit: (e) => {
				e.preventDefault();
				setPage(1);
				setApplied(entityType.trim());
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("audit.entityType"),
				className: "grow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: entityType,
					onChange: (e) => setEntityType(e.target.value),
					placeholder: "Course"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				children: t("audit.filter")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (d) => d.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("audit.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("audit.when")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("audit.action")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("audit.entity")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("audit.actor")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("audit.details")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: d.items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "small",
							children: fmt(a.createdAt)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.action }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "small",
							children: [
								a.entityType,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono",
									children: a.entityId
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono small",
							children: a.actorId ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "small",
							style: { overflowWrap: "anywhere" },
							children: a.details ?? ""
						})
					] }, a.id)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
				page: d.page,
				pageSize: d.pageSize,
				total: d.total,
				onPage: setPage
			})] })
		})
	] });
}
//#endregion
export { ApplicationsPage, AuditPage, PackagesApprovalPage, RefundsPage, SettingsPage, UsersPage, VideosPage };

//# sourceMappingURL=AdminPages-Cn97WMP0.js.map