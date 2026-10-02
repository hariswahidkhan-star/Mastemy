# OpenAI Realtime Voice Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0502` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Realtime Voice Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the realtime voice interaction model and its components
2. Set up a realtime voice session with audio input and output
3. Handle turn-taking, interruptions and tool calls in a voice application
4. Address latency, errors and safety in realtime voice applications

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Setting up a realtime voice session and handling audio, turn-taking and tools are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Realtime foundations (25%)

- Worked applications: (1) Diagram the flow of a single voice turn; (2) List the events in a session lifecycle
- Common misconception addressed: Treating realtime voice like a simple request and response text call
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The realtime interaction model | 120 | 6 |
| M01L02 | Sessions, audio and events | 120 | 6 |

### M02 Building a voice session (25%)

- Worked applications: (1) Configure a session for microphone input; (2) Decide output voice and audio format for a use case
- Common misconception addressed: Buffering the whole utterance before responding, adding needless delay
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Capturing and streaming audio | 120 | 6 |
| M02L02 | Producing spoken responses | 120 | 6 |

### M03 Turn-taking and tools (25%)

- Worked applications: (1) Handle a user interrupting the assistant mid-sentence; (2) Call a lookup tool during a spoken turn
- Common misconception addressed: Ignoring barge-in so the assistant talks over the user
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Interruptions and barge-in | 120 | 6 |
| M03L02 | Tool calls mid-conversation | 120 | 6 |

### M04 Latency, errors and safety (25%)

- Worked applications: (1) Identify three sources of latency in a voice turn; (2) Plan a fallback for when audio drops
- Common misconception addressed: Assuming a dropped connection can be ignored in a live call
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reducing perceived latency | 120 | 6 |
| M04L02 | Errors, fallbacks and safety | 120 | 6 |

## Integrative case

A team builds a hands-free field-support voice assistant: it streams microphone audio, speaks responses, lets the technician interrupt mid-sentence, calls a parts-lookup tool during a spoken turn, and handles dropped audio and latency with graceful fallbacks and safety limits.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0502-final-protected | 72 | 72 | yes |
| MST-0502-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Realtime foundations | 18 |
| Building a voice session | 18 |
| Turn-taking and tools | 18 |
| Latency, errors and safety | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0502-Q0001** (single-answer, Select ONE) How does a realtime voice interaction differ from a standard text request and response?

- A. It streams audio continuously and handles events during the turn, not just one request and reply **(key)**  
  _Rationale:_ Correct: realtime streams audio and events throughout the turn.
- B. It always costs less than a text request  
  _Rationale:_ Cost is not what distinguishes realtime voice.
- C. It never requires handling interruptions  
  _Rationale:_ Realtime voice must handle interruptions (barge-in).
- D. It removes the need for any tools  
  _Rationale:_ Voice apps can still call tools mid-conversation.

**MST-0502-Q0002** (single-answer, Select ONE) Why should a voice assistant avoid buffering the entire user utterance before responding?

- A. It adds perceptible delay and makes the conversation feel unnatural **(key)**  
  _Rationale:_ Correct: waiting for the full utterance increases latency.
- B. It makes the audio format invalid  
  _Rationale:_ Buffering does not invalidate the audio format.
- C. It disables tool calls permanently  
  _Rationale:_ Buffering does not disable tools.
- D. It is required by every voice API  
  _Rationale:_ Streaming, not full buffering, is the realtime approach.

**MST-0502-Q0003** (multiple-answer, Select TWO) Which TWO behaviours should a well-built realtime voice assistant support? (Select TWO)

- A. Barge-in so the user can interrupt the assistant **(key)**  
  _Rationale:_ Correct: supporting interruptions is core to natural voice.
- B. A graceful fallback when the audio connection drops **(key)**  
  _Rationale:_ Correct: live calls must handle dropped audio.
- C. Talking over the user when they try to interrupt  
  _Rationale:_ Talking over the user is a failure, not a feature.
- D. Ignoring connection loss during a call  
  _Rationale:_ Ignoring connection loss degrades the experience.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
