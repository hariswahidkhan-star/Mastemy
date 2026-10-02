# QA report - MST-0151 SAFe Release Train Engineer: Knowledge Preparation

Hand-authored spec package (wave 14, category 04). Automated-style checks recomputed by the authoring agent; `build_catalogue.py`/`validate_catalogue.py` were NOT run (generator not touched). No SME, accessibility, calculation or video review has happened.

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | course_metadata.json, syllabus.csv, outcome_coverage.csv, assessments/forms.json, assessments/question_bank.json, youtube_asset_manifest.csv, qa_report.md, curriculum.md |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=2700 I=2160 A=540 |
| Lesson instruction minutes sum to I | PASS | 2160 vs 2160 |
| Assessment budget parts sum to A | PASS | lesson_checks 135 + module 189 + cumulative 216 = 540 |
| Required cumulative forms fit the cumulative budget; optional forms not counted | PASS | required=180 budget=216 |
| Module checks fit module budget | PASS | 3 x 63 = 189 |
| Form domain allocations sum to form length | PASS | 3 x 30 = 90 |
| Exam course: 3 distinct practice forms + protected final | PASS | A/B/C + final-protected |
| Thresholds 75% module / 80% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 3 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 9 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 9 planned videos |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items |
| At least one multiple-answer item with exactly 2 keys and Select TWO | PASS | 1 multiple-answer sample |
| Rationale present on every option | PASS |  |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=846 reviewed=0 |
| Exam-version record present | PASS | verification=unverified-needs-official-check; issuer site egress-blocked 2026-10-02 |
| Exam code kept out of official_exam_code | PASS | official_exam_code empty; recorded as exam_code_design_assumption |
