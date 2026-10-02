# IT Asset Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1686` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-IAM-002 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — IT Asset Management (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain IT asset management (ITAM) concepts and the asset lifecycle
2. Build and maintain an accurate asset inventory and CMDB
3. Manage software licensing and compliance
4. Govern asset acquisition, tracking and secure disposal
5. Use ITAM to support security, cost and risk decisions

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 ITAM foundations and lifecycle (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map a device through each lifecycle stage; (2) Distinguish ITAM from configuration management
- Common misconception addressed: Treating ITAM as a one-off inventory rather than an ongoing lifecycle
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What IT asset management is and why it matters | 72 | 6 |
| M01L02 | The asset lifecycle from request to retirement | 72 | 6 |

### M02 Inventory and the CMDB (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose discovery methods for a mixed estate; (2) Reconcile a discovered asset against the CMDB
- Common misconception addressed: Assuming an inventory stays accurate without reconciliation
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Discovering and recording assets | 72 | 6 |
| M02L02 | Keeping a CMDB accurate over time | 72 | 6 |

### M03 Software licensing and compliance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Match a deployment to its licence entitlement; (2) Identify over- and under-licensing in a report
- Common misconception addressed: Confusing installed copies with licensed entitlements
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Licence models and entitlements | 72 | 6 |
| M03L02 | Preparing for a software audit | 72 | 6 |

### M04 Acquisition, tracking and disposal (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Define a tracking scheme (tags and ownership); (2) Choose a secure disposal method for storage media
- Common misconception addressed: Disposing of hardware without destroying the data on it
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Procurement and asset tracking | 72 | 6 |
| M04L02 | Secure disposal and data destruction | 72 | 6 |

### M05 ITAM for security, cost and risk (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Use the inventory to find unpatched end-of-life systems; (2) Build a refresh plan from asset age data
- Common misconception addressed: Keeping unsupported assets in service because they still work
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Using asset data for security and patching | 72 | 6 |
| M05L02 | Cost optimisation and end-of-life risk | 72 | 6 |

## Integrative case

An organisation cannot say how many laptops it owns, has failed a software licence audit, and has found a disposed server still holding customer data. Build an ITAM programme: establish an accurate inventory, reconcile licences, define lifecycle and secure disposal processes, and show how the data supports security and cost decisions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1686-final-protected | 25 | 25 | yes |
| MST-1686-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| ITAM foundations and lifecycle | 5 |
| Inventory and the CMDB | 5 |
| Software licensing and compliance | 5 |
| Acquisition, tracking and disposal | 5 |
| ITAM for security, cost and risk | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1686-Q0001** (single-answer, Select ONE) Why is an accurate asset inventory a security control, not just a cost tool?

- A. You cannot patch or protect assets you do not know you have **(key)**  
  _Rationale:_ Correct: unknown assets cannot be patched, monitored or secured.
- B. Inventories automatically encrypt all devices  
  _Rationale:_ An inventory records assets; it does not encrypt them.
- C. An inventory replaces the need for antivirus  
  _Rationale:_ Inventory informs defence but does not replace controls.
- D. Inventories prevent all hardware theft  
  _Rationale:_ Tracking helps detect loss but does not prevent theft.

**MST-1686-Q0002** (multiple-answer, Select TWO) Which TWO practices keep a CMDB accurate over time? (Select TWO.)

- A. Reconcile automated discovery against recorded entries **(key)**  
  _Rationale:_ Correct: reconciliation catches drift between reality and records.
- B. Assign clear ownership for updating records **(key)**  
  _Rationale:_ Correct: accountable owners keep entries current.
- C. Record each asset once and never review it  
  _Rationale:_ Static records drift out of date quickly.
- D. Delete assets whenever discovery misses them once  
  _Rationale:_ A single missed scan is not proof of disposal.

**MST-1686-Q0003** (single-answer, Select ONE) A laptop is retired. What must happen before it leaves the organisation?

- A. Its storage is securely wiped or destroyed and the record updated **(key)**  
  _Rationale:_ Correct: data destruction and record update close the lifecycle safely.
- B. It is switched off and put in storage indefinitely  
  _Rationale:_ Storing it does not address the data or the record.
- C. Only the asset tag is removed  
  _Rationale:_ Removing the tag leaves the data intact.
- D. It is sold immediately with data intact  
  _Rationale:_ Selling with data intact risks a breach.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
