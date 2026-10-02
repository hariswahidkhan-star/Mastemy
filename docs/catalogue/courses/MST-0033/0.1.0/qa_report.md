# QA report - MST-0033 CIMA P2: Advanced Management Accounting

Generated for Wave 9 spec authoring (2026-10-02). Automated-style checks only; no SME, accessibility, calculation or video review has happened. Official issuer outline was NOT verified this session (issuer site egress-blocked).

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | 8-file set mirrored from template |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=6000 I=4800 A=1200 |
| Lesson instruction minutes sum to I | PASS | 4800 vs 4800 |
| Assessment budget parts sum to A | PASS | lesson_checks=300 + module_assessments=420 + cumulative=480 = 1200 vs 1200 |
| Required cumulative forms fit the cumulative budget; optional forms not counted | PASS | required=360 + review=120 = 480 vs budget 480 |
| Module checks fit module budget | PASS | 140+140+140 = 420 vs 420 |
| Form domain allocations sum to form length | PASS | 180 vs 180 |
| Exam course: 3 distinct practice forms + protected final | PASS | A/B/C + final-protected, no shared items |
| Thresholds 75% module / 80% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 3 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 9 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 9 planned videos, no IDs |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items, rationale on every option |
| At least one multiple-answer item | PASS | 1 'Select TWO' sample included |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=1668 reviewed=0 |
| Exam-version record present | PASS | verification=unverified-needs-official-check; documented_topic_weights=[] |
| Third-party exam code kept out of official_exam_code | PASS | official_exam_code empty; code 'P2' held in exam_code_design_assumption |

## Honesty notes
- `verification_status` is **unverified-needs-official-check** and `verified_on` is empty: the issuer website (CIMA (AICPA & CIMA)) is blocked by the session egress proxy and no official page was fetched.
- Module titles, lesson titles and the ~33% module weights are **Mastemy design assumptions**, not official domains or weights. `documented_topic_weights` is an empty array.
- Form length, question count and durations are design assumptions; confirm on the issuer's official exam page.
- All sample items are original, AI-drafted and **draft-unreviewed**; an AI agent alone cannot establish professional accuracy.
