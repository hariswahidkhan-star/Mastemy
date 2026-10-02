# Mobile App Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1562` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-SK-MAA-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Mobile App Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the goals and trade-offs of mobile app architecture
2. Describe common presentation patterns such as MVC, MVVM and MVI
3. Explain managing state and unidirectional data flow
4. Describe the repository pattern and local/remote data sources
5. Explain modularisation and dependency inversion for scalable apps

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Architecture goals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Name the architectural goal a given pain point violates; (2) Weigh a simple vs layered structure for a small app
- Common misconception addressed: Believing more layers always mean better architecture
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why architecture matters on mobile | 120 | 8 |
| M01L02 | Separation of concerns and testability | 120 | 8 |

### M02 Presentation patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map responsibilities to layers for one screen; (2) Choose a pattern for a form-heavy screen and justify it
- Common misconception addressed: Assuming one presentation pattern is correct for every screen
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | MVC, MVVM and MVI compared | 120 | 8 |
| M02L02 | Choosing a pattern and binding the view | 120 | 8 |

### M03 State and data flow (MASTEMY-DESIGN 20%)

- Worked applications: (1) Redesign two-way tangled state into one-way flow; (2) Identify the single source of truth for a feature
- Common misconception addressed: Keeping the same state in several places and syncing by hand
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | App state, UI state and single source of truth | 120 | 8 |
| M03L02 | Unidirectional data flow and events | 120 | 8 |

### M04 Data and persistence layer (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a repository that merges cache and network; (2) Decide an offline strategy for a read-heavy feature
- Common misconception addressed: Letting the UI talk directly to the network and database everywhere
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Repositories and data sources | 120 | 8 |
| M04L02 | Caching, offline and persistence strategy | 120 | 8 |

### M05 Modularity and dependency management (MASTEMY-DESIGN 20%)

- Worked applications: (1) Split a monolithic app into feature modules; (2) Invert a hard dependency so a layer is testable
- Common misconception addressed: Treating dependency injection as only a framework rather than a principle
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Modules, boundaries and dependency injection | 120 | 8 |
| M05L02 | Scaling the architecture as the app grows | 120 | 8 |

## Integrative case

A fast-growing mobile app has tangled state, untestable screens and UI code talking straight to the network. Choose a presentation pattern per surface, establish unidirectional data flow and a single source of truth, introduce a repository layer, and modularise the app with dependency inversion. Defend the design for testability and growth.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1562-final-protected | 40 | 40 | yes |
| MST-1562-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Architecture goals | 8 |
| Presentation patterns | 8 |
| State and data flow | 8 |
| Data and persistence layer | 8 |
| Modularity and dependency management | 8 |

Minimum reviewed item bank: 450 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1562-Q0001** (single-answer, Select ONE) A screen mixes UI rendering, business rules and direct network calls in one class, making it hard to test. Which principle most directly addresses this?

- A. Separation of concerns across layers **(key)**  
  _Rationale:_ Correct: separating UI, logic and data into layers makes each independently testable and maintainable.
- B. Adding more global variables  
  _Rationale:_ More globals increase coupling and worsen testability.
- C. Removing all abstractions  
  _Rationale:_ Removing structure makes the tangle worse, not better.
- D. Rendering the screen on a background thread  
  _Rationale:_ Threading does not address the mixing of responsibilities.

**MST-1562-Q0002** (multiple-answer, Select TWO) Which TWO are benefits of unidirectional data flow with a single source of truth? (Select TWO.)

- A. State changes are predictable and easier to trace **(key)**  
  _Rationale:_ Correct: one-way flow makes it clear how and where state changes.
- B. There is one authoritative copy of state to reason about **(key)**  
  _Rationale:_ Correct: a single source of truth avoids divergent copies.
- C. It guarantees the app needs no network code  
  _Rationale:_ Data flow design is unrelated to whether networking exists.
- D. It removes the need for any state at all  
  _Rationale:_ State still exists; it is organised, not eliminated.

**MST-1562-Q0003** (single-answer, Select ONE) Why introduce a repository between the UI and the data sources?

- A. It gives the UI one interface and hides whether data comes from cache or network **(key)**  
  _Rationale:_ Correct: the repository abstracts data sources so the UI depends on an interface, aiding testing and caching.
- B. It makes the UI call the database directly  
  _Rationale:_ A repository exists precisely to stop the UI calling data sources directly.
- C. It removes the need for any remote data  
  _Rationale:_ Repositories coordinate remote and local data; they do not remove remote data.
- D. It is only a naming convention with no effect  
  _Rationale:_ It changes dependencies and testability, not just naming.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
