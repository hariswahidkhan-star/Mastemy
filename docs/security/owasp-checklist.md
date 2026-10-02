# OWASP Top 10 (2021) checklist: Mastemy API

Scope: `src/Mastemy.Api` (ASP.NET Core, .NET 10). Web front end, nginx and browser-side headers are covered separately.
Every control below has an automated test. Tests live in `tests/Mastemy.Tests` (`Security/` unless another folder is named).

Last verified: 2026-10-02. Full `dotnet test` green. Dependency audit: none found (see A06).

---

## A01 Broken Access Control

| Control | Evidence (test) |
|---|---|
| A reflection sweep over `EndpointDataSource` checks every routed endpoint without `[AllowAnonymous]` and expects **401** anonymously. It covers all controllers, methods and route constraints, and sends multipart bodies where the endpoint requires them. | `AuthorizationSweepTests.Every_non_anonymous_endpoint_returns_401_without_credentials` |
| The anonymous surface is pinned to a reviewed allow-list (`tests/Mastemy.Tests/Security/AnonymousEndpoints.txt`). Any new anonymous endpoint fails CI until someone reviews it, and so does any stale entry. | `AuthorizationSweepTests.Anonymous_surface_matches_reviewed_allow_list` |
| Every endpoint whose policy needs a role other than Student (Staff, SuperAdmin, Finance, Reviewer, Instructor, Support, Moderator and so on) returns **403** to a Student token. | `AuthorizationSweepTests.Privileged_endpoints_reject_a_student_token_with_403` |
| A controller-level `[AllowAnonymous]` cannot silently cancel an action-level `[Authorize]`. | `AuthorizationSweepTests.No_endpoint_mixes_AllowAnonymous_with_Authorize` |
| Privileged roles require MFA (`amr=mfa`). Restricted enrollment tokens work only on the enrollment endpoints. | `Identity/SecurityTests.MfaTests.*` |
| Object-level checks happen in services (course manager / owner / entitlement), for example `scope.RequireCourseManager`. | module tests (`Resources`, `Learning`, `Analytics`, `Commerce` …) |

**Fixed in this pass.** The sweep found two endpoints that declared `[Authorize]` on the action, but a class-level `[AllowAnonymous]` cancelled it:
- `POST /api/pathways/{slug}/enroll`: moved to its own `[Authorize]` `PathwayEnrollmentController`.
- `POST /api/sso/{orgSlug}/link/start`: removed the class-level `[AllowAnonymous]` from `SsoController`. Each anonymous action now opts in on its own.

The services also call `me.RequireId()`, so neither endpoint was exploitable. Both are now enforced declaratively.

### Reviewed anonymous endpoints

| Endpoint(s) | Justification |
|---|---|
| `GET /health`, `/health/live`, `/health/ready` | Orchestrator probes. They return status only, with no versions or connection details. |
| `GET /robots.txt`, `/sitemap.xml`, `/api/seo/*` | Crawler files built from published content only. |
| `POST /api/auth/register, login, refresh, logout, mfa/verify, email/verify, password/forgot, password/reset` | Authentication flows. All of them are rate limited per IP (`auth`), and login is also limited per email. Responses are generic. |
| `GET /api/sso/{orgSlug}/start`, `GET /api/sso/callback`, `POST /api/sso/exchange` | OIDC login. A browser-binder cookie prevents login CSRF, and the flow uses state, nonce and PKCE. It is rate limited (`auth`). |
| `GET /api/youtube/oauth/callback` | The OAuth redirect target. The `state` is checked in constant time and bound to the initiating user. |
| `POST /api/webhooks/stripe` | The Stripe-Signature HMAC is verified with a 5-minute tolerance (A08). |
| Catalog and marketing reads (`/api/home`, `categories`, `skills`, `courses*`, `discussions/{id}`, `academies`, `collections`, `pathways`, `certifications`, `instructors*`, `notes-library`, `search/suggestions`, `bundles`, `plans`, `commerce/currencies`, `packages/{id}/price`) | Public storefront. They are read-only and return published content and public profiles only. |
| `GET /api/assessments/{id}` | Summary and scoring rules only. Answer keys are never included. |
| `GET /api/instructor-onboarding/status` | Public flag telling visitors whether instructor applications are open. |
| `GET /api/templates/mcq-import.csv/.xlsx` | Static import templates. |
| `GET /api/learn/courses/{slug}`, `lessons/{id}`, lesson `captions`, `resources`, `transcript`, `captions/{id}/vtt`, `resources/{id}/download` | Free previews. For each item the service checks whether it is a free preview or whether the caller is entitled, and it never hands out premium files to anonymous callers. |
| `GET /api/calendar/{token}.ics` | Capability URL with a high-entropy secret token that the owner can revoke. |
| `GET /api/certificates/verify/{code}`, `/{code}/pdf` | Public certificate verification by an unguessable code, by design. |
| `POST /api/analytics/events`, `GET/PUT /api/analytics/consent` | Telemetry that is gated by consent. It has its own per-client limiter, and `PUT` uses `public-write`. |
| `POST /api/affiliates/clicks` | Affiliate attribution. Rate limited (`public-write`). |
| `POST /api/complaints` | Legal or abuse intake (DSA-style). It accepts anonymous filers and uses `ComplaintRateLimiter` plus `public-write`. |
| `GET /openapi/{doc}.json` | Not part of the allow-list. It exists only in Development or with `OpenApi:Enabled=true` (A05). |

**Remaining risk.** The sweep covers authentication and role authorization. Object-level authorization (IDOR) depends on per-module service checks and module tests. No generic test can prove those checks for every resource.

---

## A02 Cryptographic Failures

| Control | Evidence |
|---|---|
| Passwords use PBKDF2-HMAC-SHA512 with 210,000 iterations, a 16-byte random salt, a 32-byte key and a constant-time compare. The format embeds the iteration count, so it can be upgraded later. | `Infrastructure/Infrastructure.cs PasswordHasher`; `Identity/AuthTests` |
| The JWT is HS256. Startup fails if `Jwt:Key` is shorter than 32 characters. Issuer, audience, lifetime and signature are all validated, with 30 s of clock skew. | `Program.cs`; `Identity/TokenRevocationTests` |
| Refresh tokens, one-time tokens and recovery codes are stored only as SHA-256 hashes. TOTP secrets and SSO client secrets are encrypted with DataProtection (`SecretProtector`). | `Identity/SecurityTests.MfaTests.Privileged_login_without_mfa_gets_restricted_enrollment_token` (checks encryption at rest and hashed recovery codes) |
| DataProtection keys persist to `DataProtection:KeysPath`, a mounted volume in production compose, under the application name `Mastemy`. | `Program.cs` |
| Secrets come only from configuration or the environment. `appsettings.json` has empty secret values. A CI test scans the whole repository with gitleaks-style rules for AWS, Stripe live keys and `whsec_`, Anthropic and OpenAI keys, GitHub and Google keys, Google OAuth secrets, Slack tokens, JWTs, private keys and connection-string passwords. Test fixtures, e2e and the dev-only `appsettings.Development.json` are excluded. | `SecurityStaticTests.Repository_contains_no_hardcoded_secrets_outside_test_fixtures`, `Production_appsettings_holds_no_secret_values`, `Secret_rules_detect_known_formats` |
| HSTS is sent on HTTPS (see A05). | `SecurityHardeningTests.Hsts_only_over_https_or_trusted_proxy_forwarded_https` |

**Remaining risk.** HS256 relies on one symmetric key, so rotating it signs everyone out. The DataProtection key ring is not encrypted at rest; set `ProtectKeysWith*` when a KMS is available. `appsettings.Development.json` contains throwaway dev credentials by design.

---

## A03 Injection

| Control | Evidence |
|---|---|
| EF Core LINQ is used everywhere. Raw SQL is limited to 5 reviewed call sites (`AnalyticsReports` ×3, `Health` `SELECT 1`, `NotificationService` multi-row insert). Each passes every value as a positional `{n}` parameter. The only concatenated parts are identifiers from the EF model and fixed bucket expressions. A new raw-SQL call fails CI. | `SecurityStaticTests.Raw_sql_is_limited_to_reviewed_parameterized_call_sites` |
| CSV and XLSX formula injection: `Csv.Neutralize` puts `'` before cells that start with `= + - @ \t \r`. This is used by question import/export, XLSX and enterprise reports. **Fixed:** the finance statement CSV did not handle `\t` and `\r`. | `SecurityStaticTests.Spreadsheet_formulas_are_neutralized` |
| Content-Disposition is always set by the framework (`File(..., fileName)`), which quotes the name and adds an RFC 5987 `filename*=`. CR/LF cannot reach the header. User-supplied names come from stored, sanitized upload names. | `SecurityHardeningTests.File_responses_get_a_sandboxed_csp` |
| Log forging: an inbound `X-Correlation-Id` must match `^[A-Za-z0-9._-]{1,64}$` and is replaced otherwise. `LogRedaction.Clean` strips control characters from free-text log values. | `SecurityHardeningTests.Forged_correlation_ids_are_replaced`, `Log_values_are_stripped_of_control_characters` |
| JSON is handled only by System.Text.Json. There is no HTML rendering in the API, and responses use a JSON CSP. | A05 tests |

---

## A04 Insecure Design / A05 Security Misconfiguration

| Control | Evidence |
|---|---|
| Every response carries: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Permissions-Policy` (all sensors, payment and usb denied), `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Resource-Policy: same-site`. There is no `Server` header (Kestrel `AddServerHeader=false`, also stripped in middleware). This holds for 2xx, 401 and 404 responses alike. | `SecurityHardeningTests.Every_response_carries_baseline_security_headers` |
| CSP: JSON gets `default-src 'none'; frame-ancestors 'none'; base-uri 'none'`. Files (PDF, CSV, ICS, XML, downloads) get `default-src 'none'; sandbox`. | `Every_response_carries_baseline_security_headers`, `File_responses_get_a_sandboxed_csp` |
| `Cache-Control: no-store` applies to all authenticated JSON, and to anonymous JSON unless the endpoint opts into caching. This includes login and refresh responses. | `SecurityHardeningTests.Authenticated_json_is_never_cached` |
| HSTS (`max-age=63072000; includeSubDomains; preload`) is sent only when the request is HTTPS. `X-Forwarded-Proto` counts only from `Network:TrustedProxies` (IPs or CIDRs). The default loopback trust is cleared, `/0` is refused, and `ForwardLimit=1`. `Security:HttpsRedirection` turns on `UseHttpsRedirection` when Kestrel terminates TLS itself. `Security:Hsts:Enabled` defaults to true. | `Hsts_only_over_https_or_trusted_proxy_forwarded_https`, `Trusted_proxy_config_rejects_trust_all` |
| Request size: Kestrel's default `MaxRequestBodySize` is 8 MB (`Limits:MaxRequestBodyBytes`). Upload endpoints raise it per endpoint: resources and enterprise materials via `MultipartUpload` (up to the configured max file size), question import with `[RequestSizeLimit]`, YouTube thumbnail and upload, and the Stripe webhook. | `Program.cs`, `Resources`/`Questions` tests |
| Rate limits: `auth` (per IP) covers every auth and SSO endpoint, including logout and the SSO callback (**added**). Login is also limited per email. `public-write` (per IP, `RateLimits:PublicWritePerMinute`, default 60) covers affiliate clicks, consent and complaints (**added**). Analytics ingest, complaints, AI and resource downloads have dedicated limiters. Rejections are logged as security events. | `Identity/AuthTests`, `Trust`, `Analytics` tests |
| Errors: a single exception handler returns `application/problem+json` with a generic title for 500s. Stack traces and exception messages never reach the client in Production. | `SecurityHardeningTests.Production_errors_are_problem_details_without_internals` |
| CORS: explicit origins only. A wildcard in `Cors:Origins` fails startup. There is no `AllowCredentials`, because the SPA is served from the same origin. | `Cors_allows_only_configured_origins_and_never_credentials`, `Cors_wildcard_origin_fails_startup` |
| OpenAPI is mapped only in Development or when `OpenApi:Enabled=true`. **Fixed:** it was previously unconditional. | `OpenApi_is_hidden_in_production_unless_enabled` |
| Seeding: reference categories are always seeded. SuperAdmin bootstrap runs only in Development or with an explicit `Seed:AllowSuperAdminBootstrap=true`. **Fixed:** it used to run in any environment with `MigrateOnStartup`. The seeded email is masked in logs. | `Program.cs`, `Data/Seeder.cs` |

**Host filtering.** docker-compose sets `AllowedHosts=${PUBLIC_HOST};api;localhost`; the API logs a startup warning if Production still runs with `*`. **Remaining risk.** The `sandbox` CSP on PDFs makes some browsers refuse to render the PDF inline. Downloads are unaffected, but if inline viewing of certificates matters, consider `Content-Disposition: attachment` or a relaxed CSP for that one route.

---

## A06 Vulnerable and Outdated Components

Output recorded on 2026-10-02 with nuget.org and the npm registry reachable:

```
$ dotnet list src/Mastemy.Api/Mastemy.Api.csproj package --vulnerable --include-transitive
The given project `Mastemy.Api` has no vulnerable packages given the current sources.
$ dotnet list tests/Mastemy.Tests/Mastemy.Tests.csproj package --vulnerable --include-transitive
The given project `Mastemy.Tests` has no vulnerable packages given the current sources.
$ (src/web) npm audit --omit=dev   -> found 0 vulnerabilities   (full `npm audit`: 0)
$ (e2e)     npm audit --omit=dev   -> found 0 vulnerabilities   (full `npm audit`: 0)
```

The release workflow also scans the images with Trivy and fails on CRITICAL. **Remaining risk:** these checks are point-in-time. Add `dotnet list package --vulnerable` and `npm audit --omit=dev --audit-level=high` to CI, or enable Dependabot, so this check keeps running.

---

## A07 Identification and Authentication Failures

| Control | Evidence |
|---|---|
| Password policy: at least 10 and at most 256 characters, with at least one letter and one digit. | `SecurityHardeningTests.Weak_passwords_are_rejected_on_register` |
| Generic errors: unknown email and wrong password produce byte-identical 401 bodies. A dummy hash equalizes timing. | `Login_failures_are_generic_for_unknown_user_and_wrong_password`; `Identity/AuthTests.Login_applies_exponential_backoff_after_five_failures_with_generic_error` |
| Per-account exponential backoff is capped at 15 minutes. There are per-IP and per-email limiters. | `Identity/AuthTests.Backoff_grows_exponentially_and_is_capped_at_fifteen_minutes` |
| MFA (TOTP with replay protection and hashed recovery codes) is mandatory for privileged roles. Step-up re-authentication applies to sensitive actions. | `Identity/SecurityTests.MfaTests.*`, `Identity/ReauthAndLookupTests` |
| Sessions: refresh tokens rotate, and reuse revokes the whole family (with a short benign-retry grace). Sessions can be listed and revoked, and access tokens are invalidated on revocation. | `Identity/TokenRevocationTests`, `AuthTests.Refresh_rotates_and_reuse_revokes_family` |
| The refresh cookie is `HttpOnly; Secure; SameSite=Strict; Path=/api/auth`. Cookie refresh requires the `X-Requested-With` CSRF header. | `SecurityHardeningTests.Refresh_cookie_is_httponly_secure_strict_and_path_scoped`, `Identity/CookieMfaResetSupportTests.Login_sets_strict_httponly_refresh_cookie_and_cookie_refresh_requires_csrf_header` |
| SSO uses OIDC with PKCE, state, nonce and a browser binder, and requires verified domains. | `Enterprise/SsoTests.*` |

**Remaining risk.** There is no breached-password (HIBP) check, and no CAPTCHA after repeated failures (backoff plus rate limits mitigate this).

---

## A08 Software and Data Integrity Failures

| Control | Evidence |
|---|---|
| Stripe webhooks use HMAC-SHA256 over the raw body with a constant-time compare and a 5-minute timestamp tolerance. Bad signatures, stale timestamps and wrong secrets all return 400. Processing is idempotent. | `Commerce/CommerceTests.Webhook_with_bad_signature_returns_400`, `Valid_webhook_grants_entitlement_and_splits_commission` |
| YouTube has no inbound webhook. The OAuth callback `state` is compared in constant time and bound to the user. | `YouTube` tests |
| Deserialization uses System.Text.Json only. There is no `TypeNameHandling`, `BinaryFormatter` or Newtonsoft in the API. | `SecurityStaticTests.No_unsafe_deserializers_in_api` |
| Supply chain: `release.yml` generates SPDX SBOMs (anchore/sbom-action) per image, attaches them to the release, and runs a Trivy scan that fails on CRITICAL. | `.github/workflows/release.yml` |

**Remaining risk.** The images are not signed (cosign) and there is no provenance attestation.

---

## A09 Security Logging and Monitoring Failures

| Control | Evidence |
|---|---|
| Privileged actions write `AuditLogs` rows with the actor, action, entity and details. Examples: user suspend and unsuspend, role changes, feature flags, MFA resets, refunds and payouts, SSO domain decisions. | `SecurityHardeningTests.Privileged_admin_actions_write_audit_logs` (suspend, roles, settings), plus module tests |
| Security events are logged at **Warning** under the category `Mastemy.Security` (**added**). They cover login failures (unknown user, bad password, backoff), refresh-token reuse, every 401/403/429 `AppException` (bad MFA code or challenge, CSRF header missing, forbidden and so on) and rate-limiter rejections. The request logging scope carries the correlation id. | `SecurityHardeningTests.Security_events_are_logged_at_warning_with_correlation_id_and_masked_email` |
| Redaction: emails are masked (`a***@example.com`) and passwords and tokens are never logged. The test checks every captured log line, in every category, during a failed login. **Fixed:** the seeder used to log the SuperAdmin email in clear. | same test, `Emails_are_masked` |
| Structured JSON logs (`Logging:Json`) and OpenTelemetry traces and metrics (`Otel:Endpoint`) are available. | `Operations` tests |

**Remaining risk.** Nothing alerts on these events yet. Route `Mastemy.Security` warnings to the SIEM and alert on spikes in `refresh_token_reuse` and `login_failed_*`. 401s from the authorization middleware itself (missing or expired token) are not logged as security events, because they are too noisy.

---

## A10 Server-Side Request Forgery

| Outbound target | Host source | Control |
|---|---|---|
| YouTube Data / Upload / Google OAuth | `YouTube:*BaseUrl` / `AuthorizationUrl` config (Google defaults) | Fixed, operator-controlled hosts. |
| Stripe | `Stripe:ApiBaseUrl` config (default `api.stripe.com`) | Operator-controlled. |
| Anthropic | `Ai:BaseUrl` config (default `api.anthropic.com`) | Operator-controlled. |
| ClamAV | `Scanning:ClamAvHost/Port` config only | Operator-controlled TCP. Users never supply it. |
| **OIDC issuer, discovery, JWKS and token endpoint** | **Org-admin-controlled** (`SsoConfig.Issuer`) | Must be `https` (`RequireUrl`). The discovery issuer must equal the configured issuer. Responses are capped at 512 KB with a 10 s timeout. **Added:** the `mastemy-oidc` client uses `SsrfGuard`, a `SocketsHttpHandler.ConnectCallback`. It resolves DNS at connect time, so rebinding cannot bypass it, and refuses loopback, RFC 1918, link-local (including 169.254.169.254 metadata), CGNAT, ULA, multicast, unspecified, NAT64 and IPv4-mapped forms of these. Auto-redirects are off. `Sso:AllowInsecureHttp` disables both the https and IP checks and is meant for tests and development only. |

Evidence: `SecurityStaticTests.Ssrf_guard_classifies_addresses`, `Ssrf_guard_refuses_connections_to_internal_addresses`, `Oidc_urls_must_be_https_unless_insecure_mode`, `Enterprise/SsoTests.*`.

**Remaining risk.** An outbound proxy that the guard does not see would bypass the IP check. If you set `HTTPS_PROXY` for the API, enforce egress rules at the proxy.

---

## Configuration reference (new keys)

| Key | Default | Purpose |
|---|---|---|
| `Network:TrustedProxies` | `[]` | IPs or CIDRs whose `X-Forwarded-For`/`-Proto` are trusted. In compose, set it to the nginx container network. |
| `Security:Hsts:Enabled` | `true` | Emit HSTS on HTTPS requests. |
| `Security:HttpsRedirection` | `false` | Enable `UseHttpsRedirection` when Kestrel serves TLS directly. |
| `Limits:MaxRequestBodyBytes` | `8388608` | Default body limit. Uploads override it per endpoint. |
| `RateLimits:PublicWritePerMinute` | `60` | Per-IP limit for anonymous writes. |
| `OpenApi:Enabled` | `false` | Publish `/openapi/v1.json` outside Development. |
| `Seed:AllowSuperAdminBootstrap` | `false` | Allow one-off SuperAdmin seeding outside Development. |
