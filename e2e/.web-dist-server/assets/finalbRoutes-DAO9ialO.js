import { _ as require_react, b as __toESM, i as require_jsx_runtime, l as Route, p as useLocation, r as useI18n, s as Navigate } from "./I18nProvider-Cc4FX485.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { u as Spinner } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
//#region src/auth/RequireRole.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Client-side route guard. It only improves UX; the server enforces every permission.
* With no roles given, any signed-in user may pass.
*/
function RequireRole({ roles, children }) {
	const { user, initializing, hasRole } = useAuth();
	const { t } = useI18n();
	const location = useLocation();
	if (initializing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
		label: t("common.loading"),
		block: true
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: `/login?next=${encodeURIComponent(location.pathname + location.search)}`,
		replace: true
	});
	if (roles && roles.length > 0 && !hasRole(...roles)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: t("auth.forbiddenTitle"),
		description: t("auth.forbiddenBody"),
		action: {
			label: t("nav.home"),
			to: "/"
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
//#region src/routes/finalbRoutes.tsx
var sso = () => import("./Sso-BGSDEWUY.js");
var SsoStartPage = (0, import_react.lazy)(() => sso().then((m) => ({ default: m.SsoStartPage })));
var SsoCompletePage = (0, import_react.lazy)(() => sso().then((m) => ({ default: m.SsoCompletePage })));
var AdminCategoriesPage = (0, import_react.lazy)(() => import("./CategoriesAdmin-iQpMIwbP.js").then((m) => ({ default: m.AdminCategoriesPage })));
var OrderBrowserPage = (0, import_react.lazy)(() => import("./CommerceB-C6OT0gH0.js").then((m) => ({ default: m.OrderBrowserPage })));
var StaffEnterprisePage = (0, import_react.lazy)(() => import("./Enterprise-DDsKnf7-.js").then((m) => ({ default: m.StaffEnterprisePage })));
function L({ children }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			label: t("common.loading"),
			block: true
		}),
		children
	});
}
var STAFF = ["Admin", "SuperAdmin"];
var FINANCE = [
	"Finance",
	"Admin",
	"SuperAdmin"
];
/** Admin navigation entries for this area (spread into ADMIN_SECTIONS). */
var FINALB_ADMIN_SECTIONS = [
	{
		to: "/admin/orders",
		key: "fbOrders",
		roles: FINANCE,
		label: "finalb.nav.orders"
	},
	{
		to: "/admin/categories",
		key: "fbCategories",
		roles: STAFF,
		label: "finalb.nav.categories"
	},
	{
		to: "/admin/enterprise",
		key: "fbEnterprise",
		roles: STAFF,
		label: "finalb.nav.enterprise"
	}
];
/** Public routes (children of the main layout). */
var finalbRoutes = [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
	path: "sso/complete",
	element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SsoCompletePage, {}) })
}, "fb-sso-complete"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
	path: "sso/:slug",
	element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SsoStartPage, {}) })
}, "fb-sso-start")];
/** Staff/finance routes (children of /admin). */
var finalbAdminRoutes = [
	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
		path: "orders",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
			roles: FINANCE,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderBrowserPage, {}) })
		})
	}, "fb-orders"),
	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
		path: "categories",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
			roles: STAFF,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCategoriesPage, {}) })
		})
	}, "fb-categories"),
	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
		path: "enterprise",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireRole, {
			roles: STAFF,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(L, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffEnterprisePage, {}) })
		})
	}, "fb-enterprise")
];
//#endregion
export { RequireRole as i, finalbAdminRoutes as n, finalbRoutes as r, FINALB_ADMIN_SECTIONS as t };

//# sourceMappingURL=finalbRoutes-DAO9ialO.js.map