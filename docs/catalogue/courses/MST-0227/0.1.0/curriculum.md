# Google Cloud Professional Agentic Architect: Transition Blueprint Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0227` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Google Cloud (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | (none) |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design agentic AI architectures on Google Cloud
2. Build tool-using and multi-agent systems with grounding
3. Govern, secure and evaluate agentic systems
4. Operationalise and scale agents responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Agentic architecture foundations

- Worked applications: (1) Decide single-agent vs multi-agent for a workflow; (2) Design grounding for an agent answering policy questions
- Common misconception addressed: Giving an agent tools without guardrails on their use
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From prompts to agents and tools | 180 | 6 |
| M01L02 | Grounding, retrieval and memory | 180 | 6 |
| M01L03 | Single-agent vs multi-agent design | 180 | 6 |
| M01L04 | Reference architectures on Google Cloud | 180 | 6 |

### M02 Building tool-using agents

- Worked applications: (1) Design a tool interface and its failure handling; (2) Plan context management for a long-running task
- Common misconception addressed: Assuming larger context windows remove the need for retrieval
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tool and function calling | 180 | 6 |
| M02L02 | Orchestration frameworks | 180 | 6 |
| M02L03 | State, memory and context management | 180 | 6 |
| M02L04 | Integrating enterprise systems | 180 | 6 |

### M03 Governance, security and evaluation

- Worked applications: (1) Define evaluation criteria for an agent's task success; (2) Design least-privilege tool access for an agent
- Common misconception addressed: Evaluating only model quality and not end-to-end task outcomes
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Responsible-AI and policy controls | 180 | 6 |
| M03L02 | Security and least-privilege for agents | 180 | 6 |
| M03L03 | Evaluating agent quality and safety | 180 | 6 |
| M03L04 | Human-in-the-loop design | 180 | 6 |

### M04 Operating agents at scale

- Worked applications: (1) Design observability for a multi-agent workflow; (2) Plan a cost and latency budget for agent calls
- Common misconception addressed: Shipping an agent to production without task-level monitoring
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Deployment and orchestration at scale | 180 | 6 |
| M04L02 | Monitoring and observability for agents | 180 | 6 |
| M04L03 | Cost and latency management | 180 | 6 |
| M04L04 | Iteration and lifecycle | 180 | 6 |

## Integrative case

An architect designs an agentic customer-operations system on Google Cloud: orchestrating tool-using agents with grounding, applying governance and evaluation, and operationalising it at scale.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0227-practice-form-A | 108 | 108 | yes |
| MST-0227-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0227-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0227-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Agentic architecture foundations | 27 |
| Building tool-using agents | 27 |
| Governance, security and evaluation | 27 |
| Operating agents at scale | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
