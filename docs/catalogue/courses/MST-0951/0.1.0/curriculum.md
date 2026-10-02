# Neo4j: Graph Databases and Cypher

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0951` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-DAT-SK-NGD-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Neo4j: Graph Databases and Cypher (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Graph data modelling concepts
2. Nodes, relationships and properties
3. Cypher basics: MATCH, WHERE, RETURN
4. Creating and updating data with Cypher
5. Patterns, paths and variable-length traversals
6. Aggregation, ordering and WITH pipelines
7. Indexes, constraints and query performance
8. Graph algorithms, imports and application use

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on query authoring, schema design and live platform operation are not assessed in this format.

## Modules

### M01 Graph data modelling concepts (MASTEMY-DESIGN 13%)

- Worked applications: (1) Decide whether a recommendation feature suits a graph model; (2) Sketch labels and relationship types for a domain
- Common misconception addressed: Forcing a graph problem into join tables and many-to-many bridges
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | When a graph beats a relational model | 120 | 6 |
| M01L02 | Labels, relationship types and properties | 120 | 6 |

### M02 Nodes, relationships and properties (MASTEMY-DESIGN 13%)

- Worked applications: (1) Model users, products and purchases as a graph; (2) Add properties to nodes and relationships
- Common misconception addressed: Confusing a relationship type with a node label
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Designing nodes and relationships | 120 | 6 |
| M02L02 | Modelling a domain as a property graph | 120 | 6 |

### M03 Cypher basics: MATCH, WHERE, RETURN (MASTEMY-DESIGN 12%)

- Worked applications: (1) Match friends-of-friends two hops away; (2) Filter a match by a property with WHERE
- Common misconception addressed: Returning nodes without specifying which properties are needed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Matching nodes and relationships | 120 | 6 |
| M03L02 | Filtering with WHERE and returning results | 120 | 6 |

### M04 Creating and updating data with Cypher (MASTEMY-DESIGN 12%)

- Worked applications: (1) Create a node with MERGE to avoid duplicates; (2) Update a relationship property with SET
- Common misconception addressed: Using CREATE where MERGE is needed and creating duplicate nodes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Creating nodes and relationships | 120 | 6 |
| M04L02 | Updating and deleting with SET, MERGE and DELETE | 120 | 6 |

### M05 Patterns, paths and variable-length traversals (MASTEMY-DESIGN 13%)

- Worked applications: (1) Find all paths up to three hops between two nodes; (2) Compute the shortest path between two people
- Common misconception addressed: Writing an unbounded variable-length path that explodes combinatorially
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Fixed and variable-length path patterns | 120 | 6 |
| M05L02 | Shortest path and traversal depth | 120 | 6 |

### M06 Aggregation, ordering and WITH pipelines (MASTEMY-DESIGN 13%)

- Worked applications: (1) Count recommendations grouped by category; (2) Pipe an aggregate into a second match with WITH
- Common misconception addressed: Dropping needed variables across a WITH boundary
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Aggregating with count, collect and sum | 120 | 6 |
| M06L02 | Chaining query parts with WITH | 120 | 6 |

### M07 Indexes, constraints and query performance (MASTEMY-DESIGN 12%)

- Worked applications: (1) Add a uniqueness constraint on an id; (2) Use PROFILE to see where a query spends time
- Common misconception addressed: Expecting fast lookups without a supporting index or constraint
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Creating indexes and uniqueness constraints | 120 | 6 |
| M07L02 | Profiling a query with PROFILE | 120 | 6 |

### M08 Graph algorithms, imports and application use (MASTEMY-DESIGN 12%)

- Worked applications: (1) Run a PageRank-style algorithm on the graph; (2) Load a CSV and connect from application code
- Common misconception addressed: Importing data row by row instead of using a bulk loader
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Running a centrality or pathfinding algorithm | 120 | 6 |
| M08L02 | Bulk import and using a driver from an application | 120 | 6 |

## Integrative case

Model and query a recommendation graph in Neo4j: design nodes and relationships for users, items and interactions, use MERGE to import without duplicates, write Cypher for friends-of-friends and shortest-path recommendations, add constraints and indexes, and profile the key queries for performance.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0951-final-protected | 40 | 40 | yes |
| MST-0951-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Graph data modelling concepts | 5 |
| Nodes, relationships and properties | 5 |
| Cypher basics: MATCH, WHERE, RETURN | 5 |
| Creating and updating data with Cypher | 5 |
| Patterns, paths and variable-length traversals | 5 |
| Aggregation, ordering and WITH pipelines | 5 |
| Indexes, constraints and query performance | 5 |
| Graph algorithms, imports and application use | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0951-Q0001** (single-answer, Select ONE) In Cypher, why use MERGE instead of CREATE when importing a node that may already exist?

- A. MERGE matches an existing node with the given pattern or creates it if none is found, avoiding duplicates **(key)**  
  _Rationale:_ Correct: MERGE is get-or-create, so repeated imports do not duplicate the node.
- B. MERGE always deletes the node first and recreates it  
  _Rationale:_ MERGE does not delete; it matches or creates.
- C. MERGE runs faster because it skips indexes  
  _Rationale:_ MERGE benefits from indexes; it does not skip them.
- D. MERGE can only be used on relationships, not nodes  
  _Rationale:_ MERGE works on both nodes and relationships.

**MST-0951-Q0002** (multiple-answer, Select ALL that apply) Which statements about property-graph modelling in Neo4j are correct? (Select TWO)

- A. Both nodes and relationships can carry properties **(key)**  
  _Rationale:_ Correct: properties can be stored on nodes and on relationships.
- B. Relationships are first-class and are traversed without computing joins at query time **(key)**  
  _Rationale:_ Correct: relationships are stored directly, so traversals avoid relational-style joins.
- C. A relationship can exist without connecting any nodes  
  _Rationale:_ A relationship always connects a start and an end node.
- D. Labels and relationship types are interchangeable  
  _Rationale:_ Labels classify nodes; relationship types classify relationships; they are not interchangeable.

**MST-0951-Q0003** (single-answer, Select ONE) A variable-length pattern like (a)-[*]->(b) is running extremely slowly. What is the most likely cause?

- A. The path length is unbounded, so the traversal explores an exponentially large number of paths **(key)**  
  _Rationale:_ Correct: an unbounded variable-length path can blow up combinatorially; bounding the depth controls it.
- B. Cypher does not support variable-length paths  
  _Rationale:_ Cypher does support them; the problem is the missing bound.
- C. RETURN clauses always make queries slow  
  _Rationale:_ RETURN itself is not the bottleneck here.
- D. MERGE is implicitly being called on every node  
  _Rationale:_ No MERGE is involved in a MATCH traversal.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
