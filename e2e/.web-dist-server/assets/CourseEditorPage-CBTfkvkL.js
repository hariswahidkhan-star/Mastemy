import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, l as errorMessage, n as Notice, o as QueryStatus, r as PageHeader, s as StatusBadge, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { d as useStudioCourse, i as useChannels, n as useApiMutation, r as useCategories, t as keys } from "./hooks-D70iOwvH.js";
import { T as usePublicSkills, p as loc } from "./discover-CtKiK6mW.js";
/* empty css                  */
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as number$1, c as union, d as Controller, f as useFieldArray, i as boolean, l as _coercedNumber, n as _enum, o as object, p as useForm, r as array, s as string, t as ZodNumber, u } from "./zod-piP6K-Dk.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as formatTimestamp, r as newIdempotencyKey } from "./format-B7uvlQ7u.js";
import { t as Duration } from "./Duration-C3eLHxwf.js";
import { n as Dialog, t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { c as fbKeys, u as mappedIds } from "./finalb-tCQ9cZ9j.js";
import { n as toQuestionBody, r as toQuestionList } from "./questions--q6HlBNd.js";
import { i as ResourcesManager, n as EngagementPanel, r as PublicationPanel } from "./Wave2Panels-CUXfRSCA.js";
import { t as Tabs } from "./Tabs-CKJGcPx4.js";
import { c as StudioMessagingPanel } from "./Messaging-BSdbeK_Z.js";
import { n as COURSE_LEVELS, r as QUESTION_STATES, t as ASSESSMENT_KINDS } from "./types-C7beT6Ou.js";
import { t as RichContent } from "./RichContent-C3Tst1Ll.js";
import { s as useCaseGroups, t as COGNITIVE_LEVELS } from "./exams-ZvNkLj9c.js";
import { t as CoverageTable } from "./Coverage-ClLrgjCq.js";
import { t as RichEditor } from "./RichEditor-C8Ud_54o.js";
import { n as toCourseInput, t as courseSchema } from "./courseSchema-Bugqgk3N.js";
import { a as ModuleTools, i as DuplicateLessonButton, l as useAgreementGate, n as CopiesPanel, r as CourseHistoryPanel, s as PreviewPanel, t as ChecklistPanel } from "./Authoring-nhnYtI7j.js";
import { n as CourseAnalyticsPanel } from "./Analytics-rOoM3y73.js";
//#region node_modules/zod/v4/classic/coerce.js
function number(params) {
	return _coercedNumber(ZodNumber, params);
}
//#endregion
//#region src/pages/discover/StudioTaxonomyPanel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var MAX_SKILLS = 30;
function SkillsEditor({ course }) {
	const { t, lang } = useI18n();
	const toast = useToast();
	const catalog = usePublicSkills();
	const key = [
		"studio",
		"course",
		course.id,
		"skills"
	];
	const current = useQuery({
		queryKey: key,
		queryFn: () => api(`/api/studio/courses/${course.id}/skills`)
	});
	const [codes, setCodes] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (current.data && codes === null) setCodes(current.data.map((s) => s.code));
	}, [current.data, codes]);
	const save = useApiMutation((c) => api(`/api/studio/courses/${course.id}/skills`, {
		method: "PUT",
		body: { codes: c }
	}), [key], (r) => {
		setCodes(r.map((s) => s.code));
		toast.success(t("discover.studio.skillsSaved"));
	});
	const selected = codes ?? [];
	const f = filter.trim().toLowerCase();
	const options = (catalog.data ?? []).filter((s) => !f || s.code.toLowerCase().includes(f) || s.nameEn.toLowerCase().includes(f) || s.nameAr.includes(filter.trim()));
	const dirty = !!current.data && JSON.stringify([...selected].sort()) !== JSON.stringify(current.data.map((s) => s.code).sort());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": "studio-skills",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "section__title",
				id: "studio-skills",
				children: t("discover.studio.skillsTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.studio.skillsNote", { n: MAX_SKILLS })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: current,
				children: () => (catalog.data ?? []).length === 0 && !catalog.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("discover.studio.noSkills")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.studio.filterSkills"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "search",
							value: filter,
							onChange: (e) => setFilter(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						style: {
							border: 0,
							padding: 0,
							margin: "var(--space-3) 0"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "visually-hidden",
							children: t("discover.studio.skillsTitle")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "check-grid",
							children: options.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								label: `${loc(lang, s.nameEn, s.nameAr)} (${s.code})`,
								checked: selected.includes(s.code),
								disabled: !selected.includes(s.code) && selected.length >= MAX_SKILLS,
								onChange: (e) => setCodes(e.target.checked ? [...selected, s.code] : selected.filter((c) => c !== s.code))
							}, s.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						"aria-live": "polite",
						children: t("discover.studio.selectedCount", {
							n: selected.length,
							max: MAX_SKILLS
						})
					}),
					save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: errorMessage(save.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: !dirty,
						loading: save.isPending,
						onClick: () => save.mutate(selected),
						children: t("discover.studio.saveSkills")
					})
				] })
			})
		]
	});
}
function MappingDialog({ course, certId, objective, kind, onClose, onSaved }) {
	const { t } = useI18n();
	const [ids, setIds] = (0, import_react.useState)([]);
	const current = useQuery({
		queryKey: fbKeys.mappings(course.id, certId),
		queryFn: () => api(`/api/studio/courses/${course.id}/certifications/${certId}/mappings`)
	});
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (loaded || !current.data) return;
		setIds(mappedIds(current.data, objective.objectiveId, kind));
		setLoaded(true);
	}, [
		current.data,
		loaded,
		objective.objectiveId,
		kind
	]);
	const questions = useQuery({
		queryKey: [
			"studio",
			"course",
			course.id,
			"questions",
			"mapping"
		],
		queryFn: () => api(`/api/studio/courses/${course.id}/questions`).then(toQuestionList),
		enabled: kind === "questions"
	});
	const save = useApiMutation(() => api(`/api/studio/objectives/${objective.objectiveId}/courses/${course.id}/${kind}`, {
		method: "PUT",
		body: { ids }
	}), [fbKeys.mappings(course.id, certId)], onSaved);
	const toggle = (id, on) => setIds((x) => on ? [...x, id] : x.filter((i) => i !== id));
	const currentCount = kind === "lessons" ? objective.lessonCount : objective.activeQuestionCount;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open: true,
		wide: true,
		title: t(kind === "lessons" ? "discover.studio.mapLessonsTitle" : "discover.studio.mapQuestionsTitle", { code: objective.code }),
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: onClose,
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			loading: save.isPending,
			disabled: !loaded,
			onClick: () => save.mutate(void 0),
			children: t("discover.studio.saveMapping", { n: ids.length })
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: objective.title }),
			current.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("common.loading")
			}) : current.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(current.error, t)
			}) : !current.data.linked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				children: t("finalb.mapping.notLinked")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("finalb.mapping.preloaded", {
					n: mappedIds(current.data, objective.objectiveId, kind).length,
					active: currentCount
				})
			}),
			kind === "lessons" ? course.modules.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.studio.noLessons")
			}) : course.modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				style: {
					border: 0,
					padding: 0,
					margin: "var(--space-3) 0"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "field__label",
					children: m.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "check-grid",
					children: m.lessons.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: l.title,
						checked: ids.includes(l.id),
						onChange: (e) => toggle(l.id, e.target.checked)
					}, l.id))
				})]
			}, m.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: questions,
				children: (qs) => qs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("discover.studio.noQuestions")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "check-grid",
					style: { marginBlockStart: "var(--space-3)" },
					children: qs.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: `${q.externalId ? `${q.externalId}: ` : ""}${q.stem.slice(0, 90)}`,
						hint: t(`status.${q.state}`),
						checked: ids.includes(q.id),
						onChange: (e) => toggle(q.id, e.target.checked)
					}, q.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.studio.activeOnly")
			}),
			save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(save.error, t)
			}) : null
		]
	});
}
function CertificationMapping({ course }) {
	const { t, fmtNumber } = useI18n();
	const { hasRole } = useAuth();
	const toast = useToast();
	const staff = hasRole("Reviewer", "Admin", "SuperAdmin");
	const publicCerts = useQuery({
		queryKey: [
			"discover",
			"certifications",
			{}
		],
		queryFn: () => api("/api/certifications"),
		enabled: !staff
	});
	const adminCerts = useQuery({
		queryKey: [
			"admin",
			"certs",
			"",
			false
		],
		queryFn: () => api("/api/admin/certifications"),
		enabled: staff
	});
	const options = staff ? (adminCerts.data ?? []).map((c) => ({
		value: c.id,
		label: c.examCode ? `${c.title} (${c.examCode})` : c.title
	})) : (publicCerts.data ?? []).map((c) => ({
		value: c.id,
		label: c.examCode ? `${c.title} (${c.examCode})` : c.title
	}));
	const [certId, setCertId] = (0, import_react.useState)("");
	const covKey = [
		"studio",
		"coverage",
		course.id,
		certId
	];
	const coverage = useQuery({
		queryKey: covKey,
		queryFn: () => api(`/api/studio/courses/${course.id}/certifications/${certId}/coverage`),
		enabled: !!certId
	});
	const [mapping, setMapping] = (0, import_react.useState)(null);
	const [report, setReport] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => setReport(null), [certId]);
	const shown = report ?? coverage.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": "studio-cert",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "section__title",
				id: "studio-cert",
				children: t("discover.studio.certTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.studio.certNote")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: staff ? adminCerts : publicCerts }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.studio.chooseCert"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: certId,
					onChange: (e) => setCertId(e.target.value),
					placeholder: t("discover.admin.choose"),
					options
				})
			}),
			certId ? coverage.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("common.loading")
			}) : coverage.isError && !report ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(coverage.error, t)
			}) : shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageTable, {
				report: shown,
				fmt: fmtNumber
			}), shown.objectives.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "ordered-picker",
				style: { marginBlockStart: "var(--space-3)" },
				"aria-label": t("discover.studio.mapActions"),
				children: shown.objectives.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono",
						children: o.code
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => setMapping({
							objective: o,
							kind: "lessons"
						}),
						"aria-label": t("discover.studio.mapLessonsNamed", { code: o.code }),
						children: t("discover.studio.mapLessons")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => setMapping({
							objective: o,
							kind: "questions"
						}),
						"aria-label": t("discover.studio.mapQuestionsNamed", { code: o.code }),
						children: t("discover.studio.mapQuestions")
					})
				] }, o.objectiveId))
			}) : null] }) : null : null,
			mapping ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MappingDialog, {
				course,
				certId,
				objective: mapping.objective,
				kind: mapping.kind,
				onClose: () => setMapping(null),
				onSaved: (r) => {
					setReport(r);
					setMapping(null);
					toast.success(t("discover.studio.mappingSaved"));
				}
			}) : null
		]
	});
}
/** Studio course editor tab: skills (snapshot-safe) and certification objective mapping with coverage. */
function StudioTaxonomyPanel({ course }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsEditor, { course }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificationMapping, { course })] });
}
//#endregion
//#region src/pages/studio/AssessmentsPanel.tsx
var optionalInt = union([string(), number$1()]).transform((v) => v === "" || v === null ? null : Number(v)).refine((v) => v === null || Number.isInteger(v) && v > 0);
function schema(t) {
	return object({
		title: string().trim().min(3, t("validation.minChars", { n: 3 })).max(200),
		kind: _enum(ASSESSMENT_KINDS),
		mode: _enum(["Practice", "Exam"]),
		timeLimitMinutes: optionalInt,
		maxAttempts: optionalInt,
		passPercent: number().min(1).max(100),
		multiSelectScoring: _enum(["AllOrNothing", "PartialCredit"]),
		questionCount: number().int().min(1, t("assessmentForm.countRule")),
		isPremium: boolean(),
		countsTowardCertificate: boolean(),
		moduleId: string().optional(),
		lessonId: string().optional(),
		questionIds: array(string()).min(1, t("assessmentForm.pickQuestions"))
	}).refine((v) => v.questionCount <= v.questionIds.length, {
		message: t("assessmentForm.countTooHigh"),
		path: ["questionCount"]
	});
}
function AssessmentForm({ course, initial, onDone }) {
	const { t } = useI18n();
	const toast = useToast();
	const s = (0, import_react.useMemo)(() => schema(t), [t]);
	const questions = useQuery({
		queryKey: [
			"studio",
			"questions",
			course.id,
			{
				state: "",
				q: ""
			}
		],
		queryFn: () => api(`/api/studio/courses/${course.id}/questions`),
		select: toQuestionList
	});
	const { register, handleSubmit, watch, formState: { errors } } = useForm({
		resolver: u(s),
		defaultValues: initial ? {
			...initial,
			timeLimitMinutes: initial.timeLimitMinutes ?? "",
			maxAttempts: initial.maxAttempts ?? "",
			moduleId: initial.moduleId ?? "",
			lessonId: initial.lessonId ?? ""
		} : {
			title: "",
			kind: "LessonPractice",
			mode: "Practice",
			timeLimitMinutes: "",
			maxAttempts: "",
			passPercent: 70,
			multiSelectScoring: "AllOrNothing",
			questionCount: 10,
			isPremium: false,
			countsTowardCertificate: false,
			moduleId: "",
			lessonId: "",
			questionIds: []
		}
	});
	const moduleId = watch("moduleId");
	const lessons = course.modules.find((m) => m.id === moduleId)?.lessons ?? [];
	const save = useApiMutation((v) => {
		const body = {
			...v,
			moduleId: v.moduleId || null,
			lessonId: v.lessonId || null
		};
		return initial ? api(`/api/studio/assessments/${initial.id}`, {
			method: "PUT",
			body
		}) : api(`/api/studio/courses/${course.id}/assessments`, {
			method: "POST",
			body
		});
	}, [[
		"studio",
		"assessments",
		course.id
	]], () => {
		toast.success(t("common.saved"));
		onDone();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit((v) => save.mutate(v)),
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("assessmentForm.title"),
				error: errors.title?.message,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("title") })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "split",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("assessmentForm.kind"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("kind"),
							options: ASSESSMENT_KINDS.map((k) => ({
								value: k,
								label: t(`assessment.kind.${k}`)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("assessmentForm.mode"),
						hint: t("assessmentForm.modeHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("mode"),
							options: [{
								value: "Practice",
								label: t("assessment.mode.Practice")
							}, {
								value: "Exam",
								label: t("assessment.mode.Exam")
							}]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("assessmentForm.timeLimit"),
						hint: t("assessmentForm.blankUnlimited"),
						error: errors.timeLimitMinutes ? t("validation.positiveInt") : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							inputMode: "numeric",
							...register("timeLimitMinutes")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("assessmentForm.maxAttempts"),
						hint: t("assessmentForm.blankUnlimited"),
						error: errors.maxAttempts ? t("validation.positiveInt") : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							inputMode: "numeric",
							...register("maxAttempts")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("assessmentForm.passPercent"),
						error: errors.passPercent ? t("validation.percent") : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 100,
							...register("passPercent")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("assessmentForm.questionCount"),
						error: errors.questionCount?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							...register("questionCount")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("assessmentForm.scoring"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("multiSelectScoring"),
							options: [{
								value: "AllOrNothing",
								label: t("assessment.scoring.AllOrNothing")
							}, {
								value: "PartialCredit",
								label: t("assessment.scoring.PartialCredit")
							}]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.module"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("moduleId"),
							placeholder: t("question.anyModule"),
							options: course.modules.map((m) => ({
								value: m.id,
								label: m.title
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.lesson"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("lessonId"),
							placeholder: t("question.anyLesson"),
							options: lessons.map((l) => ({
								value: l.id,
								label: l.title
							}))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("assessmentForm.premium"),
				hint: t("assessmentForm.premiumHint"),
				...register("isPremium")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("assessmentForm.certificate"),
				...register("countsTowardCertificate")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				style: {
					border: "none",
					padding: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "field__label",
						children: t("assessmentForm.questions")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("assessmentForm.questionsHint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
						query: questions,
						children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: t("question.none")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								maxBlockSize: 280,
								overflow: "auto"
							},
							children: list.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								value: q.id,
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono small",
										children: q.externalId
									}),
									" ",
									q.stem.slice(0, 100),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`status.${q.state}`) })
								] }),
								...register("questionIds")
							}, q.id))
						})
					}),
					errors.questionIds?.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "field__error",
						role: "alert",
						children: errors.questionIds.message
					}) : null
				]
			}),
			save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(save.error, t)
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
function AssessmentsPanel({ course }) {
	const { t } = useI18n();
	const key = [
		"studio",
		"assessments",
		course.id
	];
	const list = useQuery({
		queryKey: key,
		queryFn: () => api(`/api/studio/courses/${course.id}/assessments`),
		select: (d) => Array.isArray(d) ? d : d.items
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const remove = useApiMutation((id) => api(`/api/studio/assessments/${id}`, { method: "DELETE" }), [key], () => setToDelete(null));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					style: { margin: 0 },
					children: t("assessmentForm.help")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setEditing("new"),
					children: t("assessmentForm.new")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("assessmentForm.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("assessmentForm.title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("assessmentForm.kind")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("assessmentForm.mode")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("assessmentForm.questionCount")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("common.actions")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								a.title,
								" ",
								a.isPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "accent",
									children: t("assessment.premium")
								}) : null
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t(`assessment.kind.${a.kind}`) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t(`assessment.mode.${a.mode}`) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.questionCount }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setEditing(a),
									children: t("common.edit")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setToDelete(a),
									children: t("common.delete")
								})]
							}) })
						] }, a.id)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: editing !== null,
				wide: true,
				title: editing === "new" ? t("assessmentForm.new") : t("assessmentForm.edit"),
				onClose: () => setEditing(null),
				children: editing !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentForm, {
					course,
					initial: editing === "new" ? null : editing,
					onDone: () => setEditing(null)
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!toDelete,
				danger: true,
				title: t("assessmentForm.deleteTitle"),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("assessmentForm.deleteBody", { title: toDelete?.title ?? "" }) }), remove.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(remove.error, t)
				}) : null] }),
				confirmLabel: t("common.delete"),
				loading: remove.isPending,
				onCancel: () => setToDelete(null),
				onConfirm: () => toDelete && remove.mutate(toDelete.id)
			})
		]
	});
}
//#endregion
//#region src/pages/studio/PlaylistImport.tsx
/** Playlist import produces a reviewable draft; nothing is created until the author commits. */
function PlaylistImport({ courseId }) {
	const { t } = useI18n();
	const toast = useToast();
	const channels = useChannels();
	const [url, setUrl] = (0, import_react.useState)("");
	const [channelId, setChannelId] = (0, import_react.useState)("");
	const [moduleTitle, setModuleTitle] = (0, import_react.useState)("");
	const [rows, setRows] = (0, import_react.useState)(null);
	const preview = useApiMutation(() => api(`/api/studio/courses/${courseId}/import-playlist`, {
		method: "POST",
		body: {
			playlistUrl: url.trim(),
			channelId
		}
	}), [], (res) => setRows((Array.isArray(res) ? res : res.items).map((r) => ({
		...r,
		include: true
	}))));
	const commit = useApiMutation(() => api(`/api/studio/courses/${courseId}/import-playlist/commit`, {
		method: "POST",
		body: {
			moduleTitle: moduleTitle.trim(),
			items: (rows ?? []).filter((r) => r.include).map((r) => ({
				videoId: r.videoId,
				title: r.title.trim()
			}))
		}
	}), [keys.studioCourse(courseId)], () => {
		setRows(null);
		setUrl("");
		setModuleTitle("");
		toast.success(t("playlist.committed"));
	});
	const included = rows?.filter((r) => r.include) ?? [];
	const invalidTitles = included.some((r) => !r.title.trim());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card card--flat",
		"aria-labelledby": "pl-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "pl-h",
				children: t("playlist.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("playlist.help")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "split",
				onSubmit: (e) => {
					e.preventDefault();
					preview.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("playlist.url"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "url",
							value: url,
							onChange: (e) => setUrl(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: channels }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("video.channel"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: channelId,
							onChange: (e) => setChannelId(e.target.value),
							placeholder: t("video.chooseChannel"),
							options: (channels.data ?? []).map((c) => ({
								value: c.id,
								label: c.title
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "secondary",
						loading: preview.isPending,
						disabled: !url.trim() || !channelId,
						children: t("playlist.preview")
					}) })
				]
			}),
			preview.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(preview.error, t)
			}) : null,
			rows ? rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("playlist.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					style: { marginBlock: "var(--space-4)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("playlist.include")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("playlist.lessonTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("playlist.videoId")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("course.duration")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "visually-hidden",
									children: t("playlist.includeRow", { n: i + 1 })
								}),
								checked: r.include,
								onChange: (e) => setRows(rows.map((x, j) => j === i ? {
									...x,
									include: e.target.checked
								} : x))
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								"aria-label": t("playlist.titleRow", { n: i + 1 }),
								value: r.title,
								onChange: (e) => setRows(rows.map((x, j) => j === i ? {
									...x,
									title: e.target.value
								} : x))
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono",
								children: r.videoId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duration, { seconds: r.durationSeconds }) })
						] }, r.videoId)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("playlist.moduleTitle"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: moduleTitle,
						onChange: (e) => setModuleTitle(e.target.value)
					})
				}),
				commit.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(commit.error, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => commit.mutate(void 0),
						loading: commit.isPending,
						disabled: included.length === 0 || invalidTitles || !moduleTitle.trim(),
						children: t("playlist.commit", { n: included.length })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setRows(null),
						children: t("common.cancel")
					})]
				})
			] }) : null
		]
	});
}
//#endregion
//#region src/pages/studio/CurriculumEditor.tsx
function moveItem(list, from, to) {
	if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) return list;
	const copy = [...list];
	const [item] = copy.splice(from, 1);
	copy.splice(to, 0, item);
	return copy;
}
function CurriculumEditor({ course }) {
	const { t } = useI18n();
	const toast = useToast();
	const courseKey = keys.studioCourse(course.id);
	const modules = course.modules;
	const [drag, setDrag] = (0, import_react.useState)(null);
	const [over, setOver] = (0, import_react.useState)(null);
	const [newModule, setNewModule] = (0, import_react.useState)("");
	const [rename, setRename] = (0, import_react.useState)(null);
	const [addLessonTo, setAddLessonTo] = (0, import_react.useState)(null);
	const [lessonDraft, setLessonDraft] = (0, import_react.useState)({
		title: "",
		objective: ""
	});
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const onError = (e) => toast.error(errorMessage(e, t));
	const addModule = useApiMutation((title) => api(`/api/studio/courses/${course.id}/modules`, {
		method: "POST",
		body: { title }
	}), [courseKey], () => setNewModule(""));
	const reorderModules = useApiMutation((ids) => api(`/api/studio/courses/${course.id}/modules/reorder`, {
		method: "POST",
		body: { ids }
	}), [courseKey]);
	const reorderLessons = useApiMutation(({ moduleId, ids }) => api(`/api/studio/modules/${moduleId}/lessons/reorder`, {
		method: "POST",
		body: { ids }
	}), [courseKey]);
	const addLesson = useApiMutation(({ moduleId, title, objective }) => api(`/api/studio/modules/${moduleId}/lessons`, {
		method: "POST",
		body: {
			title,
			objective
		}
	}), [courseKey], () => {
		setAddLessonTo(null);
		setLessonDraft({
			title: "",
			objective: ""
		});
	});
	const saveRename = useApiMutation((r) => r.kind === "module" ? api(`/api/studio/modules/${r.id}`, {
		method: "PUT",
		body: { title: r.title }
	}) : api(`/api/studio/lessons/${r.id}`, {
		method: "PUT",
		body: {
			title: r.title,
			objective: r.objective ?? ""
		}
	}), [courseKey], () => setRename(null));
	const remove = useApiMutation((d) => api(d.kind === "module" ? `/api/studio/modules/${d.id}` : `/api/studio/lessons/${d.id}`, { method: "DELETE" }), [courseKey], () => setToDelete(null));
	const moveModule = (from, to) => {
		const next = moveItem(modules, from, to);
		if (next !== modules) reorderModules.mutate(next.map((m) => m.id), { onError });
	};
	const moveLesson = (m, from, to) => {
		const next = moveItem(m.lessons, from, to);
		if (next !== m.lessons) reorderLessons.mutate({
			moduleId: m.id,
			ids: next.map((l) => l.id)
		}, { onError });
	};
	const dragProps = (ref, overId, onDrop) => ({
		draggable: true,
		onDragStart: (e) => {
			e.stopPropagation();
			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData("text/plain", ref.id);
			setDrag(ref);
		},
		onDragEnd: () => {
			setDrag(null);
			setOver(null);
		},
		onDragOver: (e) => {
			if (!drag || drag.kind !== ref.kind) return;
			if (drag.kind === "lesson" && ref.kind === "lesson" && drag.moduleId !== ref.moduleId) return;
			e.preventDefault();
			e.stopPropagation();
			setOver(overId);
		},
		onDrop: (e) => {
			if (!drag || drag.kind !== ref.kind) return;
			e.preventDefault();
			e.stopPropagation();
			onDrop();
			setDrag(null);
			setOver(null);
		},
		"data-dragging": drag?.id === ref.id,
		"data-over": over === overId && drag?.id !== ref.id
	});
	const busy = reorderModules.isPending || reorderLessons.isPending;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("curriculum.help")
			}),
			busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				role: "status",
				children: t("curriculum.saving")
			}) : null,
			modules.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: t("curriculum.empty"),
				description: t("curriculum.emptyBody")
			}) : null,
			modules.map((m, mi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "module-block",
				"aria-label": m.title,
				...dragProps({
					kind: "module",
					id: m.id
				}, `m-${m.id}`, () => {
					if (drag?.kind === "module") moveModule(modules.findIndex((x) => x.id === drag.id), mi);
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "drag-handle",
								"aria-hidden": "true",
								title: t("curriculum.dragHint"),
								children: "⠿"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								style: { margin: 0 },
								children: [
									mi + 1,
									". ",
									m.title
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									disabled: mi === 0 || busy,
									onClick: () => moveModule(mi, mi - 1),
									"aria-label": t("curriculum.moveUp", { title: m.title }),
									children: "↑"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									disabled: mi === modules.length - 1 || busy,
									onClick: () => moveModule(mi, mi + 1),
									"aria-label": t("curriculum.moveDown", { title: m.title }),
									children: "↓"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setRename({
										kind: "module",
										id: m.id,
										title: m.title
									}),
									children: t("curriculum.rename")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setToDelete({
										kind: "module",
										id: m.id,
										title: m.title
									}),
									children: t("common.delete")
								})
							]
						})]
					}),
					m.lessons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("curriculum.noLessons")
					}) : null,
					m.lessons.map((l, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lesson-row",
						...dragProps({
							kind: "lesson",
							id: l.id,
							moduleId: m.id
						}, `l-${l.id}`, () => {
							if (drag?.kind === "lesson") moveLesson(m, m.lessons.findIndex((x) => x.id === drag.id), li);
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "drag-handle",
								"aria-hidden": "true",
								children: "⠿"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "lesson-row__title",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: `/studio/courses/${course.id}/lessons/${l.id}`,
										children: l.title
									}),
									" ",
									l.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: l.video.status }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "small muted",
										children: t("curriculum.noVideo")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								disabled: li === 0 || busy,
								onClick: () => moveLesson(m, li, li - 1),
								"aria-label": t("curriculum.moveUp", { title: l.title }),
								children: "↑"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								disabled: li === m.lessons.length - 1 || busy,
								onClick: () => moveLesson(m, li, li + 1),
								"aria-label": t("curriculum.moveDown", { title: l.title }),
								children: "↓"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => setRename({
									kind: "lesson",
									id: l.id,
									title: l.title,
									objective: l.objective
								}),
								children: t("curriculum.rename")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => setToDelete({
									kind: "lesson",
									id: l.id,
									title: l.title
								}),
								children: t("common.delete")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DuplicateLessonButton, {
								lesson: l,
								courseId: course.id
							})
						]
					}, l.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						style: { marginBlockStart: "var(--space-3)" },
						onClick: () => setAddLessonTo(m),
						children: t("curriculum.addLesson")
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleTools, {
						module: m,
						courseId: course.id
					})
				]
			}, m.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					if (newModule.trim()) addModule.mutate(newModule.trim(), { onError });
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("curriculum.newModule"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: newModule,
						onChange: (e) => setNewModule(e.target.value),
						maxLength: 200
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: addModule.isPending,
					disabled: !newModule.trim(),
					children: t("curriculum.addModule")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaylistImport, { courseId: course.id }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: !!addLessonTo,
				title: t("curriculum.addLessonTo", { module: addLessonTo?.title ?? "" }),
				onClose: () => setAddLessonTo(null),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setAddLessonTo(null),
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: addLesson.isPending,
					disabled: !lessonDraft.title.trim(),
					onClick: () => addLessonTo && addLesson.mutate({
						moduleId: addLessonTo.id,
						title: lessonDraft.title.trim(),
						objective: lessonDraft.objective.trim()
					}),
					children: t("curriculum.addLesson")
				})] }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("curriculum.lessonTitle"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: lessonDraft.title,
							onChange: (e) => setLessonDraft({
								...lessonDraft,
								title: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("learn.objective"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: lessonDraft.objective,
							onChange: (e) => setLessonDraft({
								...lessonDraft,
								objective: e.target.value
							})
						})
					}),
					addLesson.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: errorMessage(addLesson.error, t)
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: !!rename,
				title: t("curriculum.rename"),
				onClose: () => setRename(null),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setRename(null),
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: saveRename.isPending,
					disabled: !rename?.title.trim(),
					onClick: () => rename && saveRename.mutate(rename),
					children: t("common.save")
				})] }),
				children: [rename ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("curriculum.titleLabel"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: rename.title,
						onChange: (e) => setRename({
							...rename,
							title: e.target.value
						})
					})
				}), rename.kind === "lesson" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("learn.objective"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: rename.objective ?? "",
						onChange: (e) => setRename({
							...rename,
							objective: e.target.value
						})
					})
				}) : null] }) : null, saveRename.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(saveRename.error, t)
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!toDelete,
				danger: true,
				title: t("curriculum.deleteTitle", { title: toDelete?.title ?? "" }),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: toDelete?.kind === "module" ? t("curriculum.deleteModuleBody") : t("curriculum.deleteLessonBody") }), remove.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(remove.error, t)
				}) : null] }),
				confirmLabel: t("common.delete"),
				loading: remove.isPending,
				onCancel: () => setToDelete(null),
				onConfirm: () => toDelete && remove.mutate(toDelete)
			})
		]
	});
}
//#endregion
//#region src/pages/studio/ImportPanel.tsx
/** Preview table for an MCQ import batch. Commit stays disabled while any row has errors (atomic import). */
function ImportPreviewView({ preview, onCommit, onDownloadErrors, committing }) {
	const { t } = useI18n();
	const hasErrors = preview.errorCount > 0 || preview.rows.some((r) => !r.ok);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "imp-prev",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				id: "imp-prev",
				children: t("import.previewTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "success",
					children: t("import.valid", { n: preview.validCount })
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: hasErrors ? "danger" : "neutral",
					children: t("import.errors", { n: preview.errorCount })
				})
			] }),
			hasErrors ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				children: t("import.fixErrors")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("import.row")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("question.externalId")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("import.result")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("import.problems")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: preview.rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: r.ok ? void 0 : "row--error",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.row }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono",
								children: r.externalId || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: t("import.ok")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "danger",
								children: t("import.error")
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.errors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								style: {
									margin: 0,
									paddingInlineStart: "1.2em"
								},
								children: r.errors.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: e }, e))
							}) : null })
						]
					}, `${r.row}-${r.externalId}`)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onCommit,
					disabled: hasErrors || preview.validCount === 0,
					loading: committing,
					children: t("import.commit", { n: preview.validCount })
				}), hasErrors ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: onDownloadErrors,
					children: t("import.downloadErrors")
				}) : null]
			})
		]
	});
}
function ImportPanel({ courseId, course }) {
	const { t } = useI18n();
	const toast = useToast();
	const fileRef = (0, import_react.useRef)(null);
	const [file, setFile] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)("create");
	const [preview, setPreview] = (0, import_react.useState)(null);
	const base = `/api/studio/courses/${courseId}/questions/import`;
	const runPreview = useApiMutation(() => {
		const fd = new FormData();
		fd.append("file", file);
		fd.append("mode", mode);
		fd.append("idempotencyKey", newIdempotencyKey());
		return api(`${base}/preview`, {
			method: "POST",
			body: fd
		});
	}, [], (p) => setPreview(p));
	const commit = useApiMutation(() => api(`${base}/${preview?.batchId}/commit`, { method: "POST" }), [[
		"studio",
		"questions",
		courseId
	]], () => {
		toast.success(t("import.committed", { n: preview?.validCount ?? 0 }));
		setPreview(null);
		setFile(null);
		if (fileRef.current) fileRef.current.value = "";
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("import.help") }),
			course?.code ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				tone: "info",
				title: t("import.codesTitle"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: { margin: 0 },
					children: [
						t("import.courseCode"),
						": ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							children: course.code
						})
					]
				}), course.modules.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "small",
					style: { marginBlockEnd: 0 },
					children: course.modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							children: m.code
						}),
						" ",
						m.title,
						m.lessons.length > 0 ? ` — ${m.lessons.map((l) => `${l.code ?? ""} ${l.title}`.trim()).join("; ")}` : ""
					] }, m.id))
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => downloadFile("/api/templates/mcq-import.csv", "mastemy-mcq-import-template.csv").catch((e) => toast.error(errorMessage(e, t))),
					children: t("import.template")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "split",
				onSubmit: (e) => {
					e.preventDefault();
					if (file) runPreview.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("import.file"),
						hint: t("import.fileHint"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							ref: fileRef,
							type: "file",
							accept: ".csv,.json,text/csv,application/json",
							onChange: (e) => {
								setFile(e.target.files?.[0] ?? null);
								setPreview(null);
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("import.mode"),
						hint: t(`import.modeHint.${mode}`),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: mode,
							onChange: (e) => setMode(e.target.value === "update" ? "update" : "create"),
							options: [{
								value: "create",
								label: t("import.modeCreate")
							}, {
								value: "update",
								label: t("import.modeUpdate")
							}]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: !file,
						loading: runPreview.isPending,
						children: t("import.preview")
					}) })
				]
			}),
			runPreview.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(runPreview.error, t)
			}) : null,
			commit.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(commit.error, t)
			}) : null,
			preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportPreviewView, {
				preview,
				committing: commit.isPending,
				onCommit: () => commit.mutate(void 0),
				onDownloadErrors: () => downloadFile(`${base}/${preview.batchId}/errors.csv`, `import-errors-${preview.batchId}.csv`).catch((e) => toast.error(errorMessage(e, t)))
			}) : null
		]
	});
}
//#endregion
//#region src/pages/studio/PackagesPanel.tsx
var VIDEO_WORDS = /\b(video access|watch videos|unlock videos?|video lessons?)\b/i;
function PackagesPanel({ courseId }) {
	const { t, fmtMoney } = useI18n();
	const toast = useToast();
	const s = (0, import_react.useMemo)(() => object({
		title: string().trim().min(3, t("validation.minChars", { n: 3 })).max(120),
		contents: string().trim().refine((v) => v.split(/\r?\n/).filter((l) => l.trim()).length >= 1, t("packages.contentsRule")).refine((v) => !VIDEO_WORDS.test(v), t("packages.noVideoRule")),
		price: number().positive(t("validation.positive")).max(1e5),
		currency: _enum([
			"USD",
			"EUR",
			"GBP",
			"SAR",
			"AED",
			"EGP"
		]),
		accessDays: number().int().min(1, t("validation.positiveInt")).max(3650)
	}), [t]);
	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		resolver: u(s),
		defaultValues: {
			title: "",
			contents: "",
			price: "",
			currency: "USD",
			accessDays: 365
		}
	});
	const listKey = [
		"studio",
		"packages",
		courseId
	];
	const packages = useQuery({
		queryKey: listKey,
		queryFn: () => api(`/api/studio/courses/${courseId}/packages`)
	});
	const propose = useApiMutation((v) => api(`/api/studio/courses/${courseId}/packages`, {
		method: "POST",
		body: v
	}), [listKey], () => {
		reset();
		toast.success(t("packages.proposed"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "info",
			title: t("packages.policyTitle"),
			children: t("packages.policy")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: packages }),
		packages.data && packages.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "stack",
			style: {
				listStyle: "none",
				padding: 0
			},
			children: packages.data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card card--flat",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row row--between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: p.title }), p.approvalStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.approvalStatus }) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "small",
					children: [
						fmtMoney(p.price, p.currency),
						" · ",
						t("course.accessTerm", { days: p.accessDays })
					]
				})]
			}, p.id))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card card--flat",
			onSubmit: handleSubmit((v) => propose.mutate(v)),
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("packages.propose") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("packages.title"),
					error: errors.title?.message,
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("title") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("packages.contents"),
					hint: t("packages.contentsHint"),
					error: errors.contents?.message,
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 5,
						...register("contents")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "split",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("packages.price"),
							error: errors.price?.message,
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: "0.01",
								min: "0",
								inputMode: "decimal",
								...register("price")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("packages.currency"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								...register("currency"),
								options: [
									"USD",
									"EUR",
									"GBP",
									"SAR",
									"AED",
									"EGP"
								].map((c) => ({
									value: c,
									label: c
								}))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("packages.accessDays"),
							error: errors.accessDays?.message,
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								...register("accessDays")
							})
						})
					]
				}),
				propose.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(propose.error, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: propose.isPending,
					children: t("packages.submit")
				})
			]
		})
	] });
}
//#endregion
//#region src/pages/studio/QuestionBank.tsx
function questionSchema(t) {
	return object({
		externalId: string().trim().min(1, t("validation.required")).max(64),
		type: _enum(["SingleChoice", "MultipleSelect"]),
		language: _enum(["en", "ar"]),
		stem: string().trim().min(10, t("validation.minChars", { n: 10 })),
		explanation: string().trim().min(10, t("validation.minChars", { n: 10 })),
		difficulty: _enum([
			"Easy",
			"Medium",
			"Hard"
		]),
		skillCode: string().trim().max(64),
		certificationObjective: string().trim().max(200),
		tags: string().trim().max(300),
		sourceReference: string().trim().min(3, t("question.sourceRequired")).max(500),
		allowShuffle: boolean(),
		moduleId: string().optional(),
		lessonId: string().optional(),
		cognitiveLevel: string().optional(),
		caseGroupId: string().optional(),
		caseGroupOrder: number$1().int().min(0).max(1e3).optional(),
		options: array(object({
			id: string().optional(),
			text: string().trim().min(1, t("validation.required")),
			isCorrect: boolean(),
			rationale: string().trim().min(10, t("question.rationaleRule"))
		})).min(2, t("question.minOptions")).max(6, t("question.maxOptions"))
	}).superRefine((v, ctx) => {
		const correct = v.options.filter((o) => o.isCorrect).length;
		if (v.type === "SingleChoice" && correct !== 1) ctx.addIssue({
			code: "custom",
			path: ["options"],
			message: t("question.singleRule")
		});
		if (v.type === "MultipleSelect" && correct < 2) ctx.addIssue({
			code: "custom",
			path: ["options"],
			message: t("question.multiRule")
		});
		const texts = v.options.map((o) => o.text.trim().toLowerCase());
		if (new Set(texts).size !== texts.length) ctx.addIssue({
			code: "custom",
			path: ["options"],
			message: t("question.duplicateOptions")
		});
	});
}
var emptyOption = () => ({
	text: "",
	isCorrect: false,
	rationale: ""
});
function QuestionForm({ course, initial, onDone }) {
	const { t } = useI18n();
	const toast = useToast();
	const schema = (0, import_react.useMemo)(() => questionSchema(t), [t]);
	const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
		resolver: u(schema),
		defaultValues: initial ? {
			...initial,
			language: initial.language === "ar" ? "ar" : "en",
			moduleId: initial.moduleId ?? "",
			lessonId: initial.lessonId ?? "",
			cognitiveLevel: initial.cognitiveLevel ?? "",
			caseGroupId: initial.caseGroupId ?? "",
			caseGroupOrder: initial.caseGroupOrder ?? 0
		} : {
			externalId: "",
			type: "SingleChoice",
			language: course.language === "ar" ? "ar" : "en",
			stem: "",
			explanation: "",
			difficulty: "Medium",
			skillCode: "",
			certificationObjective: "",
			tags: "",
			sourceReference: "",
			allowShuffle: true,
			moduleId: "",
			lessonId: "",
			cognitiveLevel: "",
			caseGroupId: "",
			caseGroupOrder: 0,
			options: [
				emptyOption(),
				emptyOption(),
				emptyOption(),
				emptyOption()
			]
		}
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "options"
	});
	const moduleId = watch("moduleId");
	const lessons = course.modules.find((m) => m.id === moduleId)?.lessons ?? [];
	const caseGroups = useCaseGroups(course.id);
	const caseGroupId = watch("caseGroupId");
	const save = useApiMutation((v) => {
		const body = {
			...v,
			moduleId: v.moduleId || null,
			lessonId: v.lessonId || null,
			cognitiveLevel: v.cognitiveLevel || null,
			caseGroupId: v.caseGroupId || null,
			caseGroupOrder: v.caseGroupId ? v.caseGroupOrder ?? 0 : null
		};
		const payload = toQuestionBody(body);
		return initial ? api(`/api/studio/questions/${initial.id}`, {
			method: "PUT",
			body: payload
		}) : api(`/api/studio/courses/${course.id}/questions`, {
			method: "POST",
			body: payload
		});
	}, [[
		"studio",
		"questions",
		course.id
	]], () => {
		toast.success(initial ? t("question.versionSaved") : t("question.created"));
		onDone();
	});
	const optionsError = errors.options;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit((v) => save.mutate(v)),
		noValidate: true,
		children: [
			initial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("question.versionNote", { v: initial.currentVersion + 1 })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "split",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.externalId"),
						error: errors.externalId?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("externalId") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.type"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("type"),
							options: [{
								value: "SingleChoice",
								label: t("question.SingleChoice")
							}, {
								value: "MultipleSelect",
								label: t("question.MultipleSelect")
							}]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.difficulty"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("difficulty"),
							options: [
								"Easy",
								"Medium",
								"Hard"
							].map((d) => ({
								value: d,
								label: t(`question.${d}`)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("course.language"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("language"),
							options: [{
								value: "en",
								label: t("language.en")
							}, {
								value: "ar",
								label: t("language.ar")
							}]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control,
				name: "stem",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichEditor, {
					label: t("question.stem"),
					value: field.value,
					onChange: field.onChange,
					courseId: course.id,
					error: errors.stem?.message,
					required: true,
					hint: t("exams.editor.hint")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "stack",
				style: {
					border: "none",
					padding: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "field__label",
						children: t("question.options")
					}),
					fields.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "option-editor",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("question.optionN", { n: i + 1 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									disabled: fields.length <= 2,
									onClick: () => remove(i),
									children: t("common.remove")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("question.optionText"),
								error: errors.options?.[i]?.text?.message,
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register(`options.${i}.text`) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionPreview, { text: watch(`options.${i}.text`) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								label: t("question.isCorrect"),
								...register(`options.${i}.isCorrect`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("question.rationale"),
								hint: t("question.rationaleHint"),
								error: errors.options?.[i]?.rationale?.message,
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									...register(`options.${i}.rationale`)
								})
							})
						]
					}, f.id)),
					optionsError?.message || optionsError?.root?.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "field__error",
						role: "alert",
						children: optionsError.message ?? optionsError.root?.message
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						disabled: fields.length >= 6,
						onClick: () => append(emptyOption()),
						children: t("question.addOption")
					}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control,
				name: "explanation",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichEditor, {
					label: t("question.explanation"),
					value: field.value,
					onChange: field.onChange,
					courseId: course.id,
					error: errors.explanation?.message,
					required: true,
					rows: 3
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "split",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.skillCode"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("skillCode") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.certObjective"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("certificationObjective") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("notes.tags"),
						hint: t("notes.tagsHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("tags") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.source"),
						hint: t("question.sourceHint"),
						error: errors.sourceReference?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("sourceReference") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.module"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("moduleId"),
							placeholder: t("question.anyModule"),
							options: course.modules.map((m) => ({
								value: m.id,
								label: m.title
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.lesson"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("lessonId"),
							placeholder: t("question.anyLesson"),
							options: lessons.map((l) => ({
								value: l.id,
								label: l.title
							}))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "split",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.q.cognitiveLevel"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("cognitiveLevel"),
							placeholder: t("exams.q.noLevel"),
							options: COGNITIVE_LEVELS.map((l) => ({
								value: l,
								label: t(`exams.level.${l}`)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.q.caseGroup"),
						hint: t("exams.q.caseGroupHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("caseGroupId"),
							placeholder: t("exams.q.noCaseGroup"),
							options: (caseGroups.data ?? []).map((g) => ({
								value: g.id,
								label: g.title
							}))
						})
					}),
					caseGroupId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.q.caseGroupOrder"),
						error: errors.caseGroupOrder?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 0,
							max: 1e3,
							...register("caseGroupOrder", { valueAsNumber: true })
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("question.allowShuffle"),
				hint: t("question.allowShuffleHint"),
				...register("allowShuffle")
			}),
			save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(save.error, t)
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
/** Compact live preview of an option's Markdown/math (only when it uses formatting). */
function OptionPreview({ text }) {
	const { t } = useI18n();
	if (!text || !/[$*_`|!]/.test(text)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "small muted",
		children: [
			t("exams.editor.preview"),
			": ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
				source: text,
				inline: true
			})
		]
	});
}
var NEXT_STATES = {
	Draft: ["Reviewed"],
	Reviewed: ["Approved", "Draft"],
	Approved: ["Active", "Draft"],
	Active: ["Retired"],
	Retired: []
};
function QuestionBank({ course }) {
	const { t } = useI18n();
	const toast = useToast();
	const { hasRole } = useAuth();
	const [state, setState] = (0, import_react.useState)("");
	const [q, setQ] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const listKey = [
		"studio",
		"questions",
		course.id,
		{
			state,
			q
		}
	];
	const questions = useQuery({
		queryKey: listKey,
		queryFn: () => api(`/api/studio/courses/${course.id}/questions${qs({
			state,
			q
		})}`),
		select: toQuestionList
	});
	const changeState = useApiMutation(({ id, next }) => api(`/api/studio/questions/${id}/state`, {
		method: "POST",
		body: { state: next }
	}), [[
		"studio",
		"questions",
		course.id
	]], () => toast.success(t("question.stateChanged")));
	const isReviewer = hasRole("Reviewer", "Admin", "SuperAdmin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: `/studio/courses/${course.id}/exams`,
					children: t("exams.studio.link")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "row",
					role: "search",
					onSubmit: (e) => e.preventDefault(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("courses.search"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "search",
							value: q,
							onChange: (e) => setQ(e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("question.state"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: state,
							onChange: (e) => setState(e.target.value),
							placeholder: t("question.allStates"),
							options: QUESTION_STATES.map((s) => ({
								value: s,
								label: t(`status.${s}`)
							}))
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						loading: exporting,
						onClick: () => {
							setExporting(true);
							downloadFile(`/api/studio/courses/${course.id}/questions/export.csv`, `questions-${course.slug}.csv`).catch((e) => toast.error(errorMessage(e, t))).finally(() => setExporting(false));
						},
						children: t("question.export")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setEditing("new"),
						children: t("question.new")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: questions,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("question.none"),
					description: t("question.noneBody")
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
								children: t("question.type")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("question.state")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("common.actions")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((qq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono",
								children: qq.externalId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: qq.stem.length > 120 ? `${qq.stem.slice(0, 120)}…` : qq.stem }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`question.${qq.type}`) }),
								" ",
								qq.cognitiveLevel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "info",
									children: t(`exams.level.${qq.cognitiveLevel}`)
								}) : null,
								" ",
								!qq.allowShuffle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("exams.q.noShuffle") }) : null,
								" ",
								qq.caseGroupId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "accent",
									children: t("exams.q.inCase")
								}) : null,
								" ",
								qq.sourceQuestionId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "warning",
									children: t("exams.q.copied")
								}) : null
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: qq.state }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "small muted",
									children: ["v", qq.currentVersion]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setEditing(qq),
									children: t("common.edit")
								}), NEXT_STATES[qq.state].filter((s) => isReviewer || s === "Draft" || s === "Retired").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									loading: changeState.isPending && changeState.variables?.id === qq.id,
									onClick: () => changeState.mutate({
										id: qq.id,
										next: s
									}, { onError: (e) => toast.error(errorMessage(e, t)) }),
									children: t(`question.to.${s}`)
								}, s))]
							}) })
						] }, qq.id)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: editing !== null,
				title: editing === "new" ? t("question.new") : t("question.edit"),
				wide: true,
				onClose: () => setEditing(null),
				children: editing !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionForm, {
					course,
					initial: editing === "new" ? null : editing,
					onDone: () => setEditing(null)
				}) : null
			})
		]
	});
}
//#endregion
//#region src/pages/workspace/CourseTabs.tsx
/** Wave 3 tabs appended to the studio course editor. */
function workspaceCourseTabs(course, t) {
	return [
		{
			id: "checklist",
			label: t("workspace.tabs.checklist"),
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChecklistPanel, { course })
		},
		{
			id: "preview",
			label: t("workspace.tabs.preview"),
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewPanel, { course })
		},
		{
			id: "history",
			label: t("workspace.tabs.history"),
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseHistoryPanel, { course })
		},
		{
			id: "copies",
			label: t("workspace.tabs.copies"),
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopiesPanel, { course })
		},
		{
			id: "analytics",
			label: t("workspace.tabs.analytics"),
			content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseAnalyticsPanel, { course })
		}
	];
}
//#endregion
//#region src/pages/finala/StudioTabs.tsx
/** Area "finala" tabs appended to the studio course editor. */
function finalaCourseTabs(course, t) {
	return [{
		id: "messaging",
		label: t("finala.studio.tab"),
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioMessagingPanel, { course })
	}];
}
//#endregion
//#region src/pages/studio/CourseEditorPage.tsx
function DetailsForm({ course }) {
	const { t, lang } = useI18n();
	const toast = useToast();
	const categories = useCategories();
	const schema = (0, import_react.useMemo)(() => courseSchema(t, false), [t]);
	const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm({
		resolver: u(schema),
		defaultValues: {
			goals: "",
			audience: course.audience,
			categoryId: course.categoryIds?.[0] ? String(course.categoryIds[0]) : "",
			level: course.level,
			language: course.language === "ar" ? "ar" : "en",
			title: course.title,
			subtitle: course.subtitle ?? "",
			description: course.description,
			prerequisites: course.prerequisites,
			outcomes: Array.isArray(course.outcomes) ? course.outcomes.join("\n") : course.outcomes
		}
	});
	const save = useApiMutation((v) => api(`/api/studio/courses/${course.id}`, {
		method: "PUT",
		body: toCourseInput(v)
	}), [keys.studioCourse(course.id), keys.studioCourses], (_r, v) => {
		reset(v);
		toast.success(t("common.saved"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit((v) => save.mutate(v)),
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "split",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("studio.courseTitle"),
						error: errors.title?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("title") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("wizard.subtitleLabel"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("subtitle") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: categories }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("courses.category"),
						error: errors.categoryId?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("categoryId"),
							placeholder: t("wizard.chooseCategory"),
							options: (categories.data ?? []).map((c) => ({
								value: String(c.id),
								label: (c.parentId ? "— " : "") + (lang === "ar" ? c.nameAr : c.nameEn)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("courses.level"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("level"),
							options: COURSE_LEVELS.map((l) => ({
								value: l,
								label: t(`level.${l}`)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("course.language"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							...register("language"),
							options: [{
								value: "en",
								label: t("language.en")
							}, {
								value: "ar",
								label: t("language.ar")
							}]
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("course.audience"),
						error: errors.audience?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, { ...register("audience") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("wizard.description"),
						error: errors.description?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 6,
							...register("description")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("course.prerequisites"),
						hint: t("wizard.linesHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, { ...register("prerequisites") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("course.outcomes"),
						hint: t("studio.outcomesRule"),
						error: errors.outcomes?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 5,
							...register("outcomes")
						})
					})
				] })]
			}),
			save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(save.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				loading: save.isPending,
				disabled: !isDirty,
				children: t("common.save")
			})
		]
	});
}
function ReviewPanel({ course }) {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const validation = useQuery({
		queryKey: [
			"studio",
			"validation",
			course.id
		],
		queryFn: () => api(`/api/studio/courses/${course.id}/validation`)
	});
	const comments = useQuery({
		queryKey: [
			"review",
			"comments",
			course.id
		],
		queryFn: () => api(`/api/review/courses/${course.id}/comments`),
		retry: false
	});
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const agreement = useAgreementGate();
	const submit = useApiMutation(() => api(`/api/studio/courses/${course.id}/submit`, { method: "POST" }), [
		keys.studioCourse(course.id),
		keys.studioCourses,
		[
			"studio",
			"validation",
			course.id
		]
	], () => {
		setConfirm(false);
		toast.success(t("studio.submitted"));
	});
	const startUpdate = useApiMutation(() => api(`/api/studio/courses/${course.id}/start-update`, { method: "POST" }), [keys.studioCourse(course.id), keys.studioCourses], () => toast.success(t("studio.updateStarted")));
	const canSubmit = course.status === "Draft" || course.status === "ChangesRequested" || course.status === "Updating";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("studio.checklist") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: validation,
					children: (v) => v.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "success",
						children: t("studio.checklistOk")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						title: t("studio.checklistIssues", { n: v.issues.length }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							style: { margin: 0 },
							children: v.issues.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: i }, i))
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("studio.checklistNote")
				}),
				canSubmit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => agreement.run(() => setConfirm(true)),
					disabled: !validation.data?.ok,
					children: t("studio.submitForReview")
				}) : course.status === "Published" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => startUpdate.mutate(void 0),
					loading: startUpdate.isPending,
					children: t("studio.startUpdate")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(`studio.statusHelp.${course.status}`) }),
				submit.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(submit.error, t)
				}) : null,
				startUpdate.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(startUpdate.error, t)
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("review.comments") }), comments.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted small",
				children: t("review.commentsUnavailable")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
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
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirm,
				title: t("studio.submitForReview"),
				body: t("studio.submitConfirm"),
				confirmLabel: t("studio.submit"),
				loading: submit.isPending,
				onCancel: () => setConfirm(false),
				onConfirm: () => submit.mutate(void 0, { onError: (e) => {
					if (agreement.handleError(e, () => submit.mutate(void 0))) setConfirm(false);
				} })
			}),
			agreement.dialog
		]
	});
}
function CourseEditorPage() {
	const { id = "" } = useParams();
	const { t } = useI18n();
	const [params, setParams] = useSearchParams();
	const course = useStudioCourse(id);
	usePageMeta(course.data?.title ?? t("studio.courses"), void 0, { noindex: true });
	const tab = params.get("tab") ?? "details";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: course,
		children: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "small muted",
				"aria-label": t("common.breadcrumb"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						children: t("studio.courses")
					}),
					" / ",
					c.title
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: c.title,
				subtitle: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status }),
				actions: c.status === "Published" || c.status === "Updating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "btn btn--secondary btn--sm",
					to: `/courses/${c.slug}`,
					children: t("studio.viewPublic")
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				label: t("studio.editorTabs"),
				value: tab,
				onChange: (v) => setParams({ tab: v }, { replace: true }),
				tabs: [
					{
						id: "details",
						label: t("studio.tab.details"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailsForm, { course: c })
					},
					{
						id: "curriculum",
						label: t("studio.tab.curriculum"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurriculumEditor, { course: c })
					},
					{
						id: "questions",
						label: t("studio.tab.questions"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionBank, { course: c })
					},
					{
						id: "import",
						label: t("studio.tab.import"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImportPanel, {
							courseId: c.id,
							course: c
						})
					},
					{
						id: "assessments",
						label: t("studio.tab.assessments"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssessmentsPanel, { course: c })
					},
					{
						id: "packages",
						label: t("studio.tab.packages"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagesPanel, { courseId: c.id })
					},
					{
						id: "resources",
						label: t("studio.tab.resources"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourcesManager, { course: c })
					},
					{
						id: "engagement",
						label: t("studio.tab.engagement"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngagementPanel, { course: c })
					},
					{
						id: "publication",
						label: t("studio.tab.publication"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicationPanel, { course: c })
					},
					{
						id: "review",
						label: t("studio.tab.review"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewPanel, { course: c })
					},
					{
						id: "taxonomy",
						label: t("discover.studio.tab"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioTaxonomyPanel, { course: c })
					},
					...workspaceCourseTabs(c, t),
					...finalaCourseTabs(c, t)
				]
			})
		] })
	});
}
//#endregion
export { CourseEditorPage };

//# sourceMappingURL=CourseEditorPage-CBTfkvkL.js.map