# ITIL Product Version 5: Independent Knowledge Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1222` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | PeopleCert (no affiliation or endorsement) |
| Exam code | (not published / to be resolved at blueprint review) |
| Version basis | official blueprint not retrieved; exam code and domain weights are DESIGN ASSUMPTION |
| Evidence | **unverified-needs-official-check** - sources: SRC-PEOPLECERT-1222 (vendor site EGRESS_BLOCKED this session) |
| Legacy IDs | (none) |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

Design-assumption note: no official exam code, domain names/weights, length or question count were available (vendor site EGRESS_BLOCKED). Module structure, weights and form lengths are DESIGN ASSUMPTIONS to be replaced at blueprint review.

## Learning outcomes

1. Explain ITIL key concepts of service management and the service value system
2. Apply the ITIL guiding principles to product and offering management decisions
3. Describe the purpose and value of the relevant product and offering management practices
4. Select the appropriate practice for a given situation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only. Any official item formats that are not reproducible as MCQ/MR (for example hands-on software tasks or performance-based items) are out of scope for the certificate and are listed in the exam-version record.

## Modules

### M01 Service Value System and Guiding Principles (35%, DESIGN ASSUMPTION)

- Worked applications: (1) Apply two guiding principles to an improvement scenario; (2) Map an outcome to the service value chain
- Common misconception addressed: Treating ITIL practices as rigid processes rather than adaptable guidance.
- Module check: 66 items / 66 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Key concepts: value, outcomes, costs, risks | 180 | 8 |
| M01L02 | The service value system | 180 | 8 |
| M01L03 | Guiding principles | 180 | 8 |
| M01L04 | The service value chain | 180 | 8 |

### M02 Core Practices (35%, DESIGN ASSUMPTION)

- Worked applications: (1) Choose the right practice for a given situation; (2) Describe how a practice contributes to value
- Common misconception addressed: Confusing related practices (e.g. incident vs problem management).
- Module check: 66 items / 66 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Core practices overview | 180 | 8 |
| M02L02 | Incident and problem management | 180 | 8 |
| M02L03 | Change enablement and service requests | 180 | 8 |
| M02L04 | Measurement and continual improvement | 180 | 8 |

### M03 Applying Practices in Context (30%, DESIGN ASSUMPTION)

- Worked applications: (1) Decide the correct practice sequence for a scenario; (2) Identify value and risk in a decision
- Common misconception addressed: Assuming one practice operates in isolation from the others.
- Module check: 57 items / 57 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Roles, responsibilities and governance | 180 | 8 |
| M03L02 | Practices working together | 180 | 8 |
| M03L03 | Common scenarios | 180 | 8 |
| M03L04 | Review and consolidation | 180 | 8 |

## Integrative case

A mid-size IT organisation must improve its product and offering management: diagnose current gaps, choose the right ITIL practices and guiding principles, and plan an improvement.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official exam length/question count NOT retrieved (vendor site EGRESS_BLOCKED). Form set to 103 items / 103 min to fit the cumulative budget; replace when confirmed.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1222-practice-form-A | 103 | 103 | yes |
| MST-1222-practice-form-B | 103 | 103 | no (optional practice) |
| MST-1222-practice-form-C | 103 | 103 | no (optional practice) |
| MST-1222-final-protected | 103 | 103 | yes |

| Domain (DESIGN ASSUMPTION) | Items per form |
|---|---|
| Service Value System and Guiding Principles | 36 |
| Core Practices | 36 |
| Applying Practices in Context | 31 |

Minimum reviewed item bank: 982 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1222-Q0001** (single-answer, Select ONE) In ITIL terms, what is a 'service' best described as?

- A. A means of enabling value co-creation by facilitating outcomes customers want, without the customer managing specific costs and risks **(key)**  
  _Rationale:_ Correct: this is the ITIL definition of a service.
- B. A physical IT device owned by the provider  
  _Rationale:_ A device is a resource, not the definition of a service.
- C. A signed contract document  
  _Rationale:_ A contract may govern a service but is not the service itself.
- D. A single incident ticket  
  _Rationale:_ An incident is an unplanned interruption, not a service.

**MST-1222-Q0002** (single-answer, Select ONE) A user reports they cannot access email - an unplanned interruption to a service. Which practice primarily handles restoring service as quickly as possible?

- A. Incident management **(key)**  
  _Rationale:_ Correct: incident management restores normal service operation as quickly as possible.
- B. Change enablement  
  _Rationale:_ Change enablement governs changes, not restoring an outage.
- C. Problem management  
  _Rationale:_ Problem management addresses underlying causes, not the immediate restore.
- D. Service level management  
  _Rationale:_ SLM negotiates and monitors targets, not the live restore.

**MST-1222-Q0003** (multiple-answer, Select TWO) Which TWO are dimensions/guiding ideas emphasised by the ITIL service value system?

- A. Focus on value **(key)**  
  _Rationale:_ Correct: 'focus on value' is a core ITIL guiding principle.
- B. Start where you are **(key)**  
  _Rationale:_ Correct: 'start where you are' is a core ITIL guiding principle.
- C. Automate every process regardless of value  
  _Rationale:_ ITIL advises optimising before automating, not automating everything.
- D. Avoid all collaboration to reduce overhead  
  _Rationale:_ ITIL promotes 'collaborate and promote visibility', the opposite.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
