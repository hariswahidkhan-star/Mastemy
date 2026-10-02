# Claude for Product Management and Requirements Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0523` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude product and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-PRODUCT-MGMT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude for Product Management and Requirements Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Capture underlying needs rather than surface feature requests
2. Write user stories with testable acceptance criteria
3. Prioritise requirements against value and effort and defend the result
4. Maintain traceability and verify requirements against real intent
5. Communicate a requirements plan and surface assumptions clearly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Capturing needs (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Turn raw stakeholder notes into a structured list of needs; (2) Separate a stated solution from the underlying need
- Common misconception addressed: Recording a requested feature as a need without finding the problem
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From stakeholder input to needs | 72 | 5 |
| M01L02 | Need versus solution | 72 | 5 |

### M02 User stories and criteria (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a user story with clear acceptance criteria; (2) Turn a vague story into a testable one
- Common misconception addressed: Writing acceptance criteria that cannot be tested
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing effective user stories | 96 | 5 |
| M02L02 | Testable acceptance criteria | 96 | 5 |

### M03 Prioritisation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Prioritise a backlog against value and effort; (2) Justify why one item outranks another
- Common misconception addressed: Prioritising by who shouted loudest rather than by value
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Prioritisation methods | 80 | 5 |
| M03L02 | Making and defending trade-offs | 80 | 5 |
| M03L03 | Communicating a prioritised plan | 80 | 5 |

### M04 Traceability and verification (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Trace each requirement back to a stakeholder need; (2) Verify a drafted requirement reflects what the stakeholder meant
- Common misconception addressed: Assuming an AI-drafted requirement matches the stakeholder's intent
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Requirement-to-need traceability | 96 | 5 |
| M04L02 | Verifying intent with stakeholders | 96 | 5 |

### M05 Communicating the plan (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Summarise a requirements set for engineering and for executives; (2) Document open questions and assumptions
- Common misconception addressed: Presenting assumptions as confirmed decisions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Tailoring the message by audience | 96 | 5 |
| M05L02 | Recording assumptions and open questions | 96 | 5 |

## Integrative case

A product manager uses Claude to turn scattered stakeholder input into a crisp requirements set: capture needs, write clear user stories and acceptance criteria, prioritise, and keep a traceable link from need to requirement.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0523-final-protected | 30 | 40 | yes |
| MST-0523-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Capturing needs | 5 |
| User stories and criteria | 6 |
| Prioritisation | 7 |
| Traceability and verification | 6 |
| Communicating the plan | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0523-Q0001** (single-answer, Select ONE) A stakeholder says 'we need a dropdown here'. What should a PM capture first?

- A. The underlying need the dropdown is meant to solve **(key)**  
  _Rationale:_ Correct: a requested solution often hides the real need, which should be captured first.
- B. The exact colour of the dropdown  
  _Rationale:_ Visual detail is premature.
- C. Only the literal dropdown request  
  _Rationale:_ Recording the solution as the need misses the problem.
- D. Nothing, since the solution is given  
  _Rationale:_ The need still must be understood.

**MST-0523-Q0002** (multiple-answer, Select TWO) Which TWO make acceptance criteria effective? (Select TWO.)

- A. They are testable **(key)**  
  _Rationale:_ Correct: criteria must be checkable to be useful.
- B. They state observable conditions for done **(key)**  
  _Rationale:_ Correct: clear done-conditions prevent ambiguity.
- C. They are vague to allow flexibility  
  _Rationale:_ Vague criteria cannot be verified.
- D. They describe the implementation in code  
  _Rationale:_ Criteria describe behaviour, not implementation detail.

**MST-0523-Q0003** (single-answer, Select ONE) Claude drafts a requirement from your notes. Before adding it to the backlog, you should:

- A. Verify it reflects what the stakeholder actually meant **(key)**  
  _Rationale:_ Correct: AI-drafted requirements must be checked against real intent.
- B. Assume it matches intent because it reads well  
  _Rationale:_ Readability is not the same as correctness of intent.
- C. Delete the original note  
  _Rationale:_ The note is needed for traceability.
- D. Mark it done  
  _Rationale:_ Drafting is not completion.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
