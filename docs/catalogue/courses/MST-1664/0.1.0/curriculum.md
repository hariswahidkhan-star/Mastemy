# Malware Analysis Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1664` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-MAF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Malware Analysis Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain malware categories and their typical behaviours
2. Set up a safe analysis environment and handle samples responsibly
3. Perform basic static analysis of a suspicious file
4. Perform basic dynamic analysis and observe behaviour safely
5. Extract and document indicators of compromise

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Malware fundamentals (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify three samples by behaviour; (2) Explain how a trojan differs from a worm
- Common misconception addressed: Using 'virus' as a label for every kind of malware
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Types: viruses, worms, trojans, ransomware | 72 | 6 |
| M01L02 | Infection vectors and persistence | 72 | 6 |

### M02 Safe analysis setup (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design an isolated lab that cannot reach production; (2) Decide how to transfer a sample without infecting hosts
- Common misconception addressed: Analysing live malware on a network-connected work machine
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Isolated labs and snapshots | 72 | 6 |
| M02L02 | Safe handling and legal/ethical limits | 72 | 6 |

### M03 Static analysis (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute a hash and check it against known-bad lists; (2) Spot suspicious strings or imports in a sample
- Common misconception addressed: Trusting a file because its extension looks harmless
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | File types, hashes and strings | 72 | 6 |
| M03L02 | Imports, packing and signatures | 72 | 6 |

### M04 Dynamic analysis (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) List the artefacts to watch while detonating a sample; (2) Interpret an outbound connection attempt by the sample
- Common misconception addressed: Assuming nothing happened because no window appeared
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Observing processes, files and registry changes | 72 | 6 |
| M04L02 | Capturing network behaviour safely | 72 | 6 |

### M05 Indicators and reporting (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Pull file, host and network indicators from findings; (2) Write a one-page report another team can act on
- Common misconception addressed: Reporting only the file hash and omitting behavioural indicators
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Extracting indicators of compromise | 72 | 6 |
| M05L02 | Writing a clear analysis report | 72 | 6 |

## Integrative case

A suspicious email attachment is flagged for analysis. Set up an isolated lab, examine the file statically for obvious indicators, detonate it safely to observe behaviour, and produce a short report with indicators of compromise other defenders can use.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1664-final-protected | 25 | 25 | yes |
| MST-1664-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Malware fundamentals | 5 |
| Safe analysis setup | 5 |
| Static analysis | 5 |
| Dynamic analysis | 5 |
| Indicators and reporting | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1664-Q0001** (single-answer, Select ONE) Why should malware be analysed in an isolated environment with snapshots?

- A. To contain the sample and quickly revert to a clean state **(key)**  
  _Rationale:_ Correct: isolation prevents spread and snapshots enable safe reset.
- B. Because malware runs faster in a virtual machine  
  _Rationale:_ Speed is not the reason; containment is.
- C. To make the malware harmless automatically  
  _Rationale:_ Isolation contains it; it does not neutralise the code.
- D. So the analysis needs no documentation  
  _Rationale:_ Documentation is still required regardless of environment.

**MST-1664-Q0002** (multiple-answer, Select TWO) Which TWO are examples of static analysis? (Select TWO.)

- A. Calculating the file's hash and comparing to known-bad lists **(key)**  
  _Rationale:_ Correct: hashing without running the file is static analysis.
- B. Examining readable strings and imported functions **(key)**  
  _Rationale:_ Correct: inspecting strings and imports is static analysis.
- C. Running the sample and watching network traffic  
  _Rationale:_ Executing to observe behaviour is dynamic analysis.
- D. Observing registry changes during execution  
  _Rationale:_ Runtime observation is dynamic, not static, analysis.

**MST-1664-Q0003** (single-answer, Select ONE) During dynamic analysis a sample opens no window but makes an outbound connection to an unknown host. What is the best interpretation?

- A. The sample may be malicious and contacting a command-and-control server **(key)**  
  _Rationale:_ Correct: silent outbound connections are a common malware behaviour.
- B. Nothing happened because there was no window  
  _Rationale:_ Lack of a UI does not mean lack of activity.
- C. The sample is certainly safe  
  _Rationale:_ Unexpected outbound traffic is a red flag, not a safety sign.
- D. The lab network must be broken  
  _Rationale:_ The connection attempt indicates sample behaviour, not a lab fault.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
