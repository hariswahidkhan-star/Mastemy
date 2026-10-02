import { _ as require_react, b as __toESM, i as require_jsx_runtime, m as useNavigate, p as useLocation, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as Button } from "./Button-6CizQUWS.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
//#region src/pages/finala/Reauth.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Non-blocking: shown when /api/auth/me reports that roles or MFA changed since sign-in. */
function ReauthBanner() {
	const { t } = useI18n();
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [dismissed, setDismissed] = (0, import_react.useState)(false);
	if (!user?.requiresReauth || dismissed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container",
		style: { paddingBlockStart: "var(--space-3)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "notice notice--warning finala-reauth",
			role: "status",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "notice__title",
				children: t("finala.reauth.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				style: { flexWrap: "wrap" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("finala.reauth.body") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => {
							const next = location.pathname + location.search;
							logout().then(() => navigate(`/login?next=${encodeURIComponent(next)}&reason=reauth`));
						},
						children: t("finala.reauth.button")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setDismissed(true),
						children: t("finala.reauth.later")
					})]
				})]
			})]
		})
	});
}
//#endregion
export { ReauthBanner };

//# sourceMappingURL=Reauth-DWGeqQRy.js.map