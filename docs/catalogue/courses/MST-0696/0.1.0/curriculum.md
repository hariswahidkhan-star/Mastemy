# Microsoft Foundry: AI Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0696` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-AZURE-FOUNDRY (https://learn.microsoft.com/azure/foundry/what-is-foundry) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Foundry: AI Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Orient to Microsoft Foundry' to professional tasks
2. Apply the skills of 'Work with models' to professional tasks
3. Apply the skills of 'Build agents' to professional tasks
4. Apply the skills of 'Ground, observe and govern' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Orient to Microsoft Foundry (25%, design assumption)

- Worked applications: (1) Create a Foundry project and deploy a model in the portal; (2) Choose basic vs standard setup for a confidential workload
- Common misconception addressed: Assuming the basic setup provides network isolation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Foundry is: a managed AI platform | 60 | 6 |
| M01L02 | Foundry portal vs Foundry Toolkit for VS Code | 60 | 6 |
| M01L03 | Projects and resources | 60 | 6 |
| M01L04 | Basic vs standard setup and networking | 60 | 6 |
### M02 Work with models (25%, design assumption)

- Worked applications: (1) Select and deploy a model, then call it from the playground; (2) Compare two deployment types for a cost/throughput trade-off
- Common misconception addressed: Believing a newer or larger model is always the right choice for a task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The Foundry Models catalog | 60 | 6 |
| M02L02 | Choosing a model for a task | 60 | 6 |
| M02L03 | Deployment types (Standard, GlobalStandard) | 60 | 6 |
| M02L04 | Model customization and fine-tuning | 60 | 6 |
### M03 Build agents (25%, design assumption)

- Worked applications: (1) Create a prompt agent with instructions and one tool; (2) Decide between a declarative and a hosted agent for a scenario
- Common misconception addressed: Thinking every agent requires custom hosted code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Declarative prompt agents | 60 | 6 |
| M03L02 | Hosted (code-first) agents | 60 | 6 |
| M03L03 | Tools, MCP and OpenAPI integration | 60 | 6 |
| M03L04 | Memory and the Agent Framework | 60 | 6 |
### M04 Ground, observe and govern (25%, design assumption)

- Worked applications: (1) Add a knowledge source so an agent answers with citations; (2) Set up tracing and a basic evaluation for an agent
- Common misconception addressed: Assuming a grounded model never produces an unsupported answer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Grounding with Foundry IQ / retrieval | 60 | 6 |
| M04L02 | Observability: tracing and evaluation | 60 | 6 |
| M04L03 | Content Safety filters | 60 | 6 |
| M04L04 | Entra identity, RBAC and the control plane | 60 | 6 |

## Integrative case

A support team wants an internal assistant grounded on its knowledge base: create a Foundry project, deploy a model, build an agent with a retrieval tool and a content-safety filter, add tracing and evaluation, and present the governance controls to security.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0696-final-protected | 72 | 72 | yes |
| MST-0696-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Orient to Microsoft Foundry | 18 |
| Work with models | 18 |
| Build agents | 18 |
| Ground, observe and govern | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0696-Q0001** (single-answer, Select ONE) A developer needs an agent that runs custom Python with their own libraries under a managed runtime. Which Foundry agent type fits best?

- A. A hosted (code-first) agent **(key)**  
  _Rationale:_ Correct: hosted agents run your own code with a managed runtime that handles provisioning and scaling.
- B. A declarative prompt agent  
  _Rationale:_ Declarative agents rely on model reasoning and instructions, not custom code libraries.
- C. A content filter  
  _Rationale:_ Content filters screen content; they do not run application code.
- D. A semantic model  
  _Rationale:_ A semantic model is a Power BI/analytics concept, not a Foundry agent type.
**MST-0696-Q0002** (single-answer, Select ONE) A workload is confidential and must integrate privately with existing Azure resources. Which Foundry setup should be chosen?

- A. Standard setup with private networking **(key)**  
  _Rationale:_ Correct: the standard setup provides fine-grained data, security and network isolation for confidential workloads.
- B. Basic setup  
  _Rationale:_ Basic setup is for rapid prototyping and lacks network isolation.
- C. No project at all  
  _Rationale:_ A project is required to build in Foundry.
- D. A public playground only  
  _Rationale:_ The playground alone does not provide private networking for production workloads.
**MST-0696-Q0003** (multiple-answer, Select TWO) Which TWO Foundry capabilities help an organization govern and observe agents in production? (Select TWO)

- A. Tracing and evaluation **(key)**  
  _Rationale:_ Correct: observability through tracing and evaluation monitors agent behavior.
- B. Microsoft Entra identity and RBAC **(key)**  
  _Rationale:_ Correct: Entra identity and role-based access control govern who can do what.
- C. Deleting the model catalog  
  _Rationale:_ There is no such action and it would not provide governance.
- D. Turning off all content filters  
  _Rationale:_ Disabling content filters reduces safety rather than improving governance.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/azure/foundry/what-is-foundry) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
