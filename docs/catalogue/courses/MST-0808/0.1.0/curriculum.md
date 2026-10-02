# Claude + Python + Excel: Budget and Forecast Quality Review

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0808` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Claude + Python + Excel: Budget and Forecast Quality Review (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a budget/forecast quality review around drivers and materiality
2. Inspect an Excel model for formula and hard-code defects
3. Use Python to recompute and sanity-check model outputs
4. Use Claude to explain variances and verify the explanations
5. Produce a findings log with limitations and sign-off

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Quality-review scope (MASTEMY-DESIGN 20%)

- Worked applications: (1) List the driver assumptions behind a revenue forecast; (2) Set materiality thresholds for flagging a variance
- Common misconception addressed: Confusing a plausible-looking forecast with a validated one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a budget/forecast quality review checks | 120 | 7 |
| M01L02 | Assumptions, drivers and materiality | 120 | 7 |

### M02 Excel model inspection (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace precedents for a total that looks wrong; (2) Locate hard-coded overrides inside formula cells
- Common misconception addressed: Assuming a model is correct because the totals footnote cleanly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tracing formulas and dependencies | 120 | 7 |
| M02L02 | Finding broken links and hard-codes | 120 | 7 |

### M03 Python-assisted checks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Load a workbook and recompute a subtotal in Python; (2) Write a check that flags negative or out-of-range drivers
- Common misconception addressed: Trusting a Python recomputation without checking it reads the right range
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reading Excel with pandas/openpyxl | 120 | 7 |
| M03L02 | Automated reconciliation and sanity tests | 120 | 7 |

### M04 Claude-assisted reasoning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Ask Claude to explain a forecast variance and list caveats; (2) Confirm Claude's explanation against the recomputed figures
- Common misconception addressed: Accepting an AI narrative that contradicts the recomputed numbers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Explaining variances and risks | 120 | 7 |
| M04L02 | Verifying narratives against the numbers | 120 | 7 |

### M05 Review output and sign-off (MASTEMY-DESIGN 20%)

- Worked applications: (1) Produce a findings log ranked by materiality; (2) State the review's limitations and what was not tested
- Common misconception addressed: Signing off a review while omitting its scope limitations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Findings log and recommendations | 120 | 7 |
| M05L02 | Reviewer handoff and limitations | 120 | 7 |

## Integrative case

Quality-review a departmental budget model: identify its driver assumptions, trace a suspicious total in Excel, recompute key subtotals in Python, use Claude to explain the largest variance, verify that explanation against the numbers, and deliver a materiality-ranked findings log that states what was not tested.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0808-final-protected | 40 | 50 | yes |
| MST-0808-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Quality-review scope | 8 |
| Excel model inspection | 8 |
| Python-assisted checks | 8 |
| Claude-assisted reasoning | 8 |
| Review output and sign-off | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0808-Q0001** (single-answer, Select ONE) A Python script recomputes a subtotal and gets a different number than the workbook. What should you confirm first?

- A. That the script reads the same cell range the workbook sums **(key)**  
  _Rationale:_ Correct: a range mismatch is a common cause of a false discrepancy.
- B. That the workbook is definitely wrong  
  _Rationale:_ The script, not the workbook, may be reading the wrong range.
- C. That Python is always more accurate than Excel  
  _Rationale:_ Neither tool is automatically correct; the inputs decide.
- D. That the difference can be ignored  
  _Rationale:_ An unexplained difference must be investigated, not ignored.

**MST-0808-Q0002** (multiple-answer, Select TWO) Which TWO steps keep a Claude-written variance narrative reliable? (Select TWO.)

- A. Check the narrative against the recomputed figures **(key)**  
  _Rationale:_ Correct: verification catches AI explanations that do not match the data.
- B. Record the caveats and limitations the narrative depends on **(key)**  
  _Rationale:_ Correct: stating limitations keeps the conclusion honest.
- C. Publish the narrative without reading the numbers  
  _Rationale:_ Unchecked narratives can contradict the data.
- D. Delete figures that disagree with the narrative  
  _Rationale:_ Deleting inconvenient figures falsifies the review.

**MST-0808-Q0003** (single-answer, Select ONE) Why set materiality thresholds at the start of a quality review?

- A. To focus attention on variances large enough to matter **(key)**  
  _Rationale:_ Correct: materiality directs effort to findings that affect decisions.
- B. Because it guarantees the model is error-free  
  _Rationale:_ Thresholds triage findings; they do not prove correctness.
- C. Because it removes the need to trace formulas  
  _Rationale:_ Tracing is still required for flagged items.
- D. Because small variances are always errors  
  _Rationale:_ Small variances may be immaterial and expected.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
