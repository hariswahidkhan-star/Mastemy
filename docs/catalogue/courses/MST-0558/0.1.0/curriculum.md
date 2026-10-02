# Cursor for Java and Spring Boot Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0558` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0558 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor for Java and Spring Boot Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up Cursor for a Maven or Gradle Spring Boot project
2. Generate Spring Boot controllers, services and repositories with AI assistance
3. Run agent-driven feature work across web, service and data layers with review
4. Generate and judge JUnit and slice tests in the Cursor loop
5. Deliver AI-assisted Java responsibly with review, attribution and secret care

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Cursor set-up for Java and Spring Boot (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Index a Spring Boot repo and confirm context; (2) Choose a surface for a controller edit versus a feature
- Common misconception addressed: Expecting Cursor to infer build configuration it cannot see
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Editor surfaces and indexing a Maven or Gradle project | 72 | 5 |
| M01L02 | Giving Cursor the right Spring Boot context | 72 | 5 |

### M02 Generating Spring Boot components (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Generate a REST controller with a service and repository; (2) Add configuration and inject a new dependency
- Common misconception addressed: Accepting generated beans without checking wiring and scope
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating controllers, services and repositories with AI | 96 | 5 |
| M02L02 | Wiring dependency injection and configuration | 96 | 5 |

### M03 Agent-driven feature work across layers (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add an endpoint that spans controller, service and entity; (2) Reject an agent change that broke transaction boundaries
- Common misconception addressed: Letting the agent edit entities without reviewing schema impact
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scoping an agent task across web, service and data layers | 80 | 5 |
| M03L02 | Reviewing cross-layer diffs and transactions | 80 | 5 |
| M03L03 | Rolling back an agent change that broke a layer | 80 | 5 |

### M04 Testing Spring Boot with Cursor (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Generate a JUnit test for a service and run it; (2) Feed a stack trace back for a targeted fix
- Common misconception addressed: Trusting generated mocks without verifying the behaviour tested
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Generating JUnit and slice tests | 96 | 5 |
| M04L02 | Using test and stack-trace output to drive fixes | 96 | 5 |

### M05 Responsible Java delivery (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review an AI-written change before merging; (2) Decide what not to delegate in a security-sensitive class
- Common misconception addressed: Treating compiling code as evidence that it is correct
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Keeping credentials and config secrets out of prompts | 96 | 5 |
| M05L02 | Human review and attribution for AI-written Java | 96 | 5 |

## Integrative case

A team adds an endpoint to a Spring Boot service with Cursor: index the Gradle project, scope an agent task across controller, service and entity, review transaction-affecting diffs, generate and run JUnit tests, and merge only after human review with AI attribution recorded.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0558-final-protected | 30 | 40 | yes |
| MST-0558-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cursor set-up for Java and Spring Boot | 5 |
| Generating Spring Boot components | 6 |
| Agent-driven feature work across layers | 7 |
| Testing Spring Boot with Cursor | 6 |
| Responsible Java delivery | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0558-Q0001** (single-answer, Select ONE) An agent change in Spring Boot altered transaction boundaries. What is the right response?

- A. Reject the change, re-scope the task and review the corrected diff **(key)**  
  _Rationale:_ Correct: transaction-affecting changes must be reviewed and re-scoped.
- B. Merge it since the application still starts  
  _Rationale:_ Starting is not evidence that transactions are correct.
- C. Disable transactions to avoid the problem  
  _Rationale:_ Removing transactions introduces data-integrity risk.
- D. Let the agent keep editing until tests pass  
  _Rationale:_ Blind iteration can mask the real defect.

**MST-0558-Q0002** (multiple-answer, Select TWO) Which TWO steps make AI-generated Spring Boot components trustworthy? (Select TWO.)

- A. Check bean wiring, scope and configuration after generation **(key)**  
  _Rationale:_ Correct: generated wiring can be subtly wrong and must be verified.
- B. Run and read the tests that exercise the component **(key)**  
  _Rationale:_ Correct: executing tests confirms behaviour, not just compilation.
- C. Assume injection is correct because it compiles  
  _Rationale:_ Compilation does not prove correct runtime wiring.
- D. Paste the production datasource password for context  
  _Rationale:_ Secrets must never go into prompts.

**MST-0558-Q0003** (single-answer, Select ONE) Where should datasource passwords live when working in Cursor?

- A. In externalised configuration or a secret store, never in a prompt **(key)**  
  _Rationale:_ Correct: credentials stay in configuration and out of prompts.
- B. Pasted into the chat so the agent has full context  
  _Rationale:_ Prompts should never carry live credentials.
- C. Hard-coded in the application properties committed to git  
  _Rationale:_ Committed secrets leak and cannot be rotated safely.
- D. In a code comment for convenience  
  _Rationale:_ Comments are committed source and expose the secret.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
