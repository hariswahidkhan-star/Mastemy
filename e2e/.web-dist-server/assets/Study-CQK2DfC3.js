import { _ as require_react, a as Link, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, n as ButtonLink, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as wsError, c as WEEK_DAYS, h as groupByDay, i as fmtDateTime, r as WsError, y as wsKeys } from "./common-BCMvJ35x.js";
import { a as QueryState, n as Notice, r as PageHeader, t as Badge } from "./misc-Bqc6tFVU.js";
import { t as EmptyState } from "./EmptyState-DxiM9uz0.js";
import { n as useApiMutation } from "./hooks-D70iOwvH.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { n as accountKeys, t as accountApi } from "./account-CkAe5QCo.js";
import { i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { n as formatTimestamp } from "./format-B7uvlQ7u.js";
import { t as ConfirmDialog } from "./Dialog-CcENtYyA.js";
import { t as CalendarSubscription } from "./Account-BZOx0fua.js";
//#region src/pages/workspace/Study.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function useContinueLearning(limit = 10) {
	return useQuery({
		queryKey: [...wsKeys.continueLearning, limit],
		queryFn: () => api(`/api/me/continue-learning?limit=${limit}`)
	});
}
function ContinueLearningSection() {
	const { t, fmtNumber } = useI18n();
	const list = useContinueLearning(6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		"aria-labelledby": "ws-continue-h",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "row row--between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "ws-continue-h",
				children: t("workspace.continue.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/me/study-plan",
						children: t("workspace.plan.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/me/folders",
						children: t("workspace.folders.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/me/bookmarks",
						children: t("workspace.bookmarks.title")
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("workspace.continue.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "ws-list",
				children: items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "row row--between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.courseTitle }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "small muted",
						children: [
							" ",
							"·",
							" ",
							t("workspace.continue.progress", {
								done: fmtNumber(c.completedLessons),
								total: fmtNumber(c.totalLessons)
							}),
							c.lessonTitle ? ` · ${c.lessonTitle}` : ""
						]
					})] }), c.courseCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "success",
						children: t("workspace.continue.completed")
					}) : c.lessonId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonLink, {
						size: "sm",
						to: `/learn/${c.slug}/${c.lessonId}${c.positionSeconds > 0 ? `?t=${c.positionSeconds}` : ""}`,
						"aria-label": t("workspace.continue.resumeNamed", { title: c.courseTitle }),
						children: c.positionSeconds > 0 ? t("workspace.continue.resumeAt", { time: formatTimestamp(c.positionSeconds) }) : t("workspace.continue.resume")
					}) : null]
				}, c.courseId))
			})
		})]
	});
}
function defaultTarget() {
	return new Date(Date.now() + 5184e6).toISOString().slice(0, 10);
}
function PlanForm({ initial, onSaved, onCancel }) {
	const { t } = useI18n();
	const courses = useContinueLearning(50);
	const [courseIds, setCourseIds] = (0, import_react.useState)(initial?.courseIds ?? []);
	const [target, setTarget] = (0, import_react.useState)(initial?.targetDate.slice(0, 10) ?? defaultTarget());
	const [minutes, setMinutes] = (0, import_react.useState)(String(initial?.weeklyMinutes ?? 180));
	const [days, setDays] = (0, import_react.useState)(initial?.sessionDays ?? [
		"Monday",
		"Wednesday",
		"Friday"
	]);
	const [hour, setHour] = (0, import_react.useState)(String(initial?.sessionHour ?? initial?.sessionHourUtc ?? 18));
	const profile = useQuery({
		queryKey: accountKeys.profile,
		queryFn: accountApi.profile,
		enabled: !initial?.timeZone
	});
	const zone = initial?.timeZone ?? (profile.data?.timeZone || "UTC");
	const [reminders, setReminders] = (0, import_react.useState)(initial?.remindersEnabled ?? false);
	const mins = Number(minutes);
	const valid = courseIds.length >= 1 && courseIds.length <= 10 && days.length > 0 && !!target && Number.isInteger(mins) && mins >= 15 && mins <= 3e3;
	const save = useApiMutation(() => api("/api/me/study-plan", {
		method: "PUT",
		body: {
			courseIds,
			targetDate: `${target}T00:00:00Z`,
			weeklyMinutes: mins,
			sessionDays: days,
			sessionHour: Number(hour),
			remindersEnabled: reminders
		}
	}), [wsKeys.studyPlan], () => onSaved());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "card stack",
		onSubmit: (e) => {
			e.preventDefault();
			if (valid) save.mutate(void 0);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: t("workspace.plan.courses") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: courses,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("workspace.plan.noCourses")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					label: c.courseTitle,
					checked: courseIds.includes(c.courseId),
					onChange: (e) => setCourseIds((s) => e.target.checked ? [...s, c.courseId] : s.filter((x) => x !== c.courseId))
				}, c.courseId)) })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("workspace.plan.target"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: target,
						onChange: (e) => setTarget(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("workspace.plan.weeklyMinutes"),
					hint: t("workspace.plan.weeklyHint"),
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 15,
						max: 3e3,
						step: 5,
						value: minutes,
						onChange: (e) => setMinutes(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: t("workspace.plan.days") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "row",
				children: WEEK_DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					label: t(`workspace.days.${d}`),
					checked: days.includes(d),
					onChange: (e) => setDays((s) => e.target.checked ? [...s, d] : s.filter((x) => x !== d))
				}, d))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("workspace.plan.hour"),
				hint: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					t("finala.tz.hint", { zone }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/me/profile",
						children: t("finala.tz.change")
					})
				] }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: hour,
					onChange: (e) => setHour(e.target.value),
					options: Array.from({ length: 24 }, (_, h) => ({
						value: String(h),
						label: `${String(h).padStart(2, "0")}:00 ${zone}`
					}))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("workspace.plan.reminders"),
				hint: t("workspace.plan.remindersHint"),
				checked: reminders,
				onChange: (e) => setReminders(e.target.checked)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: save.error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !valid,
					loading: save.isPending,
					children: t("workspace.plan.save")
				}), onCancel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: onCancel,
					children: t("common.cancel")
				}) : null]
			})
		]
	});
}
function StudyPlanPage() {
	const { t, lang, fmtNumber, fmtDate } = useI18n();
	const toast = useToast();
	usePageMeta(t("workspace.plan.title"), void 0, { noindex: true });
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	const plan = useQuery({
		queryKey: wsKeys.studyPlan,
		queryFn: () => api("/api/me/study-plan").then((p) => p ?? null)
	});
	const regen = useApiMutation(() => api("/api/me/study-plan/regenerate", { method: "POST" }), [wsKeys.studyPlan], () => toast.success(t("workspace.plan.regenerated")));
	const del = useApiMutation(() => api("/api/me/study-plan", { method: "DELETE" }), [wsKeys.studyPlan], () => {
		setConfirmDelete(false);
		toast.success(t("workspace.plan.deleted"));
	});
	const [icsBusy, setIcsBusy] = (0, import_react.useState)(false);
	const downloadIcs = () => {
		setIcsBusy(true);
		downloadFile("/api/me/study-plan.ics", "mastemy-study-plan.ics").catch((e) => toast.error(wsError(e, t))).finally(() => setIcsBusy(false));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("workspace.plan.title"),
				subtitle: t("workspace.plan.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: plan,
				children: (p) => !p || editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanForm, {
					initial: p,
					onSaved: () => {
						setEditing(false);
						toast.success(t("workspace.plan.saved"));
					},
					onCancel: p ? () => setEditing(false) : void 0
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stack",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ws-stats",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ws-stat",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ws-stat__label",
										children: t("workspace.plan.remaining")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ws-stat__value",
										children: [
											fmtNumber(p.remainingLessons),
											" / ",
											fmtNumber(p.totalLessons)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ws-stat",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ws-stat__label",
										children: t("workspace.plan.finishes")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ws-stat__value",
										children: p.finishesAt ? fmtDate(p.finishesAt) : "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ws-stat",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ws-stat__label",
										children: t("workspace.plan.target")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ws-stat__value",
										children: fmtDate(p.targetDate)
									})]
								})
							]
						}),
						p.fitsBeforeTarget ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "success",
							children: t("workspace.plan.fits")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
							tone: "warning",
							children: t("workspace.plan.doesNotFit")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: downloadIcs,
									loading: icsBusy,
									children: t("workspace.plan.ics")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									onClick: () => setEditing(true),
									children: t("workspace.plan.edit")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									loading: regen.isPending,
									onClick: () => regen.mutate(void 0),
									children: t("workspace.plan.regenerate")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => setConfirmDelete(true),
									children: t("workspace.plan.delete")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small",
							"data-testid": "plan-zone",
							children: t("finala.tz.planAt", {
								hour: `${String(p.sessionHour ?? p.sessionHourUtc).padStart(2, "0")}:00`,
								zone: p.timeZone ?? "UTC"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarSubscription, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small muted",
							children: p.remindersEnabled ? t("workspace.plan.remindersOn") : t("workspace.plan.remindersOff")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: regen.error }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"aria-labelledby": "ws-sched-h",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "ws-sched-h",
								children: t("workspace.plan.schedule")
							}), p.weeks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "muted",
								children: t("workspace.plan.nothingScheduled")
							}) : p.weeks.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "ws-week",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
									t("workspace.plan.week", { date: fmtDate(w.weekStart) }),
									" ·",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "small muted",
										children: t("workspace.plan.minutes", { n: fmtNumber(w.plannedMinutes) })
									})
								] }), groupByDay(w.items).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ws-day",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "small",
										children: fmtDateTime(d.items[0].scheduledAt, lang)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: d.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: i.completed ? "ws-done" : void 0,
										children: [
											i.completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "visually-hidden",
												children: [t("learn.completed"), ": "]
											}) : null,
											i.courseTitle,
											" › ",
											i.lessonTitle,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "small muted",
												children: [
													"(",
													formatTimestamp(i.durationSeconds),
													")"
												]
											})
										]
									}, i.id)) })]
								}, d.day))]
							}, w.weekStart))]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmDelete,
				danger: true,
				title: t("workspace.plan.delete"),
				body: t("workspace.plan.deleteBody"),
				confirmLabel: t("common.delete"),
				loading: del.isPending,
				onCancel: () => setConfirmDelete(false),
				onConfirm: () => del.mutate(void 0)
			})
		]
	});
}
function FoldersPage() {
	const { t } = useI18n();
	const toast = useToast();
	usePageMeta(t("workspace.folders.title"), void 0, { noindex: true });
	const [name, setName] = (0, import_react.useState)("");
	const folders = useQuery({
		queryKey: wsKeys.folders,
		queryFn: () => api("/api/me/folders")
	});
	const courses = useContinueLearning(50);
	const create = useApiMutation(() => api("/api/me/folders", {
		method: "POST",
		body: { name: name.trim() }
	}), [wsKeys.folders], () => setName(""));
	const rename = useApiMutation((v) => api(`/api/me/folders/${v.id}`, {
		method: "PUT",
		body: {
			name: v.name,
			sortOrder: v.sortOrder
		}
	}), [wsKeys.folders]);
	const remove = useApiMutation((id) => api(`/api/me/folders/${id}`, { method: "DELETE" }), [wsKeys.folders]);
	const setCourse = useApiMutation((v) => api(`/api/me/folders/${v.id}/courses/${v.courseId}`, { method: v.add ? "PUT" : "DELETE" }), [wsKeys.folders]);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const onError = (e) => toast.error(wsError(e, t));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("workspace.folders.title"),
				subtitle: t("workspace.folders.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					if (name.trim()) create.mutate(void 0, { onError });
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("workspace.folders.new"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						maxLength: 100
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !name.trim(),
					loading: create.isPending,
					children: t("workspace.folders.create")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: folders,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("workspace.folders.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stack",
					children: list.map((f) => {
						const inFolder = new Set(f.courses.map((c) => c.courseId));
						const addable = (courses.data ?? []).filter((c) => !inFolder.has(c.courseId));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "card",
							"aria-label": f.name,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "row row--between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										style: { margin: 0 },
										children: f.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => {
												const next = window.prompt(t("workspace.folders.renamePrompt"), f.name);
												if (next && next.trim()) rename.mutate({
													id: f.id,
													name: next.trim(),
													sortOrder: f.sortOrder
												}, { onError });
											},
											children: t("curriculum.rename")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => setToDelete(f),
											children: t("common.delete")
										})]
									})]
								}),
								f.courses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "muted small",
									children: t("workspace.folders.noCourses")
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "ws-list",
									children: f.courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "row row--between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: `/learn/${c.slug}`,
											children: c.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											"aria-label": t("workspace.folders.removeNamed", { title: c.title }),
											onClick: () => setCourse.mutate({
												id: f.id,
												courseId: c.courseId,
												add: false
											}, { onError }),
											children: t("workspace.folders.remove")
										})]
									}, c.courseId))
								}),
								addable.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("workspace.folders.add"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										value: "",
										placeholder: t("workspace.folders.choose"),
										onChange: (e) => e.target.value && setCourse.mutate({
											id: f.id,
											courseId: e.target.value,
											add: true
										}, { onError }),
										options: addable.map((c) => ({
											value: c.courseId,
											label: c.courseTitle
										}))
									})
								}) : null
							]
						}, f.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!toDelete,
				danger: true,
				title: t("workspace.folders.delete"),
				body: t("workspace.folders.deleteBody", { name: toDelete?.name ?? "" }),
				confirmLabel: t("common.delete"),
				loading: remove.isPending,
				onCancel: () => setToDelete(null),
				onConfirm: () => toDelete && remove.mutate(toDelete.id, {
					onSuccess: () => setToDelete(null),
					onError
				})
			})
		]
	});
}
function BookmarksPanel({ lessonId, player }) {
	const { t } = useI18n();
	const toast = useToast();
	const [label, setLabel] = (0, import_react.useState)("");
	const list = useQuery({
		queryKey: wsKeys.bookmarks(lessonId),
		queryFn: () => api(`/api/me/bookmarks?lessonId=${lessonId}`)
	});
	const add = useApiMutation((ts) => api("/api/me/bookmarks", {
		method: "POST",
		body: {
			lessonId,
			timestampSeconds: ts,
			label: label.trim() || null
		}
	}), [wsKeys.bookmarks(lessonId), wsKeys.bookmarks()], (_r, ts) => {
		setLabel("");
		toast.success(t("workspace.bookmarks.added", { time: formatTimestamp(ts) }));
	});
	const remove = useApiMutation((id) => api(`/api/me/bookmarks/${id}`, { method: "DELETE" }), [wsKeys.bookmarks(lessonId), wsKeys.bookmarks()]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					add.mutate(Math.floor(player.current?.getCurrentTime() ?? 0));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("workspace.bookmarks.label"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: label,
						onChange: (e) => setLabel(e.target.value),
						maxLength: 200
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: add.isPending,
					children: t("workspace.bookmarks.add")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WsError, { error: add.error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: list,
				children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("workspace.bookmarks.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ws-list",
					children: items.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "row row--between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => player.current?.seekTo(b.timestampSeconds),
								"aria-label": t("notes.seekTo", { time: formatTimestamp(b.timestampSeconds) }),
								children: formatTimestamp(b.timestampSeconds)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { flex: 1 },
								children: b.label || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => remove.mutate(b.id),
								"aria-label": t("workspace.bookmarks.removeNamed", { time: formatTimestamp(b.timestampSeconds) }),
								children: t("common.delete")
							})
						]
					}, b.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "small",
				to: "/me/bookmarks",
				children: t("workspace.bookmarks.all")
			})
		]
	});
}
function BookmarksPage() {
	const { t, fmtDate } = useI18n();
	usePageMeta(t("workspace.bookmarks.title"), void 0, { noindex: true });
	const list = useQuery({
		queryKey: wsKeys.bookmarks(),
		queryFn: () => api("/api/me/bookmarks")
	});
	const slugs = useContinueLearning(50);
	const slugOf = (courseId) => slugs.data?.find((c) => c.courseId === courseId)?.slug;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: t("workspace.bookmarks.title") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: list,
			children: (items) => items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: t("workspace.bookmarks.none") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "ws-list",
				children: items.map((b) => {
					const slug = slugOf(b.courseId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: b.courseTitle }),
									" › ",
									b.lessonTitle,
									" ·",
									" ",
									formatTimestamp(b.timestampSeconds)
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small muted",
									children: fmtDate(b.createdAt)
								})]
							}),
							b.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { margin: 0 },
								children: b.label
							}) : null,
							b.lessonAvailable && slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/learn/${slug}/${b.lessonId}?t=${b.timestampSeconds}`,
								children: t("workspace.bookmarks.open")
							}) : !b.lessonAvailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "small muted",
								children: t("workspace.bookmarks.unavailable")
							}) : null
						]
					}, b.id);
				})
			})
		})]
	});
}
//#endregion
export { StudyPlanPage as a, FoldersPage as i, BookmarksPanel as n, ContinueLearningSection as r, BookmarksPage as t };

//# sourceMappingURL=Study-CQK2DfC3.js.map