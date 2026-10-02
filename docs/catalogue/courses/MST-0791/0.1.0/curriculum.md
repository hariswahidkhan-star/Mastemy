# Claude + Figma + Cursor: Product Specification to Frontend

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0791` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude + Figma + Cursor: Product Specification to Frontend (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Turn a product idea into a clear, testable specification
2. Use Claude to refine the spec and surface edge cases
3. Translate the spec into a Figma design with defined states
4. Implement the frontend in Cursor against the spec and design
5. Operate the spec-to-frontend loop with review and traceability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Writing the specification (20%)

- Worked applications: (1) Rewrite a vague feature idea as testable requirements; (2) Add acceptance criteria that make 'done' unambiguous
- Common misconception addressed: Starting to design before the requirements are testable
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From idea to testable requirements | 96 | 7 |
| M01L02 | Acceptance criteria and edge cases | 96 | 7 |

### M02 Claude-assisted refinement (20%)

- Worked applications: (1) Have Claude surface edge cases the spec missed; (2) Reject a Claude suggestion that scope-creeps the feature
- Common misconception addressed: Accepting every Claude suggestion as a requirement
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting Claude to probe the spec | 96 | 7 |
| M02L02 | Judging which suggestions to accept | 96 | 7 |

### M03 Figma design from spec (20%)

- Worked applications: (1) Design the primary screen and its empty and error states; (2) Trace each design element back to a requirement
- Common misconception addressed: Designing only the happy path and ignoring edge states
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mapping requirements to screens and states | 96 | 7 |
| M03L02 | Empty, error and loading states | 96 | 7 |

### M04 Frontend in Cursor (20%)

- Worked applications: (1) Build a component to match the Figma spec and states; (2) Catch an AI-generated component that ignores an error state
- Common misconception addressed: Merging Cursor-generated code without reading it against the spec
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Implementing against the design and spec | 96 | 7 |
| M04L02 | Reviewing AI-generated code before merge | 96 | 7 |

### M05 Operating the loop (20%)

- Worked applications: (1) Trace a shipped component back to its requirement and design; (2) Handle a spec change without breaking traceability
- Common misconception addressed: Letting code drift from the spec with no record of why
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Traceability from spec to code | 96 | 7 |
| M05L02 | Review gates and change handling | 96 | 7 |

## Integrative case

A product team runs a spec-to-frontend loop: write a testable specification, use Claude to probe edge cases, design it in Figma with real states, implement in Cursor with code review, and keep traceability from requirement to shipped component.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0791-final-protected | 40 | 50 | yes |
| MST-0791-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Writing the specification | 8 |
| Claude-assisted refinement | 8 |
| Figma design from spec | 8 |
| Frontend in Cursor | 8 |
| Operating the loop | 8 |

Minimum reviewed item bank: 388 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0791-Q0001** (single-answer, Select ONE) Cursor generates a component that handles the happy path but silently ignores the spec's error state. What should you do before merging?

- A. Reject or fix it so it meets the specified error behaviour **(key)**  
  _Rationale:_ Correct: generated code must satisfy the spec, including error states.
- B. Merge it because the happy path works  
  _Rationale:_ A missing error state is a defect against the spec.
- C. Remove the error state from the spec to match the code  
  _Rationale:_ Changing the spec to fit the code abandons the requirement.
- D. Trust the generator since it compiled  
  _Rationale:_ Compiling does not mean it meets the specification.

**MST-0791-Q0002** (multiple-answer, Select TWO) Which TWO states must a data-driven screen design include beyond the happy path? (Select TWO.)

- A. An empty state when there is no data **(key)**  
  _Rationale:_ Correct: the empty state is a real user experience that must be designed.
- B. An error state when the request fails **(key)**  
  _Rationale:_ Correct: failures happen and the design must handle them.
- C. A state that only appears in the designer's preview  
  _Rationale:_ A preview-only state is not a real product state.
- D. A duplicate of the happy path in another colour  
  _Rationale:_ Recolouring the happy path does not add a needed state.

**MST-0791-Q0003** (single-answer, Select ONE) Claude proposes an extra capability that goes beyond the agreed feature scope. The right response is to:

- A. Note it separately and keep the current spec scoped **(key)**  
  _Rationale:_ Correct: out-of-scope ideas are logged, not silently absorbed.
- B. Add it to the spec because Claude suggested it  
  _Rationale:_ Model suggestions are not a reason to expand scope.
- C. Implement it immediately to save a future cycle  
  _Rationale:_ Unscoped work risks the feature and the timeline.
- D. Delete the rest of the spec and start from Claude's idea  
  _Rationale:_ Discarding agreed requirements over one suggestion is reckless.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
