# Claude + Salesforce: Account Intelligence and Proposal Workflow

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0788` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude + Salesforce: Account Intelligence and Proposal Workflow (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope account-intelligence needs and the proposal they feed
2. Use Claude to synthesise account intelligence from reliable inputs
3. Validate intelligence before it informs a commercial proposal
4. Work with Salesforce records cleanly and with provenance
5. Operate the account-to-proposal workflow with review and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Scoping account intelligence (20%)

- Worked applications: (1) Define the account facts a proposal must rest on; (2) Discard low-value intelligence that will not shape the proposal
- Common misconception addressed: Gathering intelligence with no link to the proposal decision
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining the intelligence a proposal needs | 96 | 7 |
| M01L02 | Separating signal from noise | 96 | 7 |

### M02 Claude-assisted synthesis (20%)

- Worked applications: (1) Have Claude summarise an account from supplied notes; (2) Catch an inference Claude drew that the inputs do not support
- Common misconception addressed: Accepting Claude's synthesis as fact without checking the inputs
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting Claude to synthesise account context | 96 | 7 |
| M02L02 | Spotting unsupported inferences | 96 | 7 |

### M03 Validating intelligence (20%)

- Worked applications: (1) Verify a stated pain point against a primary input; (2) Label an intelligence gap rather than filling it with a guess
- Common misconception addressed: Letting an unverified claim drive the proposal's value case
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Verifying claims before they reach a proposal | 96 | 7 |
| M03L02 | Confidence, provenance and gaps | 96 | 7 |

### M04 Working in Salesforce (20%)

- Worked applications: (1) Update an opportunity with sourced, dated notes; (2) Link intelligence to the right account and contact
- Common misconception addressed: Writing free-text intelligence with no source into Salesforce
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Clean record updates and relationships | 96 | 7 |
| M04L02 | Provenance and change history | 96 | 7 |

### M05 Operating the workflow (20%)

- Worked applications: (1) Add a review gate before a Claude-informed proposal is sent; (2) Restrict sensitive account intelligence appropriately
- Common misconception addressed: Sending a proposal built on unreviewed AI intelligence
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Review gates before proposals go out | 96 | 7 |
| M05L02 | Governance, access and privacy | 96 | 7 |

## Integrative case

A seller builds an account-intelligence-to-proposal workflow: scope what the proposal needs, use Claude to synthesise context, validate every claim, record it in Salesforce with provenance, and ship proposals through a review gate.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0788-final-protected | 40 | 50 | yes |
| MST-0788-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scoping account intelligence | 8 |
| Claude-assisted synthesis | 8 |
| Validating intelligence | 8 |
| Working in Salesforce | 8 |
| Operating the workflow | 8 |

Minimum reviewed item bank: 388 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0788-Q0001** (single-answer, Select ONE) Claude's account summary asserts a buying trigger that the supplied notes do not mention. What is the right action?

- A. Treat it as an unsupported inference and verify before use **(key)**  
  _Rationale:_ Correct: inferences not grounded in the inputs must be checked, not assumed.
- B. Include it in the proposal because it is persuasive  
  _Rationale:_ Persuasiveness does not make an ungrounded claim true.
- C. Ask Claude to add supporting detail  
  _Rationale:_ Asking the model to elaborate does not establish the claim.
- D. Drop all of Claude's summary to be safe  
  _Rationale:_ Discarding everything over one unsupported point is disproportionate.

**MST-0788-Q0002** (multiple-answer, Select TWO) Which TWO conditions should be met before a Claude-informed proposal is sent? (Select TWO.)

- A. A human has reviewed the intelligence the proposal relies on **(key)**  
  _Rationale:_ Correct: a review gate catches unverified or wrong claims.
- B. Key claims are backed by a recorded source **(key)**  
  _Rationale:_ Correct: sourced claims are defensible to the customer.
- C. The proposal was generated in a single pass for speed  
  _Rationale:_ Speed is not a safeguard against error.
- D. All account intelligence is included regardless of relevance  
  _Rationale:_ Dumping everything weakens the proposal and the review.

**MST-0788-Q0003** (single-answer, Select ONE) How should synthesised intelligence be recorded on a Salesforce opportunity?

- A. As sourced, dated notes linked to the correct account **(key)**  
  _Rationale:_ Correct: provenance and correct linkage make the record trustworthy.
- B. As free text with no source, to save time  
  _Rationale:_ Unsourced notes cannot be judged or defended later.
- C. On any related record so it is easy to find  
  _Rationale:_ Loose linkage corrupts reporting and relationships.
- D. Only in the proposal document, not the CRM  
  _Rationale:_ Keeping it out of the CRM loses the shared record of truth.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
