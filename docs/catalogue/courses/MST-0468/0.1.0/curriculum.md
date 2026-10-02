# AI Product Discovery and Problem Framing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0468` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-APM-003 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Translate a business problem into a well-framed AI problem
2. Judge whether AI, and which type, is the right solution
3. Define success metrics and guardrails before building
4. Assess data readiness and feasibility early
5. Prioritise and de-risk AI opportunities with stakeholders

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 From business problem to AI problem (MASTEMY-DESIGN 20%)

- Worked applications: (1) Reframe a vague request into a precise ML task; (2) Classify three asks as prediction, decision or generation problems
- Common misconception addressed: Starting from a model idea instead of the problem
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Problem framing and the job to be done | 96 | 8 |
| M01L02 | Prediction versus decision versus generation framing | 96 | 8 |

### M02 Is AI the right tool? (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide rules versus ML for a routing problem; (2) Choose build, buy or API for a support-summary feature
- Common misconception addressed: Defaulting to AI because it is novel
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | When rules, analytics or AI each fit | 96 | 8 |
| M02L02 | Build versus buy versus API | 96 | 8 |

### M03 Success metrics and guardrails (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define leading and lagging metrics for a recommendation feature; (2) Write guardrail metrics for a generative feature
- Common misconception addressed: Measuring model accuracy and ignoring the business outcome
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Model metrics versus product and business metrics | 96 | 8 |
| M03L02 | Guardrails, non-goals and failure costs | 96 | 8 |

### M04 Data and feasibility (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run a data-readiness check for a churn use case; (2) Design a one-week feasibility spike
- Common misconception addressed: Assuming the needed data exists and is usable without checking
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data readiness assessment | 96 | 8 |
| M04L02 | Feasibility, baselines and spikes | 96 | 8 |

### M05 Prioritisation and de-risking (MASTEMY-DESIGN 20%)

- Worked applications: (1) Score three AI opportunities in a portfolio; (2) Draft a one-page problem brief for sign-off
- Common misconception addressed: Committing to a roadmap before de-risking the hardest assumption
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Scoring opportunities on value, feasibility and risk | 96 | 8 |
| M05L02 | Discovery artifacts and stakeholder alignment | 96 | 8 |

## Integrative case

A B2B SaaS team has five AI ideas and budget for one. Frame each as an AI problem, judge fit and feasibility, define success metrics and guardrails, assess data readiness, and bring a prioritised recommendation with a problem brief to leadership.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0468-final-protected | 25 | 25 | yes |
| MST-0468-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| From business problem to AI problem | 5 |
| Is AI the right tool? | 5 |
| Success metrics and guardrails | 5 |
| Data and feasibility | 5 |
| Prioritisation and de-risking | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0468-Q0001** (single-answer, Select ONE) What is the best first step in AI product discovery?

- A. Define the problem and the job to be done **(key)**  
  _Rationale:_ Correct: framing the problem precedes any solution choice.
- B. Pick a model architecture  
  _Rationale:_ Architecture choice is premature before framing.
- C. Collect the largest possible dataset  
  _Rationale:_ Data collection without a framed problem is wasteful.
- D. Choose a cloud vendor  
  _Rationale:_ Infrastructure is not the first discovery step.

**MST-0468-Q0002** (multiple-answer, Select TWO) Which TWO belong in a success definition set before building? (Select TWO.)

- A. A business or product metric **(key)**  
  _Rationale:_ Correct: success must tie to a business outcome.
- B. Guardrail metrics and explicit non-goals **(key)**  
  _Rationale:_ Correct: guardrails bound acceptable behaviour.
- C. The final model's trained weights  
  _Rationale:_ Weights are an output, not a success definition.
- D. Only the GPU budget  
  _Rationale:_ Cost alone does not define success.

**MST-0468-Q0003** (single-answer, Select ONE) A simple rule reliably solves the task. Choosing a complex ML model instead is…

- A. Unjustified added risk and cost **(key)**  
  _Rationale:_ Correct: prefer the simplest solution that works.
- B. Always better  
  _Rationale:_ Complexity is not inherently better.
- C. Required to count as AI  
  _Rationale:_ The goal is solving the problem, not using AI.
- D. The only option available  
  _Rationale:_ The rule is a viable option.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
