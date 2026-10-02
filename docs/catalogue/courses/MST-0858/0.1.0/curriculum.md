# Java Build Engineering with Maven and Gradle

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0858` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Java Build Engineering with Maven and Gradle (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Maven build lifecycle, coordinates and the POM
2. Manage dependencies, scopes and repositories across a build
3. Model a Gradle build as a directed task graph
4. Build reproducible multi-module projects with caching

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Maven fundamentals and the build lifecycle (MASTEMY-DESIGN 25%)

- Worked applications: (1) Trace which plugin goals bind to the package phase; (2) Resolve a version conflict with the dependency tree
- Common misconception addressed: Thinking mvn compile runs tests because they come later in the lifecycle
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | POM structure and coordinates | 120 | 7 |
| M01L02 | Lifecycle phases and plugin goals | 120 | 7 |

### M02 Dependency management and repositories (MASTEMY-DESIGN 25%)

- Worked applications: (1) Pin transitive versions with a BOM import; (2) Exclude a conflicting transitive dependency
- Common misconception addressed: Believing provided scope dependencies are packaged into the artifact
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Scopes, transitivity and conflict mediation | 120 | 7 |
| M02L02 | Repositories, BOMs and dependencyManagement | 120 | 7 |

### M03 Gradle fundamentals and the task graph (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write a custom task that depends on compileJava; (2) Use the wrapper to pin a reproducible Gradle version
- Common misconception addressed: Assuming task code in the build script runs at execution time rather than configuration time
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Projects, tasks and the configuration/execution phases | 120 | 7 |
| M03L02 | Dependency configurations and the Gradle wrapper | 120 | 7 |

### M04 Reproducible and multi-module builds (MASTEMY-DESIGN 25%)

- Worked applications: (1) Split a monolith into aggregator and library modules; (2) Enable the build cache to skip up-to-date tasks
- Common misconception addressed: Expecting SNAPSHOT dependencies to give reproducible builds
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Multi-module aggregation and build portability | 120 | 7 |
| M04L02 | Build caching, reproducibility and CI integration | 120 | 7 |

## Integrative case

Stand up a two-module Java service (api + core) with Maven, then port it to Gradle: define coordinates, pin transitive versions with a BOM, add a custom packaging task, and enable caching so unchanged modules are skipped in CI.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0858-final-protected | 40 | 48 | yes |
| MST-0858-final-alternate | 40 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Maven fundamentals and the build lifecycle | 10 |
| Dependency management and repositories | 10 |
| Gradle fundamentals and the task graph | 10 |
| Reproducible and multi-module builds | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0858-Q0001** (single-answer, Select ONE) In Maven, which dependency scope means the dependency is available at compile time but is expected to be provided by the runtime container and is NOT packaged?

- A. provided **(key)**  
  _Rationale:_ Correct: provided dependencies are on the compile classpath but not bundled; the container supplies them.
- B. compile  
  _Rationale:_ compile is the default and IS packaged into the artifact.
- C. runtime  
  _Rationale:_ runtime dependencies are packaged; they just are not needed at compile time.
- D. import  
  _Rationale:_ import applies only to dependencyManagement BOMs, not to a normal dependency at runtime.

**MST-0858-Q0002** (multiple-answer, Select TWO) Which TWO statements about the Gradle build correctly distinguish the configuration phase from the execution phase? (Select TWO.)

- A. Code in a task's doLast block runs during the execution phase **(key)**  
  _Rationale:_ Correct: doLast/doFirst actions run at execution.
- B. Top-level code in build.gradle runs during the configuration phase **(key)**  
  _Rationale:_ Correct: the build script body is evaluated while the task graph is configured.
- C. The configuration phase runs only the tasks requested on the command line  
  _Rationale:_ All projects are configured regardless of which tasks were requested (without configuration avoidance).
- D. Execution happens before configuration  
  _Rationale:_ Configuration always precedes execution.

**MST-0858-Q0003** (single-answer, Select ONE) A build must produce byte-for-byte identical artifacts across machines. Which practice most undermines that goal?

- A. Depending on a SNAPSHOT version **(key)**  
  _Rationale:_ Correct: SNAPSHOT resolves to the latest build and changes over time, so outputs are not reproducible.
- B. Using the Gradle wrapper  
  _Rationale:_ The wrapper pins the Gradle version, which helps reproducibility.
- C. Importing a BOM to fix versions  
  _Rationale:_ A BOM fixes versions, aiding reproducibility.
- D. Enabling the build cache  
  _Rationale:_ The cache reuses identical outputs; it does not make them differ.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
