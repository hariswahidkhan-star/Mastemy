# QA report - MST-0159 AACE EVP: Earned Value Professional

Hand-authored spec package (wave 14, category 04). Automated-style checks recomputed by the authoring agent; `build_catalogue.py`/`validate_catalogue.py` were NOT run (generator not touched). No SME, accessibility, calculation or video review has happened.

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | course_metadata.json, syllabus.csv, outcome_coverage.csv, assessments/forms.json, assessments/question_bank.json, youtube_asset_manifest.csv, qa_report.md, curriculum.md |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=3600 I=2880 A=720 |
| Lesson instruction minutes sum to I | PASS | 2880 vs 2880 |
| Assessment budget parts sum to A | PASS | lesson_checks 180 + module 252 + cumulative 288 = 720 |
| Required cumulative forms fit the cumulative budget; optional forms not counted | PASS | required=240 budget=288 |
| Module checks fit module budget | PASS | 3 x 84 = 252 |
| Form domain allocations sum to form length | PASS | 3 x 40 = 120 |
| Exam course: 3 distinct practice forms + protected final | PASS | A/B/C + final-protected |
| Thresholds 75% module / 80% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 3 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 12 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 12 planned videos |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items |
| At least one multiple-answer item with exactly 2 keys and Select TWO | PASS | 1 multiple-answer sample |
| Rationale present on every option | PASS |  |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=1128 reviewed=0 |
| Exam-version record present | PASS | verification=unverified-needs-official-check; issuer site egress-blocked 2026-10-02 |
| Exam code kept out of official_exam_code | PASS | official_exam_code empty; recorded as exam_code_design_assumption |
