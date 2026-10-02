# Building Chatbots End to End

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1348` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the components of an end-to-end LLM chatbot
2. Design conversation state and context management
3. Integrate retrieval and tools into a chatbot
4. Apply safety, fallback and escalation handling
5. Evaluate and monitor a chatbot in production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Chatbot architecture (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draw the flow from user message to reply; (2) Identify each component's responsibility
- Common misconception addressed: Thinking a chatbot is just a single prompt
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | End-to-end chatbot components | 72 | 8 |
| M01L02 | Request flow and responsibilities | 72 | 8 |

### M02 Conversation state and context (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide what to keep in conversation memory; (2) Summarise a long chat to fit context
- Common misconception addressed: Resending the entire history forever
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Managing conversation state | 72 | 8 |
| M02L02 | Context windows and summarisation | 72 | 8 |

### M03 Grounding with retrieval and tools (MASTEMY-DESIGN 20%)

- Worked applications: (1) Ground an answer in retrieved help content; (2) Add a tool call for a live lookup
- Common misconception addressed: Letting the bot answer from memory instead of sources
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Retrieval-grounded answers | 72 | 8 |
| M03L02 | Tool and API integration | 72 | 8 |

### M04 Safety and escalation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a fallback when confidence is low; (2) Route a sensitive case to a human
- Common misconception addressed: Assuming the bot can handle every request
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Fallbacks and safe responses | 72 | 8 |
| M04L02 | Human escalation paths | 72 | 8 |

### M05 Evaluation and operations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define success metrics for the chatbot; (2) Monitor live conversations for failures
- Common misconception addressed: Launching without a way to measure quality
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Pre-launch evaluation | 72 | 8 |
| M05L02 | Monitoring and iteration | 72 | 8 |

## Integrative case

A company wants a customer-facing chatbot grounded in its help content. Design the full flow from message to answer, decide how conversation state and retrieval are managed, add safety and human-escalation paths, and define how the chatbot is evaluated before and after launch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1348-final-protected | 25 | 25 | yes |
| MST-1348-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Chatbot architecture | 5 |
| Conversation state and context | 5 |
| Grounding with retrieval and tools | 5 |
| Safety and escalation | 5 |
| Evaluation and operations | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1348-Q0001** (single-answer, Select ONE) Why is retrieval grounding valuable in a customer-support chatbot?

- A. It bases answers on the company's actual help content, reducing fabrication **(key)**  
  _Rationale:_ Correct: grounding in source content keeps answers accurate and current.
- B. It makes the model forget the conversation  
  _Rationale:_ Grounding supplies sources; it does not erase conversation state.
- C. It removes the need for any safety controls  
  _Rationale:_ Safety controls are still required.
- D. It guarantees the bot never needs a human  
  _Rationale:_ Escalation is still needed for some cases.

**MST-1348-Q0002** (multiple-answer, Select TWO) Which TWO are important design elements for a production customer chatbot? (Select TWO.)

- A. A fallback or escalation path when the bot is unsure **(key)**  
  _Rationale:_ Correct: safe fallback and human escalation handle cases the bot cannot.
- B. Monitoring of live conversations for quality and failures **(key)**  
  _Rationale:_ Correct: production monitoring catches regressions and abuse.
- C. Resending the full chat history on every turn regardless of length  
  _Rationale:_ That overflows context and wastes cost; state must be managed.
- D. Answering only from the model's memory with no sources  
  _Rationale:_ Ungrounded answers increase fabrication risk.

**MST-1348-Q0003** (single-answer, Select ONE) A chatbot's prompts grow until they exceed the context window as conversations get long. What is the standard fix?

- A. Summarise or truncate older turns to keep the working context in budget **(key)**  
  _Rationale:_ Correct: managing state via summarisation keeps conversations within the window.
- B. Switch to a stateless single call  
  _Rationale:_ That loses needed conversation context.
- C. Raise the temperature  
  _Rationale:_ Temperature does not change context length.
- D. Disable retrieval  
  _Rationale:_ Disabling grounding harms accuracy and does not fix context size.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
