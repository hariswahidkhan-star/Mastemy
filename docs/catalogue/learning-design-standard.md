# 80/20 Learning-Design Standard (static)

Implements master prompt sections 6 and 7. Enforced for every catalogue row and course package by `validate_catalogue.py`.

## Definition
- `T` = planned required course minutes; `I` = instructional minutes; `A` = required assessment plus assigned answer-review minutes.
- `I = 0.80 T`, `A = 0.20 T` (equivalently `A = 0.25 I`). A 40-hour course has 32 instructional hours and 8 assessment/review hours.
- **Rounding rule (single, documented):** `T = planned_hours x 60`; `I = round-half-up(0.8 x T)`; `A = T - I`. So `I` is always within 0.5 minute of 80%, and `I + A = T` exactly.
- This is a designed time allocation, not a claim about any learner's speed.

## What the 20% is not
It does not drop 20% of the syllabus, make only 20% of lessons examinable, set a 20% pass mark or replace official domain weights. Every in-scope outcome is taught; official weights are preserved separately in the assessment forms.

## Default split of A
Lesson checks 5% of T, module/case assessments 7% of T, cumulative assessments and review 8% of T (`cumulative = A - lesson - module`). When the required cumulative forms do not fit (for example, a practice form plus a protected final for an exam course), the cumulative share grows and lesson/module shares shrink, with lesson checks floored at 3% of T. The deviation is recorded in `assessments/forms.json` and `curriculum.md`. The total stays 20%.

## Counting rules
Count each required timed activity once. Not counted: the full optional question bank, unlimited repeats, unused alternative forms (practice forms B and C), playback buffering. Packages report video runtime target, required assessment time, optional practice and external recommended study hours separately. Planned learning hours are never presented as issuer-eligible training hours.

## Depth
Build from official outcomes upward. Each module records purpose, prerequisites, outcomes, sequenced lessons with minutes, worked applications (at least two per module), a common misconception, official references and completion requirements. Each course has an integrative case with a narrated solution and selection-based assessment. Outcomes are marked covered only after content is authored and reviewed; the coverage matrix starts at `mapped-not-taught`. Course length is derived from the outcomes; the hours in inventory rows are design assumptions (`duration_basis`).
