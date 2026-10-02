# NVIDIA-Certified Associate: AI Infrastructure and Operations Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1302` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | NVIDIA (no affiliation or endorsement) |
| Exam code | NCA-AIIO |
| Version basis | DESIGN ASSUMPTION - official blueprint not retrieved (nvidia.com egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - official NVIDIA exam page egress-blocked; confirm domains, weights, question count and duration on the official source |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply AI infrastructure concepts covered by the NCA-AIIO exam to practice problems
2. Apply knowledge of the GPU-accelerated AI operations workflow to practice problems
3. Apply AI data-centre and deployment considerations to practice problems
4. Apply AI operations, monitoring and lifecycle practices to practice problems

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use single-answer MCQ and multiple-answer selection only; any official item formats not reproducible in this format are listed in the exam-version record. Platform scores are Mastemy learning thresholds and do not predict the external exam result.

## Modules

### M01 AI infrastructure foundations (equal (design assumption; official weights not verified))

- Worked applications: (1) Classify five workloads by whether GPU acceleration is warranted; (2) Match three infrastructure components to the layer they serve
- Common misconception addressed: Assuming every AI workload needs the largest possible GPU
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | AI, machine learning and deep learning essentials | 120 | 6 |
| M01L02 | GPU acceleration and why it matters for AI | 120 | 6 |
| M01L03 | Compute, networking and storage building blocks | 120 | 6 |

### M02 GPU-accelerated AI operations workflow (equal (design assumption; official weights not verified))

- Worked applications: (1) Order the stages of an AI development-to-deployment workflow; (2) Identify which software-stack layer a given task belongs to
- Common misconception addressed: Treating deployment as finished once a model trains successfully
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The AI development-to-deployment workflow | 120 | 6 |
| M02L02 | Software stack and libraries for GPU AI | 120 | 6 |
| M02L03 | Managing accelerated workloads | 120 | 6 |

### M03 AI data centre and deployment (equal (design assumption; official weights not verified))

- Worked applications: (1) Choose on-prem vs cloud vs hybrid for three stated constraints; (2) Size a cluster for a described training job at a high level
- Common misconception addressed: Assuming cloud is always cheaper or simpler than on-prem
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data-centre and cluster considerations | 120 | 6 |
| M03L02 | On-prem, cloud and hybrid deployment | 120 | 6 |
| M03L03 | Scaling and resource scheduling | 120 | 6 |

### M04 AI operations, monitoring and lifecycle (equal (design assumption; official weights not verified))

- Worked applications: (1) Interpret a utilisation metric to spot an under-used GPU fleet; (2) Walk through a basic triage of a degraded inference service
- Common misconception addressed: Reading high utilisation as always good without checking goals
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Monitoring utilisation, performance and health | 120 | 6 |
| M04L02 | Reliability, capacity and troubleshooting | 120 | 6 |
| M04L03 | Lifecycle, security and governance basics | 120 | 6 |

## Integrative case

A mid-size enterprise plans a GPU-accelerated AI platform: a candidate reasons about infrastructure components, the development-to-deployment workflow, on-prem versus cloud deployment, and ongoing monitoring and lifecycle practices, defending choices at the depth the NCA-AIIO associate exam targets. (Module structure is a Mastemy design assumption pending verification against the official NVIDIA exam blueprint.)

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam blueprint was not retrieved (issuer site egress-blocked); form length is set from the assessment time budget. Confirm question count and duration on the official exam page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1302-practice-form-A | 54 | 54 | yes |
| MST-1302-practice-form-B | 54 | 54 | no (optional) |
| MST-1302-practice-form-C | 54 | 54 | no (optional) |
| MST-1302-final-protected | 54 | 54 | yes |

| Domain | Items per form |
|---|---|
| AI infrastructure foundations | 14 |
| GPU-accelerated AI operations workflow | 14 |
| AI data centre and deployment | 13 |
| AI operations, monitoring and lifecycle | 13 |

Minimum reviewed item bank: 612 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1302-Q0001** (single-answer, Select ONE) Why are GPUs widely used to accelerate deep-learning training compared with CPUs alone?

- A. They provide massive parallelism well suited to the matrix operations in neural networks **(key)**  
  _Rationale:_ Correct: GPUs excel at the highly parallel matrix/tensor math that dominates deep-learning training.
- B. They store far more long-term data than any CPU system  
  _Rationale:_ Acceleration comes from parallel compute, not from storage capacity.
- C. They remove the need for any networking in a cluster  
  _Rationale:_ Networking remains essential in multi-GPU and multi-node training.
- D. They make all training finish in a fixed one second  
  _Rationale:_ No hardware guarantees a fixed training time; this is not how acceleration works.

**MST-1302-Q0002** (single-answer, Select ONE) A model trains successfully in a notebook. Why is the AI workflow not yet complete?

- A. The model still needs deployment, monitoring and lifecycle management in operation **(key)**  
  _Rationale:_ Correct: a trained model must be deployed and operated with monitoring to deliver value.
- B. Training success means the workflow is finished  
  _Rationale:_ Training is one stage; deployment and operations follow.
- C. Notebooks cannot train models at all  
  _Rationale:_ Notebooks can train models; the point is later stages remain.
- D. Monitoring only applies before training  
  _Rationale:_ Monitoring is central after deployment, not only before training.

**MST-1302-Q0003** (multiple-answer, Select TWO) Which TWO factors most favour an on-premises GPU deployment over public cloud for a workload? (Select TWO)

- A. Strict data-residency or regulatory constraints on where data may run **(key)**  
  _Rationale:_ Correct: data-residency/regulatory limits often push workloads on-prem.
- B. Sustained, highly predictable utilisation over a long period **(key)**  
  _Rationale:_ Correct: steady high utilisation can make owned hardware more cost-effective than metered cloud.
- C. Highly variable, short-lived bursts of demand  
  _Rationale:_ Bursty, short-lived demand typically favours elastic cloud capacity.
- D. A need to avoid any capital expenditure  
  _Rationale:_ Avoiding capex favours cloud's operating-expense model, not on-prem.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

