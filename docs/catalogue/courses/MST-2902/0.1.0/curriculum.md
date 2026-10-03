# Make Your Own Chatbot (Ages 11-13)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2902` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal blueprint (no external syllabus) |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Make Your Own Chatbot (Ages 11-13) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe what a chatbot is and give examples
2. Plan a chatbot's purpose and the things it should handle
3. Create rules or intents that match what a user types
4. Design friendly, clear responses for a chatbot
5. Handle inputs the chatbot does not understand
6. Test a chatbot and improve it from real conversations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What is a chatbot? (25% (design weight), design weight)

- Worked applications: (1) Decide one clear purpose for your chatbot; (2) List five things a user might ask it
- Common misconception addressed: Thinking a chatbot can sensibly answer absolutely anything
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Chatbots around us and how they reply | 120 | 7 |
| M01L02 | Rule-based vs example-based chatbots | 120 | 7 |

### M02 Planning a chatbot (25% (design weight), design weight)

- Worked applications: (1) Group similar user messages into one intent; (2) Write the exact phrases that trigger an intent
- Common misconception addressed: Thinking an intent only works for one exact sentence
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Choosing a purpose and scope | 120 | 7 |
| M02L02 | Listing the things users might say | 120 | 7 |

### M03 Intents and responses (25% (design weight), design weight)

- Worked applications: (1) Write a friendly reply for a greeting intent; (2) Rewrite a confusing reply to be clearer
- Common misconception addressed: Thinking longer replies are always better replies
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Matching user input to an intent | 120 | 7 |
| M03L02 | Writing clear, friendly responses | 120 | 7 |

### M04 Fallbacks and testing (25% (design weight), design weight)

- Worked applications: (1) Add a polite fallback for unknown input; (2) Improve the bot after testing it on a friend
- Common misconception addressed: Thinking a chatbot never needs a fallback response
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Handling 'I did not understand' gracefully | 120 | 7 |
| M04L02 | Testing and improving from conversations | 120 | 7 |

## Integrative case

Learners design and build a simple 'school helper' chatbot: they choose its purpose, list likely questions, group them into intents with trigger phrases, write friendly responses, add a polite fallback for unknown input, and improve it after testing with a classmate.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2902-final-protected | 40 | 40 | yes |
| MST-2902-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What is a chatbot? | 10 |
| Planning a chatbot | 10 |
| Intents and responses | 10 |
| Fallbacks and testing | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2902-Q0001** (single-answer, Select ONE) Why does a chatbot need a 'fallback' response?

- A. So it can reply politely when it does not understand what the user typed **(key)**  
  _Rationale:_ Correct: a fallback handles inputs the bot cannot match.
- B. So it can answer every possible question perfectly  
  _Rationale:_ A fallback is for when it cannot match, not perfect answers.
- C. So it never has to reply at all  
  _Rationale:_ A fallback is a reply for unknown input.
- D. So it can ignore the user  
  _Rationale:_ A fallback politely responds rather than ignoring.

**MST-2902-Q0002** (multiple-answer, Select TWO) Which TWO are good steps when planning a chatbot? (Select TWO.)

- A. Choosing a clear purpose for the bot **(key)**  
  _Rationale:_ Correct: a clear purpose keeps the bot focused.
- B. Listing the things users are likely to say **(key)**  
  _Rationale:_ Correct: anticipating inputs helps design intents.
- C. Promising it can answer any question in the world  
  _Rationale:_ No bot can handle everything; scope should be realistic.
- D. Hiding what the bot is for from everyone  
  _Rationale:_ Users should know the bot's purpose to use it well.

**MST-2902-Q0003** (single-answer, Select ONE) Several users type 'hi', 'hello' and 'hey'. How should your chatbot handle these?

- A. Group them into one greeting intent that triggers the same friendly reply **(key)**  
  _Rationale:_ Correct: similar phrases map to one intent with one response.
- B. Make a totally separate program for each word  
  _Rationale:_ Grouping them into one intent is far simpler.
- C. Only respond to the exact word 'hi'  
  _Rationale:_ An intent should cover similar phrasings.
- D. Ignore all of them  
  _Rationale:_ Greetings should get a friendly reply.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
