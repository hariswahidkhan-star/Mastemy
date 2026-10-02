//#region src/lib/format.ts
/** 3725 -> "1:02:05", 65 -> "1:05" */
function formatTimestamp(totalSeconds) {
	const s = Math.max(0, Math.floor(totalSeconds));
	const h = Math.floor(s / 3600);
	const m = Math.floor(s % 3600 / 60);
	const sec = s % 60;
	const pad = (n) => String(n).padStart(2, "0");
	return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
}
/** Human duration split into hours/minutes for translation. */
function durationParts(totalSeconds) {
	const s = Math.max(0, Math.round(totalSeconds));
	return {
		h: Math.floor(s / 3600),
		m: Math.round(s % 3600 / 60)
	};
}
function splitLines(text) {
	return (text ?? "").split(/\r?\n/).map((l) => l.replace(/^\s*[-*•]\s*/, "").trim()).filter(Boolean);
}
function newIdempotencyKey() {
	return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
//#endregion
export { splitLines as i, formatTimestamp as n, newIdempotencyKey as r, durationParts as t };

//# sourceMappingURL=format-B7uvlQ7u.js.map