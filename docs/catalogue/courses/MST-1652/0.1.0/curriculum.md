# Cybersecurity Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1652` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-CYB-SK-CF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Cybersecurity Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Core security concepts
2. Threats, attacks and attackers
3. Protecting identity and data
4. Securing systems and networks
5. Operations, response and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on defensive or offensive operations; practical skills are taught through instructor-built labs in authorised environments.

## Modules

### M01 Core security concepts (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify three incidents by which part of the CIA triad they break; (2) Apply least privilege to a shared folder
- Common misconception addressed: Equating security only with antivirus software
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The CIA triad, risk and defence in depth | 72 | 6 |
| M01L02 | Security principles: least privilege and zero trust basics | 72 | 6 |

### M02 Threats, attacks and attackers (MASTEMY-DESIGN 24%)

- Worked applications: (1) Identify the red flags in a sample phishing email; (2) Match three malware types to their behaviour
- Common misconception addressed: Believing only large organisations are targeted
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Malware, phishing and social engineering | 72 | 6 |
| M02L02 | Common attack types and the attacker mindset | 72 | 6 |

### M03 Protecting identity and data (MASTEMY-DESIGN 24%)

- Worked applications: (1) Recommend MFA and a password-manager policy; (2) Choose when to use encryption at rest vs in transit
- Common misconception addressed: Thinking a long password alone is as good as MFA
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Authentication, MFA and access control | 72 | 6 |
| M03L02 | Encryption basics, hashing and data protection | 72 | 6 |

### M04 Securing systems and networks (MASTEMY-DESIGN 18%)

- Worked applications: (1) Prioritise a patch for a known exploited vulnerability; (2) Place a firewall rule to block an unused inbound port
- Common misconception addressed: Assuming an internal network is automatically trustworthy
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Patching, hardening and endpoint security | 72 | 6 |
| M04L02 | Network security basics: firewalls and segmentation | 72 | 6 |

### M05 Operations, response and governance (MASTEMY-DESIGN 14%)

- Worked applications: (1) Order the phases of a basic incident response; (2) Explain why offline backups defend against ransomware
- Common misconception addressed: Treating incident response as only an IT, not a business, concern
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Monitoring, incident response and backups | 72 | 6 |
| M05L02 | Policies, awareness and basic compliance | 72 | 6 |

## Integrative case

A small business has had a phishing scare. Assess its exposure against the CIA triad, recommend layered controls (identity, patching, backups, awareness), map them to common threats, and outline a simple incident-response plan - all for non-technical owners.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1652-final-protected | 25 | 25 | yes |
| MST-1652-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Core security concepts | 5 |
| Threats, attacks and attackers | 5 |
| Protecting identity and data | 5 |
| Securing systems and networks | 5 |
| Operations, response and governance | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1652-Q0001** (single-answer, Select ONE) A denial-of-service attack makes a website unavailable to users. Which part of the CIA triad does it primarily attack?

- A. Availability **(key)**  
  _Rationale:_ Correct: a denial-of-service attack targets availability by blocking legitimate access.
- B. Confidentiality  
  _Rationale:_ Confidentiality concerns unauthorised disclosure, not availability.
- C. Integrity  
  _Rationale:_ Integrity concerns unauthorised modification, not access being blocked.
- D. Authentication  
  _Rationale:_ Authentication is a control, not one of the three CIA properties.

**MST-1652-Q0002** (multiple-answer, Select ALL that apply) Which of the following are strong defences against account takeover? (Select TWO)

- A. Enabling multi-factor authentication **(key)**  
  _Rationale:_ Correct: MFA blocks most attacks that rely on a stolen password alone.
- B. Using unique passwords stored in a password manager **(key)**  
  _Rationale:_ Correct: unique passwords stop one breach from unlocking many accounts.
- C. Reusing one strong password everywhere for convenience  
  _Rationale:_ Reuse means one breach compromises every account.
- D. Emailing the password to yourself as a backup  
  _Rationale:_ Email is not a secure store and can itself be compromised.

**MST-1652-Q0003** (single-answer, Select ONE) Why do offline or immutable backups specifically help against ransomware?

- A. They cannot be encrypted or deleted by malware that reaches the live network **(key)**  
  _Rationale:_ Correct: backups the attacker cannot reach allow recovery without paying.
- B. They make the network faster  
  _Rationale:_ Backup type does not affect network speed and is unrelated to the threat.
- C. They stop phishing emails from arriving  
  _Rationale:_ Backups aid recovery; they do not block the initial phishing vector.
- D. They encrypt all user passwords  
  _Rationale:_ Backups store data copies; they do not manage passwords.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
