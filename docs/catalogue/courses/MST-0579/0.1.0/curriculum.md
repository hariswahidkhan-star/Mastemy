# Multi-Agent Software Delivery with Branch and Merge Controls

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0579` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Multi-Agent Software Delivery with Branch and Merge Controls (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Decompose delivery work into scoped tasks suitable for multiple agents
2. Assign work to agents without creating conflicting changes
3. Apply branch and merge controls that isolate and integrate agent work
4. Review and integrate combined agent output safely

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Coordinating multiple agents (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Split a feature into non-overlapping tasks for two agents; (2) Identify files likely to cause conflicts if two agents edit them
- Common misconception addressed: Giving several agents overlapping, ambiguous tasks on the same files
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Decomposing work across agents | 80 | 5 |
| M01L02 | Assigning scoped tasks safely | 80 | 5 |
| M01L03 | Preventing conflicting changes | 80 | 5 |

### M02 Branch and merge strategy (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Configure branch protection so agent branches cannot merge without checks; (2) Choose a merge order that minimises conflicts across agent branches
- Common misconception addressed: Letting agents push directly to the shared main branch
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Branch-per-agent and isolation | 80 | 5 |
| M02L02 | Merge order and conflict resolution | 80 | 5 |
| M02L03 | Protecting shared branches | 80 | 5 |

### M03 Review and integration (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Require human approval and passing integration tests before combining branches; (2) Produce an audit trail attributing each change to an agent and task
- Common misconception addressed: Assuming each agent branch passing alone means the combined result is correct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Human review gates for agent output | 80 | 5 |
| M03L02 | Integration testing of combined changes | 80 | 5 |
| M03L03 | Auditing who and what changed | 80 | 5 |

## Integrative case

A backlog is delivered by several coding agents at once. Decompose the work into scoped, non-overlapping tasks, isolate each agent on its own branch under protection, resolve merge order, and run human review and integration tests before combining the changes.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0579-final-protected | 30 | 30 | yes |
| MST-0579-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Coordinating multiple agents | 10 |
| Branch and merge strategy | 10 |
| Review and integration | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0579-Q0001** (single-answer, Select ONE) You are assigning work to three coding agents. What most reduces the risk of conflicting changes?

- A. Decompose the work into scoped tasks that touch mostly disjoint files **(key)**  
  _Rationale:_ Correct: disjoint, well-scoped tasks minimise overlapping edits and conflicts.
- B. Give all three the same broad task and merge whoever finishes first  
  _Rationale:_ Duplicated broad tasks create conflicting edits and wasted work.
- C. Let each agent edit any file it wants  
  _Rationale:_ Unbounded edits maximise conflict risk.
- D. Skip branches and have them all commit to main  
  _Rationale:_ Committing to main removes isolation and protection.

**MST-0579-Q0002** (multiple-answer, Select TWO) Which TWO controls keep multi-agent branches safe to integrate? (Select TWO.) (Select TWO.)

- A. Branch protection requiring passing checks before any agent branch merges **(key)**  
  _Rationale:_ Correct: required checks gate every branch before it enters the shared line.
- B. Human review of agent pull requests before merge **(key)**  
  _Rationale:_ Correct: human review catches issues automated checks miss.
- C. Allowing agents to adjust their own required checks  
  _Rationale:_ That removes the guardrail entirely.
- D. Merging all branches simultaneously without review  
  _Rationale:_ Simultaneous unreviewed merges invite conflicts and defects.

**MST-0579-Q0003** (single-answer, Select ONE) Each agent's branch passes its own tests. Why run integration tests before combining them?

- A. Independently passing branches can still conflict or break shared behaviour once combined **(key)**  
  _Rationale:_ Correct: integration tests catch interactions that per-branch tests cannot.
- B. Integration tests are only for single-developer projects  
  _Rationale:_ They are especially important when multiple agents change the system.
- C. Passing branches never interact  
  _Rationale:_ Combined changes frequently interact in unexpected ways.
- D. Integration testing replaces the need for human review  
  _Rationale:_ Tests and review are complementary, not substitutes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
