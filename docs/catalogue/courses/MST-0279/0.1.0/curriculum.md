# LPI LPIC-2: Exam 201

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0279` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | LPI (no affiliation or endorsement) |
| Exam code | unresolved - not published in catalog |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Measure, tune and manage kernel and system capacity
2. Build and configure the Linux kernel and manage startup
3. Manage advanced storage, filesystems and RAID/LVM
4. Configure networking and troubleshoot connectivity

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Capacity planning and the kernel (not published - design grouping)

- Worked applications: (1) Use monitoring tools to identify a resource bottleneck; (2) Select kernel parameters to tune for a workload
- Common misconception addressed: Assuming high load average alone proves a CPU bottleneck
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Measure and troubleshoot resource usage | 100 | 6 |
| M01L02 | Predict future resource needs | 100 | 6 |
| M01L03 | Kernel components and compilation | 100 | 6 |
| M01L04 | Kernel runtime management and troubleshooting | 100 | 6 |

### M02 System startup and advanced storage (not published - design grouping)

- Worked applications: (1) Create a logical volume and extend it online; (2) Choose a RAID level for a given reliability goal
- Common misconception addressed: Treating RAID as a substitute for backups
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Customise system startup and boot | 100 | 6 |
| M02L02 | Configure the bootloader | 100 | 6 |
| M02L03 | Advanced storage and LVM | 100 | 6 |
| M02L04 | Software RAID and device management | 100 | 6 |

### M03 Filesystems and networking (not published - design grouping)

- Worked applications: (1) Tune filesystem mount options for performance; (2) Diagnose a routing problem with ip route
- Common misconception addressed: Confusing a default gateway with a DNS server
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Filesystem maintenance and tuning | 100 | 6 |
| M03L02 | Network configuration | 100 | 6 |
| M03L03 | Advanced network troubleshooting | 100 | 6 |
| M03L04 | Automount and network filesystems | 100 | 6 |

## Integrative case

A senior administrator plans capacity for a growing service: measure resource usage, tune the kernel and boot, provision advanced storage with LVM and RAID, and configure and troubleshoot the network.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0279-practice-form-A | 45 | 45 | yes |
| MST-0279-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0279-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0279-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Capacity planning and the kernel | 15 |
| System startup and advanced storage | 15 |
| Filesystems and networking | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0279-Q0001** (single-answer, Select ONE) Which technology lets you resize a volume online by grouping physical volumes into a flexible pool?

- A. LVM (Logical Volume Manager) **(key)**  
  _Rationale:_ Correct: LVM abstracts physical volumes into volume groups and resizable logical volumes.
- B. A swap partition  
  _Rationale:_ Swap provides virtual memory; it does not manage flexible volumes.
- C. A static /etc/fstab entry alone  
  _Rationale:_ An fstab entry records a mount; it does not provide volume flexibility.
- D. The cron daemon  
  _Rationale:_ cron schedules jobs and is unrelated to volume management.

**MST-0279-Q0002** (single-answer, Select ONE) What does the load average reported by tools such as uptime primarily reflect?

- A. The average number of processes runnable or waiting over recent time windows **(key)**  
  _Rationale:_ Correct: load average reflects runnable and uninterruptible processes over 1/5/15 minutes.
- B. The exact percentage of RAM in use  
  _Rationale:_ Memory usage is reported separately, not by load average.
- C. Network throughput in megabits per second  
  _Rationale:_ Load average does not measure network throughput.
- D. Disk capacity remaining  
  _Rationale:_ Disk capacity is reported by df, not load average.

**MST-0279-Q0003** (multiple-answer, Select TWO) Select TWO true statements about software RAID.

- A. RAID 1 mirrors data across disks for redundancy **(key)**  
  _Rationale:_ Correct: RAID 1 keeps identical copies on multiple disks.
- B. RAID is not a replacement for regular backups **(key)**  
  _Rationale:_ Correct: RAID protects against disk failure, not accidental deletion or corruption.
- C. RAID 0 increases redundancy by duplicating data  
  _Rationale:_ RAID 0 stripes for performance and provides no redundancy.
- D. RAID guarantees protection against file deletion by users  
  _Rationale:_ RAID does not protect against user or application data loss.
- E. RAID levels cannot affect read or write performance  
  _Rationale:_ RAID levels do affect performance characteristics.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
