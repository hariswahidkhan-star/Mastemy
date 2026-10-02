# Web Components

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1559` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-SK-WC-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Web Components (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the web components standards and the problems they solve
2. Describe defining custom elements and their lifecycle
3. Explain shadow DOM, style scoping and slots
4. Describe the component's public API through attributes, properties and events
5. Explain using web components across frameworks and distributing them

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Web Components fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify which standard provides each capability; (2) Decide when a web component beats a framework component
- Common misconception addressed: Believing web components require a specific framework
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Custom elements, shadow DOM and templates | 120 | 8 |
| M01L02 | Why framework-agnostic components matter | 120 | 8 |

### M02 Custom elements (MASTEMY-DESIGN 20%)

- Worked applications: (1) Implement the connected and disconnected lifecycle for a widget; (2) React to an attribute change via observedAttributes
- Common misconception addressed: Expecting the constructor to safely touch attributes and children
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Defining and upgrading custom elements | 120 | 8 |
| M02L02 | Lifecycle callbacks and observed attributes | 120 | 8 |

### M03 Shadow DOM and encapsulation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Scope a component's styles so the page cannot leak in; (2) Compose external content through a named slot
- Common misconception addressed: Assuming page CSS can freely style inside a closed shadow tree
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Shadow trees and style encapsulation | 120 | 8 |
| M03L02 | Slots and composition | 120 | 8 |

### M04 Attributes, properties and events (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design the public API for a rating component; (2) Emit a custom event that a parent can listen to
- Common misconception addressed: Confusing HTML attributes with JavaScript properties
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Attributes vs properties and reflection | 120 | 8 |
| M04L02 | Custom events and the component contract | 120 | 8 |

### M05 Interoperability and distribution (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use a custom element inside two different frameworks; (2) Plan how to publish a reusable component package
- Common misconception addressed: Assuming a web component will behave identically with no integration glue in every framework
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Using components inside frameworks | 120 | 8 |
| M05L02 | Packaging and distributing a component library | 120 | 8 |

## Integrative case

A design team must ship UI components usable across several frameworks. Build a custom element with encapsulated styles and slots, define a clean attribute/property/event API, verify it works inside two frameworks, and plan how to package and version it for other teams.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1559-final-protected | 40 | 40 | yes |
| MST-1559-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Web Components fundamentals | 8 |
| Custom elements | 8 |
| Shadow DOM and encapsulation | 8 |
| Attributes, properties and events | 8 |
| Interoperability and distribution | 8 |

Minimum reviewed item bank: 450 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1559-Q0001** (single-answer, Select ONE) What is the primary benefit of rendering a component inside a shadow DOM?

- A. Its internal markup and styles are encapsulated from the surrounding page **(key)**  
  _Rationale:_ Correct: the shadow tree scopes styles and structure so the page and component do not interfere.
- B. It makes the component load faster than any alternative  
  _Rationale:_ Encapsulation is about isolation, not a guaranteed speed gain.
- C. It removes the need to define a custom element  
  _Rationale:_ A custom element is still defined; shadow DOM is its internal tree.
- D. It lets page CSS freely restyle the component internals  
  _Rationale:_ Shadow DOM prevents, not enables, arbitrary external styling of internals.

**MST-1559-Q0002** (multiple-answer, Select TWO) Which TWO statements about a custom element's lifecycle are correct? (Select TWO.)

- A. connectedCallback runs when the element is inserted into the document **(key)**  
  _Rationale:_ Correct: connectedCallback fires on insertion and is a safe place for setup.
- B. attributeChangedCallback runs for attributes listed in observedAttributes **(key)**  
  _Rationale:_ Correct: only observed attributes trigger the callback.
- C. The constructor is the right place to inspect child elements and attributes  
  _Rationale:_ Children and attributes may not be ready in the constructor; defer that work to connectedCallback.
- D. Lifecycle callbacks only work inside a specific framework  
  _Rationale:_ They are part of the standard and work framework-independently.

**MST-1559-Q0003** (single-answer, Select ONE) A parent needs to know when a custom rating element's value changes. What is the idiomatic mechanism?

- A. Dispatch a custom event from the element that the parent listens for **(key)**  
  _Rationale:_ Correct: custom events are the standard way a web component notifies listeners of changes.
- B. Have the parent poll the element's internals every second  
  _Rationale:_ Polling is wasteful and brittle compared with an event.
- C. Reach into the element's shadow DOM from the parent  
  _Rationale:_ Reaching into internals breaks encapsulation and the component contract.
- D. Reload the page on every change  
  _Rationale:_ Reloading destroys state and is not a notification mechanism.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
