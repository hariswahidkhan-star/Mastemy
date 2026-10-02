# Assessment and Question-Bank Standard (static)

Implements master prompt sections 9 and 15. Checked by `validate_catalogue.py` on every course package.

## Formats
Only **single-answer MCQ** (exactly one unambiguously best answer) and **multiple-answer selection** with the rule stated in the stem ("Select TWO", "Select THREE" or "Select all that apply"). No essays, coding submissions, uploads, recorded speaking, labs or peer grading are required for a certificate.

## Required item fields (`assessments/question_bank.json`)
`item_id`, `item_version`, `item_type`, `selection_rule`, `stem`, `options[key,text,correct,rationale]`, `correct_keys`, `explanation`, `outcome_refs`, `domain_ref`, `cognitive_level`, `difficulty`, `expected_seconds`, `provenance`, `scoring`, `randomise_options`, `reviewer`, `publication_state`.

## Quality rules
- Every option carries a rationale: why the key is right and why each distractor is wrong.
- Plausible, independent options built from known misconceptions; no grammatical clues, hidden selection rules or trick wording; calculations recomputed.
- Randomisation must preserve option references (letters, ordered values, paired statements).
- Prefer applied scenarios, calculations, interpretation, diagnosis, prioritisation and decisions over rote definitions.
- Original items only. No proprietary, leaked, recalled ("dump") or paid exam questions.
- Items record provenance; AI-drafted items stay `draft-unreviewed` until a qualified reviewer approves them. An AI agent alone cannot establish professional accuracy.

## Scoring
- Multiple-answer default: **all-or-nothing** on the exact key set. A partial-credit scheme is allowed only with published rules, a zero floor and no advantage from selecting every option. None is configured.
- Official scoring rules are cited only when current issuer documentation supports them. Platform scores never predict scaled external scores.

## Bank size and forms
- Bank plan per course = (lesson-check items + module-check items) x 2 alternates + forms x form length. Design ranges from the master prompt: 200-600 reviewed items for substantial skills courses, 600-1,500+ for large certification courses; narrow courses may need fewer. Ranges are planning guides, not proof of quality.
- At least one meaningful assessed application per assessable outcome, with alternates for high-weight outcomes.
- Exam courses: three distinct practice forms (A/B/C, no shared items) plus a protected final pool. Only form A and the final are required and counted in planned time; B and C are optional practice and are not counted.
- Forms match official domain proportions (midpoint of published ranges) where permitted item types allow; otherwise they are labelled "knowledge practice" and the format differences are listed. No psychometric validation, adaptive-testing equivalence or pass prediction is claimed.

## MCQ-only limitation (section 15)
Every course row and package has a visible "What this course assesses / What it does not assess" statement (`mcq_limitation_note`). Gaps are disclosed for IELTS and other language tests (writing/speaking), CPA task-based simulations, CFA Level III constructed responses, ACCA constructed and workspace tasks, CIPS constructed responses, NCLEX clinical-judgment item formats, case-study exams, written bar components and hands-on credentials (RHCSA, RHCE, LFCS, CKA, CKAD, CKS, OSCP). Other task types are taught through video demonstrations and model-answer analysis; they never become hidden certificate prerequisites.
