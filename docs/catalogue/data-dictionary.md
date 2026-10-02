# Data Dictionary - Master Catalogue (static)

| Field | Type | Allowed values / rule |
|---|---|---|
| course_id | string | `MST-CAT-FAMILY-SLUG-NNN`; unique; never reused (see id-registry.json) |
| title | string | Unique after normalisation (case and punctuation ignored) |
| category | enum | AI, MIC, GCP, AWS, PRG, DAT, CYB, FIN, PMB, HLT, ENG, BUS, LNG, CRE |
| category_name | string | Display name of the category |
| subcategory | string | Family or topic grouping |
| level | enum | foundation, intermediate, advanced |
| course_type | enum | certification-prep, skills, foundation |
| awarding_body | string | Exam owner, or "Mastemy (no external awarding body)" |
| official_exam_code | string | Code as published by the awarding body; blank if not confirmed |
| exam_status | enum | current (verified this session), retiring (retirement date reported), unknown, n/a (no exam) |
| prerequisites | string | Recommended prior course_id (from pathways) or "none" |
| est_learner_hours | number | Total learner time including assessment |
| assessment_hours | number | Exactly 20% of est_learner_hours (rounded to 0.1) |
| practice_exams_required | int | 3 or more for certification-prep; 1 final assessment for skills/foundation |
| question_formats | enum list | `mcq|multiple-response` only |
| pathway_ids | list (`|`) | IDs from pathways.json |
| priority_wave | int 1-5 | 1 = Batch 1; 2 = foundation/intermediate cert-prep; 3 = advanced cert-prep; 4 = foundation skills; 5 = other skills |
| curriculum_status | enum | inventory, blueprint, full-curriculum |
| verification_status | enum | verified-official-source, unverified-needs-official-check, n/a-no-official-syllabus |
| verified_on | date | Session date only when verified-official-source; otherwise blank |
| source_ids | list | IDs in source-register.csv (may point to secondary evidence for unverified rows) |
| youtube_playlist_id | string | Blank until production |
| caption_langs | list | ISO 639-1 codes; `en` at launch |
| content_version | semver | 0.1.0 at inventory stage |
| instructor_owner | string | Blank until assigned |
| approval_status | enum | draft, sme-reviewed, approved, published (all draft now) |
| certificate_type | enum | mastemy-completion-certificate |
| disclaimer_id | enum | DISC-CERTPREP-01, DISC-GENERAL-01 (see certificate-policy.md) |
| assessment_note | string | Limits of MCQ-only coverage (productive skills, simulations, labs) or retirement notes |

## source-register.csv
source_id, family, url, publisher, source_type (official / official (not retrieved) / secondary), method (official-fetch / search-snippet), accessed_on, finding.
