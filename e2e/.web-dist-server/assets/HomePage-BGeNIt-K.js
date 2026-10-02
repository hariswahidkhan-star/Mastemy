import { a as Link, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as ButtonLink } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { b as useHome, p as loc } from "./discover-CtKiK6mW.js";
import { t as CourseCard } from "./CourseCard-D-k-mQGl.js";
import { t as SearchCombobox } from "./SearchCombobox-Q3Xl2cLU.js";
import { i as Toggletip, n as CourseRow, r as PathwayCard } from "./Shared-B_yCzz2Y.js";
import { n as RecentlyViewedRail } from "./ComparePage-AbDdlOTX.js";
//#region src/pages/public/HomePage.tsx
var import_jsx_runtime = require_jsx_runtime();
function HomeRows({ home }) {
	const { t, lang, fmtNumber } = useI18n();
	if (home.featured.length + home.new.length + home.recentlyUpdated.length + home.aiSkills.length + home.certificationPreparation.length + home.beginnerPathways.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: t("home.emptyCollection"),
		description: t("discover.home.emptyAll")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		home.featured.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
			id: `featured-${c.slug}`,
			title: loc(lang, c.titleEn, c.titleAr),
			courses: c.courses.slice(0, 6),
			more: {
				to: `/collections/${c.slug}`,
				label: t("home.seeAll")
			}
		}, c.id)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
			id: "home-new",
			title: t("home.new"),
			courses: home.new,
			more: {
				to: "/courses?sort=newest",
				label: t("home.seeAll")
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
			id: "home-updated",
			title: t("home.updated"),
			courses: home.recentlyUpdated,
			more: {
				to: "/courses?sort=updated",
				label: t("home.seeAll")
			},
			extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.home.updatedRule")
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
			id: "home-ai",
			title: t("discover.home.aiSkills"),
			courses: home.aiSkills
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
			id: "home-cert",
			title: t("discover.home.certPrep"),
			courses: home.certificationPreparation,
			more: {
				to: "/certifications",
				label: t("discover.home.certDirectory")
			},
			extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.cert.noPartnership")
			})
		}),
		home.beginnerPathways.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "section",
			"aria-labelledby": "home-paths",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section__head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section__title",
					id: "home-paths",
					children: t("discover.home.beginnerPathways")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/pathways?level=Beginner",
					children: t("home.seeAll")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "dlist grid",
				children: home.beginnerPathways.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathwayCard, { p }, p.id))
			})]
		}) : null,
		home.bestselling.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "section",
			"aria-labelledby": "home-best",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section__head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section__title",
					id: "home-best",
					children: t("discover.home.bestselling")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/bestseller-rule",
					children: t("discover.best.howDecided")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid",
				children: home.bestselling.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [b.bestsellerLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small",
					style: { margin: "0 0 var(--space-1)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "accent",
							children: t("discover.best.label")
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toggletip, {
							label: t("discover.best.why"),
							children: [
								home.bestsellerRule,
								" ",
								t("discover.best.buyers", { n: fmtNumber(b.distinctBuyers) })
							]
						})
					]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: b.course })] }, b.course.id))
			})]
		}) : null
	] });
}
function HomePage() {
	const { t } = useI18n();
	const navigate = useNavigate();
	const home = useHome();
	usePageMeta(t("home.metaTitle"), t("home.metaDescription"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "hero",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: t("home.heroTitle") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("home.heroBody") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-search",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchCombobox, {
						id: "hero-q",
						label: t("courses.search"),
						placeholder: t("home.searchPlaceholder"),
						onSubmit: (q) => navigate(`/courses${q ? `?q=${encodeURIComponent(q)}` : ""}`)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					style: { marginBlockStart: "var(--space-5)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/free-lessons",
						variant: "secondary",
						children: t("home.ctaFree")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: "/certifications",
						variant: "secondary",
						children: t("discover.home.ctaCert")
					})]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section",
				"aria-labelledby": "pillars",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "visually-hidden",
					id: "pillars",
					children: t("home.howTitle")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pillars",
					children: [
						"video",
						"notes",
						"mcq",
						"cert"
					].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card card--flat pillar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t(`home.pillar.${k}.title`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted small",
							children: t(`home.pillar.${k}.body`)
						})]
					}, k))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentlyViewedRail, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: home,
				children: (h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeRows, { home: h })
			})
		]
	})] });
}
//#endregion
export { HomePage };

//# sourceMappingURL=HomePage-BGeNIt-K.js.map