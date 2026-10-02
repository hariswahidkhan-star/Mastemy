# AI Pair Programming: Human Review and Accountability

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0575` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | MST-AI-SK-ACAD-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI Pair Programming: Human Review and Accountability (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain AI pair-programming workflows and their risks
2. Review AI-generated changes with appropriate rigour
3. Assign clear ownership and accountability for merged code
4. Handle attribution, licensing and provenance concerns
5. Design merge gates that enforce human review
6. Build team norms and policy for responsible AI pairing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 What AI pair programming is (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Describe a healthy pairing loop with AI; (2) Identify where the human must stay in control
- Common misconception addressed: Treating the assistant as the author of record
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The pairing loop | 80 | 8 |
| M01L02 | Human-in-the-loop boundaries | 80 | 8 |

### M02 Human review of AI changes (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Review an AI diff for correctness and intent; (2) Catch subtle logic and security issues
- Common misconception addressed: Skimming AI diffs because 'it looks right'
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Reviewing for correctness and intent | 80 | 8 |
| M02L02 | Review depth proportional to risk | 80 | 8 |

### M03 Accountability and ownership (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Define who owns an AI-authored change; (2) Set sign-off expectations before merge
- Common misconception addressed: Blaming the tool when AI code fails
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Ownership of merged code | 80 | 8 |
| M03L02 | Sign-off and responsibility | 80 | 8 |

### M04 Attribution, licensing and provenance (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Check generated code for licence concerns; (2) Record provenance of AI contributions
- Common misconception addressed: Assuming generated code is always safe to use
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Licensing and provenance | 80 | 8 |
| M04L02 | Recording AI contribution | 80 | 8 |

### M05 Review gates and automation (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Configure required reviews for AI changes; (2) Add checks that AI output must pass
- Common misconception addressed: Automating merges past human judgement
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Required reviews and gates | 80 | 8 |
| M05L02 | Checks AI output must pass | 80 | 8 |

### M06 Team culture and policy (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Draft a team policy for AI pairing; (2) Coach a reviewer on accountable practice
- Common misconception addressed: No shared norms for AI use
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Norms and expectations | 80 | 8 |
| M06L02 | Policy and continuous improvement | 80 | 8 |

## Integrative case

A team adopts AI pair programming. Define where a human must review and own AI-authored changes, design review checklists and merge gates, handle attribution and licensing, and build a culture where accountability stays with people, then defend the policy to an auditor.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0575-final-protected | 40 | 40 | yes |
| MST-0575-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What AI pair programming is | 7 |
| Human review of AI changes | 7 |
| Accountability and ownership | 7 |
| Attribution, licensing and provenance | 7 |
| Review gates and automation | 6 |
| Team culture and policy | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0575-Q0001** (single-answer, Select ONE) AI-generated code is merged and later causes an incident. Who is accountable?

- A. The human who reviewed and merged the change owns it **(key)**  
  _Rationale:_ Correct: accountability stays with the people who approve and merge.
- B. The AI model vendor  
  _Rationale:_ The vendor is not the author of record for your merge.
- C. No one, since AI wrote it  
  _Rationale:_ Code in your repo has human owners.
- D. The original prompt author only, never the reviewer  
  _Rationale:_ The reviewer who approved also shares ownership.

**MST-0575-Q0002** (multiple-answer, Select TWO) Which TWO practices keep accountability with humans in AI pairing? (Select TWO.)

- A. Require human review and sign-off before AI changes merge **(key)**  
  _Rationale:_ Correct: review gates keep a human responsible.
- B. Record provenance of AI-authored contributions **(key)**  
  _Rationale:_ Correct: provenance supports ownership and auditing.
- C. Auto-merge any change the assistant produces  
  _Rationale:_ That removes human judgement.
- D. Let the assistant approve its own pull requests  
  _Rationale:_ Self-approval defeats accountability.

**MST-0575-Q0003** (single-answer, Select ONE) A reviewer skims a large AI diff because 'it looks right'. What principle is violated?

- A. Review depth should be proportional to the change's risk, not its appearance **(key)**  
  _Rationale:_ Correct: risk, not surface polish, sets review depth.
- B. Reviews should always be instant  
  _Rationale:_ Speed is not the governing principle.
- C. AI diffs never need review  
  _Rationale:_ They require review like any change.
- D. Only compilation matters  
  _Rationale:_ Compilation does not establish correctness or intent.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
