# Automation with AI and No-Code Tools

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1391` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-AANCT-001 |
| Planned time | T = 480 min; instruction I = 384 min (80%); assessment A = 96 min (20%) |
| Assessment split | lesson checks 24 / module checks 34 / cumulative 38 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify automatable tasks and map a workflow
2. Build automations with no-code and low-code tools and AI
3. Integrate AI steps such as extraction and classification into automations
4. Test, monitor and govern automations safely

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Foundations of AI automation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Score three tasks for automation suitability; (2) Map a manual workflow into triggers, actions and decisions
- Common misconception addressed: Automating a broken process instead of fixing it first
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Spotting automatable work and mapping workflows | 48 | 6 |
| M01L02 | The no-code and low-code AI tool landscape | 48 | 6 |
### M02 Building automations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design a trigger-action flow across two apps; (2) Add an AI extraction step to classify incoming email
- Common misconception addressed: Thinking an AI step removes the need to handle errors
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Triggers, actions and connectors | 48 | 6 |
| M02L02 | Adding AI steps: prompts, extraction, classification | 48 | 6 |
### M03 Data and integration (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map fields between two app schemas; (2) Design retry and fallback handling for a flaky step
- Common misconception addressed: Assuming data formats always line up between connected apps
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Moving data between apps and formats | 48 | 6 |
| M03L02 | Handling errors, retries and edge cases | 48 | 6 |
### M04 Reliability and governance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write a test and monitoring plan for an automation; (2) Set security, access and cost guardrails for a workflow
- Common misconception addressed: Shipping an automation with no monitoring or cost limits
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Testing and monitoring automations | 48 | 6 |
| M04L02 | Security, cost and governance | 48 | 6 |

## Integrative case

A small operations team is drowning in repetitive inbox-to-spreadsheet work. Map the workflow, choose no-code and AI building blocks, design an automation with an AI extraction step, and plan how to test, monitor and govern it.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1391-final-protected | 20 | 20 | yes |
| MST-1391-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations of AI automation | 5 |
| Building automations | 5 |
| Data and integration | 5 |
| Reliability and governance | 5 |

Minimum reviewed item bank: 204 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-1391-Q0001** (single-answer, Select ONE) Which task is the best candidate for automation?

- A. A rare one-off task that changes every time  
  _Rationale:_ Low volume and high variability make automation poor value.
- B. A high-volume, repetitive task with consistent steps **(key)**  
  _Rationale:_ Correct: repetitive, stable tasks give the best automation return.
- C. A task requiring sensitive human judgement each time  
  _Rationale:_ Judgement-heavy tasks are poor automation candidates.
- D. A task no one understands or has mapped  
  _Rationale:_ Unmapped, broken processes should be fixed first.

**MST-1391-Q0002** (multiple-answer, Select TWO) Which TWO belong in a safe automation's governance? (Select TWO.)

- A. Access controls on who can edit the automation **(key)**  
  _Rationale:_ Correct: access control limits unsafe changes.
- B. A cost or usage limit with alerts **(key)**  
  _Rationale:_ Correct: cost limits prevent runaway spend.
- C. Removing all logging to save storage  
  _Rationale:_ Logging is needed to monitor and debug.
- D. Letting anyone change production flows freely  
  _Rationale:_ Unrestricted changes are a governance risk.

**MST-1391-Q0003** (single-answer, Select ONE) An automation step sometimes fails because an external API times out. What is the best design response?

- A. Add retries with backoff and a fallback path **(key)**  
  _Rationale:_ Correct: this handles transient failures gracefully.
- B. Assume the API never fails and ignore it  
  _Rationale:_ Ignoring failures makes the automation fragile.
- C. Delete the step so it cannot fail  
  _Rationale:_ Removing needed functionality is not a fix.
- D. Run the whole flow again from scratch every time  
  _Rationale:_ Full restarts are wasteful and may duplicate work.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
