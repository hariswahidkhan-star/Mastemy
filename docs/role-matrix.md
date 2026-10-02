# Role Matrix

All checks are enforced server-side. The client hides what a user cannot do, but it never decides on its own. A user
may hold several platform roles, plus course-team roles and organization roles. "Own" means resources the user
created or is assigned to.

## Platform roles

ASP.NET policies: `Staff` = Admin, SuperAdmin. `Reviewer` = Reviewer, Admin, SuperAdmin. `Instructor` = Instructor,
Admin, SuperAdmin. `Finance` = Finance, Admin, SuperAdmin. `SuperAdmin` = SuperAdmin.

| Capability | Student | Instructor | Reviewer | Moderator | Support | Finance | Admin | SuperAdmin |
|---|---|---|---|---|---|---|---|---|
| Browse catalog, watch free videos (no login needed) | Y | Y | Y | Y | Y | Y | Y | Y |
| Own notes, bookmarks, study plan, attempts, certificates, AI tutor chats | Y | Y | Y | Y | Y | Y | Y | Y |
| Buy packages/subscriptions/gifts; use premium services if entitled | Y | Y | Y | Y | Y | Y | Y | Y |
| Apply to teach (when flags allow) | Y | — | — | — | — | — | — | — |
| Create/edit courses, lessons, notes, resources, MCQs, imports | — | Own (team scope) | — | — | — | — | All | All |
| Pricing proposals, coupons, referral codes, promotions opt-in | — | Own (owner/co-instructor) | — | — | — | — | All | All |
| Earnings, statements, payout profile and requests | — | Own | — | — | — | — | — | — |
| Submit course for review | — | Own (owner/co-instructor) | — | — | — | — | Y | Y |
| Review courses (approve / request changes, timestamped comments) | — | Never own | Y | — | — | — | Y | Y |
| Review questions (Draft → Reviewed → Approved → Active), resolve challenges, propose regrades | — | — | Y (not own course) | — | — | — | Y | Y |
| Decide instructor applications | — | — | Y | — | — | — | Y | Y |
| Certification directory, issuers, objectives, verification states | — | — | Y (reviewer ≠ last editor) | — | — | — | Y | Y |
| Publish / archive course | — | — | — | — | — | — | Y | Y |
| Hide/unhide discussions and replies | — | — | — | Y | — | — | Y | Y |
| Complaints, takedown holds, appeals, instructor suspension | — | — | — | — | — | — | Y | Y |
| Approve regrades, certificate flags/corrections/appeals, accommodations | — | — | — | — | — | — | Y (approver ≠ proposer) | Y |
| Users list, suspend users, email verification help, instructor invitations | — | — | — | — | — | — | Y | Y |
| Coupons (any scope), regional price decisions, promotions, bundles, plans | — | — | — | — | — | — | Y | Y |
| Refunds, disputes, reconciliation, invoices, tax rates, payout profiles/requests/batches, affiliates, subscription pool | — | — | — | — | — | Y | Y | Y |
| Organizations (create, seats, deactivate) | — | — | — | — | — | — | Y | Y |
| YouTube channels (Mode A), upload approvals, video confirmations | — | — | — | — | — | — | Y | Y |
| Analytics dashboard, AI usage, broken-link and overdue queues, templates, agreements, skills, pathways, collections, backlog | — | Own course analytics | — | — | — | — | Y | Y |
| Audit log | — | — | — | — | — | — | Y | Y |
| Feature flags (onboarding, uploader, Mode B) | — | — | — | — | — | — | — | Y |
| Assign platform roles | — | — | — | — | — | — | — | Y |
| **MFA required** (`Security:RequireMfaForPrivileged=true`) | No | No | **Yes** | **Yes** | No | **Yes** | **Yes** | **Yes** |

Notes:

- **Support** exists as a role but has no specific capability in the current code. Support staff work as Students
  until support tooling is built. Do not give Support staff Admin as a workaround without MFA and a recorded decision.
- Only a SuperAdmin assigns roles, and a SuperAdmin cannot remove their own SuperAdmin role. The last SuperAdmin cannot
  delete their account. Granting a privileged role needs a verified email (409 `email_not_verified`).
- A privileged user without MFA can sign in only to a restricted token that allows nothing but MFA enrollment. Every
  other request returns `403 mfa_required` / `mfa_enrollment_required`. Privileged users cannot disable MFA.
- Four-eyes rules: payout batches are approved by a different user than the creator; scholarship coupons by someone
  other than the creator; regrades by staff other than the proposer; certification verification by someone other than
  the last editor; questions reach Active only through review.
- A suspended instructor loses the Instructor role and all studio writes immediately. Their earnings go to a `Held`
  batch that Finance cannot approve.

## Course-team roles (per course)

| Capability | Owner | Co-instructor | Editor |
|---|---|---|---|
| Edit curriculum, notes, resources, questions, checklist, preview | Y | Y | Y |
| Submit, start update, duplicate course, translations, analytics, pricing, coupons, referral codes | Y | Y | — (`403 editor_scope`) |
| Manage co-instructors and editors | Y | — | — |
| Revenue share (ledger) | per `RevenueSharePercent` | per `RevenueSharePercent` | — |

## Organization roles (per organization)

| Capability | Org Admin | Manager | Member |
|---|---|---|---|
| See org, members (with emails), invitations, assignments, progress reports | Y | Y (emails hidden) | — (404) |
| Invite / remove Members, set departments | Y | Y (not changes that alter premium coverage) | — |
| Grant/change/remove Manager or Admin roles | Y | — | — |
| Create/delete assignments with `grantsPremium` | Y | — | — |
| Create assignments without premium | Y | Y | — |
| See own assignments and due dates (`/me`) | Y | Y | Y |

The last org Admin cannot be removed or demoted, even by staff. A user from another org gets 404, never 403. Learner
notes are never shown in org reports.

## Fixed rules

Instructors cannot self-approve, edit other instructors' courses, or delete a published course that has learners.
Nobody except the learner can read private notes or AI chats. Staff see AI conversation metadata only. Instructors
never receive channel credentials.
