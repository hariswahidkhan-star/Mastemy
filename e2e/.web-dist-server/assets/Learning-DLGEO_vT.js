import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { a as QueryState, n as Notice } from "./misc-Bqc6tFVU.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { f as practiceApi, n as finalaError, o as SELF_GRADES, t as FinalaError } from "./shared-CFDEeOyq.js";
import { t as RichContent } from "./RichContent-C3Tst1Ll.js";
//#region src/pages/finala/Learning.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* After an item is checked the learner may rate their own recall (SM-2 quality 0–5). The choice replaces
* the automatic step for that item; the server allows one self-grade per item.
*/
function SelfGradePanel({ sessionId, itemId, initial }) {
	const { t, fmtDate } = useI18n();
	const [graded, setGraded] = (0, import_react.useState)(initial ?? null);
	const [card, setCard] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const grade = async (q) => {
		setBusy(q);
		setError(null);
		try {
			const c = await practiceApi.selfGrade(sessionId, itemId, q);
			setCard(c);
			setGraded(q);
		} catch (e) {
			setError(e);
		} finally {
			setBusy(null);
		}
	};
	if (graded !== null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "small muted",
		"aria-live": "polite",
		"data-testid": "self-graded",
		children: [t("finala.sg.done", { label: t(`finala.sg.q${graded}`) }), card ? ` ${t("finala.sg.nextDue", { date: fmtDate(card.dueAt) })}` : ""]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "finala-selfgrade",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "small",
				children: t("finala.sg.legend")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				style: { marginBlockStart: 0 },
				children: t("finala.sg.help")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "finala-selfgrade__grid",
				children: SELF_GRADES.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: q >= 3 ? "secondary" : "ghost",
					loading: busy === q,
					disabled: busy !== null,
					onClick: () => void grade(q),
					"aria-label": `${q} – ${t(`finala.sg.q${q}`)}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							className: "finala-selfgrade__n",
							children: q
						}),
						" ",
						t(`finala.sg.q${q}`)
					]
				}, q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error })
		]
	});
}
/** Bookmarks a practice item or a submitted exam item; the server resolves the question (ids stay hidden). */
function BookmarkItemButton({ source, ownerId, itemId }) {
	const { t } = useI18n();
	const toast = useToast();
	const [done, setDone] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const run = async () => {
		setBusy(true);
		try {
			if (source === "practice") await practiceApi.bookmarkPracticeItem(ownerId, itemId);
			else await practiceApi.bookmarkAttemptItem(ownerId, itemId);
			setDone(true);
			toast.success(t("finala.bm.added"));
		} catch (e) {
			toast.error(finalaError(e, t));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "ghost",
		loading: busy,
		disabled: done,
		"aria-pressed": done,
		onClick: () => void run(),
		children: done ? t("finala.bm.saved") : t("finala.bm.add")
	});
}
function WorkedSolutionPanel({ source }) {
	const { t } = useI18n();
	const [open, setOpen] = (0, import_react.useState)(false);
	if (!source) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "finala-worked",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "ghost",
			"aria-expanded": open,
			onClick: () => setOpen((o) => !o),
			children: open ? t("finala.worked.hide") : t("finala.worked.show")
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "finala-worked__body",
			"aria-label": t("finala.worked.title"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, { source })
		}) : null]
	});
}
function useAssessmentSummary(assessmentId, enabled) {
	return useQuery({
		queryKey: [
			"finala",
			"assessment",
			assessmentId
		],
		queryFn: () => api(`/api/assessments/${assessmentId}`),
		enabled,
		staleTime: 6e4
	});
}
function negativeMarkingText(t, rate, rules) {
	return rules?.trim() ? rules : t("finala.neg.rule", { rate });
}
/**
* Disclosed before an attempt: wrong answers deduct `rate` × points; unanswered items never lose marks.
* `rate` comes from the published assessment list; the authoritative wording from GET /api/assessments/{id}.
*/
function NegativeMarkingDisclosure({ assessmentId, rate }) {
	const { t } = useI18n();
	const has = (rate ?? 0) > 0;
	const summary = useAssessmentSummary(assessmentId, has);
	if (!has) return null;
	const r = summary.data?.negativeMarkingPerWrong ?? rate ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
		tone: "warning",
		title: t("finala.neg.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"data-testid": "negative-marking",
				children: negativeMarkingText(t, r, summary.data?.negativeMarkingRules)
			}),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "small",
				children: t("finala.neg.unanswered")
			})
		]
	});
}
/** Shown with results: reminds how the score was computed when negative marking applied. */
function NegativeMarkingResultNotice({ assessmentId, incorrect }) {
	const { t } = useI18n();
	const summary = useAssessmentSummary(assessmentId, !!assessmentId);
	const rate = summary.data?.negativeMarkingPerWrong ?? 0;
	if (!summary.data || rate <= 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "info",
		title: t("finala.neg.resultTitle"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			"data-testid": "negative-marking-result",
			children: [
				negativeMarkingText(t, rate, summary.data.negativeMarkingRules),
				" ",
				t("finala.neg.resultDeduction", {
					n: incorrect,
					points: Math.round(rate * incorrect * 1e4) / 1e4
				})
			]
		})
	});
}
/** Dry run of a proposed regrade (nothing is written) shown before approval. */
function RegradePreviewPanel({ regradeId }) {
	const { t, fmtNumber } = useI18n();
	const preview = useQuery({
		queryKey: [
			"finala",
			"regrade-preview",
			regradeId
		],
		queryFn: () => api(`/api/review/regrades/${regradeId}/preview`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card card--flat stack",
		"aria-labelledby": `rp-${regradeId}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				id: `rp-${regradeId}`,
				style: { margin: 0 },
				children: t("finala.regrade.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finala.regrade.help")
			}),
			preview.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: preview.error }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: preview,
				children: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "facts",
					"data-testid": "regrade-preview",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.regrade.affected") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(p.affectedAttempts) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.regrade.changed") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(p.changedAttempts) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.regrade.newlyPassing") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(p.newlyPassing) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.regrade.newlyFailing") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(p.newlyFailing) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("finala.regrade.certsToFlag") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(p.certificatesToFlag) })] })
					]
				}), p.results.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table small",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", { children: t("finala.regrade.rows") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("finala.regrade.attempt")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("finala.regrade.old")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("finala.regrade.new")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("finala.regrade.pass")
								})
							] }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: p.results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "mono",
									children: r.attemptId.slice(0, 8)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [fmtNumber(r.oldScorePercent), "%"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [fmtNumber(r.newScorePercent), "%"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [t(r.oldPassed ? "result.passed" : "result.notPassed"), r.oldPassed !== r.newPassed ? ` → ${t(r.newPassed ? "result.passed" : "result.notPassed")}` : ""] })
							] }, r.attemptId)) })
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("finala.regrade.noRows")
				})] })
			})
		]
	});
}
function TemplatePreviewButton({ templateId }) {
	const { t } = useI18n();
	const toast = useToast();
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "secondary",
		loading: busy,
		onClick: () => {
			setBusy(true);
			downloadFile(`/api/admin/certificate-templates/${templateId}/preview.pdf`, `certificate-template-preview-${templateId.slice(0, 8)}.pdf`).catch((e) => toast.error(finalaError(e, t))).finally(() => setBusy(false));
		},
		children: t("finala.template.preview")
	});
}
//#endregion
export { SelfGradePanel as a, RegradePreviewPanel as i, NegativeMarkingDisclosure as n, TemplatePreviewButton as o, NegativeMarkingResultNotice as r, WorkedSolutionPanel as s, BookmarkItemButton as t };

//# sourceMappingURL=Learning-DLGEO_vT.js.map