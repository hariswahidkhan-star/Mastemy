# GitHub Copilot Certification Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0200` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GitHub (Microsoft) (no affiliation or endorsement) |
| Exam code | GH-300 |
| Version basis | Skills measured as of 2026-08-07. NOTE: the official 'skills at a glance' lists an extra 'GitHub Copilot features (25-30%)' line with no detail section; this spec follows the six detailed sections and records the anomaly as an unresolved issue. |
| Evidence | **verified-official-source** - sources: SRC-MS-GH300 |
| Legacy IDs | MST-MIC-GH-GH300-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 54 / module checks 96 / cumulative 210 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

Split note: Split adjusted from default 5/7/8% to lesson 54 / module 96 / cumulative 210 min so the required cumulative forms fit; total assessment stays 360 min (20%).

## Learning outcomes

1. Describe risks, limitations and responsible use of generative AI coding tools and validate AI output
2. Use Copilot in the IDE, CLI, chat, agent mode, code review and organisation settings
3. Explain Copilot data flow, prompt building, filtering and the suggestion lifecycle
4. Craft prompts and context (zero-shot, few-shot, prompt files) for better results
5. Use Copilot for refactoring, documentation, tests and security improvements
6. Configure content exclusions, public-code filtering and troubleshoot suggestions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Use GitHub Copilot responsibly (15-20%)

- Worked applications: (1) Review an AI-generated function that compiles but mishandles nulls; (2) Write a team policy on validating AI output
- Common misconception addressed: Accepting suggestions because they compile
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Understand responsible AI principles | 132 | 3 |
| M01L02 | Validate and operate AI tools | 133 | 3 |

### M02 Use GitHub Copilot features (25-30%)

- Worked applications: (1) Use agent mode for a multi-file change and review the diff; (2) Configure Copilot code review policies for an organisation
- Common misconception addressed: Assuming agent mode output is merge-ready without tests
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Use GitHub Copilot in the IDE | 104 | 3 |
| M02L02 | Use GitHub Copilot CLI | 104 | 3 |
| M02L03 | Use GitHub Copilot features and capabilities | 104 | 3 |
| M02L04 | Manage organization-wide settings and policies | 105 | 3 |

### M03 Understand GitHub Copilot data and architecture (10-15%)

- Worked applications: (1) Trace a prompt from editor context to filtered suggestion; (2) Explain why a suggestion references outdated APIs
- Common misconception addressed: Believing Copilot reads the whole repository for every suggestion
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Describe data handling and flow | 95 | 3 |
| M03L02 | Understand lifecycle and limitations | 95 | 3 |

### M04 Apply prompt engineering and context crafting (10-15%)

- Worked applications: (1) Turn a vague chat request into a few-shot prompt with examples; (2) Create a reusable prompt file for a team convention
- Common misconception addressed: Thinking longer prompts are always better
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Craft effective prompts | 95 | 3 |
| M04L02 | Engineer prompts for performance | 95 | 3 |

### M05 Improve developer productivity with GitHub Copilot (10-15%)

- Worked applications: (1) Generate unit tests and add missing edge-case assertions; (2) Modernise a legacy loop with Copilot and verify behaviour
- Common misconception addressed: Treating generated tests as proof of correctness
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Enhance productivity and code quality | 94 | 3 |
| M05L02 | Support testing and security | 95 | 3 |

### M06 Configure privacy, content exclusions, and safeguards (10-15%)

- Worked applications: (1) Exclude a secrets folder from Copilot context; (2) Enable public-code matching filter and handle a flagged suggestion
- Common misconception addressed: Assuming content exclusions apply retroactively to all features
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Manage privacy settings and exclusions | 94 | 3 |
| M06L02 | Apply safeguards and troubleshoot | 95 | 3 |

## Integrative case

A platform team rolls Copilot out to 200 developers: set organisation policies and exclusions, define review standards, and measure the effect on a legacy-modernisation backlog while keeping humans accountable.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0200-practice-form-A | 50 | 100 | yes |
| MST-0200-practice-form-B | 50 | 100 | no (optional practice) |
| MST-0200-practice-form-C | 50 | 100 | no (optional practice) |
| MST-0200-final-protected | 50 | 100 | yes |

| Domain | Items per form |
|---|---|
| Use GitHub Copilot responsibly | 9 |
| Use GitHub Copilot features | 14 |
| Understand GitHub Copilot data and architecture | 7 |
| Apply prompt engineering and context crafting | 7 |
| Improve developer productivity with GitHub Copilot | 7 |
| Configure privacy, content exclusions, and safeguards | 6 |

Minimum reviewed item bank: 476 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0200-Q0001** (single-answer, Select ONE) A developer must stop Copilot from using files in a folder that contains customer data. What should be configured?

- A. Content exclusions for that path **(key)**  
  _Rationale:_ Correct: content exclusions are the documented control for keeping specific files or repositories out of Copilot context.
- B. A higher model temperature  
  _Rationale:_ Temperature does not control data access.
- C. Public-code matching filter  
  _Rationale:_ That filter blocks suggestions matching public code; it does not exclude private files.
- D. Rename the folder  
  _Rationale:_ Renaming does not change Copilot's access.

**MST-0200-Q0002** (multiple-answer, Select TWO) Which TWO practices reflect responsible use of Copilot suggestions? (Select TWO.)

- A. Review and test generated code before merging **(key)**  
  _Rationale:_ Correct: the outline stresses validating AI output.
- B. Accept suggestions that compile without reading them  
  _Rationale:_ Compiling does not prove correctness or security.
- C. Check suggestions for security issues such as injection **(key)**  
  _Rationale:_ Correct: suggesting and checking security improvements is in scope.
- D. Disable code review because Copilot wrote the code  
  _Rationale:_ AI-generated code still needs human review.

**MST-0200-Q0003** (single-answer, Select ONE) You want consistent Copilot Chat answers that follow your team's API conventions across sessions. What helps most?

- A. A reusable prompt file or instructions file with the conventions **(key)**  
  _Rationale:_ Correct: prompt-file reuse and instruction files are named for consistent responses.
- B. Clearing chat history each time  
  _Rationale:_ That removes context rather than adding conventions.
- C. Switching IDEs  
  _Rationale:_ The IDE choice does not encode conventions.
- D. Using zero-shot prompts only  
  _Rationale:_ Zero-shot prompts provide no convention examples.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
