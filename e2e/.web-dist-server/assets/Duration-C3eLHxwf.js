import { i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as durationParts } from "./format-B7uvlQ7u.js";
//#region src/components/Duration.tsx
var import_jsx_runtime = require_jsx_runtime();
function Duration({ seconds }) {
	const { t } = useI18n();
	const { h, m } = durationParts(seconds);
	if (h > 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t("format.hoursMinutes", {
		h,
		m
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t("format.minutes", { m: Math.max(m, seconds > 0 ? 1 : 0) }) });
}
//#endregion
export { Duration as t };

//# sourceMappingURL=Duration-C3eLHxwf.js.map