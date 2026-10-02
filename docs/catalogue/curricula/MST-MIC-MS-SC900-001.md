# Microsoft Security, Compliance, and Identity Fundamentals (SC-900) Exam Prep

> **Curriculum blueprint / specification - not finished lesson content or videos.** Course `MST-MIC-MS-SC900-001` | Batch 1 | content_version 0.1.0 | approval_status: draft

| Field | Value |
|---|---|
| Official exam code | SC-900 |
| Awarding body | Microsoft (no affiliation or endorsement) |
| Syllabus version used | Skills measured as of 2026-10-21 (published update) |
| Evidence status | **VERIFIED against the official study guide** |
| Source | SRC-MS-SC900 - https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900 (accessed 2026-10-02, method: official-fetch) |
| Estimated learner hours | 25 |
| Assessment hours (20%) | 5.0 h (300 min) |
| Question formats | MCQ and multiple-response only |

## Learning outcomes

1. Describe security, compliance and identity concepts including Zero Trust
2. Describe Microsoft Entra identity, authentication, access and governance capabilities
3. Describe Microsoft security solutions across Azure, Sentinel and Defender XDR
4. Describe Microsoft Purview compliance, information protection and eDiscovery capabilities

## Modules and lessons

Instructional time: 1200 min across 14 lessons (~85 min each: ~60% video, ~40% worked examples/reading). Each lesson ends with a lesson quiz.

### Module 1: Describe the concepts of security, compliance, and identity (10-15%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M1.L1 | Describe security and compliance concepts | 85 | 7 |
| M1.L2 | Define identity concepts | 85 | 7 |
| M1.T | Module 1 test | 15 | 15 |

### Module 2: Describe the capabilities of Microsoft Entra (25-30%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M2.L1 | Describe function and identity types of Microsoft Entra ID | 85 | 7 |
| M2.L2 | Describe authentication capabilities of Microsoft Entra ID | 85 | 7 |
| M2.L3 | Describe access management capabilities of Microsoft Entra ID | 85 | 7 |
| M2.L4 | Describe identity protection and governance capabilities of Microsoft Entra | 85 | 7 |
| M2.T | Module 2 test | 15 | 15 |

### Module 3: Describe the capabilities of Microsoft security solutions (35-40%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M3.L1 | Describe core infrastructure security services in Azure | 85 | 7 |
| M3.L2 | Describe security management capabilities of Azure | 85 | 7 |
| M3.L3 | Describe capabilities of Microsoft Sentinel | 85 | 7 |
| M3.L4 | Describe threat protection with Microsoft Defender XDR | 85 | 7 |
| M3.T | Module 3 test | 15 | 15 |

### Module 4: Describe the capabilities of Microsoft compliance solutions (20-25%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M4.L1 | Describe Microsoft Service Trust Portal and privacy principles | 85 | 7 |
| M4.L2 | Describe compliance management capabilities of Microsoft Purview | 85 | 7 |
| M4.L3 | Describe information protection, data lifecycle management, and data governance capabilities of Microsoft Purview | 85 | 7 |
| M4.L4 | Describe insider risk, eDiscovery, and audit capabilities in Microsoft Purview | 85 | 7 |
| M4.T | Module 4 test | 15 | 15 |

## Traceability matrix (official domain -> weighting -> module -> lessons -> assessment items)

Source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900 (accessed 2026-10-02).

| Official domain | Weighting | Module | Lessons | Bank items allocated | Items per mock |
|---|---|---|---|---|---|
| Describe the concepts of security, compliance, and identity | 10-15% | M1 | M1.L1, M1.L2 | 37 | 6 |
| Describe the capabilities of Microsoft Entra | 25-30% | M2 | M2.L1, M2.L2, M2.L3, M2.L4 | 81 | 12 |
| Describe the capabilities of Microsoft security solutions | 35-40% | M3 | M3.L1, M3.L2, M3.L3, M3.L4 | 110 | 17 |
| Describe the capabilities of Microsoft compliance solutions | 20-25% | M4 | M4.L1, M4.L2, M4.L3, M4.L4 | 66 | 10 |

Mock item total per form: 45 (matches mock length 45).

## Assessment blueprint

| Component | Count | Items each | Minutes each | Total minutes |
|---|---|---|---|---|
| Lesson quizzes | 14 | 7 | 7 | 98 |
| Module tests | 4 | 15 | 15 | 60 |
| Full-length mock exams (independent forms A/B/C) | 3 | 45 | 45 | 135 |
| Topic drill sets (mixed-domain) | 0 | 30 | 30 | 0 |
| Review buffer | 1 | - | 7 | 7 |
| **Total** | | | | **300** (= 20% of 1500 min) |

Mock length basis: DESIGN ASSUMPTION - length not stated on the fetched study guide.

Minimum item bank: 293 unique items (no item reused across mocks A/B/C). Every option of every item carries a rationale. Items are tagged to domain + lesson ID for analytics.

## YouTube production notes

- One playlist per module (4 playlists) plus a course trailer; `youtube_playlist_id` stays empty until upload.
- Target video length about 51 min per lesson; chapters in the description should match the lesson's sub-objectives.
- Burned-in captions are not allowed. Upload an English SRT that has been reviewed by a person (caption_langs=en).
- On-screen and description disclaimer: 'Independent exam preparation. Not affiliated with or endorsed by the awarding body.'
- Do not use vendor logos or exam-provider trade dress. Product names are used only as references, under nominative fair use.
- Do not reproduce real or recalled exam questions (brain dumps). Every item must be original.
- Re-check the official skills outline before recording. If the outline changes, bump content_version and log it in the change log.

## Sample MCQs (original items, illustrative)

**Q1.** Which Zero Trust principle is applied when every access request is authenticated and authorised using all available signals?

- A. Verify explicitly **(correct)**  
  _Rationale:_ Correct: 'verify explicitly' means authenticating and authorising on every available data point.
- B. Use least privilege access   
  _Rationale:_ Least privilege limits how much access is granted. It does not cover how each request is checked.
- C. Assume breach   
  _Rationale:_ Assume breach is about limiting blast radius and segmenting access.
- D. Defense-in-depth   
  _Rationale:_ Defense-in-depth is a layered security model, not one of the three Zero Trust principles.

**Q2.** Which service gives you a cloud-native SIEM with SOAR capabilities?

- A. Microsoft Defender for Cloud   
  _Rationale:_ Defender for Cloud does CSPM and workload protection. It is not the SIEM.
- B. Microsoft Sentinel **(correct)**  
  _Rationale:_ Correct: the skills outline places SIEM/SOAR concepts under Microsoft Sentinel.
- C. Azure Firewall   
  _Rationale:_ Azure Firewall is a network security service.
- D. Microsoft Purview Compliance Manager   
  _Rationale:_ Compliance Manager tracks regulatory compliance posture.

**Q3.** A user must give a second form of verification only when signing in from an unfamiliar country. Which Entra capability enforces this?

- A. Self-service password reset   
  _Rationale:_ SSPR lets users reset passwords. It does not set sign-in conditions.
- B. Conditional Access **(correct)**  
  _Rationale:_ Correct: Conditional Access policies use signals such as location to require MFA.
- C. Privileged Identity Management   
  _Rationale:_ PIM gives just-in-time privileged roles. It does not enforce location-based MFA.
- D. Access reviews   
  _Rationale:_ Access reviews recertify existing access from time to time.

## Change log

- 2026-10-02: Batch 1 blueprint created from SRC-MS-SC900.
