import { _ as require_react, b as __toESM, h as useParams, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { c as ErrorState, n as Notice, r as PageHeader, u as Spinner } from "./misc-Bqc6tFVU.js";
import { n as Field, r as Input } from "./Field-Di1lkoGg.js";
import { r as CredentialKindBadge } from "./Credentials-ClrgE0yN.js";
//#region src/pages/public/VerifyPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function VerifyResult({ code }) {
	const { t, fmtDate } = useI18n();
	const q = useQuery({
		queryKey: ["verify", code],
		queryFn: () => api(`/api/certificates/verify/${encodeURIComponent(code)}`),
		retry: false
	});
	if (q.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
		label: t("verify.checking"),
		block: true
	});
	if (q.isError) {
		if (q.error instanceof ApiError && q.error.status === 404) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			title: t("verify.notFoundTitle"),
			children: t("verify.notFoundBody", { code })
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			error: q.error,
			onRetry: () => void q.refetch()
		});
	}
	const c = q.data;
	const valid = c.status === "Valid";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: valid ? "success" : "danger",
				title: valid ? t("verify.valid") : t("verify.revoked"),
				children: valid ? t("verify.validBody") : c.revocationReason ?? t("verify.revokedBody")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "row",
				style: { marginBlock: "var(--space-3)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialKindBadge, { kind: c.kind }), c.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.title }) : null]
			}),
			c.verificationLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				"data-testid": "verification-label",
				children: c.verificationLabel
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "kv",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("verify.code") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mono",
						children: c.code
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("verify.recipient") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.recipientName }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("verify.course") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.courseTitle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("verify.issued") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtDate(c.issuedAt) }),
					c.assessmentCriteria ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("verify.criteria") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.assessmentCriteria })] }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				style: { marginBlockStart: "var(--space-4)" },
				children: t("verify.disclaimer")
			})
		]
	});
}
function VerifyPage() {
	const { code } = useParams();
	const { t } = useI18n();
	const navigate = useNavigate();
	const [input, setInput] = (0, import_react.useState)(code ?? "");
	usePageMeta(t("verify.title"), t("verify.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		style: { maxInlineSize: 760 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("verify.title"),
				subtitle: t("verify.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card card--flat",
				onSubmit: (e) => {
					e.preventDefault();
					const v = input.trim();
					if (v) navigate(`/verify/${encodeURIComponent(v)}`);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("verify.code"),
					hint: t("verify.codeHint"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: input,
						onChange: (e) => setInput(e.target.value),
						autoComplete: "off",
						required: true,
						maxLength: 64
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: t("verify.submit")
				})]
			}),
			code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginBlockStart: "var(--space-5)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifyResult, { code })
			}) : null
		]
	});
}
//#endregion
export { VerifyPage };

//# sourceMappingURL=VerifyPage-BO4MhLyA.js.map