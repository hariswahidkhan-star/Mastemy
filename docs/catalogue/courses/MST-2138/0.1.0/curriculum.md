# Clinical Data, Records and Health Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2138` v0.1.0 | Batch wave17-cat41 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design specification (general medical education; no official issuer syllabus); content versioned by verification date |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Clinical Data, Records and Health Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define health informatics and describe the main health data types and sources
2. Explain electronic health records and common interoperability standards conceptually
3. Describe clinical terminologies and coding systems and their purpose
4. Summarise data quality, governance and the data lifecycle in healthcare
5. Explain privacy, security and consent principles for health data
6. Describe how analytics and dashboards support population and operational insight

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Health data foundations (20% (design weight), design weight)

- Worked applications: (1) Classify a data source as structured or unstructured; (2) Order the stages of the health data lifecycle
- Common misconception addressed: Thinking all health data is already clean and structured
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What health informatics covers | 64 | 4 |
| M01L02 | Types and sources of health data | 64 | 4 |
| M01L03 | The health data lifecycle | 64 | 4 |

### M02 Records and standards (20% (design weight), design weight)

- Worked applications: (1) Match an interoperability standard to its purpose; (2) Explain why coding systems enable comparison
- Common misconception addressed: Confusing a terminology with a billing code set
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Electronic health records | 64 | 4 |
| M02L02 | Interoperability standards (e.g. HL7, FHIR concepts) | 64 | 4 |
| M02L03 | Clinical terminologies and coding | 64 | 4 |

### M03 Data quality and governance (20% (design weight), design weight)

- Worked applications: (1) Spot a data-quality problem from a description; (2) Assign a stewardship responsibility in a scenario
- Common misconception addressed: Assuming more data automatically means better insight
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Dimensions of data quality | 64 | 4 |
| M03L02 | Data governance and stewardship | 64 | 4 |
| M03L03 | Master data and identifiers | 64 | 4 |

### M04 Privacy and security (20% (design weight), design weight)

- Worked applications: (1) Apply a minimum-necessary access idea to a scenario; (2) Distinguish de-identification from anonymisation concepts
- Common misconception addressed: Believing removing names alone guarantees anonymity
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Confidentiality and consent | 64 | 4 |
| M04L02 | Security safeguards and access control | 64 | 4 |
| M04L03 | De-identification concepts | 64 | 4 |

### M05 Analytics for health (20% (design weight), design weight)

- Worked applications: (1) Choose an appropriate dashboard measure for a question; (2) Explain an ethical limit on secondary data use
- Common misconception addressed: Treating a dashboard figure as proof without checking data quality
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Descriptive analytics and dashboards | 64 | 4 |
| M05L02 | Population health measures | 64 | 4 |
| M05L03 | Ethical and responsible data use | 64 | 4 |

## Integrative case

A health-informatics student is asked to design, on paper, how a clinic could move from paper forms to an interoperable electronic record: they must name the data types, an interoperability standard, a coding system, data-quality checks and the privacy safeguards, as an educational planning exercise.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - general medical-education course; no official exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2138-final-protected | 40 | 40 | yes |
| MST-2138-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Health data foundations | 8 |
| Records and standards | 8 |
| Data quality and governance | 8 |
| Privacy and security | 8 |
| Analytics for health | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2138-Q0001** (single-answer, Select ONE) In health informatics, FHIR is best described as a:

- A. Standard for exchanging healthcare information electronically **(key)**  
  _Rationale:_ Correct: FHIR (Fast Healthcare Interoperability Resources) is an interoperability standard.
- B. Clinical diagnosis algorithm  
  _Rationale:_ FHIR is a data-exchange standard, not a diagnostic tool.
- C. Type of medical imaging scanner  
  _Rationale:_ FHIR is a standard, not hardware.
- D. Billing settlement network  
  _Rationale:_ FHIR concerns interoperable data exchange, not billing settlement.

**MST-2138-Q0002** (multiple-answer, Select TWO) Which TWO are recognised dimensions of health data quality? (Select TWO.)

- A. Completeness **(key)**  
  _Rationale:_ Correct: completeness is a core data-quality dimension.
- B. Accuracy **(key)**  
  _Rationale:_ Correct: accuracy is a core data-quality dimension.
- C. The colour of the dashboard theme  
  _Rationale:_ Presentation theme is not a data-quality dimension.
- D. The brand of the server hardware  
  _Rationale:_ Hardware brand is unrelated to data quality.
- E. The number of staff in the clinic  
  _Rationale:_ Staff count is not a data-quality dimension.

**MST-2138-Q0003** (single-answer, Select ONE) Removing direct identifiers such as names so that data cannot be readily linked to an individual is called:

- A. De-identification **(key)**  
  _Rationale:_ Correct: de-identification removes or masks identifiers to limit re-identification.
- B. Data duplication  
  _Rationale:_ Duplication copies data; it does not protect identity.
- C. Normalisation of tables  
  _Rationale:_ Normalisation is a database-structuring technique, not privacy protection.
- D. Data visualisation  
  _Rationale:_ Visualisation presents data; it does not protect identity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
