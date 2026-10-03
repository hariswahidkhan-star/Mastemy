# AI Assurance, Auditing and Red-Teaming

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1887` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI Assurance, Auditing and Red-Teaming (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define AI assurance and distinguish first-, second- and third-party assurance
2. Plan an AI audit: objectives, criteria, evidence and independence
3. Design conformance and control testing for an AI system
4. Plan and scope AI red-teaming and adversarial testing
5. Evaluate evidence and write defensible assurance findings
6. Communicate assurance results and track remediation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Assurance concepts and independence (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose the assurance type for a board's needs and justify independence; (2) Decide what criteria an audit should test against
- Common misconception addressed: Confusing a vendor's self-attestation with independent assurance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What assurance is; first/second/third-party | 120 | 7 |
| M01L02 | Independence, criteria and assurance levels | 120 | 7 |

### M02 Audit planning and evidence (25% (Mastemy design weight), design weight)

- Worked applications: (1) Draft an audit plan with objectives and evidence sources; (2) Design a test that would reveal a missing control
- Common misconception addressed: Collecting evidence that cannot support the conclusion drawn
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Audit objectives, criteria and evidence types | 120 | 7 |
| M02L02 | Sampling, testing and working papers | 120 | 7 |

### M03 Red-teaming and adversarial testing (25% (Mastemy design weight), design weight)

- Worked applications: (1) Scope a red-team exercise with rules of engagement; (2) Design jailbreak and misuse tests for a customer chatbot
- Common misconception addressed: Running a red team with no scope, safety or escalation rules
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scoping red-team exercises and rules of engagement | 120 | 7 |
| M03L02 | Adversarial tests: jailbreaks, misuse, robustness | 120 | 7 |

### M04 Findings, reporting and remediation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Rate findings by severity and write one defensibly; (2) Build a remediation tracker with owners and dates
- Common misconception addressed: Reporting findings with no evidence or remediation path
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Rating and writing defensible findings | 120 | 7 |
| M04L02 | Reporting and tracking remediation | 120 | 7 |

## Integrative case

A SaaS vendor must give enterprise customers assurance over its AI assistant: choose the assurance approach and independence, plan an audit with evidence, run a scoped red-team of the chatbot, and report findings with tracked remediation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1887-final-protected | 40 | 40 | yes |
| MST-1887-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Assurance concepts and independence | 10 |
| Audit planning and evidence | 10 |
| Red-teaming and adversarial testing | 10 |
| Findings, reporting and remediation | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1887-Q0001** (single-answer, Select ONE) Why is a vendor's own 'we tested it and it is safe' statement not third-party assurance?

- A. It lacks independence; third-party assurance requires an independent party applying defined criteria **(key)**  
  _Rationale:_ Correct: independence is what distinguishes third-party assurance.
- B. Because vendors cannot test their own systems  
  _Rationale:_ Vendors can test; the point is independence for third-party assurance.
- C. Because it was not written in a report  
  _Rationale:_ Format is not the deciding factor; independence is.
- D. Because testing is never valid  
  _Rationale:_ Testing is valid; the issue is who performs and attests to it.

**MST-1887-Q0002** (multiple-answer, Select TWO) Which TWO are essential before starting an AI red-team exercise? (Select TWO.)

- A. Defined scope and rules of engagement **(key)**  
  _Rationale:_ Correct: scope and rules of engagement are prerequisites.
- B. An escalation and safety plan for harmful findings **(key)**  
  _Rationale:_ Correct: a safety/escalation plan is essential.
- C. A guarantee that no vulnerabilities will be found  
  _Rationale:_ No such guarantee is possible or desirable.
- D. Permission to publish all findings publicly immediately  
  _Rationale:_ Immediate public disclosure is not a prerequisite and may be harmful.

**MST-1887-Q0003** (single-answer, Select ONE) An auditor concludes 'controls are effective' but the only evidence is a screenshot of a policy document. What is the problem?

- A. The evidence shows a control exists on paper, not that it operates effectively **(key)**  
  _Rationale:_ Correct: existence of a document does not evidence operating effectiveness.
- B. Screenshots are never valid evidence  
  _Rationale:_ Screenshots can be evidence; the issue is it does not support operating effectiveness.
- C. The conclusion needs to be longer  
  _Rationale:_ Length is not the issue; evidence sufficiency is.
- D. Policies cannot be audited  
  _Rationale:_ Policies can be audited; operation must also be tested.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
