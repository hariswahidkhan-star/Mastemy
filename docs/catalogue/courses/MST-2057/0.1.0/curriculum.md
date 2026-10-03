# AI Evaluation and Observability: Evals, Tracing and Monitoring

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2057` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs. Specific tracing/eval-tool features must be re-checked at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI Evaluation and Observability: Evals, Tracing and Monitoring (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why LLM systems need evaluation beyond anecdotes and vibes
2. Build evaluation datasets and choose offline vs online evaluation
3. Select metrics and judges (exact match, rubric, LLM-as-judge) and know their limits
4. Instrument an LLM app with tracing to see each step, prompt, tool call and cost
5. Monitor production for quality drift, errors, latency and cost regressions
6. Close the loop: turn production failures into new evaluation cases

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why evaluate (25% (Mastemy design weight), design weight)

- Worked applications: (1) Replace 'it looks better' with a measurable pass criterion for a summariser; (2) Decide which checks run offline before release and which run online in production
- Common misconception addressed: Treating a handful of impressive demos as proof the system is good
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Anecdotes vs measurement; what 'good' means for an LLM feature | 120 | 7 |
| M01L02 | Offline vs online evaluation and when to use each | 120 | 7 |

### M02 Building evals (25% (Mastemy design weight), design weight)

- Worked applications: (1) Build a 50-example eval set that covers common and edge cases; (2) Design an LLM-as-judge rubric and note where it can be fooled
- Common misconception addressed: Trusting an LLM judge's score without ever checking it against human labels
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating a representative evaluation dataset | 120 | 7 |
| M02L02 | Metrics and judges: exact match, rubric scoring and LLM-as-judge | 120 | 7 |

### M03 Tracing and observability (25% (Mastemy design weight), design weight)

- Worked applications: (1) Add tracing that records each tool call, its latency and token cost; (2) Use a trace to pinpoint whether retrieval or generation caused a bad answer
- Common misconception addressed: Logging only the final answer so failures cannot be diagnosed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Instrumenting steps, prompts, tool calls, tokens and cost | 120 | 7 |
| M03L02 | Reading a trace to find where a run went wrong | 120 | 7 |

### M04 Monitoring and the feedback loop (25% (Mastemy design weight), design weight)

- Worked applications: (1) Set alerts for a rise in error rate or a cost regression; (2) Add a production failure as a new permanent eval case
- Common misconception addressed: Assuming a system that passed evals once will stay good without monitoring
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Monitoring drift, errors, latency and cost in production | 120 | 7 |
| M04L02 | Turning real failures into regression eval cases | 120 | 7 |

## Integrative case

A team runs an LLM summarisation feature in production and keeps shipping regressions: build a representative eval set with clear metrics, add tracing to expose each step's cost and output, monitor for drift and cost spikes, and feed real failures back as new regression cases.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2057-final-protected | 40 | 40 | yes |
| MST-2057-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why evaluate | 10 |
| Building evals | 10 |
| Tracing and observability | 10 |
| Monitoring and the feedback loop | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2057-Q0001** (single-answer, Select ONE) A team claims their agent 'got much better' after a prompt change, citing three good examples. Why is this insufficient evidence?

- A. Three cherry-picked examples are not a representative, repeatable measurement and can hide regressions elsewhere **(key)**  
  _Rationale:_ Correct: evaluation needs a representative dataset and metrics, not anecdotes.
- B. Three examples is the required minimum for statistical certainty  
  _Rationale:_ Three examples give no such certainty.
- C. Examples cannot be used in evaluation at all  
  _Rationale:_ Examples can inform evals; the problem is they are few and cherry-picked.
- D. Prompt changes never affect quality  
  _Rationale:_ They can; that is exactly why measurement is needed.

**MST-2057-Q0002** (multiple-answer, Select TWO) Which TWO are sound practices when using LLM-as-judge for evaluation? (Select TWO.)

- A. Validate the judge's scores against a sample of human labels **(key)**  
  _Rationale:_ Correct: calibrating against humans checks the judge is trustworthy.
- B. Give the judge a clear, specific scoring rubric **(key)**  
  _Rationale:_ Correct: a concrete rubric reduces inconsistent judging.
- C. Assume the judge is always correct and never audit it  
  _Rationale:_ Blind trust in the judge is the risk to avoid.
- D. Use the same model to generate and judge with no checks and treat the score as ground truth  
  _Rationale:_ Unaudited self-judging can be biased and must not be treated as ground truth.

**MST-2057-Q0003** (single-answer, Select ONE) What does tracing add that logging only the final answer does not?

- A. A step-by-step view of prompts, tool calls, intermediate outputs, latency and cost so failures can be localised **(key)**  
  _Rationale:_ Correct: traces expose the internal steps needed to diagnose where a run failed.
- B. A guarantee the answer is correct  
  _Rationale:_ Tracing observes; it does not guarantee correctness.
- C. Automatic fixing of bad answers  
  _Rationale:_ Tracing diagnoses; it does not auto-fix.
- D. Elimination of the need for evaluation  
  _Rationale:_ Tracing and evaluation are complementary, not substitutes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
