# OpenAI Realtime + Twilio + CRM: Supervised Voice-Service Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0816` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Realtime + Twilio + CRM: Supervised Voice-Service Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a supervised voice-service with consent and escalation
2. Use OpenAI Realtime sessions, turns and transcripts
3. Connect Twilio telephony to the realtime model
4. Integrate a CRM with human-in-the-loop confirmation
5. Test, log and roll out the voice service under supervision

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Voice-service scope and risk (MASTEMY-DESIGN 20%)

- Worked applications: (1) Scope a voice assistant that books callbacks, not payments; (2) Define when the call must escalate to a human
- Common misconception addressed: Letting a voice agent complete high-risk actions unsupervised
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Supervised voice use cases and limits | 120 | 7 |
| M01L02 | Consent, disclosure and escalation | 120 | 7 |

### M02 OpenAI Realtime basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set up a realtime session that transcribes a caller turn; (2) Handle a caller interrupting the agent mid-sentence
- Common misconception addressed: Assuming a transcript is perfect and acting on misheard input
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Realtime sessions and turns | 120 | 7 |
| M02L02 | Latency, interruptions and transcripts | 120 | 7 |

### M03 Twilio telephony (MASTEMY-DESIGN 20%)

- Worked applications: (1) Route an inbound Twilio call into a media stream; (2) Bridge Twilio audio to the realtime session
- Common misconception addressed: Ignoring call-drop and reconnection handling
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Calls, media streams and routing | 120 | 7 |
| M03L02 | Connecting Twilio to the realtime model | 120 | 7 |

### M04 CRM integration and oversight (MASTEMY-DESIGN 20%)

- Worked applications: (1) Look up a caller in the CRM and confirm identity safely; (2) Require human confirmation before writing a CRM change
- Common misconception addressed: Writing CRM changes from unverified voice input
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading and writing CRM records | 120 | 7 |
| M04L02 | Human-in-the-loop confirmation | 120 | 7 |

### M05 Testing, logging and launch (MASTEMY-DESIGN 20%)

- Worked applications: (1) Test mis-hear, interruption and escalation scenarios; (2) Log transcripts and outcomes for review
- Common misconception addressed: Launching to all callers before a supervised pilot
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Scenario testing and transcripts | 120 | 7 |
| M05L02 | Monitoring and controlled rollout | 120 | 7 |

## Integrative case

Design a supervised voice-service: scope it to low-risk actions with clear escalation, stream a Twilio call into an OpenAI Realtime session, transcribe and handle interruptions, look up the caller in the CRM, require a human confirmation before any write, and test mis-hear and escalation paths before a supervised pilot.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0816-final-protected | 40 | 50 | yes |
| MST-0816-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Voice-service scope and risk | 8 |
| OpenAI Realtime basics | 8 |
| Twilio telephony | 8 |
| CRM integration and oversight | 8 |
| Testing, logging and launch | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0816-Q0001** (single-answer, Select ONE) Why require human confirmation before a voice agent writes a change to the CRM?

- A. Speech recognition can mishear, so a person should confirm before committing **(key)**  
  _Rationale:_ Correct: human confirmation guards against acting on misheard input.
- B. Because the CRM cannot accept writes otherwise  
  _Rationale:_ The CRM can accept writes; the control is about safety.
- C. Because transcripts are always accurate  
  _Rationale:_ Transcripts can contain recognition errors.
- D. Because confirmation speeds up the call  
  _Rationale:_ Confirmation adds a safety step, not speed.

**MST-0816-Q0002** (multiple-answer, Select TWO) Which TWO belong in a supervised voice-service design? (Select TWO.)

- A. A defined point at which the call escalates to a human **(key)**  
  _Rationale:_ Correct: escalation handles cases beyond the agent's safe scope.
- B. Consent and disclosure that the caller is speaking to an assistant **(key)**  
  _Rationale:_ Correct: disclosure and consent are baseline requirements.
- C. Unsupervised completion of high-risk actions  
  _Rationale:_ High-risk actions should not be unsupervised.
- D. Launching to all callers with no pilot  
  _Rationale:_ A supervised pilot should precede full launch.

**MST-0816-Q0003** (single-answer, Select ONE) A caller interrupts the agent mid-sentence. What must a realtime voice design handle?

- A. Turn interruption, stopping the agent and listening to the caller **(key)**  
  _Rationale:_ Correct: natural calls require handling interruptions gracefully.
- B. Ignoring the caller until the agent finishes  
  _Rationale:_ Ignoring interruptions produces an unusable experience.
- C. Ending the call on any interruption  
  _Rationale:_ Ending the call on interruption is not acceptable handling.
- D. Assuming callers never interrupt  
  _Rationale:_ Callers interrupt routinely.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
