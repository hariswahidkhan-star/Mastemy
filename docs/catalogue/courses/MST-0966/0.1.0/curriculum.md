# Data Governance, Catalogs, and Lineage

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0966` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Data Governance, Catalogs, and Lineage (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain data governance operating models, roles and policies
2. Design catalogs, glossaries and classification for discoverability and consistency
3. Apply table- and column-level lineage for impact, root-cause and audit
4. Connect governance to privacy, access control and measurable adoption

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Governance foundations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Map data-owner, steward and custodian roles for a domain; (2) Draft a lightweight policy that enables rather than blocks access
- Common misconception addressed: Treating governance as a bureaucratic gate rather than an enabler of trusted data
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What governance is and is not | 120 | 6 |
| M01L02 | Operating models and roles | 120 | 6 |
| M01L03 | Policies, standards and stewardship | 120 | 6 |
| M01L04 | Balancing control with access | 120 | 6 |

### M02 Catalogs and metadata (25%, MASTEMY-DESIGN)

- Worked applications: (1) Define a business glossary term and link it to physical columns; (2) Classify datasets by sensitivity and apply tags
- Common misconception addressed: Assuming a catalog stays useful without ongoing curation
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Technical, business and operational metadata | 120 | 6 |
| M02L02 | Data catalogs and discovery | 120 | 6 |
| M02L03 | Glossaries and semantic consistency | 120 | 6 |
| M02L04 | Classification and tagging | 120 | 6 |

### M03 Lineage and impact (25%, MASTEMY-DESIGN)

- Worked applications: (1) Trace a regulated field end to end for an audit request; (2) Use lineage to assess the blast radius of a schema change
- Common misconception addressed: Trusting lineage that is stale or manually maintained without validation
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Column- and table-level lineage | 120 | 6 |
| M03L02 | Automated versus manual lineage | 120 | 6 |
| M03L03 | Impact and root-cause analysis | 120 | 6 |
| M03L04 | Lineage for compliance and audit | 120 | 6 |

### M04 Privacy, compliance and adoption (25%, MASTEMY-DESIGN)

- Worked applications: (1) Design access tiers for a dataset containing personal data; (2) Pick metrics that show governance is improving trust and usage
- Common misconception addressed: Writing policies nobody follows because adoption was never addressed
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Regulatory drivers and privacy basics | 120 | 6 |
| M04L02 | Access controls and data sharing | 120 | 6 |
| M04L03 | Measuring governance effectiveness | 120 | 6 |
| M04L04 | Driving adoption and culture | 120 | 6 |

## Integrative case

An organisation cannot answer 'where does this regulated field come from and who can see it?'. Stand up a catalog, glossary and lineage, define access tiers, and justify the governance operating model to both compliance and analysts.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0966-final-protected | 144 | 144 | yes |
| MST-0966-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Governance foundations | 36 |
| Catalogs and metadata | 36 |
| Lineage and impact | 36 |
| Privacy, compliance and adoption | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0966-Q0001** (single-answer, Select ONE) An auditor asks which upstream sources feed a regulated financial field and who can access it. Which governance capability answers this most directly?

- A. Column-level data lineage combined with access policies **(key)**  
  _Rationale:_ Correct: column-level lineage traces the field's origins and linked access policies show who can see it.
- B. A nightly backup schedule  
  _Rationale:_ Backups protect against loss but do not trace origins or access.
- C. A data compression setting  
  _Rationale:_ Compression is a storage concern, unrelated to lineage or access.
- D. A dashboard refresh rate  
  _Rationale:_ Refresh frequency does not describe data origins or permissions.

**MST-0966-Q0002** (single-answer, Select ONE) What is the primary role of a data steward in a governance operating model?

- A. Caring for the quality, meaning and proper use of data in a domain **(key)**  
  _Rationale:_ Correct: stewards curate definitions, quality and appropriate use for their domain.
- B. Provisioning and patching the database servers  
  _Rationale:_ That is a custodian/operations responsibility, not stewardship.
- C. Setting the company's overall revenue targets  
  _Rationale:_ That is a business leadership role, not data stewardship.
- D. Writing the application's user interface  
  _Rationale:_ UI development is unrelated to data stewardship.

**MST-0966-Q0003** (multiple-answer, Select TWO) Which TWO practices help a data catalog stay trustworthy over time? (Select TWO)

- A. Ongoing curation of business definitions and ownership **(key)**  
  _Rationale:_ Correct: curation keeps metadata accurate as the data landscape changes.
- B. Linking glossary terms to the physical columns they describe **(key)**  
  _Rationale:_ Correct: linking terms to columns keeps business meaning connected to real data.
- C. Populating it once at launch and leaving it unchanged  
  _Rationale:_ An unmaintained catalog quickly goes stale and loses trust.
- D. Hiding lineage so users are not confused  
  _Rationale:_ Lineage increases trust and impact analysis; hiding it reduces value.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
