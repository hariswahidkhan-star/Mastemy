# Microsoft PL-400: Power Platform Developer Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0175` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | PL-400 |
| Version basis | Skills measured as of October 16, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-PL400 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/pl-400) |
| Legacy IDs | MST-MIC-MS-PL400-001 |
| Planned time | T = 1675 min; instruction I = 1340 min (80%); assessment A = 335 min (20%) |
| Assessment split | lesson checks 75 / module checks 140 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Build Microsoft Power Platform solutions' to the depth the official outline requires
2. Apply the objectives of 'Extend the user experience' to the depth the official outline requires
3. Apply the objectives of 'Extend Microsoft Power Platform' to the depth the official outline requires
4. Apply the objectives of 'Develop integrations' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Build Microsoft Power Platform solutions (15–20%)

- Worked applications: (1) Decide business logic placement: plug-in vs flow vs business rule; (2) Manage solution layers and environment variables for ALM
- Common misconception addressed: Confusing managed and unmanaged solutions when promoting between environments
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Design the technical architecture | 90 | 6 |
| M01L02 | Design solution components | 90 | 6 |
| M01L03 | Implement application lifecycle management (ALM) | 90 | 6 |

### M02 Extend the user experience (25–30%)

- Worked applications: (1) Register a client-side event handler against the Client API; (2) Package and deploy a PCF code component
- Common misconception addressed: Assuming a PCF component and a web resource have the same lifecycle
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Apply business logic in model-driven apps by using client scripting | 90 | 6 |
| M02L02 | Create PCF code components | 90 | 6 |
| M02L03 | Build Power Apps code apps | 89 | 6 |
| M02L04 | Deploy and manage Power Apps code apps | 89 | 6 |

### M03 Extend Microsoft Power Platform (35–40%)

- Worked applications: (1) Develop a synchronous plug-in on the correct pipeline stage; (2) Implement OAuth and retry policy against the Dataverse Web API
- Common misconception addressed: Registering a plug-in on the wrong execution pipeline stage
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Create a Dataverse plug-in | 89 | 6 |
| M03L02 | Perform operations by using platform APIs | 89 | 6 |
| M03L03 | Process workloads by using Microsoft Azure Functions | 89 | 6 |
| M03L04 | Configure Power Automate cloud flows and Copilot Studio workflows | 89 | 6 |
| M03L05 | Build Microsoft Foundry agents that integrate with Power Platform | 89 | 6 |

### M04 Develop integrations (10–15%)

- Worked applications: (1) Register a webhook/Service Bus endpoint for a Dataverse event; (2) Build a custom connector from an Open API definition
- Common misconception addressed: Treating change tracking and alternate keys as the same sync mechanism
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Publish and consume Dataverse events | 89 | 6 |
| M04L02 | Implement synchronization for Dataverse data | 89 | 6 |
| M04L03 | Create custom connectors | 89 | 6 |

## Integrative case

An ISV extends Dataverse for a client. Design the solution: where business logic lives, an ALM pipeline with managed solutions and environment variables, PCF/code-app UX, a plug-in and Web API integration, and a custom connector plus Dataverse event publishing; justify the architecture to the solution architect.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0175-practice-form-A | 45 | 45 | yes |
| MST-0175-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0175-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0175-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Build Microsoft Power Platform solutions | 8 |
| Extend the user experience | 13 |
| Extend Microsoft Power Platform | 18 |
| Develop integrations | 6 |

Minimum reviewed item bank: 640 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0175-Q0001** (single-answer, Select ONE) Business logic must run inside the Dataverse transaction and roll back the operation if validation fails. Where should it be implemented?

- A. A synchronous plug-in on the correct pipeline stage **(key)**  
  _Rationale:_ Correct: a synchronous plug-in runs in the transaction and can throw to roll back.
- B. A scheduled Power Automate cloud flow  
  _Rationale:_ A scheduled flow runs asynchronously and cannot roll back the originating transaction.
- C. A canvas app formula  
  _Rationale:_ Canvas formulas run client-side and cannot enforce a server transaction.
- D. A Power BI measure  
  _Rationale:_ Power BI measures are for reporting, not transactional validation.

**MST-0175-Q0002** (single-answer, Select ONE) When promoting a solution from development to production, which solution type should you export to prevent direct edits in the target environment?

- A. A managed solution **(key)**  
  _Rationale:_ Correct: managed solutions are locked in the target environment, preventing ad-hoc edits.
- B. An unmanaged solution  
  _Rationale:_ Unmanaged solutions remain editable and are intended for development only.
- C. A default solution  
  _Rationale:_ The default solution is the environment's working container, not a transport artifact.
- D. A solution without a publisher  
  _Rationale:_ A publisher is required; this is not a promotion strategy.

**MST-0175-Q0003** (multiple-answer, Select TWO) Which TWO options let an external system be notified when a Dataverse row changes? (Select TWO.)

- A. Register a webhook service endpoint **(key)**  
  _Rationale:_ Correct: webhooks push Dataverse events to an external HTTP endpoint.
- B. Register an Azure Service Bus endpoint **(key)**  
  _Rationale:_ Correct: Service Bus endpoints relay Dataverse events for external consumers.
- C. Add a business rule  
  _Rationale:_ Business rules run inside the app; they do not notify external systems.
- D. Create a Power BI dashboard  
  _Rationale:_ Dashboards visualize data; they do not emit change events.
- E. Set a column as required  
  _Rationale:_ Field requirement is validation, not eventing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
