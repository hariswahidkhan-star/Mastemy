import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { i as api, n as ButtonLink } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, c as ErrorState, r as PageHeader, u as Spinner } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { i as useCompareTray } from "./compare-CFsa3wCB.js";
import { d as useRecentlyViewed, f as useRelated, p as useWishlist, s as useCompare } from "./wave2-rI7jjNgp.js";
import { r as LiteCourseCard } from "./Discovery-D4EXL3Q0.js";
import { i as splitLines } from "./format-B7uvlQ7u.js";
import { t as Duration } from "./Duration-C3eLHxwf.js";
//#region src/pages/public/ComparePage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function parseCompareIds(raw) {
	const ids = (raw ?? "").split(",").map((s) => s.trim()).filter(Boolean);
	return Array.from(new Set(ids));
}
function CompareTable({ courses }) {
	const { t, fmtNumber, fmtMoney, fmtDate } = useI18n();
	const tray = useCompareTray();
	const rows = [
		{
			label: t("courses.level"),
			cell: (c) => t(`level.${c.level}`)
		},
		{
			label: t("course.language"),
			cell: (c) => t(`language.${c.language}`)
		},
		{
			label: t("compare.lessons"),
			cell: (c) => fmtNumber(c.lessonCount)
		},
		{
			label: t("course.videos"),
			cell: (c) => fmtNumber(c.readyVideoCount)
		},
		{
			label: t("course.mcqs"),
			cell: (c) => fmtNumber(c.activeQuestionCount)
		},
		{
			label: t("course.duration"),
			cell: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duration, { seconds: c.totalDurationSeconds })
		},
		{
			label: t("compare.rating"),
			cell: (c) => c.ratingCount > 0 && c.ratingAverage != null ? t("course.rating", {
				avg: c.ratingAverage.toFixed(1),
				n: fmtNumber(c.ratingCount)
			}) : t("compare.noRatings")
		},
		{
			label: t("course.reviewed"),
			cell: (c) => c.reviewedAt ? fmtDate(c.reviewedAt) : t("course.notReviewed")
		},
		{
			label: t("course.credential"),
			cell: (c) => c.credentialType || t("course.defaultCredential")
		},
		{
			label: t("course.packages"),
			cell: (c) => c.packages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "muted",
				children: t("course.noPackages")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "compare-packages",
				children: c.packages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: p.title }),
					" · ",
					fmtMoney(p.price, p.currency),
					" ·",
					" ",
					t("course.accessTerm", { days: p.accessDays }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "small",
						children: splitLines(p.contents).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
					})
				] }, p.id))
			})
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "table-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "table compare-table",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
					className: "visually-hidden",
					children: t("compare.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("compare.attribute")
				}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
					scope: "col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/courses/${c.slug}`,
						children: c.title
					}), tray.has(c.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ts-button small",
						onClick: () => tray.remove(c.id),
						"aria-label": t("compare.removeNamed", { title: c.title }),
						children: t("common.remove")
					}) }) : null]
				}, c.id))] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "row",
					children: r.label
				}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.cell(c) }, c.id))] }, r.label)) })
			]
		})
	});
}
function ComparePage() {
	const { t } = useI18n();
	const [params] = useSearchParams();
	const tray = useCompareTray();
	const fromUrl = parseCompareIds(params.get("ids"));
	const ids = fromUrl.length > 0 ? fromUrl : tray.items.map((c) => c.id);
	const valid = ids.length >= 2 && ids.length <= 4;
	const query = useCompare(valid ? ids : []);
	usePageMeta(t("compare.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("compare.title"),
			subtitle: t("compare.subtitle")
		}), !valid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: t("compare.needTitle"),
			description: t("compare.needBody", {
				min: 2,
				max: 4
			}),
			action: {
				label: t("courses.title"),
				to: "/courses"
			}
		}) : query.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			label: t("common.loading"),
			block: true
		}) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			error: query.error,
			onRetry: () => void query.refetch()
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareTable, { courses: query.data })]
	});
}
function WishlistPage() {
	const { t, fmtDate } = useI18n();
	const wishlist = useWishlist();
	usePageMeta(t("wishlist.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("wishlist.title"),
			subtitle: t("wishlist.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: wishlist,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: t("wishlist.empty"),
				description: t("wishlist.emptyBody"),
				action: {
					label: t("courses.title"),
					to: "/courses"
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid",
				children: list.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiteCourseCard, {
					course: w.course,
					extra: t("wishlist.addedOn", { date: fmtDate(w.addedAt) })
				}, w.course.id))
			})
		})]
	});
}
function RecentRail() {
	const { t } = useI18n();
	const recent = useRecentlyViewed();
	if (recent.isPending || recent.isError || recent.data.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": "recent-h",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section__head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "section__title",
				id: "recent-h",
				children: t("discovery.recent")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
				to: "/me/wishlist",
				variant: "ghost",
				size: "sm",
				children: t("wishlist.title")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rail",
			children: recent.data.slice(0, 8).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiteCourseCard, { course: r.course }, r.course.id))
		})]
	});
}
/** Home page rail; nothing is rendered (or fetched) for visitors or on the server. */
function RecentlyViewedRail() {
	const { user } = useAuth();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentRail, {}) : null;
}
/** Records the course view for signed-in users (best effort, once per course per mount). */
function useTrackCourseView(courseId) {
	const { user } = useAuth();
	const sent = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!user || !courseId || sent.current === courseId) return;
		sent.current = courseId;
		api(`/api/me/recently-viewed/${courseId}`, { method: "POST" }).catch(() => void 0);
	}, [user, courseId]);
}
function RelatedCourses({ courseId }) {
	const { t } = useI18n();
	const related = useRelated(courseId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": "related-h",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "section__title",
			id: "related-h",
			children: t("discovery.related")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: related,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("discovery.noRelated")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid",
				children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiteCourseCard, { course: c }, c.id))
			})
		})]
	});
}
//#endregion
export { parseCompareIds as a, WishlistPage as i, RecentlyViewedRail as n, useTrackCourseView as o, RelatedCourses as r, ComparePage as t };

//# sourceMappingURL=ComparePage-AbDdlOTX.js.map