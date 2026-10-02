# Mastemy Course Catalogue (v2)

Planning catalogue and curriculum architecture for Mastemy (ASP.NET Core/.NET + React/TypeScript + MySQL; video teaching on YouTube; MCQ and multiple-answer assessment only). **This is planning and specification work. No lesson content, item bank, video or upload exists.**

The 1,300-row Appendix A of the master prompt (MST-0001..MST-1300, 32 categories) is the authoritative backlog. The earlier v1 inventory (1,076 rows with `MST-CAT-FAMILY-SLUG-NNN` IDs) was reconciled into it through an explicit crosswalk rather than kept as a second system.

## Rebuild
`python3 scripts/catalogue/build_catalogue.py` regenerates every generated file and runs `validate_catalogue.py` (non-zero exit on any failed check). Stdlib only, plus `openpyxl` for the XLSX.

Inputs (`scripts/catalogue/`):
- `input/appendix_a.csv`, `input/appendix_b_sources.csv` - parsed from the master prompt by `import_master_prompt.py` (the prompt file itself is not in the repo).
- `input/crosswalk_overrides.csv` - manual v1 -> MST decisions; `input/dedup_decisions.csv` - reviewed dedup decisions.
- `data_catalogue.py` (v1 inventory), `data_sources.py` (sources, retirements), `data_curricula.py` (Batch 1 domain data), `data_packages.py` (package extras + Batch 2), `reconcile.py` (matching), `master_catalogue.py` (build), `validate_catalogue.py` (checks).

## File layout (master prompt section 19, adapted)
| Section 19 path | Here |
|---|---|
| /catalog/course_catalog.csv, .json | `catalog/course_catalog.csv`, `.json`, `.xlsx` (+ `id-crosswalk.csv`, `mst-id-registry.json`, `legacy-id-registry.json`, `legacy-v1-catalogue.csv`) |
| /research/source_register.csv, exam_versions.csv, coverage_gaps.csv | `research/` (+ `retired_exams.csv`) |
| /courses/{id}/{version}/course_metadata.json, syllabus.csv, outcome_coverage.csv | `courses/<MST-ID>/0.1.0/` for the 20 specified courses |
| .../assessments/question_bank.json, forms.json | `courses/<MST-ID>/0.1.0/assessments/` (bank plan + draft samples only) |
| .../youtube_asset_manifest.csv, qa_report.md | same folder (planned rows; no video IDs) |
| .../lessons/{lesson_id}/script.md, storyboard.csv, notes.md, captions.vtt | **not created** - no scripts exist yet; created at Authoring |
| /operations/production_manifest.json, unresolved_issues.csv | `operations/` |
| (extra) human-readable spec | `courses/<MST-ID>/0.1.0/curriculum.md` |

Removed in v2: `catalogue.csv/.json/.xlsx`, `source-register.csv`, `retired-exams.csv`, `curricula/*.md` (replaced by the paths above); `id-registry.json` moved to `catalog/legacy-id-registry.json`.

## Reports and standards
- `dedup-report.md` - reconciliation and semantic dedup, distinct counts. `coverage-gaps.md` - gap register.
- `qa-report.md` - automated checks; `progress-ledger.md` - inventory vs full-curriculum-spec vs produced.
- Standards (static): `learning-design-standard.md` (80/20), `assessment-blueprint-standard.md` (items, scoring, MCQ limits), `certificate-policy.md`, `quality-gates.md`, `data-model.md`, `data-dictionary.md`, `production-roadmap.md`.
- `pathways.json` / `pathways.md` - v1 pathways re-keyed to MST IDs.

## Honesty rules
- `verified-official-source` only when the official page was read in the recorded session; `vendor-docs-partial` when official docs support some claims only. Everything else is labelled unverified or n/a.
- Exam codes are blank rather than guessed; generic "certification-track" rows carry `exam_resolution_required = yes`.
- Appendix B anchors are recorded as user-supplied and not re-verified unless a session source says otherwise.
- Many issuer sites (ACCA, AICPA, IIA, ISACA, PMI, CFA Institute, NCSBN, Cursor, AWS, CompTIA, Google Cloud) were blocked by the session egress proxy; this is recorded in the source register.
