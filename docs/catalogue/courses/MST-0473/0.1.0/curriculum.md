# ChatGPT Projects and Reusable Team Knowledge

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0473` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **DESIGN ASSUMPTION** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT Projects and Reusable Team Knowledge (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up a project workspace with shared instructions
2. Use uploaded reference material as reusable team knowledge
3. Make project outputs consistent and shareable across a team
4. Apply confidentiality, accuracy and human-review controls to the workflow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of ChatGPT, the quality of live AI outputs, and professional judgement on accepting AI suggestions are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 Projects and custom instructions (25%, design assumption)

- Worked applications: (1) Create a project with instructions that fix tone and output format; (2) Separate project-level from chat-level instructions
- Common misconception addressed: Thinking project instructions apply retroactively to unrelated past chats
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a Project is and when to use one | 80 | 6 |
| M01L02 | Writing custom instructions | 80 | 6 |
| M01L03 | Organising chats within a project | 80 | 6 |

### M02 Project knowledge and files (25%, design assumption)

- Worked applications: (1) Load a policy document so answers quote it consistently; (2) Decide what belongs in project files versus a single chat
- Common misconception addressed: Assuming uploaded files are always perfectly searched and never need verification
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Adding and updating reference files | 80 | 6 |
| M02L02 | Grounding answers in project files | 80 | 6 |
| M02L03 | Keeping knowledge current | 80 | 6 |

### M03 Reuse and consistency (25%, design assumption)

- Worked applications: (1) Create a reusable template prompt for a recurring deliverable; (2) Standardise output so two teammates get comparable results
- Common misconception addressed: Believing every teammate will get identical output without shared instructions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reusable prompts and templates | 80 | 6 |
| M03L02 | Sharing and collaboration | 80 | 6 |
| M03L03 | Versioning project knowledge | 80 | 6 |

### M04 Govern and review AI output (25%, design assumption)

- Worked applications: (1) Draft a rule for what information may be pasted into ChatGPT for this task; (2) Design a human review checkpoint before the output is used or sent
- Common misconception addressed: Assuming AI output is accurate and confidential by default without any review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Confidentiality and data handling | 80 | 6 |
| M04L02 | Accuracy, bias and disclosure | 80 | 6 |
| M04L03 | Human-in-the-loop review and sign-off | 80 | 6 |

## Integrative case

A team lead sets up a ChatGPT Project for a support team: load reference files, write shared custom instructions, and define who may change the project knowledge so answers stay consistent and current.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0473-final-protected | 72 | 72 | yes |
| MST-0473-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Projects and custom instructions | 18 |
| Project knowledge and files | 18 |
| Reuse and consistency | 18 |
| Govern and review AI output | 18 |

Minimum reviewed item bank: 456 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0473-Q0001** (single-answer, Select ONE) Why put a company style guide into Project files rather than pasting it into each chat?

- A. It is reused automatically across the project's chats **(key)**  
  _Rationale:_ Correct: project knowledge is available to every chat in the project, giving consistent grounding without re-pasting.
- B. It permanently trains the base model  
  _Rationale:_ Uploading a file does not retrain the underlying model.
- C. It guarantees zero errors  
  _Rationale:_ Grounding improves consistency but does not guarantee the output is error-free.
- D. It hides the content from the user  
  _Rationale:_ Project files are used to inform answers, not to hide content from members.

**MST-0473-Q0002** (single-answer, Select ONE) Two teammates get different tones from the same project. What most likely fixes it?

- A. Setting tone in shared project custom instructions **(key)**  
  _Rationale:_ Correct: shared instructions standardise tone for everyone using the project.
- B. Each person switching models randomly  
  _Rationale:_ Random model changes increase variation rather than standardising it.
- C. Deleting the project files  
  _Rationale:_ Removing grounding does not standardise tone and loses reference material.
- D. Making prompts shorter  
  _Rationale:_ Shorter prompts do not by themselves enforce a consistent tone.

**MST-0473-Q0003** (multiple-answer, Select TWO) Which TWO belong in a Project rather than a one-off chat? (Select TWO)

- A. A reference policy reused across many questions **(key)**  
  _Rationale:_ Correct: durable, reused reference material is exactly what project knowledge is for.
- B. Shared custom instructions for the whole team **(key)**  
  _Rationale:_ Correct: team-wide instructions belong at project level so all chats inherit them.
- C. A single throwaway rewrite request  
  _Rationale:_ A one-off task does not need to be stored as reusable project knowledge.
- D. A private unrelated personal note  
  _Rationale:_ Unrelated personal content does not belong in a shared team project.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
