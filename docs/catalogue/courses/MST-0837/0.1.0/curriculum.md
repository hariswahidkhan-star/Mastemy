# .NET gRPC and High-Performance Service Communication

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0837` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (gRPC on .NET and gRPC services with ASP.NET Core). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-GRPC (https://learn.microsoft.com/aspnet/core/grpc/; https://learn.microsoft.com/aspnet/core/grpc/aspnetcore; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — .NET gRPC and High-Performance Service Communication (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain gRPC, Protocol Buffers and HTTP/2 transport
2. Define services and messages in a .proto contract
3. Build a gRPC service on ASP.NET Core
4. Call a gRPC service with the .NET client and channels
5. Use the four gRPC call types including streaming
6. Configure TLS, deadlines and client reuse for performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 gRPC fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Compare gRPC with JSON REST for an internal service; (2) Explain why gRPC needs HTTP/2
- Common misconception addressed: Thinking gRPC is a drop-in replacement for browser-facing REST
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | gRPC, Protobuf and HTTP/2 | 80 | 5 |
| M01L02 | When to choose gRPC | 80 | 5 |

### M02 Service contracts (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a .proto with a unary method; (2) Regenerate client and server types from a .proto
- Common misconception addressed: Editing generated code instead of the .proto
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Defining messages and services in .proto | 80 | 5 |
| M02L02 | Generated C# assets | 80 | 5 |

### M03 Building services (MASTEMY-DESIGN 17%)

- Worked applications: (1) Register a gRPC service with MapGrpcService; (2) Resolve a logger inside a gRPC method
- Common misconception addressed: Forgetting AddGrpc or MapGrpcService in Program.cs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | gRPC service on ASP.NET Core | 80 | 5 |
| M03L02 | Dependency injection and HttpContext | 80 | 5 |

### M04 Clients and channels (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a client from a channel; (2) Reuse a channel across many calls
- Common misconception addressed: Creating a new channel for every call
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Creating a channel and client | 80 | 5 |
| M04L02 | Channel reuse and performance | 80 | 5 |

### M05 Streaming (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a server-streaming method; (2) Choose the right streaming type for a scenario
- Common misconception addressed: Blocking on async gRPC calls with .Result
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Server and client streaming | 80 | 5 |
| M05L02 | Bidirectional streaming | 80 | 5 |

### M06 Security and performance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Configure a channel to use TLS; (2) Set a deadline on a call
- Common misconception addressed: Mismatching client and server connection security
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | TLS and connection security | 80 | 5 |
| M06L02 | Deadlines and best practices | 80 | 5 |

## Integrative case

Build an internal pricing service with gRPC: define the contract in a .proto file, implement the service on ASP.NET Core with dependency injection, call it from another service using a reused channel over TLS, and add a server-streaming method for live price updates.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0837-final-protected | 40 | 50 | yes |
| MST-0837-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| gRPC fundamentals | 7 |
| Service contracts | 7 |
| Building services | 7 |
| Clients and channels | 7 |
| Streaming | 6 |
| Security and performance | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0837-Q0001** (single-answer, Select ONE) Which transport protocol does gRPC on .NET use?

- A. HTTP/2 **(key)**  
  _Rationale:_ Correct: gRPC relies on HTTP/2 features such as multiplexing and streaming.
- B. HTTP/1.1 only  
  _Rationale:_ gRPC requires HTTP/2, not HTTP/1.1.
- C. Raw UDP  
  _Rationale:_ gRPC runs over HTTP/2, not UDP.
- D. SMTP  
  _Rationale:_ SMTP is an email protocol, unrelated to gRPC.

**MST-0837-Q0002** (multiple-answer, Select TWO) Which TWO are gRPC .NET client performance recommendations? (Select TWO.)

- A. Reuse a channel for multiple calls rather than creating one per call **(key)**  
  _Rationale:_ Correct: creating a channel is expensive, so reuse it.
- B. Prefer async/await over blocking with .Result or .Wait() **(key)**  
  _Rationale:_ Correct: blocking can cause thread pool starvation and deadlocks.
- C. Create a new GrpcChannel for every single call  
  _Rationale:_ Creating a channel per call is expensive and discouraged.
- D. Call gRPC methods synchronously with Task.Result  
  _Rationale:_ Blocking on gRPC calls harms performance.

**MST-0837-Q0003** (single-answer, Select ONE) Where should the service and message definitions for a gRPC service be authored?

- A. In a .proto file, from which C# types are generated **(key)**  
  _Rationale:_ Correct: the .proto contract is the source of truth and generates the C# assets.
- B. Directly in the generated C# files  
  _Rationale:_ Generated code is overwritten; edit the .proto instead.
- C. In appsettings.json  
  _Rationale:_ Contracts are not configured in appsettings.
- D. In an XML schema file  
  _Rationale:_ gRPC uses Protocol Buffers (.proto), not XML schema.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
