# Solidity: Smart Contract Development and Security Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0935` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Solidity: Smart Contract Development and Security Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Ethereum, the EVM and Solidity basics
2. Types, state variables and functions
3. Contract structure, modifiers and events
4. Storage, gas and the data location model
5. Common vulnerabilities and secure patterns
6. Testing, deployment and upgrade considerations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Ethereum, the EVM and Solidity basics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write and compile a minimal contract with a state variable; (2) Explain where contract code and state live on-chain
- Common misconception addressed: Thinking contract data is private because it is not shown in the UI
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Accounts, transactions and the EVM execution model | 80 | 6 |
| M01L02 | A first contract: pragma, license and layout | 80 | 6 |

### M02 Types, state variables and functions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model balances with a mapping(address => uint); (2) Mark a read-only function view and justify it
- Common misconception addressed: Assuming uint can hold negative numbers
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Value types, addresses and mappings | 80 | 6 |
| M02L02 | Function visibility and state mutability | 80 | 6 |

### M03 Contract structure, modifiers and events (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add an onlyOwner modifier to restrict a function; (2) Emit an event when state changes for off-chain listeners
- Common misconception addressed: Using events to store data the contract later needs to read
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Constructors, modifiers and access control | 80 | 6 |
| M03L02 | Events, logs and off-chain indexing | 80 | 6 |

### M04 Storage, gas and the data location model (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose memory vs storage for a function parameter; (2) Reduce gas by caching a storage read in a local
- Common misconception addressed: Expecting a local copy of a storage struct to update on-chain state
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | storage, memory and calldata | 80 | 6 |
| M04L02 | Gas costs and writing gas-aware code | 80 | 6 |

### M05 Common vulnerabilities and secure patterns (MASTEMY-DESIGN 17%)

- Worked applications: (1) Fix a reentrancy bug by reordering state updates; (2) Apply checks-effects-interactions to a withdraw function
- Common misconception addressed: Believing external calls are safe because the callee is trusted
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reentrancy and the checks-effects-interactions pattern | 80 | 6 |
| M05L02 | Integer handling, access control and front-running | 80 | 6 |

### M06 Testing, deployment and upgrade considerations (MASTEMY-DESIGN 18%)

- Worked applications: (1) Write a test asserting a revert on an unauthorised call; (2) Describe why deployed bytecode is immutable
- Common misconception addressed: Assuming a deployed contract can be edited in place without a proxy
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Unit testing contracts and local networks | 80 | 6 |
| M06L02 | Deployment, immutability and upgrade patterns | 80 | 6 |

## Integrative case

Design and secure a token-vault contract: define balances and access control, implement a withdraw function using checks-effects-interactions to prevent reentrancy, emit events for off-chain indexing, and write tests that assert reverts on unauthorised access.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0935-final-protected | 30 | 30 | yes |
| MST-0935-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Ethereum, the EVM and Solidity basics | 5 |
| Types, state variables and functions | 5 |
| Contract structure, modifiers and events | 5 |
| Storage, gas and the data location model | 5 |
| Common vulnerabilities and secure patterns | 5 |
| Testing, deployment and upgrade considerations | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0935-Q0001** (single-answer, Select ONE) Where is a contract's persistent state stored on Ethereum?

- A. In contract storage on-chain, visible to anyone reading the blockchain **(key)**  
  _Rationale:_ Correct: storage is public on-chain even if no UI displays it.
- B. In the user's browser local storage  
  _Rationale:_ Contract state lives on-chain, not in a browser.
- C. Only in event logs  
  _Rationale:_ Logs are not readable by contract code and are not the state store.
- D. In a private database off-chain  
  _Rationale:_ Persistent contract state is on-chain, not off-chain.

**MST-0935-Q0002** (multiple-answer, Select ALL that apply) Which practices help prevent reentrancy attacks? (Select TWO)

- A. Update state before making external calls (checks-effects-interactions) **(key)**  
  _Rationale:_ Correct: changing state first means a reentrant call sees the updated state.
- B. Use a reentrancy guard / mutex on sensitive functions **(key)**  
  _Rationale:_ Correct: a guard blocks nested calls into the protected function.
- C. Send Ether before decrementing the user's balance  
  _Rationale:_ That is the vulnerable order that enables reentrancy.
- D. Make every function external and payable  
  _Rationale:_ That widens the attack surface and does nothing against reentrancy.

**MST-0935-Q0003** (single-answer, Select ONE) What does marking a Solidity function `view` indicate?

- A. It reads state but does not modify it **(key)**  
  _Rationale:_ Correct: view functions may read storage but must not change it.
- B. It can send Ether  
  _Rationale:_ Sending Ether requires payable, not view.
- C. It deletes the contract  
  _Rationale:_ Self-destruct is unrelated to view.
- D. It makes the function private  
  _Rationale:_ Visibility (public/private) is separate from state mutability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
