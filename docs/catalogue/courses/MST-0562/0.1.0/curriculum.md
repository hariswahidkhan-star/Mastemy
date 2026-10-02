# Cursor MCP Servers and Enterprise Tool Connections

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0562` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0562 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor MCP Servers and Enterprise Tool Connections (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what MCP-style tool connections add to Cursor and their risks
2. Configure a tool server with least-privilege credentials
3. Use connected tools in agent tasks and audit their actions
4. Apply security and governance to connections across a team
5. Operate connections responsibly with monitoring and clean decommissioning

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 What MCP connections add to Cursor (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) List tasks that a tool connection would unblock; (2) Decide when a connection is not worth the risk
- Common misconception addressed: Assuming a connected tool is safe without reviewing its scope
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why connect external tools and data to the editor | 72 | 5 |
| M01L02 | How a tool connection changes the agent's capabilities | 72 | 5 |

### M02 Configuring a tool server (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Configure a read-only connection for an internal service; (2) Scope a connection's permissions to least privilege
- Common misconception addressed: Granting a connection broad write access it does not need
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Adding and configuring a server in Cursor | 96 | 5 |
| M02L02 | Scoping credentials and permissions for a connection | 96 | 5 |

### M03 Using connected tools in agent tasks (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Have the agent use a connected tool to complete a task; (2) Audit the actions a tool took during a task
- Common misconception addressed: Letting the agent act through a tool with no review of effects
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Invoking tool actions from an agent task | 80 | 5 |
| M03L02 | Reviewing what a connected tool actually did | 80 | 5 |
| M03L03 | Handling failures and partial results from a tool | 80 | 5 |

### M04 Security and governance of connections (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan secret rotation for a tool connection; (2) Define an approval process for new connections
- Common misconception addressed: Sharing a personal token for a team-wide connection
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Secrets, token rotation and audit for connections | 96 | 5 |
| M04L02 | Approving and reviewing connections at team level | 96 | 5 |

### M05 Operating connections responsibly (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Add monitoring and a limit to a connection; (2) Decommission a connection and revoke its access
- Common misconception addressed: Leaving an unused connection and its token active
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Monitoring and limiting what connected tools can do | 96 | 5 |
| M05L02 | Decommissioning a connection cleanly | 96 | 5 |

## Integrative case

A platform team connects an internal ticketing service to Cursor via a tool server: scope a least-privilege read/write token, let the agent use it within a task, audit every action it took, set rotation and monitoring, and define a team approval process for new connections.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0562-final-protected | 30 | 40 | yes |
| MST-0562-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What MCP connections add to Cursor | 5 |
| Configuring a tool server | 6 |
| Using connected tools in agent tasks | 7 |
| Security and governance of connections | 6 |
| Operating connections responsibly | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0562-Q0001** (single-answer, Select ONE) What permission level should a new tool connection start from?

- A. Least privilege: only the access the task actually needs **(key)**  
  _Rationale:_ Correct: least privilege limits the damage of any mistake or breach.
- B. Full administrative access for convenience  
  _Rationale:_ Broad access widens risk far beyond the task.
- C. Whatever the default happens to be  
  _Rationale:_ Defaults may grant more than the task needs.
- D. Write access to every system it can reach  
  _Rationale:_ Unneeded write access is a serious liability.

**MST-0562-Q0002** (multiple-answer, Select TWO) Which TWO controls govern enterprise tool connections well? (Select TWO.)

- A. Rotate tokens and audit the actions connections take **(key)**  
  _Rationale:_ Correct: rotation and auditing limit and surface misuse.
- B. Require approval before a new connection is added **(key)**  
  _Rationale:_ Correct: an approval step prevents ungoverned connections.
- C. Share one personal token across the whole team  
  _Rationale:_ Shared personal tokens defeat auditing and rotation.
- D. Leave unused connections active indefinitely  
  _Rationale:_ Stale connections are an unnecessary attack surface.

**MST-0562-Q0003** (single-answer, Select ONE) After an agent completes a task using a connected tool, what should you do?

- A. Audit the actions the tool actually performed **(key)**  
  _Rationale:_ Correct: reviewing effects catches unintended actions.
- B. Assume it did exactly what was asked  
  _Rationale:_ Unreviewed tool actions can have side effects.
- C. Immediately widen the connection's permissions  
  _Rationale:_ Widening access without need increases risk.
- D. Delete the task history to save space  
  _Rationale:_ History is what lets you audit what happened.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
