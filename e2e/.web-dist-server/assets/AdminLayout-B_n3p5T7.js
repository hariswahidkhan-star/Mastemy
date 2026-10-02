import { _ as require_react, a as Link, b as __toESM, c as Outlet, i as require_jsx_runtime, o as NavLink, r as useI18n, s as Navigate } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, l as errorMessage, n as Notice, r as PageHeader, s as StatusBadge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { t as FINALB_ADMIN_SECTIONS } from "./finalbRoutes-DAO9ialO.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { n as formatTimestamp } from "./format-B7uvlQ7u.js";
import { t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { t as asList } from "./list-BPY7bxke.js";
import { r as toQuestionList } from "./questions--q6HlBNd.js";
import { t as DiffPanel } from "./Wave2Panels-CUXfRSCA.js";
//#region src/pages/admin/ReviewQueuePage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function parseTimestamp(v) {
	const s = v.trim();
	if (!s) return null;
	const parts = s.split(":").map(Number);
	if (parts.some((p) => !Number.isFinite(p) || p < 0)) return NaN;
	return parts.reduce((acc, p) => acc * 60 + p, 0);
}
/** Reviewer transitions only: authors draft and retire questions in the studio. */
var REVIEW_NEXT = {
	Draft: "Reviewed",
	Reviewed: "Approved",
	Approved: "Active"
};
function QuestionReview({ courseId }) {
	const { t } = useI18n();
	const toast = useToast();
	const key = [
		"review",
		"questions",
		courseId
	];
	const questions = useQuery({
		queryKey: key,
		queryFn: () => api(`/api/studio/courses/${courseId}/questions?pageSize=200`),
		select: toQuestionList
	});
	const change = useApiMutation(({ id, next }) => api(`/api/studio/questions/${id}/state`, {
		method: "POST",
		body: { state: next }
	}), [key], () => toast.success(t("question.stateChanged")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("review.questions") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small muted",
			children: t("review.questionsHelp")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: questions,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("question.none")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("question.externalId")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("question.stem")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("question.state")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("common.actions")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((q) => {
						const next = REVIEW_NEXT[q.state];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono",
								children: q.externalId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [q.stem, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "small",
								style: { margin: 0 },
								children: q.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [o.isCorrect ? "✓ " : "", o.text] }, o.id ?? o.text))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: q.state }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								loading: change.isPending && change.variables?.id === q.id,
								onClick: () => change.mutate({
									id: q.id,
									next
								}, { onError: (e) => toast.error(errorMessage(e, t)) }),
								children: t(`question.to.${next}`)
							}) : null })
						] }, q.id);
					}) })]
				})
			})
		})
	] });
}
function CourseReview({ course, onChanged }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const { hasRole } = useAuth();
	const isAdmin = hasRole("Admin", "SuperAdmin");
	const commentsKey = [
		"review",
		"comments",
		course.id
	];
	const comments = useQuery({
		queryKey: commentsKey,
		queryFn: () => api(`/api/review/courses/${course.id}/comments`)
	});
	const lessons = (course.modules ?? []).flatMap((m) => m.lessons.map((l) => ({
		...l,
		moduleTitle: m.title
	})));
	const [comment, setComment] = (0, import_react.useState)({
		body: "",
		lessonId: "",
		ts: ""
	});
	const [decision, setDecision] = (0, import_react.useState)(null);
	const [adminAction, setAdminAction] = (0, import_react.useState)(null);
	const tsValue = parseTimestamp(comment.ts);
	const tsInvalid = tsValue !== null && Number.isNaN(tsValue);
	const addComment = useApiMutation(() => api(`/api/review/courses/${course.id}/comments`, {
		method: "POST",
		body: {
			body: comment.body.trim(),
			lessonId: comment.lessonId || void 0,
			videoTimestampSeconds: tsValue ?? void 0
		}
	}), [commentsKey], () => setComment({
		body: "",
		lessonId: comment.lessonId,
		ts: ""
	}));
	const decide = useApiMutation((d) => api(`/api/review/courses/${course.id}/decision`, {
		method: "POST",
		body: {
			decision: d.value,
			notes: d.notes
		}
	}), [["review", "courses"]], () => {
		setDecision(null);
		toast.success(t("review.decided"));
		onChanged();
	});
	const admin = useApiMutation((a) => api(`/api/admin/courses/${course.id}/${a}`, { method: "POST" }), [["review", "courses"]], (_r, a) => {
		setAdminAction(null);
		toast.success(a === "publish" ? t("review.published") : t("review.archived"));
		onChanged();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: { margin: 0 },
					children: course.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: course.status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("review.independence")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [
					course.status === "InReview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setDecision({
							value: "Approve",
							notes: ""
						}),
						children: t("review.approve")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => setDecision({
							value: "RequestChanges",
							notes: ""
						}),
						children: t("review.requestChanges")
					})] }) : null,
					isAdmin && course.status === "Approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setAdminAction("publish"),
						children: t("review.publish")
					}) : null,
					isAdmin && (course.status === "Published" || course.status === "Updating") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						onClick: () => setAdminAction("archive"),
						children: t("review.archive")
					}) : null,
					course.slug && (course.status === "Published" || course.status === "Updating") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "btn btn--ghost btn--md",
						to: `/courses/${course.slug}`,
						children: t("studio.viewPublic")
					}) : null
				]
			}),
			admin.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(admin.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "card card--flat",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("diff.title") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffPanel, { courseId: course.id })]
			}),
			course.isMyCourse ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionReview, { courseId: course.id }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("review.comments") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: comments,
					children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("review.noComments")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "stack",
						style: {
							listStyle: "none",
							padding: 0
						},
						children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "card card--flat",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "small muted",
								children: [
									c.authorName ?? t("review.reviewer"),
									" · ",
									fmtDate(c.createdAt),
									c.lessonId ? ` · ${lessons.find((l) => l.id === c.lessonId)?.title ?? t("question.lesson")}` : "",
									c.videoTimestampSeconds != null ? ` · ${formatTimestamp(c.videoTimestampSeconds)}` : ""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									whiteSpace: "pre-wrap",
									margin: 0
								},
								children: c.body
							})]
						}, c.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					style: { marginBlockStart: "var(--space-3)" },
					onSubmit: (e) => {
						e.preventDefault();
						if (comment.body.trim() && !tsInvalid) addComment.mutate(void 0);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "split",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("question.lesson"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: comment.lessonId,
									onChange: (e) => setComment({
										...comment,
										lessonId: e.target.value
									}),
									placeholder: t("review.wholeCourse"),
									options: lessons.map((l) => ({
										value: l.id,
										label: `${l.moduleTitle} — ${l.title}`
									}))
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("review.timestamp"),
								hint: t("review.timestampHint"),
								error: tsInvalid ? t("review.timestampInvalid") : void 0,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: comment.ts,
									onChange: (e) => setComment({
										...comment,
										ts: e.target.value
									}),
									placeholder: "12:34"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("review.comment"),
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: comment.body,
								onChange: (e) => setComment({
									...comment,
									body: e.target.value
								})
							})
						}),
						addComment.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "danger",
							children: errorMessage(addComment.error, t)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "secondary",
							loading: addComment.isPending,
							disabled: !comment.body.trim() || tsInvalid,
							children: t("review.addComment")
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!decision,
				title: decision?.value === "Approve" ? t("review.approve") : t("review.requestChanges"),
				confirmLabel: t("review.recordDecision"),
				loading: decide.isPending,
				onCancel: () => setDecision(null),
				onConfirm: () => {
					if (decision && (decision.value === "Approve" || decision.notes.trim())) decide.mutate(decision);
				},
				body: decision ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("review.notes"),
					hint: decision.value === "RequestChanges" ? t("review.notesRequired") : void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: decision.notes,
						onChange: (e) => setDecision({
							...decision,
							notes: e.target.value
						})
					})
				}), decide.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(decide.error, t)
				}) : null] }) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!adminAction,
				danger: adminAction === "archive",
				title: adminAction === "publish" ? t("review.publish") : t("review.archive"),
				body: adminAction === "publish" ? t("review.publishBody") : t("review.archiveBody"),
				confirmLabel: adminAction === "publish" ? t("review.publish") : t("review.archive"),
				loading: admin.isPending,
				onCancel: () => setAdminAction(null),
				onConfirm: () => adminAction && admin.mutate(adminAction)
			})
		]
	});
}
var QUEUE_STATUSES = [
	"InReview",
	"Draft",
	"Approved",
	"ChangesRequested",
	"Published",
	"Updating"
];
function ReviewQueuePage() {
	const { t, fmtDate } = useI18n();
	const [status, setStatus] = (0, import_react.useState)("InReview");
	const [selected, setSelected] = (0, import_react.useState)(null);
	usePageMeta(t("admin.section.review"), void 0, { noindex: true });
	const list = useQuery({
		queryKey: [
			"review",
			"courses",
			status
		],
		queryFn: () => api(`/api/review/courses${qs({ status })}`),
		select: asList
	});
	const current = list.data?.find((c) => c.id === selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("admin.section.review"),
			subtitle: t("review.subtitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("dashboard.status"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: status,
				onChange: (e) => {
					setStatus(e.target.value);
					setSelected(null);
				},
				options: QUEUE_STATUSES.map((s) => ({
					value: s,
					label: t(`status.${s}`)
				}))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("review.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("studio.courseTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("review.owner")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("studio.updated")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("common.actions")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.ownerName ?? (c.instructors?.join(", ") || "—") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(c.updatedAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: selected === c.id ? "primary" : "secondary",
								onClick: () => setSelected(c.id),
								"aria-pressed": selected === c.id,
								children: t("review.open")
							}) })
						] }, c.id)) })]
					})
				}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseReview, {
					course: current,
					onChanged: () => setSelected(null)
				}, current.id) : null]
			})
		})
	] });
}
//#endregion
//#region src/pages/admin/AdminLayout.tsx
var ADMIN_SECTIONS = [
	{
		to: "/admin",
		key: "review",
		roles: [
			"Reviewer",
			"Admin",
			"SuperAdmin"
		]
	},
	{
		to: "/admin/applications",
		key: "applications",
		roles: [
			"Reviewer",
			"Admin",
			"SuperAdmin"
		]
	},
	{
		to: "/admin/videos",
		key: "videos",
		roles: [
			"Reviewer",
			"Admin",
			"SuperAdmin"
		]
	},
	{
		to: "/admin/packages",
		key: "packages",
		roles: [
			"Admin",
			"SuperAdmin",
			"Finance"
		]
	},
	{
		to: "/admin/refunds",
		key: "refunds",
		roles: [
			"Finance",
			"Admin",
			"SuperAdmin"
		]
	},
	{
		to: "/admin/finance",
		key: "commerce.nav.finance",
		roles: [
			"Finance",
			"Admin",
			"SuperAdmin"
		]
	},
	{
		to: "/admin/commerce",
		key: "commerce.nav.staff",
		roles: ["Admin", "SuperAdmin"]
	},
	{
		to: "/admin/users",
		key: "users",
		roles: [
			"Support",
			"Admin",
			"SuperAdmin"
		]
	},
	{
		to: "/admin/orgs",
		key: "orgs",
		roles: ["Admin", "SuperAdmin"]
	},
	{
		to: "/admin/settings",
		key: "settings",
		roles: ["Admin", "SuperAdmin"]
	},
	{
		to: "/admin/audit",
		key: "audit",
		roles: [
			"Finance",
			"Admin",
			"SuperAdmin"
		]
	},
	...[
		{
			to: "/admin/certifications",
			key: "certifications",
			label: "discover.admin.nav.certifications",
			roles: [
				"Reviewer",
				"Admin",
				"SuperAdmin"
			]
		},
		{
			to: "/admin/skills",
			key: "skills",
			label: "discover.admin.nav.skills",
			roles: ["Admin", "SuperAdmin"]
		},
		{
			to: "/admin/pathways",
			key: "pathways",
			label: "discover.admin.nav.pathways",
			roles: ["Admin", "SuperAdmin"]
		},
		{
			to: "/admin/collections",
			key: "collections",
			label: "discover.admin.nav.collections",
			roles: ["Admin", "SuperAdmin"]
		},
		{
			to: "/admin/bestsellers",
			key: "bestsellers",
			label: "discover.admin.nav.bestsellers",
			roles: ["Admin", "SuperAdmin"]
		},
		{
			to: "/admin/course-ideas",
			key: "ideas",
			label: "discover.admin.nav.ideas",
			roles: ["Admin", "SuperAdmin"]
		}
	],
	...FINALB_ADMIN_SECTIONS,
	{
		to: "/admin/analytics",
		key: "wsAnalytics",
		roles: ["Admin", "SuperAdmin"],
		label: "workspace.nav.analytics"
	},
	{
		to: "/admin/trust",
		key: "wsTrust",
		roles: ["Admin", "SuperAdmin"],
		label: "workspace.nav.trust"
	},
	{
		to: "/admin/operations",
		key: "wsOps",
		roles: ["Admin", "SuperAdmin"],
		label: "workspace.nav.operations"
	},
	{
		to: "/admin/ai",
		key: "wsAi",
		roles: ["Admin", "SuperAdmin"],
		label: "workspace.nav.ai"
	}
];
function AdminLayout() {
	const { t } = useI18n();
	const { hasRole } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container side-layout",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": t("admin.nav"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "side-nav",
				children: ADMIN_SECTIONS.filter((s) => hasRole(...s.roles)).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
					to: s.to,
					end: true,
					children: t(s.label ?? (s.key.includes(".") ? s.key : `admin.section.${s.key}`))
				}) }, s.to))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })]
	});
}
/** /admin landing: reviewers get the review queue; other staff go to their first permitted section. */
function AdminIndex() {
	const { hasRole } = useAuth();
	if (hasRole("Reviewer", "Admin", "SuperAdmin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewQueuePage, {});
	const first = ADMIN_SECTIONS.find((s) => s.to !== "/admin" && hasRole(...s.roles));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: first?.to ?? "/",
		replace: true
	});
}
//#endregion
export { AdminIndex, AdminLayout };

//# sourceMappingURL=AdminLayout-B_n3p5T7.js.map