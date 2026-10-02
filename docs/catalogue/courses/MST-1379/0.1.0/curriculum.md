# AI for Software Testers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1379` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 480 min; instruction I = 384 min (80%); assessment A = 96 min (20%) |
| Assessment split | lesson checks 24 / module checks 34 / cumulative 38 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify where AI supports software testing workflows
2. Use AI to generate and review test cases responsibly
3. Apply AI to test data, exploration and defect analysis
4. Recognise the limits and risks of AI-generated tests
5. Keep human judgement and coverage accountability in QA

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in the testing workflow (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map AI uses across planning, execution and reporting; (2) Identify one testing task AI should not own alone
- Common misconception addressed: Believing AI can fully replace a tester's judgement
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI helps in QA | 39 | 6 |
| M01L02 | Tools, claims and realistic limits | 39 | 6 |

### M02 Generating and reviewing test cases (MASTEMY-DESIGN 20%)

- Worked applications: (1) Review an AI-generated test suite for missing edge cases; (2) Turn a requirement into AI-drafted tests, then correct them
- Common misconception addressed: Trusting AI-generated tests without reviewing coverage
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI-assisted test case generation | 39 | 6 |
| M02L02 | Reviewing for coverage and correctness | 39 | 6 |

### M03 Test data and exploration (MASTEMY-DESIGN 20%)

- Worked applications: (1) Generate test data with AI and check for privacy leakage; (2) Use AI to suggest exploratory test ideas, then prioritise
- Common misconception addressed: Assuming AI-made test data is always realistic and safe
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AI-generated test data and its risks | 38 | 6 |
| M03L02 | Exploratory testing support | 38 | 6 |

### M04 Defect analysis and triage (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use AI to cluster duplicate defect reports; (2) Verify an AI-suggested root cause against the evidence
- Common misconception addressed: Accepting an AI root-cause guess without verifying it
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | AI-assisted defect triage | 38 | 6 |
| M04L02 | Analysing logs and failures with AI | 38 | 6 |

### M05 Risk, limits and accountability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a false sense of coverage in an AI test report; (2) Place human sign-off on critical-path testing
- Common misconception addressed: Treating a passing AI test suite as proof of quality
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Limits of AI-generated testing | 38 | 6 |
| M05L02 | Human accountability for coverage | 38 | 6 |

## Integrative case

A QA engineer wants to use AI to speed up test creation for a web app. Decide where AI genuinely helps, where AI-generated tests could give false confidence, and design a process that keeps real coverage and human review of critical paths.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1379-final-protected | 25 | 25 | yes |
| MST-1379-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in the testing workflow | 5 |
| Generating and reviewing test cases | 5 |
| Test data and exploration | 5 |
| Defect analysis and triage | 5 |
| Risk, limits and accountability | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1379-Q0001** (single-answer, Select ONE) An AI tool generates 200 passing tests for a feature. Why is this not proof the feature is well tested?

- A. The tests may miss important edge cases and critical paths **(key)**  
  _Rationale:_ Correct: volume of passing tests does not equal meaningful coverage.
- B. More tests always mean better coverage  
  _Rationale:_ Quantity does not guarantee the right coverage.
- C. Passing tests prove there are no bugs  
  _Rationale:_ Passing tests only cover what they check.
- D. AI tests never need review  
  _Rationale:_ AI-generated tests require coverage review.

**MST-1379-Q0002** (multiple-answer, Select TWO) Which TWO practices keep AI-assisted testing trustworthy? (Select TWO.)

- A. Have a human review coverage of critical paths **(key)**  
  _Rationale:_ Correct: human review ensures important paths are tested.
- B. Verify AI-suggested root causes against evidence **(key)**  
  _Rationale:_ Correct: verification prevents acting on wrong diagnoses.
- C. Accept all AI tests without reading them  
  _Rationale:_ Blind acceptance risks weak or wrong tests.
- D. Treat a green run as a guarantee of quality  
  _Rationale:_ A green run only reflects the tests that exist.

**MST-1379-Q0003** (single-answer, Select ONE) What is a key risk when using AI to generate test data from production examples?

- A. Real personal or sensitive data could leak into test environments **(key)**  
  _Rationale:_ Correct: using production-derived data can expose sensitive information.
- B. Test data is never sensitive  
  _Rationale:_ Test data can contain or mirror sensitive information.
- C. AI data is always perfectly representative  
  _Rationale:_ AI-generated data may be unrealistic or skewed.
- D. Privacy rules never apply to testing  
  _Rationale:_ Privacy obligations extend to test data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
