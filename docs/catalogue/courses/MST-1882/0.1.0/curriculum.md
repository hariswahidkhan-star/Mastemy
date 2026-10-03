# The EU AI Act: Obligations, Risk Tiers and Compliance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1882` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Design assumption only: aligned to the named framework/standard from secondary knowledge; the official document was not retrieved this session (issuer site egress-blocked). No official weightings, learning objectives, codes or partnership are claimed. Design assumption references the publicly described risk-tier structure and provider/deployer roles of the EU AI Act; exact Article numbers, timelines, thresholds and definitions must be confirmed against the official Official Journal text and guidance at production. |
| Evidence | **unverified-needs-official-check** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — The EU AI Act: Obligations, Risk Tiers and Compliance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the risk-based structure of the EU AI Act and its stated objectives
2. Distinguish the commonly described risk tiers (prohibited, high-risk, limited/transparency, minimal) with examples
3. Identify the main roles (provider, deployer and others) and why role determines obligations
4. Outline the obligations typically associated with high-risk AI systems
5. Plan an organisation's readiness activities: inventory, classification and documentation
6. Describe transparency obligations for certain AI systems and interactions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Purpose and risk-based approach (25% (Mastemy design weight), design weight)

- Worked applications: (1) Classify five systems into likely risk tiers and justify each; (2) Explain why the same model can be minimal- or high-risk by use
- Common misconception addressed: Assuming risk attaches to the model rather than to the use
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Objectives and the risk-based philosophy | 120 | 7 |
| M01L02 | Scope and extraterritorial reach at a working level | 120 | 7 |

### M02 Risk tiers (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decide whether a company is provider or deployer for a bought tool; (2) List obligations that shift with the role
- Common misconception addressed: Believing only developers have any obligations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prohibited and high-risk categories with examples | 120 | 7 |
| M02L02 | Limited-risk transparency and minimal-risk uses | 120 | 7 |

### M03 Roles and obligations (25% (Mastemy design weight), design weight)

- Worked applications: (1) Draft a high-risk obligations checklist for a CV-screening system; (2) Specify the human-oversight arrangement for that system
- Common misconception addressed: Treating a privacy policy as satisfying AI-specific duties
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Provider vs deployer and other roles | 120 | 7 |
| M03L02 | High-risk obligations: risk management, data, documentation, oversight | 120 | 7 |

### M04 Readiness and compliance (25% (Mastemy design weight), design weight)

- Worked applications: (1) Build an AI inventory template and classification workflow; (2) Write a transparency notice for an AI chat interaction
- Common misconception addressed: Waiting for enforcement before any inventory or classification
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Building an AI system inventory and classification | 120 | 7 |
| M04L02 | Transparency duties and conformity-readiness planning | 120 | 7 |

## Integrative case

A European retailer uses a bought CV-screening tool and a customer chatbot: determine its roles, classify each system's risk tier, list the high-risk obligations and transparency duties, and build an inventory and readiness plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1882-final-protected | 40 | 40 | yes |
| MST-1882-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Purpose and risk-based approach | 10 |
| Risk tiers | 10 |
| Roles and obligations | 10 |
| Readiness and compliance | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1882-Q0001** (single-answer, Select ONE) A company says 'we only use a third-party AI tool, so the EU AI Act does not apply to us.' Why is that risky?

- A. Obligations can attach to deployers, not only providers, so using an AI system can still create duties **(key)**  
  _Rationale:_ Correct: the Act allocates obligations by role, and deployers of high-risk systems have duties too.
- B. The Act applies only to companies headquartered in the EU  
  _Rationale:_ Its reach can extend to systems used or placed on the EU market regardless of HQ.
- C. Third-party tools are always minimal-risk  
  _Rationale:_ Risk depends on use, not on whether the tool was bought.
- D. Only open-source AI is covered  
  _Rationale:_ Coverage is not limited to open-source systems.

**MST-1882-Q0002** (multiple-answer, Select TWO) Which TWO are commonly cited obligations associated with high-risk AI systems? (Select TWO.)

- A. Maintaining technical documentation and records about the system **(key)**  
  _Rationale:_ Correct: documentation and record-keeping are high-risk obligations.
- B. Ensuring appropriate human oversight of the system **(key)**  
  _Rationale:_ Correct: human oversight is a high-risk obligation.
- C. Publishing the full model weights openly  
  _Rationale:_ Open weight publication is not a high-risk obligation.
- D. Guaranteeing zero errors in all outputs  
  _Rationale:_ No regime requires error-free outputs.

**MST-1882-Q0003** (single-answer, Select ONE) The same large language model powers a spam filter and a tool that screens job applicants. How should risk tier be assigned?

- A. Per use: the applicant-screening use is likely higher-risk, while the spam filter is likely lower-risk **(key)**  
  _Rationale:_ Correct: the Act's risk tier depends on the use context, not the underlying model alone.
- B. Both are high-risk because they share a model  
  _Rationale:_ Risk is assessed by use, not by shared components.
- C. Both are minimal-risk because it is one model  
  _Rationale:_ A shared model does not make every use minimal-risk.
- D. Risk cannot be assigned until regulators rule  
  _Rationale:_ Organisations are expected to classify uses themselves.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
