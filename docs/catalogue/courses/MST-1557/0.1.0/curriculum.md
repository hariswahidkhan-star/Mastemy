# Tailwind CSS

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1557` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-SK-TC-002 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Tailwind CSS (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the utility-first approach and how Tailwind differs from traditional CSS
2. Describe building responsive layouts with Tailwind's spacing, flex and grid utilities
3. Explain Tailwind's theme configuration and design tokens
4. Describe managing repetition with components and extraction strategies
5. Explain how Tailwind generates and purges CSS for production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Utility-first fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rewrite a small styled block as utility classes; (2) Explain a utility-class element to a teammate
- Common misconception addressed: Believing utility classes are the same as inline styles
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Utility-first philosophy and the class model | 120 | 8 |
| M01L02 | Tailwind vs component and semantic CSS | 120 | 8 |

### M02 Layout with Tailwind (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a responsive card grid with utilities; (2) Make a layout adapt at two breakpoints
- Common misconception addressed: Assuming breakpoint prefixes apply styles below the breakpoint instead of at and above it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Spacing, sizing, flexbox and grid utilities | 120 | 8 |
| M02L02 | Responsive breakpoints and container patterns | 120 | 8 |

### M03 Design tokens and theming (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add a brand colour and spacing value to the theme; (2) Wire up a dark-mode variant for a component
- Common misconception addressed: Hard-coding arbitrary values instead of extending the theme
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The theme config, colours and scales | 120 | 8 |
| M03L02 | Customising tokens, dark mode and variants | 120 | 8 |

### M04 Reuse and maintainability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide between a component and @apply for a repeated button; (2) Refactor duplicated utility strings into one component
- Common misconception addressed: Reaching for @apply so heavily that the utility benefits are lost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Component extraction vs @apply | 120 | 8 |
| M04L02 | Keeping utility markup maintainable | 120 | 8 |

### M05 Production build and tooling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Configure content paths so used classes are not purged; (2) Diagnose why a class is missing from the production build
- Common misconception addressed: Building class names by string concatenation so the scanner cannot see them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Content scanning and generating only used classes | 120 | 8 |
| M05L02 | Editor tooling, plugins and optimisation | 120 | 8 |

## Integrative case

A team adopts Tailwind for a component library. Rebuild a page with utilities, make it responsive and dark-mode capable, extend the theme with brand tokens, decide where to extract reusable components, and configure the production build so only used classes ship. Defend the maintainability of the result.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1557-final-protected | 40 | 40 | yes |
| MST-1557-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Utility-first fundamentals | 8 |
| Layout with Tailwind | 8 |
| Design tokens and theming | 8 |
| Reuse and maintainability | 8 |
| Production build and tooling | 8 |

Minimum reviewed item bank: 450 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1557-Q0001** (single-answer, Select ONE) How does a Tailwind utility class fundamentally differ from an inline style attribute?

- A. Utilities are predefined, constrained classes tied to a design scale and support states and breakpoints **(key)**  
  _Rationale:_ Correct: utilities draw from a configured design scale and support variants like hover and responsive prefixes that inline styles cannot.
- B. They are identical in every way  
  _Rationale:_ They differ in constraint, reuse and variant support.
- C. Utilities cannot set colour  
  _Rationale:_ Utilities set colour via theme-driven classes.
- D. Inline styles support responsive breakpoints but utilities do not  
  _Rationale:_ This is backwards; utilities support breakpoints, inline styles do not.

**MST-1557-Q0002** (multiple-answer, Select TWO) Which TWO practices keep a Tailwind production build small and correct? (Select TWO.)

- A. Configure content paths so the scanner sees every file that uses classes **(key)**  
  _Rationale:_ Correct: accurate content paths let Tailwind keep used classes and purge the rest.
- B. Write complete class names statically so the scanner can detect them **(key)**  
  _Rationale:_ Correct: static, complete class names are detectable; dynamically concatenated ones are not.
- C. Build class names by concatenating fragments at runtime  
  _Rationale:_ Concatenated fragments are invisible to the scanner and get purged.
- D. Disable purging and ship every possible class  
  _Rationale:_ Shipping all classes produces an enormous stylesheet.

**MST-1557-Q0003** (single-answer, Select ONE) A button's utility classes are repeated across dozens of files. What is the most maintainable fix in most frameworks?

- A. Extract a reusable button component that encapsulates the classes **(key)**  
  _Rationale:_ Correct: a component centralises the markup and classes so changes happen in one place.
- B. Copy the classes into every new file by hand  
  _Rationale:_ Copying perpetuates the duplication being fixed.
- C. Delete the styling entirely  
  _Rationale:_ Removing styling is not a maintainability fix.
- D. Move everything into inline styles  
  _Rationale:_ Inline styles lose variant support and do not reduce duplication.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
