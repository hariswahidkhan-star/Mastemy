# Excel with Copilot: AI-Assisted Spreadsheets

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2657` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Microsoft Excel and AI product features change often; this spec teaches durable concepts and must have product specifics re-verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel with Copilot: AI-Assisted Spreadsheets (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what an AI assistant in Excel can and cannot do, and where a human must verify
2. Prompt an assistant to generate formulas, explain existing formulas and suggest fixes
3. Ask for data summaries, trends and suggested PivotTables, then confirm them against the data
4. Use AI to draft chart and formatting choices while keeping the message honest
5. Recognise risks: hallucinated functions, wrong ranges, data privacy and over-reliance
6. Build a verification habit so AI output is always checked before it drives a decision

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What AI in the spreadsheet can do (25% (design weight), design weight)

- Worked applications: (1) Ask the assistant to write and then explain an XLOOKUP, and confirm the ranges; (2) Rephrase a vague prompt to include the goal, the columns and the expected output
- Common misconception addressed: Trusting a generated formula that references the wrong column without checking
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Capabilities and current limits of AI assistants | 120 | 7 |
| M01L02 | Where answers are grounded vs generated | 120 | 7 |

### M02 Prompting for formulas and explanations (25% (design weight), design weight)

- Worked applications: (1) Have the assistant propose a PivotTable, then validate one total by hand; (2) Ask it to explain why a formula returns #N/A before accepting a fix
- Common misconception addressed: Treating an AI explanation as proof the formula is correct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Asking for, refining and explaining formulas | 120 | 7 |
| M02L02 | Describing data and goals clearly in a prompt | 120 | 7 |

### M03 AI-assisted analysis and visuals (25% (design weight), design weight)

- Worked applications: (1) Ask for a chart to show a trend, then correct a truncated axis it proposes; (2) Use AI to draft summary text, then rewrite claims the data does not support
- Common misconception addressed: Pasting AI summary numbers into a report without tracing them to cells
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Summaries, trends and suggested PivotTables | 120 | 7 |
| M03L02 | AI-suggested charts and formatting | 120 | 7 |

### M04 Risk, privacy and verification (25% (design weight), design weight)

- Worked applications: (1) Redact or avoid sharing sensitive personal data in a prompt; (2) Add a human review step before an AI-assisted figure reaches a decision
- Common misconception addressed: Assuming the assistant can see data it has no permission to access
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Hallucinated functions, wrong ranges and bias | 120 | 7 |
| M04L02 | Data sensitivity and a verify-before-trust workflow | 120 | 7 |

## Integrative case

A business analyst adopts an AI assistant in Excel to speed up a weekly report: they prompt it for formulas and a PivotTable, catch a hallucinated function and a wrong range, remove an over-stated chart axis it suggested, and add a verification checklist before the numbers go to the manager.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2657-final-protected | 40 | 40 | yes |
| MST-2657-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What AI in the spreadsheet can do | 10 |
| Prompting for formulas and explanations | 10 |
| AI-assisted analysis and visuals | 10 |
| Risk, privacy and verification | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2657-Q0001** (single-answer, Select ONE) An AI assistant suggests a worksheet function you have never seen and it returns an error. What is the responsible next step?

- A. Verify the function exists and is valid for your Excel version before using it **(key)**  
  _Rationale:_ Correct: assistants can suggest non-existent or version-specific functions, so verification is essential.
- B. Assume it is correct because the AI suggested it  
  _Rationale:_ AI output can be wrong or hallucinated and must be checked.
- C. Report the error and switch off all formulas  
  _Rationale:_ Disabling formulas does not address the suggestion.
- D. Paste it into every cell to see if it works somewhere  
  _Rationale:_ Guesswork is not verification.

**MST-2657-Q0002** (multiple-answer, Select TWO) Which TWO habits keep AI-assisted spreadsheet work trustworthy? (Select TWO.)

- A. Independently check a key AI-produced total against the source data **(key)**  
  _Rationale:_ Correct: an independent check catches wrong ranges and hallucinated results.
- B. Avoid putting sensitive personal data into prompts unless permitted and protected **(key)**  
  _Rationale:_ Correct: data privacy and permissions must be respected.
- C. Accept AI summaries verbatim to save time  
  _Rationale:_ Unverified summaries can carry errors into a decision.
- D. Assume the assistant can read files you cannot access  
  _Rationale:_ Assistants operate within your existing permissions.

**MST-2657-Q0003** (single-answer, Select ONE) The assistant writes a confident paragraph of insights that the underlying data does not actually support. What should you do?

- A. Rewrite the summary so every claim traces to a verifiable figure **(key)**  
  _Rationale:_ Correct: narrative must match the data; unsupported claims should be removed or corrected.
- B. Keep it because it reads well  
  _Rationale:_ Readability does not make an unsupported claim true.
- C. Add more adjectives to strengthen it  
  _Rationale:_ That worsens the honesty problem.
- D. Hide the data so no one can check  
  _Rationale:_ Concealing evidence is never appropriate.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
