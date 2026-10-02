# AWS Well-Architected Framework

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1484` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-WA (https://docs.aws.amazon.com/wellarchitected/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — AWS Well-Architected Framework (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the purpose and structure of the Well-Architected Framework
2. Apply the Operational Excellence pillar
3. Apply the Security pillar
4. Apply the Reliability pillar
5. Apply the Performance Efficiency and Cost Optimization pillars
6. Run a Well-Architected review and prioritize improvements

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Framework overview (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain the six pillars and the review process at a high level; (2) Map a design decision to the relevant pillar
- Common misconception addressed: Treating Well-Architected as a one-time certification
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Purpose and the six pillars | 48 | 5 |
| M01L02 | Design principles and the review process | 48 | 5 |

### M02 Operational Excellence (MASTEMY-DESIGN 16%)

- Worked applications: (1) Define operations as code and runbooks for a service; (2) Design metrics and a post-incident learning loop
- Common misconception addressed: Running operations manually with no runbooks or automation
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Operations as code and observability | 48 | 5 |
| M02L02 | Runbooks, incidents and learning | 48 | 5 |

### M03 Security (MASTEMY-DESIGN 17%)

- Worked applications: (1) Apply least privilege and identity federation; (2) Design defense in depth and encryption at rest and in transit
- Common misconception addressed: Relying on a single network boundary as the only control
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Identity and access management | 48 | 5 |
| M03L02 | Detection, protection and data security | 48 | 5 |

### M04 Reliability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Design for failure with multi-AZ and health checks; (2) Plan backups, recovery objectives and failover testing
- Common misconception addressed: Assuming a single AZ deployment is highly available
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Fault isolation and recovery | 48 | 5 |
| M04L02 | RTO/RPO, backups and testing | 48 | 5 |

### M05 Performance and Cost (MASTEMY-DESIGN 17%)

- Worked applications: (1) Right-size and select the correct resource type for a workload; (2) Apply cost allocation tags and purchasing options
- Common misconception addressed: Optimizing cost by under-provisioning until reliability suffers
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Performance efficiency | 48 | 5 |
| M05L02 | Cost optimization and trade-offs | 48 | 5 |

### M06 Running a review (MASTEMY-DESIGN 17%)

- Worked applications: (1) Conduct a Well-Architected review and record findings; (2) Prioritize remediation by risk and effort
- Common misconception addressed: Listing every finding as equally urgent with no prioritization
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | The Well-Architected Tool and workload reviews | 48 | 5 |
| M06L02 | Prioritizing and tracking improvements | 48 | 5 |

## Integrative case

A startup prepares for growth by reviewing its architecture against the Well-Architected Framework: assess each pillar, identify the highest-risk gaps in security and reliability, and build a prioritized remediation plan with trade-offs made explicit to leadership.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1484-final-protected | 30 | 30 | yes |
| MST-1484-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Framework overview | 5 |
| Operational Excellence | 5 |
| Security | 5 |
| Reliability | 5 |
| Performance and Cost | 5 |
| Running a review | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1484-Q0001** (single-answer, Select ONE) How is the Well-Architected Framework best used over a system's life?

- A. As an ongoing, repeated review practice as the workload evolves **(key)**  
  _Rationale:_ Correct: Well-Architected is iterative and revisited as the system changes.
- B. As a one-time certification completed before launch  
  _Rationale:_ It is not a one-time check; architectures change and should be re-reviewed.
- C. As a replacement for monitoring and operations  
  _Rationale:_ It complements, not replaces, operational practices.
- D. As a billing feature that reduces cost automatically  
  _Rationale:_ It is a review framework, not an automatic cost reducer.

**MST-1484-Q0002** (multiple-answer, Select TWO) Which TWO align with the Reliability pillar? (Select TWO.)

- A. Deploy across multiple Availability Zones **(key)**  
  _Rationale:_ Correct: multi-AZ deployment removes a single-AZ point of failure.
- B. Define recovery objectives (RTO/RPO) and test failover **(key)**  
  _Rationale:_ Correct: defining and testing recovery targets is core to reliability.
- C. Run everything in one AZ to simplify networking  
  _Rationale:_ A single AZ is a reliability risk, not a reliability practice.
- D. Skip backups to save storage cost  
  _Rationale:_ Skipping backups directly undermines reliability.

**MST-1484-Q0003** (single-answer, Select ONE) Which practice best reflects the Security pillar's principle of least privilege?

- A. Grant each identity only the permissions its task requires **(key)**  
  _Rationale:_ Correct: least privilege limits permissions to what is needed.
- B. Give all users administrator access for convenience  
  _Rationale:_ Blanket admin access violates least privilege.
- C. Share one root account among the team  
  _Rationale:_ Sharing root is a serious security anti-pattern.
- D. Disable logging to reduce noise  
  _Rationale:_ Disabling logging weakens detection, not a security practice.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
