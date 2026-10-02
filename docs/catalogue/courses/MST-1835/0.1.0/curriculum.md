# ERP Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1835` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-BUS-SK-EF-002 |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — ERP Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. What ERP is
2. Processes across the business
3. Data and master records
4. Implementing ERP
5. Getting value from ERP

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on performance of the skill; applied practice comes through instructor-facilitated exercises and model-answer analysis.

## Modules

### M01 What ERP is (MASTEMY-DESIGN 22%)

- Worked applications: (1) Explain the benefit of integrated data; (2) Match a task to an ERP module
- Common misconception addressed: Thinking ERP is just accounting software
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Integrated systems and a single source of truth | 48 | 6 |
| M01L02 | Core ERP modules | 48 | 6 |

### M02 Processes across the business (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace order-to-cash through modules; (2) Show where two modules share data
- Common misconception addressed: Seeing each module as a separate disconnected tool
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Order-to-cash and procure-to-pay | 48 | 6 |
| M02L02 | How modules share one data model | 48 | 6 |

### M03 Data and master records (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify master data in a scenario; (2) Spot a master-data governance gap
- Common misconception addressed: Treating master data as unimportant background detail
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Master data and why it matters | 48 | 6 |
| M03L02 | Data governance basics | 48 | 6 |

### M04 Implementing ERP (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose configuration over customisation appropriately; (2) Diagnose a cause of ERP project failure
- Common misconception addressed: Customising heavily to keep old broken processes
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Configuration vs customisation | 48 | 6 |
| M04L02 | Why ERP projects succeed or fail | 48 | 6 |

### M05 Getting value from ERP (MASTEMY-DESIGN 18%)

- Worked applications: (1) Plan training for a new ERP rollout; (2) Pick a report that drives a decision
- Common misconception addressed: Assuming go-live is the end of the ERP journey
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Change, training and adoption | 48 | 6 |
| M05L02 | Reporting and continuous improvement | 48 | 6 |

## Integrative case

A mid-sized firm runs finance, inventory and sales on separate systems that never agree, and is considering an ERP. Apply ERP fundamentals: explain the single-source-of-truth benefit, map cross-functional processes, govern master data, decide configuration versus customisation, and plan the change and adoption needed to realise value.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1835-final-protected | 20 | 20 | yes |
| MST-1835-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What ERP is | 4 |
| Processes across the business | 4 |
| Data and master records | 4 |
| Implementing ERP | 4 |
| Getting value from ERP | 4 |

Minimum reviewed item bank: 244 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1835-Q0001** (single-answer, Select ONE) What is the central promise of an ERP system?

- A. Integrated processes and data sharing a single source of truth **(key)**  
  _Rationale:_ Correct: ERP integrates functions around one consistent data model.
- B. A faster version of standalone accounting software  
  _Rationale:_ ERP is defined by integration across functions, not just accounting speed.
- C. A tool that eliminates the need for any business process  
  _Rationale:_ ERP supports processes; it does not remove them.
- D. Separate databases for each department  
  _Rationale:_ That is the opposite of ERP's integrated model.

**MST-1835-Q0002** (multiple-answer, Select TWO) Which statements about ERP implementation are correct? (Select TWO)

- A. Heavy customisation increases cost and upgrade difficulty **(key)**  
  _Rationale:_ Correct: customisation raises long-term maintenance and upgrade burden.
- B. Configuring the system to fit standard processes is usually preferable **(key)**  
  _Rationale:_ Correct: configuration keeps the system maintainable and upgradable.
- C. Customising to preserve every old process is best practice  
  _Rationale:_ This entrenches legacy inefficiencies and raises cost.
- D. Training and change management are unnecessary  
  _Rationale:_ Adoption depends heavily on training and change management.

**MST-1835-Q0003** (single-answer, Select ONE) Inconsistent customer records across modules cause billing errors. What underlying issue should be fixed?

- A. Master-data governance **(key)**  
  _Rationale:_ Correct: consistent, governed master data prevents cross-module errors.
- B. The speed of the server  
  _Rationale:_ Performance is unrelated to inconsistent records.
- C. The colour scheme of the interface  
  _Rationale:_ Cosmetics do not cause data inconsistency.
- D. The number of user licences  
  _Rationale:_ Licence count does not drive data quality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
