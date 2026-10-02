# Azure Disaster Recovery and Business Continuity

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0690` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-AZURE-ASR (https://learn.microsoft.com/azure/site-recovery/site-recovery-overview) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure Disaster Recovery and Business Continuity (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Plan a BCDR strategy' to professional tasks
2. Apply the skills of 'Protect workloads with Azure Site Recovery' to professional tasks
3. Apply the skills of 'Orchestrate failover and failback' to professional tasks
4. Apply the skills of 'Integrate backup and PaaS resilience' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Plan a BCDR strategy (25%, design assumption)

- Worked applications: (1) Set RPO/RTO targets for a tier-1 and a tier-3 application; (2) Decide between in-region resilience and cross-region failover for a workload
- Common misconception addressed: Confusing high availability (uptime within a region) with disaster recovery (recovery after an outage)
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Business continuity and disaster recovery concepts | 60 | 6 |
| M01L02 | Defining RPO and RTO targets | 60 | 6 |
| M01L03 | Threat scope: zonal, regional and on-premises outages | 60 | 6 |
| M01L04 | Mapping workloads to DR approaches | 60 | 6 |
### M02 Protect workloads with Azure Site Recovery (25%, design assumption)

- Worked applications: (1) Enable Azure-to-Azure replication for a two-tier app to a paired region; (2) Choose a vault region that satisfies a data-residency constraint
- Common misconception addressed: Assuming the Recovery Services vault must hold the actual customer data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Site Recovery service overview | 60 | 6 |
| M02L02 | Replication: Azure-to-Azure and on-premises-to-Azure | 60 | 6 |
| M02L03 | Recovery Services vaults | 60 | 6 |
| M02L04 | Replication frequency and app-consistent snapshots | 60 | 6 |
### M03 Orchestrate failover and failback (25%, design assumption)

- Worked applications: (1) Build a recovery plan that sequences database before application tiers; (2) Run a test failover without affecting the production workload
- Common misconception addressed: Running failover for real to 'test' DR instead of using test failover
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Recovery plans and sequencing | 60 | 6 |
| M03L02 | Planned vs unplanned failover | 60 | 6 |
| M03L03 | Test failover (DR drills) | 60 | 6 |
| M03L04 | Failback to the primary site | 60 | 6 |
### M04 Integrate backup and PaaS resilience (25%, design assumption)

- Worked applications: (1) Combine Azure Backup and Site Recovery for a SQL Server VM workload; (2) Audit VM replication coverage across a subscription with Azure Policy
- Common misconception addressed: Treating backup and disaster recovery as interchangeable rather than complementary
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Azure Backup for data protection | 60 | 6 |
| M04L02 | SQL Always On and PaaS-native DR | 60 | 6 |
| M04L03 | Using Azure Policy to enforce protection | 60 | 6 |
| M04L04 | Network design for failover (IP, load balancing, Traffic Manager) | 60 | 6 |

## Integrative case

A regional retailer must survive the loss of its primary Azure region: set RPO/RTO targets, enable Site Recovery replication to a paired region, build and test a recovery plan, and add Azure Backup and Policy enforcement, then defend the plan to risk officers.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0690-final-protected | 72 | 72 | yes |
| MST-0690-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Plan a BCDR strategy | 18 |
| Protect workloads with Azure Site Recovery | 18 |
| Orchestrate failover and failback | 18 |
| Integrate backup and PaaS resilience | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0690-Q0001** (single-answer, Select ONE) An organization needs to validate its disaster recovery plan without disrupting production. Which Azure Site Recovery capability should it use?

- A. Test failover **(key)**  
  _Rationale:_ Correct: test failover runs the recovery in an isolated network without affecting the production workload.
- B. Unplanned failover  
  _Rationale:_ Unplanned failover switches production to the secondary site and is for real outages.
- C. Deleting the Recovery Services vault  
  _Rationale:_ Deleting the vault removes replication configuration; it does not test recovery.
- D. Disabling replication  
  _Rationale:_ Disabling replication stops protection and tests nothing.
**MST-0690-Q0002** (single-answer, Select ONE) A workload must recover with no more than 30 seconds of data loss. Which objective does this define?

- A. Recovery point objective (RPO) **(key)**  
  _Rationale:_ Correct: RPO defines the maximum acceptable data loss, measured as time.
- B. Recovery time objective (RTO)  
  _Rationale:_ RTO defines how long recovery may take, not how much data may be lost.
- C. Service-level agreement credit  
  _Rationale:_ SLA credits are financial remedies, not recovery objectives.
- D. Mean time between failures  
  _Rationale:_ MTBF is a reliability metric, not a recovery objective.
**MST-0690-Q0003** (multiple-answer, Select TWO) Which TWO statements about Azure Backup and Azure Site Recovery are correct? (Select TWO)

- A. Site Recovery replicates and fails over running workloads **(key)**  
  _Rationale:_ Correct: Site Recovery keeps apps running by replicating to a secondary location and failing over.
- B. Azure Backup keeps recoverable copies of data **(key)**  
  _Rationale:_ Correct: Azure Backup protects data by keeping recoverable copies.
- C. Site Recovery removes the need for any backups  
  _Rationale:_ DR replication and backup serve different purposes and are complementary.
- D. Azure Backup orchestrates multi-tier application failover  
  _Rationale:_ Orchestrated failover of multi-tier apps is a Site Recovery recovery-plan feature.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/azure/site-recovery/site-recovery-overview) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
