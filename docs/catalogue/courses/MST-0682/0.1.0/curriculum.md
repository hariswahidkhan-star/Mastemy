# Azure Administration and Operational Monitoring

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0682` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). Outcomes are Mastemy internal IDs. Azure Monitor, Log Analytics and RBAC behaviour partially verified against official Microsoft Learn docs; product specifics must be re-verified at production as Azure evolves. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-AZ-MONITOR (https://learn.microsoft.com/azure/azure-monitor/, accessed 2026-10-02) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure Administration and Operational Monitoring (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Administer Azure subscriptions, resource groups and role-based access control
2. Manage resources with the portal, Azure CLI, PowerShell and ARM/Bicep templates
3. Configure Azure Monitor metrics, logs and the Log Analytics workspace
4. Build alerts, action groups and autoscale rules for operational response
5. Design dashboards and workbooks for operational visibility
6. Apply governance, tagging and diagnostic settings across an estate

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Azure administration fundamentals (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Model resource groups and RBAC role assignments for a two-team subscription; (2) Compare built-in roles against a custom role for least privilege
- Common misconception addressed: Treating Owner and Contributor as interchangeable
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Subscriptions, resource groups and the management hierarchy | 77 | 5 |
| M01L02 | Role-based access control and least-privilege design | 77 | 5 |

### M02 Resource management tooling (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Deploy the same resource via CLI and a Bicep template and compare; (2) Parameterise a Bicep template for multiple environments
- Common misconception addressed: Believing portal clicks are reproducible infrastructure
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Portal, Azure CLI and PowerShell for resource operations | 77 | 5 |
| M02L02 | ARM and Bicep templates for repeatable deployment | 77 | 5 |

### M03 Azure Monitor and Log Analytics (MASTEMY-DESIGN 18%, design weight)

- Worked applications: (1) Route diagnostic settings from three services to one workspace; (2) Write a KQL query to find the top error sources in the last day
- Common misconception addressed: Assuming metrics and logs are the same data
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Metrics, logs and the Log Analytics workspace | 86 | 5 |
| M03L02 | Kusto Query Language (KQL) for operational data | 87 | 5 |

### M04 Alerts, action groups and autoscale (MASTEMY-DESIGN 18%, design weight)

- Worked applications: (1) Create a metric alert with an action group that pages on-call; (2) Configure an autoscale rule driven by CPU and queue depth
- Common misconception addressed: Alerting on symptoms instead of service-level signals
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Metric and log alerts with action groups | 86 | 5 |
| M04L02 | Autoscale rules and operational response | 87 | 5 |

### M05 Dashboards and workbooks (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Build a workbook that correlates latency with deployment events; (2) Design a shared dashboard for an on-call rotation
- Common misconception addressed: Building vanity dashboards nobody acts on
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Azure dashboards and shared views | 77 | 5 |
| M05L02 | Workbooks for correlation and triage | 77 | 5 |

### M06 Governance and estate operations (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Apply a tagging policy and report on untagged resources; (2) Enforce diagnostic settings with Azure Policy across subscriptions
- Common misconception addressed: Treating governance as a one-time project
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Tagging, Azure Policy and cost signals | 76 | 5 |
| M06L02 | Diagnostic settings and estate-wide baselines | 76 | 5 |

## Integrative case

A retailer runs 40 subscriptions across three regions. Design an administration and monitoring baseline: an RBAC and tagging model, diagnostic settings routed to a central Log Analytics workspace, alert and autoscale rules for the storefront, and an on-call workbook the operations team defends to management.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0682-final-protected | 30 | 30 | yes |
| MST-0682-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Azure administration fundamentals | 5 |
| Resource management tooling | 5 |
| Azure Monitor and Log Analytics | 5 |
| Alerts, action groups and autoscale | 5 |
| Dashboards and workbooks | 5 |
| Governance and estate operations | 5 |

Minimum reviewed item bank: 348 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0682-Q0001** (single-answer, Select ONE) An operations team wants one query surface across logs from 30 services in different regions. What is the recommended baseline?

- A. Route diagnostic settings from each service to a single centralised Log Analytics workspace **(key)**  
  _Rationale:_ Correct: a central workspace enables cross-service KQL and correlation.
- B. Download logs from each service portal manually each morning  
  _Rationale:_ Manual export does not scale and loses queryability.
- C. Enable metrics only and disable log collection  
  _Rationale:_ Metrics alone cannot answer root-cause questions.
- D. Create one workspace per service and never join them  
  _Rationale:_ Fragmented workspaces defeat cross-service correlation.

**MST-0682-Q0002** (multiple-answer, Select TWO) Which TWO practices support least-privilege administration in Azure? (Select TWO.)

- A. Assign the narrowest built-in or custom role scoped to the smallest resource group **(key)**  
  _Rationale:_ Correct: scope and role granularity limit blast radius.
- B. Use Microsoft Entra PIM to make privileged roles eligible and time-bound **(key)**  
  _Rationale:_ Correct: just-in-time elevation reduces standing privilege.
- C. Grant every engineer Owner on the subscription for convenience  
  _Rationale:_ Standing Owner access is excessive and risky.
- D. Share one administrator account among the team  
  _Rationale:_ Shared accounts destroy auditability.

**MST-0682-Q0003** (single-answer, Select ONE) A storefront's CPU spikes during flash sales and users see timeouts. Which action group plus scaling response is most appropriate?

- A. A metric alert on sustained CPU with an autoscale rule adding instances **(key)**  
  _Rationale:_ Correct: autoscale on a sustained signal absorbs load; the alert notifies on-call.
- B. A single email alert with no scaling configured  
  _Rationale:_ Notification without scaling does not resolve the overload.
- C. Manually add VMs after each incident  
  _Rationale:_ Manual response is too slow for flash traffic.
- D. Disable monitoring to reduce noise  
  _Rationale:_ Removing signals hides the problem.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
