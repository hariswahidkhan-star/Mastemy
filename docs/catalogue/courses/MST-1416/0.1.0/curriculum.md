# Microsoft AI-200 Developer Exam Prep (successor to AZ-204)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1416` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AI-200 |
| Version basis | Skills measured (Microsoft Learn study guide for AI-200, retrieved 2026-10-02); AI-200 is the successor to AZ-204. |
| Evidence | **verified-official-source** - https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-200 |
| Legacy IDs | MST-MIC-MS-AI200-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Develop containerized solutions on Azure
2. Develop AI solutions by using Azure data management services
3. Connect to and consume Azure services
4. Secure, monitor, and troubleshoot Azure solutions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Develop containerized solutions on Azure (20-25%)

- Worked applications: (1) Build, version and store images in Azure Container Registry; (2) Deploy a container to Azure App Service with env vars and secrets
- Common misconception addressed: Assuming an image pushed to ACR is automatically deployed
- Module check: 45 items / 45 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Implement container application hosting | 256 | 6 |
| M01L02 | Implement container-orchestrated solutions | 256 | 6 |

### M02 Develop AI solutions by using Azure data management services (25-30%)

- Worked applications: (1) Run queries and tune RUs with indexing policies; (2) Store embeddings and run vector similarity search
- Common misconception addressed: Thinking a stronger consistency level has no RU/latency cost
- Module check: 50 items / 54 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Use Azure Cosmos DB for NoSQL | 209 | 6 |
| M02L02 | Use Azure Database for PostgreSQL and Managed Redis | 208 | 6 |
| M02L03 | Handle change and connection optimization | 208 | 6 |

### M03 Connect to and consume Azure services (20-25%)

- Worked applications: (1) Process messages with Service Bus topics/subscriptions and DLQ; (2) Build event-driven workflows with Event Grid filters and retries
- Common misconception addressed: Confusing a Service Bus queue with an Event Grid topic
- Module check: 45 items / 45 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Develop event- and message-based solutions | 256 | 6 |
| M03L02 | Develop and implement Azure Functions | 256 | 6 |

### M04 Secure, monitor, and troubleshoot Azure solutions (20-25%)

- Worked applications: (1) Store and rotate secrets in Key Vault; (2) Externalize settings with App Configuration
- Common misconception addressed: Hard-coding secrets instead of referencing Key Vault
- Module check: 45 items / 45 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Implement secure Azure solutions | 256 | 6 |
| M04L02 | Monitor and troubleshoot | 255 | 6 |

## Integrative case

Ship a RAG-backed API for a knowledge assistant: containerize the service to Azure Container Apps, store and vector-search embeddings in Cosmos DB / Azure Database for PostgreSQL, wire event-driven processing with Service Bus and Functions, then secure secrets in Key Vault and trace with OpenTelemetry.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1416-practice-form-A | 72 | 72 | yes |
| MST-1416-practice-form-B | 72 | 72 | no (optional practice) |
| MST-1416-practice-form-C | 72 | 72 | no (optional practice) |
| MST-1416-final-protected | 72 | 72 | yes |

| Domain | Items per form |
|---|---|
| Develop containerized solutions on Azure | 17 |
| Develop AI solutions by using Azure data management services | 21 |
| Connect to and consume Azure services | 17 |
| Secure, monitor, and troubleshoot Azure solutions | 17 |

Minimum reviewed item bank: 766 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1416-Q0001** (single-answer, Select ONE) You need to store document embeddings and run semantic similarity search inside a NoSQL store you already use for app data. Which Azure option fits?

- A. Azure Cosmos DB for NoSQL vector search **(key)**  
  _Rationale:_ Correct: Cosmos DB for NoSQL supports storing embeddings and vector similarity search.
- B. Azure Blob Storage static website  
  _Rationale:_ Blob static hosting serves files; it has no vector query capability.
- C. Azure Key Vault  
  _Rationale:_ Key Vault stores secrets, not embeddings.
- D. Azure Service Bus  
  _Rationale:_ Service Bus is messaging middleware, not a vector store.

**MST-1416-Q0002** (single-answer, Select ONE) Which service builds and runs container images with managed tasks on Azure?

- A. Azure Container Registry (with ACR Tasks) **(key)**  
  _Rationale:_ Correct: ACR stores images and ACR Tasks build/run them.
- B. Azure Functions  
  _Rationale:_ Functions runs serverless code, not image builds as its purpose.
- C. Azure Monitor  
  _Rationale:_ Azure Monitor observes resources; it does not build images.
- D. Azure App Configuration  
  _Rationale:_ App Configuration stores settings, not container images.

**MST-1416-Q0003** (multiple-answer, Select TWO) Which TWO practices secure and observe an Azure solution per the AI-200 objectives? (Select TWO)

- A. Store and rotate secrets in Azure Key Vault **(key)**  
  _Rationale:_ Correct: Key Vault centralizes and rotates secrets securely.
- B. Instrument distributed tracing with OpenTelemetry **(key)**  
  _Rationale:_ Correct: OpenTelemetry tracing supports monitoring distributed systems.
- C. Embed connection strings directly in source code  
  _Rationale:_ Hard-coding secrets is an anti-pattern the objectives warn against.
- D. Disable logging to reduce cost  
  _Rationale:_ Disabling logging removes the telemetry needed to troubleshoot.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
