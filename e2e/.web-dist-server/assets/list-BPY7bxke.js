//#region src/api/list.ts
/** Accept either a bare array or a paged envelope from list endpoints. */
function asList(d) {
	return Array.isArray(d) ? d : d.items;
}
//#endregion
export { asList as t };

//# sourceMappingURL=list-BPY7bxke.js.map