# Operating Systems Concepts

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1542` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-OSC-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Operating Systems Concepts (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. OS foundations
2. Processes and threads
3. CPU scheduling
4. Synchronisation
5. Deadlocks
6. Memory management
7. File systems
8. I/O, storage and protection

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate kernel-level coding; OS mechanisms and systems programming are taught through instructor-built walkthroughs.

## Modules

### M01 OS foundations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Trace a system call from user to kernel mode; (2) Compare monolithic and microkernel structures
- Common misconception addressed: Thinking library calls and system calls are the same thing
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Role of the OS, kernel vs user mode and system calls | 75 | 6 |
| M01L02 | OS structures and the boot process | 75 | 6 |

### M02 Processes and threads (MASTEMY-DESIGN 14%)

- Worked applications: (1) Describe the state transitions of a process; (2) Explain the cost of a context switch
- Common misconception addressed: Confusing a process with a thread's shared address space
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Process model, PCB and process states | 75 | 6 |
| M02L02 | Threads, context switches and thread models | 75 | 6 |

### M03 CPU scheduling (MASTEMY-DESIGN 13%)

- Worked applications: (1) Compute average waiting time for a schedule; (2) Choose a scheduler for an interactive workload
- Common misconception addressed: Assuming shortest-job-first is always implementable (burst times are unknown)
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scheduling criteria and FCFS/SJF/priority | 75 | 6 |
| M03L02 | Round robin, multilevel queues and fairness | 75 | 6 |

### M04 Synchronisation (MASTEMY-DESIGN 14%)

- Worked applications: (1) Protect a shared counter with a mutex; (2) Solve a producer-consumer sketch with semaphores
- Common misconception addressed: Believing a volatile variable alone prevents race conditions
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Race conditions, critical sections and mutexes | 75 | 6 |
| M04L02 | Semaphores, monitors and classic problems | 75 | 6 |

### M05 Deadlocks (MASTEMY-DESIGN 11%)

- Worked applications: (1) Identify a deadlock from a resource-allocation graph; (2) Break a deadlock condition by ordering resources
- Common misconception addressed: Confusing deadlock with mere starvation or livelock
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The four conditions and resource graphs | 75 | 6 |
| M05L02 | Prevention, avoidance and detection | 75 | 6 |

### M06 Memory management (MASTEMY-DESIGN 13%)

- Worked applications: (1) Translate a virtual address through a page table; (2) Compare page-replacement policies on a reference string
- Common misconception addressed: Expecting more frames to always reduce faults (Belady's anomaly)
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Address spaces, paging and segmentation | 75 | 6 |
| M06L02 | Virtual memory, page faults and replacement | 75 | 6 |

### M07 File systems (MASTEMY-DESIGN 12%)

- Worked applications: (1) Follow a path lookup through inodes; (2) Explain how journaling aids crash recovery
- Common misconception addressed: Assuming a file's name is stored inside its inode
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Files, directories and allocation methods | 75 | 6 |
| M07L02 | Inodes, journaling and consistency | 75 | 6 |

### M08 I/O, storage and protection (MASTEMY-DESIGN 11%)

- Worked applications: (1) Order disk requests with a scheduling algorithm; (2) Explain how dual-mode operation enforces protection
- Common misconception addressed: Thinking DMA requires the CPU to copy every byte
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | I/O subsystems, interrupts and DMA; disk scheduling | 75 | 6 |
| M08L02 | Protection, privilege and OS security basics | 75 | 6 |

## Integrative case

Reason about a small multi-user server: choose a CPU scheduler for its workload, protect shared state with the right synchronisation primitive, diagnose and prevent a deadlock, trace a virtual-to-physical address translation, and explain how the file system and journaling keep data consistent after a crash.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1542-final-protected | 40 | 40 | yes |
| MST-1542-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| OS foundations | 5 |
| Processes and threads | 5 |
| CPU scheduling | 5 |
| Synchronisation | 5 |
| Deadlocks | 5 |
| Memory management | 5 |
| File systems | 5 |
| I/O, storage and protection | 5 |

Minimum reviewed item bank: 482 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1542-Q0001** (single-answer, Select ONE) What distinguishes kernel mode from user mode?

- A. Kernel mode can execute privileged instructions and access hardware directly; user mode cannot **(key)**  
  _Rationale:_ Correct: the privilege separation protects the system; user code must request services via system calls.
- B. User mode is faster because it skips all checks  
  _Rationale:_ User mode is restricted, not a performance tier; privilege is the distinction.
- C. Kernel mode runs only at boot  
  _Rationale:_ The kernel runs throughout operation whenever privileged work is needed.
- D. They differ only in which language the code is written in  
  _Rationale:_ The distinction is privilege level, not programming language.

**MST-1542-Q0002** (multiple-answer, Select TWO) Which statements about threads versus processes are correct? (Select TWO)

- A. Threads within a process share the same address space **(key)**  
  _Rationale:_ Correct: threads share code, heap and globals, which is why synchronisation matters.
- B. Creating a thread is generally cheaper than creating a process **(key)**  
  _Rationale:_ Correct: threads avoid duplicating the full address space, so they are lighter weight.
- C. Each thread has its own completely separate address space  
  _Rationale:_ Separate address spaces belong to processes, not threads of one process.
- D. Processes always share memory by default  
  _Rationale:_ Processes are isolated by default; sharing requires explicit mechanisms.

**MST-1542-Q0003** (single-answer, Select ONE) Which set of conditions must all hold for a deadlock to be possible?

- A. Mutual exclusion, hold-and-wait, no preemption, and circular wait **(key)**  
  _Rationale:_ Correct: these four Coffman conditions must all hold simultaneously for deadlock.
- B. Only mutual exclusion  
  _Rationale:_ Mutual exclusion alone does not cause deadlock; all four conditions are needed.
- C. High CPU utilisation and low memory  
  _Rationale:_ Resource pressure is not the formal condition for deadlock.
- D. A single process using a single resource  
  _Rationale:_ Deadlock requires a circular wait among multiple processes/resources.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
