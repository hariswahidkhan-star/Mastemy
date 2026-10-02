# Copilot Studio + Power Automate + Dataverse: Service Agent

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0806` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Copilot Studio + Power Automate + Dataverse: Service Agent (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a supervised service-agent use case with explicit guardrails
2. Author Copilot Studio topics and grounded generative answers
3. Orchestrate safe, idempotent actions with Power Automate
4. Model and secure data in Dataverse with least privilege
5. Design human oversight, escalation and a controlled release

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scope and solution design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draft a topic map for a password-reset and order-status agent; (2) Define the Dataverse tables and columns the agent reads and writes
- Common misconception addressed: Assuming a conversational agent can safely take irreversible actions without human confirmation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Framing the service-agent use case and guardrails | 120 | 7 |
| M01L02 | Mapping topics, entities and the Dataverse schema | 120 | 7 |

### M02 Copilot Studio topics and generative answers (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a topic that collects an order number and branches on status; (2) Attach an approved knowledge source and test grounded answers
- Common misconception addressed: Believing generative answers are automatically factual without grounding or review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Authoring topics, triggers and nodes | 120 | 7 |
| M02L02 | Grounding generative answers on approved knowledge | 120 | 7 |

### M03 Power Automate orchestration (MASTEMY-DESIGN 20%)

- Worked applications: (1) Wire a flow that updates a Dataverse record from a topic; (2) Add retry and failure branches so a half-finished action is safe
- Common misconception addressed: Treating a cloud flow run as always-succeeding and skipping failure paths
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Calling flows from the agent | 120 | 7 |
| M03L02 | Error handling and idempotent actions | 120 | 7 |

### M04 Dataverse data and security (MASTEMY-DESIGN 20%)

- Worked applications: (1) Model a one-to-many relationship between cases and customers; (2) Restrict a sensitive column to a security role the agent cannot elevate
- Common misconception addressed: Giving the agent broad write access instead of least-privilege roles
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Tables, relationships and business rules | 120 | 7 |
| M04L02 | Security roles and column-level access | 120 | 7 |

### M05 Human oversight and release (MASTEMY-DESIGN 20%)

- Worked applications: (1) Insert a human-confirmation step before any account change; (2) Define test conversations and success metrics before go-live
- Common misconception addressed: Publishing an agent to all users before a monitored pilot
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Escalation, handoff and confirmation steps | 120 | 7 |
| M05L02 | Testing, analytics and controlled rollout | 120 | 7 |

## Integrative case

Design a supervised customer-service agent: scope two topics, ground answers on an approved knowledge base, update a Dataverse case through a Power Automate flow with failure handling, restrict a sensitive field by security role, and require a human confirmation before any account change, then defend the rollout plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0806-final-protected | 40 | 50 | yes |
| MST-0806-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scope and solution design | 8 |
| Copilot Studio topics and generative answers | 8 |
| Power Automate orchestration | 8 |
| Dataverse data and security | 8 |
| Human oversight and release | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0806-Q0001** (single-answer, Select ONE) A Power Automate flow called from the agent updates a Dataverse record but can be triggered twice for one request. What design choice keeps this safe?

- A. Make the action idempotent so a repeat run does not double-apply **(key)**  
  _Rationale:_ Correct: idempotent actions tolerate retries and duplicate triggers without side effects.
- B. Remove all error handling to simplify the flow  
  _Rationale:_ Removing error handling makes duplicate and failed runs more dangerous, not safer.
- C. Run the flow without logging  
  _Rationale:_ No logging hides failures; it does not prevent double-application.
- D. Give the flow a longer timeout only  
  _Rationale:_ A longer timeout does not stop a duplicate trigger from applying twice.

**MST-0806-Q0002** (multiple-answer, Select TWO) Which TWO controls keep a generative service agent safe before it changes a customer account? (Select TWO.)

- A. A human-confirmation step before the irreversible action **(key)**  
  _Rationale:_ Correct: confirmation gives a person the chance to stop a wrong action.
- B. Least-privilege security roles on the data it can write **(key)**  
  _Rationale:_ Correct: limiting write access bounds the damage any single action can do.
- C. Allowing the agent to self-approve high-risk actions  
  _Rationale:_ Self-approval removes the oversight the control is meant to provide.
- D. Publishing to all users before any pilot  
  _Rationale:_ Skipping a monitored pilot increases, not reduces, release risk.

**MST-0806-Q0003** (single-answer, Select ONE) Why should a Copilot Studio generative answer be grounded on an approved knowledge source?

- A. To keep answers tied to vetted, current content rather than unverified output **(key)**  
  _Rationale:_ Correct: grounding constrains answers to approved material and reduces fabrication.
- B. Because grounding disables all generative behaviour  
  _Rationale:_ Grounding steers generation; it does not disable it.
- C. Because it removes the need for any testing  
  _Rationale:_ Grounded answers still require testing and review.
- D. Because it guarantees legal compliance automatically  
  _Rationale:_ Compliance depends on the content and review, not grounding alone.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
