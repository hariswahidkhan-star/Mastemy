# HTML and CSS: Accessible Responsive Web Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0865` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. HTML and CSS are open web platform technologies with no single issuer syllabus or certification; module topics reflect widely accepted web standards and should be confirmed against current specifications at blueprint review. |
| Evidence | **n/a-no-official-syllabus** - generic web-standards skill with no single issuing body; not tied to an official vendor credential. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — HTML and CSS: Accessible Responsive Web Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write semantic, well-structured HTML
2. Style layouts with modern CSS
3. Build responsive designs for multiple viewports
4. Apply accessibility fundamentals
5. Organize and maintain stylesheets

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Semantic HTML (MASTEMY-DESIGN 20%)

- Worked applications: (1) Mark up an article with semantic elements; (2) Build an accessible form
- Common misconception addressed: Using div and span for everything instead of semantic elements
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Document structure and semantics | 120 | 7 |
| M01L02 | Forms and input types | 120 | 7 |

### M02 CSS styling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Style a card with the box model; (2) Resolve a specificity conflict
- Common misconception addressed: Fighting specificity with !important everywhere
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Selectors, the box model and specificity | 120 | 7 |
| M02L02 | Colors, typography and units | 120 | 7 |

### M03 Layout (MASTEMY-DESIGN 20%)

- Worked applications: (1) Lay out a navbar with Flexbox; (2) Build a page grid with CSS Grid
- Common misconception addressed: Using floats where Flexbox or Grid is the right tool
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Flexbox | 120 | 7 |
| M03L02 | CSS Grid | 120 | 7 |

### M04 Responsive design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a breakpoint with a media query; (2) Make a layout mobile-first
- Common misconception addressed: Designing desktop-first and bolting on mobile as an afterthought
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Media queries and breakpoints | 120 | 7 |
| M04L02 | Fluid and mobile-first design | 120 | 7 |

### M05 Accessibility and maintainability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add alt text and labels for accessibility; (2) Structure stylesheets for reuse
- Common misconception addressed: Treating accessibility as optional polish
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Accessibility fundamentals | 120 | 7 |
| M05L02 | Organizing and maintaining CSS | 120 | 7 |

## Integrative case

Build an accessible, responsive marketing page: mark it up with semantic HTML and an accessible form, lay it out with Flexbox and Grid, make it mobile-first with media queries, and organize the CSS for maintainability with accessibility checks throughout.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0865-final-protected | 40 | 50 | yes |
| MST-0865-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Semantic HTML | 8 |
| CSS styling | 8 |
| Layout | 8 |
| Responsive design | 8 |
| Accessibility and maintainability | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0865-Q0001** (single-answer, Select ONE) Why prefer semantic HTML elements over generic divs?

- A. They convey meaning and improve accessibility and structure **(key)**  
  _Rationale:_ Correct: semantic elements aid assistive technology and document clarity.
- B. They render faster in every browser  
  _Rationale:_ Performance is not the primary reason; meaning and accessibility are.
- C. They remove the need for any CSS  
  _Rationale:_ Semantics do not replace styling.
- D. They are required for JavaScript to run  
  _Rationale:_ JavaScript does not require semantic markup.

**MST-0865-Q0002** (multiple-answer, Select TWO) Which TWO CSS tools are designed for two-dimensional and one-dimensional layout respectively? (Select TWO.)

- A. CSS Grid for two-dimensional layouts **(key)**  
  _Rationale:_ Correct: Grid handles rows and columns together.
- B. Flexbox for one-dimensional layouts **(key)**  
  _Rationale:_ Correct: Flexbox lays out items along a single axis.
- C. Tables for all modern page layout  
  _Rationale:_ Tables are for tabular data, not general layout.
- D. Inline styles for responsive breakpoints  
  _Rationale:_ Breakpoints use media queries, not inline styles.

**MST-0865-Q0003** (single-answer, Select ONE) What does a mobile-first responsive approach mean?

- A. Base styles target small screens, with media queries adding larger-screen rules **(key)**  
  _Rationale:_ Correct: mobile-first builds up from small screens using min-width queries.
- B. The site only works on phones  
  _Rationale:_ Mobile-first still supports larger screens.
- C. Desktop styles are written first, then overridden  
  _Rationale:_ That is desktop-first, the opposite approach.
- D. JavaScript detects the device and swaps pages  
  _Rationale:_ Responsive design uses CSS, not page swapping.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
