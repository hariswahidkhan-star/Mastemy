# Solidity Smart Contract Development from Scratch

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1912` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Solidity Smart Contract Development from Scratch (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write, compile and deploy Solidity contracts to a test network
2. Use Solidity's type system, storage model and visibility rules correctly
3. Structure contracts with modifiers, events, errors and inheritance
4. Manage Ether, external calls and the checks-effects-interactions pattern
5. Write unit tests and reason about gas costs during development
6. Apply upgradeability and common design patterns responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Language foundations (15% (design weight), design weight)

- Worked applications: (1) Deploy a hello-world contract to a local test chain; (2) Read and write a state variable from a test
- Common misconception addressed: Forgetting that storage writes persist and cost gas
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Types, variables and functions | 108 | 7 |
| M01L02 | Storage, memory and calldata | 108 | 7 |

### M02 Contract structure (16% (design weight), design weight)

- Worked applications: (1) Add an onlyOwner modifier and a custom error; (2) Emit an event and assert it in a test
- Common misconception addressed: Using require strings where custom errors are cheaper
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Visibility, modifiers and constructors | 115 | 7 |
| M02L02 | Events, custom errors and require | 116 | 7 |

### M03 Value handling (17% (design weight), design weight)

- Worked applications: (1) Implement a safe withdrawal with checks-effects-interactions; (2) Reproduce a reentrancy bug then fix it
- Common misconception addressed: Updating balances after the external call
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sending and receiving Ether | 122 | 7 |
| M03L02 | Checks-effects-interactions and reentrancy | 123 | 7 |

### M04 Composition and inheritance (16% (design weight), design weight)

- Worked applications: (1) Compose a contract from a base and an interface; (2) Refactor shared logic into a library
- Common misconception addressed: Deep inheritance hierarchies that obscure storage layout
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Inheritance and interfaces | 115 | 7 |
| M04L02 | Libraries and using-for | 115 | 7 |

### M05 Testing and tooling (18% (design weight), design weight)

- Worked applications: (1) Write a test suite covering happy and failure paths; (2) Profile gas before and after an optimisation
- Common misconception addressed: Trusting code with no failing-path tests
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Unit tests and fixtures | 129 | 7 |
| M05L02 | Gas profiling in development | 130 | 7 |

### M06 Patterns and upgradeability (18% (design weight), design weight)

- Worked applications: (1) Deploy behind a minimal proxy and upgrade logic; (2) Guard an admin function with role-based access
- Common misconception addressed: Breaking storage layout across a proxy upgrade
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Proxy and storage patterns | 129 | 7 |
| M06L02 | Factory and access-control patterns | 130 | 7 |

## Integrative case

You are building an escrow contract that releases funds when a buyer confirms delivery; implement it in Solidity with safe value handling, custom errors, events and tests, and justify where reentrancy and access-control guards go and why.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1912-final-protected | 45 | 55 | yes |
| MST-1912-final-alternate | 45 | 55 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Language foundations | 7 |
| Contract structure | 7 |
| Value handling | 8 |
| Composition and inheritance | 7 |
| Testing and tooling | 8 |
| Patterns and upgradeability | 8 |

Minimum reviewed item bank: 510 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1912-Q0001** (single-answer, Select ONE) Why is the checks-effects-interactions pattern important when sending Ether out of a contract?

- A. Updating state before the external call prevents a reentrant call from draining funds **(key)**  
  _Rationale:_ Correct: state is settled before control leaves the contract.
- B. It makes the contract compile faster  
  _Rationale:_ It is a security pattern, not a compile optimisation.
- C. It reduces the deployment bytecode size  
  _Rationale:_ Its purpose is reentrancy safety, not size.
- D. It lets the contract skip gas payment  
  _Rationale:_ Gas is still paid.

**MST-1912-Q0002** (multiple-answer, Select TWO) Which TWO are valid reasons to prefer custom errors over long require strings in Solidity? (Select TWO.)

- A. Custom errors typically cost less gas than storing revert strings **(key)**  
  _Rationale:_ Correct: custom errors are more gas-efficient.
- B. Custom errors can carry structured parameters for off-chain decoding **(key)**  
  _Rationale:_ Correct: they can include typed arguments.
- C. Custom errors disable all reverts  
  _Rationale:_ They are a way to revert, not to disable reverting.
- D. Custom errors remove the need for access control  
  _Rationale:_ They are unrelated to access control.

**MST-1912-Q0003** (single-answer, Select ONE) A function marked `public` that only internal code should call is a problem because:

- A. External accounts can call it directly, bypassing intended control flow **(key)**  
  _Rationale:_ Correct: public visibility exposes it to external callers.
- B. Public functions cannot emit events  
  _Rationale:_ Public functions can emit events.
- C. Public functions always run out of gas  
  _Rationale:_ Visibility does not cause out-of-gas.
- D. Public functions cannot read storage  
  _Rationale:_ They can read storage.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
