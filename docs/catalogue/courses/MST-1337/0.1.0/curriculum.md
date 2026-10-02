# Evaluating LLM Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1337` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why LLM applications need evaluation beyond accuracy
2. Design offline evaluation sets and metrics for a task
3. Apply LLM-as-judge and human review appropriately
4. Measure faithfulness, relevance and safety of outputs
5. Set up online evaluation and regression testing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What to evaluate and why (MASTEMY-DESIGN 20%)

- Worked applications: (1) List the quality dimensions for a given app; (2) Explain why exact-match fails for open-ended answers
- Common misconception addressed: Treating a single accuracy number as sufficient
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Quality dimensions for LLM apps | 72 | 8 |
| M01L02 | Why generation is hard to score | 72 | 8 |

### M02 Building evaluation sets (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assemble a representative test set with edge cases; (2) Spot bias in a sampled evaluation set
- Common misconception addressed: Evaluating only on easy, in-distribution examples
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sampling and curating test cases | 72 | 8 |
| M02L02 | Golden sets and edge cases | 72 | 8 |

### M03 Automated metrics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a metric for a summarisation task; (2) Explain the limits of n-gram overlap metrics
- Common misconception addressed: Believing BLEU/ROUGE capture meaning well
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reference-based and embedding metrics | 72 | 8 |
| M03L02 | Task-specific automated checks | 72 | 8 |

### M04 LLM-as-judge and human review (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a judging rubric for an LLM grader; (2) Decide which cases need human review
- Common misconception addressed: Trusting an LLM judge as fully objective
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | LLM-as-judge: strengths and pitfalls | 72 | 8 |
| M04L02 | Human-in-the-loop evaluation | 72 | 8 |

### M05 Online evaluation and monitoring (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set up an A/B test for a prompt change; (2) Build a regression gate for releases
- Common misconception addressed: Assuming offline scores guarantee production quality
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | A/B testing and online signals | 72 | 8 |
| M05L02 | Regression testing and drift alerts | 72 | 8 |

## Integrative case

A support assistant built on an LLM must be evaluated before launch. Define a representative evaluation set, choose metrics for correctness, faithfulness and tone, decide where human review is required, and set up a regression test so future prompt changes do not silently degrade quality.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1337-final-protected | 25 | 25 | yes |
| MST-1337-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What to evaluate and why | 5 |
| Building evaluation sets | 5 |
| Automated metrics | 5 |
| LLM-as-judge and human review | 5 |
| Online evaluation and monitoring | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1337-Q0001** (single-answer, Select ONE) Why is exact string match a poor metric for an open-ended question-answering assistant?

- A. Many different wordings can be equally correct, so exact match penalises valid answers **(key)**  
  _Rationale:_ Correct: open-ended outputs have many valid forms that exact match misses.
- B. Exact match is too slow to compute at scale  
  _Rationale:_ It is cheap to compute; the problem is validity, not speed.
- C. Exact match requires a GPU  
  _Rationale:_ It is a simple string comparison needing no GPU.
- D. Exact match only works for images  
  _Rationale:_ It applies to text; the issue is its strictness for open text.

**MST-1337-Q0002** (multiple-answer, Select TWO) Which TWO are sound practices when using an LLM as an automated judge? (Select TWO.)

- A. Give the judge a clear rubric and reference answer where possible **(key)**  
  _Rationale:_ Correct: an explicit rubric improves consistency and reduces drift.
- B. Validate the judge against a sample of human-labelled cases **(key)**  
  _Rationale:_ Correct: calibrating against human labels checks the judge's reliability.
- C. Assume the judge is unbiased and never audit it  
  _Rationale:_ LLM judges have known biases and must be audited.
- D. Let the judge grade its own model's outputs with no oversight  
  _Rationale:_ Self-grading without oversight risks inflated, unreliable scores.

**MST-1337-Q0003** (single-answer, Select ONE) A model scores well offline but users report worse answers after a prompt change. What practice would have caught this before release?

- A. A regression test comparing outputs on a fixed evaluation set across versions **(key)**  
  _Rationale:_ Correct: regression testing flags quality drops before shipping.
- B. Increasing the model temperature  
  _Rationale:_ Temperature changes randomness, not evaluation coverage.
- C. Removing the evaluation set  
  _Rationale:_ Removing tests hides regressions rather than catching them.
- D. Only testing on the easiest cases  
  _Rationale:_ Easy-only testing hides exactly these regressions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
