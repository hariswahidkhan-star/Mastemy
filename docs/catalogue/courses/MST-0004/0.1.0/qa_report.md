# QA report - MST-0004 ACCA LW: Corporate and Business Law — Global Variant

Generated manually (2026-10-02) to the catalogue spec standard. Automated-equivalent checks only; no SME, accessibility, calculation or video review has happened.

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | course_metadata.json, syllabus.csv, outcome_coverage.csv, assessments/forms.json, assessments/question_bank.json, youtube_asset_manifest.csv, curriculum.md |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=4800 I=3840 A=960 (0.8T=3840) |
| Lesson instruction minutes sum to I | PASS | 3840 vs 3840 |
| Assessment budget parts sum to A | PASS | lesson_checks 240 + module 336 + cumulative 384 = 960 |
| Required cumulative forms fit the cumulative budget; optional forms not counted | PASS | required_forms=288 + answer_review=96 = 384 |
| Module checks fit module budget | PASS | sum=336 vs 336 |
| Form domain allocations sum to form length | PASS | 8 domains sum to items_per_form |
| Exam course: 3 distinct practice forms + protected final | PASS | A/B/C + final-protected |
| Thresholds 75%% module / 80%% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 8 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 35 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 35 planned videos |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items, rationale on every option |
| At least one multiple-answer item | PASS | one 'Select TWO' item included |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=1668 reviewed=0 |
| Exam-version record present | PASS | verification=unverified-needs-official-check (ACCA site egress-blocked 2026-10-02) |

## Verification note

The ACCA website (accaglobal.com) is blocked by the network egress proxy, so official syllabus area weightings, exam structure, question counts and durations could not be retrieved. All such figures are marked DESIGN ASSUMPTION and must be confirmed against the official ACCA study guide before blueprint sign-off. Syllabus area names are commonly published and used by name only.
