# AI Workflow Orchestration with Make

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0622` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — AI Workflow Orchestration with Make (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build Make scenarios with modules, routes and filters
2. Integrate AI and app modules with data mapping
3. Handle errors, routers and aggregators
4. Manage connections, scheduling and operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Scenario basics (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Build a scenario with a trigger module and two action modules; (2) Map output bundles from one module into another
- Common misconception addressed: Assuming modules share data without mapping fields between bundles
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Modules and scenarios | 80 | 5 |
| M01L02 | Mapping and bundles | 80 | 5 |
| M01L03 | Filters and conditions | 80 | 5 |

### M02 AI and routing (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add an AI module and feed it mapped data; (2) Use a router to branch on a result
- Common misconception addressed: Trusting AI output without validating it before downstream modules
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI and app modules | 80 | 5 |
| M02L02 | Routers and branching | 80 | 5 |
| M02L03 | Aggregators and iterators | 80 | 5 |

### M03 Errors and operations (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add an error handler with a retry to a failing module; (2) Schedule the scenario and secure its connections
- Common misconception addressed: Leaving no error handler so one failed module stops the whole scenario silently
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Error handlers and rollback | 80 | 5 |
| M03L02 | Scheduling and operations | 80 | 5 |
| M03L03 | Connections and secrets | 80 | 5 |

## Integrative case

A team automates an AI-assisted process in Make: assemble a scenario from modules, map data between them, route and filter on conditions, call an AI module, aggregate results, add error handling, and schedule and secure the scenario for production.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0622-final-protected | 30 | 30 | yes |
| MST-0622-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scenario basics | 10 |
| AI and routing | 10 |
| Errors and operations | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0622-Q0001** (single-answer, Select ONE) In Make, what does mapping do between two modules?

- A. It routes specific fields from one module's output bundle into another module's input **(key)**  
  _Rationale:_ Correct: mapping explicitly connects output fields to the next module's inputs.
- B. It encrypts the whole scenario  
  _Rationale:_ Mapping is about data flow, not encryption.
- C. It schedules the scenario  
  _Rationale:_ Scheduling is separate from field mapping.
- D. It deletes unused modules  
  _Rationale:_ Mapping does not remove modules.

**MST-0622-Q0002** (multiple-answer, Select TWO) Which TWO improve a Make scenario's reliability? (Select TWO.)

- A. Error handlers with retries on modules that can fail **(key)**  
  _Rationale:_ Correct: error handling keeps one failure from silently breaking the scenario.
- B. Validating AI output before downstream modules consume it **(key)**  
  _Rationale:_ Correct: AI output is untrusted and should be checked first.
- C. Storing secrets in a text field inside a module  
  _Rationale:_ Secrets belong in secured connections, not plain fields.
- D. Removing all filters so everything always runs  
  _Rationale:_ Dropping filters runs modules on data they should skip.

**MST-0622-Q0003** (single-answer, Select ONE) You need a scenario to take different paths depending on an AI classification result. Which module fits?

- A. A router that branches on the condition **(key)**  
  _Rationale:_ Correct: a router sends the flow down different paths based on a condition.
- B. An aggregator that merges bundles  
  _Rationale:_ An aggregator combines data; it does not branch.
- C. A scheduler  
  _Rationale:_ Scheduling controls when it runs, not conditional paths.
- D. A connection  
  _Rationale:_ A connection stores credentials, not branching logic.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
