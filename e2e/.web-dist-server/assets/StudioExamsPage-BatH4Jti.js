import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { a as apiFetch, f as qs, i as api, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, i as Pagination, n as Notice, o as QueryStatus, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { d as useStudioCourse, f as useStudioCourses, n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as Dialog, t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { r as toQuestionList } from "./questions--q6HlBNd.js";
import { t as Tabs } from "./Tabs-CKJGcPx4.js";
import { t as RichContent } from "./RichContent-C3Tst1Ll.js";
import { a as postForm, c as useCourseResources, i as fmtStat, m as useTemplates, p as useShared, r as examKeys, s as useCaseGroups } from "./exams-ZvNkLj9c.js";
import { t as examError } from "./examErrors-ngodnTsv.js";
import { t as RichEditor } from "./RichEditor-C8Ud_54o.js";
//#region src/pages/exams/StudioExamsPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var useStudioAssessments = (courseId) => useQuery({
	queryKey: [
		"exams",
		"studio-assessments",
		courseId
	],
	queryFn: () => api(`/api/studio/courses/${courseId}/assessments`).then((d) => Array.isArray(d) ? d : d.items)
});
var useCourseQuestions = (courseId) => useQuery({
	queryKey: [
		"studio",
		"questions",
		courseId,
		{
			state: "",
			q: ""
		}
	],
	queryFn: () => api(`/api/studio/courses/${courseId}/questions${qs({ pageSize: 200 })}`),
	select: toQuestionList,
	enabled: !!courseId
});
/** /studio/courses/:id/exams — wave 3 question bank tools for one course. */
function StudioExamsPage() {
	const { id = "" } = useParams();
	const { t } = useI18n();
	const course = useStudioCourse(id);
	const [params, setParams] = useSearchParams();
	const tab = params.get("tab") ?? "cases";
	usePageMeta(t("exams.studio.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "stack",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: course,
			children: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("exams.studio.title"),
				subtitle: c.title,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: `/studio/courses/${c.id}?tab=questions`,
					children: t("exams.studio.back")
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				label: t("exams.studio.tabs"),
				value: tab,
				onChange: (v) => setParams({ tab: v }, { replace: true }),
				tabs: [
					{
						id: "cases",
						label: t("exams.tab.cases"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseGroupManager, { course: c })
					},
					{
						id: "import",
						label: t("exams.tab.import"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XlsxImport, { course: c })
					},
					{
						id: "reuse",
						label: t("exams.tab.reuse"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReusePanel, { course: c })
					},
					{
						id: "analytics",
						label: t("exams.tab.analytics"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsPanel, { course: c })
					},
					{
						id: "challenges",
						label: t("exams.tab.challenges"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseChallenges, { course: c })
					},
					{
						id: "policy",
						label: t("exams.tab.policy"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyPanel, { course: c })
					},
					{
						id: "certificate",
						label: t("exams.tab.certificate"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCertificateTemplate, { course: c })
					}
				]
			})] })
		})
	});
}
function CaseGroupForm({ course, initial, onDone }) {
	const { t } = useI18n();
	const toast = useToast();
	const [title, setTitle] = (0, import_react.useState)(initial?.title ?? "");
	const [exhibit, setExhibit] = (0, import_react.useState)(initial?.exhibitMarkdown ?? "");
	const [resourceIds, setResourceIds] = (0, import_react.useState)(initial?.resourceIds ?? []);
	const attachable = (useCourseResources(course.id).data ?? []).filter((r) => !r.isPremium);
	const save = useApiMutation(() => {
		const body = {
			title: title.trim(),
			exhibitMarkdown: exhibit,
			resourceIds
		};
		return initial ? api(`/api/studio/case-groups/${initial.id}`, {
			method: "PUT",
			body
		}) : api(`/api/studio/courses/${course.id}/case-groups`, {
			method: "POST",
			body
		});
	}, [examKeys.caseGroups(course.id)], () => {
		toast.success(t("exams.cases.saved"));
		onDone();
	});
	const titleError = title.trim().length === 0 ? t("validation.required") : title.length > 200 ? t("exams.cases.titleMax") : void 0;
	const [touched, setTouched] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		noValidate: true,
		onSubmit: (e) => {
			e.preventDefault();
			setTouched(true);
			if (titleError || !exhibit.trim()) return;
			save.mutate(void 0);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("exams.cases.caseTitle"),
				error: touched ? titleError : void 0,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: title,
					maxLength: 200,
					onChange: (e) => setTitle(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichEditor, {
				label: t("exams.cases.exhibit"),
				value: exhibit,
				onChange: setExhibit,
				courseId: course.id,
				rows: 8,
				required: true,
				error: touched && !exhibit.trim() ? t("validation.required") : void 0,
				hint: t("exams.editor.hint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "stack",
				style: {
					border: "none",
					padding: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "field__label",
					children: t("exams.cases.attachments")
				}), attachable.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("exams.cases.noResources")
				}) : attachable.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					label: r.fileName,
					checked: resourceIds.includes(r.id),
					onChange: (e) => setResourceIds((ids) => e.target.checked ? [...ids, r.id] : ids.filter((x) => x !== r.id))
				}, r.id))]
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
					children: t("common.save")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: onDone,
					children: t("common.cancel")
				})]
			})
		]
	});
}
function CaseGroupManager({ course }) {
	const { t } = useI18n();
	const toast = useToast();
	const groups = useCaseGroups(course.id);
	const questions = useCourseQuestions(course.id);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const remove = useApiMutation((g) => api(`/api/studio/case-groups/${g.id}`, { method: "DELETE" }), [examKeys.caseGroups(course.id)], () => {
		setDeleting(null);
		toast.success(t("exams.cases.deleted"));
	});
	const byId = new Map((questions.data ?? []).map((q) => [q.id, q]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("exams.cases.intro")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setEditing("new"),
					children: t("exams.cases.new")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: groups,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("exams.cases.none"),
					description: t("exams.cases.noneBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card stack",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									style: { margin: 0 },
									children: g.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => setEditing(g),
										children: t("common.edit")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => setDeleting(g),
										children: t("common.remove")
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: t("exams.cases.showExhibit") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, { source: g.exhibitMarkdown })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "small",
								children: [
									t("exams.cases.members", { n: g.questionIds.length }),
									" ",
									g.questionIds.map((qid, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
										i + 1,
										". ",
										byId.get(qid)?.externalId ?? qid.slice(0, 8)
									] }, qid))
								]
							})
						]
					}, g.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("exams.cases.howToAdd")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: editing !== null,
				wide: true,
				title: editing === "new" ? t("exams.cases.new") : t("exams.cases.edit"),
				onClose: () => setEditing(null),
				children: editing !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseGroupForm, {
					course,
					initial: editing === "new" ? null : editing,
					onDone: () => setEditing(null)
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: deleting !== null,
				title: t("exams.cases.deleteTitle"),
				confirmLabel: t("common.remove"),
				loading: remove.isPending,
				onCancel: () => setDeleting(null),
				onConfirm: () => deleting && remove.mutate(deleting, { onError: (e) => {
					setDeleting(null);
					toast.error(examError(e, t));
				} }),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("exams.cases.deleteBody", { title: deleting?.title ?? "" }) })
			})
		]
	});
}
/** Required canonical columns not yet mapped by any header. */
function missingRequired(inspect, mapping) {
	const mapped = new Set(Object.values(mapping).filter(Boolean));
	return inspect.requiredColumns.filter((c) => !mapped.has(c));
}
/** Canonical columns mapped by more than one header. */
function duplicateTargets(mapping) {
	const seen = /* @__PURE__ */ new Map();
	for (const v of Object.values(mapping)) if (v) seen.set(v, (seen.get(v) ?? 0) + 1);
	return [...seen.entries()].filter(([, n]) => n > 1).map(([k]) => k);
}
function newKey() {
	try {
		return crypto.randomUUID();
	} catch {
		return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
	}
}
function XlsxImport({ course }) {
	const { t } = useI18n();
	const toast = useToast();
	const [file, setFile] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)("create");
	const [state, setState] = (0, import_react.useState)({ step: "upload" });
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [polling, setPolling] = (0, import_react.useState)(null);
	const [downloading, setDownloading] = (0, import_react.useState)(null);
	const status = useQuery({
		queryKey: [
			"exams",
			"import-status",
			course.id,
			polling
		],
		queryFn: () => api(`/api/studio/courses/${course.id}/questions/import/${polling}`),
		enabled: !!polling,
		refetchInterval: (q) => q.state.data && ["Committed", "Failed"].includes(q.state.data.status) ? false : 1500
	});
	(0, import_react.useEffect)(() => {
		const s = status.data;
		if (s && ["Committed", "Failed"].includes(s.status)) {
			setState({
				step: "done",
				status: s
			});
			setPolling(null);
		}
	}, [status.data]);
	const run = async (fn) => {
		setBusy(true);
		setError(null);
		try {
			await fn();
		} catch (e) {
			setError(e);
		} finally {
			setBusy(false);
		}
	};
	const inspect = () => run(async () => {
		if (!file) return;
		const form = new FormData();
		form.append("file", file);
		const { body } = await postForm(`/api/studio/courses/${course.id}/questions/import/inspect`, form);
		const mapping = {};
		for (const h of body.headers) mapping[h] = body.suggestedMapping[h] ?? "";
		setState({
			step: "map",
			inspect: body,
			mapping
		});
	});
	const preview = (mapping) => run(async () => {
		if (!file) return;
		const form = new FormData();
		form.append("file", file);
		form.append("mode", mode);
		form.append("idempotencyKey", newKey());
		form.append("mapping", JSON.stringify(mapping));
		const { body } = await postForm(`/api/studio/courses/${course.id}/questions/import/preview`, form);
		setState({
			step: "preview",
			preview: body
		});
	});
	const commit = (batchId) => run(async () => {
		const res = await apiFetch(`/api/studio/courses/${course.id}/questions/import/${batchId}/commit`, { method: "POST" });
		const body = await res.json();
		if (res.status === 202 || body.status === "Queued" || body.status === "Processing") {
			setPolling(batchId);
			toast.info(t("exams.import.queued"));
		} else {
			setState({
				step: "done",
				status: body
			});
			toast.success(t("exams.import.committed", { n: body.created + body.updated }));
		}
	});
	const download = (path, name) => {
		setDownloading(path);
		downloadFile(path, name).catch((e) => toast.error(examError(e, t))).finally(() => setDownloading(null));
	};
	const reset = () => {
		setState({ step: "upload" });
		setError(null);
		setPolling(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					loading: downloading === "template",
					onClick: () => download("/api/templates/mcq-import.xlsx", "mcq-import.xlsx"),
					children: t("exams.import.template")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					loading: downloading === "export",
					onClick: () => download(`/api/studio/courses/${course.id}/questions/export.xlsx`, `questions-${course.slug}.xlsx`),
					children: t("exams.import.exportXlsx")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				title: t("exams.import.rulesTitle"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("exams.import.ruleFirstSheet") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("exams.import.ruleFormula") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("exams.import.ruleImage") }),
					course.code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("exams.import.courseCode", { code: course.code }) }) : null
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "row small",
				"aria-label": t("exams.import.steps"),
				children: [
					"upload",
					"map",
					"preview",
					"done"
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					"aria-current": state.step === s ? "step" : void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: state.step === s ? "info" : "neutral",
						children: [
							i + 1,
							". ",
							t(`exams.import.step.${s}`)
						]
					})
				}, s))
			}),
			state.step === "upload" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card stack",
				onSubmit: (e) => {
					e.preventDefault();
					inspect();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.import.file"),
						hint: t("exams.import.fileHint"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "file",
							accept: ".xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv",
							onChange: (e) => setFile(e.target.files?.[0] ?? null)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.import.mode"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: mode,
							onChange: (e) => setMode(e.target.value === "update" ? "update" : "create"),
							options: [{
								value: "create",
								label: t("exams.import.modeCreate")
							}, {
								value: "update",
								label: t("exams.import.modeUpdate")
							}]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: busy,
						disabled: !file,
						children: t("exams.import.inspect")
					}) })
				]
			}) : null,
			state.step === "map" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MappingStep, {
				inspect: state.inspect,
				mapping: state.mapping,
				onChange: (mapping) => setState({
					...state,
					mapping
				}),
				busy,
				onBack: reset,
				onPreview: () => void preview(state.mapping)
			}) : null,
			state.step === "preview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card stack",
				"aria-labelledby": "imp-prev-h",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "imp-prev-h",
						children: t("exams.import.previewTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("exams.import.previewCounts", {
						ok: state.preview.validCount,
						bad: state.preview.errorCount
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.import.row")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("question.externalId")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.import.result")
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: state.preview.rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.row }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "mono",
									children: r.externalId
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "success",
									children: t("exams.import.ok")
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "small",
									style: { margin: 0 },
									children: r.errors.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: e }, e))
								}) })
							] }, r.row)) })]
						})
					}),
					state.preview.errorCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						children: t("exams.import.fixErrors")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							loading: busy || !!polling,
							disabled: state.preview.errorCount > 0 || state.preview.validCount === 0,
							onClick: () => void commit(state.preview.batchId),
							children: t("exams.import.commit", { n: state.preview.validCount })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: reset,
							children: t("exams.import.restart")
						})]
					}),
					polling ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"aria-live": "polite",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("exams.import.progress", { status: status.data ? t(`exams.import.status.${status.data.status}`) : "…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("progress", { "aria-label": t("exams.import.progressLabel") })]
					}) : null
				]
			}) : null,
			state.step === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card stack",
				"aria-live": "polite",
				children: [state.status.status === "Committed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "success",
					title: t("exams.import.doneTitle"),
					children: t("exams.import.doneBody", {
						created: state.status.created,
						updated: state.status.updated
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					title: t("exams.import.failedTitle"),
					children: state.status.error ?? t("exams.import.failedBody")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: reset,
					children: t("exams.import.another")
				}) })]
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: examError(error, t)
			}) : null
		]
	});
}
function MappingStep({ inspect, mapping, onChange, onPreview, onBack, busy }) {
	const { t } = useI18n();
	const missing = missingRequired(inspect, mapping);
	const dups = duplicateTargets(mapping);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card stack",
		"aria-labelledby": "map-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				id: "map-h",
				children: t("exams.import.mapTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				children: t("exams.import.mapIntro", {
					format: inspect.format.toUpperCase(),
					n: inspect.rowCount
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mapping-grid",
				children: inspect.headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.import.mapHeader", { header: h || "—" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: mapping[h] ?? "",
						onChange: (e) => onChange({
							...mapping,
							[h]: e.target.value
						}),
						placeholder: t("exams.import.ignore"),
						options: inspect.columns.map((c) => ({
							value: c,
							label: inspect.requiredColumns.includes(c) ? `${c} *` : c
						}))
					})
				}, h))
			}),
			missing.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				children: t("exams.import.missing", { cols: missing.join(", ") })
			}) : null,
			dups.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				children: t("exams.import.duplicates", { cols: dups.join(", ") })
			}) : null,
			inspect.sampleRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: t("exams.import.sample", { n: inspect.sampleRows.length }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table small",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: inspect.headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: h
					}, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: inspect.sampleRows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: inspect.headers.map((h, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[j] ?? "" }, h)) }, i)) })]
				})
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: busy,
					disabled: missing.length > 0 || dups.length > 0,
					onClick: onPreview,
					children: t("exams.import.previewButton")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: onBack,
					children: t("common.back")
				})]
			})
		]
	});
}
function ReusePanel({ course }) {
	const { t } = useI18n();
	const toast = useToast();
	const [source, setSource] = (0, import_react.useState)("shared");
	const [q, setQ] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [fromCourse, setFromCourse] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [prefix, setPrefix] = (0, import_react.useState)("");
	const [created, setCreated] = (0, import_react.useState)(null);
	const shared = useShared(q, page);
	const courses = useStudioCourses();
	const otherQuestions = useCourseQuestions(source === "course" ? fromCourse : "");
	const copy = useApiMutation(() => api(`/api/studio/courses/${course.id}/questions/copy`, {
		method: "POST",
		body: {
			sourceQuestionIds: selected,
			externalIdPrefix: prefix.trim() || void 0
		}
	}), [[
		"studio",
		"questions",
		course.id
	]], (r) => {
		setCreated(toQuestionList(r.created));
		setSelected([]);
		toast.success(t("exams.reuse.copied", { n: r.created.length }));
	});
	const toggle = (id, on) => setSelected((s) => on ? s.length >= 50 ? s : [...s, id] : s.filter((x) => x !== id));
	const courseList = Array.isArray(courses.data) ? courses.data : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("exams.reuse.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.reuse.source"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: source,
						onChange: (e) => {
							setSource(e.target.value === "course" ? "course" : "shared");
							setSelected([]);
						},
						options: [{
							value: "shared",
							label: t("exams.reuse.sharedBank")
						}, {
							value: "course",
							label: t("exams.reuse.myCourses")
						}]
					})
				}), source === "shared" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("courses.search"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "search",
						value: q,
						onChange: (e) => {
							setQ(e.target.value);
							setPage(1);
						}
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.reuse.fromCourse"),
					hint: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: courses }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: fromCourse,
						onChange: (e) => {
							setFromCourse(e.target.value);
							setSelected([]);
						},
						placeholder: t("exams.reuse.pickCourse"),
						options: courseList.filter((c) => c.id !== course.id).map((c) => ({
							value: c.id,
							label: c.title
						}))
					})
				})]
			}),
			source === "shared" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: shared,
				children: (p) => p.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("exams.reuse.none"),
					description: t("exams.reuse.noneBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: p.items.map((sq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono",
									children: sq.externalId
								}),
								" v",
								sq.version,
								" ·",
								" ",
								t(`question.${sq.type}`),
								" · ",
								t(`question.${sq.difficulty}`),
								sq.cognitiveLevel ? ` · ${t(`exams.level.${sq.cognitiveLevel}`)}` : ""
							] }),
							checked: selected.includes(sq.id),
							onChange: (e) => toggle(sq.id, e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
							source: sq.stem,
							className: "small"
						})]
					}, sq.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					page: p.page,
					pageSize: p.pageSize,
					total: p.total,
					onPage: setPage
				})] })
			}) : fromCourse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: otherQuestions,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("question.none"),
					description: t("exams.reuse.noneBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((oq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono",
									children: oq.externalId
								}),
								" · ",
								t(`status.${oq.state}`)
							] }),
							disabled: oq.state === "Retired",
							checked: selected.includes(oq.id),
							onChange: (e) => toggle(oq.id, e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
							source: oq.stem,
							className: "small"
						})]
					}, oq.id))
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.reuse.prefix"),
					hint: t("exams.reuse.prefixHint"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: prefix,
						maxLength: 40,
						onChange: (e) => setPrefix(e.target.value)
					})
				})
			}),
			copy.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: examError(copy.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: selected.length === 0,
				loading: copy.isPending,
				onClick: () => copy.mutate(void 0),
				children: t("exams.reuse.copy", { n: selected.length })
			}) }),
			created ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "copied-h",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "copied-h",
						children: t("exams.reuse.createdTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: created.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							children: c.externalId
						}),
						" — ",
						t("status.Draft"),
						" ·",
						" ",
						t("exams.reuse.provenance", {
							q: c.sourceQuestionId?.slice(0, 8) ?? "?",
							v: c.sourceVersion ?? "?",
							course: courseList.find((x) => x.id === c.sourceCourseId)?.title ?? c.sourceCourseId?.slice(0, 8) ?? "?"
						})
					] }, c.id)) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("exams.reuse.mustReview")
					})
				]
			}) : null
		]
	});
}
function Ci({ low, high }) {
	if (low === null || high === null) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "small muted stat-ci",
		children: [
			"[",
			low.toFixed(2),
			", ",
			high.toFixed(2),
			"]"
		]
	});
}
function ItemAnalyticsTable({ items }) {
	const { t } = useI18n();
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "muted",
		children: t("exams.analytics.none")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "stack",
		style: {
			listStyle: "none",
			padding: 0
		},
		children: items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "card stack",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row row--between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						className: "mono",
						children: [
							a.externalId,
							" v",
							a.version
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "small",
						children: [
							t("exams.analytics.n", { n: a.n }),
							" ·",
							" ",
							t("exams.analytics.exposures", {
								n: a.exposures,
								learners: a.distinctLearners
							})
						]
					})]
				}),
				!a.sufficientData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "info",
					children: t("exams.analytics.insufficient", {
						min: a.minimumN,
						n: a.n
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "facts",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("exams.analytics.difficulty") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
						fmtStat(a.difficulty),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ci, {
							low: a.difficultyLow,
							high: a.difficultyHigh
						})
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("exams.analytics.discrimination") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
						fmtStat(a.discrimination),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ci, {
							low: a.discriminationLow,
							high: a.discriminationHigh
						})
					] })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table small",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
								className: "visually-hidden",
								children: t("exams.analytics.distractors")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.analytics.option")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.analytics.count")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.analytics.proportion")
								})
							] }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: a.distractors.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
									String.fromCharCode(65 + d.sortOrder),
									".",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
										source: d.text,
										inline: true
									}),
									" ",
									d.isCorrect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "success",
										children: t("result.correctAnswer")
									}) : null
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: d.selectedCount }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: d.selectedProportion === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "muted",
									children: t("exams.analytics.insufficientShort")
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "row",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bar",
											"aria-hidden": "true",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { inlineSize: `${Math.round(d.selectedProportion * 100)}%` } })
										}),
										Math.round(d.selectedProportion * 100),
										"%"
									]
								}) })
							] }, d.optionId)) })
						]
					})
				}),
				a.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: a.note
				}) : null
			]
		}, a.questionVersionId))
	});
}
function AnalyticsPanel({ course }) {
	const { t } = useI18n();
	const assessments = useStudioAssessments(course.id);
	const [assessmentId, setAssessmentId] = (0, import_react.useState)("");
	const analytics = useQuery({
		queryKey: examKeys.analytics(assessmentId),
		queryFn: () => api(`/api/studio/assessments/${assessmentId}/item-analytics`),
		enabled: !!assessmentId
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("exams.analytics.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: assessments,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("exams.analytics.noAssessments")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("exams.analytics.assessment"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: assessmentId,
						onChange: (e) => setAssessmentId(e.target.value),
						placeholder: t("exams.analytics.pick"),
						options: list.map((a) => ({
							value: a.id,
							label: a.title
						}))
					})
				})
			}),
			assessmentId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: analytics,
				children: (items) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemAnalyticsTable, { items })
			}) : null
		]
	});
}
function ChallengeList({ list }) {
	const { t, fmtDate } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
					children: t("exams.challenge.reason")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("exams.challenge.statusLabel")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("exams.challenge.date")
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "mono",
					children: c.questionExternalId
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.reason }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: c.status === "Open" ? "warning" : "success",
						children: t(`exams.challenge.status.${c.status}`)
					}),
					" ",
					c.resolution ? t(`exams.challenge.resolution.${c.resolution}`) : null,
					c.resolutionNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "small muted",
						children: c.resolutionNote
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(c.createdAt) })
			] }, c.id)) })]
		})
	});
}
function CourseChallenges({ course }) {
	const { t } = useI18n();
	const [status, setStatus] = (0, import_react.useState)("Open");
	const list = useQuery({
		queryKey: examKeys.courseChallenges(course.id, status),
		queryFn: () => api(`/api/studio/courses/${course.id}/question-challenges${qs({ status })}`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("exams.challenge.courseIntro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("exams.challenge.statusLabel"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: status,
					onChange: (e) => setStatus(e.target.value),
					placeholder: t("exams.common.all"),
					options: ["Open", "Resolved"].map((s) => ({
						value: s,
						label: t(`exams.challenge.status.${s}`)
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("exams.challenge.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChallengeList, { list: items })
			})
		]
	});
}
function PolicyEditor({ assessmentId }) {
	const { t } = useI18n();
	const toast = useToast();
	const policy = useQuery({
		queryKey: examKeys.policy(assessmentId),
		queryFn: () => api(`/api/studio/assessments/${assessmentId}/policy`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: policy,
		children: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyForm, {
			policy: p,
			onSaved: () => toast.success(t("exams.policy.saved"))
		}, p.updatedAt ?? "new")
	});
}
function PolicyForm({ policy, onSaved }) {
	const { t } = useI18n();
	const [allowPause, setAllowPause] = (0, import_react.useState)(policy.allowPause);
	const [minutes, setMinutes] = (0, import_react.useState)(policy.maxPauseMinutes || 10);
	const [cap, setCap] = (0, import_react.useState)(policy.maxExposuresPerQuestion?.toString() ?? "");
	const save = useApiMutation(() => api(`/api/studio/assessments/${policy.assessmentId}/policy`, {
		method: "PUT",
		body: {
			allowPause,
			maxPauseMinutes: allowPause ? minutes : 0,
			maxExposuresPerQuestion: cap.trim() ? Number(cap) : null
		}
	}), [examKeys.policy(policy.assessmentId)], onSaved);
	const minutesOk = !allowPause || Number.isInteger(minutes) && minutes >= 1 && minutes <= 240;
	const capOk = !cap.trim() || Number.isInteger(Number(cap)) && Number(cap) >= 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "stack",
		noValidate: true,
		onSubmit: (e) => {
			e.preventDefault();
			if (minutesOk && capOk) save.mutate(void 0);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("exams.policy.allowPause"),
				hint: t("exams.policy.allowPauseHint"),
				checked: allowPause,
				onChange: (e) => setAllowPause(e.target.checked)
			}),
			allowPause ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("exams.policy.maxPause"),
				error: minutesOk ? void 0 : t("exams.policy.maxPauseRule"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 1,
					max: 240,
					value: Number.isNaN(minutes) ? "" : minutes,
					onChange: (e) => setMinutes(e.target.valueAsNumber)
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("exams.policy.exposure"),
				hint: t("exams.policy.exposureHint"),
				error: capOk ? void 0 : t("exams.policy.exposureRule"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 1,
					value: cap,
					onChange: (e) => setCap(e.target.value)
				})
			}),
			save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: examError(save.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				loading: save.isPending,
				children: t("common.save")
			}) })
		]
	});
}
function PolicyPanel({ course }) {
	const { t } = useI18n();
	const assessments = useStudioAssessments(course.id);
	const [assessmentId, setAssessmentId] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: assessments,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("exams.analytics.noAssessments")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("exams.analytics.assessment"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: assessmentId,
					onChange: (e) => setAssessmentId(e.target.value),
					placeholder: t("exams.analytics.pick"),
					options: list.map((a) => ({
						value: a.id,
						label: a.title
					}))
				})
			})
		}), assessmentId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolicyEditor, { assessmentId }, assessmentId) : null]
	});
}
function CourseCertificateTemplate({ course }) {
	const { t } = useI18n();
	const toast = useToast();
	const templates = useTemplates(false);
	const current = useQuery({
		queryKey: examKeys.courseTemplate(course.id),
		queryFn: () => api(`/api/studio/courses/${course.id}/certificate-template`)
	});
	const [choice, setChoice] = (0, import_react.useState)(null);
	const value = choice ?? current.data?.templateId ?? "";
	const save = useApiMutation(() => api(`/api/studio/courses/${course.id}/certificate-template`, {
		method: "PUT",
		body: { templateId: value || null }
	}), [examKeys.courseTemplate(course.id)], () => toast.success(t("exams.cert.courseSaved")));
	const options = (0, import_react.useMemo)(() => (templates.data ?? []).map((tp) => ({
		value: tp.id,
		label: tp.name
	})), [templates.data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("exams.cert.courseIntro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: templates }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: current,
				children: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "row",
					onSubmit: (e) => {
						e.preventDefault();
						save.mutate(void 0);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.cert.template"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value,
							onChange: (e) => setChoice(e.target.value),
							placeholder: t("exams.cert.defaultTemplate"),
							options
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: save.isPending,
						children: t("common.save")
					})]
				})
			}),
			save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: examError(save.error, t)
			}) : null
		]
	});
}
//#endregion
export { StudioExamsPage };

//# sourceMappingURL=StudioExamsPage-BatH4Jti.js.map