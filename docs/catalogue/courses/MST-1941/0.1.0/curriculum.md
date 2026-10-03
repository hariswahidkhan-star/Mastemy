# Technical Analysis: Chart Patterns and Indicators

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1941` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1440 min; instruction I = 1152 min (80%); assessment A = 288 min (20%) |
| Assessment split | lesson checks 72 / module checks 101 / cumulative 115 min |
| Certificate | Mastemy Certificate of Completion — Technical Analysis: Chart Patterns and Indicators (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Read price charts across candlesticks, bars and multiple timeframes
2. Identify support, resistance and trend structure on a chart
3. Recognise common continuation and reversal patterns
4. Apply trend, momentum and volatility indicators appropriately
5. Use volume to confirm or question a price move
6. Translate a chart read into an entry, stop and target without overfitting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Reading price charts (25% (Mastemy design weight), design weight)

- Worked applications: (1) Mark support and resistance on a daily chart and justify each level; (2) Compare the same move on a 5-minute and a daily chart
- Common misconception addressed: Believing a lower timeframe pattern overrides the higher-timeframe trend
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Candlesticks, bars and choosing a timeframe | 144 | 9 |
| M01L02 | Support, resistance and trendlines | 144 | 9 |

### M02 Chart patterns (25% (Mastemy design weight), design weight)

- Worked applications: (1) Measure a flag's target using the prior pole; (2) Distinguish a valid head-and-shoulders from a loose resemblance
- Common misconception addressed: Forcing a pattern label onto random price noise
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Continuation patterns: triangles, flags and channels | 144 | 9 |
| M02L02 | Reversal patterns: head-and-shoulders, double tops and bottoms | 144 | 9 |

### M03 Indicators (25% (Mastemy design weight), design weight)

- Worked applications: (1) Read an RSI divergence against price and state what it suggests; (2) Use ATR to set a volatility-aware stop distance
- Common misconception addressed: Treating an indicator cross as a standalone buy or sell signal
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Trend and momentum: moving averages, RSI and MACD | 144 | 9 |
| M03L02 | Volatility and volume: Bollinger Bands, ATR and volume | 144 | 9 |

### M04 From chart to trade (25% (Mastemy design weight), design weight)

- Worked applications: (1) Define an entry, stop and target from a breakout with a reason for each; (2) Review a past trade for hindsight bias in the setup
- Common misconception addressed: Curve-fitting indicator settings to past charts and expecting them to repeat
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Entries, stops and targets from a chart read | 144 | 9 |
| M04L02 | Avoiding bias, hindsight and overfitting | 144 | 9 |

## Integrative case

A learner analyses a trending stock: identify the trend and key levels on the daily chart, spot a continuation pattern, confirm with volume and an indicator, then specify an entry, stop and target and critique the plan for overfitting and bias.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1941-final-protected | 40 | 40 | yes |
| MST-1941-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Reading price charts | 10 |
| Chart patterns | 10 |
| Indicators | 10 |
| From chart to trade | 10 |

Minimum reviewed item bank: 424 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1941-Q0001** (single-answer, Select ONE) Price makes a higher high while RSI makes a lower high. What is this called and what does it suggest?

- A. Bearish divergence, suggesting weakening upward momentum **(key)**  
  _Rationale:_ Correct: price up but momentum down is bearish divergence, a caution signal, not a guarantee.
- B. Bullish confirmation, suggesting the trend is strengthening  
  _Rationale:_ Momentum is falling while price rises, which is the opposite of confirmation.
- C. A moving-average crossover  
  _Rationale:_ Divergence compares price to an oscillator, not two moving averages.
- D. A support breakout  
  _Rationale:_ This describes momentum, not a level break.

**MST-1941-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce the risk of overfitting a technical strategy to past charts? (Select TWO.)

- A. Testing the rules on data the settings were not tuned on **(key)**  
  _Rationale:_ Correct: out-of-sample testing guards against curve-fitting.
- B. Keeping the rules simple with few tunable parameters **(key)**  
  _Rationale:_ Correct: fewer parameters reduce the chance of fitting noise.
- C. Adjusting indicator settings until past trades all look profitable  
  _Rationale:_ That is the definition of overfitting.
- D. Adding more indicators until every past loss disappears  
  _Rationale:_ Piling on indicators to erase past losses overfits the history.

**MST-1941-Q0003** (single-answer, Select ONE) A bull flag forms after a strong upward pole. How is a common price target estimated?

- A. Project the height of the pole upward from the flag's breakout point **(key)**  
  _Rationale:_ Correct: the measured-move target adds the pole's height to the breakout.
- B. Use the lowest low of the entire chart  
  _Rationale:_ The target is measured from the pattern, not the chart's extreme.
- C. Double the current price  
  _Rationale:_ There is no rule that doubles price for a flag.
- D. Set the target at the 200-day moving average regardless of the pattern  
  _Rationale:_ The flag target is measured from the pattern itself, not a fixed average.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
