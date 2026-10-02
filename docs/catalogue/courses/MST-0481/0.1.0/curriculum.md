# ChatGPT for Customer-Service Knowledge Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0481` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **DESIGN ASSUMPTION** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT for Customer-Service Knowledge Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Base support answers on approved sources
2. Produce consistent, empathetic customer replies
3. Handle sensitive data and escalations safely
4. Apply confidentiality, accuracy and human-review controls to the workflow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of ChatGPT, the quality of live AI outputs, and professional judgement on accepting AI suggestions are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 Grounding in knowledge (25%, design assumption)

- Worked applications: (1) Draft a reply grounded in a provided policy article; (2) Decide when no approved answer exists and must escalate
- Common misconception addressed: Letting the model invent a policy that is not in the knowledge base
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Using an approved knowledge base | 80 | 6 |
| M01L02 | Grounding replies | 80 | 6 |
| M01L03 | When to escalate | 80 | 6 |

### M02 Response quality and tone (25%, design assumption)

- Worked applications: (1) Rewrite a blunt reply to be empathetic and on-brand; (2) Standardise structure across common ticket types
- Common misconception addressed: Assuming one tone fits every customer situation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tone and empathy | 80 | 6 |
| M02L02 | Response templates | 80 | 6 |
| M02L03 | Consistency across agents | 80 | 6 |

### M03 Privacy and escalation (25%, design assumption)

- Worked applications: (1) Redact personal data before pasting a ticket into ChatGPT; (2) Route a complaint that needs a human owner
- Common misconception addressed: Pasting full customer records into a consumer chatbot
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Customer data privacy | 80 | 6 |
| M03L02 | Escalation paths | 80 | 6 |
| M03L03 | Human review of sensitive cases | 80 | 6 |

### M04 Govern and review AI output (25%, design assumption)

- Worked applications: (1) Draft a rule for what information may be pasted into ChatGPT for this task; (2) Design a human review checkpoint before the output is used or sent
- Common misconception addressed: Assuming AI output is accurate and confidential by default without any review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Confidentiality and data handling | 80 | 6 |
| M04L02 | Accuracy, bias and disclosure | 80 | 6 |
| M04L03 | Human-in-the-loop review and sign-off | 80 | 6 |

## Integrative case

A support lead uses ChatGPT to improve a help desk: ground replies in an approved knowledge base, draft consistent on-brand responses, handle escalation and privacy, and keep a human check on sensitive cases.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0481-final-protected | 72 | 72 | yes |
| MST-0481-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Grounding in knowledge | 18 |
| Response quality and tone | 18 |
| Privacy and escalation | 18 |
| Govern and review AI output | 18 |

Minimum reviewed item bank: 456 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0481-Q0001** (single-answer, Select ONE) A customer asks about a policy not in the approved knowledge base. Best action?

- A. Escalate rather than let the model invent an answer **(key)**  
  _Rationale:_ Correct: ungrounded policy answers risk being wrong; escalation protects accuracy.
- B. Let ChatGPT guess a plausible policy  
  _Rationale:_ Inventing policy can mislead customers and create liability.
- C. Tell the customer the AI is always right  
  _Rationale:_ Overclaiming accuracy is unsafe and untrue.
- D. Ignore the question  
  _Rationale:_ Ignoring the customer fails the service goal.

**MST-0481-Q0002** (single-answer, Select ONE) Before pasting a support ticket into ChatGPT, what should an agent do?

- A. Remove or mask personal data not needed for the task **(key)**  
  _Rationale:_ Correct: minimising personal data protects customer privacy.
- B. Include every field for completeness  
  _Rationale:_ Oversharing personal data creates privacy risk.
- C. Add the customer's payment details  
  _Rationale:_ Payment data should never be pasted into a consumer tool.
- D. Nothing; it is automatically private  
  _Rationale:_ Consumer tools are not automatically safe for personal data.

**MST-0481-Q0003** (multiple-answer, Select TWO) Which TWO keep AI-assisted support replies consistent and safe? (Select TWO)

- A. Ground replies in an approved knowledge base **(key)**  
  _Rationale:_ Correct: grounding keeps answers accurate and consistent.
- B. Use shared templates for common ticket types **(key)**  
  _Rationale:_ Correct: templates standardise structure and tone across agents.
- C. Let each agent invent policy on the spot  
  _Rationale:_ Ad-hoc policy creates inconsistent, risky answers.
- D. Skip human review on sensitive complaints  
  _Rationale:_ Sensitive cases need a human check.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
