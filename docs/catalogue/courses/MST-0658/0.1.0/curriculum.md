# Copilot in Word: Drafting, Editing, and Source Checking

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0658` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft 365 Copilot documentation read via the Microsoft Learn MCP on 2026-10-02 (prompt/grounding flow, Microsoft Graph grounding, enterprise data protection, permission trimming). The specific in-Word Copilot command set changes frequently and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-overview; https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-architecture |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-COPILOT-WORD |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Copilot in Word: Drafting, Editing, and Source Checking (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Copilot in Word to draft and rewrite document content from a prompt
2. Ground a draft in a reference document and understand what grounding means
3. Verify Copilot output against sources before use
4. Apply confidentiality and permission awareness to Copilot in Word
5. Judge when Copilot assistance is and is not appropriate for a document

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Copilot in Word fundamentals (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Draft a one-page summary from a prompt; (2) Rewrite a paragraph for a named audience
- Common misconception addressed: Treating Copilot's fluent output as automatically accurate
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Copilot in Word does | 88 | 5 |
| M01L02 | How a prompt is grounded and answered | 88 | 5 |

### M02 Grounding a draft in sources (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Ground a draft in a brief and compare to an ungrounded draft; (2) Identify which claims came from the source
- Common misconception addressed: Believing grounding guarantees every sentence is sourced and correct
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Referencing a document to ground a draft | 88 | 5 |
| M02L02 | What Microsoft Graph grounding does and does not do | 87 | 5 |

### M03 Verification and accountability (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Check three claims against the source document; (2) Write an AI-assistance note for a deliverable
- Common misconception addressed: Assuming a cited-looking reference produced by Copilot is real
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Fact-checking claims and figures | 87 | 5 |
| M03L02 | Recording what was AI-assisted | 87 | 5 |
| M03L03 | Handling citations and quotes responsibly | 87 | 5 |

### M04 Confidentiality and permissions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify content as safe or restricted for a prompt; (2) Explain why Copilot cannot surface a file a user lacks access to
- Common misconception addressed: Assuming Copilot can retrieve content the user has no permission to see
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Enterprise data protection and what not to paste | 87 | 5 |
| M04L02 | Permission trimming and sensitivity labels | 87 | 5 |

### M05 Choosing when to use Copilot (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide suitability for three document tasks; (2) Plan a draft-verify-record workflow
- Common misconception addressed: Delegating final sign-off judgement to the tool
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Appropriate and inappropriate tasks | 87 | 5 |
| M05L02 | A responsible drafting workflow end to end | 87 | 5 |

## Integrative case

A consultant drafts a client proposal in Word with Copilot grounded in a brief and a prior report, then verifies every claim and figure against the sources and records what was AI-assisted before sending.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0658-final-protected | 30 | 40 | yes |
| MST-0658-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Copilot in Word fundamentals | 5 |
| Grounding a draft in sources | 6 |
| Verification and accountability | 7 |
| Confidentiality and permissions | 6 |
| Choosing when to use Copilot | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0658-Q0001** (single-answer, Select ONE) Copilot in Word returns a confident paragraph citing a statistic. Before using it in a client proposal, what must happen?

- A. The statistic is verified against a trusted source **(key)**  
  _Rationale:_ Correct: Copilot output can be wrong, so externally reported figures must be verified.
- B. The paragraph is accepted because Copilot sounds confident  
  _Rationale:_ Confident phrasing is not evidence of accuracy.
- C. The document is simply made longer  
  _Rationale:_ Length does not address accuracy.
- D. The figure is left unchecked because it was AI-generated  
  _Rationale:_ AI generation is a reason to verify, not to skip verification.

**MST-0658-Q0002** (multiple-answer, Select TWO) Which TWO statements about Microsoft 365 Copilot grounding and permissions are correct? (Select TWO.)

- A. Copilot trims results to content the signed-in user can already access **(key)**  
  _Rationale:_ Correct: permission trimming means Copilot cannot surface files the user lacks access to.
- B. Grounding can pull relevant organizational context into a prompt **(key)**  
  _Rationale:_ Correct: grounding brings in relevant tenant data the user is permitted to see.
- C. Grounding guarantees every generated sentence is factually correct  
  _Rationale:_ Grounding improves relevance but does not guarantee correctness.
- D. Copilot ignores sensitivity labels on documents  
  _Rationale:_ Copilot honours sensitivity labels and their protection settings.

**MST-0658-Q0003** (single-answer, Select ONE) Which task is least appropriate to fully delegate to Copilot in Word without review?

- A. Final sign-off that a contract clause is legally correct **(key)**  
  _Rationale:_ Correct: legal correctness requires qualified human judgement, not unreviewed AI output.
- B. Producing a first draft of a summary  
  _Rationale:_ Drafting is a reasonable assisted task when reviewed.
- C. Suggesting a clearer phrasing of a sentence  
  _Rationale:_ Rephrasing suggestions are a reasonable assisted task.
- D. Generating an outline to react to  
  _Rationale:_ Outlining is a reasonable assisted task.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
