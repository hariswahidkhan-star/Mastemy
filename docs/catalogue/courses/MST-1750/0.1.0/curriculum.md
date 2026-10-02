# Requirements Elicitation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1750` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PMB-SK-RE-001 |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Requirements Elicitation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Preparing to elicit
2. Interview and workshop techniques
3. Observation and document analysis
4. Capturing and confirming
5. Dealing with ambiguity

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on performance of the skill; applied practice comes through instructor-facilitated exercises and model-answer analysis.

## Modules

### M01 Preparing to elicit (MASTEMY-DESIGN 22%)

- Worked applications: (1) Select a technique for a dispersed team; (2) Write elicitation objectives for a session
- Common misconception addressed: Walking into an elicitation session with no plan
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Elicitation goals and planning | 58 | 6 |
| M01L02 | Choosing techniques for the situation | 58 | 6 |

### M02 Interview and workshop techniques (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design an interview guide; (2) Plan a workshop agenda that avoids groupthink
- Common misconception addressed: Letting the loudest voice define the requirements
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Effective interviewing | 58 | 6 |
| M02L02 | Facilitating requirement workshops | 58 | 6 |

### M03 Observation and document analysis (MASTEMY-DESIGN 20%)

- Worked applications: (1) Extract requirements from an observed workaround; (2) Pull requirements from an existing report
- Common misconception addressed: Believing what people say they do matches what they do
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Observation and job shadowing | 58 | 6 |
| M03L02 | Mining existing documents and systems | 58 | 6 |

### M04 Capturing and confirming (MASTEMY-DESIGN 20%)

- Worked applications: (1) Turn session notes into confirmed statements; (2) Reconcile two conflicting stakeholder needs
- Common misconception addressed: Assuming no questions means full agreement
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Recording requirements accurately | 57 | 6 |
| M04L02 | Confirming and resolving conflicts | 57 | 6 |

### M05 Dealing with ambiguity (MASTEMY-DESIGN 18%)

- Worked applications: (1) Expose an unstated assumption in a request; (2) Plan for requirements that will evolve
- Common misconception addressed: Treating the first answer as the complete truth
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Surfacing hidden assumptions | 57 | 6 |
| M05L02 | Handling incomplete or changing needs | 57 | 6 |

## Integrative case

Two departments give a BA contradictory descriptions of how refunds should work, and neither mentions the exceptions staff handle daily. Plan and run elicitation: choose techniques, interview and observe, mine existing documents, capture and confirm requirements, and reconcile the conflicts and hidden assumptions into a validated set.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1750-final-protected | 25 | 25 | yes |
| MST-1750-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Preparing to elicit | 5 |
| Interview and workshop techniques | 5 |
| Observation and document analysis | 5 |
| Capturing and confirming | 5 |
| Dealing with ambiguity | 5 |

Minimum reviewed item bank: 270 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1750-Q0001** (single-answer, Select ONE) Why should an analyst combine observation with interviews rather than relying on interviews alone?

- A. What people say they do often differs from what they actually do **(key)**  
  _Rationale:_ Correct: observation surfaces real behaviour and undocumented workarounds.
- B. Interviews are never useful  
  _Rationale:_ Interviews are valuable; observation complements them.
- C. Observation removes the need to confirm requirements  
  _Rationale:_ Confirmation is still required regardless of technique.
- D. Interviews cannot capture any real requirements  
  _Rationale:_ They capture many; they just miss unspoken behaviour.

**MST-1750-Q0002** (multiple-answer, Select TWO) Which actions help manage conflicting requirements from different stakeholders? (Select TWO)

- A. Making the conflict explicit and tracing each need to its source **(key)**  
  _Rationale:_ Correct: surfacing and sourcing the conflict enables a reasoned resolution.
- B. Facilitating a decision based on business value and priority **(key)**  
  _Rationale:_ Correct: prioritisation by value resolves conflicts defensibly.
- C. Silently choosing the requirement from the most senior person  
  _Rationale:_ Seniority alone is not a sound basis for a requirements decision.
- D. Recording both contradictory requirements without resolving them  
  _Rationale:_ Unresolved contradictions will cause defects downstream.

**MST-1750-Q0003** (single-answer, Select ONE) A stakeholder nods through an entire workshop and asks nothing. What is the safest interpretation?

- A. Silence does not confirm understanding or agreement **(key)**  
  _Rationale:_ Correct: active confirmation is needed; silence is ambiguous.
- B. The requirements are fully agreed  
  _Rationale:_ Silence is not evidence of agreement.
- C. The stakeholder has no requirements  
  _Rationale:_ Lack of questions does not mean lack of needs.
- D. The session can be closed with no follow-up  
  _Rationale:_ Confirmation should still be sought explicitly.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
