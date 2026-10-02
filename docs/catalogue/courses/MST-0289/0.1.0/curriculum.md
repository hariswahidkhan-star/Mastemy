# EC-Council Certified Ethical Hacker: CEH Knowledge Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0289` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | EC-Council (no affiliation or endorsement) |
| Exam code | 312-50 |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | MST-CYB-ECC-CEH-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Describe ethical hacking phases, scope and legal/ethical constraints
2. Perform reconnaissance, scanning and enumeration concepts
3. Describe system, web and network attack techniques and countermeasures
4. Describe wireless, cloud, cryptography and emerging-threat concepts

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Ethical hacking foundations (not published - design grouping)

- Worked applications: (1) Order the phases of an ethical hacking engagement; (2) Decide what is in and out of scope for a test
- Common misconception addressed: Assuming any testing is legal without written authorisation
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Information security and threat concepts | 100 | 6 |
| M01L02 | Ethical hacking phases and methodology | 100 | 6 |
| M01L03 | Scope, rules of engagement and legality | 100 | 6 |
| M01L04 | Footprinting and reconnaissance concepts | 100 | 6 |

### M02 Scanning, enumeration and system attacks (not published - design grouping)

- Worked applications: (1) Interpret a scan result to infer open services; (2) Map a vulnerability to a mitigation
- Common misconception addressed: Confusing vulnerability scanning with exploitation
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Network scanning concepts | 100 | 6 |
| M02L02 | Enumeration techniques | 100 | 6 |
| M02L03 | Vulnerability analysis | 100 | 6 |
| M02L04 | System hacking and privilege escalation concepts | 100 | 6 |

### M03 Application, network and emerging-threat concepts (not published - design grouping)

- Worked applications: (1) Classify a web flaw against the OWASP categories; (2) Choose a countermeasure for a given attack
- Common misconception addressed: Believing WAFs remove the need to fix underlying code flaws
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Web application and SQL injection concepts | 100 | 6 |
| M03L02 | Network attacks: sniffing, MITM and social engineering | 100 | 6 |
| M03L03 | Wireless and cloud security concepts | 100 | 6 |
| M03L04 | Cryptography and emerging threats | 100 | 6 |

## Integrative case

A tester plans an authorised engagement: define scope and rules of engagement, perform reconnaissance and scanning conceptually, reason about system/web/network attack techniques and their countermeasures, and report responsibly.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0289-practice-form-A | 45 | 45 | yes |
| MST-0289-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0289-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0289-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Ethical hacking foundations | 15 |
| Scanning, enumeration and system attacks | 15 |
| Application, network and emerging-threat concepts | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0289-Q0001** (single-answer, Select ONE) What must an ethical hacker obtain before testing a target system?

- A. Written authorisation and an agreed scope from the system owner **(key)**  
  _Rationale:_ Correct: authorised, scoped engagement is the defining feature of ethical hacking.
- B. A faster internet connection only  
  _Rationale:_ Bandwidth is irrelevant to the legality of testing.
- C. The target's social media password by trickery  
  _Rationale:_ Obtaining credentials by trickery without authorisation is not ethical or legal.
- D. Permission from a random third party  
  _Rationale:_ Only the system owner (or authorised party) can grant permission.

**MST-0289-Q0002** (single-answer, Select ONE) Which activity best describes the enumeration phase?

- A. Extracting detailed information such as usernames, shares and services from identified systems **(key)**  
  _Rationale:_ Correct: enumeration gathers detailed resource and account information.
- B. Physically destroying the target hardware  
  _Rationale:_ Destruction is not enumeration and is not part of authorised testing.
- C. Writing the final client report  
  _Rationale:_ Reporting is a later phase, not enumeration.
- D. Buying new servers for the client  
  _Rationale:_ Procurement is unrelated to enumeration.

**MST-0289-Q0003** (multiple-answer, Select TWO) Select TWO effective countermeasures against SQL injection.

- A. Using parameterised queries / prepared statements **(key)**  
  _Rationale:_ Correct: parameterised queries separate code from data and prevent injection.
- B. Validating and sanitising user input **(key)**  
  _Rationale:_ Correct: input validation reduces the chance of malicious input being processed.
- C. Storing database passwords in the page source  
  _Rationale:_ Exposing credentials in page source is a serious vulnerability, not a countermeasure.
- D. Disabling all database backups  
  _Rationale:_ Disabling backups does not prevent injection and harms recovery.
- E. Granting every web user database admin rights  
  _Rationale:_ Excessive privileges worsen the impact of an injection.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
