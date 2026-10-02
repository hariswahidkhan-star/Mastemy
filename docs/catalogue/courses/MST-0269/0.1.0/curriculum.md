# Red Hat RHCE: Knowledge and Demonstration Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0269` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Red Hat (no affiliation or endorsement) |
| Exam code | EX294 |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | MST-PRG-RH-EX294-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Install and configure Ansible control nodes and inventories
2. Write, run and troubleshoot playbooks using core modules
3. Use task control, handlers, templates, variables and facts
4. Create and use roles, Red Hat System Roles and protect data with Ansible Vault

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Official exam is performance-based (hands-on); Mastemy offers knowledge preparation and video demonstrations only.
- Does not assess: DESIGN ASSUMPTION: the official exam includes hands-on / performance-based tasks that MCQ/MR cannot reproduce; this knowledge-practice package does not assess command-line or lab performance.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 Ansible Basics and Inventories (weight: design assumption, unverified)

- Worked applications: (1) Build an inventory with groups and group variables for three host classes; (2) Use an ad hoc command to gather a fact across all hosts
- Common misconception addressed: Confusing ansible.cfg precedence between project and user configuration
- Module check: 48 items / 48 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Install and configure Ansible | 180 | 6 |
| M01L02 | Build static and dynamic inventories | 180 | 6 |
| M01L03 | Ad hoc commands and connection basics | 180 | 6 |

### M02 Playbooks and Task Control (weight: design assumption, unverified)

- Worked applications: (1) Write an idempotent playbook that installs, configures and starts a service with a handler; (2) Add conditionals so a play runs only on matching OS families
- Common misconception addressed: Writing a task with the shell module that is not idempotent on re-run
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Playbook structure and core modules | 180 | 6 |
| M02L02 | Loops, conditionals and handlers | 180 | 6 |
| M02L03 | Error handling and idempotence | 180 | 6 |

### M03 Templates, Variables and Facts (weight: design assumption, unverified)

- Worked applications: (1) Template a configuration file from host facts and notify a restart handler; (2) Resolve a variable-precedence conflict producing the wrong value
- Common misconception addressed: Assuming playbook variables always override inventory variables
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Variables, facts and precedence | 180 | 6 |
| M03L02 | Jinja2 templates | 180 | 6 |
| M03L03 | Managing files and configuration | 180 | 6 |

### M04 Roles, System Roles and Vault (weight: design assumption, unverified)

- Worked applications: (1) Refactor a playbook into a reusable role with defaults and handlers; (2) Encrypt a variables file with Vault and reference it from a play
- Common misconception addressed: Committing a plaintext secret rather than a Vault-encrypted value
- Module check: 47 items / 47 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Create and use roles | 180 | 6 |
| M04L02 | Red Hat System Roles | 180 | 6 |
| M04L03 | Protect secrets with Ansible Vault | 180 | 6 |

## Integrative case

An engineer automates a fleet build: define inventories, write idempotent playbooks using roles and templates driven by facts, apply a Red Hat System Role, and protect credentials with Vault; explain idempotence and variable precedence throughout.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0269-practice-form-A | 93 | 93 | yes |
| MST-0269-practice-form-B | 93 | 93 | no (optional practice) |
| MST-0269-practice-form-C | 93 | 93 | no (optional practice) |
| MST-0269-final-protected | 93 | 93 | yes |

| Domain | Items per form |
|---|---|
| Ansible Basics and Inventories | 24 |
| Playbooks and Task Control | 23 |
| Templates, Variables and Facts | 23 |
| Roles, System Roles and Vault | 23 |

Minimum reviewed item bank: 894 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0269-Q0001** (single-answer, Select ONE) A playbook task using the shell module reports 'changed' every run even when nothing changed. What is the issue?

- A. The task is not idempotent and should use a proper module **(key)**  
  _Rationale:_ Correct: shell commands are not idempotent; a dedicated module reports change accurately.
- B. Ansible always reports changed for every task  
  _Rationale:_ Idempotent modules report 'ok' when no change is needed.
- C. The inventory is missing  
  _Rationale:_ A missing inventory would stop execution, not misreport change.
- D. Handlers are disabled  
  _Rationale:_ Handlers affect notifications, not change detection on a task.

**MST-0269-Q0002** (single-answer, Select ONE) Two sources set the same variable. Which generally wins by Ansible precedence?

- A. An extra-var passed on the command line **(key)**  
  _Rationale:_ Correct: extra-vars have the highest precedence.
- B. A group_vars default  
  _Rationale:_ Group vars are overridden by higher-precedence sources like extra-vars.
- C. A role default  
  _Rationale:_ Role defaults are among the lowest precedence.
- D. An inventory file comment  
  _Rationale:_ A comment sets nothing and cannot win.

**MST-0269-Q0003** (multiple-answer, Select TWO) Which TWO practices correctly protect secrets in Ansible? (Select TWO)

- A. Encrypt sensitive variable files with Ansible Vault **(key)**  
  _Rationale:_ Correct: Vault encrypts secrets at rest in the repository.
- B. Reference the encrypted file and supply the vault password at run time **(key)**  
  _Rationale:_ Correct: supplying the password at run time decrypts without storing it in plaintext.
- C. Commit the plaintext password into group_vars  
  _Rationale:_ Committing plaintext secrets exposes them in version control.
- D. Echo the secret in a debug task for every run  
  _Rationale:_ Printing secrets leaks them into logs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
