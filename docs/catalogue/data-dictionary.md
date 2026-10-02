# Data Dictionary - `catalog/course_catalog.csv` (static)

One row per candidate course. Section letters refer to master prompt section 8.

| Field | Rule |
|---|---|
| course_id | `MST-NNNN`. MST-0001..MST-1300 = Appendix A (unchanged); MST-1301+ = v1 additions. Recorded in `catalog/mst-id-registry.json`; never reused or silently retired |
| course_version | semver of the course version (0.1.0 = planning) |
| working_title / publication_title | Appendix A or v1 title; publication title empty until approved |
| origin | `appendix-a` or `legacy-addition` |
| category_no / category_name | One of the 32 Appendix A categories |
| course_class | Section 3: `independent-certification-exam-prep`, `licensing-examination-knowledge-prep`, `vendor-platform-skills`, `general-professional-skills`, `integrated-workflow-skills` |
| level | foundation / intermediate / advanced (derived; confirm at blueprint) |
| learner_persona, target_role, prerequisites, language, jurisdiction, tool_licences, scope_boundary | A. identity fields; derived defaults until blueprint review |
| issuer | Issuing body for exam rows; "Mastemy (no external awarding body)" otherwise |
| official_exam_code | Issuer code when known; blank rather than guessed |
| exam_version | Edition/skills-measured date for specified courses; `unresolved` otherwise; `n/a` for skills |
| exam_status | current (verified) / retiring ... / retired / unknown / n/a |
| exam_resolution_required | `yes` when the exact exam/version must be resolved before Source verification (generic certification-track titles, unverified rows without a code) |
| credential_disclaimer_id | DISC-CERTPREP-02, DISC-REGULATED-02 or DISC-SKILLS-02 (`certificate-policy.md`) |
| planned_hours, planned_total_minutes (T), instruction_minutes (I), assessment_minutes (A) | `learning-design-standard.md`: I = round-half-up(0.8T), A = T - I |
| lesson_check_minutes, module_assessment_minutes, cumulative_assessment_minutes | Default 5% / 7% / remainder of T; course packages may adjust within A |
| duration_basis | Where the hours came from (design assumption, v1 estimate or curriculum spec) |
| question_formats | `single-answer-mcq|multiple-answer-selection` only |
| multiple_answer_scoring | `all-or-nothing` |
| practice_forms_planned | 3 practice forms for exam rows (+ protected final), 1 final for skills |
| mcq_limitation_note | Section 15 "does not assess" statement |
| certificate_type, certificate_wording, completion_rule_id | Section 10; `CR-DEFAULT-75-80` |
| verification_status | `verified-official-source` (official page read this session), `vendor-docs-partial` (official docs for some claims), `unverified-needs-official-check`, `n/a-no-official-syllabus` |
| verified_on, source_ids | Date and `research/source_register.csv` IDs; verified_on empty unless verified |
| workflow_state | Section 16 states (Candidate ... Published, Update required, Retired, Blocked) |
| curriculum_depth | `inventory` or `full-curriculum-spec` (no course is `produced`) |
| priority_batch | 1 / 2 = specified batches; 3 = section 18 priority families; 4 = other exam prep; 5 = other skills |
| pkg_a_identity .. pkg_h_qa | Status of the section 8 A-H package elements |
| dedup_status, dedup_partner | distinct, content-reuse, differentiation-review, overlap-review, thin-scope-review, needs-version-check, duplicate-of, module-of, retiring-blocked, retired-excluded (`dedup-report.md`) |
| counted_distinct_inclusive / counted_distinct_strict | Whether the row counts toward the distinct-course totals |
| legacy_course_ids / merged_legacy_ids | v1 IDs mapped to / merged into this row (`catalog/id-crosswalk.csv`) |
| pathway_ids | Pathways containing the course (`pathways.json`) |
| youtube_playlist_id, caption_langs, instructor_owner, approval_status | Governance; empty / `en` / empty / `draft` until production |

## Other registers
- `catalog/id-crosswalk.csv`: legacy_course_id, legacy_title, action (mapped / merged-duplicate / addition / retired-excluded), mst_id, similarity, method, note.
- `research/source_register.csv`: source_id, family, url, publisher, source_type, method (official-fetch / official-search-excerpt / search-snippet / not re-checked), accessed_on, finding, origin.
- `research/exam_versions.csv`: one record per exam-prep row (section 4 fields; unknown values stated, never invented).
- `research/coverage_gaps.csv`, `operations/unresolved_issues.csv`, `operations/production_manifest.json`.
