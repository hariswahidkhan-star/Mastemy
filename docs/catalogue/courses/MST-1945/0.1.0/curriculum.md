# Options Trading Basics: Calls, Puts and Core Strategies

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1945` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1440 min; instruction I = 1152 min (80%); assessment A = 288 min (20%) |
| Assessment split | lesson checks 72 / module checks 101 / cumulative 115 min |
| Certificate | Mastemy Certificate of Completion — Options Trading Basics: Calls, Puts and Core Strategies (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain calls, puts, strikes, expiration and moneyness
2. Distinguish intrinsic value from time value in an option price
3. Describe how the primary Greeks affect an option's price
4. Explain how implied volatility influences premiums
5. Apply core single-leg strategies and their risk profiles
6. Describe simple vertical spreads and assignment risk

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Option building blocks (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decompose an in-the-money call premium into intrinsic and time value; (2) Rank three strikes by moneyness for a given underlying price
- Common misconception addressed: Thinking an option with a higher premium is automatically better value
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Calls, puts, strikes and expiration | 144 | 9 |
| M01L02 | Intrinsic value, time value and moneyness | 144 | 9 |

### M02 What moves an option's price (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain how theta erodes an option as expiration nears; (2) Predict premium change when implied volatility rises, all else equal
- Common misconception addressed: Ignoring volatility and blaming only direction for a losing option
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The Greeks: delta, theta, vega and gamma | 144 | 9 |
| M02L02 | Implied volatility and premiums | 144 | 9 |

### M03 Core single-leg strategies (25% (Mastemy design weight), design weight)

- Worked applications: (1) Build a covered call and state its maximum gain and risk; (2) Compare a protective put to simply holding the stock
- Common misconception addressed: Believing a long call can never lose more than a share position's risk profile
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Long calls and puts; covered calls | 144 | 9 |
| M03L02 | Cash-secured and protective puts | 144 | 9 |

### M04 Spreads and risk (25% (Mastemy design weight), design weight)

- Worked applications: (1) Construct a bull call spread and label its max profit and max loss; (2) Explain what assignment means for a short put holder
- Common misconception addressed: Forgetting that a short option can be assigned before expiration
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Vertical spreads and defined-risk trades | 144 | 9 |
| M04L02 | Assignment, expiration and early exercise | 144 | 9 |

## Integrative case

A stock investor wants to learn options: define a call and a put with strike and expiration, split a premium into intrinsic and time value, see how the Greeks and volatility move the price, and build a covered call and a bull call spread with their risk labelled.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1945-final-protected | 40 | 40 | yes |
| MST-1945-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Option building blocks | 10 |
| What moves an option's price | 10 |
| Core single-leg strategies | 10 |
| Spreads and risk | 10 |

Minimum reviewed item bank: 424 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1945-Q0001** (single-answer, Select ONE) A call option has a strike of 50 while the stock trades at 57. The call's premium is 9. What is its intrinsic and time value?

- A. Intrinsic 7, time value 2 **(key)**  
  _Rationale:_ Correct: intrinsic value is 57 - 50 = 7, and the remaining 2 of the 9 premium is time value.
- B. Intrinsic 9, time value 0  
  _Rationale:_ Only 7 of the premium is intrinsic; the rest is time value.
- C. Intrinsic 2, time value 7  
  _Rationale:_ Intrinsic value equals how far in-the-money the option is, which is 7.
- D. Intrinsic 0, time value 9  
  _Rationale:_ The call is in-the-money, so intrinsic value is not zero.

**MST-1945-Q0002** (multiple-answer, Select TWO) Which TWO statements about an option's time value are correct? (Select TWO.)

- A. Time value tends to decay as expiration approaches, all else equal **(key)**  
  _Rationale:_ Correct: theta decay accelerates toward expiration.
- B. Higher implied volatility generally raises time value **(key)**  
  _Rationale:_ Correct: more expected movement makes the option's optionality more valuable.
- C. Time value is always equal to the strike price  
  _Rationale:_ Time value is a component of the premium, unrelated to the strike level directly.
- D. Time value cannot change once the option is bought  
  _Rationale:_ Time value changes continuously with time and volatility.

**MST-1945-Q0003** (single-answer, Select ONE) A trader sells a covered call against 100 shares they own. What is the main trade-off?

- A. Premium income now in exchange for capping the upside above the strike **(key)**  
  _Rationale:_ Correct: the covered call earns premium but limits gains if the stock rises past the strike.
- B. Unlimited additional upside with no obligation  
  _Rationale:_ The written call caps upside; it does not add unlimited gains.
- C. Elimination of all downside risk on the shares  
  _Rationale:_ The premium cushions slightly but does not remove downside risk.
- D. A guarantee the shares will not be called away  
  _Rationale:_ The shares can be assigned away if the call is in-the-money.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
