# Microsoft 365 Copilot Prompting and Grounding

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0676` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft 365 Copilot architecture and overview documentation read via the Microsoft Learn MCP on 2026-10-02 (grounding, Microsoft Graph context, response flow). Prompt-gallery specifics and UI change frequently and must be confirmed against the current service before production. |
| Official sources | https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-architecture; https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-overview |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-COPILOT-PROMPT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft 365 Copilot Prompting and Grounding (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write clear, well-scoped Copilot prompts with goal, context and format
2. Supply and reference grounding so answers use the right context
3. Iterate prompts to improve relevance and reduce errors
4. Recognise the limits of prompting and when grounding or verification is needed
5. Build a small reusable prompt pattern for a recurring task

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Anatomy of an effective prompt (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Turn a vague ask into a scoped prompt; (2) Add the missing constraint to a weak prompt
- Common misconception addressed: Adding more words instead of the missing constraint
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Goal, context, source and format | 88 | 5 |
| M01L02 | Common prompt failure patterns | 88 | 5 |

### M02 Grounding the prompt (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Ground a summary prompt in a specific document; (2) Compare grounded and ungrounded answers
- Common misconception addressed: Assuming Copilot knows which document you mean without referencing it
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Referencing files and people to ground a prompt | 88 | 5 |
| M02L02 | What Microsoft Graph grounding contributes | 87 | 5 |

### M03 Iterating and refining (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Iterate a weak draft into a usable one; (2) Add constraints that cut irrelevant output
- Common misconception addressed: Re-running the same prompt expecting different quality without changes
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Targeted feedback and refinement | 87 | 5 |
| M03L02 | Knowing when a prompt is good enough | 87 | 5 |
| M03L03 | Reducing hallucination with constraints | 87 | 5 |

### M04 Limits, grounding and verification (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify a task needing grounding not prompting; (2) Add a verification step to a prompt workflow
- Common misconception addressed: Believing a clever prompt removes the need to verify output
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | When prompting cannot fix a data gap | 87 | 5 |
| M04L02 | Verification as part of the loop | 87 | 5 |

### M05 Reusable prompt patterns (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Build a reusable summarise-and-action prompt; (2) Document a pattern for a teammate
- Common misconception addressed: Sharing a pattern that embeds confidential data in the prompt text
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Designing a reusable prompt pattern | 87 | 5 |
| M05L02 | Documenting and sharing patterns responsibly | 87 | 5 |

## Integrative case

An analyst standardises a weekly 'summarise and action' prompt for Teams meeting notes, tunes it with grounding and iteration, and documents a reusable pattern for the team with verification steps.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0676-final-protected | 30 | 40 | yes |
| MST-0676-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Anatomy of an effective prompt | 5 |
| Grounding the prompt | 6 |
| Iterating and refining | 7 |
| Limits, grounding and verification | 6 |
| Reusable prompt patterns | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0676-Q0001** (single-answer, Select ONE) A prompt produces vague output. Which change most reliably improves it?

- A. Add the missing constraint (audience, length, format) **(key)**  
  _Rationale:_ Correct: supplying the missing constraint targets the gap rather than padding the prompt.
- B. Repeat the same prompt several times  
  _Rationale:_ Repetition without change rarely improves quality.
- C. Make the prompt much longer with synonyms  
  _Rationale:_ Length alone does not add the missing constraint.
- D. Switch apps and try again  
  _Rationale:_ The issue is the prompt, not the app.

**MST-0676-Q0002** (multiple-answer, Select TWO) Which TWO improve the relevance of a Microsoft 365 Copilot answer? (Select TWO.)

- A. Referencing the specific document to ground the prompt **(key)**  
  _Rationale:_ Correct: grounding in the right source improves relevance.
- B. Stating the goal, audience and desired format **(key)**  
  _Rationale:_ Correct: clear scope helps Copilot produce a relevant answer.
- C. Trusting the first answer without review  
  _Rationale:_ Reviewing is still required; this does not improve relevance.
- D. Removing all context so Copilot is free to guess  
  _Rationale:_ Removing context reduces relevance.

**MST-0676-Q0003** (single-answer, Select ONE) A task needs a figure from a file the prompt never references. The best fix is to:

- A. Ground the prompt by referencing that file **(key)**  
  _Rationale:_ Correct: a data gap is solved by grounding, not by wordsmithing the prompt.
- B. Rephrase the prompt more politely  
  _Rationale:_ Politeness does not supply missing data.
- C. Ask Copilot to invent a plausible figure  
  _Rationale:_ Inventing figures is unsafe and wrong.
- D. Make the prompt shorter  
  _Rationale:_ Shortening does not supply the missing data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
