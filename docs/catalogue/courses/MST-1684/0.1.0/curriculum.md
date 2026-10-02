# Virtualisation Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1684` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-VF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Virtualisation Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain virtualisation concepts and the role of the hypervisor
2. Compare virtual machines and containers
3. Create, configure and manage virtual machines
4. Apply virtual networking and storage concepts
5. Describe virtualisation security and resource management

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Virtualisation concepts (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide between a type 1 and type 2 hypervisor for a case; (2) Explain how a VM is isolated from the host
- Common misconception addressed: Believing a virtual machine has no performance or security boundaries
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What virtualisation is and why it is used | 72 | 6 |
| M01L02 | Type 1 and type 2 hypervisors | 72 | 6 |

### M02 VMs vs containers (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Match a workload to a VM or a container; (2) Explain why containers share the host kernel
- Common misconception addressed: Treating containers and virtual machines as the same thing
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How containers differ from virtual machines | 72 | 6 |
| M02L02 | When to choose each | 72 | 6 |

### M03 Managing VMs (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a VM's CPU, memory and disk allocation; (2) Decide when a snapshot is and is not appropriate
- Common misconception addressed: Relying on snapshots as a long-term backup strategy
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Creating and configuring virtual machines | 72 | 6 |
| M03L02 | Snapshots, templates and cloning | 72 | 6 |

### M04 Virtual networking and storage (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Connect VMs to the right virtual network; (2) Choose a storage option for a shared workload
- Common misconception addressed: Assuming virtual networks need no segmentation
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Virtual switches and networking | 72 | 6 |
| M04L02 | Virtual and shared storage | 72 | 6 |

### M05 Security and resources (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Set resource limits so one VM cannot starve others; (2) Identify a hardening step for a hypervisor
- Common misconception addressed: Overcommitting resources until every workload suffers
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Isolation, escape risks and hardening | 72 | 6 |
| M05L02 | Resource limits and overcommitment | 72 | 6 |

## Integrative case

A team wants to consolidate several physical servers onto one host using virtualisation, and run some lightweight services in containers. Explain the trade-offs, plan the virtual machines and their networking and storage, and set resource limits and security boundaries so one workload cannot starve or compromise another.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1684-final-protected | 25 | 25 | yes |
| MST-1684-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Virtualisation concepts | 5 |
| VMs vs containers | 5 |
| Managing VMs | 5 |
| Virtual networking and storage | 5 |
| Security and resources | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1684-Q0001** (single-answer, Select ONE) What is the key architectural difference between a container and a virtual machine?

- A. A container shares the host kernel, while a VM runs its own full operating system **(key)**  
  _Rationale:_ Correct: containers share the kernel; VMs virtualise the whole machine.
- B. A container includes a full separate operating system kernel  
  _Rationale:_ That describes a VM, not a container.
- C. A VM shares the host kernel with other VMs  
  _Rationale:_ VMs run their own OS, not a shared kernel.
- D. There is no difference between them  
  _Rationale:_ They differ significantly in isolation and overhead.

**MST-1684-Q0002** (multiple-answer, Select TWO) Which TWO practices support safe multi-workload virtualisation? (Select TWO.)

- A. Setting resource limits so one VM cannot starve others **(key)**  
  _Rationale:_ Correct: limits prevent a noisy workload from degrading the rest.
- B. Hardening and patching the hypervisor **(key)**  
  _Rationale:_ Correct: the hypervisor is a critical boundary to secure.
- C. Using snapshots as the only long-term backup  
  _Rationale:_ Snapshots are not a substitute for proper backups.
- D. Running every workload with no isolation  
  _Rationale:_ Removing isolation defeats a key benefit of virtualisation.

**MST-1684-Q0003** (single-answer, Select ONE) Why are VM snapshots a poor substitute for backups over the long term?

- A. Snapshots grow, can harm performance and depend on the same storage and host **(key)**  
  _Rationale:_ Correct: snapshots are short-term and not independent copies.
- B. Snapshots are encrypted and cannot be restored  
  _Rationale:_ Snapshots can be restored; the issue is they are not true backups.
- C. Backups and snapshots are identical  
  _Rationale:_ They differ in independence and durability.
- D. Snapshots store data off-site automatically  
  _Rationale:_ Snapshots typically stay on the same storage, not off-site.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
