# Fabric Governance, Security, and Capacity Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0706` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-FABRIC-GOVERNANCE (https://learn.microsoft.com/fabric/governance/governance-compliance-overview) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Fabric Governance, Security, and Capacity Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Govern the Fabric data estate' to professional tasks
2. Apply the skills of 'Secure content and access' to professional tasks
3. Apply the skills of 'Manage capacities' to professional tasks
4. Apply the skills of 'Monitor and optimize' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Govern the Fabric data estate (25%, design assumption)

- Worked applications: (1) Design a domain structure for three business units; (2) Decide which settings to delegate from tenant to domain admins
- Common misconception addressed: Thinking governance is a single settings screen rather than an operating model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Governance outcomes and the OneLake catalog Govern section | 60 | 6 |
| M01L02 | Tenant, domain and workspace settings | 60 | 6 |
| M01L03 | Domains and subdomains | 60 | 6 |
| M01L04 | Delegating administration | 60 | 6 |
### M02 Secure content and access (25%, design assumption)

- Worked applications: (1) Assign least-privilege workspace roles for a project team; (2) Choose a workspace role for a read-only stakeholder
- Common misconception addressed: Granting Member when Viewer would meet a stakeholder's needs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Workspace roles (Admin, Member, Contributor, Viewer) | 60 | 6 |
| M02L02 | OneLake and item security | 60 | 6 |
| M02L03 | Conditional access and Entra identity | 60 | 6 |
| M02L04 | Sensitivity labels and compliance | 60 | 6 |
### M03 Manage capacities (25%, design assumption)

- Worked applications: (1) Plan capacity assignment for dev, test and production workspaces; (2) Decide who needs capacity-contributor vs capacity-admin rights
- Common misconception addressed: Treating a capacity as a security boundary instead of a compute boundary
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Capacities as the compute boundary | 60 | 6 |
| M03L02 | Assigning workspaces to capacities | 60 | 6 |
| M03L03 | Capacity admin vs contributor roles | 60 | 6 |
| M03L04 | Using capacities for DTAP isolation | 60 | 6 |
### M04 Monitor and optimize (25%, design assumption)

- Worked applications: (1) Use the Capacity Metrics app to decide whether to scale; (2) Endorse a trusted semantic model and mark it discoverable
- Common misconception addressed: Assuming endorsement changes who can access an item
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Capacity Metrics app | 60 | 6 |
| M04L02 | Govern report and data-estate insights | 60 | 6 |
| M04L03 | Metadata scanning and endorsement | 60 | 6 |
| M04L04 | Audit logs and activity tracking | 60 | 6 |

## Integrative case

A platform team must govern a growing Fabric tenant: design domains, set tenant and workspace controls, assign least-privilege workspace roles, isolate dev/test/prod across capacities, and use the Capacity Metrics app and Govern report to monitor and optimize.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0706-final-protected | 72 | 72 | yes |
| MST-0706-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Govern the Fabric data estate | 18 |
| Secure content and access | 18 |
| Manage capacities | 18 |
| Monitor and optimize | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0706-Q0001** (single-answer, Select ONE) A stakeholder only needs to view reports in a workspace and change nothing. Which workspace role follows least privilege?

- A. Viewer **(key)**  
  _Rationale:_ Correct: the Viewer role grants read access without edit or management rights.
- B. Admin  
  _Rationale:_ Admin grants full control, far beyond read-only needs.
- C. Member  
  _Rationale:_ Member can edit and share content, which exceeds view-only needs.
- D. Contributor  
  _Rationale:_ Contributor can create and edit items, which a viewer does not need.
**MST-0706-Q0002** (single-answer, Select ONE) In Microsoft Fabric, what is a capacity primarily used as?

- A. The compute resource and isolation boundary for workloads **(key)**  
  _Rationale:_ Correct: capacities are the compute resources used by all workloads and can isolate compute (for example by DTAP).
- B. A security boundary that controls data access  
  _Rationale:_ Data access is controlled by workspace roles and item security, not the capacity.
- C. A replacement for workspaces  
  _Rationale:_ Workspaces organize content; capacities provide their compute.
- D. A Power BI report type  
  _Rationale:_ A capacity is infrastructure, not a report.
**MST-0706-Q0003** (multiple-answer, Select TWO) Which TWO are governance capabilities surfaced in the OneLake catalog Govern section? (Select TWO)

- A. Domains for grouping organizational data **(key)**  
  _Rationale:_ Correct: domains logically group data by area and support delegated governance.
- B. Endorsement of trusted items **(key)**  
  _Rationale:_ Correct: endorsement (promote/certify) highlights trusted content.
- C. Writing DAX measures  
  _Rationale:_ DAX authoring is a Power BI modeling task, not a Govern-section capability.
- D. Running Spark notebooks  
  _Rationale:_ Spark notebooks are a data-engineering tool, not a governance capability.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/fabric/governance/governance-compliance-overview) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
