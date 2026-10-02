# Red Hat Certified Specialist in Containers (EX188) Knowledge Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1517` v0.1.0 | Batch 7 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Red Hat (no affiliation or endorsement) |
| Exam code | EX188 |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts NOT verified |
| Legacy IDs | MST-PRG-RH-EX188-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts and durations are **not verified**.

## Learning outcomes

1. Explain container concepts, images and the role of a container engine such as Podman
2. Build, run and manage containers and images from the command line
3. Author Containerfiles/Dockerfiles that produce efficient, reproducible images
4. Manage container storage, networking, registries and multi-container workflows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Container foundations (not published - design grouping)

- Worked applications: (1) Run a web server container, map a port, and confirm it responds, then stop and remove it; (2) Inspect an image's layers and metadata and explain what each layer contributes
- Common misconception addressed: Thinking a container includes its own full operating-system kernel like a VM
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Containers vs virtual machines and core terminology | 100 | 6 |
| M01L02 | Working with a container engine (Podman) basics | 100 | 6 |
| M01L03 | Pulling, inspecting and running images | 100 | 6 |
| M01L04 | Managing container lifecycle and logs | 100 | 6 |

### M02 Building images (not published - design grouping)

- Worked applications: (1) Write a Containerfile for a small app and reduce its image size by reordering layers; (2) Parameterize an image with build args and runtime environment variables
- Common misconception addressed: Putting frequently changing files early in the build so the cache is invalidated every build
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Containerfile instructions and build context | 100 | 6 |
| M02L02 | Layer caching and image size optimization | 100 | 6 |
| M02L03 | Environment variables, entrypoints and commands | 100 | 6 |
| M02L04 | Tagging and versioning images | 100 | 6 |

### M03 Storage, networking and registries (not published - design grouping)

- Worked applications: (1) Attach a named volume so a database keeps its data across container restarts; (2) Push a locally built image to a registry and pull it on a clean host
- Common misconception addressed: Expecting data written inside a container to survive after the container is removed
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Persistent storage with volumes and bind mounts | 100 | 6 |
| M03L02 | Container networking and port publishing | 100 | 6 |
| M03L03 | Pushing to and pulling from image registries | 100 | 6 |
| M03L04 | Running multi-container applications together | 100 | 6 |

## Integrative case

A developer containerizes a two-tier app: build an optimized image, store it in a registry, run the app with a database using a persistent volume, publish its port, and document how a teammate reproduces the setup.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1517-practice-form-A | 45 | 45 | yes |
| MST-1517-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1517-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1517-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| Container foundations | 15 |
| Building images | 15 |
| Storage, networking and registries | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1517-Q0001** (single-answer, Select ONE) Why does a container typically start faster and use fewer resources than a full virtual machine?

- A. It shares the host kernel instead of booting its own **(key)**  
  _Rationale:_ Correct: containers run as isolated processes sharing the host kernel, avoiding a full OS boot.
- B. It compresses the application into a single CPU instruction  
  _Rationale:_ Containers do not reduce an app to one instruction; that is not how they work.
- C. It runs only on read-only hardware  
  _Rationale:_ Hardware mode is unrelated to container startup speed.
- D. It never uses any memory  
  _Rationale:_ Containers use memory; they simply avoid a separate guest OS.

**MST-1517-Q0002** (single-answer, Select ONE) A database container loses all its records every time it is recreated. Which change fixes this?

- A. Attach a persistent volume for the database data directory **(key)**  
  _Rationale:_ Correct: a volume stores data outside the container's writable layer so it survives recreation.
- B. Add more CPU to the container  
  _Rationale:_ CPU allocation does not affect data persistence.
- C. Rename the container on each run  
  _Rationale:_ The name does not preserve the writable layer's data.
- D. Expose an additional port  
  _Rationale:_ Ports affect network access, not data durability.

**MST-1517-Q0003** (multiple-answer, Select TWO) Select TWO practices that reduce the final size of a container image.

- A. Using a minimal base image **(key)**  
  _Rationale:_ Correct: a smaller base image means fewer bytes in every build.
- B. Combining and cleaning up package installs in fewer layers **(key)**  
  _Rationale:_ Correct: removing caches within the same layer keeps them out of the final image.
- C. Copying the entire project including build artifacts and caches  
  _Rationale:_ Copying unneeded files inflates the image.
- D. Adding every optional tool 'just in case'  
  _Rationale:_ Unused tools only increase size and attack surface.
- E. Never tagging images  
  _Rationale:_ Tagging affects identification, not size.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
