# Solidity Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1596` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-SF-003 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Solidity Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Solidity foundations
2. Types and state
3. Functions and visibility
4. Modifiers and access control
5. Handling Ether
6. Security
7. Events and gas
8. Testing and deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on writing Ethereum smart contracts in Solidity; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Solidity foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write and compile a minimal contract; (2) Explain what runs on the EVM
- Common misconception addressed: Thinking a deployed contract can be freely edited like normal code
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Smart contracts and the EVM | 75 | 5 |
| M01L02 | Contract structure | 75 | 5 |

### M02 Types and state (MASTEMY-DESIGN 13%)

- Worked applications: (1) Store balances in a mapping; (2) Model a record with a struct
- Common misconception addressed: Confusing storage and memory data locations
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Value types and state variables | 75 | 5 |
| M02L02 | Mappings and structs | 75 | 5 |

### M03 Functions and visibility (MASTEMY-DESIGN 12%)

- Worked applications: (1) Mark a getter as view; (2) Make a function payable to receive Ether
- Common misconception addressed: Leaving a sensitive function public by default
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Visibility and state mutability | 75 | 5 |
| M03L02 | view, pure and payable | 75 | 5 |

### M04 Modifiers and access control (MASTEMY-DESIGN 13%)

- Worked applications: (1) Write an onlyOwner modifier; (2) Restrict a function to a role
- Common misconception addressed: Relying on tx.origin for authorization
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Function modifiers | 75 | 5 |
| M04L02 | Ownership and roles | 75 | 5 |

### M05 Handling Ether (MASTEMY-DESIGN 12%)

- Worked applications: (1) Receive and track a deposit; (2) Use the pull/withdrawal pattern
- Common misconception addressed: Pushing Ether in a loop that can fail or be exploited
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Sending and receiving Ether | 75 | 5 |
| M05L02 | Withdrawal pattern | 75 | 5 |

### M06 Security (MASTEMY-DESIGN 13%)

- Worked applications: (1) Apply checks-effects-interactions; (2) Add a reentrancy guard
- Common misconception addressed: Updating state after an external call
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Reentrancy | 75 | 5 |
| M06L02 | Common vulnerabilities and checks-effects-interactions | 75 | 5 |

### M07 Events and gas (MASTEMY-DESIGN 12%)

- Worked applications: (1) Emit an event on a state change; (2) Reduce gas by minimising storage writes
- Common misconception addressed: Storing data on-chain that could be an event/log
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Emitting events | 75 | 5 |
| M07L02 | Gas costs and optimisation | 75 | 5 |

### M08 Testing and deployment (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a test for a contract function; (2) Plan an upgrade strategy before deploying
- Common misconception addressed: Deploying unaudited code holding real funds
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Testing contracts | 75 | 5 |
| M08L02 | Deployment and immutability | 75 | 5 |

## Integrative case

Write a simple token-and-escrow contract in Solidity: define state and functions, manage visibility and modifiers, handle Ether safely, guard against reentrancy, emit events, and reason about gas and immutability before deployment.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1596-final-protected | 40 | 40 | yes |
| MST-1596-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Solidity foundations | 5 |
| Types and state | 5 |
| Functions and visibility | 5 |
| Modifiers and access control | 5 |
| Handling Ether | 5 |
| Security | 5 |
| Events and gas | 5 |
| Testing and deployment | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1596-Q0001** (single-answer, Select ONE) What does the checks-effects-interactions pattern protect against?

- A. Reentrancy, by updating state before making external calls **(key)**  
  _Rationale:_ Correct: updating state first prevents a called contract from re-entering with stale state.
- B. Integer overflow in older compilers  
  _Rationale:_ That is a separate concern (SafeMath/0.8 checks).
- C. High gas costs  
  _Rationale:_ It is a security pattern, not a gas optimisation.
- D. Compilation errors  
  _Rationale:_ It does not address compile errors.

**MST-1596-Q0002** (single-answer, Select ONE) Why is relying on tx.origin for authorization in Solidity dangerous?

- A. A malicious intermediary contract can trick a user into calling it, passing the origin check **(key)**  
  _Rationale:_ Correct: tx.origin enables phishing-style attacks; use msg.sender instead.
- B. tx.origin is always zero  
  _Rationale:_ It is not zero; it is the original sender.
- C. tx.origin costs no gas  
  _Rationale:_ Gas is unrelated to this risk.
- D. tx.origin cannot be read in a contract  
  _Rationale:_ It can be read, which is the problem.

**MST-1596-Q0003** (multiple-answer, Select ALL that apply) Which statements about Solidity smart contracts are correct? (Select TWO)

- A. Deployed contract code is immutable unless an upgrade pattern was designed in **(key)**  
  _Rationale:_ Correct: you cannot simply edit deployed bytecode.
- B. The pull/withdrawal pattern is safer than pushing Ether to many recipients **(key)**  
  _Rationale:_ Correct: it avoids failures and reentrancy from external pushes.
- C. State variables live in memory and vanish after each call  
  _Rationale:_ False; state lives in persistent storage.
- D. Functions are private by default, so visibility never matters  
  _Rationale:_ False; explicit visibility is required and important.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
