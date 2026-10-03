# Kernel, Scheduling and Memory Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2322` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Kernel, Scheduling and Memory Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the kernel's role and the user/kernel privilege boundary
2. Describe process and thread models and context switching
3. Compare CPU scheduling algorithms and their trade-offs
4. Explain virtual memory, paging and address translation
5. Reason about concurrency, synchronisation and deadlock
6. Describe file systems and the I/O subsystem

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Kernel and processes (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace a read() call from user space across the system-call boundary into the kernel; (2) Distinguish a process from a thread in terms of shared and private state
- Common misconception addressed: Believing user programs can access hardware directly without the kernel
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Kernel mode, system calls and traps | 120 | 7 |
| M01L02 | Processes, threads and context switching | 120 | 7 |

### M02 Scheduling (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compute average waiting time for three jobs under round-robin and FCFS; (2) Explain why a short interactive job benefits from priority boosting
- Common misconception addressed: Assuming the highest-priority process should always run to completion
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Scheduling goals and metrics | 120 | 7 |
| M02L02 | Round-robin, priority and multilevel queues | 120 | 7 |

### M03 Memory management (25% (Mastemy design weight), design weight)

- Worked applications: (1) Translate a virtual address to a physical frame using a page table; (2) Apply the LRU policy to a reference string and count page faults
- Common misconception addressed: Thinking virtual memory makes programs run faster rather than larger
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Virtual memory and paging | 120 | 7 |
| M03L02 | Page replacement and the TLB | 120 | 7 |

### M04 Concurrency and storage (25% (Mastemy design weight), design weight)

- Worked applications: (1) Identify the four Coffman conditions in a deadlock scenario; (2) Use a mutex to protect a shared counter from a race condition
- Common misconception addressed: Believing adding more locks always prevents concurrency bugs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Synchronisation, locks and deadlock | 120 | 7 |
| M04L02 | File systems and the I/O subsystem | 120 | 7 |

## Integrative case

A server is dropping requests under load: investigate whether the cause is CPU scheduling starvation, excessive paging, or a lock contention deadlock, and recommend an operating-system-level remedy with evidence.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2322-final-protected | 40 | 40 | yes |
| MST-2322-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kernel and processes | 10 |
| Scheduling | 10 |
| Memory management | 10 |
| Concurrency and storage | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2322-Q0001** (single-answer, Select ONE) What is the primary purpose of the user/kernel mode distinction in an operating system?

- A. To protect privileged operations and hardware access behind controlled entry points **(key)**  
  _Rationale:_ Correct: the boundary restricts privileged operations to the kernel via system calls.
- B. To make user programs run faster  
  _Rationale:_ The distinction is about protection, not raw speed.
- C. To avoid the need for a scheduler  
  _Rationale:_ Scheduling is still required regardless of the mode boundary.
- D. To eliminate the need for virtual memory  
  _Rationale:_ Virtual memory is a separate mechanism from the privilege boundary.

**MST-2322-Q0002** (multiple-answer, Select TWO) Which TWO conditions must hold for a deadlock to be possible? (Select TWO.)

- A. Mutual exclusion on at least one resource **(key)**  
  _Rationale:_ Correct: mutual exclusion is one of the four Coffman conditions.
- B. Circular wait among the blocked processes **(key)**  
  _Rationale:_ Correct: a cycle of waiting processes is a necessary condition.
- C. Preemption of all held resources  
  _Rationale:_ Deadlock requires no preemption, the opposite of this option.
- D. Unlimited free memory  
  _Rationale:_ Free memory is unrelated to the deadlock conditions.

**MST-2322-Q0003** (single-answer, Select ONE) Under a pure round-robin scheduler, what happens to a process when its time quantum expires?

- A. It is preempted and moved to the back of the ready queue **(key)**  
  _Rationale:_ Correct: round-robin preempts and requeues the process at quantum expiry.
- B. It runs to completion before any other process  
  _Rationale:_ That describes non-preemptive scheduling, not round-robin.
- C. It is terminated by the kernel  
  _Rationale:_ Quantum expiry preempts, it does not kill the process.
- D. It is moved to permanent sleep  
  _Rationale:_ The process stays runnable and waits its next turn.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
