# Claude Projects: Knowledge Organization and Team Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0513` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Intended to reflect Anthropic's official Projects documentation; docs.anthropic.com was blocked by the egress proxy this session, so no official page was read. Capability and limit details are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-PROJECTS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Projects: Knowledge Organization and Team Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up a Project with clear instructions and the right reference files
2. Organise project knowledge so Claude retrieves the relevant material
3. Define shared conventions for a team using one Project
4. Manage access, versioning and confidentiality in a shared Project
5. Evaluate when a task belongs in a Project versus a one-off chat

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot assess the quality of a real team's knowledge base; organisation is taught through worked project walkthroughs.

## Modules

### M01 What a Project is for (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Decide which of five tasks belong in a Project; (2) Write a one-paragraph project purpose statement
- Common misconception addressed: Using a Project as a dumping ground with no stated purpose
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Projects versus one-off chats | 72 | 5 |
| M01L02 | Writing project instructions that steer every chat | 72 | 5 |

### M02 Organising project knowledge (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Curate a file set so only relevant material is loaded; (2) Restructure a messy knowledge base into retrievable units
- Common misconception addressed: Loading every file and assuming more context is always better
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Choosing and structuring reference files | 96 | 5 |
| M02L02 | Keeping knowledge retrievable and current | 96 | 5 |

### M03 Team conventions (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Draft shared tone and citation conventions for a team Project; (2) Resolve a conflict between two members' prompt styles
- Common misconception addressed: Letting each member invent incompatible conventions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Shared instructions and house style | 80 | 5 |
| M03L02 | Coordinating prompts across a team | 80 | 5 |
| M03L03 | Reviewing and updating conventions | 80 | 5 |

### M04 Access, versioning and confidentiality (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Assign access levels for a confidential Project; (2) Plan how project knowledge is versioned as it changes
- Common misconception addressed: Sharing a confidential Project more widely than intended
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Access control and confidentiality in shared Projects | 96 | 5 |
| M04L02 | Versioning project knowledge over time | 96 | 5 |

### M05 Fitting Projects into real work (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map a weekly workflow onto Projects and chats; (2) Retire a Project cleanly at the end of an engagement
- Common misconception addressed: Keeping stale Projects that confuse retrieval
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Designing a team workflow around Projects | 96 | 5 |
| M05L02 | Lifecycle: starting, maintaining and retiring a Project | 96 | 5 |

## Integrative case

A product team runs discovery through one Claude Project: load the research plan and interview notes, set project instructions for tone and citation, share it with three teammates with the right access, and keep the knowledge current as new interviews arrive.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0513-final-protected | 30 | 40 | yes |
| MST-0513-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What a Project is for | 5 |
| Organising project knowledge | 6 |
| Team conventions | 7 |
| Access, versioning and confidentiality | 6 |
| Fitting Projects into real work | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0513-Q0001** (single-answer, Select ONE) A team's Project returns answers that mix two unrelated engagements. What is the most likely cause?

- A. Unrelated files for both engagements are loaded in the same Project **(key)**  
  _Rationale:_ Correct: mixing unrelated material in one Project degrades retrieval relevance.
- B. The team has too few members  
  _Rationale:_ Member count does not cause content mixing.
- C. Claude cannot read files  
  _Rationale:_ The problem is scoping of the knowledge, not file reading.
- D. The chat is too short  
  _Rationale:_ Chat length does not explain cross-engagement mixing.

**MST-0513-Q0002** (multiple-answer, Select TWO) Which TWO belong in a shared team Project's instructions? (Select TWO.)

- A. The house style and citation convention **(key)**  
  _Rationale:_ Correct: shared conventions keep every member's chats consistent.
- B. A member's one-off debugging transcript  
  _Rationale:_ Transient content does not belong in persistent project instructions.
- C. The project's purpose and scope **(key)**  
  _Rationale:_ Correct: a clear purpose steers retrieval and keeps the Project focused.
- D. Each member's personal password  
  _Rationale:_ Credentials must never be placed in shared instructions.

**MST-0513-Q0003** (single-answer, Select ONE) Which task is the clearest fit for a one-off chat rather than a Project?

- A. Quickly rephrasing a single sentence with no reuse or shared context **(key)**  
  _Rationale:_ Correct: a trivial, non-recurring task needs no persistent shared workspace.
- B. A six-week research engagement with shared files  
  _Rationale:_ That needs the persistence of a Project.
- C. A team knowledge base updated weekly  
  _Rationale:_ Ongoing shared knowledge belongs in a Project.
- D. A confidential multi-member workspace  
  _Rationale:_ Shared, controlled access points to a Project.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
