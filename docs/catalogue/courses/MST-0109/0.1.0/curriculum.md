# IAPP CIPT: Privacy Technology

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0109` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | IAPP (no affiliation or endorsement) |
| Exam code | not verified; design assumption: IAPP CIPT (Certified Information Privacy Technologist) - unverified |
| Version basis | design assumption - official outline not verified (issuer page egress-blocked) |
| Evidence | **unverified-needs-official-check** - sources: ; official page not fetched |
| Legacy IDs |  |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe privacy concepts, risks and the technologist's role in protecting data
2. Apply privacy-by-design and privacy-engineering practices across the development lifecycle
3. Evaluate privacy-enhancing technologies and data-protection controls for a system
4. Analyse privacy risks in emerging technologies and third-party data flows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Privacy foundations for technologists (design-assumption weight; official weights not verified)

- Worked applications: (1) Map personal-data flows through a sample web app; (2) Classify a dataset's identifiability and sensitivity
- Common misconception addressed: Equating security controls alone with privacy protection
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Privacy concepts and data types | 240 | 6 |
| M01L02 | Privacy risk models and harms | 240 | 6 |
| M01L03 | The technologist's role in the privacy program | 240 | 6 |

### M02 Privacy by design and engineering (design-assumption weight; official weights not verified)

- Worked applications: (1) Apply data-minimisation to a sign-up form's fields; (2) Design consent and preference handling for a feature
- Common misconception addressed: Believing privacy can be bolted on after a system ships
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Privacy-by-design principles | 240 | 6 |
| M02L02 | Privacy in the development lifecycle | 240 | 6 |
| M02L03 | Consent, notice and preference management | 240 | 6 |

### M03 PETs and emerging-technology risk (design-assumption weight; official weights not verified)

- Worked applications: (1) Choose a de-identification technique for an analytics export; (2) Assess a third-party SDK's data collection against the app's notice
- Common misconception addressed: Assuming de-identified data can never be re-identified
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | De-identification, anonymisation and pseudonymisation | 240 | 6 |
| M03L02 | Encryption, access control and privacy-enhancing technologies | 240 | 6 |
| M03L03 | Privacy risks in AI, IoT, tracking and third-party flows | 240 | 6 |

## Integrative case

A product team is building a health-tracking app; as the privacy technologist you must embed privacy into the architecture, choose de-identification and access controls, assess third-party SDKs, and prepare a privacy-by-design record for launch.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer page egress-blocked); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0109-practice-form-A | 81 | 81 | yes |
| MST-0109-practice-form-B | 81 | 81 | no (optional practice) |
| MST-0109-practice-form-C | 81 | 81 | no (optional practice) |
| MST-0109-final-protected | 81 | 81 | yes |

| Domain | Items per form |
|---|---|
| Privacy foundations for technologists | 27 |
| Privacy by design and engineering | 27 |
| PETs and emerging-technology risk | 27 |

Minimum reviewed item bank: 810 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0109-Q0001** (single-answer, Select ONE) A team removes direct identifiers (name, email) from an analytics dataset but keeps precise timestamps, device model and ZIP code. Why is this still a privacy risk?

- A. The remaining quasi-identifiers can be combined to re-identify individuals **(key)**  
  _Rationale:_ Correct: combinations of quasi-identifiers often enable re-identification even without direct identifiers.
- B. Removing direct identifiers always guarantees anonymity  
  _Rationale:_ That is the misconception; quasi-identifiers remain a risk.
- C. Timestamps and device model are never personal data  
  _Rationale:_ These can be personal data, especially combined.
- D. Encryption at rest makes re-identification impossible  
  _Rationale:_ Encryption protects stored data but does not address re-identification of released data.

**MST-0109-Q0002** (single-answer, Select ONE) Applying data minimisation to a new feature, which approach best reflects the principle?

- A. Collect only the fields the feature actually needs and justify each **(key)**  
  _Rationale:_ Correct: data minimisation means collecting only what is necessary for the stated purpose.
- B. Collect everything now in case it is useful later  
  _Rationale:_ Collecting for undefined future use violates minimisation.
- C. Collect extra data but promise to delete it eventually  
  _Rationale:_ Deferred deletion does not justify unnecessary collection.
- D. Collect sensitive data to improve personalisation by default  
  _Rationale:_ Default sensitive-data collection is contrary to minimisation.

**MST-0109-Q0003** (multiple-answer, Select TWO) A product embeds privacy by design. Which TWO practices are genuine privacy-by-design controls rather than security-only measures? (Select TWO)

- A. Defaulting new accounts to the most privacy-protective settings **(key)**  
  _Rationale:_ Correct: privacy-protective defaults are a core privacy-by-design practice.
- B. Limiting collection and retention to the purpose at design time **(key)**  
  _Rationale:_ Correct: purpose-bound collection and retention is privacy by design.
- C. Adding a firewall at the network perimeter  
  _Rationale:_ A firewall is a security control, not specifically privacy by design.
- D. Encrypting backups only  
  _Rationale:_ Backup encryption is a security control and does not address collection or purpose.
- E. Enabling verbose logging of all user activity  
  _Rationale:_ Expansive logging increases privacy risk, not protection.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
