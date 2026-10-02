# Copilot in Teams: Meeting Synthesis and Action Follow-Through

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0665` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft 365 Copilot and Teams documentation read via the Microsoft Learn MCP on 2026-10-02 (Copilot meeting summaries and intelligent recap, AI-generated notes, action items and mentions, chat and channel summarisation, speaker attribution via transcript). Copilot and intelligent recap require a Microsoft 365 Copilot or Teams Premium license and a meeting transcript; availability varies by client. |
| Official sources | https://support.microsoft.com/office/meeting-recap-in-microsoft-teams-c2e3a0fe-504f-4b2c-bf85-504938f110ef; https://learn.microsoft.com/microsoftteams/rooms/voice-recognition |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-COPILOT-TEAMS |
| Legacy IDs | none |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 40 / module checks 64 / cumulative 166 min |
| Certificate | Mastemy Certificate of Completion — Copilot in Teams: Meeting Synthesis and Action Follow-Through (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Copilot during and after meetings to summarise discussion
2. Browse intelligent recap by speaker and topic
3. Extract AI-generated notes, action items and mentions
4. Summarise Teams chats and channel conversations
5. Convert meeting outputs into tracked follow-through, with verification

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Meeting summaries and recap (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Summarise a meeting and browse recap by topic; (2) Catch up on a missed segment via speaker view
- Common misconception addressed: Expecting recap without a transcript or the required license
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Summarise meetings with Copilot | 135 | 5 |
| M01L02 | Intelligent recap by speaker and topic | 135 | 5 |

### M02 Notes, action items and mentions (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Extract action items and assign owners; (2) Find every mention of a named person
- Common misconception addressed: Assuming AI notes are complete and need no checking
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI-generated notes and action items | 135 | 5 |
| M02L02 | Name mentions and follow-ups | 135 | 5 |

### M03 Chat and channel synthesis (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Summarise a busy channel thread into decisions; (2) Answer a question with Copilot over a chat
- Common misconception addressed: Summarising a channel the user cannot access and expecting results
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Summarise chats and channels | 135 | 5 |
| M03L02 | Q&A over conversations | 135 | 5 |

### M04 Action follow-through and verification (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Turn recap actions into a tracked task list; (2) Verify an attributed decision against the transcript
- Common misconception addressed: Treating AI-attributed decisions as verified facts
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | From recap to tracked tasks | 135 | 5 |
| M04L02 | Verification and responsible use | 135 | 5 |

## Integrative case

A project lead runs a status meeting they could not fully attend: use recap to browse by speaker and topic, pull the AI-generated action items, assign owners and due dates, summarise the related channel thread, and verify the attributed decisions against the transcript before acting.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0665-final-protected | 30 | 40 | yes |
| MST-0665-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Meeting summaries and recap | 8 |
| Notes, action items and mentions | 8 |
| Chat and channel synthesis | 7 |
| Action follow-through and verification | 7 |

Minimum reviewed item bank: 268 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0665-Q0001** (single-answer, Select ONE) What does Copilot in Teams need in order to produce a meeting summary with speaker attribution?

- A. A meeting transcript with attributed speakers **(key)**  
  _Rationale:_ Correct: Copilot relies on a transcript with speaker attribution.
- B. Only the meeting title  
  _Rationale:_ A title alone cannot produce a content summary.
- C. A recording with no transcript  
  _Rationale:_ Attribution and summary depend on the transcript, not just a recording.
- D. Administrator approval for each summary  
  _Rationale:_ Per-summary admin approval is not the mechanism.

**MST-0665-Q0002** (multiple-answer, Select TWO) Which TWO outputs can Copilot intelligent recap provide after a meeting? (Select TWO.)

- A. AI-generated action items from the discussion **(key)**  
  _Rationale:_ Correct: recap surfaces AI-generated tasks/action items.
- B. Name mentions showing where a person was referenced **(key)**  
  _Rationale:_ Correct: recap includes mentions with timestamps.
- C. A guaranteed error-free transcript requiring no review  
  _Rationale:_ Transcripts and summaries can contain errors and need review.
- D. Access to meetings the user was not entitled to see  
  _Rationale:_ Copilot respects access; it does not expose unauthorised meetings.

**MST-0665-Q0003** (single-answer, Select ONE) Before assigning a task from an AI-generated action item, a good practice is to:

- A. Verify the attributed decision against the transcript or participants **(key)**  
  _Rationale:_ Correct: AI attributions should be checked before acting.
- B. Assume the AI owner assignment is always correct  
  _Rationale:_ AI can misattribute; verification is needed.
- C. Delete the recap to avoid duplication  
  _Rationale:_ Deleting the recap loses useful context.
- D. Disable transcription for future meetings  
  _Rationale:_ Transcription is what enables recap in the first place.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
