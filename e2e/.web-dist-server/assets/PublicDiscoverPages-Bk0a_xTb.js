import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, m as useNavigate, p as useLocation, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, n as ButtonLink, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, i as Pagination, l as errorMessage, n as Notice, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation, r as useCategories } from "./hooks-D70iOwvH.js";
import { C as usePathways, S as usePathway, _ as useCatalogSearch, b as useHome, g as useAcademy, p as loc, t as CERT_KINDS, v as useCertification, w as usePublicCertifications, x as useInstructors, y as useCollection } from "./discover-CtKiK6mW.js";
/* empty css                  */
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { n as articleHtml, r as findArticle, t as ARTICLES } from "./articles-CnArfAFv.js";
import { i as Select, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { t as Duration } from "./Duration-C3eLHxwf.js";
import { t as CourseCard } from "./CourseCard-D-k-mQGl.js";
import { c as fbKeys } from "./finalb-tCQ9cZ9j.js";
import { n as COURSE_LEVELS } from "./types-C7beT6Ou.js";
import { n as useDebounced } from "./SearchCombobox-Q3Xl2cLU.js";
import { n as CourseRow, r as PathwayCard, t as CertificationCard } from "./Shared-B_yCzz2Y.js";
import { r as FreeVideoNotice } from "./CourseDetailPage-zKsDgcZ1.js";
//#region src/pages/discover/PublicDiscoverPages.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CategoriesIndexPage() {
	const { t, lang } = useI18n();
	const categories = useCategories();
	usePageMeta(t("discover.categories.title"), t("discover.categories.subtitle"));
	const name = (c) => loc(lang, c.nameEn, c.nameAr);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("discover.categories.title"),
			subtitle: t("discover.categories.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: categories,
			children: (list) => {
				const roots = list.filter((c) => c.parentId === null);
				if (roots.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.categories.empty") });
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "dlist grid",
					children: roots.map((c) => {
						const children = list.filter((x) => x.parentId === c.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "dcard__title",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: c.isAcademy ? `/academies/${c.slug}` : `/categories/${c.slug}`,
										children: name(c)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "small muted",
									children: [t("category.subtitle", { n: c.courseCount }), c.isAcademy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "accent",
										children: t("discover.categories.academy")
									})] }) : null]
								}),
								children.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mega__list",
									children: children.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: `/categories/${ch.slug}`,
											children: name(ch)
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "small muted",
											children: [
												"(",
												ch.courseCount,
												")"
											]
										})
									] }, ch.id))
								}) : null
							]
						}, c.id);
					})
				});
			}
		})]
	});
}
function AcademyPage() {
	const { slug = "" } = useParams();
	const { t, lang } = useI18n();
	const academy = useAcademy(slug);
	const title = academy.data ? loc(lang, academy.data.category.nameEn, academy.data.category.nameAr) : void 0;
	usePageMeta(title ?? t("discover.academy.title"), title ? t("discover.academy.meta", { name: title }) : void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: academy,
			children: (a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title,
					subtitle: t("discover.academy.subtitle", { n: a.category.courseCount }),
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						to: `/categories/${a.category.slug}`,
						variant: "secondary",
						size: "sm",
						children: t("discover.academy.browseAll")
					})
				}),
				a.featured.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
					id: `acf-${c.slug}`,
					title: loc(lang, c.titleEn, c.titleAr),
					courses: c.courses.slice(0, 6),
					more: {
						to: `/collections/${c.slug}`,
						label: t("home.seeAll")
					}
				}, c.id)),
				a.pathways.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "section",
					"aria-labelledby": "ac-paths",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						id: "ac-paths",
						children: t("discover.pathways.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "dlist grid",
						children: a.pathways.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathwayCard, { p }, p.id))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
					id: "ac-courses",
					title: t("discover.academy.latest"),
					courses: a.courses,
					empty: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.academy.empty") })
				})
			] })
		})
	});
}
function CertificationsPage() {
	const { t } = useI18n();
	const [params, setParams] = useSearchParams();
	const [qInput, setQInput] = (0, import_react.useState)(params.get("q") ?? "");
	const q = useDebounced(qInput.trim(), 300);
	const kind = params.get("kind") ?? "";
	const certs = usePublicCertifications({
		q: q || void 0,
		kind: CERT_KINDS.includes(kind) ? kind : void 0
	});
	usePageMeta(t("discover.cert.title"), t("discover.cert.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("discover.cert.title"),
				subtitle: t("discover.cert.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				title: t("discover.cert.independentTitle"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: { margin: 0 },
					children: t("discover.cert.noPartnership")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "filters card card--flat",
				role: "search",
				onSubmit: (e) => e.preventDefault(),
				style: { marginBlock: "var(--space-4)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("discover.cert.search"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "search",
						value: qInput,
						onChange: (e) => setQInput(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("discover.cert.kind"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: kind,
						onChange: (e) => {
							const next = new URLSearchParams(params);
							if (e.target.value) next.set("kind", e.target.value);
							else next.delete("kind");
							setParams(next);
						},
						placeholder: t("discover.filters.any"),
						options: CERT_KINDS.map((k) => ({
							value: k,
							label: t(`discover.certKind.${k}`)
						}))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: certs,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("discover.cert.empty"),
					description: t("discover.cert.emptyBody")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "visually-hidden",
					children: t("discover.cert.listHeading")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "dlist",
					children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificationCard, { c }, c.id))
				})] })
			})
		]
	});
}
function CertificationDetailPage() {
	const { slug = "" } = useParams();
	const { t, fmtDate, fmtNumber } = useI18n();
	const cert = useCertification(slug);
	usePageMeta(cert.data?.title ?? t("discover.cert.title"), cert.data ? t("discover.cert.meta", {
		title: cert.data.title,
		issuer: cert.data.issuerName
	}) : void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: cert,
			children: (c) => {
				const totalWeight = c.objectives.reduce((s, o) => s + o.weightPercent, 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "small muted",
						"aria-label": t("common.breadcrumb"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/certifications",
								children: t("discover.cert.title")
							}),
							" / ",
							c.title
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
						title: c.title,
						subtitle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "info",
								children: t(`discover.certState.${c.state}`)
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`discover.certKind.${c.kind}`) })
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "info",
						title: t("discover.cert.independentTitle"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: { margin: 0 },
							children: t("discover.cert.noPartnershipNamed", { issuer: c.issuerName })
						})
					}),
					c.replacedBySlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
						tone: "warning",
						children: [
							t("discover.cert.replaced"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/certifications/${c.replacedBySlug}`,
								children: t("discover.cert.seeReplacement")
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "section card",
						"aria-labelledby": "cert-facts",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section__title",
								id: "cert-facts",
								children: t("discover.cert.facts")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "dfacts",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.cert.issuer") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.issuerName }),
									c.examCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.cert.examCode") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mono",
										children: c.examCode
									})] }) : null,
									c.levelOrPart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.cert.level") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.levelOrPart })] }) : null,
									c.version ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.cert.version") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.version })] }) : null,
									c.jurisdiction ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.cert.jurisdiction") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.jurisdiction })] }) : null,
									c.effectiveFrom || c.effectiveTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.cert.effective") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
										fmtDate(c.effectiveFrom) || "…",
										" – ",
										fmtDate(c.effectiveTo) || "…"
									] })] }) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.cert.lastCheckedLabel") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtDate(c.lastCheckedAt) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.cert.officialSource") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: c.officialSourceUrl,
										target: "_blank",
										rel: "noopener noreferrer",
										children: c.officialSourceUrl
									}) }),
									c.prerequisites ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.cert.prerequisites") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "pre-wrap",
										children: c.prerequisites
									})] }) : null,
									c.renewalInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.cert.renewal") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "pre-wrap",
										children: c.renewalInfo
									})] }) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("discover.cert.officialWins")
							})
						]
					}),
					c.nonMcqDisclosure ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						title: t("discover.cert.nonMcqTitle"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "pre-wrap",
							style: { margin: 0 },
							children: c.nonMcqDisclosure
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "section",
						"aria-labelledby": "cert-blueprint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section__title",
								id: "cert-blueprint",
								children: t("discover.cert.blueprint")
							}),
							c.objectives.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "muted",
								children: t("discover.cert.noBlueprint")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "table-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "table",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
											className: "visually-hidden",
											children: t("discover.cert.blueprint")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												children: t("discover.cert.objCode")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												children: t("discover.cert.objTitle")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												children: t("discover.cert.objWeight")
											})
										] }) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: c.objectives.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "mono",
												children: o.code
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.title }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "weight-bar",
													style: { inlineSize: `${Math.max(2, o.weightPercent)}px` },
													"aria-hidden": "true"
												}),
												" ",
												fmtNumber(o.weightPercent),
												"%"
											] })
										] }, o.id)) })
									]
								})
							}),
							c.objectives.length > 0 && totalWeight < 100 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small muted",
								children: t("discover.cert.weightPartial", { n: fmtNumber(totalWeight) })
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
						id: "cert-courses",
						title: t("discover.cert.prepCourses"),
						courses: c.preparationCourses,
						empty: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.cert.noCourses") }),
						extra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("discover.cert.prepNote")
						})
					})
				] });
			}
		})
	});
}
function PathwaysPage() {
	const { t } = useI18n();
	const [params, setParams] = useSearchParams();
	const level = params.get("level") ?? "";
	const valid = COURSE_LEVELS.includes(level) ? level : void 0;
	const pathways = usePathways(valid);
	usePageMeta(t("discover.pathways.title"), t("discover.pathways.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("discover.pathways.title"),
				subtitle: t("discover.pathways.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "filters card card--flat",
				style: { marginBlockEnd: "var(--space-4)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("courses.level"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: valid ?? "",
						onChange: (e) => setParams(e.target.value ? { level: e.target.value } : {}),
						placeholder: t("courses.allLevels"),
						options: COURSE_LEVELS.map((l) => ({
							value: l,
							label: t(`level.${l}`)
						}))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: pathways,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.pathways.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "visually-hidden",
					children: t("discover.pathways.listHeading")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "dlist grid",
					children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathwayCard, { p }, p.id))
				})] })
			})
		]
	});
}
function EnrollAll({ slug, count }) {
	const { t } = useI18n();
	const { user } = useAuth();
	const toast = useToast();
	const location = useLocation();
	const [result, setResult] = (0, import_react.useState)(null);
	const enroll = useApiMutation(() => api(`/api/pathways/${encodeURIComponent(slug)}/enroll`, { method: "POST" }), [["me", "dashboard"]], (r) => {
		setResult(r);
		toast.success(t("discover.pathways.enrolled", {
			n: r.enrolled,
			m: r.alreadyEnrolled
		}));
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
		to: `/login?next=${encodeURIComponent(location.pathname)}`,
		children: t("discover.pathways.loginToEnroll")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			loading: enroll.isPending,
			disabled: count === 0,
			onClick: () => enroll.mutate(void 0, { onError: (e) => toast.error(errorMessage(e, t)) }),
			children: t("discover.pathways.enrollAll", { n: count })
		}), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "small",
			role: "status",
			children: [
				t("discover.pathways.enrolled", {
					n: result.enrolled,
					m: result.alreadyEnrolled
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/me",
					children: t("discover.pathways.goDashboard")
				})
			]
		}) : null]
	});
}
function PathwayDetailPage() {
	const { slug = "" } = useParams();
	const { t, lang } = useI18n();
	const pathway = usePathway(slug);
	const title = pathway.data ? loc(lang, pathway.data.titleEn, pathway.data.titleAr) : void 0;
	const desc = pathway.data ? loc(lang, pathway.data.descriptionEn, pathway.data.descriptionAr) : void 0;
	usePageMeta(title ?? t("discover.pathways.title"), desc || void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: pathway,
			children: (p) => {
				const total = p.courses.reduce((s, c) => s + (c.totalDurationSeconds ?? 0), 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "small muted",
						"aria-label": t("common.breadcrumb"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pathways",
								children: t("discover.pathways.title")
							}),
							" / ",
							title
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
						title,
						subtitle: desc,
						actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnrollAll, {
							slug: p.slug,
							count: p.courses.length
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "row small",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`level.${p.level}`) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("discover.pathways.courseCount", { n: p.courses.length }) }),
							total > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duration, { seconds: total }) : null
						]
					}),
					p.skills.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "row small",
						"aria-label": t("discover.pathways.skills"),
						children: p.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/courses?skill=${encodeURIComponent(s.code)}`,
							className: "badge badge--neutral",
							children: loc(lang, s.nameEn, s.nameAr)
						}, s.id))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("discover.pathways.freeNote")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "section",
						"aria-labelledby": "pw-courses",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "section__title",
							id: "pw-courses",
							children: t("discover.pathways.order")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "dlist",
							children: p.courses.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "row",
								style: { alignItems: "flex-start" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "badge badge--accent",
									"aria-hidden": "true",
									children: i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grow",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c })
								})]
							}, c.id))
						})]
					})
				] });
			}
		})
	});
}
function CollectionPage() {
	const { slug = "" } = useParams();
	const { t, lang } = useI18n();
	const collection = useCollection(slug);
	const title = collection.data ? loc(lang, collection.data.titleEn, collection.data.titleAr) : void 0;
	usePageMeta(title ?? t("discover.collection.title"), title ? t("discover.collection.meta", { title }) : void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: collection,
			children: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title,
					subtitle: t("discover.collection.count", { n: c.courses.length })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "visually-hidden",
					children: t("discover.collection.listHeading")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid",
					children: c.courses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course }, course.id))
				})
			] })
		})
	});
}
function InstructorsPage() {
	const { t, fmtNumber } = useI18n();
	const [params, setParams] = useSearchParams();
	const [qInput, setQInput] = (0, import_react.useState)(params.get("q") ?? "");
	const q = useDebounced(qInput.trim(), 300);
	const page = Math.max(1, Number(params.get("page") ?? "1") || 1);
	const list = useInstructors({
		q: q || void 0,
		page,
		pageSize: 24
	});
	usePageMeta(t("discover.instructors.title"), t("discover.instructors.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("discover.instructors.title"),
				subtitle: t("discover.instructors.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				className: "filters card card--flat",
				role: "search",
				onSubmit: (e) => e.preventDefault(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("discover.instructors.search"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "search",
						value: qInput,
						onChange: (e) => {
							setQInput(e.target.value);
							if (params.get("page")) setParams({});
						}
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginBlockStart: "var(--space-4)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: list,
					children: (data) => data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.instructors.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "dlist grid",
						children: data.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: `/instructors/${i.id}`,
								className: "dcard",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "dcard__title",
									children: i.displayName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "small muted",
									style: { margin: 0 },
									children: [t("discover.instructors.courses", { n: fmtNumber(i.liveCourseCount) }), i.ratingCount > 0 && i.ratingAverage != null ? ` · ${t("course.rating", {
										avg: i.ratingAverage.toFixed(1),
										n: fmtNumber(i.ratingCount)
									})}` : ""]
								})]
							})
						}, i.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
						page: data.page,
						pageSize: data.pageSize,
						total: data.total,
						onPage: (p) => setParams(p > 1 ? { page: String(p) } : {})
					})] })
				})
			})
		]
	});
}
function InfoSections({ prefix, keys }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "stack",
		style: {
			display: "grid",
			gap: "var(--space-4)"
		},
		children: keys.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card card--flat",
			"aria-labelledby": `${prefix}-${k}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: `${prefix}-${k}`,
				style: {
					fontSize: "var(--text-lg)",
					marginBlockStart: 0
				},
				children: t(`${prefix}.${k}.title`)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: { margin: 0 },
				children: t(`${prefix}.${k}.body`)
			})]
		}, k))
	});
}
function PackagesPage() {
	const { t } = useI18n();
	usePageMeta(t("discover.packages.title"), t("discover.packages.subtitle"));
	const withPackages = useCatalogSearch({
		minPrice: "0",
		sort: "updated"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("discover.packages.title"),
				subtitle: t("discover.packages.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FreeVideoNotice, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoSections, {
				prefix: "discover.packages",
				keys: [
					"what",
					"never",
					"review",
					"compare"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: withPackages,
				children: (d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseRow, {
					id: "pk-courses",
					title: t("discover.packages.withPackages"),
					courses: d.items.slice(0, 6),
					more: d.total > 6 ? {
						to: "/courses?minPrice=0",
						label: t("home.seeAll")
					} : void 0,
					empty: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.packages.none") })
				})
			})
		]
	});
}
function PracticePage() {
	const { t } = useI18n();
	usePageMeta(t("discover.practice.title"), t("discover.practice.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("discover.practice.title"),
				subtitle: t("discover.practice.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoSections, {
				prefix: "discover.practice",
				keys: [
					"where",
					"how",
					"explain",
					"limits"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				style: { marginBlockStart: "var(--space-5)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/courses",
					children: t("discover.practice.browse")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/articles/how-mcq-certificates-work",
					variant: "secondary",
					children: t("discover.practice.certs")
				})]
			})
		]
	});
}
function NotesLibraryPage() {
	const { t } = useI18n();
	const [params, setParams] = useSearchParams();
	const q = params.get("q") ?? "";
	const page = Math.max(1, Number(params.get("page")) || 1);
	const [draft, setDraft] = (0, import_react.useState)(q);
	const notes = useQuery({
		queryKey: fbKeys.notes(q, page),
		queryFn: () => api(`/api/notes-library${qs({
			q: q || void 0,
			page: page > 1 ? page : void 0
		})}`)
	});
	usePageMeta(t("discover.notes.title"), t("discover.notes.subtitle"));
	const go = (next) => {
		const sp = new URLSearchParams(params);
		if (next.q !== void 0) {
			if (next.q) sp.set("q", next.q);
			else sp.delete("q");
			sp.delete("page");
		}
		if (next.page !== void 0) {
			if (next.page > 1) sp.set("page", String(next.page));
			else sp.delete("page");
		}
		setParams(sp);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("discover.notes.title"),
				subtitle: t("discover.notes.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoSections, {
				prefix: "discover.notes",
				keys: [
					"free",
					"premium",
					"private"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section",
				"aria-labelledby": "nl-courses",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						id: "nl-courses",
						children: t("discover.notes.liveCourses")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finalb.notes.note")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						role: "search",
						className: "row",
						onSubmit: (e) => {
							e.preventDefault();
							go({ q: draft.trim() });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("finalb.notes.search"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "search",
								value: draft,
								onChange: (e) => setDraft(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "secondary",
							children: t("finalb.notes.searchBtn")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
						query: notes,
						children: (data) => data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("finalb.notes.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "dlist",
							children: data.items.map(({ course: c, hasNotes, lessonsWithNotes }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "card card--flat row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: `/courses/${c.slug}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.title })
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "small muted",
										children: [
											"·",
											" ",
											hasNotes ? t("finalb.notes.lessonsWithNotes", { n: lessonsWithNotes }) : t("finalb.notes.noNotes")
										]
									})
								] }), hasNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									className: "btn btn--secondary btn--sm",
									to: `/learn/${c.slug}`,
									children: t("discover.notes.openNotes")
								}) : null]
							}, c.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
							page: data.page,
							pageSize: data.pageSize,
							total: data.total,
							onPage: (p) => go({ page: p })
						})] })
					})
				]
			})
		]
	});
}
function BusinessPage() {
	const { t } = useI18n();
	usePageMeta(t("discover.business.title"), t("discover.business.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("discover.business.title"),
				subtitle: t("discover.business.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoSections, {
				prefix: "discover.business",
				keys: [
					"workspace",
					"assign",
					"progress",
					"free"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				style: { marginBlockStart: "var(--space-5)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/contact",
					children: t("discover.business.contact")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
					to: "/verify",
					variant: "secondary",
					children: t("discover.business.verify")
				})]
			})
		]
	});
}
function BestsellerRulePage() {
	const { t } = useI18n();
	const home = useHome();
	usePageMeta(t("discover.best.ruleTitle"), t("discover.best.ruleSubtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("discover.best.ruleTitle"),
			subtitle: t("discover.best.ruleSubtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: home,
			children: (h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card card--flat",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: h.bestsellerRule }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					style: { margin: 0 },
					children: t("discover.best.ruleNote")
				})]
			})
		})]
	});
}
function ArticlesPage() {
	const { t, fmtDate } = useI18n();
	usePageMeta(t("discover.articles.title"), t("discover.articles.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("discover.articles.title"),
			subtitle: t("discover.articles.subtitle")
		}), ARTICLES.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.articles.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "dlist",
			children: ARTICLES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/articles/${a.slug}`,
					className: "dcard",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "dcard__title",
							children: a.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							style: { margin: 0 },
							children: a.description
						}),
						a.published ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small",
							style: { margin: 0 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								dateTime: a.published,
								children: fmtDate(a.published)
							})
						}) : null
					]
				})
			}, a.slug))
		})]
	});
}
function ArticlePage() {
	const { slug = "" } = useParams();
	const { t, lang, fmtDate } = useI18n();
	const navigate = useNavigate();
	const article = findArticle(slug);
	usePageMeta(article?.title ?? t("notFound.title"), article?.description, { noindex: !article });
	if (!article) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: t("notFound.title"),
			action: {
				label: t("discover.articles.title"),
				to: "/articles"
			}
		})
	});
	const onClick = (e) => {
		const href = e.target.closest("a")?.getAttribute("href");
		if (href?.startsWith("/") && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
			e.preventDefault();
			navigate(href);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "small muted",
			"aria-label": t("common.breadcrumb"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/articles",
				children: t("discover.articles.title")
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			style: { maxInlineSize: "72ch" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-title",
					children: article.title
				}),
				article.published ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						dateTime: article.published,
						children: fmtDate(article.published)
					})
				}) : null,
				lang === "ar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					lang: "en",
					children: t("discover.articles.englishOnly")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prose",
					lang: "en",
					dir: "ltr",
					onClick,
					dangerouslySetInnerHTML: { __html: articleHtml(article) }
				})
			]
		})]
	});
}
//#endregion
export { AcademyPage, ArticlePage, ArticlesPage, BestsellerRulePage, BusinessPage, CategoriesIndexPage, CertificationDetailPage, CertificationsPage, CollectionPage, InstructorsPage, NotesLibraryPage, PackagesPage, PathwayDetailPage, PathwaysPage, PracticePage };

//# sourceMappingURL=PublicDiscoverPages-Bk0a_xTb.js.map