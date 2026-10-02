import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, m as useNavigate, r as useI18n, s as Navigate } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, n as ButtonLink, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { o as useTrackEvent } from "./analytics-Bl_3puqd.js";
import { a as QueryState, l as errorMessage, n as Notice, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { c as useLearnCourse, l as useLesson, n as useApiMutation, t as keys } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { n as formatTimestamp } from "./format-B7uvlQ7u.js";
import { t as Duration } from "./Duration-C3eLHxwf.js";
import { t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { t as Markdown } from "./Markdown-pkfpt1OJ.js";
import { t as Tabs } from "./Tabs-CKJGcPx4.js";
import { n as HeldLessonNotice, o as ReportContentButton } from "./Trust-B2S3OlzB.js";
import { t as CompletionAwardClaim } from "./Credentials-ClrgE0yN.js";
import { a as MessageInstructorButton } from "./Messaging-BSdbeK_Z.js";
import { n as EnrollToPost, o as useIsCourseAuthor, t as DiscussionsPanel } from "./Discussions-C23iLUpN.js";
import { i as youtubeWatchUrl, n as loadYouTubeApi, r as playerErrorKey, t as YT_STATE } from "./youtube-CfgiWCkO.js";
import { n as NegativeMarkingDisclosure } from "./Learning-DLGEO_vT.js";
import { a as TranscriptPanel, i as ReportIssueButton, r as LessonResources, t as AnnouncementsList } from "./LessonExtras-CUwuIFd4.js";
import { i as TutorPanel, r as AiPracticePanel } from "./AiPanels-DtsIcotO.js";
import { n as BookmarksPanel } from "./Study-CQK2DfC3.js";
//#region src/components/YouTubePlayer.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Official YouTube IFrame Player (youtube-nocookie host). Nothing is drawn over the player;
* all Mastemy controls live outside it. Errors show a helpful message and a link to YouTube.
*/
var YouTubePlayer = (0, import_react.forwardRef)(function YouTubePlayer({ videoId, title, startSeconds, onPause, onEnded }, ref) {
	const { t, lang } = useI18n();
	const mountRef = (0, import_react.useRef)(null);
	const playerRef = (0, import_react.useRef)(null);
	const [errorCode, setErrorCode] = (0, import_react.useState)(null);
	const [loadFailed, setLoadFailed] = (0, import_react.useState)(false);
	const callbacks = (0, import_react.useRef)({
		onPause,
		onEnded
	});
	(0, import_react.useEffect)(() => {
		callbacks.current = {
			onPause,
			onEnded
		};
	});
	const startRef = (0, import_react.useRef)(startSeconds);
	(0, import_react.useImperativeHandle)(ref, () => ({
		getCurrentTime: () => {
			try {
				return playerRef.current?.getCurrentTime() ?? 0;
			} catch {
				return 0;
			}
		},
		seekTo: (s) => {
			try {
				playerRef.current?.seekTo(s, true);
				playerRef.current?.playVideo();
			} catch {}
		}
	}), []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setErrorCode(null);
		setLoadFailed(false);
		const host = mountRef.current;
		if (!host) return;
		const target = document.createElement("div");
		host.replaceChildren(target);
		loadYouTubeApi().then((YT) => {
			if (cancelled) return;
			playerRef.current = new YT.Player(target, {
				host: "https://www.youtube-nocookie.com",
				videoId,
				playerVars: {
					rel: 0,
					playsinline: 1,
					hl: lang,
					cc_lang_pref: lang,
					origin: window.location.origin,
					start: Math.max(0, Math.floor(startRef.current ?? 0))
				},
				events: {
					onError: (e) => setErrorCode(e.data),
					onStateChange: (e) => {
						const time = (() => {
							try {
								return e.target.getCurrentTime();
							} catch {
								return 0;
							}
						})();
						if (e.data === YT_STATE.PAUSED) callbacks.current.onPause?.(time);
						if (e.data === YT_STATE.ENDED) callbacks.current.onEnded?.(time);
					}
				}
			});
		}).catch(() => {
			if (!cancelled) setLoadFailed(true);
		});
		return () => {
			cancelled = true;
			try {
				playerRef.current?.destroy();
			} catch {}
			playerRef.current = null;
		};
	}, [videoId, lang]);
	if (loadFailed && errorCode === null) {
		const params = new URLSearchParams({
			rel: "0",
			playsinline: "1",
			hl: lang,
			start: String(Math.max(0, Math.floor(startRef.current ?? 0)))
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "player-frame",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params}`,
				title: t("player.label", { title }),
				allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
				referrerPolicy: "strict-origin-when-cross-origin",
				allowFullScreen: true
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "small muted",
			children: [
				t("player.basicEmbed"),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: youtubeWatchUrl(videoId),
					target: "_blank",
					rel: "noopener noreferrer",
					children: t("player.watchOnYouTube")
				})
			]
		})] });
	}
	if (errorCode !== null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "player-error",
		role: "alert",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("player.errorTitle") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: { margin: 0 },
				children: t(playerErrorKey(errorCode))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "btn btn--primary btn--md",
				href: youtubeWatchUrl(videoId),
				target: "_blank",
				rel: "noopener noreferrer",
				children: t("player.watchOnYouTube")
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "player-frame",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: mountRef,
			role: "group",
			"aria-label": t("player.label", { title })
		})
	});
});
//#endregion
//#region src/pages/learn/LearnPage.tsx
var PROGRESS_INTERVAL_MS = 15e3;
function useProgressSaver(lessonId, enabled, player) {
	const lastSent = (0, import_react.useRef)(-1);
	const save = (0, import_react.useCallback)((positionSeconds, completed = false) => {
		if (!enabled) return;
		const pos = Math.floor(positionSeconds);
		if (!completed && Math.abs(pos - lastSent.current) < 2) return;
		lastSent.current = pos;
		api(`/api/learn/lessons/${lessonId}/progress`, {
			method: "PUT",
			body: {
				positionSeconds: pos,
				completed
			},
			keepalive: true
		}).catch(() => void 0);
	}, [lessonId, enabled]);
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		const id = window.setInterval(() => {
			const time = player.current?.getCurrentTime() ?? 0;
			if (time > 0) save(time);
		}, PROGRESS_INTERVAL_MS);
		return () => window.clearInterval(id);
	}, [
		enabled,
		save,
		player
	]);
	return save;
}
function MyNotes({ lessonId, player }) {
	const { t } = useI18n();
	const toast = useToast();
	const notesKey = keys.notes({ lessonId });
	const notes = useQuery({
		queryKey: notesKey,
		queryFn: () => api(`/api/me/notes?lessonId=${lessonId}`),
		select: (d) => Array.isArray(d) ? d : d.items
	});
	const [body, setBody] = (0, import_react.useState)("");
	const [tags, setTags] = (0, import_react.useState)("");
	const [stamp, setStamp] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const create = useApiMutation(() => api("/api/me/notes", {
		method: "POST",
		body: {
			lessonId,
			timestampSeconds: stamp,
			body,
			tags
		}
	}), [notesKey], () => {
		setBody("");
		setTags("");
		setStamp(null);
		toast.success(t("notes.saved"));
	});
	const update = useApiMutation((n) => api(`/api/me/notes/${n.id}`, {
		method: "PUT",
		body: {
			lessonId,
			timestampSeconds: n.timestampSeconds,
			body: n.body,
			tags: n.tags
		}
	}), [notesKey], () => {
		setEditing(null);
		toast.success(t("notes.saved"));
	});
	const remove = useApiMutation((id) => api(`/api/me/notes/${id}`, { method: "DELETE" }), [notesKey], () => setToDelete(null));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				if (body.trim()) create.mutate(void 0);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: () => setStamp(Math.floor(player.current?.getCurrentTime() ?? 0)),
						children: t("notes.addAtTime")
					}), stamp !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "small",
						children: [
							t("notes.at"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono",
								children: formatTimestamp(stamp)
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ts-button",
								onClick: () => setStamp(null),
								"aria-label": t("notes.clearTime"),
								children: "✕"
							})
						]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("notes.body"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: body,
						onChange: (e) => setBody(e.target.value),
						rows: 3,
						maxLength: 8e3
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("notes.tags"),
					hint: t("notes.tagsHint"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: tags,
						onChange: (e) => setTags(e.target.value),
						maxLength: 200
					})
				}),
				create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(create.error, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "sm",
					loading: create.isPending,
					disabled: !body.trim(),
					children: t("notes.save")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { marginBlockStart: "var(--space-4)" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: notes,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("notes.empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					style: {
						listStyle: "none",
						padding: 0,
						margin: 0
					},
					children: [...list].sort((a, b) => (a.timestampSeconds ?? 1e9) - (b.timestampSeconds ?? 1e9)).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "note-item",
						children: [
							n.timestampSeconds !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ts-button",
								onClick: () => player.current?.seekTo(n.timestampSeconds ?? 0),
								"aria-label": t("notes.seekTo", { time: formatTimestamp(n.timestampSeconds) }),
								children: formatTimestamp(n.timestampSeconds)
							}) : null,
							editing?.id === n.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "note-item__body",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									"aria-label": t("notes.body"),
									value: editing.body,
									onChange: (e) => setEditing({
										...editing,
										body: e.target.value
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "row",
									style: { marginBlockStart: "var(--space-2)" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										loading: update.isPending,
										onClick: () => update.mutate(editing),
										children: t("common.save")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => setEditing(null),
										children: t("common.cancel")
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "note-item__body",
								children: [n.body, n.tags ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "small muted",
									children: ["#", n.tags.split(",").map((x) => x.trim()).join(" #")]
								}) : null]
							}),
							editing?.id !== n.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setEditing(n),
									children: t("common.edit")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setToDelete(n),
									children: t("common.delete")
								})]
							}) : null
						]
					}, n.id))
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!toDelete,
			danger: true,
			title: t("notes.deleteTitle"),
			body: t("notes.deleteBody"),
			confirmLabel: t("common.delete"),
			loading: remove.isPending,
			onCancel: () => setToDelete(null),
			onConfirm: () => toDelete && remove.mutate(toDelete.id)
		})
	] });
}
function PracticeList({ assessments }) {
	const { t } = useI18n();
	const { user } = useAuth();
	const navigate = useNavigate();
	const toast = useToast();
	const [starting, setStarting] = (0, import_react.useState)(null);
	if (assessments.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "muted",
		children: t("practice.none")
	});
	const start = async (a) => {
		setStarting(a.id);
		try {
			const attempt = await api(`/api/assessments/${a.id}/attempts`, { method: "POST" });
			navigate(`/attempts/${attempt.id}`);
		} catch (e) {
			toast.error(errorMessage(e, t));
		} finally {
			setStarting(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "stack",
		style: {
			listStyle: "none",
			padding: 0
		},
		children: assessments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "card card--flat",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row row--between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: { margin: 0 },
						children: a.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: a.mode === "Practice" ? "info" : "warning",
							children: t(`assessment.mode.${a.mode}`)
						}), a.isPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "accent",
							children: t("assessment.premium")
						}) : null]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small muted",
					style: { marginBlock: "var(--space-2)" },
					children: [
						t("assessment.summary", {
							n: a.questionCount,
							pass: a.passPercent
						}),
						" ",
						a.timeLimitMinutes ? t("assessment.timeLimit", { m: a.timeLimitMinutes }) : t("assessment.untimed"),
						" ",
						a.maxAttempts ? t("assessment.maxAttempts", { n: a.maxAttempts }) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					children: t(`assessment.scoring.${a.multiSelectScoring}`)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NegativeMarkingDisclosure, {
					assessmentId: a.id,
					rate: a.negativeMarkingPerWrong
				}),
				user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					loading: starting === a.id,
					onClick: () => void start(a),
					children: t("assessment.start")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					size: "sm",
					to: `/login?next=${encodeURIComponent(window.location.pathname)}`,
					children: t("assessment.loginToStart")
				})
			]
		}, a.id))
	});
}
function LessonWorkspace({ course, view }) {
	const { t } = useI18n();
	const { user } = useAuth();
	const player = (0, import_react.useRef)(null);
	const [tab, setTab] = (0, import_react.useState)("overview");
	const lessonId = view.lesson.id;
	const isAuthor = useIsCourseAuthor(course.id);
	const save = useProgressSaver(lessonId, !!user, player);
	useTrackEvent("lesson_view", course.id, lessonId);
	const flat = course.modules.flatMap((m) => m.lessons);
	const idx = flat.findIndex((l) => l.id === lessonId);
	const prev = idx > 0 ? flat[idx - 1] : void 0;
	const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : void 0;
	const [params] = useSearchParams();
	const fromLink = Number(params.get("t"));
	const resume = Number.isFinite(fromLink) && fromLink > 0 ? fromLink : view.lesson.positionSeconds ?? flat[idx]?.positionSeconds ?? 0;
	(0, import_react.useEffect)(() => {
		const p = player.current;
		return () => {
			const time = p?.getCurrentTime() ?? 0;
			if (time > 0) save(time);
		};
	}, [save]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		view.youtubeVideoId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouTubePlayer, {
			ref: player,
			videoId: view.youtubeVideoId,
			title: view.lesson.title,
			startSeconds: resume,
			onPause: (s) => save(s),
			onEnded: (s) => save(s, true)
		}, view.youtubeVideoId) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "player-error",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("player.noVideo") })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "row row--between",
			style: { marginBlock: "var(--space-4)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title",
				style: { fontSize: "var(--text-xl)" },
				children: view.lesson.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageInstructorButton, {
						courseId: course.id,
						enrolled: !!course.enrolled
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportIssueButton, {
						courseId: course.id,
						lessonId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportContentButton, {
						targetType: "Lesson",
						targetId: lessonId
					}),
					prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						variant: "secondary",
						size: "sm",
						to: `/learn/${course.slug}/${prev.id}`,
						children: t("learn.previous")
					}) : null,
					next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						size: "sm",
						to: `/learn/${course.slug}/${next.id}`,
						children: t("learn.next")
					}) : null
				]
			})]
		}),
		resume > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small muted",
			children: t("learn.resumed", { time: formatTimestamp(resume) })
		}) : null,
		!next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompletionAwardClaim, {
			courseId: course.id,
			enrolled: !!course.enrolled
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
			label: t("learn.tabsLabel"),
			value: tab,
			onChange: setTab,
			tabs: [
				{
					id: "overview",
					label: t("learn.overview"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "prose",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("learn.objective") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: view.lesson.objective || t("course.notSpecified") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "small muted",
								children: [
									t("course.duration"),
									": ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duration, { seconds: view.lesson.durationSeconds })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("learn.telemetryNote")
							})
						]
					})
				},
				{
					id: "notes",
					label: t("learn.studyNotes"),
					content: view.notesMarkdown?.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { source: view.notesMarkdown }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("learn.noNotes")
					})
				},
				{
					id: "premium",
					label: t("learn.premiumNotes"),
					content: view.premiumLocked || view.premiumNotesMarkdown === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "locked",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("learn.premiumLockedTitle") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("learn.premiumLockedBody") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
								to: `/courses/${course.slug}`,
								children: t("learn.seePackages")
							})
						]
					}) : view.premiumNotesMarkdown.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { source: view.premiumNotesMarkdown }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("learn.noPremiumNotes")
					})
				},
				{
					id: "mine",
					label: t("learn.myNotes"),
					content: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyNotes, {
						lessonId,
						player
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "locked",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("learn.loginForNotes") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: `/login?next=${encodeURIComponent(`/learn/${course.slug}/${lessonId}`)}`,
							children: t("nav.login")
						})]
					})
				},
				{
					id: "practice",
					label: t("learn.practice"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeList, { assessments: view.assessments })
				},
				{
					id: "bookmarks",
					label: t("workspace.bookmarks.tab"),
					content: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarksPanel, {
						lessonId,
						player
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("workspace.bookmarks.login")
					})
				},
				{
					id: "tutor",
					label: t("workspace.tutor.tab"),
					content: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorPanel, {
						courseId: course.id,
						courseSlug: course.slug,
						lessonId,
						player
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("workspace.tutor.login")
					})
				},
				{
					id: "aiPractice",
					label: t("workspace.practice.tab"),
					content: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiPracticePanel, {
						courseId: course.id,
						lessonId
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("workspace.tutor.login")
					})
				},
				{
					id: "resources",
					label: t("resources.tab"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonResources, {
						lessonId,
						courseSlug: course.slug
					})
				},
				{
					id: "transcript",
					label: t("transcript.title"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranscriptPanel, {
						lessonId,
						player
					})
				},
				{
					id: "qa",
					label: t("qa.tab"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscussionsPanel, {
						courseId: course.id,
						lessonId,
						basePath: `/courses/${course.slug}`,
						canPost: !!user && (!!course.enrolled || isAuthor),
						notAllowedReason: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnrollToPost, {
							courseId: course.id,
							slug: course.slug
						})
					})
				},
				{
					id: "announcements",
					label: t("announcements.title"),
					content: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementsList, { courseId: course.id }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("announcements.enrollToSee")
					})
				}
			]
		})
	] });
}
function LearnPage() {
	const { slug = "", lessonId } = useParams();
	const { t, fmtNumber } = useI18n();
	const course = useLearnCourse(slug);
	const lesson = useLesson(lessonId);
	usePageMeta(lesson.data?.lesson.title ?? course.data?.title ?? t("learn.title"));
	if (course.data && !lessonId) {
		const first = course.data.lastLessonId ?? course.data.modules.flatMap((m) => m.lessons)[0]?.id;
		if (first) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: `/learn/${slug}/${first}`,
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: course,
			children: (c) => {
				const total = c.modules.reduce((n, m) => n + m.lessons.length, 0);
				const done = c.modules.reduce((n, m) => n + m.lessons.filter((l) => l.completed).length, 0);
				if (total === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "page",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: t("learn.noLessons"),
						action: {
							label: t("courses.title"),
							to: "/courses"
						}
					})
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "workspace",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "workspace__sidebar",
						"aria-label": t("learn.curriculum"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/courses/${c.slug}`,
								children: c.title
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								style: { paddingInline: "var(--space-2)" },
								children: t("learn.completedOf", {
									done: fmtNumber(done),
									total: fmtNumber(total)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								"aria-label": t("learn.curriculum"),
								children: c.modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lesson-nav__module",
									children: m.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "lesson-nav",
									children: m.lessons.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: `/learn/${c.slug}/${l.id}`,
										"aria-current": l.id === lessonId ? "page" : void 0,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [l.completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											"aria-label": t("learn.completed"),
											title: t("learn.completed"),
											children: ["✓", " "]
										}) : null, l.title] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "muted small",
											children: l.durationSeconds ? formatTimestamp(l.durationSeconds) : ""
										})]
									}) }, l.id))
								})] }, m.id))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						"aria-label": t("learn.lesson"),
						children: lessonId && lesson.error instanceof ApiError && lesson.error.status === 451 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeldLessonNotice, {}) : lessonId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
							query: lesson,
							children: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonWorkspace, {
								course: c,
								view: v
							})
						}) : null
					})]
				});
			}
		})
	});
}
//#endregion
export { LearnPage };

//# sourceMappingURL=LearnPage-Bg5FjsiG.js.map