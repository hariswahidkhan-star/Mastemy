# Google Cloud Migration Strategies

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1474` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Migration Strategies (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Assess workloads and build a migration inventory and plan
2. Choose a migration approach (rehost, replatform, refactor)
3. Execute VM, database and data migrations with Google Cloud tools
4. Plan landing zone, cutover and validation for migrations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Migration planning (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build an inventory with dependencies; (2) Classify three workloads by migration strategy
- Common misconception addressed: Assuming every workload should be refactored to be cloud-native
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Assessment and workload inventory | 72 | 7 |
| M01L02 | The 6 Rs and choosing a strategy | 72 | 7 |

### M02 Rehost and replatform (MASTEMY-DESIGN 25%)

- Worked applications: (1) Plan a lift-and-shift of a web VM; (2) Replatform a self-managed DB to Cloud SQL
- Common misconception addressed: Thinking lift-and-shift automatically reduces operating cost
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Migrate to Virtual Machines (lift and shift) | 72 | 7 |
| M02L02 | Replatforming to managed services | 72 | 7 |

### M03 Data and database migration (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set up a continuous MySQL migration; (2) Choose Transfer Appliance vs online transfer
- Common misconception addressed: Underestimating data transfer time and bandwidth constraints
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Database Migration Service | 72 | 7 |
| M03L02 | Transferring large datasets | 72 | 7 |

### M04 Cutover and validation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Define a cutover window and rollback trigger; (2) Validate an app post-migration
- Common misconception addressed: Treating cutover as final with no rollback plan
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Landing zone readiness for migration | 72 | 7 |
| M04L02 | Cutover, validation and rollback | 72 | 7 |

## Integrative case

A company must move 40 on-prem VMs and a MySQL database to Google Cloud in a quarter. Build the assessment and inventory, choose per-workload strategies, pick migration tooling, and plan the cutover and rollback.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1474-final-protected | 28 | 35 | yes |
| MST-1474-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Migration planning | 7 |
| Rehost and replatform | 7 |
| Data and database migration | 7 |
| Cutover and validation | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1474-Q0001** (single-answer, Select ONE) In the '6 Rs' framework, 'rehost' refers to which approach?

- A. Lift and shift with minimal changes **(key)**  
  _Rationale:_ Correct: rehost moves a workload largely unchanged.
- B. Rewriting the application as microservices  
  _Rationale:_ That is refactor/re-architect.
- C. Retiring the workload  
  _Rationale:_ That is 'retire'.
- D. Replacing it with SaaS  
  _Rationale:_ That is 'repurchase'.

**MST-1474-Q0002** (multiple-answer, Select TWO) Which TWO factors most affect how you move a large on-prem dataset to Google Cloud? (Select TWO.)

- A. Available network bandwidth **(key)**  
  _Rationale:_ Correct: bandwidth drives online transfer feasibility and time.
- B. Total data volume **(key)**  
  _Rationale:_ Correct: volume vs time window may require offline Transfer Appliance.
- C. The color of the admin console theme  
  _Rationale:_ Irrelevant to transfer planning.
- D. The number of IAM custom roles  
  _Rationale:_ Not a primary data-transfer factor.

**MST-1474-Q0003** (single-answer, Select ONE) Moving a self-managed database to Cloud SQL is an example of which strategy?

- A. Replatform **(key)**  
  _Rationale:_ Correct: moving to a managed equivalent with some change is replatforming.
- B. Rehost  
  _Rationale:_ Rehost keeps the same self-managed stack on a VM.
- C. Retire  
  _Rationale:_ The workload is kept, not retired.
- D. Retain  
  _Rationale:_ Retain means leaving it on-prem.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
