# WebSocket and Real-Time JavaScript Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0889` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Legacy IDs | MST-PRG-SK-WRTA-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the WebSocket protocol, handshake and message lifecycle
2. Build real-time features with publish/subscribe and room patterns
3. Handle reconnection, backpressure and delivery reliability
4. Scale real-time servers horizontally and secure connections

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **n/a-no-official-syllabus**. Source(s) consulted:
- none (no external source; Mastemy skills course)

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 WebSocket fundamentals

- Purpose: Teach the WebSocket protocol, handshake and lifecycle versus HTTP polling.
- Worked applications: (1) Trace the HTTP upgrade handshake that establishes a WebSocket; (2) Compare WebSockets with long-polling and server-sent events for a use case
- Common misconception addressed: Believing WebSockets replace HTTP for all request/response traffic
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why real-time and transport options | 80 | 5 |
| M01L02 | The WebSocket handshake and frames | 80 | 5 |
| M01L03 | Connection lifecycle and events | 80 | 5 |

### M02 Real-time patterns

- Purpose: Teach pub/sub, rooms/channels and broadcasting.
- Worked applications: (1) Implement a chat room where messages broadcast to room members only; (2) Add a presence indicator using join/leave events
- Common misconception addressed: Broadcasting every message to every connected client regardless of interest
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Publish/subscribe messaging | 80 | 5 |
| M02L02 | Rooms and channels | 80 | 5 |
| M02L03 | Broadcasting and targeted delivery | 80 | 5 |

### M03 Reliability and scale

- Purpose: Teach reconnection, backpressure, scaling and security.
- Worked applications: (1) Add client reconnection with exponential backoff and resubscription; (2) Use a shared backplane so two server instances deliver to all clients
- Common misconception addressed: Assuming a single process can hold all connections forever
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reconnection and backpressure | 80 | 5 |
| M03L02 | Horizontal scaling with a backplane | 80 | 5 |
| M03L03 | Authentication and secure (wss) connections | 80 | 5 |

## Integrative case

A live dashboard drops updates under load and loses messages when a user reconnects. Design room-based delivery, add reconnection with resubscription, and scale across instances with a backplane over secured connections.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0889-final-protected | 30 | 30 | yes |
| MST-0889-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| WebSocket fundamentals | 10 |
| Real-time patterns | 10 |
| Reliability and scale | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0889-Q0001** (single-answer, Select ONE) How is a WebSocket connection initially established?

- A. Through an HTTP request that upgrades the connection to the WebSocket protocol **(key)**  
  _Rationale:_ Correct: WebSockets begin with an HTTP upgrade handshake, then switch protocols.
- B. By opening a raw TCP socket with no HTTP involvement  
  _Rationale:_ The standard handshake uses HTTP upgrade, not a bare socket.
- C. By polling an endpoint every second  
  _Rationale:_ Polling is an alternative technique, not how a WebSocket is established.
- D. By sending an email verification  
  _Rationale:_ Email has no role in establishing a WebSocket.

**MST-0889-Q0002** (multiple-answer, Select TWO) Select TWO practices that make a real-time WebSocket application reliable and scalable.

- A. Reconnect with exponential backoff and resubscribe to prior topics **(key)**  
  _Rationale:_ Correct: backoff reconnection plus resubscription restores state after drops.
- B. Use a shared backplane so multiple server instances can deliver to all clients **(key)**  
  _Rationale:_ Correct: a backplane lets horizontally scaled servers broadcast consistently.
- C. Broadcast every message to every connected client  
  _Rationale:_ Untargeted broadcasting wastes bandwidth and does not scale.
- D. Assume one process can hold all connections indefinitely  
  _Rationale:_ A single process is a scaling and availability bottleneck.
- E. Ignore backpressure and buffer without limit  
  _Rationale:_ Unbounded buffering under backpressure leads to memory exhaustion.

**MST-0889-Q0003** (single-answer, Select ONE) In a chat application, what is the purpose of the rooms/channels pattern?

- A. To deliver messages only to clients subscribed to a given room rather than everyone **(key)**  
  _Rationale:_ Correct: rooms scope delivery to interested subscribers.
- B. To encrypt all messages end to end automatically  
  _Rationale:_ Rooms scope delivery; they do not themselves provide encryption.
- C. To replace the need for a server  
  _Rationale:_ Rooms are a server-side delivery concept, not a way to remove the server.
- D. To guarantee exactly-once delivery with no extra work  
  _Rationale:_ Rooms scope recipients but do not by themselves guarantee exactly-once delivery.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
