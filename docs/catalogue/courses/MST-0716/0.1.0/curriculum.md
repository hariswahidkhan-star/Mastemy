# Power Platform Application Lifecycle Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0716` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-POWERPLATFORM-ALM (https://learn.microsoft.com/power-platform/alm/overview-alm) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Power Platform Application Lifecycle Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'ALM foundations' to professional tasks
2. Apply the skills of 'Work with solutions' to professional tasks
3. Apply the skills of 'Deploy with Power Platform pipelines' to professional tasks
4. Apply the skills of 'Extend ALM and govern at scale' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 ALM foundations (25%, design assumption)

- Worked applications: (1) Plan a dev/test/prod environment strategy for a solution; (2) Explain why every ALM environment must include Dataverse
- Common misconception addressed: Developing directly in production instead of a dev environment
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What ALM means for low-code | 60 | 6 |
| M01L02 | Environments and Dataverse | 60 | 6 |
| M01L03 | Dev/test/production landing zones | 60 | 6 |
| M01L04 | Why ALM environments need Dataverse | 60 | 6 |
### M02 Work with solutions (25%, design assumption)

- Worked applications: (1) Package apps and flows into an unmanaged solution for transport; (2) Use environment variables so a solution works across environments
- Common misconception addressed: Editing a managed solution's components directly in production
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Solutions as the ALM container | 60 | 6 |
| M02L02 | Managed vs unmanaged solutions | 60 | 6 |
| M02L03 | Components in a solution | 60 | 6 |
| M02L04 | Environment variables and connection references | 60 | 6 |
### M03 Deploy with Power Platform pipelines (25%, design assumption)

- Worked applications: (1) Configure and run a pipeline to deploy a solution to test then prod; (2) Add an approval step before a production deployment
- Common misconception addressed: Trying to deploy to production before the solution reaches test
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pipelines in Power Platform | 60 | 6 |
| M03L02 | Running a pipeline between environments | 60 | 6 |
| M03L03 | Stage order (test before production) | 60 | 6 |
| M03L04 | Approvals and service-principal deployment | 60 | 6 |
### M04 Extend ALM and govern at scale (25%, design assumption)

- Worked applications: (1) Unpack a solution into source control with the Power Platform CLI; (2) Decide between in-product pipelines and Azure DevOps for a scenario
- Common misconception addressed: Treating the exported solution file, not source control, as the source of truth
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Source control as the source of truth | 60 | 6 |
| M04L02 | Power Platform CLI and Build Tools | 60 | 6 |
| M04L03 | GitHub Actions and Azure DevOps | 60 | 6 |
| M04L04 | Managed environments and the deployment hub | 60 | 6 |

## Integrative case

An app team must professionalize delivery: set up dev/test/prod environments, package work into solutions with environment variables and connection references, deploy through Power Platform pipelines with approvals, and store the unpacked solution in source control with CLI/Build Tools for CI/CD.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0716-final-protected | 72 | 72 | yes |
| MST-0716-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| ALM foundations | 18 |
| Work with solutions | 18 |
| Deploy with Power Platform pipelines | 18 |
| Extend ALM and govern at scale | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0716-Q0001** (single-answer, Select ONE) What is the mechanism for moving related Power Platform components between environments in ALM?

- A. A solution **(key)**  
  _Rationale:_ Correct: solutions are the container used to distribute components across environments via export and import.
- B. A single screenshot  
  _Rationale:_ Screenshots do not transport components.
- C. A Power BI report  
  _Rationale:_ A report is content, not an ALM transport container.
- D. A resource lock  
  _Rationale:_ Resource locks are an Azure control, not a Power Platform transport mechanism.
**MST-0716-Q0002** (single-answer, Select ONE) A team wants makers to deploy solutions across environments with minimal setup and built-in CI/CD. Which Power Platform feature fits?

- A. Power Platform pipelines **(key)**  
  _Rationale:_ Correct: pipelines democratize ALM by bringing automated deployment and CI/CD into the service.
- B. Manually emailing the solution file  
  _Rationale:_ Manual email is error-prone and lacks automation and governance.
- C. Deleting the dev environment  
  _Rationale:_ Deleting the dev environment removes the source of the work.
- D. A Fabric capacity  
  _Rationale:_ A Fabric capacity is analytics compute, not a Power Platform deployment tool.
**MST-0716-Q0003** (multiple-answer, Select TWO) Which TWO are ALM best practices in Power Platform? (Select TWO)

- A. Use source control as the source of truth for components **(key)**  
  _Rationale:_ Correct: source control should be the source of truth for storing and collaborating on components.
- B. Use environment variables so configuration can change per environment **(key)**  
  _Rationale:_ Correct: environment variables separate parameters from objects so values change across environments.
- C. Develop and edit solutions directly in production  
  _Rationale:_ Direct production development bypasses healthy ALM and risks instability.
- D. Deploy to production before test  
  _Rationale:_ Pipelines require stages in order; test precedes production.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/power-platform/alm/overview-alm) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
