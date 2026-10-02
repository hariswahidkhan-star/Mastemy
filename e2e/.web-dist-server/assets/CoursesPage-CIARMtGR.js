import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, i as Pagination, o as QueryStatus, r as PageHeader } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { r as useCategories } from "./hooks-D70iOwvH.js";
import { D as withFilter, T as usePublicSkills, _ as useCatalogSearch, a as FRESHNESS_DAYS, c as MIN_RATINGS, d as activeFilterCount, i as DURATIONS, l as SORTS, m as readCatalogQuery, p as loc, w as usePublicCertifications, x as useInstructors } from "./discover-CtKiK6mW.js";
/* empty css                  */
import { i as Select, n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { t as CourseCard } from "./CourseCard-D-k-mQGl.js";
import { n as COURSE_LEVELS } from "./types-C7beT6Ou.js";
import { t as SearchCombobox } from "./SearchCombobox-Q3Xl2cLU.js";
//#region src/pages/public/CoursesPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Price inputs commit on blur/Enter so typing does not fire a request per keystroke. */
function PriceInput({ label, value, onCommit }) {
	const [v, setV] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => setV(value), [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "number",
			min: 0,
			step: "0.01",
			inputMode: "decimal",
			value: v,
			onChange: (e) => setV(e.target.value),
			onBlur: () => v !== value && onCommit(v),
			onKeyDown: (e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					onCommit(v);
				}
			}
		})
	});
}
function CourseBrowser({ fixedCategory }) {
	const { t, lang } = useI18n();
	const [params, setParams] = useSearchParams();
	const categories = useCategories();
	const skills = usePublicSkills();
	const certs = usePublicCertifications();
	const instructors = useInstructors({
		page: 1,
		pageSize: 50
	});
	const query = readCatalogQuery(params, fixedCategory);
	const courses = useCatalogSearch(query);
	const update = (key, value) => setParams(withFilter(params, key, value), { replace: key === "q" });
	const filters = activeFilterCount(query, fixedCategory);
	const instructorOptions = (instructors.data?.items ?? []).map((i) => ({
		value: i.id,
		label: i.displayName
	}));
	if (query.instructor && !instructorOptions.some((o) => o.value === query.instructor)) instructorOptions.unshift({
		value: query.instructor,
		label: t("discover.filters.selected")
	});
	const skillOptions = (skills.data ?? []).map((s) => ({
		value: s.code,
		label: loc(lang, s.nameEn, s.nameAr)
	}));
	if (query.skill && !skillOptions.some((o) => o.value === query.skill)) skillOptions.unshift({
		value: query.skill,
		label: query.skill
	});
	const certOptions = (certs.data ?? []).map((c) => ({
		value: c.slug,
		label: c.examCode ? `${c.title} (${c.examCode})` : c.title
	}));
	if (query.certification && !certOptions.some((o) => o.value === query.certification)) certOptions.unshift({
		value: query.certification,
		label: query.certification
	});
	const clearFilters = () => {
		const next = new URLSearchParams();
		for (const k of ["q", "sort"]) if (query[k]) next.set(k, query[k]);
		setParams(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card card--flat stack",
		style: {
			display: "grid",
			gap: "var(--space-4)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchCombobox, {
				label: t("courses.search"),
				initial: query.q ?? "",
				placeholder: t("home.searchPlaceholder"),
				onSubmit: (q) => update("q", q)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, {
				query: instructors,
				label: t("discover.filters.instructor")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, {
				query: skills,
				label: t("discover.filters.skill")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, {
				query: certs,
				label: t("discover.filters.certification")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dfilters",
				role: "group",
				"aria-label": t("discover.filters.label"),
				children: [
					!fixedCategory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("courses.category"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: query.category ?? "",
							onChange: (e) => update("category", e.target.value),
							placeholder: t("courses.allCategories"),
							options: (categories.data ?? []).map((c) => ({
								value: c.slug,
								label: (c.parentId ? "— " : "") + loc(lang, c.nameEn, c.nameAr)
							}))
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("courses.level"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: query.level ?? "",
							onChange: (e) => update("level", e.target.value),
							placeholder: t("courses.allLevels"),
							options: COURSE_LEVELS.map((l) => ({
								value: l,
								label: t(`level.${l}`)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("courses.language"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: query.language ?? "",
							onChange: (e) => update("language", e.target.value),
							placeholder: t("courses.allLanguages"),
							options: [{
								value: "en",
								label: t("language.en")
							}, {
								value: "ar",
								label: t("language.ar")
							}]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.filters.instructor"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: query.instructor ?? "",
							onChange: (e) => update("instructor", e.target.value),
							placeholder: t("discover.filters.any"),
							options: instructorOptions
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.filters.duration"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: query.duration ?? "",
							onChange: (e) => update("duration", e.target.value),
							placeholder: t("discover.filters.any"),
							options: DURATIONS.map((d) => ({
								value: d,
								label: t(`discover.duration.${d}`)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.filters.freshness"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: query.updatedWithinDays ?? "",
							onChange: (e) => update("updatedWithinDays", e.target.value),
							placeholder: t("discover.filters.any"),
							options: FRESHNESS_DAYS.map((d) => ({
								value: String(d),
								label: t("discover.filters.withinDays", { n: d })
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.filters.rating"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: query.minRating ?? "",
							onChange: (e) => update("minRating", e.target.value),
							placeholder: t("discover.filters.any"),
							options: MIN_RATINGS.map((r) => ({
								value: r,
								label: t("discover.filters.ratingAtLeast", { n: r })
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.filters.skill"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: query.skill ?? "",
							onChange: (e) => update("skill", e.target.value),
							placeholder: t("discover.filters.any"),
							options: skillOptions
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.filters.certification"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: query.certification ?? "",
							onChange: (e) => update("certification", e.target.value),
							placeholder: t("discover.filters.any"),
							options: certOptions
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dfilters__price",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceInput, {
							label: t("discover.filters.minPrice"),
							value: query.minPrice ?? "",
							onCommit: (v) => update("minPrice", v)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceInput, {
							label: t("discover.filters.maxPrice"),
							value: query.maxPrice ?? "",
							onCommit: (v) => update("maxPrice", v)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("courses.sort"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: query.sort ?? "newest",
							onChange: (e) => update("sort", e.target.value === "newest" ? "" : e.target.value),
							options: SORTS.map((s) => ({
								value: s,
								label: t(`courses.sort_${s}`)
							}))
						})
					})
				]
			}),
			query.minPrice || query.maxPrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				style: { margin: 0 },
				children: t("discover.filters.priceNote")
			}) : null,
			filters > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: clearFilters,
				children: t("discover.filters.clear", { n: filters })
			}) }) : null
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { marginBlockStart: "var(--space-5)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: courses,
			children: (data) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [data.didYouMean ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "did-you-mean",
				role: "status",
				children: [
					t("discover.search.didYouMean"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `?${withFilter(params, "q", data.didYouMean).toString()}`,
						onClick: (e) => {
							e.preventDefault();
							update("q", data.didYouMean ?? "");
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.didYouMean })
					}),
					data.items.length > 0 ? ` ${t("discover.search.showingFor")}` : ""
				]
			}) : null, data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: t("courses.noResults"),
				description: t("courses.noResultsBody")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					"aria-live": "polite",
					children: t("courses.resultCount", { n: data.total })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "visually-hidden",
					children: t("courses.resultsHeading")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid",
					children: data.items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c }, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					page: data.page,
					pageSize: data.pageSize,
					total: data.total,
					onPage: (p) => update("page", p > 1 ? String(p) : "")
				})
			] })] })
		})
	})] });
}
function CoursesPage() {
	const { t } = useI18n();
	usePageMeta(t("courses.title"), t("courses.metaDescription"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("courses.title"),
			subtitle: t("courses.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseBrowser, {})]
	});
}
function CategoryPage() {
	const { slug = "" } = useParams();
	const { t, lang } = useI18n();
	const categories = useCategories();
	const category = categories.data?.find((c) => c.slug === slug);
	const name = category ? loc(lang, category.nameEn, category.nameAr) : void 0;
	usePageMeta(name ?? t("courses.category"), name ? t("category.metaDescription", { name }) : void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: categories,
			children: (list) => !category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: t("category.notFound"),
				action: {
					label: t("courses.title"),
					to: "/courses"
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					title: name,
					subtitle: t("category.subtitle", { n: category.courseCount })
				}),
				category.isAcademy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: `/academies/${category.slug}`,
					children: t("discover.academy.visit")
				}) }) : null,
				list.some((c) => c.parentId === category.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": t("category.sub"),
					className: "row",
					style: { marginBlockEnd: "var(--space-4)" },
					children: list.filter((c) => c.parentId === category.id).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "btn btn--secondary btn--sm",
						to: `/categories/${c.slug}`,
						children: loc(lang, c.nameEn, c.nameAr)
					}, c.id))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseBrowser, { fixedCategory: category.slug })
			] })
		})
	});
}
//#endregion
export { CategoryPage, CoursesPage };

//# sourceMappingURL=CoursesPage-CIARMtGR.js.map