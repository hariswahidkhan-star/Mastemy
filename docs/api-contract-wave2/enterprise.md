# Enterprise workspaces (spec §20, phase 1)

**Out of scope for this phase:** SSO (SAML/OIDC) and SCIM provisioning; invoices and billing for enterprise seats. Members must already have a Mastemy account. Org staff invite them by email; no email invitations are sent.

All endpoints require authentication. Errors use the standard problem format (`code` values are shown below).

## Staff (policy `Staff`)
| Method | Path | Body / notes |
|---|---|---|
| GET | `/api/admin/orgs` | → `OrgDto[]` |
| POST | `/api/admin/orgs` | `{name, slug, seatLimit}` → `OrgDto`. Name is 2-200 characters. The slug matches `[a-z0-9-]`, is 1-64 characters and must be unique (409 `slug_taken`). seatLimit is 1-100000. Audited `org.created`. |
| PUT | `/api/admin/orgs/{id}` | `{name?, slug?, seatLimit?}`. seatLimit cannot go below the seats in use (409 `seat_limit_below_usage`). Audited `org.updated`. |
| POST | `/api/admin/orgs/{id}/deactivate` | Revokes every Organization entitlement for that org. The org becomes invisible to its members and managers. Audited `org.deactivated`. |
| POST | `/api/admin/orgs/{id}/reactivate` | Re-grants premium entitlements from the current assignments. Audited `org.reactivated`. |

`OrgDto = {id, name, slug, seatLimit, seatsUsed, isActive, createdAt}`

## Org management (org Admin/Manager of that org, or staff)
A caller who is not staff and is not an Admin or Manager of an **active** org gets **404** for every route below. Plain members get 404 too. This keeps orgs isolated from each other.

| Method | Path | Body / notes |
|---|---|---|
| GET | `/api/orgs/{id}` | `OrgDto` |
| GET | `/api/orgs/{id}/members` | `MemberDto[] = {userId, email, displayName, role, department, joinedAt}` |
| POST | `/api/orgs/{id}/members` | `{email, role?=Member, department?}`. The email must belong to an existing user (404 if not). Returns 409 `already_member` or `seat_limit_reached`. The seat check runs under a row lock on the org, so parallel adds cannot exceed the limit. |
| PATCH | `/api/orgs/{id}/members/{userId}` | `{role?, department?}`. Department is at most 100 characters. |
| DELETE | `/api/orgs/{id}/members/{userId}` | 204. Also deletes that user's individual assignments in this org and revokes their org entitlements. |
| POST | `/api/orgs/{id}/members/bulk/preview` | `{csv, department?}` → `{total, valid, seatsAvailable, canCommit, rows:[{line,email,error}]}`. The CSV takes one email per row in the first column, with an optional `email` header. At most 1000 rows. |
| POST | `/api/orgs/{id}/members/bulk` | Same body. All or nothing: any invalid row returns 400 `invalid_rows`, and going over the seat limit returns 409 `seat_limit_reached`. Bulk-added members get role Member. |
| GET | `/api/orgs/{id}/assignments` | `AssignmentDto[] = {id, courseId, courseTitle, scope: Organization|Department|User, userId, department, grantsPremium, dueAt, createdAt}` |
| POST | `/api/orgs/{id}/assignments` | `{courseId, userId?, department?, dueAt?, grantsPremium}`. The course must be live (404 if not). Set userId or department, not both; with neither, the assignment covers the whole org. dueAt must be in the future. A duplicate scope returns 409 `duplicate_assignment`. |
| DELETE | `/api/orgs/{id}/assignments/{assignmentId}` | 204 |
| GET | `/api/orgs/{id}/reports/progress` | `ProgressRowDto[]`, one row per member per assigned course that covers them. Add `?format=csv` for a UTF-8 CSV with BOM. Cells starting with `= + - @ \t \r` are prefixed with `'`. |

`ProgressRowDto = {userId, email, displayName, department, courseId, courseTitle, completedLessons, totalLessons, progressPercent, bestScorePercent, passed, certificateCode, dueAt, overdue}`

The report fields work as follows:
- **bestScorePercent** is the best submitted attempt on an assessment with `CountsTowardCertificate`.
- **passed** means any such attempt passed or the learner holds a valid certificate.
- **dueAt** is the earliest due date among the assignments that cover the member.
- **overdue** means dueAt is in the past and the course is not passed.
- Learner notes are never read or returned.

### Role rules
- Only an org Admin (or staff) can grant the Manager or Admin role, or change or remove an existing Manager or Admin (otherwise 403).
- Managers can add and remove Members and set their departments.
- The last Admin cannot be removed or demoted, even by staff (409 `last_admin`).
- Only an org Admin (or staff) can create or delete assignments with `grantsPremium=true`.

### Premium entitlements
- After every membership, department, assignment or activation change, the org's entitlements are reconciled.
- The org needs an active `Entitlement{Source=Organization, OrganizationId=org}` for each (member, course) pair covered by at least one `grantsPremium` assignment. Any other active Organization entitlement for that org is revoked by setting `RevokedAt`.
- Purchase, Grant and Subscription entitlements are never touched, and neither are other orgs' entitlements.

## Member view
| GET | `/api/me/organizations` | `[{id, name, slug, role, department, assignments:[{assignmentId, courseId, courseTitle, courseSlug, grantsPremium, dueAt, overdue}]}]` (active orgs only) |
