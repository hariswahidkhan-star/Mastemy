import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { i as api, n as ButtonLink, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, l as errorMessage, n as Notice, r as PageHeader, s as StatusBadge } from "./misc-Bqc6tFVU.js";
import { n as useApiMutation, t as keys, u as useOnboardingStatus } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { i as boolean, o as object, p as useForm, s as string, u } from "./zod-piP6K-Dk.js";
import { a as Textarea, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
//#region src/pages/public/TeachPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var YT_RE = /^https?:\/\/(www\.|m\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\//i;
function makeSchema(t, inviteOnly) {
	return object({
		headline: string().trim().min(10, t("validation.minChars", { n: 10 })).max(160),
		bio: string().trim().min(80, t("validation.minChars", { n: 80 })).max(4e3),
		expertiseEvidence: string().trim().min(40, t("validation.minChars", { n: 40 })).max(4e3),
		testVideoUrl: string().trim().regex(YT_RE, t("validation.youtubeUrl")),
		agreementAccepted: boolean().refine((v) => v, t("teach.agreementRequired")),
		invitationCode: inviteOnly ? string().trim().min(4, t("teach.invitationRequired")) : string().trim().optional()
	});
}
function ApplicationForm({ status }) {
	const { t } = useI18n();
	const toast = useToast();
	const schema = (0, import_react.useMemo)(() => makeSchema(t, status.inviteOnly), [t, status.inviteOnly]);
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: u(schema),
		defaultValues: {
			agreementAccepted: false,
			invitationCode: ""
		}
	});
	const submit = useApiMutation((v) => api("/api/instructor-applications", {
		method: "POST",
		body: {
			...v,
			invitationCode: v.invitationCode || void 0
		}
	}), [keys.onboarding], () => toast.success(t("teach.submitted")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "card",
		onSubmit: handleSubmit((v) => submit.mutate(v)),
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("teach.formTitle") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("teach.headline"),
				error: errors.headline?.message,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("headline") })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("teach.bio"),
				hint: t("teach.bioHint"),
				error: errors.bio?.message,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 6,
					...register("bio")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("teach.evidence"),
				hint: t("teach.evidenceHint"),
				error: errors.expertiseEvidence?.message,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 5,
					...register("expertiseEvidence")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("teach.testVideo"),
				hint: t("teach.testVideoHint"),
				error: errors.testVideoUrl?.message,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "url",
					inputMode: "url",
					...register("testVideoUrl")
				})
			}),
			status.inviteOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("teach.invitationCode"),
				error: errors.invitationCode?.message,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					autoComplete: "off",
					...register("invitationCode")
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("teach.agreement"),
				error: errors.agreementAccepted?.message,
				...register("agreementAccepted")
			}),
			submit.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: errorMessage(submit.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				loading: submit.isPending,
				children: t("teach.submit")
			})
		]
	});
}
function TeachPage() {
	const { t, fmtDate } = useI18n();
	const { user } = useAuth();
	const status = useOnboardingStatus();
	usePageMeta(t("teach.title"), t("teach.subtitle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		style: { maxInlineSize: 860 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("teach.title"),
				subtitle: t("teach.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "visually-hidden",
				children: t("teach.pointsHeading")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid-2",
				style: { marginBlockEnd: "var(--space-5)" },
				children: [
					"model",
					"channel",
					"review",
					"earn"
				].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card card--flat",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t(`teach.point.${k}.title`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t(`teach.point.${k}.body`)
					})]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: status,
				children: (s) => {
					if (s.myApplication) {
						const a = s.myApplication;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("teach.yourApplication") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status }),
									" ",
									a.createdAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "small muted",
										children: fmtDate(a.createdAt)
									}) : null
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(`teach.appStatus.${a.status}`) }),
								a.reviewerNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
									tone: "info",
									title: t("teach.reviewerNotes"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											whiteSpace: "pre-wrap",
											margin: 0
										},
										children: a.reviewerNotes
									})
								}) : null,
								a.status === "Approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
									to: "/studio",
									children: t("nav.studio")
								}) : null
							]
						});
					}
					if (s.paused) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warning",
						title: t("teach.pausedTitle"),
						children: t("teach.pausedBody")
					});
					if (!s.registrationOpen && !s.inviteOnly) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "info",
						title: t("teach.closedTitle"),
						children: t("teach.closedBody")
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [s.inviteOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "info",
						title: t("teach.inviteTitle"),
						children: t("teach.inviteBody")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "success",
						title: t("teach.openTitle"),
						children: t("teach.openBody")
					}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationForm, { status: s }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("teach.loginToApply") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
								to: "/login?next=/teach",
								children: t("nav.login")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
								to: "/register",
								variant: "secondary",
								children: t("nav.register")
							})]
						})]
					})] });
				}
			})
		]
	});
}
//#endregion
export { TeachPage };

//# sourceMappingURL=TeachPage-BS6DQA2L.js.map