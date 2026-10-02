# UI Design Systems and Component Libraries

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1136` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course design (vendor-neutral). No third-party exam code, weighting or syllabus is claimed; content to be verified against current sources at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none (original Mastemy design) |
| Legacy IDs | MST-CRE-SK-UDF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — UI Design Systems and Component Libraries (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the purpose and structure of a design system
2. Define design tokens and foundational styles
3. Build and document reusable components
4. Govern, version and adopt a design system

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Design system foundations (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Audit an interface for inconsistent patterns; (2) Define guiding principles for a system
- Common misconception addressed: Thinking a design system is just a component sticker sheet
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a design system is and why | 120 | 8 |
| M01L02 | Principles, inventory and audits | 120 | 8 |

### M02 Tokens and foundations (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Define a spacing and colour token scale; (2) Create semantic tokens for light and dark themes
- Common misconception addressed: Hard-coding values instead of referencing tokens
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Design tokens: colour, type, spacing | 120 | 8 |
| M02L02 | Theming and semantic naming | 120 | 8 |

### M03 Components and documentation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Specify a component's states and props; (2) Write usage and accessibility guidance for it
- Common misconception addressed: Shipping components with no usage or accessibility documentation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Component anatomy, states and variants | 120 | 8 |
| M03L02 | Usage documentation and accessibility notes | 120 | 8 |

### M04 Governance and adoption (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Define a contribution and review process; (2) Plan a rollout to increase adoption
- Common misconception addressed: Launching a system with no governance, so it drifts
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Versioning, contribution and change management | 120 | 8 |
| M04L02 | Driving adoption across teams | 120 | 8 |

## Integrative case

A design-systems lead must consolidate three inconsistent product UIs. They must audit existing patterns, define tokens and foundations, build and document accessible components, and establish governance and a rollout plan, defending semantic tokens and a contribution process to both designers and engineers.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1136-final-protected | 40 | 40 | yes |
| MST-1136-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Design system foundations | 10 |
| Tokens and foundations | 10 |
| Components and documentation | 10 |
| Governance and adoption | 10 |

Minimum reviewed item bank: 376 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1136-Q0001** (single-answer, Select ONE) Design tokens are best described as:

- A. Named, reusable values for colour, type, spacing and more **(key)**  
  _Rationale:_ Correct: tokens store foundational values referenced everywhere.
- B. Finished marketing graphics  
  _Rationale:_ Tokens are values, not graphics.
- C. User research transcripts  
  _Rationale:_ Unrelated to tokens.
- D. A project management board  
  _Rationale:_ Not a token.

**MST-1136-Q0002** (multiple-answer, Select TWO) Which TWO make a design system sustainable over time? (Select TWO.)

- A. A documented contribution and versioning process **(key)**  
  _Rationale:_ Correct: governance keeps the system maintained.
- B. Semantic tokens that support theming **(key)**  
  _Rationale:_ Correct: semantic naming enables scalable theming.
- C. Hard-coded hex values scattered across files  
  _Rationale:_ That causes drift and inconsistency.
- D. Components with no documentation  
  _Rationale:_ Undocumented components are misused.

**MST-1136-Q0003** (single-answer, Select ONE) Semantic token names (e.g. color-surface-primary) are preferred over raw values because they:

- A. Let the underlying value change without editing every usage **(key)**  
  _Rationale:_ Correct: indirection via semantics enables theming and updates.
- B. Make the file larger for no reason  
  _Rationale:_ They add maintainability, not bloat for its own sake.
- C. Remove the need for components  
  _Rationale:_ Tokens and components are complementary.
- D. Prevent accessibility testing  
  _Rationale:_ They do not block accessibility work.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
