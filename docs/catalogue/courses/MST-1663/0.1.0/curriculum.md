# Incident Response

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1663` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-IR-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Incident Response (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain the incident response lifecycle and team roles
2. Prepare detection, triage and escalation procedures
3. Contain, eradicate and recover from an incident
4. Preserve evidence and maintain a defensible timeline
5. Run a post-incident review to improve future response

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 IR foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map a scenario to the lifecycle phases; (2) Assign roles for a small response team
- Common misconception addressed: Believing incident response starts only after an attack is confirmed
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The incident response lifecycle | 72 | 6 |
| M01L02 | Roles, communications and an IR plan | 72 | 6 |

### M02 Preparation and detection (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a triage checklist for a suspected phishing click; (2) Decide when an event becomes a declared incident
- Common misconception addressed: Treating every alert as a full incident, or none of them
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Readiness: playbooks and logging | 72 | 6 |
| M02L02 | Detection, triage and escalation | 72 | 6 |

### M03 Containment and eradication (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose containment steps for spreading ransomware; (2) Decide how to confirm the threat is fully removed
- Common misconception addressed: Wiping a system immediately and destroying the evidence
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Short- and long-term containment | 72 | 6 |
| M03L02 | Eradicating the threat | 72 | 6 |

### M04 Evidence and recovery (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Order the steps to preserve volatile evidence; (2) Validate a restored system before returning it to service
- Common misconception addressed: Restoring from a backup that may already be infected
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Evidence preservation and chain of custody | 72 | 6 |
| M04L02 | Recovery and validation | 72 | 6 |

### M05 Post-incident (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draft three improvements from a sample incident; (2) Choose metrics that show whether response is improving
- Common misconception addressed: Closing an incident without recording lessons learned
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Lessons learned and reporting | 72 | 6 |
| M05L02 | Metrics and continuous improvement | 72 | 6 |

## Integrative case

A workstation shows ransomware behaviour and is spreading to a file share. Work through the incident lifecycle: declare the incident, contain the spread, preserve evidence, recover from clean backups, and run a lessons-learned review that produces concrete improvements.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1663-final-protected | 25 | 25 | yes |
| MST-1663-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IR foundations | 5 |
| Preparation and detection | 5 |
| Containment and eradication | 5 |
| Evidence and recovery | 5 |
| Post-incident | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1663-Q0001** (single-answer, Select ONE) Ransomware is actively spreading to a file share. What is the most appropriate immediate action?

- A. Isolate affected systems from the network to contain the spread **(key)**  
  _Rationale:_ Correct: containment limits damage while deeper response proceeds.
- B. Pay the ransom immediately  
  _Rationale:_ Paying is not an immediate technical containment and is discouraged.
- C. Wipe every machine at once  
  _Rationale:_ Mass wiping destroys evidence and may be unnecessary.
- D. Wait to see how far it spreads  
  _Rationale:_ Waiting allows avoidable damage.

**MST-1663-Q0002** (multiple-answer, Select TWO) Which TWO steps protect evidence during an incident? (Select TWO.)

- A. Capturing volatile data before powering a system off **(key)**  
  _Rationale:_ Correct: volatile memory is lost on shutdown, so capture it first.
- B. Recording who handled evidence and when **(key)**  
  _Rationale:_ Correct: a chain of custody keeps evidence defensible.
- C. Rebooting the system to clear the infection  
  _Rationale:_ Rebooting can destroy volatile evidence.
- D. Editing logs to remove confusing entries  
  _Rationale:_ Altering logs destroys evidence integrity.

**MST-1663-Q0003** (single-answer, Select ONE) Why run a post-incident review after recovery is complete?

- A. To identify improvements that reduce the chance or impact of a repeat **(key)**  
  _Rationale:_ Correct: lessons learned drive concrete preventive changes.
- B. To assign personal blame to a staff member  
  _Rationale:_ Blame is not the purpose of a constructive review.
- C. Because the incident is not really over otherwise  
  _Rationale:_ Recovery ends the incident; the review improves the future.
- D. To delete all records of the incident  
  _Rationale:_ Records should be kept, not deleted.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
