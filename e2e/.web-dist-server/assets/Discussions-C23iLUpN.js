import { _ as require_react, a as Link, b as __toESM, h as useParams, i as require_jsx_runtime, p as useLocation, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, n as ButtonLink, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth, t as AUTHOR_ROLES } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, i as Pagination, l as errorMessage, n as Notice, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation, t as keys } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { m as w2keys } from "./wave2-rI7jjNgp.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as Dialog } from "./Dialog-CcENtYyA.js";
import { o as ReportContentButton, r as HiddenContentNotice } from "./Trust-B2S3OlzB.js";
import { n as HiddenThreadNotice } from "./Account-BZOx0fua.js";
import { o as MessageLearnerButton } from "./Messaging-BSdbeK_Z.js";
//#region src/pages/engagement/Discussions.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var EDIT_WINDOW_MS = 864e5;
var MODERATOR_ROLES = [
	"Moderator",
	"Admin",
	"SuperAdmin"
];
function withinEditWindow(createdAt, now = Date.now()) {
	const t = new Date(createdAt).getTime();
	return Number.isFinite(t) && now - t <= EDIT_WINDOW_MS;
}
/** True when the signed-in user is listed as an instructor of the course (as the API's IsCourseAuthor). */
function useIsCourseAuthor(courseId) {
	const { hasRole } = useAuth();
	const authorRole = hasRole(...AUTHOR_ROLES);
	const courses = useQuery({
		queryKey: keys.studioCourses,
		queryFn: () => api("/api/studio/courses"),
		select: (d) => Array.isArray(d) ? d : d.items,
		enabled: authorRole && !!courseId
	});
	if (!authorRole || !courseId) return false;
	return !!courses.data?.some((c) => c.id === courseId && c.myRole != null);
}
function DiscussionsPanel({ courseId, lessonId, canPost, notAllowedReason, basePath, initialResolved = "all", hideForm }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [q, setQ] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [resolved, setResolved] = (0, import_react.useState)(initialResolved);
	const [lessonOnly, setLessonOnly] = (0, import_react.useState)(!!lessonId);
	const [page, setPage] = (0, import_react.useState)(1);
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [formError, setFormError] = (0, import_react.useState)(null);
	const params = {
		lessonId: lessonOnly ? lessonId : void 0,
		q: search || void 0,
		resolved: resolved === "all" ? void 0 : resolved === "resolved",
		page,
		pageSize: 10
	};
	const threads = useQuery({
		queryKey: w2keys.discussions(courseId, params),
		queryFn: () => api(`/api/courses/${courseId}/discussions${qs(params)}`),
		placeholderData: (prev) => prev
	});
	const create = useApiMutation(() => api(`/api/courses/${courseId}/discussions`, {
		method: "POST",
		body: {
			lessonId: lessonId ?? null,
			title: title.trim(),
			body: body.trim()
		}
	}), [w2keys.discussionsAll(courseId)], () => {
		setTitle("");
		setBody("");
		toast.success(t("qa.posted"));
	});
	const submit = (e) => {
		e.preventDefault();
		if (title.trim().length < 3) return setFormError(t("qa.titleTooShort"));
		if (!body.trim()) return setFormError(t("qa.bodyRequired"));
		setFormError(null);
		create.mutate(void 0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				role: "search",
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					setPage(1);
					setSearch(q.trim());
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("qa.search"),
						className: "grow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "search",
							value: q,
							onChange: (e) => setQ(e.target.value),
							maxLength: 100
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("qa.filter"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: resolved,
							onChange: (e) => {
								setPage(1);
								setResolved(e.target.value);
							},
							options: [
								{
									value: "all",
									label: t("qa.filterAll")
								},
								{
									value: "unresolved",
									label: t("qa.filterUnresolved")
								},
								{
									value: "resolved",
									label: t("qa.filterResolved")
								}
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "secondary",
						children: t("courses.searchButton")
					})
				]
			}),
			lessonId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("qa.thisLessonOnly"),
				checked: lessonOnly,
				onChange: (e) => {
					setPage(1);
					setLessonOnly(e.target.checked);
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: threads,
				children: (data) => data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: search ? t("qa.noMatches") : t("qa.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "thread-list",
					children: data.items.map((th) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row row--between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `${basePath}/discussions/${th.id}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: th.title })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [th.resolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "success",
									children: t("qa.resolved")
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("qa.open") }), th.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "danger",
									children: t("qa.hidden")
								}) : null]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "small muted",
							style: { margin: 0 },
							children: [
								t("qa.byline", {
									name: th.authorName,
									date: fmtDate(th.createdAt)
								}),
								" ·",
								" ",
								t("qa.replies", { n: th.replyCount })
							]
						})]
					}, th.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					page: data.page,
					pageSize: data.pageSize,
					total: data.total,
					onPage: setPage
				})] })
			}),
			hideForm ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card card--flat",
				"aria-labelledby": "qa-new",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "qa-new",
					children: t("qa.ask")
				}), canPost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("qa.threadTitle"),
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: title,
								onChange: (e) => setTitle(e.target.value),
								maxLength: 200
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("qa.threadBody"),
							hint: t("qa.plainText"),
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: body,
								onChange: (e) => setBody(e.target.value),
								maxLength: 5e3
							})
						}),
						formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "danger",
							children: formError
						}) : null,
						create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "danger",
							children: errorMessage(create.error, t)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							loading: create.isPending,
							children: t("qa.post")
						})
					]
				}) : notAllowedReason]
			})
		]
	});
}
function HideDialog({ open, hidden, onClose, onSubmit, pending, error }) {
	const { t } = useI18n();
	const [reason, setReason] = (0, import_react.useState)("");
	const [missing, setMissing] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		alert: true,
		title: hidden ? t("qa.unhideTitle") : t("qa.hideTitle"),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: hidden ? "primary" : "danger",
			loading: pending,
			onClick: () => {
				if (!hidden && !reason.trim()) {
					setMissing(true);
					return;
				}
				onSubmit(reason.trim());
			},
			children: hidden ? t("qa.unhide") : t("qa.hide")
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				children: hidden ? t("qa.unhideBody") : t("qa.hideBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("qa.hideReason"),
				required: !hidden,
				error: missing ? t("qa.hideReasonRequired") : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: reason,
					onChange: (e) => setReason(e.target.value),
					maxLength: 500
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(error, t)
			}) : null
		]
	});
}
function EditableText({ initialTitle, initialBody, onSave, onCancel, pending, error }) {
	const { t } = useI18n();
	const [title, setTitle] = (0, import_react.useState)(initialTitle ?? "");
	const [body, setBody] = (0, import_react.useState)(initialBody);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => {
			e.preventDefault();
			onSave({
				title: initialTitle !== void 0 ? title.trim() : void 0,
				body: body.trim()
			});
		},
		children: [
			initialTitle !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("qa.threadTitle"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					maxLength: 200
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("qa.threadBody"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: body,
					onChange: (e) => setBody(e.target.value),
					maxLength: 5e3
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "sm",
					loading: pending,
					children: t("common.save")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: onCancel,
					children: t("common.cancel")
				})]
			})
		]
	});
}
function ReplyItem({ reply, moderator, invalidate }) {
	const { t, fmtDate } = useI18n();
	const { user } = useAuth();
	const toast = useToast();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [hiding, setHiding] = (0, import_react.useState)(false);
	const edit = useApiMutation((body) => api(`/api/discussion-replies/${reply.id}`, {
		method: "PUT",
		body: { body }
	}), [], () => {
		setEditing(false);
		invalidate();
		toast.success(t("common.saved"));
	});
	const hide = useApiMutation((reason) => api(`/api/moderation/discussion-replies/${reply.id}/hide`, {
		method: "POST",
		body: {
			hidden: !reply.hidden,
			reason
		}
	}), [], () => {
		setHiding(false);
		invalidate();
		toast.success(reply.hidden ? t("qa.unhidden") : t("qa.hiddenDone"));
	});
	const mine = user?.id === reply.authorId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: reply.isInstructorReply ? "reply reply--instructor" : "reply",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "small",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: reply.authorName }),
						" ",
						reply.isInstructorReply ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "accent",
							children: t("qa.instructor")
						}) : null,
						" ",
						reply.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "danger",
							children: t("qa.hidden")
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "muted",
							children: [" · ", fmtDate(reply.createdAt)]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [
						mine && !reply.hidden && withinEditWindow(reply.createdAt) && !editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setEditing(true),
							children: t("common.edit")
						}) : null,
						moderator ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setHiding(true),
							children: reply.hidden ? t("qa.unhide") : t("qa.hide")
						}) : null,
						!mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportContentButton, {
							targetType: "DiscussionReply",
							targetId: reply.id
						}) : null
					]
				})]
			}),
			editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
				initialBody: reply.body,
				pending: edit.isPending,
				error: edit.error,
				onCancel: () => setEditing(false),
				onSave: (v) => edit.mutate(v.body)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pre-wrap",
				children: reply.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HideDialog, {
				open: hiding,
				hidden: reply.hidden,
				onClose: () => setHiding(false),
				onSubmit: (reason) => hide.mutate(reason),
				pending: hide.isPending,
				error: hide.error
			})
		]
	});
}
function ThreadView({ threadId }) {
	const { t, fmtDate } = useI18n();
	const { user, hasRole } = useAuth();
	const toast = useToast();
	const location = useLocation();
	const thread = useQuery({
		queryKey: w2keys.thread(threadId),
		queryFn: () => api(`/api/discussions/${threadId}`)
	});
	const moderator = hasRole(...MODERATOR_ROLES);
	const courseId = thread.data?.thread.courseId;
	const isAuthor = useIsCourseAuthor(courseId);
	const [reply, setReply] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [hiding, setHiding] = (0, import_react.useState)(false);
	const invalidate = () => thread.refetch();
	const allThreads = courseId ? [w2keys.discussionsAll(courseId)] : [];
	const post = useApiMutation(() => api(`/api/discussions/${threadId}/replies`, {
		method: "POST",
		body: { body: reply.trim() }
	}), [w2keys.thread(threadId), ...allThreads], () => {
		setReply("");
		toast.success(t("qa.replyPosted"));
	});
	const edit = useApiMutation((v) => api(`/api/discussions/${threadId}`, {
		method: "PUT",
		body: v
	}), [w2keys.thread(threadId), ...allThreads], () => {
		setEditing(false);
		toast.success(t("common.saved"));
	});
	const resolve = useApiMutation((resolved) => api(`/api/discussions/${threadId}/resolve`, {
		method: "POST",
		body: { resolved }
	}), [w2keys.thread(threadId), ...allThreads], (_r, resolved) => toast.success(resolved ? t("qa.markedResolved") : t("qa.markedOpen")));
	const hide = useApiMutation((v) => api(`/api/moderation/discussions/${threadId}/hide`, {
		method: "POST",
		body: v
	}), [w2keys.thread(threadId), ...allThreads], (_r, v) => {
		setHiding(false);
		toast.success(v.hidden ? t("qa.hiddenDone") : t("qa.unhidden"));
	});
	if (thread.isError && thread.error instanceof ApiError && thread.error.status === 404) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("qa.notFound") });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: thread,
		children: ({ thread: th, replies, moderation }) => {
			const mine = user?.id === th.authorId;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "page-title",
						style: { fontSize: "var(--text-xl)" },
						children: th.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [
							th.resolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: t("qa.resolved")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("qa.open") }),
							th.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "danger",
								children: t("qa.hidden")
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small muted",
								children: t("qa.byline", {
									name: th.authorName,
									date: fmtDate(th.createdAt)
								})
							})
						]
					})] }),
					editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableText, {
						initialTitle: th.title,
						initialBody: th.body,
						pending: edit.isPending,
						error: edit.error,
						onCancel: () => setEditing(false),
						onSave: (v) => edit.mutate(v)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pre-wrap",
						children: th.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [
							mine && !th.hidden && withinEditWindow(th.createdAt) && !editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setEditing(true),
								children: t("common.edit")
							}) : null,
							isAuthor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								loading: resolve.isPending,
								onClick: () => resolve.mutate(!th.resolved),
								children: th.resolved ? t("qa.reopen") : t("qa.markResolved")
							}) : null,
							moderator ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => setHiding(true),
								children: th.hidden ? t("qa.unhide") : t("qa.hide")
							}) : null,
							!mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportContentButton, {
								targetType: "Discussion",
								targetId: th.id
							}) : null,
							isAuthor && !mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageLearnerButton, {
								courseId: th.courseId,
								learnerId: th.authorId,
								learnerName: th.authorName
							}) : null
						]
					}),
					mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiddenThreadNotice, { moderation }) : null,
					resolve.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: errorMessage(resolve.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": "replies-h",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "replies-h",
							children: t("qa.replies", { n: replies.length })
						}), replies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: t("qa.noReplies")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "reply-list",
							children: replies.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReplyItem, {
								reply: r,
								moderator,
								invalidate
							}, r.id))
						})]
					}),
					user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "card card--flat",
						onSubmit: (e) => {
							e.preventDefault();
							if (reply.trim()) post.mutate(void 0);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("qa.yourReply"),
								hint: t("qa.plainText"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: reply,
									onChange: (e) => setReply(e.target.value),
									maxLength: 5e3
								})
							}),
							post.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
								tone: "danger",
								children: errorMessage(post.error, t)
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								loading: post.isPending,
								disabled: !reply.trim(),
								children: t("qa.reply")
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/login?next=${encodeURIComponent(location.pathname)}`,
						children: t("qa.loginToReply")
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HideDialog, {
						open: hiding,
						hidden: th.hidden,
						onClose: () => setHiding(false),
						onSubmit: (reason) => hide.mutate({
							hidden: !th.hidden,
							reason
						}),
						pending: hide.isPending,
						error: hide.error
					})
				]
			});
		}
	});
}
/** /courses/:slug/discussions/:threadId — the slug segment may also be a course id (notification links). */
function ThreadPage() {
	const { slug = "", threadId = "" } = useParams();
	const { t } = useI18n();
	usePageMeta(t("qa.title"), void 0, { noindex: true });
	const isId = /^[0-9a-f-]{36}$/i.test(slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": t("common.breadcrumb"),
				className: "small muted",
				children: [
					isId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/me",
						children: t("nav.dashboard")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/courses/${slug}`,
						children: t("qa.backToCourse")
					}),
					" ",
					"/ ",
					t("qa.title")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadView, { threadId }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreadUnavailable, { threadId })
		]
	});
}
/** A hidden thread reads as 404 for its author; offer the appeal route alongside the error. */
function ThreadUnavailable({ threadId }) {
	const thread = useQuery({
		queryKey: w2keys.thread(threadId),
		queryFn: () => api(`/api/discussions/${threadId}`)
	});
	if (!(thread.error instanceof ApiError) || thread.error.status !== 404) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiddenContentNotice, {
		targetType: "Discussion",
		targetId: threadId
	});
}
/** Enrollment prompt for learners who may read but not yet post. */
function EnrollToPost({ courseId, slug }) {
	const { t } = useI18n();
	const { user } = useAuth();
	const toast = useToast();
	const location = useLocation();
	const enroll = useApiMutation(() => api(`/api/learn/courses/${courseId}/enroll`, { method: "POST" }), [keys.dashboard, keys.learnCourse(slug)], () => toast.success(t("course.enrolled")));
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "small",
		children: t("qa.loginToAsk")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
		size: "sm",
		to: `/login?next=${encodeURIComponent(location.pathname)}`,
		children: t("nav.login")
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small",
			children: t("qa.enrollToAsk")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			loading: enroll.isPending,
			onClick: () => enroll.mutate(void 0),
			children: t("course.enrollFree")
		}),
		enroll.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: errorMessage(enroll.error, t)
		}) : null
	] });
}
//#endregion
export { ThreadView as a, ThreadPage as i, EnrollToPost as n, useIsCourseAuthor as o, MODERATOR_ROLES as r, withinEditWindow as s, DiscussionsPanel as t };

//# sourceMappingURL=Discussions-C23iLUpN.js.map