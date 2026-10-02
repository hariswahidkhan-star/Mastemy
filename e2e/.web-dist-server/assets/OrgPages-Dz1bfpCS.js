import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, n as ButtonLink, r as ApiError, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, l as errorMessage, n as Notice, r as PageHeader, t as Badge, u as Spinner } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation, o as useCourses } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { l as useMyOrgs, m as w2keys, r as ORG_ROLES } from "./wave2-rI7jjNgp.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as Dialog, t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { t as Tabs } from "./Tabs-CKJGcPx4.js";
//#region src/pages/finalb/OrgTabs.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var ent = () => import("./Enterprise-DDsKnf7-.js");
var PathwayAssignmentsTab = (0, import_react.lazy)(() => ent().then((m) => ({ default: m.PathwayAssignmentsTab })));
var MaterialsTab = (0, import_react.lazy)(() => ent().then((m) => ({ default: m.MaterialsTab })));
var SeatsTab = (0, import_react.lazy)(() => ent().then((m) => ({ default: m.SeatsTab })));
var SsoTab = (0, import_react.lazy)(() => ent().then((m) => ({ default: m.SsoTab })));
function L({ children, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label }),
		children
	});
}
/** Enterprise phase 2 tabs on the organization page (Managers see pathways/materials; Admins also seats and SSO). */
function finalbOrgTabs(org, isOrgAdmin, t) {
	const tabs = [{
		id: "pathways",
		label: t("finalb.ent.tabs.pathways"),
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
			label: t("common.loading"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathwayAssignmentsTab, {
				org,
				canGrantPremium: isOrgAdmin
			})
		})
	}, {
		id: "materials",
		label: t("finalb.ent.tabs.materials"),
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
			label: t("common.loading"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaterialsTab, {
				org,
				isAdmin: isOrgAdmin
			})
		})
	}];
	if (isOrgAdmin) tabs.push({
		id: "seats",
		label: t("finalb.ent.tabs.seats"),
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
			label: t("common.loading"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatsTab, { org })
		})
	}, {
		id: "sso",
		label: t("finalb.ent.tabs.sso"),
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, {
			label: t("common.loading"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SsoTab, { org })
		})
	});
	return tabs;
}
//#endregion
//#region src/pages/orgs/OrgPages.tsx
var STAFF = ["Admin", "SuperAdmin"];
/** Enterprise problem codes with dedicated, translated explanations. */
var ORG_CODES = [
	"last_admin",
	"already_member",
	"seat_limit_reached",
	"seat_limit_below_usage",
	"slug_taken",
	"duplicate_assignment",
	"invalid_rows",
	"invalid_due_date",
	"invalid_email",
	"invitation_used",
	"invitation_expired",
	"org_inactive",
	"premium_scope_requires_admin"
];
function orgErrorMessage(e, t) {
	if (e instanceof ApiError) {
		const code = ORG_CODES.find((c) => e.is(c));
		if (code) return t(`orgs.err.${code}`);
	}
	return errorMessage(e, t);
}
function MyOrgsPage() {
	const { t } = useI18n();
	const { hasRole } = useAuth();
	const orgs = useMyOrgs();
	usePageMeta(t("orgs.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("orgs.title"),
			subtitle: t("orgs.subtitle"),
			actions: hasRole(...STAFF) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
				to: "/admin/orgs",
				variant: "secondary",
				size: "sm",
				children: t("orgs.adminAll")
			}) : null
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: orgs,
			children: (list) => {
				const managed = list.filter((o) => o.role === "Admin" || o.role === "Manager");
				return managed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("orgs.noneManaged"),
					description: t("orgs.noneManagedBody"),
					action: {
						label: t("nav.dashboard"),
						to: "/me"
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: managed.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								style: { marginBlockStart: 0 },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/orgs/${o.id}`,
									children: o.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`orgs.role.${o.role}`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted mono",
									children: o.slug
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: t("orgs.assignmentCount", { n: o.assignments.length })
							})
						]
					}, o.id))
				});
			}
		})]
	});
}
function MemberRow({ orgId, m, canManageRoles, onChanged }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [role, setRole] = (0, import_react.useState)(m.role);
	const [department, setDepartment] = (0, import_react.useState)(m.department);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const dirty = role !== m.role || department !== m.department;
	const save = useApiMutation(() => api(`/api/orgs/${orgId}/members/${m.userId}`, {
		method: "PATCH",
		body: {
			role: role !== m.role ? role : void 0,
			department
		}
	}), [], () => {
		toast.success(t("common.saved"));
		onChanged();
	});
	const remove = useApiMutation(() => api(`/api/orgs/${orgId}/members/${m.userId}`, { method: "DELETE" }), [], () => {
		setConfirm(false);
		toast.success(t("orgs.memberRemoved"));
		onChanged();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: m.displayName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "small muted",
			children: m.email ?? t("orgs.emailHidden")
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
			"aria-label": t("orgs.roleFor", { name: m.displayName }),
			value: role,
			disabled: !canManageRoles && m.role !== "Member",
			onChange: (e) => setRole(e.target.value),
			options: ORG_ROLES.filter((r) => canManageRoles || r === "Member" || r === m.role).map((r) => ({
				value: r,
				label: t(`orgs.role.${r}`)
			}))
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			"aria-label": t("orgs.departmentFor", { name: m.displayName }),
			value: department,
			maxLength: 100,
			onChange: (e) => setDepartment(e.target.value)
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(m.joinedAt) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					disabled: !dirty,
					loading: save.isPending,
					onClick: () => save.mutate(void 0),
					children: t("common.save")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => setConfirm(true),
					children: t("common.remove")
				})]
			}),
			save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field__error",
				role: "alert",
				children: orgErrorMessage(save.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirm,
				danger: true,
				title: t("orgs.removeTitle"),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("orgs.removeBody", { name: m.displayName }) }), remove.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: orgErrorMessage(remove.error, t)
				}) : null] }),
				confirmLabel: t("common.remove"),
				loading: remove.isPending,
				onCancel: () => {
					setConfirm(false);
					remove.reset();
				},
				onConfirm: () => remove.mutate(void 0)
			})
		] })
	] });
}
/** Bulk import preview: the commit button stays disabled unless the API says the batch can be committed. */
function BulkPreviewView({ preview, onCommit, committing }) {
	const { t } = useI18n();
	const errors = preview.rows.filter((r) => r.error);
	const canCommit = preview.canCommit && errors.length === 0 && preview.valid > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "success",
						children: t("orgs.bulkValid", { n: preview.valid })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: errors.length ? "danger" : "neutral",
						children: t("orgs.bulkErrors", { n: errors.length })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("orgs.bulkSeats", { n: preview.seatsAvailable }) })
				]
			}),
			preview.valid > preview.seatsAvailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				children: t("orgs.err.seat_limit_reached")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("orgs.line")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("auth.email")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("dashboard.status")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: preview.rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: r.error ? "row--error" : void 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.line }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.email }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "field__error",
								children: r.error
							}) : t("orgs.rowOk") })
						]
					}, r.line)) })]
				})
			}),
			!canCommit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("orgs.bulkFixFirst")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: onCommit,
				disabled: !canCommit,
				loading: committing,
				children: t("orgs.bulkCommit", { n: preview.valid })
			})
		]
	});
}
function invitationLink(token) {
	return `${typeof window !== "undefined" ? window.location.origin : ""}/org-invitations/accept?token=${encodeURIComponent(token)}`;
}
/** Accept links for new invitations; prominent when no email could be queued. */
function InvitationLinks({ invitations }) {
	const { t } = useI18n();
	const toast = useToast();
	if (invitations.length === 0) return null;
	const unsent = invitations.some((i) => !i.emailQueued);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
		tone: unsent ? "warning" : "success",
		title: t("orgs.invitationLinksTitle"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: { marginBlockStart: 0 },
			children: unsent ? t("orgs.invitationShareManually") : t("orgs.invitationEmailed")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "stack",
			style: {
				listStyle: "none",
				padding: 0
			},
			children: invitations.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: i.email }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					readOnly: true,
					className: "grow",
					"aria-label": t("orgs.invitationLinkFor", { email: i.email }),
					value: invitationLink(i.token),
					onFocus: (e) => e.currentTarget.select()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => {
						const text = invitationLink(i.token);
						const done = navigator.clipboard?.writeText(text);
						if (!done) {
							toast.error(t("orgs.copyFailed"));
							return;
						}
						done.then(() => toast.success(t("orgs.copied"))).catch(() => toast.error(t("orgs.copyFailed")));
					},
					children: t("orgs.copyLink")
				})]
			})] }, i.id))
		})]
	});
}
function BulkAdd({ orgId, onDone }) {
	const { t } = useI18n();
	const toast = useToast();
	const [csv, setCsv] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [preview, setPreview] = (0, import_react.useState)(null);
	const body = () => ({
		csv,
		department: department.trim() || void 0
	});
	const check = useApiMutation(() => api(`/api/orgs/${orgId}/members/bulk/preview`, {
		method: "POST",
		body: body()
	}), [], (r) => setPreview(r));
	const commit = useApiMutation(() => api(`/api/orgs/${orgId}/members/bulk`, {
		method: "POST",
		body: body()
	}), [w2keys.orgInvitations(orgId)], (r) => {
		toast.success(t("orgs.bulkDone", { n: r.invited }));
		setPreview(null);
		setCsv("");
		onDone(r.invitations);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card card--flat",
		"aria-labelledby": "bulk-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				id: "bulk-h",
				children: t("orgs.bulkTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("orgs.bulkHint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("orgs.csvFile"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "file",
					accept: ".csv,text/csv,text/plain",
					onChange: (e) => {
						const f = e.target.files?.[0];
						if (f) f.text().then((text) => {
							setCsv(text);
							setPreview(null);
						});
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("orgs.csvText"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 5,
					value: csv,
					onChange: (e) => {
						setCsv(e.target.value);
						setPreview(null);
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("orgs.department"),
				hint: t("orgs.bulkDepartmentHint"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: department,
					maxLength: 100,
					onChange: (e) => setDepartment(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				disabled: !csv.trim(),
				loading: check.isPending,
				onClick: () => check.mutate(void 0),
				children: t("orgs.bulkPreview")
			}),
			check.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: orgErrorMessage(check.error, t)
			}) : null,
			preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkPreviewView, {
				preview,
				committing: commit.isPending,
				onCommit: () => commit.mutate(void 0)
			}) : null,
			commit.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: orgErrorMessage(commit.error, t)
			}) : null
		]
	});
}
function PendingInvitations({ orgId }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const list = useQuery({
		queryKey: w2keys.orgInvitations(orgId),
		queryFn: () => api(`/api/orgs/${orgId}/invitations`)
	});
	const revoke = useApiMutation((id) => api(`/api/orgs/${orgId}/invitations/${id}`, { method: "DELETE" }), [w2keys.orgInvitations(orgId)], () => toast.success(t("orgs.invitationRevoked")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "inv-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				id: "inv-h",
				children: t("orgs.pendingInvitations")
			}),
			revoke.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: orgErrorMessage(revoke.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: t("orgs.noInvitations")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							i.email,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`orgs.role.${i.role}`) }),
							i.department ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small muted",
								children: [" · ", i.department]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small muted",
								children: [
									" ",
									"· ",
									t("orgs.expires", { date: fmtDate(i.expiresAt) })
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							loading: revoke.isPending && revoke.variables === i.id,
							onClick: () => revoke.mutate(i.id),
							"aria-label": t("orgs.revokeFor", { email: i.email }),
							children: t("orgs.revokeInvitation")
						})]
					}, i.id))
				})
			})
		]
	});
}
function MembersTab({ org, canManageRoles }) {
	const { t } = useI18n();
	const members = useQuery({
		queryKey: w2keys.orgMembers(org.id),
		queryFn: () => api(`/api/orgs/${org.id}/members`)
	});
	const [email, setEmail] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("Member");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [created, setCreated] = (0, import_react.useState)([]);
	const refresh = () => void members.refetch();
	const invite = useApiMutation(() => api(`/api/orgs/${org.id}/members`, {
		method: "POST",
		body: {
			email: email.trim(),
			role,
			department: department.trim() || void 0
		}
	}), [w2keys.org(org.id), w2keys.orgInvitations(org.id)], (r) => {
		setCreated([r]);
		setEmail("");
		setDepartment("");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("orgs.seats", {
					used: org.seatsUsed,
					limit: org.seatLimit
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card card--flat",
				onSubmit: (e) => {
					e.preventDefault();
					if (email.trim()) invite.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("orgs.addMember") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("orgs.addMemberHint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("auth.email"),
								className: "grow",
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("orgs.roleLabel"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: role,
									onChange: (e) => setRole(e.target.value),
									options: ORG_ROLES.filter((r) => canManageRoles || r === "Member").map((r) => ({
										value: r,
										label: t(`orgs.role.${r}`)
									}))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("orgs.department"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: department,
									maxLength: 100,
									onChange: (e) => setDepartment(e.target.value)
								})
							})
						]
					}),
					invite.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: orgErrorMessage(invite.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: invite.isPending,
						disabled: !email.trim(),
						children: t("orgs.add")
					})
				]
			}),
			created.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					children: t("orgs.invitationSent")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvitationLinks, { invitations: created })]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PendingInvitations, { orgId: org.id }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("orgs.members") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: members,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("orgs.noMembers") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.member")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.roleLabel")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.department")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.joined")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("common.actions")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberRow, {
							orgId: org.id,
							m,
							canManageRoles,
							onChanged: refresh
						}, `${m.userId}-${m.role}-${m.department}`)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkAdd, {
				orgId: org.id,
				onDone: setCreated
			})
		]
	});
}
/** <input type="date"> value → end of that day in local time, as ISO (the API requires a future date). */
function dueDateToIso(date) {
	if (!date) return void 0;
	const d = /* @__PURE__ */ new Date(`${date}T23:59:00`);
	return Number.isNaN(d.getTime()) ? void 0 : d.toISOString();
}
function AssignmentsTab({ org, canGrantPremium }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const assignments = useQuery({
		queryKey: w2keys.orgAssignments(org.id),
		queryFn: () => api(`/api/orgs/${org.id}/assignments`)
	});
	const members = useQuery({
		queryKey: w2keys.orgMembers(org.id),
		queryFn: () => api(`/api/orgs/${org.id}/members`)
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const courses = useCourses({
		q: search || void 0,
		page: 1
	});
	const [courseId, setCourseId] = (0, import_react.useState)("");
	const [scope, setScope] = (0, import_react.useState)("Organization");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [userId, setUserId] = (0, import_react.useState)("");
	const [due, setDue] = (0, import_react.useState)("");
	const [premium, setPremium] = (0, import_react.useState)(false);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const departments = Array.from(new Set((members.data ?? []).map((m) => m.department).filter(Boolean)));
	const create = useApiMutation(() => api(`/api/orgs/${org.id}/assignments`, {
		method: "POST",
		body: {
			courseId,
			userId: scope === "User" ? userId : void 0,
			department: scope === "Department" ? department : void 0,
			dueAt: dueDateToIso(due),
			grantsPremium: premium
		}
	}), [w2keys.orgAssignments(org.id), w2keys.orgReport(org.id)], () => {
		toast.success(t("orgs.assigned"));
		setDue("");
		setPremium(false);
	});
	const remove = useApiMutation((id) => api(`/api/orgs/${org.id}/assignments/${id}`, { method: "DELETE" }), [w2keys.orgAssignments(org.id), w2keys.orgReport(org.id)], () => setToDelete(null));
	const memberName = (id) => members.data?.find((m) => m.userId === id)?.displayName ?? id ?? "";
	const valid = !!courseId && (scope === "Organization" || scope === "Department" && !!department.trim() || scope === "User" && !!userId);
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card card--flat",
				onSubmit: (e) => {
					e.preventDefault();
					if (valid) create.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("orgs.assignCourse") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("orgs.findCourse"),
							className: "grow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "search",
								value: q,
								onChange: (e) => setQ(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setSearch(q.trim()),
							children: t("courses.searchButton")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("orgs.course"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: courseId,
							onChange: (e) => setCourseId(e.target.value),
							placeholder: courses.isPending ? t("common.loading") : t("orgs.chooseCourse"),
							options: (courses.data?.items ?? []).map((c) => ({
								value: c.id,
								label: c.title
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("orgs.scope"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: scope,
									onChange: (e) => setScope(e.target.value),
									options: [
										"Organization",
										"Department",
										"User"
									].map((s) => ({
										value: s,
										label: t(`orgs.scopeOpt.${s}`)
									}))
								})
							}),
							scope === "Department" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("orgs.department"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									list: "org-departments",
									value: department,
									maxLength: 100,
									onChange: (e) => setDepartment(e.target.value)
								})
							}) : null,
							scope === "User" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("orgs.member"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: userId,
									onChange: (e) => setUserId(e.target.value),
									placeholder: t("orgs.chooseMember"),
									options: (members.data ?? []).map((m) => ({
										value: m.userId,
										label: `${m.displayName} (${m.email})`
									}))
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("orgs.dueDate"),
								hint: t("orgs.dueHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									min: today,
									value: due,
									onChange: (e) => setDue(e.target.value)
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
						id: "org-departments",
						children: departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: d }, d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: t("orgs.grantPremium"),
						hint: canGrantPremium ? t("orgs.grantPremiumHint") : t("orgs.grantPremiumAdminOnly"),
						checked: premium,
						disabled: !canGrantPremium,
						onChange: (e) => setPremium(e.target.checked)
					}),
					create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: orgErrorMessage(create.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !valid,
						loading: create.isPending,
						children: t("orgs.assign")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: assignments,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("orgs.noAssignments") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.course")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.scope")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.dueDate")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.premium")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("common.actions")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.courseTitle }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								t(`orgs.scopeOpt.${a.scope}`),
								a.scope === "Department" ? `: ${a.department}` : "",
								a.scope === "User" ? `: ${memberName(a.userId)}` : ""
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.dueAt ? fmtDate(a.dueAt) : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.grantsPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "accent",
								children: t("common.yes")
							}) : t("common.no") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => setToDelete(a),
								children: t("common.remove")
							}) })
						] }, a.id)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!toDelete,
				danger: true,
				title: t("orgs.unassignTitle"),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("orgs.unassignBody", { title: toDelete?.courseTitle ?? "" }) }), remove.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: orgErrorMessage(remove.error, t)
				}) : null] }),
				confirmLabel: t("common.remove"),
				loading: remove.isPending,
				onCancel: () => setToDelete(null),
				onConfirm: () => toDelete && remove.mutate(toDelete.id)
			})
		]
	});
}
function ReportTab({ org }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [downloading, setDownloading] = (0, import_react.useState)(false);
	const report = useQuery({
		queryKey: w2keys.orgReport(org.id),
		queryFn: () => api(`/api/orgs/${org.id}/reports/progress`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "row row--between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("orgs.reportHint")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "sm",
				loading: downloading,
				onClick: () => {
					setDownloading(true);
					downloadFile(`/api/orgs/${org.id}/reports/progress?format=csv`, `${org.slug}-progress.csv`).catch((e) => toast.error(errorMessage(e, t))).finally(() => setDownloading(false));
				},
				children: t("orgs.downloadCsv")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: report,
			children: (rows) => rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("orgs.reportEmpty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
							className: "visually-hidden",
							children: t("orgs.report")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.member")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.department")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.course")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.progress")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.bestScore")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("dashboard.status")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orgs.dueDate")
							})
						] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [r.displayName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "small muted",
								children: r.email
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.department || "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.courseTitle }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t("orgs.lessonsDone", {
								done: r.completedLessons,
								total: r.totalLessons,
								pct: Math.round(r.progressPercent)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.bestScorePercent != null ? `${Math.round(r.bestScorePercent)}%` : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								r.passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "success",
									children: t("result.passed")
								}) : null,
								" ",
								r.overdue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "danger",
									children: t("orgs.overdue")
								}) : null,
								" ",
								r.certificateCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/verify/${encodeURIComponent(r.certificateCode)}`,
									children: r.certificateCode
								}) : null,
								!r.passed && !r.overdue && !r.certificateCode ? t("orgs.inProgress") : null
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.dueAt ? fmtDate(r.dueAt) : "—" })
						] }, `${r.userId}-${r.courseId}`)) })
					]
				})
			})
		})]
	});
}
function OrgPage() {
	const { id = "" } = useParams();
	const { t } = useI18n();
	const { hasRole } = useAuth();
	const [params, setParams] = useSearchParams();
	const tab = params.get("tab") ?? "members";
	const org = useQuery({
		queryKey: w2keys.org(id),
		queryFn: () => api(`/api/orgs/${id}`),
		retry: false
	});
	const myRole = useMyOrgs().data?.find((o) => o.id === id)?.role;
	const isOrgAdmin = hasRole(...STAFF) || myRole === "Admin";
	usePageMeta(org.data?.name ?? t("orgs.title"), void 0, { noindex: true });
	if (org.isError && org.error instanceof ApiError && org.error.status === 404) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: t("orgs.notFound"),
			description: t("orgs.notFoundBody"),
			action: {
				label: t("orgs.title"),
				to: "/orgs"
			}
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: org,
			children: (o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": t("common.breadcrumb"),
					className: "small muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/orgs",
							children: t("orgs.title")
						}),
						" / ",
						o.name
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: o.name,
					subtitle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono",
								children: o.slug
							}),
							o.isActive ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "danger",
								children: t("orgs.inactive")
							}),
							myRole ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`orgs.role.${myRole}`) }) : null
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					label: t("orgs.tabs"),
					value: tab,
					onChange: (v) => setParams({ tab: v }, { replace: true }),
					tabs: [
						{
							id: "members",
							label: t("orgs.members"),
							content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MembersTab, {
								org: o,
								canManageRoles: isOrgAdmin
							})
						},
						{
							id: "assignments",
							label: t("orgs.assignments"),
							content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignmentsTab, {
								org: o,
								canGrantPremium: isOrgAdmin
							})
						},
						{
							id: "report",
							label: t("orgs.report"),
							content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportTab, { org: o })
						},
						...finalbOrgTabs(o, isOrgAdmin, t)
					]
				})
			] })
		})
	});
}
function OrgForm({ initial, onSubmit, pending, error, submitLabel }) {
	const { t } = useI18n();
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [slug, setSlug] = (0, import_react.useState)(initial?.slug ?? "");
	const [seats, setSeats] = (0, import_react.useState)(String(initial?.seatLimit ?? 10));
	const slugOk = /^[a-z0-9-]{1,64}$/.test(slug);
	const seatsN = Number(seats);
	const seatsOk = Number.isInteger(seatsN) && seatsN >= 1 && seatsN <= 1e5;
	const nameOk = name.trim().length >= 2 && name.trim().length <= 200;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => {
			e.preventDefault();
			if (slugOk && seatsOk && nameOk) onSubmit({
				name: name.trim(),
				slug,
				seatLimit: seatsN
			});
		},
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("orgs.name"),
						required: true,
						className: "grow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							maxLength: 200,
							onChange: (e) => setName(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("orgs.slug"),
						hint: t("orgs.slugHint"),
						error: slug && !slugOk ? t("orgs.slugInvalid") : void 0,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: slug,
							maxLength: 64,
							onChange: (e) => setSlug(e.target.value.toLowerCase())
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("orgs.seatLimit"),
						error: !seatsOk ? t("orgs.seatsInvalid") : void 0,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 1e5,
							value: seats,
							onChange: (e) => setSeats(e.target.value)
						})
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: orgErrorMessage(error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				loading: pending,
				disabled: !slugOk || !seatsOk || !nameOk,
				children: submitLabel
			})
		]
	});
}
function AdminOrgsPage() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	usePageMeta(t("orgs.adminTitle"), void 0, { noindex: true });
	const orgs = useQuery({
		queryKey: w2keys.adminOrgs,
		queryFn: () => api("/api/admin/orgs")
	});
	const [formKey, setFormKey] = (0, import_react.useState)(0);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [toggling, setToggling] = (0, import_react.useState)(null);
	const create = useApiMutation((v) => api("/api/admin/orgs", {
		method: "POST",
		body: v
	}), [w2keys.adminOrgs], (o) => {
		toast.success(t("orgs.created", { name: o.name }));
		setFormKey((k) => k + 1);
	});
	const update = useApiMutation((v) => api(`/api/admin/orgs/${v.id}`, {
		method: "PUT",
		body: {
			name: v.name,
			slug: v.slug,
			seatLimit: v.seatLimit
		}
	}), [w2keys.adminOrgs], () => {
		setEditing(null);
		toast.success(t("common.saved"));
	});
	const toggle = useApiMutation((o) => api(`/api/admin/orgs/${o.id}/${o.isActive ? "deactivate" : "reactivate"}`, { method: "POST" }), [w2keys.adminOrgs], (o) => {
		setToggling(null);
		toast.success(o.isActive ? t("orgs.reactivated") : t("orgs.deactivated"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("orgs.adminTitle"),
			subtitle: t("orgs.adminSubtitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("orgs.create") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgForm, {
				onSubmit: (v) => create.mutate(v),
				pending: create.isPending,
				error: create.error,
				submitLabel: t("orgs.create")
			}, formKey)]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: orgs,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("orgs.noneYet") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				style: { marginBlockStart: "var(--space-4)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("orgs.name")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("orgs.seatLimit")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("dashboard.status")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("dashboard.date")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("common.actions")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/orgs/${o.id}`,
							children: o.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "small muted mono",
							children: o.slug
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t("orgs.seats", {
							used: o.seatsUsed,
							limit: o.seatLimit
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: t("orgs.active")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "danger",
							children: t("orgs.inactive")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(o.createdAt) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setEditing(o),
								children: t("common.edit")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => setToggling(o),
								children: o.isActive ? t("orgs.deactivate") : t("orgs.reactivate")
							})]
						}) })
					] }, o.id)) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			title: t("orgs.editTitle"),
			onClose: () => setEditing(null),
			wide: true,
			children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrgForm, {
				initial: editing,
				onSubmit: (v) => update.mutate({
					id: editing.id,
					...v
				}),
				pending: update.isPending,
				error: update.error,
				submitLabel: t("common.save")
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!toggling,
			danger: !!toggling?.isActive,
			title: toggling?.isActive ? t("orgs.deactivateTitle") : t("orgs.reactivateTitle"),
			body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: toggling?.isActive ? t("orgs.deactivateBody") : t("orgs.reactivateBody") }), toggle.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: orgErrorMessage(toggle.error, t)
			}) : null] }),
			confirmLabel: toggling?.isActive ? t("orgs.deactivate") : t("orgs.reactivate"),
			loading: toggle.isPending,
			onCancel: () => setToggling(null),
			onConfirm: () => toggling && toggle.mutate(toggling)
		})
	] });
}
/** /org-invitations/accept?token=… — the invited person accepts while signed in with the invited email. */
function AcceptInvitationPage() {
	const { t } = useI18n();
	const { user } = useAuth();
	const [params] = useSearchParams();
	const token = params.get("token") ?? "";
	usePageMeta(t("orgs.acceptTitle"), void 0, { noindex: true });
	const accept = useApiMutation(() => api("/api/org-invitations/accept", {
		method: "POST",
		body: { token }
	}), [w2keys.myOrgs]);
	const failure = accept.error instanceof ApiError && accept.error.status === 404 ? t("orgs.acceptNotFound", { email: user?.email ?? "" }) : accept.error ? orgErrorMessage(accept.error, t) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("orgs.acceptTitle") }), !token ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "warning",
			children: t("orgs.acceptNoToken")
		}) : accept.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
			tone: "success",
			title: t("orgs.acceptDone", { name: accept.data.organizationName }),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: { marginBlockStart: 0 },
				children: t("orgs.acceptedAs", { role: t(`orgs.role.${accept.data.role}`) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
				to: "/me",
				size: "sm",
				children: t("nav.dashboard")
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stack",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("orgs.acceptBody", { email: user?.email ?? "" }) }),
				failure ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: failure
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: accept.isPending,
					onClick: () => accept.mutate(void 0),
					children: t("orgs.accept")
				}) })
			]
		})]
	});
}
//#endregion
export { AcceptInvitationPage, AdminOrgsPage, BulkPreviewView, MyOrgsPage, OrgPage, dueDateToIso, invitationLink, orgErrorMessage };

//# sourceMappingURL=OrgPages-Dz1bfpCS.js.map