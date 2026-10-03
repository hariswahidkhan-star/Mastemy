# Excel Advanced: Lookups and Dynamic Arrays

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2651` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Microsoft Excel and AI product features change often; this spec teaches durable concepts and must have product specifics re-verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel Advanced: Lookups and Dynamic Arrays (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Choose the right lookup for a task among VLOOKUP, HLOOKUP, INDEX/MATCH and XLOOKUP
2. Use XLOOKUP and XMATCH for exact, approximate and reverse lookups with defaults
3. Build spilling dynamic-array formulas with FILTER, SORT, SORTBY, UNIQUE and SEQUENCE
4. Reference spill ranges with the # operator and handle #SPILL! errors
5. Combine lookups and arrays to build single-formula reports that recalculate automatically
6. Decide when a dynamic array is clearer and more robust than a copied-down formula

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Classic lookups and their limits (25% (design weight), design weight)

- Worked applications: (1) Replace a fragile VLOOKUP with XLOOKUP that returns a default when not found; (2) Use INDEX/MATCH to look up a value to the left of the key column
- Common misconception addressed: Relying on VLOOKUP's 4th argument default of approximate match on unsorted data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VLOOKUP/HLOOKUP exact vs approximate match | 120 | 7 |
| M01L02 | INDEX and MATCH for flexible, left-safe lookups | 120 | 7 |

### M02 XLOOKUP and XMATCH (25% (design weight), design weight)

- Worked applications: (1) Do a reverse XLOOKUP to find the most recent matching record; (2) Return several columns at once with a single XLOOKUP
- Common misconception addressed: Assuming XLOOKUP needs the data sorted like approximate VLOOKUP
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | XLOOKUP arguments, defaults and if-not-found | 120 | 7 |
| M02L02 | Reverse search, approximate modes and XMATCH | 120 | 7 |

### M03 Dynamic arrays (25% (design weight), design weight)

- Worked applications: (1) Produce a live list of unique customers with UNIQUE and SORT; (2) Filter a table to one region that spills and updates automatically
- Common misconception addressed: Typing over cells below a spill and causing a #SPILL! error
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | FILTER, SORT, SORTBY and UNIQUE | 120 | 7 |
| M03L02 | SEQUENCE, spill ranges and the # reference | 120 | 7 |

### M04 Composing robust report formulas (25% (design weight), design weight)

- Worked applications: (1) Build a one-formula top-5 report with SORT and TAKE/FILTER; (2) Reference a spill range with H2# so downstream formulas resize automatically
- Common misconception addressed: Converting a dynamic array to static values and losing auto-recalculation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Nesting lookups inside arrays | 120 | 7 |
| M04L02 | Avoiding #SPILL! and volatile recalculation traps | 120 | 7 |

## Integrative case

A sales analyst must turn a 20,000-row transactions sheet into a self-updating dashboard feed: a unique customer list, a filtered regional view, and a reverse lookup of each customer's latest order, all built so a refreshed export recalculates with no manual edits.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2651-final-protected | 40 | 40 | yes |
| MST-2651-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Classic lookups and their limits | 10 |
| XLOOKUP and XMATCH | 10 |
| Dynamic arrays | 10 |
| Composing robust report formulas | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2651-Q0001** (single-answer, Select ONE) You must look up a price using a key that sits to the right of the return column, on unsorted data. Which approach is most reliable?

- A. XLOOKUP, or INDEX/MATCH, both of which look up in any direction **(key)**  
  _Rationale:_ Correct: neither requires the return column to be to the right, and both default to exact match.
- B. VLOOKUP, which can look to the left  
  _Rationale:_ VLOOKUP cannot return a column to the left of the key.
- C. HLOOKUP with approximate match  
  _Rationale:_ HLOOKUP is for horizontal data and approximate match misfires on unsorted data.
- D. A manual sort then VLOOKUP approximate  
  _Rationale:_ That is fragile and still cannot look left.

**MST-2651-Q0002** (multiple-answer, Select TWO) Which TWO statements about dynamic-array formulas are correct? (Select TWO.)

- A. FILTER returns a spilling result that resizes as source data changes **(key)**  
  _Rationale:_ Correct: dynamic arrays spill and recalculate automatically.
- B. You can reference a spill range with the # operator, e.g. A2# **(key)**  
  _Rationale:_ Correct: the # suffix refers to the whole spilled range.
- C. Dynamic arrays require pressing Ctrl+Shift+Enter like legacy arrays  
  _Rationale:_ Modern dynamic arrays spill automatically with a normal Enter.
- D. A #SPILL! error means the formula syntax is wrong  
  _Rationale:_ #SPILL! means the output range is blocked, not that the syntax is invalid.

**MST-2651-Q0003** (single-answer, Select ONE) A formula shows #SPILL!. What is the correct first step?

- A. Clear the cells blocking the spill range below or beside the formula **(key)**  
  _Rationale:_ Correct: #SPILL! occurs when something obstructs where the array needs to expand.
- B. Wrap the formula in IFERROR to hide it  
  _Rationale:_ That conceals the problem without resolving the blockage.
- C. Convert the workbook to an older format  
  _Rationale:_ File format is not the cause.
- D. Delete the formula entirely  
  _Rationale:_ The formula is valid; only the spill area must be cleared.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
