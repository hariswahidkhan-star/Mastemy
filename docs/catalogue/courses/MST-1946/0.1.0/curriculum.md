# Futures and Commodities Trading Basics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1946` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1440 min; instruction I = 1152 min (80%); assessment A = 288 min (20%) |
| Assessment split | lesson checks 72 / module checks 101 / cumulative 115 min |
| Certificate | Mastemy Certificate of Completion — Futures and Commodities Trading Basics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how futures contracts, expiry, tick size and margin work
2. Describe mark-to-market and daily settlement
3. Survey the major commodity markets and their characteristics
4. Interpret contango, backwardation and the futures curve
5. Distinguish hedgers from speculators and explain contract rollover
6. Manage leverage and margin risk and build a futures plan

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 How futures work (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compute the dollar value of a one-tick move for a sample contract; (2) Explain why initial margin is a performance bond, not full payment
- Common misconception addressed: Believing margin in futures is a loan like equity margin
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Contracts, expiry, tick size and margin | 144 | 9 |
| M01L02 | Mark-to-market and daily settlement | 144 | 9 |

### M02 Commodity markets overview (25% (Mastemy design weight), design weight)

- Worked applications: (1) Sketch a contango curve and explain the cost-of-carry idea; (2) Match three commodities to their primary demand drivers
- Common misconception addressed: Assuming the spot price and the futures price are the same thing
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Energy, metals and agricultural markets | 144 | 9 |
| M02L02 | Contango, backwardation and the futures curve | 144 | 9 |

### M03 Participants and rollover (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain why a farmer would hedge next season's crop with futures; (2) Describe the rollover trade a speculator makes before expiry
- Common misconception addressed: Forgetting that holding to expiry can trigger physical delivery
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Hedgers, speculators and the role of each | 144 | 9 |
| M03L02 | Rolling contracts and avoiding delivery | 144 | 9 |

### M04 Managing leveraged risk (25% (Mastemy design weight), design weight)

- Worked applications: (1) Size a futures position given account equity and contract risk; (2) Explain what triggers a margin call and the likely consequence
- Common misconception addressed: Treating the full contract notional as the amount at risk per tick
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sizing and margin calls in futures | 144 | 9 |
| M04L02 | Building a futures trading plan | 144 | 9 |

## Integrative case

A learner moves from stocks to futures: define a contract's tick value and margin, follow daily mark-to-market, read a contango curve, decide when to roll before expiry to avoid delivery, and size a position so a margin call is unlikely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1946-final-protected | 40 | 40 | yes |
| MST-1946-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How futures work | 10 |
| Commodity markets overview | 10 |
| Participants and rollover | 10 |
| Managing leveraged risk | 10 |

Minimum reviewed item bank: 424 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1946-Q0001** (single-answer, Select ONE) Why is the initial margin on a futures contract best described as a performance bond rather than a purchase price?

- A. It is a good-faith deposit securing the position, not the full contract value **(key)**  
  _Rationale:_ Correct: futures margin is a performance bond; daily settlement adjusts it, unlike paying full value.
- B. It is a loan from the broker charged at interest  
  _Rationale:_ Unlike equity margin, futures margin is a deposit, not a borrowed sum.
- C. It is the total amount the trader can ever lose  
  _Rationale:_ Losses can exceed the initial margin through daily settlement.
- D. It is a fee kept by the exchange  
  _Rationale:_ Margin is a returnable deposit, not a fee.

**MST-1946-Q0002** (multiple-answer, Select TWO) Which TWO statements describe a commodity futures curve in contango? (Select TWO.)

- A. Longer-dated contracts trade at higher prices than nearer-dated ones **(key)**  
  _Rationale:_ Correct: an upward-sloping curve with later months higher is contango.
- B. A holder rolling a long position may face a cost as the curve converges **(key)**  
  _Rationale:_ Correct: rolling up the curve in contango can create a negative roll yield.
- C. Nearer-dated contracts always cost more than later ones  
  _Rationale:_ That describes backwardation, the opposite of contango.
- D. Contango means the market expects immediate shortage  
  _Rationale:_ An expected near-term shortage typically produces backwardation, not contango.

**MST-1946-Q0003** (single-answer, Select ONE) A speculator holds a long crude-oil future that is nearing expiry and does not want delivery. What should they do?

- A. Close or roll the position to a later contract before expiry **(key)**  
  _Rationale:_ Correct: closing or rolling avoids obligations tied to holding a physically settled contract into delivery.
- B. Hold it to expiry to avoid transaction costs  
  _Rationale:_ Holding a physically settled contract to expiry can trigger delivery obligations.
- C. Convert the contract into shares of the oil company  
  _Rationale:_ A futures contract cannot be converted into equity shares.
- D. Ignore the expiry date entirely  
  _Rationale:_ Ignoring expiry is exactly what creates delivery risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
