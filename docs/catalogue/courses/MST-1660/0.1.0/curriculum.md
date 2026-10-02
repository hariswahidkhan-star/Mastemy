# Firewall Concepts and Configuration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1660` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-FCC-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Firewall Concepts and Configuration (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain firewall types and where each fits in a network
2. Design and order firewall rule sets using least privilege
3. Configure NAT, zones and stateful inspection concepts
4. Troubleshoot connectivity problems caused by firewall rules
5. Describe logging and change control for firewall management

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Firewall fundamentals (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Match a firewall type to a given requirement; (2) Place a firewall correctly in a small network diagram
- Common misconception addressed: Believing a next-generation firewall removes the need for other controls
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Packet filter, stateful and next-generation firewalls | 72 | 6 |
| M01L02 | Where firewalls sit in a network | 72 | 6 |

### M02 Rules and least privilege (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Order a set of rules so the intended traffic is allowed; (2) Tighten an over-permissive 'allow any' rule
- Common misconception addressed: Placing a broad allow rule above the specific deny it should follow
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Rule structure, order and the implicit deny | 72 | 6 |
| M02L02 | Writing least-privilege rules | 72 | 6 |

### M03 NAT and zones (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Configure destination NAT to publish a web server; (2) Define zones for LAN, DMZ and WAN
- Common misconception addressed: Confusing NAT with a security control that inspects traffic
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Source and destination NAT | 72 | 6 |
| M03L02 | Security zones and interzone policy | 72 | 6 |

### M04 Troubleshooting firewalls (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Use hit counts to find a rule that never matches; (2) Trace why permitted traffic is still being dropped
- Common misconception addressed: Assuming the firewall is innocent before checking its logs
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading firewall logs and hit counts | 72 | 6 |
| M04L02 | Diagnosing blocked and allowed traffic | 72 | 6 |

### M05 Management and change control (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a periodic review to remove stale rules; (2) Draft a change record for a new rule
- Common misconception addressed: Adding rules permanently to fix a one-off problem
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Logging, backups and rule review | 72 | 6 |
| M05L02 | Change control and documentation | 72 | 6 |

## Integrative case

A new branch office needs a firewall that allows staff web and email access, permits a VPN to head office, and blocks everything else. Design the rule set in the correct order, define zones and NAT, and document a change process so future rules do not silently open the network.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1660-final-protected | 25 | 25 | yes |
| MST-1660-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Firewall fundamentals | 5 |
| Rules and least privilege | 5 |
| NAT and zones | 5 |
| Troubleshooting firewalls | 5 |
| Management and change control | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1660-Q0001** (single-answer, Select ONE) Two firewall rules conflict: a broad 'allow any' is placed above a specific 'deny'. What happens to the targeted traffic?

- A. It is allowed, because rules are evaluated top-down and the first match wins **(key)**  
  _Rationale:_ Correct: the first matching rule applies, so the broad allow overrides the later deny.
- B. It is denied, because deny always wins  
  _Rationale:_ Order, not rule type, determines the outcome here.
- C. Both rules are ignored  
  _Rationale:_ Rules are still evaluated; the first match applies.
- D. The firewall crashes on the conflict  
  _Rationale:_ A rule-order conflict does not crash the firewall.

**MST-1660-Q0002** (multiple-answer, Select TWO) Which TWO practices support safe firewall management? (Select TWO.)

- A. Periodically reviewing and removing stale rules **(key)**  
  _Rationale:_ Correct: rule review prevents accumulation of unneeded openings.
- B. Recording every change with a reason **(key)**  
  _Rationale:_ Correct: change records give an audit trail and aid rollback.
- C. Keeping an 'allow any any' rule for convenience  
  _Rationale:_ A permit-all rule defeats the firewall's purpose.
- D. Disabling logging to save space  
  _Rationale:_ Disabling logging removes visibility needed to investigate issues.

**MST-1660-Q0003** (single-answer, Select ONE) What does stateful inspection add compared with simple packet filtering?

- A. It tracks connection state so reply traffic is allowed without a separate rule **(key)**  
  _Rationale:_ Correct: stateful firewalls remember established connections.
- B. It encrypts all traffic by default  
  _Rationale:_ Stateful inspection does not provide encryption.
- C. It removes the need for any rules  
  _Rationale:_ Rules are still required to define allowed connections.
- D. It only works on wireless networks  
  _Rationale:_ Stateful inspection is not limited to wireless.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
