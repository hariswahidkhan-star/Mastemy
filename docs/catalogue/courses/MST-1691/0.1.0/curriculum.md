# Security Architecture Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1691` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-SAF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Security Architecture Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain the goals and principles of security architecture
2. Apply defence-in-depth and layered controls
3. Design network segmentation and trust boundaries
4. Apply zero-trust and least-privilege principles
5. Use frameworks and threat modelling to guide architecture decisions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Principles of security architecture (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map a control to the CIA goal it serves; (2) Apply a secure-by-design principle to a decision
- Common misconception addressed: Treating security as a feature added at the end
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Goals: confidentiality, integrity, availability | 72 | 6 |
| M01L02 | Core principles and secure-by-design | 72 | 6 |

### M02 Defence in depth (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Place controls across multiple layers for a scenario; (2) Classify controls as preventive/detective/corrective
- Common misconception addressed: Relying on a single perimeter firewall as the only defence
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Layered controls and the kill chain | 72 | 6 |
| M02L02 | Preventive, detective and corrective controls | 72 | 6 |

### M03 Segmentation and trust boundaries (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draw trust zones for a web/app/data system; (2) Decide where to place a boundary control
- Common misconception addressed: Assuming traffic inside the perimeter needs no inspection
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Network zones and trust boundaries | 72 | 6 |
| M03L02 | Microsegmentation and east-west traffic | 72 | 6 |

### M04 Zero trust and least privilege (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply 'never trust, always verify' to an access flow; (2) Reduce an over-permissive access grant
- Common misconception addressed: Believing a VPN alone makes an architecture zero-trust
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Zero-trust principles | 72 | 6 |
| M04L02 | Least privilege and identity-centric access | 72 | 6 |

### M05 Frameworks and threat modelling (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Use a framework to structure control selection; (2) Run a simple threat model on a design
- Common misconception addressed: Choosing controls without modelling the actual threats
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Using security frameworks and reference models | 72 | 6 |
| M05L02 | Threat modelling to guide design | 72 | 6 |

## Integrative case

A company runs a flat network where any workstation can reach every server, and trusts anything inside the perimeter. Redesign the architecture: apply defence in depth, segment the network into trust zones, introduce zero-trust and least-privilege access, and use a threat model to justify the key control choices.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1691-final-protected | 25 | 25 | yes |
| MST-1691-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Principles of security architecture | 5 |
| Defence in depth | 5 |
| Segmentation and trust boundaries | 5 |
| Zero trust and least privilege | 5 |
| Frameworks and threat modelling | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1691-Q0001** (single-answer, Select ONE) What does defence in depth aim to achieve?

- A. Multiple independent layers so one failure does not cause a breach **(key)**  
  _Rationale:_ Correct: layered controls provide redundancy if one fails.
- B. A single strong perimeter that needs nothing else  
  _Rationale:_ A single layer is exactly what defence in depth avoids.
- C. Removing all internal controls once the firewall is set  
  _Rationale:_ Internal controls remain essential.
- D. Encrypting data only, with no other control  
  _Rationale:_ Defence in depth spans many control types.

**MST-1691-Q0002** (multiple-answer, Select TWO) Which TWO statements reflect zero-trust principles? (Select TWO.)

- A. Verify every request regardless of network location **(key)**  
  _Rationale:_ Correct: zero trust does not grant implicit trust by location.
- B. Grant the least privilege needed for each task **(key)**  
  _Rationale:_ Correct: least privilege limits blast radius.
- C. Trust any device once it is inside the perimeter  
  _Rationale:_ Implicit perimeter trust is what zero trust rejects.
- D. Give all users administrator rights for speed  
  _Rationale:_ Broad admin rights violate least privilege.

**MST-1691-Q0003** (single-answer, Select ONE) Why segment a flat network into trust zones?

- A. To contain an intruder and limit lateral movement **(key)**  
  _Rationale:_ Correct: segmentation stops a compromise spreading freely.
- B. To make every host reachable from every other host  
  _Rationale:_ That is the flat design segmentation replaces.
- C. To remove the need for authentication  
  _Rationale:_ Segmentation complements, not replaces, authentication.
- D. To increase east-west traffic without inspection  
  _Rationale:_ Segmentation adds inspection at boundaries.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
