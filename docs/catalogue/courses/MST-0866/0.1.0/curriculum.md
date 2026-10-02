# Modern CSS: Grid, Flexbox, and Design Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0866` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build layouts with Flexbox for one-dimensional arrangement
2. Build two-dimensional layouts with CSS Grid
3. Create responsive designs with modern units and queries
4. Use custom properties and design tokens for theming
5. Apply the cascade, specificity and modern selectors deliberately
6. Structure scalable, maintainable CSS for a design system

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Flexbox (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Build a navbar with space-between; (2) Wrap a card row responsively
- Common misconception addressed: Reaching for floats instead of flex for one-dimensional layout
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Flex container and items | 80 | 5 |
| M01L02 | Alignment and wrapping | 80 | 5 |

### M02 Grid (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Define a page layout with grid-template-areas; (2) Build a responsive card grid with auto-fit/minmax
- Common misconception addressed: Using Grid where a single flex row is simpler
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Grid tracks and areas | 80 | 5 |
| M02L02 | Placement and auto-fit | 80 | 5 |

### M03 Responsive design (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Scale a heading with clamp(); (2) Adapt a component with a container query
- Common misconception addressed: Setting fixed pixel widths that break on small screens
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Modern units and clamp() | 80 | 5 |
| M03L02 | Media and container queries | 80 | 5 |

### M04 Custom properties and tokens (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Theme light/dark with custom properties; (2) Map tokens to component styles
- Common misconception addressed: Hard-coding colours instead of referencing tokens
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | CSS custom properties | 80 | 5 |
| M04L02 | Design tokens and theming | 80 | 5 |

### M05 Cascade and selectors (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Resolve a specificity conflict predictably; (2) Group related styles with @layer
- Common misconception addressed: Fixing conflicts with !important instead of managing specificity
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Specificity and the cascade | 80 | 5 |
| M05L02 | Modern selectors and layers | 80 | 5 |

### M06 Scalable CSS (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Apply a consistent naming convention; (2) Split styles into base, components and utilities
- Common misconception addressed: Writing deeply nested, tightly coupled selectors
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Naming and structure | 80 | 5 |
| M06L02 | Maintainable design-system CSS | 80 | 5 |

## Integrative case

Build the layout and theming for a dashboard: arrange a toolbar with Flexbox, lay out the page regions with Grid, make it responsive with modern units and container/media queries, drive colours and spacing from design tokens as custom properties, and organise the CSS so a second developer can extend it safely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0866-final-protected | 40 | 50 | yes |
| MST-0866-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Flexbox | 7 |
| Grid | 7 |
| Responsive design | 7 |
| Custom properties and tokens | 7 |
| Cascade and selectors | 6 |
| Scalable CSS | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0866-Q0001** (single-answer, Select ONE) You need to lay out a page with both rows and columns that align in two dimensions. Which is the best fit?

- A. CSS Grid **(key)**  
  _Rationale:_ Correct: Grid is designed for two-dimensional row-and-column layouts.
- B. Flexbox alone  
  _Rationale:_ Flexbox is primarily one-dimensional; two-dimensional alignment is awkward with it.
- C. Floats  
  _Rationale:_ Floats are a legacy technique ill-suited to structured 2D layout.
- D. Absolute positioning for everything  
  _Rationale:_ Absolute positioning does not create a flexible responsive grid.

**MST-0866-Q0002** (single-answer, Select ONE) Why prefer CSS custom properties over hard-coded colour values in a design system?

- A. They allow central theming and run-time changes from one source of truth **(key)**  
  _Rationale:_ Correct: custom properties let tokens drive the whole system and support theming.
- B. They make the CSS file invalid  
  _Rationale:_ Custom properties are valid CSS.
- C. They disable the cascade  
  _Rationale:_ Custom properties participate in the cascade normally.
- D. They only work in print styles  
  _Rationale:_ They work across all media, not just print.

**MST-0866-Q0003** (multiple-answer, Select TWO) Which TWO practices keep design-system CSS maintainable? (Select TWO.)

- A. Use a consistent naming convention **(key)**  
  _Rationale:_ Correct: predictable names make styles discoverable and safe to change.
- B. Manage specificity and layering deliberately **(key)**  
  _Rationale:_ Correct: controlled specificity avoids brittle overrides.
- C. Resolve every conflict with !important  
  _Rationale:_ !important escalates specificity wars and harms maintainability.
- D. Write deeply nested, element-coupled selectors  
  _Rationale:_ Deep coupling makes CSS fragile and hard to reuse.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
