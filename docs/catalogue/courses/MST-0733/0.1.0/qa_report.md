# QA report - MST-0733 Google Forms: Surveys, Assessments, and Data Collection

Generated for Wave 8 spec authoring (2026-10-02). Automated checks only; no SME, accessibility, calculation or video review has happened.

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | course_metadata.json, syllabus.csv, outcome_coverage.csv, assessments/forms.json, assessments/question_bank.json, youtube_asset_manifest.csv, qa_report.md, curriculum.md |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=1200 I=960 A=240 |
| Lesson instruction minutes sum to I | PASS | 960 vs 960 |
| Assessment budget parts sum to A | PASS | lesson_checks=60 module=84 cumulative=96 total=240 |
| Required cumulative forms fit the cumulative budget; optional forms not counted | PASS | required=50 budget=96 |
| Module checks fit module budget | PASS | 84 vs 84 |
| Form domain allocations sum to form length | PASS | 40 vs 40 |
| Thresholds 75% module / 80% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 6 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 12 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 12 planned videos |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items, rationale on every option |
| At least one multiple-answer item | PASS | one Select TWO sample drafted |
| documented_topic_weights recorded as array | PASS | [] (no official weighting published) |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=368 reviewed=0 |
| Verification | unverified-needs-official-check | official vendor docs not reachable (egress blocked 2026-10-02); verified_on left empty |
