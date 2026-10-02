# Vulnerability Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1667` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-VM-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Vulnerability Management (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain vulnerability management as a continuous lifecycle
2. Run and interpret vulnerability scans accurately
3. Prioritise findings using severity, exploitability and context
4. Plan and track remediation and verification
5. Report vulnerability posture to technical and non-technical audiences

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Vulnerability management lifecycle (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Order the lifecycle phases for a new programme; (2) Explain why an incomplete asset inventory undermines scanning
- Common misconception addressed: Treating a single annual scan as a complete programme
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why a continuous lifecycle, not a one-off scan | 72 | 6 |
| M01L02 | Asset inventory as the foundation | 72 | 6 |

### M02 Scanning (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a scan type for a given goal; (2) Confirm whether a finding is a false positive
- Common misconception addressed: Assuming an unauthenticated scan sees everything an attacker could
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Authenticated vs unauthenticated scans | 72 | 6 |
| M02L02 | Reducing false positives and negatives | 72 | 6 |

### M03 Prioritisation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Rank three findings using severity and exposure; (2) Decide when a compensating control changes priority
- Common misconception addressed: Fixing by CVSS score alone while ignoring exposure and exploitation
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CVSS, exploitability and threat context | 72 | 6 |
| M03L02 | Business context and compensating controls | 72 | 6 |

### M04 Remediation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Assign owners and deadlines to a finding set; (2) Choose mitigation when a patch is not yet available
- Common misconception addressed: Marking a finding fixed without any verification
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Patching, configuration and mitigation | 72 | 6 |
| M04L02 | Assigning owners and tracking SLAs | 72 | 6 |

### M05 Verification and reporting (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Verify a remediation with a targeted rescan; (2) Summarise posture for a non-technical executive
- Common misconception addressed: Reporting raw finding counts with no trend or context
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Rescanning and verifying fixes | 72 | 6 |
| M05L02 | Reporting posture and trends | 72 | 6 |

## Integrative case

A monthly scan returns hundreds of findings and limited time to fix them. Validate the results, prioritise what truly matters using severity and business context, plan remediation with owners and deadlines, verify the fixes, and report progress to management.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1667-final-protected | 25 | 25 | yes |
| MST-1667-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Vulnerability management lifecycle | 5 |
| Scanning | 5 |
| Prioritisation | 5 |
| Remediation | 5 |
| Verification and reporting | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1667-Q0001** (single-answer, Select ONE) Why should vulnerability findings be prioritised using more than the raw CVSS score?

- A. Exposure, exploitability and business context change the real risk **(key)**  
  _Rationale:_ Correct: context determines which high-severity items matter most.
- B. CVSS scores are always wrong  
  _Rationale:_ CVSS is useful; it is simply not the whole picture.
- C. Prioritisation is unnecessary if you have a scanner  
  _Rationale:_ A scanner finds issues; prioritisation decides what to fix first.
- D. Only the newest findings ever matter  
  _Rationale:_ Age alone does not determine priority.

**MST-1667-Q0002** (multiple-answer, Select TWO) Which TWO practices strengthen a remediation workflow? (Select TWO.)

- A. Assigning each finding an owner and a deadline **(key)**  
  _Rationale:_ Correct: clear ownership and deadlines drive timely fixes.
- B. Verifying fixes with a targeted rescan **(key)**  
  _Rationale:_ Correct: rescanning confirms the vulnerability is actually resolved.
- C. Closing findings as fixed without checking  
  _Rationale:_ Unverified closure leaves real risk open.
- D. Ignoring findings with no available patch  
  _Rationale:_ Mitigations or compensating controls should be applied meanwhile.

**MST-1667-Q0003** (single-answer, Select ONE) What is the main advantage of an authenticated vulnerability scan?

- A. It can assess configuration and missing patches from the inside, finding more issues **(key)**  
  _Rationale:_ Correct: credentials let the scanner inspect the host in depth.
- B. It guarantees zero false positives  
  _Rationale:_ No scan type guarantees zero false positives.
- C. It never needs an asset inventory  
  _Rationale:_ An inventory is still essential for coverage.
- D. It replaces the need for remediation  
  _Rationale:_ Scanning finds issues; remediation still fixes them.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
