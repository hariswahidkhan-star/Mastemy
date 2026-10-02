# Microsoft AB-730: AI Business Professional

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0188` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AB-730 |
| Version basis | Skills measured as of 2026-10-20 (published ahead of effective date; candidates sitting before that date use the prior outline, which this spec does not cover - route by exam date) |
| Evidence | **verified-official-source** - sources: SRC-MS-AB730 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 56 / module checks 84 / cumulative 100 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

Split note: Split adjusted from default 5/7/8% to lesson 56 / module 84 / cumulative 100 min so the required cumulative forms fit; total assessment stays 240 min (20%).

## Learning outcomes

1. Explain how Microsoft 365 Copilot uses context such as Work IQ, web data and the current app, and when to use Copilot Chat, agents or Copilot Cowork
2. Identify AI risks (inaccuracy, prompt injection, over-reliance, sensitive data) and choose verification steps
3. Create, refine, save, schedule and share prompts, and manage chats and notebooks
4. Generate and analyse business content across Word, Excel and PowerPoint and validate it against business goals
5. Use meeting features (preparation, Facilitator agent, catch-up, Intelligent recap, Pages)
6. Choose prebuilt agents vs custom agents and delegate multi-step tasks to Copilot Cowork with review

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Understand generative AI fundamentals (25-30%)

- Worked applications: (1) Decide between Copilot Chat, an agent and Cowork for four tasks; (2) Spot a prompt-injection instruction hidden in a shared document
- Common misconception addressed: Believing Copilot can see data the user has no permission to open
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Understand generative AI capabilities across Microsoft 365 experiences | 139 | 7 |
| M01L02 | Identify responsible AI and data protection practices | 139 | 7 |

### M02 Manage prompts and chats by using Microsoft 365 Copilot (20-25%)

- Worked applications: (1) Rewrite a vague prompt with goal, context, source and expectations; (2) Schedule a weekly status prompt and share it with a team
- Common misconception addressed: Assuming saved prompts keep working unchanged when sources move
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Create and manage prompts in Microsoft 365 Copilot | 114 | 7 |
| M02L02 | Manage chats in Microsoft 365 Copilot | 114 | 7 |

### M03 Manage business content and collaboration by using Microsoft 365 Copilot (20-25%)

- Worked applications: (1) Draft a memo from a spreadsheet and two emails, then check every number; (2) Use Intelligent recap to produce an action list and validate owners
- Common misconception addressed: Treating a meeting recap as an accurate record without review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Draft and analyze business content by using Microsoft 365 Copilot | 113 | 7 |
| M03L02 | Manage meetings and collaboration by using Microsoft 365 Copilot | 114 | 7 |

### M04 Drive business outcomes by using agents (20-25%)

- Worked applications: (1) Choose a prebuilt agent vs a custom agent for an onboarding workflow; (2) Review a Cowork plan before letting it act and correct one step
- Common misconception addressed: Assuming delegated agent work needs no human review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Select and apply prebuilt Microsoft 365 Copilot agents | 113 | 7 |
| M04L02 | Perform business tasks by using Microsoft Copilot Cowork | 114 | 7 |

## Integrative case

A sales operations manager prepares a quarterly business review: gather CRM and email context, draft the deck and summary memo, run the review meeting, and delegate follow-up tasks to an agent, verifying every figure.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0188-practice-form-A | 45 | 45 | yes |
| MST-0188-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0188-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0188-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Understand generative AI fundamentals | 13 |
| Manage prompts and chats by using Microsoft 365 Copilot | 11 |
| Manage business content and collaboration by using Microsoft 365 Copilot | 11 |
| Drive business outcomes by using agents | 10 |

Minimum reviewed item bank: 460 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0188-Q0001** (single-answer, Select ONE) A user asks Microsoft 365 Copilot to summarise a confidential HR file stored in a SharePoint site they cannot open. What happens?

- A. Copilot summarises it because Copilot has tenant-wide access  
  _Rationale:_ Copilot works within the signed-in user's existing permissions; it does not bypass them.
- B. Copilot cannot use that file because responses are limited to content the user can already access **(key)**  
  _Rationale:_ Correct: the study guide's privacy objective covers how Copilot keeps organisational information private; access follows user permissions.
- C. Copilot summarises it but removes names  
  _Rationale:_ There is no automatic redaction that grants access to unauthorised content.
- D. Copilot asks the file owner for approval  
  _Rationale:_ Copilot has no built-in approval request for this situation.

**MST-0188-Q0002** (multiple-answer, Select TWO) A draft produced by Copilot cites revenue figures for a client report. Which TWO steps are appropriate verification before sending? (Select TWO.)

- A. Open the cited source documents and check each figure **(key)**  
  _Rationale:_ Correct: citation checks are one of the verification steps named in the skills outline.
- B. Ask Copilot whether its figures are correct and accept its answer  
  _Rationale:_ Self-assessment by the same tool is not independent verification.
- C. Have a colleague responsible for the account review the numbers **(key)**  
  _Rationale:_ Correct: human review is a named verification practice for consequential content.
- D. Send it, since grounded responses are always accurate  
  _Rationale:_ Grounding reduces but does not eliminate inaccuracies; the outline lists inaccuracy as a risk.

**MST-0188-Q0003** (single-answer, Select ONE) Your team runs the same project-status prompt every Monday. Which feature best fits?

- A. Schedule the prompt **(key)**  
  _Rationale:_ Correct: scheduling a prompt is listed under 'Create and manage prompts'.
- B. Delete and recreate the chat each week  
  _Rationale:_ That loses history and saves no effort.
- C. Rename the chat  
  _Rationale:_ Renaming helps find a chat but does not run anything.
- D. Convert it into a Copilot Page  
  _Rationale:_ Pages are collaborative content, not a scheduler.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
