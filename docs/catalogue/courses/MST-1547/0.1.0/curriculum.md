# Theory of Computation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1547` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-TC-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Theory of Computation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Finite automata and regular languages
2. Regular expressions and closure
3. Non-regularity and the pumping lemma
4. Context-free grammars
5. Pushdown automata
6. Turing machines
7. Decidability
8. Complexity classes

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on formal-language and automata reasoning; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Finite automata and regular languages (MASTEMY-DESIGN 13%)

- Worked applications: (1) Build a DFA that accepts binary strings divisible by 3; (2) Convert an NFA to an equivalent DFA
- Common misconception addressed: Assuming an NFA is strictly more powerful than a DFA
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | DFAs and NFAs | 75 | 5 |
| M01L02 | Equivalence and the subset construction | 75 | 5 |

### M02 Regular expressions and closure (MASTEMY-DESIGN 13%)

- Worked applications: (1) Translate a regex into an equivalent NFA; (2) Show regular languages are closed under union
- Common misconception addressed: Thinking regex backreferences are part of the formal regular-language model
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Regular expressions and Kleene's theorem | 75 | 5 |
| M02L02 | Closure properties of regular languages | 75 | 5 |

### M03 Non-regularity and the pumping lemma (MASTEMY-DESIGN 12%)

- Worked applications: (1) Prove a^n b^n is not regular; (2) Pick the pumping length and decompose a sample string
- Common misconception addressed: Using the pumping lemma to prove a language IS regular
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The pumping lemma for regular languages | 75 | 5 |
| M03L02 | Applying pumping to prove non-regularity | 75 | 5 |

### M04 Context-free grammars (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a CFG for balanced parentheses; (2) Show a grammar is ambiguous with two parse trees
- Common misconception addressed: Confusing an ambiguous grammar with an inherently ambiguous language
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | CFG definitions and derivations | 75 | 5 |
| M04L02 | Parse trees and ambiguity | 75 | 5 |

### M05 Pushdown automata (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build a PDA for a^n b^n; (2) Convert a CFG to a PDA
- Common misconception addressed: Believing deterministic and non-deterministic PDAs are equivalent
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | PDAs and acceptance | 75 | 5 |
| M05L02 | CFG-PDA equivalence | 75 | 5 |

### M06 Turing machines (MASTEMY-DESIGN 13%)

- Worked applications: (1) Trace a TM that recognises palindromes; (2) Argue a multi-tape TM is no more powerful
- Common misconception addressed: Confusing the tape alphabet with the input alphabet
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Turing-machine model and configurations | 75 | 5 |
| M06L02 | Variants and the Church-Turing thesis | 75 | 5 |

### M07 Decidability (MASTEMY-DESIGN 12%)

- Worked applications: (1) Classify a problem as decidable or not; (2) Reduce the halting problem to a new problem
- Common misconception addressed: Thinking recognisable implies decidable
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Decidable vs recognisable languages | 75 | 5 |
| M07L02 | The halting problem and reductions | 75 | 5 |

### M08 Complexity classes (MASTEMY-DESIGN 12%)

- Worked applications: (1) Show a problem is in NP by giving a verifier; (2) Reduce SAT to a target problem
- Common misconception addressed: Treating NP as 'not polynomial'
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | P, NP and verifiers | 75 | 5 |
| M08L02 | NP-completeness and reductions | 75 | 5 |

## Integrative case

Given an informal specification of a token lexer, decide which language class it belongs to, build a finite automaton or grammar that recognises it, prove one claimed property, and argue whether a related problem is decidable.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1547-final-protected | 40 | 40 | yes |
| MST-1547-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Finite automata and regular languages | 5 |
| Regular expressions and closure | 5 |
| Non-regularity and the pumping lemma | 5 |
| Context-free grammars | 5 |
| Pushdown automata | 5 |
| Turing machines | 5 |
| Decidability | 5 |
| Complexity classes | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1547-Q0001** (single-answer, Select ONE) Which statement about the subset construction is correct?

- A. It converts an NFA into an equivalent DFA whose states are sets of NFA states **(key)**  
  _Rationale:_ Correct: DFA states correspond to subsets of NFA states reachable on an input.
- B. It proves that NFAs recognise more languages than DFAs  
  _Rationale:_ Wrong: the construction shows they recognise exactly the same class.
- C. It minimises the number of states in a DFA  
  _Rationale:_ Minimisation is a separate algorithm (e.g. Hopcroft's).
- D. It only works for deterministic inputs  
  _Rationale:_ It is specifically for converting non-deterministic automata.

**MST-1547-Q0002** (single-answer, Select ONE) Why does the pumping lemma help prove a language is NOT regular?

- A. A regular language must allow long strings to be pumped; exhibiting a string that cannot be is a contradiction **(key)**  
  _Rationale:_ Correct: it is used contrapositively to derive a contradiction.
- B. It constructs the minimal DFA for the language  
  _Rationale:_ That is not what the lemma does.
- C. It shows every context-free language is regular  
  _Rationale:_ False; CFLs are a strictly larger class.
- D. It enumerates all strings the language accepts  
  _Rationale:_ The lemma is not an enumeration procedure.

**MST-1547-Q0003** (multiple-answer, Select ALL that apply) Which statements about the halting problem are correct? (Select TWO)

- A. It is undecidable: no algorithm decides it for all inputs **(key)**  
  _Rationale:_ Correct: Turing proved no total decider exists.
- B. It is recognisable: a machine can accept all halting instances **(key)**  
  _Rationale:_ Correct: simulate and accept if it halts, giving recognisability but not decidability.
- C. It is in P  
  _Rationale:_ False; it is not even decidable, so complexity classes like P do not apply.
- D. It can be solved by a sufficiently large finite automaton  
  _Rationale:_ False; finite automata cannot even recognise it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
