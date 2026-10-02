# OffSec OSCP: Authorized-Lab Knowledge and Demonstration Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0290` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | OffSec (no affiliation or endorsement) |
| Exam code | unresolved - not published in catalog |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Describe penetration testing methodology within authorised labs only
2. Describe reconnaissance, enumeration and service analysis concepts
3. Describe exploitation, privilege escalation and pivoting concepts
4. Describe reporting, documentation and responsible disclosure

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Methodology and the authorised lab mindset (not published - design grouping)

- Worked applications: (1) Build an enumeration checklist for a lab host; (2) Explain why documentation is kept throughout a test
- Common misconception addressed: Believing OSCP-style techniques may be used outside an authorised lab
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Penetration testing methodology | 100 | 6 |
| M01L02 | Authorised scope, ethics and the lab-only rule | 100 | 6 |
| M01L03 | Information gathering and note-taking discipline | 100 | 6 |
| M01L04 | Setting up a safe testing environment (conceptual) | 100 | 6 |

### M02 Enumeration and service analysis (not published - design grouping)

- Worked applications: (1) Interpret enumeration output to prioritise targets; (2) Map a discovered service to likely weaknesses conceptually
- Common misconception addressed: Jumping to exploitation before thorough enumeration
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Host and port discovery concepts | 100 | 6 |
| M02L02 | Service enumeration (web, SMB, SSH, others) | 100 | 6 |
| M02L03 | Web application enumeration concepts | 100 | 6 |
| M02L04 | Identifying potential attack surface | 100 | 6 |

### M03 Exploitation, escalation and reporting (not published - design grouping)

- Worked applications: (1) Describe a privilege-escalation path at a high level; (2) Draft a reproducible finding for a report
- Common misconception addressed: Treating a single exploit as the whole engagement rather than a step
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Exploitation concepts and responsible use | 100 | 6 |
| M03L02 | Privilege escalation concepts (Linux and Windows) | 100 | 6 |
| M03L03 | Pivoting and lateral movement concepts | 100 | 6 |
| M03L04 | Reporting, evidence and responsible disclosure | 100 | 6 |

## Integrative case

A learner works only within an authorised lab: follow a repeatable methodology to enumerate hosts, reason about exploitation and privilege-escalation paths conceptually, and produce a clear, reproducible penetration-test report.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0290-practice-form-A | 45 | 45 | yes |
| MST-0290-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0290-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0290-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Methodology and the authorised lab mindset | 15 |
| Enumeration and service analysis | 15 |
| Exploitation, escalation and reporting | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0290-Q0001** (single-answer, Select ONE) Within this preparation, where may OSCP-style penetration testing techniques be practised?

- A. Only within an authorised lab or systems you have explicit permission to test **(key)**  
  _Rationale:_ Correct: offensive techniques must only be used on authorised, in-scope systems.
- B. On any public website that seems insecure  
  _Rationale:_ Testing systems without authorisation is illegal and unethical.
- C. On a neighbour's network without asking  
  _Rationale:_ This is unauthorised and illegal.
- D. On any system, because learning justifies it  
  _Rationale:_ Learning does not authorise testing systems you do not have permission for.

**MST-0290-Q0002** (single-answer, Select ONE) Why is thorough enumeration emphasised before attempting exploitation?

- A. It reveals the attack surface and guides which paths are worth pursuing **(key)**  
  _Rationale:_ Correct: good enumeration surfaces services and weaknesses that direct the effort.
- B. It permanently fixes all vulnerabilities  
  _Rationale:_ Enumeration gathers information; it does not remediate anything.
- C. It replaces the need to write a report  
  _Rationale:_ Reporting is still required regardless of enumeration.
- D. It guarantees a successful exploit every time  
  _Rationale:_ No step guarantees successful exploitation.

**MST-0290-Q0003** (multiple-answer, Select TWO) Select TWO items that belong in a professional penetration-test report.

- A. Reproducible steps that demonstrate each finding **(key)**  
  _Rationale:_ Correct: reproducible steps let others verify the finding.
- B. Remediation recommendations for each issue **(key)**  
  _Rationale:_ Correct: actionable remediation guidance is a core report element.
- C. The tester's personal opinions about the client's staff  
  _Rationale:_ Personal opinions about staff are unprofessional and out of scope.
- D. Deliberately vague details so issues cannot be fixed  
  _Rationale:_ Vague findings undermine the report's purpose.
- E. Credentials published openly for anyone to reuse  
  _Rationale:_ Publishing credentials is irresponsible and insecure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
