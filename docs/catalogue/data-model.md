# Data Model Mapping (static)

Implements master prompt section 16 for the Mastemy platform (ASP.NET Core/.NET with C#, React with TypeScript, MySQL). This folder holds planning files; the table shows which file feeds which durable relational record when imported. Imports must be idempotent (upsert by stable ID; never duplicate).

| Entity | Source in docs/catalogue | Key |
|---|---|---|
| Course | `catalog/course_catalog.csv` | `course_id` (MST-NNNN) |
| CourseVersion | `courses/<id>/<version>/course_metadata.json` | (`course_id`, `course_version`) |
| CertificationFamily | `issuer` + `course_class` columns | issuer name |
| ExamVersion | `research/exam_versions.csv`, `exam_version_record` in metadata | (`course_id`, `syllabus_edition`) |
| Outcome | `courses/.../outcome_coverage.csv`, `learning_outcomes` in metadata | `outcome_id` |
| SourceDocument | `research/source_register.csv` | `source_id` |
| OutcomeMapping | `outcome_coverage.csv` (outcome -> module/lesson/items/status) | (`outcome_id`, `lesson_id`) |
| Module / Lesson | `courses/.../syllabus.csv` | `module_id`, `lesson_id` |
| YouTubeAsset | `courses/.../youtube_asset_manifest.csv` | `lesson_id` (video ID empty until upload) |
| SupportingMaterial | not yet produced | - |
| Question / QuestionOption / ItemVersion | `assessments/question_bank.json` | `item_id` + `item_version` |
| AssessmentBlueprint / AssessmentForm | `assessments/forms.json` | `form_id` |
| Enrollment, Attempt, Response, Progress | platform runtime only | - |
| Certificate | platform runtime; rules in `certificate-policy.md` | certificate ID |
| Instructor | `instructor_owner` (empty; internal instructors only at launch) | - |
| Review | `pkg_*`, `review_status`, item `reviewer` | - |
| ChangeLog | git history of this folder + course version bumps | - |

Rules: internal answer keys (`correct`, `correct_keys`, rationales) must be served only through instructor/admin APIs, never the learner content API. Questions and forms are versioned so historical results stay interpretable. Browsing filters map to columns: category (`category_no`), issuer, paper/part/level (title + `level`), jurisdiction, exam date (`exam_version`), language, difficulty (`level`), prerequisites, course type (`course_class`), certificate availability (`certificate_type`). Prices and paid budgets are administrator decisions and are not stored here.
