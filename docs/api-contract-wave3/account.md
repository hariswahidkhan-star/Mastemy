# Account (wave 3): profile, onboarding goals, skill profile, data rights

All endpoints under `/api/me` require authentication. A user with a privileged role also needs an `amr=mfa` token (see identity-security.md).

## Profile

`GET /api/me/profile` → `{id, email, displayName, initials, headline, bio, preferredLanguage, timeZone, links:[{label,url}], publicInstructorProfile, emailVerified, mfaEnabled, roles}`

`PUT /api/me/profile` is a partial update; null fields stay unchanged:
`{displayName?, headline? (≤160), bio? (≤5000), preferredLanguage? ("en"|"ar"), timeZone? (IANA id, e.g. "Europe/London"), links? (≤5; https only, no credentials in the URL; label 1–50), publicInstructorProfile? (Instructor role only, else 403)}`
Error codes: `invalid_timezone`, `invalid_url`, `too_many_links`, `invalid_language`, `invalid_headline`, `invalid_bio`.

There is no avatar upload. Clients render `initials`.

`GET /api/instructors/{id}/profile` (anonymous) → `{id, displayName, initials, headline, bio, links}`. Returns 404 unless the user is a non-suspended Instructor who has published the profile.

## Learning goals (onboarding)

`GET /api/me/learning-goals` → `{goals, skillsOfInterest[], learningLanguage, updatedAt}`
`PUT /api/me/learning-goals` `{goals (≤2000), skillsOfInterest (≤20, each ≤60, de-duplicated), learningLanguage (BCP-47-like, e.g. "en", "ar", "pt-BR")}`

## Skill profile (spec §16)

`GET /api/me/skills` → `{items:[{id?, name, evidenceType, label, verified:false, issuer?, credentialUrl?, obtainedAt?, assessmentsPassed?, bestScorePercent?, lastPassedAt?}], notice}`

| evidenceType | source | label |
|---|---|---|
| `self_declared` | user-entered | "Self-declared by the learner" |
| `mcq_assessed` | derived from skill codes of questions in the user's **passed, submitted** attempts | "Assessed by multiple-choice questions on Mastemy (knowledge check; does not verify practical professional competence)" |
| `external_credential` | user-entered with an issuer and an optional https credential URL | "External credential reported by the learner — not verified by Mastemy" |

`verified` is always `false`. Mastemy never claims verification.

`POST /api/me/skills` `{name, evidenceType: "self_declared"|"external_credential", issuer (required for external), credentialUrl?, obtainedAt?}` → item. `mcq_assessed` cannot be posted. Error codes: `400 invalid_evidence_type`, `409 duplicate_skill`, maximum 100 skills.
`DELETE /api/me/skills/{id}` → 204 (only your own; otherwise 404).

## Data rights

`GET /api/me/export` → JSON attachment (`mastemy-account-export/v1`) with these sections: account, profile, learningGoals, skills, enrollments, lessonProgress, notes (full text), assessmentAttempts (summaries only, no answers), certificates, orders (with items), payments (metadata only), refunds, discussions (own threads and replies), reviews, wishlist, notificationPreferences, sessions. Audited as `user.data_exported`.

`DELETE /api/me` with body `{password, confirm: "DELETE", mfaCode? (required when MFA is enabled)}` → 204. Deletion is **immediate and irreversible**:

- Anonymized: email becomes `deleted+{id}@invalid`, name becomes "Deleted user", the password is randomized and the account is suspended (it can no longer sign in). All roles except Student are removed. All refresh tokens are revoked.
- Deleted: private notes, MFA and verification data, sessions, profile text and links, learning goals, user-entered skills, wishlist, recently viewed, notifications and notification preferences.
- Retained for legal and financial obligations: orders, payments, refunds, commission ledger, audit log. Certificates are kept but set to not publicly visible. Discussion posts and reviews stay and show as "Deleted user".
- Audited as `user.deleted`.

Error codes: `400 confirmation_required`, `400 invalid_current_password`, `400 invalid_mfa_code`, `409 last_superadmin`.
