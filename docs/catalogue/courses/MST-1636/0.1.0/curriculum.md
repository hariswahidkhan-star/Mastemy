# Data Mesh Concepts

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1636` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-DMC-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the four principles of data mesh
2. Define data products and their characteristics
3. Describe domain ownership and decentralised responsibility
4. Explain the self-serve data platform and federated governance
5. Judge where data mesh fits and where it does not

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why data mesh (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match a described pain point to the principle that addresses it; (2) Explain the shift from centralised pipelines to domain ownership
- Common misconception addressed: Treating data mesh as a specific technology to install
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Problems with centralised data platforms | 96 | 8 |
| M01L02 | The four principles overview | 96 | 8 |

### M02 Data as a product (MASTEMY-DESIGN 20%)

- Worked applications: (1) Evaluate whether a described dataset qualifies as a data product; (2) Draft the metadata and SLA a data product should publish
- Common misconception addressed: Publishing a raw table and calling it a data product
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Characteristics of a good data product | 96 | 8 |
| M02L02 | Discoverability, SLAs and interfaces | 96 | 8 |

### M03 Domain ownership (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assign ownership for three datasets to the right domains; (2) Explain how ownership changes accountability for quality
- Common misconception addressed: Decentralising ownership without giving domains the needed capability
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Domain-oriented decentralised ownership | 96 | 8 |
| M03L02 | Roles and accountability in a domain | 96 | 8 |

### M04 Platform and governance (MASTEMY-DESIGN 20%)

- Worked applications: (1) List capabilities a self-serve platform must provide domains; (2) Explain how federated governance keeps global standards
- Common misconception addressed: Assuming decentralisation means no global standards at all
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The self-serve data platform | 96 | 8 |
| M04L02 | Federated computational governance | 96 | 8 |

### M05 Fit and limits (MASTEMY-DESIGN 20%)

- Worked applications: (1) Judge whether a small company should adopt data mesh; (2) Identify organisational prerequisites for a mesh to succeed
- Common misconception addressed: Adopting data mesh for an organisation too small to need it
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | When data mesh helps | 96 | 8 |
| M05L02 | When a simpler approach is better | 96 | 8 |

## Integrative case

A large organisation struggles with a central data team as a bottleneck. Assess whether data mesh fits, define two candidate data products with SLAs and interfaces, assign domain ownership with the capability required, design the self-serve platform and federated governance, and state the prerequisites that must hold before adopting it.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1636-final-protected | 25 | 25 | yes |
| MST-1636-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why data mesh | 5 |
| Data as a product | 5 |
| Domain ownership | 5 |
| Platform and governance | 5 |
| Fit and limits | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1636-Q0001** (single-answer, Select ONE) Which statement best describes data mesh?

- A. An organisational and architectural approach of domain-owned data products with federated governance **(key)**  
  _Rationale:_ Correct: data mesh is a socio-technical approach, not a product.
- B. A specific software product you purchase and install  
  _Rationale:_ Data mesh is an approach, not a single tool.
- C. A requirement to abandon all governance  
  _Rationale:_ It uses federated governance, not none.
- D. A synonym for a data warehouse  
  _Rationale:_ It differs fundamentally from a centralised warehouse model.

**MST-1636-Q0002** (multiple-answer, Select TWO) Which TWO characterise a good data product in a mesh? (Select TWO.)

- A. It is discoverable with documented metadata and a clear interface **(key)**  
  _Rationale:_ Correct: discoverability and clear interfaces are core traits.
- B. It publishes a service-level agreement for quality and availability **(key)**  
  _Rationale:_ Correct: an SLA sets expectations consumers can rely on.
- C. It is a raw dump with no owner or documentation  
  _Rationale:_ A raw, unowned dump is not a data product.
- D. It is accessible only to the team that created it  
  _Rationale:_ Data products are meant to be shared and consumable.

**MST-1636-Q0003** (single-answer, Select ONE) Does federated computational governance mean each domain ignores global rules?

- A. No; global standards are agreed and automated, while domains own their data **(key)**  
  _Rationale:_ Correct: federated governance balances global standards with local ownership.
- B. Yes; domains follow no shared standards  
  _Rationale:_ Federated governance keeps shared standards in place.
- C. Yes; a central team dictates every decision  
  _Rationale:_ That is the centralised model mesh moves away from.
- D. It means there is no governance at all  
  _Rationale:_ Governance remains, but is federated.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
