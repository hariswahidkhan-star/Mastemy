import { _ as require_react, a as Link, b as __toESM, g as useSearchParams, h as useParams, i as require_jsx_runtime, m as useNavigate, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { i as useAuth } from "./AuthProvider-BnN3LxXZ.js";
import { a as QueryState, l as errorMessage, n as Notice, o as QueryStatus, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation, r as useCategories } from "./hooks-D70iOwvH.js";
import { n as CERT_STATES, o as IDEA_STATES, p as loc, r as COLLECTION_KINDS, s as IDEA_TRANSITIONS, t as CERT_KINDS, u as VERIFIED_STATES } from "./discover-CtKiK6mW.js";
/* empty css                  */
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as Dialog, t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { c as fbKeys } from "./finalb-tCQ9cZ9j.js";
import { n as COURSE_LEVELS } from "./types-C7beT6Ou.js";
import { t as CoverageTable } from "./Coverage-ClLrgjCq.js";
import { n as useDebounced } from "./SearchCombobox-Q3Xl2cLU.js";
//#region src/components/discover/Pickers.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Moves item `index` by `delta` positions; out-of-range moves return the list unchanged. */
function move(list, index, delta) {
	const to = index + delta;
	if (index < 0 || index >= list.length || to < 0 || to >= list.length) return list;
	const next = [...list];
	const [item] = next.splice(index, 1);
	next.splice(to, 0, item);
	return next;
}
/** Live-course search (public catalogue). Only live courses can appear in pathways and collections. */
function CourseSearch({ label, exclude = [], onPick, pickLabel }) {
	const { t } = useI18n();
	const [q, setQ] = (0, import_react.useState)("");
	const term = useDebounced(q.trim(), 300);
	const results = useQuery({
		queryKey: [
			"courses",
			"picker",
			term
		],
		queryFn: () => api(`/api/courses${qs({
			q: term,
			pageSize: 10,
			sort: "title"
		})}`),
		enabled: term.length >= 2
	});
	const items = (results.data?.items ?? []).filter((c) => !exclude.includes(c.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label,
			hint: t("discover.admin.pickerHint"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "search",
				value: q,
				onChange: (e) => setQ(e.target.value)
			})
		}), term.length >= 2 ? results.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small muted",
			children: t("common.loading")
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small muted",
			children: t("discover.admin.noCourseMatch")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "ordered-picker",
			"aria-label": t("discover.admin.searchResults"),
			children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: () => onPick(c),
				"aria-label": pickLabel(c.title),
				children: t("discover.admin.add")
			})] }, c.id))
		}) : null]
	});
}
/** Ordered list of courses with keyboard-operable move up/down/remove buttons and a live-course search. */
function OrderedCoursePicker({ value, onChange }) {
	const { t } = useI18n();
	const name = (c) => c.title ?? t("discover.admin.unknownCourse", { id: c.id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "stack",
		style: {
			border: 0,
			padding: 0,
			margin: 0
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "field__label",
				children: t("discover.admin.courses")
			}),
			value.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.admin.noCourses")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "ordered-picker",
				children: value.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						i + 1,
						". ",
						name(c)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						disabled: i === 0,
						"aria-label": t("discover.admin.moveUp", { title: name(c) }),
						onClick: () => onChange(move(value, i, -1)),
						children: "↑"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						disabled: i === value.length - 1,
						"aria-label": t("discover.admin.moveDown", { title: name(c) }),
						onClick: () => onChange(move(value, i, 1)),
						children: "↓"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						"aria-label": t("discover.admin.remove", { title: name(c) }),
						onClick: () => onChange(value.filter((x) => x.id !== c.id)),
						children: "✕"
					})
				] }, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseSearch, {
				label: t("discover.admin.findCourse"),
				exclude: value.map((v) => v.id),
				onPick: (c) => onChange([...value, {
					id: c.id,
					title: c.title
				}]),
				pickLabel: (title) => t("discover.admin.addNamed", { title })
			})
		]
	});
}
/** Staff user search for owner fields (admin users API). Shows the chosen user's id when not resolved. */
function UserPicker({ label, value, onChange }) {
	const { t } = useI18n();
	const [q, setQ] = (0, import_react.useState)("");
	const [chosen, setChosen] = (0, import_react.useState)(null);
	const term = useDebounced(q.trim(), 300);
	const results = useQuery({
		queryKey: [
			"admin",
			"users",
			"picker",
			term
		],
		queryFn: () => api(`/api/admin/users${qs({
			q: term,
			page: 1
		})}`),
		enabled: term.length >= 2
	});
	const current = chosen && chosen.id === value ? chosen.displayName : value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label,
				hint: current ? t("discover.admin.currentUser", { name: current }) : t("discover.admin.noUser"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "search",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})
			}),
			results.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.admin.userSearchUnavailable")
			}) : null,
			term.length >= 2 && results.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "ordered-picker",
				children: results.data.items.slice(0, 6).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					u.displayName,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "small muted",
						children: u.email
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => {
						setChosen(u);
						setQ("");
						onChange(u.id, u);
					},
					children: t("discover.admin.choose")
				})] }, u.id))
			}) : null,
			value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: () => onChange(null),
				children: t("discover.admin.clearUser")
			}) }) : null
		]
	});
}
//#endregion
//#region src/pages/discover/AdminDiscoverPages.tsx
/** Server default for Taxonomy:CertificationFreshDays; the server enforces the configured value. */
var FRESH_DAYS = 180;
var SKILL_CODE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
var akeys = {
	skills: ["admin", "skills"],
	unknownCodes: [
		"admin",
		"skills",
		"unknown"
	],
	issuers: ["admin", "cert-issuers"],
	certs: (state, stale) => [
		"admin",
		"certs",
		state,
		stale
	],
	cert: (id) => [
		"admin",
		"cert",
		id
	],
	coverage: (id, courseId) => [
		"admin",
		"cert",
		id,
		"coverage",
		courseId
	],
	pathways: ["admin", "pathways"],
	collections: ["admin", "collections"],
	bestsellers: ["admin", "bestsellers"],
	ideas: ["admin", "ideas"]
};
var dateInput = (iso) => iso ? iso.slice(0, 10) : "";
var toIso = (d) => d ? (/* @__PURE__ */ new Date(`${d}T00:00:00Z`)).toISOString() : null;
var nz = (s) => s.trim() ? s.trim() : null;
function ErrorNotice({ error }) {
	const { t } = useI18n();
	return error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
		tone: "danger",
		children: errorMessage(error, t)
	}) : null;
}
function AdminSkillsPage() {
	const { t, lang } = useI18n();
	const toast = useToast();
	usePageMeta(t("discover.admin.skills.title"), void 0, { noindex: true });
	const skills = useQuery({
		queryKey: akeys.skills,
		queryFn: () => api("/api/admin/skills")
	});
	const unknown = useQuery({
		queryKey: akeys.unknownCodes,
		queryFn: () => api("/api/admin/skills/unknown-question-codes")
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [codeError, setCodeError] = (0, import_react.useState)("");
	const save = useApiMutation((e) => api(e.id ? `/api/admin/skills/${e.id}` : "/api/admin/skills", {
		method: e.id ? "PUT" : "POST",
		body: {
			code: e.form.code.trim(),
			nameEn: e.form.nameEn.trim(),
			nameAr: nz(e.form.nameAr),
			parentId: e.form.parentId ? Number(e.form.parentId) : null,
			isActive: e.form.isActive
		}
	}), [
		akeys.skills,
		akeys.unknownCodes,
		["discover", "skills"]
	], () => {
		setEditing(null);
		toast.success(t("discover.admin.saved"));
	});
	const open = (s, code) => {
		save.reset();
		setCodeError("");
		setEditing({
			id: s?.id ?? null,
			form: {
				code: s?.code ?? code ?? "",
				nameEn: s?.nameEn ?? "",
				nameAr: s?.nameAr ?? "",
				parentId: s?.parentId ? String(s.parentId) : "",
				isActive: s?.isActive ?? true
			}
		});
	};
	const submit = (e) => {
		e.preventDefault();
		if (!editing) return;
		if (!SKILL_CODE.test(editing.form.code.trim())) {
			setCodeError(t("discover.admin.skills.codeRule"));
			return;
		}
		save.mutate(editing);
	};
	const set = (patch) => editing && setEditing({
		...editing,
		form: {
			...editing.form,
			...patch
		}
	});
	const byId = new Map((skills.data ?? []).map((s) => [s.id, s]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("discover.admin.skills.title"),
			subtitle: t("discover.admin.skills.subtitle"),
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => open(),
				children: t("discover.admin.skills.new")
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: skills,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.admin.skills.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.skills.code")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.skills.name")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.skills.parent")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.status")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "visually-hidden",
								children: t("discover.admin.actions")
							})
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: s.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: loc(lang, s.nameEn, s.nameAr) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.parentId ? byId.get(s.parentId)?.code ?? s.parentId : "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: s.isActive ? "success" : "neutral",
							children: s.isActive ? t("discover.admin.active") : t("discover.admin.inactive")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => open(s),
							"aria-label": t("discover.admin.editNamed", { title: s.code }),
							children: t("discover.admin.edit")
						}) })
					] }, s.id)) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "section",
			"aria-labelledby": "unknown-codes",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section__title",
					id: "unknown-codes",
					children: t("discover.admin.skills.unknownTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("discover.admin.skills.unknownBody")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
					query: unknown,
					children: (rows) => rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "small",
						children: t("discover.admin.skills.unknownNone")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "ordered-picker",
						children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mono",
							children: [
								r.code,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "small muted",
									children: [
										"(",
										t("discover.admin.skills.questions", { n: r.questionCount }),
										")"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => open(void 0, r.code),
							children: t("discover.admin.skills.addToCatalog")
						})] }, r.code))
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			title: editing?.id ? t("discover.admin.skills.edit") : t("discover.admin.skills.new"),
			onClose: () => setEditing(null),
			children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "stack",
				style: {
					display: "grid",
					gap: "var(--space-3)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.skills.code"),
						required: true,
						error: codeError,
						hint: t("discover.admin.skills.codeRule"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: editing.form.code,
							onChange: (e) => set({ code: e.target.value }),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.skills.nameEn"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: editing.form.nameEn,
							onChange: (e) => set({ nameEn: e.target.value }),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.skills.nameAr"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							dir: "rtl",
							lang: "ar",
							value: editing.form.nameAr,
							onChange: (e) => set({ nameAr: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.skills.parent"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: editing.form.parentId,
							onChange: (e) => set({ parentId: e.target.value }),
							placeholder: t("discover.admin.none"),
							options: (skills.data ?? []).filter((s) => s.id !== editing.id).map((s) => ({
								value: String(s.id),
								label: `${s.code} — ${s.nameEn}`
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: t("discover.admin.active"),
						checked: editing.form.isActive,
						onChange: (e) => set({ isActive: e.target.checked })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: save.error }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setEditing(null),
							children: t("common.cancel")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							loading: save.isPending,
							children: t("common.save")
						})]
					})
				]
			}) : null
		})
	] });
}
function IssuersPanel() {
	const { t } = useI18n();
	const toast = useToast();
	const issuers = useQuery({
		queryKey: akeys.issuers,
		queryFn: () => api("/api/admin/certification-issuers")
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const save = useApiMutation((e) => api(e.id ? `/api/admin/certification-issuers/${e.id}` : "/api/admin/certification-issuers", {
		method: e.id ? "PUT" : "POST",
		body: {
			name: e.name.trim(),
			websiteUrl: nz(e.websiteUrl),
			country: nz(e.country)
		}
	}), [akeys.issuers], () => {
		setEditing(null);
		toast.success(t("discover.admin.saved"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": "issuers-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section__head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section__title",
					id: "issuers-h",
					children: t("discover.admin.certs.issuers")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => {
						save.reset();
						setEditing({
							id: null,
							name: "",
							websiteUrl: "",
							country: ""
						});
					},
					children: t("discover.admin.certs.newIssuer")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: issuers,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("discover.admin.certs.noIssuers")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ordered-picker",
					children: list.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: i.name }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "small muted",
							children: [i.country, i.websiteUrl].filter(Boolean).join(" · ")
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						"aria-label": t("discover.admin.editNamed", { title: i.name }),
						onClick: () => {
							save.reset();
							setEditing({
								id: i.id,
								name: i.name,
								websiteUrl: i.websiteUrl ?? "",
								country: i.country ?? ""
							});
						},
						children: t("discover.admin.edit")
					})] }, i.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editing,
				title: editing?.id ? t("discover.admin.certs.editIssuer") : t("discover.admin.certs.newIssuer"),
				onClose: () => setEditing(null),
				children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "stack",
					style: {
						display: "grid",
						gap: "var(--space-3)"
					},
					onSubmit: (e) => {
						e.preventDefault();
						save.mutate(editing);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("discover.admin.certs.issuerName"),
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.name,
								onChange: (e) => setEditing({
									...editing,
									name: e.target.value
								}),
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("discover.admin.certs.website"),
							hint: t("discover.admin.certs.httpsHint"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "url",
								value: editing.websiteUrl,
								onChange: (e) => setEditing({
									...editing,
									websiteUrl: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("discover.admin.certs.country"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.country,
								onChange: (e) => setEditing({
									...editing,
									country: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: save.error }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: () => setEditing(null),
								children: t("common.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								loading: save.isPending,
								children: t("common.save")
							})]
						})
					]
				}) : null
			})
		]
	});
}
function certToForm(c) {
	return {
		issuerId: c?.issuerId ?? "",
		title: c?.title ?? "",
		slug: c?.slug ?? "",
		jurisdiction: c?.jurisdiction ?? "",
		examCode: c?.examCode ?? "",
		levelOrPart: c?.levelOrPart ?? "",
		version: c?.version ?? "",
		effectiveFrom: dateInput(c?.effectiveFrom),
		effectiveTo: dateInput(c?.effectiveTo),
		prerequisites: c?.prerequisites ?? "",
		officialSourceUrl: c?.officialSourceUrl ?? "",
		lastCheckedAt: dateInput(c?.lastCheckedAt),
		evidenceNotes: c?.evidenceNotes ?? "",
		renewalInfo: c?.renewalInfo ?? "",
		rightsNotes: c?.rightsNotes ?? "",
		kind: c?.kind ?? "Examination",
		hasNonMcqTasks: c?.hasNonMcqTasks ?? false,
		nonMcqDisclosure: c?.nonMcqDisclosure ?? "",
		replacedById: c?.replacedById ?? ""
	};
}
function formToBody(f) {
	return {
		issuerId: f.issuerId,
		title: f.title.trim(),
		slug: nz(f.slug),
		jurisdiction: nz(f.jurisdiction),
		examCode: nz(f.examCode),
		levelOrPart: nz(f.levelOrPart),
		version: nz(f.version),
		effectiveFrom: toIso(f.effectiveFrom),
		effectiveTo: toIso(f.effectiveTo),
		prerequisites: nz(f.prerequisites),
		officialSourceUrl: nz(f.officialSourceUrl),
		lastCheckedAt: toIso(f.lastCheckedAt),
		evidenceNotes: nz(f.evidenceNotes),
		renewalInfo: nz(f.renewalInfo),
		rightsNotes: nz(f.rightsNotes),
		kind: f.kind,
		hasNonMcqTasks: f.hasNonMcqTasks,
		nonMcqDisclosure: nz(f.nonMcqDisclosure),
		replacedById: nz(f.replacedById)
	};
}
function CertificationForm({ initial, submitLabel, onSubmit, pending, error, allCerts }) {
	const { t } = useI18n();
	const issuers = useQuery({
		queryKey: akeys.issuers,
		queryFn: () => api("/api/admin/certification-issuers")
	});
	const [f, setF] = (0, import_react.useState)(() => certToForm(initial));
	(0, import_react.useEffect)(() => setF(certToForm(initial)), [initial]);
	const set = (patch) => setF((x) => ({
		...x,
		...patch
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "stack",
		style: {
			display: "grid",
			gap: "var(--space-3)"
		},
		onSubmit: (e) => {
			e.preventDefault();
			onSubmit(formToBody(f));
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dfilters",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.certs.issuer"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: f.issuerId,
							required: true,
							onChange: (e) => set({ issuerId: e.target.value }),
							placeholder: t("discover.admin.choose"),
							options: (issuers.data ?? []).map((i) => ({
								value: i.id,
								label: i.name
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.certs.titleField"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.title,
							onChange: (e) => set({ title: e.target.value }),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.certs.slug"),
						hint: t("discover.admin.certs.slugHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.slug,
							onChange: (e) => set({ slug: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.cert.kind"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: f.kind,
							onChange: (e) => set({ kind: e.target.value }),
							options: CERT_KINDS.map((k) => ({
								value: k,
								label: t(`discover.certKind.${k}`)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.cert.examCode"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.examCode,
							onChange: (e) => set({ examCode: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.cert.level"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.levelOrPart,
							onChange: (e) => set({ levelOrPart: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.cert.version"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.version,
							onChange: (e) => set({ version: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.cert.jurisdiction"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.jurisdiction,
							onChange: (e) => set({ jurisdiction: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.certs.effectiveFrom"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: f.effectiveFrom,
							onChange: (e) => set({ effectiveFrom: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.certs.effectiveTo"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: f.effectiveTo,
							onChange: (e) => set({ effectiveTo: e.target.value })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.cert.officialSource"),
				hint: t("discover.admin.certs.httpsHint"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "url",
					value: f.officialSourceUrl,
					onChange: (e) => set({ officialSourceUrl: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.cert.lastCheckedLabel"),
				hint: t("discover.admin.certs.lastCheckedHint", { n: 180 }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					value: f.lastCheckedAt,
					onChange: (e) => set({ lastCheckedAt: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.cert.prerequisites"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: f.prerequisites,
					onChange: (e) => set({ prerequisites: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.cert.renewal"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: f.renewalInfo,
					onChange: (e) => set({ renewalInfo: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.certs.evidence"),
				hint: t("discover.admin.certs.internal"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: f.evidenceNotes,
					onChange: (e) => set({ evidenceNotes: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.certs.rights"),
				hint: t("discover.admin.certs.internal"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: f.rightsNotes,
					onChange: (e) => set({ rightsNotes: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("discover.admin.certs.hasNonMcq"),
				checked: f.hasNonMcqTasks,
				onChange: (e) => set({ hasNonMcqTasks: e.target.checked })
			}),
			f.hasNonMcqTasks ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.cert.nonMcqTitle"),
				required: true,
				hint: t("discover.admin.certs.nonMcqHint"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 3,
					value: f.nonMcqDisclosure,
					onChange: (e) => set({ nonMcqDisclosure: e.target.value })
				})
			}) : null,
			allCerts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.certs.replacedBy"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: f.replacedById,
					onChange: (e) => set({ replacedById: e.target.value }),
					placeholder: t("discover.admin.none"),
					options: allCerts.filter((c) => c.id !== initial?.id).map((c) => ({
						value: c.id,
						label: c.title
					}))
				})
			}) : null,
			initial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "warning",
				children: t("discover.admin.certs.editClears")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "form-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: pending,
					children: submitLabel
				})
			})
		]
	});
}
function AdminCertificationsPage() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const navigate = useNavigate();
	usePageMeta(t("discover.admin.certs.title"), void 0, { noindex: true });
	const [params, setParams] = useSearchParams();
	const state = params.get("state") ?? "";
	const stale = params.get("stale") === "true";
	const certs = useQuery({
		queryKey: akeys.certs(state, stale),
		queryFn: () => api(`/api/admin/certifications${qs({
			state: state || void 0,
			stale: stale || void 0
		})}`)
	});
	const [creating, setCreating] = (0, import_react.useState)(false);
	const create = useApiMutation((body) => api("/api/admin/certifications", { body }), [["admin", "certs"]], (c) => {
		setCreating(false);
		toast.success(t("discover.admin.saved"));
		navigate(`/admin/certifications/${c.id}`);
	});
	const { hasRole } = useAuth();
	const flag = useApiMutation(() => api("/api/admin/certifications/flag-stale", { method: "POST" }), [["admin", "certs"]], (r) => toast.success(t("discover.admin.certs.flagged", { n: r.flagged })));
	const setParam = (k, v) => {
		const next = new URLSearchParams(params);
		if (v) next.set(k, v);
		else next.delete(k);
		setParams(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("discover.admin.certs.title"),
			subtitle: t("discover.admin.certs.subtitle"),
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [hasRole("Admin", "SuperAdmin") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				loading: flag.isPending,
				onClick: () => flag.mutate(void 0, { onError: (e) => toast.error(errorMessage(e, t)) }),
				children: t("discover.admin.certs.flagStale")
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					create.reset();
					setCreating(true);
				},
				children: t("discover.admin.certs.new")
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationRules, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "filters card card--flat",
			style: { marginBlock: "var(--space-4)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.certs.state"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: state,
					onChange: (e) => setParam("state", e.target.value),
					placeholder: t("discover.filters.any"),
					options: CERT_STATES.map((s) => ({
						value: s,
						label: t(`discover.certState.${s}`)
					}))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("discover.admin.certs.staleQueue"),
				hint: t("discover.admin.certs.staleQueueHint"),
				checked: stale,
				onChange: (e) => setParam("stale", e.target.checked ? "true" : "")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: certs,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: stale ? t("discover.admin.certs.staleEmpty") : t("discover.admin.certs.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.certs.titleField")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.cert.issuer")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.certs.state")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.cert.lastCheckedLabel")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.certs.visibility")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/admin/certifications/${c.id}`,
							children: c.title
						}), c.examCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "small muted mono",
							children: [" ", c.examCode]
						}) : null] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.issuerName }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "info",
							children: t(`discover.certState.${c.state}`)
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
							fmtDate(c.lastCheckedAt) || "—",
							" ",
							c.isStale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "warning",
								children: t("discover.admin.certs.stale")
							}) : null
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: c.publiclyVisible ? "success" : "neutral",
							children: c.publiclyVisible ? t("discover.admin.certs.public") : t("discover.admin.certs.hidden")
						}), !c.reviewerId && VERIFIED_STATES.includes(c.state) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "small muted",
							children: [" ", t("discover.admin.certs.needsReverify")]
						}) : null] })
					] }, c.id)) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssuersPanel, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: creating,
			title: t("discover.admin.certs.new"),
			onClose: () => setCreating(false),
			wide: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificationForm, {
				submitLabel: t("discover.admin.certs.create"),
				onSubmit: (b) => create.mutate(b),
				pending: create.isPending,
				error: create.error
			})
		})
	] });
}
function VerificationRules() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "card card--flat",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("discover.admin.certs.rulesTitle") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "small",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("discover.admin.certs.rule.https") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("discover.admin.certs.rule.fresh", { n: 180 }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("discover.admin.certs.rule.reviewer") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("discover.admin.certs.rule.nonMcq") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("discover.admin.certs.rule.objectives") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("discover.admin.certs.rule.liveCourse") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("discover.admin.certs.rule.edit") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("discover.admin.certs.rule.retired") })
			]
		})]
	});
}
/** Client-side preview of the server's verification checks for a target state (the server decides). */
function verificationChecks(c, target, userId, now = Date.now()) {
	if (!VERIFIED_STATES.includes(target)) return [];
	const fresh = !!c.lastCheckedAt && now - new Date(c.lastCheckedAt).getTime() <= 15552e6;
	const checks = [
		{
			key: "https",
			ok: /^https:\/\/\S+$/i.test(c.officialSourceUrl ?? "")
		},
		{
			key: "fresh",
			ok: fresh
		},
		{
			key: "reviewer",
			ok: !!userId && c.lastEditedBy !== userId
		}
	];
	if (c.hasNonMcqTasks) checks.push({
		key: "nonMcq",
		ok: !!c.nonMcqDisclosure?.trim()
	});
	if (target === "InProduction" || target === "PublishedPreparation") checks.push({
		key: "objectives",
		ok: c.objectives.length > 0
	});
	if (target === "PublishedPreparation") checks.push({
		key: "liveCourse",
		ok: null
	});
	return checks;
}
function StatePanel({ cert }) {
	const { t, fmtDate } = useI18n();
	const { user } = useAuth();
	const toast = useToast();
	const allowed = cert.state === "Retired" ? ["ResearchCandidate"] : [...CERT_STATES];
	const [target, setTarget] = (0, import_react.useState)(() => cert.state === "Retired" ? "ResearchCandidate" : VERIFIED_STATES.includes(cert.state) && !cert.reviewerId ? cert.state : cert.state === "ResearchCandidate" ? "Verified" : cert.state);
	const [notes, setNotes] = (0, import_react.useState)("");
	const change = useApiMutation(() => api(`/api/admin/certifications/${cert.id}/state`, { body: {
		state: target,
		notes: nz(notes)
	} }), [
		akeys.cert(cert.id),
		["admin", "certs"],
		["discover"]
	], () => {
		setNotes("");
		toast.success(t("discover.admin.certs.stateChanged"));
	});
	const checks = verificationChecks(cert, target, user?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section card",
		"aria-labelledby": "state-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "section__title",
				id: "state-h",
				children: t("discover.admin.certs.stateTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "dfacts",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.admin.certs.state") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "info",
						children: t(`discover.certState.${cert.state}`)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.admin.certs.verified") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: cert.reviewerId ? t("discover.admin.certs.verifiedOn", { date: fmtDate(cert.verifiedAt) }) : t("discover.admin.certs.notVerified") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.admin.certs.visibility") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: cert.publiclyVisible ? t("discover.admin.certs.public") : t("discover.admin.certs.hidden") }),
					cert.staleFlaggedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("discover.admin.certs.staleFlagged") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fmtDate(cert.staleFlaggedAt) })] }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "stack",
				style: {
					display: "grid",
					gap: "var(--space-3)",
					marginBlockStart: "var(--space-4)"
				},
				onSubmit: (e) => {
					e.preventDefault();
					change.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.certs.newState"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: target,
							onChange: (e) => setTarget(e.target.value),
							options: allowed.map((s) => ({
								value: s,
								label: t(`discover.certState.${s}`)
							}))
						})
					}),
					checks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "check-list small",
						"aria-label": t("discover.admin.certs.checks"),
						children: checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: c.ok === null ? "•" : c.ok ? "✓" : "✗"
							}),
							" ",
							t(`discover.admin.certs.rule.${c.key}`, { n: 180 }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "visually-hidden",
								children: c.ok === null ? t("discover.admin.certs.checkServer") : c.ok ? t("discover.admin.certs.checkOk") : t("discover.admin.certs.checkFail")
							})
						] }, c.key))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.certs.notes"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: change.error }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "form-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							loading: change.isPending,
							children: cert.state === target ? t("discover.admin.certs.reverify") : t("discover.admin.certs.applyState")
						})
					})
				]
			})
		]
	});
}
function ObjectivesPanel({ cert }) {
	const { t, fmtNumber } = useI18n();
	const toast = useToast();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const save = useApiMutation((e) => api(e.id ? `/api/admin/certification-objectives/${e.id}` : `/api/admin/certifications/${cert.id}/objectives`, {
		method: e.id ? "PUT" : "POST",
		body: {
			code: e.code.trim(),
			title: e.title.trim(),
			weightPercent: Number(e.weightPercent || 0),
			sortOrder: e.sortOrder ? Number(e.sortOrder) : null
		}
	}), [akeys.cert(cert.id), ["admin", "certs"]], () => {
		setEditing(null);
		toast.success(t("discover.admin.saved"));
	});
	const del = useApiMutation((id) => api(`/api/admin/certification-objectives/${id}`, { method: "DELETE" }), [akeys.cert(cert.id), ["admin", "certs"]], () => {
		setDeleting(null);
		toast.success(t("discover.admin.deleted"));
	});
	const total = cert.objectives.reduce((s, o) => s + o.weightPercent, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": "obj-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section__head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "section__title",
					id: "obj-h",
					children: t("discover.cert.blueprint")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => {
						save.reset();
						setEditing({
							id: null,
							code: "",
							title: "",
							weightPercent: "",
							sortOrder: ""
						});
					},
					children: t("discover.admin.certs.addObjective")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.admin.certs.weightTotal", { n: fmtNumber(total) })
			}),
			cert.objectives.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.cert.noBlueprint")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.cert.objCode")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.cert.objTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.cert.objWeight")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "visually-hidden",
								children: t("discover.admin.actions")
							})
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: cert.objectives.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "mono",
							children: o.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [fmtNumber(o.weightPercent), "%"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								"aria-label": t("discover.admin.editNamed", { title: o.code }),
								onClick: () => {
									save.reset();
									setEditing({
										id: o.id,
										code: o.code,
										title: o.title,
										weightPercent: String(o.weightPercent),
										sortOrder: String(o.sortOrder)
									});
								},
								children: t("discover.admin.edit")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								"aria-label": t("discover.admin.deleteNamed", { title: o.code }),
								onClick: () => {
									del.reset();
									setDeleting(o);
								},
								children: t("discover.admin.delete")
							})]
						})
					] }, o.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editing,
				title: editing?.id ? t("discover.admin.certs.editObjective") : t("discover.admin.certs.addObjective"),
				onClose: () => setEditing(null),
				children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "stack",
					style: {
						display: "grid",
						gap: "var(--space-3)"
					},
					onSubmit: (e) => {
						e.preventDefault();
						save.mutate(editing);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("discover.cert.objCode"),
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.code,
								onChange: (e) => setEditing({
									...editing,
									code: e.target.value
								}),
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("discover.cert.objTitle"),
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.title,
								onChange: (e) => setEditing({
									...editing,
									title: e.target.value
								}),
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("discover.cert.objWeight"),
							hint: t("discover.admin.certs.weightHint"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								max: 100,
								step: "0.01",
								value: editing.weightPercent,
								onChange: (e) => setEditing({
									...editing,
									weightPercent: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("discover.admin.sortOrder"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: editing.sortOrder,
								onChange: (e) => setEditing({
									...editing,
									sortOrder: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "warning",
							children: t("discover.admin.certs.editClears")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: save.error }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: () => setEditing(null),
								children: t("common.cancel")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								loading: save.isPending,
								children: t("common.save")
							})]
						})
					]
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!deleting,
				danger: true,
				title: t("discover.admin.deleteNamed", { title: deleting?.code ?? "" }),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("discover.admin.certs.deleteObjective") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: del.error })] }),
				confirmLabel: t("discover.admin.delete"),
				loading: del.isPending,
				onCancel: () => setDeleting(null),
				onConfirm: () => deleting && del.mutate(deleting.id)
			})
		]
	});
}
function LinkedCourses({ certId, onCoverage, onUnlink, busy }) {
	const { t, fmtDate } = useI18n();
	const q = useQuery({
		queryKey: fbKeys.certCourses(certId),
		queryFn: () => api(`/api/admin/certifications/${certId}/courses`)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: q,
		children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted",
			children: t("finalb.certCourses.none")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "stack",
			style: {
				listStyle: "none",
				padding: 0
			},
			"aria-label": t("finalb.certCourses.title"),
			"data-testid": "linked-courses",
			children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card card--flat row row--between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					c.isLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/courses/${c.slug}`,
						children: c.title
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.title }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: c.isLive ? "success" : "neutral",
						children: c.isLive ? t("finalb.certCourses.live") : c.status
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "small muted",
						children: t("finalb.certCourses.linkedAt", { date: fmtDate(c.linkedAt) })
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => onCoverage(c),
						children: t("discover.admin.certs.coverageFor")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						loading: busy,
						onClick: () => onUnlink(c),
						children: t("discover.admin.certs.unlink")
					})]
				})]
			}, c.courseId))
		})
	});
}
function CourseLinksPanel({ cert }) {
	const { t, fmtNumber } = useI18n();
	const toast = useToast();
	const [courseId, setCourseId] = (0, import_react.useState)("");
	const [picked, setPicked] = (0, import_react.useState)(null);
	const coverage = useQuery({
		queryKey: akeys.coverage(cert.id, courseId),
		queryFn: () => api(`/api/admin/certifications/${cert.id}/coverage${qs({ courseId: courseId || void 0 })}`)
	});
	const link = useApiMutation((e) => api(`/api/admin/certifications/${cert.id}/courses/${e.courseId}`, { method: e.link ? "PUT" : "DELETE" }), [[
		"admin",
		"cert",
		cert.id
	], ["discover"]], (_r, e) => toast.success(e.link ? t("discover.admin.certs.linked") : t("discover.admin.certs.unlinked")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		"aria-labelledby": "links-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "section__title",
				id: "links-h",
				children: t("discover.admin.certs.courseLinks")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("discover.admin.certs.linksNote")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkedCourses, {
				certId: cert.id,
				onCoverage: (c) => {
					setPicked({
						id: c.courseId,
						title: c.title
					});
					setCourseId(c.courseId);
				},
				onUnlink: (c) => link.mutate({
					courseId: c.courseId,
					link: false
				}, { onError: (e) => toast.error(errorMessage(e, t)) }),
				busy: link.isPending
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseSearch, {
				label: t("discover.admin.findCourse"),
				onPick: (c) => setPicked({
					id: c.id,
					title: c.title
				}),
				pickLabel: (title) => t("discover.admin.chooseNamed", { title })
			}),
			picked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				style: { marginBlock: "var(--space-3)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: picked.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						loading: link.isPending,
						onClick: () => link.mutate({
							courseId: picked.id,
							link: true
						}, { onError: (e) => toast.error(errorMessage(e, t)) }),
						children: t("discover.admin.certs.link")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						loading: link.isPending,
						onClick: () => link.mutate({
							courseId: picked.id,
							link: false
						}, { onError: (e) => toast.error(errorMessage(e, t)) }),
						children: t("discover.admin.certs.unlink")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setCourseId(picked.id),
						children: t("discover.admin.certs.coverageFor")
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				style: { fontSize: "var(--text-md)" },
				children: [courseId ? t("discover.admin.certs.coverageCourse", { title: picked?.title ?? courseId }) : t("discover.admin.certs.coverageAll"), courseId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => setCourseId(""),
					children: t("discover.admin.certs.coverageAllBtn")
				})] }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: coverage,
				children: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageTable, {
					report: r,
					fmt: fmtNumber
				})
			})
		]
	});
}
function AdminCertificationDetailPage() {
	const { id = "" } = useParams();
	const { t } = useI18n();
	const toast = useToast();
	const cert = useQuery({
		queryKey: akeys.cert(id),
		queryFn: () => api(`/api/admin/certifications/${id}`)
	});
	const all = useQuery({
		queryKey: akeys.certs("", false),
		queryFn: () => api("/api/admin/certifications")
	});
	usePageMeta(cert.data?.title ?? t("discover.admin.certs.title"), void 0, { noindex: true });
	const update = useApiMutation((body) => api(`/api/admin/certifications/${id}`, {
		method: "PUT",
		body
	}), [
		akeys.cert(id),
		["admin", "certs"],
		["discover"]
	], () => toast.success(t("discover.admin.saved")));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
		query: cert,
		children: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "small muted",
				"aria-label": t("common.breadcrumb"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/certifications",
						children: t("discover.admin.certs.title")
					}),
					" / ",
					c.title
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: c.title,
				subtitle: `${c.issuerName}${c.examCode ? ` · ${c.examCode}` : ""}`,
				actions: c.publiclyVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "btn btn--secondary btn--sm",
					to: `/certifications/${c.slug}`,
					children: t("discover.admin.viewPublic")
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatePanel, { cert: c }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section card",
				"aria-labelledby": "edit-h",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section__title",
						id: "edit-h",
						children: t("discover.admin.certs.details")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: all }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificationForm, {
						initial: c,
						allCerts: all.data,
						submitLabel: t("common.save"),
						onSubmit: (b) => update.mutate(b),
						pending: update.isPending,
						error: update.error
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectivesPanel, { cert: c }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseLinksPanel, { cert: c })
		] })
	});
}
function useNamedCourses(ids, fetchNames) {
	const names = useQuery({
		queryKey: [
			"admin",
			"course-names",
			ids.join(",")
		],
		queryFn: () => fetchNames ? fetchNames() : Promise.resolve([]),
		enabled: !!fetchNames && ids.length > 0,
		retry: false
	});
	const map = new Map((names.data ?? []).map((c) => [c.id, c.title]));
	return ids.map((id) => ({
		id,
		title: map.get(id)
	}));
}
function PathwayEditor({ initial, onClose }) {
	const { t, lang } = useI18n();
	const toast = useToast();
	const categories = useCategories();
	const skills = useQuery({
		queryKey: akeys.skills,
		queryFn: () => api("/api/admin/skills")
	});
	const named = useNamedCourses(initial?.courseIds ?? [], initial ? () => api(`/api/pathways/${encodeURIComponent(initial.slug)}`).then((p) => p.courses) : null);
	const [f, setF] = (0, import_react.useState)({
		id: initial?.id ?? null,
		slug: initial?.slug ?? "",
		titleEn: initial?.titleEn ?? "",
		titleAr: initial?.titleAr ?? "",
		descriptionEn: initial?.descriptionEn ?? "",
		descriptionAr: initial?.descriptionAr ?? "",
		level: initial?.level ?? "Beginner",
		categoryId: initial?.categoryId ? String(initial.categoryId) : "",
		isPublished: initial?.isPublished ?? false,
		sortOrder: initial ? String(initial.sortOrder) : "",
		courses: [],
		skillCodes: initial?.skillCodes ?? []
	});
	const namedKey = named.map((n) => `${n.id}:${n.title ?? ""}`).join("|");
	(0, import_react.useEffect)(() => {
		setF((x) => x.courses.length === 0 && named.length > 0 ? {
			...x,
			courses: named
		} : {
			...x,
			courses: x.courses.map((c) => ({
				...c,
				title: c.title ?? named.find((n) => n.id === c.id)?.title
			}))
		});
	}, [namedKey]);
	const save = useApiMutation(() => api(f.id ? `/api/admin/pathways/${f.id}` : "/api/admin/pathways", {
		method: f.id ? "PUT" : "POST",
		body: {
			slug: f.slug.trim(),
			titleEn: f.titleEn.trim(),
			titleAr: nz(f.titleAr),
			descriptionEn: nz(f.descriptionEn),
			descriptionAr: nz(f.descriptionAr),
			level: f.level,
			categoryId: f.categoryId ? Number(f.categoryId) : null,
			isPublished: f.isPublished,
			sortOrder: f.sortOrder ? Number(f.sortOrder) : null,
			courseIds: f.courses.map((c) => c.id),
			skillCodes: f.skillCodes
		}
	}), [akeys.pathways, ["discover"]], () => {
		toast.success(t("discover.admin.saved"));
		onClose();
	});
	const set = (p) => setF((x) => ({
		...x,
		...p
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "stack",
		style: {
			display: "grid",
			gap: "var(--space-3)"
		},
		onSubmit: (e) => {
			e.preventDefault();
			save.mutate(void 0);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dfilters",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.slug"),
						required: true,
						hint: t("discover.admin.slugHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.slug,
							onChange: (e) => set({ slug: e.target.value }),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.titleEn"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.titleEn,
							onChange: (e) => set({ titleEn: e.target.value }),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.titleAr"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							dir: "rtl",
							lang: "ar",
							value: f.titleAr,
							onChange: (e) => set({ titleAr: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("courses.level"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: f.level,
							onChange: (e) => set({ level: e.target.value }),
							options: COURSE_LEVELS.map((l) => ({
								value: l,
								label: t(`level.${l}`)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: categories }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("courses.category"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: f.categoryId,
							onChange: (e) => set({ categoryId: e.target.value }),
							placeholder: t("discover.admin.none"),
							options: (categories.data ?? []).map((c) => ({
								value: String(c.id),
								label: loc(lang, c.nameEn, c.nameAr)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.sortOrder"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: f.sortOrder,
							onChange: (e) => set({ sortOrder: e.target.value })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.descriptionEn"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: f.descriptionEn,
					onChange: (e) => set({ descriptionEn: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.descriptionAr"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					dir: "rtl",
					lang: "ar",
					value: f.descriptionAr,
					onChange: (e) => set({ descriptionAr: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("discover.admin.published"),
				hint: t("discover.admin.pathways.publishedHint"),
				checked: f.isPublished,
				onChange: (e) => set({ isPublished: e.target.checked })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderedCoursePicker, {
				value: f.courses,
				onChange: (courses) => set({ courses })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				style: {
					border: 0,
					padding: 0,
					margin: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "field__label",
					children: t("discover.admin.pathways.skills")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "check-grid",
					children: (skills.data ?? []).filter((s) => s.isActive || f.skillCodes.includes(s.code)).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: `${s.code} — ${loc(lang, s.nameEn, s.nameAr)}`,
						checked: f.skillCodes.includes(s.code),
						onChange: (e) => set({ skillCodes: e.target.checked ? [...f.skillCodes, s.code] : f.skillCodes.filter((c) => c !== s.code) })
					}, s.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: save.error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: onClose,
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: save.isPending,
					children: t("common.save")
				})]
			})
		]
	});
}
function AdminPathwaysPage() {
	const { t, lang } = useI18n();
	const toast = useToast();
	usePageMeta(t("discover.admin.pathways.title"), void 0, { noindex: true });
	const list = useQuery({
		queryKey: akeys.pathways,
		queryFn: () => api("/api/admin/pathways")
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const del = useApiMutation((id) => api(`/api/admin/pathways/${id}`, { method: "DELETE" }), [akeys.pathways, ["discover"]], () => {
		setDeleting(null);
		toast.success(t("discover.admin.deleted"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("discover.admin.pathways.title"),
			subtitle: t("discover.admin.pathways.subtitle"),
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setEditing("new"),
				children: t("discover.admin.pathways.new")
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (rows) => rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.admin.pathways.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "dlist",
				children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "card card--flat row row--between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: loc(lang, p.titleEn, p.titleAr) }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "small muted mono",
							children: ["/", p.slug]
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: p.isPublished ? "success" : "neutral",
							children: p.isPublished ? t("discover.admin.published") : t("discover.admin.draft")
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "small muted",
							children: t("discover.pathways.courseCount", { n: p.courseIds.length })
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "row",
						children: [
							p.isPublished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								className: "btn btn--ghost btn--sm",
								to: `/pathways/${p.slug}`,
								children: t("discover.admin.viewPublic")
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								"aria-label": t("discover.admin.editNamed", { title: p.titleEn }),
								onClick: () => setEditing(p),
								children: t("discover.admin.edit")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								"aria-label": t("discover.admin.deleteNamed", { title: p.titleEn }),
								onClick: () => {
									del.reset();
									setDeleting(p);
								},
								children: t("discover.admin.delete")
							})
						]
					})]
				}, p.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			wide: true,
			title: editing === "new" ? t("discover.admin.pathways.new") : t("discover.admin.pathways.edit"),
			onClose: () => setEditing(null),
			children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathwayEditor, {
				initial: editing === "new" ? null : editing,
				onClose: () => setEditing(null)
			}, editing === "new" ? "new" : editing.id) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!deleting,
			danger: true,
			title: t("discover.admin.deleteNamed", { title: deleting?.titleEn ?? "" }),
			body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("discover.admin.pathways.deleteBody") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: del.error })] }),
			confirmLabel: t("discover.admin.delete"),
			loading: del.isPending,
			onCancel: () => setDeleting(null),
			onConfirm: () => deleting && del.mutate(deleting.id)
		})
	] });
}
function CollectionEditor({ initial, onClose }) {
	const { t, lang } = useI18n();
	const toast = useToast();
	const categories = useCategories();
	const named = useNamedCourses(initial?.courseIds ?? [], initial ? () => api(`/api/collections/${encodeURIComponent(initial.slug)}`).then((c) => c.courses) : null);
	const [f, setF] = (0, import_react.useState)({
		id: initial?.id ?? null,
		slug: initial?.slug ?? "",
		titleEn: initial?.titleEn ?? "",
		titleAr: initial?.titleAr ?? "",
		kind: initial?.kind ?? "Editorial",
		categoryId: initial?.categoryId ? String(initial.categoryId) : "",
		activeFrom: dateInput(initial?.activeFrom),
		activeTo: dateInput(initial?.activeTo),
		sortOrder: initial ? String(initial.sortOrder) : "",
		courses: []
	});
	const namedKey = named.map((n) => `${n.id}:${n.title ?? ""}`).join("|");
	(0, import_react.useEffect)(() => {
		setF((x) => x.courses.length === 0 && named.length > 0 ? {
			...x,
			courses: named
		} : {
			...x,
			courses: x.courses.map((c) => ({
				...c,
				title: c.title ?? named.find((n) => n.id === c.id)?.title
			}))
		});
	}, [namedKey]);
	const save = useApiMutation(() => api(f.id ? `/api/admin/collections/${f.id}` : "/api/admin/collections", {
		method: f.id ? "PUT" : "POST",
		body: {
			slug: f.slug.trim(),
			titleEn: f.titleEn.trim(),
			titleAr: nz(f.titleAr),
			kind: f.kind,
			categoryId: f.categoryId ? Number(f.categoryId) : null,
			activeFrom: toIso(f.activeFrom),
			activeTo: toIso(f.activeTo),
			sortOrder: f.sortOrder ? Number(f.sortOrder) : null,
			courseIds: f.courses.map((c) => c.id)
		}
	}), [akeys.collections, ["discover"]], () => {
		toast.success(t("discover.admin.saved"));
		onClose();
	});
	const set = (p) => setF((x) => ({
		...x,
		...p
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "stack",
		style: {
			display: "grid",
			gap: "var(--space-3)"
		},
		onSubmit: (e) => {
			e.preventDefault();
			save.mutate(void 0);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dfilters",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.slug"),
						required: true,
						hint: t("discover.admin.slugHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.slug,
							onChange: (e) => set({ slug: e.target.value }),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.titleEn"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: f.titleEn,
							onChange: (e) => set({ titleEn: e.target.value }),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.titleAr"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							dir: "rtl",
							lang: "ar",
							value: f.titleAr,
							onChange: (e) => set({ titleAr: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.collections.kind"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: f.kind,
							onChange: (e) => set({ kind: e.target.value }),
							options: COLLECTION_KINDS.map((k) => ({
								value: k,
								label: t(`discover.admin.collections.kind_${k}`)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryStatus, { query: categories }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("courses.category"),
						hint: t("discover.admin.collections.categoryHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: f.categoryId,
							onChange: (e) => set({ categoryId: e.target.value }),
							placeholder: t("discover.admin.none"),
							options: (categories.data ?? []).map((c) => ({
								value: String(c.id),
								label: loc(lang, c.nameEn, c.nameAr)
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.collections.activeFrom"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: f.activeFrom,
							onChange: (e) => set({ activeFrom: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.collections.activeTo"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: f.activeTo,
							onChange: (e) => set({ activeTo: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("discover.admin.sortOrder"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: f.sortOrder,
							onChange: (e) => set({ sortOrder: e.target.value })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderedCoursePicker, {
				value: f.courses,
				onChange: (courses) => set({ courses })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: save.error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: onClose,
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: save.isPending,
					children: t("common.save")
				})]
			})
		]
	});
}
function AdminCollectionsPage() {
	const { t, lang, fmtDate } = useI18n();
	const toast = useToast();
	usePageMeta(t("discover.admin.collections.title"), void 0, { noindex: true });
	const list = useQuery({
		queryKey: akeys.collections,
		queryFn: () => api("/api/admin/collections")
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const del = useApiMutation((id) => api(`/api/admin/collections/${id}`, { method: "DELETE" }), [akeys.collections, ["discover"]], () => {
		setDeleting(null);
		toast.success(t("discover.admin.deleted"));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("discover.admin.collections.title"),
			subtitle: t("discover.admin.collections.subtitle"),
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setEditing("new"),
				children: t("discover.admin.collections.new")
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (rows) => rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.admin.collections.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "dlist",
				children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "card card--flat row row--between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: loc(lang, c.titleEn, c.titleAr) }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "small muted mono",
							children: ["/", c.slug]
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(`discover.admin.collections.kind_${c.kind}`) }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: c.activeNow ? "success" : "neutral",
							children: c.activeNow ? t("discover.admin.active") : t("discover.admin.inactive")
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "small muted",
							children: [t("discover.pathways.courseCount", { n: c.courseIds.length }), c.activeFrom || c.activeTo ? ` · ${fmtDate(c.activeFrom) || "…"} – ${fmtDate(c.activeTo) || "…"}` : ""]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "row",
						children: [
							c.activeNow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								className: "btn btn--ghost btn--sm",
								to: `/collections/${c.slug}`,
								children: t("discover.admin.viewPublic")
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								"aria-label": t("discover.admin.editNamed", { title: c.titleEn }),
								onClick: () => setEditing(c),
								children: t("discover.admin.edit")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								"aria-label": t("discover.admin.deleteNamed", { title: c.titleEn }),
								onClick: () => {
									del.reset();
									setDeleting(c);
								},
								children: t("discover.admin.delete")
							})
						]
					})]
				}, c.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			wide: true,
			title: editing === "new" ? t("discover.admin.collections.new") : t("discover.admin.collections.edit"),
			onClose: () => setEditing(null),
			children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionEditor, {
				initial: editing === "new" ? null : editing,
				onClose: () => setEditing(null)
			}, editing === "new" ? "new" : editing.id) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!deleting,
			danger: true,
			title: t("discover.admin.deleteNamed", { title: deleting?.titleEn ?? "" }),
			body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("discover.admin.collections.deleteBody") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: del.error })] }),
			confirmLabel: t("discover.admin.delete"),
			loading: del.isPending,
			onCancel: () => setDeleting(null),
			onConfirm: () => deleting && del.mutate(deleting.id)
		})
	] });
}
function AdminBestsellersPage() {
	const { t, fmtDate, fmtNumber } = useI18n();
	const toast = useToast();
	usePageMeta(t("discover.admin.best.title"), void 0, { noindex: true });
	const list = useQuery({
		queryKey: akeys.bestsellers,
		queryFn: () => api("/api/admin/bestsellers")
	});
	const [run, setRun] = (0, import_react.useState)(null);
	const recompute = useApiMutation(() => api("/api/admin/bestsellers/recompute", { method: "POST" }), [akeys.bestsellers, ["discover"]], (r) => {
		setRun(r);
		toast.success(t("discover.admin.best.done", { n: r.eligible }));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("discover.admin.best.title"),
			subtitle: t("discover.admin.best.subtitle"),
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				loading: recompute.isPending,
				onClick: () => recompute.mutate(void 0, { onError: (e) => toast.error(errorMessage(e, t)) }),
				children: t("discover.admin.best.recompute")
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "info",
			children: t("discover.admin.best.rule")
		}),
		run ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "status",
			className: "small",
			children: t("discover.admin.best.runSummary", {
				considered: run.coursesConsidered,
				eligible: run.eligible,
				from: fmtDate(run.windowStart),
				at: fmtDate(run.computedAt)
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (rows) => rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("discover.admin.best.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.best.course")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.best.buyers")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.best.revenue")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.best.eligible")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							scope: "col",
							children: t("discover.admin.best.computed")
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.courseSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: `/courses/${r.courseSlug}`,
							children: r.courseTitle
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono small",
							children: r.courseId
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtNumber(r.distinctBuyers) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtNumber(r.netRevenue) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: r.eligible ? "success" : "neutral",
							children: r.eligible ? t("discover.admin.yes") : t("discover.admin.no")
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(r.computedAt) })
					] }, r.courseId)) })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "small muted",
			children: t("discover.admin.best.revenueNote")
		})
	] });
}
function ideaToForm(i) {
	return {
		id: i?.id ?? null,
		title: i?.title ?? "",
		audience: i?.audience ?? "",
		rationale: i?.rationale ?? "",
		demandEvidence: i?.demandEvidence ?? "",
		group: i?.group ?? "",
		ownerId: i?.ownerId ?? null,
		updateOwnerId: i?.updateOwnerId ?? null,
		linkedCourseId: i?.linkedCourseId ?? "",
		linkedCourseTitle: "",
		maintenanceCostNote: i?.maintenanceCostNote ?? "",
		priorityScore: i ? String(i.priorityScore) : "",
		certificationIds: i?.certificationIds ?? []
	};
}
function IdeaEditor({ initial, onClose }) {
	const { t } = useI18n();
	const toast = useToast();
	const [f, setF] = (0, import_react.useState)(() => ideaToForm(initial));
	const certs = useQuery({
		queryKey: akeys.certs("", false),
		queryFn: () => api("/api/admin/certifications"),
		retry: false
	});
	const set = (p) => setF((x) => ({
		...x,
		...p
	}));
	const save = useApiMutation(() => api(f.id ? `/api/admin/course-ideas/${f.id}` : "/api/admin/course-ideas", {
		method: f.id ? "PUT" : "POST",
		body: {
			title: f.title.trim(),
			audience: nz(f.audience),
			rationale: nz(f.rationale),
			demandEvidence: nz(f.demandEvidence),
			group: nz(f.group),
			ownerId: f.ownerId,
			updateOwnerId: f.updateOwnerId,
			linkedCourseId: nz(f.linkedCourseId),
			certificationIds: f.certificationIds,
			maintenanceCostNote: nz(f.maintenanceCostNote),
			priorityScore: f.priorityScore ? Number(f.priorityScore) : null
		}
	}), [akeys.ideas], () => {
		toast.success(t("discover.admin.saved"));
		onClose();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "stack",
		style: {
			display: "grid",
			gap: "var(--space-3)"
		},
		onSubmit: (e) => {
			e.preventDefault();
			save.mutate(void 0);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.ideas.titleField"),
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.title,
					onChange: (e) => set({ title: e.target.value }),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dfilters",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("discover.admin.ideas.group"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: f.group,
						onChange: (e) => set({ group: e.target.value })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("discover.admin.ideas.priority"),
					hint: t("discover.admin.ideas.priorityHint"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						max: 1e3,
						value: f.priorityScore,
						onChange: (e) => set({ priorityScore: e.target.value })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.ideas.audience"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: f.audience,
					onChange: (e) => set({ audience: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.ideas.rationale"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: f.rationale,
					onChange: (e) => set({ rationale: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.ideas.demand"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: f.demandEvidence,
					onChange: (e) => set({ demandEvidence: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.ideas.maintenance"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: f.maintenanceCostNote,
					onChange: (e) => set({ maintenanceCostNote: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPicker, {
				label: t("discover.admin.ideas.owner"),
				value: f.ownerId,
				onChange: (id) => set({ ownerId: id })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPicker, {
				label: t("discover.admin.ideas.updateOwner"),
				value: f.updateOwnerId,
				onChange: (id) => set({ updateOwnerId: id })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.ideas.linkedCourseId"),
				hint: f.linkedCourseTitle || t("discover.admin.ideas.linkedHint"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: f.linkedCourseId,
					onChange: (e) => set({
						linkedCourseId: e.target.value,
						linkedCourseTitle: ""
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseSearch, {
				label: t("discover.admin.findCourse"),
				onPick: (c) => set({
					linkedCourseId: c.id,
					linkedCourseTitle: c.title
				}),
				pickLabel: (title) => t("discover.admin.chooseNamed", { title })
			}),
			certs.data && certs.data.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				style: {
					border: 0,
					padding: 0,
					margin: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "field__label",
					children: t("discover.admin.ideas.certifications")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "check-grid",
					children: certs.data.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						label: c.title,
						checked: f.certificationIds.includes(c.id),
						onChange: (e) => set({ certificationIds: e.target.checked ? [...f.certificationIds, c.id] : f.certificationIds.filter((x) => x !== c.id) })
					}, c.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: save.error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: onClose,
					children: t("common.cancel")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: save.isPending,
					children: t("common.save")
				})]
			})
		]
	});
}
function IdeaCard({ idea, onEdit }) {
	const { t } = useI18n();
	const toast = useToast();
	const [target, setTarget] = (0, import_react.useState)("");
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const change = useApiMutation((state) => api(`/api/admin/course-ideas/${idea.id}/state`, { body: {
		state,
		notes: null
	} }), [akeys.ideas], () => {
		setTarget("");
		toast.success(t("discover.admin.ideas.moved"));
	});
	const del = useApiMutation(() => api(`/api/admin/course-ideas/${idea.id}`, { method: "DELETE" }), [akeys.ideas], () => {
		setDeleting(false);
		toast.success(t("discover.admin.deleted"));
	});
	const next = IDEA_TRANSITIONS[idea.state];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "card card--flat",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				style: {
					fontSize: "var(--text-md)",
					margin: 0
				},
				children: idea.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				style: { margin: "var(--space-1) 0" },
				children: [
					idea.group,
					t("discover.admin.ideas.priorityShort", { n: idea.priorityScore }),
					idea.roadmapRank ? t("discover.admin.ideas.rank", { n: idea.roadmapRank }) : ""
				].filter(Boolean).join(" · ")
			}),
			next.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					if (target) change.mutate(target);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					"aria-label": t("discover.admin.ideas.moveNamed", { title: idea.title }),
					value: target,
					onChange: (e) => setTarget(e.target.value),
					placeholder: t("discover.admin.ideas.moveTo"),
					options: next.map((s) => ({
						value: s,
						label: t(`discover.ideaState.${s}`)
					}))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					type: "submit",
					disabled: !target,
					loading: change.isPending,
					children: t("discover.admin.ideas.move")
				})]
			}) : null,
			change.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: change.error }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				style: { marginBlockStart: "var(--space-2)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: onEdit,
					"aria-label": t("discover.admin.editNamed", { title: idea.title }),
					children: t("discover.admin.edit")
				}), idea.state !== "InProduction" && idea.state !== "Published" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => {
						del.reset();
						setDeleting(true);
					},
					"aria-label": t("discover.admin.deleteNamed", { title: idea.title }),
					children: t("discover.admin.delete")
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: deleting,
				danger: true,
				title: t("discover.admin.deleteNamed", { title: idea.title }),
				body: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("discover.admin.ideas.deleteBody") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: del.error })] }),
				confirmLabel: t("discover.admin.delete"),
				loading: del.isPending,
				onCancel: () => setDeleting(false),
				onConfirm: () => del.mutate(void 0)
			})
		]
	});
}
function AdminIdeasPage() {
	const { t } = useI18n();
	const toast = useToast();
	usePageMeta(t("discover.admin.ideas.title"), void 0, { noindex: true });
	const [q, setQ] = (0, import_react.useState)("");
	const ideas = useQuery({
		queryKey: [...akeys.ideas, q],
		queryFn: () => api(`/api/admin/course-ideas${qs({ q: q.trim() || void 0 })}`)
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [importing, setImporting] = (0, import_react.useState)(false);
	const [markdown, setMarkdown] = (0, import_react.useState)("");
	const [importResult, setImportResult] = (0, import_react.useState)(null);
	const importRoadmap = useApiMutation(() => api("/api/admin/course-ideas/import-roadmap", { body: { markdown: nz(markdown) } }), [akeys.ideas], (r) => {
		setImportResult(r);
		setImporting(false);
		toast.success(t("discover.admin.ideas.imported", {
			created: r.created,
			skipped: r.skipped
		}));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: t("discover.admin.ideas.title"),
			subtitle: t("discover.admin.ideas.subtitle"),
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => {
					importRoadmap.reset();
					setImporting(true);
				},
				children: t("discover.admin.ideas.import")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setEditing("new"),
				children: t("discover.admin.ideas.new")
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "info",
			children: t("discover.admin.ideas.private")
		}),
		importResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "status",
			className: "small",
			children: t("discover.admin.ideas.importSummary", {
				parsed: importResult.parsed,
				created: importResult.created,
				skipped: importResult.skipped
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "filters card card--flat",
			role: "search",
			onSubmit: (e) => e.preventDefault(),
			style: { marginBlock: "var(--space-4)" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("discover.admin.ideas.search"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "search",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: ideas,
			children: (list) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "board",
				role: "list",
				"aria-label": t("discover.admin.ideas.board"),
				children: IDEA_STATES.map((s) => {
					const col = list.filter((i) => i.state === s).sort((a, b) => b.priorityScore - a.priorityScore || (a.roadmapRank ?? 1e9) - (b.roadmapRank ?? 1e9));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "board__col",
						role: "listitem",
						"aria-labelledby": `col-${s}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							id: `col-${s}`,
							children: [
								t(`discover.ideaState.${s}`),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "small muted",
									children: [
										"(",
										col.length,
										")"
									]
								})
							]
						}), col.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: t("discover.admin.ideas.emptyCol")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "board__list",
							children: col.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeaCard, {
								idea: i,
								onEdit: () => setEditing(i)
							}, i.id))
						})]
					}, s);
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			wide: true,
			title: editing === "new" ? t("discover.admin.ideas.new") : t("discover.admin.ideas.edit"),
			onClose: () => setEditing(null),
			children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdeaEditor, {
				initial: editing === "new" ? void 0 : editing,
				onClose: () => setEditing(null)
			}, editing === "new" ? "new" : editing.id) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open: importing,
			title: t("discover.admin.ideas.import"),
			onClose: () => setImporting(false),
			footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => setImporting(false),
				children: t("common.cancel")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				loading: importRoadmap.isPending,
				onClick: () => importRoadmap.mutate(void 0),
				children: t("discover.admin.ideas.runImport")
			})] }),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("discover.admin.ideas.importBody") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("discover.admin.ideas.markdown"),
					hint: t("discover.admin.ideas.markdownHint"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 6,
						value: markdown,
						onChange: (e) => setMarkdown(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNotice, { error: importRoadmap.error })
			]
		})
	] });
}
//#endregion
export { AdminBestsellersPage, AdminCertificationDetailPage, AdminCertificationsPage, AdminCollectionsPage, AdminIdeasPage, AdminPathwaysPage, AdminSkillsPage, FRESH_DAYS, verificationChecks };

//# sourceMappingURL=AdminDiscoverPages-YFjWKV2T.js.map