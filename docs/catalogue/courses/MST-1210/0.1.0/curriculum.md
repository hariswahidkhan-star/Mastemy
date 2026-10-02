# AI for Cybersecurity Analysts and SOC Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1210` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify where AI supports SOC triage, detection and investigation and where it does not
2. Use AI to assist alert triage and log summarisation with analyst verification
3. Apply AI to threat research and report writing responsibly
4. Recognise adversarial, bias, hallucination and data-sensitivity risks in security AI
5. Keep human decision-making, auditability and chain-of-custody over AI-assisted work

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the tools and workflows taught, the quality of live outputs, and professional judgement on the job are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 AI in the SOC (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sort SOC tasks by AI suitability; (2) Explain why containment stays an analyst decision
- Common misconception addressed: Letting AI auto-contain without human confirmation
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What AI helps with in security operations | 96 | 8 |
| M01L02 | Fit and limits across the SOC workflow | 96 | 8 |
### M02 Triage and investigation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Verify an AI alert summary against raw logs; (2) Decide which AI-prioritised alerts to investigate first
- Common misconception addressed: Closing an alert on an AI summary without checking the logs
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI-assisted alert triage | 96 | 8 |
| M02L02 | Log and timeline summarisation | 96 | 8 |
### M03 Threat research and reporting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Corroborate an AI threat claim with a credible source; (2) Fact-check an AI-drafted incident report
- Common misconception addressed: Citing an AI threat claim without a verifiable source
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AI for threat intelligence research | 96 | 8 |
| M03L02 | Drafting and verifying incident reports | 96 | 8 |
### M04 Adversarial and data risk (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a prompt-injection attempt in ingested content; (2) Decide what incident data may be entered into a tool
- Common misconception addressed: Feeding attacker-controlled text into AI without caution
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Adversarial and prompt-injection risks | 96 | 8 |
| M04L02 | Data sensitivity and confidentiality | 96 | 8 |
### M05 Decisions and auditability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a human checkpoint before an AI-driven block; (2) Document AI use to preserve investigation integrity
- Common misconception addressed: Letting AI assistance break chain-of-custody discipline
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Human decision-making and escalation | 96 | 8 |
| M05L02 | Chain of custody and documentation | 96 | 8 |

## Integrative case

A SOC analyst must introduce AI into triage: choose where AI speeds alert summarisation and research, keep containment and escalation decisions human, protect sensitive incident data, and document AI use so investigation findings hold up to review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1210-final-protected | 25 | 25 | yes |
| MST-1210-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in the SOC | 5 |
| Triage and investigation | 5 |
| Threat research and reporting | 5 |
| Adversarial and data risk | 5 |
| Decisions and auditability | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1210-Q0001** (single-answer, Select ONE) AI summarises an alert as benign. What should the analyst do before closing it?

- A. Verify the summary against the underlying logs and evidence **(key)**  
  _Rationale:_ Correct: AI triage summaries must be confirmed against raw evidence before closure.
- B. Close the alert immediately to reduce the queue  
  _Rationale:_ Closing on an unverified summary can miss a real incident.
- C. Escalate every benign alert to management  
  _Rationale:_ Blanket escalation defeats the purpose of triage.
- D. Delete the logs to save storage  
  _Rationale:_ Deleting evidence undermines investigation and custody.

**MST-1210-Q0002** (multiple-answer, Select TWO) Which TWO risks are specific to using AI on attacker-influenced content in a SOC? (Select TWO.)

- A. Prompt injection hidden in ingested text manipulating the AI **(key)**  
  _Rationale:_ Correct: adversaries can embed instructions that subvert AI output.
- B. Sensitive incident data leaking into an uncontrolled tool **(key)**  
  _Rationale:_ Correct: entering incident data into uncontrolled tools risks exposure.
- C. Faster log summarisation for the analyst  
  _Rationale:_ Faster summarisation is a benefit, not a risk.
- D. Having a searchable case history  
  _Rationale:_ Searchable history is a benefit, not a risk.

**MST-1210-Q0003** (single-answer, Select ONE) Why should containment actions not be fully automated from AI output alone?

- A. A wrong automated block can disrupt the business, so a human must confirm consequential actions **(key)**  
  _Rationale:_ Correct: consequential containment needs human judgement to avoid false-positive harm.
- B. AI can never help with containment  
  _Rationale:_ AI can assist; the point is human confirmation of consequential actions.
- C. Automation is always faster and therefore always correct  
  _Rationale:_ Speed does not guarantee correctness.
- D. Containment decisions have no business impact  
  _Rationale:_ Containment can have significant business impact.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
