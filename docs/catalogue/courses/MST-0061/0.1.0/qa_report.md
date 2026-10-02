# QA report - MST-0061 AFP Certified Treasury Professional: CTP

Generated for Wave 9 spec authoring (2026-10-02). Automated-style checks only; no SME, accessibility, calculation or video review has happened. Official issuer outline was NOT verified this session (issuer site egress-blocked).

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | 8-file set mirrored from template |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=3600 I=2880 A=720 |
| Lesson instruction minutes sum to I | PASS | 2880 vs 2880 |
| Assessment budget parts sum to A | PASS | lesson_checks=180 + module_assessments=252 + cumulative=288 = 720 vs 720 |
| Required cumulative forms fit the cumulative budget; optional forms not counted | PASS | required=216 + review=72 = 288 vs budget 288 |
| Module checks fit module budget | PASS | 84+84+84 = 252 vs 252 |
| Form domain allocations sum to form length | PASS | 108 vs 108 |
| Exam course: 3 distinct practice forms + protected final | PASS | A/B/C + final-protected, no shared items |
| Thresholds 75% module / 80% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 3 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 9 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 9 planned videos, no IDs |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items, rationale on every option |
| At least one multiple-answer item | PASS | 1 'Select TWO' sample included |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=1044 reviewed=0 |
| Exam-version record present | PASS | verification=unverified-needs-official-check; documented_topic_weights=[] |
| Third-party exam code kept out of official_exam_code | PASS | official_exam_code empty; code 'CTP' held in exam_code_design_assumption |

## Honesty notes
- `verification_status` is **unverified-needs-official-check** and `verified_on` is empty: the issuer website (AFP) is blocked by the session egress proxy and no official page was fetched.
- Module titles, lesson titles and the ~33% module weights are **Mastemy design assumptions**, not official domains or weights. `documented_topic_weights` is an empty array.
- Form length, question count and durations are design assumptions; confirm on the issuer's official exam page.
- All sample items are original, AI-drafted and **draft-unreviewed**; an AI agent alone cannot establish professional accuracy.
