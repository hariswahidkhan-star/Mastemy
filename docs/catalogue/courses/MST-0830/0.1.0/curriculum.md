# .NET and MySQL: Production Data-Access Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0830` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (Pomelo.EntityFrameworkCore.MySql and MySql.EntityFrameworkCore listed for EF Core 8 and 9 at that time). Re-check provider support for the EF Core version chosen at production; other lessons are Mastemy design. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-EFCORE-PROVIDERS |
| Legacy IDs | none |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — .NET and MySQL: Production Data-Access Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Choose and configure a MySQL EF Core provider in an ASP.NET Core application with secrets handled safely
2. Model entities, keys, indexes and migrations for MySQL and review generated SQL
3. Write efficient LINQ queries and recognise tracking, projection and N+1 issues
4. Use transactions and optimistic concurrency correctly with InnoDB
5. Diagnose performance with indexes and EXPLAIN and operate resilient connections
6. Test against a real MySQL instance and apply least privilege and injection defences

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Provider choice and project setup (MASTEMY-DESIGN 10%, design weight)

- Worked applications: (1) Register a DbContext with a provider and read the connection string from user secrets; (2) Compare the two MySQL providers' maintainers and support
- Common misconception addressed: Hard-coding credentials in appsettings.json for production
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Choosing a MySQL EF Core provider (Pomelo vs Oracle MySql.EntityFrameworkCore) | 72 | 7 |
| M01L02 | Connection strings, secrets and DbContext registration in ASP.NET Core | 72 | 7 |

### M02 Modelling and migrations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map a decimal money column and a UTF-8 text column correctly; (2) Review a migration's SQL before applying it to production
- Common misconception addressed: Applying migrations automatically at app start in production without review
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Entity configuration, keys, indexes and MySQL type mapping | 144 | 7 |
| M02L02 | Migrations workflow: generate, review SQL, apply in CI | 144 | 7 |

### M03 Querying with LINQ (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Fix an N+1 query with Include or projection; (2) Use AsNoTracking for a read-only list endpoint
- Common misconception addressed: Assuming LINQ always produces efficient SQL
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Translating LINQ to SQL: tracking, projection, N+1 | 144 | 7 |
| M03L02 | Raw SQL, stored procedures and when to bypass the ORM | 144 | 7 |

### M04 Transactions and concurrency (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Prevent double enrolment with a unique index plus a transaction; (2) Handle DbUpdateConcurrencyException with a retry policy
- Common misconception addressed: Believing a transaction alone prevents lost updates
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Transactions, isolation levels and InnoDB locking | 108 | 7 |
| M04L02 | Optimistic concurrency tokens and retry strategies | 108 | 7 |

### M05 Performance and operations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Use EXPLAIN to add a composite index for a slow filter; (2) Configure connection resiliency and a health check
- Common misconception addressed: Adding indexes to every column
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Indexing, EXPLAIN and slow-query diagnosis | 144 | 7 |
| M05L02 | Connection pooling, resiliency and health checks | 144 | 7 |

### M06 Testing and security (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Run integration tests against a MySQL container in CI; (2) Replace string-concatenated SQL with parameters
- Common misconception addressed: Relying on the in-memory provider to test MySQL behaviour
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Integration tests against a real MySQL container | 108 | 7 |
| M06L02 | Least-privilege accounts, SQL injection and data protection | 108 | 7 |

## Integrative case

Mastemy-style enrolment service: model courses, enrolments and attempts in MySQL, ship migrations through CI, fix an N+1 query on the dashboard, prevent double enrolment under concurrency, and prove it with integration tests.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0830-final-protected | 40 | 50 | yes |
| MST-0830-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Provider choice and project setup | 4 |
| Modelling and migrations | 8 |
| Querying with LINQ | 8 |
| Transactions and concurrency | 6 |
| Performance and operations | 8 |
| Testing and security | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0830-Q0001** (single-answer, Select ONE) A dashboard loads 50 courses and then runs one query per course to load enrolments. What is the problem and a fix?

- A. N+1 queries; load related data with a projection or Include in a single query **(key)**  
  _Rationale:_ Correct: one query per parent row is the N+1 pattern; projection/Include reduces round trips.
- B. Too few indexes; add an index on every column  
  _Rationale:_ Indexing everything does not remove extra round trips and slows writes.
- C. Connection pool too small; disable pooling  
  _Rationale:_ Disabling pooling makes it slower.
- D. Use the in-memory provider  
  _Rationale:_ That changes test behaviour, not production queries.

**MST-0830-Q0002** (multiple-answer, Select TWO) Which TWO choices reduce SQL-injection risk in EF Core with MySQL? (Select TWO.)

- A. Use LINQ queries or parameterised FromSql with interpolated parameters **(key)**  
  _Rationale:_ Correct: parameters keep data separate from SQL text.
- B. Build SQL strings by concatenating user input  
  _Rationale:_ Concatenation is the classic injection vector.
- C. Connect with a least-privilege database account **(key)**  
  _Rationale:_ Correct: least privilege limits the impact of any injection.
- D. Disable TLS to the database  
  _Rationale:_ TLS protects data in transit; disabling it adds risk.

**MST-0830-Q0003** (single-answer, Select ONE) Why should integration tests run against a real MySQL instance rather than EF Core's in-memory provider?

- A. The in-memory provider does not reproduce relational behaviour such as constraints and SQL translation **(key)**  
  _Rationale:_ Correct: Microsoft notes the in-memory provider is not designed for production use and may not be the best testing solution.
- B. The in-memory provider is slower  
  _Rationale:_ Speed is not the issue.
- C. MySQL cannot run in containers  
  _Rationale:_ It can.
- D. EF Core cannot connect to MySQL  
  _Rationale:_ Two MySQL providers are listed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
