# .NET Legacy Application Modernization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0846` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **vendor-docs-partial - sources: SRC-MS-DOTNET-MODERNIZE** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Assess a legacy .NET Framework application and inventory risks and dependencies
2. Choose a modernization strategy (rehost, refactor, re-architect) with justification
3. Apply the strangler fig pattern to migrate incrementally with low risk
4. Target a modern .NET platform and plan testing and cutover

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **vendor-docs-partial**. Source(s) consulted:
- https://learn.microsoft.com/dotnet/architecture/

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Assessing the legacy app

- Purpose: Teach inventorying a legacy .NET Framework app and its risks.
- Worked applications: (1) Produce a dependency and risk inventory for a .NET Framework web app; (2) Identify APIs with no modern equivalent that block a straight port
- Common misconception addressed: Assuming every legacy app must be fully rewritten at once
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why modernize and common drivers | 80 | 5 |
| M01L02 | Inventorying dependencies and risks | 80 | 5 |
| M01L03 | Compatibility analysis and blockers | 80 | 5 |

### M02 Choosing a strategy

- Purpose: Teach rehost vs refactor vs re-architect trade-offs.
- Worked applications: (1) Recommend a strategy for three apps with different constraints; (2) Estimate effort and risk for a refactor vs a re-architect
- Common misconception addressed: Equating "lift and shift" with modernization of the codebase
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Rehost, refactor, re-architect | 80 | 5 |
| M02L02 | Business drivers and trade-offs | 80 | 5 |
| M02L03 | Sequencing a portfolio | 80 | 5 |

### M03 Incremental migration

- Purpose: Teach the strangler fig pattern, targeting modern .NET, testing and cutover.
- Worked applications: (1) Route one feature through a new .NET service while the rest stays legacy; (2) Plan a safe cutover with a rollback for a migrated module
- Common misconception addressed: Doing a big-bang migration with no incremental safety net
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The strangler fig pattern | 80 | 5 |
| M03L02 | Targeting modern .NET | 80 | 5 |
| M03L03 | Testing, cutover and rollback | 80 | 5 |

## Integrative case

A revenue-critical .NET Framework monolith cannot be taken offline for a rewrite. Assess it, choose a strategy, and use the strangler fig pattern to migrate one high-value feature to modern .NET with a tested, reversible cutover.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0846-final-protected | 30 | 30 | yes |
| MST-0846-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Assessing the legacy app | 10 |
| Choosing a strategy | 10 |
| Incremental migration | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0846-Q0001** (single-answer, Select ONE) What is the core idea of the strangler fig pattern for modernization?

- A. Incrementally route functionality to a new system while the old one keeps running, retiring it gradually **(key)**  
  _Rationale:_ Correct: the strangler fig replaces the legacy system piece by piece, reducing risk.
- B. Rewrite the whole application at once and switch over in a single release  
  _Rationale:_ That is a big-bang migration, the opposite of the strangler fig.
- C. Freeze the legacy app and never change it again  
  _Rationale:_ Freezing is not migration; the pattern is about gradual replacement.
- D. Duplicate the database and hope both stay in sync forever  
  _Rationale:_ The pattern is about routing functionality, not indefinite data duplication.

**MST-0846-Q0002** (multiple-answer, Select TWO) Select TWO factors that should drive the choice between rehost, refactor and re-architect.

- A. The business driver and acceptable risk/effort for each application **(key)**  
  _Rationale:_ Correct: strategy follows business drivers and the risk/effort a team can accept.
- B. Which legacy dependencies have modern equivalents or blockers **(key)**  
  _Rationale:_ Correct: compatibility blockers strongly influence a feasible strategy.
- C. The color scheme of the admin UI  
  _Rationale:_ Cosmetic UI details do not determine a modernization strategy.
- D. Whichever option a vendor markets most aggressively  
  _Rationale:_ Vendor marketing is not a sound basis for the decision.
- E. Choosing re-architect always, regardless of context  
  _Rationale:_ A blanket choice ignores the trade-offs the decision is meant to weigh.

**MST-0846-Q0003** (single-answer, Select ONE) Why is "lift and shift" (rehost) not automatically the same as modernizing the codebase?

- A. It moves the app to new infrastructure but leaves the application code and its debt largely unchanged **(key)**  
  _Rationale:_ Correct: rehosting changes hosting, not the code; modernization of the code is a separate effort.
- B. It always rewrites the code to the latest framework  
  _Rationale:_ Rehost deliberately avoids code rewrites.
- C. It deletes the legacy code entirely  
  _Rationale:_ Rehost preserves the code; it does not delete it.
- D. It guarantees the app becomes cloud-native  
  _Rationale:_ Rehosting alone does not make an app cloud-native.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
