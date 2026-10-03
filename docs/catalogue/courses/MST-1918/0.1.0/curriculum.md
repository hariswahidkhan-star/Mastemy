# Enterprise and Permissioned Blockchain Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1918` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1440 min; instruction I = 1152 min (80%); assessment A = 288 min (20%) |
| Assessment split | lesson checks 72 / module checks 101 / cumulative 115 min |
| Certificate | Mastemy Certificate of Completion — Enterprise and Permissioned Blockchain Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how permissioned blockchains differ from public networks
2. Describe membership, identity and access control in enterprise networks
3. Compare leading permissioned platforms and their consensus models
4. Design channels, data partitioning and privacy for consortium use
5. Reason about integration, performance and governance in enterprise settings
6. Evaluate whether a permissioned chain fits a business problem

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Permissioned vs public (16% (design weight), design weight)

- Worked applications: (1) Contrast a consortium ledger with a public chain for a bank network; (2) List the confidentiality needs that rule out a public chain
- Common misconception addressed: Assuming enterprises need a public token
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why enterprises choose permissioned | 92 | 6 |
| M01L02 | Trust, identity and confidentiality needs | 92 | 6 |

### M02 Identity and membership (17% (design weight), design weight)

- Worked applications: (1) Issue and revoke a member certificate; (2) Assign roles for a new consortium partner
- Common misconception addressed: Treating identity as optional on a private chain
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Membership services and certificates | 98 | 6 |
| M02L02 | Role-based access and onboarding | 98 | 6 |

### M03 Platforms and consensus (17% (design weight), design weight)

- Worked applications: (1) Compare two permissioned platforms' consensus; (2) Pick an ordering service for a throughput target
- Common misconception addressed: Expecting public-chain decentralisation from a consortium
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Comparing permissioned platforms | 98 | 6 |
| M03L02 | Ordering and crash/BFT consensus | 98 | 6 |

### M04 Privacy and data partitioning (17% (design weight), design weight)

- Worked applications: (1) Design a channel so only two members see a trade; (2) Use private data collections for need-to-know fields
- Common misconception addressed: Putting confidential data on a shared channel
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Channels and private data collections | 98 | 6 |
| M04L02 | Confidential transactions and need-to-know | 98 | 6 |

### M05 Integration and operations (16% (design weight), design weight)

- Worked applications: (1) Integrate a chain event into an ERP workflow; (2) Set up monitoring for node health and throughput
- Common misconception addressed: Ignoring integration cost in the business case
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Connecting to enterprise systems | 92 | 6 |
| M05L02 | Performance, throughput and monitoring | 92 | 6 |

### M06 Governance and fit (17% (design weight), design weight)

- Worked applications: (1) Draft a consortium governance and dispute model; (2) Apply the fit checklist to a trade-finance case
- Common misconception addressed: Building a consortium chain where a shared database suffices
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Consortium governance models | 98 | 6 |
| M06L02 | Deciding if a permissioned chain fits | 98 | 6 |

## Integrative case

A group of five banks wants a shared trade-finance network where competitors must not see each other's deal terms; design a permissioned architecture covering identity, channels, privacy, consensus and governance, and justify it against a simpler shared-database alternative.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1918-final-protected | 45 | 55 | yes |
| MST-1918-final-alternate | 45 | 55 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Permissioned vs public | 7 |
| Identity and membership | 8 |
| Platforms and consensus | 8 |
| Privacy and data partitioning | 8 |
| Integration and operations | 7 |
| Governance and fit | 7 |

Minimum reviewed item bank: 426 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1918-Q0001** (single-answer, Select ONE) Why do enterprises often choose a permissioned blockchain over a public one for a consortium?

- A. They need known, identity-verified participants and confidential data between specific members **(key)**  
  _Rationale:_ Correct: permissioned networks provide identity and confidentiality controls.
- B. Public chains cannot store any data  
  _Rationale:_ Public chains store data; the issue is confidentiality and identity.
- C. Permissioned chains are always cheaper to run  
  _Rationale:_ Cost is not the defining reason.
- D. Public chains are illegal for businesses  
  _Rationale:_ That is not true.

**MST-1918-Q0002** (multiple-answer, Select TWO) Which TWO mechanisms let a permissioned network keep data visible only to specific members? (Select TWO.)

- A. Channels that restrict a ledger to a subset of participants **(key)**  
  _Rationale:_ Correct: channels partition visibility.
- B. Private data collections sharing only hashes on the shared ledger **(key)**  
  _Rationale:_ Correct: private collections enforce need-to-know.
- C. Publishing all data to a public explorer  
  _Rationale:_ That defeats confidentiality.
- D. Giving every member the same admin certificate  
  _Rationale:_ That removes access control, not adds privacy.

**MST-1918-Q0003** (single-answer, Select ONE) When is a permissioned blockchain the wrong choice for a consortium?

- A. When a single trusted operator and a shared database would meet the trust and audit needs **(key)**  
  _Rationale:_ Correct: if trust is centralisable, a database is simpler and sufficient.
- B. Whenever more than two companies are involved  
  _Rationale:_ Member count alone does not decide this.
- C. Whenever confidentiality is required  
  _Rationale:_ Permissioned chains handle confidentiality well.
- D. Whenever identity verification is needed  
  _Rationale:_ Permissioned chains support identity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
