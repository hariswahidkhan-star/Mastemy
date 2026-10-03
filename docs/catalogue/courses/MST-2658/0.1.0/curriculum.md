# AI-Assisted Analytics and Reporting in Excel

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2658` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Microsoft Excel and AI product features change often; this spec teaches durable concepts and must have product specifics re-verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI-Assisted Analytics and Reporting in Excel (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame an analysis question clearly so AI assistance stays focused and checkable
2. Use AI to accelerate data cleaning, type fixing and outlier spotting, then confirm changes
3. Generate and interpret descriptive statistics and simple trends with AI support
4. Prompt for PivotTable and chart designs that answer the question, and validate them
5. Draft a defensible narrative of findings with explicit caveats and uncertainty
6. Guard against bias, spurious correlation and over-reliance in AI-assisted conclusions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Framing the question (25% (design weight), design weight)

- Worked applications: (1) Rewrite 'why are sales down?' into a measurable comparison across periods and regions; (2) Choose a median over a mean when outliers would distort the story
- Common misconception addressed: Answering a different question than the one the stakeholder actually asked
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Turning a vague ask into a testable question | 120 | 7 |
| M01L02 | Choosing the right measure and comparison | 120 | 7 |

### M02 AI-assisted cleaning and exploration (25% (design weight), design weight)

- Worked applications: (1) Have AI flag likely data-entry outliers, then inspect each before removing; (2) Use AI to standardise date formats, confirming no values were corrupted
- Common misconception addressed: Deleting outliers the AI flags without checking whether they are real
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cleaning, type fixes and outlier detection | 120 | 7 |
| M02L02 | Descriptive statistics and distributions | 120 | 7 |

### M03 From analysis to answer (25% (design weight), design weight)

- Worked applications: (1) Ask for a PivotTable that compares this quarter with last, then recompute one cell; (2) Request a chart that answers the question and check it is not misleading
- Common misconception addressed: Accepting an AI chart whose axis exaggerates a tiny difference
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AI-suggested PivotTables and charts | 120 | 7 |
| M03L02 | Validating results against the raw data | 120 | 7 |

### M04 Honest conclusions (25% (design weight), design weight)

- Worked applications: (1) Write a findings paragraph that states the limitation of a small sample; (2) Distinguish correlation from causation when AI suggests a relationship
- Common misconception addressed: Reporting an AI-found correlation as if it proved cause and effect
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Writing findings with caveats and uncertainty | 120 | 7 |
| M04L02 | Avoiding bias and spurious correlation | 120 | 7 |

## Integrative case

An analyst is asked why a product line's margin fell and turns to an AI assistant: they reframe the question measurably, use AI to clean and explore the data while checking each change, validate an AI-suggested PivotTable, and write a findings note with explicit caveats rather than an over-confident claim.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2658-final-protected | 40 | 40 | yes |
| MST-2658-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Framing the question | 10 |
| AI-assisted cleaning and exploration | 10 |
| From analysis to answer | 10 |
| Honest conclusions | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2658-Q0001** (single-answer, Select ONE) An AI assistant highlights several sales figures as outliers and offers to delete them. What is the sound analytical response?

- A. Investigate each flagged value to see whether it is an error or a genuine extreme **(key)**  
  _Rationale:_ Correct: outliers may be real and meaningful; they should be understood before removal.
- B. Delete them all immediately to clean the data  
  _Rationale:_ Blind deletion can discard legitimate, important records.
- C. Ignore the flags entirely  
  _Rationale:_ Flags are worth reviewing even if not acted on automatically.
- D. Replace them with the average without checking  
  _Rationale:_ That fabricates data without understanding the cause.

**MST-2658-Q0002** (multiple-answer, Select TWO) Which TWO practices keep AI-assisted conclusions honest? (Select TWO.)

- A. State the limitations and uncertainty behind a finding **(key)**  
  _Rationale:_ Correct: honest analysis communicates caveats, not just headline numbers.
- B. Distinguish correlation from causation before claiming a cause **(key)**  
  _Rationale:_ Correct: a relationship in the data does not prove one thing caused another.
- C. Present the most dramatic interpretation to get attention  
  _Rationale:_ Exaggeration misleads decision-makers.
- D. Omit the sample size so results look stronger  
  _Rationale:_ Hiding sample size conceals real uncertainty.

**MST-2658-Q0003** (single-answer, Select ONE) You asked AI to compare this quarter with last quarter and it returns a confident percentage. Before reporting it, what is the best check?

- A. Recompute the key figure independently from the source rows **(key)**  
  _Rationale:_ Correct: an independent recomputation confirms the AI used the right data and periods.
- B. Round it to look cleaner and send it  
  _Rationale:_ Rounding does not verify correctness.
- C. Ask the AI if it is sure  
  _Rationale:_ Self-confirmation by the same tool is not independent.
- D. Assume quarter boundaries were handled correctly  
  _Rationale:_ Period boundaries are a common source of error worth checking.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
