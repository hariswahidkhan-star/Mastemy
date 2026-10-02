# ASQ Certified Reliability Engineer: CRE

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0318` v0.1.0 | Batch 8 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ASQ (no affiliation or endorsement) |
| Exam code | CRE |
| Version basis | unresolved — not verified from official source |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; no official source read |
| Legacy IDs | MST-ENG-ASQ-CRE-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> Modules below are **Mastemy design groupings**, not a reproduction of the official blueprint. Official domain weightings, objective IDs, item counts and durations were not verified (issuer domain egress blocked on 2026-10-02).

## Learning outcomes

1. Explain reliability concepts, management and the reliability engineer's role
2. Apply reliability in design and development
3. Apply reliability modeling, prediction and data analysis
4. Explain reliability testing, maintainability and improvement

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Reliability management and concepts (design grouping; weight not published/verified)

- Worked applications: (1) Interpret a reliability requirement and express it as a measurable target; (2) Decide where in the lifecycle to invest to improve reliability
- Common misconception addressed: Treating reliability as something tested in at the end rather than designed in
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Reliability concepts and terminology | 100 | 6 |
| M01L02 | Reliability program management | 100 | 6 |
| M01L03 | Reliability and the product lifecycle | 100 | 6 |
| M01L04 | Cost and risk of unreliability | 100 | 6 |

### M02 Design for reliability (design grouping; weight not published/verified)

- Worked applications: (1) Build a simple FMEA for a component and prioritize by risk; (2) Decide whether redundancy or derating better addresses a failure mode
- Common misconception addressed: Assuming adding redundancy is always the cheapest reliability improvement
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Reliability in design | 100 | 6 |
| M02L02 | FMEA fundamentals | 100 | 6 |
| M02L03 | Redundancy and derating | 100 | 6 |
| M02L04 | Design reviews for reliability | 100 | 6 |

### M03 Modeling, testing and maintainability (design grouping; weight not published/verified)

- Worked applications: (1) Choose a life distribution for a component's failure data; (2) Compute availability from a mean-time-to-failure and repair time
- Common misconception addressed: Confusing reliability with availability and ignoring repair time
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reliability distributions and modeling | 100 | 6 |
| M03L02 | Life data and reliability prediction | 100 | 6 |
| M03L03 | Reliability testing methods | 100 | 6 |
| M03L04 | Maintainability and availability | 100 | 6 |

## Integrative case

A product team with field failures asks a reliability engineer to set measurable reliability targets, run an FMEA, choose a life model from failure data and plan testing to improve availability.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0318-practice-form-A | 45 | 45 | yes |
| MST-0318-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0318-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0318-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Reliability management and concepts | 15 |
| Design for reliability | 15 |
| Modeling, testing and maintainability | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0318-Q0001** (single-answer, Select ONE) Reliability is most effectively achieved by:

- A. Designing reliability in early, not only testing it at the end **(key)**  
  _Rationale:_ Correct: reliability is designed in across the lifecycle.
- B. Inspecting finished products harder  
  _Rationale:_ End inspection does not create reliability.
- C. Waiting for field failures to react  
  _Rationale:_ Reactive handling is costly and late.
- D. Ignoring failure modes during design  
  _Rationale:_ Ignoring failure modes reduces reliability.

**MST-0318-Q0002** (single-answer, Select ONE) A system has a known mean time to failure and a known repair time. These together let you compute:

- A. Availability **(key)**  
  _Rationale:_ Correct: availability combines failure and repair behavior.
- B. The selling price  
  _Rationale:_ Price is unrelated to these measures.
- C. The warranty color  
  _Rationale:_ This is not a reliability quantity.
- D. The marketing budget  
  _Rationale:_ Budget is unrelated to availability.

**MST-0318-Q0003** (multiple-answer, Select TWO) Select TWO purposes of an FMEA.

- A. Identifying potential failure modes **(key)**  
  _Rationale:_ Correct: FMEA surfaces how a design can fail.
- B. Prioritizing risks for mitigation **(key)**  
  _Rationale:_ Correct: FMEA ranks risks to guide action.
- C. Setting the product's retail price  
  _Rationale:_ Pricing is not an FMEA purpose.
- D. Designing the marketing campaign  
  _Rationale:_ Marketing is unrelated to FMEA.
- E. Choosing the office location  
  _Rationale:_ Facility choice is unrelated to FMEA.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
