# Ransomware Defence and Recovery

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1693` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-RDR-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Ransomware Defence and Recovery (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain how ransomware works and how it spreads
2. Apply preventive controls to reduce ransomware risk
3. Detect ransomware activity early
4. Design resilient, recoverable backups against ransomware
5. Plan and execute incident response and recovery

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 How ransomware works (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Trace a ransomware attack through its stages; (2) Identify likely initial-access vectors in a scenario
- Common misconception addressed: Thinking ransomware only arrives via obvious email attachments
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Ransomware types and the attack lifecycle | 72 | 6 |
| M01L02 | Common initial access and spread methods | 72 | 6 |

### M02 Prevention (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Pick preventive controls for a given weakness; (2) Use segmentation to limit lateral movement
- Common misconception addressed: Relying on antivirus alone to stop ransomware
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Email, patching and endpoint controls | 72 | 6 |
| M02L02 | Access control and segmentation to limit spread | 72 | 6 |

### M03 Detection (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Spot early indicators of ransomware activity; (2) Configure an alert for mass file encryption
- Common misconception addressed: Assuming detection only matters after files are encrypted
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Indicators and early-warning signs | 72 | 6 |
| M03L02 | Monitoring and alerting for ransomware behaviour | 72 | 6 |

### M04 Resilient backups (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design a backup set ransomware cannot destroy; (2) Plan a restore test that proves recoverability
- Common misconception addressed: Keeping the only backups online and writable
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Immutable, offline and 3-2-1 backups | 72 | 6 |
| M04L02 | Protecting and testing backups against ransomware | 72 | 6 |

### M05 Incident response and recovery (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Order the steps to contain an active attack; (2) Build a recovery plan that avoids paying the ransom
- Common misconception addressed: Believing paying the ransom guarantees full recovery
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Containment and eradication | 72 | 6 |
| M05L02 | Recovery, lessons learned and the pay/no-pay decision | 72 | 6 |

## Integrative case

A ransomware attack has encrypted a company's file servers and the attacker has also deleted the online backups. Explain how the attack likely spread, assess which preventive controls were missing, redesign backups to be ransomware-resilient, and build an incident response and recovery plan so the business can recover without paying.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1693-final-protected | 25 | 25 | yes |
| MST-1693-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How ransomware works | 5 |
| Prevention | 5 |
| Detection | 5 |
| Resilient backups | 5 |
| Incident response and recovery | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1693-Q0001** (single-answer, Select ONE) Why must at least one backup copy be offline or immutable to defend against ransomware?

- A. So attackers who reach the live systems cannot also delete or encrypt the backups **(key)**  
  _Rationale:_ Correct: offline/immutable copies survive an attack that destroys online backups.
- B. Because offline backups restore faster than any other  
  _Rationale:_ Resilience, not speed, is the reason.
- C. Because immutable backups need no testing  
  _Rationale:_ Backups must still be tested.
- D. Because online backups cannot be reached by ransomware  
  _Rationale:_ Online, writable backups can be encrypted or deleted.

**MST-1693-Q0002** (multiple-answer, Select TWO) Which TWO controls help limit how far ransomware spreads once inside a network? (Select TWO.)

- A. Network segmentation between zones **(key)**  
  _Rationale:_ Correct: segmentation contains lateral movement.
- B. Least-privilege access for users and admins **(key)**  
  _Rationale:_ Correct: limited privileges reduce what malware can reach.
- C. Giving every user local administrator rights  
  _Rationale:_ Broad admin rights help ransomware spread.
- D. Disabling all logging during an incident  
  _Rationale:_ Disabling logging blinds responders and aids the attacker.

**MST-1693-Q0003** (single-answer, Select ONE) Why is paying a ransom an unreliable recovery strategy?

- A. Payment does not guarantee working decryption or that data was not copied **(key)**  
  _Rationale:_ Correct: decryption may fail and data may already be stolen.
- B. Payment always restores all data perfectly  
  _Rationale:_ Recovery after payment is frequently incomplete.
- C. Paying removes the attacker from the network  
  _Rationale:_ Payment does not evict the attacker or close the entry point.
- D. Paying prevents any future attack  
  _Rationale:_ Paying can mark an organisation as a willing target.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
