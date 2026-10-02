# Ansible: Configuration Management and Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0989` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-A-003 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Ansible: Configuration Management and Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Ansible foundations
2. Playbooks and tasks
3. Variables, facts and templates
4. Roles and reuse
5. Control flow and handlers
6. Secrets, scale and quality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Ansible foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a static inventory and ping all hosts; (2) Run an ad-hoc command across a host group
- Common misconception addressed: Assuming Ansible needs an agent installed on managed nodes
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Control node, managed nodes and SSH | 80 | 6 |
| M01L02 | Inventory and ad-hoc commands | 80 | 6 |

### M02 Playbooks and tasks (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a playbook that installs and starts a service; (2) Re-run a playbook to confirm it is idempotent
- Common misconception addressed: Writing tasks that change state on every run (not idempotent)
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Playbook structure and modules | 80 | 6 |
| M02L02 | Idempotency and task results | 80 | 6 |

### M03 Variables, facts and templates (MASTEMY-DESIGN 17%)

- Worked applications: (1) Template a config file from host variables; (2) Use a gathered fact to branch a task
- Common misconception addressed: Fighting variable precedence instead of understanding its order
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Variables, precedence and facts | 80 | 6 |
| M03L02 | Jinja2 templates and the template module | 80 | 6 |

### M04 Roles and reuse (MASTEMY-DESIGN 17%)

- Worked applications: (1) Refactor a playbook into a reusable role; (2) Pull a community role from Galaxy and use it
- Common misconception addressed: Copy-pasting tasks between playbooks instead of using roles
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Role structure and defaults | 80 | 6 |
| M04L02 | Reusing roles and Ansible Galaxy | 80 | 6 |

### M05 Control flow and handlers (MASTEMY-DESIGN 16%)

- Worked applications: (1) Restart a service with a handler only when config changes; (2) Loop over a list to create several users
- Common misconception addressed: Restarting a service every run instead of notifying a handler
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Loops, conditionals and handlers | 80 | 6 |
| M05L02 | Tags, blocks and error handling | 80 | 6 |

### M06 Secrets, scale and quality (MASTEMY-DESIGN 16%)

- Worked applications: (1) Encrypt a secrets file with Ansible Vault; (2) Run a playbook in check mode before applying
- Common misconception addressed: Committing plaintext secrets instead of using Vault
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Ansible Vault and secrets | 80 | 6 |
| M06L02 | Testing, check mode and best practice | 80 | 6 |

## Integrative case

Automate configuration of a small fleet of web servers with Ansible: define inventory, write idempotent playbooks factored into roles, template per-host config, restart services only on change with handlers, protect secrets with Vault, and validate with check mode; then defend the role structure and idempotency approach.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0989-final-protected | 30 | 30 | yes |
| MST-0989-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Ansible foundations | 5 |
| Playbooks and tasks | 5 |
| Variables, facts and templates | 5 |
| Roles and reuse | 5 |
| Control flow and handlers | 5 |
| Secrets, scale and quality | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0989-Q0001** (single-answer, Select ONE) What does it mean for an Ansible task to be idempotent?

- A. Running it repeatedly leaves the system in the same final state without needless changes **(key)**  
  _Rationale:_ Correct: idempotent tasks only change what is not already in the desired state.
- B. It can only ever be run once  
  _Rationale:_ Idempotency is about safe repetition, not one-time use.
- C. It always reports changed on every run  
  _Rationale:_ A truly idempotent task reports ok when nothing needs changing.
- D. It requires an agent on each node  
  _Rationale:_ Ansible is agentless; idempotency is unrelated to agents.

**MST-0989-Q0002** (multiple-answer, Select TWO) Which TWO correctly describe Ansible handlers? (Select TWO)

- A. A handler runs only when notified by a task that reported changed **(key)**  
  _Rationale:_ Correct: handlers fire on notification from a changed task.
- B. Handlers typically run once at the end of a play **(key)**  
  _Rationale:_ Correct: notified handlers run after tasks, usually at the play's end.
- C. Handlers run on every task regardless of changes  
  _Rationale:_ They run only when notified.
- D. Handlers cannot restart services  
  _Rationale:_ Restarting a service is a classic handler use.

**MST-0989-Q0003** (single-answer, Select ONE) Why is Ansible described as agentless?

- A. It connects to managed nodes over SSH and does not require installed daemons **(key)**  
  _Rationale:_ Correct: Ansible pushes over SSH (or WinRM) without a persistent agent on nodes.
- B. It never connects to any remote host  
  _Rationale:_ It does connect, just without an agent.
- C. It only configures the control node  
  _Rationale:_ It configures managed nodes too.
- D. It requires a kernel module on each host  
  _Rationale:_ No special module is required.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
