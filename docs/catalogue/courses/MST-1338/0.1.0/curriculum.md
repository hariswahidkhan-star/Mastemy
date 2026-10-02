# LLM Application Security (Prompt Injection, Data Leakage)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1338` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain the main security risks specific to LLM applications
2. Recognise prompt injection and jailbreak patterns
3. Describe data leakage and sensitive-output risks
4. Apply input/output controls and least-privilege tool access
5. Plan monitoring and incident response for LLM apps

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The LLM threat landscape (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map an app's components to new attack surfaces; (2) Distinguish an LLM-specific risk from a generic one
- Common misconception addressed: Assuming classic web security fully covers LLM apps
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why LLM apps need their own threat model | 72 | 8 |
| M01L02 | OWASP-style LLM risk categories | 72 | 8 |

### M02 Prompt injection and jailbreaks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot an indirect prompt-injection payload in retrieved text; (2) Explain why instructions in untrusted data are dangerous
- Common misconception addressed: Thinking a strong system prompt alone prevents injection
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Direct and indirect prompt injection | 72 | 8 |
| M02L02 | Jailbreak patterns and limits of prompt defences | 72 | 8 |

### M03 Data leakage and sensitive outputs (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify where secrets could enter a prompt; (2) Judge whether an output discloses restricted data
- Common misconception addressed: Believing the model cannot reveal its context or secrets
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Training-data and context leakage | 72 | 8 |
| M03L02 | Secrets, PII and output filtering | 72 | 8 |

### M04 Controls and least privilege (MASTEMY-DESIGN 20%)

- Worked applications: (1) Scope a tool's permissions to least privilege; (2) Design an output filter for a risky action
- Common misconception addressed: Giving an agent broad tool access for convenience
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Input validation and output filtering | 72 | 8 |
| M04L02 | Tool sandboxing and least-privilege access | 72 | 8 |

### M05 Monitoring and response (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose what to log for an abuse investigation; (2) Draft an incident runbook step for a confirmed injection
- Common misconception addressed: Assuming LLM incidents look like normal app errors
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Logging, detection and rate limits | 72 | 8 |
| M05L02 | Incident response for LLM apps | 72 | 8 |

## Integrative case

An LLM assistant with access to internal tools and documents is about to go live. Identify the injection and leakage risks introduced by its tools and retrieval, propose layered mitigations, scope the assistant's permissions to least privilege, and define what to log so an incident can be investigated.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1338-final-protected | 25 | 25 | yes |
| MST-1338-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The LLM threat landscape | 5 |
| Prompt injection and jailbreaks | 5 |
| Data leakage and sensitive outputs | 5 |
| Controls and least privilege | 5 |
| Monitoring and response | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1338-Q0001** (single-answer, Select ONE) What characterises an indirect prompt-injection attack?

- A. Malicious instructions are hidden in content the model later retrieves or reads **(key)**  
  _Rationale:_ Correct: indirect injection plants instructions in data the model ingests, not the user's direct message.
- B. The attacker guesses the model's weights  
  _Rationale:_ Weight guessing is not prompt injection.
- C. The model runs out of memory  
  _Rationale:_ Resource exhaustion is a different class of issue.
- D. The user asks a factual question  
  _Rationale:_ A normal question is not an injection attack.

**MST-1338-Q0002** (multiple-answer, Select TWO) Which TWO controls best reduce the impact of a successful prompt injection in a tool-using agent? (Select TWO.)

- A. Grant each tool only the least privilege it needs **(key)**  
  _Rationale:_ Correct: least privilege limits what a hijacked agent can do.
- B. Require confirmation or filtering before high-impact actions **(key)**  
  _Rationale:_ Correct: gating risky actions blocks injected commands from executing freely.
- C. Place all secrets directly in the system prompt  
  _Rationale:_ That increases leakage risk rather than reducing injection impact.
- D. Trust any instruction found in retrieved documents  
  _Rationale:_ Trusting untrusted data is the root of indirect injection.

**MST-1338-Q0003** (single-answer, Select ONE) Why is a well-written system prompt insufficient on its own to stop jailbreaks?

- A. Models can be steered by adversarial inputs that override prompt instructions **(key)**  
  _Rationale:_ Correct: prompt-level defences are probabilistic and can be bypassed, so layered controls are needed.
- B. System prompts are never sent to the model  
  _Rationale:_ They are sent; the issue is they are not a hard guarantee.
- C. Jailbreaks only affect image models  
  _Rationale:_ Jailbreaks affect text LLMs directly.
- D. A system prompt makes the model deterministic  
  _Rationale:_ It does not guarantee determinism or safety.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
