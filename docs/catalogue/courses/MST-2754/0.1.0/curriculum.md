# Robot Operating System (ROS) Basics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2754` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal curriculum design (no official syllabus); emerging-technology scope as of 2026-10, speculative topics treated conceptually and safely. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Robot Operating System (ROS) Basics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what ROS is and the problems it solves for robot software
2. Describe nodes, topics, messages, services and actions
3. Reason about the publish/subscribe and request/response patterns
4. Explain packages, workspaces and the build/launch workflow conceptually
5. Describe common tooling for visualisation, logging and debugging
6. Design a simple node graph for a described robot behaviour

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What ROS is (20% (design weight), design weight)

- Worked applications: (1) Sketch a node graph for a line-following robot; (2) Explain why middleware decouples robot modules
- Common misconception addressed: Thinking ROS is an operating system that replaces Linux
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | ROS as middleware | 64 | 4 |
| M01L02 | Distributions and ecosystem | 64 | 4 |
| M01L03 | ROS 1 versus ROS 2 at a glance | 64 | 4 |

### M02 Nodes and topics (22% (design weight), design weight)

- Worked applications: (1) Design topics for a sensor-to-controller data flow; (2) Pick a message type for velocity commands
- Common misconception addressed: Confusing a topic name with the data it carries
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Nodes and the graph | 70 | 4 |
| M02L02 | Topics and messages | 70 | 4 |
| M02L03 | Publish/subscribe pattern | 71 | 4 |

### M03 Services and actions (20% (design weight), design weight)

- Worked applications: (1) Decide between a service and an action for a task; (2) Model a 'navigate to goal' as an action
- Common misconception addressed: Using a topic for a request that needs a reply
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Services for request/response | 64 | 4 |
| M03L02 | Actions for long tasks | 64 | 4 |
| M03L03 | Choosing the right pattern | 64 | 4 |

### M04 Packages and workflow (20% (design weight), design weight)

- Worked applications: (1) Organise nodes into packages and a launch file; (2) Externalise a tunable value as a parameter
- Common misconception addressed: Hard-coding configuration instead of using parameters
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Workspaces and packages | 64 | 4 |
| M04L02 | Build and launch files | 64 | 4 |
| M04L03 | Parameters and configuration | 64 | 4 |

### M05 Tooling and debugging (18% (design weight), design weight)

- Worked applications: (1) Use a graph inspector to find a missing connection; (2) Read a log to locate a crashing node
- Common misconception addressed: Assuming a silent node graph means everything works
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Visualisation and logs | 57 | 4 |
| M05L02 | Inspecting the graph | 57 | 4 |
| M05L03 | Common pitfalls | 59 | 4 |

## Integrative case

A student team builds a small delivery robot in ROS: design the node graph, decide where to use topics, services and actions, organise the code into packages, and plan how they will debug a missing-connection problem.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2754-final-protected | 40 | 40 | yes |
| MST-2754-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What ROS is | 8 |
| Nodes and topics | 9 |
| Services and actions | 8 |
| Packages and workflow | 8 |
| Tooling and debugging | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2754-Q0001** (single-answer, Select ONE) A robot continuously streams laser-scan data to a mapping node. Which ROS communication pattern fits best?

- A. A topic with publish/subscribe, because the data is a continuous stream **(key)**  
  _Rationale:_ Correct: continuous, many-to-many streaming data is a natural fit for topics.
- B. A service, because every scan needs an immediate reply  
  _Rationale:_ Services are request/response; continuous streams do not fit that pattern well.
- C. A parameter, because the scan is configuration  
  _Rationale:_ Scan data is runtime data, not static configuration.
- D. A launch file, because launch files carry data  
  _Rationale:_ Launch files start nodes; they do not stream data.

**MST-2754-Q0002** (multiple-answer, Select TWO) Which TWO statements about ROS communication are accurate? (Select TWO.)

- A. Nodes exchange typed messages over named topics **(key)**  
  _Rationale:_ Correct: topics carry typed messages between publishing and subscribing nodes.
- B. Actions suit long-running goals that report feedback and can be cancelled **(key)**  
  _Rationale:_ Correct: actions are designed for long tasks with feedback and preemption.
- C. A service is ideal for a never-ending sensor stream  
  _Rationale:_ Services are request/response, not suited to continuous streams.
- D. Topics guarantee a direct reply to every message  
  _Rationale:_ Publish/subscribe has no built-in reply; use services for that.

**MST-2754-Q0003** (single-answer, Select ONE) What does ROS primarily provide to a robotics project?

- A. A middleware and tooling layer that lets independent modules communicate and be reused **(key)**  
  _Rationale:_ Correct: ROS standardises inter-process communication and tooling so components compose.
- B. A replacement for the computer's operating system kernel  
  _Rationale:_ ROS runs on top of an OS such as Linux; it is not a kernel.
- C. A guarantee that any robot hardware will work without drivers  
  _Rationale:_ Hardware still needs drivers; ROS does not remove that need.
- D. A single monolithic program that controls the whole robot  
  _Rationale:_ ROS encourages many small nodes, not one monolith.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
