# Custom GPT Design, Testing, and Governance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0474` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Custom GPT Design, Testing, and Governance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design a custom GPT with clear instructions, scope and conversation starters
2. Add knowledge files and configure tools or actions for a custom GPT
3. Test a custom GPT against representative tasks and edge cases
4. Govern custom GPTs with sharing controls, review and versioning

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Designing, building and governing a custom GPT in a real workspace is taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded builds or peer review.

## Modules

### M01 Designing a custom GPT (25%)

- Worked applications: (1) Write an instruction block for a support-triage GPT; (2) Draft three conversation starters for a given role
- Common misconception addressed: Thinking a longer instruction always beats a focused, scoped one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining purpose and instructions | 120 | 6 |
| M01L02 | Conversation starters and scope | 120 | 6 |

### M02 Knowledge and tools (25%)

- Worked applications: (1) Choose which documents belong in knowledge and which to leave out; (2) Decide when an action or API call is needed instead of a knowledge file
- Common misconception addressed: Treating uploaded knowledge files as always current and authoritative
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Adding knowledge files | 120 | 6 |
| M02L02 | Configuring actions and tools | 120 | 6 |

### M03 Testing a custom GPT (25%)

- Worked applications: (1) Write five test prompts covering typical and edge cases; (2) Diagnose a GPT that answers outside its scope
- Common misconception addressed: Assuming one or two successful chats prove the GPT is reliable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Building a test set | 120 | 6 |
| M03L02 | Probing edge cases and failures | 120 | 6 |

### M04 Governance and sharing (25%)

- Worked applications: (1) Choose a sharing setting for an internal-only GPT; (2) Plan a review and version step before an update
- Common misconception addressed: Publishing a GPT workspace-wide with no review or named owner
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sharing controls and access | 120 | 6 |
| M04L02 | Review, versioning and change control | 120 | 6 |

## Integrative case

A firm builds an internal policy-helper custom GPT: the team writes scoped instructions and starters, curates knowledge files, decides where an action is needed, builds a test set covering edge cases, then sets sharing to internal-only with a named owner and a versioned review before each update.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0474-final-protected | 72 | 72 | yes |
| MST-0474-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Designing a custom GPT | 18 |
| Knowledge and tools | 18 |
| Testing a custom GPT | 18 |
| Governance and sharing | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0474-Q0001** (single-answer, Select ONE) What is the main purpose of a custom GPT's instruction block?

- A. To define the GPT's purpose, scope and behaviour clearly **(key)**  
  _Rationale:_ Correct: instructions set purpose, scope and how the GPT should behave.
- B. To store the conversation history permanently  
  _Rationale:_ Instructions configure behaviour; they do not store history.
- C. To reduce the cost of each message  
  _Rationale:_ Instructions are about behaviour, not billing.
- D. To replace the need for any testing  
  _Rationale:_ Instructions do not remove the need to test the GPT.

**MST-0474-Q0002** (single-answer, Select ONE) When should a custom GPT use an action or API call instead of a knowledge file?

- A. When it needs live or frequently changing data the file cannot hold **(key)**  
  _Rationale:_ Correct: actions fetch live data; knowledge files are static snapshots.
- B. Always, because actions are better than files  
  _Rationale:_ Actions are not always better; static reference belongs in knowledge files.
- C. Never, because files can hold any data  
  _Rationale:_ Files are static and cannot hold live or changing data.
- D. Only when no knowledge files exist  
  _Rationale:_ The choice depends on whether data is live, not on file count.

**MST-0474-Q0003** (multiple-answer, Select TWO) Which TWO governance controls should be in place before sharing a custom GPT across a workspace? (Select TWO)

- A. A named owner responsible for the GPT **(key)**  
  _Rationale:_ Correct: a named owner is accountable for the GPT.
- B. A review step before publishing or updating **(key)**  
  _Rationale:_ Correct: review before release catches scope and safety issues.
- C. Removing all instructions to keep it flexible  
  _Rationale:_ Removing instructions removes scope and control.
- D. Giving every user edit rights by default  
  _Rationale:_ Unrestricted edit rights undermine governance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
