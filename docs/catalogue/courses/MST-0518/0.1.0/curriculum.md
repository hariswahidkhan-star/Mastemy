# Claude for Contract Analysis and Policy Drafting Support

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0518` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Anthropic's official Claude product and Help Center pages; the egress proxy blocked docs.anthropic.com this session (EGRESS_BLOCKED), so no official page was read. Features, plan names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-CLAUDE-LEGAL-SUPPORT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude for Contract Analysis and Policy Drafting Support (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set the boundary between AI support and professional legal advice
2. Extract and map contractual obligations with Claude's help
3. Compare contract terms against a playbook and rank deviations by risk
4. Draft policy language and review it for ambiguity before legal sign-off
5. Verify extractions and keep a defensible record of AI assistance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Scope and the advice boundary (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Separate tasks Claude can support from decisions requiring a lawyer; (2) Write a disclaimer that frames output as support, not legal advice
- Common misconception addressed: Treating Claude's contract summary as a substitute for legal advice
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What AI can and cannot do in legal work | 72 | 5 |
| M01L02 | The advice boundary and disclaimers | 72 | 5 |

### M02 Extracting obligations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Extract the parties, obligations and key dates from a contract; (2) Map obligations to responsible owners
- Common misconception addressed: Accepting an extracted obligation without checking the clause it came from
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Extracting parties, terms and obligations | 96 | 5 |
| M02L02 | Mapping obligations to owners and dates | 96 | 5 |

### M03 Comparing against a playbook (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compare contract terms against an approved playbook position; (2) Flag deviations and rank them by risk
- Common misconception addressed: Flagging only wording differences while missing substantive risk
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Playbook comparison method | 80 | 5 |
| M03L02 | Ranking deviations by risk | 80 | 5 |
| M03L03 | Escalation: what a lawyer must see | 80 | 5 |

### M04 Drafting policy language (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draft a policy clause from a plain-language intent; (2) Check drafted language for ambiguity and gaps
- Common misconception addressed: Shipping drafted policy language without human legal review
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Drafting a clause from intent | 96 | 5 |
| M04L02 | Reviewing drafts for ambiguity | 96 | 5 |

### M05 Verification and record-keeping (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Verify every extracted term against the source contract; (2) Record what was AI-assisted in the review file
- Common misconception addressed: Assuming an AI-extracted date or figure is correct without checking the clause
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Verifying extractions against the source | 96 | 5 |
| M05L02 | Record-keeping and AI-assistance notes | 96 | 5 |

## Integrative case

A legal operations analyst uses Claude to review a vendor contract and draft a policy clause: extract obligations, compare against a playbook, flag risky terms for a lawyer, and document that Claude's output is support, not legal advice.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0518-final-protected | 30 | 40 | yes |
| MST-0518-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scope and the advice boundary | 5 |
| Extracting obligations | 6 |
| Comparing against a playbook | 7 |
| Drafting policy language | 6 |
| Verification and record-keeping | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0518-Q0001** (single-answer, Select ONE) Claude produces a clear summary of a contract's termination rights. How should this output be treated?

- A. As drafting and review support that a qualified lawyer must confirm **(key)**  
  _Rationale:_ Correct: AI contract analysis is support, not a substitute for legal advice.
- B. As final legal advice ready to act on  
  _Rationale:_ AI output is not legal advice and needs professional review.
- C. As binding on the counterparty  
  _Rationale:_ A summary is not a binding instrument.
- D. As confidential to Claude only  
  _Rationale:_ That is not a meaningful characterisation.

**MST-0518-Q0002** (multiple-answer, Select TWO) Which TWO are sound steps when comparing a contract to an approved playbook? (Select TWO.)

- A. Flag each deviation from the playbook position **(key)**  
  _Rationale:_ Correct: surfacing deviations is the purpose of playbook comparison.
- B. Rank deviations by the risk they create **(key)**  
  _Rationale:_ Correct: ranking helps focus legal attention on what matters.
- C. Ignore substantive risk if the wording looks similar  
  _Rationale:_ Similar wording can still carry substantive risk.
- D. Treat every wording change as equally critical  
  _Rationale:_ Not all changes carry the same risk; ranking matters.

**MST-0518-Q0003** (single-answer, Select ONE) Claude extracts a renewal date from a contract. What is the correct next step before relying on it?

- A. Check the extracted date against the clause it came from **(key)**  
  _Rationale:_ Correct: extractions must be verified against the source text.
- B. Enter it into the obligations tracker unchecked  
  _Rationale:_ Unverified extractions can be wrong and must be confirmed.
- C. Assume Claude never misreads dates  
  _Rationale:_ Models can misread or misattribute details.
- D. Delete the clause reference  
  _Rationale:_ The reference is what enables verification.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
