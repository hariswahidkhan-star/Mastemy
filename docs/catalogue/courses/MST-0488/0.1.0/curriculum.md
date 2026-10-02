# ChatGPT for Software Debugging and Code Explanation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0488` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT for Software Debugging and Code Explanation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use ChatGPT to explain unfamiliar code and infer intent without running it
2. Form and test debugging hypotheses with ChatGPT while verifying against the real program
3. Prompt for minimal, reviewable fixes rather than large unexplained rewrites
4. Apply verification, security and confidentiality controls to AI-assisted debugging

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Running code, reproducing defects, and professional judgement on whether a suggested fix is safe to ship are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Explaining and reading unfamiliar code (25%)

- Worked applications: (1) Ask ChatGPT to explain a 40-line function and confirm the explanation by reading the code; (2) Map which other modules call a given function
- Common misconception addressed: Trusting an explanation of code without checking it against the actual source
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Summarising what a function does | 120 | 6 |
| M01L02 | Tracing data flow and dependencies | 120 | 6 |

### M02 Debugging with hypotheses (25%)

- Worked applications: (1) Convert a stack trace into a ranked list of likely causes; (2) Design one experiment that would confirm or rule out a hypothesis
- Common misconception addressed: Assuming the first cause the model proposes is the real bug
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Turning an error message into a hypothesis | 120 | 6 |
| M02L02 | Narrowing a bug with targeted questions | 120 | 6 |

### M03 Getting reviewable fixes (25%)

- Worked applications: (1) Request a minimal patch plus the reasoning behind it; (2) Ask for a unit test that fails before and passes after the fix
- Common misconception addressed: Accepting a large rewrite that is hard to review over a small targeted fix
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Asking for minimal diffs with rationale | 120 | 6 |
| M03L02 | Requesting tests that prove the fix | 120 | 6 |

### M04 Verifying and governing AI debugging (25%)

- Worked applications: (1) Reproduce a bug locally to confirm the model's suggested fix actually resolves it; (2) Redact API keys and customer data before pasting a log
- Common misconception addressed: Pasting production secrets or customer data into a consumer chat
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Verifying a suggested fix against the real program | 120 | 6 |
| M04L02 | Confidentiality and secret-handling rules | 120 | 6 |

## Integrative case

A backend developer inherits an unfamiliar service with an intermittent production error: they use ChatGPT to understand the code, form ranked hypotheses from the logs, obtain a minimal reviewable fix with a failing-then-passing test, and verify it against the real program while keeping secrets out of the chat.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0488-final-protected | 72 | 72 | yes |
| MST-0488-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Explaining and reading unfamiliar code | 18 |
| Debugging with hypotheses | 18 |
| Getting reviewable fixes | 18 |
| Verifying and governing AI debugging | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0488-Q0001** (single-answer, Select ONE) ChatGPT proposes a fix for a bug you cannot reproduce. What should you do before shipping it?

- A. Reproduce the bug and confirm the fix resolves it against the real program **(key)**  
  _Rationale:_ Correct: a suggested fix must be verified against the actual failing behaviour before release.
- B. Ship it because the explanation sounded convincing  
  _Rationale:_ A convincing explanation is not evidence the fix works.
- C. Ask the model to rate its own confidence and trust that  
  _Rationale:_ Self-reported confidence does not verify real behaviour.
- D. Rewrite the whole module to be safe  
  _Rationale:_ A large rewrite adds risk and still is not verification.

**MST-0488-Q0002** (single-answer, Select ONE) Why ask ChatGPT for a minimal diff rather than a full rewrite when fixing a bug?

- A. A small, scoped change is easier to review and less likely to introduce new defects **(key)**  
  _Rationale:_ Correct: minimal diffs keep review tractable and limit blast radius.
- B. Smaller changes always run faster at runtime  
  _Rationale:_ Diff size does not determine runtime performance.
- C. The model cannot produce large outputs  
  _Rationale:_ Models can produce large outputs; that is not the reason.
- D. Rewrites are never correct  
  _Rationale:_ Rewrites can be correct; the issue is reviewability and risk, not correctness in principle.

**MST-0488-Q0003** (multiple-answer, Select TWO) Which TWO inputs should be removed before pasting a log into a consumer ChatGPT session? (Select TWO)

- A. API keys and access tokens **(key)**  
  _Rationale:_ Correct: credentials must never be pasted into a consumer chat.
- B. Customer personal data **(key)**  
  _Rationale:_ Correct: personal data should be redacted to protect confidentiality and comply with policy.
- C. The generic error type name  
  _Rationale:_ The error type carries no secret and is needed for diagnosis.
- D. The line number of the failure  
  _Rationale:_ A line number is not sensitive and helps locate the bug.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

