# Identity security (wave 3): email verification, password recovery, MFA, sessions

All errors are RFC 7807 `application/problem+json`; `type` carries the machine code.

## Login flow (changed)

`POST /api/auth/login` `{email,password}` → `200 AuthResponse`:

```json
{ "accessToken": "...|null", "refreshToken": "...|null", "expiresAt": "...|null",
  "user": { "id", "email", "displayName", "preferredLanguage", "roles": [], "emailVerified": false, "mfaEnabled": false },
  "status": "ok | mfa_required | mfa_enrollment_required", "mfaToken": "...|null" }
```

| status | meaning |
|---|---|
| `ok` | Full token pair (`amr=pwd`, or `amr=mfa` after MFA). |
| `mfa_required` | User has MFA enabled. No tokens. Post `mfaToken` + code to `/api/auth/mfa/verify` within 5 minutes. |
| `mfa_enrollment_required` | User holds Admin, SuperAdmin, Finance, Reviewer or Moderator and has no MFA. `accessToken` is a 10-minute **restricted** token without roles and no refresh token. It is accepted only by `GET /api/auth/me`, `GET /api/auth/mfa/status`, `POST /api/auth/mfa/enroll`, `POST /api/auth/mfa/enroll/confirm` and `POST /api/auth/email/resend`; everything else returns `403 mfa_enrollment_required`. |

Access tokens now carry `amr` (`pwd`/`mfa`) and `sid` (session id = refresh-token family). Refresh keeps the session's `amr`.

**Enforcement.** With `Security:RequireMfaForPrivileged=true` (the default), a request from a user with a privileged role whose token lacks `amr=mfa` gets `403 mfa_required`. Exceptions are the `/api/auth/*` sign-in endpoints and the MFA endpoints listed above. The check is a global MVC filter (`MfaEnforcementFilter`).

## MFA (TOTP, RFC 6238: HMAC-SHA1, 6 digits, 30 s, ±1 step)

| Method | Path | Auth | Body → Response |
|---|---|---|---|
| GET | `/api/auth/mfa/status` | any (incl. restricted) | → `{enabled, enabledAt, remainingRecoveryCodes, required}` |
| POST | `/api/auth/mfa/enroll` | any (incl. restricted) | → `{secret, otpAuthUri, digits, periodSeconds, algorithm}`. `409 mfa_already_enabled` |
| POST | `/api/auth/mfa/enroll/confirm` | any (incl. restricted) | `{code}` → `{recoveryCodes[10], session: AuthResponse(amr=mfa)}`. Ends all earlier sessions. `400 invalid_mfa_code`, `400 mfa_enrollment_not_started` (none in progress, or older than 15 min) |
| POST | `/api/auth/mfa/verify` | anonymous | `{mfaToken, code}` or `{mfaToken, recoveryCode}` → `AuthResponse(amr=mfa)`. `401 invalid_mfa_code`, `401 invalid_mfa_challenge` (unknown, used, expired, or 5 failed codes) |
| POST | `/api/auth/mfa/recovery-codes` | full token | `{code}` → `{recoveryCodes[10]}` (replaces all old codes) |
| POST | `/api/auth/mfa/disable` | full token | `{password, code}` → 204. `409 mfa_required_for_role` for privileged users |

- Secrets are encrypted at rest with `SecretProtector`.
- Replay protection: the highest accepted time step is stored per user. A code for that step or an earlier one is rejected.
- Recovery codes have the form `XXXXX-XXXXX`, are stored as SHA-256 hashes and work once each. Input is case- and dash-insensitive. Use is audited (`user.mfa_recovery_code_used`).

## Email verification

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/api/auth/email/verify` | anonymous | `{token}` → 204; `400 invalid_token` (unknown, used, expired after 48 h, or the address has changed since the link was sent) |
| POST | `/api/auth/email/resend` | any | 202; `409 email_already_verified`; `429` within 60 s; `503 email_not_configured` |
| POST | `/api/admin/users/{id}/email-verification/resend` | Staff | 202 (audited); `503 email_not_configured` |
| POST | `/api/admin/users/{id}/email-verification/mark-verified` | Staff | → `AdminUserDto` (audited `user.email_marked_verified`) |
| GET | `/api/admin/users/{id}` | Staff | → `AdminUserDto` incl. `emailVerified`, `mfaEnabled` (also present in the `GET /api/admin/users` list) |

Registration queues a verification email when SMTP is configured. It never fails when SMTP is not configured: the account stays unverified and staff can mark it verified. Granting a privileged role (`PUT /api/admin/users/{id}/roles`) to a user with an unverified email returns `409 email_not_verified`. Links use `Email:PublicBaseUrl` plus `/verify-email?token=` or `/reset-password?token=`.

## Password

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/api/auth/password/forgot` | anonymous | `{email}` → `202 {message}`, identical for unknown and known addresses; `503 email_not_configured` (for every address) when SMTP is off |
| POST | `/api/auth/password/reset` | anonymous | `{token,newPassword}` → 204. Token is single use, hashed and valid for 1 hour; only the newest link works. Revokes all refresh tokens and marks the email verified. `400 invalid_token`, `400 weak_password` |
| POST | `/api/auth/password/change` | full token | `{currentPassword,newPassword}` → 204, revokes all refresh tokens. `400 invalid_current_password`, `400 password_unchanged` |

## Sessions

| Method | Path | Notes |
|---|---|---|
| GET | `/api/auth/sessions` | → `[{id, createdAt, lastUsedAt, expiresAt, userAgent, ipAddress, lastIpAddress, mfaAuthenticated, current}]`. Lists active refresh-token families |
| DELETE | `/api/auth/sessions/{id}` | 204; `404` for a session that is not yours or is already ended. Audited |
| DELETE | `/api/auth/sessions` | Revokes every session, including the current one. 204. Audited |

Revocation stops refresh. An access token that was already issued stays valid until it expires (at most `Jwt:AccessTokenMinutes`).

## Config

- `Security:RequireMfaForPrivileged` (bool, default `true`).
- Uses the existing `Email:*` settings (SMTP and `PublicBaseUrl`) and `Jwt:*`.


## Re-authentication signals (final wave)
- `GET /api/auth/me` adds `requiresReauth`: true when the caller's token roles differ from the stored roles (e.g. a role was
  granted after sign-in) or when the account holds a privileged role (Admin, SuperAdmin, Finance, Reviewer, Moderator) and
  the token lacks `amr=mfa`. The UI should prompt the user to sign in again. (Tokens carrying a *removed* role are already
  rejected by the token validator.)
- `PUT /api/admin/users/{id}/roles` responses add `signInAgainRequired` and `notice` when the roles actually changed, and the
  user receives an in-app notification of kind `account_security` ("Your account roles changed. Please sign in again…",
  link `/login?reason=roles_changed`), subject to their notification preferences.

## User lookup (final wave)
`GET /api/admin/users/lookup?q=&limit=10` (Staff) — minimal picker for trust/suspension UIs. `q` (2–200 chars) matches a
display-name substring, an email prefix, an exact email or an exact user id. Returns
`[{ id, displayName, maskedEmail, isSuspended }]` (max 25); emails are masked as `j***e@e***.com`.
