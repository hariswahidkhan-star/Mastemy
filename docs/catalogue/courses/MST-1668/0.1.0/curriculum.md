# Penetration Testing Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1668` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain penetration-testing scope, ethics and authorisation
2. Perform reconnaissance and enumeration in authorised scope
3. Identify and validate common vulnerabilities
4. Understand exploitation concepts at a conceptual level
5. Assess web and network weaknesses with a methodology
6. Report findings with risk ratings and remediation advice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Ethics, scope and authorisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draft a rules-of-engagement checklist; (2) Map a test to a standard methodology
- Common misconception addressed: Testing anything outside written authorisation
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Rules of engagement and legality | 168 | 8 |
| M01L02 | Methodologies and reporting lifecycle | 168 | 8 |

### M02 Reconnaissance and enumeration (MASTEMY-DESIGN 20%)

- Worked applications: (1) Enumerate services on a scoped host; (2) Catalogue an attack surface
- Common misconception addressed: Scanning targets not in the authorised scope
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Passive and active recon in scope | 168 | 8 |
| M02L02 | Service and port enumeration | 168 | 8 |

### M03 Vulnerability identification (MASTEMY-DESIGN 20%)

- Worked applications: (1) Validate a scanner finding by hand; (2) Rank findings by severity
- Common misconception addressed: Reporting scanner output without validation
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scanning and manual validation | 168 | 8 |
| M03L02 | Triage and false positives | 168 | 8 |

### M04 Exploitation concepts (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain how a known class of flaw is exploited; (2) Describe safe cleanup after a test
- Common misconception addressed: Running exploits on production without a safety plan
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | How common exploits work conceptually | 168 | 8 |
| M04L02 | Post-exploitation and cleanup principles | 168 | 8 |

### M05 Web, network and reporting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe an injection or access-control flaw; (2) Write a finding with risk and remediation
- Common misconception addressed: Delivering findings with no remediation guidance
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Common web and network weaknesses | 168 | 8 |
| M05L02 | Risk rating and remediation reporting | 168 | 8 |

## Integrative case

Given a written, authorised engagement for an isolated lab environment, plan the test, enumerate the scoped targets, validate two vulnerabilities, and write a findings report with risk ratings and fixes.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1668-final-protected | 25 | 25 | yes |
| MST-1668-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Ethics, scope and authorisation | 5 |
| Reconnaissance and enumeration | 5 |
| Vulnerability identification | 5 |
| Exploitation concepts | 5 |
| Web, network and reporting | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1668-Q0001** (single-answer, Select ONE) What must be in place before any penetration-testing activity begins?

- A. Written authorisation defining scope and rules of engagement **(key)**  
  _Rationale:_ Correct: explicit authorisation and scope are mandatory.
- B. A public announcement of the test  
  _Rationale:_ Public disclosure is not a prerequisite.
- C. Access to production customer data  
  _Rationale:_ That is not a prerequisite and may be out of scope.
- D. Permission is implied for any internet-facing system  
  _Rationale:_ Authorisation is never implied.

**MST-1668-Q0002** (multiple-answer, Select TWO) Which TWO are correct about validating scanner findings? (Select TWO.)

- A. Automated findings can include false positives that need manual checks **(key)**  
  _Rationale:_ Correct: scanners produce false positives.
- B. Manual validation improves report accuracy **(key)**  
  _Rationale:_ Correct: validation confirms real risk.
- C. Scanner output should be reported verbatim as confirmed vulnerabilities  
  _Rationale:_ Unvalidated output is not confirmed.
- D. Every finding is always a true positive  
  _Rationale:_ That is not true.

**MST-1668-Q0003** (single-answer, Select ONE) Why include remediation advice in a penetration-test report?

- A. So the owner can fix the issues, not just learn they exist **(key)**  
  _Rationale:_ Correct: actionable remediation is the report's value.
- B. To make the report longer  
  _Rationale:_ Length is not the purpose.
- C. Because findings cannot be rated without it  
  _Rationale:_ Ratings and remediation are separate.
- D. To avoid naming any vulnerabilities  
  _Rationale:_ Findings still name the issues.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
