# AI for Game Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1401` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 480 min; instruction I = 384 min (80%); assessment A = 96 min (20%) |
| Assessment split | lesson checks 24 / module checks 34 / cumulative 38 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify AI use cases across game development
2. Use AI for asset, content and level generation responsibly
3. Apply AI to NPC behaviour and playtesting
4. Recognise IP, licensing and attribution issues
5. Judge bias, quality and player-impact risks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI across game development (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map AI uses across the pipeline; (2) Pick the highest-value use case
- Common misconception addressed: Expecting AI to replace game design judgement
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where AI fits in game dev | 39 | 6 |
| M01L02 | Benefits, limits and hype | 39 | 6 |

### M02 Generating art and content (MASTEMY-DESIGN 20%)

- Worked applications: (1) Review a generated asset for quality and fit; (2) Decide where generated content needs human polish
- Common misconception addressed: Shipping generated assets without review or polish
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI asset and texture generation | 39 | 6 |
| M02L02 | Procedural and level content | 39 | 6 |

### M03 Behaviour and testing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Judge whether NPC behaviour feels fair; (2) Use AI to find a balance or bug issue
- Common misconception addressed: Trusting AI playtesting to replace human testers
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AI-driven NPC behaviour | 38 | 6 |
| M03L02 | AI-assisted playtesting | 38 | 6 |

### M04 IP, licensing and attribution (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot an IP risk in a generated asset; (2) Check an asset's licensing status
- Common misconception addressed: Assuming generated assets are always free to use
- Module check: 7 items / 7 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Training data and IP risks | 38 | 6 |
| M04L02 | Licensing and attribution | 38 | 6 |

### M05 Quality, bias and players (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify a bias or harmful-content risk; (2) Define a review gate for AI content
- Common misconception addressed: Ignoring how AI content affects player trust
- Module check: 6 items / 6 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Bias and content risks | 38 | 6 |
| M05L02 | Responsible, player-respecting use | 38 | 6 |

## Integrative case

A studio wants to use AI across game development. Decide where AI helps in art, design, code and testing, judge generated assets and behaviour, address IP and bias, and plan responsible, player-respecting use.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1401-final-protected | 25 | 25 | yes |
| MST-1401-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI across game development | 5 |
| Generating art and content | 5 |
| Behaviour and testing | 5 |
| IP, licensing and attribution | 5 |
| Quality, bias and players | 5 |

Minimum reviewed item bank: 238 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1401-Q0001** (single-answer, Select ONE) A studio generates character art with an AI tool. What should it check before shipping it?

- A. Whether the output raises IP, licensing or quality concerns **(key)**  
  _Rationale:_ Correct: generated assets can carry IP and quality risks.
- B. Nothing; generated art is always safe to ship  
  _Rationale:_ Generated art can infringe IP or be low quality.
- C. Only whether it was produced quickly  
  _Rationale:_ Speed does not address IP or quality.
- D. Whether competitors use the same tool  
  _Rationale:_ Competitor use is irrelevant to the risk.

**MST-1401-Q0002** (multiple-answer, Select TWO) Which TWO practices support responsible AI use in game development? (Select TWO.)

- A. Review generated content for bias and harmful material **(key)**  
  _Rationale:_ Correct: content review protects players and the studio.
- B. Confirm IP and licensing status of generated assets **(key)**  
  _Rationale:_ Correct: licensing checks avoid infringement.
- C. Ship generated content with no human review  
  _Rationale:_ Unreviewed content risks quality and legal issues.
- D. Assume AI playtesting replaces all human testing  
  _Rationale:_ Human testers remain essential.

**MST-1401-Q0003** (single-answer, Select ONE) Why keep human testers alongside AI-assisted playtesting?

- A. AI testing misses nuanced, experiential and edge-case issues humans catch **(key)**  
  _Rationale:_ Correct: human judgement covers what automated testing cannot.
- B. AI testing catches every possible issue  
  _Rationale:_ AI testing has blind spots.
- C. Human testers add no value  
  _Rationale:_ Human testers remain essential for feel and edge cases.
- D. Testing is unnecessary once AI is used  
  _Rationale:_ Testing is always needed before release.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
