# QA report - MST-0058 CIPM Level I: Investment Performance Measurement

Generated for Wave 9 spec authoring (2026-10-02). Automated-style checks only; no SME, accessibility, calculation or video review has happened. Official issuer outline was NOT verified this session (issuer site egress-blocked).

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | 8-file set mirrored from template |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=7200 I=5760 A=1440 |
| Lesson instruction minutes sum to I | PASS | 5760 vs 5760 |
| Assessment budget parts sum to A | PASS | lesson_checks=360 + module_assessments=504 + cumulative=576 = 1440 vs 1440 |
| Required cumulative forms fit the cumulative budget; optional forms not counted | PASS | required=432 + review=144 = 576 vs budget 576 |
| Module checks fit module budget | PASS | 168+168+168 = 504 vs 504 |
| Form domain allocations sum to form length | PASS | 216 vs 216 |
| Exam course: 3 distinct practice forms + protected final | PASS | A/B/C + final-protected, no shared items |
| Thresholds 75% module / 80% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 3 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 9 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 9 planned videos, no IDs |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items, rationale on every option |
| At least one multiple-answer item | PASS | 1 'Select TWO' sample included |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=1980 reviewed=0 |
| Exam-version record present | PASS | verification=unverified-needs-official-check; documented_topic_weights=[] |
| Third-party exam code kept out of official_exam_code | PASS | official_exam_code empty; code 'CIPM Level I' held in exam_code_design_assumption |

## Honesty notes
- `verification_status` is **unverified-needs-official-check** and `verified_on` is empty: the issuer website (CFA Institute) is blocked by the session egress proxy and no official page was fetched.
- Module titles, lesson titles and the ~33% module weights are **Mastemy design assumptions**, not official domains or weights. `documented_topic_weights` is an empty array.
- Form length, question count and durations are design assumptions; confirm on the issuer's official exam page.
- All sample items are original, AI-drafted and **draft-unreviewed**; an AI agent alone cannot establish professional accuracy.
