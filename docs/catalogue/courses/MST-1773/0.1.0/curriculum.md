# Health Informatics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1773` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Health Informatics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain health data, information and clinical information systems
2. Describe terminologies, standards and interoperability in health
3. Explain data quality, governance, privacy and security of health data
4. Describe analytics, decision support and the digital transformation of care

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Data and systems (25%, MASTEMY-DESIGN)

- Worked applications: (1) Classify items as data, information or knowledge; (2) Map the data flow for a described patient encounter
- Common misconception addressed: Treating an electronic health record as merely a scanned version of paper notes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Data, information, knowledge in health | 60 | 6 |
| M01L02 | Electronic health records | 60 | 6 |
| M01L03 | Clinical and administrative information systems | 60 | 6 |
| M01L04 | The patient journey and data flows | 60 | 6 |
### M02 Standards and interoperability (25%, MASTEMY-DESIGN)

- Worked applications: (1) Match a use case to coded terminology versus free text; (2) Explain why two systems fail to exchange data without a standard
- Common misconception addressed: Assuming any two electronic systems can share data without agreed standards
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Clinical terminologies and classifications | 60 | 6 |
| M02L02 | Messaging and document standards | 60 | 6 |
| M02L03 | Interoperability and APIs | 60 | 6 |
| M02L04 | Unique identifiers and master data | 60 | 6 |
### M03 Quality, governance and security (25%, MASTEMY-DESIGN)

- Worked applications: (1) Identify which data-quality dimension a problem affects; (2) Choose an access control appropriate to a role
- Common misconception addressed: Believing anonymised data carries no privacy risk at all
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data quality dimensions | 60 | 6 |
| M03L02 | Information governance | 60 | 6 |
| M03L03 | Privacy, consent and confidentiality in data | 60 | 6 |
| M03L04 | Security, access control and audit | 60 | 6 |
### M04 Analytics and transformation (25%, MASTEMY-DESIGN)

- Worked applications: (1) Design a simple indicator from available data; (2) Explain a risk of poorly designed decision-support alerts
- Common misconception addressed: Assuming more alerts always make care safer rather than causing alert fatigue
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Health analytics and reporting | 60 | 6 |
| M04L02 | Clinical decision support | 60 | 6 |
| M04L03 | Telehealth and digital patient tools | 60 | 6 |
| M04L04 | Change management for digital health | 60 | 6 |

## Integrative case

A clinic is moving from paper to an electronic health record and wants to share data safely with a partner hospital. Advise on the systems, standards, data quality, governance and analytics needed to make the transition safe and useful.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1773-final-protected | 72 | 72 | yes |
| MST-1773-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Data and systems | 18 |
| Standards and interoperability | 18 |
| Quality, governance and security | 18 |
| Analytics and transformation | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1773-Q0001** (single-answer, Select ONE) Two hospitals cannot exchange a patient's records even though both use electronic systems. The most likely root cause is a lack of:

- A. Agreed interoperability standards for data exchange **(key)**  
  _Rationale:_ Correct: without shared standards, systems cannot reliably exchange and interpret data.
- B. Enough disk storage  
  _Rationale:_ Storage capacity does not determine whether two systems can interpret each other's data.
- C. Faster internet connections  
  _Rationale:_ Bandwidth is not the barrier when the data formats are not mutually understood.
- D. More clinical staff  
  _Rationale:_ Staffing levels do not resolve a data-format interoperability problem.**MST-1773-Q0002** (single-answer, Select ONE) A clinical decision-support system fires so many low-value pop-up alerts that clinicians routinely dismiss them. This problem is known as:

- A. Alert fatigue **(key)**  
  _Rationale:_ Correct: excessive, low-value alerts cause clinicians to ignore them, a recognised safety risk.
- B. Interoperability  
  _Rationale:_ Interoperability concerns data exchange between systems, not alert overload.
- C. Data minimisation  
  _Rationale:_ Data minimisation is a privacy principle, not the alert-overload phenomenon.
- D. Version control  
  _Rationale:_ Version control concerns tracking changes, not alert overload.**MST-1773-Q0003** (multiple-answer, Select TWO) Which TWO are dimensions of data quality in health informatics? (Select TWO)

- A. Accuracy **(key)**  
  _Rationale:_ Correct: accuracy, whether data correctly reflect reality, is a core data-quality dimension.
- B. Completeness **(key)**  
  _Rationale:_ Correct: completeness, whether required data are present, is a core data-quality dimension.
- C. Bandwidth  
  _Rationale:_ Bandwidth is a network property, not a data-quality dimension.
- D. Screen resolution  
  _Rationale:_ Screen resolution is a display property, not a data-quality dimension.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
