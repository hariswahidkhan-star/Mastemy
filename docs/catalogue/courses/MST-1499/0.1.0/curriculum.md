# AWS Architecture Case Studies

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1499` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS Architecture Case Studies (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the Well-Architected Framework pillars to real scenarios
2. Analyze trade-offs in example AWS architectures
3. Design for reliability, performance and cost in case studies
4. Critique and improve a given architecture

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Well-Architected foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map a design decision to a pillar; (2) Spot a single point of failure in a diagram
- Common misconception addressed: Treating Well-Architected as a one-time audit rather than ongoing
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The six pillars overview | 72 | 7 |
| M01L02 | Reading an architecture diagram critically | 72 | 7 |

### M02 Reliability and resilience (MASTEMY-DESIGN 25%)

- Worked applications: (1) Redesign a single-AZ app for multi-AZ; (2) Add a queue to decouple two tiers
- Common misconception addressed: Assuming multi-region is always required for high availability
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Multi-AZ and failover case study | 72 | 7 |
| M02L02 | Decoupling and retries | 72 | 7 |

### M03 Performance and scalability (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add auto scaling to a web tier; (2) Introduce a cache for hot reads
- Common misconception addressed: Scaling the database vertically forever instead of offloading reads
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scaling a read-heavy workload | 72 | 7 |
| M03L02 | Caching and content delivery | 72 | 7 |

### M04 Cost and operations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Find the biggest cost driver and cut it; (2) Propose monitoring and runbook improvements
- Common misconception addressed: Optimizing cost by removing redundancy needed for reliability
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Cost optimization in a case study | 72 | 7 |
| M04L02 | Operational excellence improvements | 72 | 7 |

## Integrative case

Given a struggling three-tier web app on AWS, run a Well-Architected review: identify risks across the pillars, propose reliability and cost improvements, and present a prioritized remediation roadmap.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1499-final-protected | 28 | 35 | yes |
| MST-1499-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Well-Architected foundations | 7 |
| Reliability and resilience | 7 |
| Performance and scalability | 7 |
| Cost and operations | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1499-Q0001** (single-answer, Select ONE) A web app runs in a single Availability Zone. Which change most improves reliability?

- A. Deploy across multiple Availability Zones with failover **(key)**  
  _Rationale:_ Correct: multi-AZ removes the single-AZ failure point.
- B. Add more CPU to the single instance  
  _Rationale:_ Vertical scaling does not address AZ failure.
- C. Delete the load balancer  
  _Rationale:_ Removing the LB reduces resilience.
- D. Turn off health checks  
  _Rationale:_ Disabling health checks harms reliability.

**MST-1499-Q0002** (multiple-answer, Select TWO) Which TWO changes best help a read-heavy application scale? (Select TWO.)

- A. Add a caching layer for hot reads **(key)**  
  _Rationale:_ Correct: caching offloads repeated reads.
- B. Add read replicas to the database **(key)**  
  _Rationale:_ Correct: replicas distribute read load.
- C. Remove all monitoring  
  _Rationale:_ Unrelated and harmful to operations.
- D. Store all data in one giant row  
  _Rationale:_ That harms performance, not helps.

**MST-1499-Q0003** (single-answer, Select ONE) What is the purpose of the AWS Well-Architected Framework?

- A. To provide pillars and best practices for reviewing and improving architectures **(key)**  
  _Rationale:_ Correct: it offers a structured way to evaluate workloads.
- B. To automatically fix all infrastructure  
  _Rationale:_ It is guidance, not an auto-remediation tool.
- C. To bill customers for reviews  
  _Rationale:_ The framework is not a billing mechanism.
- D. To replace all monitoring tools  
  _Rationale:_ It does not replace monitoring tooling.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
