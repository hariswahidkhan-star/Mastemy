# Figma-to-Frontend Workflows with AI Coding Tools

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0577` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Figma-to-Frontend Workflows with AI Coding Tools (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Interpret a Figma file and extract tokens, components and specifications for implementation
2. Use AI coding tools to generate frontend UI that matches a design
3. Produce accessible, semantic, design-system-consistent markup from designs
4. Review generated UI for fidelity and iterate with designers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Design handoff and tokens (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Extract colour, spacing and type tokens from a Figma file into code variables; (2) Map a Figma component to an existing design-system component
- Common misconception addressed: Assuming pixel values in a mock are literal rather than derived from tokens
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Reading a Figma file for implementation | 80 | 5 |
| M01L02 | Extracting design tokens and variables | 80 | 5 |
| M01L03 | Mapping frames to a component library | 80 | 5 |

### M02 Generating UI from designs with AI tools (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Prompt an AI tool to implement a frame using design-system components; (2) Add semantic landmarks and ARIA where a generated component is missing them
- Common misconception addressed: Trusting generated markup to be accessible without checking it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting AI tools from frames and specs | 80 | 5 |
| M02L02 | Producing accessible, semantic markup | 80 | 5 |
| M02L03 | Keeping generated UI consistent with the design system | 80 | 5 |

### M03 Review, iteration and fidelity (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Diff a generated screen against the design at mobile and desktop breakpoints; (2) Record a fidelity gap and agree a fix with the designer
- Common misconception addressed: Treating a single desktop screenshot as proof the implementation matches the design
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Comparing generated output against the design | 80 | 5 |
| M03L02 | Handling responsive and state variations | 80 | 5 |
| M03L03 | Iterating with designers and closing gaps | 80 | 5 |

## Integrative case

A team hands off a multi-screen Figma design. Extract tokens and components, use AI coding tools to implement the screens against the design system, ensure accessibility and responsive behaviour, and run a fidelity review with the designers to close gaps.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0577-final-protected | 30 | 30 | yes |
| MST-0577-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Design handoff and tokens | 10 |
| Generating UI from designs with AI tools | 10 |
| Review, iteration and fidelity | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0577-Q0001** (single-answer, Select ONE) You are implementing a Figma screen that uses the team's design system. What is the most durable way to apply colour and spacing?

- A. Map the design's tokens to the design-system token variables and use those **(key)**  
  _Rationale:_ Correct: using shared tokens keeps the UI consistent and maintainable.
- B. Copy the raw hex and pixel values from the mock into each component  
  _Rationale:_ Hard-coded values drift from the system and are hard to maintain.
- C. Eyeball the colours from a screenshot  
  _Rationale:_ Eyeballing is inaccurate and ignores the token source of truth.
- D. Let the AI tool invent its own palette  
  _Rationale:_ Inventing values breaks design-system consistency.

**MST-0577-Q0002** (multiple-answer, Select TWO) An AI tool generated a UI from a Figma frame. Which TWO checks should you always run before accepting it? (Select TWO.) (Select TWO.)

- A. Verify the markup is semantic and accessible (landmarks, labels, contrast) **(key)**  
  _Rationale:_ Correct: generated markup is often not accessible by default and must be checked.
- B. Confirm it uses design-system components and tokens rather than ad-hoc styles **(key)**  
  _Rationale:_ Correct: consistency with the system is a core acceptance criterion.
- C. Check that the file has a high number of code comments  
  _Rationale:_ Comment count is not an acceptance criterion for UI fidelity or accessibility.
- D. Confirm the tool used the largest available model  
  _Rationale:_ Model size does not determine whether the output meets the design and accessibility bar.

**MST-0577-Q0003** (single-answer, Select ONE) A generated screen looks right on desktop but the designer reports issues. What should you check first?

- A. Responsive behaviour and component states at the other breakpoints and states **(key)**  
  _Rationale:_ Correct: fidelity gaps often appear in untested breakpoints and states.
- B. Whether the Figma file has enough viewers  
  _Rationale:_ File popularity is irrelevant to implementation fidelity.
- C. Whether to switch to a different programming language  
  _Rationale:_ Language choice does not address responsive fidelity.
- D. Whether to delete the design tokens  
  _Rationale:_ Removing tokens would worsen consistency, not fix the gap.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
