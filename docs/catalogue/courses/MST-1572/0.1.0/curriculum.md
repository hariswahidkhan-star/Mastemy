# ISTQB Foundation-Aligned Software Testing Concepts

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1572` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ISTQB Foundation-Aligned Software Testing Concepts (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Fundamentals of testing
2. Testing throughout the SDLC
3. Static testing
4. Test design techniques
5. Test management
6. Tool support for testing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Fundamentals of testing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Classify an error, a defect and a failure in a scenario; (2) Explain why exhaustive testing is impossible
- Common misconception addressed: Believing testing can prove software is completely bug-free
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why testing is needed and the seven principles | 80 | 6 |
| M01L02 | Error, defect and failure; the test process | 80 | 6 |

### M02 Testing throughout the SDLC (MASTEMY-DESIGN 17%)

- Worked applications: (1) Assign a check to the correct test level; (2) Match a test type to a quality characteristic
- Common misconception addressed: Thinking all testing happens only at the end
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Test levels: component to acceptance | 80 | 6 |
| M02L02 | Test types and maintenance testing | 80 | 6 |

### M03 Static testing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose a review type for a requirements document; (2) Explain a defect static analysis can find that tests cannot
- Common misconception addressed: Assuming static testing requires executing the code
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reviews and their benefits | 80 | 6 |
| M03L02 | Static analysis vs dynamic testing | 80 | 6 |

### M04 Test design techniques (MASTEMY-DESIGN 16%)

- Worked applications: (1) Derive equivalence partitions and boundary values for an input; (2) Pick a technique for a given testing goal
- Common misconception addressed: Using only valid inputs and ignoring boundaries and invalid classes
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Black-box techniques: equivalence and boundary | 80 | 6 |
| M04L02 | White-box and experience-based techniques | 80 | 6 |

### M05 Test management (MASTEMY-DESIGN 17%)

- Worked applications: (1) Prioritise tests using product risk; (2) Write a clear, reproducible defect report
- Common misconception addressed: Measuring progress by number of tests run rather than risk covered
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Planning, estimation and risk-based testing | 80 | 6 |
| M05L02 | Monitoring, control and defect management | 80 | 6 |

### M06 Tool support for testing (MASTEMY-DESIGN 18%)

- Worked applications: (1) Match a task to a suitable tool category; (2) Plan a pilot before rolling a tool out widely
- Common misconception addressed: Expecting a tool to fix a weak testing process on its own
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Categories of test tools | 80 | 6 |
| M06L02 | Benefits, risks and introducing tools | 80 | 6 |

## Integrative case

Plan testing for a small web feature: apply the testing principles to set expectations, place checks at the right test levels, use a review and static analysis early, design cases with equivalence partitioning and boundary values, prioritise with risk, write clear defect reports, and choose a tool category to support the work. This course teaches testing concepts; it does not grant the ISTQB certification.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1572-final-protected | 30 | 30 | yes |
| MST-1572-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Fundamentals of testing | 5 |
| Testing throughout the SDLC | 5 |
| Static testing | 5 |
| Test design techniques | 5 |
| Test management | 5 |
| Tool support for testing | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1572-Q0001** (single-answer, Select ONE) Which statement reflects a core principle of software testing?

- A. Testing can show the presence of defects but cannot prove their absence **(key)**  
  _Rationale:_ Correct: testing reduces risk but cannot prove software is defect-free.
- B. Exhaustive testing of all inputs is always feasible  
  _Rationale:_ Exhaustive testing is impossible for non-trivial software.
- C. Finding zero defects means the software has no defects  
  _Rationale:_ Zero found defects does not prove none exist.
- D. Testing should only start after release  
  _Rationale:_ Early testing is a principle; starting after release is too late.

**MST-1572-Q0002** (multiple-answer, Select ALL that apply) For an input field that accepts integers from 1 to 100, which two values are boundary values worth testing? (Select TWO)

- A. 0 (just below the lower bound) **(key)**  
  _Rationale:_ Correct: just outside the lower boundary is a classic boundary value.
- B. 100 (the upper bound) **(key)**  
  _Rationale:_ Correct: the upper boundary itself is a boundary value.
- C. The string 'fifty'  
  _Rationale:_ That is an invalid type, not a numeric boundary value.
- D. Any random number such as 42  
  _Rationale:_ A mid-range value is a partition representative, not a boundary.

**MST-1572-Q0003** (single-answer, Select ONE) What is the key distinction between static testing and dynamic testing?

- A. Static testing examines artefacts without executing the code; dynamic testing runs it **(key)**  
  _Rationale:_ Correct: static testing (reviews, analysis) finds defects without execution.
- B. Static testing always requires running the program  
  _Rationale:_ Static testing does not execute the code.
- C. Dynamic testing never involves executing software  
  _Rationale:_ Dynamic testing is defined by executing the software.
- D. They are two names for the same activity  
  _Rationale:_ They are distinct approaches with different strengths.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
