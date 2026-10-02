# GitHub Advanced Security Certification (GH-500)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0199` v0.1.0 | Batch 7 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GitHub (Microsoft) (no affiliation or endorsement) |
| Exam code | GH-500 |
| Version basis | Skills measured as of July 2026 |
| Exam status | current (exam maintained by GitHub; delivered by Microsoft) |
| Evidence | **verified-official-source** - sources: SRC-GH-GH500 |
| Legacy IDs | MST-MIC-GH-GH500-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe GitHub Security suites, architecture, alerts and secure SDLC
2. Configure and use Secret Protection and push protection
3. Configure and use supply chain security (Dependabot and Dependency Review)
4. Configure and use Code Security with CodeQL
5. Run security operations: prioritize, remediate and administer GHAS at scale

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: official item formats not reproducible as MCQ/MR (for example performance or case simulations) are listed in the exam-version record.

## Modules

### M01 Describe GitHub Security suites, features, and ecosystem (15-20%)

- Worked applications: (1) Contrast Code Security, Secret Protection and Supply Chain Security; (2) Decide a prevention-first vs gate-based strategy
- Common misconception addressed: Treating Security Overview as a replacement for per-repo triage
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Understand GitHub Security suites and architecture | 133 | 6 |
| M01L02 | Apply secure SDLC and security strategies | 133 | 6 |
| M01L03 | Detect, manage, and respond to security alerts | 133 | 6 |
| M01L04 | Manage access, governance, and supply chain security | 132 | 6 |

### M02 Configure and use Secret Protection (15-20%)

- Worked applications: (1) Enable push protection and a custom secret pattern; (2) Respond to and dismiss a validated secret alert
- Common misconception addressed: Assuming dismissing an alert revokes the exposed secret
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Enable and configure Secret Protection | 133 | 6 |
| M02L02 | Prevent secret exposure | 133 | 6 |
| M02L03 | Manage and respond to Secret Protection alerts | 133 | 6 |
| M02L04 | Control access, policies, and customization | 132 | 6 |

### M03 Configure and use supply chain security (15-20%)

- Worked applications: (1) Interpret the dependency graph and an SBOM export; (2) Configure grouped Dependabot update rules
- Common misconception addressed: Confusing Dependency Review (pre-merge) with Dependabot alerts
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Understand and manage dependency and supply chain risks | 133 | 6 |
| M03L02 | Detect, prioritize, and respond to supply chain alerts | 133 | 6 |
| M03L03 | Secure dependencies during development | 132 | 6 |
| M03L04 | Configure policies, permissions, and integrations | 132 | 6 |

### M04 Configure and use Code Security (10-15%)

- Worked applications: (1) Enable CodeQL with a workflow and ingest a SARIF file; (2) Triage a code scanning alert with dataflow analysis
- Common misconception addressed: Thinking CodeQL autofix merges changes automatically
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Understand code scanning approaches and tooling | 95 | 6 |
| M04L02 | Set up and configure Code Security | 95 | 6 |
| M04L03 | Analyze, triage, and remediate code scanning results | 95 | 6 |
| M04L04 | Optimize and automate Code Security operations | 94 | 6 |

### M05 Security operations: best practices, prioritization, and remediation (15-20%)

- Worked applications: (1) Define a severity ruleset and run a remediation campaign; (2) Apply EPSS scoring to prioritize supply chain alerts
- Common misconception addressed: Prioritizing by CVSS alone and ignoring exploit likelihood
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Understand vulnerability context and remediation frameworks | 106 | 6 |
| M05L02 | Prioritize and manage security work at scale | 106 | 6 |
| M05L03 | Customize and optimize security detection | 106 | 6 |
| M05L04 | Collaborate across roles and enforce governance | 106 | 6 |
| M05L05 | Shift left and strengthen preventive security | 106 | 6 |

### M06 GitHub Security suites administration (10-15%)

- Worked applications: (1) Set default security configurations with inheritance; (2) Configure delegated bypass and alert ownership roles
- Common misconception addressed: Enabling features per-repo instead of at organization scale
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Roll out and manage security features at scale | 95 | 6 |
| M06L02 | Configure security features and defaults | 95 | 6 |
| M06L03 | Define governance, access, and Code Security workflows | 95 | 6 |
| M06L04 | Manage CodeQL and security automation | 94 | 6 |

## Integrative case

A security team rolls out GitHub Advanced Security across an organization: enable Secret Protection with push protection and custom patterns, configure Dependabot and Dependency Review, set up CodeQL scanning with SARIF ingestion, and run a campaign-based remediation program.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0199-practice-form-A | 90 | 90 | yes |
| MST-0199-practice-form-B | 90 | 90 | no (optional practice) |
| MST-0199-practice-form-C | 90 | 90 | no (optional practice) |
| MST-0199-final-protected | 90 | 90 | yes |

Minimum reviewed item bank: 1164 (plan; 3 sample items drafted, 0 reviewed).

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
