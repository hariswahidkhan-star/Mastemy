# Vulnerability Assessment in Authorized Environments

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1017` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Vulnerability Assessment in Authorized Environments (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Fundamentals and authorisation
2. Asset discovery and scoping
3. Scanning tools and configuration
4. Interpreting and validating results
5. Risk scoring and prioritisation
6. Reporting and remediation tracking

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Fundamentals and authorisation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a scope statement and get-out-of-jail authorisation line; (2) Distinguish a vulnerability assessment from a penetration test
- Common misconception addressed: Scanning systems without written authorisation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What vulnerability assessment is (and is not) | 80 | 6 |
| M01L02 | Authorisation, scope and rules of engagement | 80 | 6 |

### M02 Asset discovery and scoping (MASTEMY-DESIGN 17%)

- Worked applications: (1) Produce a target list from a discovery scan; (2) Exclude an out-of-scope host from a scan profile
- Common misconception addressed: Assuming the asset inventory is already complete and correct
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Discovering assets and services | 80 | 6 |
| M02L02 | Scoping to avoid out-of-bounds systems | 80 | 6 |

### M03 Scanning tools and configuration (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose authenticated scanning for a patch-level check; (2) Configure a scan to avoid disrupting a fragile host
- Common misconception addressed: Believing an unauthenticated scan sees the same depth as an authenticated one
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Authenticated vs unauthenticated scans | 80 | 6 |
| M03L02 | Tuning scans to reduce noise and risk | 80 | 6 |

### M04 Interpreting and validating results (MASTEMY-DESIGN 16%)

- Worked applications: (1) Confirm a finding with a second data point; (2) Flag a likely false positive and justify it
- Common misconception addressed: Reporting raw scanner output as confirmed vulnerabilities
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading scanner output and evidence | 80 | 6 |
| M04L02 | Validating findings and removing false positives | 80 | 6 |

### M05 Risk scoring and prioritisation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Explain why two CVSS-7 findings differ in real risk; (2) Re-rank findings using exposure and exploit availability
- Common misconception addressed: Treating the CVSS base score as the final risk
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | CVSS base metrics and what they mean | 80 | 6 |
| M05L02 | Prioritising with exploitability and context | 80 | 6 |

### M06 Reporting and remediation tracking (MASTEMY-DESIGN 18%)

- Worked applications: (1) Turn a finding into a clear remediation instruction; (2) Set up a re-test to confirm a fix
- Common misconception addressed: Closing findings without verifying the fix
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Writing an actionable assessment report | 80 | 6 |
| M06L02 | Tracking remediation and re-testing | 80 | 6 |

## Integrative case

Run an authorised assessment of a small internal network: confirm scope and authorisation, discover assets, pick authenticated scanning, validate findings and drop a false positive, re-rank by exploitability and exposure rather than base score alone, then write remediation instructions and schedule a re-test.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1017-final-protected | 30 | 30 | yes |
| MST-1017-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Fundamentals and authorisation | 5 |
| Asset discovery and scoping | 5 |
| Scanning tools and configuration | 5 |
| Interpreting and validating results | 5 |
| Risk scoring and prioritisation | 5 |
| Reporting and remediation tracking | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1017-Q0001** (single-answer, Select ONE) What must be in place before any vulnerability scan of systems you do not own is started?

- A. Written authorisation defining the scope and timing **(key)**  
  _Rationale:_ Correct: explicit authorisation and scope are required before scanning.
- B. A public announcement to all internet users  
  _Rationale:_ Public announcement is neither required nor sufficient.
- C. Proof that no vulnerabilities exist  
  _Rationale:_ The scan is what finds vulnerabilities; this is circular.
- D. A signed non-disclosure from the vendor of the scanner  
  _Rationale:_ A scanner NDA does not authorise scanning the targets.

**MST-1017-Q0002** (multiple-answer, Select ALL that apply) Which two factors should raise a finding's real-world priority above its raw CVSS base score? (Select TWO)

- A. A working exploit is publicly available **(key)**  
  _Rationale:_ Correct: available exploits increase likelihood of attack.
- B. The affected asset is internet-exposed **(key)**  
  _Rationale:_ Correct: exposure increases the attack surface and likelihood.
- C. The finding has a memorable CVE identifier  
  _Rationale:_ The identifier's memorability has no bearing on risk.
- D. The scanner used a blue icon for the result  
  _Rationale:_ Icon colour is cosmetic and irrelevant to risk.

**MST-1017-Q0003** (single-answer, Select ONE) Why is an authenticated scan usually more accurate for assessing missing patches than an unauthenticated one?

- A. It can read installed versions and configuration directly on the host **(key)**  
  _Rationale:_ Correct: credentials let the scanner inspect actual patch levels instead of inferring them.
- B. It never produces any false positives  
  _Rationale:_ Authenticated scans can still produce false positives.
- C. It does not require authorisation  
  _Rationale:_ Authorisation is still required regardless of scan type.
- D. It automatically fixes the vulnerabilities it finds  
  _Rationale:_ Scanning assesses; it does not remediate.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
