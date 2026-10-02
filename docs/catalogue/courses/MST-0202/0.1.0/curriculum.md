# AWS Certified AI Practitioner

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0202` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | AWS (no affiliation or endorsement) |
| Exam code | AIF-C01 |
| Version basis | DESIGN ASSUMPTION - official outline not retrieved (network egress blocked on issuer site) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked on 2026-10-02; structure is a DESIGN ASSUMPTION pending official confirmation |
| Legacy IDs | MST-AWS-AWS-AIFC01-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain fundamentals of AI, ML and generative AI (design-assumption scope, pending official confirmation)
2. Describe applications and customization of foundation models
3. Describe responsible-AI guidelines
4. Describe security, compliance and governance for AI solutions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Fundamentals of AI and ML (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Fundamentals of AI and ML' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Fundamentals of AI and ML'
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Core AI, ML and deep-learning concepts | 144 | 6 |
| M01L02 | ML development lifecycle and use cases | 144 | 6 |

### M02 Fundamentals of generative AI (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Fundamentals of generative AI' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Fundamentals of generative AI'
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Foundation models and tokens | 144 | 6 |
| M02L02 | Prompt engineering basics | 144 | 6 |

### M03 Applications of foundation models (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Applications of foundation models' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Applications of foundation models'
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Selecting and customizing models | 144 | 6 |
| M03L02 | Retrieval-augmented generation and evaluation | 144 | 6 |

### M04 Guidelines for responsible AI (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Guidelines for responsible AI' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Guidelines for responsible AI'
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Fairness, bias and explainability | 144 | 6 |
| M04L02 | Transparency and safety | 144 | 6 |

### M05 Security, compliance, and governance for AI solutions (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Security, compliance, and governance for AI solutions' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Security, compliance, and governance for AI solutions'
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Securing AI systems and data | 144 | 6 |
| M05L02 | Governance and compliance | 144 | 6 |

## Integrative case

A cloud associate recommends an approach for a customer chatbot: selects a foundation model, adds retrieval-augmented generation over company documents, and lists responsible-AI and security safeguards for the launch.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0202-practice-form-A | 54 | 54 | yes |
| MST-0202-practice-form-B | 54 | 54 | no (optional practice) |
| MST-0202-practice-form-C | 54 | 54 | no (optional practice) |
| MST-0202-final-protected | 54 | 54 | yes |

| Domain | Items per form |
|---|---|
| Fundamentals of AI and ML | 11 |
| Fundamentals of generative AI | 11 |
| Applications of foundation models | 11 |
| Guidelines for responsible AI | 11 |
| Security, compliance, and governance for AI solutions | 10 |

Minimum reviewed item bank: 588 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0202-Q0001** (single-answer, Select ONE) A team wants a foundation-model chatbot to answer using a company's internal policy documents without retraining the model. Which approach fits best?

- A. Retrieval-augmented generation (RAG) that supplies relevant documents at inference time **(key)**  
  _Rationale:_ Correct: RAG injects relevant retrieved content at inference so the model can answer from company data without retraining.
- B. Deleting the model and writing rules by hand  
  _Rationale:_ Hand-written rules forgo the model's capabilities and are not the described approach.
- C. Training a model from scratch on the entire internet  
  _Rationale:_ Training from scratch is unnecessary and far beyond the need.
- D. Disabling all prompts  
  _Rationale:_ A chatbot needs prompts to function.

**MST-0202-Q0002** (single-answer, Select ONE) Which term describes the smaller units of text that a large language model processes?

- A. Tokens **(key)**  
  _Rationale:_ Correct: LLMs process text as tokens.
- B. Pixels  
  _Rationale:_ Pixels are image units, not text units.
- C. Packets  
  _Rationale:_ Packets are networking units, not model text units.
- D. Sectors  
  _Rationale:_ Sectors are storage units, unrelated to model text.

**MST-0202-Q0003** (multiple-answer, Select TWO) Select TWO responsible-AI considerations relevant to deploying a generative-AI application. (Select TWO.)

- A. Assessing and mitigating bias in outputs **(key)**  
  _Rationale:_ Correct: bias assessment is a core responsible-AI consideration.
- B. Providing transparency about AI use and limitations **(key)**  
  _Rationale:_ Correct: transparency about AI use and limitations is a responsible-AI consideration.
- C. Maximizing token count for its own sake  
  _Rationale:_ Inflating tokens is not a responsible-AI goal.
- D. Hiding that AI generated the content from all users  
  _Rationale:_ Concealment undermines transparency.
- E. Removing all logging and oversight  
  _Rationale:_ Removing oversight is contrary to responsible AI.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
