import { a as Link, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { n as Notice, r as PageHeader } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
//#region src/pages/public/StaticPages.tsx
var import_jsx_runtime = require_jsx_runtime();
var HELP_TOPICS = [
	"free",
	"packages",
	"notes",
	"mcq",
	"exam",
	"cert",
	"progress",
	"refund",
	"unavailable",
	"access"
];
function HelpPage() {
	const { t } = useI18n();
	usePageMeta(t("help.title"), t("help.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		style: { maxInlineSize: 860 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("help.title"),
				subtitle: t("help.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "curriculum",
				children: HELP_TOPICS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: t(`help.q.${k}`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { padding: "0 var(--space-4) var(--space-4)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { margin: 0 },
						children: t(`help.a.${k}`)
					})
				})] }, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: { marginBlockStart: "var(--space-5)" },
				children: [
					t("help.more"),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						children: t("nav.contact")
					})
				]
			})
		]
	});
}
var ABOUT_SECTIONS = [
	"mission",
	"model",
	"quality",
	"certs",
	"privacy"
];
function AboutPage() {
	const { t } = useI18n();
	usePageMeta(t("about.title"), t("about.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		style: { maxInlineSize: 860 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("about.title"),
			subtitle: t("about.subtitle")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "stack",
			children: ABOUT_SECTIONS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "section__title",
				children: t(`about.${k}.title`)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(`about.${k}.body`) })] }, k))
		})]
	});
}
function ContactPage() {
	const { t } = useI18n();
	usePageMeta(t("contact.title"), t("contact.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		style: { maxInlineSize: 860 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("contact.title"),
				subtitle: t("contact.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				title: t("contact.noEmailTitle"),
				children: t("contact.noEmailBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-2",
				style: { marginBlockStart: "var(--space-5)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("contact.learners.title") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: t("contact.learners.body")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/help",
								children: t("nav.help")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("contact.instructors.title") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: t("contact.instructors.body")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/teach",
								children: t("nav.teach")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("contact.employers.title") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: t("contact.employers.body")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/verify",
								children: t("nav.verify")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card card--flat",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("contact.rights.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small",
							children: t("contact.rights.body")
						})]
					})
				]
			})
		]
	});
}
function NotFoundPage() {
	const { t } = useI18n();
	usePageMeta(t("notFound.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: t("notFound.title"),
			description: t("notFound.body"),
			action: {
				label: t("nav.home"),
				to: "/"
			}
		})
	});
}
//#endregion
export { AboutPage, ContactPage, HelpPage, NotFoundPage };

//# sourceMappingURL=StaticPages-ZHx0yj0O.js.map