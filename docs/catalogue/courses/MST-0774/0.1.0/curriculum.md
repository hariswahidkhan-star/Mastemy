# Amazon Bedrock: Generative AI Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0774` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Web Services (AWS) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-BEDROCK (https://docs.aws.amazon.com/bedrock/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon Bedrock: Generative AI Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Invoke Amazon Bedrock foundation models for text and chat tasks
2. Design prompts and request structured, controllable output
3. Build retrieval-augmented applications with knowledge bases
4. Secure Bedrock access with IAM and manage data handling
5. Evaluate quality, safety and cost of Bedrock applications
6. Deploy and monitor a Bedrock-backed application

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Models and invocation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Invoke a model and constrain it to a JSON schema; (2) Compare two models on the same task
- Common misconception addressed: Treating all foundation models as interchangeable for every task
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Choosing and invoking foundation models | 120 | 5 |
| M01L02 | Prompts, parameters and structured output | 120 | 5 |

### M02 Knowledge bases and RAG (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a knowledge base and answer from it; (2) Return answers with document citations
- Common misconception addressed: Assuming a knowledge base removes all need to verify answers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Knowledge bases and retrieval | 120 | 5 |
| M02L02 | Citations, chunking and freshness | 120 | 5 |

### M03 Security and data handling (MASTEMY-DESIGN 25%)

- Worked applications: (1) Scope an IAM policy to specific Bedrock actions and models; (2) Apply a guardrail to filter unsafe content
- Common misconception addressed: Granting broad bedrock:* permissions to every caller
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | IAM, access control and private connectivity | 120 | 5 |
| M03L02 | Data handling and guardrails | 120 | 5 |

### M04 Evaluation, deployment and cost (MASTEMY-DESIGN 25%)

- Worked applications: (1) Score responses against a rubric on a test set; (2) Monitor latency, token usage and cost for an endpoint
- Common misconception addressed: Launching without an evaluation set and tracking only uptime
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Quality and safety evaluation | 120 | 5 |
| M04L02 | Deployment, monitoring and cost control | 120 | 5 |

## Integrative case

Build a policy-answering assistant on Amazon Bedrock: pick a foundation model, ground answers in a knowledge base over company documents, enforce structured citations, restrict access with IAM, evaluate answer quality and safety, and deploy behind a monitored, cost-bounded API.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0774-final-protected | 40 | 50 | yes |
| MST-0774-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Models and invocation | 10 |
| Knowledge bases and RAG | 10 |
| Security and data handling | 10 |
| Evaluation, deployment and cost | 10 |

Minimum reviewed item bank: 328 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0774-Q0001** (single-answer, Select ONE) A Bedrock assistant must answer strictly from approved company documents and show where each answer came from. Which approach fits best?

- A. Ground answers with a knowledge base and return citations **(key)**  
  _Rationale:_ Correct: a knowledge base supplies approved context and citations show provenance.
- B. Raise the temperature to encourage creativity  
  _Rationale:_ Creativity increases the risk of unsupported answers.
- C. Fine-tune on random internet text  
  _Rationale:_ Unapproved data undermines the 'approved documents only' requirement.
- D. Remove all retrieval and rely on the base model  
  _Rationale:_ Without retrieval the assistant cannot cite approved sources.

**MST-0774-Q0002** (multiple-answer, Select TWO) Which TWO practices follow least privilege for Bedrock access? (Select TWO.)

- A. Grant only the specific Bedrock actions the caller needs **(key)**  
  _Rationale:_ Correct: scoping actions limits what a principal can do.
- B. Restrict access to the specific models in use **(key)**  
  _Rationale:_ Correct: limiting model access reduces exposure.
- C. Attach a policy allowing bedrock:* to every role  
  _Rationale:_ Wildcard permissions violate least privilege.
- D. Share one admin key among all applications  
  _Rationale:_ Shared admin keys remove accountability and over-permit.

**MST-0774-Q0003** (single-answer, Select ONE) Before launch, your team wants to compare answer quality across prompt changes objectively. What should you create first?

- A. A labelled evaluation set scored with a rubric **(key)**  
  _Rationale:_ Correct: a fixed, labelled set makes quality comparable across changes.
- B. A single favourite demo prompt  
  _Rationale:_ One prompt is not a reliable measure.
- C. A bigger marketing budget  
  _Rationale:_ Marketing does not measure quality.
- D. A higher max-token limit  
  _Rationale:_ Token limits do not measure answer quality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
