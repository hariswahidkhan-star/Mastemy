# ISACA Advanced in AI Risk: AAIR

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1257` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ISACA (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed from an official source (kept out of official_exam_code) |
| Version basis | DESIGN ASSUMPTION - not confirmed from an official source |
| Evidence | **unverified-needs-official-check** - official source could not be fetched (network egress blocked 2026-10-02) |
| Legacy IDs | - |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain AI risk concepts, governance frameworks and the organisational AI risk landscape
2. Identify and assess risks across the AI lifecycle, including data, model and deployment risks
3. Apply risk response, control and assurance practices to AI systems
4. Address legal, ethical, privacy and regulatory considerations for trustworthy AI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> **Module structure, titles and all weightings below are DESIGN ASSUMPTIONS.** The official exam outline could not be fetched (network egress blocked on 2026-10-02) and must be confirmed against the issuer's official source before SME review and publication.

## Modules

### M01 AI Risk Governance and Fundamentals (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Map accountability for an AI incident across the three lines of defence; (2) Align an organisation's AI risk appetite statement to a proposed use case
- Common misconception addressed: Treating AI governance as purely a technical/model concern rather than an enterprise accountability concern
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | AI concepts, risk terminology and the AI risk landscape | 120 | 6 |
| M01L02 | Governance structures, roles and accountability for AI | 120 | 6 |
| M01L03 | Risk appetite, frameworks and the three lines model for AI | 120 | 6 |

### M02 AI Lifecycle Risk Assessment (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Assess bias and data-provenance risk for a training dataset; (2) Design a monitoring plan to detect model drift after deployment
- Common misconception addressed: Assuming a model validated at launch stays valid without ongoing monitoring
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data risks: quality, bias, provenance and privacy | 120 | 6 |
| M02L02 | Model risks: drift, robustness, explainability and security | 120 | 6 |
| M02L03 | Deployment and operational risks: monitoring, misuse and third parties | 120 | 6 |

### M03 Risk Response, Controls, Assurance and Trustworthy AI (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Select controls to treat an identified explainability risk and record residual risk; (2) Map an AI use case to applicable privacy and emerging-regulation obligations
- Common misconception addressed: Believing adding a control always eliminates rather than reduces risk
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Control selection, risk treatment and residual risk | 120 | 6 |
| M03L02 | Assurance, audit and continuous control monitoring for AI | 120 | 6 |
| M03L03 | Legal, ethical, privacy and regulatory considerations | 120 | 6 |

## Integrative case

An enterprise is deploying a generative-AI assistant for customer support: identify lifecycle risks, propose a governance structure and controls, map applicable privacy/regulatory obligations, and present a residual-risk recommendation to the risk committee.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source was not fetched; official question count, duration and domain weightings must be confirmed on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1257-practice-form-A | 45 | 45 | yes |
| MST-1257-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1257-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1257-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| AI Risk Governance and Fundamentals | 15 |
| AI Lifecycle Risk Assessment | 15 |
| Risk Response, Controls, Assurance and Trustworthy AI | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1257-Q0001** (single-answer, Select ONE) In a three-lines model applied to AI risk, which function owns and manages the risk of an AI system in day-to-day operations?

- A. The first line: the business/operational unit that builds and runs the AI system **(key)**  
  _Rationale:_ Correct: the first line owns and manages risk in its operations, including AI systems it runs.
- B. The second line: the independent risk and compliance function  
  _Rationale:_ The second line oversees and challenges, but does not own day-to-day operational risk.
- C. The third line: internal audit  
  _Rationale:_ Internal audit provides independent assurance; it does not own operational risk.
- D. The external regulator  
  _Rationale:_ Regulators set expectations but do not manage the organisation's operational risk.

**MST-1257-Q0002** (single-answer, Select ONE) A deployed credit-scoring model's accuracy degrades over months as customer behaviour changes. This is best described as:

- A. Model drift (data/concept drift) **(key)**  
  _Rationale:_ Correct: performance degradation from changing input or relationships over time is model/concept drift.
- B. A buffer overflow  
  _Rationale:_ That is a software memory vulnerability, unrelated to statistical degradation.
- C. Overfitting at training time  
  _Rationale:_ Overfitting is a training-time issue; this degradation appears after deployment as data changes.
- D. A prompt-injection attack  
  _Rationale:_ Prompt injection is an adversarial input technique, not gradual accuracy decay.

**MST-1257-Q0003** (multiple-answer, Select TWO) Select TWO statements that correctly describe residual risk after applying controls to an AI system.

- A. Residual risk is the risk that remains after controls are applied **(key)**  
  _Rationale:_ Correct: residual risk is what is left once risk treatment/controls are in place.
- B. Residual risk should be formally accepted by an appropriate risk owner **(key)**  
  _Rationale:_ Correct: remaining risk should be explicitly accepted (or further treated) by an accountable owner.
- C. Applying any control reduces residual risk to zero  
  _Rationale:_ Controls reduce, but rarely eliminate, risk; some residual risk almost always remains.
- D. Residual risk is the same as inherent risk  
  _Rationale:_ Inherent risk is before controls; residual risk is after.
- E. Residual risk never needs to be documented  
  _Rationale:_ Residual risk and its acceptance should be documented for governance and assurance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
