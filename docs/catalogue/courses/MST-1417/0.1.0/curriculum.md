# Microsoft AI-300 Exam Prep (successor to DP-100)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1417` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AI-300 |
| Version basis | Skills measured (Microsoft Learn study guide for AI-300, retrieved 2026-10-02); AI-300 is the successor to DP-100. |
| Evidence | **verified-official-source** - https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-300 |
| Legacy IDs | MST-MIC-MS-AI300-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design and implement an MLOps infrastructure
2. Implement machine learning model lifecycle and operations
3. Design and implement a GenAIOps infrastructure
4. Implement generative AI quality assurance and observability
5. Optimize generative AI systems and model performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Design and implement an MLOps infrastructure (15-20%)

- Worked applications: (1) Create a workspace, datastores and compute targets; (2) Configure identity and access for the workspace
- Common misconception addressed: Giving every data scientist Owner rather than scoped RBAC
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Create and manage Machine Learning workspace resources | 205 | 6 |
| M01L02 | Manage assets and implement IaC | 204 | 6 |

### M02 Implement machine learning model lifecycle and operations (25-30%)

- Worked applications: (1) Track experiments with MLflow and tune hyperparameters; (2) Build and run training pipelines
- Common misconception addressed: Comparing runs without logging consistent metrics
- Module check: 50 items / 56 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Orchestrate model training | 321 | 6 |
| M02L02 | Register, deploy and monitor models | 321 | 6 |

### M03 Design and implement a GenAIOps infrastructure (20-25%)

- Worked applications: (1) Create Foundry resources with managed identity and RBAC; (2) Deploy private networking with Bicep
- Common misconception addressed: Exposing a Foundry endpoint publicly by default
- Module check: 46 items / 46 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Configure Foundry environments | 263 | 6 |
| M03L02 | Deploy models and manage prompts | 262 | 6 |

### M04 Implement generative AI quality assurance and observability (10-15%)

- Worked applications: (1) Build test datasets and AI quality metrics (groundedness, relevance); (2) Configure risk and safety evaluations
- Common misconception addressed: Reading fluency as a proxy for factual groundedness
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Configure evaluation and validation | 146 | 6 |
| M04L02 | Implement observability | 146 | 6 |

### M05 Optimize generative AI systems and model performance (10-15%)

- Worked applications: (1) Tune chunk size, similarity thresholds and hybrid search; (2) A/B test retrieval with relevance metrics
- Common misconception addressed: Raising top-k indefinitely and assuming accuracy keeps improving
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Optimize RAG performance | 146 | 6 |
| M05L02 | Advanced fine-tuning and customization | 146 | 6 |

## Integrative case

Operationalize a forecasting model and a RAG assistant: stand up an Azure ML workspace with IaC and GitHub Actions, run and register training with MLflow, deploy endpoints with safe rollout and drift monitoring, build a Foundry GenAIOps environment, add groundedness/safety evaluation, and tune RAG retrieval.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1417-practice-form-A | 72 | 72 | yes |
| MST-1417-practice-form-B | 72 | 72 | no (optional practice) |
| MST-1417-practice-form-C | 72 | 72 | no (optional practice) |
| MST-1417-final-protected | 72 | 72 | yes |

| Domain | Items per form |
|---|---|
| Design and implement an MLOps infrastructure | 14 |
| Implement machine learning model lifecycle and operations | 21 |
| Design and implement a GenAIOps infrastructure | 17 |
| Implement generative AI quality assurance and observability | 10 |
| Optimize generative AI systems and model performance | 10 |

Minimum reviewed item bank: 774 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1417-Q0001** (single-answer, Select ONE) A deployed model's inputs have shifted from its training distribution and accuracy is dropping. Which Azure ML capability detects this?

- A. Data drift monitoring **(key)**  
  _Rationale:_ Correct: data drift monitoring detects divergence between serving and training data.
- B. Hyperparameter sweep  
  _Rationale:_ A sweep tunes training; it does not monitor production inputs.
- C. Managed online endpoint autoscale  
  _Rationale:_ Autoscale adjusts capacity, not data-distribution changes.
- D. Model registry archiving  
  _Rationale:_ Archiving manages model versions, not drift.

**MST-1417-Q0002** (single-answer, Select ONE) Which pairing best reflects infrastructure-as-code for an Azure ML workspace?

- A. Bicep templates deployed via GitHub Actions **(key)**  
  _Rationale:_ Correct: Bicep plus GitHub Actions is the IaC/automation approach in the objectives.
- B. Manually clicking through the portal each time  
  _Rationale:_ Manual portal setup is the opposite of IaC.
- C. Emailing config files to teammates  
  _Rationale:_ That is neither declarative nor automated provisioning.
- D. Storing secrets in a notebook cell  
  _Rationale:_ Embedding secrets in notebooks is insecure and not IaC.

**MST-1417-Q0003** (multiple-answer, Select TWO) Which TWO tactics are valid ways to optimize RAG accuracy per the AI-300 objectives? (Select TWO)

- A. Tune chunk size and similarity thresholds **(key)**  
  _Rationale:_ Correct: retrieval tuning (chunking, thresholds) improves RAG accuracy.
- B. Combine semantic and keyword (hybrid) search **(key)**  
  _Rationale:_ Correct: hybrid retrieval is an endorsed optimization.
- C. Always increase top-k to the maximum  
  _Rationale:_ Unbounded top-k adds noise and cost without guaranteed gains.
- D. Remove all evaluation metrics to speed up  
  _Rationale:_ Removing evaluation hides regressions rather than optimizing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
