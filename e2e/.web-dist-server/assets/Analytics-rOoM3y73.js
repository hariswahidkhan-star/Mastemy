import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { r as WsError, y as wsKeys } from "./common-BCMvJ35x.js";
import { a as QueryState, r as PageHeader } from "./misc-Bqc6tFVU.js";
import { i as Select, n as Field } from "./Field-Di1lkoGg.js";
import { t as AiUsagePanel } from "./Admin-dhDMd3wJ.js";
import { i as StatTile, n as DataTable, r as MeterList, t as ColumnChart } from "./Charts-DY-b3wT1.js";
//#region src/pages/workspace/Analytics.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var RANGES = [
	{
		days: 30,
		bucket: "day"
	},
	{
		days: 90,
		bucket: "week"
	},
	{
		days: 365,
		bucket: "month"
	}
];
function rangeQuery(days, bucket) {
	const to = /* @__PURE__ */ new Date();
	return `from=${(/* @__PURE__ */ new Date(to.getTime() - days * 864e5)).toISOString().slice(0, 10)}&to=${to.toISOString().slice(0, 10)}&bucket=${bucket}`;
}
function RangePicker({ value, onChange }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label: t("workspace.analytics.range"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
			value: String(value),
			onChange: (e) => onChange(Number(e.target.value)),
			options: RANGES.map((r) => ({
				value: String(r.days),
				label: t("workspace.analytics.lastDays", { n: r.days })
			}))
		})
	});
}
function pct(n, fmt) {
	return n == null ? "—" : `${fmt(Math.round(n * 10) / 10)}%`;
}
/** One chart per currency (never mix currencies on one axis). */
function RevenueCharts({ rows, title }) {
	const { fmtMoney } = useI18n();
	const currencies = [...new Set(rows.map((r) => r.currency))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: currencies.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColumnChart, {
		title: `${title} (${c})`,
		format: (n) => fmtMoney(n, c),
		points: rows.filter((r) => r.currency === c).map((r) => ({
			label: r.bucket,
			value: r.amount
		}))
	}, c)) });
}
function LedgerTable({ rows, caption }) {
	const { t, fmtMoney, fmtNumber } = useI18n();
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "muted small",
		children: t("workspace.charts.noData")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "table-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "table",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
					className: "visually-hidden",
					children: caption
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("workspace.analytics.kind")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("workspace.analytics.gross")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("workspace.analytics.instructor")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("workspace.analytics.platform")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("workspace.analytics.entries")
					})
				] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.kind }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(r.gross, r.currency) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(r.instructorAmount, r.currency) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(r.platformAmount, r.currency) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtNumber(r.entries) })
				] }, `${r.currency}-${r.kind}`)) })
			]
		})
	});
}
function CourseAnalyticsPanel({ course }) {
	const { t, fmtNumber } = useI18n();
	const [days, setDays] = (0, import_react.useState)(30);
	const range = RANGES.find((r) => r.days === days) ?? RANGES[0];
	const q = rangeQuery(range.days, range.bucket);
	const data = useQuery({
		queryKey: wsKeys.courseAnalytics(course.id, q),
		queryFn: () => api(`/api/studio/courses/${course.id}/analytics?${q}`),
		retry: false
	});
	if (data.isError) return data.error instanceof ApiError && data.error.status === 403 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: data.error }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: data,
		children: () => null
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangePicker, {
			value: days,
			onChange: setDays
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: data,
			children: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ws-stats",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.analytics.enrollments"),
								value: fmtNumber(a.enrollmentsInRange),
								hint: t("workspace.analytics.total", { n: fmtNumber(a.totalEnrollments) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.analytics.active"),
								value: fmtNumber(a.activeLearnersInRange)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.analytics.avgProgress"),
								value: pct(a.averageProgressPercent, fmtNumber)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.analytics.refundRate"),
								value: pct(a.refunds.refundRatePercent, fmtNumber),
								hint: t("workspace.analytics.refundCounts", {
									refunded: fmtNumber(a.refunds.refundedOrders),
									paid: fmtNumber(a.refunds.paidOrders)
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColumnChart, {
						title: t("workspace.analytics.enrollmentsOverTime"),
						points: a.enrollmentsOverTime.map((p) => ({
							label: p.bucket,
							value: p.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColumnChart, {
						title: t("workspace.analytics.activeOverTime"),
						points: a.activeLearnersOverTime.map((p) => ({
							label: p.bucket,
							value: p.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeterList, {
						title: t("workspace.analytics.funnel"),
						rows: a.completionFunnel.map((f) => ({
							key: f.lessonId,
							label: `${f.moduleTitle} › ${f.lessonTitle}`,
							value: f.completed,
							max: Math.max(f.started, f.completed),
							text: t("workspace.analytics.funnelRow", {
								started: fmtNumber(f.started),
								completed: fmtNumber(f.completed)
							})
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("workspace.analytics.conversion") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ws-stats",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: t("workspace.analytics.views"),
									value: fmtNumber(a.conversion.courseViewVisitors)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: t("workspace.analytics.viewToEnroll"),
									value: pct(a.conversion.viewToEnrollPercent, fmtNumber)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: t("workspace.analytics.purchases"),
									value: fmtNumber(a.conversion.purchases)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: t("workspace.analytics.enrollToPurchase"),
									value: pct(a.conversion.enrollToPurchasePercent, fmtNumber)
								})
							]
						}),
						a.conversion.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: a.conversion.note
						}) : null
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("workspace.analytics.assessments") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
							caption: t("workspace.analytics.assessments"),
							head: [
								t("workspace.analytics.assessment"),
								t("workspace.analytics.attempts"),
								t("workspace.analytics.passRate"),
								t("workspace.analytics.avgScore")
							],
							rows: a.assessments.map((s) => [
								s.title,
								fmtNumber(s.attempts),
								pct(s.passRatePercent, fmtNumber),
								pct(s.averageScorePercent, fmtNumber)
							])
						}),
						a.assessments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted small",
							children: t("workspace.charts.noData")
						}) : null
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("workspace.analytics.revenue") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevenueCharts, {
							rows: a.revenueOverTime,
							title: t("workspace.analytics.revenueOverTime")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerTable, {
							rows: a.revenue,
							caption: t("workspace.analytics.revenue")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t("workspace.analytics.myEarnings") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerTable, {
							rows: a.myEarnings,
							caption: t("workspace.analytics.myEarnings")
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionStatsTable, { courseId: course.id })
				]
			})
		})]
	});
}
function QuestionStatsTable({ courseId }) {
	const { t, fmtNumber } = useI18n();
	const stats = useQuery({
		queryKey: wsKeys.questionStats(courseId),
		queryFn: () => api(`/api/studio/courses/${courseId}/analytics/questions`)
	});
	const [sortHard, setSortHard] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "row row--between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("workspace.analytics.questionStats") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "ghost",
			onClick: () => setSortHard((v) => !v),
			"aria-pressed": sortHard,
			children: t("workspace.analytics.hardestFirst")
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: stats,
		children: (rows) => {
			if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted small",
				children: t("workspace.charts.noData")
			});
			const sorted = sortHard ? [...rows].sort((x, y) => (x.fullCreditPercent ?? 101) - (y.fullCreditPercent ?? 101)) : rows;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
							className: "visually-hidden",
							children: t("workspace.analytics.questionStats")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("workspace.analytics.question")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("workspace.analytics.answered")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("workspace.analytics.fullCredit")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("workspace.analytics.avgPoints")
							})
						] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sorted.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "mono",
								children: r.externalId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtNumber(r.answered) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: pct(r.fullCreditPercent, fmtNumber) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.averagePoints == null ? "—" : fmtNumber(Math.round(r.averagePoints * 100) / 100) })
						] }, r.questionId)) })
					]
				})
			});
		}
	})] });
}
function AdminDashboardPage() {
	const { t, fmtNumber, fmtMoney, fmtDate } = useI18n();
	usePageMeta(t("workspace.dashboard.title"), void 0, { noindex: true });
	const [days, setDays] = (0, import_react.useState)(30);
	const range = RANGES.find((r) => r.days === days) ?? RANGES[0];
	const q = rangeQuery(range.days, range.bucket);
	const data = useQuery({
		queryKey: wsKeys.adminDashboard(q),
		queryFn: () => api(`/api/admin/analytics/dashboard?${q}`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("workspace.dashboard.title") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangePicker, {
			value: days,
			onChange: setDays
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: data,
			children: (d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ws-stats",
						"data-testid": "admin-stats",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.dashboard.users"),
								value: fmtNumber(d.totalUsers)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.dashboard.signups"),
								value: fmtNumber(d.newSignupsInRange)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.dashboard.active"),
								value: fmtNumber(d.activeLearnersInRange)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.dashboard.published"),
								value: fmtNumber(d.publishedCourses)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.dashboard.pendingRefunds"),
								value: fmtNumber(d.pendingRefundRequests)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
								label: t("workspace.dashboard.aiUsage"),
								value: d.aiUsage == null ? t("workspace.dashboard.notTracked") : fmtNumber(d.aiUsage.calls)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiUsagePanel, { usage: d.aiUsage }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColumnChart, {
						title: t("workspace.dashboard.signupsOverTime"),
						points: d.signupsOverTime.map((p) => ({
							label: p.bucket,
							value: p.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColumnChart, {
						title: t("workspace.dashboard.activeOverTime"),
						points: d.activeLearnersOverTime.map((p) => ({
							label: p.bucket,
							value: p.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevenueCharts, {
						rows: d.revenueOverTime,
						title: t("workspace.analytics.revenueOverTime")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("workspace.dashboard.orders") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
							caption: t("workspace.dashboard.orders"),
							head: [
								t("workspace.dashboard.currency"),
								t("workspace.dashboard.count"),
								t("workspace.dashboard.amount")
							],
							rows: d.ordersByCurrency.map((o) => [
								o.currency,
								fmtNumber(o.count),
								fmtMoney(o.amount, o.currency)
							])
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
							caption: t("workspace.dashboard.refunds"),
							head: [
								t("workspace.dashboard.currency"),
								t("workspace.dashboard.count"),
								t("workspace.dashboard.amount")
							],
							rows: d.refundsByCurrency.map((o) => [
								o.currency,
								fmtNumber(o.count),
								fmtMoney(o.amount, o.currency)
							])
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("workspace.dashboard.queues") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("workspace.dashboard.q.courses", { n: d.reviewQueues.coursesInReview }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("workspace.dashboard.q.qReview", { n: d.reviewQueues.questionsAwaitingReview }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("workspace.dashboard.q.qApproval", { n: d.reviewQueues.questionsAwaitingApproval }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("workspace.dashboard.q.applications", { n: d.reviewQueues.instructorApplications }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("workspace.dashboard.q.refunds", { n: d.reviewQueues.refundRequests }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("workspace.dashboard.q.uploads", { n: d.reviewQueues.uploadApprovals }) })
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("workspace.dashboard.repair", { n: d.videosNeedingRepair }) }),
						d.videosNeedingRepairSample.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: t("workspace.charts.noData")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: d.videosNeedingRepairSample.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							v.title,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono small",
								children: v.youTubeVideoId
							}),
							" · ",
							v.status,
							v.reason ? ` · ${v.reason}` : ""
						] }, v.id)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/operations",
							children: t("workspace.ops.title")
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("workspace.dashboard.overdue", {
						n: d.overdueContentUpdates,
						months: d.contentReviewMonths
					}) }), d.overdueContentSample.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("workspace.charts.noData")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: d.overdueContentSample.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						c.title,
						" (",
						c.code,
						") · ",
						fmtDate(c.lastPublishedAt)
					] }, c.id)) })] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small muted",
			children: t("workspace.dashboard.cacheNote")
		})
	] });
}
//#endregion
export { CourseAnalyticsPanel as n, AdminDashboardPage as t };

//# sourceMappingURL=Analytics-rOoM3y73.js.map