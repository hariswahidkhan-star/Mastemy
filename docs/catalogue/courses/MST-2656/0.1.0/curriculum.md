# Excel Automation with Macros and VBA

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2656` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Microsoft Excel and AI product features change often; this spec teaches durable concepts and must have product specifics re-verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel Automation with Macros and VBA (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Record and run macros, and decide when recording versus writing VBA is appropriate
2. Read and edit recorded code in the Visual Basic Editor with confidence
3. Use variables, ranges, loops (For/For Each) and conditionals (If/Select Case) in VBA
4. Write Sub procedures and simple Functions, and reference cells and sheets safely
5. Handle errors and debug with breakpoints, the Immediate window and Option Explicit
6. Save macro-enabled workbooks securely and respect macro-security and trust settings

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Recording and the VBE (25% (design weight), design weight)

- Worked applications: (1) Record a formatting macro then read the generated code to understand it; (2) Assign a macro to a button so colleagues can run it
- Common misconception addressed: Recording a macro with absolute references when relative was needed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Recording, running and assigning macros | 120 | 7 |
| M01L02 | Navigating the Visual Basic Editor | 120 | 7 |

### M02 Core VBA language (25% (design weight), design weight)

- Worked applications: (1) Loop over a range with For Each to flag rows that meet a condition; (2) Declare variables with explicit types after turning on Option Explicit
- Common misconception addressed: Omitting Option Explicit and letting a typo create a silent empty variable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Variables, data types and Option Explicit | 120 | 7 |
| M02L02 | Loops, conditionals and working with ranges | 120 | 7 |

### M03 Procedures and structure (25% (design weight), design weight)

- Worked applications: (1) Refactor recorded code to act on a range directly instead of selecting it; (2) Write a small Function that returns a value for reuse in formulas
- Common misconception addressed: Relying on .Select and ActiveCell, making code slow and fragile
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sub procedures and Functions | 120 | 7 |
| M03L02 | Referencing sheets, workbooks and avoiding Select | 120 | 7 |

### M04 Reliability and security (25% (design weight), design weight)

- Worked applications: (1) Add On Error handling so a macro fails gracefully with a message; (2) Step through code with breakpoints and inspect values in the Immediate window
- Common misconception addressed: Enabling macros from an untrusted source without checking what they do
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Error handling and debugging tools | 120 | 7 |
| M04L02 | Macro security, signing and .xlsm files | 120 | 7 |

## Integrative case

An analyst repeats the same ten-step monthly report formatting by hand: they record a first version, refactor it in the VBE to loop over the data and avoid Select, add error handling and a run button, and save it as a signed macro-enabled workbook for the team.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2656-final-protected | 40 | 40 | yes |
| MST-2656-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Recording and the VBE | 10 |
| Core VBA language | 10 |
| Procedures and structure | 10 |
| Reliability and security | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2656-Q0001** (single-answer, Select ONE) When is recording a macro the better starting point rather than writing VBA from scratch?

- A. For a simple, repetitive UI task where you can learn from the generated code **(key)**  
  _Rationale:_ Correct: recording captures routine steps and is a good way to see the object model, then refine the code.
- B. For complex logic with loops and decisions across many files  
  _Rationale:_ Recorders cannot capture loops or conditional logic well.
- C. Whenever you want error handling built in automatically  
  _Rationale:_ Recorders do not add error handling.
- D. Never; recording produces no usable code  
  _Rationale:_ Recorded code is usable and often a helpful starting point.

**MST-2656-Q0002** (multiple-answer, Select TWO) Which TWO practices make VBA more reliable and maintainable? (Select TWO.)

- A. Turn on Option Explicit and declare variables **(key)**  
  _Rationale:_ Correct: it catches typos and undeclared variables at compile time.
- B. Act on ranges directly instead of using .Select and ActiveCell **(key)**  
  _Rationale:_ Correct: avoiding Select makes code faster and less fragile.
- C. Enable all macros from any source by default  
  _Rationale:_ That is a security risk, not a reliability practice.
- D. Put all logic in one giant unbroken procedure  
  _Rationale:_ Breaking work into procedures improves readability and reuse.

**MST-2656-Q0003** (single-answer, Select ONE) A macro-enabled file must be shared across a team with macro-security in mind. What is the appropriate step?

- A. Save as .xlsm and digitally sign the project so recipients can trust it **(key)**  
  _Rationale:_ Correct: a signed .xlsm lets users enable macros based on a trusted publisher.
- B. Save as .xlsx to keep the macros embedded  
  _Rationale:_ .xlsx cannot store macros at all.
- C. Tell everyone to disable macro security entirely  
  _Rationale:_ Disabling security exposes users to malicious code.
- D. Email the code as plain text to paste manually  
  _Rationale:_ That is error-prone and bypasses signing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
