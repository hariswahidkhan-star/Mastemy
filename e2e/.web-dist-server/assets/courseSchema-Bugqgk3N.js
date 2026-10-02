import { n as _enum, o as object, s as string } from "./zod-piP6K-Dk.js";
import { n as COURSE_LEVELS } from "./types-C7beT6Ou.js";
//#region src/pages/studio/courseSchema.ts
/**
* `goals` only guides the wizard: the API does not store it, so the editor (which cannot load it back)
* passes requireGoals=false.
*/
function courseSchema(t, requireGoals = true) {
	const goals = string().trim().min(20, t("validation.minChars", { n: 20 })).max(2e3);
	return object({
		goals: requireGoals ? goals : string().trim().max(2e3).optional(),
		audience: string().trim().min(20, t("validation.minChars", { n: 20 })).max(2e3),
		categoryId: string().min(1, t("validation.required")),
		level: _enum(COURSE_LEVELS),
		language: _enum(["en", "ar"]),
		title: string().trim().min(8, t("validation.minChars", { n: 8 })).max(120),
		subtitle: string().trim().max(200).optional(),
		description: string().trim().min(80, t("validation.minChars", { n: 80 })).max(1e4),
		prerequisites: string().trim().max(4e3),
		outcomes: string().trim().refine((v) => v.split(/\r?\n/).filter((l) => l.trim()).length >= 3, t("studio.outcomesRule"))
	});
}
function toCourseInput(v) {
	return {
		title: v.title,
		subtitle: v.subtitle ?? "",
		description: v.description,
		audience: v.audience,
		goals: v.goals,
		prerequisites: v.prerequisites,
		outcomes: v.outcomes.split(/\r?\n/).map((l) => l.trim()).filter(Boolean),
		language: v.language,
		level: v.level,
		categoryIds: [Number(v.categoryId)]
	};
}
//#endregion
export { toCourseInput as n, courseSchema as t };

//# sourceMappingURL=courseSchema-Bugqgk3N.js.map