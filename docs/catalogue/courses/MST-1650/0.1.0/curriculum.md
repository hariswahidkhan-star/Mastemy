# Cisco Automation Core (CCNP Automation) Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1650` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Cisco (no affiliation or endorsement) |
| Exam code | (not published as a short code; see title) |
| Version basis | unresolved (unconfirmed) |
| Evidence | **unverified-needs-official-check** - official outline not fetched (egress blocked); no source IDs |
| Legacy IDs | MST-CYB-CSCO-AUTOCORE-001 |
| Planned time | T = 3300 min; instruction I = 2640 min (80%); assessment A = 660 min (20%) |
| Assessment split | lesson checks 165 / module checks 231 / cumulative 264 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Demonstrate knowledge of the 'Network Programmability Foundations' domain to the depth required for independent exam preparation
2. Demonstrate knowledge of the 'Automation APIs and Protocols' domain to the depth required for independent exam preparation
3. Demonstrate knowledge of the 'Network Device Programmability' domain to the depth required for independent exam preparation
4. Demonstrate knowledge of the 'Cisco DNA Center Automation' domain to the depth required for independent exam preparation
5. Demonstrate knowledge of the 'Cisco SD-WAN Automation' domain to the depth required for independent exam preparation
6. Demonstrate knowledge of the 'Automation Tools' domain to the depth required for independent exam preparation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope (design-assumption) outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on, performance-based or other official item formats are not reproduced in this format.

> Domain structure below is a **design assumption** drafted from general knowledge of this credential. It was **not** verified against the issuer's official exam outline (egress blocked). Domain names, weights, question counts and durations must be confirmed before production.

## Modules

### M01 Network Programmability Foundations (weight: design assumption - confirm against official outline)

- Worked applications: (1) Convert a device configuration fragment between JSON, XML and YAML; (2) Decide which automation approach fits three operational scenarios
- Common misconception addressed: Treating screen-scraping CLI output as equivalent to a model-driven API
- Module check: 39 items / 39 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Describe programmable network architectures and use cases | 147 | 6 |
| M01L02 | Compare imperative, declarative and model-driven approaches | 147 | 6 |
| M01L03 | Explain data formats: JSON, XML and YAML | 147 | 6 |

### M02 Automation APIs and Protocols (weight: design assumption - confirm against official outline)

- Worked applications: (1) Write a RESTCONF request that retrieves interface state from a YANG model; (2) Compare NETCONF and RESTCONF for a configuration push scenario
- Common misconception addressed: Assuming RESTCONF exposes every operation NETCONF does
- Module check: 39 items / 39 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Describe NETCONF and RESTCONF | 147 | 6 |
| M02L02 | Explain YANG data models | 147 | 6 |
| M02L03 | Use REST APIs and authentication | 147 | 6 |

### M03 Network Device Programmability (weight: design assumption - confirm against official outline)

- Worked applications: (1) Design a safe config change using a candidate datastore and commit confirm; (2) Set up a model-driven telemetry subscription for interface counters
- Common misconception addressed: Pushing directly to running config without a rollback path
- Module check: 39 items / 39 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Automate IOS XE with on-box and off-box methods | 147 | 6 |
| M03L02 | Use model-driven telemetry | 147 | 6 |
| M03L03 | Apply configuration management safely with candidate/running datastores | 147 | 6 |

### M04 Cisco DNA Center Automation (weight: design assumption - confirm against official outline)

- Worked applications: (1) Call a DNA Center intent API to retrieve device inventory and parse the result; (2) Design an automated provisioning workflow for a new branch template
- Common misconception addressed: Confusing DNA Center intent APIs with per-device CLI automation
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Describe Cisco DNA Center platform APIs | 147 | 6 |
| M04L02 | Automate provisioning and assurance workflows | 147 | 6 |
| M04L03 | Consume DNA Center intent APIs | 147 | 6 |

### M05 Cisco SD-WAN Automation (weight: design assumption - confirm against official outline)

- Worked applications: (1) Use a vManage API to attach a device template to a set of edge routers; (2) Retrieve and summarise SD-WAN tunnel health via API
- Common misconception addressed: Editing an attached template without understanding it re-pushes to all devices
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Describe SD-WAN architecture and vManage APIs | 146 | 6 |
| M05L02 | Automate policy and template operations | 146 | 6 |
| M05L03 | Monitor SD-WAN with APIs | 146 | 6 |

### M06 Automation Tools (weight: design assumption - confirm against official outline)

- Worked applications: (1) Write a Python snippet with ncclient to fetch config via NETCONF; (2) Build an Ansible playbook task that pushes a validated VLAN change
- Common misconception addressed: Running automation against production without a dry-run or check mode
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Use Python libraries for network automation (requests, ncclient) | 146 | 6 |
| M06L02 | Use Ansible for network configuration | 146 | 6 |
| M06L03 | Apply version control and CI/CD to network automation | 146 | 6 |

## Integrative case

An automation engineer modernises an enterprise network's operations: pick data formats and an automation approach, use NETCONF/RESTCONF and YANG against IOS XE with safe datastores, drive provisioning through DNA Center and SD-WAN APIs, and wrap it all in Python and Ansible under version control and CI/CD.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official exam outline not fetched (egress blocked); question count, duration and domain weights are unconfirmed. Confirm on the issuer's official exam page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1650-practice-form-A | 88 | 88 | yes |
| MST-1650-practice-form-B | 88 | 88 | no (optional practice) |
| MST-1650-practice-form-C | 88 | 88 | no (optional practice) |
| MST-1650-final-protected | 88 | 88 | yes |

| Domain | Items per form |
|---|---|
| Network Programmability Foundations | 15 |
| Automation APIs and Protocols | 15 |
| Network Device Programmability | 15 |
| Cisco DNA Center Automation | 15 |
| Cisco SD-WAN Automation | 14 |
| Automation Tools | 14 |

Minimum reviewed item bank: 1030 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1650-Q0001** (single-answer, Select ONE) Which protocol uses YANG data models over SSH to configure network devices with distinct candidate and running datastores?

- A. NETCONF **(key)**  
  _Rationale:_ Correct: NETCONF runs over SSH, uses YANG models, and supports candidate/running datastores.
- B. SNMPv2c  
  _Rationale:_ SNMPv2c is a monitoring protocol and does not use YANG datastores this way.
- C. Syslog  
  _Rationale:_ Syslog carries log messages; it does not configure devices.
- D. ICMP  
  _Rationale:_ ICMP is for diagnostics like ping, not configuration.

**MST-1650-Q0002** (single-answer, Select ONE) A team wants to describe the desired end state of the network and let tooling reconcile it. Which approach is this?

- A. Declarative (intent-based) **(key)**  
  _Rationale:_ Correct: declarative automation states the desired end state and lets tooling converge to it.
- B. Imperative step-by-step scripting  
  _Rationale:_ Imperative specifies each step, not just the end state.
- C. Manual CLI configuration  
  _Rationale:_ Manual CLI is neither declarative nor automated.
- D. Physical cabling changes  
  _Rationale:_ That is a hardware task, not an automation approach.

**MST-1650-Q0003** (multiple-answer, Select TWO) Which TWO are common tools for network automation with Python and configuration management? (Select TWO.)

- A. ncclient (NETCONF client library) **(key)**  
  _Rationale:_ Correct: ncclient is a Python NETCONF client used for automation.
- B. Ansible **(key)**  
  _Rationale:_ Correct: Ansible is widely used for network configuration management.
- C. Photoshop  
  _Rationale:_ Photoshop is image editing software, unrelated to network automation.
- D. Microsoft Excel macros  
  _Rationale:_ Excel macros are not a network automation tool.
- E. A soldering iron  
  _Rationale:_ A soldering iron is a hardware tool, not automation software.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
