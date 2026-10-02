# Platform Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1584` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Platform Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Platform engineering fundamentals
2. Internal developer platforms and golden paths
3. Self-service and developer portals
4. Platform APIs and automation
5. Observability and reliability of the platform
6. Adoption, team topologies and product thinking

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Platform engineering fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain the problem an internal platform solves; (2) Distinguish platform engineering from classic DevOps
- Common misconception addressed: Thinking platform engineering just renames the ops team
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What platform engineering is and why | 80 | 6 |
| M01L02 | Platform vs DevOps vs SRE | 80 | 6 |

### M02 Internal developer platforms and golden paths (MASTEMY-DESIGN 17%)

- Worked applications: (1) Describe a golden path for shipping a new service; (2) Decide what to standardise vs leave flexible
- Common misconception addressed: Mandating one rigid path with no escape hatch
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Internal developer platforms (IDPs) | 80 | 6 |
| M02L02 | Golden paths and paved roads | 80 | 6 |

### M03 Self-service and developer portals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design a self-service flow to create an environment; (2) Model a service in a catalog
- Common misconception addressed: Calling a ticket queue 'self-service'
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Self-service provisioning | 80 | 6 |
| M03L02 | Developer portals and service catalogs | 80 | 6 |

### M04 Platform APIs and automation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Expose a capability through a platform API; (2) Automate a previously manual provisioning step
- Common misconception addressed: Building a UI with no API underneath it
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Platform as a product with APIs | 80 | 6 |
| M04L02 | Automating provisioning and workflows | 80 | 6 |

### M05 Observability and reliability of the platform (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define an SLO for a platform capability; (2) Give developers the signals they need to debug
- Common misconception addressed: Measuring platform success only by tickets closed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Observability for platform users | 80 | 6 |
| M05L02 | SLOs and reliability of the platform itself | 80 | 6 |

### M06 Adoption, team topologies and product thinking (MASTEMY-DESIGN 18%)

- Worked applications: (1) Gather and act on developer feedback; (2) Decide between enabling and blocking a team
- Common misconception addressed: Forcing adoption instead of making the platform the easiest choice
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Treating the platform as a product | 80 | 6 |
| M06L02 | Team topologies and driving adoption | 80 | 6 |

## Integrative case

Stand up an internal platform for a product group: define the golden path to ship a service, provide genuine self-service through a portal backed by platform APIs, automate provisioning, set an SLO for a key platform capability, give developers debugging signals, and treat the platform as a product to drive voluntary adoption.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1584-final-protected | 30 | 30 | yes |
| MST-1584-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Platform engineering fundamentals | 5 |
| Internal developer platforms and golden paths | 5 |
| Self-service and developer portals | 5 |
| Platform APIs and automation | 5 |
| Observability and reliability of the platform | 5 |
| Adoption, team topologies and product thinking | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1584-Q0001** (single-answer, Select ONE) What best describes a 'golden path' in platform engineering?

- A. A supported, opinionated default route for a common task that is the easiest way to do it well **(key)**  
  _Rationale:_ Correct: golden paths make the good way the easy way while allowing exceptions.
- B. The only permitted way to do anything, with no exceptions ever  
  _Rationale:_ Golden paths are defaults with escape hatches, not rigid mandates.
- C. A premium paid tier of the platform  
  _Rationale:_ It is a supported default route, not a pricing tier.
- D. A manual approval queue for all changes  
  _Rationale:_ That is a ticket process, the opposite of a paved road.

**MST-1584-Q0002** (multiple-answer, Select ALL that apply) Which two characteristics distinguish genuine self-service from a disguised ticket queue? (Select TWO)

- A. A developer can provision what they need on demand without waiting for a human **(key)**  
  _Rationale:_ Correct: on-demand provisioning is the essence of self-service.
- B. The capability is exposed through an API or portal that automates the request **(key)**  
  _Rationale:_ Correct: automation behind the request removes the human bottleneck.
- C. Every request is routed to an operator to action manually  
  _Rationale:_ Manual actioning is a ticket queue, not self-service.
- D. Requests are fulfilled only during a weekly change window  
  _Rationale:_ Waiting for a window is not on-demand self-service.

**MST-1584-Q0003** (single-answer, Select ONE) Why is treating the platform 'as a product' important for its success?

- A. Because adoption is voluntary, so the platform must meet real developer needs to be used **(key)**  
  _Rationale:_ Correct: product thinking keeps the platform useful enough that teams choose it.
- B. Because it lets the platform team ignore user feedback  
  _Rationale:_ Product thinking centres on user feedback, not ignoring it.
- C. Because it guarantees every team must use it by law  
  _Rationale:_ Mandates are not product thinking and often backfire.
- D. Because products never need maintenance  
  _Rationale:_ Products require ongoing maintenance and iteration.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
