# QA report - MST-0175 Microsoft PL-400: Power Platform Developer Associate

Specification self-check (2026-10-02). Automated-style checks recorded by the Wave 5 spec agent; no SME, accessibility, calculation or video review has happened. `build_catalogue.py` was not run by this agent.

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | missing: [] |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=1675 I=1340 A=335 |
| Lesson instruction minutes sum to I | PASS | 1340 vs 1340 |
| Assessment budget parts sum to A | PASS | lesson_checks=75 + module_assessments=140 + cumulative=120 = 335 |
| Required cumulative forms fit the cumulative budget; optional forms not counted | PASS | required=90 budget=120 |
| Module checks fit module budget | PASS | 4 modules x 35 min = 140 |
| Form domain allocations sum to form length | PASS | 8+13+18+6 = 45 |
| Exam course: 3 distinct practice forms + protected final | PASS | A/B/C + final-protected |
| Thresholds 75% module / 80% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 4 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 15 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 15 planned videos |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items, rationale on every option |
| At least one multiple-answer item | PASS | one Select TWO item included |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=640 reviewed=0 |
| Exam-version record present | PASS | verification=verified-official-source; source https://learn.microsoft.com/credentials/certifications/resources/study-guides/pl-400 |
