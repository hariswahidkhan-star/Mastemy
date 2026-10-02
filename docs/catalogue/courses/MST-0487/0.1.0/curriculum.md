# ChatGPT for Product Requirements and User Stories

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0487` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT for Product Requirements and User Stories (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Draft and refine product requirement documents with ChatGPT while keeping a human owner accountable
2. Generate well-formed user stories with acceptance criteria from source material
3. Use ChatGPT to find gaps, edge cases and conflicting requirements before development
4. Apply review, traceability and confidentiality controls to AI-drafted product artefacts

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on authoring in ChatGPT, the real quality and completeness of drafted requirements, and professional product judgement on accepting AI suggestions are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded artefacts or peer review.

## Modules

### M01 Turn discovery notes into a structured PRD (25%)

- Worked applications: (1) Convert a page of raw discovery notes into a one-page problem statement; (2) Rewrite a vague feature idea into a scoped PRD section with goals and non-goals
- Common misconception addressed: Treating an AI-drafted PRD as approved without a named human owner
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From interview notes to a problem statement | 120 | 6 |
| M01L02 | Structuring a PRD: goals, scope, non-goals | 120 | 6 |

### M02 Writing user stories and acceptance criteria (25%)

- Worked applications: (1) Draft three user stories with acceptance criteria from a feature brief; (2) Split a large epic into independently testable stories
- Common misconception addressed: Writing acceptance criteria that cannot be objectively verified
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Story format: role, need, value | 120 | 6 |
| M02L02 | Writing testable acceptance criteria (Given/When/Then) | 120 | 6 |

### M03 Finding gaps, edge cases and conflicts (25%)

- Worked applications: (1) Ask ChatGPT to list edge cases for a checkout flow and triage them; (2) Spot two requirements that contradict each other in a backlog
- Common misconception addressed: Assuming the model has surfaced every edge case because it produced a long list
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Prompting for edge cases and failure paths | 120 | 6 |
| M03L02 | Detecting conflicting or duplicate requirements | 120 | 6 |

### M04 Governing AI-drafted requirements (25%)

- Worked applications: (1) Add source references to each generated story for traceability; (2) Define a review checkpoint before a story enters a sprint
- Common misconception addressed: Pasting confidential customer data into a consumer chat without a data-handling rule
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Traceability from story to source | 120 | 6 |
| M04L02 | Confidentiality and a human sign-off step | 120 | 6 |

## Integrative case

A product manager at a B2B SaaS company must turn a week of customer-discovery interviews into a reviewed PRD and a sprint-ready backlog of user stories, keeping each story traceable to its source, flagging conflicting requirements, and defining a human sign-off before any story is committed to development.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0487-final-protected | 72 | 72 | yes |
| MST-0487-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Turn discovery notes into a structured PRD | 18 |
| Writing user stories and acceptance criteria | 18 |
| Finding gaps, edge cases and conflicts | 18 |
| Governing AI-drafted requirements | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0487-Q0001** (single-answer, Select ONE) A stakeholder asks ChatGPT to 'write the PRD'. What is the most important control before that PRD is used to plan work?

- A. A named human owner reviews and approves the content **(key)**  
  _Rationale:_ Correct: a human owner must remain accountable for AI-drafted requirements before they drive work.
- B. The PRD is at least five pages long  
  _Rationale:_ Length is not a quality or accountability control.
- C. The prompt used the word 'professional'  
  _Rationale:_ Wording of the prompt does not make the output correct or approved.
- D. The model used its newest version  
  _Rationale:_ Model version does not substitute for human review and sign-off.

**MST-0487-Q0002** (single-answer, Select ONE) Which acceptance criterion is written so a tester can objectively verify it?

- A. Given a logged-out user, when they submit valid credentials, then they land on the dashboard within 2 seconds **(key)**  
  _Rationale:_ Correct: it states precondition, action and an observable, measurable result.
- B. The login should feel fast and friendly  
  _Rationale:_ 'Fast and friendly' is subjective and not objectively testable.
- C. Users will like the new login  
  _Rationale:_ A preference is not a verifiable criterion.
- D. Login works well  
  _Rationale:_ 'Works well' has no measurable condition to test against.

**MST-0487-Q0003** (multiple-answer, Select TWO) Which TWO practices keep an AI-drafted backlog traceable and trustworthy? (Select TWO)

- A. Link each generated user story back to its source note or interview **(key)**  
  _Rationale:_ Correct: traceability lets a reviewer confirm each story reflects real evidence.
- B. Record which requirements a human reviewer has approved **(key)**  
  _Rationale:_ Correct: an explicit approval record keeps accountability with a person, not the model.
- C. Delete the source notes once stories are generated  
  _Rationale:_ Deleting sources destroys traceability and the ability to verify stories.
- D. Accept the longest story list the model produces  
  _Rationale:_ Quantity is not evidence of correctness or completeness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

