# Microsoft Azure Data Fundamentals (DP-900) Exam Prep

> **Curriculum blueprint / specification - not finished lesson content or videos.** Course `MST-MIC-MS-DP900-001` | Batch 1 | content_version 0.1.0 | approval_status: draft

| Field | Value |
|---|---|
| Official exam code | DP-900 |
| Awarding body | Microsoft (no affiliation or endorsement) |
| Syllabus version used | Skills measured as of 2026-07-21 |
| Evidence status | **VERIFIED against the official study guide** |
| Source | SRC-MS-DP900 - https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900 (accessed 2026-10-02, method: official-fetch) |
| Estimated learner hours | 25 |
| Assessment hours (20%) | 5.0 h (300 min) |
| Question formats | MCQ and multiple-response only |

## Learning outcomes

1. Describe structured, semi-structured and unstructured data and common data workloads
2. Explain relational concepts and the Azure SQL family
3. Describe Azure non-relational storage and Azure Cosmos DB
4. Describe large-scale and real-time analytics and Power BI visualisation

## Modules and lessons

Instructional time: 1200 min across 11 lessons (~109 min each: ~60% video, ~40% worked examples/reading). Each lesson ends with a lesson quiz.

### Module 1: Describe core data concepts (25-30%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M1.L1 | Describe ways to represent data | 109 | 9 |
| M1.L2 | Identify options for data storage | 109 | 9 |
| M1.L3 | Describe common data workloads | 109 | 9 |
| M1.L4 | Identify roles and responsibilities for data workloads | 109 | 9 |
| M1.T | Module 1 test | 15 | 15 |

### Module 2: Identify considerations for relational data on Azure (20-25%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M2.L1 | Describe relational concepts | 109 | 9 |
| M2.L2 | Describe relational Azure data services | 109 | 9 |
| M2.T | Module 2 test | 15 | 15 |

### Module 3: Describe considerations for working with non-relational data on Azure (15-20%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M3.L1 | Describe the capabilities of Azure storage | 109 | 9 |
| M3.L2 | Describe the capabilities and features of Azure Cosmos DB | 109 | 9 |
| M3.T | Module 3 test | 15 | 15 |

### Module 4: Describe an analytics workload (25-30%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M4.L1 | Describe common elements of large-scale analytics | 109 | 9 |
| M4.L2 | Describe considerations for real-time data analytics | 109 | 9 |
| M4.L3 | Describe data visualization in Microsoft Power BI | 109 | 9 |
| M4.T | Module 4 test | 15 | 15 |

## Traceability matrix (official domain -> weighting -> module -> lessons -> assessment items)

Source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-900 (accessed 2026-10-02).

| Official domain | Weighting | Module | Lessons | Bank items allocated | Items per mock |
|---|---|---|---|---|---|
| Describe core data concepts | 25-30% | M1 | M1.L1, M1.L2, M1.L3, M1.L4 | 85 | 13 |
| Identify considerations for relational data on Azure | 20-25% | M2 | M2.L1, M2.L2 | 70 | 11 |
| Describe considerations for working with non-relational data on Azure | 15-20% | M3 | M3.L1, M3.L2 | 54 | 8 |
| Describe an analytics workload | 25-30% | M4 | M4.L1, M4.L2, M4.L3 | 85 | 13 |

Mock item total per form: 45 (matches mock length 45).

## Assessment blueprint

| Component | Count | Items each | Minutes each | Total minutes |
|---|---|---|---|---|
| Lesson quizzes | 11 | 9 | 9 | 99 |
| Module tests | 4 | 15 | 15 | 60 |
| Full-length mock exams (independent forms A/B/C) | 3 | 45 | 45 | 135 |
| Topic drill sets (mixed-domain) | 0 | 30 | 30 | 0 |
| Review buffer | 1 | - | 6 | 6 |
| **Total** | | | | **300** (= 20% of 1500 min) |

Mock length basis: DESIGN ASSUMPTION - length not stated on the fetched study guide.

Minimum item bank: 294 unique items (no item reused across mocks A/B/C). Every option of every item carries a rationale. Items are tagged to domain + lesson ID for analytics.

## YouTube production notes

- One playlist per module (4 playlists) plus a course trailer; `youtube_playlist_id` stays empty until upload.
- Target video length about 65 min per lesson; chapters in the description should match the lesson's sub-objectives.
- Burned-in captions are not allowed. Upload an English SRT that has been reviewed by a person (caption_langs=en).
- On-screen and description disclaimer: 'Independent exam preparation. Not affiliated with or endorsed by the awarding body.'
- Do not use vendor logos or exam-provider trade dress. Product names are used only as references, under nominative fair use.
- Do not reproduce real or recalled exam questions (brain dumps). Every item must be original.
- Re-check the official skills outline before recording. If the outline changes, bump content_version and log it in the change log.

## Sample MCQs (original items, illustrative)

**Q1.** A JSON document with nested, optional fields is an example of which kind of data?

- A. Structured   
  _Rationale:_ Structured data follows a fixed tabular schema.
- B. Semi-structured **(correct)**  
  _Rationale:_ Correct: JSON carries its own flexible structure through keys and nesting.
- C. Unstructured   
  _Rationale:_ Unstructured data, such as images or free text, has no organising tags.
- D. Normalised   
  _Rationale:_ Normalisation is a relational design process, not a type of data.

**Q2.** Why do we normalise a relational database?

- A. To reduce data duplication and update anomalies **(correct)**  
  _Rationale:_ Correct: normalisation splits data into related tables so each fact is stored once.
- B. To make all queries faster   
  _Rationale:_ Normalisation can slow reads by adding joins.
- C. To store images efficiently   
  _Rationale:_ Normalisation has nothing to do with binary storage.
- D. To allow schema-less writes   
  _Rationale:_ Schema-less writes are a feature of NoSQL stores.

**Q3.** Which service is a globally distributed, multi-model NoSQL database with several APIs?

- A. Azure SQL Managed Instance   
  _Rationale:_ This is a relational SQL Server-compatible service.
- B. Azure Table storage   
  _Rationale:_ Table storage is a simple key/attribute store without the multiple APIs.
- C. Azure Cosmos DB **(correct)**  
  _Rationale:_ Correct: Cosmos DB offers several APIs and global distribution.
- D. Azure Files   
  _Rationale:_ Azure Files provides SMB/NFS file shares.

## Change log

- 2026-10-02: Batch 1 blueprint created from SRC-MS-DP900.
