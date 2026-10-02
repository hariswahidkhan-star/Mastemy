# Agentic RAG and Multi-Step Research Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0601` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral professional-skills content on agentic RAG and multi-step research workflows. There is no external issuer or official syllabus; module weights and outcomes are Mastemy design decisions. |
| Official sources | (no external issuer; Mastemy design content) |
| Evidence | **n/a-no-official-syllabus** - vendor-neutral professional skills; no external issuer |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Agentic RAG and Multi-Step Research Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how agentic RAG differs from single-shot retrieval
2. Decompose a complex question into focused sub-queries
3. Orchestrate multi-step retrieval with intermediate reasoning
4. Control cost, latency and loops in a multi-step research agent
5. Evaluate a multi-step research workflow for grounding and completeness

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules


### M01 From single-shot to agentic RAG (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify a question single-shot retrieval answers poorly; (2) Explain when planning sub-queries helps
- Common misconception addressed: Assuming more retrieved chunks always beats better query planning
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Limits of single-query retrieval | 96 | 6 |
| M01L02 | What agentic retrieval adds | 96 | 6 |
### M02 Query decomposition (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Decompose a multi-part question into focused sub-queries; (2) Refine a follow-up query using an earlier result
- Common misconception addressed: Firing one vague query instead of decomposing the question
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Breaking a question into sub-queries | 96 | 6 |
| M02L02 | Using prior answers to refine | 96 | 6 |
### M03 Orchestration (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Orchestrate a two-stage retrieve-reason-retrieve workflow; (2) Synthesise an answer citing evidence from multiple steps
- Common misconception addressed: Merging step outputs without tracking which evidence came from where
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sequencing retrieval and reasoning | 96 | 6 |
| M03L02 | Combining evidence across steps | 96 | 6 |
### M04 Controlling cost and loops (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Set a step budget and termination condition for a research agent; (2) Detect and break a repeating retrieval loop
- Common misconception addressed: Letting an agent loop indefinitely with no depth or budget limit
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Budgets, depth limits and termination | 96 | 6 |
| M04L02 | Avoiding infinite loops | 96 | 6 |
### M05 Evaluating research workflows (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Score a workflow for grounding and completeness; (2) Review a trace to find where a step went wrong
- Common misconception addressed: Judging the final answer without inspecting the intermediate steps
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Grounding and completeness metrics | 96 | 6 |
| M05L02 | Reviewing multi-step traces | 96 | 6 |

## Integrative case

An analyst builds a research assistant for multi-part market questions: move from single-shot to agentic retrieval, decompose questions into sub-queries, orchestrate retrieve-reason-retrieve steps with tracked evidence, cap cost and loops, and evaluate the workflow for grounding and completeness.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0601-final-protected | 30 | 40 | yes |
| MST-0601-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| From single-shot to agentic RAG | 6 |
| Query decomposition | 6 |
| Orchestration | 6 |
| Controlling cost and loops | 6 |
| Evaluating research workflows | 6 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0601-Q0001** (single-answer, Select ONE) A single vague query returns weak results for a multi-part question. What does agentic retrieval do differently?

- A. It decomposes the question into focused sub-queries and can use prior results to refine **(key)**  
  _Rationale:_ Correct: planning and sub-query decomposition target each part of the question.
- B. It simply returns more chunks for the same query  
  _Rationale:_ Returning more chunks is not query planning.
- C. It removes the need for any retrieval  
  _Rationale:_ Agentic RAG still retrieves; it plans the retrieval.
- D. It guarantees a correct answer  
  _Rationale:_ It improves targeting but does not guarantee correctness.
**MST-0601-Q0002** (multiple-answer, Select TWO) Which TWO controls keep a multi-step research agent safe to run? (Select TWO.)

- A. A step or depth budget **(key)**  
  _Rationale:_ Correct: a budget bounds cost and prevents runaway execution.
- B. A termination condition that stops when the question is answered **(key)**  
  _Rationale:_ Correct: a clear stop condition avoids endless loops.
- C. No limit on the number of retrieval steps  
  _Rationale:_ Unbounded steps risk infinite loops and cost blowups.
- D. Hiding intermediate steps from evaluation  
  _Rationale:_ Intermediate steps must be inspectable to debug the workflow.
**MST-0601-Q0003** (single-answer, Select ONE) When combining evidence across multiple retrieval steps, why track which step each piece of evidence came from?

- A. So the final answer can be grounded and the trace reviewed for errors **(key)**  
  _Rationale:_ Correct: provenance across steps supports grounding and debugging.
- B. Because evidence from later steps is always better  
  _Rationale:_ Later steps are not inherently better.
- C. To make the workflow run faster  
  _Rationale:_ Tracking provenance is about grounding, not speed.
- D. It is unnecessary once an answer is produced  
  _Rationale:_ Provenance is exactly what lets you verify the answer.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
