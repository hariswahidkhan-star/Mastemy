# Amazon ECS and Fargate: Container Application Deployment

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0761` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon ECS Developer Guide; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-ECS (https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon ECS and Fargate: Container Application Deployment (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe ECS clusters, tasks and services
2. Choose between EC2 and Fargate launch types
3. Define task definitions, containers and resources
4. Expose services with load balancers and service discovery
5. Scale services and deploy safely
6. Secure, log and monitor containers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 ECS fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map an app into a task definition and a service; (2) Decide when to run a task vs a long-lived service
- Common misconception addressed: Confusing a task definition with a running task
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Clusters, tasks and services | 80 | 7 |
| M01L02 | Task vs service vs container | 80 | 7 |

### M02 Launch types (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose Fargate vs EC2 for a spiky workload; (2) Right-size task CPU and memory on Fargate
- Common misconception addressed: Assuming Fargate removes all capacity planning
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | EC2 launch type and capacity | 80 | 7 |
| M02L02 | Fargate serverless compute | 80 | 7 |

### M03 Task definitions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Inject a secret via Secrets Manager into a task; (2) Assign a task role with least-privilege access
- Common misconception addressed: Baking credentials into the container image
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Containers, ports and env | 80 | 7 |
| M03L02 | Volumes, secrets and IAM roles | 80 | 7 |

### M04 Networking and discovery (MASTEMY-DESIGN 17%)

- Worked applications: (1) Register a service behind an Application Load Balancer; (2) Enable service-to-service discovery
- Common misconception addressed: Expecting bridge-mode port mappings to work in awsvpc mode
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | awsvpc mode and load balancers | 80 | 7 |
| M04L02 | Service discovery and connect | 80 | 7 |

### M05 Scaling and deployment (MASTEMY-DESIGN 17%)

- Worked applications: (1) Configure target-tracking scaling on CPU; (2) Run a blue/green deployment with CodeDeploy
- Common misconception addressed: Setting desired count manually and ignoring scaling policy conflicts
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Service auto scaling | 80 | 7 |
| M05L02 | Rolling and blue/green deployments | 80 | 7 |

### M06 Security and observability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Send container logs to CloudWatch Logs; (2) Add a health check that drains unhealthy tasks
- Common misconception addressed: Assuming a running container means a healthy application
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | IAM, networking and secrets | 80 | 7 |
| M06L02 | Logs, metrics and health checks | 80 | 7 |

## Integrative case

Deploy a containerised service to Fargate: write a task definition with a least-privilege task role and injected secrets, place the service behind an ALB with awsvpc networking, configure target-tracking auto scaling, run a blue/green deployment, and wire logs and health checks.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0761-final-protected | 40 | 50 | yes |
| MST-0761-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| ECS fundamentals | 7 |
| Launch types | 7 |
| Task definitions | 7 |
| Networking and discovery | 7 |
| Scaling and deployment | 6 |
| Security and observability | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0761-Q0001** (single-answer, Select ONE) What does the Fargate launch type remove the need to manage, compared with the EC2 launch type?

- A. The underlying container host instances **(key)**  
  _Rationale:_ Correct: Fargate runs tasks without you provisioning or patching EC2 hosts.
- B. The task definition  
  _Rationale:_ You still define tasks on Fargate.
- C. The container image  
  _Rationale:_ You still build and supply images.
- D. IAM roles  
  _Rationale:_ IAM roles are still required for tasks.

**MST-0761-Q0002** (single-answer, Select ONE) What is the safest way to give a container access to a database password in ECS?

- A. Reference it from Secrets Manager or SSM Parameter Store in the task definition **(key)**  
  _Rationale:_ Correct: referencing a managed secret avoids embedding credentials in the image.
- B. Hard-code it in the container image  
  _Rationale:_ Baking credentials into an image is insecure and hard to rotate.
- C. Print it to the container logs  
  _Rationale:_ Logging secrets exposes them.
- D. Store it in the task name  
  _Rationale:_ Task names are not a secret store.

**MST-0761-Q0003** (multiple-answer, Select TWO) Which TWO are true when running ECS tasks in awsvpc network mode? (Select TWO.)

- A. Each task gets its own elastic network interface **(key)**  
  _Rationale:_ Correct: awsvpc gives each task a dedicated ENI.
- B. Security groups can be applied at the task level **(key)**  
  _Rationale:_ Correct: tasks can have their own security groups in awsvpc mode.
- C. Tasks must use bridge-mode port mappings  
  _Rationale:_ Bridge mode is a different, incompatible networking mode.
- D. Tasks cannot be placed behind a load balancer  
  _Rationale:_ awsvpc tasks integrate with load balancers.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
