# SwiftUI: Modern Apple Interface Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0913` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-IS-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — SwiftUI: Modern Apple Interface Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Swift language essentials for UI
2. SwiftUI views and layout
3. State and data flow
4. Lists, navigation and presentation
5. Asynchronous data and networking
6. Polish, accessibility and testing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Swift language essentials for UI (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model a screen's data with structs and optionals; (2) Pass a closure as a callback between two views
- Common misconception addressed: Believing classes are always the right model type for SwiftUI state
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Swift types, optionals and closures | 80 | 6 |
| M01L02 | Value vs reference semantics in UI code | 80 | 6 |

### M02 SwiftUI views and layout (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a profile card with VStack, HStack and modifiers; (2) Lay out an adaptive form that respects Dynamic Type
- Common misconception addressed: Thinking modifier order does not change the rendered result
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Views, modifiers and the view tree | 80 | 6 |
| M02L02 | Stacks, frames and the layout system | 80 | 6 |

### M03 State and data flow (MASTEMY-DESIGN 17%)

- Worked applications: (1) Wire a toggle with @State and pass a @Binding to a child; (2) Share a settings model across a tab view with @Environment
- Common misconception addressed: Storing the same state in two places and expecting them to stay in sync
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | @State, @Binding and the single source of truth | 80 | 6 |
| M03L02 | @Observable, @Environment and shared state | 80 | 6 |

### M04 Lists, navigation and presentation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Render a dynamic list with stable Identifiable rows; (2) Push a detail screen and present a modal sheet
- Common misconception addressed: Using array indices as list identity and getting animation glitches
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lists, ForEach and identity | 80 | 6 |
| M04L02 | NavigationStack, sheets and alerts | 80 | 6 |

### M05 Asynchronous data and networking (MASTEMY-DESIGN 16%)

- Worked applications: (1) Fetch JSON in a .task and decode it into a model; (2) Drive a view through loading, loaded and failed states
- Common misconception addressed: Starting network work in body instead of a lifecycle-safe task
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | async/await and the task modifier | 80 | 6 |
| M05L02 | Loading, error and empty states | 80 | 6 |

### M06 Polish, accessibility and testing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Animate a state change with withAnimation and transitions; (2) Add accessibility labels and audit with the inspector
- Common misconception addressed: Treating accessibility as optional polish rather than core UI
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Animations and transitions | 80 | 6 |
| M06L02 | Accessibility labels and previews | 80 | 6 |

## Integrative case

Build the main screen of a habit-tracking app in SwiftUI: model the habit list, drive it from a single observable source of truth, load today's entries asynchronously with loading and error states, support navigation to a detail view, and make it accessible and animated; then justify each state-management choice.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0913-final-protected | 30 | 30 | yes |
| MST-0913-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Swift language essentials for UI | 5 |
| SwiftUI views and layout | 5 |
| State and data flow | 5 |
| Lists, navigation and presentation | 5 |
| Asynchronous data and networking | 5 |
| Polish, accessibility and testing | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0913-Q0001** (single-answer, Select ONE) A child view must read and change a value owned by its parent. Which property wrapper should the child use for that value?

- A. @Binding **(key)**  
  _Rationale:_ Correct: @Binding gives the child read-write access to state owned elsewhere without duplicating it.
- B. @State  
  _Rationale:_ @State declares new state owned by this view, not a reference to the parent's value.
- C. let  
  _Rationale:_ A plain let is read-only and cannot write back to the parent.
- D. @Environment  
  _Rationale:_ @Environment reads shared context, not a specific parent-owned value passed down explicitly.

**MST-0913-Q0002** (multiple-answer, Select TWO) Which TWO statements about SwiftUI view modifiers are correct? (Select TWO)

- A. Modifier order can change the final layout and appearance **(key)**  
  _Rationale:_ Correct: each modifier wraps the previous result, so order matters.
- B. A modifier returns a new view rather than mutating the original **(key)**  
  _Rationale:_ Correct: modifiers are value-returning; SwiftUI views are value types.
- C. Modifiers can only be applied once per view  
  _Rationale:_ The same modifier can be applied multiple times with different effects.
- D. Modifiers execute imperatively at call time like UIKit setters  
  _Rationale:_ They describe a declarative view tree, not immediate imperative mutations.

**MST-0913-Q0003** (single-answer, Select ONE) Where should a SwiftUI view start an asynchronous fetch tied to its lifecycle?

- A. In a .task modifier **(key)**  
  _Rationale:_ Correct: .task starts work when the view appears and cancels it when the view disappears.
- B. Directly in the view's body  
  _Rationale:_ body can run many times; side effects there cause repeated, uncontrolled work.
- C. In the struct's initializer  
  _Rationale:_ init runs during view construction and has no lifecycle or cancellation.
- D. In a global function called at launch  
  _Rationale:_ That is not tied to the view and cannot be cancelled with it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
