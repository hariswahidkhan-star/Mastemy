# Conversational AI Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1397` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 480 min; instruction I = 384 min (80%); assessment A = 96 min (20%) |
| Assessment split | lesson checks 24 / module checks 34 / cumulative 38 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe how conversational AI systems work at a high level
2. Design dialogue flows, intents and fallbacks
3. Craft persona, tone and prompt guidance
4. Plan human handoff and error handling
5. Evaluate conversational AI for safety and quality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Foundations of conversational AI (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide if a task suits a conversational interface; (2) List limits to communicate to users
- Common misconception addressed: Believing a chatbot understands language like a person
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How chat assistants work | 39 | 6 |
| M01L02 | Use cases and realistic limits | 39 | 6 |

### M02 Designing dialogue flows (MASTEMY-DESIGN 20%)

- Worked applications: (1) Sketch a dialogue flow for one task; (2) Design a fallback for an unrecognised request
- Common misconception addressed: Designing only the happy path and ignoring failures
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Intents, turns and context | 39 | 6 |
| M02L02 | Fallbacks and error recovery | 39 | 6 |

### M03 Persona, tone and prompts (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a persona and tone guide; (2) Draft system instructions for an assistant
- Common misconception addressed: Assuming tone takes care of itself without guidance
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Defining a consistent persona | 38 | 6 |
| M03L02 | Prompt and instruction design | 38 | 6 |

### M04 Handoff and reliability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define when a bot must escalate; (2) Design a safe response to a risky request
- Common misconception addressed: Deploying an assistant with no path to a human
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Escalation to humans | 38 | 6 |
| M04L02 | Handling sensitive and risky requests | 38 | 6 |

### M05 Evaluating and improving (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose metrics for conversation quality; (2) Spot a safety gap in a sample transcript
- Common misconception addressed: Assuming a launched assistant needs no monitoring
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Measuring conversation quality | 38 | 6 |
| M05L02 | Safety, bias and ongoing review | 38 | 6 |

## Integrative case

A team is designing a conversational AI assistant for customer support. Define its scope and persona, design dialogue flows and fallbacks, plan handoff to humans, and address safety, tone and evaluation before launch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1397-final-protected | 25 | 25 | yes |
| MST-1397-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations of conversational AI | 5 |
| Designing dialogue flows | 5 |
| Persona, tone and prompts | 5 |
| Handoff and reliability | 5 |
| Evaluating and improving | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1397-Q0001** (single-answer, Select ONE) A conversational assistant does not recognise a user's request. What is the best design response?

- A. Offer a clear fallback or rephrase prompt and a route to help **(key)**  
  _Rationale:_ Correct: good fallbacks recover the conversation and reduce frustration.
- B. Repeat the same question unchanged  
  _Rationale:_ Repetition frustrates users and rarely resolves the issue.
- C. End the conversation silently  
  _Rationale:_ Silent failure leaves the user stuck.
- D. Guess an action and perform it anyway  
  _Rationale:_ Acting on a misunderstood request risks harm.

**MST-1397-Q0002** (multiple-answer, Select TWO) Which TWO practices improve safety in a conversational AI assistant? (Select TWO.)

- A. Provide clear escalation to a human for sensitive cases **(key)**  
  _Rationale:_ Correct: escalation protects users when the bot is out of depth.
- B. Set guardrails for risky or harmful requests **(key)**  
  _Rationale:_ Correct: guardrails prevent unsafe responses.
- C. Let the assistant improvise medical or legal advice  
  _Rationale:_ Improvised high-stakes advice is unsafe.
- D. Hide from users that they are talking to AI  
  _Rationale:_ Concealing automation undermines trust.

**MST-1397-Q0003** (single-answer, Select ONE) Why define a persona and tone guide for a conversational assistant?

- A. To keep responses consistent and appropriate across conversations **(key)**  
  _Rationale:_ Correct: a defined persona drives consistent, fitting tone.
- B. Because tone has no effect on users  
  _Rationale:_ Tone strongly affects user trust and experience.
- C. To make the assistant sound human and hide that it is AI  
  _Rationale:_ Disguising AI harms trust.
- D. Only to satisfy the design team  
  _Rationale:_ Persona guidance serves the user experience, not just the team.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
