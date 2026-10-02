# Web Accessibility Engineering and Inclusive Interfaces

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0867` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain accessibility principles and who they serve
2. Build semantic HTML as the foundation of accessibility
3. Implement keyboard operability and focus management
4. Use ARIA correctly and only when needed
5. Meet colour, contrast and visual accessibility needs
6. Test accessibility with tools and assistive technology

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Principles (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Map a barrier to the users it affects; (2) Relate a fix to a success criterion
- Common misconception addressed: Treating accessibility as an optional add-on at the end
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why accessibility matters | 80 | 5 |
| M01L02 | People, barriers and standards | 80 | 5 |

### M02 Semantic HTML (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Replace div buttons with real buttons; (2) Associate labels with form fields
- Common misconception addressed: Rebuilding native controls with divs and losing built-in semantics
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Landmarks and headings | 80 | 5 |
| M02L02 | Native controls and labels | 80 | 5 |

### M03 Keyboard and focus (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Make a custom widget fully keyboard operable; (2) Trap and restore focus in a modal
- Common misconception addressed: Removing outlines without providing a visible focus style
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Keyboard operability | 80 | 5 |
| M03L02 | Focus order and focus management | 80 | 5 |

### M04 ARIA (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Add aria-expanded to a disclosure control; (2) Remove redundant ARIA from a native element
- Common misconception addressed: Adding ARIA that contradicts or duplicates native semantics
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | ARIA roles, states and properties | 80 | 5 |
| M04L02 | When not to use ARIA | 80 | 5 |

### M05 Visual accessibility (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Fix a failing contrast ratio; (2) Respect prefers-reduced-motion
- Common misconception addressed: Conveying meaning with colour alone
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Colour and contrast | 80 | 5 |
| M05L02 | Zoom, motion and text spacing | 80 | 5 |

### M06 Testing (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Run an automated audit and triage issues; (2) Walk a flow with a screen reader
- Common misconception addressed: Assuming a passing automated scan means fully accessible
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Automated and manual testing | 80 | 5 |
| M06L02 | Screen-reader testing | 80 | 5 |

## Integrative case

Audit and fix an inaccessible form-and-modal flow: replace div soup with semantic HTML, make everything keyboard operable with correct focus management, add ARIA only where semantics fall short, fix contrast and visible focus, then verify with a screen reader and an automated checker, documenting what you found and fixed.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0867-final-protected | 40 | 50 | yes |
| MST-0867-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Principles | 7 |
| Semantic HTML | 7 |
| Keyboard and focus | 7 |
| ARIA | 7 |
| Visual accessibility | 6 |
| Testing | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0867-Q0001** (single-answer, Select ONE) Why prefer a native <button> element over a clickable <div> for an action?

- A. It is keyboard-operable and announced correctly by assistive tech by default **(key)**  
  _Rationale:_ Correct: native buttons bring focusability, keyboard activation and correct role for free.
- B. Divs cannot be styled  
  _Rationale:_ Divs can be styled; the issue is semantics and behaviour.
- C. Buttons load faster than divs  
  _Rationale:_ Performance is not the reason; accessibility semantics are.
- D. ARIA is impossible on a div  
  _Rationale:_ ARIA can be added to a div, but recreating full button behaviour is error-prone.

**MST-0867-Q0002** (single-answer, Select ONE) When a modal dialog opens, correct focus management should:

- A. Move focus into the dialog, trap it there, and restore it on close **(key)**  
  _Rationale:_ Correct: focus should move in, stay within the dialog, and return to the trigger on close.
- B. Leave focus on the page behind the modal  
  _Rationale:_ Leaving focus behind lets keyboard users interact with hidden content.
- C. Remove focus from the page entirely  
  _Rationale:_ Focus must land somewhere usable, not be lost.
- D. Hide the dialog from screen readers  
  _Rationale:_ The active dialog must be available to screen readers.

**MST-0867-Q0003** (multiple-answer, Select TWO) Which TWO reflect correct use of ARIA? (Select TWO.)

- A. Use native HTML semantics first and ARIA only to fill gaps **(key)**  
  _Rationale:_ Correct: the first rule of ARIA is to prefer native semantics.
- B. Keep ARIA states like aria-expanded in sync with the UI **(key)**  
  _Rationale:_ Correct: ARIA states must reflect the real current state.
- C. Add role=button to a native <button>  
  _Rationale:_ That is redundant ARIA duplicating native semantics.
- D. Use ARIA to hide required visible focus styles  
  _Rationale:_ ARIA is not for removing focus indicators; visible focus is required.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
