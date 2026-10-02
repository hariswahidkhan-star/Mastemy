# Gemini for Google Cloud

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1457` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-GEMINI (https://cloud.google.com/gemini/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Gemini for Google Cloud (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what Gemini for Google Cloud offers across the platform
2. Use Gemini Code Assist in the IDE and Cloud Shell
3. Use Gemini assistance in the Cloud console for operations
4. Write effective prompts for cloud and coding tasks
5. Verify and review Gemini output before acting on it
6. Apply data, privacy and responsible-use practices with Gemini

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Gemini for Google Cloud overview (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map three team tasks to the matching Gemini surface; (2) Explain where Gemini runs and what it can see
- Common misconception addressed: Assuming Gemini has live access to all your resources by default
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Gemini for Google Cloud provides | 48 | 5 |
| M01L02 | Surfaces, access and setup | 48 | 5 |

### M02 Gemini Code Assist (MASTEMY-DESIGN 16%)

- Worked applications: (1) Scaffold a function and ask Gemini to explain it; (2) Use Code Assist to refactor and add tests to a snippet
- Common misconception addressed: Accepting generated code without reading or testing it
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Code Assist in the IDE | 48 | 5 |
| M02L02 | Code Assist in Cloud Shell | 48 | 5 |

### M03 Gemini in the console (MASTEMY-DESIGN 17%)

- Worked applications: (1) Ask Gemini to summarize a log-based incident; (2) Use console assistance to draft a gcloud command
- Common misconception addressed: Treating console assistance output as an authoritative action log
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Assisted troubleshooting | 48 | 5 |
| M03L02 | Assisted configuration and queries | 48 | 5 |

### M04 Prompting for cloud tasks (MASTEMY-DESIGN 17%)

- Worked applications: (1) Rewrite a vague prompt into a specific, scoped one; (2) Add context and constraints to a prompt for better output
- Common misconception addressed: Writing one-line prompts and expecting production-ready answers
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Prompt structure and context | 48 | 5 |
| M04L02 | Iterating and constraining prompts | 48 | 5 |

### M05 Verifying output (MASTEMY-DESIGN 17%)

- Worked applications: (1) Check a generated command against official documentation; (2) Review generated IAM changes before applying them
- Common misconception addressed: Trusting cited facts from the model without checking them
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Why and how to verify | 48 | 5 |
| M05L02 | Review workflow for risky changes | 48 | 5 |

### M06 Data, privacy and responsible use (MASTEMY-DESIGN 17%)

- Worked applications: (1) Decide what data is safe to include in a prompt; (2) Document a responsible-use policy for the team
- Common misconception addressed: Pasting secrets or regulated data into prompts
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Data handling and privacy | 48 | 5 |
| M06L02 | Responsible use and policy | 48 | 5 |

## Integrative case

A platform team adopts Gemini for Google Cloud: use Code Assist to scaffold and explain Terraform, use console assistance to investigate an incident, establish a prompt and review standard so suggestions are verified, and document the data-handling and responsible-use guardrails for the team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1457-final-protected | 30 | 30 | yes |
| MST-1457-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Gemini for Google Cloud overview | 5 |
| Gemini Code Assist | 5 |
| Gemini in the console | 5 |
| Prompting for cloud tasks | 5 |
| Verifying output | 5 |
| Data, privacy and responsible use | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1457-Q0001** (single-answer, Select ONE) Gemini Code Assist generates a shell command to delete resources. What is the safest next step?

- A. Review the command and confirm it against official docs before running **(key)**  
  _Rationale:_ Correct: generated commands must be verified before any destructive action.
- B. Run it immediately to save time  
  _Rationale:_ Running an unreviewed destructive command risks data loss.
- C. Assume it is correct because it cites a doc  
  _Rationale:_ Citations can be wrong; verification is still required.
- D. Grant the model owner permissions so it can run itself  
  _Rationale:_ Over-granting IAM to an assistant is unsafe and unnecessary.

**MST-1457-Q0002** (multiple-answer, Select TWO) Which TWO are good practices when prompting Gemini for Google Cloud? (Select TWO.)

- A. Provide specific context and constraints in the prompt **(key)**  
  _Rationale:_ Correct: context and constraints produce more useful, scoped output.
- B. Keep secrets and regulated data out of prompts **(key)**  
  _Rationale:_ Correct: sensitive data should not be placed in prompts.
- C. Paste production credentials so the model can act directly  
  _Rationale:_ Credentials must never be shared in prompts.
- D. Accept the first answer without iterating  
  _Rationale:_ Iterating and refining usually improves the result.

**MST-1457-Q0003** (single-answer, Select ONE) Which surface is designed to help you write and explain code inside your IDE?

- A. Gemini Code Assist **(key)**  
  _Rationale:_ Correct: Code Assist is the coding surface in the IDE and Cloud Shell.
- B. The BigQuery console  
  _Rationale:_ The BigQuery console is for queries, not IDE coding assistance.
- C. Cloud Billing reports  
  _Rationale:_ Billing reports show cost, not code help.
- D. Cloud Storage browser  
  _Rationale:_ The Storage browser manages objects, not code.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
