import { _ as require_react, b as __toESM, i as require_jsx_runtime, r as useI18n } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { E as shallowEqualObjects, c as Subscribable, o as notifyManager, w as replaceEqualDeep, x as noop } from "./removable-CZPO7fS3.js";
import { a as ensurePreventErrorBoundaryRetry, c as useQueryErrorResetBoundary, i as shouldSuspend, l as useIsRestoring, n as ensureSuspenseTimers, o as getHasError, r as fetchOptimistic, s as useClearResetErrorBoundary, t as useQuery, u as QueryObserver } from "./useQuery-CJ9aOC3Y.js";
import { f as qs, i as api, s as downloadFile, t as Button } from "./Button-6CizQUWS.js";
import { i as usePageMeta } from "./seo-DH3WSmad.js";
import { a as QueryState, n as Notice, r as PageHeader, u as Spinner } from "./misc-Bqc6tFVU.js";
import { f as useStudioCourses, n as useApiMutation } from "./hooks-D70iOwvH.js";
import { l as referralLink, n as CStatus, o as commerceError } from "./shared-B2SaZ9p1.js";
import { n as useToast } from "./Toast-T-ZiAxmF.js";
import { a as Textarea, i as Select, n as Field, r as Input, t as Checkbox } from "./Field-Di1lkoGg.js";
import { t as Tabs } from "./Tabs-CKJGcPx4.js";
import { t as CommercePolicyPanel } from "./CommerceB-Sxam9PIm.js";
//#region node_modules/@tanstack/query-core/build/modern/queriesObserver.js
function difference(array1, array2) {
	const excludeSet = new Set(array2);
	return array1.filter((x) => !excludeSet.has(x));
}
/**
* A `QueriesObserver` watches an array of queries at once, exposing them as
* a single array of `QueryObserverResult`s (or, when a `combine` option is
* given, as a combined value derived from that array). It manages one
* internal `QueryObserver` per query, and is the primitive that framework
* adapters (e.g. `useQueries`) build their hooks on top of.
*
* @example
* ```ts
* const observer = new QueriesObserver(queryClient, [
*   { queryKey: ['post', 1], queryFn: fetchPost },
*   { queryKey: ['post', 2], queryFn: fetchPost },
* ])
*
* const unsubscribe = observer.subscribe((result) => {
*   console.log(result)
* })
* ```
*/
var QueriesObserver = class extends Subscribable {
	#client;
	#result;
	#queries;
	#options;
	#observers;
	#combinedResult;
	#lastCombine;
	#lastResult;
	#lastQueryHashes;
	#observerMatches = [];
	constructor(client, queries, options) {
		super();
		this.#client = client;
		this.#options = options;
		this.#queries = [];
		this.#observers = [];
		this.#result = [];
		this.setQueries(queries);
	}
	onSubscribe() {
		if (this.listeners.size === 1) this.#observers.forEach((observer) => {
			observer.subscribe((result) => {
				this.#onUpdate(observer, result);
			});
		});
	}
	onUnsubscribe() {
		if (!this.listeners.size) this.destroy();
	}
	/**
	* Stops observing all queries: clears all listeners and destroys every
	* underlying `QueryObserver` this observer manages.
	*/
	destroy() {
		this.listeners = /* @__PURE__ */ new Set();
		this.#observers.forEach((observer) => {
			observer.destroy();
		});
	}
	/**
	* Replaces the set of queries being observed. Existing `QueryObserver`s
	* are reused for queries that match an already-observed query hash;
	* observers for queries that are no longer present are destroyed, and new
	* observers are created and subscribed to for newly added queries.
	*
	* @example
	* ```ts
	* observer.setQueries([
	*   { queryKey: ['post', 1], queryFn: fetchPost },
	*   { queryKey: ['post', 3], queryFn: fetchPost },
	* ])
	* ```
	*/
	setQueries(queries, options) {
		this.#queries = queries;
		this.#options = options;
		if (process.env.NODE_ENV !== "production") {
			const queryHashes = queries.map((query) => this.#client.defaultQueryOptions(query).queryHash);
			if (new Set(queryHashes).size !== queryHashes.length) console.warn("[QueriesObserver]: Duplicate Queries found. This might result in unexpected behavior.");
		}
		notifyManager.batch(() => {
			const prevObservers = this.#observers;
			const newObserverMatches = this.#findMatchingObservers(this.#queries);
			newObserverMatches.forEach((match) => match.observer.setOptions(match.defaultedQueryOptions));
			const newObservers = newObserverMatches.map((match) => match.observer);
			const newResult = newObservers.map((observer) => observer.getCurrentResult());
			const hasLengthChange = prevObservers.length !== newObservers.length;
			const hasIndexChange = newObservers.some((observer, index) => observer !== prevObservers[index]);
			const hasStructuralChange = hasLengthChange || hasIndexChange;
			const hasResultChange = hasStructuralChange ? true : newResult.some((result, index) => {
				const prev = this.#result[index];
				return !prev || !shallowEqualObjects(result, prev);
			});
			if (!hasStructuralChange && !hasResultChange) return;
			if (hasStructuralChange) {
				this.#observerMatches = newObserverMatches;
				this.#observers = newObservers;
			}
			this.#result = newResult;
			if (!this.hasListeners()) return;
			if (hasStructuralChange) {
				difference(prevObservers, newObservers).forEach((observer) => {
					observer.destroy();
				});
				difference(newObservers, prevObservers).forEach((observer) => {
					observer.subscribe((result) => {
						this.#onUpdate(observer, result);
					});
				});
			}
			this.#notify();
		});
	}
	/**
	* Returns the most recently computed array of `QueryObserverResult`s, one
	* per observed query, in the same order as the queries passed to the
	* constructor or `setQueries`.
	*
	* @example
	* ```ts
	* const results = observer.getCurrentResult()
	* const data = results.map((result) => result.data)
	* ```
	*/
	getCurrentResult() {
		return this.#result;
	}
	/**
	* Returns the underlying `Query` instances currently being observed, in
	* the same order as the queries passed to the constructor or `setQueries`.
	*/
	getQueries() {
		return this.#observers.map((observer) => observer.getCurrentQuery());
	}
	/**
	* Returns the underlying `QueryObserver` instances this observer manages,
	* in the same order as the queries passed to the constructor or
	* `setQueries`.
	*/
	getObservers() {
		return this.#observers;
	}
	/**
	* The `QueriesObserver` counterpart of {@link QueryObserver#getOptimisticResult} — computes
	* the result for the given (already-defaulted) queries right now, synchronously. Called by
	* framework adapters (e.g. `useQueries`) ahead of subscribing, returning a tuple of the raw
	* per-query results, a function to compute the combined result from them, and a function to
	* wrap the results for property-access tracking.
	*/
	getOptimisticResult(queries, combine) {
		const matches = this.#findMatchingObservers(queries);
		const result = matches.map((match) => match.observer.getOptimisticResult(match.defaultedQueryOptions));
		const queryHashes = matches.map((match) => match.defaultedQueryOptions.queryHash);
		return [
			result,
			(r) => {
				return this.#combineResult(r ?? result, combine, queryHashes);
			},
			() => {
				return this.#trackResult(result, matches);
			}
		];
	}
	#trackResult(result, matches) {
		const trackedProps = /* @__PURE__ */ new Set();
		return matches.map((match, index) => {
			const observerResult = result[index];
			return !match.defaultedQueryOptions.notifyOnChangeProps ? match.observer.trackResult(observerResult, (accessedProp) => {
				if (!trackedProps.has(accessedProp)) {
					trackedProps.add(accessedProp);
					matches.forEach((m) => {
						m.observer.trackProp(accessedProp);
					});
				}
			}) : observerResult;
		});
	}
	#combineResult(input, combine, queryHashes) {
		if (combine) {
			const lastHashes = this.#lastQueryHashes;
			const queryHashesChanged = queryHashes !== void 0 && lastHashes !== void 0 && (lastHashes.length !== queryHashes.length || queryHashes.some((hash, i) => hash !== lastHashes[i]));
			if (this.#result !== this.#lastResult || queryHashesChanged || combine !== this.#lastCombine) {
				this.#lastCombine = combine;
				this.#lastResult = this.#result;
				if (queryHashes !== void 0) this.#lastQueryHashes = queryHashes;
				this.#combinedResult = replaceEqualDeep(this.#combinedResult, combine(input));
			}
			return this.#combinedResult;
		}
		return input;
	}
	#shouldSkipCombine() {
		return !this.#options?.combine || this.#observers.some((observer, index) => {
			return observer.options.suspense && this.#result[index]?.data === void 0;
		});
	}
	#findMatchingObservers(queries) {
		const prevObserversMap = /* @__PURE__ */ new Map();
		this.#observers.forEach((observer) => {
			const key = observer.options.queryHash;
			if (!key) return;
			const previousObservers = prevObserversMap.get(key);
			if (previousObservers) previousObservers.push(observer);
			else prevObserversMap.set(key, [observer]);
		});
		const observers = [];
		queries.forEach((options) => {
			const defaultedOptions = this.#client.defaultQueryOptions(options);
			const observer = prevObserversMap.get(defaultedOptions.queryHash)?.shift() ?? new QueryObserver(this.#client, defaultedOptions);
			observers.push({
				defaultedQueryOptions: defaultedOptions,
				observer
			});
		});
		return observers;
	}
	#onUpdate(observer, result) {
		const index = this.#observers.indexOf(observer);
		if (index !== -1) {
			this.#result = this.#result.slice();
			this.#result[index] = result;
			this.#notify();
		}
	}
	#notify() {
		if (this.hasListeners()) {
			const shouldSkipCombine = this.#shouldSkipCombine();
			const previousResult = this.#combinedResult;
			const newResult = shouldSkipCombine ? previousResult : this.#combineResult(this.#trackResult(this.#result, this.#observerMatches), this.#options?.combine);
			if (shouldSkipCombine || previousResult !== newResult) notifyManager.batch(() => {
				this.listeners.forEach((listener) => {
					listener(this.#result);
				});
			});
		}
	}
};
//#endregion
//#region node_modules/@tanstack/react-query/build/modern/useQueries.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* The `useQueries` hook can be used to fetch a variable number of queries.
*
* The `queries` key accepts an array with query option objects mostly identical to `useQuery` — the top-level
* `subscribed` option isn't accepted per query (see `placeholderData` below for another difference). A custom
* `QueryClient` is supplied once, as `useQueries`' own top-level second argument, rather than per query.
*
* Having the same query key more than once in the array of query objects may cause some data to be shared
* between queries. To avoid this, consider de-duplicating the queries and map the results back to the desired
* structure.
*
* The `combine` option can be used to combine the results of the queries into a single value. The result will
* be structurally shared to be as referentially stable as possible.
*
* @remarks The `combine` function only re-runs if it changed referentially, or if any of the query results
* changed. An inlined `combine` function, as shown in the example below, therefore runs on every render — wrap
* it in `useCallback`, or extract it to a stable function reference if it doesn't have any dependencies, to
* avoid that.
*
* Unlike `useQuery`, `useQueries` cannot infer the `data` argument of an _inline_ `select` from its sibling
* `queryFn`. Because `useQueries` infers the type of the whole `queries` array at once, the `select` parameter
* of a query object written inline cannot be contextually typed from that same object's `queryFn`, so it falls
* back to `unknown` — a [known TypeScript limitation](https://github.com/TanStack/query/issues/6556). Annotate
* the `select` parameter explicitly, or define the query with {@link queryOptions}, which resolves its types in
* a single object _before_ it reaches `useQueries`, to work around this — see the example below. The same
* limitation applies to {@link useSuspenseQueries}.
*
* `placeholderData` is supported here too, but unlike `useQuery`, it doesn't receive information from
* previously rendered queries, because the number of queries can differ between renders.
* @param queryClient - Use this to provide a custom `QueryClient`. Otherwise, the one from the nearest context
* will be used.
* @returns The combined result. Without `combine`, this is an array with all the query results, in the same
* order as the input. When `combine` is provided, this is the value returned by `combine` instead.
*
* @example
* ```tsx
* import { useQueries } from '@tanstack/react-query'
*
* function Posts({ ids }: { ids: Array<number> }) {
*   const postQueries = useQueries({
*     queries: ids.map((id) => ({
*       queryKey: ['post', id],
*       queryFn: () => fetchPost(id),
*       staleTime: Infinity,
*     })),
*   })
*
*   return (
*     <ul>
*       {postQueries.map((query, index) => {
*         if (query.isPending) return <li key={ids[index]}>Loading...</li>
*         if (query.isError) return <li key={ids[index]}>Error: {query.error.message}</li>
*         return <li key={ids[index]}>{query.data.title}</li>
*       })}
*     </ul>
*   )
* }
* ```
*
* @example
* Combining results into a single value:
* ```tsx
* import { useQueries } from '@tanstack/react-query'
*
* function Posts({ ids }: { ids: Array<number> }) {
*   const { data, isPending, isError } = useQueries({
*     queries: ids.map((id) => ({
*       queryKey: ['post', id],
*       queryFn: () => fetchPost(id),
*     })),
*     combine: (postQueries) => {
*       return {
*         data: postQueries.map((query) => query.data),
*         isPending: postQueries.some((query) => query.isPending),
*         isError: postQueries.some((query) => query.isError),
*       }
*     },
*   })
*
*   if (isPending) return 'Loading...'
*   if (isError) return 'Error loading posts'
*
*   return (
*     <ul>
*       {data.map((post) => (
*         <li key={post?.id}>{post?.title}</li>
*       ))}
*     </ul>
*   )
* }
* ```
*
* @example
* Typing `select` via {@link queryOptions}. Note that spreading a `queryOptions` result and overriding
* `select` inline still falls back to `unknown` — wrap the spread in `queryOptions` again so the override is
* resolved before it reaches `useQueries`:
* ```tsx
* import { queryOptions, useQueries } from '@tanstack/react-query'
*
* const postOptions = (id: number) =>
*   queryOptions({
*     queryKey: ['post', id],
*     queryFn: () => fetchPost(id),
*   })
*
* function PostTitle({ id }: { id: number }) {
*   const [{ data: broken }] = useQueries({
*     queries: [
*       {
*         ...postOptions(id),
*         // ❌ `data` is `unknown` here
*         select: (data) => data.title,
*       },
*     ],
*   })
*
*   const [{ data: fixed }] = useQueries({
*     queries: [
*       queryOptions({
*         ...postOptions(id),
*         // ✅ `data` is `Post`
*         select: (data) => data.title,
*       }),
*     ],
*   })
*
*   return <h1>{fixed}</h1>
* }
* ```
*/
function useQueries({ queries, ...options }, queryClient) {
	const client = useQueryClient(queryClient);
	const isRestoring = useIsRestoring();
	const errorResetBoundary = useQueryErrorResetBoundary();
	const subscribed = options.subscribed !== false;
	const defaultedQueries = import_react.useMemo(() => queries.map((opts) => {
		const defaultedOptions = client.defaultQueryOptions(opts);
		defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : subscribed ? "optimistic" : void 0;
		return defaultedOptions;
	}), [
		queries,
		client,
		isRestoring,
		subscribed
	]);
	defaultedQueries.forEach((queryOptions) => {
		ensureSuspenseTimers(queryOptions);
		const query = client.getQueryCache().get(queryOptions.queryHash);
		ensurePreventErrorBoundaryRetry(queryOptions, errorResetBoundary, query);
	});
	useClearResetErrorBoundary(errorResetBoundary);
	const [observer] = import_react.useState(() => new QueriesObserver(client, defaultedQueries, options));
	const [optimisticResult, getCombinedResult, trackResult] = observer.getOptimisticResult(defaultedQueries, options.combine);
	const shouldSubscribe = !isRestoring && subscribed;
	import_react.useSyncExternalStore(import_react.useCallback((onStoreChange) => shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop, [observer, shouldSubscribe]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
	import_react.useEffect(() => {
		observer.setQueries(defaultedQueries, options);
	}, [
		defaultedQueries,
		options,
		observer
	]);
	const suspensePromises = optimisticResult.some((result, index) => shouldSuspend(defaultedQueries[index], result)) ? optimisticResult.flatMap((result, index) => {
		const opts = defaultedQueries[index];
		if (opts && shouldSuspend(opts, result)) {
			const queryObserver = new QueryObserver(client, opts);
			return fetchOptimistic(opts, queryObserver, errorResetBoundary);
		}
		return [];
	}) : [];
	if (suspensePromises.length > 0) throw Promise.all(suspensePromises);
	const firstSingleResultWhichShouldThrow = optimisticResult.find((result, index) => {
		const query = defaultedQueries[index];
		return query && getHasError({
			result,
			errorResetBoundary,
			throwOnError: query.throwOnError,
			query: client.getQueryCache().get(query.queryHash),
			suspense: query.suspense
		});
	});
	if (firstSingleResultWhichShouldThrow) throw firstSingleResultWhichShouldThrow.error;
	return getCombinedResult(trackResult());
}
//#endregion
//#region src/pages/commerce/StudioCommerce.tsx
var import_jsx_runtime = require_jsx_runtime();
var num = (v) => v.trim() === "" ? null : Number(v);
var lines = (v) => v.split(/[\n,;]/).map((s) => s.trim()).filter(Boolean);
/** `datetime-local` value (local time) to ISO UTC, or null. */
var toIso = (v) => v ? new Date(v).toISOString() : null;
/** Every package of every course the instructor manages. */
function useMyPackages() {
	const courses = useStudioCourses();
	const list = courses.data ?? [];
	const pkgQueries = useQueries({ queries: list.map((c) => ({
		queryKey: [
			"studio",
			"packages",
			c.id
		],
		queryFn: () => api(`/api/studio/courses/${c.id}/packages`)
	})) });
	return {
		courses,
		list,
		packages: pkgQueries.flatMap((q, i) => (q.data ?? []).map((p) => ({
			...p,
			courseTitle: list[i]?.title ?? ""
		}))),
		pending: courses.isPending || pkgQueries.some((q) => q.isPending)
	};
}
function CouponsTab() {
	const { t, fmtMoney, fmtDate } = useI18n();
	const toast = useToast();
	const mine = useMyPackages();
	const coupons = useQuery({
		queryKey: ["studio", "coupons"],
		queryFn: () => api("/api/studio/coupons")
	});
	const [form, setForm] = (0, import_react.useState)({
		code: "",
		kind: "Percent",
		percentOff: "10",
		amountOff: "",
		currency: "",
		scope: "Course",
		scopeId: "",
		maxRedemptions: "",
		maxPerUser: "1",
		startsAt: "",
		expiresAt: "",
		minAmount: "",
		emails: "",
		domains: "",
		org: ""
	});
	const set = (k) => (v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const create = useApiMutation((body) => api("/api/studio/coupons", {
		method: "POST",
		body
	}), [["studio", "coupons"]], (c) => {
		toast.success(c.status === "PendingApproval" ? t("commerce.coupons.createdPending", { code: c.code }) : t("commerce.coupons.created", { code: c.code }));
		setForm((f) => ({
			...f,
			code: ""
		}));
	});
	const disable = useApiMutation((id) => api(`/api/studio/coupons/${id}/disable`, { method: "POST" }), [["studio", "coupons"]]);
	const submit = (e) => {
		e.preventDefault();
		create.mutate({
			code: form.code.trim(),
			kind: form.kind,
			scope: form.scope,
			scopeId: form.scopeId || null,
			percentOff: form.kind === "Percent" ? num(form.percentOff) : null,
			amountOff: form.kind === "Fixed" ? num(form.amountOff) : null,
			currency: form.currency.trim().toUpperCase() || null,
			maxRedemptions: num(form.maxRedemptions),
			maxPerUser: num(form.maxPerUser),
			startsAt: toIso(form.startsAt),
			expiresAt: toIso(form.expiresAt),
			minAmount: num(form.minAmount),
			...form.kind === "Scholarship" ? {
				allowedEmails: lines(form.emails),
				allowedDomains: lines(form.domains),
				allowedOrganizationId: form.org.trim() || null
			} : {}
		});
	};
	const targets = form.scope === "Course" ? mine.list.map((c) => ({
		value: c.id,
		label: c.title
	})) : mine.packages.filter((p) => p.approvalStatus === "Approved").map((p) => ({
		value: p.id,
		label: `${p.title} · ${p.courseTitle} (${fmtMoney(p.price, p.currency)})`
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				title: t("commerce.coupons.policyTitle"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "small",
					style: { margin: 0 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("commerce.coupons.policyCap") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("commerce.coupons.policyScope") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("commerce.coupons.policyScholarship") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("commerce.coupons.policyNoStack") })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "card",
				onSubmit: submit,
				"aria-labelledby": "coupon-new",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "coupon-new",
						children: t("commerce.coupons.new")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.code"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.code,
									onChange: (e) => set("code")(e.target.value),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.kind"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: form.kind,
									onChange: (e) => set("kind")(e.target.value),
									options: [
										{
											value: "Percent",
											label: t("commerce.coupons.kindPercent")
										},
										{
											value: "Fixed",
											label: t("commerce.coupons.kindFixed")
										},
										{
											value: "Scholarship",
											label: t("commerce.coupons.kindScholarship")
										}
									]
								})
							}),
							form.kind === "Percent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.percentOff"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "0.01",
									max: "99.99",
									step: "0.01",
									value: form.percentOff,
									onChange: (e) => set("percentOff")(e.target.value),
									required: true
								})
							}) : null,
							form.kind === "Fixed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.amountOff"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "0",
									step: "0.01",
									value: form.amountOff,
									onChange: (e) => set("amountOff")(e.target.value),
									required: true
								})
							}) : null,
							form.kind === "Fixed" || form.minAmount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.currency"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.currency,
									maxLength: 3,
									onChange: (e) => set("currency")(e.target.value.toUpperCase()),
									required: true
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.scope"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: form.scope,
									onChange: (e) => setForm((f) => ({
										...f,
										scope: e.target.value,
										scopeId: ""
									})),
									options: [{
										value: "Course",
										label: t("commerce.coupons.scopeCourse")
									}, {
										value: "Package",
										label: t("commerce.coupons.scopePackage")
									}]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.target"),
								required: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: form.scopeId,
									onChange: (e) => set("scopeId")(e.target.value),
									placeholder: mine.pending ? t("common.loading") : t("commerce.common.choose"),
									options: targets,
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.maxRedemptions"),
								hint: t("commerce.common.optional"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "1",
									value: form.maxRedemptions,
									onChange: (e) => set("maxRedemptions")(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.maxPerUser"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "1",
									max: "100",
									value: form.maxPerUser,
									onChange: (e) => set("maxPerUser")(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.startsAt"),
								hint: t("commerce.common.optional"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "datetime-local",
									value: form.startsAt,
									onChange: (e) => set("startsAt")(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.expiresAt"),
								hint: t("commerce.common.optional"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "datetime-local",
									value: form.expiresAt,
									onChange: (e) => set("expiresAt")(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.minAmount"),
								hint: t("commerce.common.optional"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "0",
									step: "0.01",
									value: form.minAmount,
									onChange: (e) => set("minAmount")(e.target.value)
								})
							})
						]
					}),
					form.kind === "Scholarship" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.allowedEmails"),
								hint: t("commerce.coupons.listHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.emails,
									onChange: (e) => set("emails")(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.coupons.allowedDomains"),
								hint: t("commerce.coupons.listHint"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.domains,
									onChange: (e) => set("domains")(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("commerce.staff.orgId"),
								hint: t("commerce.common.optional"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.org,
									className: "mono",
									onChange: (e) => set("org")(e.target.value)
								})
							})
						]
					}) : null,
					create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: commerceError(create.error, t)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "form-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							loading: create.isPending,
							children: t("commerce.coupons.create")
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "coupon-list",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "coupon-list",
						children: t("commerce.coupons.mine")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
						query: coupons,
						children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "muted",
							children: t("commerce.coupons.none")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponTable, {
							list,
							actions: (c) => c.status === "Active" || c.status === "PendingApproval" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								loading: disable.isPending && disable.variables === c.id,
								onClick: () => disable.mutate(c.id),
								children: t("commerce.coupons.disable")
							}) : null,
							fmtDate
						})
					}),
					disable.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "danger",
						children: commerceError(disable.error, t)
					}) : null
				]
			})
		]
	});
}
function CouponTable({ list, actions, fmtDate }) {
	const { t, fmtMoney } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "table-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.coupons.code")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.coupons.discount")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.coupons.scope")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.coupons.used")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.coupons.expiresAt")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("dashboard.status")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("common.actions")
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "mono",
					children: c.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.kind === "Percent" ? `${c.percentOff}%` : c.kind === "Fixed" && c.amountOff != null ? fmtMoney(c.amountOff, c.currency ?? "USD") : t("commerce.coupons.kindScholarship") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.scope }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [c.redemptions, c.maxRedemptions ? ` / ${c.maxRedemptions}` : ""] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.expiresAt ? fmtDate(c.expiresAt) : "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: c.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: actions(c) })
			] }, c.id)) })]
		})
	});
}
function PackagePrices({ pkg }) {
	const { t, fmtMoney, fmtDate } = useI18n();
	const toast = useToast();
	const key = [
		"studio",
		"prices",
		pkg.id
	];
	const prices = useQuery({
		queryKey: key,
		queryFn: () => api(`/api/studio/packages/${pkg.id}/prices`)
	});
	const [currency, setCurrency] = (0, import_react.useState)("");
	const [countries, setCountries] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const propose = useApiMutation(() => api(`/api/studio/packages/${pkg.id}/prices`, {
		method: "POST",
		body: {
			currency: currency.trim().toUpperCase(),
			countries: lines(countries).map((c) => c.toUpperCase()),
			amount: Number(amount)
		}
	}), [key], () => {
		toast.success(t("commerce.prices.proposed"));
		setAmount("");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card card--flat",
		"aria-label": pkg.title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", { children: [
				pkg.title,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "small muted",
					children: ["· ", pkg.courseTitle]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small",
				children: t("commerce.prices.base", { price: fmtMoney(pkg.price, pkg.currency) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: prices,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("commerce.prices.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "small",
					children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						fmtMoney(p.amount, p.currency),
						" ·",
						" ",
						p.countries.length ? p.countries.join(", ") : t("commerce.prices.allCountries"),
						" ",
						"· ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: p.status }),
						" · ",
						fmtDate(p.createdAt)
					] }, p.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid",
				onSubmit: (e) => {
					e.preventDefault();
					propose.mutate(void 0);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.prices.currency"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: currency,
							maxLength: 3,
							onChange: (e) => setCurrency(e.target.value.toUpperCase()),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.prices.countries"),
						hint: t("commerce.prices.countriesHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: countries,
							onChange: (e) => setCountries(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.prices.amount"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "0",
							step: "0.01",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "form-actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "secondary",
							loading: propose.isPending,
							children: t("commerce.prices.propose")
						})
					})
				]
			}),
			propose.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(propose.error, t)
			}) : null
		]
	});
}
function PricesTab() {
	const { t } = useI18n();
	const mine = useMyPackages();
	const approved = mine.packages.filter((p) => p.approvalStatus === "Approved");
	if (mine.pending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
		label: t("common.loading"),
		block: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "info",
			children: t("commerce.prices.explain")
		}), approved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "muted",
			children: t("commerce.prices.noPackages")
		}) : approved.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackagePrices, { pkg: p }, p.id))]
	});
}
function OffersTab() {
	const { t, fmtDate } = useI18n();
	const toast = useToast();
	const mine = useMyPackages();
	const promos = useQuery({
		queryKey: ["studio", "promotions"],
		queryFn: () => api("/api/studio/promotions")
	});
	const toggle = useApiMutation((p) => api(`/api/studio/promotions/${p.promo}/${p.join ? "opt-in" : "opt-out"}`, {
		method: "POST",
		body: { packageId: p.pkg }
	}), [["studio", "promotions"]], (_r, v) => toast.success(v.join ? t("commerce.offers.joined") : t("commerce.offers.left")));
	const approved = mine.packages.filter((p) => p.approvalStatus === "Approved");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "info",
				children: t("commerce.offers.explain")
			}),
			toggle.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(toggle.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: promos,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("commerce.offers.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((pr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "card card--flat",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row row--between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									pr.name,
									" · ",
									t("commerce.offers.percent", { n: pr.percentOff })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: pr.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: t("commerce.offers.window", {
									from: fmtDate(pr.startsAt),
									to: fmtDate(pr.endsAt)
								})
							}),
							pr.status === "Scheduled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "small",
								style: {
									listStyle: "none",
									padding: 0
								},
								children: approved.map((p) => {
									const joined = pr.packageIds.includes(p.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "row row--between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											p.title,
											" · ",
											p.courseTitle
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: joined ? "secondary" : "primary",
											loading: toggle.isPending && toggle.variables?.promo === pr.id && toggle.variables.pkg === p.id,
											onClick: () => toggle.mutate({
												promo: pr.id,
												pkg: p.id,
												join: !joined
											}),
											children: joined ? t("commerce.offers.optOut") : t("commerce.offers.optIn")
										})]
									}, p.id);
								})
							}) : null
						]
					}, pr.id))
				})
			})
		]
	});
}
function CourseReferrals({ course }) {
	const { t } = useI18n();
	const toast = useToast();
	const key = [
		"studio",
		"referrals",
		course.id
	];
	const codes = useQuery({
		queryKey: key,
		queryFn: () => api(`/api/studio/courses/${course.id}/referral-codes`)
	});
	const [code, setCode] = (0, import_react.useState)("");
	const create = useApiMutation(() => api(`/api/studio/courses/${course.id}/referral-codes`, {
		method: "POST",
		body: code.trim() ? { code: code.trim() } : {}
	}), [key], () => setCode(""));
	const origin = typeof window === "undefined" ? "" : window.location.origin;
	const copy = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success(t("commerce.referrals.copied"));
		} catch {
			toast.error(t("commerce.referrals.copyFailed"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card card--flat",
		"aria-label": course.title,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: course.title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: codes,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small muted",
					children: t("commerce.referrals.none")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "stack",
					style: {
						listStyle: "none",
						padding: 0
					},
					children: list.map((r) => {
						const link = referralLink(origin, course.slug, r.code);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									readOnly: true,
									value: link,
									"aria-label": t("commerce.referrals.linkFor", { code: r.code }),
									style: {
										flex: 1,
										minInlineSize: 200
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: () => void copy(link),
									children: t("commerce.referrals.copy")
								}),
								!r.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: "Inactive" }) : null
							]
						}, r.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "row",
				onSubmit: (e) => {
					e.preventDefault();
					create.mutate(void 0);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("commerce.referrals.code"),
					hint: t("commerce.referrals.codeHint"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: code,
						onChange: (e) => setCode(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "secondary",
					loading: create.isPending,
					children: t("commerce.referrals.create")
				})]
			}),
			create.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(create.error, t)
			}) : null
		]
	});
}
function ReferralsTab() {
	const { t } = useI18n();
	const courses = useStudioCourses();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "info",
			children: t("commerce.referrals.explain")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: courses,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("commerce.referrals.noCourses")
			}) : list.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseReferrals, { course: c }, c.id))
		})]
	});
}
function StudioCommercePage() {
	const { t } = useI18n();
	const [tab, setTab] = (0, import_react.useState)("coupons");
	usePageMeta(t("commerce.studio.title"), void 0, { noindex: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("commerce.studio.title"),
				subtitle: t("commerce.studio.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommercePolicyPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				label: t("commerce.studio.title"),
				value: tab,
				onChange: setTab,
				tabs: [
					{
						id: "coupons",
						label: t("commerce.coupons.title"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouponsTab, {})
					},
					{
						id: "prices",
						label: t("commerce.prices.title"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricesTab, {})
					},
					{
						id: "offers",
						label: t("commerce.offers.title"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OffersTab, {})
					},
					{
						id: "referrals",
						label: t("commerce.referrals.title"),
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferralsTab, {})
					}
				]
			})
		]
	});
}
function PayoutProfileForm({ profile }) {
	const { t } = useI18n();
	const toast = useToast();
	const [form, setForm] = (0, import_react.useState)({
		legalName: profile?.legalName ?? "",
		country: profile?.country ?? "",
		method: profile?.method ?? "Iban",
		destination: "",
		taxFormSubmitted: false
	});
	const save = useApiMutation((body) => api("/api/studio/payout-profile", {
		method: "PUT",
		body
	}), [["studio", "payout-profile"]], () => {
		toast.success(t("commerce.payouts.profileSaved"));
		setForm((f) => ({
			...f,
			destination: ""
		}));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "card",
		"aria-labelledby": "pp-h",
		onSubmit: (e) => {
			e.preventDefault();
			save.mutate({
				...form,
				legalName: form.legalName.trim(),
				country: form.country.trim().toUpperCase(),
				destination: form.destination.replace(/\s+/g, form.method === "Iban" ? "" : " ").trim()
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				id: "pp-h",
				children: t("commerce.payouts.profile")
			}),
			profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "facts",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("commerce.payouts.destination") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mono",
					"data-testid": "masked-destination",
					children: profile.destinationMasked
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("commerce.payouts.taxForm") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: profile.taxFormStatus }) })] })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("commerce.payouts.noProfile")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("commerce.payouts.maskedNote")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.payouts.legalName"),
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.legalName,
							autoComplete: "name",
							onChange: (e) => setForm({
								...form,
								legalName: e.target.value
							}),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.payouts.country"),
						required: true,
						hint: t("commerce.checkout.countryHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.country,
							maxLength: 2,
							onChange: (e) => setForm({
								...form,
								country: e.target.value.toUpperCase()
							}),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("commerce.payouts.method"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: form.method,
							onChange: (e) => setForm({
								...form,
								method: e.target.value
							}),
							options: [{
								value: "Iban",
								label: t("commerce.payouts.iban")
							}, {
								value: "Email",
								label: t("commerce.payouts.email")
							}]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: form.method === "Iban" ? t("commerce.payouts.iban") : t("commerce.payouts.email"),
						required: true,
						hint: t("commerce.payouts.destinationHint"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.destination,
							autoComplete: "off",
							type: form.method === "Email" ? "email" : "text",
							onChange: (e) => setForm({
								...form,
								destination: e.target.value
							}),
							required: true
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				label: t("commerce.payouts.taxSubmitted"),
				checked: !!form.taxFormSubmitted,
				onChange: (e) => setForm({
					...form,
					taxFormSubmitted: e.target.checked
				})
			}),
			save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(save.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "form-actions",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					loading: save.isPending,
					children: t("commerce.payouts.saveProfile")
				})
			})
		]
	});
}
function BalancesAndRequests() {
	const { t, fmtMoney, fmtDate } = useI18n();
	const toast = useToast();
	const balances = useQuery({
		queryKey: ["studio", "balances"],
		queryFn: () => api("/api/studio/balances")
	});
	const requests = useQuery({
		queryKey: ["studio", "payout-requests"],
		queryFn: () => api("/api/studio/payout-requests")
	});
	const request = useApiMutation((currency) => api("/api/studio/payout-requests", {
		method: "POST",
		body: { currency }
	}), [["studio", "balances"], ["studio", "payout-requests"]], (r) => toast.success(t("commerce.payouts.requested", { amount: fmtMoney(r.amount, r.currency) })));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		"aria-labelledby": "bal-h",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				id: "bal-h",
				children: t("commerce.payouts.balances")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "small muted",
				children: t("commerce.payouts.balancesExplain")
			}),
			request.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: commerceError(request.error, t)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: balances,
				children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "muted",
					children: t("commerce.payouts.noBalance")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.prices.currency")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.payouts.cleared")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.payouts.pending")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("commerce.payouts.minimum")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								scope: "col",
								children: t("common.actions")
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: b.currency }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(b.cleared, b.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(b.pending, b.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(b.minimumPayout, b.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								disabled: b.cleared < b.minimumPayout,
								loading: request.isPending && request.variables === b.currency,
								onClick: () => request.mutate(b.currency),
								children: t("commerce.payouts.request")
							}) })
						] }, b.currency)) })]
					})
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		"aria-labelledby": "req-h",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			id: "req-h",
			children: t("commerce.payouts.requests")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
			query: requests,
			children: (list) => list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "muted",
				children: t("commerce.payouts.noRequests")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayoutRequestTable, {
				list,
				fmtDate
			})
		})]
	})] });
}
function PayoutRequestTable({ list, fmtDate, select, actions }) {
	const { t, fmtMoney } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "table-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				select ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.common.select")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("dashboard.date")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.payouts.amount")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("commerce.payouts.entries")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("dashboard.status")
				}),
				actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: t("common.actions")
				}) : null
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				select ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					"aria-label": t("commerce.payouts.selectRequest", { amount: fmtMoney(r.amount, r.currency) }),
					checked: select.selected.has(r.id),
					disabled: r.status !== "Requested",
					onChange: () => select.toggle(r.id)
				}) }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtDate(r.createdAt) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtMoney(r.amount, r.currency) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.entries }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CStatus, { status: r.status }), r.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "small muted",
					children: r.notes
				}) : null] }),
				actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: actions(r) }) : null
			] }, r.id)) })]
		})
	});
}
function StatementDownload({ path }) {
	const { t } = useI18n();
	const now = /* @__PURE__ */ new Date();
	const prev = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
	const [year, setYear] = (0, import_react.useState)(String(prev.getUTCFullYear()));
	const [month, setMonth] = (0, import_react.useState)(String(prev.getUTCMonth() + 1));
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const get = async (format) => {
		setBusy(format);
		setError(null);
		try {
			await downloadFile(`${path}${qs({
				year,
				month,
				format
			})}`, `statement-${year}-${month.padStart(2, "0")}.${format}`);
		} catch (e) {
			setError(commerceError(e, t));
		} finally {
			setBusy(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("commerce.payouts.year"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: "2020",
						max: "2100",
						value: year,
						onChange: (e) => setYear(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("commerce.payouts.month"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: month,
						onChange: (e) => setMonth(e.target.value),
						options: Array.from({ length: 12 }, (_, i) => ({
							value: String(i + 1),
							label: String(i + 1)
						}))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					loading: busy === "csv",
					onClick: () => void get("csv"),
					children: t("commerce.payouts.downloadCsv")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					loading: busy === "pdf",
					onClick: () => void get("pdf"),
					children: t("commerce.payouts.downloadPdf")
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: error
			}) : null
		]
	});
}
function StudioPayoutsPage() {
	const { t } = useI18n();
	usePageMeta(t("commerce.payouts.title"), void 0, { noindex: true });
	const profile = useQuery({
		queryKey: ["studio", "payout-profile"],
		queryFn: async () => await api("/api/studio/payout-profile") ?? null
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("commerce.payouts.title"),
				subtitle: t("commerce.payouts.subtitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryState, {
				query: profile,
				children: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayoutProfileForm, { profile: p }, p?.updatedAt ?? "none")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BalancesAndRequests, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				"aria-labelledby": "st-h",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "st-h",
					children: t("commerce.payouts.statements")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatementDownload, { path: "/api/studio/statements" })]
			})
		]
	});
}
//#endregion
export { StudioPayoutsPage as a, StudioCommercePage as i, PayoutRequestTable as n, toIso as o, StatementDownload as r, CouponTable as t };

//# sourceMappingURL=StudioCommerce-C4tMONrc.js.map