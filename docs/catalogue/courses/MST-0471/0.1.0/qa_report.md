# QA report - MST-0471 ChatGPT for Work: Current Features and Complete Professional Workflow

Hand-authored specification QA (2026-10-02), mirroring the catalogue QA template. Automated checks only; no SME, accessibility, calculation or video review has happened. Mastemy skills course with no external exam.

| Check | Result | Detail |
|---|---|---|
| All package files present | PASS | 8-file package complete |
| 80/20: I + A = T and I within 1 min of 0.8T | PASS | T=2400 I=1920 A=480 |
| Lesson instruction minutes sum to I | PASS | 1920 vs 1920 |
| Assessment budget parts sum to A | PASS | lesson_checks=120 + module=168 + cumulative=192 = 480 |
| Required cumulative form fits budget; optional alternate not counted | PASS | required=144 review=48 budget=192 |
| Module checks fit module budget | PASS | [42, 42, 42, 42] sum=168 vs 168 |
| Form domain allocations sum to form length | PASS | [36, 36, 36, 36] sum=144 vs 144 |
| Skills course: protected final + optional alternate | PASS | 1 required protected final; 1 optional alternate |
| Thresholds 75%% module / 80%% final | PASS |  |
| Every module has 2 worked applications and a misconception | PASS | 4 modules |
| Integrative case present | PASS |  |
| Coverage matrix covers every lesson and claims nothing as taught | PASS | 16 outcomes, all mapped-not-taught |
| YouTube manifest has no video IDs (nothing produced) | PASS | 16 planned videos |
| Sample items valid (keys, rationales, selection rule, scoring) | PASS | 3 items; rationale on every option |
| At least one multiple-answer item | PASS | Q0003 is a Select TWO multiple-answer item |
| Spec labelled as specification, not content | PASS |  |
| Bank plan recorded and items_reviewed = 0 | PASS | plan=816 reviewed=0 |
| Verification honesty | PASS | n/a-no-official-syllabus (no external issuer); verified_on empty |
