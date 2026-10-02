# Helm: Kubernetes Packaging and Release Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0987` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-HKP-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Helm: Kubernetes Packaging and Release Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Kubernetes and Helm basics
2. Chart structure
3. Templating and functions
4. Values, overrides and environments
5. Releases, upgrades and rollbacks
6. Dependencies, packaging and quality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Kubernetes and Helm basics (MASTEMY-DESIGN 17%)

- Worked applications: (1) Install a chart from a repository with helm install; (2) Inspect a release with helm list and helm status
- Common misconception addressed: Thinking Helm replaces kubectl rather than complementing it
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why Helm: templating and releases | 80 | 6 |
| M01L02 | Charts, repositories and the Helm CLI | 80 | 6 |

### M02 Chart structure (MASTEMY-DESIGN 17%)

- Worked applications: (1) Scaffold a chart with helm create and read its layout; (2) Reference a value from values.yaml in a template
- Common misconception addressed: Editing rendered manifests instead of the template and values
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Chart.yaml, templates and values | 80 | 6 |
| M02L02 | Built-in objects and the .Values tree | 80 | 6 |

### M03 Templating and functions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Template a label set using a reusable named template; (2) Default a missing value with the default function
- Common misconception addressed: Forgetting that template whitespace and indentation matter in YAML
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Template actions, pipelines and functions | 80 | 6 |
| M03L02 | Named templates and _helpers.tpl | 80 | 6 |

### M04 Values, overrides and environments (MASTEMY-DESIGN 17%)

- Worked applications: (1) Override replica count per environment with a values file; (2) Combine a base values file with --set at install time
- Common misconception addressed: Hardcoding environment settings into the chart templates
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Layered values and --set vs -f | 80 | 6 |
| M04L02 | Per-environment configuration | 80 | 6 |

### M05 Releases, upgrades and rollbacks (MASTEMY-DESIGN 16%)

- Worked applications: (1) Upgrade a release and inspect its revision history; (2) Roll back to a previous revision after a bad upgrade
- Common misconception addressed: Assuming helm upgrade never changes immutable fields
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Install, upgrade and revision history | 80 | 6 |
| M05L02 | Rollback and release lifecycle | 80 | 6 |

### M06 Dependencies, packaging and quality (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a dependency subchart and update it; (2) Lint and dry-run render a chart before release
- Common misconception addressed: Shipping a chart without linting or a dry-run render
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Subcharts and dependencies | 80 | 6 |
| M06L02 | Linting, templating and packaging | 80 | 6 |

## Integrative case

Package a microservice for Kubernetes with Helm: build a chart with sensible values, template its manifests with helpers, support dev and prod through layered values, manage upgrades with a rollback plan, pull in a dependency subchart, and lint and dry-run before release; then justify the values layout and release strategy.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0987-final-protected | 30 | 30 | yes |
| MST-0987-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kubernetes and Helm basics | 5 |
| Chart structure | 5 |
| Templating and functions | 5 |
| Values, overrides and environments | 5 |
| Releases, upgrades and rollbacks | 5 |
| Dependencies, packaging and quality | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0987-Q0001** (single-answer, Select ONE) After a bad helm upgrade, how do you return the release to its previous working state?

- A. helm rollback to the prior revision **(key)**  
  _Rationale:_ Correct: Helm keeps revision history and helm rollback restores a previous revision.
- B. Delete the cluster and recreate it  
  _Rationale:_ That is unnecessary and destructive; rollback exists for this.
- C. Manually edit live objects with kubectl only  
  _Rationale:_ That bypasses Helm's release tracking and risks drift.
- D. Reinstall from scratch losing all history  
  _Rationale:_ Rollback preserves history and is the intended path.

**MST-0987-Q0002** (multiple-answer, Select TWO) Which TWO are valid ways to override chart values at install or upgrade time? (Select TWO)

- A. Pass a custom values file with -f **(key)**  
  _Rationale:_ Correct: -f/--values supplies an override file.
- B. Set individual values with --set **(key)**  
  _Rationale:_ Correct: --set overrides specific keys inline.
- C. Edit the rendered manifest in the cluster by hand  
  _Rationale:_ That causes drift and is not a Helm override mechanism.
- D. Rename Chart.yaml to values.yaml  
  _Rationale:_ That breaks the chart; files have distinct roles.

**MST-0987-Q0003** (single-answer, Select ONE) What problem does Helm primarily solve for Kubernetes users?

- A. Templating and versioned release management of Kubernetes manifests **(key)**  
  _Rationale:_ Correct: Helm packages, templates and versions manifests as releases you can upgrade and roll back.
- B. Replacing the Kubernetes API server  
  _Rationale:_ Helm uses the API server; it does not replace it.
- C. Running containers without a cluster  
  _Rationale:_ Helm still requires a Kubernetes cluster.
- D. Compiling application source code  
  _Rationale:_ Helm does not build application code.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
