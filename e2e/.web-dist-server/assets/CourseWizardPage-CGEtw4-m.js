import { _ as require_react, b as __toESM, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { i as api, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { l as errorMessage, n as Notice, o as QueryStatus, r as PageHeader } from "./misc-Bqc6tFVU.js";
import { n as useApiMutation, r as useCategories, t as keys } from "./hooks-D70iOwvH.js";
import { p as useForm, u } from "./zod-piP6K-Dk.js";
import { a as Textarea, i as Select, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { n as COURSE_LEVELS } from "./types-C7beT6Ou.js";
import { n as toCourseInput, t as courseSchema } from "./courseSchema-Bugqgk3N.js";
import { c as TemplatePicker } from "./Authoring-nhnYtI7j.js";
//#region src/pages/studio/CourseWizardPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		key: "goals",
		fields: ["goals", "audience"]
	},
	{
		key: "placement",
		fields: [
			"categoryId",
			"level",
			"language"
		]
	},
	{
		key: "pitch",
		fields: [
			"title",
			"subtitle",
			"description"
		]
	},
	{
		key: "learning",
		fields: ["prerequisites", "outcomes"]
	},
	{
		key: "review",
		fields: []
	}
];
function CourseWizardPage() {
	const { t, lang } = useI18n();
	const navigate = useNavigate();
	const categories = useCategories();
	const [step, setStep] = (0, import_react.useState)(0);
	usePageMeta(t("studio.newCourse"), void 0, { noindex: true });
	const schema = (0, import_react.useMemo)(() => courseSchema(t), [t]);
	const { register, trigger, getValues, handleSubmit, formState: { errors } } = useForm({
		resolver: u(schema),
		defaultValues: {
			goals: "",
			audience: "",
			categoryId: "",
			level: "Beginner",
			language: lang,
			title: "",
			subtitle: "",
			description: "",
			prerequisites: "",
			outcomes: ""
		},
		mode: "onTouched"
	});
	const [templateId, setTemplateId] = (0, import_react.useState)("");
	const create = useApiMutation((v) => templateId ? api("/api/studio/courses/from-template", {
		method: "POST",
		body: {
			templateId,
			course: toCourseInput(v)
		}
	}) : api("/api/studio/courses", {
		method: "POST",
		body: toCourseInput(v)
	}), [keys.studioCourses], (course) => navigate(`/studio/courses/${course.id}`));
	const next = async () => {
		if (await trigger(STEPS[step].fields)) setStep((s) => Math.min(STEPS.length - 1, s + 1));
	};
	const values = getValues();
	const category = categories.data?.find((c) => String(c.id) === values.categoryId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("studio.newCourse"),
			subtitle: t("wizard.subtitle")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "wizard-steps",
			children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				"aria-current": i === step ? "step" : void 0,
				children: [
					i + 1,
					". ",
					t(`wizard.step.${s.key}`)
				]
			}, s.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "card",
			noValidate: true,
			onSubmit: handleSubmit((v) => {
				if (step === STEPS.length - 1) create.mutate(v);
				else next();
			}),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					hidden: step !== 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("wizard.goals"),
						hint: t("wizard.goalsHint"),
						error: errors.goals?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 4,
							...register("goals")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("course.audience"),
						hint: t("wizard.audienceHint"),
						error: errors.audience?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 4,
							...register("audience")
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					hidden: step !== 1,
					children: [
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
							error: errors.level?.message,
							required: true,
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
							hint: t("wizard.languageHint"),
							required: true,
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					hidden: step !== 2,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("studio.courseTitle"),
							hint: t("wizard.titleHint"),
							error: errors.title?.message,
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								...register("title"),
								maxLength: 120
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("wizard.subtitleLabel"),
							error: errors.subtitle?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								...register("subtitle"),
								maxLength: 200
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("wizard.description"),
							error: errors.description?.message,
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 8,
								...register("description")
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					hidden: step !== 3,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("course.prerequisites"),
						hint: t("wizard.linesHint"),
						error: errors.prerequisites?.message,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 4,
							...register("prerequisites")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("course.outcomes"),
						hint: t("studio.outcomesRule"),
						error: errors.outcomes?.message,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 6,
							...register("outcomes")
						})
					})]
				}),
				step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "kv",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("studio.courseTitle") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: values.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("courses.category") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: category ? lang === "ar" ? category.nameAr : category.nameEn : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("courses.level") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: t(`level.${values.level}`) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("course.language") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: t(`language.${values.language}`) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("course.outcomes") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: values.outcomes.split(/\r?\n/).filter((l) => l.trim()).length })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplatePicker, {
						value: templateId,
						onChange: setTemplateId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "info",
						children: t("wizard.afterCreate")
					})
				] }) : null,
				create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: errorMessage(create.error, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "form-actions",
					children: [step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => setStep((s) => s - 1),
						children: t("common.back")
					}) : null, step < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void next(),
						children: t("common.continue")
					}, "continue") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: create.isPending,
						children: t("wizard.create")
					}, "create")]
				})
			]
		})
	] });
}
//#endregion
export { CourseWizardPage };

//# sourceMappingURL=CourseWizardPage-CGEtw4-m.js.map