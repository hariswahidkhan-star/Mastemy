import { r as ApiError } from "./Button-6CizQUWS.js";
import { l as errorMessage } from "./misc-Bqc6tFVU.js";
//#region src/pages/exams/examErrors.ts
/** Problem codes from the wave 3 question/assessment API that deserve a specific explanation. */
var CODES = [
	"premium_required",
	"no_matching_questions",
	"no_courses",
	"attempt_paused",
	"pause_not_allowed",
	"exposure_limit_reached",
	"attempt_in_progress",
	"malformed_xlsx",
	"case_group_in_use",
	"copy_rejected"
];
function examError(error, t) {
	if (error instanceof ApiError) {
		const code = CODES.find((c) => error.is(c));
		if (code === "malformed_xlsx") return t("exams.errors.malformed_xlsx", { detail: error.problem?.title ?? "" });
		if (code) {
			const detail = error.problem?.title;
			const base = t(`exams.errors.${code}`);
			return detail && code !== "premium_required" ? `${base} (${detail})` : base;
		}
	}
	return errorMessage(error, t);
}
function isPremiumError(error) {
	return error instanceof ApiError && error.is("premium_required");
}
//#endregion
export { isPremiumError as n, examError as t };

//# sourceMappingURL=examErrors-ngodnTsv.js.map