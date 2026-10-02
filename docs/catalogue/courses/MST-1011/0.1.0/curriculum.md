# Threat Modeling and Secure Architecture Review

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1011` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs |  |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Threat Modeling and Secure Architecture Review (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Threat modelling foundations
2. System decomposition
3. Threat enumeration with STRIDE
4. Risk ranking and prioritisation
5. Mitigations and secure design patterns
6. Secure architecture review

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Threat modelling foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Identify assets and trust boundaries for a system; (2) Name plausible attacker profiles and their goals
- Common misconception addressed: Thinking threat modelling is a one-time activity done only at launch
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why, when and who threat-models | 120 | 6 |
| M01L02 | Assets, attackers and trust boundaries | 120 | 6 |

### M02 System decomposition (MASTEMY-DESIGN 17%)

- Worked applications: (1) Draw a DFD marking trust boundaries and entry points; (2) Locate the attack surface from the DFD
- Common misconception addressed: Drawing a DFD without marking where trust changes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data-flow diagrams and entry points | 120 | 6 |
| M02L02 | Trust boundaries, actors and data stores | 120 | 6 |

### M03 Threat enumeration with STRIDE (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enumerate STRIDE threats for a data flow; (2) Tie a tampering threat to a specific boundary crossing
- Common misconception addressed: Listing vulnerabilities but skipping whole STRIDE categories
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The six STRIDE categories | 120 | 6 |
| M03L02 | Mapping STRIDE threats to DFD elements | 120 | 6 |

### M04 Risk ranking and prioritisation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Rank threats by likelihood and impact; (2) Decide which threats to mitigate now versus accept
- Common misconception addressed: Treating every finding as equally urgent
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Likelihood, impact and risk scoring | 120 | 6 |
| M04L02 | Prioritising with limited resources | 120 | 6 |

### M05 Mitigations and secure design patterns (MASTEMY-DESIGN 16%)

- Worked applications: (1) Select a mitigation that addresses the root threat; (2) Apply defence in depth across layers
- Common misconception addressed: Relying on a single control as if it were sufficient
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Choosing mitigations per threat | 120 | 6 |
| M05L02 | Defence in depth and secure defaults | 120 | 6 |

### M06 Secure architecture review (MASTEMY-DESIGN 16%)

- Worked applications: (1) Record a mitigation decision and its owner; (2) Document residual risk and an acceptance decision
- Common misconception addressed: Closing a review without tracking residual risk owners
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Running the review and recording decisions | 120 | 6 |
| M06L02 | Residual risk, acceptance and follow-up | 120 | 6 |

## Integrative case

Run a threat-modelling exercise for a new customer portal: build a data-flow diagram with trust boundaries, enumerate threats with STRIDE, rank them by risk, choose mitigations and map them to controls, and produce a secure-architecture review record for the design team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1011-final-protected | 30 | 30 | yes |
| MST-1011-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 456 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1011-Q0001** (single-answer, Select ONE) In STRIDE, which category covers an attacker pretending to be another legitimate user?

- A. Spoofing **(key)**  
  _Rationale:_ Correct: spoofing is impersonating another identity.
- B. Repudiation  
  _Rationale:_ Repudiation is denying having performed an action.
- C. Denial of service  
  _Rationale:_ Denial of service is making a resource unavailable.
- D. Information disclosure  
  _Rationale:_ Information disclosure is exposing data to unauthorised parties.

**MST-1011-Q0002** (multiple-answer, Select TWO) Which TWO elements must a data-flow diagram show for threat modelling to find boundary threats? (Select TWO)

- A. Trust boundaries where the level of trust changes **(key)**  
  _Rationale:_ Correct: trust boundaries are where many threats arise and must be marked.
- B. External entry points into the system **(key)**  
  _Rationale:_ Correct: entry points define the attack surface to analyse.
- C. The office seating plan of the team  
  _Rationale:_ Seating has no bearing on data-flow threats.
- D. The marketing roadmap  
  _Rationale:_ The roadmap is irrelevant to the DFD's security analysis.

**MST-1011-Q0003** (single-answer, Select ONE) After enumerating many threats with limited budget, what is the right next step?

- A. Rank them by likelihood and impact and mitigate the highest risks first **(key)**  
  _Rationale:_ Correct: risk ranking directs limited resources to the biggest risks first.
- B. Mitigate them in the order they were written down  
  _Rationale:_ Discovery order does not reflect risk.
- C. Treat all threats as equally urgent  
  _Rationale:_ Equal urgency wastes limited resources.
- D. Ignore the low-likelihood high-impact ones by default  
  _Rationale:_ High-impact threats may warrant mitigation despite low likelihood.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
