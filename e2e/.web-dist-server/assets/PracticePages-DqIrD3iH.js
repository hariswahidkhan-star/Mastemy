import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, n as ButtonLink, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, n as Notice, o as QueryStatus, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation, s as useDashboard } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { t as RichContent } from "./RichContent-C3Tst1Ll.js";
import { d as useMyChallenges, f as usePracticeSessions, l as useDueReviews, o as useBookmarks, r as examKeys } from "./exams-ZvNkLj9c.js";
import { n as CaseExhibit, r as ChallengeButton } from "./AttemptExtras-o3GN-tp5.js";
import { a as SelfGradePanel, s as WorkedSolutionPanel, t as BookmarkItemButton } from "./Learning-DLGEO_vT.js";
import { n as isPremiumError, t as examError } from "./examErrors-ngodnTsv.js";
//#region src/pages/exams/PracticePages.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var DIFFICULTIES = [
	"Easy",
	"Medium",
	"Hard"
];
var splitList = (s) => s.split(/[,;\n]/).map((x) => x.trim()).filter(Boolean);
/** /practice: entry points (builder, mistakes, bookmarks, review), recent sessions, my challenges. */
function PracticeHubPage() {
	const { t, fmtDate } = useI18n();
	usePageMeta(t("exams.practice.title"), void 0, { noindex: true });
	const sessions = usePracticeSessions();
	const bookmarks = useBookmarks();
	const challenges = useMyChallenges();
	const due = useDueReviews();
	const toast = useToast();
	const removeBookmark = useApiMutation((questionId) => api(`/api/me/question-bookmarks/${questionId}`, { method: "DELETE" }), [examKeys.bookmarks], () => toast.success(t("exams.bookmarks.removed")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("exams.practice.title"),
				subtitle: t("exams.practice.subtitle"),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/practice/session/new",
							children: t("exams.practice.new")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/practice/session/new?preset=mistakes",
							variant: "secondary",
							children: t("exams.practice.mistakes")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/review",
							variant: "secondary",
							children: t("exams.review.link", { n: due.data?.length ?? 0 })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "ps-h",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "ps-h",
					children: t("exams.practice.recent")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: sessions,
					children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("exams.practice.noSessions")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "stack",
						style: {
							listStyle: "none",
							padding: 0
						},
						children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "row row--between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/practice/sessions/${s.id}`,
									children: t("exams.practice.sessionOf", { date: fmtDate(s.createdAt) })
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted",
									children: t("exams.practice.answered", {
										a: s.answered,
										n: s.items
									})
								})
							] }), s.finishedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: t("exams.practice.finished")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "info",
								children: t("exams.practice.open")
							})]
						}, s.id))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "bm-h",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row row--between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "bm-h",
							children: t("exams.bookmarks.title")
						}), bookmarks.data && bookmarks.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							size: "sm",
							variant: "secondary",
							to: "/practice/session/new?preset=bookmarked",
							children: t("exams.bookmarks.practise")
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
						query: bookmarks,
						children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: t("exams.bookmarks.none")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "stack",
							style: {
								listStyle: "none",
								padding: 0
							},
							children: list.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
									source: b.stem,
									className: "small"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									loading: removeBookmark.isPending && removeBookmark.variables === b.questionId,
									onClick: () => removeBookmark.mutate(b.questionId, { onError: (e) => toast.error(examError(e, t)) }),
									children: t("exams.bookmarks.remove")
								})]
							}, b.questionId))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("exams.bookmarks.how")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "ch-h",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "ch-h",
					children: t("exams.challenge.mine")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: challenges,
					children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("exams.challenge.noneMine")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "stack",
						style: {
							listStyle: "none",
							padding: 0
						},
						children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: c.status === "Open" ? "info" : "success",
								children: t(`exams.challenge.status.${c.status}`)
							}),
							" ",
							c.resolution ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`exams.challenge.resolution.${c.resolution}`) }) : null,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small",
								children: c.reason
							}),
							c.resolutionNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "small muted",
								children: [
									t("exams.challenge.note"),
									": ",
									c.resolutionNote
								]
							}) : null
						] }, c.id))
					})
				})]
			})
		]
	});
}
/** /practice/session/new: filters → POST /api/practice/sessions. */
function PracticeBuilderPage() {
	const { t } = useI18n();
	usePageMeta(t("exams.builder.title"), void 0, { noindex: true });
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const preset = params.get("preset");
	const dashboard = useDashboard();
	const [courseIds, setCourseIds] = (0, import_react.useState)([]);
	const [topics, setTopics] = (0, import_react.useState)("");
	const [skills, setSkills] = (0, import_react.useState)("");
	const [objectives, setObjectives] = (0, import_react.useState)("");
	const [difficulties, setDifficulties] = (0, import_react.useState)([]);
	const [unseenOnly, setUnseen] = (0, import_react.useState)(false);
	const [previousMistakes, setMistakes] = (0, import_react.useState)(preset === "mistakes");
	const [bookmarkedOnly, setBookmarked] = (0, import_react.useState)(preset === "bookmarked");
	const [dueForReview, setDue] = (0, import_react.useState)(preset === "due");
	const [count, setCount] = (0, import_react.useState)(20);
	const create = useApiMutation((body) => api("/api/practice/sessions", {
		method: "POST",
		body
	}), [examKeys.practiceSessions], (s) => navigate(`/practice/sessions/${s.id}`));
	const courses = dashboard.data?.enrollments.map((e) => e.course) ?? [];
	const countValid = Number.isInteger(count) && count >= 1 && count <= 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("exams.builder.title"),
				subtitle: t("exams.builder.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: dashboard }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card stack",
				noValidate: true,
				onSubmit: (e) => {
					e.preventDefault();
					if (!countValid) return;
					create.mutate({
						courseIds: courseIds.length ? courseIds : void 0,
						topics: splitList(topics),
						skills: splitList(skills),
						objectives: splitList(objectives),
						difficulties,
						unseenOnly,
						previousMistakes,
						bookmarkedOnly,
						dueForReview,
						count
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "stack",
						style: {
							border: "none",
							padding: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "field__label",
								children: t("exams.builder.courses")
							}),
							courses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("exams.builder.allCourses")
							}) : courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								label: c.title,
								checked: courseIds.includes(c.id),
								onChange: (e) => setCourseIds((ids) => e.target.checked ? [...ids, c.id] : ids.filter((x) => x !== c.id))
							}, c.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("exams.builder.coursesHint")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "split",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("exams.builder.topics"),
								hint: t("exams.builder.listHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: topics,
									onChange: (e) => setTopics(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("exams.builder.skills"),
								hint: t("exams.builder.listHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: skills,
									onChange: (e) => setSkills(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("exams.builder.objectives"),
								hint: t("exams.builder.listHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: objectives,
									onChange: (e) => setObjectives(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("exams.builder.count"),
								error: countValid ? void 0 : t("exams.builder.countRule"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									max: 100,
									value: Number.isNaN(count) ? "" : count,
									onChange: (e) => setCount(e.target.valueAsNumber)
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "row",
						style: {
							border: "none",
							padding: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "field__label",
							children: t("exams.builder.difficulty")
						}), DIFFICULTIES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							label: t(`question.${d}`),
							checked: difficulties.includes(d),
							onChange: (e) => setDifficulties((ds) => e.target.checked ? [...ds, d] : ds.filter((x) => x !== d))
						}, d))]
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
								children: t("exams.builder.focus")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								label: t("exams.builder.unseen"),
								checked: unseenOnly,
								onChange: (e) => setUnseen(e.target.checked)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								label: t("exams.builder.mistakes"),
								checked: previousMistakes,
								onChange: (e) => setMistakes(e.target.checked)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								label: t("exams.builder.bookmarked"),
								checked: bookmarkedOnly,
								onChange: (e) => setBookmarked(e.target.checked)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								label: t("exams.builder.due"),
								checked: dueForReview,
								onChange: (e) => setDue(e.target.checked)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "info",
						title: t("exams.builder.premiumTitle"),
						children: t("exams.builder.premiumBody")
					}),
					create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: isPremiumError(create.error) ? "warning" : "danger",
						children: examError(create.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							loading: create.isPending,
							disabled: !countValid,
							children: t("exams.builder.start")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: "/practice",
							variant: "secondary",
							children: t("common.cancel")
						})]
					})
				]
			})
		]
	});
}
function PracticeItemCard({ sessionId, item, n, total, finished, reviewMode }) {
	const { t } = useI18n();
	const [selected, setSelected] = (0, import_react.useState)(item.selectedOptionIds);
	const [check, setCheck] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const locked = finished || item.checked || !!check;
	const multi = item.type === "MultipleSelect";
	const choose = async (optionId) => {
		if (locked) return;
		const next = multi ? selected.includes(optionId) ? selected.filter((x) => x !== optionId) : [...selected, optionId] : [optionId];
		setSelected(next);
		setError(null);
		try {
			await api(`/api/practice/sessions/${sessionId}/items/${item.itemId}`, {
				method: "PUT",
				body: { selectedOptionIds: next }
			});
		} catch (e) {
			setError(e);
		}
	};
	const doCheck = async () => {
		setBusy(true);
		setError(null);
		try {
			setCheck(await api(`/api/practice/sessions/${sessionId}/items/${item.itemId}/check`, { method: "POST" }));
		} catch (e) {
			setError(e);
		} finally {
			setBusy(false);
		}
	};
	const rationale = (id) => check?.rationales.find((r) => r.optionId === id)?.rationale;
	const quality = check ? check.correct ? 4 : selected.some((s) => check.correctOptionIds.includes(s)) ? 3 : 1 : null;
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card question",
		"aria-labelledby": `pq-${item.itemId}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: `pq-${item.itemId}`,
					style: {
						margin: 0,
						fontSize: "var(--text-md)"
					},
					children: t("attempt.questionOf", {
						n,
						total
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: multi ? "warning" : "neutral",
					children: multi ? t("attempt.multiple") : t("attempt.single")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				disabled: locked,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
					source: item.stem,
					inline: true
				}) }), item.options.map((o) => {
					const isRight = check?.correctOptionIds.includes(o.id);
					const chosen = selected.includes(o.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: check ? isRight ? "option option--correct" : chosen ? "option option--incorrect" : "option" : "option",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: multi ? "checkbox" : "radio",
							name: `p-${item.itemId}`,
							checked: chosen,
							onChange: () => void choose(o.id)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
							source: o.text,
							inline: true
						}), rationale(o.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "small muted",
							style: { display: "block" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
								source: rationale(o.id) ?? "",
								inline: true
							})
						}) : null] })]
					}, o.id);
				})]
			}),
			check ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
					tone: check.correct ? "success" : "warning",
					children: [check.correct ? t("attempt.checkCorrect") : t("attempt.checkIncorrect"), reviewMode && quality !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { display: "block" },
						className: "small",
						children: t(`exams.review.graded${quality}`)
					}) : null]
				}),
				check.explanation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
					source: check.explanation,
					className: "small"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkedSolutionPanel, { source: check.workedSolution }),
				!finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelfGradePanel, {
					sessionId,
					itemId: item.itemId,
					initial: item.selfGrade
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkItemButton, {
						source: "practice",
						ownerId: sessionId,
						itemId: item.itemId
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChallengeButton, { path: `/api/practice/sessions/${sessionId}/items/${item.itemId}/challenge` })]
				})
			] }) : item.checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("exams.practice.alreadyChecked")
				}),
				!finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelfGradePanel, {
					sessionId,
					itemId: item.itemId,
					initial: item.selfGrade
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkItemButton, {
					source: "practice",
					ownerId: sessionId,
					itemId: item.itemId
				})
			] }) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: isPremiumError(error) ? "warning" : "danger",
				children: examError(error, t)
			}) : null,
			!locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row",
				children: reviewMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					loading: busy,
					disabled: selected.length === 0,
					onClick: () => void doCheck(),
					children: t("exams.review.grade")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					loading: busy,
					disabled: selected.length === 0,
					onClick: () => void doCheck(),
					children: t("attempt.check")
				})
			}) : null
		]
	});
	if (item.caseGroupId && item.caseExhibitMarkdown) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseExhibit, {
		exhibit: {
			title: item.caseTitle ?? "",
			exhibitMarkdown: item.caseExhibitMarkdown
		},
		children: body
	});
	return body;
}
/** /practice/sessions/:id — answer, check (locks the item), finish for a full review. */
function PracticeSessionPage() {
	const { id = "" } = useParams();
	const { t } = useI18n();
	usePageMeta(t("exams.practice.session"), void 0, { noindex: true });
	const [params] = useSearchParams();
	const reviewMode = params.get("mode") === "review";
	const qc = useQueryClient();
	const session = useQuery({
		queryKey: examKeys.practiceSession(id),
		queryFn: () => api(`/api/practice/sessions/${id}`),
		staleTime: Infinity,
		refetchOnWindowFocus: false
	});
	const [result, setResult] = (0, import_react.useState)(null);
	const finish = useApiMutation(() => api(`/api/practice/sessions/${id}/finish`, { method: "POST" }), [examKeys.practiceSessions, examKeys.due], (r) => {
		setResult(r);
		qc.invalidateQueries({ queryKey: examKeys.practiceSession(id) });
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page stack",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: session,
			children: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: reviewMode ? t("exams.review.title") : t("exams.practice.session"),
				subtitle: t("exams.practice.sessionSubtitle", { n: s.items.length })
			}), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeResultView, {
				result,
				sessionId: s.id
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				s.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticeItemCard, {
					sessionId: s.id,
					item: it,
					n: i + 1,
					total: s.items.length,
					finished: !!s.finishedAt,
					reviewMode
				}, it.itemId)),
				finish.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: examError(finish.error, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						loading: finish.isPending,
						onClick: () => finish.mutate(void 0),
						children: s.finishedAt ? t("exams.practice.showReview") : t("exams.practice.finish")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/practice",
						variant: "secondary",
						children: t("exams.practice.back")
					})]
				})
			] })] })
		})
	});
}
function PracticeResultView({ result, sessionId }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("exams.practice.resultTitle") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "facts",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("result.correct") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							"data-testid": "practice-correct",
							children: [
								result.correct,
								" / ",
								result.total
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("exams.practice.answeredLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: result.answered })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						title: t("exams.rec.notGuarantee"),
						children: result.readinessDisclaimer
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("result.review") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "stack",
					children: result.review.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { fontWeight: 600 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, { source: r.stem }),
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
							children: r.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: o.isCorrect ? "option option--correct" : o.selected ? "option option--incorrect" : "option",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
										source: o.text,
										inline: true
									}),
									" ",
									o.selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("result.yourAnswer") }) : null,
									" ",
									o.isCorrect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "success",
										children: t("result.correctAnswer")
									}) : null,
									o.rationale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "small muted",
										style: { display: "block" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
											source: o.rationale,
											inline: true
										})
									}) : null
								] })
							}, o.id))
						}),
						r.explanation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichContent, {
							source: r.explanation,
							className: "small"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkedSolutionPanel, { source: r.workedSolution }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkItemButton, {
								source: "practice",
								ownerId: sessionId,
								itemId: r.itemId
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChallengeButton, { path: `/api/practice/sessions/${sessionId}/items/${r.itemId}/challenge` })]
						})
					] }, r.itemId))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/practice/session/new?preset=mistakes",
					variant: "secondary",
					children: t("exams.practice.mistakes")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/practice",
					variant: "secondary",
					children: t("exams.practice.back")
				})]
			})
		]
	});
}
/** /review — SM-2 due queue. Grading happens by answering: the server maps correct/partial/wrong to quality 4/3/1. */
function ReviewDuePage() {
	const { t, fmtDate } = useI18n();
	usePageMeta(t("exams.review.title"), void 0, { noindex: true });
	const navigate = useNavigate();
	const due = useDueReviews();
	const toast = useToast();
	const start = useApiMutation((count) => api("/api/practice/sessions", {
		method: "POST",
		body: {
			dueForReview: true,
			count: Math.min(100, Math.max(1, count))
		}
	}), [examKeys.practiceSessions], (s) => navigate(`/practice/sessions/${s.id}?mode=review`));
	const bookmark = useApiMutation((questionId) => api(`/api/me/question-bookmarks/${questionId}`, { method: "PUT" }), [examKeys.bookmarks], () => toast.success(t("exams.bookmarks.added")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("exams.review.title"),
			subtitle: t("exams.review.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: due,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: t("exams.review.none"),
				description: t("exams.review.noneBody")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("exams.review.dueCount", { n: list.length }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("exams.review.how")
					}),
					start.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: examError(start.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						loading: start.isPending,
						onClick: () => start.mutate(list.length),
						children: t("exams.review.start")
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.review.dueAt")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.review.interval")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.review.reps")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("exams.review.ease")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									scope: "col",
									children: t("common.actions")
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(d.dueAt) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t("exams.review.days", { n: d.intervalDays }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: d.repetitions }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: d.easeFactor.toFixed(2) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => bookmark.mutate(d.questionId, { onError: (e) => toast.error(examError(e, t)) }),
									children: t("exams.bookmarks.add")
								}) })
							] }, d.questionId)) })]
						})
					})
				]
			})
		})]
	});
}
//#endregion
export { PracticeBuilderPage, PracticeHubPage, PracticeSessionPage, ReviewDuePage };

//# sourceMappingURL=PracticePages-DqIrD3iH.js.map