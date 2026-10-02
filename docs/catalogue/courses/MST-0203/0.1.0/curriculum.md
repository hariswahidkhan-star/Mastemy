# AWS Certified Solutions Architect — Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0203` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | AWS (no affiliation or endorsement) |
| Exam code | SAA-C03 |
| Version basis | DESIGN ASSUMPTION - official outline not retrieved (network egress blocked on issuer site) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked on 2026-10-02; structure is a DESIGN ASSUMPTION pending official confirmation |
| Legacy IDs | MST-AWS-AWS-SAAC03-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design secure access, identity and data-protection solutions on AWS (design-assumption scope, pending official confirmation)
2. Design resilient, fault-tolerant and highly available architectures
3. Design high-performing and scalable solutions
4. Design cost-optimized architectures

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Design secure architectures (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Design secure architectures' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design secure architectures'
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Secure access, identity and data protection | 180 | 6 |
| M01L02 | Network and application security controls | 180 | 6 |

### M02 Design resilient architectures (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Design resilient architectures' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design resilient architectures'
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Decoupled, fault-tolerant designs | 180 | 6 |
| M02L02 | Highly available and scalable storage and compute | 180 | 6 |

### M03 Design high-performing architectures (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Design high-performing architectures' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design high-performing architectures'
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | High-performing storage, compute and networking | 180 | 6 |
| M03L02 | Scalable data and caching solutions | 180 | 6 |

### M04 Design cost-optimized architectures (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Design cost-optimized architectures' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design cost-optimized architectures'
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Cost-effective storage and compute | 180 | 6 |
| M04L02 | Cost-aware network and database choices | 180 | 6 |

## Integrative case

An architect designs a web application on AWS for a growing startup: chooses a decoupled, auto-scaling tier, secure identity and data encryption, a performant database, and reviews the design for cost optimization.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0203-practice-form-A | 54 | 54 | yes |
| MST-0203-practice-form-B | 54 | 54 | no (optional practice) |
| MST-0203-practice-form-C | 54 | 54 | no (optional practice) |
| MST-0203-final-protected | 54 | 54 | yes |

| Domain | Items per form |
|---|---|
| Design secure architectures | 14 |
| Design resilient architectures | 14 |
| Design high-performing architectures | 13 |
| Design cost-optimized architectures | 13 |

Minimum reviewed item bank: 564 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0203-Q0001** (single-answer, Select ONE) A web tier must handle sudden, unpredictable spikes in traffic while keeping costs aligned to demand. Which approach best fits a resilient, cost-aware AWS design?

- A. Auto-scaling compute behind a load balancer across multiple Availability Zones **(key)**  
  _Rationale:_ Correct: auto scaling across AZs behind a load balancer gives elasticity, resilience and demand-aligned cost.
- B. A single large server running continuously at peak size  
  _Rationale:_ A single fixed server is neither resilient nor cost-aligned to variable demand.
- C. Manually launching servers when users complain  
  _Rationale:_ Manual, reactive scaling is slow and unreliable.
- D. Disabling health checks to save effort  
  _Rationale:_ Removing health checks harms resilience.

**MST-0203-Q0002** (single-answer, Select ONE) Which practice best protects sensitive data at rest in an AWS storage service?

- A. Enabling encryption at rest using managed keys **(key)**  
  _Rationale:_ Correct: encryption at rest with managed keys protects stored data.
- B. Making the storage bucket public  
  _Rationale:_ Public access exposes data and is the opposite of protection.
- C. Removing all access logging  
  _Rationale:_ Removing logging reduces visibility and does not protect data.
- D. Storing credentials in plaintext in the app  
  _Rationale:_ Plaintext credentials are a serious security risk.

**MST-0203-Q0003** (multiple-answer, Select TWO) Select TWO design choices that improve the resilience of an AWS architecture. (Select TWO.)

- A. Deploying across multiple Availability Zones **(key)**  
  _Rationale:_ Correct: multi-AZ deployment increases fault tolerance.
- B. Decoupling components with a managed queue **(key)**  
  _Rationale:_ Correct: decoupling with a queue isolates failures and improves resilience.
- C. Hardcoding a single server's IP everywhere  
  _Rationale:_ Hardcoding one server is a single point of failure.
- D. Turning off backups  
  _Rationale:_ Disabling backups reduces resilience.
- E. Running everything in one subnet with no redundancy  
  _Rationale:_ No redundancy undermines resilience.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
