import { a as Link, i as require_jsx_runtime, m as useNavigate, p as useLocation, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { i as api, n as ButtonLink, t as Button } from "./Button-6CizQUWS.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { l as errorMessage, t as Badge } from "./misc-Bqc6tFVU.js";
import { i as useCompareTray, n as canCompare, r as compareHref } from "./compare-CFsa3wCB.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { m as w2keys, p as useWishlist } from "./wave2-rI7jjNgp.js";
//#region src/components/Discovery.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Signed-in only: renders inside components that already know a user exists. */
function WishlistToggle({ courseId, title }) {
	const { t } = useI18n();
	const toast = useToast();
	const wishlist = useWishlist();
	const saved = !!wishlist.data?.some((w) => w.course.id === courseId);
	const toggle = useApiMutation((add) => api(`/api/me/wishlist/${courseId}`, { method: add ? "POST" : "DELETE" }), [w2keys.wishlist], (_r, add) => toast.success(add ? t("wishlist.added") : t("wishlist.removed")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		size: "sm",
		variant: saved ? "secondary" : "ghost",
		"aria-pressed": saved,
		"aria-label": saved ? t("wishlist.removeNamed", { title }) : t("wishlist.addNamed", { title }),
		loading: toggle.isPending,
		disabled: wishlist.isPending,
		onClick: () => toggle.mutate(!saved, { onError: (e) => toast.error(errorMessage(e, t)) }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: saved ? "♥" : "♡"
			}),
			" ",
			saved ? t("wishlist.saved") : t("wishlist.save")
		]
	});
}
function WishlistButton({ courseId, title }) {
	const { t } = useI18n();
	const { user } = useAuth();
	const location = useLocation();
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ButtonLink, {
		size: "sm",
		variant: "ghost",
		to: `/login?next=${encodeURIComponent(location.pathname)}`,
		"aria-label": t("wishlist.loginToSave", { title }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: "♡"
			}),
			" ",
			t("wishlist.save")
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WishlistToggle, {
		courseId,
		title
	});
}
function CompareToggle({ item }) {
	const { t } = useI18n();
	const toast = useToast();
	const tray = useCompareTray();
	const selected = tray.has(item.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "sm",
		variant: selected ? "secondary" : "ghost",
		"aria-pressed": selected,
		"aria-label": selected ? t("compare.removeNamed", { title: item.title }) : t("compare.addNamed", { title: item.title }),
		onClick: () => {
			if (!tray.toggle(item)) toast.info(t("compare.full", { n: 4 }));
		},
		children: selected ? t("compare.selected") : t("compare.add")
	});
}
/** Fixed tray listing the selected courses; rendered once in the layout. */
function CompareTray() {
	const { t } = useI18n();
	const tray = useCompareTray();
	const navigate = useNavigate();
	const location = useLocation();
	if (tray.items.length === 0 || location.pathname === "/compare") return null;
	const ready = canCompare(tray.items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "compare-tray",
		"aria-label": t("compare.tray"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container compare-tray__inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("compare.trayTitle", {
					n: tray.items.length,
					max: 4
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "compare-tray__list",
					children: tray.items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ts-button",
						onClick: () => tray.remove(c.id),
						"aria-label": t("compare.removeNamed", { title: c.title }),
						children: "✕"
					})] }, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row",
					children: [
						!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "small",
							children: t("compare.needMore")
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: tray.clear,
							children: t("compare.clear")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							disabled: !ready,
							onClick: () => navigate(compareHref(tray.items)),
							children: t("compare.go")
						})
					]
				})
			]
		})
	});
}
/** Compact card for the lite course shape used by wishlist / recently viewed / related lists. */
function LiteCourseCard({ course, extra }) {
	const { t, fmtMoney } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "course-card-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/courses/${course.slug}`,
			className: "course-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "course-card__band",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "course-card__title",
					children: course.title
				}),
				course.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted small",
					children: course.subtitle
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "course-card__meta",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`level.${course.level}`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`language.${course.language}`) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small",
					style: { margin: 0 },
					children: course.minPrice != null && course.currency ? t("discovery.fromPrice", { price: fmtMoney(course.minPrice, course.currency) }) : t("discovery.freeOnly")
				}),
				extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					style: { margin: 0 },
					children: extra
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "course-card__actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WishlistButton, {
				courseId: course.id,
				title: course.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareToggle, { item: {
				id: course.id,
				slug: course.slug,
				title: course.title
			} })]
		})]
	});
}
//#endregion
export { WishlistButton as i, CompareTray as n, LiteCourseCard as r, CompareToggle as t };

//# sourceMappingURL=Discovery-D4EXL3Q0.js.map