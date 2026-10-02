import { i as api, r as ApiError } from "./Button-6CizQUWS.js";
//#region src/api/account.ts
/**
* Wave 3 account surface: login challenges and MFA, email verification, password recovery, sessions,
* profile, learning goals, skill profile and data rights. Field names mirror the C# records in
* src/Mastemy.Api/Modules/Identity/IdentityDtos.cs and Modules/Account/AccountServices.cs (camelCase JSON).
*/
var accountKeys = {
	mfaStatus: ["account", "mfa"],
	sessions: ["account", "sessions"],
	profile: ["account", "profile"],
	goals: ["account", "goals"],
	skills: ["account", "skills"],
	instructor: (id) => [
		"account",
		"instructor",
		id
	]
};
/** Calls an endpoint with an explicit bearer token (the restricted MFA-enrollment token). */
function withToken(token) {
	return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}
var accountApi = {
	mfaStatus: (token) => api("/api/auth/mfa/status", {
		...withToken(token),
		noRetry: !!token
	}),
	enroll: (token) => api("/api/auth/mfa/enroll", {
		method: "POST",
		...withToken(token),
		noRetry: !!token
	}),
	confirmEnroll: (code, token) => api("/api/auth/mfa/enroll/confirm", {
		method: "POST",
		body: { code },
		...withToken(token),
		noRetry: !!token
	}),
	verifyMfa: (mfaToken, input) => api("/api/auth/mfa/verify", {
		method: "POST",
		body: {
			mfaToken,
			...input
		},
		noRetry: true
	}),
	regenerateCodes: (code) => api("/api/auth/mfa/recovery-codes", {
		method: "POST",
		body: { code }
	}),
	disableMfa: (password, code) => api("/api/auth/mfa/disable", {
		method: "POST",
		body: {
			password,
			code
		}
	}),
	verifyEmail: (token) => api("/api/auth/email/verify", {
		method: "POST",
		body: { token },
		noRetry: true
	}),
	resendEmail: (token) => api("/api/auth/email/resend", {
		method: "POST",
		...withToken(token)
	}),
	forgot: (email) => api("/api/auth/password/forgot", {
		method: "POST",
		body: { email },
		noRetry: true
	}),
	reset: (token, newPassword) => api("/api/auth/password/reset", {
		method: "POST",
		body: {
			token,
			newPassword
		},
		noRetry: true
	}),
	changePassword: (currentPassword, newPassword) => api("/api/auth/password/change", {
		method: "POST",
		body: {
			currentPassword,
			newPassword
		}
	}),
	sessions: () => api("/api/auth/sessions"),
	revokeSession: (id) => api(`/api/auth/sessions/${id}`, { method: "DELETE" }),
	revokeAll: () => api("/api/auth/sessions", { method: "DELETE" }),
	profile: () => api("/api/me/profile"),
	updateProfile: (body) => api("/api/me/profile", {
		method: "PUT",
		body
	}),
	goals: () => api("/api/me/learning-goals"),
	putGoals: (body) => api("/api/me/learning-goals", {
		method: "PUT",
		body
	}),
	skills: () => api("/api/me/skills"),
	addSkill: (body) => api("/api/me/skills", {
		method: "POST",
		body
	}),
	deleteSkill: (id) => api(`/api/me/skills/${id}`, { method: "DELETE" }),
	deleteAccount: (body) => api("/api/me", {
		method: "DELETE",
		body
	}),
	instructorProfile: (id) => api(`/api/instructors/${id}/profile`),
	instructorDirectory: (id) => api(`/api/instructors/${id}`)
};
/** Resolves to null on 404 so two independent sources can be merged. */
async function orNull(p) {
	try {
		return await p;
	} catch (e) {
		if (e instanceof ApiError && e.status === 404) return null;
		throw e;
	}
}
/** Normalizes a typed recovery code the way the server compares it (case and dash insensitive). */
function normalizeRecoveryCode(input) {
	return input.replace(/[\s-]/g, "").toUpperCase();
}
/** Groups a base32 secret in blocks of four for manual entry. */
function groupSecret(secret) {
	return secret.replace(/\s/g, "").replace(/(.{4})(?=.)/g, "$1 ");
}
/** Fallback IANA zones for runtimes without Intl.supportedValuesOf. */
var FALLBACK_TIME_ZONES = [
	"UTC",
	"Africa/Cairo",
	"Africa/Casablanca",
	"Africa/Johannesburg",
	"Africa/Lagos",
	"America/Chicago",
	"America/Los_Angeles",
	"America/New_York",
	"America/Sao_Paulo",
	"America/Toronto",
	"Asia/Amman",
	"Asia/Baghdad",
	"Asia/Beirut",
	"Asia/Dubai",
	"Asia/Karachi",
	"Asia/Kolkata",
	"Asia/Qatar",
	"Asia/Riyadh",
	"Asia/Singapore",
	"Asia/Tokyo",
	"Australia/Sydney",
	"Europe/Berlin",
	"Europe/Istanbul",
	"Europe/London",
	"Europe/Madrid",
	"Europe/Paris"
];
function timeZones(current) {
	let zones = FALLBACK_TIME_ZONES;
	try {
		const list = Intl.supportedValuesOf?.("timeZone");
		if (list && list.length > 0) zones = list.includes("UTC") ? list : ["UTC", ...list];
	} catch {}
	return current && !zones.includes(current) ? [current, ...zones] : zones;
}
/** Skills of interest: comma/newline separated, trimmed, de-duplicated (case-insensitive), ≤ 20. */
function parseInterests(text) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const raw of text.split(/[,\n]/)) {
		const s = raw.trim();
		if (!s || seen.has(s.toLowerCase())) continue;
		seen.add(s.toLowerCase());
		out.push(s);
	}
	return out;
}
//#endregion
export { orNull as a, normalizeRecoveryCode as i, accountKeys as n, parseInterests as o, groupSecret as r, timeZones as s, accountApi as t };

//# sourceMappingURL=account-CkAe5QCo.js.map