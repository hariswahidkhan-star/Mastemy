# GitHub Copilot for Everyday Software Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0569` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from GitHub's official Copilot documentation; the egress proxy blocked docs.github.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.github.com, EGRESS_BLOCKED); sources: SRC-COPILOT-0569 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — GitHub Copilot for Everyday Software Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how Copilot's inline suggestions and chat use context
2. Write code with Copilot chat by supplying the right context
3. Use Copilot for everyday explaining, refactoring and boilerplate tasks
4. Keep Copilot output correct by reviewing, testing and spotting wrong suggestions
5. Use Copilot responsibly with data care, attribution and human accountability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 How Copilot assists you (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Use inline suggestions to complete a function; (2) Decide quickly whether a suggestion is worth keeping
- Common misconception addressed: Accepting suggestions by reflex without reading them
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Inline suggestions, chat and how Copilot uses context | 72 | 5 |
| M01L02 | When to accept, edit or reject a suggestion | 72 | 5 |

### M02 Writing code with Copilot chat (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Turn a described requirement into working code via chat; (2) Add the context chat needs to answer well
- Common misconception addressed: Expecting chat to know files it was never shown
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Asking for code and explanations in chat | 96 | 5 |
| M02L02 | Giving chat the right context | 96 | 5 |

### M03 Everyday workflows (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Get an explanation of an unfamiliar function; (2) Refactor a small function and verify it
- Common misconception addressed: Letting Copilot generate boilerplate you never check
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Explaining and documenting existing code | 80 | 5 |
| M03L02 | Small refactors and routine edits | 80 | 5 |
| M03L03 | Generating boilerplate safely | 80 | 5 |

### M04 Keeping Copilot output correct (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a suggestion before committing it; (2) Spot and reject a plausible-but-wrong suggestion
- Common misconception addressed: Assuming a suggestion is correct because it compiles
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reviewing and testing suggested code | 96 | 5 |
| M04L02 | Recognising plausible-but-wrong suggestions | 96 | 5 |

### M05 Responsible everyday use (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a change before committing with clear accountability; (2) Decide what not to paste into a prompt
- Common misconception addressed: Treating Copilot output as correct and unattributed by default
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Keeping secrets and private code out of prompts | 96 | 5 |
| M05L02 | Attribution, licensing awareness and human accountability | 96 | 5 |

## Integrative case

A developer uses Copilot through a normal day: inline-complete a function, ask chat to draft a routine module with the right context, refactor and document existing code, review and test every suggestion, keep secrets out of prompts, and stay accountable for each commit.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0569-final-protected | 30 | 40 | yes |
| MST-0569-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How Copilot assists you | 5 |
| Writing code with Copilot chat | 6 |
| Everyday workflows | 7 |
| Keeping Copilot output correct | 6 |
| Responsible everyday use | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0569-Q0001** (single-answer, Select ONE) What is the right default reaction to a Copilot inline suggestion?

- A. Read it and decide to accept, edit or reject **(key)**  
  _Rationale:_ Correct: suggestions must be read and judged, not accepted by reflex.
- B. Accept every suggestion to move faster  
  _Rationale:_ Reflex acceptance introduces unread, possibly wrong code.
- C. Reject every suggestion on principle  
  _Rationale:_ Blanket rejection discards useful help.
- D. Assume it is correct because it appeared  
  _Rationale:_ Appearance is not correctness.

**MST-0569-Q0002** (multiple-answer, Select TWO) Which TWO habits keep everyday Copilot use safe? (Select TWO.)

- A. Review and test suggested code before committing **(key)**  
  _Rationale:_ Correct: review and tests catch plausible-but-wrong code.
- B. Keep secrets and private code out of prompts **(key)**  
  _Rationale:_ Correct: prompts should never carry secrets or confidential code.
- C. Commit boilerplate you never read  
  _Rationale:_ Unread code can be wrong or unsafe.
- D. Assume compiling code is correct  
  _Rationale:_ Compilation does not prove correctness.

**MST-0569-Q0003** (single-answer, Select ONE) Copilot chat gives a weak answer about code it was not shown. What is the likely cause?

- A. It lacked the context of the relevant files **(key)**  
  _Rationale:_ Correct: chat answers poorly when it cannot see the relevant code.
- B. The model is permanently broken  
  _Rationale:_ A weak answer usually means missing context, not a broken model.
- C. Chat never works on real code  
  _Rationale:_ Chat works well when given the right context.
- D. The code is too simple for Copilot  
  _Rationale:_ Simplicity does not cause weak answers.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
