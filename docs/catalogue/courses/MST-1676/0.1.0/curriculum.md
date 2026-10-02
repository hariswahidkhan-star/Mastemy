# PCI DSS Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1676` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-PDE-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — PCI DSS Essentials (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain the purpose and scope of the PCI DSS and cardholder data
2. Describe the high-level control goals and requirements
3. Reduce scope through segmentation and data handling
4. Identify common compliance pitfalls
5. Describe validation, SAQs and the role of evidence

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 PCI DSS foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide which systems handle cardholder data; (2) Explain who must comply with the standard
- Common misconception addressed: Believing only large companies need to comply
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why PCI DSS exists and who it applies to | 72 | 6 |
| M01L02 | Cardholder data and the scope concept | 72 | 6 |

### M02 Control goals (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Match a requirement to its control goal; (2) Explain why storing full card data is discouraged
- Common misconception addressed: Storing sensitive authentication data after authorisation
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Protecting stored and transmitted data | 72 | 6 |
| M02L02 | Access control and monitoring goals | 72 | 6 |

### M03 Scope reduction (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Segment a network to take systems out of scope; (2) Decide where tokenisation reduces risk
- Common misconception addressed: Assuming segmentation works without being tested
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Segmentation to reduce scope | 72 | 6 |
| M03L02 | Tokenisation and not storing data | 72 | 6 |

### M04 Common pitfalls (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Spot a pitfall in a sample configuration; (2) Prioritise fixing a found weakness
- Common misconception addressed: Treating compliance as a once-a-year project
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Default passwords and weak configuration | 72 | 6 |
| M04L02 | Gaps in logging and patching | 72 | 6 |

### M05 Validation and evidence (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose the right validation path for a small merchant; (2) List evidence for one requirement
- Common misconception addressed: Collecting evidence only for the assessment and then stopping
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Self-assessment questionnaires and levels | 72 | 6 |
| M05L02 | Evidence and ongoing validation | 72 | 6 |

## Integrative case

A small retailer takes card payments through a web store and a card terminal. Explain what counts as cardholder data, reduce the systems in scope, apply the relevant control goals, and prepare for a self-assessment. (General educational overview; not official PCI guidance.)

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1676-final-protected | 25 | 25 | yes |
| MST-1676-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| PCI DSS foundations | 5 |
| Control goals | 5 |
| Scope reduction | 5 |
| Common pitfalls | 5 |
| Validation and evidence | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1676-Q0001** (single-answer, Select ONE) What is the most effective way to reduce PCI DSS scope?

- A. Segment and avoid storing cardholder data wherever possible **(key)**  
  _Rationale:_ Correct: fewer systems touching card data means less scope.
- B. Store all card data in one big database  
  _Rationale:_ Centralising storage increases, not reduces, scope and risk.
- C. Use default device passwords for consistency  
  _Rationale:_ Default passwords are a classic weakness, not a scope reducer.
- D. Turn off all logging  
  _Rationale:_ Logging is required; disabling it is non-compliant.

**MST-1676-Q0002** (multiple-answer, Select TWO) Which TWO are common PCI DSS compliance pitfalls? (Select TWO.)

- A. Leaving vendor default passwords in place **(key)**  
  _Rationale:_ Correct: default credentials are a frequent and serious gap.
- B. Inconsistent patching and logging **(key)**  
  _Rationale:_ Correct: gaps in patching and logging are common failures.
- C. Segmenting the cardholder data environment  
  _Rationale:_ Segmentation is good practice, not a pitfall.
- D. Minimising stored cardholder data  
  _Rationale:_ Minimising stored data reduces risk; it is not a pitfall.

**MST-1676-Q0003** (single-answer, Select ONE) Why is storing sensitive authentication data after authorisation discouraged?

- A. It is high-value to attackers and generally must not be retained **(key)**  
  _Rationale:_ Correct: such data should not be stored after authorisation.
- B. It makes transactions faster  
  _Rationale:_ Storing it does not speed transactions and adds risk.
- C. It is required for every refund  
  _Rationale:_ Refunds do not require retaining prohibited authentication data.
- D. It reduces the systems in scope  
  _Rationale:_ Storing more sensitive data increases scope and risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
