#!/usr/bin/env python3
"""Validator for docs/catalogue. Writes qa-report.md and progress-ledger.md.

Exit code 0 only when every check passes. The QA report numbers come from here.
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

from data_catalogue import CATEGORIES, MANDATORY_FAMILIES, MANDATORY_CODES, BATCH1  # noqa: E402
from data_sources import RETIRED_EXCLUDED, SESSION_DATE  # noqa: E402

ID_RE = re.compile(r"^MST-[A-Z]{2,3}-[A-Z0-9]+-[A-Z0-9]+-\d{3}$")


def main():
    with open(os.path.join(OUT, "catalogue.csv")) as f:
        rows = list(csv.DictReader(f))
    with open(os.path.join(OUT, "catalogue.json")) as f:
        js = json.load(f)
    with open(os.path.join(OUT, "pathways.json")) as f:
        pathways = json.load(f)
    with open(os.path.join(OUT, "id-registry.json")) as f:
        registry = json.load(f)
    meta = {}
    mp = os.path.join(OUT, ".build-meta.json")
    if os.path.exists(mp):
        with open(mp) as f:
            meta = json.load(f)

    checks = []

    def check(name, ok, detail):
        checks.append((name, bool(ok), detail))

    ids = [r["course_id"] for r in rows]
    idset = set(ids)
    cnt = collections.Counter(r["category"] for r in rows)
    cat_lines = []
    all_min = True
    for cat, (name, mn) in CATEGORIES.items():
        ok = cnt[cat] >= mn
        all_min &= ok
        certs = sum(1 for r in rows if r["category"] == cat and r["course_type"] == "certification-prep")
        cat_lines.append(f"| {cat} | {name} | {mn} | {cnt[cat]} | {certs} | {cnt[cat]-certs} | {'PASS' if ok else 'FAIL'} |")
    check("Category minimums met", all_min, f"{sum(1 for c in CATEGORIES if cnt[c] >= CATEGORIES[c][1])}/{len(CATEGORIES)} categories at or above minimum")
    check("Total courses >= 1000", len(rows) >= 1000, f"{len(rows)} courses (minimum sum {sum(m for _n, m in CATEGORIES.values())})")
    check("CSV and JSON agree", len(rows) == js["count"] == len(js["courses"]), f"csv={len(rows)} json={js['count']}")
    dup_ids = [i for i, c in collections.Counter(ids).items() if c > 1]
    check("course_id unique", not dup_ids, f"{len(dup_ids)} duplicate IDs")
    bad_fmt = [i for i in ids if not ID_RE.match(i)]
    check("course_id format MST-CAT-FAMILY-SLUG-NNN", not bad_fmt, f"{len(bad_fmt)} malformed: {bad_fmt[:5]}")
    norm = collections.Counter(re.sub(r"[^a-z0-9]", "", r["title"].lower()) for r in rows)
    dup_titles = [t for t, c in norm.items() if c > 1]
    check("No duplicate titles (normalised)", not dup_titles, f"{len(dup_titles)} duplicates {dup_titles[:5]}")
    codes = collections.Counter(r["official_exam_code"] for r in rows if r["official_exam_code"])
    bc = collections.Counter((r["awarding_body"], r["official_exam_code"]) for r in rows if r["official_exam_code"])
    dup_codes = [c for c, n in bc.items() if n > 1]
    check("No duplicate (awarding body, exam code) pairs", not dup_codes, f"{len(dup_codes)} duplicated codes {dup_codes[:5]}")
    bad20 = [r["course_id"] for r in rows if abs(float(r["assessment_hours"]) - 0.2 * float(r["est_learner_hours"])) > 0.051]
    check("assessment_hours = 20% of est_learner_hours", not bad20, f"{len(bad20)} violations")
    certs = [r for r in rows if r["course_type"] == "certification-prep"]
    badmock = [r["course_id"] for r in certs if int(r["practice_exams_required"]) < 3]
    check("Cert-prep courses require >= 3 full mocks", not badmock, f"{len(certs)} cert-prep courses, {len(badmock)} violations")
    badq = [r["course_id"] for r in rows if set(r["question_formats"].split("|")) - {"mcq", "multiple-response"}]
    check("Question formats MCQ/MR only", not badq, f"{len(badq)} violations")
    fam_lines, fam_ok = [], True
    for cat, fam, label in MANDATORY_FAMILIES:
        n = sum(1 for i in ids if i.startswith(f"MST-{cat}-{fam}-"))
        fam_ok &= n > 0
        fam_lines.append(f"| {label} | `MST-{cat}-{fam}-*` | {n} | {'PASS' if n else 'FAIL'} |")
    missing_codes = [c for c in MANDATORY_CODES if c not in codes]
    check("Every mandatory family present", fam_ok, f"{len(MANDATORY_FAMILIES)} families checked")
    check("Mandatory exam codes present", not missing_codes, f"missing: {missing_codes}")
    retired = {r[0] for r in RETIRED_EXCLUDED}
    present_retired = [c for c in codes if c in retired]
    check("No retired/excluded exam codes in catalogue", not present_retired, f"present: {present_retired}")
    ver = [r for r in rows if r["verification_status"] == "verified-official-source"]
    bad_ver = [r["course_id"] for r in ver if r["verified_on"] != SESSION_DATE or not r["source_ids"]]
    bad_unver = [r["course_id"] for r in rows if r["verification_status"] != "verified-official-source" and r["verified_on"]]
    check("Verified rows carry date + source; unverified rows have empty verified_on", not bad_ver and not bad_unver,
          f"verified={len(ver)}, bad verified={len(bad_ver)}, unverified-with-date={len(bad_unver)}")
    full = [r for r in rows if r["curriculum_status"] == "full-curriculum"]
    missing_files = [r["course_id"] for r in full if not os.path.exists(os.path.join(OUT, "curricula", r["course_id"] + ".md"))]
    check("Every full-curriculum row has a curriculum file", not missing_files and len(full) == len(BATCH1),
          f"{len(full)} full-curriculum rows, {len(missing_files)} missing files")
    cur_issues = []
    for r in full:
        p = os.path.join(OUT, "curricula", r["course_id"] + ".md")
        if not os.path.exists(p):
            continue
        txt = open(p).read()
        if "not finished lesson content" not in txt:
            cur_issues.append(r["course_id"] + ":label")
        if "| Full-length mock exams (independent forms A/B/C) | 3 |" not in txt:
            cur_issues.append(r["course_id"] + ":mocks")
        m = re.search(r"\*\*(\d+)\*\* \(= 20% of (\d+) min\)", txt)
        if not m or abs(int(m.group(1)) - 0.2 * int(m.group(2))) > 1:
            cur_issues.append(r["course_id"] + ":20pct")
        if txt.count("_Rationale:_") < 12:
            cur_issues.append(r["course_id"] + ":rationales")
        if "Traceability matrix" not in txt:
            cur_issues.append(r["course_id"] + ":trace")
    check("Curricula: label, 3 mocks, 20% budget, rationale per option, traceability", not cur_issues, f"issues: {cur_issues}")
    stale = [k for k, v in registry.items() if v not in idset]
    check("No registered course_id dropped (IDs never reused)", not stale, f"{len(registry)} registered, {len(stale)} missing")
    bad_pw = [(p["pathway_id"], c) for p in pathways for c in p["courses"] if c not in idset]
    unres = [r["course_id"] for r in rows if r["prerequisites"].startswith("UNRESOLVED")]
    check("Pathways and prerequisites resolve", not bad_pw and not unres, f"{len(pathways)} pathways, bad refs={len(bad_pw)}, unresolved prereqs={len(unres)}")
    gov = [r["course_id"] for r in rows if r["youtube_playlist_id"] or r["instructor_owner"] or r["approval_status"] != "draft"]
    check("Governance defaults (empty playlist/owner, draft)", not gov, f"{len(gov)} violations")
    wave = collections.Counter(r["priority_wave"] for r in rows)
    cstat = collections.Counter(r["curriculum_status"] for r in rows)
    vstat = collections.Counter(r["verification_status"] for r in rows)
    estat = collections.Counter(r["exam_status"] for r in rows)
    ctype = collections.Counter(r["course_type"] for r in rows)

    passed = all(ok for _n, ok, _d in checks)
    L = ["# QA Report - Mastemy Catalogue", "",
         f"Generated by `scripts/catalogue/validate_catalogue.py` (session date {SESSION_DATE}). Every number below is computed from the emitted files.", "",
         f"**Overall: {'PASS' if passed else 'FAIL'}** ({sum(ok for _n, ok, _d in checks)}/{len(checks)} checks)", "",
         "## Checks", "", "| Check | Result | Detail |", "|---|---|---|"]
    L += [f"| {n} | {'PASS' if ok else 'FAIL'} | {d} |" for n, ok, d in checks]
    L += ["", "## Counts per category vs minimum", "", "| Code | Category | Minimum | Actual | Cert-prep | Skills/foundation | Result |", "|---|---|---|---|---|---|---|"]
    L += cat_lines + [f"| | **Total** | {sum(m for _n, m in CATEGORIES.values())} | **{len(rows)}** | {len(certs)} | {len(rows)-len(certs)} | |", ""]
    L += ["## Mandatory families", "", "| Family | ID prefix | Courses | Result |", "|---|---|---|---|"] + fam_lines + [""]
    L += ["## Distributions", ""]
    for title, c in [("course_type", ctype), ("verification_status", vstat), ("exam_status", estat),
                     ("curriculum_status", cstat), ("priority_wave", wave)]:
        L.append(f"- **{title}**: " + ", ".join(f"{k}={v}" for k, v in sorted(c.items())))
    L += ["", f"- XLSX emitted: {meta.get('xlsx_written')}", ""]
    with open(os.path.join(OUT, "qa-report.md"), "w") as f:
        f.write("\n".join(L))

    # progress ledger
    P = ["# Progress Ledger", "", f"Last generated: {SESSION_DATE}, by the catalogue generator.", "",
         "| Batch | Scope | Status |", "|---|---|---|",
         f"| 0 | Architecture, full inventory ({len(rows)} courses), pathways, source register, policies, QA | Done |",
         f"| 1 | Full curriculum blueprints for {len(full)} courses | Done (specs only; no lesson scripts, videos or item banks yet) |",
         "| 2 | Blueprints for wave-2 cert-prep courses after official syllabus verification | Not started |",
         "| 3+ | Item-bank authoring, video production, SME review, approval | Not started |", "",
         "## What exists at each depth", "",
         f"- **full-curriculum** ({cstat.get('full-curriculum', 0)}): curriculum spec in `curricula/` (outcomes, modules/lessons, traceability, assessment blueprint, production notes, 3 sample MCQs). No lesson content, videos or full item bank yet.",
         f"- **blueprint** ({cstat.get('blueprint', 0)}): none in this batch.",
         f"- **inventory** ({cstat.get('inventory', 0)}): catalogue row only (metadata, hours, pathway, wave).", "",
         "## Batch 1 courses", "", "| Course ID | Title | Evidence | Min. item bank |", "|---|---|---|---|"]
    for cid, title, ev, bank in meta.get("batch1", []):
        P.append(f"| `{cid}` | {title} | {ev} | {bank} |")
    P += ["", "## Verification position", "",
          f"- verified-official-source: {vstat.get('verified-official-source', 0)} courses (Microsoft study guides read through the Microsoft Learn MCP).",
          f"- unverified-needs-official-check: {vstat.get('unverified-needs-official-check', 0)} cert-prep courses. Several have secondary (search-snippet) evidence only; see source-register.csv.",
          f"- n/a-no-official-syllabus: {vstat.get('n/a-no-official-syllabus', 0)} skills/foundation courses.", "",
          "## Known gaps", "",
          "- Official sites for AWS, CompTIA, PMI, ACCA, Google Cloud, CFA and IELTS were blocked by the session egress proxy, so 4 of the 10 Batch 1 specs (CLF-C02, SY0-701, PMP, CFA L-I) rest on secondary evidence and must be re-verified before production.",
          "- Most exam codes (for example SAP, Salesforce, Databricks and some AWS/Google codes) are left blank instead of guessed.",
          "- MCQ-only delivery cannot assess writing/speaking, task-based simulations or performance-based labs. These are flagged per course in `assessment_note`.",
          "- No partnerships or endorsements exist. The certificate policy forbids implying any.", ""]
    with open(os.path.join(OUT, "progress-ledger.md"), "w") as f:
        f.write("\n".join(P))
    for n, ok, d in checks:
        print(("PASS " if ok else "FAIL ") + n + " :: " + d)
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
