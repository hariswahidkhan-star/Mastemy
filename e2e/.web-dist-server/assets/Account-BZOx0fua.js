import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { o as apiUrl, t as Button } from "./Button-6CizQUWS.js";
import { a as QueryState, n as Notice } from "./misc-Bqc6tFVU.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { t as AppealButton } from "./Trust-B2S3OlzB.js";
import { c as calendarApi, d as msgKeys, t as FinalaError } from "./shared-CFDEeOyq.js";
//#region src/pages/finala/Account.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function HiddenThreadNotice({ moderation }) {
	const { t, fmtDate } = useI18n();
	if (!moderation?.hidden) return null;
	const target = moderation.appealTargetType === "DiscussionReply" ? "DiscussionReply" : "Discussion";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
		tone: "warning",
		title: t("finala.hiddenPost.title"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: { marginBlockStart: 0 },
				"data-testid": "hidden-reason",
				children: [t("finala.hiddenPost.reason", { reason: moderation.reason || t("finala.hiddenPost.noReason") }), moderation.hiddenAt ? ` (${fmtDate(moderation.hiddenAt)})` : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				children: t("finala.hiddenPost.onlyYou")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppealButton, {
					targetType: target,
					targetId: moderation.appealTargetId
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "btn btn--ghost btn--sm",
					to: moderation.appealsPage?.startsWith("/") ? moderation.appealsPage : "/account/appeals",
					children: t("finala.hiddenPost.myAppeals")
				})]
			})
		]
	});
}
function absoluteFeedUrl(path) {
	const raw = apiUrl(path);
	try {
		return new URL(raw, window.location.origin).href;
	} catch {
		return raw;
	}
}
function CalendarSubscription() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const [fresh, setFresh] = (0, import_react.useState)(null);
	const [confirmRevoke, setConfirmRevoke] = (0, import_react.useState)(false);
	const status = useQuery({
		queryKey: msgKeys.calendarToken,
		queryFn: calendarApi.status
	});
	const create = useApiMutation(() => calendarApi.create(), [msgKeys.calendarToken], (r) => setFresh(r));
	const revoke = useApiMutation(() => calendarApi.revoke(), [msgKeys.calendarToken], () => {
		setFresh(null);
		setConfirmRevoke(false);
		toast.success(t("finala.cal.revoked"));
	});
	const url = fresh ? absoluteFeedUrl(fresh.url) : "";
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			toast.success(t("finala.cal.copied"));
		} catch {
			toast.error(t("finala.cal.copyFailed"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card stack",
		"aria-labelledby": "cal-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "cal-h",
				children: t("finala.cal.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finala.cal.help")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: status,
				children: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					s.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "small",
						children: [t("finala.cal.active", { date: fmtDate(s.createdAt) }), s.lastUsedAt ? ` ${t("finala.cal.lastUsed", { date: fmtDate(s.lastUsedAt) })}` : ""]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finala.cal.inactive")
					}),
					fresh ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stack",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("finala.cal.url"),
							hint: t("finala.cal.urlHint"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								readOnly: true,
								value: url,
								onFocus: (e) => e.currentTarget.select()
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "row",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => void copy(),
								children: t("finala.cal.copy")
							})
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							loading: create.isPending,
							onClick: () => create.mutate(void 0),
							children: s.active ? t("finala.cal.rotate") : t("finala.cal.create")
						}), s.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setConfirmRevoke(true),
							children: t("finala.cal.revoke")
						}) : null]
					}),
					s.active && !fresh ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("finala.cal.shownOnce")
					}) : null
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: create.error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmRevoke,
				danger: true,
				title: t("finala.cal.revokeTitle"),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("finala.cal.revokeBody") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: revoke.error })] }),
				confirmLabel: t("finala.cal.revoke"),
				loading: revoke.isPending,
				onCancel: () => setConfirmRevoke(false),
				onConfirm: () => revoke.mutate(void 0)
			})
		]
	});
}
//#endregion
export { HiddenThreadNotice as n, CalendarSubscription as t };

//# sourceMappingURL=Account-BZOx0fua.js.map