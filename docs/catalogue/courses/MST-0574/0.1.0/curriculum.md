# AI-Assisted Secure Code Review and Remediation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0574` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI-Assisted Secure Code Review and Remediation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the goals and limits of AI-assisted secure review
2. Identify common vulnerability classes with AI support
3. Detect secret, data-exposure and dependency risks
4. Triage findings by exploitability and impact
5. Remediate findings and verify the fix
6. Communicate findings and residual risk responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Secure review fundamentals (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Frame a review around a threat model; (2) Decide where AI assists and where it cannot
- Common misconception addressed: Treating an AI scan as a security guarantee
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Goals, scope and threat framing | 80 | 8 |
| M01L02 | Strengths and limits of AI review | 80 | 8 |

### M02 Finding common vulnerability classes (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Spot an injection risk in a handler; (2) Find a broken authorisation check
- Common misconception addressed: Trusting that 'no findings' means secure
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Injection, XSS and deserialisation | 80 | 8 |
| M02L02 | Authn/authz and access control | 80 | 8 |

### M03 Secrets, data and dependencies (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Find a hard-coded secret and a leaky log; (2) Assess a vulnerable dependency's real impact
- Common misconception addressed: Ignoring transitive dependency risk
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Secrets and data exposure | 80 | 8 |
| M03L02 | Dependency and supply-chain risk | 80 | 8 |

### M04 Triage and prioritisation (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Rank findings by risk, not by count; (2) Separate true positives from false positives
- Common misconception addressed: Treating all findings as equally urgent
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Severity, exploitability and impact | 80 | 8 |
| M04L02 | False positives and noise | 80 | 8 |

### M05 Remediation with verification (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Fix an injection and prove it is closed; (2) Write a test that would catch a regression
- Common misconception addressed: Patching symptoms not the root cause
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Safe remediation patterns | 80 | 8 |
| M05L02 | Verifying and testing fixes | 80 | 8 |

### M06 Reporting and residual risk (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Write a finding with reproduction and fix; (2) State residual risk and accepted risk clearly
- Common misconception addressed: Reporting severity with no evidence
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Writing actionable findings | 80 | 8 |
| M06L02 | Residual and accepted risk | 80 | 8 |

## Integrative case

A fintech service must pass a security review. Use AI-assisted review to find injection, auth and secret-handling flaws across the codebase, triage and prioritise them, remediate with verification, and avoid introducing new weaknesses, then report residual risk.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0574-final-protected | 40 | 40 | yes |
| MST-0574-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Secure review fundamentals | 7 |
| Finding common vulnerability classes | 7 |
| Secrets, data and dependencies | 7 |
| Triage and prioritisation | 7 |
| Remediation with verification | 6 |
| Reporting and residual risk | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0574-Q0001** (single-answer, Select ONE) An AI review returns no findings for an authentication module. What is the correct interpretation?

- A. Absence of findings is not proof of security; review the threat model and critical paths manually **(key)**  
  _Rationale:_ Correct: a clean scan does not guarantee security.
- B. The module is certified secure  
  _Rationale:_ No tool certifies security from a clean pass.
- C. You can skip manual review entirely  
  _Rationale:_ Manual review of critical paths is still needed.
- D. Authentication never needs review  
  _Rationale:_ Auth is a high-risk area requiring scrutiny.

**MST-0574-Q0002** (multiple-answer, Select TWO) Which TWO signals should raise a finding's remediation priority? (Select TWO.)

- A. It is remotely exploitable without authentication **(key)**  
  _Rationale:_ Correct: unauthenticated remote exploitability is high risk.
- B. It exposes sensitive data or enables privilege escalation **(key)**  
  _Rationale:_ Correct: high impact raises priority.
- C. It appears in a file with many comments  
  _Rationale:_ Comment density is irrelevant to risk.
- D. It was reported late on a Friday  
  _Rationale:_ Timing is not a risk factor.

**MST-0574-Q0003** (single-answer, Select ONE) After fixing an injection flaw, what best confirms the remediation?

- A. A test that reproduced the exploit now fails to exploit, plus review of the root cause **(key)**  
  _Rationale:_ Correct: a reproducing test plus root-cause review verifies the fix.
- B. The AI tool no longer flags the line  
  _Rationale:_ Tool silence alone is not verification.
- C. The code compiles  
  _Rationale:_ Compilation does not prove the flaw is closed.
- D. No users have complained yet  
  _Rationale:_ Absence of complaints is not evidence.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
