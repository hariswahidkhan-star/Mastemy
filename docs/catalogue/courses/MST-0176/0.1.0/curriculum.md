# Microsoft SC-900: Security, Compliance, and Identity Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0176` v0.1.0 | Batch 1 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | SC-900 |
| Version basis | Skills measured as of 2026-10-21 (published update) |
| Evidence | **verified-official-source** - sources: SRC-MS-SC900 |
| Legacy IDs | MST-MIC-MS-SC900-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe security, compliance and identity concepts including Zero Trust
2. Describe Microsoft Entra identity, authentication, access and governance capabilities
3. Describe Microsoft security solutions across Azure, Sentinel and Defender XDR
4. Describe Microsoft Purview compliance, information protection and eDiscovery capabilities

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Describe the concepts of security, compliance, and identity (10-15%)

- Worked applications: (1) Apply Zero Trust principles to a remote-access scenario; (2) Distinguish authentication, authorisation and federation in a partner-portal case
- Common misconception addressed: Confusing encryption at rest with access control
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Describe security and compliance concepts | 75 | 5 |
| M01L02 | Define identity concepts | 75 | 5 |

### M02 Describe the capabilities of Microsoft Entra (25-30%)

- Worked applications: (1) Design Conditional Access for unfamiliar-location sign-ins; (2) Choose PIM vs access reviews for privileged roles
- Common misconception addressed: Believing MFA alone satisfies Zero Trust
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Describe function and identity types of Microsoft Entra ID | 82 | 5 |
| M02L02 | Describe authentication capabilities of Microsoft Entra ID | 82 | 5 |
| M02L03 | Describe access management capabilities of Microsoft Entra ID | 82 | 5 |
| M02L04 | Describe identity protection and governance capabilities of Microsoft Entra | 84 | 5 |

### M03 Describe the capabilities of Microsoft security solutions (35-40%)

- Worked applications: (1) Route an incident from Defender XDR alert to Sentinel playbook; (2) Pick NSG, Azure Firewall or DDoS Protection for three threats
- Common misconception addressed: Treating Defender for Cloud as a SIEM
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Describe core infrastructure security services in Azure | 112 | 5 |
| M03L02 | Describe security management capabilities of Azure | 112 | 5 |
| M03L03 | Describe capabilities of Microsoft Sentinel | 112 | 5 |
| M03L04 | Describe threat protection with Microsoft Defender XDR | 114 | 5 |

### M04 Describe the capabilities of Microsoft compliance solutions (20-25%)

- Worked applications: (1) Label and retain contracts with Purview information protection; (2) Plan an eDiscovery hold for a legal matter
- Common misconception addressed: Assuming retention labels also encrypt content
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Describe Microsoft Service Trust Portal and privacy principles | 67 | 5 |
| M04L02 | Describe compliance management capabilities of Microsoft Purview | 67 | 5 |
| M04L03 | Describe information protection, data lifecycle management, and data governance capabilities of Microsoft Purview | 67 | 5 |
| M04L04 | Describe insider risk, eDiscovery, and audit capabilities in Microsoft Purview | 69 | 5 |

## Integrative case

A hospital group adopting Microsoft 365 must protect identities, detect threats and meet retention rules: map each requirement to Entra, Defender/Sentinel and Purview capabilities.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - length not stated on the fetched study guide.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0176-practice-form-A | 45 | 45 | yes |
| MST-0176-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0176-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0176-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Describe the concepts of security, compliance, and identity | 6 |
| Describe the capabilities of Microsoft Entra | 12 |
| Describe the capabilities of Microsoft security solutions | 17 |
| Describe the capabilities of Microsoft compliance solutions | 10 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0176-Q0001** (single-answer, Select ONE) Which Zero Trust principle is applied when every access request is authenticated and authorised using all available signals?

- A. Verify explicitly **(key)**  
  _Rationale:_ Correct: 'verify explicitly' means authenticating and authorising on every available data point.
- B. Use least privilege access  
  _Rationale:_ Least privilege limits how much access is granted. It does not cover how each request is checked.
- C. Assume breach  
  _Rationale:_ Assume breach is about limiting blast radius and segmenting access.
- D. Defense-in-depth  
  _Rationale:_ Defense-in-depth is a layered security model, not one of the three Zero Trust principles.

**MST-0176-Q0002** (single-answer, Select ONE) Which service gives you a cloud-native SIEM with SOAR capabilities?

- A. Microsoft Defender for Cloud  
  _Rationale:_ Defender for Cloud does CSPM and workload protection. It is not the SIEM.
- B. Microsoft Sentinel **(key)**  
  _Rationale:_ Correct: the skills outline places SIEM/SOAR concepts under Microsoft Sentinel.
- C. Azure Firewall  
  _Rationale:_ Azure Firewall is a network security service.
- D. Microsoft Purview Compliance Manager  
  _Rationale:_ Compliance Manager tracks regulatory compliance posture.

**MST-0176-Q0003** (single-answer, Select ONE) A user must give a second form of verification only when signing in from an unfamiliar country. Which Entra capability enforces this?

- A. Self-service password reset  
  _Rationale:_ SSPR lets users reset passwords. It does not set sign-in conditions.
- B. Conditional Access **(key)**  
  _Rationale:_ Correct: Conditional Access policies use signals such as location to require MFA.
- C. Privileged Identity Management  
  _Rationale:_ PIM gives just-in-time privileged roles. It does not enforce location-based MFA.
- D. Access reviews  
  _Rationale:_ Access reviews recertify existing access from time to time.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
