# Juniper JNCIA-Junos

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0265` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Juniper Networks (no affiliation or endorsement) |
| Exam code | not resolved |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | - |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain networking fundamentals and the Junos OS architecture
2. Navigate Junos user interfaces and perform configuration basics
3. Perform operational monitoring and maintenance of Junos devices
4. Explain routing fundamentals, routing policy and firewall filters

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Networking and Junos OS Fundamentals (weight: design assumption, unverified)

- Worked applications: (1) Map the control-plane/data-plane separation to a packet's path through a device; (2) Classify traffic as transit vs exception and predict its handling
- Common misconception addressed: Assuming all packets are handled by the same processing engine
- Module check: 48 items / 48 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Networking fundamentals review | 180 | 6 |
| M01L02 | Junos OS architecture and design | 180 | 6 |
| M01L03 | Software and traffic processing | 180 | 6 |

### M02 User Interfaces and Configuration Basics (weight: design assumption, unverified)

- Worked applications: (1) Stage a configuration change and commit confirmed with a rollback safety net; (2) Configure a logical interface with a unit, family and address
- Common misconception addressed: Forgetting that configuration is not active until committed
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | CLI and J-Web interfaces | 180 | 6 |
| M02L02 | Configuration hierarchy, candidate and commit model | 180 | 6 |
| M02L03 | Initial configuration and interfaces | 180 | 6 |

### M03 Operational Monitoring and Maintenance (weight: design assumption, unverified)

- Worked applications: (1) Build an operational troubleshooting sequence for an interface that is down; (2) Recover a device password using the recovery procedure
- Common misconception addressed: Confusing 'show configuration' output with live operational state
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Monitoring with operational commands | 180 | 6 |
| M03L02 | System logging and SNMP | 180 | 6 |
| M03L03 | Maintenance, upgrades and recovery | 180 | 6 |

### M04 Routing, Policy and Firewall Filters (weight: design assumption, unverified)

- Worked applications: (1) Write a routing policy that rejects a specific prefix from being exported; (2) Apply a firewall filter to rate-limit and count management traffic
- Common misconception addressed: Reversing import vs export policy direction
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Routing fundamentals and the routing/forwarding tables | 180 | 6 |
| M04L02 | Routing policy | 180 | 6 |
| M04L03 | Firewall filters | 180 | 6 |

## Integrative case

A new network engineer brings a Junos device into production: perform initial configuration safely with commit confirmed, verify operation, set up logging, and apply a routing policy and firewall filter; explain each step and its rollback path.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0265-practice-form-A | 93 | 93 | yes |
| MST-0265-practice-form-B | 93 | 93 | no (optional practice) |
| MST-0265-practice-form-C | 93 | 93 | no (optional practice) |
| MST-0265-final-protected | 93 | 93 | yes |

| Domain | Items per form |
|---|---|
| Networking and Junos OS Fundamentals | 24 |
| User Interfaces and Configuration Basics | 23 |
| Operational Monitoring and Maintenance | 23 |
| Routing, Policy and Firewall Filters | 23 |

Minimum reviewed item bank: 894 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0265-Q0001** (single-answer, Select ONE) A configuration change was typed but the device still behaves as before. What is the most likely reason?

- A. The candidate configuration was not committed **(key)**  
  _Rationale:_ Correct: Junos changes take effect only after a commit.
- B. The device needs a full reboot for any change  
  _Rationale:_ Most Junos changes apply on commit without a reboot.
- C. The CLI is in operational mode permanently  
  _Rationale:_ You can enter configuration mode to make and commit changes.
- D. Routing policy always blocks changes  
  _Rationale:_ Routing policy does not prevent configuration from committing.

**MST-0265-Q0002** (single-answer, Select ONE) How is a transit packet handled differently from an exception packet on a Junos device?

- A. Transit packets are forwarded by the data plane; exception packets go to the routing engine **(key)**  
  _Rationale:_ Correct: the data plane forwards transit traffic while exceptions are punted to the RE.
- B. Both are always processed by the routing engine  
  _Rationale:_ Transit traffic is handled by the forwarding plane, not the RE.
- C. Exception packets are always dropped  
  _Rationale:_ Exception packets are processed by the RE, not simply dropped.
- D. Transit packets require a commit to forward  
  _Rationale:_ Forwarding does not require a configuration commit per packet.

**MST-0265-Q0003** (multiple-answer, Select TWO) Which TWO safeguards let you apply a risky change while protecting against lockout? (Select TWO)

- A. Use commit confirmed with a rollback timer **(key)**  
  _Rationale:_ Correct: commit confirmed auto-rolls back if not confirmed in time.
- B. Review the change with show | compare before commit **(key)**  
  _Rationale:_ Correct: comparing candidate vs active config catches mistakes before commit.
- C. Delete the rollback history first  
  _Rationale:_ Deleting rollback history removes your recovery options.
- D. Disable the management interface during the change  
  _Rationale:_ Disabling management risks the very lockout you want to avoid.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
