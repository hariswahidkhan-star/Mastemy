# Attention Mechanisms in Depth

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1327` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the attention foundations
2. Distinguish self- and cross-attention
3. Describe multi-head attention
4. Reason about attention efficiency
5. Apply attention across domains

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Attention foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain what attention aligns; (2) Compare additive and dot-product scoring
- Common misconception addressed: Thinking attention is a single fixed formula
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The alignment problem | 120 | 8 |
| M01L02 | Additive vs dot-product attention | 120 | 8 |

### M02 Self vs cross attention (MASTEMY-DESIGN 20%)

- Worked applications: (1) Distinguish self- from cross-attention; (2) Identify where cross-attention is used
- Common misconception addressed: Confusing self-attention with cross-attention
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Self-attention | 120 | 8 |
| M02L02 | Cross-attention in encoder-decoder | 120 | 8 |

### M03 Multi-head attention (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why heads learn different relations; (2) Caution against over-reading attention maps
- Common misconception addressed: Treating attention weights as faithful explanations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Heads and subspaces | 120 | 8 |
| M03L02 | Interpreting attention patterns | 120 | 8 |

### M04 Efficiency (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain the sequence-length cost; (2) Match an efficiency method to a constraint
- Common misconception addressed: Assuming efficient attention has no accuracy trade-off
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Quadratic cost of attention | 120 | 8 |
| M04L02 | Sparse and linear attention ideas | 120 | 8 |

### M05 Applications (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply attention to a vision or audio task; (2) Choose an attention variant for a budget
- Common misconception addressed: Believing more heads always improve results
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Attention beyond text | 120 | 8 |
| M05L02 | Design choices and pitfalls | 120 | 8 |

## Integrative case

A team must fit a long-sequence model within a memory budget. Choose between full, sparse and linear attention, justify head counts, and avoid over-interpreting attention maps as explanations.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1327-final-protected | 25 | 25 | yes |
| MST-1327-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Attention foundations | 5 |
| Self vs cross attention | 5 |
| Multi-head attention | 5 |
| Efficiency | 5 |
| Applications | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1327-Q0001** (single-answer, Select ONE) Why is standard self-attention costly for long sequences?

- A. Its cost grows quadratically with sequence length **(key)**  
  _Rationale:_ Correct: pairwise attention scales with length squared.
- B. It cannot be parallelised  
  _Rationale:_ It parallelises well; cost is the issue.
- C. It requires recurrence  
  _Rationale:_ Attention is not recurrent.
- D. It only works on images  
  _Rationale:_ It works on many modalities.

**MST-1327-Q0002** (multiple-answer, Select TWO) Which TWO statements about multi-head attention are correct? (Select TWO.)

- A. Different heads can attend to different relationships **(key)**  
  _Rationale:_ Correct: heads learn complementary patterns.
- B. Attention maps are not guaranteed faithful explanations **(key)**  
  _Rationale:_ Correct: high weights do not prove causal use.
- C. All heads are forced to be identical  
  _Rationale:_ Heads are distinct projections.
- D. More heads always raise accuracy  
  _Rationale:_ There is a diminishing, task-dependent trade-off.

**MST-1327-Q0003** (single-answer, Select ONE) How does cross-attention differ from self-attention?

- A. Cross-attention attends from one sequence to a different sequence **(key)**  
  _Rationale:_ Correct: queries and keys come from different sources.
- B. Cross-attention uses no values  
  _Rationale:_ It still uses values.
- C. Self-attention needs two sequences  
  _Rationale:_ Self-attention uses one sequence.
- D. They are identical operations  
  _Rationale:_ They differ in their sources.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
