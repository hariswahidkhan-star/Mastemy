# Microsoft Power Platform Fundamentals (PL-900) Exam Prep

> **Curriculum blueprint / specification - not finished lesson content or videos.** Course `MST-MIC-MS-PL900-001` | Batch 1 | content_version 0.1.0 | approval_status: draft

| Field | Value |
|---|---|
| Official exam code | PL-900 |
| Awarding body | Microsoft (no affiliation or endorsement) |
| Syllabus version used | Skills measured as of 2026-07-24 |
| Evidence status | **VERIFIED against the official study guide** |
| Source | SRC-MS-PL900 - https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-900 (accessed 2026-10-02, method: official-fetch) |
| Estimated learner hours | 25 |
| Assessment hours (20%) | 5.0 h (300 min) |
| Question formats | MCQ and multiple-response only |

## Learning outcomes

1. Describe the business value of Power Platform services including Copilot Studio
2. Describe Dataverse and Power Platform administration and governance
3. Describe how canvas, model-driven and AI-assisted apps are built
4. Describe cloud and desktop flows and how to build them with AI
5. Describe building and managing agents in Copilot Studio

## Modules and lessons

Instructional time: 1200 min across 9 lessons (~133 min each: ~60% video, ~40% worked examples/reading). Each lesson ends with a lesson quiz.

### Module 1: Describe the business value of Microsoft Power Platform (5-10%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M1.L1 | Describe the business value of Microsoft Power Platform services | 133 | 10 |
| M1.T | Module 1 test | 15 | 15 |

### Module 2: Manage the Microsoft Power Platform environment (20-25%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M2.L1 | Describe Microsoft Dataverse | 133 | 10 |
| M2.L2 | Describe Microsoft Power Platform administration and governance | 133 | 10 |
| M2.T | Module 2 test | 15 | 15 |

### Module 3: Demonstrate the capabilities of Power Apps (20-25%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M3.L1 | Describe Power Apps capabilities and use cases | 133 | 10 |
| M3.L2 | Describe how to build basic apps by using Power Apps | 133 | 10 |
| M3.T | Module 3 test | 15 | 15 |

### Module 4: Demonstrate the capabilities of Power Automate (20-25%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M4.L1 | Describe Power Automate use cases and capabilities | 133 | 10 |
| M4.L2 | Describe how to build basic flows by using Power Automate | 133 | 10 |
| M4.T | Module 4 test | 15 | 15 |

### Module 5: Describe features and capabilities of agents in Microsoft Copilot Studio (20-25%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M5.L1 | Describe how to build agents in Copilot Studio | 133 | 10 |
| M5.L2 | Describe how to manage agents in Copilot Studio | 133 | 10 |
| M5.T | Module 5 test | 15 | 15 |

## Traceability matrix (official domain -> weighting -> module -> lessons -> assessment items)

Source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-900 (accessed 2026-10-02).

| Official domain | Weighting | Module | Lessons | Bank items allocated | Items per mock |
|---|---|---|---|---|---|
| Describe the business value of Microsoft Power Platform | 5-10% | M1 | M1.L1 | 23 | 3 |
| Manage the Microsoft Power Platform environment | 20-25% | M2 | M2.L1, M2.L2 | 69 | 12 |
| Demonstrate the capabilities of Power Apps | 20-25% | M3 | M3.L1, M3.L2 | 69 | 10 |
| Demonstrate the capabilities of Power Automate | 20-25% | M4 | M4.L1, M4.L2 | 69 | 10 |
| Describe features and capabilities of agents in Microsoft Copilot Studio | 20-25% | M5 | M5.L1, M5.L2 | 69 | 10 |

Mock item total per form: 45 (matches mock length 45).

## Assessment blueprint

| Component | Count | Items each | Minutes each | Total minutes |
|---|---|---|---|---|
| Lesson quizzes | 9 | 10 | 10 | 90 |
| Module tests | 5 | 15 | 15 | 75 |
| Full-length mock exams (independent forms A/B/C) | 3 | 45 | 45 | 135 |
| Topic drill sets (mixed-domain) | 0 | 30 | 30 | 0 |
| Review buffer | 1 | - | 0 | 0 |
| **Total** | | | | **300** (= 20% of 1500 min) |

Mock length basis: DESIGN ASSUMPTION - length not stated on the fetched study guide.

Minimum item bank: 300 unique items (no item reused across mocks A/B/C). Every option of every item carries a rationale. Items are tagged to domain + lesson ID for analytics.

## YouTube production notes

- One playlist per module (5 playlists) plus a course trailer; `youtube_playlist_id` stays empty until upload.
- Target video length about 79 min per lesson; chapters in the description should match the lesson's sub-objectives.
- Burned-in captions are not allowed. Upload an English SRT that has been reviewed by a person (caption_langs=en).
- On-screen and description disclaimer: 'Independent exam preparation. Not affiliated with or endorsed by the awarding body.'
- Do not use vendor logos or exam-provider trade dress. Product names are used only as references, under nominative fair use.
- Do not reproduce real or recalled exam questions (brain dumps). Every item must be original.
- Re-check the official skills outline before recording. If the outline changes, bump content_version and log it in the change log.

## Sample MCQs (original items, illustrative)

**Q1.** A team needs an app built on top of a Dataverse data model, with forms and views generated from that model. Which app type fits best?

- A. Canvas app   
  _Rationale:_ Canvas apps start from a blank screen layout, not from the data model.
- B. Model-driven app **(correct)**  
  _Rationale:_ Correct: model-driven apps generate their UI from Dataverse tables, forms and views.
- C. Desktop flow   
  _Rationale:_ Desktop flows automate legacy UI tasks. They are not apps.
- D. Power Pages site   
  _Rationale:_ Power Pages builds external websites.

**Q2.** Which Power Automate flow type automates clicks in a legacy Windows application with no API?

- A. Cloud flow with a connector trigger   
  _Rationale:_ Cloud flows need connectors or APIs.
- B. Desktop flow **(correct)**  
  _Rationale:_ Correct: desktop flows (RPA) automate UI interactions on Windows.
- C. Business process flow   
  _Rationale:_ Business process flows guide users through stages. They do not automate UI.
- D. Scheduled cloud flow   
  _Rationale:_ A schedule is still a cloud flow and cannot drive a desktop UI.

**Q3.** In Copilot Studio, what do you use to define a structured conversation path that triggers on certain user phrases?

- A. Topics **(correct)**  
  _Rationale:_ Correct: topics define conversation paths that start from trigger phrases.
- B. Channels   
  _Rationale:_ Channels are where the agent is published.
- C. Environments   
  _Rationale:_ Environments are containers for administration.
- D. Knowledge sources   
  _Rationale:_ Knowledge sources supply grounding content. They do not script a dialogue path.

## Change log

- 2026-10-02: Batch 1 blueprint created from SRC-MS-PL900.
