# Secure Configuration and Hardening

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1694` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-SCH-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Secure Configuration and Hardening (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain secure configuration and why defaults are risky
2. Harden operating systems using baselines and benchmarks
3. Reduce attack surface by disabling unneeded services and accounts
4. Harden applications, services and network devices
5. Maintain hardened configuration over time

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Secure configuration foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify risky default settings on a system; (2) Choose an appropriate hardening baseline
- Common misconception addressed: Assuming vendor defaults are already secure
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why default configurations are insecure | 72 | 6 |
| M01L02 | Baselines, benchmarks and standards | 72 | 6 |

### M02 Operating system hardening (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply baseline settings to an OS scenario; (2) Decide which settings to enforce centrally
- Common misconception addressed: Hardening once and never reapplying after changes
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Applying an OS hardening baseline | 72 | 6 |
| M02L02 | Patching and configuration management | 72 | 6 |

### M03 Attack surface reduction (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide which services to disable on a role; (2) Remove or disable default accounts safely
- Common misconception addressed: Leaving sample or default accounts enabled 'just in case'
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Disabling unneeded services and ports | 72 | 6 |
| M03L02 | Removing default and unused accounts | 72 | 6 |

### M04 Application and device hardening (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Harden a web server's configuration; (2) Secure a network device's management access
- Common misconception addressed: Hardening the OS but ignoring the applications on it
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Hardening applications and services | 72 | 6 |
| M04L02 | Hardening network devices | 72 | 6 |

### M05 Maintaining a hardened state (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Detect configuration drift against a baseline; (2) Use change control to keep settings compliant
- Common misconception addressed: Treating hardening as a one-time project
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Configuration drift and monitoring | 72 | 6 |
| M05L02 | Change control and continuous compliance | 72 | 6 |

## Integrative case

A new server has been deployed with default settings, sample accounts, and every service enabled. Harden it: apply a recognised baseline, remove unneeded services and default accounts, configure secure settings for its applications, and put a process in place to keep the configuration hardened as it changes.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1694-final-protected | 25 | 25 | yes |
| MST-1694-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Secure configuration foundations | 5 |
| Operating system hardening | 5 |
| Attack surface reduction | 5 |
| Application and device hardening | 5 |
| Maintaining a hardened state | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1694-Q0001** (single-answer, Select ONE) Why are default configurations a security risk?

- A. Defaults favour easy setup and are widely known to attackers **(key)**  
  _Rationale:_ Correct: well-known defaults (accounts, ports, settings) are easy targets.
- B. Defaults are encrypted and cannot be read  
  _Rationale:_ Defaults are published and well known, not hidden.
- C. Defaults disable all services automatically  
  _Rationale:_ Defaults usually enable many services.
- D. Defaults always meet every compliance standard  
  _Rationale:_ Defaults rarely meet hardening standards.

**MST-1694-Q0002** (multiple-answer, Select TWO) Which TWO actions reduce a system's attack surface? (Select TWO.)

- A. Disable services and ports the system does not need **(key)**  
  _Rationale:_ Correct: fewer running services means fewer entry points.
- B. Remove or disable default and unused accounts **(key)**  
  _Rationale:_ Correct: default accounts are common attack targets.
- C. Enable every optional feature by default  
  _Rationale:_ More features means more attack surface.
- D. Keep sample accounts active for convenience  
  _Rationale:_ Sample accounts are a known weakness.

**MST-1694-Q0003** (single-answer, Select ONE) What is configuration drift and why does it matter?

- A. Gradual divergence from the baseline that reopens vulnerabilities over time **(key)**  
  _Rationale:_ Correct: unmanaged changes erode the hardened state.
- B. A one-time setting that never changes  
  _Rationale:_ Drift is change over time, not a fixed setting.
- C. A type of network cable fault  
  _Rationale:_ Drift here refers to configuration, not cabling.
- D. An encryption algorithm for backups  
  _Rationale:_ Drift is not an encryption method.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
