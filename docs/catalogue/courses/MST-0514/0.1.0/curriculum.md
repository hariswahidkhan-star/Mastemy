# Claude Artifacts: Interactive Content and Application Prototypes

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0514` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude product and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-ARTIFACTS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Artifacts: Interactive Content and Application Prototypes (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what Claude Artifacts are and choose when an Artifact fits a task
2. Build and iteratively refine an Artifact from a professional request
3. Prototype interactive content as an Artifact and judge its production limits
4. Share Artifacts responsibly with appropriate privacy and documentation
5. Integrate Artifacts into an end-to-end professional deliverable workflow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Artifacts and when to use them (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Decide for five deliverables whether an Artifact or a plain chat reply fits; (2) Open an Artifact from a request and identify its editable regions
- Common misconception addressed: Treating every Claude reply as an Artifact when a short chat answer would do
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What an Artifact is and how it differs from a chat reply | 72 | 5 |
| M01L02 | Artifact types: documents, code, pages and interactive prototypes | 72 | 5 |

### M02 Building and iterating on an Artifact (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Turn a vague content request into a first Artifact draft; (2) Iterate an Artifact with targeted change requests instead of restarting
- Common misconception addressed: Rewriting the whole request instead of asking for a scoped change to the Artifact
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Requesting a first Artifact draft with clear scope | 96 | 5 |
| M02L02 | Iterating an Artifact: targeted edits and versioning | 96 | 5 |

### M03 Interactive prototypes (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Prototype a small interactive tool as an Artifact and test its behaviour; (2) Identify which parts of a prototype are illustrative versus production-ready
- Common misconception addressed: Assuming an interactive Artifact prototype is production-grade software
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Prototyping interactive content safely | 80 | 5 |
| M03L02 | Data and state in an interactive Artifact | 80 | 5 |
| M03L03 | Limits of prototypes and what still needs engineering | 80 | 5 |

### M04 Sharing and governance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Prepare an Artifact for sharing and strip anything confidential; (2) Choose share settings for an internal versus external audience
- Common misconception addressed: Publishing an Artifact without checking what data it exposes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sharing, privacy and what an Artifact exposes | 96 | 5 |
| M04L02 | Documenting assumptions and limits before handoff | 96 | 5 |

### M05 Artifacts in a professional workflow (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a deliverable that moves between chat, Projects and an Artifact; (2) Combine an Artifact with verified source data for a stakeholder review
- Common misconception addressed: Using a throwaway chat for work that should live as a maintained Artifact
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Fitting Artifacts into Projects and multi-step work | 96 | 5 |
| M05L02 | Case walk-through: an Artifact-based deliverable end to end | 96 | 5 |

## Integrative case

A product analyst turns a messy requirements note into a working Artifact: a small interactive dashboard prototype, iterates it against stakeholder feedback, decides what belongs in an Artifact versus a chat reply, and documents the prototype's limits before sharing it.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0514-final-protected | 30 | 40 | yes |
| MST-0514-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Artifacts and when to use them | 5 |
| Building and iterating on an Artifact | 6 |
| Interactive prototypes | 7 |
| Sharing and governance | 6 |
| Artifacts in a professional workflow | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0514-Q0001** (single-answer, Select ONE) A colleague asks for a one-line answer to a quick factual question. Why is a plain chat reply usually the better choice than an Artifact here?

- A. An Artifact adds overhead and versioning that a single short answer does not need **(key)**  
  _Rationale:_ Correct: Artifacts suit content that will be edited, reused or shared; a one-off answer does not.
- B. Artifacts cannot contain text  
  _Rationale:_ Artifacts routinely contain text; that is not the distinction.
- C. Chat replies are always more accurate  
  _Rationale:_ Accuracy does not depend on the surface used.
- D. Artifacts are only for code  
  _Rationale:_ Artifacts support documents, pages and more, not only code.

**MST-0514-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate uses of an interactive Artifact prototype in professional work? (Select TWO.)

- A. Demonstrating a proposed workflow to stakeholders for feedback **(key)**  
  _Rationale:_ Correct: prototypes are well suited to eliciting feedback on an idea.
- B. Deploying it directly as the company's production system  
  _Rationale:_ A prototype is illustrative, not production-hardened software.
- C. Exploring a layout or calculation before committing to engineering **(key)**  
  _Rationale:_ Correct: prototypes let teams test an approach cheaply first.
- D. Storing the only copy of regulated customer records  
  _Rationale:_ An Artifact prototype is not a system of record for regulated data.

**MST-0514-Q0003** (single-answer, Select ONE) Before sharing an Artifact externally, what should you check first?

- A. Whether the Artifact contains confidential or internal-only data **(key)**  
  _Rationale:_ Correct: sharing can expose embedded data, so review contents before release.
- B. Whether the Artifact uses the newest colour theme  
  _Rationale:_ Visual theme is not a confidentiality control.
- C. Whether the chat was longer than ten messages  
  _Rationale:_ Conversation length is irrelevant to sharing safety.
- D. Whether Claude enjoyed the task  
  _Rationale:_ Not a meaningful consideration.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
