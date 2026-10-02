# Gemini in Google Sheets: Analysis and Verification

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0724` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Gemini for Google Workspace and Google Sheets product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-GEMINI-SHEETS (https://support.google.com/docs/topic/9054603; https://support.google.com/gemini/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Gemini in Google Sheets: Analysis and Verification (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe what Gemini in Sheets can and cannot do and its data boundaries
2. Prompt Gemini to generate formulas and tables
3. Ask Gemini to summarise and explain a dataset
4. Verify Gemini output against the source data
5. Use Gemini to clean and categorise data responsibly
6. Apply governance, privacy and review practices to AI-assisted work

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Capabilities and limits (MASTEMY-DESIGN 16%)

- Worked applications: (1) List three tasks Gemini assists and two it should not decide; (2) Identify data that must not be sent to an assistant
- Common misconception addressed: Treating generated output as verified fact
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Gemini in Sheets does | 80 | 5 |
| M01L02 | Data boundaries and when not to use it | 80 | 5 |

### M02 Generating formulas (MASTEMY-DESIGN 16%)

- Worked applications: (1) Prompt for a SUMIFS formula and test it; (2) Fix a generated formula that references the wrong range
- Common misconception addressed: Pasting a formula without checking its ranges
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting for a formula | 80 | 5 |
| M02L02 | Adapting and checking generated formulas | 80 | 5 |

### M03 Summarising data (MASTEMY-DESIGN 17%)

- Worked applications: (1) Generate a one-paragraph summary of a sales table; (2) Ask Gemini to flag outliers and confirm them
- Common misconception addressed: Accepting a summary that cites numbers not in the data
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Asking for a summary | 80 | 5 |
| M03L02 | Explaining trends and outliers | 80 | 5 |

### M04 Verification (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace a summarised total back to its rows; (2) Reconcile a generated figure with a manual SUM
- Common misconception addressed: Assuming confident wording means correct numbers
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Tracing a claim to source cells | 80 | 5 |
| M04L02 | Spot-checking and reconciliation | 80 | 5 |

### M05 Cleaning and categorising (MASTEMY-DESIGN 17%)

- Worked applications: (1) Standardise inconsistent country names; (2) Categorise free-text notes and audit the labels
- Common misconception addressed: Letting the model invent categories not grounded in the data
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Standardising values with assistance | 80 | 5 |
| M05L02 | Categorising rows responsibly | 80 | 5 |

### M06 Governance and privacy (MASTEMY-DESIGN 17%)

- Worked applications: (1) Decide what to disclose when AI assisted a report; (2) Apply a review checklist before sharing
- Common misconception addressed: Skipping human review because output looked polished
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Privacy and admin controls | 80 | 5 |
| M06L02 | Review and disclosure practices | 80 | 5 |

## Integrative case

A manager pastes a messy quarterly export and wants a summarised, categorised table with a short narrative: prompt Gemini to draft formulas and a summary, then independently verify every figure against the source rows, document what was checked, and flag anything the model got wrong before sharing.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0724-final-protected | 40 | 50 | yes |
| MST-0724-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Capabilities and limits | 7 |
| Generating formulas | 7 |
| Summarising data | 7 |
| Verification | 7 |
| Cleaning and categorising | 6 |
| Governance and privacy | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0724-Q0001** (single-answer, Select ONE) Gemini returns a confident summary stating last quarter grew 12%. What should you do before sharing it?

- A. Verify the 12% against the source rows yourself **(key)**  
  _Rationale:_ Correct: AI output must be checked against the data; confident wording is not evidence.
- B. Share it immediately because the tone is confident  
  _Rationale:_ Confidence is not correctness; unverified figures can be wrong.
- C. Delete the source data to keep the sheet tidy  
  _Rationale:_ Removing source data makes verification impossible.
- D. Ask Gemini if it is sure  
  _Rationale:_ Re-asking the model does not independently confirm the number.

**MST-0724-Q0002** (single-answer, Select ONE) Which is the safest practice when a dataset contains regulated personal data?

- A. Confirm data-handling policy and admin controls before using the assistant **(key)**  
  _Rationale:_ Correct: data boundaries and governance must be confirmed first.
- B. Paste everything so the model has full context  
  _Rationale:_ Sending regulated data without checking policy risks a breach.
- C. Rename the sheet to hide the content  
  _Rationale:_ Renaming does not change what data is processed.
- D. Assume the assistant never stores anything  
  _Rationale:_ Assumptions about retention are not a substitute for confirming policy.

**MST-0724-Q0003** (multiple-answer, Select TWO) Which TWO steps help verify an AI-generated summary of a table? (Select TWO.)

- A. Trace each cited figure back to specific source cells **(key)**  
  _Rationale:_ Correct: tracing to source confirms the figure exists in the data.
- B. Recompute a key total manually and compare **(key)**  
  _Rationale:_ Correct: an independent manual total catches generation errors.
- C. Increase the font size of the summary  
  _Rationale:_ Formatting has no bearing on correctness.
- D. Accept it if it reads fluently  
  _Rationale:_ Fluency is unrelated to numerical accuracy.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
