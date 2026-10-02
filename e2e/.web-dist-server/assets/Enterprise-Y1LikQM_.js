import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, r as ApiError, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, l as errorMessage, n as Notice, o as QueryStatus, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { C as usePathways, p as loc } from "./discover-CtKiK6mW.js";
import { n as problemCode } from "./commerce-DIIG05BW.js";
import { n as CStatus } from "./shared-B2SaZ9p1.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { m as w2keys } from "./wave2-rI7jjNgp.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as Dialog, t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { c as fbKeys, l as fmtBytes } from "./finalb-tCQ9cZ9j.js";
//#region src/pages/finalb/Enterprise.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var CODES = [
	"public_email_domain",
	"domain_verification_failed",
	"dns_unavailable",
	"domain_claimed",
	"domain_rejected",
	"note_required",
	"pathway_has_no_live_courses",
	"duplicate_assignment",
	"premium_scope_requires_admin",
	"quota_exceeded",
	"malware_detected",
	"seat_request_pending",
	"invalid_issuer",
	"invalid_client_id",
	"invalid_domains",
	"invalid_client_secret",
	"seat_limit_below_usage"
];
function enterpriseError(e, t) {
	const code = problemCode(e);
	if (CODES.includes(code)) return t(`finalb.ent.err.${code}`);
	if (e instanceof ApiError) {
		if (e.status === 413) return t("finalb.ent.err.tooLarge");
		if (e.status === 415) return t("finalb.ent.err.fileType");
		if (e.status === 503 && !code) return t("finalb.ent.err.scanner");
	}
	return errorMessage(e, t);
}
function dueIso(date) {
	if (!date) return null;
	const d = /* @__PURE__ */ new Date(`${date}T23:59:00`);
	return Number.isNaN(d.getTime()) ? null : d.toISOString();
}
function PathwayAssignmentsTab({ org, canGrantPremium }) {
	const { t, lang, fmtDate } = useI18n();
	const toast = useToast();
	const list = useQuery({
		queryKey: fbKeys.pathwayAssignments(org.id),
		queryFn: () => api(`/api/orgs/${org.id}/pathway-assignments`)
	});
	const pathways = usePathways();
	const members = useQuery({
		queryKey: w2keys.orgMembers(org.id),
		queryFn: () => api(`/api/orgs/${org.id}/members`)
	});
	const courseAssignments = useQuery({
		queryKey: w2keys.orgAssignments(org.id),
		queryFn: () => api(`/api/orgs/${org.id}/assignments`)
	});
	const title = (id) => courseAssignments.data?.find((a) => a.courseId === id)?.courseTitle ?? id;
	const [pathwayId, setPathwayId] = (0, import_react.useState)("");
	const [scope, setScope] = (0, import_react.useState)("Organization");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [userId, setUserId] = (0, import_react.useState)("");
	const [due, setDue] = (0, import_react.useState)("");
	const [premium, setPremium] = (0, import_react.useState)(false);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const departments = Array.from(new Set((members.data ?? []).map((m) => m.department).filter(Boolean)));
	const invalidate = [
		fbKeys.pathwayAssignments(org.id),
		w2keys.orgAssignments(org.id),
		w2keys.orgReport(org.id)
	];
	const create = useApiMutation(() => api(`/api/orgs/${org.id}/pathway-assignments`, {
		method: "POST",
		body: {
			pathwayId,
			userId: scope === "User" ? userId : null,
			department: scope === "Department" ? department.trim() : null,
			dueAt: dueIso(due),
			grantsPremium: premium
		}
	}), invalidate, (r) => {
		toast.success(t("finalb.ent.pathways.assigned", {
			n: r.courseIds.length,
			skipped: r.skippedCourseIds.length
		}));
		setDue("");
		setPremium(false);
	});
	const remove = useApiMutation((id) => api(`/api/orgs/${org.id}/pathway-assignments/${id}`, { method: "DELETE" }), invalidate, () => setToDelete(null));
	const valid = !!pathwayId && (scope === "Organization" || scope === "Department" && !!department.trim() || scope === "User" && !!userId);
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const memberName = (id) => members.data?.find((m) => m.userId === id)?.displayName ?? id ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				"aria-labelledby": "pw-assign-h",
				onSubmit: (e) => {
					e.preventDefault();
					if (valid) create.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "pw-assign-h",
						children: t("finalb.ent.pathways.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finalb.ent.pathways.note")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("finalb.ent.pathways.pathway"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: pathwayId,
									onChange: (e) => setPathwayId(e.target.value),
									placeholder: pathways.isPending ? t("common.loading") : t("finalb.ent.choose"),
									options: (pathways.data ?? []).map((p) => ({
										value: p.id,
										label: `${loc(lang, p.titleEn, p.titleAr)} · ${t("finalb.ent.pathways.courses", { n: p.courseCount })}`
									}))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("finalb.ent.scope"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: scope,
									onChange: (e) => setScope(e.target.value),
									options: [
										{
											value: "Organization",
											label: t("finalb.ent.scopeOrg")
										},
										{
											value: "Department",
											label: t("finalb.ent.scopeDept")
										},
										{
											value: "User",
											label: t("finalb.ent.scopeUser")
										}
									]
								})
							}),
							scope === "Department" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("finalb.ent.department"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: department,
									list: "pw-depts",
									onChange: (e) => setDepartment(e.target.value)
								})
							}) : null,
							scope === "User" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: members }) : null,
							scope === "User" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("finalb.ent.member"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: userId,
									onChange: (e) => setUserId(e.target.value),
									placeholder: t("finalb.ent.choose"),
									options: (members.data ?? []).map((m) => ({
										value: m.userId,
										label: m.email ? `${m.displayName} (${m.email})` : m.displayName
									}))
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("finalb.ent.due"),
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
						id: "pw-depts",
						children: departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: d }, d))
					}),
					canGrantPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: t("finalb.ent.premium"),
						hint: t("finalb.ent.premiumHint"),
						checked: premium,
						onChange: (e) => setPremium(e.target.checked)
					}) : null,
					create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: enterpriseError(create.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !valid,
						loading: create.isPending,
						children: t("finalb.ent.pathways.assign")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (rows) => rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("finalb.ent.pathways.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					"data-testid": "pathway-assignments",
					children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: a.pathwayTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "danger",
									onClick: () => setToDelete(a),
									children: t("common.remove")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "small",
								children: [
									a.scope === "User" ? t("finalb.ent.forUser", { name: memberName(a.userId) }) : a.scope === "Department" ? t("finalb.ent.forDept", { dept: a.department ?? "" }) : t("finalb.ent.forOrg"),
									" ",
									"·",
									" ",
									a.dueAt ? t("finalb.ent.dueOn", { date: fmtDate(a.dueAt) }) : t("finalb.ent.noDue"),
									" ",
									a.grantsPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "accent",
										children: t("finalb.ent.premiumBadge")
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								style: { marginBlockEnd: 0 },
								children: t("finalb.ent.pathways.expanded", { n: a.courseIds.length })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "small",
								children: a.courseIds.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: title(c) }, c))
							}),
							a.skippedCourseIds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								style: { marginBlockEnd: 0 },
								children: t("finalb.ent.pathways.skipped", { n: a.skippedCourseIds.length })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "small muted",
								children: a.skippedCourseIds.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: title(c) }, c))
							})] }) : null
						]
					}, a.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!toDelete,
				danger: true,
				title: t("finalb.ent.pathways.removeTitle"),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("finalb.ent.pathways.removeBody", { title: toDelete?.pathwayTitle ?? "" }) }), remove.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: enterpriseError(remove.error, t)
				}) : null] }),
				confirmLabel: t("common.remove"),
				loading: remove.isPending,
				onCancel: () => setToDelete(null),
				onConfirm: () => toDelete && remove.mutate(toDelete.id)
			})
		]
	});
}
function scanTone(v) {
	return v === "Clean" ? "success" : v === "Infected" ? "danger" : "warning";
}
function MaterialRow({ m, onDelete }) {
	const { t, fmtDate } = useI18n();
	const [err, setErr] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "card card--flat",
		"data-material-title": m.title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "row row--between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: m.title }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "small muted",
					children: [
						m.fileName,
						" · ",
						fmtBytes(m.sizeBytes),
						" · ",
						fmtDate(m.createdAt),
						m.department ? ` · ${t("finalb.ent.forDept", { dept: m.department })}` : ""
					]
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: scanTone(m.scanVerdict),
					children: t("finalb.ent.materials.scan", { verdict: m.scanVerdict })
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => downloadFile(m.downloadUrl, m.fileName).catch((e) => setErr(errorMessage(e, t))),
					children: t("finalb.ent.materials.download")
				}), onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "danger",
					onClick: () => onDelete(m),
					children: t("common.delete")
				}) : null]
			})]
		}), err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: err
		}) : null]
	});
}
function MaterialsTab({ org, isAdmin }) {
	const { t } = useI18n();
	const toast = useToast();
	const list = useQuery({
		queryKey: fbKeys.materials(org.id),
		queryFn: () => api(`/api/orgs/${org.id}/materials`)
	});
	const fileRef = (0, import_react.useRef)(null);
	const [file, setFile] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const upload = useApiMutation(() => {
		const fd = new FormData();
		fd.append("file", file);
		const q = new URLSearchParams({ title: title.trim() || (file?.name ?? "") });
		if (department.trim()) q.set("department", department.trim());
		return api(`/api/orgs/${org.id}/materials?${q.toString()}`, {
			method: "POST",
			body: fd
		});
	}, [fbKeys.materials(org.id)], () => {
		toast.success(t("finalb.ent.materials.uploaded"));
		setFile(null);
		setTitle("");
		if (fileRef.current) fileRef.current.value = "";
	});
	const remove = useApiMutation((id) => api(`/api/orgs/${org.id}/materials/${id}`, { method: "DELETE" }), [fbKeys.materials(org.id)], () => setToDelete(null));
	const used = (list.data ?? []).reduce((n, m) => n + m.sizeBytes, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				"aria-labelledby": "mat-up-h",
				onSubmit: (e) => {
					e.preventDefault();
					if (file) upload.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "mat-up-h",
						children: t("finalb.ent.materials.upload")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finalb.ent.materials.note")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("finalb.ent.materials.file"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									ref: fileRef,
									type: "file",
									onChange: (e) => setFile(e.target.files?.[0] ?? null)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("finalb.ent.materials.titleField"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: title,
									maxLength: 200,
									onChange: (e) => setTitle(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("finalb.ent.department"),
								hint: t("finalb.ent.materials.deptHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: department,
									onChange: (e) => setDepartment(e.target.value)
								})
							})
						]
					}),
					upload.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: enterpriseError(upload.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !file,
						loading: upload.isPending,
						children: t("finalb.ent.materials.uploadBtn")
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (rows) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						"data-testid": "materials-usage",
						children: t("finalb.ent.materials.usage", {
							used: fmtBytes(used),
							n: rows.length
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finalb.ent.materials.quotaNote")
					})]
				}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("finalb.ent.materials.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: rows.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaterialRow, {
						m,
						onDelete: isAdmin ? setToDelete : void 0
					}, m.id))
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!toDelete,
				danger: true,
				title: t("finalb.ent.materials.deleteTitle"),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: toDelete?.title }), remove.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: enterpriseError(remove.error, t)
				}) : null] }),
				confirmLabel: t("common.delete"),
				loading: remove.isPending,
				onCancel: () => setToDelete(null),
				onConfirm: () => toDelete && remove.mutate(toDelete.id)
			})
		]
	});
}
/** Member view on /me: the organization's private materials this member may download. */
function OrgMaterialsList({ orgId }) {
	const { t } = useI18n();
	const list = useQuery({
		queryKey: fbKeys.materials(orgId),
		queryFn: () => api(`/api/orgs/${orgId}/materials`),
		retry: false
	});
	if (list.isPending || list.isError || list.data.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
		style: { marginBlockEnd: 0 },
		children: t("finalb.ent.materials.memberTitle")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "stack",
		style: {
			listStyle: "none",
			padding: 0
		},
		"data-testid": "member-materials",
		children: list.data.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaterialRow, { m }, m.id))
	})] });
}
function InvoicePdfButton({ o, staff }) {
	const { t } = useI18n();
	const [err, setErr] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "ghost",
		onClick: () => downloadFile(staff ? `/api/admin/invoices/${o.invoiceId}/pdf` : `/api/me/invoices/${o.invoiceId}/pdf`, `${o.invoiceNumber}.pdf`).catch((e) => setErr(errorMessage(e, t))),
		children: t("finalb.ent.seats.invoicePdf", { number: o.invoiceNumber })
	}), err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "small",
		role: "alert",
		children: err
	}) : null] });
}
function SeatsTab({ org }) {
	const { t, fmtDate, fmtMoney } = useI18n();
	const toast = useToast();
	const requests = useQuery({
		queryKey: fbKeys.seatRequests(org.id),
		queryFn: () => api(`/api/orgs/${org.id}/seat-requests`)
	});
	const orders = useQuery({
		queryKey: fbKeys.orgOrders(org.id),
		queryFn: () => api(`/api/orgs/${org.id}/enterprise-orders`)
	});
	const [qty, setQty] = (0, import_react.useState)("10");
	const [note, setNote] = (0, import_react.useState)("");
	const n = Number(qty);
	const valid = Number.isInteger(n) && n >= 1 && n <= 1e5;
	const create = useApiMutation(() => api(`/api/orgs/${org.id}/seat-requests`, {
		method: "POST",
		body: {
			quantity: n,
			note: note.trim() || null
		}
	}), [fbKeys.seatRequests(org.id)], () => {
		toast.success(t("finalb.ent.seats.requested"));
		setNote("");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("orgs.seats", {
				used: org.seatsUsed,
				limit: org.seatLimit
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				"aria-labelledby": "seat-h",
				onSubmit: (e) => {
					e.preventDefault();
					if (valid) create.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "seat-h",
						children: t("finalb.ent.seats.request")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finalb.ent.seats.note")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("finalb.ent.seats.quantity"),
							required: true,
							error: qty && !valid ? t("finalb.ent.seats.qtyRange") : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								max: 1e5,
								value: qty,
								onChange: (e) => setQty(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("finalb.ent.seats.noteField"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 2,
								maxLength: 2e3,
								value: note,
								onChange: (e) => setNote(e.target.value)
							})
						})]
					}),
					create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: enterpriseError(create.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !valid,
						loading: create.isPending,
						children: t("finalb.ent.seats.submit")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "seat-req-h",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "seat-req-h",
					children: t("finalb.ent.seats.requests")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: requests,
					children: (rows) => rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("finalb.ent.seats.noRequests")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						t("finalb.ent.seats.qty", { n: r.quantity }),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: r.status }),
						" ·",
						" ",
						fmtDate(r.createdAt),
						r.decisionNote ? ` · ${r.decisionNote}` : ""
					] }, r.id)) })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "seat-ord-h",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "seat-ord-h",
					children: t("finalb.ent.seats.orders")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: orders,
					children: (rows) => rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("finalb.ent.seats.noOrders")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "stack",
						style: {
							listStyle: "none",
							padding: 0
						},
						children: rows.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "card card--flat",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									o.invoiceNumber,
									" · ",
									t("finalb.ent.seats.qty", { n: o.quantity }),
									" ·",
									" ",
									fmtMoney(o.total, o.currency),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: o.status })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicePdfButton, {
									o,
									staff: false
								})]
							}), o.status === "AwaitingPayment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small pre-wrap",
								children: o.paymentInstructions
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("finalb.ent.seats.paidOn", { date: fmtDate(o.paidAt) })
							})]
						}, o.id))
					})
				})]
			})
		]
	});
}
function SsoTab({ org }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const cfg = useQuery({
		queryKey: fbKeys.sso(org.id),
		queryFn: async () => {
			try {
				return await api(`/api/orgs/${org.id}/sso`);
			} catch (e) {
				if (e instanceof ApiError && e.status === 404) return null;
				throw e;
			}
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: cfg,
		children: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SsoForm, {
			org,
			current: c,
			onSaved: () => toast.success(t("finalb.sso.saved")),
			fmtDate
		}, c?.updatedAt ?? "new")
	});
}
function SsoForm({ org, current, onSaved, fmtDate }) {
	const { t } = useI18n();
	const [issuer, setIssuer] = (0, import_react.useState)(current?.issuer ?? "");
	const [clientId, setClientId] = (0, import_react.useState)(current?.clientId ?? "");
	const [secret, setSecret] = (0, import_react.useState)("");
	const [domains, setDomains] = (0, import_react.useState)((current?.allowedDomains ?? []).join("\n"));
	const [enabled, setEnabled] = (0, import_react.useState)(current?.enabled ?? true);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const domainList = domains.split(/[\s,]+/).map((d) => d.trim().replace(/^@/, "").toLowerCase()).filter(Boolean);
	const valid = /^https?:\/\//.test(issuer.trim()) && clientId.trim().length > 0 && domainList.length >= 1 && domainList.length <= 50 && (!!current || secret.trim().length > 0);
	const save = useApiMutation(() => {
		const body = {
			issuer: issuer.trim(),
			clientId: clientId.trim(),
			clientSecret: secret.trim() || null,
			allowedDomains: domainList,
			enabled
		};
		return api(`/api/orgs/${org.id}/sso`, {
			method: "PUT",
			body
		});
	}, [fbKeys.sso(org.id)], () => {
		setSecret("");
		onSaved();
	});
	const remove = useApiMutation(() => api(`/api/orgs/${org.id}/sso`, { method: "DELETE" }), [fbKeys.sso(org.id)], () => setConfirmDelete(false));
	const testPath = `/sso/${org.slug}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				"aria-labelledby": "sso-h",
				onSubmit: (e) => {
					e.preventDefault();
					if (valid) save.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "sso-h",
						children: t("finalb.sso.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finalb.sso.note")
					}),
					current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "small",
						children: [
							current.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: t("finalb.sso.enabled")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("finalb.sso.disabled") }),
							" ",
							t("finalb.sso.updated", { date: fmtDate(current.updatedAt) })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "info",
						children: t("finalb.sso.none")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("finalb.sso.issuer"),
						hint: t("finalb.sso.issuerHint"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "url",
							value: issuer,
							onChange: (e) => setIssuer(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("finalb.sso.clientId"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: clientId,
							autoComplete: "off",
							onChange: (e) => setClientId(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("finalb.sso.secret"),
						hint: current?.hasClientSecret ? t("finalb.sso.secretKeep") : t("finalb.sso.secretRequired"),
						required: !current,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							autoComplete: "new-password",
							value: secret,
							onChange: (e) => setSecret(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("finalb.sso.domains"),
						hint: t("finalb.sso.domainsHint"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							value: domains,
							onChange: (e) => setDomains(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: t("finalb.sso.enable"),
						checked: enabled,
						onChange: (e) => setEnabled(e.target.checked)
					}),
					current?.redirectUri ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "small",
						children: [
							t("finalb.sso.redirectUri"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: current.redirectUri })
						]
					}) : current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						children: t("finalb.sso.serverNotConfigured")
					}) : null,
					save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: enterpriseError(save.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: !valid,
							loading: save.isPending,
							children: t("common.save")
						}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "danger",
							onClick: () => setConfirmDelete(true),
							children: t("finalb.sso.remove")
						}) : null]
					})
				]
			}),
			current && current.domains.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SsoDomainsCard, {
				org,
				current
			}) : null,
			current?.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "sso-test-h",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "sso-test-h",
						children: t("finalb.sso.testTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("finalb.sso.testNote")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: testPath,
						target: "_blank",
						rel: "noopener",
						children: [window.location.origin, testPath]
					}) })
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmDelete,
				danger: true,
				title: t("finalb.sso.remove"),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("finalb.sso.removeBody") }), remove.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: enterpriseError(remove.error, t)
				}) : null] }),
				confirmLabel: t("finalb.sso.remove"),
				loading: remove.isPending,
				onCancel: () => setConfirmDelete(false),
				onConfirm: () => remove.mutate(void 0)
			})
		]
	});
}
function SsoDomainsCard({ org, current }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [checking, setChecking] = (0, import_react.useState)(null);
	const verify = useApiMutation((id) => api(`/api/orgs/${org.id}/sso/domains/${id}/verify`, { method: "POST" }), [fbKeys.sso(org.id)], (d) => toast.success(t("finalb.sso.dom.verifiedToast", { domain: d.domain })));
	const tone = (s) => s === "Verified" ? "success" : s === "Rejected" ? "danger" : "warning";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card stack",
		"aria-labelledby": "sso-dom-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				id: "sso-dom-h",
				children: t("finalb.sso.dom.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finalb.sso.dom.note")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "stack",
				style: {
					listStyle: "none",
					padding: 0
				},
				"data-testid": "sso-domains",
				children: current.domains.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "card card--flat stack",
					"data-domain": d.domain,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: d.domain }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: tone(d.status),
							children: t(`finalb.sso.dom.status.${d.status}`)
						})]
					}), d.status === "Verified" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: d.verifiedVia === "staff" ? t("finalb.sso.dom.viaStaff", { date: d.verifiedAt ? fmtDate(d.verifiedAt) : "" }) : t("finalb.sso.dom.viaDns", { date: d.verifiedAt ? fmtDate(d.verifiedAt) : "" })
					}) : d.status === "Rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: t("finalb.sso.dom.rejected", { note: d.decisionNote ?? "" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small",
							children: t("finalb.sso.dom.pending")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "small",
							style: { margin: 0 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finalb.sso.dom.txtName") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: d.txtRecordName }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finalb.sso.dom.txtValue") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									style: { wordBreak: "break-all" },
									children: d.txtRecordValue
								}) })
							]
						}),
						d.lastDnsCheckAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("finalb.sso.dom.lastCheck", { date: fmtDate(d.lastDnsCheckAt) })
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							loading: verify.isPending && checking === d.id,
							onClick: () => {
								setChecking(d.id);
								verify.mutate(d.id);
							},
							children: t("finalb.sso.dom.check")
						}) })
					] })]
				}, d.id))
			}),
			verify.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: enterpriseError(verify.error, t)
			}) : null
		]
	});
}
function StaffSsoDomains() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [status, setStatus] = (0, import_react.useState)("Pending");
	const [rejecting, setRejecting] = (0, import_react.useState)(null);
	const rows = useQuery({
		queryKey: [
			"admin",
			"enterprise",
			"sso-domains",
			status
		],
		queryFn: () => api(`/api/admin/enterprise/sso-domains${status ? `?status=${encodeURIComponent(status)}` : ""}`)
	});
	const approve = useApiMutation((id) => api(`/api/admin/enterprise/sso-domains/${id}/approve`, {
		method: "POST",
		body: { note: null }
	}), [["admin", "enterprise"]], (d) => toast.success(t("finalb.staffEnt.dom.approvedToast", { domain: d.domain })));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": "se-dom-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "section__title",
				id: "se-dom-h",
				children: t("finalb.staffEnt.dom.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finalb.staffEnt.dom.note")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("dashboard.status"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: status,
					onChange: (e) => setStatus(e.target.value),
					placeholder: t("finalb.orders.any"),
					options: [
						"Pending",
						"Verified",
						"Rejected"
					].map((s) => ({
						value: s,
						label: t(`finalb.sso.dom.status.${s}`)
					}))
				})
			}),
			approve.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: enterpriseError(approve.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: rows,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("finalb.staffEnt.dom.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					"data-testid": "staff-sso-domains",
					children: list.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat row row--between",
						"data-domain": d.domain,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: d.domain }),
							" · ",
							d.organizationName,
							" (",
							d.organizationSlug,
							") ·",
							" ",
							t(`finalb.sso.dom.status.${d.status}`),
							" · ",
							fmtDate(d.createdAt),
							d.decisionNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small muted",
								children: [" · ", d.decisionNote]
							}) : null
						] }), d.status === "Pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								loading: approve.isPending && approve.variables === d.id,
								onClick: () => approve.mutate(d.id),
								children: t("finalb.staffEnt.dom.approve")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setRejecting(d),
								children: t("finalb.staffEnt.reject")
							})]
						}) : null]
					}, d.id))
				})
			}),
			rejecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RejectDomainDialog, {
				row: rejecting,
				onClose: () => setRejecting(null)
			}) : null
		]
	});
}
function RejectDomainDialog({ row, onClose }) {
	const { t } = useI18n();
	const [note, setNote] = (0, import_react.useState)("");
	const reject = useApiMutation(() => api(`/api/admin/enterprise/sso-domains/${row.id}/reject`, {
		method: "POST",
		body: { note: note.trim() }
	}), [["admin", "enterprise"]], onClose);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: true,
		title: t("finalb.staffEnt.dom.rejectTitle", { domain: row.domain }),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "danger",
			disabled: !note.trim(),
			loading: reject.isPending,
			onClick: () => reject.mutate(void 0),
			children: t("finalb.staffEnt.reject")
		})] }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("finalb.staffEnt.dom.reason"),
			required: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				rows: 3,
				value: note,
				maxLength: 1e3,
				onChange: (e) => setNote(e.target.value)
			})
		}), reject.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: enterpriseError(reject.error, t)
		}) : null]
	});
}
function CreateOrderDialog({ req, onClose }) {
	const { t } = useI18n();
	const toast = useToast();
	const [qty, setQty] = (0, import_react.useState)(String(req.quantity));
	const [price, setPrice] = (0, import_react.useState)("");
	const [currency, setCurrency] = (0, import_react.useState)("USD");
	const q = Number(qty);
	const p = Number(price);
	const valid = Number.isInteger(q) && q >= 1 && price.trim() !== "" && p > 0 && /^[A-Za-z]{3}$/.test(currency);
	const create = useApiMutation(() => api("/api/admin/enterprise/orders", {
		method: "POST",
		body: {
			organizationId: req.organizationId,
			seatRequestId: req.id,
			quantity: q,
			unitPrice: p,
			currency: currency.toUpperCase()
		}
	}), [["admin", "enterprise"]], (o) => {
		toast.success(t("finalb.staffEnt.orderCreated", { number: o.invoiceNumber }));
		onClose();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: true,
		title: t("finalb.staffEnt.createOrder", { org: req.organizationName }),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			disabled: !valid,
			loading: create.isPending,
			onClick: () => create.mutate(void 0),
			children: t("finalb.staffEnt.create")
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("finalb.ent.seats.quantity"),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 1,
					value: qty,
					onChange: (e) => setQty(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("finalb.staffEnt.unitPrice"),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					step: "0.01",
					inputMode: "decimal",
					value: price,
					onChange: (e) => setPrice(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("commerce.prices.currency"),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: currency,
					maxLength: 3,
					onChange: (e) => setCurrency(e.target.value.toUpperCase())
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finalb.staffEnt.createNote")
			}),
			create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: enterpriseError(create.error, t)
			}) : null
		]
	});
}
function MarkPaidDialog({ o, onClose }) {
	const { t } = useI18n();
	const toast = useToast();
	const [ref, setRef] = (0, import_react.useState)("");
	const pay = useApiMutation(() => api(`/api/admin/enterprise/orders/${o.id}/mark-paid`, {
		method: "POST",
		body: { paymentReference: ref.trim() || null }
	}), [["admin", "enterprise"], ["orgs", o.organizationId]], (r) => {
		toast.success(t("finalb.staffEnt.paid", {
			before: r.seatLimitBefore ?? 0,
			after: r.seatLimitAfter ?? 0
		}));
		onClose();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: true,
		title: t("finalb.staffEnt.markPaid"),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			loading: pay.isPending,
			onClick: () => pay.mutate(void 0),
			children: t("finalb.staffEnt.markPaid")
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("finalb.staffEnt.markPaidBody", {
				number: o.invoiceNumber,
				n: o.quantity
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("finalb.staffEnt.reference"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: ref,
					maxLength: 200,
					onChange: (e) => setRef(e.target.value)
				})
			}),
			pay.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: enterpriseError(pay.error, t)
			}) : null
		]
	});
}
function RejectDialog({ req, onClose }) {
	const { t } = useI18n();
	const [note, setNote] = (0, import_react.useState)("");
	const reject = useApiMutation(() => api(`/api/admin/enterprise/seat-requests/${req.id}/reject`, {
		method: "POST",
		body: { note: note.trim() || null }
	}), [["admin", "enterprise"]], onClose);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: true,
		title: t("finalb.staffEnt.reject"),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "danger",
			loading: reject.isPending,
			onClick: () => reject.mutate(void 0),
			children: t("finalb.staffEnt.reject")
		})] }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("finalb.staffEnt.rejectNote"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				rows: 3,
				value: note,
				onChange: (e) => setNote(e.target.value)
			})
		}), reject.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: enterpriseError(reject.error, t)
		}) : null]
	});
}
/** `/admin/enterprise`: staff seat requests → enterprise orders (bank transfer) → mark paid. */
function StaffEnterprisePage() {
	const { t, fmtDate, fmtMoney } = useI18n();
	usePageMeta(t("finalb.staffEnt.title"), void 0, { noindex: true });
	const [status, setStatus] = (0, import_react.useState)("Requested");
	const requests = useQuery({
		queryKey: fbKeys.staffSeatRequests(status),
		queryFn: () => api(`/api/admin/enterprise/seat-requests${status ? `?status=${encodeURIComponent(status)}` : ""}`)
	});
	const orders = useQuery({
		queryKey: fbKeys.staffOrders,
		queryFn: () => api("/api/admin/enterprise/orders")
	});
	const [creating, setCreating] = (0, import_react.useState)(null);
	const [rejecting, setRejecting] = (0, import_react.useState)(null);
	const [paying, setPaying] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("finalb.staffEnt.title"),
				subtitle: t("finalb.staffEnt.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffSsoDomains, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section",
				"aria-labelledby": "se-req-h",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						id: "se-req-h",
						children: t("finalb.ent.seats.requests")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("dashboard.status"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: status,
							onChange: (e) => setStatus(e.target.value),
							placeholder: t("finalb.orders.any"),
							options: [
								"Requested",
								"Invoiced",
								"Paid",
								"Rejected",
								"Cancelled"
							].map((s) => ({
								value: s,
								label: s
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
						query: requests,
						children: (rows) => rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("finalb.ent.seats.noRequests") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "stack",
							style: {
								listStyle: "none",
								padding: 0
							},
							"data-testid": "staff-seat-requests",
							children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "card card--flat row row--between",
								"data-org": r.organizationName,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.organizationName }),
									" ·",
									" ",
									t("finalb.ent.seats.qty", { n: r.quantity }),
									" · ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: r.status }),
									" ",
									"· ",
									fmtDate(r.createdAt),
									r.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "small muted",
										children: [" · ", r.note]
									}) : null
								] }), r.status === "Requested" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => setCreating(r),
										children: t("finalb.staffEnt.createOrderBtn")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: () => setRejecting(r),
										children: t("finalb.staffEnt.reject")
									})]
								}) : null]
							}, r.id))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section",
				"aria-labelledby": "se-ord-h",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section__title",
					id: "se-ord-h",
					children: t("finalb.ent.seats.orders")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: orders,
					children: (rows) => rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("finalb.ent.seats.noOrders") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "stack",
						style: {
							listStyle: "none",
							padding: 0
						},
						"data-testid": "staff-ent-orders",
						children: rows.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "card card--flat",
							"data-invoice": o.invoiceNumber,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: o.organizationName }),
									" · ",
									o.invoiceNumber,
									" ·",
									" ",
									t("finalb.ent.seats.qty", { n: o.quantity }),
									" ·",
									" ",
									fmtMoney(o.total, o.currency),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: o.status })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicePdfButton, {
										o,
										staff: true
									}), o.status === "AwaitingPayment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => setPaying(o),
										children: t("finalb.staffEnt.markPaid")
									}) : null]
								})]
							}), o.status === "Paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("finalb.staffEnt.paidLine", {
									date: fmtDate(o.paidAt),
									ref: o.paymentReference ?? "—",
									before: o.seatLimitBefore ?? 0,
									after: o.seatLimitAfter ?? 0
								})
							}) : null]
						}, o.id))
					})
				})]
			}),
			creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateOrderDialog, {
				req: creating,
				onClose: () => setCreating(null)
			}) : null,
			rejecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RejectDialog, {
				req: rejecting,
				onClose: () => setRejecting(null)
			}) : null,
			paying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkPaidDialog, {
				o: paying,
				onClose: () => setPaying(null)
			}) : null
		]
	});
}
//#endregion
export { SsoTab as a, SeatsTab as i, OrgMaterialsList as n, StaffEnterprisePage as o, PathwayAssignmentsTab as r, enterpriseError as s, MaterialsTab as t };

//# sourceMappingURL=Enterprise-Y1LikQM_.js.map