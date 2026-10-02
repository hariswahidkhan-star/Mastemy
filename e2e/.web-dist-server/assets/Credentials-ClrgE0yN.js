import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { r as ApiError, t as Button } from "./Button-6CizQUWS.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, n as Notice } from "./misc-Bqc6tFVU.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { m as w2keys } from "./wave2-rI7jjNgp.js";
import { t as Checkbox } from "./Field-Di1lkoGg.js";
import { d as msgKeys, l as isLinkedInAddUrl, n as finalaError, s as awardsApi, t as FinalaError } from "./shared-CFDEeOyq.js";
//#region src/pages/finala/Credentials.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Visually and verbally distinct label for the two credential kinds. */
function CredentialKindBadge({ kind }) {
	const { t } = useI18n();
	const k = kind === "Completion" ? "Completion" : "AssessedKnowledge";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `finala-kind finala-kind--${k}`,
		"data-testid": "credential-kind",
		children: t(`finala.cred.kind.${k}`)
	});
}
/** One-line explanation of what the credential attests (completion never claims assessed knowledge). */
function CredentialKindNote({ kind }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "small muted",
		style: { margin: 0 },
		children: kind === "Completion" ? t("finala.cred.completionNote") : t("finala.cred.assessedNote")
	});
}
/** Fetches the share payload and opens LinkedIn's add-to-profile flow. */
function LinkedInShareButton({ certificateId }) {
	const { t } = useI18n();
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [url, setUrl] = (0, import_react.useState)(null);
	const share = async () => {
		setBusy(true);
		setError(null);
		try {
			const s = await awardsApi.share(certificateId);
			if (!isLinkedInAddUrl(s.linkedInAddToProfileUrl)) throw new Error("unexpected share url");
			setUrl(s.linkedInAddToProfileUrl);
			window.open(s.linkedInAddToProfileUrl, "_blank", "noopener,noreferrer");
		} catch (e) {
			setError(e);
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "stack",
		style: { gap: "var(--space-1)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				loading: busy,
				onClick: () => void share(),
				children: t("finala.cred.linkedin")
			}),
			url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "small",
				href: url,
				target: "_blank",
				rel: "noopener noreferrer",
				"data-testid": "linkedin-url",
				children: t("finala.cred.linkedinOpen")
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "small finala-error",
				role: "alert",
				children: error instanceof ApiError && error.status === 409 ? t("finala.errors.certificate_not_public") : error instanceof ApiError && error.status === 503 ? t("finala.errors.verify_url_not_configured") : finalaError(error, t)
			}) : null
		]
	});
}
/** Learner claim of a completion award (idempotent server-side). Rendered for enrolled learners only. */
function CompletionAwardClaim({ courseId, enrolled }) {
	const { t } = useI18n();
	const { user } = useAuth();
	const [award, setAward] = (0, import_react.useState)(null);
	const claim = useApiMutation(() => awardsApi.claim(courseId), [w2keys.myCertificates], (a) => setAward(a));
	if (!user || !enrolled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack finala-award-claim",
		style: { gap: "var(--space-2)" },
		children: [award ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
			tone: "success",
			title: t("finala.cred.claimed"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialKindBadge, { kind: "Completion" }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: `/verify/${encodeURIComponent(award.code)}`,
					children: award.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialKindNote, { kind: "Completion" })
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "secondary",
			loading: claim.isPending,
			onClick: () => claim.mutate(void 0),
			children: t("finala.cred.claim")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: claim.error })]
	});
}
/** Studio switch: issue completion awards for this course. */
function CompletionAwardToggle({ courseId }) {
	const { t } = useI18n();
	const toast = useToast();
	const setting = useQuery({
		queryKey: msgKeys.completionAward(courseId),
		queryFn: () => awardsApi.setting(courseId)
	});
	const save = useApiMutation((enabled) => awardsApi.setSetting(courseId, enabled), [msgKeys.completionAward(courseId)], (r) => toast.success(r.enabled ? t("finala.cred.awardsOn") : t("finala.cred.awardsOff")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card stack",
		"aria-labelledby": "award-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "award-h",
				children: t("finala.cred.studioTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("finala.cred.studioHelp")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: setting,
				children: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					label: t("finala.cred.studioToggle"),
					checked: save.isPending ? !!save.variables : s.enabled,
					disabled: save.isPending,
					onChange: (e) => save.mutate(e.target.checked)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalaError, { error: save.error })
		]
	});
}
//#endregion
export { LinkedInShareButton as a, CredentialKindNote as i, CompletionAwardToggle as n, CredentialKindBadge as r, CompletionAwardClaim as t };

//# sourceMappingURL=Credentials-ClrgE0yN.js.map