import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as wsError, f as extractGuid, i as fmtDateTime, p as fetchHealth, r as WsError, s as COMPLAINT_TYPES, y as wsKeys } from "./common-BCMvJ35x.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, i as Pagination, n as Notice, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as Dialog } from "./Dialog-CcENtYyA.js";
import { t as Tabs } from "./Tabs-CKJGcPx4.js";
import { r as UserPicker } from "./Pickers-l0FQGv4r.js";
//#region src/pages/workspace/Trust.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function ReportContentButton({ targetType, targetId, size = "sm" }) {
	const { t } = useI18n();
	const { user } = useAuth();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [type, setType] = (0, import_react.useState)("Copyright");
	const [evidence, setEvidence] = (0, import_react.useState)("");
	const [mail, setMail] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const evidenceOk = evidence.trim().length >= 20 && evidence.length <= 2e4;
	const emailOk = user ? !mail || EMAIL_RE.test(mail) : EMAIL_RE.test(mail);
	const file = useApiMutation(() => api("/api/complaints", {
		method: "POST",
		body: {
			type,
			targetType,
			targetId,
			evidence: evidence.trim(),
			email: mail.trim() || null,
			name: name.trim() || null
		}
	}), [], () => setDone(true));
	const close = () => {
		setOpen(false);
		if (done) {
			setDone(false);
			setEvidence("");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size,
		onClick: () => setOpen(true),
		children: t("workspace.report.button")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		title: t("workspace.report.title"),
		onClose: close,
		footer: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: close,
			children: t("common.close")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: close,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			disabled: !evidenceOk || !emailOk,
			loading: file.isPending,
			onClick: () => file.mutate(void 0),
			children: t("workspace.report.submit")
		})] }),
		children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "success",
			children: t("workspace.report.thanks")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("workspace.report.help", { target: t(`workspace.targets.${targetType}`) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.report.type"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: type,
					onChange: (e) => setType(e.target.value),
					options: COMPLAINT_TYPES.map((c) => ({
						value: c,
						label: t(`workspace.complaintTypes.${c}`)
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.report.evidence"),
				hint: t("workspace.report.evidenceHint", { n: evidence.trim().length }),
				required: true,
				error: evidence && !evidenceOk ? t("workspace.report.evidenceShort") : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 6,
					maxLength: 2e4,
					value: evidence,
					onChange: (e) => setEvidence(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.report.email"),
				hint: user ? t("workspace.report.emailOptional") : void 0,
				required: !user,
				error: mail && !emailOk ? t("workspace.report.emailInvalid") : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "email",
					value: mail,
					onChange: (e) => setMail(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.report.name"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					maxLength: 120,
					onChange: (e) => setName(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: file.error })
		] })
	})] });
}
function AppealButton({ targetType, targetId }) {
	const { t } = useI18n();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [reason, setReason] = (0, import_react.useState)("");
	const toast = useToast();
	const ok = reason.trim().length >= 10 && reason.length <= 5e3;
	const file = useApiMutation(() => api("/api/appeals", {
		method: "POST",
		body: {
			targetType,
			targetId,
			reason: reason.trim()
		}
	}), [wsKeys.myAppeals], () => {
		setOpen(false);
		setReason("");
		toast.success(t("workspace.appeal.filed"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "secondary",
		onClick: () => setOpen(true),
		children: t("workspace.appeal.button")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		title: t("workspace.appeal.title"),
		onClose: () => setOpen(false),
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: () => setOpen(false),
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			disabled: !ok,
			loading: file.isPending,
			onClick: () => file.mutate(void 0),
			children: t("workspace.appeal.submit")
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("workspace.appeal.help")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.appeal.reason"),
				hint: t("workspace.appeal.reasonHint"),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 5,
					maxLength: 5e3,
					value: reason,
					onChange: (e) => setReason(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: file.error })
		]
	})] });
}
/** Shown where a learner/author lands on content that is not available to them (hidden or removed). */
function HiddenContentNotice({ targetType, targetId }) {
	const { t } = useI18n();
	const { user } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
		tone: "info",
		title: t("workspace.appeal.hiddenTitle"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: { marginBlockStart: 0 },
			children: t("workspace.appeal.hiddenBody")
		}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppealButton, {
			targetType,
			targetId
		}) : null]
	});
}
var APPEAL_TARGETS = [
	"Discussion",
	"DiscussionReply",
	"Review"
];
function MyAppealsPage() {
	const { t, lang } = useI18n();
	usePageMeta(t("workspace.appeal.mine"), void 0, { noindex: true });
	const [params] = useSearchParams();
	const [targetType, setTargetType] = (0, import_react.useState)(APPEAL_TARGETS.includes(params.get("targetType") ?? "") ? params.get("targetType") : "Discussion");
	const [link, setLink] = (0, import_react.useState)(params.get("targetId") ?? "");
	const id = extractGuid(link);
	const list = useQuery({
		queryKey: wsKeys.myAppeals,
		queryFn: () => api("/api/me/appeals")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("workspace.appeal.mine") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("workspace.appeal.title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("workspace.appeal.pageHelp")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("workspace.appeal.targetType"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: targetType,
								onChange: (e) => setTargetType(e.target.value),
								options: APPEAL_TARGETS.map((x) => ({
									value: x,
									label: t(`workspace.targets.${x}`)
								}))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("workspace.appeal.link"),
							hint: t("workspace.appeal.linkHint"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: link,
								onChange: (e) => setLink(e.target.value)
							})
						})]
					}),
					id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppealButton, {
						targetType,
						targetId: id
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("workspace.appeal.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ws-list",
					children: items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t(`workspace.targets.${a.targetType}`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppealStatus, { status: a.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pre-wrap",
								children: a.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "small muted",
								children: fmtDateTime(a.createdAt, lang)
							}),
							a.decisionNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "small",
								children: [
									t("workspace.appeal.decisionNote"),
									": ",
									a.decisionNote
								]
							}) : null
						]
					}, a.id))
				})
			})
		]
	});
}
function AppealStatus({ status }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: status === "Reinstated" ? "success" : status === "Upheld" ? "danger" : "info",
		children: t(`workspace.appealStatus.${status}`)
	});
}
/** 451 on a lesson: shown in the learning workspace instead of the player and notes. */
function HeldLessonNotice() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "warning",
		title: t("workspace.held.title"),
		children: t("workspace.held.body")
	});
}
function NoteDialog({ open, title, label, min, confirm, danger, pending, error, onClose, onSubmit, children }) {
	const { t } = useI18n();
	const [note, setNote] = (0, import_react.useState)("");
	const ok = note.trim().length >= min;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		title,
		onClose,
		alert: danger,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: danger ? "danger" : "primary",
			disabled: !ok,
			loading: pending,
			onClick: () => onSubmit(note.trim()),
			children: confirm
		})] }),
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label,
				hint: t("workspace.trust.minChars", { n: min }),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 4,
					value: note,
					onChange: (e) => setNote(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error })
		]
	});
}
function ComplaintsTab() {
	const { t, lang } = useI18n();
	const toast = useToast();
	const [status, setStatus] = (0, import_react.useState)("Open");
	const [page, setPage] = (0, import_react.useState)(1);
	const [acting, setActing] = (0, import_react.useState)(null);
	const list = useQuery({
		queryKey: wsKeys.complaints(status, page),
		queryFn: () => api(`/api/admin/trust/complaints?status=${status}&page=${page}&pageSize=25`)
	});
	const resolve = useApiMutation((v) => api(`/api/admin/trust/complaints/${v.id}/resolve`, {
		method: "POST",
		body: {
			action: v.action,
			note: v.note
		}
	}), [["ws", "complaints"], ["ws", "holds"]], () => {
		setActing(null);
		toast.success(t("workspace.trust.resolved"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.trust.status"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: status,
					onChange: (e) => {
						setStatus(e.target.value);
						setPage(1);
					},
					options: [
						"Open",
						"Dismissed",
						"Actioned"
					].map((s) => ({
						value: s,
						label: t(`workspace.complaintStatus.${s}`)
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (p) => p.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("workspace.trust.noComplaints") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ws-list",
					children: p.items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						"aria-label": t("workspace.trust.complaintAbout", { target: t(`workspace.targets.${c.targetType}`) }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									t(`workspace.complaintTypes.${c.type}`),
									" ·",
									" ",
									t(`workspace.targets.${c.targetType}`)
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted",
									children: fmtDateTime(c.createdAt, lang)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "small",
								children: [
									c.courseTitle ?? "—",
									" · ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono",
										children: c.targetId
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "small muted",
								children: [
									c.reporterName || "—",
									" <",
									c.reporterEmail,
									">"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pre-wrap",
								children: c.evidence
							}),
							c.status === "Open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => setActing({
										c,
										action: "Dismiss"
									}),
									children: t("workspace.trust.dismiss")
								}), c.targetType !== "Course" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "danger",
									onClick: () => setActing({
										c,
										action: "Hide"
									}),
									children: t("workspace.trust.hide")
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "danger",
									onClick: () => setActing({
										c,
										action: "Archive"
									}),
									children: t("workspace.trust.archive")
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "small",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`workspace.complaintStatus.${c.status}`) }),
									" ",
									c.action,
									" ·",
									" ",
									c.resolutionNote
								]
							})
						]
					}, c.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					page: p.page,
					pageSize: p.pageSize,
					total: p.total,
					onPage: setPage
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteDialog, {
				open: !!acting,
				danger: acting?.action !== "Dismiss",
				title: acting ? t(`workspace.trust.confirm${acting.action}`) : "",
				label: t("workspace.trust.note"),
				min: 3,
				confirm: acting ? t(`workspace.trust.${acting.action.toLowerCase()}`) : "",
				pending: resolve.isPending,
				error: resolve.error,
				onClose: () => {
					setActing(null);
					resolve.reset();
				},
				onSubmit: (note) => acting && resolve.mutate({
					id: acting.c.id,
					action: acting.action,
					note
				})
			}, acting ? `${acting.c.id}-${acting.action}` : "none")
		]
	});
}
function HoldsTab() {
	const { t, lang } = useI18n();
	const toast = useToast();
	const [all, setAll] = (0, import_react.useState)(false);
	const [releasing, setReleasing] = (0, import_react.useState)(null);
	const list = useQuery({
		queryKey: wsKeys.holds(all),
		queryFn: () => api(`/api/admin/trust/holds?includeReleased=${all}`)
	});
	const release = useApiMutation((v) => api(`/api/admin/trust/holds/${v.id}/release`, {
		method: "POST",
		body: { note: v.note }
	}), [["ws", "holds"]], () => {
		setReleasing(null);
		toast.success(t("workspace.trust.released"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("workspace.trust.includeReleased"),
				checked: all,
				onChange: (e) => setAll(e.target.checked)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("workspace.trust.noHolds") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ws-list",
					children: items.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t(`workspace.targets.${h.targetType}`) }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono small",
								children: h.targetId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small muted",
								children: [" · ", fmtDateTime(h.createdAt, lang)]
							}),
							h.releasedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: t("workspace.trust.releasedAt", { date: fmtDateTime(h.releasedAt, lang) })
							}) : null
						] }), !h.releasedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => setReleasing(h),
							children: t("workspace.trust.release")
						}) : null]
					}, h.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteDialog, {
				open: !!releasing,
				title: t("workspace.trust.release"),
				label: t("workspace.trust.note"),
				min: 3,
				confirm: t("workspace.trust.release"),
				pending: release.isPending,
				error: release.error,
				onClose: () => setReleasing(null),
				onSubmit: (note) => releasing && release.mutate({
					id: releasing.id,
					note
				})
			}, releasing?.id ?? "none")
		]
	});
}
function SuspensionsTab() {
	const { t, lang } = useI18n();
	const toast = useToast();
	const [all, setAll] = (0, import_react.useState)(false);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [suspending, setSuspending] = (0, import_react.useState)(false);
	const [reinstating, setReinstating] = (0, import_react.useState)(null);
	const list = useQuery({
		queryKey: wsKeys.suspensions(all),
		queryFn: () => api(`/api/admin/trust/suspensions?includeEnded=${all}`)
	});
	const suspend = useApiMutation((v) => api(`/api/admin/trust/instructors/${v.userId}/suspend`, {
		method: "POST",
		body: { reason: v.reason }
	}), [["ws", "suspensions"]], () => {
		setSuspending(false);
		setPicked(null);
		toast.success(t("workspace.trust.suspended"));
	});
	const reinstate = useApiMutation((v) => api(`/api/admin/trust/instructors/${v.userId}/reinstate`, {
		method: "POST",
		body: { note: v.note }
	}), [["ws", "suspensions"]], () => {
		setReinstating(null);
		toast.success(t("workspace.trust.reinstated"));
	});
	const userId = picked?.id ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					if (userId) setSuspending(true);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPicker, {
					label: t("finala.picker.instructor"),
					selected: picked,
					onChange: setPicked
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "danger",
					disabled: !userId,
					children: t("workspace.trust.suspend")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("workspace.trust.includeEnded"),
				checked: all,
				onChange: (e) => setAll(e.target.checked)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("workspace.trust.noSuspensions") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ws-list",
					children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: s.displayName ?? s.userId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted",
									children: fmtDateTime(s.suspendedAt, lang)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pre-wrap small",
								children: s.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("workspace.trust.heldEntries", { n: s.heldEntries })
							}),
							s.reinstatedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: t("workspace.trust.reinstatedAt", { date: fmtDateTime(s.reinstatedAt, lang) })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setReinstating(s),
								children: t("workspace.trust.reinstate")
							})
						]
					}, s.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteDialog, {
				open: suspending,
				danger: true,
				title: t("workspace.trust.suspend"),
				label: t("workspace.trust.reason"),
				min: 5,
				confirm: t("workspace.trust.suspend"),
				pending: suspend.isPending,
				error: suspend.error,
				onClose: () => setSuspending(false),
				onSubmit: (reason) => userId && suspend.mutate({
					userId,
					reason
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					children: t("workspace.trust.suspendHelp")
				})
			}, suspending ? `s-${userId}` : "ns"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteDialog, {
				open: !!reinstating,
				title: t("workspace.trust.reinstate"),
				label: t("workspace.trust.note"),
				min: 3,
				confirm: t("workspace.trust.reinstate"),
				pending: reinstate.isPending,
				error: reinstate.error,
				onClose: () => setReinstating(null),
				onSubmit: (note) => reinstating && reinstate.mutate({
					userId: reinstating.userId,
					note
				})
			}, reinstating?.id ?? "nr")
		]
	});
}
function AppealsTab() {
	const { t, lang } = useI18n();
	const toast = useToast();
	const [status, setStatus] = (0, import_react.useState)("Pending");
	const [page, setPage] = (0, import_react.useState)(1);
	const [deciding, setDeciding] = (0, import_react.useState)(null);
	const list = useQuery({
		queryKey: wsKeys.appeals(status, page),
		queryFn: () => api(`/api/admin/trust/appeals?status=${status}&page=${page}&pageSize=25`)
	});
	const decide = useApiMutation((v) => api(`/api/admin/trust/appeals/${v.id}/decision`, {
		method: "POST",
		body: {
			decision: v.decision,
			note: v.note
		}
	}), [["ws", "appeals"]], () => {
		setDeciding(null);
		toast.success(t("workspace.trust.decided"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.trust.status"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: status,
					onChange: (e) => {
						setStatus(e.target.value);
						setPage(1);
					},
					options: [
						"Pending",
						"Upheld",
						"Reinstated"
					].map((s) => ({
						value: s,
						label: t(`workspace.appealStatus.${s}`)
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (p) => p.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("workspace.trust.noAppeals") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ws-list",
					children: p.items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									t(`workspace.targets.${a.targetType}`),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono small",
										children: a.targetId
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppealStatus, { status: a.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pre-wrap",
								children: a.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "small muted",
								children: fmtDateTime(a.createdAt, lang)
							}),
							a.status === "Pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => setDeciding({
										a,
										decision: "Reinstate"
									}),
									children: t("workspace.trust.reinstateContent")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => setDeciding({
										a,
										decision: "Uphold"
									}),
									children: t("workspace.trust.uphold")
								})]
							}) : a.decisionNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: a.decisionNote
							}) : null
						]
					}, a.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					page: p.page,
					pageSize: p.pageSize,
					total: p.total,
					onPage: setPage
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteDialog, {
				open: !!deciding,
				title: deciding?.decision === "Reinstate" ? t("workspace.trust.reinstateContent") : t("workspace.trust.uphold"),
				label: t("workspace.trust.note"),
				min: 3,
				confirm: deciding?.decision === "Reinstate" ? t("workspace.trust.reinstateContent") : t("workspace.trust.uphold"),
				pending: decide.isPending,
				error: decide.error,
				onClose: () => setDeciding(null),
				onSubmit: (note) => deciding && decide.mutate({
					id: deciding.a.id,
					decision: deciding.decision,
					note
				})
			}, deciding ? `${deciding.a.id}-${deciding.decision}` : "nd")
		]
	});
}
function TrustConsolePage() {
	const { t } = useI18n();
	usePageMeta(t("workspace.trust.title"), void 0, { noindex: true });
	const [params, setParams] = useSearchParams();
	const tab = params.get("tab") ?? "complaints";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("workspace.trust.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
		label: t("workspace.trust.title"),
		value: tab,
		onChange: (v) => setParams({ tab: v }, { replace: true }),
		tabs: [
			{
				id: "complaints",
				label: t("workspace.trust.complaints"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintsTab, {})
			},
			{
				id: "holds",
				label: t("workspace.trust.holds"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldsTab, {})
			},
			{
				id: "suspensions",
				label: t("workspace.trust.suspensions"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspensionsTab, {})
			},
			{
				id: "appeals",
				label: t("workspace.trust.appeals"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppealsTab, {})
			}
		]
	})] });
}
function BrokenLinksTab() {
	const { t, lang } = useI18n();
	const toast = useToast();
	const list = useQuery({
		queryKey: wsKeys.brokenLinks,
		queryFn: () => api("/api/admin/operations/broken-links")
	});
	const notify = useApiMutation((id) => api(`/api/admin/operations/broken-links/${id}/notify`, { method: "POST" }), [wsKeys.brokenLinks], (r) => toast.success(t("workspace.ops.notified", {
		courses: r.coursesNotified,
		people: r.recipients
	})));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: list,
		children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("workspace.ops.noBroken") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "ws-list",
			children: items.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card card--flat",
				"aria-label": b.title,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: b.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "danger",
							children: b.status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "small muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono",
								children: b.youTubeVideoId
							}),
							b.statusReason ? ` · ${b.statusReason}` : "",
							b.lastCheckedAt ? ` · ${t("workspace.ops.checked", { date: fmtDateTime(b.lastCheckedAt, lang) })}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "small",
						children: b.courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/courses/${c.slug}`,
								children: c.title
							}),
							" (v",
							c.version,
							"):",
							" ",
							c.lessons.map((l) => l.title).join(", ")
						] }, c.courseId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							loading: notify.isPending && notify.variables === b.videoAssetId,
							onClick: () => notify.mutate(b.videoAssetId, { onError: (e) => toast.error(wsError(e, t)) }),
							children: t("workspace.ops.notify")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "small muted",
							children: b.lastNotifiedAt ? t("workspace.ops.lastNotified", { date: fmtDateTime(b.lastNotifiedAt, lang) }) : t("workspace.ops.neverNotified")
						})]
					})
				]
			}, b.videoAssetId))
		})
	});
}
function OverdueTab() {
	const { t, fmtDate } = useI18n();
	const [months, setMonths] = (0, import_react.useState)(12);
	const list = useQuery({
		queryKey: wsKeys.overdue(months),
		queryFn: () => api(`/api/admin/operations/overdue-content?months=${months}`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("workspace.ops.months"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "number",
				min: 1,
				max: 120,
				value: months,
				onChange: (e) => setMonths(Math.min(120, Math.max(1, Number(e.target.value) || 1)))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("workspace.ops.noOverdue") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("workspace.ops.course")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("workspace.ops.owner")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("workspace.ops.lastPublished")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("workspace.ops.monthsAgo")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/courses/${c.slug}`,
							children: c.title
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.ownerName ?? "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(c.lastPublishedAt) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.monthsSincePublish })
					] }, c.courseId)) })]
				})
			})
		})]
	});
}
function HealthTab() {
	const { t } = useI18n();
	const health = useQuery({
		queryKey: wsKeys.health,
		queryFn: fetchHealth,
		refetchInterval: 3e4
	});
	const tone = (s) => s === "Healthy" ? "success" : s === "Degraded" ? "warning" : "danger";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: health,
		children: (h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stack",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					t("workspace.ops.overall"),
					": ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: tone(h.status),
						children: h.status
					}),
					h.totalDurationMs != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "small muted",
						children: [
							" · ",
							h.totalDurationMs,
							" ms"
						]
					}) : null
				] }),
				(h.checks ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("workspace.ops.noDetail")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ws-list",
					children: (h.checks ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "mono",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: tone(c.status),
									children: c.status
								})]
							}),
							c.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: c.description
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "small muted",
								children: [c.durationMs, " ms"]
							}),
							c.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "ws-pre",
								children: JSON.stringify(c.data, null, 2)
							}) : null
						]
					}, c.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					onClick: () => void health.refetch(),
					loading: health.isFetching,
					children: t("common.retry")
				})
			]
		})
	});
}
function OperationsPage() {
	const { t } = useI18n();
	usePageMeta(t("workspace.ops.title"), void 0, { noindex: true });
	const [params, setParams] = useSearchParams();
	const tab = params.get("tab") ?? "broken";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("workspace.ops.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
		label: t("workspace.ops.title"),
		value: tab,
		onChange: (v) => setParams({ tab: v }, { replace: true }),
		tabs: [
			{
				id: "broken",
				label: t("workspace.ops.broken"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrokenLinksTab, {})
			},
			{
				id: "overdue",
				label: t("workspace.ops.overdue"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverdueTab, {})
			},
			{
				id: "health",
				label: t("workspace.ops.health"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthTab, {})
			}
		]
	})] });
}
//#endregion
export { OperationsPage as a, MyAppealsPage as i, HeldLessonNotice as n, ReportContentButton as o, HiddenContentNotice as r, TrustConsolePage as s, AppealButton as t };

//# sourceMappingURL=Trust-B2S3OlzB.js.map