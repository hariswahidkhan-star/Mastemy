# Compute Engine Deep Dive

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1453` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-COMPUTE (https://cloud.google.com/compute/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Compute Engine Deep Dive (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Create and configure Compute Engine virtual machine instances
2. Choose machine types, images and disks for a workload
3. Apply networking, firewall and SSH access to instances
4. Use instance groups and autoscaling for scalable workloads
5. Apply persistent-disk, snapshot and image strategies
6. Control cost with committed use, spot VMs and right-sizing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Compute Engine fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Launch a VM from a public image and connect over SSH; (2) Compare zonal vs regional placement for one workload
- Common misconception addressed: Assuming a stopped VM incurs no charges for its attached disks
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Instances, zones and regions | 48 | 5 |
| M01L02 | Creating and connecting to a VM | 48 | 5 |

### M02 Machine types and images (MASTEMY-DESIGN 16%)

- Worked applications: (1) Pick a machine family for a memory-bound workload; (2) Build a custom image from a configured instance
- Common misconception addressed: Treating all machine families as interchangeable on price and performance
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Machine families and custom machine types | 48 | 5 |
| M02L02 | Public, custom and container-optimized images | 48 | 5 |

### M03 Storage for instances (MASTEMY-DESIGN 17%)

- Worked applications: (1) Attach and resize a persistent disk without data loss; (2) Schedule snapshots and restore a disk from one
- Common misconception addressed: Believing a snapshot is a full independent copy rather than incremental
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Persistent disks and local SSD | 48 | 5 |
| M03L02 | Snapshots, images and disk resize | 48 | 5 |

### M04 Networking and access (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write firewall rules that allow HTTP but restrict SSH by source range; (2) Assign a static external IP and an internal-only service
- Common misconception addressed: Opening 0.0.0.0/0 on SSH because the VM 'needs internet access'
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | VPC placement, IPs and firewall rules | 48 | 5 |
| M04L02 | SSH, OS Login and service accounts | 48 | 5 |

### M05 Scaling with instance groups (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a managed instance group with an instance template; (2) Configure autoscaling on CPU utilization with a health check
- Common misconception addressed: Confusing a managed instance group with an unmanaged one
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Instance templates and managed instance groups | 48 | 5 |
| M05L02 | Autoscaling and health checks | 48 | 5 |

### M06 Cost and operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Right-size an over-provisioned instance using recommendations; (2) Model savings from committed use vs spot VMs for a batch job
- Common misconception addressed: Using spot VMs for a workload that cannot tolerate preemption
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Committed use, spot VMs and right-sizing | 48 | 5 |
| M06L02 | Monitoring, maintenance and operations | 48 | 5 |

## Integrative case

Stand up a resilient web tier on Compute Engine: pick machine types and boot images, place instances behind a managed instance group with autoscaling, attach and snapshot persistent disks, lock down firewall and SSH access, then present a cost plan that uses committed-use and spot VMs where appropriate.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1453-final-protected | 30 | 30 | yes |
| MST-1453-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Compute Engine fundamentals | 5 |
| Machine types and images | 5 |
| Storage for instances | 5 |
| Networking and access | 5 |
| Scaling with instance groups | 5 |
| Cost and operations | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1453-Q0001** (single-answer, Select ONE) A batch rendering job can be safely interrupted and restarted. Which Compute Engine option minimizes cost for it?

- A. Spot VMs **(key)**  
  _Rationale:_ Correct: spot VMs are cheapest and acceptable when the workload tolerates preemption.
- B. On-demand regular VMs  
  _Rationale:_ On-demand costs more and is unnecessary for an interruptible job.
- C. A 3-year committed use for on-demand VMs  
  _Rationale:_ Commitments suit steady baseline load, not a one-off batch job.
- D. Sole-tenant nodes  
  _Rationale:_ Sole-tenant nodes add cost for isolation the job does not need.

**MST-1453-Q0002** (multiple-answer, Select TWO) Which TWO settings help keep SSH access to a VM secure? (Select TWO.)

- A. Restrict the SSH firewall rule to known source IP ranges **(key)**  
  _Rationale:_ Correct: limiting source ranges reduces the attack surface.
- B. Use OS Login with IAM-managed SSH keys **(key)**  
  _Rationale:_ Correct: OS Login centralizes key management under IAM.
- C. Open TCP 22 to 0.0.0.0/0 for convenience  
  _Rationale:_ Opening SSH to the world exposes the VM to broad attack.
- D. Embed a shared private key in the boot image  
  _Rationale:_ Baking a shared key into an image is a serious credential-leak risk.

**MST-1453-Q0003** (single-answer, Select ONE) You need a VM that automatically recovers capacity if an instance fails and scales with load. What should you use?

- A. A managed instance group with autoscaling and health checks **(key)**  
  _Rationale:_ Correct: a MIG recreates failed instances and scales on a metric.
- B. A single large standalone VM  
  _Rationale:_ A standalone VM has no self-healing or scaling.
- C. Several manually created unmanaged instances  
  _Rationale:_ Unmanaged groups do not autoscale or auto-heal.
- D. A Cloud Storage bucket  
  _Rationale:_ A bucket stores objects and does not run compute.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
