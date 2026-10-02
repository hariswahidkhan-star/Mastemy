import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, i as Pagination, l as errorMessage, n as Notice, o as QueryStatus, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as uploadFile, i as formatBytes, m as w2keys, o as useChannelInfo } from "./wave2-rI7jjNgp.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { i as splitLines, r as newIdempotencyKey } from "./format-B7uvlQ7u.js";
import { t as Duration } from "./Duration-C3eLHxwf.js";
import { t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { t as Markdown } from "./Markdown-pkfpt1OJ.js";
import { t as DiscussionsPanel } from "./Discussions-C23iLUpN.js";
//#region src/components/CourseDiffView.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Field names the API compares; anything else is shown verbatim. */
var DIFF_FIELDS = [
	"title",
	"subtitle",
	"description",
	"audience",
	"prerequisites",
	"outcomes",
	"language",
	"level",
	"credentialType",
	"passThresholdPercent",
	"promoVideoId",
	"categories",
	"moduleId",
	"objective",
	"sortOrder",
	"isPreview",
	"videoAssetId",
	"youtubeVideoId",
	"notesMarkdown",
	"premiumNotesMarkdown"
];
function fieldLabel(field, t) {
	return DIFF_FIELDS.includes(field) ? t(`diff.field.${field}`) : field;
}
function diffCounts(d) {
	return {
		course: d.courseFields.length,
		added: d.modulesAdded.length + d.lessonsAdded.length,
		removed: d.modulesRemoved.length + d.lessonsRemoved.length,
		changed: d.modulesChanged.length + d.lessonsChanged.length
	};
}
function Value({ v }) {
	const { t } = useI18n();
	if (v === null || v === "") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
		className: "muted",
		children: t("diff.empty")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "pre-wrap",
		children: v
	});
}
function FieldChanges({ changes }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: "diff-fields",
		children: changes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "diff-field",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: fieldLabel(c.field, t) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "diff-before",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "diff-tag",
						children: t("diff.before")
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { v: c.before })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "diff-after",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "diff-tag",
						children: t("diff.after")
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { v: c.after })
				]
			})] })]
		}, c.field))
	});
}
function Group({ title, children, count }) {
	if (count === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "diff-group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
			title,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: count })
		] }), children]
	});
}
function ChangedList({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "stack",
		style: {
			listStyle: "none",
			padding: 0
		},
		children: items.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "card card--flat",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: e.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldChanges, { changes: e.changes })]
		}, e.id))
	});
}
/** Readable rendering of the structured working-copy vs published-snapshot diff. */
function CourseDiffView({ diff }) {
	const { t } = useI18n();
	const counts = diffCounts(diff);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack diff",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: diff.baseVersion === null ? t("diff.neverPublished") : t("diff.againstVersion", { v: diff.baseVersion })
			}),
			!diff.hasChanges ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "success",
				children: t("diff.noChanges")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "info",
						children: t("diff.countCourse", { n: counts.course })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "success",
						children: t("diff.countAdded", { n: counts.added })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "danger",
						children: t("diff.countRemoved", { n: counts.removed })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "warning",
						children: t("diff.countChanged", { n: counts.changed })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: t("diff.courseFields"),
				count: diff.courseFields.length,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldChanges, { changes: diff.courseFields })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: t("diff.modulesAdded"),
				count: diff.modulesAdded.length,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "diff-added",
					children: diff.modulesAdded.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: m.title }, m.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: t("diff.modulesRemoved"),
				count: diff.modulesRemoved.length,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "diff-removed",
					children: diff.modulesRemoved.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: m.title }, m.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: t("diff.modulesChanged"),
				count: diff.modulesChanged.length,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangedList, { items: diff.modulesChanged })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: t("diff.lessonsAdded"),
				count: diff.lessonsAdded.length,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "diff-added",
					children: diff.lessonsAdded.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l.title }, l.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: t("diff.lessonsRemoved"),
				count: diff.lessonsRemoved.length,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "diff-removed",
					children: diff.lessonsRemoved.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: l.title }, l.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: t("diff.lessonsChanged"),
				count: diff.lessonsChanged.length,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangedList, { items: diff.lessonsChanged })
			})
		]
	});
}
//#endregion
//#region src/lib/resourceErrors.ts
/** Problem codes returned by resource uploads, in the order they are checked. */
var RESOURCE_ERROR_CODES = [
	"video_not_allowed",
	"archive_not_allowed",
	"file_type_not_allowed",
	"file_content_mismatch",
	"duplicate_resource",
	"file_too_large",
	"quota_exceeded",
	"course_not_editable",
	"invalid_language",
	"invalid_caption_file",
	"captions_must_be_free",
	"multipart_required",
	"file_required"
];
/**
* Maps a resource upload/replace failure to a clear, translated message. `video_not_allowed` explains that
* videos belong on YouTube; unknown failures fall back to the generic problem text.
*/
function resourceUploadMessage(error, t, limits) {
	if (error instanceof ApiError) {
		const code = RESOURCE_ERROR_CODES.find((c) => error.is(c));
		if (code === "file_too_large" && limits?.maxFileBytes) return t("resources.err.file_too_large_max", { max: formatBytes(limits.maxFileBytes, limits.lang) });
		if (code) return t(`resources.err.${code}`);
		if (error.status === 415) return t("resources.err.file_type_not_allowed");
		if (error.status === 413) return t("resources.err.file_too_large");
	}
	return errorMessage(error, t);
}
//#endregion
//#region src/pages/studio/Wave2Panels.tsx
var EDITABLE = [
	"Draft",
	"ChangesRequested",
	"Updating"
];
function lessonOptions(course) {
	return course.modules.flatMap((m) => m.lessons.map((l) => ({
		value: l.id,
		label: `${m.title} › ${l.title}`
	})));
}
function UsageBar({ usage }) {
	const { t, lang } = useI18n();
	const pct = usage.quotaBytes > 0 ? Math.min(100, usage.usedBytes / usage.quotaBytes * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: pct >= 90 ? "meter meter--warn" : "meter",
		role: "progressbar",
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": Math.round(pct),
		"aria-label": t("resources.quota"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { inlineSize: `${pct}%` } })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "small muted",
		children: t("resources.usage", {
			used: formatBytes(usage.usedBytes, lang),
			quota: formatBytes(usage.quotaBytes, lang),
			max: formatBytes(usage.maxFileBytes, lang)
		})
	})] });
}
function ProgressLine({ fraction }) {
	const { t } = useI18n();
	if (fraction === null) return null;
	const pct = Math.round(fraction * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "meter",
		role: "progressbar",
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": pct,
		"aria-label": t("resources.uploading"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { inlineSize: `${pct}%` } })
	});
}
function ResourceRow({ r, editable, lessonTitle, maxFileBytes, onChanged }) {
	const { t, lang, fmtDate } = useI18n();
	const toast = useToast();
	const fileRef = (0, import_react.useRef)(null);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [problem, setProblem] = (0, import_react.useState)(null);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const premium = useApiMutation((isPremium) => api(`/api/studio/resources/${r.id}`, {
		method: "PATCH",
		body: { isPremium }
	}), [], () => onChanged());
	const remove = useApiMutation(() => api(`/api/studio/resources/${r.id}`, { method: "DELETE" }), [], () => {
		setConfirm(false);
		toast.success(t("resources.deleted"));
		onChanged();
	});
	const replace = async (file) => {
		setProblem(null);
		setProgress(0);
		try {
			await uploadFile(`/api/studio/resources/${r.id}/file`, file, {
				method: "PUT",
				onProgress: setProgress
			});
			toast.success(t("resources.replaced"));
			onChanged();
		} catch (e) {
			setProblem(resourceUploadMessage(e, t, {
				maxFileBytes,
				lang
			}));
		} finally {
			setProgress(null);
			if (fileRef.current) fileRef.current.value = "";
		}
	};
	const caption = r.kind === "Caption";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.fileName }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "small muted",
				children: [
					formatBytes(r.sizeBytes, lang),
					" · v",
					r.version,
					" · ",
					fmtDate(r.createdAt)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressLine, { fraction: progress }),
			problem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "field__error",
				role: "alert",
				children: problem
			}) : null
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "info",
			children: t("resources.captionLang", { lang: r.language })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("resources.kindResource") }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: lessonTitle }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "small muted",
			children: t("resources.captionsFree")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
			label: t("resources.premium"),
			checked: r.isPremium,
			disabled: !editable || premium.isPending,
			onChange: (e) => premium.mutate(e.target.checked)
		}), premium.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "field__error",
			role: "alert",
			children: errorMessage(premium.error, t)
		}) : null] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					className: "visually-hidden",
					"aria-label": t("resources.replaceNamed", { name: r.fileName }),
					onChange: (e) => {
						const f = e.target.files?.[0];
						if (f) replace(f);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					loading: progress !== null,
					onClick: () => fileRef.current?.click(),
					children: t("resources.replace")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => setConfirm(true),
					children: t("common.delete")
				})
			]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: confirm,
			danger: true,
			title: t("resources.deleteTitle"),
			body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("resources.deleteBody", { name: r.fileName }) }), remove.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(remove.error, t)
			}) : null] }),
			confirmLabel: t("common.delete"),
			loading: remove.isPending,
			onCancel: () => setConfirm(false),
			onConfirm: () => remove.mutate(void 0)
		})] })
	] });
}
function ResourcesManager({ course }) {
	const { t, lang } = useI18n();
	const toast = useToast();
	const editable = EDITABLE.includes(course.status);
	const list = useQuery({
		queryKey: w2keys.studioResources(course.id),
		queryFn: () => api(`/api/studio/courses/${course.id}/resources`)
	});
	const usage = useQuery({
		queryKey: w2keys.resourceUsage(course.id),
		queryFn: () => api(`/api/studio/courses/${course.id}/resources/usage`)
	});
	const lessons = lessonOptions(course);
	const [kind, setKind] = (0, import_react.useState)("Resource");
	const [lessonId, setLessonId] = (0, import_react.useState)("");
	const [language, setLanguage] = (0, import_react.useState)(course.language || "en");
	const [isPremium, setIsPremium] = (0, import_react.useState)(false);
	const [file, setFile] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [problem, setProblem] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("");
	const fileRef = (0, import_react.useRef)(null);
	const refresh = () => {
		list.refetch();
		usage.refetch();
	};
	const upload = async () => {
		if (!file) return;
		if (kind === "Caption" && !lessonId) {
			setProblem(t("resources.captionNeedsLesson"));
			return;
		}
		setProblem(null);
		setProgress(0);
		try {
			await uploadFile(`/api/studio/courses/${course.id}/resources${qs({
				lessonId: lessonId || void 0,
				kind,
				language: kind === "Caption" ? language : void 0,
				isPremium: kind === "Caption" ? false : isPremium
			})}`, file, { onProgress: setProgress });
			toast.success(t("resources.uploaded", { name: file.name }));
			setFile(null);
			if (fileRef.current) fileRef.current.value = "";
			refresh();
		} catch (e) {
			setProblem(resourceUploadMessage(e, t, {
				maxFileBytes: usage.data?.maxFileBytes,
				lang
			}));
		} finally {
			setProgress(null);
		}
	};
	const lessonTitle = (id) => id ? lessons.find((l) => l.value === id)?.label ?? t("resources.unknownLesson") : t("resources.wholeCourse");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("resources.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: usage }),
			usage.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageBar, { usage: usage.data }) : null,
			!editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("resources.notEditable")
			}) : null,
			editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card card--flat",
				onSubmit: (e) => {
					e.preventDefault();
					upload();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("resources.uploadTitle") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "split",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("resources.kind"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: kind,
								onChange: (e) => setKind(e.target.value),
								options: [{
									value: "Resource",
									label: t("resources.kindResource")
								}, {
									value: "Caption",
									label: t("resources.kindCaption")
								}]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("resources.lesson"),
							required: kind === "Caption",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: lessonId,
								onChange: (e) => setLessonId(e.target.value),
								placeholder: t("resources.wholeCourse"),
								options: lessons
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("resources.file"),
							hint: kind === "Caption" ? t("resources.captionHint") : t("resources.fileHint"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								ref: fileRef,
								type: "file",
								accept: kind === "Caption" ? ".vtt,.srt" : ".pdf,.docx,.pptx,.xlsx,.csv,.txt,.md,.png,.jpg,.jpeg,.webp",
								onChange: (e) => setFile(e.target.files?.[0] ?? null)
							})
						}), kind === "Caption" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("resources.language"),
							hint: t("resources.languageHint"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: language,
								onChange: (e) => setLanguage(e.target.value),
								maxLength: 35
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							label: t("resources.premiumUpload"),
							hint: t("resources.premiumHint"),
							checked: isPremium,
							onChange: (e) => setIsPremium(e.target.checked)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressLine, { fraction: progress }),
					problem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						title: t("resources.uploadFailed"),
						children: problem
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !file,
						loading: progress !== null,
						children: t("resources.upload")
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("resources.filter"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: filter,
					onChange: (e) => setFilter(e.target.value),
					placeholder: t("resources.filterAll"),
					options: [{
						value: "course",
						label: t("resources.wholeCourse")
					}, ...lessons]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => {
					const shown = items.filter((r) => !filter ? true : filter === "course" ? !r.lessonId : r.lessonId === filter);
					return shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("resources.noneStudio") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("resources.file")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("resources.kind")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("resources.lesson")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("resources.access")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("common.actions")
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: shown.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceRow, {
								r,
								editable,
								lessonTitle: lessonTitle(r.lessonId),
								maxFileBytes: usage.data?.maxFileBytes,
								onChanged: refresh
							}, `${r.id}-${r.version}`)) })]
						})
					});
				}
			})
		]
	});
}
function AnnouncementsComposer({ course }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const live = course.status === "Published" || course.status === "Updating";
	const [idemKey, setIdemKey] = (0, import_react.useState)(() => newIdempotencyKey());
	const list = useQuery({
		queryKey: [...w2keys.announcements(course.id), page],
		queryFn: () => api(`/api/courses/${course.id}/announcements${qs({
			page,
			pageSize: 10
		})}`)
	});
	const post = useApiMutation(() => api(`/api/studio/courses/${course.id}/announcements`, {
		method: "POST",
		body: {
			title: title.trim(),
			body: body.trim()
		},
		headers: { "Idempotency-Key": idemKey }
	}), [w2keys.announcements(course.id)], (r) => {
		setTitle("");
		setBody("");
		setIdemKey(newIdempotencyKey());
		if (r.duplicate) toast.info(t("announcements.duplicate"));
		else toast.success(t("announcements.sent", { n: r.notifiedCount }));
	});
	const postError = post.error;
	const message = postError instanceof ApiError && postError.is("announcement_rate_limited") ? t("announcements.rateLimited") : postError instanceof ApiError && postError.is("course_not_live") ? t("announcements.notLive") : postError ? errorMessage(postError, t) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card card--flat",
				onSubmit: (e) => {
					e.preventDefault();
					if (title.trim().length >= 3 && body.trim()) post.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("announcements.compose") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("announcements.composeHint")
					}),
					!live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "info",
						children: t("announcements.notLive")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("announcements.titleLabel"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							maxLength: 200
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("announcements.bodyLabel"),
						hint: t("qa.plainText"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: body,
							onChange: (e) => setBody(e.target.value),
							maxLength: 5e3
						})
					}),
					message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: message
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: post.isPending,
						disabled: !live || title.trim().length < 3 || !body.trim(),
						children: t("announcements.send")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("announcements.sentList") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: a.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "small muted",
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
			})
		]
	});
}
function IssuesInbox({ course }) {
	const { t, fmtDate } = useI18n();
	const [page, setPage] = (0, import_react.useState)(1);
	const lessons = lessonOptions(course);
	const issues = useQuery({
		queryKey: [...w2keys.issues(course.id), page],
		queryFn: () => api(`/api/studio/courses/${course.id}/issues${qs({
			page,
			pageSize: 20
		})}`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: issues,
		children: (data) => data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: t("issues.none"),
			description: t("issues.noneBody")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "table-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("dashboard.date")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("issues.category")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("resources.lesson")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("issues.body")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("issues.reporter")
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(i.createdAt) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: i.category === "VideoUnavailable" ? "danger" : "warning",
						children: t(`issues.cat.${i.category}`)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: i.lessonId ? lessons.find((l) => l.value === i.lessonId)?.label ?? "—" : t("resources.wholeCourse") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "pre-wrap",
						children: i.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: i.reporterName || "—" })
				] }, i.id)) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
			page: data.page,
			pageSize: data.pageSize,
			total: data.total,
			onPage: setPage
		})] })
	});
}
function QaInbox({ course }) {
	const { t } = useI18n();
	if (!(course.status === "Published" || course.status === "Updating")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "muted",
		children: t("qa.inboxNotLive")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscussionsPanel, {
		courseId: course.id,
		basePath: `/courses/${course.slug}`,
		canPost: false,
		initialResolved: "unresolved",
		hideForm: true
	});
}
function EngagementPanel({ course }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "eng-ann",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "eng-ann",
					children: t("announcements.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementsComposer, { course })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "eng-qa",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "eng-qa",
					children: t("qa.inbox")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QaInbox, { course })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "eng-issues",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "eng-issues",
					children: t("issues.inbox")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssuesInbox, { course })]
			})
		]
	});
}
function PublishedPreview({ courseId }) {
	const { t, fmtDate } = useI18n();
	const preview = useQuery({
		queryKey: w2keys.publishedPreview(courseId),
		queryFn: () => api(`/api/studio/courses/${courseId}/published-preview`),
		retry: false
	});
	if (preview.isError && preview.error instanceof ApiError && preview.error.status === 404) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "muted",
		children: t("published.never")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: preview,
		children: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stack",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("published.version", {
					v: p.version,
					date: fmtDate(p.publishedAt)
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card card--flat",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: { marginBlockStart: 0 },
						children: p.payload.title
					}),
					p.payload.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: p.payload.subtitle
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`level.${p.payload.level}`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`language.${p.payload.language}`) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pre-wrap",
						children: p.payload.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t("course.outcomes") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: splitLines(p.payload.outcomes).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: o }, o)) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t("course.curriculum") }),
					[...p.payload.modules].sort((a, b) => a.sortOrder - b.sortOrder).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
						m.code,
						" · ",
						m.title
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: [...m.lessons].sort((a, b) => a.sortOrder - b.sortOrder).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: l.title }),
						" ",
						l.isPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "accent",
							children: t("course.preview")
						}) : null,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "small muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duration, { seconds: l.durationSeconds }), l.youtubeVideoId ? ` · ${l.youtubeVideoId}` : ` · ${t("published.noVideo")}`]
						}),
						l.notesMarkdown.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "small",
							children: t("learn.studyNotes")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { source: l.notesMarkdown })] }) : null
					] }, l.id)) })] }, m.id))
				]
			})]
		})
	});
}
function DiffPanel({ courseId }) {
	const diff = useQuery({
		queryKey: w2keys.diff(courseId),
		queryFn: () => api(`/api/review/courses/${courseId}/diff`),
		retry: false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: diff,
		children: (d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseDiffView, { diff: d })
	});
}
/** Channels the API lets this user publish to: authorized, and owned by them (or any, for staff). */
function publishableChannels(channels, userId, staff) {
	return channels.filter((c) => c.isActive && (staff || c.mode === "InstructorOwned" && !!userId && c.ownerUserId === userId));
}
function youtubeMessage(e, t) {
	if (e instanceof ApiError) {
		for (const code of [
			"channel_not_authorized",
			"youtube_scope_missing",
			"course_channel_missing",
			"youtube_quota_exhausted",
			"youtube_upstream_error",
			"invalid_thumbnail",
			"not_a_caption",
			"invalid_caption_language",
			"caption_course_mismatch",
			"resource_missing",
			"resource_integrity"
		]) if (e.is(code)) return {
			text: t(`youtube.err.${code}`),
			reconnect: code === "channel_not_authorized" || code === "youtube_scope_missing"
		};
	}
	return {
		text: errorMessage(e, t),
		reconnect: false
	};
}
function ReconnectHint({ mode }) {
	const { t } = useI18n();
	const toast = useToast();
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "small",
		children: t("youtube.reconnectHint")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "secondary",
		loading: busy,
		onClick: () => {
			setBusy(true);
			api(`/api/youtube/oauth/start${qs({ mode })}`).then((r) => window.location.assign(r.authorizationUrl)).catch((e) => {
				toast.error(errorMessage(e, t));
				setBusy(false);
			});
		},
		children: t("youtube.reconnect")
	})] });
}
function ResultNotice({ error, mode }) {
	const { t } = useI18n();
	if (!error) return null;
	const m = youtubeMessage(error, t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
		tone: "danger",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: { marginBlockStart: 0 },
			children: m.text
		}), m.reconnect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReconnectHint, { mode }) : null]
	});
}
function YouTubePublishing({ course }) {
	const { t } = useI18n();
	const { user, hasRole } = useAuth();
	const toast = useToast();
	const staff = hasRole("Admin", "SuperAdmin");
	const canUseChannels = hasRole("Instructor", "Admin", "SuperAdmin");
	const channels = useChannelInfo(canUseChannels);
	const resources = useQuery({
		queryKey: w2keys.studioResources(course.id),
		queryFn: () => api(`/api/studio/courses/${course.id}/resources`)
	});
	const [privacy, setPrivacy] = (0, import_react.useState)("unlisted");
	const [syncResult, setSyncResult] = (0, import_react.useState)(null);
	const sync = useApiMutation(() => api(`/api/studio/courses/${course.id}/youtube/playlist/sync`, {
		method: "POST",
		body: { privacyStatus: privacy }
	}), [], (r) => {
		setSyncResult(r);
		toast.success(t("youtube.synced"));
	});
	const [thumbError, setThumbError] = (0, import_react.useState)({});
	const [thumbBusy, setThumbBusy] = (0, import_react.useState)(null);
	const [captionChoice, setCaptionChoice] = (0, import_react.useState)({});
	const [captionError, setCaptionError] = (0, import_react.useState)({});
	const [captionBusy, setCaptionBusy] = (0, import_react.useState)(null);
	if (!canUseChannels) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "muted",
		children: t("youtube.noPublishableChannel")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: channels,
		children: (list) => {
			const usable = publishableChannels(list, user?.id, staff);
			if (usable.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("youtube.noPublishableChannel")
			});
			const usableIds = new Set(usable.map((c) => c.id));
			const mode = usable[0].mode;
			const ours = course.modules.flatMap((m) => m.lessons.flatMap((l) => l.video?.channelId ? [{
				lesson: l,
				video: l.video
			}] : [])).filter((v) => usableIds.has(v.video.channelId ?? ""));
			const captions = (resources.data ?? []).filter((r) => r.kind === "Caption");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("youtube.publishingIntro")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: resources }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("youtube.playlist") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: t("youtube.playlistHint")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("youtube.privacy"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										value: privacy,
										onChange: (e) => setPrivacy(e.target.value),
										options: [
											"unlisted",
											"private",
											"public"
										].map((p) => ({
											value: p,
											label: t(`youtube.privacyOpt.${p}`)
										}))
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									loading: sync.isPending,
									onClick: () => sync.mutate(void 0),
									children: t("youtube.syncPlaylist")
								})]
							}),
							syncResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
								tone: "success",
								children: t("youtube.syncResult", {
									n: syncResult.videoCount,
									inserted: syncResult.inserted,
									moved: syncResult.moved,
									removed: syncResult.removed,
									skipped: syncResult.skippedLessonIds.length
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultNotice, {
								error: sync.error,
								mode
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card card--flat",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("youtube.videos") }), ours.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: t("youtube.noOwnVideos")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "stack",
							style: {
								listStyle: "none",
								padding: 0
							},
							children: ours.map(({ lesson, video }) => {
								const lessonCaptions = captions.filter((c) => !c.lessonId || c.lessonId === lesson.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "stack",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: lesson.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "small muted",
											children: video.youTubeVideoId
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "row",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "btn btn--secondary btn--sm",
												children: [thumbBusy === video.id ? t("common.loading") : t("youtube.uploadThumbnail"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "file",
													accept: "image/jpeg,image/png",
													className: "visually-hidden",
													onChange: (e) => {
														const f = e.target.files?.[0];
														e.target.value = "";
														if (!f) return;
														setThumbBusy(video.id);
														setThumbError((m) => ({
															...m,
															[video.id]: null
														}));
														uploadFile(`/api/studio/videos/${video.id}/thumbnail`, f).then(() => toast.success(t("youtube.thumbnailSet"))).catch((err) => setThumbError((m) => ({
															...m,
															[video.id]: err
														}))).finally(() => setThumbBusy(null));
													}
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultNotice, {
											error: thumbError[video.id],
											mode
										}),
										lessonCaptions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "row",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: t("youtube.captionFile"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
													value: captionChoice[video.id] ?? "",
													placeholder: t("youtube.chooseCaption"),
													onChange: (e) => setCaptionChoice((m) => ({
														...m,
														[video.id]: e.target.value
													})),
													options: lessonCaptions.map((c) => ({
														value: c.id,
														label: `${c.fileName} (${c.language})`
													}))
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												disabled: !captionChoice[video.id],
												loading: captionBusy === video.id,
												onClick: () => {
													setCaptionBusy(video.id);
													setCaptionError((m) => ({
														...m,
														[video.id]: null
													}));
													api(`/api/studio/videos/${video.id}/captions`, {
														method: "POST",
														body: { resourceFileId: captionChoice[video.id] }
													}).then((r) => toast.success(t("youtube.captionPushed", { lang: r.language }))).catch((err) => setCaptionError((m) => ({
														...m,
														[video.id]: err
													}))).finally(() => setCaptionBusy(null));
												},
												children: t("youtube.pushCaption")
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "small muted",
											children: t("youtube.noCaptions")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultNotice, {
											error: captionError[video.id],
											mode
										})
									]
								}, lesson.id);
							})
						})]
					})
				]
			});
		}
	});
}
function PublicationPanel({ course }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "pub-diff",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "pub-diff",
					children: t("diff.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffPanel, { courseId: course.id })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "pub-prev",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "pub-prev",
						children: t("published.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublishedPreview, { courseId: course.id }),
					course.status === "Published" || course.status === "Updating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/courses/${course.slug}`,
							children: t("studio.viewPublic")
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "pub-yt",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "pub-yt",
					children: t("youtube.publishing")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouTubePublishing, { course })]
			})
		]
	});
}
//#endregion
export { ResourcesManager as i, EngagementPanel as n, PublicationPanel as r, DiffPanel as t };

//# sourceMappingURL=Wave2Panels-CUXfRSCA.js.map