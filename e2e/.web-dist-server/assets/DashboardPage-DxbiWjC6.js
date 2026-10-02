import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, n as ButtonLink, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, l as errorMessage, n as Notice, o as QueryStatus, r as PageHeader, s as StatusBadge, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation, s as useDashboard, t as keys } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { c as useMyCertificates, m as w2keys } from "./wave2-rI7jjNgp.js";
import { a as Textarea, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { n as formatTimestamp } from "./format-B7uvlQ7u.js";
import { n as Dialog, t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { r as examKeys, u as useMyAccommodations } from "./exams-ZvNkLj9c.js";
import { r as SubscriptionsSection } from "./MeCommerce-CMTNczBH.js";
import { t as examError } from "./examErrors-ngodnTsv.js";
import { r as ContinueLearningSection } from "./Study-CQK2DfC3.js";
import { n as MyOrganizationsSection, t as CertificatesSection } from "./MeWave2-DqoxVVBB.js";
//#region src/pages/exams/CertificateRequests.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Dashboard section: request a certificate name correction (valid certificates) or appeal a revocation
* (revoked certificates), and follow the status of earlier requests. Also lists exam accommodations.
*/
function CertificateRequestsSection() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const certs = useMyCertificates();
	const corrections = useQuery({
		queryKey: examKeys.myCorrections,
		queryFn: () => api("/api/me/certificate-corrections")
	});
	const appeals = useQuery({
		queryKey: examKeys.myAppeals,
		queryFn: () => api("/api/me/certificate-appeals")
	});
	const accommodations = useMyAccommodations();
	const [mode, setMode] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [reason, setReason] = (0, import_react.useState)("");
	const submit = useApiMutation(() => mode?.kind === "correction" ? api(`/api/me/certificates/${mode.cert.id}/corrections`, {
		method: "POST",
		body: {
			requestedName: name.trim(),
			reason: reason.trim()
		}
	}) : api(`/api/me/certificates/${mode?.cert.id}/appeals`, {
		method: "POST",
		body: { reason: reason.trim() }
	}), [
		examKeys.myCorrections,
		examKeys.myAppeals,
		w2keys.myCertificates
	], () => {
		toast.success(mode?.kind === "correction" ? t("exams.certReq.correctionSent") : t("exams.certReq.appealSent"));
		setMode(null);
	});
	const open = (kind, cert) => {
		setMode({
			kind,
			cert
		});
		setName(cert.recipientName);
		setReason("");
		submit.reset();
	};
	const nameOk = name.trim().length >= 2 && name.trim().length <= 100;
	const reasonOk = mode?.kind === "appeal" ? reason.trim().length >= 10 && reason.trim().length <= 2e3 : reason.trim().length > 0;
	const pendingFor = (certId) => (corrections.data ?? []).some((c) => c.certificateId === certId && c.status === "Pending") || (appeals.data ?? []).some((a) => a.certificateId === certId && a.status === "Pending");
	const list = certs.data ?? [];
	const requests = [...(corrections.data ?? []).map((c) => ({
		...c,
		kind: "correction"
	})), ...(appeals.data ?? []).map((a) => ({
		...a,
		kind: "appeal"
	}))].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	const acc = accommodations.data ?? [];
	const failed = [
		certs,
		corrections,
		appeals
	].find((q) => q.isError);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, {
		query: failed,
		label: t("exams.certReq.title")
	});
	if (list.length === 0 && requests.length === 0 && acc.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card stack",
		"aria-labelledby": "cert-req-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "cert-req-h",
				children: t("exams.certReq.title")
			}),
			list.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "stack",
				style: {
					listStyle: "none",
					padding: 0
				},
				children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "row row--between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.courseTitle }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "small muted",
							children: [
								c.code,
								" · ",
								c.recipientName
							]
						})
					] }), pendingFor(c.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "info",
						children: t("exams.certReq.pending")
					}) : c.status === "Valid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						"aria-label": t("exams.certReq.correctFor", { course: c.courseTitle }),
						onClick: () => open("correction", c),
						children: t("exams.certReq.correct")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						"aria-label": t("exams.certReq.appealFor", { course: c.courseTitle }),
						onClick: () => open("appeal", c),
						children: t("exams.certReq.appeal")
					})]
				}, c.id))
			}) : null,
			requests.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("exams.certReq.history") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "stack",
				style: {
					listStyle: "none",
					padding: 0
				},
				children: requests.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "small",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: r.status === "Approved" ? "success" : r.status === "Rejected" ? "danger" : "info",
							children: t(`exams.requests.status.${r.status}`)
						}),
						" ",
						r.kind === "correction" && "requestedName" in r ? t("exams.requests.nameChange", {
							from: r.currentName,
							to: r.requestedName
						}) : t("exams.certReq.appealOf", { code: r.certificateCode }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "muted",
							children: fmtDate(r.createdAt)
						}),
						r.decisionNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "muted",
							children: r.decisionNote
						}) : null
					]
				}, r.id))
			})] }) : null,
			acc.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("exams.acc.mine") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "small",
				children: acc.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					a.untimed ? t("exams.acc.untimedShort") : t("exams.acc.extraShort", { n: a.extraTimePercent }),
					" ",
					"· ",
					a.assessmentId ? t("exams.acc.oneAssessment") : t("exams.acc.global")
				] }, a.id))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: mode !== null,
				title: mode?.kind === "correction" ? t("exams.certReq.correctTitle") : t("exams.certReq.appealTitle"),
				onClose: () => setMode(null),
				footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setMode(null),
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: submit.isPending,
					disabled: !reasonOk || mode?.kind === "correction" && !nameOk,
					onClick: () => submit.mutate(void 0),
					children: t("exams.certReq.send")
				})] }),
				children: [
					mode?.kind === "correction" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("exams.certReq.correctBody")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.certReq.newName"),
						error: nameOk ? void 0 : t("exams.certReq.nameRule"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							maxLength: 100,
							onChange: (e) => setName(e.target.value)
						})
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("exams.certReq.appealBody")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("exams.certReq.reason"),
						hint: mode?.kind === "appeal" ? t("exams.challenge.reasonHint") : void 0,
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							maxLength: 2e3,
							value: reason,
							onChange: (e) => setReason(e.target.value)
						})
					}),
					submit.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: examError(submit.error, t)
					}) : null
				]
			})
		]
	});
}
//#endregion
//#region src/pages/me/DashboardPage.tsx
function OrdersSection() {
	const { t, fmtDate, fmtMoney } = useI18n();
	const toast = useToast();
	const orders = useQuery({
		queryKey: ["me", "orders"],
		queryFn: () => api("/api/me/orders")
	});
	const [refunding, setRefunding] = (0, import_react.useState)(null);
	const request = useApiMutation((p) => api(`/api/me/orders/${p.id}/refund-request`, {
		method: "POST",
		body: { reason: p.reason }
	}), [["me", "orders"]], () => {
		setRefunding(null);
		toast.success(t("orders.refundRequested"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("orders.title") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: orders,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("orders.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
								children: t("orders.items")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("orders.total")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("dashboard.status")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("common.actions")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(o.paidAt ?? o.createdAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								i.packageTitle,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "small muted",
									children: ["· ", i.courseTitle]
								})
							] }, i.packageTitle + i.courseTitle)) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(o.total, o.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: o.status }),
								" ",
								o.refundStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("orders.refund", { status: t(`status.${o.refundStatus}`) }) }) : null
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.refundEligible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setRefunding({
									order: o,
									reason: ""
								}),
								children: t("orders.requestRefund")
							}) : null })
						] }, o.id)) })]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!refunding,
				title: t("orders.requestRefund"),
				body: refunding ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("course.defaultRefundTerms")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("orders.reason"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: refunding.reason,
							onChange: (e) => setRefunding({
								...refunding,
								reason: e.target.value
							})
						})
					}),
					request.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: errorMessage(request.error, t)
					}) : null
				] }) : null,
				confirmLabel: t("orders.submitRefund"),
				loading: request.isPending,
				onCancel: () => setRefunding(null),
				onConfirm: () => refunding?.reason.trim() && request.mutate({
					id: refunding.order.id,
					reason: refunding.reason.trim()
				})
			})
		]
	});
}
function DashboardPage() {
	const { t, fmtDate } = useI18n();
	const dash = useDashboard();
	const [params] = useSearchParams();
	const checkout = params.get("checkout");
	usePageMeta(t("dashboard.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("dashboard.title"),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/me/notes",
						variant: "secondary",
						children: t("dashboard.myNotes")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/me/wishlist",
						variant: "secondary",
						children: t("wishlist.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/me/notifications",
						variant: "secondary",
						children: t("notifications.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/orgs",
						variant: "secondary",
						children: t("orgs.title")
					})
				] })
			}),
			checkout === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "success",
				title: t("orders.checkoutSuccessTitle"),
				children: t("orders.checkoutSuccess")
			}) : checkout === "cancel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("orders.checkoutCancelled")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: dash,
				children: (d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stack",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContinueLearningSection, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyOrganizationsSection, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionsSection, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("dashboard.continue") }), d.enrollments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								title: t("dashboard.noEnrollments"),
								description: t("dashboard.noEnrollmentsBody"),
								action: {
									label: t("courses.title"),
									to: "/courses"
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "stack",
								style: {
									listStyle: "none",
									padding: 0
								},
								children: d.enrollments.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "row row--between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											flex: 1,
											minInlineSize: 200
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: `/courses/${e.course.slug}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: e.course.title })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "meter",
												role: "progressbar",
												"aria-valuemin": 0,
												"aria-valuemax": 100,
												"aria-valuenow": Math.round(e.progressPercent),
												"aria-label": t("dashboard.progress", { title: e.course.title }),
												style: { marginBlockStart: "var(--space-2)" },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { inlineSize: `${Math.min(100, e.progressPercent)}%` } })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "small muted",
												children: t("dashboard.percent", { n: Math.round(e.progressPercent) })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
										size: "sm",
										to: `/learn/${e.course.slug}${e.lastLessonId ? `/${e.lastLessonId}` : ""}`,
										children: e.lastLessonId ? t("dashboard.resume") : t("course.startWatching")
									})]
								}, e.course.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "card",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("dashboard.entitlements") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "small muted",
											children: t("dashboard.entitlementsNote")
										}),
										d.entitlements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "muted",
											children: t("dashboard.noEntitlements")
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "stack",
											style: {
												listStyle: "none",
												padding: 0
											},
											children: d.entitlements.map((en) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: en.packageTitle ?? en.course?.title ?? en.courseTitle ?? t("dashboard.package") }),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: en.source === "Purchase" ? "accent" : "neutral",
													children: t(`entitlement.${en.source}`)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "small muted",
													children: [
														en.course?.slug ?? en.courseSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
															to: `/courses/${en.course?.slug ?? en.courseSlug}`,
															children: en.course?.title ?? en.courseTitle
														}) : null,
														" ",
														en.endsAt ? t("dashboard.until", { date: fmtDate(en.endsAt) }) : t("dashboard.noExpiry")
													]
												})
											] }, en.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											style: { marginBlockStart: "var(--space-4)" },
											children: t("dashboard.freeEnrollments")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "small",
											children: t("dashboard.freeEnrollmentsBody", { n: d.enrollments.length })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificatesSection, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificateRequestsSection, {})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersSection, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("dashboard.attempts") }), d.recentAttempts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "muted",
								children: t("dashboard.noAttempts")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "table-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "table",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											children: t("dashboard.assessment")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											children: t("dashboard.status")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											children: t("result.score")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											scope: "col",
											children: t("dashboard.date")
										})
									] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: d.recentAttempts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: `/attempts/${a.id}`,
											children: a.assessmentTitle ?? t("attempt.title")
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status }),
											" ",
											a.passed === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "success",
												children: t("result.passed")
											}) : null
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.scorePercent != null ? `${Math.round(a.scorePercent)}%` : "—" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(a.submittedAt ?? a.startedAt) })
									] }, a.id)) })]
								})
							})]
						})
					]
				})
			})
		]
	});
}
function MyNotesPage() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [q, setQ] = (0, import_react.useState)("");
	const [search, setSearch] = (0, import_react.useState)("");
	const [exporting, setExporting] = (0, import_react.useState)(false);
	usePageMeta(t("notes.pageTitle"), void 0, { noindex: true });
	const notes = useQuery({
		queryKey: keys.notes({ q: search }),
		queryFn: () => api(`/api/me/notes${search ? `?q=${encodeURIComponent(search)}` : ""}`),
		select: (d) => Array.isArray(d) ? d : d.items
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("notes.pageTitle"),
				subtitle: t("notes.pageSubtitle"),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					loading: exporting,
					onClick: () => {
						setExporting(true);
						downloadFile("/api/me/notes/export", "mastemy-notes.md").catch((e) => toast.error(errorMessage(e, t))).finally(() => setExporting(false));
					},
					children: t("notes.export")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				role: "search",
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					setSearch(q.trim());
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("notes.search"),
					className: "grow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "search",
						value: q,
						onChange: (e) => setQ(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: t("courses.searchButton")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: notes,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: search ? t("notes.noMatches") : t("notes.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "note-item",
						children: [n.timestampSeconds !== null && n.courseSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "ts-button",
							to: `/learn/${n.courseSlug}/${n.lessonId}?t=${n.timestampSeconds}`,
							children: formatTimestamp(n.timestampSeconds)
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "note-item__body",
							children: [
								n.lessonTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "small muted",
									children: n.lessonTitle
								}) : null,
								n.body,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "small muted",
									children: [n.tags ? `#${n.tags.split(",").map((x) => x.trim()).join(" #")} · ` : "", fmtDate(n.updatedAt)]
								})
							]
						})]
					}, n.id))
				})
			})
		]
	});
}
//#endregion
export { DashboardPage, MyNotesPage };

//# sourceMappingURL=DashboardPage-DxbiWjC6.js.map