# QA report - MST-1820 HubSpot Inbound Marketing Certification Prep

Hand-authored spec (wave 4). Automated checks only; no SME, accessibility, calculation or video review has happened. build_catalogue.py / validate_catalogue.py were NOT run by this agent.

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | 8-file template set written |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=1350 I=1080 A=270 (I = 4A, T = 5A, so 0.8T = I exactly) |
| Lesson instruction minutes sum to I | PASS | 1080 vs 1080 |
| Assessment budget parts sum to A | PASS | lesson_checks 45 + module 105 + cumulative 120 = 270 |
| Required cumulative forms fit the cumulative budget; optional forms not counted | PASS | required=90 budget=120 |
| Module checks fit module budget | PASS | 105 vs 105 |
| Form domain allocations sum to form length | PASS | 45 = 45 |
| Exam course: 3 distinct practice forms + protected final | PASS | A/B/C + final-protected |
| Thresholds 75% module / 80% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 3 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 9 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 9 planned videos |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items, rationale on every option |
| At least one multiple-answer item | PASS | includes a Select TWO item |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=498 reviewed=0 |
| Exam-version record present | PASS | verification=unverified-needs-official-check (egress blocked; outline is DESIGN ASSUMPTION) |

## Honesty notes

- Verification: the official HubSpot Academy source could not be fetched (network egress blocked on 2026-10-02). Module structure, domain names and weightings are **DESIGN ASSUMPTIONS** and must be confirmed against the official exam outline before SME review and publication.
- `official_exam_code` is left blank; any exam code appears only in `exam_code_design_assumption`.
- `verified_on` is blank and `verification_status` is `unverified-needs-official-check`.
