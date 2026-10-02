# Oracle Database Administration: Certification-Track Knowledge Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1239` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Oracle (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION / unresolved |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of Database Architecture (design-assumption grouping)
2. Explain and apply the concepts of Storage and Security (design-assumption grouping)
3. Explain and apply the concepts of Maintenance and Recovery (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 Database Architecture (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Confusing the instance (memory/processes) with the database (files)
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Instance and memory structures | 240 | 6 |
| M01L02 | Storage structures and files | 240 | 6 |
| M01L03 | Starting up and shutting down | 240 | 6 |

### M02 Storage and Security (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Granting system privileges when object privileges would suffice
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tablespaces and data files | 240 | 6 |
| M02L02 | Users, privileges and roles | 240 | 6 |
| M02L03 | Auditing and basic security | 240 | 6 |

### M03 Maintenance and Recovery (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Assuming a backup is valid without ever testing a restore
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Backup and recovery concepts | 240 | 6 |
| M03L02 | Performance monitoring basics | 240 | 6 |
| M03L03 | Patching and upgrades | 240 | 6 |

## Integrative case

Plan the administration of a new Oracle database: lay out tablespaces, define users/roles with least privilege, design a backup-and-recovery strategy with a tested restore, and outline a patching cadence.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1239-practice-form-A | 81 | 81 | yes |
| MST-1239-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1239-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1239-final-protected | 81 | 81 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| Database Architecture | 27 |
| Storage and Security | 27 |
| Maintenance and Recovery | 27 |

Minimum reviewed item bank: 810 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1239-Q0001** (single-answer, Select ONE) In Oracle, what is the difference between an instance and a database?

- A. The instance is memory and processes; the database is the files on disk **(key)**  
  _Rationale:_ Correct: the instance (SGA + background processes) accesses the database's physical files.
- B. They are the same thing  
  _Rationale:_ They are distinct concepts.
- C. The database is memory; the instance is the files  
  _Rationale:_ This reverses the definitions.
- D. The instance stores all table data permanently  
  _Rationale:_ Persistent data lives in the database files, not the instance memory.

**MST-1239-Q0002** (single-answer, Select ONE) Which principle should guide granting database privileges?

- A. Least privilege — grant only what is needed **(key)**  
  _Rationale:_ Correct: least privilege limits risk from misuse or compromise.
- B. Grant DBA to all developers for convenience  
  _Rationale:_ Over-granting violates least privilege.
- C. Avoid roles entirely  
  _Rationale:_ Roles help manage privileges efficiently.
- D. Grant privileges only to PUBLIC  
  _Rationale:_ Granting to PUBLIC exposes privileges to everyone.

**MST-1239-Q0003** (multiple-answer, Select TWO) Which TWO make a backup strategy trustworthy?

- A. Regularly testing a restore from the backups **(key)**  
  _Rationale:_ Correct: an untested backup may not be recoverable.
- B. Storing a copy in a separate location **(key)**  
  _Rationale:_ Correct: off-site/separate copies survive local failures.
- C. Never checking the backups again  
  _Rationale:_ Unverified backups can fail silently.
- D. Keeping backups only on the same disk as the database  
  _Rationale:_ Co-located backups are lost with the disk.
- E. Disabling archive logging on a production OLTP database  
  _Rationale:_ That prevents point-in-time recovery.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
