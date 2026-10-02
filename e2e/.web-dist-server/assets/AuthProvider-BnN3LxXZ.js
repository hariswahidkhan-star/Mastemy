import { _ as require_react, b as __toESM, i as require_jsx_runtime } from "./I18nProvider-Cc4FX485.js";
import { n as useQueryClient } from "./QueryClientProvider-BuGUlZsk.js";
import { d as onSessionChange, i as api, l as hasSessionHint, m as setSession, p as refreshSession, u as logoutSession } from "./Button-6CizQUWS.js";
//#region src/auth/AuthProvider.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
/** Roles with at least one admin workspace section (Moderator tools are not part of this UI yet). */
var STAFF_ROLES = [
	"Reviewer",
	"Support",
	"Finance",
	"Admin",
	"SuperAdmin"
];
var AUTHOR_ROLES = [
	"Instructor",
	"Admin",
	"SuperAdmin"
];
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [initializing, setInitializing] = (0, import_react.useState)(() => hasSessionHint());
	const qc = useQueryClient();
	(0, import_react.useEffect)(() => onSessionChange((auth) => {
		setUser(auth?.user ?? null);
	}), []);
	(0, import_react.useEffect)(() => {
		if (!hasSessionHint()) return;
		let cancelled = false;
		refreshSession().then(async (ok) => {
			if (!ok || cancelled) return;
			try {
				const me = await api("/api/auth/me");
				if (!cancelled) setUser(me);
			} catch {}
		}).finally(() => {
			if (!cancelled) setInitializing(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	const login = (0, import_react.useCallback)(async (email, password) => {
		const res = await api("/api/auth/login", {
			method: "POST",
			body: {
				email,
				password
			},
			noRetry: true
		});
		if (!res.status || res.status === "ok") {
			setSession(res);
			qc.clear();
		} else setSession(null);
		return res;
	}, [qc]);
	const completeLogin = (0, import_react.useCallback)((auth) => {
		setSession(auth);
		qc.clear();
	}, [qc]);
	const refreshUser = (0, import_react.useCallback)(async () => {
		try {
			setUser(await api("/api/auth/me"));
		} catch {}
	}, []);
	const register = (0, import_react.useCallback)(async (input) => {
		const res = await api("/api/auth/register", {
			method: "POST",
			body: input,
			noRetry: true
		});
		setSession(res);
		qc.clear();
		return res.user;
	}, [qc]);
	const logout = (0, import_react.useCallback)(async () => {
		await logoutSession();
		qc.clear();
	}, [qc]);
	const value = (0, import_react.useMemo)(() => ({
		user,
		initializing,
		login,
		completeLogin,
		refreshUser,
		register,
		logout,
		hasRole: (...roles) => !!user && roles.some((r) => user.roles.includes(r))
	}), [
		user,
		initializing,
		login,
		completeLogin,
		refreshUser,
		register,
		logout
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as i, AuthProvider as n, STAFF_ROLES as r, AUTHOR_ROLES as t };

//# sourceMappingURL=AuthProvider-BnN3LxXZ.js.map