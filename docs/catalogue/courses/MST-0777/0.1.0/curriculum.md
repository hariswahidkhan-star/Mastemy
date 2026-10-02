# Amazon Bedrock Guardrails and Responsible AI Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0777` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Web Services (AWS) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-BEDROCK-GUARDRAILS (https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon Bedrock Guardrails and Responsible AI Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain responsible-AI risks for generative applications
2. Configure Bedrock Guardrails for content, topics and sensitive data
3. Detect and redact personally identifiable information
4. Reduce hallucination risk with grounding and contextual checks
5. Test and measure guardrail effectiveness
6. Monitor, log and govern responsible-AI operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Responsible-AI foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map risks to controls for a sample assistant; (2) Place a guardrail in the request/response flow
- Common misconception addressed: Believing a single filter removes all responsible-AI risk
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Risks: harmful content, bias, privacy, hallucination | 120 | 5 |
| M01L02 | Where guardrails fit in an application | 120 | 5 |

### M02 Content and topic controls (MASTEMY-DESIGN 25%)

- Worked applications: (1) Configure content filters at chosen strengths; (2) Block a denied topic and test it
- Common misconception addressed: Setting filters so strict that legitimate queries are blocked
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Content filters and strength settings | 120 | 5 |
| M02L02 | Denied topics and word filters | 120 | 5 |

### M03 Privacy and grounding (MASTEMY-DESIGN 25%)

- Worked applications: (1) Redact PII from inputs and outputs; (2) Add a grounding check that flags unsupported answers
- Common misconception addressed: Logging raw prompts that contain unredacted personal data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | PII detection and redaction | 120 | 5 |
| M03L02 | Contextual grounding and hallucination checks | 120 | 5 |

### M04 Testing and governance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Evaluate a guardrail against a red-team test set; (2) Set up logging and a review process
- Common misconception addressed: Declaring guardrails effective without an adversarial test set
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Measuring guardrail effectiveness | 120 | 5 |
| M04L02 | Logging, monitoring and governance | 120 | 5 |

## Integrative case

Add a responsible-AI layer to a public-facing Bedrock assistant: define denied topics and content filters, redact PII in inputs and outputs, add contextual grounding checks, test the guardrail against a red-team set, and set up logging and governance for ongoing review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0777-final-protected | 40 | 50 | yes |
| MST-0777-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Responsible-AI foundations | 10 |
| Content and topic controls | 10 |
| Privacy and grounding | 10 |
| Testing and governance | 10 |

Minimum reviewed item bank: 328 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0777-Q0001** (single-answer, Select ONE) A support assistant occasionally echoes customers' personal data in its logged responses. Which guardrail capability most directly addresses this?

- A. PII detection and redaction on inputs and outputs **(key)**  
  _Rationale:_ Correct: redacting PII prevents personal data from appearing in responses and logs.
- B. A larger model  
  _Rationale:_ Model size does not prevent PII exposure.
- C. Higher temperature  
  _Rationale:_ Temperature does not address privacy.
- D. Removing the system prompt  
  _Rationale:_ Removing guidance does not redact personal data.

**MST-0777-Q0002** (multiple-answer, Select TWO) Which TWO statements about evaluating guardrails are sound? (Select TWO.)

- A. Test against an adversarial red-team set, not only benign inputs **(key)**  
  _Rationale:_ Correct: adversarial tests reveal real bypasses.
- B. Track both blocked-harmful and wrongly-blocked-benign rates **(key)**  
  _Rationale:_ Correct: both over- and under-blocking matter.
- C. Assume any configured guardrail is fully effective  
  _Rationale:_ Effectiveness must be measured, not assumed.
- D. Only test inputs the guardrail was designed around  
  _Rationale:_ That biases results and misses gaps.

**MST-0777-Q0003** (single-answer, Select ONE) Stakeholders worry a public assistant could answer questions on a prohibited subject. Which guardrail feature fits best?

- A. Configure a denied topic for that subject **(key)**  
  _Rationale:_ Correct: denied topics block responses on defined subjects.
- B. Increase max tokens  
  _Rationale:_ Token limits do not restrict subject matter.
- C. Switch to a smaller model  
  _Rationale:_ Model size does not enforce topic policy.
- D. Disable logging  
  _Rationale:_ Disabling logging hides activity rather than restricting topics.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
