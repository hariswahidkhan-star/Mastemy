# Agent Evaluation and Adversarial Reliability Testing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0620` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Agent Evaluation and Adversarial Reliability Testing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build evaluation sets and metrics for agent behaviour
2. Run offline and online evaluations with graders
3. Design adversarial and red-team tests
4. Set reliability gates and track regressions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Evaluation design (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Build an evaluation set covering common and edge cases; (2) Choose metrics and a grading method for one task
- Common misconception addressed: Measuring only average accuracy and ignoring tail and failure cases
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Evaluation sets and coverage | 80 | 5 |
| M01L02 | Metrics and graders | 80 | 5 |
| M01L03 | Offline vs online evaluation | 80 | 5 |

### M02 Adversarial testing (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Write adversarial prompts that try to break the agent; (2) Inject a tool failure and observe recovery
- Common misconception addressed: Testing only happy-path inputs and declaring the agent reliable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Red-teaming prompts | 80 | 5 |
| M02L02 | Failure injection | 80 | 5 |
| M02L03 | Robustness and recovery | 80 | 5 |

### M03 Gates and regression (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Define a reliability gate that blocks release on regression; (2) Track a metric across versions to catch drift
- Common misconception addressed: Shipping when the average looks fine while a key metric has regressed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reliability gates | 80 | 5 |
| M03L02 | Regression tracking | 80 | 5 |
| M03L03 | Continuous evaluation | 80 | 5 |

## Integrative case

A team makes an agent's quality measurable: build a representative evaluation set with graders, run offline evaluations and online checks, add adversarial prompts and failure-injection, and set reliability gates that block a release when scores regress.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0620-final-protected | 30 | 30 | yes |
| MST-0620-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Evaluation design | 10 |
| Adversarial testing | 10 |
| Gates and regression | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0620-Q0001** (single-answer, Select ONE) Why is average accuracy alone a weak measure of agent reliability?

- A. It can hide serious tail and failure-case behaviour that matters in production **(key)**  
  _Rationale:_ Correct: a good average can mask rare but severe failures.
- B. It is impossible to compute  
  _Rationale:_ Averages are easy to compute; that is not the issue.
- C. It always equals 100%  
  _Rationale:_ Averages are rarely perfect and this is not the point.
- D. It measures latency, not quality  
  _Rationale:_ Accuracy is a quality measure; the concern is what it hides.

**MST-0620-Q0002** (multiple-answer, Select TWO) Which TWO belong in adversarial reliability testing? (Select TWO.)

- A. Prompts crafted to make the agent misbehave or ignore instructions **(key)**  
  _Rationale:_ Correct: adversarial prompts probe the agent's weak points.
- B. Injecting tool and dependency failures to test recovery **(key)**  
  _Rationale:_ Correct: failure injection checks how the agent handles broken dependencies.
- C. Only testing inputs you already know succeed  
  _Rationale:_ Happy-path-only testing misses the failures that matter.
- D. Removing the evaluation set entirely  
  _Rationale:_ Without an evaluation set there is nothing to measure.

**MST-0620-Q0003** (single-answer, Select ONE) A new agent version keeps the same average score but a key safety metric dropped. What should a reliability gate do?

- A. Block the release because a tracked metric regressed **(key)**  
  _Rationale:_ Correct: gates must act on per-metric regressions, not just the average.
- B. Ship it because the average is unchanged  
  _Rationale:_ The average hides the regression the gate exists to catch.
- C. Delete the safety metric  
  _Rationale:_ Removing the metric hides the problem.
- D. Disable the gate  
  _Rationale:_ Turning off the gate defeats its purpose.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
