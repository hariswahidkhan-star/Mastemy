# CompTIA Tech+ Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1642` v0.1.0 | Batch 7 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | CompTIA (no affiliation or endorsement) |
| Exam code | FC0-U71 |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts NOT verified |
| Legacy IDs | MST-CYB-CMPT-TECHPLUS-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts and durations are **not verified**.

## Learning outcomes

1. Explain core IT concepts, notational systems, units of measure and a structured troubleshooting method
2. Identify computing hardware, infrastructure components, networking basics and cloud service ideas
3. Describe operating systems, applications, software-development concepts and data/database fundamentals
4. Apply everyday security principles to protect devices, accounts and data

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 IT concepts, terminology and troubleshooting (not published - design grouping)

- Worked applications: (1) Convert a value between binary, decimal and hexadecimal and label the correct storage unit; (2) Walk a stalled laptop through the six troubleshooting steps and record each step's finding
- Common misconception addressed: Treating 'a gigabit' and 'a gigabyte' as the same unit
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How computers process data: input, processing, output and storage | 100 | 6 |
| M01L02 | Notational systems and units of measure | 100 | 6 |
| M01L03 | A structured troubleshooting method | 100 | 6 |
| M01L04 | Comparing and classifying common computing devices | 100 | 6 |

### M02 Infrastructure, networking and cloud (not published - design grouping)

- Worked applications: (1) Trace a web request from a browser to a server and name each device and protocol it passes; (2) Match three business needs to IaaS, PaaS or SaaS and justify each choice
- Common misconception addressed: Believing a public IP address is assigned to every device on a home network
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Internal hardware components and their jobs | 100 | 6 |
| M02L02 | Peripherals, ports and connectors | 100 | 6 |
| M02L03 | Networking basics: addresses, DNS and common devices | 100 | 6 |
| M02L04 | Cloud service models and shared responsibility | 100 | 6 |

### M03 Software, data and everyday security (not published - design grouping)

- Worked applications: (1) Pick the right software category (productivity, collaboration, utility) for four tasks; (2) Design a password and MFA policy for a small team and explain why each control helps
- Common misconception addressed: Assuming a compiled program and its source code are the same file
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Operating systems and application software | 100 | 6 |
| M03L02 | Software-development concepts and language categories | 100 | 6 |
| M03L03 | Data, databases and basic data management | 100 | 6 |
| M03L04 | Security principles: authentication, confidentiality and safe habits | 100 | 6 |

## Integrative case

A new hire at a small firm sets up a laptop: choose an operating system and apps, connect to Wi-Fi, store files safely in the cloud, enable account security, and troubleshoot a printer that will not respond.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1642-practice-form-A | 45 | 45 | yes |
| MST-1642-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1642-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1642-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| IT concepts, terminology and troubleshooting | 15 |
| Infrastructure, networking and cloud | 15 |
| Software, data and everyday security | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1642-Q0001** (single-answer, Select ONE) A technician measures a home internet connection and records a download of 300 Mbps. What does this unit describe?

- A. Megabits transferred per second (a speed) **(key)**  
  _Rationale:_ Correct: Mbps is megabits per second, a measure of data-transfer rate.
- B. Megabytes stored on the router  
  _Rationale:_ Storage is measured in bytes, not a per-second rate.
- C. The number of devices allowed on the network  
  _Rationale:_ Device count is unrelated to the bits-per-second transfer rate.
- D. The Wi-Fi channel number  
  _Rationale:_ Channel numbers identify radio frequencies, not transfer speed.

**MST-1642-Q0002** (single-answer, Select ONE) A user can open a cloud-hosted email service in a browser without installing or patching any server. Which cloud service model is this?

- A. SaaS (Software as a Service) **(key)**  
  _Rationale:_ Correct: the provider runs the whole application stack and the user just consumes it.
- B. IaaS (Infrastructure as a Service)  
  _Rationale:_ IaaS gives raw VMs and networks the customer must configure and patch.
- C. On-premises hosting  
  _Rationale:_ On-premises means the customer owns and runs the hardware locally.
- D. PaaS (Platform as a Service)  
  _Rationale:_ PaaS exposes a development platform; the user still deploys their own app code.

**MST-1642-Q0003** (multiple-answer, Select TWO) Select TWO practices that directly improve the security of a user account.

- A. Enabling multi-factor authentication **(key)**  
  _Rationale:_ Correct: a second factor blocks access even if the password leaks.
- B. Using a long, unique passphrase **(key)**  
  _Rationale:_ Correct: length and uniqueness resist guessing and credential-stuffing.
- C. Sharing the password with a trusted colleague  
  _Rationale:_ Sharing credentials removes accountability and widens exposure.
- D. Reusing one password across all sites  
  _Rationale:_ Reuse means one breach compromises every account.
- E. Disabling the screen lock for convenience  
  _Rationale:_ Removing the lock lets anyone with the device use the account.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
