# Amazon Connect: Customer-Service Automation and Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0778` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Web Services (AWS) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-CONNECT (https://docs.aws.amazon.com/connect/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon Connect: Customer-Service Automation and Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up an Amazon Connect instance, queues and routing profiles
2. Build contact flows for voice and chat with prompts and logic
3. Add self-service and automation with bots and Lambda
4. Manage agents, hours of operation and routing
5. Analyze contact performance with metrics and recordings
6. Secure the contact center and control its cost

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Instance and routing (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create queues and a routing profile; (2) Assign agents to routing profiles
- Common misconception addressed: Creating queues without routing profiles so contacts are never delivered
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Instance setup, queues and hours | 120 | 5 |
| M01L02 | Routing profiles and agent assignment | 120 | 5 |

### M02 Contact flows (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a flow that greets, offers options and routes; (2) Add branching based on caller input
- Common misconception addressed: Building one giant flow instead of modular, reusable flows
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Flow blocks, prompts and branching | 120 | 5 |
| M02L02 | Voice and chat flow patterns | 120 | 5 |

### M03 Automation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add a bot to answer common questions; (2) Look up a customer record with a Lambda data dip
- Common misconception addressed: Routing every contact to an agent when self-service would resolve many
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Self-service bots in flows | 120 | 5 |
| M03L02 | Lambda integrations and data lookups | 120 | 5 |

### M04 Analytics, security and cost (MASTEMY-DESIGN 25%)

- Worked applications: (1) Read service-level and queue metrics; (2) Restrict access to recordings and sensitive data
- Common misconception addressed: Leaving call recordings accessible to users who should not see them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Metrics, dashboards and recordings | 120 | 5 |
| M04L02 | Access control, data security and cost | 120 | 5 |

## Integrative case

Stand up a support line in Amazon Connect: configure queues and routing profiles, build a contact flow that offers self-service then routes to the right queue, add a bot for common questions, set hours of operation, then review service-level metrics and secure access and recordings.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0778-final-protected | 40 | 50 | yes |
| MST-0778-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Instance and routing | 10 |
| Contact flows | 10 |
| Automation | 10 |
| Analytics, security and cost | 10 |

Minimum reviewed item bank: 328 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0778-Q0001** (single-answer, Select ONE) Contacts enter a queue in Amazon Connect but no agent ever receives them. What is the most likely missing configuration?

- A. A routing profile linking agents to that queue **(key)**  
  _Rationale:_ Correct: routing profiles connect agents to queues so contacts are delivered.
- B. A larger instance size  
  _Rationale:_ Instance size does not deliver queued contacts to agents.
- C. A second phone number  
  _Rationale:_ Another number does not fix queue-to-agent routing.
- D. A longer greeting prompt  
  _Rationale:_ Prompt length is unrelated to agent assignment.

**MST-0778-Q0002** (multiple-answer, Select TWO) Which TWO practices improve a support line's efficiency in Amazon Connect? (Select TWO.)

- A. Offer self-service in the flow for common questions **(key)**  
  _Rationale:_ Correct: self-service deflects routine contacts from agents.
- B. Build modular, reusable contact flows **(key)**  
  _Rationale:_ Correct: modular flows are easier to maintain and reuse.
- C. Route every contact directly to an agent  
  _Rationale:_ That removes the benefit of automation.
- D. Hide all metrics from supervisors  
  _Rationale:_ Supervisors need metrics to manage service levels.

**MST-0778-Q0003** (single-answer, Select ONE) Call recordings in a contact center contain sensitive data. What is the appropriate access approach?

- A. Restrict recording access to authorized roles only **(key)**  
  _Rationale:_ Correct: least-privilege access protects sensitive recordings.
- B. Allow all agents to access all recordings  
  _Rationale:_ Broad access over-exposes sensitive data.
- C. Make recordings publicly downloadable  
  _Rationale:_ Public access is a serious data risk.
- D. Disable security to simplify access  
  _Rationale:_ Disabling security endangers sensitive data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
