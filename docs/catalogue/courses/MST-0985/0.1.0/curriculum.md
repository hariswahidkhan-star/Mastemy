# Docker: Containerization from Development to Production

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0985` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-PRG-SK-DF-002 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Docker: Containerization from Development to Production (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Containers and images
2. Building images
3. Data and configuration
4. Networking
5. Compose and multi-service apps
6. Production readiness

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Containers and images (MASTEMY-DESIGN 17%)

- Worked applications: (1) Run a container, inspect it, and clean it up; (2) Pull, tag and push an image to a registry
- Common misconception addressed: Thinking a container keeps its filesystem changes after removal
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why containers; images vs containers | 80 | 6 |
| M01L02 | Running and managing containers | 80 | 6 |
| M01L03 | Image layers and the registry | 80 | 6 |

### M02 Building images (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a Dockerfile that leverages layer caching; (2) Shrink an image with a multi-stage build
- Common misconception addressed: Copying the whole repo and busting the build cache every time
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Dockerfile instructions | 80 | 6 |
| M02L02 | Build context and caching | 80 | 6 |
| M02L03 | Multi-stage builds | 80 | 6 |

### M03 Data and configuration (MASTEMY-DESIGN 16%)

- Worked applications: (1) Persist database data with a named volume; (2) Inject configuration through environment variables
- Common misconception addressed: Baking secrets into an image layer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Volumes and bind mounts | 80 | 6 |
| M03L02 | Environment variables and config | 80 | 6 |
| M03L03 | Secrets handling | 80 | 6 |

### M04 Networking (MASTEMY-DESIGN 16%)

- Worked applications: (1) Publish a service port and reach it from the host; (2) Connect two containers on a user-defined network
- Common misconception addressed: Assuming containers can reach each other by default with no network
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Container networking model | 80 | 6 |
| M04L02 | Published ports | 80 | 6 |
| M04L03 | User-defined networks | 80 | 6 |

### M05 Compose and multi-service apps (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define a web plus database stack in Compose; (2) Add a healthcheck and depends_on condition
- Common misconception addressed: Relying on depends_on alone to guarantee readiness
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Compose file structure | 80 | 6 |
| M05L02 | Services, dependencies and healthchecks | 80 | 6 |
| M05L03 | Local development workflows | 80 | 6 |

### M06 Production readiness (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set memory and CPU limits on a container; (2) Run as a non-root user in the image
- Common misconception addressed: Running production containers as root by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Image size and security | 80 | 6 |
| M06L02 | Logging and resource limits | 80 | 6 |
| M06L03 | Image scanning and best practices | 80 | 6 |

## Integrative case

Containerize a small web service with Docker: write an efficient multi-stage Dockerfile, manage images and volumes, connect services with Compose, handle configuration and secrets, and prepare an image for production.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0985-final-protected | 30 | 30 | yes |
| MST-0985-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Containers and images | 5 |
| Building images | 5 |
| Data and configuration | 5 |
| Networking | 5 |
| Compose and multi-service apps | 5 |
| Production readiness | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0985-Q0001** (single-answer, Select ONE) You removed a running container that had written files to its writable layer. What happens to those files?

- A. They are lost unless they were stored in a volume or bind mount **(key)**  
  _Rationale:_ Correct: the container writable layer is discarded on removal; durable data needs a volume.
- B. They are automatically committed to the base image  
  _Rationale:_ Removing a container does not alter the image.
- C. They move to the host home directory  
  _Rationale:_ Nothing is relocated to the host unless a mount was used.
- D. They are pushed to the registry  
  _Rationale:_ Removal does not push anything to a registry.

**MST-0985-Q0002** (single-answer, Select ONE) What is the main benefit of a multi-stage Docker build?

- A. Build artifacts are produced in one stage and only the needed output is copied into a small final image **(key)**  
  _Rationale:_ Correct: multi-stage builds keep build tooling out of the final image, shrinking it.
- B. It lets a container run as root more safely  
  _Rationale:_ Multi-stage builds are about image contents, not privilege.
- C. It removes the need for a registry  
  _Rationale:_ Registries are still used to store and share images.
- D. It disables layer caching  
  _Rationale:_ Multi-stage builds still use layer caching.

**MST-0985-Q0003** (multiple-answer, Select TWO) Which TWO practices improve Docker image security or size? (Select TWO)

- A. Running the container process as a non-root user **(key)**  
  _Rationale:_ Correct: dropping root limits the blast radius of a compromise.
- B. Using a minimal base image and multi-stage builds **(key)**  
  _Rationale:_ Correct: smaller images reduce attack surface and size.
- C. Embedding long-lived secrets directly in image layers  
  _Rationale:_ Secrets in layers persist and leak with the image.
- D. Always running the latest tag without pinning  
  _Rationale:_ Unpinned tags make builds unpredictable and can pull vulnerable images.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
