# Guardrails and Content Safety

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1345` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain what guardrails and content safety mean for AI systems
2. Identify categories of unsafe input and output
3. Apply input filtering, output moderation and refusal strategies
4. Balance safety with usefulness and false positives
5. Monitor, test and improve guardrails over time

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Content safety basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) List safety categories relevant to an app; (2) Explain why safety needs layered controls
- Common misconception addressed: Assuming one filter can catch all unsafe content
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What guardrails are and are not | 72 | 8 |
| M01L02 | Categories of harm and policy | 72 | 8 |

### M02 Input-side controls (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design an input classifier for risky requests; (2) Handle an ambiguous borderline request
- Common misconception addressed: Trusting user input to be benign
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Input classification and filtering | 72 | 8 |
| M02L02 | Blocklists, policies and context | 72 | 8 |

### M03 Output-side controls (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add an output moderation step; (2) Write a safe refusal that still helps the user
- Common misconception addressed: Checking only the input and never the output
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Output moderation | 72 | 8 |
| M03L02 | Refusals and safe completions | 72 | 8 |

### M04 Balancing safety and usefulness (MASTEMY-DESIGN 20%)

- Worked applications: (1) Measure false-positive refusals; (2) Tune a threshold to reduce over-blocking
- Common misconception addressed: Treating more blocking as always safer
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | False positives and over-refusal | 72 | 8 |
| M04L02 | Tuning thresholds and policies | 72 | 8 |

### M05 Testing and monitoring guardrails (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a red-team test set for safety; (2) Monitor for new bypass patterns
- Common misconception addressed: Assuming guardrails never need re-testing
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Red-teaming guardrails | 72 | 8 |
| M05L02 | Monitoring and continuous improvement | 72 | 8 |

## Integrative case

An LLM assistant open to the public must avoid producing harmful content while staying useful. Define the safety categories that matter, layer input and output controls, decide how the assistant refuses or de-escalates, and set up monitoring so guardrail gaps are found and fixed.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1345-final-protected | 25 | 25 | yes |
| MST-1345-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Content safety basics | 5 |
| Input-side controls | 5 |
| Output-side controls | 5 |
| Balancing safety and usefulness | 5 |
| Testing and monitoring guardrails | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1345-Q0001** (single-answer, Select ONE) Why should a safety system moderate model outputs and not only user inputs?

- A. A safe-looking prompt can still produce unsafe output, so outputs must be checked too **(key)**  
  _Rationale:_ Correct: harm can appear in the generation even when the input seems benign.
- B. Inputs are never a source of risk  
  _Rationale:_ Inputs are also risky; both sides need controls.
- C. Output moderation makes the model faster  
  _Rationale:_ It adds a check; it is about safety, not speed.
- D. Outputs are always safe by default  
  _Rationale:_ Outputs can be unsafe, which is why they are moderated.

**MST-1345-Q0002** (multiple-answer, Select TWO) Which TWO are real trade-offs when tightening content guardrails? (Select TWO.)

- A. More aggressive blocking increases false-positive refusals of safe requests **(key)**  
  _Rationale:_ Correct: stricter rules refuse more legitimate requests.
- B. Overly strict guardrails can reduce the assistant's usefulness **(key)**  
  _Rationale:_ Correct: safety and usefulness must be balanced.
- C. Tighter guardrails always eliminate every bypass  
  _Rationale:_ No guardrail is perfect; bypasses still occur.
- D. Blocking more content lowers the token cost of answers  
  _Rationale:_ Blocking is a safety measure, not a cost optimisation.

**MST-1345-Q0003** (single-answer, Select ONE) What practice best keeps guardrails effective as new bypass attempts appear?

- A. Ongoing red-teaming and monitoring to find and fix gaps **(key)**  
  _Rationale:_ Correct: continuous testing and monitoring catch new bypasses.
- B. Freezing the guardrails permanently after launch  
  _Rationale:_ Static guardrails fall behind new attacks.
- C. Removing output moderation to save compute  
  _Rationale:_ That weakens safety rather than maintaining it.
- D. Trusting that attackers will stop trying  
  _Rationale:_ Adversaries keep adapting; guardrails must too.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
