# App Development Basics for Teens (Ages 14-17)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2904` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal blueprint (no external syllabus) |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — App Development Basics for Teens (Ages 14-17) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the stages of building a simple app
2. Sketch a user interface and user flow for an app idea
3. Explain the role of events and event handlers in an app
4. Connect interface elements to code that responds to users
5. Store and display simple data within an app
6. Test an app with users and improve it

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 App basics and planning (25% (design weight), design weight)

- Worked applications: (1) Write the one-sentence purpose of your app; (2) Identify who the app is for and their main need
- Common misconception addressed: Thinking you should start coding before planning the app
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What an app is and how apps are built | 120 | 7 |
| M01L02 | Defining the app's purpose and users | 120 | 7 |

### M02 Designing the interface (25% (design weight), design weight)

- Worked applications: (1) Sketch three screens and how the user moves between them; (2) Mark the main action on each screen
- Common misconception addressed: Thinking a cluttered screen is as usable as a clear one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sketching screens and user flow | 120 | 7 |
| M02L02 | Usability and clear layout | 120 | 7 |

### M03 Events and logic (25% (design weight), design weight)

- Worked applications: (1) Make a button show a message when tapped; (2) Read a text input and use it in a response
- Common misconception addressed: Thinking code in an app runs top-to-bottom without events
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Events and event handlers | 120 | 7 |
| M03L02 | Connecting buttons and inputs to code | 120 | 7 |

### M04 Data and testing (25% (design weight), design weight)

- Worked applications: (1) Save a short to-do item and show it in a list; (2) Change the app after watching someone use it
- Common misconception addressed: Thinking an app is finished without any user testing
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Storing and displaying simple data | 120 | 7 |
| M04L02 | User testing and iteration | 120 | 7 |

## Integrative case

Learners design and prototype a simple 'habit tracker' app: they define its purpose and users, sketch the screens and flow, wire up buttons and inputs with event handlers, store and display a short list of habits, then test it with a classmate and make one improvement.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2904-final-protected | 40 | 40 | yes |
| MST-2904-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| App basics and planning | 10 |
| Designing the interface | 10 |
| Events and logic | 10 |
| Data and testing | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2904-Q0001** (single-answer, Select ONE) In most apps, why is code often attached to 'events' such as a button tap?

- A. Because the app waits for the user to act, then the matching code runs in response **(key)**  
  _Rationale:_ Correct: event-driven apps respond to user actions.
- B. Because events make the phone charge faster  
  _Rationale:_ Events control responses, not charging.
- C. Because apps cannot use buttons  
  _Rationale:_ Apps commonly use buttons tied to events.
- D. Because code can only ever run once  
  _Rationale:_ Event code can run many times, each time the event happens.

**MST-2904-Q0002** (multiple-answer, Select TWO) Which TWO are good practices when designing an app's interface? (Select TWO.)

- A. Making the main action clear and easy to find **(key)**  
  _Rationale:_ Correct: a clear main action improves usability.
- B. Testing the layout with real users **(key)**  
  _Rationale:_ Correct: user testing reveals confusing design.
- C. Packing every screen with as many buttons as possible  
  _Rationale:_ Cluttered screens are harder to use.
- D. Hiding how to move between screens  
  _Rationale:_ Users need a clear flow between screens.

**MST-2904-Q0003** (single-answer, Select ONE) After testing, a user keeps tapping the wrong button to add an item. What is the best response?

- A. Improve the design (clearer label or placement) and test again **(key)**  
  _Rationale:_ Correct: iterate on the design based on user feedback.
- B. Blame the user for tapping wrongly  
  _Rationale:_ Design should guide users, not blame them.
- C. Remove the add feature entirely  
  _Rationale:_ The feature is needed; improve its design instead.
- D. Ignore the feedback  
  _Rationale:_ User feedback should guide improvements.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
