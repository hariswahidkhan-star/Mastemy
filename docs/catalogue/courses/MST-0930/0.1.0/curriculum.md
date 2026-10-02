# PowerShell: Cross-Platform Administration and Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0930` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — PowerShell: Cross-Platform Administration and Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. PowerShell fundamentals
2. Objects and the pipeline
3. Variables, types and operators
4. Flow control and scripting
5. Functions, parameters and modules
6. Administration and automation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 PowerShell fundamentals (MASTEMY-DESIGN 17%)

- Worked applications: (1) Discover a command's capabilities with Get-Help and Get-Member; (2) Run a cmdlet and inspect the objects it returns
- Common misconception addressed: Treating PowerShell output as plain text rather than objects
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The object pipeline and cmdlets | 80 | 6 |
| M01L02 | Getting help and discovering commands | 80 | 6 |

### M02 Objects and the pipeline (MASTEMY-DESIGN 17%)

- Worked applications: (1) Filter objects in the pipeline with Where-Object; (2) Select and compute properties with Select-Object
- Common misconception addressed: Assuming Where-Object and Select-Object do the same thing
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Filtering and selecting | 80 | 6 |
| M02L02 | Sorting, grouping and measuring | 80 | 6 |

### M03 Variables, types and operators (MASTEMY-DESIGN 17%)

- Worked applications: (1) Store and reuse pipeline results in a variable; (2) Compare values with the correct comparison operators
- Common misconception addressed: Expecting comparison with = instead of -eq
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Variables and data types | 80 | 6 |
| M03L02 | Operators and expressions | 80 | 6 |

### M04 Flow control and scripting (MASTEMY-DESIGN 17%)

- Worked applications: (1) Branch and loop over a collection of objects; (2) Save reusable logic to a .ps1 script
- Common misconception addressed: Forgetting that script execution policy can block a script
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Conditionals and loops | 80 | 6 |
| M04L02 | Scripts and execution policy | 80 | 6 |

### M05 Functions, parameters and modules (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a function with typed, validated parameters; (2) Support pipeline input in a function
- Common misconception addressed: Believing advanced function parameters validate input automatically without attributes
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Functions and parameters | 80 | 6 |
| M05L02 | Parameter validation and modules | 80 | 6 |

### M06 Administration and automation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Export collected objects to CSV and JSON; (2) Add error handling with try/catch and -ErrorAction
- Common misconception addressed: Assuming every cmdlet behaves identically on Windows and Linux
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Working with files, services and remoting | 80 | 6 |
| M06L02 | Error handling, logging and cross-platform notes | 80 | 6 |

## Integrative case

Build a cross-platform PowerShell script that audits a set of machines: collect system and service information as objects, filter and sort the results, export a CSV report, and package the logic into a reusable function with parameters and error handling.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0930-final-protected | 30 | 30 | yes |
| MST-0930-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0930-Q0001** (single-answer, Select ONE) What flows between stages of a PowerShell pipeline?

- A. .NET objects **(key)**  
  _Rationale:_ Correct: PowerShell passes rich objects, not plain text, between pipeline stages.
- B. Only plain text lines  
  _Rationale:_ Unlike traditional shells, PowerShell passes objects, not text.
- C. Binary file handles  
  _Rationale:_ The pipeline carries objects, not raw file handles.
- D. HTML fragments  
  _Rationale:_ Objects, not HTML, move through the pipeline.

**MST-0930-Q0002** (multiple-answer, Select TWO) Which TWO comparison operators are valid in PowerShell? (Select TWO)

- A. -eq **(key)**  
  _Rationale:_ Correct: -eq tests equality in PowerShell.
- B. -gt **(key)**  
  _Rationale:_ Correct: -gt tests greater-than in PowerShell.
- C. ==  
  _Rationale:_ == is not a PowerShell comparison operator.
- D. >  
  _Rationale:_ > is redirection in PowerShell, not comparison.

**MST-0930-Q0003** (single-answer, Select ONE) Which cmdlet lists the properties and methods available on an object?

- A. Get-Member **(key)**  
  _Rationale:_ Correct: Get-Member reveals an object's properties and methods.
- B. Get-Content  
  _Rationale:_ Get-Content reads file contents, not object members.
- C. Get-History  
  _Rationale:_ Get-History lists previously run commands.
- D. Get-Location  
  _Rationale:_ Get-Location returns the current path.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
