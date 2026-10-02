# Microsoft Teams: Collaboration and Meeting Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0664` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Teams feature facts (teams, standard/private/shared channels, tabs, files backed by SharePoint, chat and co-authoring, Loop components in chat, meetings and meeting options, recording/transcription/recap, notifications and apps) grounded in official Microsoft documentation read via the Microsoft Learn MCP on 2026-10-02. Feature availability varies by licence and admin policy; confirm against the current client and tenant before production. |
| Official sources | https://learn.microsoft.com/microsoftteams/teams-channels-overview; https://learn.microsoft.com/microsoft-365/loop/loop-components-teams |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-TEAMS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 64 / cumulative 116 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Teams: Collaboration and Meeting Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Structure teams, channels and tabs
2. Collaborate in chat and co-author files
3. Run effective meetings
4. Manage notifications and apps
5. Follow collaboration governance good practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Teams and channels (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Set up a team with channels and tabs for workstreams; (2) Add a file-library tab backed by SharePoint
- Common misconception addressed: Using chat for everything instead of channels for shared, searchable work
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Teams, channels and tabs | 80 | 5 |
| M01L02 | Standard, private and shared channels | 80 | 5 |
| M01L03 | Files and SharePoint backing | 80 | 5 |

### M02 Chat and collaboration (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Co-author a file from within a channel; (2) Share a live Loop component task list in a chat
- Common misconception addressed: Emailing attachments back and forth rather than co-authoring the shared file
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Chat, mentions and reactions | 80 | 5 |
| M02L02 | Co-authoring files | 80 | 5 |
| M02L03 | Loop components in chat | 80 | 5 |

### M03 Meetings (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Configure meeting options and the lobby; (2) Run a meeting with shared notes, recording and recap
- Common misconception addressed: Leaving meeting options at default and exposing the lobby to everyone
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scheduling and meeting options | 80 | 5 |
| M03L02 | In-meeting tools (chat, share, record) | 80 | 5 |
| M03L03 | Notes, transcription and recap | 80 | 5 |

### M04 Governance and good practice (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Tune notifications per channel and set presence; (2) Add an app tab for a team workflow
- Common misconception addressed: Creating overlapping teams with no naming convention or clear ownership
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Notifications and presence | 80 | 5 |
| M04L02 | Apps and integrations | 80 | 5 |
| M04L03 | Naming, lifecycle and etiquette | 80 | 5 |

## Integrative case

A team lead sets up Teams for a new project: channels and tabs for the workstreams, co-authored files, well-configured meetings with a recap, and a sensible notification and naming scheme.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0664-final-protected | 30 | 40 | yes |
| MST-0664-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Teams and channels | 8 |
| Chat and collaboration | 8 |
| Meetings | 7 |
| Governance and good practice | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0664-Q0001** (single-answer, Select ONE) When is a channel preferable to a one-to-one or group chat in Teams?

- A. When the conversation and its files should be shared and searchable by the team **(key)**  
  _Rationale:_ Correct: channels keep shared, searchable, persistent work for the whole team.
- B. When the message must never be seen again  
  _Rationale:_ Channels persist content; they do not hide it.
- C. When you want to avoid storing any files  
  _Rationale:_ Channel files are stored in SharePoint.
- D. Only when the team has exactly two members  
  _Rationale:_ Channels serve teams of any size.

**MST-0664-Q0002** (multiple-answer, Select TWO) Which TWO statements about Teams channels are correct? (Select TWO.)

- A. A private channel restricts membership to a subset of the team **(key)**  
  _Rationale:_ Correct: private channels have their own restricted membership.
- B. A channel's files are stored in SharePoint **(key)**  
  _Rationale:_ Correct: channel files live in the team's SharePoint site.
- C. Every channel is always visible to the whole internet  
  _Rationale:_ Channels are not public to the internet.
- D. Channels cannot contain tabs  
  _Rationale:_ Channels support tabs for apps and files.

**MST-0664-Q0003** (single-answer, Select ONE) Why review meeting options such as the lobby before an external meeting?

- A. To control who can bypass the lobby and who can present **(key)**  
  _Rationale:_ Correct: meeting options govern lobby and presenter roles.
- B. Because meetings cannot start otherwise  
  _Rationale:_ Meetings start regardless; options refine control.
- C. To reduce the file size of the recording  
  _Rationale:_ Options are about access, not file size.
- D. Because the lobby deletes the meeting chat  
  _Rationale:_ The lobby does not delete chat.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
