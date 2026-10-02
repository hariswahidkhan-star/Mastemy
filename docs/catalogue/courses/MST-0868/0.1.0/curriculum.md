# Browser APIs, DOM, and Client-Side Storage

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0868` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Browser APIs, DOM, and Client-Side Storage (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Manipulate the DOM efficiently
2. Handle events with delegation
3. Use fetch and common browser APIs
4. Choose and use client-side storage appropriately

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The DOM (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a list by creating DOM nodes; (2) Update text and attributes safely
- Common misconception addressed: Rebuilding the whole DOM on every change
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The DOM tree: selecting and traversing nodes | 120 | 7 |
| M01L02 | Creating, updating and removing elements | 120 | 7 |

### M02 Events (MASTEMY-DESIGN 25%)

- Worked applications: (1) Use delegation for a dynamic list; (2) Remove a listener to avoid a leak
- Common misconception addressed: Attaching a listener per item instead of delegating
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Event flow, bubbling and capture | 120 | 7 |
| M02L02 | Delegation and listener management | 120 | 7 |

### M03 Browser APIs (MASTEMY-DESIGN 25%)

- Worked applications: (1) Fetch JSON and render it with error handling; (2) Lazy-load content with IntersectionObserver
- Common misconception addressed: Ignoring fetch error and HTTP-status handling
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Fetch and asynchronous requests | 120 | 7 |
| M03L02 | Common Web APIs (Intersection, History and more) | 120 | 7 |

### M04 Client-side storage (MASTEMY-DESIGN 25%)

- Worked applications: (1) Persist a preference in localStorage; (2) Store structured data in IndexedDB
- Common misconception addressed: Storing sensitive data in localStorage
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | localStorage, sessionStorage and cookies | 120 | 7 |
| M04L02 | IndexedDB and choosing storage | 120 | 7 |

## Integrative case

Build a small offline-friendly notes widget: render notes into the DOM, use event delegation for actions, fetch initial data with error handling, and persist notes in the right client-side storage while keeping sensitive data out of localStorage.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0868-final-protected | 40 | 50 | yes |
| MST-0868-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The DOM | 10 |
| Events | 10 |
| Browser APIs | 10 |
| Client-side storage | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0868-Q0001** (single-answer, Select ONE) Event delegation attaches a listener to...

- A. a common ancestor and relies on event bubbling **(key)**  
  _Rationale:_ Correct: one ancestor listener handles events from many children.
- B. each element individually  
  _Rationale:_ That is the opposite of delegation.
- C. only the window object  
  _Rationale:_ Delegation usually targets a closer ancestor, not just window.
- D. the document <head>  
  _Rationale:_ The head does not contain the interactive elements.

**MST-0868-Q0002** (multiple-answer, Select TWO) Which TWO statements about client-side storage are correct? (Select TWO.)

- A. IndexedDB suits larger, structured client-side data **(key)**  
  _Rationale:_ Correct: IndexedDB is designed for larger structured records.
- B. localStorage is best for small key/value preferences **(key)**  
  _Rationale:_ Correct: localStorage holds small string key/value data.
- C. Cookies are ideal for storing megabytes of data  
  _Rationale:_ Cookies are tiny and sent with every request.
- D. The URL hash should hold all application data  
  _Rationale:_ The URL is not a general data store.

**MST-0868-Q0003** (single-answer, Select ONE) Why avoid storing authentication tokens in localStorage?

- A. It is readable by any script and exposed to XSS **(key)**  
  _Rationale:_ Correct: localStorage is accessible to any script on the page.
- B. It is too small to hold a token  
  _Rationale:_ Size is not the main concern.
- C. It is automatically encrypted  
  _Rationale:_ localStorage is not encrypted.
- D. Values expire instantly  
  _Rationale:_ localStorage values persist until cleared.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
