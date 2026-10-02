# Microsoft Defender: Enterprise Protection Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0694` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). Microsoft Defender XDR portal, incidents, endpoint/identity/cloud-apps workloads and automated investigation partially verified against official Microsoft Learn Defender docs; re-verify specifics at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-DEFENDER-XDR (https://learn.microsoft.com/defender-xdr/, accessed 2026-10-02) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Defender: Enterprise Protection Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Microsoft Defender XDR and its workloads
2. Onboard endpoints and configure Defender for Endpoint
3. Protect identity and email with Defender for Identity and Office 365
4. Investigate cross-domain incidents in the Defender portal
5. Use automated investigation and response and remediation
6. Operate threat hunting, reporting and secure-score improvement

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Defender XDR overview (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Map the XDR workloads to the assets they protect; (2) Explain how cross-domain signals form one incident
- Common misconception addressed: Treating each Defender product as a separate silo
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Microsoft Defender XDR and the unified portal | 77 | 5 |
| M01L02 | Workloads: endpoint, identity, email and cloud apps | 77 | 5 |

### M02 Endpoint protection (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Onboard devices and verify sensor health; (2) Configure attack surface reduction rules
- Common misconception addressed: Onboarding devices but never checking sensor health
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Defender for Endpoint onboarding | 81 | 5 |
| M02L02 | Attack surface reduction and endpoint policy | 82 | 5 |

### M03 Identity and email protection (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Detect a suspicious lateral-movement signal in identity data; (2) Tune an anti-phishing policy for a targeted campaign
- Common misconception addressed: Protecting endpoints but ignoring identity attacks
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Defender for Identity | 77 | 5 |
| M03L02 | Defender for Office 365 and email threats | 77 | 5 |

### M04 Incident investigation (MASTEMY-DESIGN 18%, design weight)

- Worked applications: (1) Walk the attack story and incident graph for a multi-stage attack; (2) Use unified entity pages to assess blast radius
- Common misconception addressed: Investigating alerts in isolation, missing the full story
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Unified incident queue and attack story | 86 | 5 |
| M04L02 | Entity pages, blast radius and evidence | 87 | 5 |

### M05 Automated investigation and response (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Configure AIR to auto-remediate low-risk detections; (2) Set approval tiers for disruptive remediation
- Common misconception addressed: Enabling full auto-remediation with no approval tiers
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Automated investigation and response (AIR) | 81 | 5 |
| M05L02 | Remediation actions and approval levels | 82 | 5 |

### M06 Hunting and improvement (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Write an advanced-hunting query across endpoint and identity tables; (2) Prioritise secure-score recommendations by impact
- Common misconception addressed: Chasing secure score points with no risk reasoning
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Advanced hunting with KQL | 76 | 5 |
| M06L02 | Secure score, reporting and program maturity | 77 | 5 |

## Integrative case

An enterprise consolidates security into Microsoft Defender XDR. Onboard endpoints, enable identity and email protection, set up the unified incident queue with cross-domain correlation, define automated investigation and response actions with approval tiers, build advanced-hunting queries, and track secure score, then present a 90-day protection roadmap.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0694-final-protected | 30 | 30 | yes |
| MST-0694-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Defender XDR overview | 5 |
| Endpoint protection | 5 |
| Identity and email protection | 5 |
| Incident investigation | 5 |
| Automated investigation and response | 5 |
| Hunting and improvement | 5 |

Minimum reviewed item bank: 348 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0694-Q0001** (single-answer, Select ONE) An attacker phishes a user, lands on an endpoint, then moves to a server. In Defender XDR, how is this best viewed?

- A. As a single incident with a cross-domain attack story across email, endpoint and identity **(key)**  
  _Rationale:_ Correct: XDR correlates signals into one incident.
- B. As four unrelated alerts in separate products  
  _Rationale:_ XDR exists to correlate these, not silo them.
- C. Only as an endpoint alert  
  _Rationale:_ That misses the email and identity stages.
- D. As a billing event  
  _Rationale:_ It is a security incident, not billing.

**MST-0694-Q0002** (multiple-answer, Select TWO) Which TWO are sound ways to configure automated investigation and response? (Select TWO.)

- A. Auto-remediate high-confidence, low-risk detections **(key)**  
  _Rationale:_ Correct: automating safe actions speeds response.
- B. Require analyst approval for disruptive remediation **(key)**  
  _Rationale:_ Correct: approval tiers guard risky actions.
- C. Auto-isolate every device on any alert with no review  
  _Rationale:_ Over-aggressive automation harms operations.
- D. Disable all automation to avoid any mistakes  
  _Rationale:_ That forfeits speed on safe actions.

**MST-0694-Q0003** (single-answer, Select ONE) A SOC wants to proactively search endpoint and identity telemetry for a technique before an alert fires. What should they use?

- A. Advanced hunting with KQL across the unified tables **(key)**  
  _Rationale:_ Correct: advanced hunting queries telemetry proactively.
- B. Waiting for an incident to be created  
  _Rationale:_ That is reactive, not proactive hunting.
- C. Reading only the secure score page  
  _Rationale:_ Secure score is posture, not hunting.
- D. Exporting mailbox contents  
  _Rationale:_ That is not a hunting method.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
