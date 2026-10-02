import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, m as useNavigate, p as useLocation, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { i as api, t as Button } from "./Button-6CizQUWS.js";
import { m as w2keys, u as useNotifications } from "./wave2-rI7jjNgp.js";
//#region src/components/NotificationBell.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Badge text for the unread count: hidden at 0, capped at "99+". */
function unreadBadge(count) {
	if (!count || count < 1) return null;
	return count > 99 ? "99+" : String(count);
}
/** Only in-app paths are followed; anything else falls back to the notifications page. */
function safeLink(link) {
	return link && link.startsWith("/") && !link.startsWith("//") ? link : "/me/notifications";
}
function NotificationBellView({ data, open, onToggle, onOpenItem, onReadAll, readingAll, failed, onRetry }) {
	const { t, fmtDate } = useI18n();
	const menuId = (0, import_react.useId)();
	const unread = data?.unreadCount ?? 0;
	const badge = unreadBadge(unread);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "sm",
			"aria-expanded": open,
			"aria-controls": menuId,
			"aria-label": unread > 0 ? t("notifications.bellUnread", { n: unread }) : t("notifications.bell"),
			onClick: onToggle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: "🔔"
			}), badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bell__count",
				"aria-hidden": "true",
				"data-testid": "bell-count",
				children: badge
			}) : null]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bell__panel",
			id: menuId,
			role: "region",
			"aria-label": t("notifications.title"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row row--between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("notifications.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onReadAll,
						disabled: unread === 0,
						loading: readingAll,
						children: t("notifications.readAll")
					})]
				}),
				!data && failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "small",
					role: "alert",
					children: [
						t("errors.generic"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: onRetry,
							children: t("common.retry")
						})
					]
				}) : !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("common.loading")
				}) : data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("notifications.empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "bell__list",
					children: data.items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: n.readAt ? "" : "bell__item--unread",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "bell__item",
							onClick: () => onOpenItem(n),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [n.readAt ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "visually-hidden",
								children: [t("notifications.unread"), " "]
							}), n.title] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small muted",
								children: [
									t(`notifications.kind.${n.kind}`),
									" · ",
									fmtDate(n.createdAt)
								]
							})]
						})
					}, n.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/me/notifications",
					className: "small",
					onClick: onToggle,
					children: t("notifications.seeAll")
				})
			]
		}) : null]
	});
}
/** Header bell (signed-in users only): unread count polled every minute, dropdown with the latest items. */
function NotificationBell() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [readingAll, setReadingAll] = (0, import_react.useState)(false);
	const qc = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();
	const query = useNotifications(1, 6);
	const ref = (0, import_react.useRef)(null);
	const { refetch } = query;
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => void refetch(), 6e4);
		return () => window.clearInterval(id);
	}, [refetch]);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [location.pathname]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDoc = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", onDoc);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDoc);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);
	const refresh = () => qc.invalidateQueries({ queryKey: w2keys.notifications });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBellView, {
			data: query.data,
			failed: query.isError,
			onRetry: () => void refetch(),
			open,
			readingAll,
			onToggle: () => {
				setOpen((o) => !o);
				if (!open) refetch();
			},
			onReadAll: () => {
				setReadingAll(true);
				api("/api/me/notifications/read-all", { method: "POST" }).then(refresh).catch(() => void 0).finally(() => setReadingAll(false));
			},
			onOpenItem: (n) => {
				setOpen(false);
				if (!n.readAt) api(`/api/me/notifications/${n.id}/read`, { method: "POST" }).then(refresh).catch(() => void 0);
				navigate(safeLink(n.link));
			}
		})
	});
}
//#endregion
export { unreadBadge as i, NotificationBellView as n, safeLink as r, NotificationBell as t };

//# sourceMappingURL=NotificationBell-CoyJb6Q_.js.map