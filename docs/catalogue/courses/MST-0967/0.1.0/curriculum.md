# Data Privacy Engineering and Access Controls

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0967` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-DAT-SK-DPE-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Data Privacy Engineering and Access Controls (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Privacy engineering foundations
2. Data classification and inventory
3. De-identification techniques
4. Access control for privacy
5. Data subject rights and lifecycle
6. Privacy in the data pipeline

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on tool operation or production data work; those are taught through instructor-built demonstrations and walkthroughs.

## Modules

### M01 Privacy engineering foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Classify data fields by sensitivity and PII status; (2) Apply data minimization to a collection form
- Common misconception addressed: Equating security controls with privacy compliance
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Privacy concepts, PII and regulatory context | 80 | 5 |
| M01L02 | Privacy by design and data-protection principles | 80 | 5 |

### M02 Data classification and inventory (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a simple data map for a user-signup flow; (2) Tag datasets with a sensitivity label scheme
- Common misconception addressed: Assuming you can protect data you have not inventoried
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Classifying and labelling sensitive data | 80 | 5 |
| M02L02 | Data mapping, inventory and records of processing | 80 | 5 |

### M03 De-identification techniques (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose masking vs tokenization for a use case; (2) Explain how a quasi-identifier enables re-identification
- Common misconception addressed: Believing hashing an identifier makes the data anonymous
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Anonymization, pseudonymization and masking | 80 | 5 |
| M03L02 | Tokenization, hashing and re-identification risk | 80 | 5 |

### M04 Access control for privacy (MASTEMY-DESIGN 17%)

- Worked applications: (1) Design row-level access so users see only their region; (2) Add purpose limitation to a data-access policy
- Common misconception addressed: Granting broad standing access instead of least-privilege, purpose-bound access
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Role- and attribute-based access control | 80 | 5 |
| M04L02 | Column, row and purpose-based restrictions | 80 | 5 |

### M05 Data subject rights and lifecycle (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design a workflow to fulfil an erasure request; (2) Define retention and deletion rules for a dataset
- Common misconception addressed: Keeping data indefinitely 'just in case' against retention limits
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Consent, access, erasure and portability | 80 | 5 |
| M05L02 | Retention, deletion and the data lifecycle | 80 | 5 |

### M06 Privacy in the data pipeline (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add noise to an aggregate to limit disclosure; (2) Design an audit log for sensitive-data access
- Common misconception addressed: Logging the sensitive values themselves inside the audit trail
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Differential privacy and privacy-preserving analytics | 80 | 5 |
| M06L02 | Auditing, logging and privacy incident response | 80 | 5 |

## Integrative case

Design privacy controls for an analytics platform handling customer data: classify and inventory PII, de-identify fields for analysts, enforce row- and purpose-based access, implement erasure and retention workflows, and add auditing plus a privacy-preserving aggregate.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0967-final-protected | 42 | 42 | yes |
| MST-0967-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Privacy engineering foundations | 7 |
| Data classification and inventory | 7 |
| De-identification techniques | 7 |
| Access control for privacy | 7 |
| Data subject rights and lifecycle | 7 |
| Privacy in the data pipeline | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0967-Q0001** (single-answer, Select ONE) Why is hashing a user identifier not sufficient to make a dataset anonymous?

- A. The same input always hashes to the same value, so records remain linkable and re-identifiable **(key)**  
  _Rationale:_ Correct: deterministic hashes preserve linkage and can be reversed via lookup or combined with quasi-identifiers.
- B. Hashing deletes the underlying record  
  _Rationale:_ Hashing transforms an identifier; it does not delete data.
- C. Hashing encrypts all other columns too  
  _Rationale:_ Hashing one field does not protect the rest of the record.
- D. Hashes cannot be stored in a database  
  _Rationale:_ Hashes are routinely stored; that is not the issue.

**MST-0967-Q0002** (multiple-answer, Select ALL that apply) Which statements about privacy-protective access control are correct? (Select TWO)

- A. Least privilege means granting only the access needed for a task **(key)**  
  _Rationale:_ Correct: minimizing standing access reduces exposure of personal data.
- B. Purpose limitation restricts data use to the reason it was collected **(key)**  
  _Rationale:_ Correct: data accessed for one purpose should not be freely reused for another.
- C. Broad default access is fine as long as actions are logged  
  _Rationale:_ Logging does not substitute for limiting access in the first place.
- D. Row-level security cannot restrict which records a user sees  
  _Rationale:_ Row-level security exists precisely to restrict visible rows.

**MST-0967-Q0003** (single-answer, Select ONE) What is a quasi-identifier in the context of re-identification risk?

- A. A field that is not uniquely identifying alone but can identify someone when combined with others **(key)**  
  _Rationale:_ Correct: attributes like ZIP, birth date and gender together can single out individuals.
- B. A government-issued unique ID number  
  _Rationale:_ That is a direct identifier, not a quasi-identifier.
- C. An encryption key used for masking  
  _Rationale:_ A quasi-identifier is data content, not a key.
- D. A randomly generated token with no meaning  
  _Rationale:_ A meaningless token is not a quasi-identifier.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
