# React Forms, Validation, and Complex User Flows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0872` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — React Forms, Validation, and Complex User Flows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build controlled React forms
2. Validate input and show accessible errors
3. Use a form library effectively
4. Implement multi-step and asynchronous flows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Controlled forms (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a controlled multi-field form; (2) Reset and prefill form state
- Common misconception addressed: Mixing controlled and uncontrolled behaviour on one input
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Controlled vs uncontrolled inputs | 120 | 7 |
| M01L02 | Managing form state | 120 | 7 |

### M02 Validation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Validate on blur and on submit; (2) Show accessible field-level errors
- Common misconception addressed: Relying on client-side validation alone for security
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Client-side validation patterns | 120 | 7 |
| M02L02 | Schema validation and error display | 120 | 7 |

### M03 Form libraries (MASTEMY-DESIGN 25%)

- Worked applications: (1) Rebuild a form with React Hook Form; (2) Attach a schema validator
- Common misconception addressed: Re-rendering the whole form on every keystroke
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | React Hook Form basics | 120 | 7 |
| M03L02 | Schema resolvers and performance | 120 | 7 |

### M04 Complex flows (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a three-step wizard that preserves state; (2) Handle an async submit with error recovery
- Common misconception addressed: Losing user input when navigating between steps
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Multi-step wizards and shared state | 120 | 7 |
| M04L02 | Asynchronous submission and optimistic UI | 120 | 7 |

## Integrative case

Build a multi-step account-setup flow: controlled fields with schema validation and accessible errors, a form library to limit re-renders, state preserved across steps, and an asynchronous submit with error recovery, while remembering server-side validation is still required.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0872-final-protected | 40 | 50 | yes |
| MST-0872-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Controlled forms | 10 |
| Validation | 10 |
| Form libraries | 10 |
| Complex flows | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0872-Q0001** (single-answer, Select ONE) A controlled input in React derives its value from...

- A. component state **(key)**  
  _Rationale:_ Correct: a controlled input's value comes from state.
- B. the DOM node only  
  _Rationale:_ That describes an uncontrolled input.
- C. a ref in every case  
  _Rationale:_ Refs are typical of uncontrolled inputs.
- D. localStorage  
  _Rationale:_ Storage is not the source of a controlled value.

**MST-0872-Q0002** (multiple-answer, Select TWO) Which TWO statements about form validation are correct? (Select TWO.)

- A. Client-side validation improves UX but is not a security control **(key)**  
  _Rationale:_ Correct: client checks help users but can be bypassed.
- B. The server must still validate submitted data **(key)**  
  _Rationale:_ Correct: trustworthy validation happens on the server.
- C. Client-side validation alone is sufficient for security  
  _Rationale:_ Clients can be bypassed, so this is unsafe.
- D. Errors should be hidden from screen readers  
  _Rationale:_ Errors must be accessible to assistive technology.

**MST-0872-Q0003** (single-answer, Select ONE) In a multi-step wizard, user input should be...

- A. preserved in shared state across steps **(key)**  
  _Rationale:_ Correct: shared state keeps earlier input available.
- B. discarded between steps  
  _Rationale:_ Discarding input frustrates users.
- C. stored only in the URL  
  _Rationale:_ The URL is not a general store for all input.
- D. re-entered at each step  
  _Rationale:_ Re-entry is poor UX and unnecessary.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
