import { _ as require_react, a as Link, b as __toESM, h as useParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { a as apiFetch, i as api, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, l as errorMessage, n as Notice, o as QueryStatus, r as PageHeader, s as StatusBadge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { d as useStudioCourse, i as useChannels, n as useApiMutation, t as keys } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as number, c as union, i as boolean, o as object, p as useForm, s as string, u } from "./zod-piP6K-Dk.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { t as Duration } from "./Duration-C3eLHxwf.js";
import { t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { t as Markdown } from "./Markdown-pkfpt1OJ.js";
import { t as Tabs } from "./Tabs-CKJGcPx4.js";
import { i as youtubeWatchUrl } from "./youtube-CfgiWCkO.js";
import { o as NotesEditor } from "./Authoring-nhnYtI7j.js";
//#region src/lib/upload.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var CHUNK_SIZE = 8388608;
var EDGE = 1048576;
function toHex(buf) {
	return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function readBlob(blob) {
	if (typeof blob.arrayBuffer === "function") return blob.arrayBuffer();
	return new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onload = () => resolve(r.result);
		r.onerror = () => reject(r.error);
		r.readAsArrayBuffer(blob);
	});
}
/**
* Identifies a local source file without reading all of it:
* SHA-256 over (first 1 MiB + last 1 MiB + decimal size). Used to verify the same file is re-selected on resume.
*/
async function fileFingerprint(file) {
	const head = await readBlob(file.slice(0, Math.min(EDGE, file.size)));
	const tail = await readBlob(file.slice(Math.max(0, file.size - EDGE), file.size));
	const size = new TextEncoder().encode(String(file.size));
	const joined = new Uint8Array(head.byteLength + tail.byteLength + size.byteLength);
	joined.set(new Uint8Array(head), 0);
	joined.set(new Uint8Array(tail), head.byteLength);
	joined.set(size, head.byteLength + tail.byteLength);
	return toHex(await crypto.subtle.digest("SHA-256", joined));
}
function contentRange(start, endExclusive, total) {
	return `bytes ${start}-${endExclusive - 1}/${total}`;
}
var wait = (ms) => new Promise((r) => setTimeout(r, ms));
/**
* Sends the file in sequential 8 MiB chunks starting at the server-confirmed offset.
* The server relays each chunk to YouTube; nothing is staged permanently. On transient failure the
* confirmed offset is re-read from the server before retrying.
*/
async function sendChunks(sessionId, file, startOffset, onProgress, signal) {
	let offset = startOffset;
	let last = null;
	let failures = 0;
	while (offset < file.size) {
		if (signal.aborted) throw new DOMException("Aborted", "AbortError");
		const end = Math.min(offset + CHUNK_SIZE, file.size);
		try {
			const text = await (await apiFetch(`/api/youtube/uploads/${sessionId}/chunk`, {
				method: "PUT",
				body: file.slice(offset, end),
				headers: {
					"Content-Range": contentRange(offset, end, file.size),
					"Content-Type": "application/octet-stream"
				},
				signal
			})).text();
			last = text ? JSON.parse(text) : last;
			offset = last && typeof last.confirmedOffset === "number" && last.confirmedOffset > offset ? last.confirmedOffset : end;
			failures = 0;
			onProgress({
				sent: offset,
				total: file.size
			});
		} catch (e) {
			if (signal.aborted) throw e;
			failures += 1;
			if (failures > 3) throw e;
			await wait(1e3 * 2 ** failures);
			const status = await api(`/api/youtube/uploads/${sessionId}`);
			offset = status.confirmedOffset;
			last = status;
		}
	}
	return last;
}
var STORE_KEY = "mastemy.uploads";
function rememberUpload(lessonId, u) {
	try {
		const all = JSON.parse(localStorage.getItem(STORE_KEY) ?? "{}");
		if (u) all[lessonId] = u;
		else delete all[lessonId];
		localStorage.setItem(STORE_KEY, JSON.stringify(all));
	} catch {}
}
function recallUpload(lessonId) {
	try {
		return JSON.parse(localStorage.getItem(STORE_KEY) ?? "{}")[lessonId] ?? null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/pages/studio/VideoPanels.tsx
var import_jsx_runtime = require_jsx_runtime();
function VideoStatusCard({ video, courseId }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const recheck = useApiMutation(() => api(`/api/studio/videos/${video.id}/recheck`, { method: "POST" }), [keys.studioCourse(courseId)], () => toast.success(t("video.rechecked")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card card--flat",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					style: { margin: 0 },
					children: video.title || video.youTubeVideoId
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: video.status })]
			}),
			video.statusReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: video.status === "Ready" ? "info" : "warning",
				title: t("video.statusReason"),
				children: video.statusReason
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "kv small",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("playlist.videoId") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mono",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: youtubeWatchUrl(video.youTubeVideoId),
							target: "_blank",
							rel: "noopener noreferrer",
							children: video.youTubeVideoId
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("course.duration") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duration, { seconds: video.durationSeconds }) }),
					video.privacyStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("video.privacy") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: video.privacyStatus })] }) : null,
					video.embeddable != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("video.embeddable") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: video.embeddable ? t("common.yes") : t("common.no") })] }) : null,
					video.lastCheckedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("video.lastChecked") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtDate(video.lastCheckedAt) })] }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				style: { marginBlockStart: "var(--space-3)" },
				loading: recheck.isPending,
				onClick: () => recheck.mutate(void 0),
				children: t("video.recheck")
			}),
			recheck.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(recheck.error, t)
			}) : null
		]
	});
}
function VideoLinkForm({ lesson, courseId }) {
	const { t } = useI18n();
	const toast = useToast();
	const channels = useChannels();
	const s = (0, import_react.useMemo)(() => object({
		url: string().trim().min(5, t("validation.youtubeUrl")),
		channelId: string().min(1, t("video.channelRequired")),
		rightsDeclared: boolean().refine((v) => v, t("video.rightsRequired")),
		title: string().trim().max(200).optional(),
		durationMinutes: union([string(), number()]).transform((v) => v === "" ? null : Number(v)).refine((v) => v === null || Number.isFinite(v) && v > 0, t("validation.positive"))
	}), [t]);
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: u(s),
		defaultValues: {
			url: "",
			channelId: "",
			rightsDeclared: false,
			title: "",
			durationMinutes: ""
		}
	});
	const rightsText = t("video.rightsText");
	const link = useApiMutation((v) => api(`/api/studio/lessons/${lesson.id}/video`, {
		method: "POST",
		body: {
			url: v.url,
			channelId: v.channelId,
			rightsDeclared: v.rightsDeclared,
			rightsDeclarationText: rightsText,
			title: v.title || void 0,
			durationSeconds: v.durationMinutes ? Math.round(v.durationMinutes * 60) : void 0
		}
	}), [keys.studioCourse(courseId)], (video) => toast.success(t("video.linked", { status: t(`status.${video.status}`) })));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit((v) => link.mutate(v)),
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("video.linkHelp")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("video.url"),
				hint: t("video.urlHint"),
				error: errors.url?.message,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "url",
					inputMode: "url",
					...register("url")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("video.channel"),
				hint: t("video.channelHint"),
				error: errors.channelId?.message,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					...register("channelId"),
					placeholder: t("video.chooseChannel"),
					options: (channels.data ?? []).map((c) => ({
						value: c.id,
						label: `${c.title} (${t(`channelMode.${c.mode}`)})`
					}))
				})
			}),
			channels.isSuccess && channels.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				children: t("video.noChannels")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				style: { marginBlockEnd: "var(--space-4)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: t("video.manualMetadata") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("video.manualHint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "split",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("video.manualTitle"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("title") })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("video.manualDuration"),
							error: errors.durationMinutes?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: "0",
								step: "0.1",
								...register("durationMinutes")
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: rightsText,
				error: errors.rightsDeclared?.message,
				...register("rightsDeclared")
			}),
			link.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(link.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				loading: link.isPending,
				children: lesson.video ? t("video.replace") : t("video.link")
			})
		]
	});
}
function UploadPanel({ lesson, courseId }) {
	const { t } = useI18n();
	const toast = useToast();
	const channels = useChannels();
	const stored = (0, import_react.useMemo)(() => recallUpload(lesson.id), [lesson.id]);
	const [phase, setPhase] = (0, import_react.useState)(stored ? "waiting" : "form");
	const [sessionId, setSessionId] = (0, import_react.useState)(stored?.sessionId ?? null);
	const [file, setFile] = (0, import_react.useState)(null);
	const [meta, setMeta] = (0, import_react.useState)({
		channelId: "",
		title: lesson.title,
		description: "",
		privacyStatus: "unlisted",
		notifySubscribers: false,
		syntheticMediaDisclosed: false
	});
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [confirmCancel, setConfirmCancel] = (0, import_react.useState)(false);
	const abortRef = (0, import_react.useRef)(null);
	const qc = useQueryClient();
	const status = useQuery({
		queryKey: ["upload", sessionId],
		queryFn: () => api(`/api/youtube/uploads/${sessionId}`),
		enabled: !!sessionId && phase === "waiting",
		refetchInterval: 15e3
	});
	(0, import_react.useEffect)(() => () => abortRef.current?.abort(), []);
	const create = async () => {
		if (!file) return;
		setError(null);
		setPhase("hashing");
		try {
			const fingerprint = await fileFingerprint(file);
			const session = await api("/api/youtube/uploads", {
				method: "POST",
				body: {
					...meta,
					lessonId: lesson.id,
					fileName: file.name,
					fileSize: file.size,
					fileFingerprint: fingerprint
				}
			});
			rememberUpload(lesson.id, {
				sessionId: session.id,
				fileName: file.name,
				fileSize: file.size,
				fingerprint
			});
			setSessionId(session.id);
			setPhase("waiting");
		} catch (e) {
			if (e instanceof ApiError && (e.is("uploads_disabled") || e.status === 403)) {
				setPhase("disabled");
				return;
			}
			setError(errorMessage(e, t));
			setPhase("form");
		}
	};
	const transfer = async () => {
		if (!file || !sessionId) return;
		setError(null);
		try {
			const fingerprint = await fileFingerprint(file);
			if (stored && (stored.fingerprint !== fingerprint || stored.fileSize !== file.size)) {
				setError(t("upload.wrongFile", { name: stored.fileName }));
				return;
			}
			const resumed = await api(`/api/youtube/uploads/${sessionId}/resume`, {
				method: "POST",
				body: { fileFingerprint: fingerprint }
			});
			setPhase("transferring");
			const controller = new AbortController();
			abortRef.current = controller;
			setProgress({
				sent: resumed.confirmedOffset,
				total: file.size
			});
			await sendChunks(sessionId, file, resumed.confirmedOffset, setProgress, controller.signal);
			rememberUpload(lesson.id, null);
			setPhase("done");
			qc.invalidateQueries({ queryKey: keys.studioCourse(courseId) });
			toast.success(t("upload.transferred"));
		} catch (e) {
			if (e instanceof DOMException && e.name === "AbortError") return;
			setError(errorMessage(e, t));
			setPhase("waiting");
		}
	};
	const cancel = async () => {
		abortRef.current?.abort();
		try {
			if (sessionId) await api(`/api/youtube/uploads/${sessionId}`, { method: "DELETE" });
		} catch (e) {
			toast.error(errorMessage(e, t));
		}
		rememberUpload(lesson.id, null);
		setSessionId(null);
		setProgress(null);
		setConfirmCancel(false);
		setPhase("form");
	};
	if (phase === "disabled") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "info",
		title: t("upload.disabledTitle"),
		children: t("upload.disabled")
	});
	const st = status.data?.status;
	const canTransfer = st === "Approved" || st === "AwaitingSourceFile" || st === "Uploading";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("upload.explain")
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: error
			}) : null,
			phase === "form" || phase === "hashing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					create();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("upload.file"),
						hint: t("upload.fileHint"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "file",
							accept: "video/*",
							onChange: (e) => setFile(e.target.files?.[0] ?? null)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("video.channel"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: meta.channelId,
							onChange: (e) => setMeta({
								...meta,
								channelId: e.target.value
							}),
							placeholder: t("video.chooseChannel"),
							options: (channels.data ?? []).map((c) => ({
								value: c.id,
								label: c.title
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("upload.ytTitle"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: meta.title,
							maxLength: 100,
							onChange: (e) => setMeta({
								...meta,
								title: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("upload.ytDescription"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: meta.description,
							maxLength: 5e3,
							onChange: (e) => setMeta({
								...meta,
								description: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("upload.privacy"),
						hint: t("upload.privacyHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: meta.privacyStatus,
							onChange: (e) => setMeta({
								...meta,
								privacyStatus: e.target.value
							}),
							options: [
								"unlisted",
								"public",
								"private"
							].map((p) => ({
								value: p,
								label: t(`upload.privacy_${p}`)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: t("upload.notify"),
						checked: meta.notifySubscribers,
						onChange: (e) => setMeta({
							...meta,
							notifySubscribers: e.target.checked
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: t("upload.synthetic"),
						hint: t("upload.syntheticHint"),
						checked: meta.syntheticMediaDisclosed,
						onChange: (e) => setMeta({
							...meta,
							syntheticMediaDisclosed: e.target.checked
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: phase === "hashing",
						disabled: !file || !meta.channelId || !meta.title.trim(),
						children: t("upload.request")
					})
				]
			}) : null,
			phase === "waiting" && sessionId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card card--flat",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						t("upload.session"),
						": ",
						st ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: st }) : t("common.loading")
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: status }),
					status.data?.failureReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: status.data.failureReason
					}) : null,
					st === "AwaitingApproval" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("upload.awaitingApproval")
					}) : null,
					st === "Expired" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("upload.expired")
					}) : null,
					canTransfer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small",
							children: stored ? t("upload.reselect", { name: stored.fileName }) : t("upload.selectToStart")
						}),
						!file ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("upload.file"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "file",
								accept: "video/*",
								onChange: (e) => setFile(e.target.files?.[0] ?? null)
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void transfer(),
							disabled: !file,
							children: st === "Uploading" ? t("upload.resume") : t("upload.start")
						})
					] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						style: { marginBlockStart: "var(--space-3)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => void status.refetch(),
							children: t("upload.refresh")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setConfirmCancel(true),
							children: t("upload.cancel")
						})]
					})
				]
			}) : null,
			phase === "transferring" && progress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card card--flat",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "up-prog",
						children: t("upload.transferring")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("progress", {
						id: "up-prog",
						className: "progress",
						max: progress.total,
						value: progress.sent
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("upload.percent", { n: Math.floor(progress.sent / Math.max(1, progress.total) * 100) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("upload.keepOpen")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: () => setConfirmCancel(true),
						children: t("upload.cancel")
					})
				]
			}) : null,
			phase === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "success",
				children: t("upload.doneBody")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmCancel,
				danger: true,
				title: t("upload.cancelTitle"),
				body: t("upload.cancelBody"),
				confirmLabel: t("upload.cancel"),
				onCancel: () => setConfirmCancel(false),
				onConfirm: () => void cancel()
			})
		]
	});
}
//#endregion
//#region src/pages/studio/LessonEditorPage.tsx
function MarkdownEditor({ label, value, onChange, hint }) {
	const { t } = useI18n();
	const [mode, setMode] = (0, import_react.useState)("write");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "field",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "field__label",
				children: label
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field__hint",
				children: hint
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				label,
				value: mode,
				onChange: setMode,
				tabs: [{
					id: "write",
					label: t("editor.write"),
					content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mono",
						rows: 14,
						"aria-label": label,
						value,
						onChange: (e) => onChange(e.target.value)
					})
				}, {
					id: "preview",
					label: t("editor.preview"),
					content: value.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { source: value }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("editor.nothing")
					})
				}]
			})
		]
	});
}
function LessonForm({ course, lesson }) {
	const { t } = useI18n();
	const toast = useToast();
	const [title, setTitle] = (0, import_react.useState)(lesson.title);
	const [objective, setObjective] = (0, import_react.useState)(lesson.objective);
	const [isPreview, setIsPreview] = (0, import_react.useState)(!!lesson.isPreview);
	const courseKey = keys.studioCourse(course.id);
	const saveLesson = useApiMutation(() => api(`/api/studio/lessons/${lesson.id}`, {
		method: "PUT",
		body: {
			title: title.trim(),
			objective: objective.trim(),
			isPreview
		}
	}), [courseKey], () => toast.success(t("common.saved")));
	const [tab, setTab] = (0, import_react.useState)("details");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
		label: t("editor.tabs"),
		value: tab,
		onChange: setTab,
		tabs: [
			{
				id: "details",
				label: t("editor.details"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						if (title.trim()) saveLesson.mutate(void 0);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("curriculum.lessonTitle"),
							required: true,
							error: title.trim() ? void 0 : t("validation.required"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: title,
								onChange: (e) => setTitle(e.target.value),
								maxLength: 200
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("learn.objective"),
							hint: t("editor.objectiveHint"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								value: objective,
								onChange: (e) => setObjective(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							label: t("editor.isPreview"),
							hint: t("editor.isPreviewHint"),
							checked: isPreview,
							onChange: (e) => setIsPreview(e.target.checked)
						}),
						saveLesson.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "danger",
							children: errorMessage(saveLesson.error, t)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							loading: saveLesson.isPending,
							children: t("common.save")
						})
					]
				})
			},
			{
				id: "notes",
				label: t("editor.notes"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesEditor, {
					lesson,
					courseId: course.id,
					Editor: MarkdownEditor
				})
			},
			{
				id: "video",
				label: t("editor.video"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stack",
					children: [lesson.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoStatusCard, {
						video: lesson.video,
						courseId: course.id
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						children: t("editor.noVideo")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoLinkForm, {
						lesson,
						courseId: course.id
					})]
				})
			},
			{
				id: "upload",
				label: t("editor.upload"),
				content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadPanel, {
					lesson,
					courseId: course.id
				})
			}
		]
	});
}
function LessonEditorPage() {
	const { id = "", lessonId = "" } = useParams();
	const { t } = useI18n();
	const course = useStudioCourse(id);
	const lesson = course.data?.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonId);
	usePageMeta(lesson?.title ?? t("editor.lesson"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: course,
		children: (c) => !lesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: t("editor.notFound"),
			action: {
				label: c.title,
				to: `/studio/courses/${c.id}?tab=curriculum`
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "small muted",
				"aria-label": t("common.breadcrumb"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						children: t("studio.courses")
					}),
					" /",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/studio/courses/${c.id}?tab=curriculum`,
						children: c.title
					}),
					" / ",
					lesson.title
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: lesson.title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonForm, {
				course: c,
				lesson
			}, lesson.id)
		] })
	});
}
//#endregion
export { LessonEditorPage };

//# sourceMappingURL=LessonEditorPage-auRWZmhq.js.map