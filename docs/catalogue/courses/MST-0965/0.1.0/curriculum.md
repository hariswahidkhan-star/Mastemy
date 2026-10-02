# Master Data Management and Reference Data

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0965` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-DAT-SK-MDM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Master Data Management and Reference Data (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. MDM foundations
2. Data domains and governance
3. MDM architecture styles
4. Matching, merging and survivorship
5. Reference data management
6. Operating MDM

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on tool operation or production data work; those are taught through instructor-built demonstrations and walkthroughs.

## Modules

### M01 MDM foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Classify example fields as master, reference or transactional; (2) Describe the cost of duplicate customer records
- Common misconception addressed: Confusing transactional data with master data
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What master and reference data are | 80 | 5 |
| M01L02 | Why MDM matters: the single trusted view | 80 | 5 |

### M02 Data domains and governance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define ownership and stewards for a product domain; (2) Draft a data-quality rule for a key attribute
- Common misconception addressed: Treating MDM as a one-off IT project rather than ongoing governance
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Common domains: customer, product, supplier | 80 | 5 |
| M02L02 | Data governance roles and stewardship | 80 | 5 |

### M03 MDM architecture styles (MASTEMY-DESIGN 17%)

- Worked applications: (1) Recommend an MDM style for a given integration goal; (2) Compare registry vs centralized trade-offs
- Common misconception addressed: Assuming a single central hub is always the right architecture
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Registry, consolidation, coexistence and centralized styles | 80 | 5 |
| M03L02 | Choosing a style by use case | 80 | 5 |

### M04 Matching, merging and survivorship (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define match rules to link duplicate customers; (2) Write survivorship rules to build a golden record
- Common misconception addressed: Auto-merging on weak matches and creating false golden records
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Deterministic and probabilistic matching | 80 | 5 |
| M04L02 | Survivorship rules and the golden record | 80 | 5 |

### M05 Reference data management (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map two systems' country codes via a cross-reference; (2) Version a reference code set with effective dates
- Common misconception addressed: Hard-coding reference values instead of managing them centrally
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Code sets, hierarchies and cross-references | 80 | 5 |
| M05L02 | Versioning and distributing reference data | 80 | 5 |

### M06 Operating MDM (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design a steward workflow for resolving match exceptions; (2) Define KPIs to show MDM value
- Common misconception addressed: Measuring activity instead of data-quality and business outcomes
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Data-quality metrics and stewardship workflow | 80 | 5 |
| M06L02 | Integration, distribution and measuring success | 80 | 5 |

## Integrative case

Stand up a customer MDM capability for a company with three source systems: define the customer domain and stewardship, choose an architecture style, design match and survivorship rules to build golden records, manage shared reference codes, and set data-quality KPIs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0965-final-protected | 42 | 42 | yes |
| MST-0965-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| MDM foundations | 7 |
| Data domains and governance | 7 |
| MDM architecture styles | 7 |
| Matching, merging and survivorship | 7 |
| Reference data management | 7 |
| Operating MDM | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0965-Q0001** (single-answer, Select ONE) Which best describes master data?

- A. Core business entities such as customers and products that are shared across systems **(key)**  
  _Rationale:_ Correct: master data is the shared, relatively stable entities used across processes.
- B. High-volume event records like individual sales transactions  
  _Rationale:_ Those are transactional data, not master data.
- C. Temporary data held only in application memory  
  _Rationale:_ Master data is persistent and shared, not transient.
- D. Log files produced by applications  
  _Rationale:_ Logs are operational data, not master data.

**MST-0965-Q0002** (multiple-answer, Select ALL that apply) Which statements about building a golden record are correct? (Select TWO)

- A. Matching links records that refer to the same real-world entity **(key)**  
  _Rationale:_ Correct: matching identifies duplicates across sources.
- B. Survivorship rules decide which attribute values win in the merged record **(key)**  
  _Rationale:_ Correct: survivorship selects the best value per field.
- C. A golden record is created by deleting all source records  
  _Rationale:_ Sources are usually retained; the golden record is a consolidated view.
- D. Probabilistic matching requires every field to match exactly  
  _Rationale:_ Exact matching is deterministic; probabilistic allows scored, partial matches.

**MST-0965-Q0003** (single-answer, Select ONE) Why manage reference data (such as country or currency codes) centrally?

- A. To keep consistent, versioned code sets that all systems share and map to **(key)**  
  _Rationale:_ Correct: central management avoids divergent, conflicting code lists across systems.
- B. Because reference data changes many times per second  
  _Rationale:_ Reference data is relatively stable, not high-velocity.
- C. To replace the need for master data entirely  
  _Rationale:_ Reference data complements, not replaces, master data.
- D. Because codes must never be versioned  
  _Rationale:_ Versioning with effective dates is a key reference-data practice.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
