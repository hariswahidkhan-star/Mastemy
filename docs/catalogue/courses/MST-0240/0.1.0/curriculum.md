# Salesforce Certified Agentforce Specialist

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0240` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Salesforce (no affiliation or endorsement) |
| Exam code | official_exam_code left empty; design assumption: Certified Agentforce Specialist (assumed designation) (vendor designation treated as a design assumption; not an official-source-verified code) |
| Version basis | DESIGN ASSUMPTION - official Salesforce exam content outline and domain weightings not retrieved (issuer site egress-blocked 2026-10-02); confirm on the issuer's website. |
| Evidence | **unverified-needs-official-check** - issuer source egress-blocked on access date; confirm on official site |
| Legacy IDs | MST-BUS-SFDC-AGENTF-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Agentforce concepts and prompt engineering
2. Build and configure agents and actions
3. Ground, test, deploy and monitor agents

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Agentforce Concepts and Prompt Engineering (design assumption - weight not verified)

- Worked applications: (1) Write a grounded prompt template with merge fields; (2) Decompose a user goal into agent topics and actions
- Common misconception addressed: Treating a prompt as a fixed script rather than instructions
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Agentforce and the Atlas reasoning engine | 309 | 6 |
| M01L02 | Prompt templates and prompt engineering | 309 | 6 |

### M02 Agent Builder and Actions (design assumption - weight not verified)

- Worked applications: (1) Configure a topic with actions and instructions; (2) Add a custom Apex or Flow action to an agent
- Common misconception addressed: Assuming an agent can act without a defined action
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Topics, instructions and actions | 309 | 6 |
| M02L02 | Standard and custom actions | 309 | 6 |

### M03 Agentforce for Service and Sales (design assumption - weight not verified)

- Worked applications: (1) Configure a service agent to deflect a common case; (2) Set up an escalation path to a human agent
- Common misconception addressed: Expecting the agent to handle out-of-scope requests unprompted
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Service agent and sales use cases | 308 | 6 |

### M04 Data Cloud and Grounding (design assumption - weight not verified)

- Worked applications: (1) Ground an agent on a knowledge article set; (2) Configure a retriever over Data Cloud data
- Common misconception addressed: Grounding an agent on stale or ungoverned data
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Grounding with Data Cloud and retrieval | 308 | 6 |

### M05 Testing, Deployment and Monitoring (design assumption - weight not verified)

- Worked applications: (1) Build a test set in Testing Center for an agent; (2) Review conversation transcripts to tune instructions
- Common misconception addressed: Deploying an agent to production without a test pass
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Testing Center, deployment and observability | 308 | 6 |

## Integrative case

A service org deploys an Agentforce service agent; the candidate designs prompts and topics, grounds the agent in company data, tests edge cases, and monitors it in production.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget, not the official exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0240-practice-form-A | 81 | 81 | yes |
| MST-0240-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0240-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0240-final-protected | 81 | 81 | yes |

| Domain | Items (practice form A) |
|---|---|
| Agentforce Concepts and Prompt Engineering | 17 |
| Agent Builder and Actions | 16 |
| Agentforce for Service and Sales | 16 |
| Data Cloud and Grounding | 16 |
| Testing, Deployment and Monitoring | 16 |

Minimum reviewed item bank: 786 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0240-Q0001** (single-answer, Select ONE) In Agentforce, what is the role of a 'topic'?

- A. It stores the user's password  
  _Rationale:_ Topics do not store credentials.
- B. It groups related instructions and actions the agent can use for a job to be done **(key)**  
  _Rationale:_ Correct: a topic organises instructions and actions for a category of work.
- C. It is the physical server the agent runs on  
  _Rationale:_ Topics are configuration, not infrastructure.
- D. It replaces the need for any actions  
  _Rationale:_ Topics reference actions; they do not remove the need for them.

**MST-0240-Q0002** (single-answer, Select ONE) Why ground an Agentforce agent in Data Cloud or knowledge data?

- A. To base responses on trusted company data and reduce hallucination **(key)**  
  _Rationale:_ Correct: grounding anchors responses in trusted, retrievable company data.
- B. To make the agent respond more slowly  
  _Rationale:_ Grounding is about accuracy, not slowing responses.
- C. To remove the need for testing  
  _Rationale:_ Grounding does not replace testing.
- D. To disable guardrails  
  _Rationale:_ Grounding does not disable guardrails.

**MST-0240-Q0003** (multiple-answer, Select TWO) Select TWO steps that belong in responsibly deploying an Agentforce agent.

- A. Run a test set in Testing Center before go-live **(key)**  
  _Rationale:_ Correct: testing before deployment is a required step.
- B. Deploy directly to production untested to save time  
  _Rationale:_ Deploying untested is not responsible.
- C. Monitor conversation transcripts after launch **(key)**  
  _Rationale:_ Correct: post-launch monitoring supports tuning and safety.
- D. Remove all escalation paths to humans  
  _Rationale:_ Escalation paths should be retained.
- E. Ground the agent on ungoverned data  
  _Rationale:_ Grounding data should be governed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
