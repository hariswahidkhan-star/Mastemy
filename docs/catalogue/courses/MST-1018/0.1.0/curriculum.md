# Penetration Testing Methodology in Isolated Authorized Labs

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1018` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Penetration Testing Methodology in Isolated Authorized Labs (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Methodology and rules of engagement
2. Reconnaissance and enumeration
3. Vulnerability identification and exploitation basics
4. Post-exploitation and privilege escalation
5. Web and network testing techniques
6. Evidence capture and reporting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Methodology and rules of engagement (MASTEMY-DESIGN 16%)

- Worked applications: (1) Draft rules of engagement for a lab test; (2) Place an activity in the correct methodology phase
- Common misconception addressed: Starting testing without agreed scope and rules of engagement
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pen-test phases and frameworks | 80 | 6 |
| M01L02 | Rules of engagement, authorisation and ethics | 80 | 6 |

### M02 Reconnaissance and enumeration (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enumerate services on a lab host and record versions; (2) Choose passive recon to avoid tipping off a target
- Common misconception addressed: Confusing noisy active scanning with stealthy reconnaissance
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Passive and active reconnaissance | 80 | 6 |
| M02L02 | Service and version enumeration | 80 | 6 |

### M03 Vulnerability identification and exploitation basics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Match an enumerated service to a candidate weakness; (2) Explain how to exploit safely without damaging the lab target
- Common misconception addressed: Assuming every identified vulnerability is exploitable in context
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mapping findings to candidate exploits | 80 | 6 |
| M03L02 | Safe, controlled exploitation in a lab | 80 | 6 |

### M04 Post-exploitation and privilege escalation (MASTEMY-DESIGN 16%)

- Worked applications: (1) List post-exploitation objectives after a foothold; (2) Identify a local privilege-escalation path in a lab VM
- Common misconception addressed: Treating initial access as the end of the engagement
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Post-exploitation goals and footholds | 80 | 6 |
| M04L02 | Privilege escalation concepts in the lab | 80 | 6 |

### M05 Web and network testing techniques (MASTEMY-DESIGN 17%)

- Worked applications: (1) Test a lab web app for a basic injection flaw; (2) Describe how a pivot reaches an internal subnet
- Common misconception addressed: Thinking a single host compromise means the whole network is owned
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Common web weaknesses in the lab | 80 | 6 |
| M05L02 | Network pivoting and lateral movement concepts | 80 | 6 |

### M06 Evidence capture and reporting (MASTEMY-DESIGN 18%)

- Worked applications: (1) Capture reproducible evidence for one finding; (2) Prioritise findings by business impact in a report
- Common misconception addressed: Reporting findings without reproducible proof or remediation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Capturing reproducible evidence | 80 | 6 |
| M06L02 | Writing a prioritised pen-test report | 80 | 6 |

## Integrative case

Run an authorised test in an isolated lab: agree rules of engagement, enumerate services on the target hosts, identify and safely exploit one weakness, gain and document a foothold with a privilege-escalation path, show a pivot to an internal subnet, then write a prioritised report with reproducible evidence and remediation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1018-final-protected | 30 | 30 | yes |
| MST-1018-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Methodology and rules of engagement | 5 |
| Reconnaissance and enumeration | 5 |
| Vulnerability identification and exploitation basics | 5 |
| Post-exploitation and privilege escalation | 5 |
| Web and network testing techniques | 5 |
| Evidence capture and reporting | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1018-Q0001** (single-answer, Select ONE) What must be agreed before any exploitation activity begins in a penetration test?

- A. Rules of engagement defining scope, timing and authorised techniques **(key)**  
  _Rationale:_ Correct: rules of engagement and authorisation bound the test and keep it legal.
- B. The names of all of the client's customers  
  _Rationale:_ Not required and would be a privacy concern.
- C. A promise to find at least one critical finding  
  _Rationale:_ Outcomes cannot be promised in advance.
- D. The tester's personal social-media handles  
  _Rationale:_ Irrelevant to engagement authorisation.

**MST-1018-Q0002** (multiple-answer, Select ALL that apply) Which two items make a penetration-test finding genuinely actionable? (Select TWO)

- A. Reproducible steps or evidence that demonstrate the issue **(key)**  
  _Rationale:_ Correct: reproducibility lets the team confirm and fix the issue.
- B. A clear remediation recommendation **(key)**  
  _Rationale:_ Correct: remediation guidance turns a finding into action.
- C. The exact timestamp the tester had lunch  
  _Rationale:_ Irrelevant to remediation.
- D. A screenshot of the tester's desktop wallpaper  
  _Rationale:_ Provides no evidence of the vulnerability.

**MST-1018-Q0003** (single-answer, Select ONE) Why is gaining an initial foothold usually not the end of a realistic engagement?

- A. Because attackers typically escalate privileges and move laterally to reach real targets **(key)**  
  _Rationale:_ Correct: post-exploitation and lateral movement show the true business impact.
- B. Because the first host is always worthless  
  _Rationale:_ The first host may matter; the point is impact goes further.
- C. Because tools stop working after the first host  
  _Rationale:_ Tools do not stop after initial access.
- D. Because the test must always run for exactly 30 days  
  _Rationale:_ Duration is set by the engagement, not a fixed rule.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
