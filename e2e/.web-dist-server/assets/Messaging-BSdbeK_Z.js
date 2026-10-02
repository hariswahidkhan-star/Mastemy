import { _ as require_react, a as Link, b as __toESM, h as useParams, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, n as Notice, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { c as useLearnCourse, n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, n as Field, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as Dialog, t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { a as REPORT_MAX, d as msgKeys, i as MESSAGE_MAX, m as validateMessageBody, n as finalaError, r as AUTO_MESSAGE_MAX, t as FinalaError, u as messagingApi } from "./shared-CFDEeOyq.js";
import { n as CompletionAwardToggle, t as CompletionAwardClaim } from "./Credentials-ClrgE0yN.js";
//#region src/pages/finala/Messaging.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var MODERATORS = [
	"Moderator",
	"Admin",
	"SuperAdmin"
];
/** Plain-text composer with a live character count; mirrors the server's 1..max, no-HTML rule. */
function MessageComposer({ label, max = MESSAGE_MAX, pending, error, submitLabel, onSend, autoFocus }) {
	const { t } = useI18n();
	const [body, setBody] = (0, import_react.useState)("");
	const [touched, setTouched] = (0, import_react.useState)(false);
	const counterId = (0, import_react.useId)();
	const problem = validateMessageBody(body, max);
	const length = body.trim().length;
	const shownProblem = touched && problem && problem !== "empty" ? problem : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "stack finala-composer",
		noValidate: true,
		onSubmit: (e) => {
			e.preventDefault();
			setTouched(true);
			if (!problem) onSend(body.trim(), () => {
				setBody("");
				setTouched(false);
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label,
				hint: t("finala.msg.plainText"),
				error: shownProblem ? t(`finala.msg.invalid.${shownProblem}`, { max }) : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 4,
					value: body,
					autoFocus,
					onChange: (e) => {
						setBody(e.target.value);
						if (e.target.value.trim().length > max) setTouched(true);
					},
					"aria-describedby": counterId
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					id: counterId,
					className: length > max ? "small finala-counter finala-counter--over" : "small muted",
					"aria-live": "polite",
					"data-testid": "composer-count",
					children: t("finala.msg.count", {
						n: length,
						max
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: pending,
					disabled: !!problem,
					children: submitLabel ?? t("finala.msg.send")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error })
		]
	});
}
/** "Message instructor": only rendered for enrolled learners (server re-checks enrollment). */
function MessageInstructorButton({ courseId, enrolled }) {
	const { t } = useI18n();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const send = useApiMutation((v) => messagingApi.toInstructors(courseId, v.body), [msgKeys.conversations], (r, v) => {
		v.reset();
		setOpen(false);
		navigate(`/messages/${r.conversation.id}`);
	});
	if (!user || !enrolled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "secondary",
		onClick: () => setOpen(true),
		children: t("finala.msg.messageInstructor")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		title: t("finala.msg.messageInstructor"),
		onClose: () => setOpen(false),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small muted",
			children: t("finala.msg.instructorHelp")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageComposer, {
			label: t("finala.msg.yourMessage"),
			pending: send.isPending,
			error: send.error,
			autoFocus: true,
			onSend: (body, reset) => send.mutate({
				body,
				reset
			})
		})]
	})] });
}
/** Instructor → enrolled learner. The API answers 404 when the person is not enrolled. */
function MessageLearnerButton({ courseId, learnerId, learnerName }) {
	const { t } = useI18n();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const send = useApiMutation((v) => messagingApi.toLearner(courseId, learnerId, v.body), [msgKeys.conversations], (r, v) => {
		v.reset();
		setOpen(false);
		navigate(`/messages/${r.conversation.id}`);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "ghost",
		onClick: () => setOpen(true),
		children: t("finala.msg.messageLearner")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		title: t("finala.msg.messageLearnerTitle", { name: learnerName }),
		onClose: () => setOpen(false),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageComposer, {
			label: t("finala.msg.yourMessage"),
			pending: send.isPending,
			error: send.error instanceof ApiError && send.error.status === 404 ? void 0 : send.error,
			autoFocus: true,
			onSend: (body, reset) => send.mutate({
				body,
				reset
			})
		}), send.error instanceof ApiError && send.error.status === 404 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: t("finala.msg.notEnrolled")
		}) : null]
	})] });
}
/** Course page actions for enrolled learners: message the instructors, claim a completion award. */
function CourseLearnerActions({ courseId, slug }) {
	const { user } = useAuth();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedInCourseActions, {
		courseId,
		slug
	}) : null;
}
function SignedInCourseActions({ courseId, slug }) {
	const enrolled = !!useLearnCourse(slug).data?.enrolled;
	if (!enrolled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "row",
		style: {
			marginBlockEnd: "var(--space-3)",
			alignItems: "flex-start"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageInstructorButton, {
			courseId,
			enrolled
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompletionAwardClaim, {
			courseId,
			enrolled
		})]
	});
}
function ConversationRow({ c }) {
	const { t, fmtDate } = useI18n();
	const other = c.myRole === "Learner" ? t("finala.msg.instructors") : c.learnerName;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "card card--flat finala-conv",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/messages/${c.id}`,
			className: "finala-conv__link",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: other }), c.unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "info",
				children: t("finala.msg.unread", { n: c.unread })
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "small muted",
			children: [
				c.courseTitle,
				" · ",
				fmtDate(c.lastMessageAt)
			]
		})]
	});
}
function BlockedUsers() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const blocks = useQuery({
		queryKey: msgKeys.blocks,
		queryFn: messagingApi.blocks
	});
	const unblock = useApiMutation((id) => messagingApi.unblock(id), [msgKeys.blocks], () => toast.success(t("finala.msg.unblocked")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		"aria-labelledby": "blocked-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "blocked-h",
				children: t("finala.msg.blockedTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: blocks,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: t("finala.msg.noBlocked")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							b.displayName,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small muted",
								children: fmtDate(b.createdAt)
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							loading: unblock.isPending && unblock.variables === b.userId,
							onClick: () => unblock.mutate(b.userId),
							children: t("finala.msg.unblock")
						})]
					}, b.userId))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: unblock.error })
		]
	});
}
function InboxPage() {
	const { t } = useI18n();
	const { hasRole } = useAuth();
	usePageMeta(t("finala.msg.inbox"), void 0, { noindex: true });
	const list = useQuery({
		queryKey: msgKeys.conversations,
		queryFn: messagingApi.conversations
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("finala.msg.inbox"),
				subtitle: t("finala.msg.inboxSubtitle"),
				actions: hasRole(...MODERATORS) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "btn btn--secondary btn--sm",
					to: "/moderation/messages",
					children: t("finala.mod.title")
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("finala.msg.empty"),
					description: t("finala.msg.emptyBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationRow, { c }, c.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockedUsers, {})
		]
	});
}
function ReportDialog({ message, onClose }) {
	const { t } = useI18n();
	const toast = useToast();
	const [reason, setReason] = (0, import_react.useState)("");
	const ok = reason.trim().length >= 10 && reason.trim().length <= 2e3;
	const report = useApiMutation(() => messagingApi.report(message.id, reason.trim()), [], () => {
		toast.success(t("finala.msg.reported"));
		onClose();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: true,
		title: t("finala.msg.reportTitle"),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "danger",
			disabled: !ok,
			loading: report.isPending,
			onClick: () => report.mutate(void 0),
			children: t("finala.msg.report")
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finala.msg.reportHelp")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("finala.msg.reportReason"),
				hint: t("finala.msg.reportReasonHint", {
					min: 10,
					max: REPORT_MAX
				}),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 4,
					maxLength: REPORT_MAX,
					value: reason,
					onChange: (e) => setReason(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: report.error })
		]
	});
}
function HideDialog({ message, onClose, onDone }) {
	const { t } = useI18n();
	const [reason, setReason] = (0, import_react.useState)("");
	const ok = reason.trim().length >= 3 && reason.trim().length <= 500;
	const hide = useApiMutation(() => messagingApi.hide(message.id, reason.trim()), [], onDone);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: true,
		title: t("finala.mod.hideTitle"),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "danger",
			disabled: !ok,
			loading: hide.isPending,
			onClick: () => hide.mutate(void 0),
			children: t("finala.mod.hide")
		})] }),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("finala.mod.hideReason"),
			hint: t("finala.mod.hideReasonHint", {
				min: 3,
				max: 500
			}),
			required: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				rows: 3,
				maxLength: 500,
				value: reason,
				onChange: (e) => setReason(e.target.value)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: hide.error })]
	});
}
function MessageItem({ m, mine, moderator, onReport, onBlock, onHide, onUnhide }) {
	const { t, fmtDate } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: mine ? "finala-msg finala-msg--mine" : "finala-msg",
		"aria-label": t("finala.msg.from", { name: m.senderName }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row row--between small",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: m.senderName }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "muted",
						children: [
							t(`finala.msg.role.${m.senderRole}`),
							" · ",
							fmtDate(m.createdAt)
						]
					}),
					" ",
					m.kind !== "Text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "info",
						children: t(`finala.msg.kind.${m.kind}`)
					}) : null
				] })
			}),
			m.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				title: t("finala.msg.hiddenTitle"),
				children: m.hiddenReason ? t("finala.msg.hiddenReason", { reason: m.hiddenReason }) : t("finala.msg.hiddenBody")
			}) : null,
			m.body !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pre-wrap finala-msg__body",
				children: m.body
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [
					!mine && !m.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onReport,
						children: t("finala.msg.report")
					}) : null,
					!mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onBlock,
						children: t("finala.msg.block", { name: m.senderName })
					}) : null,
					moderator ? m.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onUnhide,
						children: t("finala.mod.unhide")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onHide,
						children: t("finala.mod.hide")
					}) : null
				]
			})
		]
	});
}
function ConversationPage() {
	const { id = "" } = useParams();
	const { t } = useI18n();
	const { user, hasRole } = useAuth();
	const toast = useToast();
	const qc = useQueryClient();
	usePageMeta(t("finala.msg.conversation"), void 0, { noindex: true });
	const page = useQuery({
		queryKey: msgKeys.conversation(id),
		queryFn: () => messagingApi.conversation(id)
	});
	const [older, setOlder] = (0, import_react.useState)([]);
	const [olderHasMore, setOlderHasMore] = (0, import_react.useState)(null);
	const [loadingOlder, setLoadingOlder] = (0, import_react.useState)(false);
	const [reporting, setReporting] = (0, import_react.useState)(null);
	const [hiding, setHiding] = (0, import_react.useState)(null);
	const [blocking, setBlocking] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setOlder([]);
		setOlderHasMore(null);
	}, [id]);
	(0, import_react.useEffect)(() => {
		if (page.isSuccess) qc.invalidateQueries({ queryKey: msgKeys.conversations });
	}, [page.isSuccess, qc]);
	const refresh = () => qc.invalidateQueries({ queryKey: msgKeys.conversation(id) });
	const reply = useApiMutation((v) => messagingApi.reply(id, v.body), [msgKeys.conversation(id), msgKeys.conversations], (_r, v) => v.reset());
	const block = useApiMutation((userId) => messagingApi.block(userId), [msgKeys.blocks], () => {
		setBlocking(null);
		toast.success(t("finala.msg.blocked"));
	});
	const unhide = useApiMutation((messageId) => messagingApi.unhide(messageId), [msgKeys.conversation(id)], () => toast.success(t("finala.mod.unhidden")));
	const moderator = hasRole(...MODERATORS);
	if (page.isError && page.error instanceof ApiError && page.error.status === 404) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: t("finala.msg.notFound"),
			action: {
				label: t("finala.msg.inbox"),
				to: "/messages"
			}
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": t("common.breadcrumb"),
				className: "small muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/messages",
					children: t("finala.msg.inbox")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: page,
				children: (p) => {
					const c = p.conversation;
					const messages = [...older, ...p.messages];
					const hasMore = olderHasMore ?? p.hasMore;
					const participant = c.myRole === "Learner" || c.myRole === "Instructor";
					const loadOlder = async () => {
						if (messages.length === 0) return;
						setLoadingOlder(true);
						try {
							const prev = await messagingApi.conversation(id, messages[0].createdAt);
							setOlder((o) => [...prev.messages, ...o]);
							setOlderHasMore(prev.hasMore);
						} catch (e) {
							toast.error(finalaError(e, t));
						} finally {
							setLoadingOlder(false);
						}
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
							title: c.myRole === "Learner" ? t("finala.msg.withInstructors", { course: c.courseTitle }) : t("finala.msg.withLearner", {
								name: c.learnerName,
								course: c.courseTitle
							}),
							subtitle: t("finala.msg.privacy")
						}),
						hasMore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "sm",
							loading: loadingOlder,
							onClick: () => void loadOlder(),
							children: t("finala.msg.older")
						}) : null,
						messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: t("finala.msg.noMessages")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "finala-thread",
							"aria-label": t("finala.msg.conversation"),
							children: messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageItem, {
								m,
								mine: m.senderId === user?.id,
								moderator,
								onReport: () => setReporting(m),
								onBlock: () => setBlocking(m),
								onHide: () => setHiding(m),
								onUnhide: () => unhide.mutate(m.id)
							}, m.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: unhide.error }),
						participant ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageComposer, {
							label: t("finala.msg.reply"),
							pending: reply.isPending,
							error: reply.error,
							onSend: (body, reset) => reply.mutate({
								body,
								reset
							})
						}) : null
					] });
				}
			}),
			reporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportDialog, {
				message: reporting,
				onClose: () => setReporting(null)
			}) : null,
			hiding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HideDialog, {
				message: hiding,
				onClose: () => setHiding(null),
				onDone: () => {
					setHiding(null);
					refresh();
					toast.success(t("finala.mod.hidden"));
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!blocking,
				danger: true,
				title: t("finala.msg.blockTitle", { name: blocking?.senderName ?? "" }),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("finala.msg.blockBody") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: block.error })] }),
				confirmLabel: t("finala.msg.blockConfirm"),
				loading: block.isPending,
				onCancel: () => setBlocking(null),
				onConfirm: () => blocking && block.mutate(blocking.senderId)
			})
		]
	});
}
function ModerationMessagesPage() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	usePageMeta(t("finala.mod.title"), void 0, { noindex: true });
	const [includeHidden, setIncludeHidden] = (0, import_react.useState)(false);
	const [hiding, setHiding] = (0, import_react.useState)(null);
	const reports = useQuery({
		queryKey: msgKeys.reports(includeHidden),
		queryFn: () => messagingApi.reports(includeHidden)
	});
	const qc = useQueryClient();
	const unhide = useApiMutation((messageId) => messagingApi.unhide(messageId), [["finala", "msg-reports"]], () => toast.success(t("finala.mod.unhidden")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("finala.mod.title"),
				subtitle: t("finala.mod.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("finala.mod.includeHidden"),
				checked: includeHidden,
				onChange: (e) => setIncludeHidden(e.target.checked)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: reports,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("finala.mod.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat stack",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between small",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.senderName }),
									" · ",
									fmtDate(r.createdAt),
									" ",
									r.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "danger",
										children: t("finala.mod.hiddenBadge")
									}) : null
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/messages/${r.conversationId}`,
									children: t("finala.mod.openThread")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
								className: "pre-wrap finala-quote",
								children: r.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "small",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("finala.mod.reportReason") }),
									" ",
									r.reason
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "row",
								children: r.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									loading: unhide.isPending && unhide.variables === r.messageId,
									onClick: () => unhide.mutate(r.messageId),
									children: t("finala.mod.unhide")
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "danger",
									onClick: () => setHiding({
										id: r.messageId,
										conversationId: r.conversationId,
										senderId: r.senderId,
										senderName: r.senderName,
										senderRole: "Learner",
										kind: "Text",
										body: r.body,
										hidden: false,
										hiddenReason: null,
										createdAt: r.createdAt
									}),
									children: t("finala.mod.hide")
								})
							})
						]
					}, r.reportId))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: unhide.error }),
			hiding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HideDialog, {
				message: hiding,
				onClose: () => setHiding(null),
				onDone: () => {
					setHiding(null);
					qc.invalidateQueries({ queryKey: ["finala", "msg-reports"] });
					toast.success(t("finala.mod.hidden"));
				}
			}) : null
		]
	});
}
function AutoMessageEditor({ courseId, kind, current }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [body, setBody] = (0, import_react.useState)(current?.body ?? "");
	const [enabled, setEnabled] = (0, import_react.useState)(current?.enabled ?? false);
	const problem = validateMessageBody(body, AUTO_MESSAGE_MAX);
	const save = useApiMutation(() => messagingApi.setAutoMessage(courseId, kind, body.trim(), enabled), [msgKeys.autoMessages(courseId)], () => toast.success(t("finala.auto.saved")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "card card--flat stack",
		noValidate: true,
		onSubmit: (e) => {
			e.preventDefault();
			if (!problem) save.mutate(void 0);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				style: { margin: 0 },
				children: t(`finala.auto.${kind}`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t(`finala.auto.${kind}Help`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("finala.auto.body"),
				hint: t("finala.auto.bodyHint", {
					n: body.trim().length,
					max: AUTO_MESSAGE_MAX
				}),
				error: problem && problem !== "empty" ? t(`finala.msg.invalid.${problem}`, { max: AUTO_MESSAGE_MAX }) : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 5,
					value: body,
					onChange: (e) => setBody(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("finala.auto.enabled"),
				hint: t("finala.auto.enabledHint"),
				checked: enabled,
				onChange: (e) => setEnabled(e.target.checked)
			}),
			current?.enabledSince ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finala.auto.enabledSince", { date: fmtDate(current.enabledSince) })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: save.error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !!problem,
					loading: save.isPending,
					children: t("common.save")
				})
			})
		]
	});
}
function CourseConversations({ courseId }) {
	const { t } = useI18n();
	const list = useQuery({
		queryKey: msgKeys.conversations,
		queryFn: messagingApi.conversations
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "stack",
		"aria-labelledby": "course-conv-h",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			id: "course-conv-h",
			children: t("finala.studio.conversations")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (items) => {
				const mine = items.filter((c) => c.courseId === courseId);
				return mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: t("finala.studio.noConversations")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: mine.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationRow, { c }, c.id))
				});
			}
		})]
	});
}
/** Studio tab: welcome/completion auto-messages, completion award switch and this course's threads. */
function StudioMessagingPanel({ course }) {
	const { t } = useI18n();
	const auto = useQuery({
		queryKey: msgKeys.autoMessages(course.id),
		queryFn: () => messagingApi.autoMessages(course.id)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompletionAwardToggle, { courseId: course.id }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card stack",
				"aria-labelledby": "auto-h",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "auto-h",
					children: t("finala.auto.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: auto,
					children: (list) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "stack",
						children: ["welcome", "completion"].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoMessageEditor, {
							courseId: course.id,
							kind: k,
							current: list.find((a) => a.kind.toLowerCase() === k)
						}, k))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseConversations, { courseId: course.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("finala.studio.messageLearnerHow")
				})]
			})
		]
	});
}
//#endregion
export { MessageInstructorButton as a, StudioMessagingPanel as c, MessageComposer as i, CourseLearnerActions as n, MessageLearnerButton as o, InboxPage as r, ModerationMessagesPage as s, ConversationPage as t };

//# sourceMappingURL=Messaging-BSdbeK_Z.js.map