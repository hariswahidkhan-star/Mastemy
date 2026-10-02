# AI Workflow Orchestration with Zapier

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0623` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — AI Workflow Orchestration with Zapier (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build Zaps with triggers, actions and filters
2. Integrate AI actions and map data between steps
3. Use paths, formatting and error handling
4. Manage connections, testing and operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Zap basics (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Build a Zap with a trigger and two action steps; (2) Map fields from the trigger into a later action
- Common misconception addressed: Assuming steps share data without explicitly mapping fields
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Triggers and actions | 80 | 5 |
| M01L02 | Mapping data between steps | 80 | 5 |
| M01L03 | Filters | 80 | 5 |

### M02 AI and paths (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add an AI action and feed it mapped data; (2) Use paths to branch on a condition
- Common misconception addressed: Trusting AI output without validating it before the next action
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI actions | 80 | 5 |
| M02L02 | Paths and branching | 80 | 5 |
| M02L03 | Formatter steps | 80 | 5 |

### M03 Operations (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add error handling for a failing step; (2) Test the Zap and secure its connections
- Common misconception addressed: Turning a Zap on without testing each step with real data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Error handling and replay | 80 | 5 |
| M03L02 | Testing steps | 80 | 5 |
| M03L03 | Connections and secrets | 80 | 5 |

## Integrative case

A team automates an AI-assisted process in Zapier: start from a trigger, add action steps including an AI step, map data between steps, branch with paths, format and validate output, add error handling, and test and secure the Zap before turning it on.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0623-final-protected | 30 | 30 | yes |
| MST-0623-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Zap basics | 10 |
| AI and paths | 10 |
| Operations | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0623-Q0001** (single-answer, Select ONE) In Zapier, how does a later action step get data from the trigger?

- A. By mapping the trigger's output fields into the action's input fields **(key)**  
  _Rationale:_ Correct: you explicitly map trigger fields into later steps.
- B. Every step automatically shares all variables globally  
  _Rationale:_ Zapier passes mapped fields, not implicit globals.
- C. Only by exporting to a spreadsheet first  
  _Rationale:_ A spreadsheet is not required to pass data between steps.
- D. It cannot; steps are fully isolated  
  _Rationale:_ Later steps can use earlier steps' output via mapping.

**MST-0623-Q0002** (multiple-answer, Select TWO) Which TWO are good practice before turning a Zap on? (Select TWO.)

- A. Test each step with real sample data **(key)**  
  _Rationale:_ Correct: testing each step catches mapping and format errors early.
- B. Store credentials in Zapier connections, not pasted into fields **(key)**  
  _Rationale:_ Correct: managed connections keep secrets out of plain-text fields.
- C. Skip testing to launch faster  
  _Rationale:_ Untested Zaps commonly fail on real data.
- D. Disable error handling for simplicity  
  _Rationale:_ Dropping error handling makes failures silent.

**MST-0623-Q0003** (single-answer, Select ONE) You want a Zap to take different actions based on an AI step's result. Which feature fits?

- A. Paths, which branch the Zap on a condition **(key)**  
  _Rationale:_ Correct: paths run different actions depending on a condition.
- B. A Formatter, which only transforms data  
  _Rationale:_ A Formatter reshapes data but does not branch.
- C. A connection, which only stores credentials  
  _Rationale:_ Connections hold credentials, not branching logic.
- D. A trigger, which only starts the Zap  
  _Rationale:_ Triggers start the Zap; they do not branch mid-flow.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
