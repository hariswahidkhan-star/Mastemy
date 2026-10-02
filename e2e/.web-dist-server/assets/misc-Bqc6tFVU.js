import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { r as ApiError, t as Button } from "./Button-6CizQUWS.js";
//#region src/components/ui/Spinner.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Spinner({ label, block }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: block ? "spinner-block" : "spinner-wrap",
		role: "status",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "spinner",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: block ? "spinner__label" : "visually-hidden",
			children: label
		})]
	});
}
//#endregion
//#region src/components/ui/ErrorState.tsx
function errorMessage(error, t) {
	if (error instanceof ApiError) {
		if (error.status === 0) return t("errors.network");
		if (error.status === 401) return t("errors.unauthorized");
		if (error.status === 403) return error.is("forbidden") && error.problem?.title ? error.problem.title : t("errors.forbidden");
		if (error.status === 404) return t("errors.notFound");
		if (error.status === 429) return t("errors.rateLimited");
		if (error.status >= 500 && !error.problem) return t("errors.server");
		return error.problem?.detail ?? error.message;
	}
	if (error instanceof TypeError) return t("errors.network");
	return t("errors.generic");
}
function ErrorState({ error, onRetry, title }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "error-state",
		role: "alert",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "error-state__title",
				children: title ?? t("errors.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: errorMessage(error, t) }),
			onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: onRetry,
				children: t("common.retry")
			}) : null
		]
	});
}
//#endregion
//#region src/components/ui/misc.tsx
function Badge({ tone = "neutral", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `badge badge--${tone}`,
		children
	});
}
var STATUS_TONES = {
	Ready: "success",
	Published: "success",
	Approved: "success",
	Active: "success",
	Valid: "success",
	Completed: "success",
	Paid: "success",
	Draft: "neutral",
	Retired: "neutral",
	Archived: "neutral",
	Submitted: "info",
	InReview: "info",
	Reviewed: "info",
	Processing: "info",
	Uploading: "info",
	Updating: "info",
	Proposed: "info",
	Requested: "info",
	AwaitingApproval: "warning",
	AwaitingSourceFile: "warning",
	InContentReview: "warning",
	ChangesRequested: "warning",
	Restricted: "danger",
	Failed: "danger",
	Rejected: "danger",
	Revoked: "danger",
	Expired: "danger",
	Cancelled: "neutral"
};
/** Badge for any server enum status, translated via `status.<Value>`. */
function StatusBadge({ status }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: STATUS_TONES[status] ?? "neutral",
		children: t(`status.${status}`)
	});
}
/** Renders loading / error / content for a react-query result. */
function QueryState({ query, children, loadingLabel }) {
	const { t } = useI18n();
	if (query.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
		label: loadingLabel ?? t("common.loading"),
		block: true
	});
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
		error: query.error,
		onRetry: () => void query.refetch()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children(query.data) });
}
/**
* Inline status for a secondary query (option lists, filters, side panels) whose data the page can do
* without for a moment: a small spinner while it loads, a one-line error with a retry button when it
* fails, nothing otherwise (also nothing while the query is disabled). Renders nothing on the server and
* in the hydration pass, so a query that failed during SSR cannot cause a hydration mismatch.
*/
function QueryStatus({ query, label }) {
	const { t } = useI18n();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted) return null;
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "query-status small",
		role: "alert",
		children: [
			label ? `${label}: ` : "",
			errorMessage(query.error, t),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => void query.refetch(),
				children: t("common.retry")
			})
		]
	});
	if (query.isPending && query.fetchStatus !== "idle") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { label: label ? `${label}: ${t("common.loading")}` : t("common.loading") });
	return null;
}
function Pagination({ page, pageSize, total, onPage }) {
	const { t } = useI18n();
	const pages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
	if (pages <= 1) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "pagination",
		"aria-label": t("common.pagination"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "sm",
				disabled: page <= 1,
				onClick: () => onPage(page - 1),
				children: t("common.previous")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-live": "polite",
				children: t("common.pageOf", {
					page,
					pages
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "sm",
				disabled: page >= pages,
				onClick: () => onPage(page + 1),
				children: t("common.next")
			})
		]
	});
}
function PageHeader({ title, subtitle, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "page-header",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "page-title",
			children: title
		}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "page-subtitle",
			children: subtitle
		}) : null] }), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-header__actions",
			children: actions
		}) : null]
	});
}
function Notice({ tone = "info", title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `notice notice--${tone}`,
		role: tone === "danger" ? "alert" : "note",
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "notice__title",
			children: title
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children })]
	});
}
//#endregion
export { QueryState as a, ErrorState as c, Pagination as i, errorMessage as l, Notice as n, QueryStatus as o, PageHeader as r, StatusBadge as s, Badge as t, Spinner as u };

//# sourceMappingURL=misc-Bqc6tFVU.js.map