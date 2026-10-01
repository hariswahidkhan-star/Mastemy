# Role Matrix

All checks are enforced server-side. A user may hold several roles. "Own" = resources the user created or is assigned to.

| Capability | Student | Instructor | Reviewer | Moderator | Support | Finance | Admin | SuperAdmin |
|---|---|---|---|---|---|---|---|---|
| Browse catalog, watch free videos | Y | Y | Y | Y | Y | Y | Y | Y |
| Private notes, attempts, certificates (own) | Y | Y | Y | Y | Y | Y | Y | Y |
| Buy packages; use premium services if entitled | Y | Y | — | — | — | — | — | — |
| Create/edit courses, lessons, notes, MCQs | — | Own | — | — | — | — | All | All |
| Import MCQs | — | Own courses | — | — | — | — | All | All |
| Submit course for review | — | Own | — | — | — | — | Y | Y |
| Approve / request changes | — | Never own | Y | — | — | — | Y | Y |
| Publish / archive course | — | — | — | — | — | — | Y | Y |
| Moderate Q&A, reviews, messages | — | Own course replies | — | Y | — | — | Y | Y |
| View user accounts, assist learners | — | — | — | — | Y (read, limited) | — | Y | Y |
| Orders, refunds, commission ledger, payouts | — | Own earnings | — | — | Read orders | Y | Y | Y |
| Video status / broken link queue | — | Own | Y | — | — | — | Y | Y |
| Feature flags (onboarding, uploader) | — | — | — | — | — | — | — | Y |
| Assign roles | — | — | — | — | — | — | Non-privileged only | Y |
| View audit log | — | — | — | — | — | Financial | Y | Y |

Rules: instructors cannot self-approve, edit others' courses, or delete a published course with active learners. Nobody but the learner reads private notes by default. Instructors never receive channel credentials.
