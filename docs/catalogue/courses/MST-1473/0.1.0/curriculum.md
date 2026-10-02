# Dataproc and Spark on Google Cloud

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1473` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Dataproc and Spark on Google Cloud (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain managed Spark/Hadoop with Dataproc and its cluster model
2. Create and configure Dataproc clusters and jobs
3. Process data with Spark reading from and writing to Cloud Storage
4. Optimize cost and scale with autoscaling and ephemeral clusters

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Dataproc fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Decide between Dataproc and self-managed Hadoop; (2) Size a cluster for a batch workload
- Common misconception addressed: Believing Dataproc requires managing your own Hadoop installation
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Managed Spark and Hadoop on Google Cloud | 72 | 7 |
| M01L02 | Cluster architecture: master and workers | 72 | 7 |

### M02 Clusters and jobs (MASTEMY-DESIGN 25%)

- Worked applications: (1) Submit a PySpark job to a cluster; (2) Run a Spark SQL query over Parquet data
- Common misconception addressed: Thinking a cluster must be deleted manually after every job by default
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating clusters and submitting jobs | 72 | 7 |
| M02L02 | PySpark and Spark SQL jobs | 72 | 7 |

### M03 Data and storage (MASTEMY-DESIGN 25%)

- Worked applications: (1) Read a partitioned dataset from Cloud Storage; (2) Choose Parquet over CSV for a wide table
- Common misconception addressed: Treating HDFS on the cluster as durable long-term storage
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cloud Storage as the data lake for Spark | 72 | 7 |
| M03L02 | Partitioning and file formats | 72 | 7 |

### M04 Cost and scaling (MASTEMY-DESIGN 25%)

- Worked applications: (1) Attach an autoscaling policy to a cluster; (2) Convert a persistent cluster to ephemeral jobs
- Common misconception addressed: Assuming a larger always-on cluster is always cheaper or faster
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Autoscaling policies | 72 | 7 |
| M04L02 | Ephemeral clusters and workflow templates | 72 | 7 |

## Integrative case

A data team runs a nightly Spark aggregation that is slow and expensive on a long-lived cluster. Re-platform it on Dataproc with ephemeral job-scoped clusters reading/writing Cloud Storage, add autoscaling, and justify the cost savings.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1473-final-protected | 28 | 35 | yes |
| MST-1473-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Dataproc fundamentals | 7 |
| Clusters and jobs | 7 |
| Data and storage | 7 |
| Cost and scaling | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1473-Q0001** (single-answer, Select ONE) For a Dataproc Spark job, where should durable input and output data normally live?

- A. Cloud Storage **(key)**  
  _Rationale:_ Correct: Cloud Storage decouples storage from ephemeral clusters and is durable.
- B. The cluster's local HDFS only  
  _Rationale:_ HDFS on the cluster is lost when the cluster is deleted.
- C. The master node's boot disk  
  _Rationale:_ The boot disk is not durable data storage and disappears with the cluster.
- D. BigQuery streaming buffer  
  _Rationale:_ That is unrelated to Spark durable file storage.

**MST-1473-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce Dataproc cost? (Select TWO.)

- A. Use ephemeral clusters scoped to a job **(key)**  
  _Rationale:_ Correct: paying only while the job runs cuts idle cost.
- B. Enable autoscaling to match worker count to load **(key)**  
  _Rationale:_ Correct: autoscaling avoids over-provisioning.
- C. Keep a large cluster running 24/7 just in case  
  _Rationale:_ Idle always-on clusters waste money.
- D. Store all data on expensive persistent SSD HDFS  
  _Rationale:_ That increases cost versus Cloud Storage.

**MST-1473-Q0003** (single-answer, Select ONE) What does Dataproc primarily provide?

- A. A managed service for running Spark and Hadoop clusters **(key)**  
  _Rationale:_ Correct: Dataproc manages Spark/Hadoop cluster provisioning and lifecycle.
- B. A serverless SQL warehouse  
  _Rationale:_ That describes BigQuery, not Dataproc.
- C. A message queue  
  _Rationale:_ That describes Pub/Sub, not Dataproc.
- D. A container registry  
  _Rationale:_ That is Artifact Registry, not Dataproc.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
