# React: Complete Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0869` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official React documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — React: Complete Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build components with props and composition
2. Manage state and the component lifecycle with hooks
3. Handle events, forms and controlled inputs
4. Fetch data and manage side effects
5. Structure, route and deploy a React application

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Components and props (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a reusable presentational component; (2) Compose components via children
- Common misconception addressed: Mutating props inside a child component
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | JSX and components | 120 | 7 |
| M01L02 | Props and composition | 120 | 7 |

### M02 State and hooks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Hold local state with useState; (2) Run an effect with a correct dependency array
- Common misconception addressed: Omitting or misusing the effect dependency array
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | useState and re-rendering | 120 | 7 |
| M02L02 | useEffect and dependencies | 120 | 7 |

### M03 Events and forms (MASTEMY-DESIGN 20%)

- Worked applications: (1) Handle a click to update state; (2) Build a controlled form input
- Common misconception addressed: Mixing controlled and uncontrolled inputs on one field
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Event handling | 120 | 7 |
| M03L02 | Controlled inputs and forms | 120 | 7 |

### M04 Data and side effects (MASTEMY-DESIGN 20%)

- Worked applications: (1) Fetch data when a component mounts; (2) Render loading and error states
- Common misconception addressed: Setting state after a component has unmounted
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Fetching data in effects | 120 | 7 |
| M04L02 | Loading, error and empty states | 120 | 7 |

### M05 Structure and routing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add client-side routes; (2) Produce a production build
- Common misconception addressed: Putting all logic in one giant component
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | App structure and routing | 120 | 7 |
| M05L02 | Building and deploying | 120 | 7 |

## Integrative case

Build a task-tracker React app: compose components with props, manage state and effects with hooks, build a controlled form, fetch and render data with loading and error states, and add routing before producing a production build.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0869-final-protected | 40 | 50 | yes |
| MST-0869-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Components and props | 8 |
| State and hooks | 8 |
| Events and forms | 8 |
| Data and side effects | 8 |
| Structure and routing | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0869-Q0001** (single-answer, Select ONE) What is the correct way to update state in a React function component?

- A. Call the setter returned by useState **(key)**  
  _Rationale:_ Correct: useState returns a setter that triggers a re-render.
- B. Reassign the state variable directly  
  _Rationale:_ Direct reassignment does not trigger a re-render.
- C. Mutate props passed from the parent  
  _Rationale:_ Props are read-only in the child.
- D. Edit the DOM node by hand  
  _Rationale:_ React manages the DOM from state; manual edits are lost on render.

**MST-0869-Q0002** (multiple-answer, Select TWO) Which TWO are true about the useEffect dependency array? (Select TWO.)

- A. An empty array runs the effect once after the initial render **(key)**  
  _Rationale:_ Correct: [] runs the effect only on mount.
- B. Listing a value makes the effect re-run when that value changes **(key)**  
  _Rationale:_ Correct: dependencies control when the effect re-runs.
- C. Omitting the array guarantees the effect runs only once  
  _Rationale:_ Omitting it runs the effect after every render.
- D. The array controls the component's return value  
  _Rationale:_ The array controls effect timing, not render output.

**MST-0869-Q0003** (single-answer, Select ONE) A controlled form input in React derives its value from what?

- A. Component state, updated via an onChange handler **(key)**  
  _Rationale:_ Correct: controlled inputs bind value to state and update on change.
- B. The DOM node's internal value only  
  _Rationale:_ That describes an uncontrolled input.
- C. A global variable mutated directly  
  _Rationale:_ Globals bypass React's data flow.
- D. The server response alone  
  _Rationale:_ Server data may seed state but does not make an input controlled.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
