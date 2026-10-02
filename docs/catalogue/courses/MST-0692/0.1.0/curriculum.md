# Microsoft Entra Identity and Conditional Access

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0692` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Entra Conditional Access documentation read via the Microsoft Learn MCP on 2026-10-02 (if-then signals/assignments/access controls, two-phase enforcement, templates, break-glass exclusions, report-only mode, licensing P1/P2). Portal layout, templates and licensing change and must be confirmed before production. |
| Official sources | https://learn.microsoft.com/entra/identity/conditional-access/overview; https://learn.microsoft.com/entra/identity/conditional-access/plan-conditional-access |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-ENTRA-CA |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Entra Identity and Conditional Access (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe Microsoft Entra Conditional Access as an if-then policy engine
2. Identify the signals, assignments and access controls in a policy
3. Explain two-phase policy evaluation and how multiple policies combine
4. Apply safe-deployment practices (break-glass exclusions, report-only mode)
5. Map common scenarios to appropriate Conditional Access templates

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Conditional Access fundamentals (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Rewrite a plain-language access rule as if-then; (2) Identify the signals in a sample scenario
- Common misconception addressed: Thinking Conditional Access runs before authentication
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Conditional Access as an if-then policy engine | 88 | 5 |
| M01L02 | Signals, decisions and the Zero Trust context | 88 | 5 |

### M02 Policy components (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) List the assignments for a payroll-app policy; (2) Choose grant controls for a high-risk sign-in
- Common misconception addressed: Treating assignments as OR when they combine with AND
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Assignments: users, target resources, conditions | 88 | 5 |
| M02L02 | Access controls: grant and session controls | 87 | 5 |

### M03 Evaluation and combining policies (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Trace evaluation for a user hit by two policies; (2) Explain why a block policy wins
- Common misconception addressed: Assuming one satisfied policy overrides another that blocks
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Phase 1 collect, Phase 2 enforce | 87 | 5 |
| M03L02 | How multiple policies combine | 87 | 5 |
| M03L03 | Block versus grant precedence | 87 | 5 |

### M04 Safe deployment (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design break-glass exclusions for a tenant; (2) Validate a policy in report-only before enforcing
- Common misconception addressed: Rolling a policy to all users with no break-glass exclusion
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Break-glass and service-account exclusions | 87 | 5 |
| M04L02 | Report-only mode and staged rollout | 87 | 5 |

### M05 Templates and common scenarios (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Pick templates for a secure baseline; (2) Map three scenarios to the right template
- Common misconception addressed: Combining Conditional Access with security defaults (they are mutually exclusive)
- Module check: 16 items / 16 min, threshold 75%%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Secure-foundation templates | 87 | 5 |
| M05L02 | Mapping scenarios to templates | 87 | 5 |

## Integrative case

An admin designs a baseline Conditional Access rollout for a finance team: require MFA and a compliant device for a payroll app, exclude break-glass accounts, and validate with report-only mode before enforcing.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0692-final-protected | 30 | 40 | yes |
| MST-0692-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Conditional Access fundamentals | 5 |
| Policy components | 6 |
| Evaluation and combining policies | 7 |
| Safe deployment | 6 |
| Templates and common scenarios | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0692-Q0001** (single-answer, Select ONE) When is a Conditional Access policy evaluated?

- A. After first-factor authentication completes **(key)**  
  _Rationale:_ Correct: Conditional Access is enforced after first-factor authentication.
- B. Before any authentication begins  
  _Rationale:_ It is not a frontline pre-authentication defense.
- C. Only during password reset  
  _Rationale:_ It applies broadly, not only at password reset.
- D. Only for guest users  
  _Rationale:_ It applies to configured users, not only guests.

**MST-0692-Q0002** (multiple-answer, Select TWO) Which TWO are recommended safe-deployment practices for Conditional Access? (Select TWO.)

- A. Exclude break-glass (emergency access) accounts from policies **(key)**  
  _Rationale:_ Correct: excluding break-glass accounts prevents lockout from misconfiguration.
- B. Validate new policies in report-only mode first **(key)**  
  _Rationale:_ Correct: report-only lets you see impact before enforcing.
- C. Enable security defaults alongside Conditional Access  
  _Rationale:_ They are mutually exclusive and should not be combined.
- D. Apply every new policy to all users immediately  
  _Rationale:_ Staged rollout with exclusions is safer than a blanket enforce.

**MST-0692-Q0003** (single-answer, Select ONE) Two policies apply to a user: one requires MFA, another requires a compliant device. What must the user satisfy?

- A. Both requirements, because assignments and applicable policies combine with AND **(key)**  
  _Rationale:_ Correct: all applicable policies must be satisfied.
- B. Either one, whichever is easier  
  _Rationale:_ Applicable policies are not optional alternatives.
- C. Neither, because they conflict  
  _Rationale:_ They do not conflict; both apply.
- D. Only the newest policy  
  _Rationale:_ Policy age does not override the requirement to satisfy all applicable policies.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
