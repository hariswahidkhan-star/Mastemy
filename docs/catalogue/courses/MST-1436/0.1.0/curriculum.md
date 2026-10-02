# Azure Landing Zones and Well-Architected Framework

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1436` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Azure Cloud Adoption Framework and Well-Architected Framework documentation read via the Microsoft Learn MCP on 2026-10-02. Guidance evolves; specifics must be confirmed against the current documentation before production. |
| Official sources | https://learn.microsoft.com/azure/cloud-adoption-framework/ready/landing-zone/design-principles |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-ALZ |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Azure Landing Zones and Well-Architected Framework (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the Azure Well-Architected Framework pillars and design principles
2. Explain Azure landing zone design principles and types
3. Apply governance and shared-responsibility concepts to workloads

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Well-Architected Framework pillars (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Map a design decision to the five WAF pillars; (2) Use the design review checklist for Reliability
- Common misconception addressed: Thinking the Well-Architected Framework applies only to Azure landing zones
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The five pillars and design principles | 84 | 4 |
| M01L02 | Checklists, tradeoffs, and the maturity model | 84 | 4 |

### M02 Azure landing zone design (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Apply subscription democratization to an application landing zone; (2) Distinguish platform landing zones from application landing zones
- Common misconception addressed: Treating a landing zone as a simple lift-and-shift of virtual machines
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Landing zone concepts and design areas | 84 | 4 |
| M02L02 | Design principles and the impact of deviations | 84 | 4 |

### M03 Governance and operations (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Place a workload in an application landing zone subscription; (2) Identify dependencies such as a centralized egress firewall
- Common misconception addressed: Assuming workload teams have no shared dependencies on platform teams
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Governance, policy, and management groups | 72 | 4 |
| M03L02 | Shared responsibility and dependencies | 72 | 4 |

## Integrative case

A cloud architect reviews a workload against the five Well-Architected pillars and deploys it into an application landing zone, documenting its dependency on the platform team's centralized egress firewall.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1436-final-protected | 24 | 32 | yes |
| MST-1436-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Well-Architected Framework pillars | 8 |
| Azure landing zone design | 8 |
| Governance and operations | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1436-Q0001** (single-answer, Select ONE) How many pillars make up the Azure Well-Architected Framework?

- A. Five **(key)**  
  _Rationale:_ Correct: Reliability, Security, Cost Optimization, Operational Excellence, and Performance Efficiency.
- B. Three  
  _Rationale:_ There are five pillars, not three.
- C. Seven  
  _Rationale:_ There are five pillars, not seven.
- D. Ten  
  _Rationale:_ There are five pillars, not ten.

**MST-1436-Q0002** (multiple-answer, Select TWO) Which TWO are pillars of the Azure Well-Architected Framework? (Select TWO.)

- A. Reliability **(key)**  
  _Rationale:_ Correct: Reliability is one of the five pillars.
- B. Cost Optimization **(key)**  
  _Rationale:_ Correct: Cost Optimization is one of the five pillars.
- C. Alphabetization  
  _Rationale:_ Alphabetization is not a WAF pillar.
- D. Colour theory  
  _Rationale:_ Colour theory is not a WAF pillar.

**MST-1436-Q0003** (single-answer, Select ONE) In Azure landing zones, what does the principle of subscription democratization support?

- A. Giving workload teams autonomy within platform guardrails **(key)**  
  _Rationale:_ Correct: it transitions operations to workload teams within the platform foundation.
- B. Removing all governance controls  
  _Rationale:_ Incorrect: governance guardrails remain in place.
- C. Using a single shared subscription for everything  
  _Rationale:_ Incorrect: democratization implies distributed subscriptions, not one.
- D. Disabling role-based access control  
  _Rationale:_ Incorrect: RBAC is not disabled by this principle.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
