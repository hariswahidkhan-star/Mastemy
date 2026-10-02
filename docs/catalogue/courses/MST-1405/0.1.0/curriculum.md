# AI for Engineers (CAE and Design)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1405` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Identify AI use cases in CAE and engineering design
2. Use AI for generative design and optimisation responsibly
3. Validate AI outputs against physics and standards
4. Recognise data, IP and reliability constraints
5. Judge safety, verification and oversight needs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in engineering design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map AI uses across the design workflow; (2) Pick the highest-value use case
- Common misconception addressed: Treating AI design output as verified engineering truth
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI fits in CAE and design | 39 | 6 |
| M01L02 | Benefits, limits and realistic expectations | 39 | 6 |

### M02 Generative design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Judge a generated design against requirements; (2) Decide which option needs further analysis
- Common misconception addressed: Accepting a generated design without validation
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How generative design works | 39 | 6 |
| M02L02 | Evaluating generated design options | 39 | 6 |

### M03 Simulation and optimisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Check a surrogate model against known physics; (2) Interrogate an optimisation result
- Common misconception addressed: Trusting a fast surrogate over validated physics
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AI-assisted simulation surrogates | 38 | 6 |
| M03L02 | Optimisation and its limits | 38 | 6 |

### M04 Validation and standards (MASTEMY-DESIGN 20%)

- Worked applications: (1) Plan a validation check for an AI output; (2) Map an output to a relevant standard
- Common misconception addressed: Skipping verification because the AI looks confident
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Verifying AI outputs | 38 | 6 |
| M04L02 | Standards, safety and sign-off | 38 | 6 |

### M05 Data, IP and risk (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot an IP risk in AI-assisted design; (2) Define oversight for AI in a design process
- Common misconception addressed: Assuming AI outputs carry no data or IP risk
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Design data and IP | 38 | 6 |
| M05L02 | Reliability and oversight | 38 | 6 |

## Integrative case

An engineering team wants to apply AI in CAE and design. Decide where AI helps in simulation, generative design and optimisation, validate AI outputs against physics and standards, and manage risk and responsibility.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1405-final-protected | 25 | 25 | yes |
| MST-1405-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in engineering design | 5 |
| Generative design | 5 |
| Simulation and optimisation | 5 |
| Validation and standards | 5 |
| Data, IP and risk | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1405-Q0001** (single-answer, Select ONE) An AI surrogate model predicts a part will pass a stress test. What should the engineer do?

- A. Validate the prediction against physics-based analysis and standards **(key)**  
  _Rationale:_ Correct: surrogates must be validated before sign-off.
- B. Approve the part immediately  
  _Rationale:_ Unvalidated predictions are not sign-off evidence.
- C. Assume the surrogate is as reliable as full analysis  
  _Rationale:_ Surrogates can be inaccurate outside their range.
- D. Ignore relevant engineering standards  
  _Rationale:_ Standards still apply.

**MST-1405-Q0002** (multiple-answer, Select TWO) Which TWO practices support responsible AI use in engineering design? (Select TWO.)

- A. Verify AI outputs against physics and applicable standards **(key)**  
  _Rationale:_ Correct: verification protects safety and quality.
- B. Keep engineering oversight and sign-off **(key)**  
  _Rationale:_ Correct: human oversight remains essential.
- C. Treat generated designs as final without analysis  
  _Rationale:_ Generated designs need validation.
- D. Ignore IP risks in reused design data  
  _Rationale:_ IP risks must be managed.

**MST-1405-Q0003** (single-answer, Select ONE) Why is generative design an option generator rather than a final answer?

- A. Its options still require engineering judgement, analysis and validation **(key)**  
  _Rationale:_ Correct: generated options are starting points, not verified solutions.
- B. It always produces the optimal manufacturable part  
  _Rationale:_ Options may be impractical or unverified.
- C. It removes the need for analysis  
  _Rationale:_ Analysis is still required.
- D. It guarantees compliance with standards  
  _Rationale:_ Compliance must be checked separately.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
