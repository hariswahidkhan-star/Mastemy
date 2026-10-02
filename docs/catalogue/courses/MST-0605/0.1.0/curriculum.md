# RAG for Customer Support and Product Knowledge

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0605` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — RAG for Customer Support and Product Knowledge (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the goals and risks of support RAG
2. Organise support knowledge for retrieval
3. Respect entitlement and plan in answers
4. Keep support answers current as the product changes
5. Ground answers with links and an appropriate tone
6. Escalate or refuse when the assistant cannot answer safely

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Support RAG goals and risks (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Identify where a wrong answer harms a customer; (2) Decide what the assistant must not answer
- Common misconception addressed: Optimising for confident answers over correct ones
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Goals and failure modes | 80 | 8 |
| M01L02 | Scope and safe boundaries | 80 | 8 |

### M02 Knowledge sources and structure (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Structure articles and release notes for retrieval; (2) Tag content by product and version
- Common misconception addressed: One unstructured dump of all articles
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Articles, docs and release notes | 80 | 8 |
| M02L02 | Product and version tagging | 80 | 8 |

### M03 Entitlement and plan awareness (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Filter answers to the customer's plan; (2) Avoid promising features a plan lacks
- Common misconception addressed: Describing features the customer cannot access
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Plan and entitlement filtering | 80 | 8 |
| M03L02 | Avoiding wrong feature promises | 80 | 8 |

### M04 Freshness with product change (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Reindex when release notes change behaviour; (2) Retire answers about removed features
- Common misconception addressed: Answering from outdated documentation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reindexing on product change | 80 | 8 |
| M04L02 | Retiring stale guidance | 80 | 8 |

### M05 Grounding, links and tone (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Cite the help article the answer came from; (2) Match tone to a support context
- Common misconception addressed: Answering with no link to verify
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Citations and verifiable links | 80 | 8 |
| M05L02 | Support tone and clarity | 80 | 8 |

### M06 Escalation and refusal (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Route an account-specific issue to a human; (2) Refuse gracefully on insufficient evidence
- Common misconception addressed: Guessing on account-specific questions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | When to escalate to a human | 80 | 8 |
| M06L02 | Graceful refusal | 80 | 8 |

## Integrative case

A support assistant answers customer questions from help articles, product docs and release notes. Design retrieval that stays current with product changes, respects entitlement and plan, grounds answers with links, and escalates or refuses when it cannot answer safely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0605-final-protected | 40 | 40 | yes |
| MST-0605-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Support RAG goals and risks | 7 |
| Knowledge sources and structure | 7 |
| Entitlement and plan awareness | 7 |
| Freshness with product change | 7 |
| Grounding, links and tone | 6 |
| Escalation and refusal | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0605-Q0001** (single-answer, Select ONE) A support assistant describes a feature the customer's plan does not include. What capability is missing?

- A. Entitlement/plan-aware filtering of the answer to what the customer can actually use **(key)**  
  _Rationale:_ Correct: answers must respect the customer's plan and entitlement.
- B. A larger language model  
  _Rationale:_ Model size does not encode entitlement.
- C. More help articles  
  _Rationale:_ More content without filtering still mispromises.
- D. A faster vector store  
  _Rationale:_ Speed does not address entitlement.

**MST-0605-Q0002** (multiple-answer, Select TWO) Which TWO practices keep support answers trustworthy? (Select TWO.)

- A. Cite the help article so the customer can verify **(key)**  
  _Rationale:_ Correct: verifiable links build trust and let customers confirm.
- B. Escalate or refuse when evidence is insufficient **(key)**  
  _Rationale:_ Correct: safe refusal and escalation prevent harmful guesses.
- C. Always answer, even by guessing  
  _Rationale:_ Guessing on support questions causes harm.
- D. Hide which article the answer came from  
  _Rationale:_ Hiding sources reduces verifiability.

**MST-0605-Q0003** (single-answer, Select ONE) A release note changes a workflow, but the assistant still describes the old steps. What is the correct response?

- A. Reindex on the release note and retire the outdated guidance **(key)**  
  _Rationale:_ Correct: freshness requires reindexing and retiring stale content.
- B. Keep both old and new steps with no dates  
  _Rationale:_ That confuses customers.
- C. Tell customers to ignore release notes  
  _Rationale:_ Release notes are the source of truth for changes.
- D. Raise the retrieval top-k  
  _Rationale:_ More results do not fix staleness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
