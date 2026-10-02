# Microsoft PL-900: Power Platform Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0173` v0.1.0 | Batch 1 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | PL-900 |
| Version basis | Skills measured as of 2026-07-24 |
| Evidence | **verified-official-source** - sources: SRC-MS-PL900 |
| Legacy IDs | MST-MIC-MS-PL900-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the business value of Power Platform services including Copilot Studio
2. Describe Dataverse and Power Platform administration and governance
3. Describe how canvas, model-driven and AI-assisted apps are built
4. Describe cloud and desktop flows and how to build them with AI
5. Describe building and managing agents in Copilot Studio

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Describe the business value of Microsoft Power Platform (5-10%)

- Worked applications: (1) Quantify business value of a low-code request app; (2) Map a manual process to Power Platform components
- Common misconception addressed: Believing low-code removes the need for governance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Describe the business value of Microsoft Power Platform services | 92 | 8 |

### M02 Manage the Microsoft Power Platform environment (20-25%)

- Worked applications: (1) Set environments and DLP policies for maker vs production use; (2) Choose Dataverse vs SharePoint lists for the request data
- Common misconception addressed: Assuming every connector is allowed in every environment
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Describe Microsoft Dataverse | 138 | 8 |
| M02L02 | Describe Microsoft Power Platform administration and governance | 139 | 8 |

### M03 Demonstrate the capabilities of Power Apps (20-25%)

- Worked applications: (1) Build a canvas app screen bound to Dataverse (demonstration); (2) Choose canvas vs model-driven app for two scenarios
- Common misconception addressed: Thinking model-driven apps are designed pixel by pixel
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Describe Power Apps capabilities and use cases | 138 | 8 |
| M03L02 | Describe how to build basic apps by using Power Apps | 139 | 8 |

### M04 Demonstrate the capabilities of Power Automate (20-25%)

- Worked applications: (1) Create an approval cloud flow with conditions; (2) Choose a cloud flow vs desktop flow for a legacy system
- Common misconception addressed: Assuming flows run with the end user's permissions in all cases
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Describe Power Automate use cases and capabilities | 138 | 8 |
| M04L02 | Describe how to build basic flows by using Power Automate | 139 | 8 |

### M05 Describe features and capabilities of agents in Microsoft Copilot Studio (20-25%)

- Worked applications: (1) Ground a Copilot Studio agent on policy documents; (2) Add a topic that triggers a flow for escalation
- Common misconception addressed: Believing an agent's answers need no testing once grounded
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Describe how to build agents in Copilot Studio | 138 | 8 |
| M05L02 | Describe how to manage agents in Copilot Studio | 139 | 8 |

## Integrative case

An HR team replaces an email-based leave-request process: build the data in Dataverse, a canvas app, an approval flow and a Copilot Studio agent that answers policy questions.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - length not stated on the fetched study guide.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0173-practice-form-A | 45 | 45 | yes |
| MST-0173-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0173-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0173-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Describe the business value of Microsoft Power Platform | 4 |
| Manage the Microsoft Power Platform environment | 11 |
| Demonstrate the capabilities of Power Apps | 10 |
| Demonstrate the capabilities of Power Automate | 10 |
| Describe features and capabilities of agents in Microsoft Copilot Studio | 10 |

Minimum reviewed item bank: 534 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0173-Q0001** (single-answer, Select ONE) A team needs an app built on top of a Dataverse data model, with forms and views generated from that model. Which app type fits best?

- A. Canvas app  
  _Rationale:_ Canvas apps start from a blank screen layout, not from the data model.
- B. Model-driven app **(key)**  
  _Rationale:_ Correct: model-driven apps generate their UI from Dataverse tables, forms and views.
- C. Desktop flow  
  _Rationale:_ Desktop flows automate legacy UI tasks. They are not apps.
- D. Power Pages site  
  _Rationale:_ Power Pages builds external websites.

**MST-0173-Q0002** (single-answer, Select ONE) Which Power Automate flow type automates clicks in a legacy Windows application with no API?

- A. Cloud flow with a connector trigger  
  _Rationale:_ Cloud flows need connectors or APIs.
- B. Desktop flow **(key)**  
  _Rationale:_ Correct: desktop flows (RPA) automate UI interactions on Windows.
- C. Business process flow  
  _Rationale:_ Business process flows guide users through stages. They do not automate UI.
- D. Scheduled cloud flow  
  _Rationale:_ A schedule is still a cloud flow and cannot drive a desktop UI.

**MST-0173-Q0003** (single-answer, Select ONE) In Copilot Studio, what do you use to define a structured conversation path that triggers on certain user phrases?

- A. Topics **(key)**  
  _Rationale:_ Correct: topics define conversation paths that start from trigger phrases.
- B. Channels  
  _Rationale:_ Channels are where the agent is published.
- C. Environments  
  _Rationale:_ Environments are containers for administration.
- D. Knowledge sources  
  _Rationale:_ Knowledge sources supply grounding content. They do not script a dialogue path.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
