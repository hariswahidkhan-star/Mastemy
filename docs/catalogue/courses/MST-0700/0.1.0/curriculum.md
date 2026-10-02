# Azure Machine Learning: Training, Deployment, and Monitoring

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0700` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Azure Machine Learning documentation read via the Microsoft Learn MCP on 2026-10-02 (workspace as the top-level resource grouping jobs, data assets, models, components and endpoints; training jobs and experiments; pipelines; registered models; managed online and batch endpoints; compute targets; MLOps). The SDK v2 and studio evolve; confirm API and portal details against current docs before production. |
| Official sources | https://learn.microsoft.com/azure/machine-learning/concept-workspace?view=azureml-api-2; https://learn.microsoft.com/azure/machine-learning/concept-endpoints?view=azureml-api-2 |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZURE-ML |
| Legacy IDs | none |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 64 / cumulative 161 min |
| Certificate | Mastemy Certificate of Completion — Azure Machine Learning: Training, Deployment, and Monitoring (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Organise work in an Azure Machine Learning workspace
2. Run training jobs and group them into experiments
3. Register models and build reusable pipelines
4. Deploy models to managed online or batch endpoints
5. Monitor deployments and apply basic MLOps practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Workspaces and compute (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Create a workspace and attach a compute target; (2) Organise data assets and connections
- Common misconception addressed: Thinking the workspace stores models only, not the full set of ML artifacts and config
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Azure ML workspace | 120 | 5 |
| M01L02 | Compute targets and datastores | 120 | 5 |

### M02 Training and experiments (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Run a training job and log metrics; (2) Group jobs into an experiment and compare
- Common misconception addressed: Comparing runs by memory rather than logging metrics into experiments
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Training jobs | 120 | 5 |
| M02L02 | Experiments and metric logging | 120 | 5 |

### M03 Models and pipelines (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Register the best model with a version; (2) Author a reusable training pipeline
- Common misconception addressed: Redeploying ad-hoc scripts instead of registering a versioned model
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Registering models | 120 | 5 |
| M03L02 | Authoring ML pipelines | 120 | 5 |

### M04 Deployment and monitoring (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Deploy a model to a managed online endpoint and route traffic; (2) Add monitoring and plan a retraining trigger
- Common misconception addressed: Sending all traffic to a new deployment with no safe rollout
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Managed online and batch endpoints | 120 | 5 |
| M04L02 | Traffic routing and safe rollout | 120 | 5 |
| M04L03 | Monitoring and MLOps | 120 | 5 |

## Integrative case

A data scientist operationalises a model: set up a workspace and compute, run training jobs grouped as an experiment, register the best model, deploy it to a managed online endpoint with traffic routing, then add monitoring and a retraining pipeline.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0700-final-protected | 30 | 40 | yes |
| MST-0700-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Workspaces and compute | 8 |
| Training and experiments | 8 |
| Models and pipelines | 7 |
| Deployment and monitoring | 7 |

Minimum reviewed item bank: 278 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0700-Q0001** (single-answer, Select ONE) In Azure Machine Learning, what is the workspace?

- A. The top-level resource that groups jobs, data assets, models, components and endpoints **(key)**  
  _Rationale:_ Correct: the workspace organises all ML artifacts and configuration.
- B. A single trained model file  
  _Rationale:_ A model is one artifact within a workspace.
- C. A billing plan only  
  _Rationale:_ The workspace is a working resource, not merely billing.
- D. A virtual network  
  _Rationale:_ Networking is a setting of a workspace, not the workspace itself.

**MST-0700-Q0002** (multiple-answer, Select TWO) Which TWO are true about deploying models to endpoints in Azure ML? (Select TWO.)

- A. A managed online endpoint serves real-time scoring requests **(key)**  
  _Rationale:_ Correct: online endpoints provide real-time inference.
- B. An endpoint can have multiple deployments with traffic split between them **(key)**  
  _Rationale:_ Correct: endpoints can route traffic across deployments for safe rollout.
- C. You must redeploy the whole workspace to update one model  
  _Rationale:_ You update the deployment, not the whole workspace.
- D. Batch endpoints are for interactive, low-latency single requests  
  _Rationale:_ Batch endpoints process large inputs, not low-latency single requests.

**MST-0700-Q0003** (single-answer, Select ONE) Why register a model in the workspace before deployment?

- A. To version it and track the asset used by an endpoint **(key)**  
  _Rationale:_ Correct: registration gives a versioned, tracked model asset.
- B. Because unregistered models cannot be trained  
  _Rationale:_ Registration follows training; it is not a training prerequisite.
- C. To delete the training data automatically  
  _Rationale:_ Registration does not delete data.
- D. Because it converts the model to a VM  
  _Rationale:_ Registration does not convert a model into a VM.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
