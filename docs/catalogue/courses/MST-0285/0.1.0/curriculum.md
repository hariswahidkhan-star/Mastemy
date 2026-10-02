# GIAC Certified Forensic Analyst: GCFA

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0285` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GIAC (no affiliation or endorsement) |
| Exam code | unresolved - not published in catalog |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Describe incident response and forensic methodology
2. Perform host-based evidence acquisition and analysis
3. Analyse Windows and filesystem artefacts for intrusion evidence
4. Investigate memory, timelines and advanced attacker techniques

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 Incident response and forensic methodology (not published - design grouping)

- Worked applications: (1) Order the phases of an evidence-sound investigation; (2) Decide what volatile data to capture first
- Common misconception addressed: Collecting disk images before volatile memory and losing live evidence
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Incident response process and scoping | 100 | 6 |
| M01L02 | Order of volatility and evidence handling | 100 | 6 |
| M01L03 | Chain of custody and documentation | 100 | 6 |
| M01L04 | Forensic acquisition fundamentals | 100 | 6 |

### M02 Host and filesystem analysis (not published - design grouping)

- Worked applications: (1) Recover deleted file metadata from filesystem structures; (2) Correlate registry keys to a program execution event
- Common misconception addressed: Assuming a deleted file's data is immediately overwritten and unrecoverable
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Windows filesystem (NTFS) artefacts | 100 | 6 |
| M02L02 | Registry forensics and persistence | 100 | 6 |
| M02L03 | Program execution and user activity artefacts | 100 | 6 |
| M02L04 | File and metadata recovery | 100 | 6 |

### M03 Memory, timelines and advanced analysis (not published - design grouping)

- Worked applications: (1) Build a super-timeline and spot an anomaly; (2) Identify a suspicious process from a memory image
- Common misconception addressed: Treating timestamps as tamper-proof ground truth
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Memory acquisition and analysis | 100 | 6 |
| M03L02 | Timeline analysis and super-timelines | 100 | 6 |
| M03L03 | Anti-forensics and attacker techniques | 100 | 6 |
| M03L04 | Reporting and defensible findings | 100 | 6 |

## Integrative case

An analyst responds to a suspected intrusion on a Windows host: preserve evidence soundly, build a forensic timeline from filesystem and registry artefacts, analyse a memory image, and document findings defensibly.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0285-practice-form-A | 45 | 45 | yes |
| MST-0285-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0285-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0285-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Incident response and forensic methodology | 15 |
| Host and filesystem analysis | 15 |
| Memory, timelines and advanced analysis | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0285-Q0001** (single-answer, Select ONE) During live incident response, which data should generally be collected FIRST?

- A. Volatile data such as memory and running process state **(key)**  
  _Rationale:_ Correct: following the order of volatility, volatile data is captured before it is lost.
- B. A full offline disk image before anything else  
  _Rationale:_ Imaging disks first can lose volatile evidence that disappears at shutdown.
- C. Printed copies of the user manual  
  _Rationale:_ This is irrelevant to evidence collection.
- D. The organisation's marketing materials  
  _Rationale:_ These are not forensic evidence.

**MST-0285-Q0002** (single-answer, Select ONE) Why is maintaining a chain of custody important in a forensic investigation?

- A. It documents who handled evidence and when, supporting its integrity and admissibility **(key)**  
  _Rationale:_ Correct: chain of custody records handling to show evidence was not altered.
- B. It speeds up the computer being investigated  
  _Rationale:_ Chain of custody has nothing to do with system performance.
- C. It encrypts the suspect's network traffic  
  _Rationale:_ Chain of custody is a documentation practice, not encryption.
- D. It automatically identifies the attacker  
  _Rationale:_ It records handling; it does not attribute the attack.

**MST-0285-Q0003** (multiple-answer, Select TWO) Select TWO artefacts commonly analysed when investigating program execution on a Windows host.

- A. Prefetch files **(key)**  
  _Rationale:_ Correct: prefetch files record evidence of program execution.
- B. Registry keys associated with execution and persistence **(key)**  
  _Rationale:_ Correct: certain registry keys record run history and persistence.
- C. The monitor's brightness setting  
  _Rationale:_ Display brightness is not forensic evidence of execution.
- D. The keyboard layout language only  
  _Rationale:_ Keyboard layout alone does not indicate program execution.
- E. The desktop wallpaper image dimensions  
  _Rationale:_ Wallpaper dimensions are not execution evidence.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
