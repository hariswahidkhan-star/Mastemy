# .NET SignalR and Real-Time Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0838` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (Overview of ASP.NET Core SignalR: hubs, transports and scale-out). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-SIGNALR (https://learn.microsoft.com/aspnet/core/signalr/introduction; https://learn.microsoft.com/aspnet/core/tutorials/signalr; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — .NET SignalR and Real-Time Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain real-time web communication and SignalR's role
2. Describe hubs and how clients and servers call each other
3. Understand transports and automatic fallback
4. Build a hub and connect a client
5. Send messages to all, groups and specific clients
6. Scale SignalR out with a backplane or Azure SignalR Service

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Real-time fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) List three scenarios that benefit from server push; (2) Compare polling with SignalR for live updates
- Common misconception addressed: Thinking HTTP request/response alone gives real-time push
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why real-time and server push | 80 | 5 |
| M01L02 | SignalR scenarios | 80 | 5 |

### M02 Hubs (MASTEMY-DESIGN 16%)

- Worked applications: (1) Call a client method from the server; (2) Define a strongly typed hub interface
- Common misconception addressed: Confusing hub methods with ordinary web API endpoints
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Hubs and RPC between client and server | 80 | 5 |
| M02L02 | Strongly typed hubs | 80 | 5 |

### M03 Transports (MASTEMY-DESIGN 17%)

- Worked applications: (1) Explain why WebSockets is preferred; (2) Trace fallback when WebSockets is unavailable
- Common misconception addressed: Assuming SignalR always uses WebSockets
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | WebSockets, SSE and long polling | 80 | 5 |
| M03L02 | Automatic transport fallback | 80 | 5 |

### M04 Building a hub (MASTEMY-DESIGN 17%)

- Worked applications: (1) Map a hub endpoint in Program.cs; (2) Connect a browser client and invoke a method
- Common misconception addressed: Forgetting to add the SignalR client library
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Create a hub and configure SignalR | 80 | 5 |
| M04L02 | Connect a JavaScript client | 80 | 5 |

### M05 Targeting clients (MASTEMY-DESIGN 17%)

- Worked applications: (1) Send a message to a named group; (2) Add a connection to a group on connect
- Common misconception addressed: Broadcasting to everyone when only a group should receive it
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | All, groups and single clients | 80 | 5 |
| M05L02 | Connection and group management | 80 | 5 |

### M06 Scaling out (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose a backplane for multiple servers; (2) Decide self-host vs Azure SignalR Service
- Common misconception addressed: Expecting a single server to hold unlimited connections
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Backplane and Redis | 80 | 5 |
| M06L02 | Azure SignalR Service | 80 | 5 |

## Integrative case

Add live updates to a support dashboard: build a SignalR hub, connect browser clients, push ticket updates to agents in a group, send a direct message to one agent, and plan scale-out across multiple servers with a backplane.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0838-final-protected | 40 | 50 | yes |
| MST-0838-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Real-time fundamentals | 7 |
| Hubs | 7 |
| Transports | 7 |
| Building a hub | 7 |
| Targeting clients | 6 |
| Scaling out | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0838-Q0001** (single-answer, Select ONE) What does a SignalR hub provide?

- A. A pipeline for the server and clients to call methods on each other **(key)**  
  _Rationale:_ Correct: hubs enable bidirectional RPC between server and clients.
- B. A relational database for chat messages  
  _Rationale:_ A hub is not a database.
- C. A replacement for HTTPS  
  _Rationale:_ A hub is an application construct, not a transport-security layer.
- D. A static file server  
  _Rationale:_ Hubs handle real-time messaging, not static files.

**MST-0838-Q0002** (multiple-answer, Select TWO) Which TWO statements about SignalR transports are correct? (Select TWO.)

- A. WebSockets is the preferred transport when available **(key)**  
  _Rationale:_ Correct: WebSockets generally gives the best performance.
- B. SignalR automatically falls back to other transports when WebSockets is unavailable **(key)**  
  _Rationale:_ Correct: it falls back to SSE or long polling.
- C. SignalR only works over WebSockets and fails otherwise  
  _Rationale:_ It falls back to other transports.
- D. Long polling is always faster than WebSockets  
  _Rationale:_ WebSockets is preferred for performance.

**MST-0838-Q0003** (single-answer, Select ONE) To push an update only to agents handling a given queue, which SignalR feature fits best?

- A. Groups **(key)**  
  _Rationale:_ Correct: groups let the server target a subset of connections.
- B. Broadcasting to all clients  
  _Rationale:_ Broadcasting would notify unrelated clients.
- C. A new hub per message  
  _Rationale:_ Creating hubs per message is unnecessary and wrong.
- D. Closing all other connections  
  _Rationale:_ Closing connections does not target a subset.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
