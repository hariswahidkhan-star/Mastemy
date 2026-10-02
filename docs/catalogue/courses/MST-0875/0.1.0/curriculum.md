# React Design Systems and Reusable UI Libraries

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0875` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — React Design Systems and Reusable UI Libraries (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use design tokens and theming
2. Design clean, composable component APIs
3. Build accessible, documented components
4. Package and version a reusable library

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Define colour and spacing tokens; (2) Theme a component for light and dark mode
- Common misconception addressed: Hardcoding visual values instead of using tokens
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Design tokens and theming | 120 | 7 |
| M01L02 | Consistency and scalability goals | 120 | 7 |

### M02 Component API design (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design a flexible Button API with variants; (2) Compose a Card from smaller primitives
- Common misconception addressed: Overloading one component with too many props
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Props, composition and variants | 120 | 7 |
| M02L02 | Controlled vs uncontrolled components | 120 | 7 |

### M03 Accessibility and docs (MASTEMY-DESIGN 25%)

- Worked applications: (1) Make a modal keyboard- and focus-accessible; (2) Write usage docs for a component
- Common misconception addressed: Treating accessibility as an afterthought
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Accessible components and ARIA | 120 | 7 |
| M03L02 | Documenting with stories and examples | 120 | 7 |

### M04 Packaging and versioning (MASTEMY-DESIGN 25%)

- Worked applications: (1) Package components for reuse; (2) Communicate a breaking change with semver
- Common misconception addressed: Shipping breaking changes in a patch release
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Building and publishing a library | 120 | 7 |
| M04L02 | Semantic versioning and breaking changes | 120 | 7 |

## Integrative case

Start a design system: define tokens and theming, design a composable Button and Card with sensible variants, make a modal accessible with focus management and docs, then package the components and plan versioning so breaking changes ship under a major version.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0875-final-protected | 40 | 50 | yes |
| MST-0875-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations | 10 |
| Component API design | 10 |
| Accessibility and docs | 10 |
| Packaging and versioning | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0875-Q0001** (single-answer, Select ONE) Design tokens exist to...

- A. centralise shared visual values for consistency and theming **(key)**  
  _Rationale:_ Correct: tokens are the single source of visual values.
- B. replace all components  
  _Rationale:_ Tokens feed components; they do not replace them.
- C. store server data  
  _Rationale:_ Tokens are design values, not data storage.
- D. speed up network fetches  
  _Rationale:_ Tokens are unrelated to fetching.

**MST-0875-Q0002** (multiple-answer, Select TWO) Which TWO choices make a reusable component API better? (Select TWO.)

- A. Favour composition over a single huge prop list **(key)**  
  _Rationale:_ Correct: composition keeps components flexible and simple.
- B. Provide clear variants with sensible defaults **(key)**  
  _Rationale:_ Correct: good defaults and variants ease adoption.
- C. Encode every option as a separate boolean flag  
  _Rationale:_ Flag explosion makes an API hard to use.
- D. Hardcode colours inside each component  
  _Rationale:_ Hardcoding defeats theming and consistency.

**MST-0875-Q0003** (single-answer, Select ONE) Under semantic versioning, a breaking change requires...

- A. a major version bump **(key)**  
  _Rationale:_ Correct: breaking changes increment the major version.
- B. only a patch release  
  _Rationale:_ Patches are for backward-compatible fixes.
- C. no version change  
  _Rationale:_ Breaking changes must be signalled by a version bump.
- D. only a changelog comment  
  _Rationale:_ A comment alone does not satisfy semver.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
