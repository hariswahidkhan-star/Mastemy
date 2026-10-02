import { t as useQuery } from "./useQuery-CJ9aOC3Y.js";
import { i as api, r as ApiError } from "./Button-6CizQUWS.js";
//#region src/api/commerce.ts
/**
* Commerce (wave 3) API surface: prices, quotes, bundles, plans, subscriptions, gifts, invoices, studio pricing
* tools, payouts and the finance console. Field names mirror the C# DTO records in
* src/Mastemy.Api/Modules/Commerce/*.cs (camelCase JSON). The client never sends amounts to pay; every price
* shown comes from the server.
*/
var commerceKeys = {
	plans: ["commerce", "plans"],
	bundles: ["commerce", "bundles"],
	orders: ["me", "orders"],
	invoices: [
		"commerce",
		"me",
		"invoices"
	],
	subscriptions: [
		"commerce",
		"me",
		"subscriptions"
	],
	price: (id, currency, country) => [
		"commerce",
		"price",
		id,
		currency,
		country
	]
};
function usePlans() {
	return useQuery({
		queryKey: commerceKeys.plans,
		queryFn: () => api("/api/plans")
	});
}
function useBundles() {
	return useQuery({
		queryKey: commerceKeys.bundles,
		queryFn: () => api("/api/bundles")
	});
}
function useMyOrders() {
	return useQuery({
		queryKey: commerceKeys.orders,
		queryFn: () => api("/api/me/orders")
	});
}
function useMyInvoices() {
	return useQuery({
		queryKey: commerceKeys.invoices,
		queryFn: () => api("/api/me/invoices")
	});
}
function useMySubscriptions() {
	return useQuery({
		queryKey: commerceKeys.subscriptions,
		queryFn: () => api("/api/me/subscriptions")
	});
}
/** Problem `type` of an API error, or '' (used to map server error codes to messages). */
function problemCode(e) {
	if (!(e instanceof ApiError)) return "";
	const t = e.type;
	const i = t.lastIndexOf("/");
	return i >= 0 ? t.slice(i + 1) : t;
}
//#endregion
export { useMyOrders as a, useMyInvoices as i, problemCode as n, useMySubscriptions as o, useBundles as r, usePlans as s, commerceKeys as t };

//# sourceMappingURL=commerce-DIIG05BW.js.map