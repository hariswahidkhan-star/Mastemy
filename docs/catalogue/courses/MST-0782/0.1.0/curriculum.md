# Claude + Excel + PowerPoint: Board-Reporting Production

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0782` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Claude + Excel + PowerPoint: Board-Reporting Production (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a board report and decide what Claude should and should not draft
2. Use Claude to draft and stress-test Excel analysis without accepting output blindly
3. Build a reliable Excel data and calculation layer that reconciles
4. Produce a PowerPoint board deck with validated figures and clear narrative
5. Operate the production run with review gates, versioning and an as-of date

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scoping the board report (20%)

- Worked applications: (1) Turn an ambiguous 'how are we doing' board ask into a defined metric brief; (2) Mark which figures are decision-critical and must be human-verified
- Common misconception addressed: Treating the deck layout as the starting point instead of the question
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From board questions to a reporting brief | 144 | 7 |
| M01L02 | Deciding where Claude adds value and where it must not | 144 | 7 |

### M02 Claude-assisted Excel analysis (20%)

- Worked applications: (1) Ask Claude for a variance formula, then verify it on a known sample; (2) Catch a confident but wrong Claude suggestion and correct it
- Common misconception addressed: Pasting Claude-generated formulas straight into the model without validation
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting Claude for Excel formulas and transformations | 144 | 7 |
| M02L02 | Stress-testing Claude output against hand-checked rows | 144 | 7 |

### M03 The Excel calculation layer (20%)

- Worked applications: (1) Normalise a messy export into a reconciling model; (2) Build a tie-out that surfaces dropped or duplicated rows
- Common misconception addressed: Reporting off one wide sheet with hidden duplicates
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Shaping a clean fact and dimension layer | 144 | 7 |
| M03L02 | Reconciliation totals and tie-out checks | 144 | 7 |

### M04 Building the PowerPoint board deck (20%)

- Worked applications: (1) Structure a one-page summary that answers the board's first question; (2) Place a chart whose number matches the Excel reconciliation exactly
- Common misconception addressed: Retyping figures into slides so they drift from the source model
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Narrative structure and figure placement | 144 | 7 |
| M04L02 | Linking validated numbers into slides | 144 | 7 |

### M05 Production governance (20%)

- Worked applications: (1) Add a human sign-off gate before the deck reaches the board; (2) Record a data-as-of date and version both the workbook and deck
- Common misconception addressed: Sharing a refreshed deck with no sign-off or stated as-of date
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Review gates, sign-off and as-of dating | 144 | 7 |
| M05L02 | Versioning, refresh and sensitive-data handling | 144 | 7 |

## Integrative case

Finance must ship a monthly board deck: scope the metric brief, use Claude to speed Excel analysis while verifying every figure, build validated PowerPoint slides, and release them through a review gate with a recorded as-of date.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0782-final-protected | 40 | 50 | yes |
| MST-0782-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scoping the board report | 8 |
| Claude-assisted Excel analysis | 8 |
| The Excel calculation layer | 8 |
| Building the PowerPoint board deck | 8 |
| Production governance | 8 |

Minimum reviewed item bank: 472 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0782-Q0001** (single-answer, Select ONE) The board asks for 'a clearer picture of performance.' What is the right first step before using Claude?

- A. Agree a defined metric brief with the board's decision in mind **(key)**  
  _Rationale:_ Correct: the question and decision must be defined before any drafting.
- B. Ask Claude to generate a standard board template  
  _Rationale:_ A generic template does not answer this board's specific question.
- C. Start building charts in PowerPoint  
  _Rationale:_ Starting in the deck skips defining what is being measured.
- D. Export every table from the ERP for completeness  
  _Rationale:_ Dumping all data does not clarify the decision the board faces.

**MST-0782-Q0002** (multiple-answer, Select TWO) Which TWO controls make a board deck trustworthy before distribution? (Select TWO.)

- A. A recorded data-as-of date **(key)**  
  _Rationale:_ Correct: readers must know the currency of the figures.
- B. A human sign-off gate before release **(key)**  
  _Rationale:_ Correct: a review gate catches errors before the board sees them.
- C. Hiding the underlying workbook  
  _Rationale:_ Hiding the source reduces auditability rather than risk.
- D. Auto-distributing on every data refresh  
  _Rationale:_ Unreviewed auto-distribution spreads errors faster.

**MST-0782-Q0003** (single-answer, Select ONE) A reconciliation total in the model does not tie to the source extract. What should you do first?

- A. Investigate the break before publishing any figure **(key)**  
  _Rationale:_ Correct: a tie-out break signals a data or logic error to resolve first.
- B. Publish the model number because it is more detailed  
  _Rationale:_ More detail does not make an untied number correct.
- C. Average the model and source totals  
  _Rationale:_ Averaging hides rather than resolves the discrepancy.
- D. Remove the reconciliation to clean up the sheet  
  _Rationale:_ Deleting the check destroys the signal that found the problem.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
