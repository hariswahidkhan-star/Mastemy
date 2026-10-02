import { _ as require_react, a as Link, b as __toESM, h as useParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, n as ButtonLink, r as ApiError, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, i as Pagination, l as errorMessage, n as Notice, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import "./EmptyState-DxiM9uz0.js";
import { a as useCourse, n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { i as formatBytes, m as w2keys, t as ISSUE_CATEGORIES } from "./wave2-rI7jjNgp.js";
import { a as Textarea, i as Select, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { n as formatTimestamp } from "./format-B7uvlQ7u.js";
import { n as Dialog } from "./Dialog-CcENtYyA.js";
import { o as ReportContentButton } from "./Trust-B2S3OlzB.js";
//#region src/pages/engagement/LessonExtras.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function AnnouncementsList({ courseId }) {
	const { t, fmtDate } = useI18n();
	const [page, setPage] = (0, import_react.useState)(1);
	const list = useQuery({
		queryKey: [...w2keys.announcements(courseId), page],
		queryFn: () => api(`/api/courses/${courseId}/announcements${qs({
			page,
			pageSize: 10
		})}`),
		retry: false
	});
	if (list.isError && list.error instanceof ApiError && list.error.status === 403) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "muted",
		children: t("announcements.enrollToSee")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: list,
		children: (data) => data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted",
			children: t("announcements.none")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "stack",
			style: {
				listStyle: "none",
				padding: 0
			},
			children: data.items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card card--flat",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: { margin: 0 },
						children: a.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "small muted",
						style: { marginBlock: "var(--space-1)" },
						children: [
							a.authorName,
							" · ",
							fmtDate(a.createdAt)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pre-wrap",
						style: { margin: 0 },
						children: a.body
					})
				]
			}, a.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
			page: data.page,
			pageSize: data.pageSize,
			total: data.total,
			onPage: setPage
		})] })
	});
}
/** /courses/:slug/announcements (target of announcement notifications). */
function CourseAnnouncementsPage() {
	const { slug = "" } = useParams();
	const { t } = useI18n();
	const course = useCourse(slug);
	usePageMeta(t("announcements.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: course,
			children: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": t("common.breadcrumb"),
					className: "small muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/courses/${c.slug}`,
							children: c.title
						}),
						" / ",
						t("announcements.title")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: t("announcements.title"),
					subtitle: c.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementsList, { courseId: c.id })
			] })
		})
	});
}
function LessonResources({ lessonId, courseSlug }) {
	const { t, lang } = useI18n();
	const toast = useToast();
	const [busy, setBusy] = (0, import_react.useState)(null);
	const list = useQuery({
		queryKey: w2keys.lessonResources(lessonId),
		queryFn: () => api(`/api/learn/lessons/${lessonId}/resources`)
	});
	const download = (r) => {
		setBusy(r.id);
		downloadFile(r.downloadUrl ?? `/api/learn/resources/${r.id}/download`, r.fileName).catch((e) => {
			if (e instanceof ApiError && e.is("premium_required")) toast.error(t("resources.premiumRequired"));
			else toast.error(errorMessage(e, t));
		}).finally(() => setBusy(null));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: list,
		children: (items) => {
			const files = items.filter((r) => r.kind !== "Caption");
			if (files.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("resources.none")
			});
			const anyLocked = files.some((r) => r.locked);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "resource-list",
					children: files.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "resource-item",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.fileName }),
								" ",
								r.isPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "accent",
									children: t("resources.premium")
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "small muted",
									children: [
										formatBytes(r.sizeBytes, lang),
										" · ",
										t("resources.version", { n: r.version })
									]
								})
							] }),
							r.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "🔒 "
								}), t("resources.locked")]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								loading: busy === r.id,
								onClick: () => download(r),
								"aria-label": t("resources.downloadNamed", { name: r.fileName }),
								children: t("resources.download")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportContentButton, {
								targetType: "Resource",
								targetId: r.id
							})
						]
					}, r.id))
				}), anyLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
					tone: "info",
					title: t("resources.lockedTitle"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { marginBlockStart: 0 },
						children: t("resources.lockedBody")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						size: "sm",
						to: `/courses/${courseSlug}`,
						children: t("learn.seePackages")
					})]
				}) : null]
			});
		}
	});
}
function parseTime(s) {
	const m = /^(?:(\d+):)?(\d{1,2}):(\d{2})[.,](\d{1,3})$/.exec(s.trim());
	if (!m) return null;
	const [, h, mm, ss, ms] = m;
	return Number(h ?? 0) * 3600 + Number(mm) * 60 + Number(ss) + Number(ms.padEnd(3, "0")) / 1e3;
}
/** Minimal WebVTT cue parser (the API converts SRT to VTT). Tags are stripped; text stays plain. */
function parseVtt(vtt) {
	const cues = [];
	const blocks = vtt.replace(/\r\n?/g, "\n").split(/\n{2,}/);
	for (const block of blocks) {
		const lines = block.split("\n").filter((l) => l.length > 0);
		const idx = lines.findIndex((l) => l.includes("-->"));
		if (idx < 0) continue;
		const [a, rest] = lines[idx].split("-->");
		const start = parseTime(a);
		const end = parseTime((rest ?? "").trim().split(/\s+/)[0] ?? "");
		if (start === null || end === null) continue;
		const text = lines.slice(idx + 1).join(" ").replace(/<[^>]*>/g, "").trim();
		if (text) cues.push({
			start,
			end,
			text
		});
	}
	return cues;
}
function TranscriptPanel({ lessonId, player }) {
	const { t } = useI18n();
	const tracks = useQuery({
		queryKey: w2keys.captions(lessonId),
		queryFn: () => api(`/api/learn/lessons/${lessonId}/captions`)
	});
	const [chosen, setChosen] = (0, import_react.useState)(null);
	const track = tracks.data?.find((c) => c.id === chosen) ?? tracks.data?.[0];
	const vtt = useQuery({
		queryKey: [
			"learn",
			"vtt",
			track?.id,
			track?.version
		],
		queryFn: () => api(`/api/learn/captions/${track.id}/vtt`, { headers: { Accept: "text/vtt" } }),
		enabled: !!track
	});
	const cues = (0, import_react.useMemo)(() => vtt.data ? parseVtt(String(vtt.data)) : [], [vtt.data]);
	const [q, setQ] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const matches = useQuery({
		queryKey: [
			"learn",
			"transcript",
			lessonId,
			search,
			track?.language
		],
		queryFn: () => api(`/api/learn/lessons/${lessonId}/transcript${qs({
			q: search,
			language: track?.language
		})}`),
		enabled: search.length >= 2
	});
	const seek = (s) => player.current?.seekTo(s);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: tracks,
		children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted",
			children: t("transcript.none")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stack",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [list.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("transcript.language"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: track?.id ?? "",
						onChange: (e) => setChosen(e.target.value),
						options: list.map((c) => ({
							value: c.id,
							label: c.language
						}))
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("transcript.languageIs", { lang: track?.language ?? "" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					role: "search",
					className: "row grow",
					onSubmit: (e) => {
						e.preventDefault();
						setSearch(q.trim());
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("transcript.search"),
						hint: t("transcript.searchHint"),
						className: "grow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "search",
							value: q,
							minLength: 2,
							maxLength: 200,
							onChange: (e) => {
								setQ(e.target.value);
								if (!e.target.value.trim()) setSearch("");
							}
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "secondary",
						disabled: q.trim().length < 2,
						children: t("courses.searchButton")
					})]
				})]
			}), search.length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: matches,
				children: (m) => m.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("transcript.noMatches")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "cue-list",
					"aria-label": t("transcript.results"),
					children: m.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "cue",
						onClick: () => seek(c.startSeconds),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							children: formatTimestamp(c.startSeconds)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.text })]
					}) }, `${c.captionId}-${c.startSeconds}-${i}`))
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: vtt,
				children: () => cues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("transcript.empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "cue-list",
					"aria-label": t("transcript.title"),
					children: cues.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "cue",
						onClick: () => seek(c.start),
						"aria-label": t("transcript.seek", {
							time: formatTimestamp(c.start),
							text: c.text
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							children: formatTimestamp(c.start)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.text })]
					}) }, `${c.start}-${i}`))
				})
			})]
		})
	});
}
function ReportIssueButton({ courseId, lessonId }) {
	const { t } = useI18n();
	const { user } = useAuth();
	const toast = useToast();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("ContentError");
	const [body, setBody] = (0, import_react.useState)("");
	const [invalid, setInvalid] = (0, import_react.useState)(false);
	const send = useApiMutation(() => api(`/api/courses/${courseId}/issues`, {
		method: "POST",
		body: {
			lessonId: lessonId ?? null,
			category,
			body: body.trim()
		}
	}), [], () => {
		setOpen(false);
		setBody("");
		toast.success(t("issues.sent"));
	});
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "ghost",
		onClick: () => setOpen(true),
		children: t("issues.report")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		title: t("issues.report"),
		onClose: () => setOpen(false),
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: () => setOpen(false),
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			loading: send.isPending,
			onClick: () => {
				if (body.trim().length < 5) {
					setInvalid(true);
					return;
				}
				setInvalid(false);
				send.mutate(void 0);
			},
			children: t("issues.send")
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				children: t("issues.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("issues.category"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: category,
					onChange: (e) => setCategory(e.target.value),
					options: ISSUE_CATEGORIES.map((c) => ({
						value: c,
						label: t(`issues.cat.${c}`)
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("issues.body"),
				required: true,
				error: invalid ? t("issues.bodyTooShort") : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: body,
					onChange: (e) => setBody(e.target.value),
					maxLength: 2e3
				})
			}),
			send.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(send.error, t)
			}) : null
		]
	})] });
}
//#endregion
export { TranscriptPanel as a, ReportIssueButton as i, CourseAnnouncementsPage as n, parseVtt as o, LessonResources as r, AnnouncementsList as t };

//# sourceMappingURL=LessonExtras-CUwuIFd4.js.map