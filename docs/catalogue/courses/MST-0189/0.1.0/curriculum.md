# Microsoft AB-731: AI Transformation Leader

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0189` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AB-731 |
| Version basis | Skills measured as of 2026-07-22 |
| Evidence | **verified-official-source** - sources: SRC-MS-AB731 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 56 / module checks 84 / cumulative 100 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

Split note: Split adjusted from default 5/7/8% to lesson 56 / module 84 / cumulative 100 min so the required cumulative forms fit; total assessment stays 240 min (20%).

## Learning outcomes

1. Explain generative AI concepts, model types, cost drivers (tokens, ROI) and limitations for business decisions
2. Explain prompt engineering, grounding and RAG, data quality and secure-AI considerations
3. Map business processes to Microsoft 365 Copilot, Copilot Studio, Microsoft Graph and Foundry Tools, including build/buy/extend decisions
4. Establish responsible-AI governance, an AI council, adoption team and champions programme
5. Plan licensing and subscription models for Copilot and Foundry Tools

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Identify the business value of generative AI solutions (35-40%)

- Worked applications: (1) Estimate token cost and ROI for an AI customer-reply assistant; (2) Decide between a pretrained and a fine-tuned model for a domain task
- Common misconception addressed: Believing generative AI is the right tool for every prediction problem
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Identify the foundational concepts of generative AI | 184 | 9 |
| M01L02 | Identify benefits and capabilities of generative AI solutions | 185 | 9 |

### M02 Identify benefits, capabilities, and opportunities for Microsoft's AI apps and services (35-40%)

- Worked applications: (1) Choose Copilot, Copilot Studio or Foundry for three business processes; (2) Decide build vs buy vs extend for a sales assistant
- Common misconception addressed: Assuming Researcher and Analyst are interchangeable
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Identify benefits and capabilities of Microsoft 365 Copilot and Microsoft Copilot | 184 | 9 |
| M02L02 | Identify benefits and capabilities of Foundry Tools | 185 | 9 |

### M03 Identify an implementation and adoption strategy for Microsoft's AI apps and services (20-25%)

- Worked applications: (1) Charter an AI council with decision rights; (2) Design a champions programme and adoption metrics
- Common misconception addressed: Treating adoption as complete once licences are assigned
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Align an AI strategy with Microsoft responsible AI policies | 111 | 9 |
| M03L02 | Plan for AI adoption across the organization | 111 | 9 |

## Integrative case

A logistics group's executive committee must decide where to apply AI in customer service, finance and operations within a fixed budget: compare options, set governance, choose licences and plan adoption.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0189-practice-form-A | 45 | 45 | yes |
| MST-0189-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0189-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0189-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Identify the business value of generative AI solutions | 17 |
| Identify benefits, capabilities, and opportunities for Microsoft's AI apps and services | 17 |
| Identify an implementation and adoption strategy for Microsoft's AI apps and services | 11 |

Minimum reviewed item bank: 456 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0189-Q0001** (single-answer, Select ONE) A finance team wants answers grounded in its own policy documents without retraining a model. Which approach fits best?

- A. Retrieval-augmented generation over the policy documents **(key)**  
  _Rationale:_ Correct: RAG grounds responses in retrieved organisational content without changing model weights.
- B. Fine-tune a model every time a policy changes  
  _Rationale:_ Fine-tuning is costly and slow for frequently changing documents and does not provide citations by itself.
- C. Raise the model temperature  
  _Rationale:_ Temperature affects randomness, not grounding.
- D. Use a larger context window and paste nothing  
  _Rationale:_ Context size without the documents provides no grounding.

**MST-0189-Q0002** (multiple-answer, Select TWO) Which TWO are cost drivers you should include when estimating generative AI usage costs? (Select TWO.)

- A. Number of input and output tokens processed **(key)**  
  _Rationale:_ Correct: the outline names tokens as a cost driver.
- B. Volume of requests and chosen model **(key)**  
  _Rationale:_ Correct: request volume multiplied by per-model token pricing drives spend.
- C. The number of slides in the business case  
  _Rationale:_ Presentation length does not affect AI usage cost.
- D. The colour theme of the Copilot interface  
  _Rationale:_ UI settings have no cost effect.

**MST-0189-Q0003** (single-answer, Select ONE) A leader wants a body that sets AI priorities, oversight and cross-functional alignment. What should be established?

- A. An AI council **(key)**  
  _Rationale:_ Correct: establishing an AI council is an explicit objective in the adoption domain.
- B. A single power user  
  _Rationale:_ One person cannot provide cross-functional oversight.
- C. A DLP policy only  
  _Rationale:_ DLP is a control, not a governance body.
- D. A larger Copilot licence pool  
  _Rationale:_ Licences do not create governance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
