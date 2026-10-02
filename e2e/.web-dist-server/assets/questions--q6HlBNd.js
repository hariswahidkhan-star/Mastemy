//#region src/api/questions.ts
/**
* Flattens the server's question (metadata + current version + optional staged edit) into the
* form-friendly shape. A staged edit is shown (and edited) in place of the current version.
*/
function toQuestion(raw) {
	const v = raw.pending ?? raw.version;
	return {
		id: raw.id,
		externalId: raw.externalId,
		state: raw.pending && raw.pendingState ? raw.pendingState : raw.state,
		currentVersion: raw.pendingVersion ?? raw.currentVersion,
		updatedAt: raw.updatedAt,
		moduleId: raw.moduleId,
		lessonId: raw.lessonId,
		type: v.type,
		language: v.language,
		stem: v.stem,
		explanation: v.explanation,
		difficulty: v.difficulty,
		skillCode: v.skillCode ?? "",
		certificationObjective: v.certificationObjective ?? "",
		tags: (v.tags ?? []).join(", "),
		sourceReference: v.sourceReference ?? "",
		allowShuffle: v.allowShuffle,
		options: v.options.map((o) => ({
			id: o.id,
			text: o.text,
			isCorrect: o.isCorrect,
			rationale: o.rationale
		})),
		cognitiveLevel: raw.meta?.cognitiveLevel ?? null,
		caseGroupId: raw.meta?.caseGroupId ?? null,
		caseGroupOrder: raw.meta?.caseGroupOrder ?? 0,
		sourceQuestionId: raw.meta?.sourceQuestionId ?? null,
		sourceVersion: raw.meta?.sourceVersion ?? null,
		sourceCourseId: raw.meta?.sourceCourseId ?? null,
		reusable: raw.meta?.reusable ?? false
	};
}
function toQuestionList(d) {
	return (Array.isArray(d) ? d : d.items).map(toQuestion);
}
/** The API takes tags as a list; the form edits them as a comma-separated string. */
function toQuestionBody(v) {
	return {
		...v,
		tags: v.tags.split(/[,;]/).map((s) => s.trim()).filter(Boolean)
	};
}
//#endregion
export { toQuestionBody as n, toQuestionList as r, toQuestion as t };

//# sourceMappingURL=questions--q6HlBNd.js.map