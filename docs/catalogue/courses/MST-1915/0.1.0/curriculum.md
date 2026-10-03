# NFTs and On-Chain Digital Ownership

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1915` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — NFTs and On-Chain Digital Ownership (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what an NFT represents and the limits of on-chain ownership
2. Describe how NFT metadata and media are stored and referenced
3. Reason about minting, royalties and marketplace mechanics
4. Distinguish on-chain, off-chain and decentralised-storage approaches
5. Identify provenance, authenticity and rights misconceptions
6. Evaluate the durability and risks of an NFT project

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What an NFT is (17% (design weight), design weight)

- Worked applications: (1) Inspect an NFT's owner and token ID on-chain; (2) Explain what the buyer actually owns
- Common misconception addressed: Believing owning the token owns the copyright
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tokens, ownership and the registry | 81 | 5 |
| M01L02 | What ownership does and does not grant | 82 | 5 |

### M02 Metadata and media (18% (design weight), design weight)

- Worked applications: (1) Fetch and validate an NFT's metadata JSON; (2) Compare on-chain SVG art to a hosted image
- Common misconception addressed: Assuming the artwork is stored on-chain
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Token URIs and metadata schemas | 86 | 5 |
| M02L02 | On-chain vs off-chain media | 87 | 5 |

### M03 Storage durability (16% (design weight), design weight)

- Worked applications: (1) Pin media to decentralised storage and reference it; (2) Detect a broken centralised media link
- Common misconception addressed: Trusting a mutable URL for permanent art
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Centralised URLs vs decentralised storage | 77 | 5 |
| M03L02 | Content addressing and link rot | 77 | 5 |

### M04 Minting and royalties (17% (design weight), design weight)

- Worked applications: (1) Run a capped mint with a delayed reveal; (2) Set a royalty and explain why it may not be enforced
- Common misconception addressed: Assuming royalties are guaranteed on every sale
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Mint mechanics and reveal patterns | 81 | 5 |
| M04L02 | Royalty standards and enforcement limits | 82 | 5 |

### M05 Marketplaces and provenance (16% (design weight), design weight)

- Worked applications: (1) Trace provenance across several transfers; (2) Spot a copied-collection red flag
- Common misconception addressed: Equating a listing with verified authenticity
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Listings, bids and transfers | 77 | 5 |
| M05L02 | Provenance and authenticity signals | 77 | 5 |

### M06 Durability and rights (16% (design weight), design weight)

- Worked applications: (1) Assess a project's media and contract durability; (2) Separate token ownership from usage rights
- Common misconception addressed: Thinking the token confers legal IP rights automatically
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Project longevity risks | 76 | 5 |
| M06L02 | Copyright vs token ownership | 77 | 5 |

## Integrative case

An artist wants to release a 1,000-piece NFT collection that will still resolve to its art in ten years; design the minting, metadata and storage approach, set royalties honestly, and brief the artist on what buyers do and do not legally own.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1915-final-protected | 40 | 50 | yes |
| MST-1915-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What an NFT is | 7 |
| Metadata and media | 7 |
| Storage durability | 7 |
| Minting and royalties | 7 |
| Marketplaces and provenance | 6 |
| Durability and rights | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1915-Q0001** (single-answer, Select ONE) An NFT's metadata points to a normal web URL that later goes offline. What breaks?

- A. The token still exists on-chain but its referenced media no longer resolves **(key)**  
  _Rationale:_ Correct: on-chain ownership persists while off-chain media can disappear.
- B. The token is automatically burned  
  _Rationale:_ A dead link does not burn the token.
- C. The blockchain deletes the owner record  
  _Rationale:_ Ownership records are unaffected.
- D. The buyer's wallet is drained  
  _Rationale:_ A broken link does not drain funds.

**MST-1915-Q0002** (multiple-answer, Select TWO) Which TWO statements about NFT ownership are accurate? (Select TWO.)

- A. Owning the token proves control of the on-chain registry entry for that ID **(key)**  
  _Rationale:_ Correct: the token records on-chain ownership.
- B. Owning the token does not by itself transfer copyright in the artwork **(key)**  
  _Rationale:_ Correct: IP rights require a separate legal grant.
- C. Owning the token guarantees the media is stored on-chain  
  _Rationale:_ Media is often off-chain.
- D. Owning the token guarantees future royalties to the buyer  
  _Rationale:_ Royalties flow to the creator, not the buyer, and are not guaranteed.

**MST-1915-Q0003** (single-answer, Select ONE) Why is decentralised, content-addressed storage preferred for NFT media meant to last?

- A. The reference is tied to the content's hash, so the link does not silently change or rot **(key)**  
  _Rationale:_ Correct: content addressing makes media verifiable and durable.
- B. It stores the media directly inside the token for free  
  _Rationale:_ It stores off-chain but addressably, not inside the token.
- C. It makes the NFT immune to all loss  
  _Rationale:_ Pinning still matters; it is not absolute.
- D. It encrypts the art so no one can view it  
  _Rationale:_ It does not encrypt by default.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
