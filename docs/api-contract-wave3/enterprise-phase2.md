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

**SAML is out of scope. SCIM provisioning is out of scope** (users are provisioned just-in-time at first SSO login; removals are
done by org admins in Mastemy).

| Method | Path | Who |
|---|---|---|
| GET / PUT / DELETE | `/api/orgs/{id}/sso` | Admin |
| GET | `/api/sso/{orgSlug}/start?returnTo=/path` | anonymous → 302 to the IdP |
| GET | `/api/sso/callback?code=&state=` | IdP redirect → 302 to `Sso:CompletionUrl?handoff=…&returnTo=…` or `?error=<code>` |
| POST | `/api/sso/exchange` | anonymous — `{ handoff }` → normal `AuthResponse` (access + refresh token); rate-limited (`auth`) |

Config input `{ issuer (https), clientId, clientSecret (required on create, optional on update), allowedDomains: string[] (1–50), enabled }`.
The client secret is encrypted with `SecretProtector` and never returned (`hasClientSecret` only) nor audited.

Flow: authorization code + **state** (random, stored hashed, single use, `Sso:StateLifetimeMinutes` default 10) + **nonce** +
**PKCE S256** (verifier stored encrypted). The discovery document (`/.well-known/openid-configuration`, issuer must match) and
JWKS are fetched over https and cached (`Sso:MetadataCacheMinutes`, default 60); an unknown key id triggers one JWKS refetch
(throttled to every 30 s) for key rotation. The `id_token` is validated for `iss`, `aud` = client id, `exp` (2-minute skew),
`nonce`, and an **RS256 or ES256** signature from the JWKS.

Provisioning: `email_verified` must be true (`sso_email_unverified`) and the email domain must be allowed (`sso_domain_not_allowed`).
A known (org, subject) pair signs in its linked user. Otherwise an existing Mastemy account with that email is linked **only if its
own email is verified** (`sso_link_requires_verified_email`); else a new Student account is created (email marked verified, random
unusable password). The user joins the org as **Member** if not already a member, subject to the seat limit (`seat_limit_reached`).
**Privileged accounts** (Admin, SuperAdmin, Finance, Reviewer, Moderator — the MFA policy roles) can never sign in via SSO
(`sso_privileged_not_allowed`); suspended accounts are refused. Tokens are issued by the Identity `AuthService.StartSession`, so
sessions, refresh rotation and logout work as for password logins. The handoff code is single use and valid for 2 minutes.

Other callback error codes: `sso_invalid_state`, `sso_idp_error`, `sso_invalid_request`, `sso_token_exchange_failed`,
`sso_invalid_token`, `sso_email_missing`, `sso_provider_unavailable`, `sso_not_available`. Start returns 404 `sso_not_available`
when the org has no enabled configuration and **503 `sso_not_configured`** when `Sso:RedirectUri` / `Sso:CompletionUrl` are not set.

Config keys: `Sso:RedirectUri`, `Sso:CompletionUrl`, `Sso:StateLifetimeMinutes`, `Sso:MetadataCacheMinutes`,
`Sso:AllowInsecureHttp` (development only), `Enterprise:OrgMaterialQuotaBytes`.
