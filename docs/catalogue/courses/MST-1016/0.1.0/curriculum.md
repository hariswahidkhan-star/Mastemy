# Digital Forensics and Incident Investigation Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1016` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Digital Forensics and Incident Investigation Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Forensic principles and chain of custody
2. Evidence acquisition and imaging
3. Disk and file-system analysis
4. Memory and volatile data analysis
5. Log, network and timeline analysis
6. Reporting and legal considerations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Forensic principles and chain of custody (MASTEMY-DESIGN 16%)

- Worked applications: (1) Document a chain-of-custody entry for a seized drive; (2) Decide the correct handling order for volatile vs non-volatile data
- Common misconception addressed: Thinking any copy of data is forensically sound
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Core forensic principles and admissibility | 80 | 6 |
| M01L02 | Chain of custody and documentation | 80 | 6 |

### M02 Evidence acquisition and imaging (MASTEMY-DESIGN 17%)

- Worked applications: (1) Plan an acquisition that preserves the original; (2) Verify an image with before/after hashes
- Common misconception addressed: Imaging a live disk without recording that it was live
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Write blocking and bit-for-bit imaging | 80 | 6 |
| M02L02 | Hashing and integrity verification | 80 | 6 |

### M03 Disk and file-system analysis (MASTEMY-DESIGN 16%)

- Worked applications: (1) Recover metadata for a suspect file; (2) Interpret a file-system timestamp set (MACB)
- Common misconception addressed: Trusting a single timestamp as the time of an action
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | File systems, metadata and deleted files | 80 | 6 |
| M03L02 | Artefacts: recent files, registry and logs | 80 | 6 |

### M04 Memory and volatile data analysis (MASTEMY-DESIGN 16%)

- Worked applications: (1) List what volatile data to capture first and why; (2) Spot a suspicious process/network pair in a memory listing
- Common misconception addressed: Rebooting a machine before capturing memory
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Why memory matters and capture order | 80 | 6 |
| M04L02 | Finding processes, connections and injected code in RAM | 80 | 6 |

### M05 Log, network and timeline analysis (MASTEMY-DESIGN 17%)

- Worked applications: (1) Correlate three log sources into one event; (2) Build a timeline that shows attacker dwell time
- Common misconception addressed: Mixing time zones without normalising them
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Correlating logs and network artefacts | 80 | 6 |
| M05L02 | Building a defensible timeline | 80 | 6 |

### M06 Reporting and legal considerations (MASTEMY-DESIGN 18%)

- Worked applications: (1) Separate fact from inference in a finding statement; (2) Identify a privacy constraint on collected evidence
- Common misconception addressed: Writing conclusions the evidence cannot support
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Writing a factual forensic report | 80 | 6 |
| M06L02 | Legal, privacy and expert-witness basics | 80 | 6 |

## Integrative case

Investigate a suspected data-theft laptop: capture volatile data in the right order, image the disk with a write blocker and verify hashes, recover and interpret file metadata and a timeline across logs and network data, then write a factual report that separates what the evidence shows from inference while preserving chain of custody.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1016-final-protected | 30 | 30 | yes |
| MST-1016-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Forensic principles and chain of custody | 5 |
| Evidence acquisition and imaging | 5 |
| Disk and file-system analysis | 5 |
| Memory and volatile data analysis | 5 |
| Log, network and timeline analysis | 5 |
| Reporting and legal considerations | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1016-Q0001** (single-answer, Select ONE) A laptop is seized powered on and connected to the network. What should the responder capture first?

- A. Volatile data such as memory and active network connections **(key)**  
  _Rationale:_ Correct: volatile data is lost on power-off, so it is captured before imaging the disk.
- B. A printout of the installed software list  
  _Rationale:_ Non-volatile and low priority compared to volatile data.
- C. The user's email signature  
  _Rationale:_ Not time-sensitive evidence.
- D. The disk image, after shutting the machine down  
  _Rationale:_ Shutting down first destroys volatile evidence.

**MST-1016-Q0002** (multiple-answer, Select ALL that apply) Which two practices preserve the integrity of acquired disk evidence? (Select TWO)

- A. Using a write blocker during acquisition **(key)**  
  _Rationale:_ Correct: a write blocker prevents changes to the source.
- B. Recording a cryptographic hash of the image and re-verifying it **(key)**  
  _Rationale:_ Correct: matching hashes prove the image was not altered.
- C. Editing the image to remove irrelevant files first  
  _Rationale:_ Editing the image destroys its integrity.
- D. Storing the only copy on the suspect's own machine  
  _Rationale:_ That risks loss and tampering of the evidence.

**MST-1016-Q0003** (single-answer, Select ONE) Why should a forensic report distinguish observed facts from the investigator's inferences?

- A. Because conclusions must be supported by evidence and open to challenge **(key)**  
  _Rationale:_ Correct: separating fact from inference keeps the report defensible and honest.
- B. Because inferences are always wrong  
  _Rationale:_ Inferences can be reasonable; they just must be labelled.
- C. Because facts are not allowed in reports  
  _Rationale:_ Facts are the core of the report.
- D. Because the chain of custody replaces the need for analysis  
  _Rationale:_ Chain of custody supports but does not replace analysis.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
