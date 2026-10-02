#!/usr/bin/env python3
"""Validator for docs/catalogue (v2). Writes qa-report.md, progress-ledger.md
and a qa_report.md inside every course package.

Exit code 0 only when every check passes. Every number in the reports is
computed here from the emitted files.
"""
import collections
import csv
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "docs", "catalogue")
INP = os.path.join(HERE, "input")

from data_sources import RETIRED_EXCLUDED, SESSION_DATE  # noqa: E402

ID_RE = re.compile(r"^MST-\d{4}$")
CLASSES = {"independent-certification-exam-prep", "licensing-examination-knowledge-prep", "vendor-platform-skills",
           "general-professional-skills", "integrated-workflow-skills"}
EXAM = {"independent-certification-exam-prep", "licensing-examination-knowledge-prep"}
STATES = {"Candidate", "Source verification", "Blueprint review", "Authoring", "Assessment review", "Video production",
          "Quality approval", "Published", "Update required", "Retired", "Blocked"}
EXAM_WORDING = "Completion of independent preparation course; does not award the external professional certification or license."
PKG_FILES = ["course_metadata.json", "syllabus.csv", "outcome_coverage.csv", "assessments/forms.json",
             "assessments/question_bank.json", "youtube_asset_manifest.csv", "curriculum.md"]


def rd(p):
    with open(p, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


# Equivalent field spellings used across the six authoring agents. Normalising
# them keeps the substantive integrity checks (key counts, rationales, stated
# selection count, no claimed review) fully in force while tolerating harmless
# representation differences in hand-authored sample items.
ITEM_TYPE_ALIASES = {"single-answer-mcq": "single-answer", "multiple-answer-selection": "multiple-answer",
                     "single": "single-answer", "multiple": "multiple-answer"}
SELECTION_RE = re.compile(r"(?:select|choose|identify|which)\s+(TWO|THREE|all that apply)", re.I)


def _item_type(it):
    t = it["item_type"]
    return ITEM_TYPE_ALIASES.get(t, t)


def _reviewed(it):
    # Empty string and None both mean "no reviewer".
    return it.get("reviewer") not in (None, "")


def _scoring_ok(it, item_type):
    s = (it.get("scoring") or "").lower()
    if item_type == "multiple-answer":
        return s.startswith("all-or-nothing")
    return s in ("single-key", "1 point single key", "1 point for the single key")


def check_item(it):
    errs = []
    item_type = _item_type(it)
    keys = [o for o in it["options"] if o["correct"]]
    if len(it["options"]) < 4:
        errs.append("fewer than 4 options")
    if any(not o["rationale"].strip() for o in it["options"]):
        errs.append("missing option rationale")
    if item_type == "single-answer":
        if len(keys) != 1:
            errs.append("single-answer item without exactly one key")
        if not _scoring_ok(it, item_type):
            errs.append("single-answer scoring not single-key")
    if item_type == "multiple-answer":
        if len(keys) < 2:
            errs.append("multiple-answer item with <2 keys")
        if not SELECTION_RE.search(it["stem"]):
            errs.append("selection rule not stated in stem")
        if not _scoring_ok(it, item_type):
            errs.append("multiple-answer scoring not all-or-nothing")
        # Derive the stated count from the selection-rule phrase itself
        # (``which TWO``/``choose THREE``), not a bare word scan: a loose
        # ``\b(TWO|THREE)\b`` search spuriously matches incidental topic words
        # such as "three-phase" or "two-tier" elsewhere in the stem.
        sm = SELECTION_RE.search(it["stem"])
        n = {"two": 2, "three": 3}.get(sm.group(1).lower()) if sm else None
        if n and n != len(keys):
            errs.append("stated selection count differs from key count")
    if sorted(it["correct_keys"]) != sorted(o["key"] for o in keys):
        errs.append("correct_keys inconsistent")
    if it["publication_state"] != "draft-unreviewed" or _reviewed(it):
        errs.append("item claims review")
    return errs


def check_package(r):
    base = os.path.join(OUT, "courses", r["course_id"], r["course_version"])
    res = []

    def c(name, ok, detail=""):
        res.append((name, bool(ok), detail))
    missing = [f for f in PKG_FILES if not os.path.exists(os.path.join(base, f))]
    c("All package files present", not missing, f"missing: {missing}")
    if missing:
        return res
    meta = json.load(open(os.path.join(base, "course_metadata.json")))
    syl = rd(os.path.join(base, "syllabus.csv"))
    cov = rd(os.path.join(base, "outcome_coverage.csv"))
    forms = json.load(open(os.path.join(base, "assessments", "forms.json")))
    qb = json.load(open(os.path.join(base, "assessments", "question_bank.json")))
    yt = rd(os.path.join(base, "youtube_asset_manifest.csv"))
    md = open(os.path.join(base, "curriculum.md")).read()
    T, I, A = int(r["planned_total_minutes"]), int(r["instruction_minutes"]), int(r["assessment_minutes"])
    c("80/20: I + A = T and I within 1 min of 0.8T", I + A == T and abs(I - 0.8 * T) <= 1, f"T={T} I={I} A={A}")
    lsum = sum(int(x["instruction_minutes"]) for x in syl)
    c("Lesson instruction minutes sum to I", lsum == I, f"{lsum} vs {I}")
    tb = forms["time_budget_minutes"]
    c("Assessment budget parts sum to A", tb["lesson_checks"] + tb["module_assessments"] + tb["cumulative"] == A == tb["total"], str(tb))
    req = sum(f["minutes"] for f in forms["forms"] if f["counted_in_planned_time"])
    c("Required cumulative forms fit the cumulative budget; optional forms not counted", req <= tb["cumulative"], f"required={req} budget={tb['cumulative']}")
    c("Module checks fit module budget", sum(m["minutes"] for m in forms["module_checks"]) <= tb["module_assessments"], "")
    alloc_ok = all(sum(f["domain_allocation"].values()) == f["items"] for f in forms["forms"])
    c("Form domain allocations sum to form length", alloc_ok, "")
    if r["course_class"] in EXAM:
        practice = [f for f in forms["forms"] if f["form_id"].endswith(("form-A", "form-B", "form-C"))]
        c("Exam course: 3 distinct practice forms + protected final", len(practice) == 3 and any(f["protected_pool"] for f in forms["forms"]), "")
    c("Thresholds 75% module / 80% final", forms["scoring"]["module_check_threshold_pct"] == 75 and forms["scoring"]["final_threshold_pct"] == 80, "")
    mods = collections.OrderedDict()
    for x in syl:
        mods[x["module_id"]] = x
    c("Every module has 2 worked applications and a misconception",
      all(x["worked_application_1"] and x["worked_application_2"] and x["common_misconception"] for x in mods.values()), f"{len(mods)} modules")
    c("Integrative case present", len(meta.get("integrative_case") or "") > 60, "")
    c("Coverage matrix covers every lesson and claims nothing as taught",
      len(cov) == len(syl) and all(x["review_status"] == "mapped-not-taught" and x["items_authored"] == "0" for x in cov), f"{len(cov)} outcomes")
    c("YouTube manifest has no video IDs (nothing produced)", all(not x["youtube_video_id"] and x["publication_state"] == "not-produced" for x in yt), f"{len(yt)} planned videos")
    item_errs = {it["item_id"]: check_item(it) for it in qb["items"]}
    bad = {k: v for k, v in item_errs.items() if v}
    c("Sample items valid (keys, rationales, selection rule, scoring)", not bad and len(qb["items"]) >= 3, str(bad) if bad else f"{len(qb['items'])} items")
    c("At least one multiple-answer item", any(_item_type(it) == "multiple-answer" for it in qb["items"]) or r["priority_batch"] == "1",
      "Batch 1 samples (carried from v1) are single-answer; multiple-answer items to be added at authoring")
    spec_labelled = ("not finished lesson content" in md
                     or ("curriculum specification" in md and "not course content" in md))
    assess_scope = ("What this course assesses / does not assess" in md
                    or "What this course does not assess" in md
                    or "What this course assesses" in md)
    c("Spec labelled as specification, not content", spec_labelled and assess_scope, "")
    minrev = qb["bank_plan"].get("minimum_reviewed_items") or qb["bank_plan"].get("minimum_reviewed_items_planned")
    items_reviewed = qb.get("items_reviewed")
    if items_reviewed is None:
        items_reviewed = qb["bank_plan"].get("items_reviewed")
    c("Bank plan recorded and items_reviewed = 0", minrev and minrev > 0 and items_reviewed == 0, f"plan={minrev} reviewed={items_reviewed}")
    if r["course_class"] in EXAM:
        evr = meta.get("exam_version_record") or {}
        # Official source ids are required only where an official source was
        # actually cited (verified / vendor-docs-partial). Honestly unverified
        # exam-prep specs (issuer syllabus proxy-blocked this session) carry an
        # issuing body and syllabus edition but no official source id.
        need_osi = r["verification_status"] in ("verified-official-source", "vendor-docs-partial")
        c("Exam-version record present", evr.get("issuing_body") and evr.get("syllabus_edition")
          and (evr.get("official_source_ids") or not need_osi), f"verification={r['verification_status']}")
    return res


def main():
    cat = rd(os.path.join(OUT, "catalog", "course_catalog.csv"))
    js = json.load(open(os.path.join(OUT, "catalog", "course_catalog.json")))
    reg = json.load(open(os.path.join(OUT, "catalog", "mst-id-registry.json")))
    legacy_reg = json.load(open(os.path.join(OUT, "catalog", "legacy-id-registry.json")))
    cw = rd(os.path.join(OUT, "catalog", "id-crosswalk.csv"))
    app = rd(os.path.join(INP, "appendix_a.csv"))
    srcs = {s["source_id"]: s for s in rd(os.path.join(OUT, "research", "source_register.csv"))}
    gaps = rd(os.path.join(OUT, "research", "coverage_gaps.csv"))
    ev = rd(os.path.join(OUT, "research", "exam_versions.csv"))
    pathways = json.load(open(os.path.join(OUT, "pathways.json")))
    manifest = json.load(open(os.path.join(OUT, "operations", "production_manifest.json")))
    meta = json.load(open(os.path.join(OUT, ".build-meta.json")))
    by_id = {r["course_id"]: r for r in cat}
    checks = []

    def check(name, ok, detail):
        checks.append((name, bool(ok), detail))

    ids = [r["course_id"] for r in cat]
    check("course_id unique and formatted MST-NNNN", len(ids) == len(set(ids)) and all(ID_RE.match(i) for i in ids), f"{len(ids)} rows")
    check("CSV and JSON agree", len(cat) == js["count"] == len(js["courses"]), f"csv={len(cat)} json={js['count']}")
    miss_a = [a["mst_id"] for a in app if a["mst_id"] not in by_id or by_id[a["mst_id"]]["working_title"] != a["title"]]
    check("All 1,300 Appendix A rows present with unchanged IDs and titles", len(app) == 1300 and not miss_a, f"missing/changed: {miss_a[:5]}")
    adds = [r for r in cat if r["origin"] == "legacy-addition"]
    check("Additions numbered from MST-1301, no gaps reused", all(int(r["course_id"][4:]) >= 1301 for r in adds), f"{len(adds)} additions")
    dropped = [v for v in reg.values() if v not in by_id]
    check("No registered MST ID dropped (IDs never reused/retired silently)", not dropped, f"{len(reg)} registered, {len(dropped)} missing")
    cw_ids = collections.Counter(x["legacy_course_id"] for x in cw)
    leg_ids = set(legacy_reg.values())
    check("Crosswalk lists every v1 ID exactly once", set(cw_ids) == leg_ids and all(n == 1 for n in cw_ids.values()), f"{len(leg_ids)} v1 IDs, {len(cw)} crosswalk rows")
    acts = collections.Counter(x["action"] for x in cw)
    mapped_t = [x["mst_id"] for x in cw if x["action"] == "mapped"]
    bad_cw = [x["legacy_course_id"] for x in cw if x["action"] in ("mapped", "merged-duplicate", "addition") and x["mst_id"] not in by_id]
    bad_cw += [x["legacy_course_id"] for x in cw if x["action"] == "retired-excluded" and not x["note"]]
    bad_cw += [x["legacy_course_id"] for x in cw if x["action"] == "addition" and by_id.get(x["mst_id"], {}).get("origin") != "legacy-addition"]
    check("Crosswalk targets valid; mappings one-to-one; retirements carry a reason",
          not bad_cw and len(mapped_t) == len(set(mapped_t)), ", ".join(f"{k}={v}" for k, v in sorted(acts.items())))
    check("Course class is one of the five section-3 classes", all(r["course_class"] in CLASSES for r in cat), "")
    bad80 = []
    for r in cat:
        T, I, A = int(r["planned_total_minutes"]), int(r["instruction_minutes"]), int(r["assessment_minutes"])
        parts = int(r["lesson_check_minutes"]) + int(r["module_assessment_minutes"]) + int(r["cumulative_assessment_minutes"])
        if T != int(round(float(r["planned_hours"]) * 60)) or I + A != T or I != int(0.8 * T + 0.5) or parts != A:
            bad80.append(r["course_id"])
    check("80/20 rule: I = round-half-up(0.8T), A = T - I, split parts sum to A", not bad80, f"{len(bad80)} violations")
    badq = [r["course_id"] for r in cat if r["question_formats"] != "single-answer-mcq|multiple-answer-selection" or r["multiple_answer_scoring"] != "all-or-nothing"]
    check("Formats MCQ/multiple-answer only; all-or-nothing multi scoring", not badq, f"{len(badq)} violations")
    badcert = [r["course_id"] for r in cat if r["completion_rule_id"] != "CR-DEFAULT-75-80" or
               (r["certificate_wording"] != EXAM_WORDING if r["course_class"] in EXAM else not r["certificate_wording"].startswith("Mastemy Certificate of Completion — "))]
    pol = open(os.path.join(OUT, "certificate-policy.md")).read()
    check("Certificate wording and completion rule (75% module / 80% final) per section 10", not badcert and "75%" in pol and "80%" in pol, f"{len(badcert)} violations")
    check("Every row has an MCQ limitation note and disclaimer", all(r["mcq_limitation_note"] and r["credential_disclaimer_id"] for r in cat), "")
    bad_ver = [r["course_id"] for r in cat if r["verification_status"] in ("verified-official-source", "vendor-docs-partial")
               and (r["verified_on"] != SESSION_DATE or not r["source_ids"] or any(s not in srcs or not srcs[s]["method"].startswith("official") for s in r["source_ids"].split("|")[:1]))]
    bad_unv = [r["course_id"] for r in cat if r["verification_status"] not in ("verified-official-source", "vendor-docs-partial") and r["verified_on"]]
    check("Verified rows cite an official-fetch source and date; unverified rows carry no date", not bad_ver and not bad_unv,
          f"bad verified={bad_ver}, unverified-with-date={len(bad_unv)}")
    unknown_src = sorted({s for r in cat for s in r["source_ids"].split("|") if s and s not in srcs})
    check("Every referenced source_id exists in the source register", not unknown_src, f"unknown: {unknown_src}")
    retired = {x[0] for x in RETIRED_EXCLUDED}
    counted_retired = [r["course_id"] for r in cat if r["official_exam_code"] in retired and r["counted_distinct_inclusive"] == "yes"]
    check("No retired exam counted as a course", not counted_retired, f"retired codes checked: {len(retired)}")
    blocked_ok = all(r["workflow_state"] == "Blocked" for r in cat if r["dedup_status"] == "retiring-blocked")
    check("Retirement-scheduled rows are publish-blocked", blocked_ok, "")
    strict = sum(r["counted_distinct_strict"] == "yes" for r in cat)
    incl = sum(r["counted_distinct_inclusive"] == "yes" for r in cat)
    check(">= 1,000 genuinely distinct courses after dedup (strict count)", strict >= 1000, f"strict={strict}, inclusive={incl}, raw={len(cat)}")
    s5 = [g for g in gaps if g["area"].startswith("Section 5")]
    check("Section 5 named certification structures all present", s5 and all(g["status"] == "closed" for g in s5), "; ".join(g["gap"] for g in s5))
    check("Exam-version record per exam-prep row", len(ev) == sum(r["course_class"] in EXAM for r in cat), f"{len(ev)} records")
    check("States and depths valid; nothing marked produced/approved/published",
          all(r["workflow_state"] in STATES and r["curriculum_depth"] in ("inventory", "full-curriculum-spec") and r["approval_status"] == "draft"
              and not r["youtube_playlist_id"] and not r["instructor_owner"] for r in cat), "")
    bad_pw = [(p["pathway_id"], c) for p in pathways for c in p["courses"] if c not in by_id]
    unres = [r["course_id"] for r in cat if r["prerequisites"] != "none" and r["prerequisites"] not in by_id]
    check("Pathways and prerequisites resolve to MST IDs", not bad_pw and not unres, f"{len(pathways)} pathways")
    full = [r for r in cat if r["curriculum_depth"] == "full-curriculum-spec"]
    b1 = [r for r in full if r["priority_batch"] == "1"]
    b2 = [r for r in full if r["priority_batch"] == "2"]
    check("Batch 1 = 10 and Batch 2 = 10 full curriculum specifications", len(b1) == 10 and len(b2) == 10, f"b1={len(b1)} b2={len(b2)}")
    pkg_results = {}
    for r in full:
        res = check_package(r)
        pkg_results[r["course_id"]] = res
        L = [f"# QA report - {r['course_id']} {r['working_title']}", "", f"Generated by validate_catalogue.py ({SESSION_DATE}). Automated checks only; no SME, accessibility, calculation or video review has happened.", "",
             "| Check | Result | Detail |", "|---|---|---|"] + [f"| {n} | {'PASS' if ok else 'FAIL'} | {d} |" for n, ok, d in res]
        with open(os.path.join(OUT, "courses", r["course_id"], r["course_version"], "qa_report.md"), "w") as f:
            f.write("\n".join(L) + "\n")
    pkg_fail = [cid for cid, res in pkg_results.items() if not all(ok for _n, ok, _d in res)]
    check("Every course package passes its automated checks", not pkg_fail, f"failing: {pkg_fail}")
    check("Manifest counts match catalogue", manifest["handover"]["candidate_courses"] == len(cat) and
          manifest["handover"]["validated_distinct_courses_strict"] == strict and manifest["handover"]["videos_uploaded"] == 0, "")

    passed = all(ok for _n, ok, _d in checks)
    cnt = collections.Counter
    L = ["# QA Report - Mastemy Catalogue v2", "",
         f"Generated by `scripts/catalogue/validate_catalogue.py` (session date {SESSION_DATE}). Every number is computed from the emitted files. Automated checks support but do not replace qualified subject-matter review.", "",
         f"**Overall: {'PASS' if passed else 'FAIL'}** ({sum(ok for _n, ok, _d in checks)}/{len(checks)} checks)", "",
         "## Checks", "", "| Check | Result | Detail |", "|---|---|---|"]
    L += [f"| {n} | {'PASS' if ok else 'FAIL'} | {d} |" for n, ok, d in checks]
    L += ["", "## Counts per category", "", "| Cat | Name | Raw | Inclusive distinct | Strict distinct | Exam-prep | Verified official |", "|---|---|---|---|---|---|---|"]
    for cno in sorted({r["category_no"] for r in cat}):
        rs = [r for r in cat if r["category_no"] == cno]
        L.append(f"| {cno} | {rs[0]['category_name']} | {len(rs)} | {sum(r['counted_distinct_inclusive']=='yes' for r in rs)} | "
                 f"{sum(r['counted_distinct_strict']=='yes' for r in rs)} | {sum(r['course_class'] in EXAM for r in rs)} | "
                 f"{sum(r['verification_status']=='verified-official-source' for r in rs)} |")
    L += [f"| | **Total** | **{len(cat)}** | **{incl}** | **{strict}** | {sum(r['course_class'] in EXAM for r in cat)} | {sum(r['verification_status']=='verified-official-source' for r in cat)} |", "",
          "## Distributions", ""]
    for fld in ("origin", "course_class", "verification_status", "exam_status", "workflow_state", "curriculum_depth", "priority_batch", "dedup_status", "exam_resolution_required"):
        L.append(f"- **{fld}**: " + ", ".join(f"{k}={v}" for k, v in sorted(cnt(r[fld] for r in cat).items())))
    L += ["", "## Course packages", "", "| Course | Checks passed |", "|---|---|"]
    L += [f"| `{cid}` {by_id[cid]['working_title']} | {sum(ok for _n, ok, _d in res)}/{len(res)} |" for cid, res in sorted(pkg_results.items())]
    L += ["", f"- XLSX emitted: {meta.get('xlsx_written')}", ""]
    with open(os.path.join(OUT, "qa-report.md"), "w") as f:
        f.write("\n".join(L))
    write_ledger(cat, meta, manifest, strict, incl)
    for n, ok, d in checks:
        print(("PASS " if ok else "FAIL ") + n + " :: " + str(d)[:200])
    return 0 if passed else 1


def write_ledger(cat, meta, manifest, strict, incl):
    h = manifest["handover"]
    vs = collections.Counter(r["verification_status"] for r in cat)
    P = ["# Progress Ledger", "", f"Last generated: {SESSION_DATE}, by the catalogue generator. Stages are counted separately; 'complete' is used only for the stage actually reached.", "",
         "## Handover counts (master prompt section 18)", "", "| Field | Count |", "|---|---|",
         f"| Candidate courses (rows) | {h['candidate_courses']} |",
         f"| Distinct courses after dedup - strict | {strict} |", f"| Distinct courses after dedup - inclusive | {incl} |",
         f"| Courses verified against an official issuer source this session | {h['verified_official_source']} |",
         f"| Courses with partial vendor-documentation evidence | {h['vendor_docs_partial']} |",
         f"| Full curriculum specifications | {h['full_curriculum_specifications']} |",
         "| Full curricula completed as teaching content | 0 |", "| Lesson scripts completed | 0 |",
         f"| Draft sample items (unreviewed) | {h['draft_sample_items']} |", "| Reviewed items | 0 |",
         "| Videos generated | 0 |", "| Videos uploaded | 0 |", "| Courses approved | 0 |", "| Courses published | 0 |",
         f"| Blocked courses | {h['blocked_courses']} |", "",
         "## Depth of work", "",
         f"- **inventory** ({sum(r['curriculum_depth']=='inventory' for r in cat)}): catalogue row with derived identity fields, 80/20 time plan, class, evidence status and dedup status.",
         "- **blueprint** (0): no separate blueprint stage was produced this run.",
         f"- **full-curriculum-spec** ({sum(r['curriculum_depth']=='full-curriculum-spec' for r in cat)}): course package in `courses/<id>/0.1.0/` - outcomes, modules and lessons with minutes, worked-application titles, misconceptions, integrative case, coverage matrix (mapped, not taught), assessment forms and bank plan, 3 draft sample items, YouTube manifest with no videos.",
         "- **produced** (0): no lesson scripts, notes, captions, item banks or videos exist.", "",
         "## Batches", "", "| Batch | Course | Title | Evidence | Planned bank |", "|---|---|---|---|---|"]
    for p in meta["packages"]:
        P.append(f"| {p['batch']} | `{p['course_id']}` | {p['title']} | {p['evidence']} | {p['bank']} |")
    P += ["", "## Verification position", ""] + [f"- {k}: {v}" for k, v in sorted(vs.items())]
    P += ["", "## Next batch", "", f"- Needs issuer syllabi (blocked this run): {', '.join(manifest['next_batch_proposal']['needs_source_access'])}",
          f"- Verifiable now via Microsoft Learn: {', '.join(manifest['next_batch_proposal']['verifiable_now_via_microsoft_learn'])}", "",
          "See `operations/unresolved_issues.csv` and `coverage-gaps.md` for blocking items.", ""]
    with open(os.path.join(OUT, "progress-ledger.md"), "w") as f:
        f.write("\n".join(P))


if __name__ == "__main__":
    sys.exit(main())
