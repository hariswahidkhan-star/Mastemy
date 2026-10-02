# Microsoft Azure AI Fundamentals (AI-901) Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1413` v0.1.0 | Batch 1 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AI-901 |
| Version basis | Skills measured as of 2026-04-15 (AI-900 retired 2026-06-30) |
| Evidence | **verified-official-source** - sources: SRC-MS-AI901 |
| Legacy IDs | MST-MIC-MS-AI901-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply responsible AI principles to solution scenarios
2. Select appropriate AI models, deployment options and configuration parameters
3. Identify generative, agentic, text, speech, vision and information-extraction workloads
4. Describe how to build lightweight apps and agents with Microsoft Foundry and Foundry Tools

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Identify AI concepts and capabilities (40-45%)

- Worked applications: (1) Map six business problems to AI workload types and responsible-AI principles; (2) Tune temperature/top-p for a deterministic FAQ answerer vs a brainstorming tool
- Common misconception addressed: Thinking a bigger model always gives more accurate, fair answers
- Module check: 52 items / 52 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Describe principles of responsible AI | 170 | 10 |
| M01L02 | Identify AI model components and configurations | 170 | 10 |
| M01L03 | Identify AI workloads | 170 | 10 |

### M02 Implement AI solutions by using Microsoft Foundry (55-60%)

- Worked applications: (1) Assemble a grounded agent with a knowledge source and a tool in Foundry (demonstration); (2) Choose between speech, vision and Content Understanding for an intake workflow
- Common misconception addressed: Assuming grounding removes the need for output verification
- Module check: 52 items / 52 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Implement generative AI apps and agents by using Foundry | 172 | 10 |
| M02L02 | Implement AI solutions for text and speech by using Foundry | 172 | 10 |
| M02L03 | Implement AI solutions with computer vision and image-generation capabilities by using Foundry | 172 | 10 |
| M02L04 | Implement AI solutions for information extraction by using Foundry | 174 | 10 |

## Integrative case

A retailer wants a customer-service agent that reads policy PDFs, answers in two languages and escalates refunds: select models and Foundry tools, apply responsible-AI controls and define evaluation checks.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - length not stated on the fetched study guide.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1413-practice-form-A | 45 | 45 | yes |
| MST-1413-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1413-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1413-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Identify AI concepts and capabilities | 19 |
| Implement AI solutions by using Microsoft Foundry | 26 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1413-Q0001** (single-answer, Select ONE) An AI loan-approval system gives very different approval rates to applicants with otherwise similar profiles but different genders. Which responsible AI principle is most directly affected?

- A. Fairness **(key)**  
  _Rationale:_ Correct: fairness means AI systems treat similar people in similar ways.
- B. Transparency  
  _Rationale:_ Transparency is about explaining how the system works. The problem here is unequal outcomes.
- C. Reliability and safety  
  _Rationale:_ Reliability is about performing consistently under expected conditions, not about bias between groups.
- D. Inclusiveness  
  _Rationale:_ Inclusiveness is about designing for people of every ability. Fairness is the closer match.

**MST-1413-Q0002** (single-answer, Select ONE) You need to pull fields from scanned invoices, and also from recorded call audio, using one Foundry Tools capability. Which should you choose?

- A. Azure Speech in Foundry Tools  
  _Rationale:_ Speech covers recognition and synthesis. It does not extract structured fields from documents.
- B. Azure Content Understanding in Foundry Tools **(key)**  
  _Rationale:_ Correct: the skills outline lists Content Understanding for extraction from documents, images, audio and video.
- C. An image-generation model  
  _Rationale:_ Image-generation models create images. They do not extract fields.
- D. A text analysis sentiment feature  
  _Rationale:_ Sentiment analysis scores opinion. It does not extract invoice fields or handle audio.

**MST-1413-Q0003** (single-answer, Select ONE) Which change is MOST likely to make a deployed generative model's answers more deterministic?

- A. Increasing temperature  
  _Rationale:_ A higher temperature increases randomness.
- B. Lowering temperature **(key)**  
  _Rationale:_ Correct: a lower temperature concentrates sampling on the most likely tokens, so output is more consistent.
- C. Adding more sample images to the prompt  
  _Rationale:_ Image inputs do not control sampling randomness.
- D. Switching to a speech model  
  _Rationale:_ Changing the modality does not address determinism.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
