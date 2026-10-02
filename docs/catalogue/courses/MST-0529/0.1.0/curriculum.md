# Claude Skills for Excel, Word, PowerPoint, and PDF Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0529` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude Code, Claude product and developer documentation (docs.anthropic.com / docs.claude.com). The egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Commands, flags, feature names, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; docs.anthropic.com blocked by egress proxy this session) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-SKILLS-OFFICE |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Skills for Excel, Word, PowerPoint, and PDF Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what a Claude Skill is and how it packages instructions, scripts and resources for document work
2. Build and invoke Skills that read and produce Excel, Word, PowerPoint and PDF files
3. Choose when a document task needs a Skill versus a one-off prompt or an uploaded file
4. Verify Skill output against the source document before it is used in professional work
5. Handle confidential document content safely inside Skill-driven workflows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use, code quality or judgement under real conditions; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 What Claude Skills are and when document work needs one (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Decide which of five recurring document tasks justify a reusable Skill; (2) Trace how a Skill's instructions, bundled scripts and resources are loaded for a task
- Common misconception addressed: Thinking a Skill is just a saved prompt rather than a packaged set of instructions, scripts and files
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Anatomy of a Skill: instructions, scripts and bundled resources | 72 | 5 |
| M01L02 | Skill versus a one-off prompt versus an uploaded file | 72 | 5 |

### M02 Spreadsheet Skills: reading and producing Excel (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Build a Skill that reads an .xlsx export and emits a formatted summary sheet; (2) Add formula and total checks so the Skill flags a mismatch instead of hiding it
- Common misconception addressed: Trusting a generated workbook's totals without re-checking the formulas against the source data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Reading and transforming .xlsx data with a Skill | 96 | 5 |
| M02L02 | Producing formatted, formula-checked workbooks | 96 | 5 |

### M03 Document and slide Skills: Word, PowerPoint and PDF (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a Skill that turns structured notes into a Word report with consistent styles; (2) Produce a slide deck from a brief and verify each figure against the source file
- Common misconception addressed: Assuming a generated document preserves every figure and citation from the source unchanged
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Generating Word documents with consistent structure and styles | 80 | 5 |
| M03L02 | Building PowerPoint decks from a brief | 80 | 5 |
| M03L03 | Extracting and producing PDF content reliably | 80 | 5 |

### M04 Verifying Skill output before professional use (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Fact-check a Skill-produced summary against the original export line by line; (2) Design a verification step the Skill runs and reports before handing over the file
- Common misconception addressed: Treating a clean-looking output file as evidence that the underlying numbers are correct
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | A verification routine for Skill-produced documents | 96 | 5 |
| M04L02 | Recording what the Skill did and what a human still checked | 96 | 5 |

### M05 Confidential document content and safe Skill use (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify three source documents as safe, restricted or never-share for a Skill; (2) Configure a workspace so a document Skill runs only on approved material
- Common misconception addressed: Pasting confidential files into a Skill without checking retention and sharing settings
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Confidentiality and retention for document Skills | 96 | 5 |
| M05L02 | Workspace and sharing settings for team document Skills | 96 | 5 |

## Integrative case

An operations analyst builds a Skill that turns a monthly CSV export into a formatted Excel workbook and a summary PowerPoint, then verifies every total against the source export and documents what the Skill did before circulating the deck.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0529-final-protected | 30 | 40 | yes |
| MST-0529-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What Claude Skills are and when document work needs one | 5 |
| Spreadsheet Skills: reading and producing Excel | 6 |
| Document and slide Skills: Word, PowerPoint and PDF | 7 |
| Verifying Skill output before professional use | 6 |
| Confidential document content and safe Skill use | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0529-Q0001** (single-answer, Select ONE) A team runs the same CSV-to-Excel summary every month with identical formatting rules. Why is packaging it as a Skill preferable to re-prompting each time?

- A. The Skill captures the instructions, scripts and formatting once so the task runs consistently and repeatably **(key)**
  _Rationale:_ Correct: a Skill encodes the repeatable procedure, reducing drift between runs.
- B. A Skill makes Claude respond faster on every unrelated request
  _Rationale:_ A Skill does not speed up unrelated requests; it standardises a specific task.
- C. A Skill removes the need to ever verify the output
  _Rationale:_ Output must still be verified; a Skill standardises the steps, not correctness.
- D. A Skill lets Claude edit the source CSV in place without permission
  _Rationale:_ A Skill does not grant unrequested write access to source files.

**MST-0529-Q0002** (multiple-answer, Select TWO) Which TWO checks should a document Skill perform before its output is trusted for a board pack? (Select TWO.)

- A. Reconcile every total in the output against the source export **(key)**
  _Rationale:_ Correct: totals must trace back to the source to catch transformation errors.
- B. Confirm the output file opens without a format error **(key)**
  _Rationale:_ Correct: a corrupt or unreadable file is an immediate failure to catch early.
- C. Check that the output file is larger than the source
  _Rationale:_ File size is not a meaningful correctness signal.
- D. Ask Claude whether it is confident in the numbers
  _Rationale:_ A model's stated confidence is not independent verification.

**MST-0529-Q0003** (single-answer, Select ONE) A source workbook contains client-identifying data. Before a Skill processes it, what is the right first step?

- A. Classify the document's sensitivity and confirm retention and sharing settings allow this use **(key)**
  _Rationale:_ Correct: sensitivity classification and settings come before processing confidential data.
- B. Run the Skill immediately to save time
  _Rationale:_ Processing confidential data before checking settings is the risk being avoided.
- C. Rename the file so the data looks anonymised
  _Rationale:_ Renaming does not remove identifying content from the data.
- D. Share the file publicly so the team can all run the Skill
  _Rationale:_ Public sharing increases exposure of confidential data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
