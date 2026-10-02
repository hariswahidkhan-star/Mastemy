# Mathematics for AI: Calculus and Optimisation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1308` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Interpret derivatives as rates of change
2. Explain the role of gradients in multivariable functions
3. Describe how gradient descent minimises a loss
4. Recognise common optimisation challenges
5. Connect optimisation ideas to how models learn

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Derivatives (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read the slope of a curve at a point; (2) Explain where a function increases
- Common misconception addressed: Confusing the value of a function with its slope
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Rate of change and slope | 48 | 4 |
| M01L02 | Rules of differentiation at a glance | 48 | 4 |

### M02 Gradients (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe the direction of steepest ascent; (2) Sketch a gradient on a contour plot
- Common misconception addressed: Ignoring that gradients point uphill not down
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Partial derivatives | 48 | 4 |
| M02L02 | The gradient vector and direction | 48 | 4 |

### M03 Gradient descent (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace two steps of gradient descent; (2) Explain a learning rate that is too large
- Common misconception addressed: Assuming a bigger learning rate is always faster
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Steps, learning rate and convergence | 48 | 4 |
| M03L02 | Why learning rate matters | 48 | 4 |

### M04 Optimisation challenges (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify a local versus global minimum; (2) Explain why initialisation matters
- Common misconception addressed: Believing every minimum found is the best
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Local minima and saddle points | 48 | 4 |
| M04L02 | Non-convex loss surfaces | 48 | 4 |

### M05 Learning connection (MASTEMY-DESIGN 20%)

- Worked applications: (1) Link a loss function to its goal; (2) Explain training as loss minimisation
- Common misconception addressed: Treating training as magic rather than optimisation
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Loss functions and training | 48 | 4 |
| M05L02 | From optimisation to model fit | 48 | 4 |

## Integrative case

A new team member asks 'how does a model actually learn?'. Explain in plain terms using derivatives, gradients and gradient descent, and name one thing that can go wrong.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1308-final-protected | 25 | 25 | yes |
| MST-1308-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Derivatives | 5 |
| Gradients | 5 |
| Gradient descent | 5 |
| Optimisation challenges | 5 |
| Learning connection | 5 |

Minimum reviewed item bank: 214 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1308-Q0001** (single-answer, Select ONE) In gradient descent, why do we move in the direction opposite to the gradient?

- A. The negative gradient points toward lower loss **(key)**  
  _Rationale:_ Correct: descent follows the downhill direction.
- B. The gradient points toward the global maximum of accuracy  
  _Rationale:_ The gradient points uphill in loss, not toward accuracy.
- C. Direction does not affect the result  
  _Rationale:_ Direction determines whether loss rises or falls.
- D. It increases the loss on purpose  
  _Rationale:_ Descent reduces loss, not increases it.

**MST-1308-Q0002** (multiple-answer, Select TWO) Which TWO problems can a poorly chosen learning rate cause? (Select TWO.)

- A. Divergence or overshooting the minimum if too large **(key)**  
  _Rationale:_ Correct: too large a step can overshoot.
- B. Extremely slow training if too small **(key)**  
  _Rationale:_ Correct: tiny steps converge very slowly.
- C. Guaranteed instant convergence  
  _Rationale:_ No learning rate guarantees instant convergence.
- D. Elimination of all local minima  
  _Rationale:_ Learning rate does not remove local minima.

**MST-1308-Q0003** (single-answer, Select ONE) What does a derivative tell you about a function at a point?

- A. Its instantaneous rate of change (slope) **(key)**  
  _Rationale:_ Correct: the derivative is the slope at that point.
- B. Its total area under the curve  
  _Rationale:_ That is integration, not differentiation.
- C. Its maximum value overall  
  _Rationale:_ A derivative is local, not a global maximum.
- D. Its number of inputs  
  _Rationale:_ The derivative concerns change, not input count.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
