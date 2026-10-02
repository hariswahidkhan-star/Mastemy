# Claude + SharePoint + Microsoft Teams: Policy Knowledge Assistant

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0785` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude + SharePoint + Microsoft Teams: Policy Knowledge Assistant (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a policy knowledge assistant and define its answerable boundary
2. Organise SharePoint policy sources so answers are grounded and current
3. Use Claude to answer from retrieved policy text with citations, not memory
4. Surface the assistant in Microsoft Teams with safe interaction patterns
5. Operate the assistant with review, freshness and access governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scoping the policy assistant (20%)

- Worked applications: (1) Classify a set of employee questions as answerable or escalate; (2) Write a refusal-and-escalate response for an out-of-scope legal question
- Common misconception addressed: Assuming the assistant should attempt every question it receives
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining answerable vs out-of-scope policy questions | 96 | 7 |
| M01L02 | Success criteria and escalation to a human | 96 | 7 |

### M02 SharePoint policy sources (20%)

- Worked applications: (1) Tag a policy library so the current version is unambiguous; (2) Prevent a superseded policy from being retrieved as current
- Common misconception addressed: Pointing the assistant at a library full of mixed draft and final versions
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Structuring libraries and metadata for retrieval | 96 | 7 |
| M02L02 | Versioning and superseded-policy handling | 96 | 7 |

### M03 Grounded answering with Claude (20%)

- Worked applications: (1) Produce an answer that quotes and links the exact policy clause; (2) Respond safely when two policies appear to conflict
- Common misconception addressed: Letting Claude answer from general knowledge instead of the retrieved policy
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Answering from retrieved passages with citations | 96 | 7 |
| M03L02 | Handling missing or conflicting policy text | 96 | 7 |

### M04 Delivery in Microsoft Teams (20%)

- Worked applications: (1) Design a Teams reply that always shows its policy source; (2) Add a clear 'not legal advice' and escalation affordance
- Common misconception addressed: Presenting an assistant answer as an authoritative ruling
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Conversation design inside Teams | 96 | 7 |
| M04L02 | Showing sources and confidence to users | 96 | 7 |

### M05 Operating the assistant (20%)

- Worked applications: (1) Define who reviews answers and how stale content is retired; (2) Restrict a confidential HR policy to the right audience
- Common misconception addressed: Leaving the assistant to run with no owner or freshness review
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Freshness, review cadence and ownership | 96 | 7 |
| M05L02 | Access control and sensitive-policy handling | 96 | 7 |

## Integrative case

HR launches a Teams assistant answering from SharePoint policies: scope what it may answer, organise grounded and current sources, make Claude cite the exact clause, deliver it safely in Teams, and operate it with review and access controls.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0785-final-protected | 40 | 50 | yes |
| MST-0785-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scoping the policy assistant | 8 |
| SharePoint policy sources | 8 |
| Grounded answering with Claude | 8 |
| Delivery in Microsoft Teams | 8 |
| Operating the assistant | 8 |

Minimum reviewed item bank: 388 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0785-Q0001** (single-answer, Select ONE) An employee asks a question not covered by any retrieved policy passage. What is the correct behaviour?

- A. State that no policy covers it and escalate to a human owner **(key)**  
  _Rationale:_ Correct: ungrounded answers invent policy; the safe path is to escalate.
- B. Answer from Claude's general knowledge of similar policies  
  _Rationale:_ General knowledge is not this organisation's policy and may be wrong.
- C. Pick the closest policy and apply it anyway  
  _Rationale:_ Applying an unrelated policy misstates the rule.
- D. Return the longest available policy document  
  _Rationale:_ Length is not relevance and does not answer the question.

**MST-0785-Q0002** (multiple-answer, Select TWO) Which TWO practices stop a superseded policy from being served as current? (Select TWO.)

- A. Marking the current version with explicit status metadata **(key)**  
  _Rationale:_ Correct: status metadata lets retrieval prefer the live version.
- B. Moving superseded policies out of the retrieval scope **(key)**  
  _Rationale:_ Correct: excluding old versions prevents them being returned.
- C. Keeping all drafts and finals in one undifferentiated library  
  _Rationale:_ Mixing versions is exactly what causes stale answers.
- D. Relying on file names alone to signal recency  
  _Rationale:_ File-name conventions drift and are not reliable status signals.

**MST-0785-Q0003** (single-answer, Select ONE) How should a Teams policy answer present itself to stay trustworthy?

- A. With the cited source and a clear non-authoritative disclaimer **(key)**  
  _Rationale:_ Correct: sources plus a disclaimer let users verify and escalate.
- B. As a definitive ruling to save the user time  
  _Rationale:_ Presenting it as a ruling overstates the assistant's authority.
- C. Without links, to keep the message short  
  _Rationale:_ Hiding sources removes the user's ability to verify.
- D. Only in a private channel the owner controls  
  _Rationale:_ Channel privacy does not address how the answer presents itself.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
