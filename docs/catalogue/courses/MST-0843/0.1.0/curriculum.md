# .NET Cloud-Native Applications with Aspire

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0843` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (.NET Aspire stack for cloud-native apps: orchestration, integrations, dashboard). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-ASPIRE (https://learn.microsoft.com/dotnet/aspire/; https://learn.microsoft.com/training/paths/dotnet-aspire/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — .NET Cloud-Native Applications with Aspire (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what .NET Aspire is and the cloud-native problems it addresses
2. Create an Aspire solution with AppHost and ServiceDefaults
3. Model resources and service-to-service references in the app model
4. Use Aspire integrations for databases, caching and messaging
5. Use the Aspire dashboard for telemetry and diagnosing connections
6. Understand service discovery, health checks and observability defaults

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Aspire fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Describe the problems Aspire orchestration solves; (2) Identify the role of AppHost vs ServiceDefaults
- Common misconception addressed: Thinking Aspire is a hosting/deployment platform rather than a dev-time stack
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Aspire is and cloud-native goals | 80 | 5 |
| M01L02 | AppHost and ServiceDefaults | 80 | 5 |

### M02 Creating a project (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a new Aspire solution from the template; (2) Add Aspire orchestration to an existing ASP.NET Core app
- Common misconception addressed: Expecting Aspire without the required SDK and workload
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Aspire templates and tooling | 80 | 5 |
| M02L02 | Adding orchestration to an existing app | 80 | 5 |

### M03 App model (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a project resource to the AppHost; (2) Reference one service from another for discovery
- Common misconception addressed: Hardcoding connection strings instead of using references
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Modelling resources | 80 | 5 |
| M03L02 | Service references and discovery | 80 | 5 |

### M04 Integrations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a Postgres integration; (2) Add a Redis cache integration
- Common misconception addressed: Reimplementing what a built-in integration already provides
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Databases and caching | 80 | 5 |
| M04L02 | Messaging with RabbitMQ | 80 | 5 |

### M05 Dashboard and telemetry (MASTEMY-DESIGN 17%)

- Worked applications: (1) Open the dashboard to inspect a trace; (2) Diagnose a connection issue between two services
- Common misconception addressed: Ignoring the built-in telemetry and adding ad-hoc logging only
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Using the dashboard | 80 | 5 |
| M05L02 | Logs, traces and metrics | 80 | 5 |

### M06 Operations defaults (MASTEMY-DESIGN 17%)

- Worked applications: (1) Explain the health checks ServiceDefaults adds; (2) Describe what observability defaults Aspire configures
- Common misconception addressed: Assuming you must configure OpenTelemetry entirely by hand
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Health checks and service discovery | 80 | 5 |
| M06L02 | Observability out of the box | 80 | 5 |

## Integrative case

Stand up a cloud-native shop: create an Aspire AppHost that orchestrates a web frontend, an API, a Postgres database and a Redis cache, wire references so service discovery configures connections, and use the dashboard to find a failing dependency.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0843-final-protected | 40 | 50 | yes |
| MST-0843-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Aspire fundamentals | 7 |
| Creating a project | 7 |
| App model | 7 |
| Integrations | 7 |
| Dashboard and telemetry | 6 |
| Operations defaults | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0843-Q0001** (single-answer, Select ONE) What best describes .NET Aspire?

- A. An opinionated stack for building observable, production-ready distributed apps, focused on dev-time orchestration and integrations **(key)**  
  _Rationale:_ Correct: Aspire provides orchestration, integrations, tooling and service discovery.
- B. A replacement for Kubernetes in production  
  _Rationale:_ Aspire is not a production container orchestrator.
- C. A UI framework for mobile apps  
  _Rationale:_ That describes .NET MAUI, not Aspire.
- D. A relational database engine  
  _Rationale:_ Aspire orchestrates resources; it is not a database.

**MST-0843-Q0002** (multiple-answer, Select TWO) Which TWO capabilities does .NET Aspire provide? (Select TWO.)

- A. Orchestration of multiple services and their dependencies at development time **(key)**  
  _Rationale:_ Correct: Aspire coordinates services and dependencies.
- B. Pre-built integrations for common services such as databases and caches **(key)**  
  _Rationale:_ Correct: integrations wire up common backing services.
- C. Automatic rewriting of your business logic  
  _Rationale:_ Aspire does not rewrite application logic.
- D. A guarantee that no production monitoring is needed  
  _Rationale:_ Aspire aids observability but does not remove the need for production monitoring.

**MST-0843-Q0003** (single-answer, Select ONE) In an Aspire solution, what is the role of the AppHost project?

- A. It defines and orchestrates the app's resources and their references **(key)**  
  _Rationale:_ Correct: the AppHost is the orchestration entry point describing resources.
- B. It stores all user data  
  _Rationale:_ The AppHost orchestrates; it is not a data store.
- C. It compiles the mobile UI  
  _Rationale:_ That is unrelated to Aspire.
- D. It replaces the service's own Program.cs  
  _Rationale:_ Each service keeps its own entry point.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
