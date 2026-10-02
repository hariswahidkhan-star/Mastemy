import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, n as ButtonLink, r as ApiError, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, i as Pagination, l as errorMessage, n as Notice, r as PageHeader, s as StatusBadge, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { c as useMyCertificates, l as useMyOrgs, m as w2keys, n as NOTIFICATION_KINDS, u as useNotifications } from "./wave2-rI7jjNgp.js";
import { r as safeLink } from "./NotificationBell-CoyJb6Q_.js";
import { t as Checkbox } from "./Field-Di1lkoGg.js";
import { a as LinkedInShareButton, i as CredentialKindNote, r as CredentialKindBadge } from "./Credentials-ClrgE0yN.js";
import { n as OrgMaterialsList } from "./Enterprise-Y1LikQM_.js";
//#region src/pages/me/MeWave2.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	const { t, fmtDate } = useI18n();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const toast = useToast();
	const [page, setPage] = (0, import_react.useState)(1);
	const [unreadOnly, setUnreadOnly] = (0, import_react.useState)(false);
	const list = useNotifications(page, 20, unreadOnly);
	usePageMeta(t("notifications.title"), void 0, { noindex: true });
	const refresh = () => qc.invalidateQueries({ queryKey: w2keys.notifications });
	const readAll = useApiMutation(() => api("/api/me/notifications/read-all", { method: "POST" }), [w2keys.notifications], () => toast.success(t("notifications.allRead")));
	const markRead = useApiMutation((id) => api(`/api/me/notifications/${id}/read`, { method: "POST" }), [w2keys.notifications]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("notifications.title"),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/me/settings/notifications",
					variant: "secondary",
					size: "sm",
					children: t("notifications.settings")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => readAll.mutate(void 0),
					loading: readAll.isPending,
					disabled: !list.data || list.data.unreadCount === 0,
					children: t("notifications.readAll")
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("notifications.unreadOnly"),
				checked: unreadOnly,
				onChange: (e) => {
					setPage(1);
					setUnreadOnly(e.target.checked);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (data) => data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: unreadOnly ? t("notifications.noneUnread") : t("notifications.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						"aria-live": "polite",
						children: t("notifications.unreadCount", { n: data.unreadCount })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "stack",
						style: {
							listStyle: "none",
							padding: 0
						},
						children: data.items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: n.readAt ? "card card--flat" : "card card--flat card--unread",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: n.readAt ? "neutral" : "info",
										children: t(`notifications.kind.${n.kind}`)
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: safeLink(n.link),
										onClick: () => {
											if (!n.readAt) markRead.mutate(n.id);
										},
										children: n.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "small muted",
										children: fmtDate(n.createdAt)
									})
								] }), !n.readAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => markRead.mutate(n.id, { onSuccess: () => void refresh() }),
									"aria-label": t("notifications.markReadNamed", { title: n.title }),
									children: t("notifications.markRead")
								}) : null]
							})
						}, n.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
						page: data.page,
						pageSize: data.pageSize,
						total: data.total,
						onPage: setPage
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => navigate("/me"),
				children: t("common.back")
			}) })
		]
	});
}
function mergePrefs(server) {
	return NOTIFICATION_KINDS.map((kind) => server.find((p) => p.kind === kind) ?? {
		kind,
		inApp: true,
		email: false
	});
}
function NotificationSettingsPage() {
	const { t } = useI18n();
	const toast = useToast();
	usePageMeta(t("notifications.settingsTitle"), void 0, { noindex: true });
	const prefs = useQuery({
		queryKey: w2keys.notificationPrefs,
		queryFn: () => api("/api/me/notification-preferences")
	});
	const [items, setItems] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (prefs.data) setItems(mergePrefs(prefs.data.items));
	}, [prefs.data]);
	const save = useApiMutation((list) => api("/api/me/notification-preferences", {
		method: "PUT",
		body: { items: list }
	}), [w2keys.notificationPrefs], () => toast.success(t("notifications.prefsSaved")));
	const set = (kind, field, value) => setItems((list) => (list ?? []).map((p) => p.kind === kind ? {
		...p,
		[field]: value
	} : p));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("notifications.settingsTitle"),
			subtitle: t("notifications.settingsSubtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: prefs,
			children: (data) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					if (items) save.mutate(items);
				},
				children: [
					!data.emailAvailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						title: t("notifications.emailUnavailableTitle"),
						children: t("notifications.emailUnavailable")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "table",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
									className: "visually-hidden",
									children: t("notifications.settingsTitle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("notifications.kindHeader")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("notifications.inApp")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										children: t("notifications.email")
									})
								] }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (items ?? mergePrefs(data.items)).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "row",
										children: t(`notifications.kind.${p.kind}`)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "visually-hidden",
											children: t("notifications.inAppFor", { kind: t(`notifications.kind.${p.kind}`) })
										}),
										checked: p.inApp,
										onChange: (e) => set(p.kind, "inApp", e.target.checked)
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "visually-hidden",
											children: t("notifications.emailFor", { kind: t(`notifications.kind.${p.kind}`) })
										}),
										checked: p.email,
										onChange: (e) => set(p.kind, "email", e.target.checked)
									}) })
								] }, p.kind)) })
							]
						})
					}),
					!data.emailAvailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("notifications.emailStoredNote")
					}) : null,
					save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: errorMessage(save.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: save.isPending,
						disabled: !items,
						children: t("common.save")
					})
				]
			})
		})]
	});
}
function CertificateRow({ cert }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [downloading, setDownloading] = (0, import_react.useState)(false);
	const [visible, setVisible] = (0, import_react.useState)(cert.publiclyVisible);
	const [synced, setSynced] = (0, import_react.useState)(cert.publiclyVisible);
	if (synced !== cert.publiclyVisible) {
		setSynced(cert.publiclyVisible);
		setVisible(cert.publiclyVisible);
	}
	const visibility = useApiMutation((publiclyVisible) => api(`/api/me/certificates/${cert.id}/visibility`, {
		method: "PUT",
		body: { publiclyVisible }
	}), [w2keys.myCertificates], (r) => toast.success(r.publiclyVisible ? t("certificates.nowPublic") : t("certificates.nowPrivate")));
	const revoked = cert.status === "Revoked";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: cert.kind === "Completion" ? "finala-cert finala-cert--completion" : "finala-cert",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialKindBadge, { kind: cert.kind }),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: cert.courseTitle }),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: cert.status }),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: visible ? "success" : "neutral",
				children: visible ? t("certificates.public") : t("certificates.private")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "small",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/verify/${encodeURIComponent(cert.code)}`,
						children: cert.code
					}),
					" ·",
					" ",
					fmtDate(cert.issuedAt)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialKindNote, { kind: cert.kind }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				style: { marginBlockStart: "var(--space-2)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						loading: downloading,
						disabled: revoked,
						onClick: () => {
							setDownloading(true);
							downloadFile(`/api/certificates/${encodeURIComponent(cert.code)}/pdf`, `mastemy-certificate-${cert.code}.pdf`).catch((e) => toast.error(e instanceof ApiError && e.is("certificate_revoked") ? t("certificates.revokedPdf") : errorMessage(e, t))).finally(() => setDownloading(false));
						},
						children: cert.kind === "Completion" ? t("finala.cred.pdfCompletion") : t("certificates.downloadPdf")
					}),
					!revoked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedInShareButton, { certificateId: cert.id }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: t("certificates.publicToggle"),
						hint: t("certificates.publicHint"),
						checked: visible,
						disabled: visibility.isPending,
						onChange: (e) => {
							const next = e.target.checked;
							setVisible(next);
							visibility.mutate(next, { onError: () => setVisible(!next) });
						}
					})
				]
			}),
			visibility.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(visibility.error, t)
			}) : null
		]
	});
}
function CertificatesSection() {
	const { t } = useI18n();
	const certs = useMyCertificates();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("dashboard.certificates") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: certs,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("dashboard.noCertificates")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "stack",
				style: {
					listStyle: "none",
					padding: 0
				},
				children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificateRow, { cert: c }, c.id))
			})
		})]
	});
}
function MyOrganizationsSection() {
	const { t, fmtDate } = useI18n();
	const orgs = useMyOrgs();
	if (orgs.isPending || orgs.isError || orgs.data.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		"aria-labelledby": "my-orgs-h",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: "my-orgs-h",
			children: t("orgs.assignedTitle")
		}), orgs.data.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stack",
			style: { marginBlockEnd: "var(--space-4)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					style: { marginBlockEnd: 0 },
					children: [
						o.name,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`orgs.role.${o.role}`) }),
						o.department ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "small muted",
							children: [" · ", o.department]
						}) : null
					]
				}),
				o.role === "Admin" || o.role === "Manager" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: `/orgs/${o.id}`,
					className: "small",
					children: t("orgs.manage")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgMaterialsList, { orgId: o.id }),
				o.assignments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: t("orgs.noAssignments")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: o.assignments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/courses/${a.courseSlug}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: a.courseTitle })
							}),
							" ",
							a.grantsPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "accent",
								children: t("orgs.premiumIncluded")
							}) : null,
							" ",
							a.overdue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "danger",
								children: t("orgs.overdue")
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "small muted",
								children: a.dueAt ? t("orgs.dueOn", { date: fmtDate(a.dueAt) }) : t("orgs.noDue")
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							size: "sm",
							to: `/learn/${a.courseSlug}`,
							children: t("course.startWatching")
						})]
					}, a.assignmentId))
				})
			]
		}, o.id))]
	});
}
//#endregion
export { mergePrefs as a, NotificationsPage as i, MyOrganizationsSection as n, NotificationSettingsPage as r, CertificatesSection as t };

//# sourceMappingURL=MeWave2-DqoxVVBB.js.map