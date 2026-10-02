# CIA Part 3: Internal Audit Function

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0093` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | The IIA (no affiliation or endorsement) |
| Exam code | CIA Part 3 |
| Version basis | DESIGN ASSUMPTION - official IIA CIA Part 3 domain weights not retrieved (issuer site egress-blocked 2026-10-02); confirm on The IIA website. |
| Evidence | **unverified-needs-official-check** - official study guide not retrieved (egress-blocked); weights/objectives are DESIGN ASSUMPTIONS |
| Legacy IDs | MST-FIN-CIA-P3-001 |
| Planned time | T = 6000 min; instruction I = 4800 min (80%); assessment A = 1200 min (20%) |
| Assessment split | lesson checks 300 / module checks 420 / cumulative 480 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply business acumen: organizational objectives, structure and management
2. Evaluate information security and IT concepts relevant to audit
3. Apply IT controls, disaster recovery and data analytics
4. Apply financial management concepts to audit judgement

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Business Acumen (weight DESIGN ASSUMPTION - not verified)

- Worked applications: (1) Analyze an org structure for control implications; (2) Interpret a strategy/quality framework
- Common misconception addressed: Assuming a flat structure removes segregation-of-duties needs
- Module check: 50 items / 105 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Organizational objectives and structures | 1200 | 6 |

### M02 Information Security (weight DESIGN ASSUMPTION - not verified)

- Worked applications: (1) Classify data and map protective controls; (2) Evaluate an access-control scenario
- Common misconception addressed: Confusing authentication with authorization in a control
- Module check: 50 items / 105 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Security concepts and controls | 1200 | 6 |

### M03 Information Technology (weight DESIGN ASSUMPTION - not verified)

- Worked applications: (1) Assess a disaster-recovery/BCM arrangement; (2) Design a basic data-analytics test
- Common misconception addressed: Assuming a backup equals a tested recovery capability
- Module check: 50 items / 105 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | IT controls, DR and analytics | 1200 | 6 |

### M04 Financial Management (weight DESIGN ASSUMPTION - not verified)

- Worked applications: (1) Interpret ratios and a capital-budgeting decision; (2) Read a managerial cost analysis
- Common misconception addressed: Reading accrual profit as cash available
- Module check: 50 items / 105 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Financial concepts for auditors | 1200 | 6 |

## Integrative case

Advise on a digital-transformation program: assess the business case, review information-security and IT controls, test continuity arrangements, and interpret the financial model.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0093-practice-form-A | 90 | 90 | yes |
| MST-0093-practice-form-B | 90 | 90 | no (optional practice) |
| MST-0093-practice-form-C | 90 | 90 | no (optional practice) |
| MST-0093-final-protected | 90 | 90 | yes |

| Domain | Items per form |
|---|---|
| Business Acumen | 23 |
| Information Security | 23 |
| Information Technology | 22 |
| Financial Management | 22 |

Minimum reviewed item bank: 808 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0093-Q0001** (single-answer, Select ONE) A system verifies a user's claimed identity with a password and a one-time code. This is primarily an example of:

- A. Authentication (multifactor) **(key)**  
  _Rationale:_ Correct: verifying identity with two factors is multifactor authentication.
- B. Authorization  
  _Rationale:_ Authorization governs what an authenticated user may do.
- C. Encryption  
  _Rationale:_ Encryption protects data confidentiality, not identity verification.
- D. Data classification  
  _Rationale:_ Classification labels data sensitivity, not identity.

**MST-0093-Q0002** (single-answer, Select ONE) An organization has nightly backups but has never tested a restore. The main risk is:

- A. Recovery may fail when actually needed **(key)**  
  _Rationale:_ Correct: untested backups may not restore successfully.
- B. Backups consume no storage  
  _Rationale:_ Backups do consume storage; this is not the risk.
- C. The RTO is automatically met  
  _Rationale:_ An untested backup does not prove the RTO is met.
- D. Encryption is no longer required  
  _Rationale:_ Encryption needs are unaffected.

**MST-0093-Q0003** (multiple-answer, Select TWO) Which TWO measures indicate liquidity rather than profitability? (Select TWO)

- A. Current ratio **(key)**  
  _Rationale:_ Correct: the current ratio measures short-term liquidity.
- B. Quick (acid-test) ratio **(key)**  
  _Rationale:_ Correct: the quick ratio measures liquidity.
- C. Net profit margin  
  _Rationale:_ Net margin measures profitability, not liquidity.
- D. Return on equity  
  _Rationale:_ ROE measures profitability/return, not liquidity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
