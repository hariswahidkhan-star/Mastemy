# Cybersecurity for Defense and Space

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2176` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Educational cybersecurity overview; concepts versioned by verification date. No official syllabus; conceptual defensive security only - NO offensive techniques, exploits or classified specifics. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cybersecurity for Defense and Space (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why defense and space systems are high-value cyber targets
2. Describe core security principles: confidentiality, integrity and availability
3. Describe threats and attack surfaces across ground and space segments conceptually
4. Explain defensive controls, zero-trust and secure-by-design ideas
5. Describe supply-chain and operational security concepts at a high level
6. Communicate cyber risk and controls to stakeholders

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why these systems matter (25% (Mastemy design weight), design weight)

- Worked applications: (1) Rank three assets by impact if compromised; (2) Map a scenario to the CIA triad
- Common misconception addressed: Thinking air-gapped means automatically safe
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | High-value targets and consequences | 120 | 7 |
| M01L02 | The CIA triad and security goals | 120 | 7 |

### M02 Threats and attack surfaces (25% (Mastemy design weight), design weight)

- Worked applications: (1) Identify attack surfaces for a ground-to-satellite link conceptually; (2) Classify a scenario into a threat category
- Common misconception addressed: Believing space systems are too remote to attack
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Ground, link and space segment surfaces conceptually | 120 | 7 |
| M02L02 | Common threat categories at a high level | 120 | 7 |

### M03 Defensive controls (25% (Mastemy design weight), design weight)

- Worked applications: (1) Apply defense-in-depth to a simple architecture; (2) Explain a zero-trust principle in plain language
- Common misconception addressed: Assuming one strong perimeter is enough
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Defense-in-depth and zero-trust ideas | 120 | 7 |
| M03L02 | Secure-by-design and resilience concepts | 120 | 7 |

### M04 Supply chain and operations (25% (Mastemy design weight), design weight)

- Worked applications: (1) Spot a supply-chain risk in a component sourcing story; (2) Outline basic incident-response steps conceptually
- Common misconception addressed: Treating security as a one-time setup task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Supply-chain security concepts | 120 | 7 |
| M04L02 | Operational security and incident response basics | 120 | 7 |

## Integrative case

A security class reviews, at concept level only, the cyber posture of a satellite ground-control service: they identify assets and attack surfaces across segments, apply the CIA triad and defense-in-depth, consider supply-chain and operational security, and present prioritised defensive recommendations - no offensive detail.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2176-final-protected | 40 | 40 | yes |
| MST-2176-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why these systems matter | 10 |
| Threats and attack surfaces | 10 |
| Defensive controls | 10 |
| Supply chain and operations | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2176-Q0001** (single-answer, Select ONE) What do the three elements of the CIA triad represent in cybersecurity?

- A. Confidentiality, integrity and availability **(key)**  
  _Rationale:_ Correct: the CIA triad is confidentiality, integrity and availability.
- B. Control, inspection and auditing  
  _Rationale:_ That is not the CIA triad.
- C. Cryptography, internet and access  
  _Rationale:_ These are not the triad's three pillars.
- D. Compliance, insurance and assurance  
  _Rationale:_ The triad is confidentiality, integrity, availability.

**MST-2176-Q0002** (multiple-answer, Select TWO) Which TWO ideas are core to a defensive, secure-by-design approach? (Select TWO.)

- A. Defense-in-depth with multiple layered controls **(key)**  
  _Rationale:_ Correct: layered controls limit the impact of any single failure.
- B. Zero-trust: verify every access rather than trusting the network **(key)**  
  _Rationale:_ Correct: zero-trust assumes no implicit trust.
- C. Relying on a single perimeter firewall alone  
  _Rationale:_ A single perimeter is insufficient on its own.
- D. Publishing all secrets to simplify access  
  _Rationale:_ Exposing secrets undermines security.

**MST-2176-Q0003** (single-answer, Select ONE) Why is assuming an 'air-gapped' system is automatically safe a risky belief?

- A. Isolation can be bypassed via removable media, supply chain or misconfiguration **(key)**  
  _Rationale:_ Correct: air gaps reduce but do not eliminate risk.
- B. Air gaps make systems faster  
  _Rationale:_ Speed is unrelated to the security claim.
- C. Air-gapped systems cannot store data  
  _Rationale:_ They can store data; isolation is about connectivity.
- D. Isolation guarantees zero risk forever  
  _Rationale:_ No control guarantees zero risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
