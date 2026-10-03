# Tool Use and Function Calling for LLM Agents

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2051` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral skills course; concepts versioned by verification date. No issuer syllabus; outcomes are Mastemy internal IDs. Provider function-calling schemas and limits must be re-checked against current docs at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Tool Use and Function Calling for LLM Agents (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how function calling lets a model request actions and receive structured results
2. Write clear tool schemas (names, descriptions, typed parameters) a model can use reliably
3. Handle the tool-call lifecycle: parse the request, execute, validate and return results
4. Design error handling and validation for malformed or unsafe tool arguments
5. Decide which capabilities to expose as tools and how to scope their permissions
6. Test and debug tool use, including when the model picks the wrong tool

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Function-calling fundamentals (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace a single turn where the model requests a weather lookup and uses the returned data; (2) Rewrite a vague tool description so the model stops misusing it
- Common misconception addressed: Thinking the model executes the function itself rather than requesting a call the application runs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What function/tool calling is and the request-result cycle | 120 | 7 |
| M01L02 | Structured outputs vs free text and why schemas matter | 120 | 7 |

### M02 Designing tool schemas (25% (Mastemy design weight), design weight)

- Worked applications: (1) Write a typed schema for a 'create_invoice' tool with required and optional fields; (2) Split one overloaded 'do_everything' tool into three focused tools
- Common misconception addressed: Assuming longer tool descriptions are always better regardless of clarity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Naming, descriptions and typed parameters the model understands | 120 | 7 |
| M02L02 | Keeping tool sets small, orthogonal and unambiguous | 120 | 7 |

### M03 The execution lifecycle (25% (Mastemy design weight), design weight)

- Worked applications: (1) Add validation that rejects a negative quantity before executing a tool; (2) Design a retry that feeds a tool error back to the model for correction
- Common misconception addressed: Returning a raw stack trace to the model instead of a structured, actionable error
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Parsing a tool call, executing it and returning results to the model | 120 | 7 |
| M03L02 | Validating arguments and handling errors and retries | 120 | 7 |

### M04 Safety and testing (25% (Mastemy design weight), design weight)

- Worked applications: (1) Scope a file tool to a single directory with read-only access; (2) Build a test where two similar tools exist and check the model picks the right one
- Common misconception addressed: Exposing a destructive tool with no confirmation or permission scoping
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Scoping permissions and least-privilege tool access | 120 | 7 |
| M04L02 | Debugging wrong-tool and wrong-argument selections | 120 | 7 |

## Integrative case

A team adds tools to a customer-support agent so it can look up orders, issue refunds and send emails: design clear typed tool schemas, implement the call lifecycle with argument validation, scope the refund tool's permissions, and build tests that catch when the model chooses the wrong tool.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2051-final-protected | 40 | 40 | yes |
| MST-2051-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Function-calling fundamentals | 10 |
| Designing tool schemas | 10 |
| The execution lifecycle | 10 |
| Safety and testing | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2051-Q0001** (single-answer, Select ONE) A model keeps calling a 'search' tool when the user clearly wants to 'create_ticket'. The tools are named and typed correctly. What is the most likely fix?

- A. Improve the tool descriptions so each states precisely when it should and should not be used **(key)**  
  _Rationale:_ Correct: descriptions are the model's main signal for tool selection; disambiguating them fixes mis-selection.
- B. Delete the search tool  
  _Rationale:_ Removing a needed capability is not a general fix for selection errors.
- C. Lower the model's context window  
  _Rationale:_ Context size is unrelated to tool-selection clarity.
- D. Return the search results as an image  
  _Rationale:_ Output format does not fix which tool is chosen.

**MST-2051-Q0002** (multiple-answer, Select TWO) Which TWO practices make tool arguments safer to execute? (Select TWO.)

- A. Validate and type-check arguments before executing the tool **(key)**  
  _Rationale:_ Correct: validation catches malformed or unsafe arguments.
- B. Scope each tool to the least privilege it needs **(key)**  
  _Rationale:_ Correct: least privilege limits the damage of a bad call.
- C. Trust any arguments the model produces because it is usually right  
  _Rationale:_ Blind trust is exactly the unsafe practice to avoid.
- D. Execute every tool with full administrator rights for convenience  
  _Rationale:_ Over-privileged tools magnify harm from mistakes.

**MST-2051-Q0003** (single-answer, Select ONE) What happens in function calling after the model emits a tool call?

- A. The application parses the call, executes the function, and returns the result to the model for the next step **(key)**  
  _Rationale:_ Correct: the model requests; the application executes and returns results.
- B. The model directly runs the code inside itself  
  _Rationale:_ The model only requests a call; it does not execute code.
- C. The conversation ends automatically  
  _Rationale:_ The result is normally fed back so the model can continue.
- D. The result is discarded  
  _Rationale:_ The result is returned to the model to use.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
