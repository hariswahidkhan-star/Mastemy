# Microsoft Purview: Data Governance and Protection

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0695` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). Microsoft Purview data governance, sensitivity labels, DLP, data map and compliance behaviour partially verified against official Microsoft Learn Purview docs; re-verify specifics at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-PURVIEW (https://learn.microsoft.com/purview/, accessed 2026-10-02) |
| Legacy IDs | MST-MIC-SK-MPE-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Purview: Data Governance and Protection (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain data governance and the Microsoft Purview portal
2. Classify data with sensitive information types and labels
3. Apply sensitivity labels and encryption to protect content
4. Prevent data loss with DLP policies
5. Catalogue and map data assets for governance
6. Operate compliance, audit and data lifecycle controls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Data governance and Purview (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Define a classification taxonomy for a firm's data; (2) Map governance roles and responsibilities
- Common misconception addressed: Treating governance as purely an IT configuration task
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Data governance principles and the Purview portal | 77 | 5 |
| M01L02 | Roles, scope and a governance operating model | 77 | 5 |

### M02 Classification (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Configure sensitive information types for client identifiers; (2) Test classification accuracy and reduce false positives
- Common misconception addressed: Over-classifying everything as highly confidential
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sensitive information types and classifiers | 81 | 5 |
| M02L02 | Tuning classification accuracy | 82 | 5 |

### M03 Sensitivity labels (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Publish a label that encrypts and restricts a document; (2) Apply auto-labelling based on content
- Common misconception addressed: Labelling without enforcing any protection
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sensitivity labels and label policies | 81 | 5 |
| M03L02 | Encryption, auto-labelling and user experience | 82 | 5 |

### M04 Data loss prevention (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Author a DLP policy blocking client IDs leaving by email; (2) Add endpoint DLP for copy-to-USB
- Common misconception addressed: Starting DLP in block mode with no tuning
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | DLP policies, conditions and actions | 81 | 5 |
| M04L02 | Endpoint DLP and policy tuning | 82 | 5 |

### M05 Data map and catalogue (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Scan and catalogue assets across M365 and Azure; (2) Record data lineage for a reporting pipeline
- Common misconception addressed: Cataloguing systems while ignoring data lineage
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data map, scanning and the catalogue | 77 | 5 |
| M05L02 | Classification insights and lineage | 77 | 5 |

### M06 Compliance and lifecycle (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Define retention labels and a disposition review; (2) Use audit search to investigate a data access question
- Common misconception addressed: Keeping all data forever to be safe
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Retention, records and data lifecycle | 81 | 5 |
| M06L02 | Audit, eDiscovery and compliance reporting | 82 | 5 |

## Integrative case

A professional-services firm must govern client data across Microsoft 365 and Azure. Build a classification taxonomy with sensitive information types, publish sensitivity labels with encryption, author DLP policies for email and endpoints, map data assets in the data catalogue, and define retention and audit, then defend the plan to a compliance committee.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0695-final-protected | 30 | 30 | yes |
| MST-0695-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data governance and Purview | 5 |
| Classification | 5 |
| Sensitivity labels | 5 |
| Data loss prevention | 5 |
| Data map and catalogue | 5 |
| Compliance and lifecycle | 5 |

Minimum reviewed item bank: 348 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0695-Q0001** (single-answer, Select ONE) A firm wants confidential documents to stay protected even after they leave the tenant by email. What should be applied?

- A. A sensitivity label that applies encryption and usage rights **(key)**  
  _Rationale:_ Correct: label-based encryption travels with the content.
- B. A label with no protection settings  
  _Rationale:_ A label without protection does not enforce anything.
- C. A firewall rule  
  _Rationale:_ Network rules do not protect portable documents.
- D. Deleting the document  
  _Rationale:_ Deletion is not protection of shared content.

**MST-0695-Q0002** (multiple-answer, Select TWO) Which TWO are good practices when rolling out a new DLP policy? (Select TWO.)

- A. Start in simulation/test mode and review matches before enforcing **(key)**  
  _Rationale:_ Correct: simulation reduces disruptive false positives.
- B. Tune sensitive information types to the organisation's real identifiers **(key)**  
  _Rationale:_ Correct: tuning improves precision.
- C. Begin in hard-block mode for all users immediately  
  _Rationale:_ Unvetted blocking disrupts the business.
- D. Apply no conditions so everything is blocked  
  _Rationale:_ Overbroad policies are unworkable.

**MST-0695-Q0003** (single-answer, Select ONE) A compliance team must find who accessed a client's files during a dispute. Which Purview capability answers this?

- A. Audit search over activity logs **(key)**  
  _Rationale:_ Correct: audit logs record access activity for investigation.
- B. A sensitivity label report only  
  _Rationale:_ Labels show protection, not who accessed files.
- C. A DLP policy  
  _Rationale:_ DLP prevents loss; it is not an access-history search.
- D. Deleting the files  
  _Rationale:_ Deletion destroys the evidence.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
