# QA report - MST-0011 ACCA SBR: Strategic Business Reporting — International Variant

Generated manually (2026-10-02) to the catalogue spec standard. Automated-equivalent checks only; no SME, accessibility, calculation or video review has happened.

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | course_metadata.json, syllabus.csv, outcome_coverage.csv, assessments/forms.json, assessments/question_bank.json, youtube_asset_manifest.csv, curriculum.md |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=9000 I=7200 A=1800 (0.8T=7200) |
| Lesson instruction minutes sum to I | PASS | 7200 vs 7200 |
| Assessment budget parts sum to A | PASS | lesson_checks 450 + module 630 + cumulative 720 = 1800 |
| Required cumulative forms fit the cumulative budget; optional forms not counted | PASS | required_forms=540 + answer_review=180 = 720 |
| Module checks fit module budget | PASS | sum=630 vs 630 |
| Form domain allocations sum to form length | PASS | 6 domains sum to items_per_form |
| Exam course: 3 distinct practice forms + protected final | PASS | A/B/C + final-protected |
| Thresholds 75%% module / 80%% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 6 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 65 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 65 planned videos |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items, rationale on every option |
| At least one multiple-answer item | PASS | one 'Select TWO' item included |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=3120 reviewed=0 |
| Exam-version record present | PASS | verification=unverified-needs-official-check (ACCA site egress-blocked 2026-10-02) |

## Verification note

The ACCA website (accaglobal.com) is blocked by the network egress proxy, so official syllabus area weightings, exam structure, question counts and durations could not be retrieved. All such figures are marked DESIGN ASSUMPTION and must be confirmed against the official ACCA study guide before blueprint sign-off. Syllabus area names are commonly published and used by name only.
