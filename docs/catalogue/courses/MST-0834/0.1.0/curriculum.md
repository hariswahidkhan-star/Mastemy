# .NET Modular Monolith Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0834` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **vendor-docs-partial - sources: SRC-MS-DOTNET-ARCH** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the modular monolith approach and when it is preferable to microservices
2. Define module boundaries using feature slices and enforce them in a .NET solution
3. Design inter-module communication through explicit contracts and in-process messaging
4. Plan for deployment, testing and incremental extraction toward microservices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **vendor-docs-partial**. Source(s) consulted:
- https://learn.microsoft.com/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Module boundaries and feature slices

- Purpose: Teach how to decompose a .NET solution into cohesive modules using feature slices and enforced boundaries.
- Worked applications: (1) Split an e-commerce monolith into Catalog, Ordering and Billing modules with explicit public surfaces; (2) Add an architecture test that fails the build when one module references another module internals
- Common misconception addressed: Believing a modular monolith is the same as a layered N-tier solution
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Monolith vs microservices vs modular monolith | 80 | 5 |
| M01L02 | Defining module boundaries and feature slices | 80 | 5 |
| M01L03 | Enforcing boundaries with projects and architecture tests | 80 | 5 |

### M02 Inter-module communication and contracts

- Purpose: Teach explicit contracts and in-process messaging between modules without leaking internals.
- Worked applications: (1) Design a public contract (DTO + interface) for the Ordering module consumed by Billing; (2) Replace a direct cross-module call with an in-process mediator message and handler
- Common misconception addressed: Sharing the EF Core DbContext across modules and calling into another module internals
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Public contracts and DTO design | 80 | 5 |
| M02L02 | In-process messaging and the mediator pattern | 80 | 5 |
| M02L03 | Shared kernel vs module-private data | 80 | 5 |

### M03 Deployment, testing and evolution

- Purpose: Teach how to build, test and incrementally extract modules toward microservices when justified.
- Worked applications: (1) Decide which single module to extract first from a growing monolith and justify it; (2) Write an integration test that exercises one module end to end in isolation
- Common misconception addressed: Extracting modules into microservices before any scaling or team pressure requires it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Deploying and scaling a modular monolith | 80 | 5 |
| M03L02 | Testing modules in isolation | 80 | 5 |
| M03L03 | Incremental extraction with the strangler fig approach | 80 | 5 |

## Integrative case

A 12-person team runs a growing ASP.NET Core monolith where every change forces a full regression. Decide module boundaries, enforce them, choose the first module to extract, and defend why the rest stay a monolith for now.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0834-final-protected | 30 | 30 | yes |
| MST-0834-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Module boundaries and feature slices | 10 |
| Inter-module communication and contracts | 10 |
| Deployment, testing and evolution | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0834-Q0001** (single-answer, Select ONE) What best distinguishes a modular monolith from a layered (N-tier) application?

- A. Modules are vertical slices of business capability with enforced boundaries, deployed as one unit **(key)**  
  _Rationale:_ Correct: a modular monolith partitions by capability with enforced boundaries while still deploying as a single unit.
- B. Each module is deployed as a separate process behind a load balancer  
  _Rationale:_ That describes microservices, not a modular monolith, which deploys as one unit.
- C. Layers (UI, business, data) are the modules  
  _Rationale:_ Horizontal technical layers are not capability modules; that is the N-tier style being contrasted.
- D. It forbids any shared code between modules  
  _Rationale:_ A shared kernel of common code is allowed; the rule is no reaching into another module internals.

**MST-0834-Q0002** (multiple-answer, Select TWO) You must keep modules decoupled in a .NET modular monolith. Select TWO practices that preserve module boundaries.

- A. Expose a public contract (interface + DTO) and keep entities module-private **(key)**  
  _Rationale:_ Correct: a narrow public contract hides internals and keeps modules decoupled.
- B. Communicate between modules through an in-process mediator message **(key)**  
  _Rationale:_ Correct: in-process messaging avoids direct dependencies on another module internal types.
- C. Share one EF Core DbContext across all modules for convenience  
  _Rationale:_ A shared DbContext couples modules at the data layer and breaks boundaries.
- D. Let the Billing module call Ordering internal repository classes directly  
  _Rationale:_ Calling internal classes across modules is exactly the coupling boundaries are meant to prevent.
- E. Reference another module concrete entity types from controllers  
  _Rationale:_ Depending on another module concrete types leaks internals and couples the modules.

**MST-0834-Q0003** (single-answer, Select ONE) A team is under no scaling or organizational pressure but wants to "future-proof" by splitting the monolith into microservices now. What is the most appropriate guidance?

- A. Stay a modular monolith and extract a service only when a concrete driver appears **(key)**  
  _Rationale:_ Correct: premature extraction adds distributed-systems complexity with little benefit until a real driver exists.
- B. Split immediately so the architecture is never a bottleneck  
  _Rationale:_ Early splitting adds network, consistency and operational cost without a justifying need.
- C. Convert every module into its own database first  
  _Rationale:_ Separate databases add distributed-data complexity and are not required for a modular monolith.
- D. Remove module boundaries to simplify the future split  
  _Rationale:_ Removing boundaries makes a future split harder, not easier.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
