# Azure Virtual Machines Deep Dive

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1450` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Azure Virtual Machines documentation read via the Microsoft Learn MCP on 2026-10-02. Specific product UI labels can vary by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/azure/virtual-machines/overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZVM |
| Legacy IDs | MST-MIC-SK-AVMDD-001 |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Azure Virtual Machines Deep Dive (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Describe Azure Virtual Machines and their place among Azure compute options
2. Choose VM sizes, series and disk types for a workload
3. Explain scaling, availability and cost for Azure VMs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Azure VM fundamentals (MASTEMY-DESIGN 34%, design weight)

- Worked applications: (1) Decide whether a workload suits a VM or a PaaS compute option; (2) Interpret a VM size name into vCPUs and features
- Common misconception addressed: Picking a GPU or memory-optimised VM when a general-purpose size is appropriate
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Azure Virtual Machines are and when to use them | 80 | 4 |
| M01L02 | VM families, series and size naming | 80 | 4 |

### M02 Sizing and storage (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Match a memory-intensive workload to the right VM family; (2) Choose Standard SSD vs Premium SSD for a disk requirement
- Common misconception addressed: Assuming VM storage is included and free rather than billed separately
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Choosing a size family for a workload | 80 | 4 |
| M02L02 | Managed disks and disk types | 80 | 4 |

### M03 Scaling, availability and cost (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Decide between scaling up and scaling out for a traffic spike; (2) Explain how per-minute billing applies to a partially used hour
- Common misconception addressed: Believing a VM is free while deallocated when storage and some resources still incur cost
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scaling up and out, and scale sets | 80 | 4 |
| M03L02 | Availability, quotas and pricing | 80 | 4 |

## Integrative case

An engineer specifies a VM for a two-tier app: selects a size family and series, chooses OS and disk types, plans for availability and scaling, and estimates cost implications, defending each choice against CPU, memory, storage and resiliency needs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1450-final-protected | 24 | 32 | yes |
| MST-1450-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Azure VM fundamentals | 8 |
| Sizing and storage | 8 |
| Scaling, availability and cost | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1450-Q0001** (single-answer, Select ONE) A workload is a small development web server with a balanced CPU-to-memory need. Which VM size type is most appropriate?

- A. General purpose **(key)**  
  _Rationale:_ Correct: general-purpose sizes provide a balanced CPU-to-memory ratio ideal for dev/test and small web servers.
- B. GPU accelerated  
  _Rationale:_ GPU sizes are for graphics or AI workloads, overkill here.
- C. High-performance compute  
  _Rationale:_ HPC sizes target memory- and CPU-intensive scientific workloads.
- D. Storage optimised  
  _Rationale:_ Storage-optimised sizes target big-data and large database I/O.

**MST-1450-Q0002** (multiple-answer, Select TWO) Which TWO statements about Azure Virtual Machine cost and scaling are correct? (Select TWO.)

- A. Azure charges an hourly price based on size and OS, billing per minute for partial hours **(key)**  
  _Rationale:_ Correct: VMs are billed by the minute for partial hours based on size and OS.
- B. You can scale out by adding more VM instances to meet demand **(key)**  
  _Rationale:_ Correct: scaling out adds instances to handle more load.
- C. Storage for a VM is always free  
  _Rationale:_ Incorrect: storage is priced and charged separately.
- D. A VM cannot be resized after creation  
  _Rationale:_ Incorrect: VM size can be changed after creation.

**MST-1450-Q0003** (single-answer, Select ONE) What does the 'size' of an Azure Virtual Machine primarily determine?

- A. Processing power, memory, storage capacity and network bandwidth **(key)**  
  _Rationale:_ Correct: the size determines CPU, memory, storage and network characteristics.
- B. The physical colour of the datacenter rack  
  _Rationale:_ Size is a logical specification, not a physical attribute of hardware appearance.
- C. The Azure region the VM must run in  
  _Rationale:_ Region is chosen separately from size.
- D. The subscription's billing currency  
  _Rationale:_ Currency is a billing account setting, not a VM size property.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
