# Regex Mastery

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1538` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-RM-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Regex Mastery (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Regex foundations
2. Character classes and quantifiers
3. Anchors and boundaries
4. Groups, alternation and backreferences
5. Lookaround
6. Substitution and extraction
7. Engines, flavours and Unicode
8. Performance and safety

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items can test pattern reasoning but not interactive debugging; building and testing patterns against real data is taught through instructor-built walkthroughs.

## Modules

### M01 Regex foundations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Match a literal word inside a larger string; (2) Reason about what the dot does and does not match
- Common misconception addressed: Assuming the dot matches newlines by default
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What regular expressions are and where they run | 90 | 6 |
| M01L02 | Literals, the dot and basic matching | 90 | 6 |

### M02 Character classes and quantifiers (MASTEMY-DESIGN 14%)

- Worked applications: (1) Match an integer or decimal with a class and quantifier; (2) Switch a greedy quantifier to lazy to fix over-matching
- Common misconception addressed: Expecting * to be lazy; quantifiers are greedy by default
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Character classes, ranges and shorthands (\d \w \s) | 90 | 6 |
| M02L02 | Quantifiers *, +, ?, {m,n} and greediness | 90 | 6 |

### M03 Anchors and boundaries (MASTEMY-DESIGN 12%)

- Worked applications: (1) Anchor a pattern to a whole line; (2) Match a whole word with word boundaries
- Common misconception addressed: Forgetting that ^ and $ shift meaning under multiline flags
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | ^ and $ anchors and multiline mode | 90 | 6 |
| M03L02 | Word boundaries \b and \B | 90 | 6 |

### M04 Groups, alternation and backreferences (MASTEMY-DESIGN 14%)

- Worked applications: (1) Capture date parts into groups; (2) Find a repeated word with a backreference
- Common misconception addressed: Using a capturing group where a non-capturing group is intended
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Capturing vs non-capturing groups and alternation | 90 | 6 |
| M04L02 | Backreferences and numbered captures | 90 | 6 |

### M05 Lookaround (MASTEMY-DESIGN 13%)

- Worked applications: (1) Match a password rule with lookahead assertions; (2) Match a number not preceded by a currency symbol
- Common misconception addressed: Thinking lookaround consumes characters (it is zero-width)
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Positive and negative lookahead | 90 | 6 |
| M05L02 | Lookbehind and its engine limitations | 90 | 6 |

### M06 Substitution and extraction (MASTEMY-DESIGN 12%)

- Worked applications: (1) Reformat dates by referencing captured groups; (2) Extract key/value pairs with named captures
- Common misconception addressed: Reusing $1-style references in the wrong replacement syntax for the tool
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Replace with group references and named captures | 90 | 6 |
| M06L02 | Splitting and extracting structured fields | 90 | 6 |

### M07 Engines, flavours and Unicode (MASTEMY-DESIGN 12%)

- Worked applications: (1) Adapt a pattern between two regex flavours; (2) Match letters across languages with a Unicode property
- Common misconception addressed: Assuming one regex syntax works identically in every tool
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | PCRE vs POSIX vs flavour differences; flags | 90 | 6 |
| M07L02 | Unicode properties and the \p{...} classes | 90 | 6 |

### M08 Performance and safety (MASTEMY-DESIGN 11%)

- Worked applications: (1) Rewrite a pattern to prevent exponential backtracking; (2) Document a complex pattern with verbose/extended mode
- Common misconception addressed: Using regex to parse nested/recursive formats like full HTML
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Catastrophic backtracking and how to avoid it | 90 | 6 |
| M08L02 | Testing, readability (verbose mode) and regex limits | 90 | 6 |

## Integrative case

Build and validate a log-and-form parsing suite: design patterns to extract timestamps, IPs and structured fields with named captures, enforce input rules with lookaround, reformat output via substitution, adapt the patterns across two engines and Unicode input, and harden the heaviest pattern against catastrophic backtracking.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1538-final-protected | 40 | 40 | yes |
| MST-1538-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Regex foundations | 5 |
| Character classes and quantifiers | 5 |
| Anchors and boundaries | 5 |
| Groups, alternation and backreferences | 5 |
| Lookaround | 5 |
| Substitution and extraction | 5 |
| Engines, flavours and Unicode | 5 |
| Performance and safety | 5 |

Minimum reviewed item bank: 524 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1538-Q0001** (single-answer, Select ONE) By default, how do quantifiers such as + and * behave?

- A. Greedily, matching as much as possible before backtracking **(key)**  
  _Rationale:_ Correct: default quantifiers are greedy; add ? (for example +?) to make them lazy.
- B. Lazily, matching as little as possible  
  _Rationale:_ Lazy behaviour requires an explicit ?; the default is greedy.
- C. They match exactly one character  
  _Rationale:_ + and * allow many repetitions, not exactly one.
- D. They are ignored outside character classes  
  _Rationale:_ Quantifiers apply to the preceding token in the pattern.

**MST-1538-Q0002** (multiple-answer, Select TWO) Which statements about lookaround assertions are correct? (Select TWO)

- A. Lookaround is zero-width: it tests a condition without consuming characters **(key)**  
  _Rationale:_ Correct: the matched position does not advance past the lookaround content.
- B. A negative lookahead (?!...) succeeds only when the pattern does not follow **(key)**  
  _Rationale:_ Correct: (?!...) asserts that what follows does not match.
- C. Lookahead always consumes the characters it inspects  
  _Rationale:_ Lookaround is zero-width and consumes nothing.
- D. Every regex engine supports variable-length lookbehind  
  _Rationale:_ Many engines restrict lookbehind to fixed length; support varies.

**MST-1538-Q0003** (single-answer, Select ONE) What is the main risk of a pattern like (a+)+ applied to a long non-matching string?

- A. Catastrophic backtracking, causing runtime to explode toward exponential **(key)**  
  _Rationale:_ Correct: nested quantifiers create many ways to split the input, so backtracking can blow up.
- B. It will not compile  
  _Rationale:_ The pattern compiles; the problem is runtime behaviour.
- C. It silently matches everything  
  _Rationale:_ The danger is slow backtracking, not over-matching.
- D. It uses too little memory  
  _Rationale:_ The issue is CPU time from backtracking, not under-use of memory.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
