# Discrete Mathematics for CS

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1541` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-DMC-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Discrete Mathematics for CS (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Logic and proofs
2. Sets, relations and functions
3. Mathematical induction
4. Combinatorics
5. Discrete probability
6. Graph theory
7. Number theory for computing
8. Recurrences and growth

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items can test reasoning and short derivations but not full written proofs; constructing and critiquing proofs is taught through instructor-built walkthroughs.

## Modules

### M01 Logic and proofs (MASTEMY-DESIGN 14%)

- Worked applications: (1) Build a truth table and test logical equivalence; (2) Prove a simple statement by contradiction
- Common misconception addressed: Confusing the converse of an implication with the implication itself
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Propositional logic, connectives and truth tables | 75 | 6 |
| M01L02 | Predicates, quantifiers and proof techniques | 75 | 6 |

### M02 Sets, relations and functions (MASTEMY-DESIGN 13%)

- Worked applications: (1) Prove a set identity with element arguments; (2) Classify a relation as reflexive/symmetric/transitive
- Common misconception addressed: Assuming every relation is a function
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sets, operations and set identities | 75 | 6 |
| M02L02 | Relations, equivalence relations and functions | 75 | 6 |

### M03 Mathematical induction (MASTEMY-DESIGN 13%)

- Worked applications: (1) Prove a summation formula by induction; (2) Prove a property of a recursively defined structure
- Common misconception addressed: Omitting or mis-stating the base case
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Weak induction and the base/step structure | 75 | 6 |
| M03L02 | Strong and structural induction | 75 | 6 |

### M04 Combinatorics (MASTEMY-DESIGN 14%)

- Worked applications: (1) Count arrangements with and without repetition; (2) Apply inclusion-exclusion to an overlap problem
- Common misconception addressed: Using permutations when order does not matter
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Counting rules, permutations and combinations | 75 | 6 |
| M04L02 | Binomial theorem, inclusion-exclusion and pigeonhole | 75 | 6 |

### M05 Discrete probability (MASTEMY-DESIGN 11%)

- Worked applications: (1) Compute a conditional probability with a tree; (2) Find the expected value of a simple game
- Common misconception addressed: Assuming events are independent without justification
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Sample spaces, events and conditional probability | 75 | 6 |
| M05L02 | Expectation and independence | 75 | 6 |

### M06 Graph theory (MASTEMY-DESIGN 13%)

- Worked applications: (1) Decide whether a graph has an Euler circuit; (2) Show a graph is a tree from its properties
- Common misconception addressed: Confusing Euler (edges) with Hamiltonian (vertices) conditions
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Graphs, degrees, paths and connectivity | 75 | 6 |
| M06L02 | Trees, traversals, Euler and Hamiltonian ideas | 75 | 6 |

### M07 Number theory for computing (MASTEMY-DESIGN 11%)

- Worked applications: (1) Compute a gcd with the Euclidean algorithm; (2) Reduce an expression modulo n
- Common misconception addressed: Treating modular equality as ordinary equality
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Divisibility, gcd and the Euclidean algorithm | 75 | 6 |
| M07L02 | Modular arithmetic and applications to hashing/crypto | 75 | 6 |

### M08 Recurrences and growth (MASTEMY-DESIGN 11%)

- Worked applications: (1) Solve a linear recurrence; (2) Bound the growth of a recurrence with big-O
- Common misconception addressed: Ignoring lower-order terms being irrelevant only asymptotically
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Recurrence relations and solving them | 75 | 6 |
| M08L02 | Asymptotics and big-O as discrete growth | 75 | 6 |

## Integrative case

Analyse a small routing-and-scheduling problem: model it as a graph, count feasible assignments with combinatorics, reason about collision probability with discrete probability and modular arithmetic, prove a correctness property by induction, and bound the algorithm's growth with a recurrence and big-O.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1541-final-protected | 40 | 40 | yes |
| MST-1541-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Logic and proofs | 5 |
| Sets, relations and functions | 5 |
| Mathematical induction | 5 |
| Combinatorics | 5 |
| Discrete probability | 5 |
| Graph theory | 5 |
| Number theory for computing | 5 |
| Recurrences and growth | 5 |

Minimum reviewed item bank: 482 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1541-Q0001** (single-answer, Select ONE) Which statement is logically equivalent to the implication p -> q?

- A. not q -> not p (the contrapositive) **(key)**  
  _Rationale:_ Correct: an implication and its contrapositive are logically equivalent.
- B. q -> p (the converse)  
  _Rationale:_ The converse is not equivalent to the original implication.
- C. not p -> not q (the inverse)  
  _Rationale:_ The inverse is not equivalent to the original implication.
- D. p and q  
  _Rationale:_ A conjunction is not equivalent to an implication.

**MST-1541-Q0002** (multiple-answer, Select TWO) Which properties must a relation have to be an equivalence relation? (Select TWO) -- choose two of the three required.

- A. Reflexivity **(key)**  
  _Rationale:_ Correct: an equivalence relation must be reflexive (and also symmetric and transitive).
- B. Transitivity **(key)**  
  _Rationale:_ Correct: transitivity is one of the three required properties of an equivalence relation.
- C. Antisymmetry  
  _Rationale:_ Antisymmetry characterises partial orders, not equivalence relations.
- D. Totality (every pair comparable)  
  _Rationale:_ Totality is a property of total orders, not required for equivalence relations.

**MST-1541-Q0003** (single-answer, Select ONE) You arrange 4 distinct books on a shelf where order matters and no repetition is allowed. How many arrangements of all 4 are there?

- A. 24 **(key)**  
  _Rationale:_ Correct: 4! = 4x3x2x1 = 24 permutations of 4 distinct items.
- B. 16  
  _Rationale:_ 16 is 4^2, which would allow repetition; here items are distinct and used once.
- C. 12  
  _Rationale:_ 12 is 4x3, the number of ordered pairs, not full arrangements of all four.
- D. 4  
  _Rationale:_ 4 counts single choices, not full orderings.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
