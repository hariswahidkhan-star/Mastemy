import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { m as setSession, r as ApiError, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, n as Notice, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { n as accountKeys, o as parseInterests, s as timeZones, t as accountApi } from "./account-CkAe5QCo.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { a as cleanCode, i as accountError } from "./Mfa-BgmY6MjV.js";
import { n as AccountShell } from "./SecurityPage-CnhxCPZ4.js";
//#region src/pages/account/ProfilePages.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var MAX_LINKS = 5;
/** Mirrors the server's link rule: https only, no credentials in the URL. */
function isValidProfileUrl(url) {
	try {
		const u = new URL(url);
		return u.protocol === "https:" && !u.username && !u.password && !!u.hostname;
	} catch {
		return false;
	}
}
function ProfileForm({ profile }) {
	const { t } = useI18n();
	const { hasRole, refreshUser } = useAuth();
	const toast = useToast();
	const [displayName, setDisplayName] = (0, import_react.useState)(profile.displayName);
	const [headline, setHeadline] = (0, import_react.useState)(profile.headline);
	const [bio, setBio] = (0, import_react.useState)(profile.bio);
	const [language, setLanguage] = (0, import_react.useState)(profile.preferredLanguage);
	const [timeZone, setTimeZone] = (0, import_react.useState)(profile.timeZone || "UTC");
	const [links, setLinks] = (0, import_react.useState)(profile.links);
	const [publicProfile, setPublicProfile] = (0, import_react.useState)(profile.publicInstructorProfile);
	const zones = (0, import_react.useMemo)(() => timeZones(profile.timeZone), [profile.timeZone]);
	const isInstructor = hasRole("Instructor");
	const linkErrors = links.map((l) => !l.label.trim() || l.label.trim().length > 50 ? t("account.profile.linkLabelRule") : !isValidProfileUrl(l.url.trim()) ? t("account.profile.linkUrlRule") : void 0);
	const nameError = displayName.trim().length < 2 || displayName.trim().length > 80 ? t("validation.minChars", { n: 2 }) : void 0;
	const invalid = !!nameError || headline.length > 160 || bio.length > 5e3 || linkErrors.some(Boolean);
	const save = useApiMutation(() => accountApi.updateProfile({
		displayName: displayName.trim(),
		headline: headline.trim(),
		bio: bio.trim(),
		preferredLanguage: language,
		timeZone,
		links: links.map((l) => ({
			label: l.label.trim(),
			url: l.url.trim()
		})),
		...isInstructor ? { publicInstructorProfile: publicProfile } : {}
	}), [accountKeys.profile], () => {
		toast.success(t("account.profile.saved"));
		refreshUser();
	});
	const setLink = (i, patch) => setLinks((ls) => ls.map((l, j) => j === i ? {
		...l,
		...patch
	} : l));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "card stack",
		noValidate: true,
		onSubmit: (e) => {
			e.preventDefault();
			if (!invalid) save.mutate(void 0);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				style: { alignItems: "center" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					style: {
						inlineSize: 56,
						blockSize: 56,
						borderRadius: "50%",
						display: "grid",
						placeItems: "center",
						fontWeight: 700,
						background: "var(--c-primary-soft)",
						color: "var(--c-text)"
					},
					children: profile.initials
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { minInlineSize: 0 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: { overflowWrap: "anywhere" },
							children: profile.email
						}),
						" ",
						profile.emailVerified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							children: t("account.profile.emailVerified")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "warning",
							children: t("account.profile.emailUnverified")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							style: { margin: 0 },
							children: t("account.profile.noAvatar")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("auth.displayName"),
				error: nameError,
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					autoComplete: "name",
					value: displayName,
					maxLength: 80,
					onChange: (e) => setDisplayName(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("account.profile.headline"),
				hint: t("account.common.chars", {
					n: headline.length,
					max: 160
				}),
				error: headline.length > 160 ? t("account.error.invalid_headline") : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: headline,
					onChange: (e) => setHeadline(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("account.profile.bio"),
				hint: t("account.common.chars", {
					n: bio.length,
					max: 5e3
				}),
				error: bio.length > 5e3 ? t("account.error.invalid_bio") : void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 6,
					value: bio,
					onChange: (e) => setBio(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.preferredLanguage"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: language,
						onChange: (e) => setLanguage(e.target.value),
						options: [{
							value: "en",
							label: t("language.en")
						}, {
							value: "ar",
							label: t("language.ar")
						}]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("account.profile.timeZone"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: timeZone,
						onChange: (e) => setTimeZone(e.target.value),
						options: zones.map((z) => ({
							value: z,
							label: z.replace(/_/g, " ")
						}))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				style: {
					border: "none",
					padding: 0,
					margin: 0
				},
				className: "stack",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "field__label",
						children: t("account.profile.links")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small muted",
						children: t("account.profile.linksHelp", { max: MAX_LINKS })
					}),
					links.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("account.profile.noLinks")
					}) : null,
					links.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "row",
						style: {
							alignItems: "flex-end",
							flexWrap: "wrap"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("account.profile.linkLabel", { n: i + 1 }),
								className: "grow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: l.label,
									maxLength: 50,
									onChange: (e) => setLink(i, { label: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("account.profile.linkUrl", { n: i + 1 }),
								className: "grow",
								error: l.url || l.label ? linkErrors[i] : void 0,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "url",
									dir: "ltr",
									placeholder: "https://",
									value: l.url,
									onChange: (e) => setLink(i, { url: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setLinks((ls) => ls.filter((_, j) => j !== i)),
								"aria-label": t("account.profile.removeLink", { n: i + 1 }),
								children: t("account.common.remove")
							})
						]
					}, i)),
					links.length < MAX_LINKS ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: () => setLinks((ls) => [...ls, {
							label: "",
							url: ""
						}]),
						children: t("account.profile.addLink")
					}) }) : null
				]
			}),
			isInstructor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					label: t("account.profile.publicProfile"),
					hint: t("account.profile.publicProfileHint"),
					checked: publicProfile,
					onChange: (e) => setPublicProfile(e.target.checked)
				}), profile.publicInstructorProfile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: `/instructors/${profile.id}`,
					children: t("account.profile.viewPublic")
				}) : null]
			}) : null,
			save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: accountError(save.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				loading: save.isPending,
				disabled: invalid,
				children: t("common.save")
			}) })
		]
	});
}
function ProfilePage() {
	const { t } = useI18n();
	usePageMeta(t("account.profile.title"), void 0, { noindex: true });
	const profile = useQuery({
		queryKey: accountKeys.profile,
		queryFn: accountApi.profile
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountShell, {
		title: t("account.profile.title"),
		subtitle: t("account.profile.subtitle"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: profile,
			children: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, { profile: p }, p.id)
		})
	});
}
/** Onboarding after registration (and editable later): learning goals. Skippable. */
function WelcomePage() {
	const { t, lang } = useI18n();
	const navigate = useNavigate();
	const toast = useToast();
	usePageMeta(t("account.goals.title"), void 0, { noindex: true });
	const goals = useQuery({
		queryKey: accountKeys.goals,
		queryFn: accountApi.goals
	});
	const [text, setText] = (0, import_react.useState)("");
	const [interests, setInterests] = (0, import_react.useState)("");
	const [language, setLanguage] = (0, import_react.useState)(lang);
	(0, import_react.useEffect)(() => {
		if (!goals.data) return;
		setText(goals.data.goals);
		setInterests(goals.data.skillsOfInterest.join(", "));
		if (goals.data.learningLanguage) setLanguage(goals.data.learningLanguage);
	}, [goals.data]);
	const list = parseInterests(interests);
	const langValid = /^[a-z]{2,3}(-[A-Za-z]{2,4})?$/.test(language);
	const invalid = text.length > 2e3 || list.length > 20 || list.some((s) => s.length > 60) || !langValid;
	const save = useApiMutation(() => accountApi.putGoals({
		goals: text.trim(),
		skillsOfInterest: list,
		learningLanguage: language
	}), [accountKeys.goals], () => {
		toast.success(t("account.goals.saved"));
		navigate("/me");
	});
	const isNew = !goals.data?.updatedAt;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		style: { maxInlineSize: 720 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-title",
				children: isNew ? t("account.goals.welcome") : t("account.goals.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "page-subtitle",
				children: t("account.goals.intro")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: goals,
				children: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "card stack",
					noValidate: true,
					onSubmit: (e) => {
						e.preventDefault();
						if (!invalid) save.mutate(void 0);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("account.goals.goals"),
							hint: t("account.common.chars", {
								n: text.length,
								max: 2e3
							}),
							error: text.length > 2e3 ? t("account.goals.tooLong") : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 5,
								value: text,
								onChange: (e) => setText(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("account.goals.interests"),
							hint: t("account.goals.interestsHint", { n: list.length }),
							error: list.length > 20 || list.some((s) => s.length > 60) ? t("account.goals.interestsRule") : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: interests,
								onChange: (e) => setInterests(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("account.goals.language"),
							hint: t("account.goals.languageHint"),
							error: !langValid ? t("account.error.invalid_language") : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								dir: "ltr",
								value: language,
								list: "learning-languages",
								onChange: (e) => setLanguage(e.target.value.trim())
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("datalist", {
							id: "learning-languages",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "en",
								children: t("language.en")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ar",
								children: t("language.ar")
							})]
						}),
						save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "danger",
							children: accountError(save.error, t)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								loading: save.isPending,
								disabled: invalid,
								children: t("account.goals.save")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								className: "btn btn--ghost btn--md",
								to: "/me",
								children: t("account.goals.skip")
							})]
						})
					]
				})
			})
		]
	});
}
function evidenceLabel(type, t) {
	return t(`account.skills.evidence.${type}`);
}
function SkillItem({ s, onDelete, deleting }) {
	const { t, fmtDate, fmtNumber } = useI18n();
	const tone = s.evidenceType === "mcq_assessed" ? "info" : s.evidenceType === "external_credential" ? "warning" : "neutral";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "card card--flat stack",
		style: { listStyle: "none" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row row--between",
				style: { flexWrap: "wrap" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone,
					children: t(`account.skills.type.${s.evidenceType}`)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				style: { margin: 0 },
				children: evidenceLabel(s.evidenceType, t)
			}),
			s.evidenceType === "mcq_assessed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				style: { margin: 0 },
				children: t("account.skills.mcqStats", {
					n: s.assessmentsPassed ?? 0,
					best: s.bestScorePercent != null ? fmtNumber(s.bestScorePercent) : "—",
					date: fmtDate(s.lastPassedAt)
				})
			}) : null,
			s.issuer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "small muted",
				style: { margin: 0 },
				children: [
					t("account.skills.issuer"),
					": ",
					s.issuer,
					s.obtainedAt ? ` · ${fmtDate(s.obtainedAt)}` : "",
					s.credentialUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.credentialUrl,
						target: "_blank",
						rel: "noopener noreferrer nofollow",
						children: t("account.skills.credentialLink")
					})] }) : null
				]
			}) : s.obtainedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				style: { margin: 0 },
				children: fmtDate(s.obtainedAt)
			}) : null,
			onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				loading: deleting,
				onClick: onDelete,
				"aria-label": t("account.skills.removeNamed", { name: s.name }),
				children: t("account.common.remove")
			}) }) : null
		]
	});
}
function SkillsPage() {
	const { t } = useI18n();
	const toast = useToast();
	usePageMeta(t("account.skills.title"), void 0, { noindex: true });
	const skills = useQuery({
		queryKey: accountKeys.skills,
		queryFn: accountApi.skills
	});
	const [name, setName] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("self_declared");
	const [issuer, setIssuer] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [obtained, setObtained] = (0, import_react.useState)("");
	const external = type === "external_credential";
	const urlError = url.trim() && !isValidProfileUrl(url.trim()) ? t("account.profile.linkUrlRule") : void 0;
	const invalid = !name.trim() || name.trim().length > 60 || external && !issuer.trim() || !!urlError;
	const add = useApiMutation(() => accountApi.addSkill({
		name: name.trim(),
		evidenceType: type,
		...external ? {
			issuer: issuer.trim(),
			credentialUrl: url.trim() || void 0
		} : {},
		obtainedAt: obtained ? `${obtained}T00:00:00Z` : void 0
	}), [accountKeys.skills], () => {
		setName("");
		setIssuer("");
		setUrl("");
		setObtained("");
		toast.success(t("account.skills.added"));
	});
	const del = useApiMutation((id) => accountApi.deleteSkill(id), [accountKeys.skills]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccountShell, {
		title: t("account.skills.title"),
		subtitle: t("account.skills.subtitle"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				title: t("account.skills.noticeTitle"),
				children: t("account.skills.notice")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: skills,
				children: (d) => d.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: t("account.skills.empty"),
					description: t("account.skills.emptyHint")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: { padding: 0 },
					"aria-label": t("account.skills.listLabel"),
					children: d.items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillItem, {
						s,
						deleting: del.isPending && del.variables === s.id,
						onDelete: s.id && s.evidenceType !== "mcq_assessed" ? () => del.mutate(s.id) : void 0
					}, s.id ?? `mcq-${s.name}`))
				})
			}),
			del.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: accountError(del.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card stack",
				style: { marginBlockStart: "var(--space-5)" },
				noValidate: true,
				onSubmit: (e) => {
					e.preventDefault();
					if (!invalid) add.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						children: t("account.skills.addTitle")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("account.skills.name"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							maxLength: 60,
							onChange: (e) => setName(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("account.skills.evidenceType"),
						hint: evidenceLabel(type, t),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: type,
							onChange: (e) => setType(e.target.value),
							options: [{
								value: "self_declared",
								label: t("account.skills.type.self_declared")
							}, {
								value: "external_credential",
								label: t("account.skills.type.external_credential")
							}]
						})
					}),
					external ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("account.skills.issuer"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: issuer,
							onChange: (e) => setIssuer(e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("account.skills.credentialUrl"),
						error: urlError,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "url",
							dir: "ltr",
							placeholder: "https://",
							value: url,
							onChange: (e) => setUrl(e.target.value)
						})
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("account.skills.obtainedAt"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: obtained,
							onChange: (e) => setObtained(e.target.value)
						})
					}),
					add.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: accountError(add.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						loading: add.isPending,
						disabled: invalid,
						children: t("account.skills.add")
					}) })
				]
			})
		]
	});
}
/** Data rights: export (JSON download) and irreversible account deletion. */
function PrivacyPage() {
	const { t } = useI18n();
	const { user } = useAuth();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const toast = useToast();
	usePageMeta(t("account.privacy.title"), void 0, { noindex: true });
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const [exportError, setExportError] = (0, import_react.useState)(null);
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const mfaEnabled = useQuery({
		queryKey: accountKeys.mfaStatus,
		queryFn: () => accountApi.mfaStatus()
	}).data?.enabled ?? !!user?.mfaEnabled;
	const doExport = async () => {
		setExporting(true);
		setExportError(null);
		try {
			const d = /* @__PURE__ */ new Date();
			const stamp = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
			await downloadFile("/api/me/export", `mastemy-export-${stamp}.json`);
		} catch (e) {
			setExportError(e);
		} finally {
			setExporting(false);
		}
	};
	const ready = confirm === "DELETE" && !!password && (!mfaEnabled || cleanCode(code).length === 6);
	const del = useApiMutation(() => accountApi.deleteAccount({
		password,
		confirm,
		...mfaEnabled ? { mfaCode: cleanCode(code) } : {}
	}), [], () => {
		navigate("/", { replace: true });
		toast.success(t("account.privacy.deletedToast"));
		(0, import_react.startTransition)(() => {
			setSession(null);
			qc.clear();
		});
	});
	const lastSuper = del.error instanceof ApiError && del.error.is("last_superadmin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccountShell, {
		title: t("account.privacy.title"),
		subtitle: t("account.privacy.subtitle"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card stack",
			style: { marginBlockEnd: "var(--space-5)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section__title",
					children: t("account.privacy.exportTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("account.privacy.exportBody") }),
				exportError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
					tone: "danger",
					children: accountError(exportError, t)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					loading: exporting,
					onClick: () => void doExport(),
					children: t("account.privacy.exportButton")
				}) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card stack",
			"aria-labelledby": "delete-account-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section__title",
					id: "delete-account-title",
					children: t("account.privacy.deleteTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
					tone: "danger",
					title: t("account.privacy.deleteWarningTitle"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { marginBlockStart: 0 },
						children: t("account.privacy.deleteWarning")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("account.privacy.deleted1") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("account.privacy.deleted2") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("account.privacy.retained") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("account.privacy.retained2") })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "stack",
					noValidate: true,
					onSubmit: (e) => {
						e.preventDefault();
						if (ready) del.mutate(void 0);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("account.privacy.typeDelete"),
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								autoComplete: "off",
								dir: "ltr",
								value: confirm,
								onChange: (e) => setConfirm(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("account.password.current"),
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "password",
								autoComplete: "current-password",
								value: password,
								onChange: (e) => setPassword(e.target.value)
							})
						}),
						mfaEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("account.mfa.codeLabel"),
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "numeric",
								autoComplete: "one-time-code",
								maxLength: 7,
								value: code,
								onChange: (e) => setCode(e.target.value.replace(/[^0-9 ]/g, ""))
							})
						}) : null,
						del.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "danger",
							children: lastSuper ? t("account.error.last_superadmin") : accountError(del.error, t)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "danger",
							loading: del.isPending,
							disabled: !ready,
							children: t("account.privacy.deleteButton")
						}) })
					]
				})
			]
		})]
	});
}
//#endregion
export { PrivacyPage, ProfilePage, SkillsPage, WelcomePage, isValidProfileUrl };

//# sourceMappingURL=ProfilePages-BThbVKB7.js.map