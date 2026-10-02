# Microsoft Azure AI Fundamentals (AI-901) Exam Prep

> **Curriculum blueprint / specification - not finished lesson content or videos.** Course `MST-MIC-MS-AI901-001` | Batch 1 | content_version 0.1.0 | approval_status: draft

| Field | Value |
|---|---|
| Official exam code | AI-901 |
| Awarding body | Microsoft (no affiliation or endorsement) |
| Syllabus version used | Skills measured as of 2026-04-15 (AI-900 retired 2026-06-30) |
| Evidence status | **VERIFIED against the official study guide** |
| Source | SRC-MS-AI901 - https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901 (accessed 2026-10-02, method: official-fetch) |
| Estimated learner hours | 25 |
| Assessment hours (20%) | 5.0 h (300 min) |
| Question formats | MCQ and multiple-response only |

## Learning outcomes

1. Apply responsible AI principles to solution scenarios
2. Select appropriate AI models, deployment options and configuration parameters
3. Identify generative, agentic, text, speech, vision and information-extraction workloads
4. Describe how to build lightweight apps and agents with Microsoft Foundry and Foundry Tools

## Modules and lessons

Instructional time: 1200 min across 7 lessons (~171 min each: ~60% video, ~40% worked examples/reading). Each lesson ends with a lesson quiz.

### Module 1: Identify AI concepts and capabilities (40-45%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M1.L1 | Describe principles of responsible AI | 171 | 19 |
| M1.L2 | Identify AI model components and configurations | 171 | 19 |
| M1.L3 | Identify AI workloads | 171 | 19 |
| M1.T | Module 1 test | 15 | 15 |

### Module 2: Implement AI solutions by using Microsoft Foundry (55-60%)

| Lesson | Title | Duration (min) | Quiz items |
|---|---|---|---|
| M2.L1 | Implement generative AI apps and agents by using Foundry | 171 | 19 |
| M2.L2 | Implement AI solutions for text and speech by using Foundry | 171 | 19 |
| M2.L3 | Implement AI solutions with computer vision and image-generation capabilities by using Foundry | 171 | 19 |
| M2.L4 | Implement AI solutions for information extraction by using Foundry | 171 | 19 |
| M2.T | Module 2 test | 15 | 15 |

## Traceability matrix (official domain -> weighting -> module -> lessons -> assessment items)

Source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901 (accessed 2026-10-02).

| Official domain | Weighting | Module | Lessons | Bank items allocated | Items per mock |
|---|---|---|---|---|---|
| Identify AI concepts and capabilities | 40-45% | M1 | M1.L1, M1.L2, M1.L3 | 127 | 19 |
| Implement AI solutions by using Microsoft Foundry | 55-60% | M2 | M2.L1, M2.L2, M2.L3, M2.L4 | 171 | 26 |

Mock item total per form: 45 (matches mock length 45).

## Assessment blueprint

| Component | Count | Items each | Minutes each | Total minutes |
|---|---|---|---|---|
| Lesson quizzes | 7 | 19 | 19 | 133 |
| Module tests | 2 | 15 | 15 | 30 |
| Full-length mock exams (independent forms A/B/C) | 3 | 45 | 45 | 135 |
| Topic drill sets (mixed-domain) | 0 | 30 | 30 | 0 |
| Review buffer | 1 | - | 2 | 2 |
| **Total** | | | | **300** (= 20% of 1500 min) |

Mock length basis: DESIGN ASSUMPTION - length not stated on the fetched study guide.

Minimum item bank: 298 unique items (no item reused across mocks A/B/C). Every option of every item carries a rationale. Items are tagged to domain + lesson ID for analytics.

## YouTube production notes

- One playlist per module (2 playlists) plus a course trailer; `youtube_playlist_id` stays empty until upload.
- Target video length about 102 min per lesson; chapters in the description should match the lesson's sub-objectives.
- Burned-in captions are not allowed. Upload an English SRT that has been reviewed by a person (caption_langs=en).
- On-screen and description disclaimer: 'Independent exam preparation. Not affiliated with or endorsed by the awarding body.'
- Do not use vendor logos or exam-provider trade dress. Product names are used only as references, under nominative fair use.
- Do not reproduce real or recalled exam questions (brain dumps). Every item must be original.
- Re-check the official skills outline before recording. If the outline changes, bump content_version and log it in the change log.

## Sample MCQs (original items, illustrative)

**Q1.** An AI loan-approval system gives very different approval rates to applicants with otherwise similar profiles but different genders. Which responsible AI principle is most directly affected?

- A. Fairness **(correct)**  
  _Rationale:_ Correct: fairness means AI systems treat similar people in similar ways.
- B. Transparency   
  _Rationale:_ Transparency is about explaining how the system works. The problem here is unequal outcomes.
- C. Reliability and safety   
  _Rationale:_ Reliability is about performing consistently under expected conditions, not about bias between groups.
- D. Inclusiveness   
  _Rationale:_ Inclusiveness is about designing for people of every ability. Fairness is the closer match.

**Q2.** You need to pull fields from scanned invoices, and also from recorded call audio, using one Foundry Tools capability. Which should you choose?

- A. Azure Speech in Foundry Tools   
  _Rationale:_ Speech covers recognition and synthesis. It does not extract structured fields from documents.
- B. Azure Content Understanding in Foundry Tools **(correct)**  
  _Rationale:_ Correct: the skills outline lists Content Understanding for extraction from documents, images, audio and video.
- C. An image-generation model   
  _Rationale:_ Image-generation models create images. They do not extract fields.
- D. A text analysis sentiment feature   
  _Rationale:_ Sentiment analysis scores opinion. It does not extract invoice fields or handle audio.

**Q3.** Which change is MOST likely to make a deployed generative model's answers more deterministic?

- A. Increasing temperature   
  _Rationale:_ A higher temperature increases randomness.
- B. Lowering temperature **(correct)**  
  _Rationale:_ Correct: a lower temperature concentrates sampling on the most likely tokens, so output is more consistent.
- C. Adding more sample images to the prompt   
  _Rationale:_ Image inputs do not control sampling randomness.
- D. Switching to a speech model   
  _Rationale:_ Changing the modality does not address determinism.

## Change log

- 2026-10-02: Batch 1 blueprint created from SRC-MS-AI901.
