# Visual Web Development with Webflow

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2280` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint and teach durable, transferable platform concepts. Platform features, pricing and user interfaces change frequently; product specifics must be verified at production and on-screen steps may differ from any shown. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Visual Web Development with Webflow (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Relate Webflow's visual canvas to the underlying HTML, CSS and box model
2. Build responsive layouts with the box model, flexbox and grid visually
3. Use classes, combo classes and a style system for maintainable styling
4. Model and bind dynamic content with a CMS collection
5. Add interactions and basic responsiveness across breakpoints
6. Configure SEO, forms and hosting and publish and maintain a site

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Visual canvas and the box model (25% (design weight), design weight)

- Worked applications: (1) Recreate a layout and name its box-model spacing correctly; (2) Explain why margin and padding produce different results
- Common misconception addressed: Treating the visual canvas as unrelated to HTML and CSS
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How Webflow maps to HTML, CSS and the box model | 120 | 7 |
| M01L02 | The style panel and element structure | 120 | 7 |

### M02 Responsive layout (25% (design weight), design weight)

- Worked applications: (1) Build a three-column section that stacks on mobile; (2) Fix an element that overflows at the tablet breakpoint
- Common misconception addressed: Styling only the desktop breakpoint and ignoring the rest
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Flexbox and grid on the canvas | 120 | 7 |
| M02L02 | Breakpoints and responsive behaviour | 120 | 7 |

### M03 Styling systems and CMS (25% (design weight), design weight)

- Worked applications: (1) Refactor repeated styles into a reusable class; (2) Build a blog from a CMS collection with dynamic pages
- Common misconception addressed: Creating a new class for every element instead of reusing one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Classes, combo classes and reuse | 120 | 7 |
| M03L02 | CMS collections and dynamic binding | 120 | 7 |

### M04 Interactions, SEO and launch (25% (design weight), design weight)

- Worked applications: (1) Add a scroll interaction without harming usability; (2) Configure page SEO settings and a working form before launch
- Common misconception addressed: Assuming publishing is automatic without SEO or form setup
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Interactions and basic animation | 120 | 7 |
| M04L02 | SEO, forms, hosting and publishing | 120 | 7 |

## Integrative case

A design studio rebuilds its marketing site in Webflow: structure the layout with the box model, build responsive sections with flexbox and grid, create a maintainable class system, drive the blog from a CMS collection with dynamic pages, add restrained interactions, set SEO and a contact form, then publish and establish a maintenance routine.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2280-final-protected | 40 | 40 | yes |
| MST-2280-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Visual canvas and the box model | 10 |
| Responsive layout | 10 |
| Styling systems and CMS | 10 |
| Interactions, SEO and launch | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2280-Q0001** (single-answer, Select ONE) A Webflow user creates a brand-new class for every single element and styling changes become unmanageable. What practice fixes this?

- A. Reuse a shared class across similar elements so one change updates them all **(key)**  
  _Rationale:_ Correct: reusing classes centralises styling and keeps a site maintainable.
- B. Add inline styles to each element instead  
  _Rationale:_ Inline styles scatter rules and make maintenance worse.
- C. Create one class per page regardless of element  
  _Rationale:_ Page-scoped single classes do not match elements to shared styles.
- D. Avoid classes and style the body only  
  _Rationale:_ Styling only the body cannot target individual components.

**MST-2280-Q0002** (multiple-answer, Select TWO) Which TWO tasks should be completed before publishing a Webflow site so it is findable and functional? (Select TWO.)

- A. Setting page titles and meta descriptions for SEO **(key)**  
  _Rationale:_ Correct: page-level SEO settings help the site be found and described correctly.
- B. Verifying the contact form submits and routes correctly **(key)**  
  _Rationale:_ Correct: a broken form means lost leads, so it must be tested before launch.
- C. Choosing a different logo animation style  
  _Rationale:_ Logo animation is cosmetic and not a launch prerequisite.
- D. Renaming internal layer labels  
  _Rationale:_ Internal labels are organisational and do not affect the published site.

**MST-2280-Q0003** (single-answer, Select ONE) A three-column layout looks right on desktop but columns are squashed and unreadable on phones. What is the correct approach?

- A. Adjust the layout at the smaller breakpoints so the columns stack or resize for mobile **(key)**  
  _Rationale:_ Correct: responsive layouts must be tuned per breakpoint, typically stacking columns on narrow screens.
- B. Tell users to zoom out  
  _Rationale:_ You cannot rely on users to compensate for a broken layout.
- C. Remove two of the columns permanently  
  _Rationale:_ Deleting content is unnecessary; the layout just needs responsive settings.
- D. Set a fixed pixel width for the page  
  _Rationale:_ A fixed width prevents the page from adapting to phone screens.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
