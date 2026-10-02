import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { a as apiFetch, i as api, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { f as extractGuid, i as fmtDateTime, o as ASSIST_KINDS, r as WsError, t as AiGate, y as wsKeys } from "./common-BCMvJ35x.js";
import { a as QueryState, n as Notice, o as QueryStatus, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { n as formatTimestamp } from "./format-B7uvlQ7u.js";
import { t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { t as Markdown } from "./Markdown-pkfpt1OJ.js";
import { i as StatTile } from "./Charts-DY-b3wT1.js";
//#region src/lib/sse.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Incremental text/event-stream parser (WHATWG rules that matter here: `event:` / `data:` fields, multi-line data
* joined by "\n", blank line dispatches, CRLF tolerated, comments ignored). Feed chunks, get complete events back.
*/
var SseParser = class {
	buffer = "";
	event = "";
	data = [];
	push(chunk) {
		this.buffer += chunk;
		const out = [];
		let nl;
		while ((nl = this.buffer.search(/\r\n|\n|\r/)) >= 0) {
			const line = this.buffer.slice(0, nl);
			const sepLen = this.buffer.startsWith("\r\n", nl) ? 2 : 1;
			this.buffer = this.buffer.slice(nl + sepLen);
			if (line === "") {
				if (this.data.length > 0) out.push({
					event: this.event || "message",
					data: this.data.join("\n")
				});
				this.event = "";
				this.data = [];
				continue;
			}
			if (line.startsWith(":")) continue;
			const colon = line.indexOf(":");
			const field = colon < 0 ? line : line.slice(0, colon);
			let value = colon < 0 ? "" : line.slice(colon + 1);
			if (value.startsWith(" ")) value = value.slice(1);
			if (field === "event") this.event = value;
			else if (field === "data") this.data.push(value);
		}
		return out;
	}
};
/**
* POSTs JSON and reads the streamed SSE reply with fetch + ReadableStream (EventSource cannot POST or send a
* bearer token). Errors before the stream opens surface as ApiError (problem+json) from apiFetch.
*/
async function postSse(path, body, onEvent, signal) {
	const res = await apiFetch(path, {
		method: "POST",
		body,
		headers: { Accept: "text/event-stream" },
		signal
	});
	const parser = new SseParser();
	if (!res.body) {
		parser.push(await res.text()).forEach(onEvent);
		parser.push("\n\n").forEach(onEvent);
		return;
	}
	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		parser.push(decoder.decode(value, { stream: true })).forEach(onEvent);
	}
	parser.push(decoder.decode() + "\n\n").forEach(onEvent);
}
//#endregion
//#region src/pages/workspace/AiPanels.tsx
var import_jsx_runtime = require_jsx_runtime();
var MAX_MESSAGE = 2e3;
/** Folds one tutor SSE event into the in-progress assistant message. `done.content` replaces streamed text. */
function applyTutorEvent(msg, event, data) {
	let parsed;
	try {
		parsed = JSON.parse(data);
	} catch {
		return { msg };
	}
	if (event === "delta") return { msg: {
		...msg,
		content: msg.content + (parsed.text ?? "")
	} };
	if (event === "citations") return { msg: {
		...msg,
		citations: parsed
	} };
	if (event === "done") {
		const d = parsed;
		return {
			msg: {
				...msg,
				content: d.content,
				citations: d.citations ?? [],
				outcome: d.outcome,
				streaming: false
			},
			done: true
		};
	}
	if (event === "error") {
		const e = parsed;
		return {
			msg: {
				...msg,
				streaming: false
			},
			error: e.code ?? e.message ?? "error"
		};
	}
	return { msg };
}
function Citations({ citations, courseSlug, lessonId, player }) {
	const { t } = useI18n();
	if (citations.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "ws-cites",
		"aria-label": t("workspace.tutor.sources"),
		children: citations.map((c, i) => {
			const time = c.startSeconds != null ? ` · ${formatTimestamp(c.startSeconds)}` : "";
			const text = `[${i + 1}] ${c.lessonTitle}${c.section ? ` · ${c.section}` : ""}${time}`;
			if (c.lessonId === lessonId && c.startSeconds != null && player) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: () => player.current?.seekTo(c.startSeconds ?? 0),
				children: text
			}) }, c.chunkId);
			const href = `/learn/${courseSlug}/${c.lessonId}${c.startSeconds != null ? `?t=${c.startSeconds}` : ""}`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "btn btn--secondary btn--sm",
				to: href,
				children: text
			}) }, c.chunkId);
		})
	});
}
function TutorPanel({ courseId, courseSlug, lessonId, player }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TutorInner, {
		courseId,
		courseSlug,
		lessonId,
		player
	}) });
}
function TutorInner({ courseId, courseSlug, lessonId, player }) {
	const { t, lang } = useI18n();
	const qc = useQueryClient();
	const toast = useToast();
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [live, setLive] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [streamError, setStreamError] = (0, import_react.useState)(null);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const abort = (0, import_react.useRef)(null);
	const [baseIds, setBaseIds] = (0, import_react.useState)(null);
	const convs = useQuery({
		queryKey: wsKeys.conversations(courseId),
		queryFn: () => api(`/api/ai/tutor/conversations?courseId=${encodeURIComponent(courseId)}`)
	});
	const detail = useQuery({
		queryKey: wsKeys.conversation(activeId ?? ""),
		queryFn: () => api(`/api/ai/tutor/conversations/${activeId}`),
		enabled: !!activeId
	});
	const del = useApiMutation((id) => api(`/api/ai/tutor/conversations/${id}`, { method: "DELETE" }), [wsKeys.conversations(courseId)], (_r, id) => {
		if (id === activeId) {
			setActiveId(null);
			setLive([]);
		}
		setToDelete(null);
		toast.success(t("workspace.tutor.deleted"));
	});
	const send = async () => {
		const content = draft.trim();
		if (!content || busy) return;
		setBusy(true);
		setError(null);
		setStreamError(null);
		try {
			let id = activeId;
			if (!id) {
				id = (await api("/api/ai/tutor/conversations", {
					method: "POST",
					body: {
						courseId,
						title: content.slice(0, 80)
					}
				})).id;
				setActiveId(id);
				qc.invalidateQueries({ queryKey: wsKeys.conversations(courseId) });
			}
			setBaseIds(new Set((detail.data?.messages ?? []).map((m) => m.id)));
			const stamp = Date.now();
			let reply = {
				key: `a${stamp}`,
				role: "assistant",
				content: "",
				citations: [],
				streaming: true
			};
			setLive([{
				key: `u${stamp}`,
				role: "user",
				content,
				citations: []
			}, reply]);
			setDraft("");
			abort.current = new AbortController();
			await postSse(`/api/ai/tutor/conversations/${id}/messages`, { content }, (m) => {
				const r = applyTutorEvent(reply, m.event, m.data);
				reply = r.msg;
				if (r.error) setStreamError(r.error);
				setLive((prev) => [prev[0], reply]);
			}, abort.current.signal);
			await qc.invalidateQueries({ queryKey: wsKeys.conversation(id) });
			qc.invalidateQueries({ queryKey: wsKeys.conversations(courseId) });
			setLive([]);
		} catch (e) {
			setError(e);
			setLive((prev) => prev.filter((m) => m.role === "user"));
		} finally {
			setBusy(false);
		}
	};
	const messages = [...(detail.data?.messages ?? []).filter((m) => live.length === 0 || !baseIds || baseIds.has(m.id)).map((m) => ({
		key: m.id,
		role: m.role,
		content: m.content,
		citations: m.citations,
		outcome: m.outcome
	})), ...live];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("workspace.tutor.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: detail }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: convs }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("workspace.tutor.conversation"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: activeId ?? "",
							onChange: (e) => {
								setActiveId(e.target.value || null);
								setLive([]);
							},
							placeholder: t("workspace.tutor.newConversation"),
							options: (convs.data ?? []).map((c) => ({
								value: c.id,
								label: `${c.title} · ${fmtDateTime(c.lastMessageAt, lang)}`
							}))
						})
					}),
					activeId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setToDelete(convs.data?.find((c) => c.id === activeId) ?? null),
						children: t("workspace.tutor.delete")
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ws-chat",
				"aria-live": "polite",
				"aria-busy": busy,
				children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("workspace.tutor.empty")
				}) : messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: m.role === "user" ? "ws-msg ws-msg--user" : "ws-msg",
					"data-testid": m.role === "user" ? "tutor-user" : "tutor-reply",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "small muted",
							children: [m.role === "user" ? t("workspace.tutor.you") : t("workspace.tutor.assistant"), m.outcome === "not_covered" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "warning",
								children: t("workspace.tutor.notCovered")
							})] }) : null]
						}),
						m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pre-wrap",
							style: { margin: 0 },
							children: m.content
						}) : m.streaming && !m.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							style: { margin: 0 },
							children: t("workspace.tutor.thinking")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { source: m.content }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Citations, {
							citations: m.citations,
							courseSlug,
							lessonId,
							player
						})
					]
				}, m.key))
			}),
			streamError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: t(`workspace.errors.${streamError}`) === `workspace.errors.${streamError}` ? t("workspace.tutor.streamFailed") : t(`workspace.errors.${streamError}`)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					send();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("workspace.tutor.ask"),
					hint: t("workspace.tutor.askHint", { n: MAX_MESSAGE - draft.length }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						value: draft,
						maxLength: MAX_MESSAGE,
						onChange: (e) => setDraft(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: busy,
					disabled: !draft.trim(),
					children: t("workspace.tutor.send")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!toDelete,
				danger: true,
				title: t("workspace.tutor.delete"),
				body: t("workspace.tutor.deleteBody", { title: toDelete?.title ?? "" }),
				confirmLabel: t("common.delete"),
				loading: del.isPending,
				onCancel: () => setToDelete(null),
				onConfirm: () => toDelete && del.mutate(toDelete.id)
			})
		]
	});
}
function AiPracticePanel({ courseId, lessonId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiPracticeInner, {
		courseId,
		lessonId
	}) });
}
function AiPracticeInner({ courseId, lessonId }) {
	const { t } = useI18n();
	const [count, setCount] = (0, import_react.useState)("3");
	const [set, setSet] = (0, import_react.useState)(null);
	const gen = useApiMutation(() => api("/api/ai/practice", {
		method: "POST",
		body: {
			courseId,
			lessonId,
			count: Number(count)
		}
	}), [], (r) => setSet(r));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				title: t("workspace.practice.label"),
				children: t("workspace.practice.disclaimer")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					gen.mutate(void 0);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("workspace.practice.count"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: count,
						onChange: (e) => setCount(e.target.value),
						options: [
							"1",
							"2",
							"3",
							"4",
							"5"
						].map((v) => ({
							value: v,
							label: v
						}))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: gen.isPending,
					children: t("workspace.practice.generate")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: gen.error }),
			set ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "warning",
					children: t("workspace.practice.label")
				}), set.questions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeQuestion, {
					setId: set.id,
					q
				}, `${set.id}-${q.index}`))]
			}) : null
		]
	});
}
function PracticeQuestion({ setId, q }) {
	const { t } = useI18n();
	const [selected, setSelected] = (0, import_react.useState)([]);
	const check = useApiMutation(() => api(`/api/ai/practice/${setId}/check`, {
		method: "POST",
		body: {
			questionIndex: q.index,
			selected
		}
	}));
	const r = check.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "card card--flat",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [
				q.index + 1,
				". ",
				q.stem
			] }),
			q.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "row small",
				style: { display: "flex" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: q.multipleSelect ? "checkbox" : "radio",
					name: `p-${setId}-${q.index}`,
					checked: selected.includes(o.index),
					onChange: (e) => setSelected((s) => q.multipleSelect ? e.target.checked ? [...s, o.index] : s.filter((x) => x !== o.index) : [o.index])
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [o.text, r ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "muted",
					children: [r.correctIndexes.includes(o.index) ? ` ✓ ${t("workspace.practice.correctOption")}` : "", r.rationales[o.index] ? ` — ${r.rationales[o.index]}` : ""]
				}) : null] })]
			}, o.index)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				disabled: selected.length === 0,
				loading: check.isPending,
				onClick: () => check.mutate(void 0),
				children: t("workspace.practice.check")
			}),
			r ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				tone: r.correct ? "success" : "warning",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.correct ? t("workspace.practice.right") : t("workspace.practice.wrong") }),
					" ",
					r.explanation
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: check.error })
		]
	});
}
function AiAssistPanel({ courseId, lessonId, onInsert }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "card card--flat",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("workspace.assist.title") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AiGate, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistInner, {
			courseId,
			lessonId,
			onInsert
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(McqDraftPanel, {
			courseId,
			lessonId
		})] })]
	});
}
function AssistInner({ courseId, lessonId, onInsert }) {
	const { t, lang } = useI18n();
	const toast = useToast();
	const [kind, setKind] = (0, import_react.useState)("LessonNotes");
	const [input, setInput] = (0, import_react.useState)("");
	const run = useApiMutation(() => api(`/api/ai/studio/courses/${courseId}/assist`, {
		method: "POST",
		body: {
			kind,
			lessonId,
			input: input.trim() || null,
			language: lang
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		style: { marginBlockStart: "var(--space-3)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("workspace.assist.help")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.assist.kind"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: kind,
					onChange: (e) => setKind(e.target.value),
					options: ASSIST_KINDS.map((k) => ({
						value: k,
						label: t(`workspace.assist.kinds.${k}`)
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.assist.input"),
				hint: t("workspace.assist.inputHint"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 4,
					value: input,
					onChange: (e) => setInput(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				loading: run.isPending,
				onClick: () => run.mutate(void 0),
				children: t("workspace.assist.generate")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: run.error }),
			run.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "warning",
						children: t("workspace.assist.review")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "ws-pre",
						"aria-label": t("workspace.assist.draft"),
						children: run.data.draft
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "row",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								onInsert(run.data.draft);
								toast.success(t("workspace.assist.inserted"));
							},
							children: t("workspace.assist.insert")
						})
					})
				]
			}) : null
		]
	});
}
function McqDraftPanel({ courseId, lessonId }) {
	const { t, lang } = useI18n();
	const [count, setCount] = (0, import_react.useState)("3");
	const [source, setSource] = (0, import_react.useState)("");
	const run = useApiMutation(() => api(`/api/ai/studio/courses/${courseId}/mcq-drafts`, {
		method: "POST",
		body: {
			lessonId,
			count: Number(count),
			sourceText: source.trim() || null,
			language: lang
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		style: { marginBlockStart: "var(--space-4)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("workspace.mcq.title") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("workspace.mcq.help")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.mcq.count"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: count,
					onChange: (e) => setCount(e.target.value),
					options: Array.from({ length: 10 }, (_, i) => String(i + 1)).map((v) => ({
						value: v,
						label: v
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.mcq.source"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 3,
					value: source,
					onChange: (e) => setSource(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				loading: run.isPending,
				onClick: () => run.mutate(void 0),
				children: t("workspace.mcq.generate")
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: run.error }),
			run.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				tone: "success",
				title: t("workspace.mcq.created", { n: run.data.createdQuestionIds.length }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { marginBlockStart: 0 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/studio/courses/${courseId}?tab=questions`,
							children: t("workspace.mcq.openBank")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "small",
						children: run.data.createdQuestionIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "mono",
							children: id
						}, id))
					}),
					run.data.rejected.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("workspace.mcq.rejected", { n: run.data.rejected.length }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "small",
						children: run.data.rejected.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: r }, i))
					})] }) : null
				]
			}) : null
		]
	});
}
function thisMonth() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}
function AdminAiUsagePage() {
	const { t, fmtNumber, fmtMoney } = useI18n();
	usePageMeta(t("workspace.aiAdmin.title"), void 0, { noindex: true });
	const [period, setPeriod] = (0, import_react.useState)(thisMonth());
	const [course, setCourse] = (0, import_react.useState)("");
	const toast = useToast();
	const usage = useQuery({
		queryKey: wsKeys.aiAdminUsage(period),
		queryFn: () => api(`/api/admin/ai/usage?period=${encodeURIComponent(period)}`),
		enabled: /^\d{4}-\d{2}$/.test(period)
	});
	const reindex = useApiMutation((id) => api(`/api/admin/ai/courses/${id}/reindex`, { method: "POST" }), [], () => toast.success(t("workspace.aiAdmin.reindexed")));
	const table = (title, rows) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "muted",
		children: t("workspace.charts.noData")
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "table-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("workspace.aiAdmin.key")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("workspace.aiAdmin.input")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("workspace.aiAdmin.output")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("workspace.aiAdmin.calls")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("workspace.aiAdmin.cost")
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "mono",
					children: r.key
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtNumber(r.inputTokens) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtNumber(r.outputTokens) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtNumber(r.calls) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(r.costEstimate, "USD") })
			] }, r.key)) })]
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("workspace.aiAdmin.title") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiStatusNote, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: t("workspace.aiAdmin.period"),
			hint: "yyyy-MM",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "month",
				value: period,
				onChange: (e) => setPeriod(e.target.value)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: usage,
			children: (u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ws-stats",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.aiAdmin.totalTokens"),
								value: fmtNumber(u.totalTokens)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.aiAdmin.totalCost"),
								value: fmtMoney(u.totalCost, "USD")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.aiAdmin.globalLimit"),
								value: fmtNumber(u.globalLimit),
								hint: u.globalLimit > 0 ? t("workspace.aiAdmin.usedPct", { n: Math.round(u.totalTokens / u.globalLimit * 100) }) : void 0
							})
						]
					}),
					table(t("workspace.aiAdmin.byFeature"), u.byFeature),
					table(t("workspace.aiAdmin.byModel"), u.byModel),
					table(t("workspace.aiAdmin.topUsers"), u.topUsers),
					table(t("workspace.aiAdmin.byOrg"), u.byOrganization)
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "row",
			onSubmit: (e) => {
				e.preventDefault();
				const id = extractGuid(course);
				if (id) reindex.mutate(id);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.aiAdmin.reindexCourse"),
				hint: t("workspace.aiAdmin.reindexHint"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: course,
					onChange: (e) => setCourse(e.target.value)
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				variant: "secondary",
				disabled: !extractGuid(course),
				loading: reindex.isPending,
				children: t("workspace.aiAdmin.reindex")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: reindex.error })
	] });
}
function AiStatusNote() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "success",
		children: t("workspace.aiAdmin.enabled")
	}) });
}
//#endregion
export { applyTutorEvent as a, TutorPanel as i, AiAssistPanel as n, AiPracticePanel as r, AdminAiUsagePage as t };

//# sourceMappingURL=AiPanels-DtsIcotO.js.map