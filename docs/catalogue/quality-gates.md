# Quality Gates and Acceptance Tests (static)

Implements master prompt section 17. Gate status per course is tracked by `workflow_state` and the `pkg_*` columns.

## Workflow
Candidate -> Source verification -> Blueprint review -> Authoring -> Assessment review -> Video production -> Quality approval -> Published -> Update required / Retired. A course can be `Blocked` at any stage. Publication is prevented when required lessons, sources, answer keys, captions or video links are missing, or when the target exam is obsolete, retiring before release, or unresolved.

## Release checklist (all must pass before Published)
1. All in-scope outcomes mapped and actually taught (coverage matrix `review_status = taught-and-reviewed`); no unexplained exclusions.
2. Exam version and jurisdiction correct and current; exam-version record complete.
3. Calculations independently recomputed; code demonstrated and tested in the stated versions.
4. Every item key and every option rationale checked; multiple-answer scoring verified; official terminology accurate.
5. No inaccessible required resources; captions and transcripts aligned; contrast and keyboard navigation checked.
6. YouTube assets playable, authorised and mapped (video ID, channel ID, playlist, captions, duration).
7. Learner routes, completion rules and certificate issuance/revocation/verification tested.
8. Publication claims truthful (no endorsement, pass guarantees or invented data).
9. Domain weights reconciled with forms independently of the 80/20 allocation; rounding differences recorded.
10. Platform tests: enrolment, expired sessions, interrupted video progress, quiz resume, failed attempts, retakes, unauthorised access, locked answer keys, instructor isolation, admin changes, mobile layouts, keyboard navigation.
11. Regulated content (healthcare, legal, tax, financial, safety) signed off by a suitably qualified reviewer.

## What automation covers now
`validate_catalogue.py` checks structure, IDs, crosswalk integrity, 80/20 arithmetic, formats, certificate wording, evidence labelling, retirement handling, dedup counts and package consistency. It does not and cannot replace subject-matter, accessibility, legal or video review. Open problems live in `operations/unresolved_issues.csv` with severity, owner, decision and release-blocking status.
