# PowerShell Scripting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1531` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-PS-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — PowerShell Scripting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. PowerShell foundations
2. The object pipeline
3. Variables, types and operators
4. Flow control and functions
5. Collections, hashtables and strings
6. Files, data formats and providers
7. Errors, scripts and modules
8. Remoting, jobs and automation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live administration; scripts and system changes are taught through instructor-built walkthroughs.

## Modules

### M01 PowerShell foundations (MASTEMY-DESIGN 12%)

- Worked applications: (1) Discover the cmdlet for a task using Get-Command; (2) Read a cmdlet's examples with Get-Help -Examples
- Common misconception addressed: Guessing cmdlet names instead of using discovery cmdlets
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Cross-platform PowerShell, the console and VS Code | 90 | 6 |
| M01L02 | Cmdlets, verb-noun naming and Get-Help/Get-Command | 90 | 6 |

### M02 The object pipeline (MASTEMY-DESIGN 14%)

- Worked applications: (1) Filter running processes over a memory threshold; (2) Project and sort selected properties into a table
- Common misconception addressed: Treating pipeline output as plain text as in a traditional shell
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Objects vs text and passing objects down the pipeline | 90 | 6 |
| M02L02 | Select-Object, Where-Object and Sort-Object | 90 | 6 |

### M03 Variables, types and operators (MASTEMY-DESIGN 12%)

- Worked applications: (1) Coerce user input to an integer and validate a range; (2) Match hostnames with -like wildcards
- Common misconception addressed: Expecting -eq to be case-sensitive by default
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Variables, common types and type conversion | 90 | 6 |
| M03L02 | Comparison, logical and the -match/-like operators | 90 | 6 |

### M04 Flow control and functions (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write a function with a typed, mandatory parameter; (2) Loop over a collection and act on each item
- Common misconception addressed: Confusing the foreach statement with the ForEach-Object cmdlet
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | if/switch, for/foreach and while loops | 90 | 6 |
| M04L02 | Functions, parameters and the param block | 90 | 6 |

### M05 Collections, hashtables and strings (MASTEMY-DESIGN 12%)

- Worked applications: (1) Build a hashtable config and read values from it; (2) Extract fields from a log line with a regex
- Common misconception addressed: Appending to a fixed-size array in a tight loop expecting good performance
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Arrays and hashtables | 90 | 6 |
| M05L02 | String formatting, here-strings and regex basics | 90 | 6 |

### M06 Files, data formats and providers (MASTEMY-DESIGN 13%)

- Worked applications: (1) Export a report to CSV and read it back; (2) Parse a JSON config into objects
- Common misconception addressed: Assuming providers only expose the filesystem
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | The filesystem provider, paths and Get-ChildItem | 90 | 6 |
| M06L02 | Import/Export of CSV, JSON and the registry provider | 90 | 6 |

### M07 Errors, scripts and modules (MASTEMY-DESIGN 12%)

- Worked applications: (1) Wrap a risky call in try/catch with a clear message; (2) Package reusable functions into a module
- Common misconception addressed: Relying on try/catch for a non-terminating error without -ErrorAction Stop
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Terminating vs non-terminating errors, try/catch and -ErrorAction | 90 | 6 |
| M07L02 | Scripts, scopes, dot-sourcing and modules | 90 | 6 |

### M08 Remoting, jobs and automation (MASTEMY-DESIGN 12%)

- Worked applications: (1) Run a command on a remote session and collect objects; (2) Start a background job and receive its results
- Common misconception addressed: Believing the execution policy is a security boundary rather than a safety guard
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Remoting with Invoke-Command and PSSessions | 90 | 6 |
| M08L02 | Background jobs, scheduling and the execution policy | 90 | 6 |

## Integrative case

Build an inventory-reporting toolkit: a module of functions that collect process, disk and service data as objects, filter and sort them through the pipeline, handle errors with try/catch, export results to CSV and JSON, run the collection against a remote session, and schedule it as a background job.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1531-final-protected | 40 | 40 | yes |
| MST-1531-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| PowerShell foundations | 5 |
| The object pipeline | 5 |
| Variables, types and operators | 5 |
| Flow control and functions | 5 |
| Collections, hashtables and strings | 5 |
| Files, data formats and providers | 5 |
| Errors, scripts and modules | 5 |
| Remoting, jobs and automation | 5 |

Minimum reviewed item bank: 524 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1531-Q0001** (single-answer, Select ONE) What fundamentally flows between cmdlets in a PowerShell pipeline?

- A. .NET objects with properties and methods **(key)**  
  _Rationale:_ Correct: PowerShell passes rich objects, so downstream cmdlets can select and filter by property.
- B. Only plain lines of text  
  _Rationale:_ Traditional shells pass text; PowerShell passes objects.
- C. File handles  
  _Rationale:_ File handles are not what the pipeline carries.
- D. Compiled binaries  
  _Rationale:_ The pipeline carries data objects, not executables.

**MST-1531-Q0002** (multiple-answer, Select TWO) Which statements about error handling in PowerShell are correct? (Select TWO)

- A. try/catch reliably catches a non-terminating error only if you add -ErrorAction Stop **(key)**  
  _Rationale:_ Correct: non-terminating errors must be escalated to terminating with -ErrorAction Stop (or $ErrorActionPreference) to be caught.
- B. A terminating error stops the current pipeline and can be caught by catch **(key)**  
  _Rationale:_ Correct: terminating errors transfer control to the catch block.
- C. catch blocks run even when no error occurred  
  _Rationale:_ catch runs only when a terminating error is thrown in the try block.
- D. Write-Error always stops the script  
  _Rationale:_ Write-Error produces a non-terminating error by default and does not stop the script.

**MST-1531-Q0003** (single-answer, Select ONE) By default, how does the -eq comparison operator treat letter case for strings?

- A. Case-insensitive **(key)**  
  _Rationale:_ Correct: -eq is case-insensitive by default; use -ceq for a case-sensitive comparison.
- B. Case-sensitive  
  _Rationale:_ That is -ceq; the plain -eq ignores case.
- C. It throws an error on strings  
  _Rationale:_ -eq compares strings without error.
- D. It only compares the first character  
  _Rationale:_ -eq compares the whole string value.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
