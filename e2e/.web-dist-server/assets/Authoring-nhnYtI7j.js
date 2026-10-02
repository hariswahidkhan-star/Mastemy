import { _ as require_react, b as __toESM, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { _ as restoreRevision, a as wsError, d as duplicateModule, g as parseLessonList, i as fmtDateTime, l as bulkLessons, m as getNotes, n as Drawer, r as WsError, u as duplicateLesson, v as saveNotes, y as wsKeys } from "./common-BCMvJ35x.js";
import { a as QueryState, n as Notice, o as QueryStatus, s as StatusBadge, t as Badge } from "./misc-Bqc6tFVU.js";
import { f as useStudioCourses, n as useApiMutation, t as keys } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as Dialog } from "./Dialog-CcENtYyA.js";
import { t as Markdown } from "./Markdown-pkfpt1OJ.js";
import { n as AiAssistPanel } from "./AiPanels-DtsIcotO.js";
//#region src/pages/workspace/Authoring.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AUTOSAVE_MS = 2e4;
/**
* Lesson notes with optimistic concurrency: every save sends If-Match "n{notesVersion}"; a 412 opens a conflict
* dialog (server version vs yours → reload, or overwrite by re-applying yours on top of the latest version).
* Autosaves every 20 s while there are unsaved changes.
*/
function NotesEditor({ lesson, courseId, Editor }) {
	const { t, lang } = useI18n();
	const toast = useToast();
	const qc = useQueryClient();
	const notesQ = useQuery({
		queryKey: wsKeys.notes(lesson.id),
		queryFn: () => getNotes(lesson.id),
		staleTime: Infinity
	});
	const [notes, setNotes] = (0, import_react.useState)(null);
	const [premium, setPremium] = (0, import_react.useState)("");
	const [etag, setEtag] = (0, import_react.useState)("");
	const [base, setBase] = (0, import_react.useState)({
		notes: "",
		premium: ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [savedAt, setSavedAt] = (0, import_react.useState)(null);
	const [conflict, setConflict] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [historyOpen, setHistoryOpen] = (0, import_react.useState)(false);
	const load = (0, import_react.useCallback)((d) => {
		setNotes(d.notesMarkdown ?? "");
		setPremium(d.premiumNotesMarkdown ?? "");
		setBase({
			notes: d.notesMarkdown ?? "",
			premium: d.premiumNotesMarkdown ?? ""
		});
		setEtag(d.etag);
	}, []);
	(0, import_react.useEffect)(() => {
		if (notes === null && notesQ.data) load(notesQ.data);
	}, [
		notesQ.data,
		notes,
		load
	]);
	const dirty = notes !== null && (notes !== base.notes || premium !== base.premium);
	const state = (0, import_react.useRef)({
		notes,
		premium,
		etag,
		saving,
		conflict,
		dirty
	});
	state.current = {
		notes,
		premium,
		etag,
		saving,
		conflict,
		dirty
	};
	const save = (0, import_react.useCallback)(async (manual, overrideEtag) => {
		const s = state.current;
		if (s.notes === null || s.saving) return;
		setSaving(true);
		setError(null);
		const sent = {
			notesMarkdown: s.notes,
			premiumNotesMarkdown: s.premium
		};
		try {
			const r = await saveNotes(lesson.id, overrideEtag ?? s.etag, sent);
			setEtag(r.etag);
			setBase({
				notes: sent.notesMarkdown,
				premium: sent.premiumNotesMarkdown
			});
			setSavedAt((/* @__PURE__ */ new Date()).toISOString());
			setConflict(null);
			qc.setQueryData(wsKeys.notes(lesson.id), {
				lessonId: lesson.id,
				notesVersion: r.lesson.notesVersion,
				etag: r.etag,
				notesMarkdown: sent.notesMarkdown,
				premiumNotesMarkdown: sent.premiumNotesMarkdown || null
			});
			qc.invalidateQueries({ queryKey: keys.studioCourse(courseId) });
			qc.invalidateQueries({ queryKey: wsKeys.revisions(lesson.id) });
			if (manual) toast.success(t("editor.notesSaved"));
		} catch (e) {
			if (e instanceof ApiError && (e.status === 412 || e.is("precondition_failed"))) try {
				const server = await getNotes(lesson.id);
				setConflict({ server });
			} catch (e2) {
				setError(e2);
			}
			else setError(e);
		} finally {
			setSaving(false);
		}
	}, [
		lesson.id,
		courseId,
		qc,
		toast,
		t
	]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			const s = state.current;
			if (s.dirty && !s.saving && !s.conflict) save(false);
		}, AUTOSAVE_MS);
		return () => window.clearInterval(id);
	}, [save]);
	if (notesQ.isPending || notes === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: notesQ,
		children: () => null
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => {
			e.preventDefault();
			save(true);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small muted",
					role: "status",
					"aria-live": "polite",
					children: [
						saving ? t("workspace.notes.saving") : dirty ? t("workspace.notes.unsaved") : savedAt ? t("workspace.notes.savedAt", { time: fmtDateTime(savedAt, lang) }) : t("workspace.notes.upToDate"),
						" ",
						"· ",
						t("workspace.notes.autosaveHint")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					onClick: () => setHistoryOpen(true),
					children: t("workspace.revisions.open")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, {
				label: t("learn.studyNotes"),
				hint: t("editor.notesHint"),
				value: notes,
				onChange: setNotes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, {
				label: t("learn.premiumNotes"),
				hint: t("editor.premiumHint"),
				value: premium,
				onChange: setPremium
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				loading: saving,
				disabled: !!conflict,
				children: t("editor.saveNotes")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				style: { marginBlockStart: "var(--space-5)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiAssistPanel, {
					courseId,
					lessonId: lesson.id,
					onInsert: (text) => setNotes((n) => n ? `${n}\n\n${text}` : text)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: !!conflict,
				wide: true,
				alert: true,
				title: t("workspace.conflict.title"),
				onClose: () => setConflict(null),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => {
						if (!conflict) return;
						load(conflict.server);
						setConflict(null);
						toast.success(t("workspace.conflict.reloaded"));
					},
					children: t("workspace.conflict.reload")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					loading: saving,
					onClick: () => conflict && void save(true, conflict.server.etag),
					children: t("workspace.conflict.overwrite")
				})] }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("workspace.conflict.body") }), conflict ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ws-conflict",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "small",
						children: t("workspace.conflict.server", { n: conflict.server.notesVersion })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "ws-pre",
						"aria-label": t("workspace.conflict.server", { n: conflict.server.notesVersion }),
						children: conflict.server.notesMarkdown || "—"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "small",
						children: t("workspace.conflict.yours")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "ws-pre",
						"aria-label": t("workspace.conflict.yours"),
						children: notes || "—"
					})] })]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevisionsDrawer, {
				open: historyOpen,
				onClose: () => setHistoryOpen(false),
				lessonId: lesson.id,
				etag,
				dirty,
				onRestored: (l, newEtag) => {
					const d = {
						lessonId: lesson.id,
						notesVersion: l.notesVersion,
						etag: newEtag,
						notesMarkdown: l.notesMarkdown ?? "",
						premiumNotesMarkdown: l.premiumNotesMarkdown ?? null
					};
					qc.setQueryData(wsKeys.notes(lesson.id), d);
					load(d);
					qc.invalidateQueries({ queryKey: keys.studioCourse(courseId) });
				}
			})
		]
	});
}
function RevisionsDrawer({ open, onClose, lessonId, etag, dirty, onRestored }) {
	const { t, lang } = useI18n();
	const toast = useToast();
	const qc = useQueryClient();
	const list = useQuery({
		queryKey: wsKeys.revisions(lessonId),
		queryFn: () => api(`/api/studio/lessons/${lessonId}/revisions`),
		enabled: open
	});
	const [viewing, setViewing] = (0, import_react.useState)(null);
	const detail = useQuery({
		queryKey: [...wsKeys.revisions(lessonId), viewing],
		queryFn: () => api(`/api/studio/lessons/${lessonId}/revisions/${viewing ?? 0}`),
		enabled: open && viewing !== null
	});
	const restore = useApiMutation((revision) => restoreRevision(lessonId, revision, etag), [wsKeys.revisions(lessonId)], (r) => {
		onRestored(r.lesson, r.etag);
		toast.success(t("workspace.revisions.restored"));
		setViewing(null);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		open,
		onClose,
		title: t("workspace.revisions.title"),
		children: [dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "warning",
			children: t("workspace.revisions.dirtyWarning")
		}) : null, viewing !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stack",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => setViewing(null),
				children: ["← ", t("workspace.revisions.back")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: detail,
				children: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stack",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("workspace.revisions.revision", { n: r.revision }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "small muted",
							children: [
								r.authorName ?? t("workspace.revisions.unknownAuthor"),
								" ·",
								" ",
								fmtDateTime(r.createdAt, lang)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t("learn.studyNotes") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "ws-pre",
							children: r.notesMarkdown || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t("learn.premiumNotes") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "ws-pre",
							children: r.premiumNotesMarkdown || "—"
						}),
						r.isCurrent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: t("workspace.revisions.current")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							loading: restore.isPending,
							onClick: () => restore.mutate(r.revision),
							children: t("workspace.revisions.restore", { n: r.revision })
						}),
						restore.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
							tone: "danger",
							children: [
								wsError(restore.error, t),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => {
										qc.invalidateQueries({ queryKey: wsKeys.notes(lessonId) });
										restore.reset();
									},
									children: t("common.retry")
								})
							]
						}) : null
					]
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("workspace.revisions.none")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "ws-list",
				children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "card card--flat",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row row--between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("workspace.revisions.revision", { n: r.revision }) }), r.isCurrent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: t("workspace.revisions.current")
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "small muted",
							children: [
								r.authorName ?? t("workspace.revisions.unknownAuthor"),
								" ·",
								" ",
								fmtDateTime(r.createdAt, lang),
								r.restoredFromRevision ? ` · ${t("workspace.revisions.restoredFrom", { n: r.restoredFromRevision })}` : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "small muted",
							children: t("workspace.revisions.lengths", {
								notes: r.notesLength,
								premium: r.premiumNotesLength
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => setViewing(r.revision),
							"aria-label": t("workspace.revisions.viewNamed", { n: r.revision }),
							children: t("workspace.revisions.view")
						})
					]
				}, r.revision))
			})
		})]
	});
}
function CourseHistoryPanel({ course }) {
	const { t, lang } = useI18n();
	const [pages, setPages] = (0, import_react.useState)(1);
	const history = useQuery({
		queryKey: [...wsKeys.history(course.id), pages],
		queryFn: async () => {
			const all = [];
			let hasMore = false;
			for (let p = 1; p <= pages; p++) {
				const r = await api(`/api/studio/courses/${course.id}/history?page=${p}&pageSize=50`);
				all.push(...r.items);
				hasMore = r.hasMore;
			}
			return {
				items: all,
				hasMore
			};
		},
		placeholderData: (prev) => prev
	});
	const lessonTitle = (id) => id ? course.modules.flatMap((m) => m.lessons).find((l) => l.id === id)?.title ?? t("workspace.history.removedLesson") : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: history,
		children: (h) => h.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted",
			children: t("workspace.history.none")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stack",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "ws-list",
				"aria-label": t("workspace.history.title"),
				children: h.items.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "card card--flat",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row row--between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: e.kind === "notes_revision" ? t("workspace.history.notesRevision", {
								n: e.revision ?? 0,
								lesson: lessonTitle(e.lessonId) ?? ""
							}) : e.action }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									dateTime: e.at,
									children: fmtDateTime(e.at, lang)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "small muted",
							children: [e.actorName ?? t("workspace.revisions.unknownAuthor"), e.kind === "audit" && e.lessonId ? ` · ${lessonTitle(e.lessonId)}` : ""]
						}),
						e.details && e.kind === "audit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "small",
							children: t("workspace.history.details")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "ws-pre",
							children: e.details
						})] }) : null
					]
				}, `${e.at}-${i}`))
			}), h.hasMore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				loading: history.isFetching,
				onClick: () => setPages((p) => p + 1),
				children: t("workspace.history.more")
			}) : null]
		})
	});
}
function DuplicateCourseButton({ course }) {
	const { t } = useI18n();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const dup = useApiMutation(() => api(`/api/studio/courses/${course.id}/duplicate`, {
		method: "POST",
		body: { title: title.trim() || null }
	}), [keys.studioCourses], (c) => {
		setOpen(false);
		navigate(`/studio/courses/${c.id}`);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "secondary",
		onClick: () => setOpen(true),
		children: t("workspace.duplicate.course")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		title: t("workspace.duplicate.course"),
		onClose: () => setOpen(false),
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: () => setOpen(false),
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			loading: dup.isPending,
			onClick: () => dup.mutate(void 0),
			children: t("workspace.duplicate.create")
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				children: t("workspace.duplicate.courseHelp")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.duplicate.newTitle"),
				hint: t("workspace.duplicate.titleHint"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					maxLength: 120
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: dup.error })
		]
	})] });
}
function DuplicateLessonButton({ lesson, courseId }) {
	const { t } = useI18n();
	const toast = useToast();
	const dup = useApiMutation(() => duplicateLesson(lesson.id), [keys.studioCourse(courseId)], () => toast.success(t("workspace.duplicate.lessonDone")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "ghost",
		loading: dup.isPending,
		onClick: () => dup.mutate(void 0, { onError: (e) => toast.error(wsError(e, t)) }),
		"aria-label": t("workspace.duplicate.lessonNamed", { title: lesson.title }),
		children: t("workspace.duplicate.short")
	});
}
/** Per-module tools in the curriculum: duplicate the module, paste a list of lesson titles. */
function ModuleTools({ module, courseId }) {
	const { t } = useI18n();
	const toast = useToast();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [text, setText] = (0, import_react.useState)("");
	const titles = parseLessonList(text);
	const dup = useApiMutation(() => duplicateModule(module.id), [keys.studioCourse(courseId)], () => toast.success(t("workspace.duplicate.moduleDone")));
	const bulk = useApiMutation(() => bulkLessons(module.id, titles), [keys.studioCourse(courseId)], (r) => {
		toast.success(t("workspace.bulk.done", { n: r.length }));
		setOpen(false);
		setText("");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "row",
		style: { display: "inline-flex" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: () => setOpen(true),
				children: t("workspace.bulk.open")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				loading: dup.isPending,
				onClick: () => dup.mutate(void 0, { onError: (e) => toast.error(wsError(e, t)) }),
				"aria-label": t("workspace.duplicate.moduleNamed", { title: module.title }),
				children: t("workspace.duplicate.module")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open,
				title: t("workspace.bulk.title", { module: module.title }),
				onClose: () => setOpen(false),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setOpen(false),
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: bulk.isPending,
					disabled: titles.length === 0 || titles.length > 100,
					onClick: () => bulk.mutate(void 0),
					children: t("workspace.bulk.create", { n: titles.length })
				})] }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("workspace.bulk.label"),
						hint: t("workspace.bulk.hint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 8,
							value: text,
							onChange: (e) => setText(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						"aria-live": "polite",
						children: titles.length > 100 ? t("workspace.bulk.tooMany") : t("workspace.bulk.count", { n: titles.length })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: bulk.error })
				]
			})
		]
	});
}
function useTemplates() {
	return useQuery({
		queryKey: wsKeys.templates,
		queryFn: () => api("/api/studio/course-templates"),
		staleTime: 3e5
	});
}
function TemplatePicker({ value, onChange }) {
	const { t } = useI18n();
	const templates = useTemplates();
	if (templates.isPending || templates.isError || (templates.data ?? []).length === 0) return null;
	const list = templates.data;
	const chosen = list.find((x) => x.id === value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("workspace.templates.label"),
			hint: t("workspace.templates.hint"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder: t("workspace.templates.none"),
				options: list.map((x) => ({
					value: x.id,
					label: x.name
				}))
			})
		}), chosen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card card--flat small",
			children: [chosen.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: { marginBlockStart: 0 },
				children: chosen.description
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				style: { margin: 0 },
				children: t("workspace.templates.summary", {
					modules: chosen.modules.length,
					lessons: chosen.modules.reduce((n, m) => n + (m.lessons?.length ?? 0), 0),
					checklist: chosen.checklist.length
				})
			})]
		}) : null]
	});
}
function ChecklistPanel({ course }) {
	const { t } = useI18n();
	const toast = useToast();
	const [text, setText] = (0, import_react.useState)("");
	const list = useQuery({
		queryKey: wsKeys.checklist(course.id),
		queryFn: () => api(`/api/studio/courses/${course.id}/checklist`)
	});
	const add = useApiMutation(() => api(`/api/studio/courses/${course.id}/checklist`, {
		method: "POST",
		body: { text: text.trim() }
	}), [wsKeys.checklist(course.id)], () => setText(""));
	const toggle = useApiMutation((v) => api(`/api/studio/courses/${course.id}/checklist/${v.id}`, {
		method: "PUT",
		body: { done: v.done }
	}), [wsKeys.checklist(course.id)]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("workspace.checklist.help")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("workspace.checklist.empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					children: t("workspace.checklist.progress", {
						done: items.filter((i) => i.done).length,
						total: items.length
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ws-list",
					children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: i.text,
						checked: i.done,
						disabled: toggle.isPending,
						onChange: (e) => toggle.mutate({
							id: i.id,
							done: e.target.checked
						}, { onError: (er) => toast.error(wsError(er, t)) })
					}) }, i.id))
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					if (text.trim()) add.mutate(void 0);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("workspace.checklist.new"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: text,
						onChange: (e) => setText(e.target.value),
						maxLength: 300
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !text.trim(),
					loading: add.isPending,
					children: t("workspace.checklist.add")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: add.error })
		]
	});
}
function TranslationsPanel({ course }) {
	const { t } = useI18n();
	const toast = useToast();
	const [target, setTarget] = (0, import_react.useState)("");
	const list = useQuery({
		queryKey: wsKeys.translations(course.id),
		queryFn: () => api(`/api/studio/courses/${course.id}/translations`),
		retry: false
	});
	const mine = useStudioCourses();
	const link = useApiMutation(() => api(`/api/studio/courses/${course.id}/translations`, {
		method: "POST",
		body: { courseId: target }
	}), [wsKeys.translations(course.id)], () => {
		setTarget("");
		toast.success(t("workspace.translations.linked"));
	});
	const unlink = useApiMutation(() => api(`/api/studio/courses/${course.id}/translations`, { method: "DELETE" }), [wsKeys.translations(course.id)], () => toast.success(t("workspace.translations.unlinked")));
	const linkedIds = new Set((list.data ?? []).map((x) => x.courseId));
	const candidates = (mine.data ?? []).filter((c) => c.id !== course.id && !linkedIds.has(c.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("workspace.translations.title") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("workspace.translations.help")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: mine }),
			list.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: list.error }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("workspace.translations.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ws-list",
					children: items.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: x.title }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small muted",
								children: [
									x.code,
									" · ",
									t(`language.${x.language}`)
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: x.status })]
					}, x.courseId))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					loading: unlink.isPending,
					onClick: () => unlink.mutate(void 0),
					children: t("workspace.translations.unlink")
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					if (target) link.mutate(void 0);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("workspace.translations.pick"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: target,
						onChange: (e) => setTarget(e.target.value),
						placeholder: t("workspace.translations.choose"),
						options: candidates.map((c) => ({
							value: c.id,
							label: c.code ? `${c.title} (${c.code})` : c.title
						}))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !target,
					loading: link.isPending,
					children: t("workspace.translations.link")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: link.error ?? unlink.error })
		]
	});
}
/** Tab content: duplicate the course + language variants. Management actions; editors see the server's 403. */
function CopiesPanel({ course }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "stack",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("workspace.duplicate.course") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DuplicateCourseButton, { course }) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslationsPanel, { course })]
	});
}
function PreviewPanel({ course }) {
	const { t } = useI18n();
	const [as, setAs] = (0, import_react.useState)("free");
	const [device, setDevice] = (0, import_react.useState)("desktop");
	const [lessonId, setLessonId] = (0, import_react.useState)("");
	const preview = useQuery({
		queryKey: [
			"ws",
			"preview",
			course.id,
			as,
			device
		],
		queryFn: () => api(`/api/studio/courses/${course.id}/preview?as=${as}&device=${device}`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("workspace.preview.note")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "row",
					style: {
						border: 0,
						padding: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "small",
						children: t("workspace.preview.as")
					}), ["free", "premium"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "row small",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: "ws-as",
							checked: as === v,
							onChange: () => setAs(v)
						}), t(`workspace.preview.${v}`)]
					}, v))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "row",
					style: {
						border: 0,
						padding: 0
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "small",
						children: t("workspace.preview.device")
					}), ["desktop", "mobile"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "row small",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: "ws-device",
							checked: device === v,
							onChange: () => setDevice(v)
						}), t(`workspace.preview.${v}`)]
					}, v))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: preview,
				children: (p) => {
					const current = p.lessons.find((l) => l.lesson.id === lessonId) ?? p.lessons[0];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `ws-frame ws-frame--${device}`,
						"aria-label": t("workspace.preview.frame", { device: t(`workspace.preview.${device}`) }),
						role: "region",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								style: { marginBlockStart: 0 },
								children: p.curriculum.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("workspace.preview.lesson"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: current?.lesson.id ?? "",
									onChange: (e) => setLessonId(e.target.value),
									options: p.lessons.map((l) => ({
										value: l.lesson.id,
										label: l.lesson.title
									}))
								})
							}),
							current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "stack",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: current.lesson.title }),
									current.youtubeVideoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "small muted",
										children: t("workspace.preview.video", { id: current.youtubeVideoId })
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "small muted",
										children: t("player.noVideo")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { children: t("learn.studyNotes") }),
									current.notesMarkdown.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { source: current.notesMarkdown }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "muted",
										children: t("learn.noNotes")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { children: t("learn.premiumNotes") }),
									current.premiumLocked || current.premiumNotesMarkdown === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "locked",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("learn.premiumLockedBody") })
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { source: current.premiumNotesMarkdown }),
									current.assessments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { children: t("learn.practice") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: current.assessments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										a.title,
										" · ",
										t("workspace.preview.questions", { n: a.questionCount })
									] }, a.id)) })] }) : null
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "muted",
								children: t("learn.noLessons")
							})
						]
					});
				}
			})
		]
	});
}
/**
* Before the first submission: if the server requires acceptance of the current agreement, show it and record
* acceptance; then run the original action. A submit refused with 409 agreement_required re-opens the dialog.
*/
function useAgreementGate() {
	const { t } = useI18n();
	const qc = useQueryClient();
	const [pending, setPending] = (0, import_react.useState)(null);
	const [agreement, setAgreement] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const open = async (action) => {
		setError(null);
		try {
			const a = await qc.fetchQuery({
				queryKey: wsKeys.agreement,
				queryFn: () => api("/api/studio/agreement"),
				staleTime: 0
			});
			if (a.required && !a.accepted && a.current) {
				setAgreement(a);
				setChecked(false);
				setPending(() => action);
			} else action();
		} catch {
			action();
		}
	};
	const accept = async () => {
		if (!agreement?.current) return;
		setBusy(true);
		setError(null);
		try {
			await api("/api/studio/agreement/accept", {
				method: "POST",
				body: { version: agreement.current.version }
			});
			await qc.invalidateQueries({ queryKey: wsKeys.agreement });
			const a = pending;
			setAgreement(null);
			setPending(null);
			a?.();
		} catch (e) {
			setError(e);
		} finally {
			setBusy(false);
		}
	};
	return {
		run: (action) => void open(action),
		handleError: (e, retry) => {
			if (e instanceof ApiError && e.is("agreement_required")) {
				qc.invalidateQueries({ queryKey: wsKeys.agreement });
				open(retry);
				return true;
			}
			return false;
		},
		dialog: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open: !!agreement,
			wide: true,
			title: agreement?.current?.title ?? t("workspace.agreement.title"),
			onClose: () => {
				setAgreement(null);
				setPending(null);
			},
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => {
					setAgreement(null);
					setPending(null);
				},
				children: t("common.cancel")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !checked,
				loading: busy,
				onClick: () => void accept(),
				children: t("workspace.agreement.accept")
			})] }),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("workspace.agreement.intro", { version: agreement?.current?.version ?? "" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ws-pre",
					style: { fontFamily: "inherit" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { source: agreement?.current?.body ?? "" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					label: t("workspace.agreement.confirm"),
					checked,
					onChange: (e) => setChecked(e.target.checked)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error })
			]
		})
	};
}
//#endregion
export { ModuleTools as a, TemplatePicker as c, DuplicateLessonButton as i, useAgreementGate as l, CopiesPanel as n, NotesEditor as o, CourseHistoryPanel as r, PreviewPanel as s, ChecklistPanel as t };

//# sourceMappingURL=Authoring-nhnYtI7j.js.map