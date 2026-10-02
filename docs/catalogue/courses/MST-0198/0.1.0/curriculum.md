# GitHub Administration Certification (GH-100)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0198` v0.1.0 | Batch 7 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GitHub (Microsoft) (no affiliation or endorsement) |
| Exam code | GH-100 |
| Version basis | Skills measured as of July 2026 |
| Exam status | current (exam maintained by GitHub; delivered by Microsoft) |
| Evidence | **verified-official-source** - sources: SRC-GH-GH100 |
| Legacy IDs | MST-MIC-GH-GH100-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Manage GitHub identities, authentication, roles and permissions
2. Administer a GitHub Enterprise environment, deployment model and licensing
3. Implement secure software development, policies, rulesets and compliance
4. Manage GitHub Actions workflows, runners and encrypted secrets
5. Monitor and optimize GitHub usage, cost and performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: official item formats not reproducible as MCQ/MR (for example performance or case simulations) are listed in the exam-version record.

## Modules

### M01 Manage GitHub identities and access (15-20%)

- Worked applications: (1) Choose between managed users (EMU) and personal accounts; (2) Configure SAML SSO with SCIM provisioning
- Common misconception addressed: Confusing team synchronization with SCIM provisioning
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Manage user identities and authentication | 205 | 6 |
| M01L02 | Manage access and permissions | 204 | 6 |

### M02 Administer GitHub Enterprise environment (10-15%)

- Worked applications: (1) Select a deployment scenario (GHEC+EMU vs GHES); (2) Interpret a license consumption report
- Common misconception addressed: Assuming GHES and GHEC share identical feature availability
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Support GitHub Enterprise users and stakeholders | 146 | 6 |
| M02L02 | Manage deployment and licensing | 146 | 6 |

### M03 Implement secure software development and compliance (25-30%)

- Worked applications: (1) Apply an organization ruleset enforcing reviews and secret scanning; (2) Approve or deny a GitHub App based on policy
- Common misconception addressed: Treating a repository role as equivalent to an enterprise policy
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Configure security policies and rulesets | 214 | 6 |
| M03L02 | Enable repository security features | 214 | 6 |
| M03L03 | Manage API access and integrations | 214 | 6 |

### M04 Manage GitHub Actions (20-25%)

- Worked applications: (1) Configure a self-hosted runner group with IP allow lists; (2) Scope organization vs repository encrypted secrets
- Common misconception addressed: Storing secrets in workflow files instead of encrypted secrets
- Module check: 38 items / 38 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Configure workflows and reusable components | 175 | 6 |
| M04L02 | Manage runners | 175 | 6 |
| M04L03 | Manage encrypted secrets | 175 | 6 |

### M05 Monitor and optimize GitHub usage (10-15%)

- Worked applications: (1) Analyze the audit log for anomalous access; (2) Interpret metered-product usage to optimize cost
- Common misconception addressed: Believing audit logs are retained indefinitely by default
- Module check: 37 items / 37 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Monitor enterprise usage and activity | 146 | 6 |
| M05L02 | Optimize cost and performance | 146 | 6 |

## Integrative case

A platform team governs a GitHub Enterprise Cloud tenant with EMU: configure SAML SSO and SCIM, enterprise teams and rulesets, repository security features (secret scanning, CodeQL, Dependabot), Actions runner groups, and a license-optimization review.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0198-practice-form-A | 81 | 81 | yes |
| MST-0198-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0198-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0198-final-protected | 81 | 81 | yes |

Minimum reviewed item bank: 846 (plan; 3 sample items drafted, 0 reviewed).

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
