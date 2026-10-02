import { _ as require_react, a as Link, b as __toESM, h as useParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, n as ButtonLink, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, l as errorMessage, n as Notice, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as keys } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { t as RichContent } from "./RichContent-C3Tst1Ll.js";
import { a as RecommendationsPanel, i as PauseControls, n as CaseExhibit, r as ChallengeButton, t as AccommodationNotice } from "./AttemptExtras-o3GN-tp5.js";
import { r as NegativeMarkingResultNotice, s as WorkedSolutionPanel, t as BookmarkItemButton } from "./Learning-DLGEO_vT.js";
//#region src/lib/countdown.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** Milliseconds to add to the local clock to approximate the server clock. */
function serverOffsetMs(serverNowIso, localNowMs = Date.now()) {
	const server = Date.parse(serverNowIso);
	return Number.isNaN(server) ? 0 : server - localNowMs;
}
function remainingMs(deadlineIso, offsetMs, localNowMs = Date.now()) {
	const deadline = Date.parse(deadlineIso);
	if (Number.isNaN(deadline)) return 0;
	return Math.max(0, deadline - (localNowMs + offsetMs));
}
/**
* Server-authoritative countdown: the offset between the server's `serverNow` and the local clock is
* captured once when the attempt is loaded, so a wrong local clock cannot extend or shorten the deadline.
* Returns null for untimed attempts.
*/
function useServerCountdown(deadlineAt, serverNow) {
	const offset = (0, import_react.useMemo)(() => serverOffsetMs(serverNow), [serverNow]);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!deadlineAt) return;
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, [deadlineAt]);
	if (!deadlineAt) return null;
	return remainingMs(deadlineAt, offset, now);
}
function formatCountdown(ms) {
	const total = Math.ceil(ms / 1e3);
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	const s = total % 60;
	const pad = (n) => String(n).padStart(2, "0");
	return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
//#endregion
//#region src/pages/assessment/AttemptPlayer.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Renders an in-progress attempt. It never receives or renders correctness for exam items;
* correctness only appears after the server returns an AttemptResult (or a practice check the learner asked for).
*/
function AttemptPlayer({ attempt: initialAttempt, onSave, onSubmit, onCheck, submitting, onPause, onResume }) {
	const { t } = useI18n();
	const [attempt, setAttempt] = (0, import_react.useState)(initialAttempt);
	const [items, setItems] = (0, import_react.useState)(initialAttempt.items);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [saveState, setSaveState] = (0, import_react.useState)("idle");
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	const [checks, setChecks] = (0, import_react.useState)({});
	const remaining = useServerCountdown(attempt.deadlineAt, attempt.serverNow);
	const autoSubmitted = (0, import_react.useRef)(false);
	const questionRef = (0, import_react.useRef)(null);
	const paused = !!attempt.pause?.paused;
	const shown = (paused && attempt.deadlineAt && attempt.pause?.pausedAt ? Math.max(0, Date.parse(attempt.deadlineAt) - Date.parse(attempt.pause.pausedAt)) : null) ?? remaining;
	const expired = !paused && remaining !== null && remaining <= 0;
	(0, import_react.useEffect)(() => {
		if (expired && !autoSubmitted.current) {
			autoSubmitted.current = true;
			onSubmit();
		}
	}, [expired, onSubmit]);
	const item = items[index];
	const unanswered = items.map((it, i) => ({
		it,
		n: i + 1
	})).filter(({ it }) => it.selectedOptionIds.length === 0);
	const persist = async (next) => {
		setItems((list) => list.map((i) => i.itemId === next.itemId ? next : i));
		setSaveState("saving");
		try {
			await onSave(next.itemId, next.selectedOptionIds, next.flagged);
			setSaveState("saved");
		} catch {
			setSaveState("error");
		}
	};
	const toggleOption = (optionId) => {
		if (!item || expired) return;
		const selected = item.type === "SingleChoice" ? [optionId] : item.selectedOptionIds.includes(optionId) ? item.selectedOptionIds.filter((id) => id !== optionId) : [...item.selectedOptionIds, optionId];
		persist({
			...item,
			selectedOptionIds: selected
		});
	};
	const goTo = (i) => {
		setIndex(i);
		requestAnimationFrame(() => questionRef.current?.focus());
	};
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "warning",
		children: t("attempt.noItems")
	});
	const check = checks[item.itemId];
	const multi = item.type === "MultipleSelect";
	const exhibit = item.caseGroupId ? (attempt.cases ?? []).find((c) => c.caseGroupId === item.caseGroupId) : void 0;
	const question = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card question",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				style: { marginBlockEnd: "var(--space-3)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					ref: questionRef,
					tabIndex: -1,
					style: {
						margin: 0,
						fontSize: "var(--text-md)"
					},
					children: t("attempt.questionOf", {
						n: index + 1,
						total: items.length
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: multi ? "warning" : "neutral",
					children: multi ? t("attempt.multiple") : t("attempt.single")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				disabled: expired,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
					source: item.stem,
					inline: true
				}), multi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "small",
					style: {
						display: "block",
						marginBlockStart: "var(--space-2)",
						fontWeight: 700
					},
					children: t("attempt.selectAll")
				}) : null] }), item.options.map((o) => {
					const checked = item.selectedOptionIds.includes(o.id);
					const cls = check ? check.correctOptionIds.includes(o.id) ? "option option--correct" : checked ? "option option--incorrect" : "option" : "option";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: cls,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: multi ? "checkbox" : "radio",
							name: `q-${item.itemId}`,
							value: o.id,
							checked,
							onChange: () => toggleOption(o.id)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
							source: o.text,
							inline: true
						}), check?.rationales?.[o.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "small muted",
							style: { display: "block" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
								source: check.rationales[o.id],
								inline: true
							})
						}) : null] })]
					}, o.id);
				})]
			}),
			check ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: check.correct ? "success" : "warning",
				children: check.correct ? t("attempt.checkCorrect") : t("attempt.checkIncorrect")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				style: { marginBlockStart: "var(--space-4)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						disabled: index === 0,
						onClick: () => goTo(index - 1),
						children: t("common.previous")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						disabled: index === items.length - 1,
						onClick: () => goTo(index + 1),
						children: t("common.next")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						"aria-pressed": item.flagged,
						disabled: expired,
						onClick: () => void persist({
							...item,
							flagged: !item.flagged
						}),
						children: item.flagged ? t("attempt.unflag") : t("attempt.flag")
					}), onCheck ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						disabled: item.selectedOptionIds.length === 0 || !!check,
						onClick: () => {
							onCheck(item.itemId).then((res) => setChecks((c) => ({
								...c,
								[item.itemId]: res
							})));
						},
						children: t("attempt.check")
					}) : null]
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "attempt-layout",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccommodationNotice, {
					extraTimePercent: attempt.extraTimePercent ?? null,
					untimed: !!attempt.untimed
				}), paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "info",
					title: t("exams.pause.pausedTitle"),
					children: t("exams.pause.pausedBody")
				}) : exhibit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseExhibit, {
					exhibit,
					children: question
				}) : question]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "card stack",
				"aria-label": t("attempt.navigator"),
				children: [
					shown !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "small muted",
						children: t("attempt.timeLeft")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: shown < 6e4 ? "timer timer--low" : "timer",
						role: "timer",
						"aria-live": shown < 6e4 && !paused ? "assertive" : "off",
						"data-testid": "timer",
						children: formatCountdown(shown)
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("assessment.untimed")
					}),
					attempt.pause?.allowPause && attempt.deadlineAt && (onPause || onResume) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseControls, {
						pause: attempt.pause,
						onPause: async () => {
							if (!onPause) return;
							setAttempt(await onPause());
						},
						onResume: async () => {
							if (!onResume) return;
							setAttempt(await onResume());
						}
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						"aria-live": "polite",
						children: saveState === "saving" ? t("attempt.saving") : saveState === "saved" ? t("attempt.saved") : saveState === "error" ? t("attempt.saveError") : t("attempt.autosave")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "navigator",
						children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => goTo(i),
							"aria-current": i === index ? "true" : void 0,
							"data-answered": it.selectedOptionIds.length > 0,
							"data-flagged": it.flagged,
							"aria-label": t("attempt.navItem", {
								n: i + 1,
								state: [it.selectedOptionIds.length > 0 ? t("attempt.answered") : t("attempt.unanswered"), it.flagged ? t("attempt.flagged") : ""].filter(Boolean).join(", ")
							}),
							children: i + 1
						}) }, it.itemId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setConfirmOpen(true),
						loading: submitting,
						disabled: paused,
						children: t("attempt.submit")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmOpen,
				title: t("attempt.confirmTitle"),
				confirmLabel: t("attempt.submit"),
				loading: submitting,
				onCancel: () => setConfirmOpen(false),
				onConfirm: () => {
					setConfirmOpen(false);
					onSubmit();
				},
				body: unanswered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("attempt.confirmAllAnswered") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("attempt.confirmUnanswered", { n: unanswered.length }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "row",
					style: {
						listStyle: "none",
						padding: 0
					},
					"aria-label": t("attempt.unansweredList"),
					children: unanswered.map(({ it, n }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "warning",
						children: t("attempt.qn", { n })
					}) }, it.itemId))
				})] })
			})
		]
	});
}
//#endregion
//#region src/pages/assessment/AttemptPage.tsx
function toResult(r) {
	return {
		...r,
		review: r.review?.map((i) => ({
			...i,
			rationales: i.rationales ?? (i.options ?? []).filter((o) => o.rationale).map((o) => ({
				optionId: o.id,
				text: o.rationale
			}))
		}))
	};
}
/** GET /api/attempts/{id} returns `{ attempt, result }`; the page works with one flattened view. */
function toAttemptView(d) {
	if ("attempt" in d) return {
		...d.attempt,
		result: d.result ? toResult(d.result) : null
	};
	return d;
}
function rationaleFor(review, optionId) {
	const r = review.rationales;
	if (!r) return void 0;
	if (Array.isArray(r)) return r.find((x) => x.optionId === optionId)?.text;
	return r[optionId];
}
function AttemptResultView({ result, items, attemptId, assessmentId }) {
	const { t } = useI18n();
	const byId = new Map(items.map((i) => [i.itemId, i]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "small muted",
							children: t("result.score")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "score",
							children: [Math.round(result.scorePercent * 10) / 10, "%"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: result.passed ? "success" : "danger",
							children: result.passed ? t("result.passed") : t("result.notPassed")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "meter",
						role: "img",
						"aria-label": t("result.meter", {
							score: result.scorePercent,
							pass: result.passPercent
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { inlineSize: `${Math.min(100, Math.max(0, result.scorePercent))}%` } })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						style: { marginBlockStart: "var(--space-2)" },
						children: t("result.passThreshold", { pass: result.passPercent })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "facts",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("result.correct") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: result.correct })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("result.incorrect") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: result.incorrect })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("result.unanswered") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: result.unanswered })] })
						]
					}),
					result.certificateCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "success",
						title: t("result.certificateTitle"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/verify/${encodeURIComponent(result.certificateCode)}`,
							children: t("result.viewCertificate")
						})
					}) : null,
					result.regraded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "info",
						children: t("exams.result.regraded")
					}) : null,
					assessmentId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NegativeMarkingResultNotice, {
						assessmentId,
						incorrect: result.incorrect
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: result.readinessDisclaimer ?? t("result.disclaimer")
					})
				]
			}),
			attemptId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecommendationsPanel, { attemptId }) : null,
			result.topics.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("result.topics") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("result.topic")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("result.correct")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("result.percent")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: result.topics.map((tp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: tp.tag }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								tp.correct,
								" / ",
								tp.total
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [tp.total ? Math.round(tp.correct / tp.total * 100) : 0, "%"] })
						] }, tp.tag)) })]
					})
				})]
			}) : null,
			result.review && result.review.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("result.review") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "stack",
					children: result.review.map((r) => {
						const item = byId.get(r.itemId);
						const selected = r.selectedOptionIds ?? item?.selectedOptionIds ?? [];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { fontWeight: 600 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, { source: r.stem ?? item?.stem ?? "" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: r.correct ? "success" : "danger",
										children: r.correct ? t("result.itemCorrect") : t("result.itemIncorrect")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								style: {
									listStyle: "none",
									padding: 0
								},
								children: (item?.options ?? []).map((o) => {
									const isCorrect = r.correctOptionIds.includes(o.id);
									const chosen = selected.includes(o.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: isCorrect ? "option option--correct" : chosen ? "option option--incorrect" : "option",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
												source: o.text,
												inline: true
											}),
											" ",
											chosen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("result.yourAnswer") }) : null,
											" ",
											isCorrect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "success",
												children: t("result.correctAnswer")
											}) : null
										] }), rationaleFor(r, o.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "small muted",
											style: { display: "block" },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
												source: rationaleFor(r, o.id) ?? "",
												inline: true
											})
										}) : null] })
									}, o.id);
								})
							}),
							r.explanation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "small",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, { source: r.explanation })
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkedSolutionPanel, { source: r.workedSolution }),
							attemptId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkItemButton, {
									source: "attempt",
									ownerId: attemptId,
									itemId: r.itemId
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChallengeButton, { path: `/api/attempts/${attemptId}/items/${r.itemId}/challenge` })]
							}) : null
						] }, r.itemId);
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted small",
				children: t("result.reviewWithheld")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/me",
					variant: "secondary",
					children: t("nav.dashboard")
				})
			})
		]
	});
}
function AttemptPage() {
	const { id = "" } = useParams();
	const { t } = useI18n();
	const toast = useToast();
	const qc = useQueryClient();
	usePageMeta(t("attempt.title"), void 0, { noindex: true });
	const attempt = useQuery({
		queryKey: ["attempt", id],
		queryFn: () => api(`/api/attempts/${id}`).then(toAttemptView),
		staleTime: Infinity,
		refetchOnWindowFocus: false
	});
	const [result, setResult] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const chain = (0, import_react.useRef)(Promise.resolve());
	const onSave = (0, import_react.useCallback)((itemId, selectedOptionIds, flagged) => {
		const next = chain.current.then(() => api(`/api/attempts/${id}/items/${itemId}`, {
			method: "PUT",
			body: {
				selectedOptionIds,
				flagged
			}
		}));
		chain.current = next.catch(() => void 0);
		return next.then(() => void 0);
	}, [id]);
	const onSubmit = (0, import_react.useCallback)(async () => {
		setSubmitting(true);
		try {
			await chain.current;
			const res = await api(`/api/attempts/${id}/submit`, { method: "POST" });
			setResult(toResult(res));
			qc.invalidateQueries({ queryKey: keys.dashboard });
			window.scrollTo({ top: 0 });
		} catch (e) {
			toast.error(errorMessage(e, t));
		} finally {
			setSubmitting(false);
		}
	}, [
		id,
		qc,
		toast,
		t
	]);
	const onCheck = (0, import_react.useCallback)((itemId) => api(`/api/attempts/${id}/items/${itemId}/check`, { method: "POST" }).then((c) => ({
		...c,
		rationales: Array.isArray(c.rationales) ? Object.fromEntries(c.rationales.map((r) => [r.optionId, r.rationale])) : c.rationales
	})), [id]);
	const onPause = (0, import_react.useCallback)(() => api(`/api/attempts/${id}/pause`, { method: "POST" }), [id]);
	const onResume = (0, import_react.useCallback)(() => api(`/api/attempts/${id}/resume`, { method: "POST" }), [id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: attempt,
			children: (a) => {
				const finalResult = result ?? a.result ?? null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: a.assessmentTitle ?? t("attempt.title"),
					subtitle: finalResult ? t("result.title") : a.mode ? t(`assessment.mode.${a.mode}`) : void 0
				}), finalResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttemptResultView, {
					result: finalResult,
					items: a.items,
					attemptId: a.id,
					assessmentId: a.assessmentId
				}) : a.status !== "InProgress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "info",
					children: t("attempt.closed")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttemptPlayer, {
					attempt: a,
					onSave,
					onSubmit,
					onCheck: a.mode === "Practice" ? onCheck : void 0,
					submitting,
					onPause,
					onResume
				})] });
			}
		})
	});
}
//#endregion
export { AttemptPage };

//# sourceMappingURL=AttemptPage--3xkjJOs.js.map