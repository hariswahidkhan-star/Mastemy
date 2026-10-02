import { _ as require_react, a as Link, b as __toESM, h as useParams, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, n as ButtonLink, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { i as useEventSender, o as useTrackEvent } from "./analytics-Bl_3puqd.js";
import { a as QueryState, l as errorMessage, n as Notice, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { a as useCourse, c as useLearnCourse, n as useApiMutation, t as keys } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { i as WishlistButton, t as CompareToggle } from "./Discovery-D4EXL3Q0.js";
import { a as Textarea, i as Select, n as Field } from "./Field-Di1lkoGg.js";
import { i as splitLines } from "./format-B7uvlQ7u.js";
import { t as Duration } from "./Duration-C3eLHxwf.js";
import { o as ReportContentButton } from "./Trust-B2S3OlzB.js";
import { n as CourseLearnerActions } from "./Messaging-BSdbeK_Z.js";
import { n as EnrollToPost, o as useIsCourseAuthor, t as DiscussionsPanel } from "./Discussions-C23iLUpN.js";
import { o as useTrackCourseView, r as RelatedCourses } from "./ComparePage-AbDdlOTX.js";
//#region src/pages/public/CourseDetailPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Signed-in only: enrollment decides whether the learner may post. */
function SignedInQa({ course }) {
	const learn = useLearnCourse(course.slug);
	const isAuthor = useIsCourseAuthor(course.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscussionsPanel, {
		courseId: course.id,
		basePath: `/courses/${course.slug}`,
		canPost: !!learn.data?.enrolled || isAuthor,
		notAllowedReason: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnrollToPost, {
			courseId: course.id,
			slug: course.slug
		})
	});
}
function CourseQa({ course }) {
	const { t } = useI18n();
	const { user } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": "qa-h",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section__head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "qa-h",
				className: "section__title",
				children: t("qa.title")
			}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: `/courses/${course.slug}/announcements`,
				children: t("announcements.title")
			}) : null]
		}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedInQa, { course }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscussionsPanel, {
			courseId: course.id,
			basePath: `/courses/${course.slug}`,
			canPost: false,
			notAllowedReason: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnrollToPost, {
				courseId: course.id,
				slug: course.slug
			})
		})]
	});
}
function FreeVideoNotice() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "info",
		title: t("course.freeNoticeTitle"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: { margin: 0 },
			children: t("course.freeNotice")
		})
	});
}
function PackageCard({ pkg, courseId }) {
	const { t, fmtMoney } = useI18n();
	const { user } = useAuth();
	const navigate = useNavigate();
	const track = useEventSender();
	const go = (gift) => {
		track("checkout_start", courseId);
		const to = `/checkout/package/${pkg.id}${gift ? "?gift=1" : ""}`;
		navigate(user ? to : `/login?next=${encodeURIComponent(to)}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "package",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				style: { marginBlockEnd: "var(--space-2)" },
				children: pkg.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "package__price",
				children: fmtMoney(pkg.price, pkg.currency)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("course.accessTerm", { days: pkg.accessDays })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				style: {
					fontWeight: 600,
					marginBlockEnd: "var(--space-1)"
				},
				children: t("course.packageIncludes")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "check-list small",
				children: splitLines(pkg.contents).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("course.packageNotVideo")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => go(false),
				style: { inlineSize: "100%" },
				children: t("course.buyPackage")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => go(true),
				style: { inlineSize: "100%" },
				children: t("commerce.gift.giveAsGift")
			})
		]
	});
}
function Reviews({ course }) {
	const { t, fmtDate } = useI18n();
	const { user } = useAuth();
	const toast = useToast();
	const reviews = useQuery({
		queryKey: ["reviews", course.id],
		queryFn: () => api(`/api/courses/${course.id}/reviews`),
		select: (d) => Array.isArray(d) ? d : d.items
	});
	const [rating, setRating] = (0, import_react.useState)("5");
	const [body, setBody] = (0, import_react.useState)("");
	const submit = useApiMutation(() => api(`/api/courses/${course.id}/reviews`, {
		method: "POST",
		body: {
			rating: Number(rating),
			body
		}
	}), [["reviews", course.id], keys.course(course.slug)], () => {
		toast.success(t("reviews.saved"));
		setBody("");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": "reviews-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "reviews-h",
				className: "section__title",
				children: t("reviews.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: reviews,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("reviews.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									t("reviews.stars", { n: r.rating }),
									" · ",
									r.authorName ?? t("reviews.learner")
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted",
									children: fmtDate(r.createdAt)
								})]
							}),
							r.verifiedPurchase ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: t("reviews.verified")
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { whiteSpace: "pre-wrap" },
								children: r.body
							}),
							r.instructorReply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
								className: "small muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("reviews.instructorReply") }),
									" ",
									r.instructorReply
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportContentButton, {
								targetType: "Review",
								targetId: r.id
							})
						]
					}, r.id))
				})
			}),
			user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card card--flat",
				style: { marginBlockStart: "var(--space-4)" },
				onSubmit: (e) => {
					e.preventDefault();
					if (body.trim().length < 10) {
						toast.error(t("reviews.tooShort"));
						return;
					}
					submit.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t("reviews.write") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("reviews.eligibility")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("reviews.rating"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: rating,
							onChange: (e) => setRating(e.target.value),
							options: [
								5,
								4,
								3,
								2,
								1
							].map((n) => ({
								value: String(n),
								label: t("reviews.stars", { n })
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("reviews.body"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: body,
							onChange: (e) => setBody(e.target.value),
							maxLength: 4e3
						})
					}),
					submit.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: errorMessage(submit.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: submit.isPending,
						children: t("reviews.submit")
					})
				]
			}) : null
		]
	});
}
function CourseDetailView({ course }) {
	const { t, fmtDate, fmtNumber } = useI18n();
	const { user } = useAuth();
	const toast = useToast();
	const firstLesson = course.modules.flatMap((m) => m.lessons).find((l) => l.hasVideo);
	const previews = course.modules.flatMap((m) => m.lessons).filter((l) => l.isPreview);
	useTrackCourseView(course.id);
	useTrackEvent("course_view", course.id);
	const enroll = useApiMutation(() => api(`/api/learn/courses/${course.id}/enroll`, { method: "POST" }), [keys.dashboard, keys.learnCourse(course.slug)], () => toast.success(t("course.enrolled")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			"aria-label": t("common.breadcrumb"),
			className: "small muted",
			style: { marginBlockEnd: "var(--space-3)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/courses",
					children: t("courses.title")
				}),
				" / ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: course.title })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "detail-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-title",
					children: course.title
				}),
				course.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "page-subtitle",
					children: course.subtitle
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					style: { marginBlock: "var(--space-3)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`level.${course.level}`) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`language.${course.language}`) }),
						course.status === "Updating" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "info",
							children: t("status.Updating")
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					style: { marginBlockEnd: "var(--space-3)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WishlistButton, {
							courseId: course.id,
							title: course.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareToggle, { item: {
							id: course.id,
							slug: course.slug,
							title: course.title
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportContentButton, {
							targetType: "Course",
							targetId: course.id
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseLearnerActions, {
					courseId: course.id,
					slug: course.slug
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FreeVideoNotice, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "facts",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("course.videos") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(course.videoCount) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("course.mcqs") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtNumber(course.questionCount) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("course.duration") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duration, { seconds: course.totalDurationSeconds }) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("course.language") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: t(`language.${course.language}`) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("course.reviewed") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: course.reviewedAt ? fmtDate(course.reviewedAt) : t("course.notReviewed") })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("course.credential") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: course.credentialType ?? t("course.defaultCredential") })] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						children: t("course.about")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { whiteSpace: "pre-wrap" },
						children: course.description
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						children: t("course.audience")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { whiteSpace: "pre-wrap" },
						children: course.audience || t("course.notSpecified")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						children: t("course.prerequisites")
					}), splitLines(course.prerequisites).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: splitLines(course.prerequisites).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, p)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("course.noPrerequisites") })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						children: t("course.outcomes")
					}), course.outcomes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "check-list",
						children: course.outcomes.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: o }, o))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("course.notSpecified")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section__head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "section__title",
							children: t("course.curriculum")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "small muted",
							children: t("course.curriculumSummary", {
								modules: course.modules.length,
								lessons: course.modules.reduce((n, m) => n + m.lessons.length, 0)
							})
						})]
					}), course.modules.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("course.noCurriculum")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "curriculum",
						children: course.modules.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							open: i === 0,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small muted",
								children: t("course.lessonCount", { n: m.lessons.length })
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: m.lessons.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								l.hasVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/learn/${course.slug}/${l.id}`,
									children: l.title
								}) : l.title,
								" ",
								l.isPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "accent",
									children: t("course.preview")
								}) : null
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duration, { seconds: l.durationSeconds })
							})] }, l.id)) })]
						}, m.id))
					})]
				}),
				previews.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						children: t("course.previewLessons")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: previews.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/learn/${course.slug}/${l.id}`,
						children: l.title
					}) }, l.id)) })]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						children: t("course.instructors")
					}), course.instructors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "muted",
						children: t("course.notSpecified")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "stack",
						style: {
							listStyle: "none",
							padding: 0
						},
						children: course.instructors.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: i.displayName }), i.headline ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "muted",
							children: [" — ", i.headline]
						}) : null] }, i.userId ?? i.id ?? i.displayName))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, { course }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseQa, { course }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatedCourses, { courseId: course.id })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky-aside stack",
				"aria-label": t("course.studyOptions"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("course.watchFree") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("course.watchFreeBody")
						}),
						firstLesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
							to: `/learn/${course.slug}/${firstLesson.id}`,
							children: t("course.startWatching")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small",
							children: t("course.noVideosYet")
						}),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							style: { marginBlockStart: "var(--space-2)" },
							onClick: () => enroll.mutate(void 0),
							loading: enroll.isPending,
							children: t("course.enrollFree")
						}) : null,
						enroll.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "danger",
							children: errorMessage(enroll.error, t)
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card",
					id: "packages",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("course.packages") }),
						course.packages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("course.noPackages")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "stack",
							children: course.packages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCard, {
								pkg: p,
								courseId: course.id
							}, p.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							style: { marginBlockStart: "var(--space-4)" },
							children: t("course.refundTerms")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small",
							children: course.refundTerms || t("course.defaultRefundTerms")
						})
					]
				})]
			})]
		})]
	});
}
function CourseDetailPage() {
	const { slug = "" } = useParams();
	const course = useCourse(slug);
	const { t } = useI18n();
	usePageMeta(course.data?.title ?? t("courses.title"), course.data?.subtitle || course.data?.description?.slice(0, 160));
	if (course.isError && course.error instanceof ApiError && course.error.status === 404) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: t("course.notFound"),
			action: {
				label: t("courses.title"),
				to: "/courses"
			}
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: course,
		children: (data) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseDetailView, { course: data })
	});
}
//#endregion
export { CourseDetailView as n, FreeVideoNotice as r, CourseDetailPage as t };

//# sourceMappingURL=CourseDetailPage-zKsDgcZ1.js.map