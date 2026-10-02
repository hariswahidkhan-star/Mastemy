import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, t as Button } from "./Button-6CizQUWS.js";
import { l as errorMessage, n as Notice, t as Badge } from "./misc-Bqc6tFVU.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, n as Field } from "./Field-Di1lkoGg.js";
import { n as Dialog } from "./Dialog-CcENtYyA.js";
import { t as RichContent } from "./RichContent-C3Tst1Ll.js";
import { r as examKeys } from "./exams-ZvNkLj9c.js";
//#region src/pages/exams/AttemptExtras.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Accommodation applied by the server at attempt start (extra time or untimed). */
function AccommodationNotice({ extraTimePercent, untimed }) {
	const { t } = useI18n();
	if (untimed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "info",
		title: t("exams.acc.title"),
		children: t("exams.acc.untimed")
	});
	if (extraTimePercent && extraTimePercent > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "info",
		title: t("exams.acc.title"),
		children: t("exams.acc.extra", { n: extraTimePercent })
	});
	return null;
}
/**
* Case exhibit next to the grouped question: side by side and sticky on wide screens, a collapsible
* disclosure above the question on narrow ones.
*/
function CaseExhibit({ exhibit, children }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "exam-case",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "card exam-case__exhibit",
			open: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "small muted",
					children: t("exams.case.exhibit")
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: exhibit.title })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-label": t("exams.case.exhibitNamed", { title: exhibit.title }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, { source: exhibit.exhibitMarkdown })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "exam-case__question",
			children
		})]
	});
}
function PauseControls({ pause, onPause, onResume }) {
	const { t } = useI18n();
	const toast = useToast();
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!pause?.allowPause) return null;
	const minutes = Math.floor(pause.pauseSecondsRemaining / 60);
	const seconds = pause.pauseSecondsRemaining % 60;
	const run = async (fn) => {
		setBusy(true);
		try {
			await fn();
		} catch (e) {
			toast.error(errorMessage(e, t));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		style: { gap: "var(--space-2)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small",
			"data-testid": "pause-budget",
			children: t("exams.pause.budget", {
				m: minutes,
				s: String(seconds).padStart(2, "0")
			})
		}), pause.paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			loading: busy,
			onClick: () => void run(onResume),
			children: t("exams.pause.resume")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "secondary",
			loading: busy,
			disabled: pause.pauseSecondsRemaining <= 0,
			onClick: () => void run(onPause),
			children: t("exams.pause.pause")
		})]
	});
}
/** "Challenge this question" for reviewed items (attempt review or practice). */
function ChallengeButton({ path }) {
	const { t } = useI18n();
	const toast = useToast();
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [reason, setReason] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [sent, setSent] = (0, import_react.useState)(false);
	const tooShort = reason.trim().length < 10;
	const submit = async () => {
		setBusy(true);
		setError(null);
		try {
			await api(path, {
				method: "POST",
				body: { reason: reason.trim() }
			});
			setSent(true);
			setOpen(false);
			toast.success(t("exams.challenge.sent"));
			qc.invalidateQueries({ queryKey: examKeys.myChallenges });
		} catch (e) {
			setError(errorMessage(e, t));
		} finally {
			setBusy(false);
		}
	};
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "info",
		children: t("exams.challenge.pending")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: "ghost",
		onClick: () => setOpen(true),
		children: t("exams.challenge.button")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		title: t("exams.challenge.title"),
		onClose: () => setOpen(false),
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: () => setOpen(false),
			children: t("common.cancel")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			loading: busy,
			disabled: tooShort,
			onClick: () => void submit(),
			children: t("exams.challenge.submit")
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				children: t("exams.challenge.body")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("exams.challenge.reason"),
				hint: t("exams.challenge.reasonHint"),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 4,
					maxLength: 2e3,
					value: reason,
					onChange: (e) => setReason(e.target.value)
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: error
			}) : null
		]
	})] });
}
/** Per-skill accuracy and lesson recommendations for a finished attempt (diagnostics in particular). */
function RecommendationsPanel({ attemptId, slug }) {
	const { t, fmtNumber } = useI18n();
	const rec = useQuery({
		queryKey: examKeys.recommendations(attemptId),
		queryFn: () => api(`/api/attempts/${attemptId}/recommendations`)
	});
	if (rec.isPending) return null;
	if (rec.isError) return null;
	const d = rec.data;
	if (d.skills.length === 0 && d.lessons.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		"aria-labelledby": "rec-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "rec-h",
				children: d.kind === "Diagnostic" ? t("exams.rec.diagnosticTitle") : t("exams.rec.title")
			}),
			d.skills.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
							className: "visually-hidden",
							children: t("exams.rec.skills")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("exams.rec.skill")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("exams.rec.accuracy")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("exams.rec.questions")
							})
						] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: d.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								s.skill || t("exams.rec.noSkill"),
								" ",
								s.weak ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "warning",
									children: t("exams.rec.weak")
								}) : null
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [fmtNumber(Math.round(s.accuracyPercent * 10) / 10), "%"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.questions })
						] }, s.skill)) })
					]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("exams.rec.lessons") }),
			d.lessons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted small",
				children: t("exams.rec.noLessons")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "stack",
				children: d.lessons.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/learn/${slug}/${l.lessonId}`,
						children: l.lessonTitle
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: l.lessonTitle }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "small muted",
						children: [
							l.moduleTitle,
							" · ",
							t("exams.rec.misses", { n: l.misses }),
							" ·",
							" ",
							l.weakSkills.join(", ")
						]
					})
				] }, l.lessonId))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				title: t("exams.rec.notGuarantee"),
				children: d.readinessDisclaimer
			})
		]
	});
}
//#endregion
export { RecommendationsPanel as a, PauseControls as i, CaseExhibit as n, ChallengeButton as r, AccommodationNotice as t };

//# sourceMappingURL=AttemptExtras-o3GN-tp5.js.map