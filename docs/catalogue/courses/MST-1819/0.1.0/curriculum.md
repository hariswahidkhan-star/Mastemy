# SAP Certified Associate - SAP Business Technology Platform Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1819` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | SAP (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed (official_exam_code left blank) |
| Version basis | unresolved - not confirmed from an official source |
| Evidence | **unverified-needs-official-check** - official source could not be fetched (network egress blocked 2026-10-02); outline is a DESIGN ASSUMPTION |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 40 / module checks 140 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%%, final >= 80%%) |

## Learning outcomes

1. Describe the SAP Business Technology Platform, its environments and services
2. Explain application development and extension options on the platform
3. Describe integration, data and analytics capabilities
4. Explain identity, security and administration concepts for the platform

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> All module titles, lesson titles and weightings below are **DESIGN ASSUMPTIONS** pending verification against the official exam outline (issuer site egress blocked on 2026-10-02).

## Modules

### M01 Platform fundamentals (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Choose an environment for a described workload; (2) Classify a service into its category
- Common misconception addressed: Confusing a global account with a subaccount scope
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | BTP overview, accounts and environments | 150 | 6 |
| M01L02 | Service categories and the platform value proposition | 150 | 6 |

### M02 Application development and extension (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Decide side-by-side vs in-app for a scenario; (2) Identify a service to host an extension app
- Common misconception addressed: Assuming all extensions require modifying the ERP core
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Side-by-side vs in-app extensibility | 150 | 6 |
| M02L02 | Development models and programming approaches | 150 | 6 |

### M03 Integration, data and analytics (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Pick an integration pattern for two systems; (2) Choose a persistence option for app data
- Common misconception addressed: Treating point-to-point integration as always preferable to managed integration
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Integration services and connectivity | 150 | 6 |
| M03L02 | Data persistence and analytics options | 150 | 6 |

### M04 Security and administration (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Assign a role collection for a user scenario; (2) Explain how trust is established with an identity provider
- Common misconception addressed: Confusing authentication with authorisation
- Module check: 35 items / 35 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Identity, authentication and authorisation concepts | 150 | 6 |
| M04L02 | Administration, roles and entitlements | 150 | 6 |

## Integrative case

An enterprise wants to extend its ERP cleanly rather than modify the core: using BTP concepts, choose an environment and services for a side-by-side extension, plan integration and identity, and justify the approach to architects.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official source not verified (egress blocked); confirm question count and duration on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1819-practice-form-A | 45 | 45 | yes |
| MST-1819-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1819-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1819-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Platform fundamentals | 12 |
| Application development and extension | 11 |
| Integration, data and analytics | 11 |
| Security and administration | 11 |

Minimum reviewed item bank: 556 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1819-Q0001** (single-answer, Select ONE) A company wants to extend SAP ERP without changing the core so upgrades stay clean. Which approach fits best?

- A. Modify the ERP source code directly  
  _Rationale:_ Core modification complicates upgrades, the exact outcome to avoid.
- B. Build a side-by-side extension on the platform **(key)**  
  _Rationale:_ Correct: side-by-side extensibility keeps custom logic off the core, preserving clean upgrades.
- C. Export all data to spreadsheets  
  _Rationale:_ Spreadsheets do not extend the ERP functionally.
- D. Disable all standard modules  
  _Rationale:_ Disabling modules removes needed functionality and is not an extension approach.

**MST-1819-Q0002** (single-answer, Select ONE) Within the platform account model, what is the typical relationship between a global account and a subaccount?

- A. A subaccount contains many global accounts  
  _Rationale:_ The hierarchy is the reverse of this.
- B. A global account can contain multiple subaccounts **(key)**  
  _Rationale:_ Correct: a global account is the top-level contract entity holding one or more subaccounts.
- C. They are unrelated billing systems  
  _Rationale:_ They are part of one hierarchical account model.
- D. A global account is a single application  
  _Rationale:_ A global account is an organisational/contract construct, not an app.

**MST-1819-Q0003** (multiple-answer, Select TWO) Which TWO concepts belong to platform security and administration?

- A. Authentication via a trusted identity provider **(key)**  
  _Rationale:_ Correct: establishing trust with an IdP is an authentication concept.
- B. Authorisation through role collections **(key)**  
  _Rationale:_ Correct: role collections grant authorisations to users.
- C. Choosing a marketing campaign budget  
  _Rationale:_ Campaign budgeting is unrelated to platform security.
- D. Designing a product's retail packaging  
  _Rationale:_ Packaging design is irrelevant to platform administration.


## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
