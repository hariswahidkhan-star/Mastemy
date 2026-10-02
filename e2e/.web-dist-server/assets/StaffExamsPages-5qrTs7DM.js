import { _ as require_react, b as __toESM, c as Outlet, i as require_jsx_runtime, o as NavLink, r as useI18n, s as Navigate } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, o as apiUrl, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, n as Notice, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as Dialog } from "./Dialog-CcENtYyA.js";
import { r as toQuestionList, t as toQuestion } from "./questions--q6HlBNd.js";
import { n as ImageResourcePicker, t as AssessmentPicker } from "./Pickers-l0FQGv4r.js";
import { t as RichContent } from "./RichContent-C3Tst1Ll.js";
import { m as useTemplates, r as examKeys } from "./exams-ZvNkLj9c.js";
import { i as RegradePreviewPanel, o as TemplatePreviewButton } from "./Learning-DLGEO_vT.js";
import { t as examError } from "./examErrors-ngodnTsv.js";
//#region src/pages/exams/StaffExamsPages.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var REVIEW = [
	"Reviewer",
	"Admin",
	"SuperAdmin"
];
var STAFF = ["Admin", "SuperAdmin"];
var STAFF_EXAM_SECTIONS = [
	{
		to: "/staff/exams/challenges",
		key: "challenges",
		roles: REVIEW
	},
	{
		to: "/staff/exams/regrades",
		key: "regrades",
		roles: REVIEW
	},
	{
		to: "/staff/exams/flags",
		key: "flags",
		roles: STAFF
	},
	{
		to: "/staff/exams/accommodations",
		key: "accommodations",
		roles: STAFF
	},
	{
		to: "/staff/exams/templates",
		key: "templates",
		roles: STAFF
	},
	{
		to: "/staff/exams/corrections",
		key: "corrections",
		roles: STAFF
	},
	{
		to: "/staff/exams/appeals",
		key: "appeals",
		roles: STAFF
	},
	{
		to: "/staff/exams/reusable",
		key: "reusable",
		roles: STAFF
	}
];
function StaffExamsLayout() {
	const { t } = useI18n();
	const { hasRole } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container side-layout",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": t("exams.staff.nav"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "side-nav",
				children: STAFF_EXAM_SECTIONS.filter((s) => hasRole(...s.roles)).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
					to: s.to,
					children: t(`exams.staff.section.${s.key}`)
				}) }, s.to))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })]
	});
}
function StaffExamsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/staff/exams/challenges",
		replace: true
	});
}
function StatusFilter({ value, onChange, values, prefix }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: t("exams.common.status"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder: t("exams.common.all"),
			options: values.map((v) => ({
				value: v,
				label: t(`${prefix}.${v}`)
			}))
		})
	});
}
function ChallengesQueuePage() {
	const { t, fmtDate } = useI18n();
	usePageMeta(t("exams.staff.section.challenges"), void 0, { noindex: true });
	const toast = useToast();
	const [status, setStatus] = (0, import_react.useState)("Open");
	const [resolving, setResolving] = (0, import_react.useState)(null);
	const [proposing, setProposing] = (0, import_react.useState)(null);
	const [resolution, setResolution] = (0, import_react.useState)("NoChange");
	const [note, setNote] = (0, import_react.useState)("");
	const list = useQuery({
		queryKey: examKeys.reviewChallenges(status),
		queryFn: () => api(`/api/review/question-challenges${qs({ status })}`)
	});
	const resolve = useApiMutation(() => api(`/api/review/question-challenges/${resolving?.id}/resolve`, {
		method: "POST",
		body: {
			resolution,
			note: note.trim()
		}
	}), [["exams", "review-challenges"]], () => {
		setResolving(null);
		toast.success(t("exams.challenge.resolved"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("exams.staff.section.challenges"),
				subtitle: t("exams.challenge.queueIntro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusFilter, {
				value: status,
				onChange: setStatus,
				values: ["Open", "Resolved"],
				prefix: "exams.challenge.status"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("exams.challenge.none"),
					description: t("exams.challenge.noneBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card stack",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "mono",
									children: c.questionExternalId
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted",
									children: fmtDate(c.createdAt)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: c.reason }),
							c.status === "Open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => {
										setResolving(c);
										setResolution("NoChange");
										setNote("");
									},
									children: t("exams.challenge.resolve")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => setProposing(c),
									children: t("exams.regrade.propose")
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "small",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "success",
										children: c.resolution ? t(`exams.challenge.resolution.${c.resolution}`) : ""
									}),
									" ",
									c.resolutionNote
								]
							})
						]
					}, c.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: resolving !== null,
				title: t("exams.challenge.resolveTitle", { id: resolving?.questionExternalId ?? "" }),
				onClose: () => setResolving(null),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setResolving(null),
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: resolve.isPending,
					disabled: !note.trim(),
					onClick: () => resolve.mutate(void 0),
					children: t("exams.challenge.resolve")
				})] }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "stack",
						style: {
							border: "none",
							padding: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "field__label",
							children: t("exams.challenge.resolutionLabel")
						}), [
							"NoChange",
							"Revise",
							"Retire"
						].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "option",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "resolution",
								checked: resolution === r,
								onChange: () => setResolution(r)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t(`exams.challenge.resolution.${r}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small muted",
								style: { display: "block" },
								children: t(`exams.challenge.resolutionHint.${r}`)
							})] })]
						}, r))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.challenge.note"),
						hint: t("exams.challenge.noteHint"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							maxLength: 2e3,
							value: note,
							onChange: (e) => setNote(e.target.value)
						})
					}),
					resolve.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: examError(resolve.error, t)
					}) : null
				]
			}),
			proposing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegradeProposalDialog, {
				questionId: proposing.questionId,
				onClose: () => setProposing(null)
			}) : null
		]
	});
}
function RegradeProposalDialog({ questionId, onClose }) {
	const { t } = useI18n();
	const toast = useToast();
	const question = useQuery({
		queryKey: [
			"exams",
			"question",
			questionId
		],
		queryFn: () => api(`/api/studio/questions/${questionId}`).then((d) => d.question)
	});
	const [key, setKey] = (0, import_react.useState)(null);
	const [reason, setReason] = (0, import_react.useState)("");
	const current = question.data?.version;
	const selected = key ?? current?.options.filter((o) => o.isCorrect).map((o) => o.id) ?? [];
	const propose = useApiMutation(() => api(`/api/review/questions/${questionId}/regrades`, {
		method: "POST",
		body: {
			correctOptionIds: selected,
			reason: reason.trim()
		}
	}), [["exams", "regrades"]], () => {
		toast.success(t("exams.regrade.proposed"));
		onClose();
	});
	const single = current?.type === "SingleChoice";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		wide: true,
		title: t("exams.regrade.proposeTitle"),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			loading: propose.isPending,
			disabled: !reason.trim() || selected.length === 0,
			onClick: () => propose.mutate(void 0),
			children: t("exams.regrade.submitProposal")
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: question,
			children: (q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, { source: q.version.stem }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "stack",
						style: {
							border: "none",
							padding: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "field__label",
							children: t("exams.regrade.newKey")
						}), q.version.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "option",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: single ? "radio" : "checkbox",
								name: "newkey",
								checked: selected.includes(o.id),
								onChange: (e) => setKey(single ? [o.id] : e.target.checked ? [...selected, o.id] : selected.filter((x) => x !== o.id))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
									source: o.text,
									inline: true
								}),
								" ",
								o.isCorrect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("exams.regrade.currentKey") }) : null
							] })]
						}, o.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.regrade.reason"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							maxLength: 2e3,
							value: reason,
							onChange: (e) => setReason(e.target.value)
						})
					}),
					propose.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: examError(propose.error, t)
					}) : null
				]
			})
		})
	});
}
function RegradesPage() {
	const { t, fmtDate } = useI18n();
	usePageMeta(t("exams.staff.section.regrades"), void 0, { noindex: true });
	const [status, setStatus] = (0, import_react.useState)("Proposed");
	const [open, setOpen] = (0, import_react.useState)(null);
	const list = useQuery({
		queryKey: examKeys.regrades(status),
		queryFn: () => api(`/api/review/regrades${qs({ status })}`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("exams.staff.section.regrades"),
				subtitle: t("exams.regrade.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusFilter, {
				value: status,
				onChange: setStatus,
				values: [
					"Proposed",
					"Applied",
					"Rejected"
				],
				prefix: "exams.regrade.status"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("exams.regrade.none"),
					description: t("exams.regrade.noneBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("exams.regrade.proposedAt")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("exams.regrade.reason")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("exams.common.status")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("exams.regrade.affected")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("common.actions")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(r.proposedAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.reason }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: r.status === "Applied" ? "success" : r.status === "Rejected" ? "danger" : "warning",
								children: t(`exams.regrade.status.${r.status}`)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.status === "Applied" ? t("exams.regrade.affectedCount", {
								n: r.affectedAttempts,
								changed: r.changedAttempts
							}) : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setOpen(r.id),
								children: t("exams.regrade.open")
							}) })
						] }, r.id)) })]
					})
				})
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegradeDetailDialog, {
				id: open,
				onClose: () => setOpen(null)
			}) : null
		]
	});
}
function RegradeDetailDialog({ id, onClose }) {
	const { t, fmtNumber } = useI18n();
	const { hasRole, user } = useAuth();
	const toast = useToast();
	const isStaff = hasRole(...STAFF);
	const [note, setNote] = (0, import_react.useState)("");
	const [after, setAfter] = (0, import_react.useState)(null);
	const detail = useQuery({
		queryKey: examKeys.regrade(id),
		queryFn: () => api(`/api/review/regrades/${id}`)
	});
	const question = useQuery({
		queryKey: [
			"exams",
			"question",
			detail.data?.regrade.questionId
		],
		queryFn: () => api(`/api/studio/questions/${detail.data?.regrade.questionId}`).then((d) => toQuestion(d.question)),
		enabled: !!detail.data
	});
	const decide = useApiMutation((approve) => api(`/api/admin/regrades/${id}/${approve ? "approve" : "reject"}`, {
		method: "POST",
		body: { note: note.trim() }
	}), [["exams", "regrades"], examKeys.regrade(id)], (res, approve) => {
		if (approve && "results" in res) setAfter(res);
		toast.success(approve ? t("exams.regrade.applied") : t("exams.regrade.rejected"));
	});
	const data = after ?? detail.data;
	const optText = (oid) => {
		const opts = question.data?.options ?? [];
		const i = opts.findIndex((o) => o.id === oid);
		return i < 0 ? oid.slice(0, 8) : `${String.fromCharCode(65 + i)}. ${opts[i].text}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		wide: true,
		title: t("exams.regrade.detailTitle"),
		onClose,
		children: !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: detail,
			children: () => null
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stack",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.regrade.reason }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "facts",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("exams.regrade.oldKey") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data.regrade.oldCorrectOptionIds.map(optText).join(", ") })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("exams.regrade.newKey") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data.regrade.newCorrectOptionIds.map(optText).join(", ") })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("exams.regrade.affected") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							"data-testid": "regrade-affected",
							children: data.regrade.status === "Applied" ? t("exams.regrade.affectedCount", {
								n: data.regrade.affectedAttempts,
								changed: data.regrade.changedAttempts
							}) : t("exams.regrade.affectedOnApproval")
						})] })
					]
				}),
				data.results.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table small",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", { children: t("exams.regrade.deltas") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.regrade.attempt")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.regrade.oldScore")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.regrade.newScore")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.regrade.delta")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.regrade.pass")
								})
							] }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.results.map((r) => {
								const delta = r.newScorePercent - r.oldScorePercent;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "mono",
										children: r.attemptId.slice(0, 8)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [fmtNumber(r.oldScorePercent), "%"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [fmtNumber(r.newScorePercent), "%"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [delta > 0 ? "+" : "", fmtNumber(Math.round(delta * 100) / 100)] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.oldPassed === r.newPassed ? t(r.newPassed ? "result.passed" : "result.notPassed") : `${t(r.oldPassed ? "result.passed" : "result.notPassed")} → ${t(r.newPassed ? "result.passed" : "result.notPassed")}` })
								] }, r.attemptId);
							}) })
						]
					})
				}) : null,
				data.issuedCertificateCodes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "success",
					children: t("exams.regrade.issued", { codes: data.issuedCertificateCodes.join(", ") })
				}) : null,
				data.flaggedCertificateIds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "warning",
					children: t("exams.regrade.flagged", { n: data.flaggedCertificateIds.length })
				}) : null,
				data.regrade.status === "Proposed" ? isStaff ? data.regrade.proposedBy === user?.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "info",
					children: t("exams.regrade.notOwn")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegradePreviewPanel, { regradeId: id }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						children: t("exams.regrade.approveWarning")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.regrade.note"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: note,
							onChange: (e) => setNote(e.target.value)
						})
					}),
					decide.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: examError(decide.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							loading: decide.isPending && decide.variables === true,
							disabled: !note.trim(),
							onClick: () => decide.mutate(true),
							children: t("exams.regrade.approve")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							loading: decide.isPending && decide.variables === false,
							disabled: !note.trim(),
							onClick: () => decide.mutate(false),
							children: t("exams.regrade.reject")
						})]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("exams.regrade.awaitingStaff")
				}) : data.regrade.decisionNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small",
					children: [
						t("exams.regrade.note"),
						": ",
						data.regrade.decisionNote
					]
				}) : null
			]
		})
	});
}
function CertificateFlagsPage() {
	const { t, fmtDate } = useI18n();
	usePageMeta(t("exams.staff.section.flags"), void 0, { noindex: true });
	const toast = useToast();
	const [status, setStatus] = (0, import_react.useState)("Open");
	const [notes, setNotes] = (0, import_react.useState)({});
	const list = useQuery({
		queryKey: examKeys.flags(status),
		queryFn: () => api(`/api/admin/certificate-flags${qs({ status })}`)
	});
	const decide = useApiMutation((v) => api(`/api/admin/certificate-flags/${v.id}/decide`, {
		method: "POST",
		body: {
			revoke: v.revoke,
			note: (notes[v.id] ?? "").trim()
		}
	}), [["exams", "flags"]], () => toast.success(t("exams.common.decided")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("exams.staff.section.flags"),
				subtitle: t("exams.flags.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusFilter, {
				value: status,
				onChange: setStatus,
				values: [
					"Open",
					"Kept",
					"Revoked"
				],
				prefix: "exams.flags.status"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("exams.flags.none"),
					description: t("exams.flags.noneBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: items.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card stack",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "mono",
									children: f.certificateCode
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted",
									children: fmtDate(f.createdAt)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: f.reason }),
							f.status === "Open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("exams.common.note"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: notes[f.id] ?? "",
									onChange: (e) => setNotes((n) => ({
										...n,
										[f.id]: e.target.value
									}))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									disabled: !(notes[f.id] ?? "").trim(),
									onClick: () => decide.mutate({
										id: f.id,
										revoke: false
									}, { onError: (e) => toast.error(examError(e, t)) }),
									children: t("exams.flags.keep")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "danger",
									disabled: !(notes[f.id] ?? "").trim(),
									onClick: () => decide.mutate({
										id: f.id,
										revoke: true
									}, { onError: (e) => toast.error(examError(e, t)) }),
									children: t("exams.flags.revoke")
								})]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`exams.flags.status.${f.status}`) })
						]
					}, f.id))
				})
			})
		]
	});
}
function AccommodationsPage() {
	const { t, fmtDate } = useI18n();
	usePageMeta(t("exams.staff.section.accommodations"), void 0, { noindex: true });
	const toast = useToast();
	const [search, setSearch] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)("");
	const [user, setUser] = (0, import_react.useState)(null);
	const [includeRevoked, setIncludeRevoked] = (0, import_react.useState)(false);
	const [assessment, setAssessment] = (0, import_react.useState)(null);
	const [extra, setExtra] = (0, import_react.useState)(50);
	const [untimed, setUntimed] = (0, import_react.useState)(false);
	const [reason, setReason] = (0, import_react.useState)("");
	const users = useQuery({
		queryKey: [
			"exams",
			"user-search",
			submitted
		],
		queryFn: () => api(`/api/admin/users${qs({
			q: submitted,
			page: 1
		})}`),
		enabled: !!submitted
	});
	const grants = useQuery({
		queryKey: examKeys.accommodations(user?.id ?? "", includeRevoked),
		queryFn: () => api(`/api/admin/accommodations${qs({
			userId: user?.id,
			includeRevoked
		})}`)
	});
	const grant = useApiMutation(() => api("/api/admin/accommodations", {
		method: "POST",
		body: {
			userId: user?.id,
			assessmentId: assessment?.id ?? null,
			extraTimePercent: untimed ? 0 : extra,
			untimed,
			reason: reason.trim()
		}
	}), [["exams", "accommodations"]], () => {
		setReason("");
		toast.success(t("exams.acc.granted"));
	});
	const revoke = useApiMutation((id) => api(`/api/admin/accommodations/${id}`, { method: "DELETE" }), [["exams", "accommodations"]], () => toast.success(t("exams.acc.revoked")));
	const extraOk = untimed || Number.isInteger(extra) && extra >= 0 && extra <= 300;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("exams.staff.section.accommodations"),
				subtitle: t("exams.acc.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				role: "search",
				onSubmit: (e) => {
					e.preventDefault();
					setSubmitted(search.trim());
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.acc.findUser"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "search",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "secondary",
					children: t("exams.acc.search")
				})]
			}),
			submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: users,
				children: (p) => p.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("exams.acc.noUsers")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "row",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: p.items.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: user?.id === u.id ? "primary" : "secondary",
						"aria-pressed": user?.id === u.id,
						onClick: () => setUser(u),
						children: [
							u.displayName,
							" (",
							u.email,
							")"
						]
					}) }, u.id))
				})
			}) : null,
			user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card stack",
				noValidate: true,
				onSubmit: (e) => {
					e.preventDefault();
					if (extraOk && reason.trim()) grant.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("exams.acc.grantFor", { name: user.displayName }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentPicker, {
						label: t("finala.picker.assessmentOptional"),
						selected: assessment,
						onChange: setAssessment
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("exams.acc.assessmentHint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: t("exams.acc.untimedLabel"),
						checked: untimed,
						onChange: (e) => setUntimed(e.target.checked)
					}),
					!untimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.acc.extraLabel"),
						error: extraOk ? void 0 : t("exams.acc.extraRule"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 0,
							max: 300,
							value: Number.isNaN(extra) ? "" : extra,
							onChange: (e) => setExtra(e.target.valueAsNumber)
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.acc.reason"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: reason,
							onChange: (e) => setReason(e.target.value)
						})
					}),
					grant.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: examError(grant.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: grant.isPending,
						disabled: !reason.trim(),
						children: t("exams.acc.grant")
					}) })
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row row--between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: user ? t("exams.acc.grantsOf", { name: user.displayName }) : t("exams.acc.allGrants") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: t("exams.acc.includeRevoked"),
						checked: includeRevoked,
						onChange: (e) => setIncludeRevoked(e.target.checked)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: grants,
					children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("exams.acc.none")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.acc.user")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.acc.scope")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.acc.grantColumn")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.acc.reason")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("common.actions")
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "mono",
									children: a.userId.slice(0, 8)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.assessmentId ? a.assessmentId.slice(0, 8) : t("exams.acc.global") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.untimed ? t("exams.acc.untimedShort") : t("exams.acc.extraShort", { n: a.extraTimePercent }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.reason }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.revokedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("exams.acc.revokedOn", { date: fmtDate(a.revokedAt) }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => revoke.mutate(a.id, { onError: (e) => toast.error(examError(e, t)) }),
									children: t("exams.acc.revoke")
								}) })
							] }, a.id)) })]
						})
					})
				})]
			})
		]
	});
}
var HEX = /^#[0-9a-fA-F]{6}$/;
var emptyTemplate = {
	name: "",
	titleText: "Certificate of Completion",
	primaryColor: "#1f3a8a",
	accentColor: "#b45309",
	logoResourceId: null,
	signatureName: "",
	signatureTitle: ""
};
function CertificatePreview({ v }) {
	const { t } = useI18n();
	const style = {
		"--cert-primary": HEX.test(v.primaryColor) ? v.primaryColor : "#1f3a8a",
		"--cert-accent": HEX.test(v.accentColor) ? v.accentColor : "#b45309"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "cert-preview",
		style,
		"aria-label": t("exams.cert.livePreview"),
		children: [
			v.logoResourceId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: apiUrl(`/api/learn/resources/${v.logoResourceId}/download`),
				alt: "",
				style: {
					maxBlockSize: "3rem",
					marginInline: "auto"
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cert-preview__title",
				children: v.titleText || "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "cert-preview__rule" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: t("exams.cert.sampleRecipient") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "small",
				children: t("exams.cert.sampleCourse")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "small",
				children: [
					v.signatureName || "—",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "muted",
						children: v.signatureTitle
					})
				]
			})
		]
	});
}
function TemplateForm({ initial, onDone }) {
	const { t } = useI18n();
	const toast = useToast();
	const [v, setV] = (0, import_react.useState)(initial ? {
		name: initial.name,
		titleText: initial.titleText,
		primaryColor: initial.primaryColor,
		accentColor: initial.accentColor,
		logoResourceId: initial.logoResourceId,
		signatureName: initial.signatureName,
		signatureTitle: initial.signatureTitle
	} : emptyTemplate);
	const [code, setCode] = (0, import_react.useState)("");
	const set = (k, val) => setV((x) => ({
		...x,
		[k]: val
	}));
	const save = useApiMutation(() => initial ? api(`/api/admin/certificate-templates/${initial.id}`, {
		method: "PUT",
		body: v
	}) : api("/api/admin/certificate-templates", {
		method: "POST",
		body: v
	}), [["exams", "templates"]], () => {
		toast.success(t("exams.cert.saved"));
		onDone();
	});
	const colorsOk = HEX.test(v.primaryColor) && HEX.test(v.accentColor);
	const logoOk = !v.logoResourceId || /^[0-9a-f-]{36}$/i.test(v.logoResourceId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "split",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "stack",
			noValidate: true,
			onSubmit: (e) => {
				e.preventDefault();
				if (v.name.trim() && colorsOk && logoOk) save.mutate(void 0);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.cert.name"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: v.name,
						maxLength: 100,
						onChange: (e) => set("name", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.cert.titleText"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: v.titleText,
						maxLength: 120,
						onChange: (e) => set("titleText", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.cert.primary"),
						error: HEX.test(v.primaryColor) ? void 0 : t("exams.cert.hexRule"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "color",
							value: HEX.test(v.primaryColor) ? v.primaryColor : "#000000",
							onChange: (e) => set("primaryColor", e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.cert.accent"),
						error: HEX.test(v.accentColor) ? void 0 : t("exams.cert.hexRule"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "color",
							value: HEX.test(v.accentColor) ? v.accentColor : "#000000",
							onChange: (e) => set("accentColor", e.target.value)
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageResourcePicker, {
					value: v.logoResourceId,
					onChange: (id) => set("logoResourceId", id)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.cert.signatureName"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: v.signatureName,
						maxLength: 100,
						onChange: (e) => set("signatureName", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.cert.signatureTitle"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: v.signatureTitle,
						maxLength: 100,
						onChange: (e) => set("signatureTitle", e.target.value)
					})
				}),
				save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: examError(save.error, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "form-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: save.isPending,
						disabled: !v.name.trim(),
						children: t("common.save")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: onDone,
						children: t("common.cancel")
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stack",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificatePreview, { v }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.cert.pdfCode"),
					hint: t("exams.cert.pdfHint"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: code,
						onChange: (e) => setCode(e.target.value.trim())
					})
				}),
				code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: apiUrl(`/api/certificates/${encodeURIComponent(code)}/pdf`),
					target: "_blank",
					rel: "noopener noreferrer",
					children: t("exams.cert.openPdf")
				}) : null
			]
		})]
	});
}
function TemplatesPage() {
	const { t } = useI18n();
	usePageMeta(t("exams.staff.section.templates"), void 0, { noindex: true });
	const toast = useToast();
	const [includeArchived, setIncludeArchived] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const list = useTemplates(includeArchived);
	const archive = useApiMutation((id) => api(`/api/admin/certificate-templates/${id}`, { method: "DELETE" }), [["exams", "templates"]], () => toast.success(t("exams.cert.archived")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("exams.staff.section.templates"),
				subtitle: t("exams.cert.intro"),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setEditing("new"),
					children: t("exams.cert.new")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("exams.cert.includeArchived"),
				checked: includeArchived,
				onChange: (e) => setIncludeArchived(e.target.checked)
			}),
			editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: editing === "new" ? t("exams.cert.new") : t("exams.cert.edit") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateForm, {
					initial: editing === "new" ? null : editing,
					onDone: () => setEditing(null)
				}, editing === "new" ? "new" : editing.id)]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("exams.cert.none"),
					description: t("exams.cert.noneBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: items.map((tp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: tp.name }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small muted",
								children: tp.titleText
							}),
							" ",
							tp.archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("exams.cert.archivedBadge") }) : null
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => setEditing(tp),
									children: t("common.edit")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplatePreviewButton, { templateId: tp.id }),
								!tp.archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => archive.mutate(tp.id, { onError: (e) => toast.error(examError(e, t)) }),
									children: t("exams.cert.archive")
								}) : null
							]
						})]
					}, tp.id))
				})
			})
		]
	});
}
function RequestQueue({ kind }) {
	const { t, fmtDate } = useI18n();
	usePageMeta(t(`exams.staff.section.${kind}`), void 0, { noindex: true });
	const toast = useToast();
	const [status, setStatus] = (0, import_react.useState)("Pending");
	const [notes, setNotes] = (0, import_react.useState)({});
	const key = kind === "corrections" ? examKeys.corrections(status) : examKeys.appeals(status);
	const list = useQuery({
		queryKey: key,
		queryFn: () => api(`/api/admin/certificate-${kind}${qs({ status })}`)
	});
	const decide = useApiMutation((v) => api(`/api/admin/certificate-${kind}/${v.id}/decide`, {
		method: "POST",
		body: {
			approve: v.approve,
			note: (notes[v.id] ?? "").trim()
		}
	}), [["exams", kind]], () => toast.success(t("exams.common.decided")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t(`exams.staff.section.${kind}`),
				subtitle: t(`exams.requests.${kind}Intro`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusFilter, {
				value: status,
				onChange: setStatus,
				values: [
					"Pending",
					"Approved",
					"Rejected"
				],
				prefix: "exams.requests.status"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("exams.requests.none"),
					description: t("exams.requests.noneBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card stack",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "mono",
									children: r.certificateCode
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted",
									children: fmtDate(r.createdAt)
								})]
							}),
							"requestedName" in r ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("exams.requests.nameChange", {
								from: r.currentName,
								to: r.requestedName
							}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: t("exams.requests.revokedFor", { reason: r.revocationReason ?? "—" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: r.reason
							}),
							r.status === "Pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("exams.common.note"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: notes[r.id] ?? "",
									onChange: (e) => setNotes((n) => ({
										...n,
										[r.id]: e.target.value
									}))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => decide.mutate({
										id: r.id,
										approve: true
									}, { onError: (e) => toast.error(examError(e, t)) }),
									children: t(kind === "corrections" ? "exams.requests.approveCorrection" : "exams.requests.reinstate")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "danger",
									onClick: () => decide.mutate({
										id: r.id,
										approve: false
									}, { onError: (e) => toast.error(examError(e, t)) }),
									children: t("exams.requests.reject")
								})]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "small",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: r.status === "Approved" ? "success" : "danger",
										children: t(`exams.requests.status.${r.status}`)
									}),
									" ",
									r.decisionNote
								]
							})
						]
					}, r.id))
				})
			})
		]
	});
}
var CorrectionsQueuePage = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestQueue, { kind: "corrections" });
var AppealsQueuePage = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestQueue, { kind: "appeals" });
function ReusableBankPage() {
	const { t } = useI18n();
	usePageMeta(t("exams.staff.section.reusable"), void 0, { noindex: true });
	const toast = useToast();
	const [courseQuery, setCourseQuery] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)("");
	const [courseId, setCourseId] = (0, import_react.useState)("");
	const courses = useQuery({
		queryKey: [
			"exams",
			"catalog",
			submitted
		],
		queryFn: () => api(`/api/courses${qs({
			q: submitted,
			pageSize: 20
		})}`).then((d) => Array.isArray(d) ? d : d.items),
		enabled: !!submitted
	});
	const questions = useQuery({
		queryKey: [
			"studio",
			"questions",
			courseId,
			{
				state: "Active",
				q: ""
			}
		],
		queryFn: () => api(`/api/studio/courses/${courseId}/questions${qs({
			state: "Active",
			pageSize: 200
		})}`),
		select: toQuestionList,
		enabled: !!courseId
	});
	const flag = useApiMutation((v) => api(`/api/admin/questions/${v.id}/reusable`, {
		method: "PUT",
		body: { reusable: v.reusable }
	}), [[
		"studio",
		"questions",
		courseId
	]], (_, v) => toast.success(v.reusable ? t("exams.reusable.marked") : t("exams.reusable.unmarked")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("exams.staff.section.reusable"),
				subtitle: t("exams.reusable.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				role: "search",
				onSubmit: (e) => {
					e.preventDefault();
					setSubmitted(courseQuery.trim());
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.reusable.findCourse"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "search",
						value: courseQuery,
						onChange: (e) => setCourseQuery(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "secondary",
					children: t("exams.acc.search")
				})]
			}),
			submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: courses,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("exams.reusable.noCourses")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.reusable.course"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: courseId,
						onChange: (e) => setCourseId(e.target.value),
						placeholder: t("exams.reuse.pickCourse"),
						options: list.map((c) => ({
							value: c.id,
							label: c.title
						}))
					})
				})
			}) : null,
			courseId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: questions,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("exams.reusable.noActive")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono",
								children: q.externalId
							}),
							" ",
							q.reusable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: t("exams.reusable.badge")
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
								source: q.stem,
								className: "small"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: q.reusable ? "ghost" : "secondary",
							onClick: () => flag.mutate({
								id: q.id,
								reusable: !q.reusable
							}, { onError: (e) => toast.error(examError(e, t)) }),
							children: q.reusable ? t("exams.reusable.unmark") : t("exams.reusable.mark")
						})]
					}, q.id))
				})
			}) : null
		]
	});
}
//#endregion
export { AccommodationsPage, AppealsQueuePage, CertificateFlagsPage, CertificatePreview, ChallengesQueuePage, CorrectionsQueuePage, RegradesPage, ReusableBankPage, STAFF_EXAM_SECTIONS, StaffExamsIndex, StaffExamsLayout, TemplatesPage };

//# sourceMappingURL=StaffExamsPages-5qrTs7DM.js.map