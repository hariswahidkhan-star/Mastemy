# Multi-Model ChatGPT, Claude, and Gemini: Comparative Review System

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0820` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Multi-Model ChatGPT, Claude, and Gemini: Comparative Review System (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a fair comparative-review of multiple models
2. Hold prompts, context and settings constant across models
3. Score outputs with a rubric and reduce bias
4. Characterise model strengths, failure modes and trade-offs
5. Report evidence-based recommendations with caveats

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Comparative review scope (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define a rubric for comparing model outputs on a task; (2) Choose tasks that reveal real differences between models
- Common misconception addressed: Declaring a winner from a single prompt on one task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why compare multiple models | 120 | 7 |
| M01L02 | Defining tasks, criteria and rubrics | 120 | 7 |

### M02 Prompt and task parity (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run the same prompt across three models under equal settings; (2) Repeat runs to account for output variability
- Common misconception addressed: Comparing models with different prompts or settings
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Holding prompts and context constant | 120 | 7 |
| M02L02 | Controlling for randomness and settings | 120 | 7 |

### M03 Structured evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Score outputs against the rubric without knowing the model; (2) Aggregate scores across tasks and reviewers
- Common misconception addressed: Letting brand preference bias the scoring
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scoring against the rubric | 120 | 7 |
| M03L02 | Blind and reviewer-based scoring | 120 | 7 |

### M04 ChatGPT, Claude and Gemini traits (MASTEMY-DESIGN 20%)

- Worked applications: (1) Summarise where each model performed best and worst; (2) Weigh capability against cost and context limits
- Common misconception addressed: Assuming one model is best for every task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Comparing strengths and failure modes | 120 | 7 |
| M04L02 | Cost, context and capability trade-offs | 120 | 7 |

### M05 Reporting and decision (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a recommendation tied to the scored evidence; (2) State the scope and when results should be re-tested
- Common misconception addressed: Presenting a comparison as permanent when models change often
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Evidence-based recommendations | 120 | 7 |
| M05L02 | Caveats, scope and re-test cadence | 120 | 7 |

## Integrative case

Build a comparative review system: define a rubric and tasks, run identical prompts across ChatGPT, Claude and Gemini under equal settings with repeats, score outputs blind against the rubric, summarise each model's strengths and trade-offs, and write a recommendation that states its scope and re-test cadence.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0820-final-protected | 40 | 50 | yes |
| MST-0820-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Comparative review scope | 8 |
| Prompt and task parity | 8 |
| Structured evaluation | 8 |
| ChatGPT, Claude and Gemini traits | 8 |
| Reporting and decision | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0820-Q0001** (single-answer, Select ONE) To compare three models fairly on a task, what must be held constant?

- A. The prompt, context and generation settings across all models **(key)**  
  _Rationale:_ Correct: parity in inputs isolates model differences from setup differences.
- B. Nothing; any comparison is valid  
  _Rationale:_ Uncontrolled inputs confound the comparison.
- C. Only the model names  
  _Rationale:_ Names are not the variable being controlled.
- D. A different prompt for each model  
  _Rationale:_ Different prompts make results incomparable.

**MST-0820-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce bias in scoring model outputs? (Select TWO.)

- A. Score outputs blind to which model produced them **(key)**  
  _Rationale:_ Correct: blind scoring removes brand preference.
- B. Score against a defined rubric **(key)**  
  _Rationale:_ Correct: a rubric makes scoring consistent and defensible.
- C. Score based on which company you prefer  
  _Rationale:_ Preference is exactly the bias to remove.
- D. Use one prompt on one task to decide  
  _Rationale:_ A single prompt is too thin to generalise.

**MST-0820-Q0003** (single-answer, Select ONE) Why state a re-test cadence in a model-comparison report?

- A. Models change frequently, so results can go stale **(key)**  
  _Rationale:_ Correct: a comparison is a snapshot and should be revisited.
- B. Because the report is permanent and never changes  
  _Rationale:_ Model behaviour and pricing change over time.
- C. Because it removes the need for a rubric  
  _Rationale:_ The rubric is still needed for each re-test.
- D. Because one model is always best forever  
  _Rationale:_ Relative performance shifts as models update.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
