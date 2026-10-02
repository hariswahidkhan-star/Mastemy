# RAG Evaluation: Retrieval Quality and Answer Grounding

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0596` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | This is a general-professional-skills course with no external awarding body and no official certification syllabus. Content reflects widely used RAG-evaluation concepts; specific metric definitions and tooling are DESIGN ASSUMPTION to be confirmed against current practice and chosen tools before production. |
| Official sources | (none read this session) |
| Evidence | **n/a-no-official-syllabus** - no official syllabus/source read this session; sources: SRC-RAG-EVAL |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — RAG Evaluation: Retrieval Quality and Answer Grounding (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Distinguish retrieval quality from answer quality in a RAG system
2. Define retrieval metrics (e.g. recall, precision) at a working level
3. Assess answer grounding and faithfulness to retrieved context
4. Build a small evaluation set and interpret results
5. Diagnose whether a failure is a retrieval or a generation problem

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Retrieval vs answer quality (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Classify three failures as retrieval or generation; (2) Explain why good retrieval can still yield a bad answer
- Common misconception addressed: Blaming the model when retrieval returned the wrong context
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why retrieval and generation are evaluated separately | 88 | 5 |
| M01L02 | The anatomy of a RAG failure | 88 | 5 |

### M02 Retrieval metrics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute recall for a small query set; (2) Interpret a precision/recall trade-off
- Common misconception addressed: Using a single accuracy number for retrieval quality
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Recall, precision and relevance | 88 | 5 |
| M02L02 | Ranking-aware measures conceptually | 87 | 5 |

### M03 Answer grounding and faithfulness (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Check whether an answer is supported by its context; (2) Flag an unsupported claim in an answer
- Common misconception addressed: Treating a fluent answer as faithful without checking the context
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Grounding and faithfulness to context | 87 | 5 |
| M03L02 | Detecting unsupported claims | 87 | 5 |
| M03L03 | Citations as evidence | 87 | 5 |

### M04 Building an evaluation set (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draft ten representative evaluation questions; (2) Interpret an evaluation result table
- Common misconception addressed: Evaluating on cherry-picked questions that hide weaknesses
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Designing a small, representative eval set | 87 | 5 |
| M04L02 | Running and interpreting an evaluation | 87 | 5 |

### M05 Diagnosing and improving (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Diagnose a failing example end to end; (2) Decide whether to fix retrieval or the prompt
- Common misconception addressed: Changing the generator when the real problem is retrieval
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Isolating retrieval vs generation faults | 87 | 5 |
| M05L02 | Choosing the right fix | 87 | 5 |

## Integrative case

A team's RAG assistant gives a wrong answer; build a small evaluation set, measure retrieval and grounding separately, and determine whether the fault lies in retrieval or generation before changing the system.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0596-final-protected | 30 | 40 | yes |
| MST-0596-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Retrieval vs answer quality | 5 |
| Retrieval metrics | 6 |
| Answer grounding and faithfulness | 7 |
| Building an evaluation set | 6 |
| Diagnosing and improving | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0596-Q0001** (single-answer, Select ONE) A RAG answer is wrong even though the correct passage was retrieved into context. Where is the fault most likely?

- A. In generation (the model mis-used the available context) **(key)**  
  _Rationale:_ Correct: if the right context was retrieved, the failure lies in how the answer was generated.
- B. In retrieval, which clearly succeeded  
  _Rationale:_ Retrieval succeeded here, so it is not the fault.
- C. In the network  
  _Rationale:_ A network issue is not indicated by this symptom.
- D. In the user's spelling  
  _Rationale:_ The symptom points to generation, not input spelling.

**MST-0596-Q0002** (multiple-answer, Select TWO) Which TWO statements about evaluating a RAG system are correct? (Select TWO.)

- A. Retrieval quality and answer quality should be measured separately **(key)**  
  _Rationale:_ Correct: separating them lets you locate the fault.
- B. Answer grounding checks whether claims are supported by retrieved context **(key)**  
  _Rationale:_ Correct: grounding/faithfulness measures support in the context.
- C. A fluent answer is proof it is faithful to the sources  
  _Rationale:_ Fluency is not evidence of faithfulness.
- D. One accuracy number fully describes retrieval quality  
  _Rationale:_ Retrieval needs measures like recall and precision, not a single number.

**MST-0596-Q0003** (single-answer, Select ONE) Which measure captures how many of the relevant passages were successfully retrieved?

- A. Recall **(key)**  
  _Rationale:_ Correct: recall measures the fraction of relevant items that were retrieved.
- B. Latency  
  _Rationale:_ Latency measures speed, not relevance coverage.
- C. Token cost  
  _Rationale:_ Cost is unrelated to retrieval coverage.
- D. Uptime  
  _Rationale:_ Uptime measures availability, not retrieval coverage.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
