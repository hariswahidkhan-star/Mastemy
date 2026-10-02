# Compilers, Interpreters, and Programming-Language Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0940` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-CI-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Compilers, Interpreters, and Programming-Language Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Language processing overview
2. Lexical analysis
3. Parsing and grammars
4. Semantic analysis
5. Intermediate code and runtime
6. Code generation and optimization

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Language processing overview (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trace a line of source through each compiler phase; (2) Decide where a JIT fits between compilation and interpretation
- Common misconception addressed: Believing interpreters never compile anything internally
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Compilers vs interpreters; the processing pipeline | 80 | 5 |
| M01L02 | Front end, back end and intermediate representations | 80 | 5 |

### M02 Lexical analysis (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define token rules for a small expression language; (2) Hand-trace a lexer over an input with whitespace and numbers
- Common misconception addressed: Trying to recognise nested structure with regular expressions alone
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tokens, lexemes and regular languages | 80 | 5 |
| M02L02 | Building a lexer and handling errors | 80 | 5 |

### M03 Parsing and grammars (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a grammar for arithmetic with correct precedence; (2) Build a recursive-descent parser for expressions
- Common misconception addressed: Writing a left-recursive rule into a naive recursive-descent parser
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Context-free grammars and derivations | 80 | 5 |
| M03L02 | Recursive-descent and precedence parsing | 80 | 5 |

### M04 Semantic analysis (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build an AST and resolve variable scopes; (2) Report a type error with a useful message
- Common misconception addressed: Conflating syntax errors with semantic (type/scope) errors
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Abstract syntax trees and symbol tables | 80 | 5 |
| M04L02 | Scope resolution and type checking | 80 | 5 |

### M05 Intermediate code and runtime (MASTEMY-DESIGN 16%)

- Worked applications: (1) Lower an expression tree to three-address code; (2) Lay out an activation record for a function call
- Common misconception addressed: Assuming source-level variables map one-to-one to machine registers
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Intermediate representations and three-address code | 80 | 5 |
| M05L02 | Runtime model: stack frames, memory and calls | 80 | 5 |

### M06 Code generation and optimization (MASTEMY-DESIGN 16%)

- Worked applications: (1) Generate stack-machine code for an expression; (2) Apply constant folding to an IR snippet
- Common misconception addressed: Optimising before the program is correct and measurable
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Generating target code and instruction selection | 80 | 5 |
| M06L02 | Basic optimizations and language-design trade-offs | 80 | 5 |

## Integrative case

Design and specify a compiler for a small expression-and-assignment language: define its grammar, build a lexer and recursive-descent parser into an AST, check scopes and types, lower to three-address code, and emit stack-machine instructions with one basic optimization.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0940-final-protected | 42 | 42 | yes |
| MST-0940-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Language processing overview | 7 |
| Lexical analysis | 7 |
| Parsing and grammars | 7 |
| Semantic analysis | 7 |
| Intermediate code and runtime | 7 |
| Code generation and optimization | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0940-Q0001** (single-answer, Select ONE) Why can regular expressions alone not parse nested, balanced parentheses?

- A. Balanced nesting requires counting/memory beyond the power of regular languages **(key)**  
  _Rationale:_ Correct: arbitrary nesting is context-free, not regular, so it needs a stack-based parser.
- B. Regular expressions cannot match the '(' character  
  _Rationale:_ They can match any character, including parentheses.
- C. Parentheses are reserved tokens that lexers skip  
  _Rationale:_ Lexers tokenise parentheses; the issue is grammatical power, not skipping.
- D. Regular expressions are too slow  
  _Rationale:_ The limitation is expressive power, not speed.

**MST-0940-Q0002** (multiple-answer, Select ALL that apply) Which statements about compiler phases are correct? (Select TWO)

- A. Lexical analysis groups characters into tokens **(key)**  
  _Rationale:_ Correct: the lexer turns the character stream into tokens.
- B. Semantic analysis checks scopes and types using a symbol table **(key)**  
  _Rationale:_ Correct: it validates meaning after parsing produces a tree.
- C. Parsing generates final machine code  
  _Rationale:_ Parsing builds a tree; code generation comes later.
- D. Optimization must run before parsing  
  _Rationale:_ Optimization operates on an IR produced after parsing.

**MST-0940-Q0003** (single-answer, Select ONE) What is an abstract syntax tree (AST)?

- A. A tree representation of program structure with syntactic noise removed **(key)**  
  _Rationale:_ Correct: the AST captures the essential structure for later phases, dropping punctuation detail.
- B. A list of raw tokens from the lexer  
  _Rationale:_ Tokens are a flat stream; the AST is a structured tree built by the parser.
- C. The final assembly output  
  _Rationale:_ The AST is an internal representation, not target code.
- D. A table mapping registers to variables  
  _Rationale:_ That describes register allocation, not the AST.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
