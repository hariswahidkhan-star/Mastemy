# Enterprise phase 2 (spec §20)

Module: `src/Mastemy.Api/Modules/Enterprise` (`EnterprisePhase2*.cs`, `OidcSso.cs`). Tables: `Enterprise_PathwayAssignments`,
`Enterprise_PathwayAssignmentCourses`, `Enterprise_OrgMaterials`, `Enterprise_SeatRequests`, `Enterprise_Orders`,
`Enterprise_SsoConfigs`, `Enterprise_SsoLoginStates`, `Enterprise_SsoIdentities`.

Organization isolation is the same as phase 1: callers who are not staff and not a member with the required role get **404**
for another organization's resources. "Manager" endpoints accept org Admins, Managers and staff; "Admin" endpoints accept org
Admins and staff (Managers get 403, Members 404).

## Assigned pathways

| Method | Path | Who |
|---|---|---|
| GET | `/api/orgs/{id}/pathway-assignments` | Manager |
| POST | `/api/orgs/{id}/pathway-assignments` | Manager (premium-granting: Admin) |
| DELETE | `/api/orgs/{id}/pathway-assignments/{assignmentId}` | Manager (premium-granting: Admin) |

Input `{ pathwayId, userId|null, department|null, dueAt|null, grantsPremium }`. The pathway must be **published** (Taxonomy
`Taxonomy_Pathways`, else 404). It expands into one regular org course assignment per **live** pathway course, all with the same
due date and scope; courses that already have an assignment for that scope are left untouched and reported in `skippedCourseIds`.
No live courses → `409 pathway_has_no_live_courses`; same pathway + scope twice → `409 duplicate_assignment`. Premium
entitlements are reconciled exactly as for course assignments. Deleting removes only the course assignments the pathway created.
Audited `org.pathway_assignment.created|deleted`.

`PathwayAssignmentDto { id, pathwayId, pathwayTitle, scope: User|Department|Organization, userId, department, grantsPremium, dueAt, courseIds, skippedCourseIds, createdAt }`

## Org-private materials

| Method | Path | Who |
|---|---|---|
| GET | `/api/orgs/{id}/materials` | any member of the active org, staff |
| POST | `/api/orgs/{id}/materials?title=&department=` | Admin — `multipart/form-data` with one `file` part |
| GET | `/api/orgs/{id}/materials/{materialId}/download` | members who can see it |
| DELETE | `/api/orgs/{id}/materials/{materialId}` | Admin |

Uploads reuse the course-resource pipeline: `FileTypePolicy` allow-list + magic-byte check (video/audio → 415, archives → 415),
`Resources:MaxFileBytes` per file (413), the Trust malware policy (`Scanning:Mode`; infected → 422 `malware_detected`, scanner
required but unavailable → 503) and `IResourceStorage` under an org-scoped key. Org quota `Enterprise:OrgMaterialQuotaBytes`
(default 2 GiB, 413 `quota_exceeded`). Files are **never public**: downloads require membership (others/anonymous get 404/401),
are sent as `attachment` with `Cache-Control: private, no-store`, `X-Content-Type-Options: nosniff` and a sandbox CSP. A material
may be limited to a department: Members see org-wide material plus their department's; Managers/Admins/staff see all.
Audited `org.material.uploaded|deleted`.

## Seat purchasing and enterprise invoices

| Method | Path | Who |
|---|---|---|
| POST | `/api/orgs/{id}/seat-requests` | Admin — `{ quantity (1–100000), note }`; one open request at a time (409 `seat_request_pending`) |
| GET | `/api/orgs/{id}/seat-requests` | Manager |
| GET | `/api/orgs/{id}/enterprise-orders` | Admin — orders with invoice numbers |
| GET | `/api/admin/enterprise/seat-requests?status=` | Staff |
| POST | `/api/admin/enterprise/seat-requests/{id}/reject` | Staff — `{ note }` |
| GET | `/api/admin/enterprise/orders` | Staff |
| POST | `/api/admin/enterprise/orders` | Staff — `{ organizationId, seatRequestId|null, quantity|null, unitPrice, currency }` |
| POST | `/api/admin/enterprise/orders/{id}/mark-paid` | Staff — `{ paymentReference }` |

Creating an order makes a Commerce `Order` (status Pending, total = quantity × unit price, addressed to the requesting org
Admin, `OrderDetail.Kind = "EnterpriseSeats"`, billing name = organization) and issues its invoice through Commerce
`InvoiceService.IssueInvoice` with the line **"Payment due by bank transfer"**. The seat limit does **not** change until staff mark
the order paid; then the order becomes Paid and the organization's seat limit increases by the quantity (before/after recorded).
All steps are audited (`org.seat_request.*`, `enterprise.order.created|paid`). Bank transfers are reconciled outside the card
provider, so no `Payment` row is written; cancellation/credit notes for unpaid enterprise invoices are not implemented yet.

`EnterpriseOrderDto { id, organizationId, organizationName, seatRequestId, orderId, invoiceId, invoiceNumber, quantity, unitPrice, currency, total, status: AwaitingPayment|Paid, paymentInstructions, createdAt, paidAt, paymentReference, seatLimitBefore, seatLimitAfter }`

## Single sign-on (OIDC only)

**SAML is out of scope. SCIM provisioning is out of scope** (brand-new users are provisioned just-in-time at first SSO login;
removals are done by org admins in Mastemy).

| Method | Path | Who |
|---|---|---|
| GET / PUT / DELETE | `/api/orgs/{id}/sso` | org Admin |
| POST | `/api/orgs/{id}/sso/domains/{domainId}/verify` | org Admin — DNS TXT check; rate-limited (`auth`) |
| GET | `/api/admin/enterprise/sso-domains?status=Pending\|Verified\|Rejected` | Staff |
| POST | `/api/admin/enterprise/sso-domains/{domainId}/approve` · `/reject` | Staff — `{ note }` (required to reject); audited |
| GET | `/api/sso/{orgSlug}/start?returnTo=/path` | anonymous → 302 to the IdP; sets the binder cookie; rate-limited (`auth`) |
| POST | `/api/sso/{orgSlug}/link/start` | **signed-in** user — `{ returnTo? }` → `{ authorizationUrl }`; sets the binder cookie; rate-limited (`auth`) |
| GET | `/api/sso/callback?code=&state=` | IdP redirect → 302 to `Sso:CompletionUrl` with `?handoff=…&returnTo=…`, `?linked=<orgSlug>&returnTo=…` or `?error=<code>` |
| POST | `/api/sso/exchange` | anonymous + binder cookie — `{ handoff }` → normal `AuthResponse`; rate-limited (`auth`) |

Config input `{ issuer (https), clientId, clientSecret (required on create, optional on update), allowedDomains: string[] (1–50), enabled }`.
The client secret is encrypted with `SecretProtector` and never returned (`hasClientSecret` only) nor audited.
The config DTO also returns `domains: [{ id, domain, status: Pending|Verified|Rejected, txtRecordName, txtRecordValue, verifiedVia: dns|staff|null, verifiedAt, decisionNote, lastDnsCheckAt }]`.

### Domain verification

Each allowed domain gets a verification row (`Enterprise_SsoDomains`) that starts **Pending** with a random token. **Only Verified
domains are honoured at the callback** (`sso_domain_not_allowed` otherwise). A domain becomes Verified by either:

- **DNS TXT**: the org Admin publishes `_mastemy-sso.<domain>` TXT = `txtRecordValue` (`mastemy-sso-verify=…`) and calls
  `…/verify`. Mismatch / missing record → 409 `domain_verification_failed`; resolver unreachable → 503 `dns_unavailable`. The lookup
  is a single recursive UDP query to the system resolver (`/etc/resolv.conf`, or `Sso:DnsServer`), through `IDnsTxtResolver`.
- **Staff approval**: `/api/admin/enterprise/sso-domains/{id}/approve` (audited `org.sso.domain_approved`); reject with a reason
  (`org.sso.domain_rejected`). A rejected domain cannot be self-verified (409 `domain_rejected`).

A domain already Verified by another organization cannot be verified again (409 `domain_claimed`). **Public consumer email domains**
(gmail.com, outlook.com, hotmail.com, yahoo.\*, icloud.com, proton.me, protonmail.com, aol.com, gmx.\*, mail.ru, yandex.\*, qq.com,
163.com, … — `PublicEmailDomains`) can never be saved (400 `public_email_domain`), approved, or honoured. Re-saving the config keeps
existing rows (and tokens); removed domains are dropped; deleting the config drops all rows.

### Login flow

Authorization code + **state** (random, stored hashed, single use, `Sso:StateLifetimeMinutes` default 10) + **nonce** + **PKCE S256**
(verifier stored encrypted). The discovery document (issuer must match) and JWKS are fetched over https and cached
(`Sso:MetadataCacheMinutes`); an unknown key id triggers one throttled JWKS refetch. The `id_token` is validated for `iss`, `aud`,
`exp` (2-minute skew), `nonce` and an **RS256/ES256** signature.

**Login CSRF / browser binding**: start (and link-start) sets `mastemy_sso` — HttpOnly, Secure, SameSite=Lax, Path `/api/sso`,
random value whose SHA-256 is stored on the login state. The callback requires the matching cookie (`sso_session_mismatch`
otherwise; the state is not consumed) and replaces it with a fresh binder whose hash is stored with the handoff code; the exchange
requires that cookie too (401 `sso_session_mismatch`) and clears it. Browsers must call the exchange with `credentials: 'include'`.

### Accounts and identities

Identities (`Enterprise_SsoIdentities`) are keyed by **(organization, issuer, sub)**; later logins match on `sub`, never on email.
`email_verified` must be true and the email domain Verified for the org. Then:

- known (org, issuer, sub) → that user signs in;
- unknown sub, **email not used by any Mastemy account** → a new Student account is provisioned (email marked verified, random
  unusable password) and linked;
- unknown sub, **email already belongs to a Mastemy account** → **never auto-linked**: error `sso_link_required`. The owner signs in
  with password (+ MFA when enrolled), then in Security settings uses **Link organization SSO** →
  `POST /api/sso/{orgSlug}/link/start` → IdP → callback binds the identity to **that session user** when the IdP email equals the
  user's verified email (`sso_link_email_mismatch`, `sso_link_requires_verified_email`, `sso_identity_in_use`, `sso_already_linked`),
  audited `sso.identity_linked`, and redirects with `?linked=<orgSlug>` (no tokens issued).

The user joins the org as **Member** if needed, subject to the seat limit (`seat_limit_reached`). **Privileged accounts** (MFA policy
roles) can never sign in or link via SSO (`sso_privileged_not_allowed`); suspended accounts are refused. Tokens come from
`AuthService.StartSession` and the refresh token is set as the HttpOnly refresh cookie. The handoff code is single use, 2 minutes.

Expired login states are deleted by `SsoStateCleanup` (background, every 10 minutes) and opportunistically on start.

Other callback error codes: `sso_invalid_state`, `sso_idp_error`, `sso_invalid_request`, `sso_token_exchange_failed`,
`sso_invalid_token`, `sso_email_missing`, `sso_provider_unavailable`, `sso_not_available`, `sso_conflict`. Start returns 404
`sso_not_available` when the org has no enabled configuration and **503 `sso_not_configured`** when `Sso:RedirectUri` /
`Sso:CompletionUrl` are not set.

Config keys: `Sso:RedirectUri`, `Sso:CompletionUrl`, `Sso:StateLifetimeMinutes`, `Sso:MetadataCacheMinutes`, `Sso:DnsServer`
(optional), `Sso:AllowInsecureHttp` (development only), `Enterprise:OrgMaterialQuotaBytes`.

Schema (module-owned; the lead regenerates migrations): new table `Enterprise_SsoDomains`; `Enterprise_SsoLoginStates` gains
`BinderHash`, `HandoffBinderHash`, `LinkUserId`; `Enterprise_SsoIdentities` gains `IssuerHash` with unique index
(OrganizationId, IssuerHash, Subject) replacing (OrganizationId, Subject). Existing identity rows need `IssuerHash = SHA256(Issuer)`
(upper-case hex) backfilled.
