# Redis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1610` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-R-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Redis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Redis fundamentals
2. Core data types
3. Expiry and caching
4. Advanced structures
5. Persistence and reliability
6. Operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Redis fundamentals (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set and get a key from redis-cli; (2) Choose Redis for a session store use case
- Common misconception addressed: Treating Redis as a durable primary database by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Redis is and when to use it | 80 | 6 |
| M01L02 | Keys and the data model | 80 | 6 |
| M01L03 | Connecting and the CLI | 80 | 6 |

### M02 Core data types (MASTEMY-DESIGN 17%)

- Worked applications: (1) Implement a page-view counter with INCR; (2) Build a leaderboard with a sorted set
- Common misconception addressed: Storing a JSON blob in a string when a hash fits better
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Strings and counters | 80 | 6 |
| M02L02 | Lists, sets and sorted sets | 80 | 6 |
| M02L03 | Hashes | 80 | 6 |

### M03 Expiry and caching (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set a TTL on a cached value; (2) Implement cache-aside for a query
- Common misconception addressed: Caching without any expiry and serving stale data forever
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | TTL and expiration | 80 | 6 |
| M03L02 | The cache-aside pattern | 80 | 6 |
| M03L03 | Eviction policies | 80 | 6 |

### M04 Advanced structures (MASTEMY-DESIGN 17%)

- Worked applications: (1) Append events to a Redis stream; (2) Estimate unique visitors with HyperLogLog
- Common misconception addressed: Using Pub/Sub expecting guaranteed delivery to offline clients
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Streams | 80 | 6 |
| M04L02 | Pub/Sub | 80 | 6 |
| M04L03 | Bitmaps and HyperLogLog | 80 | 6 |

### M05 Persistence and reliability (MASTEMY-DESIGN 16%)

- Worked applications: (1) Enable AOF persistence; (2) Set up a replica of a primary
- Common misconception addressed: Assuming an in-memory store never loses data on restart
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | RDB and AOF persistence | 80 | 6 |
| M05L02 | Replication | 80 | 6 |
| M05L03 | High availability with Sentinel | 80 | 6 |

### M06 Operations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose an eviction policy under memory pressure; (2) Reason about key distribution in a cluster
- Common misconception addressed: Exposing Redis to the internet with no authentication
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Memory management | 80 | 6 |
| M06L02 | Clustering and sharding | 80 | 6 |
| M06L03 | Security and monitoring | 80 | 6 |

## Integrative case

Design a Redis layer for a web app: cache query results with sensible TTLs, build a leaderboard and a counter, choose persistence and replication for reliability, and secure the deployment.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1610-final-protected | 30 | 30 | yes |
| MST-1610-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Redis fundamentals | 5 |
| Core data types | 5 |
| Expiry and caching | 5 |
| Advanced structures | 5 |
| Persistence and reliability | 5 |
| Operations | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1610-Q0001** (single-answer, Select ONE) Which Redis data type is the natural fit for a ranked leaderboard ordered by score?

- A. Sorted set **(key)**  
  _Rationale:_ Correct: a sorted set keeps members ordered by an associated score.
- B. List  
  _Rationale:_ A list preserves insertion order, not ranking by score.
- C. String  
  _Rationale:_ A string stores a single value, not a ranked set.
- D. Hash  
  _Rationale:_ A hash stores field-value pairs, not an ordered ranking.

**MST-1610-Q0002** (single-answer, Select ONE) In the cache-aside pattern, what happens on a cache miss?

- A. The application reads from the database, then stores the result in the cache **(key)**  
  _Rationale:_ Correct: on a miss the app loads from the source and populates the cache for next time.
- B. Redis automatically queries the database  
  _Rationale:_ Redis does not query the database itself in cache-aside.
- C. The request fails  
  _Rationale:_ A miss is handled by falling back to the source, not failing.
- D. The cache is cleared entirely  
  _Rationale:_ A single miss does not clear the whole cache.

**MST-1610-Q0003** (multiple-answer, Select TWO) Which TWO are true about Redis persistence? (Select TWO)

- A. RDB takes point-in-time snapshots of the dataset **(key)**  
  _Rationale:_ Correct: RDB produces compact point-in-time snapshots.
- B. AOF logs write operations for replay on restart **(key)**  
  _Rationale:_ Correct: AOF records write commands and replays them to rebuild state.
- C. Persistence is impossible in Redis  
  _Rationale:_ Redis supports persistence via RDB and AOF.
- D. Enabling AOF guarantees zero data in memory  
  _Rationale:_ AOF concerns durability to disk; data still lives in memory.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
