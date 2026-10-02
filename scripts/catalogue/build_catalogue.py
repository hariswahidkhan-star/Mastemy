#!/usr/bin/env python3
"""Reproducible generator for the Mastemy course catalogue (v2).

Usage:  python3 scripts/catalogue/build_catalogue.py
1. Rebuilds the v1 inventory (1,076 rows, legacy IDs) in memory from
   data_catalogue.py - kept only as reconciliation input.
2. master_catalogue.run(): imports Appendix A (MST-0001..MST-1300), reconciles
   v1 rows through the crosswalk, deduplicates, writes the catalogue, research
   registers, course packages and operations files under docs/catalogue/.
3. validate_catalogue.py checks everything and writes qa-report.md and
   progress-ledger.md. Exit code is non-zero if any check fails.
Stdlib only, plus openpyxl for the XLSX when installed.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "docs", "catalogue")

from data_catalogue import CATEGORIES, CERTS, SKILLS, PATHWAYS, BATCH1  # noqa: E402
from data_sources import (SOURCES, OFFICIALLY_VERIFIED_CODES, SECONDARY_CODES,  # noqa: E402
                          RETIRED_EXCLUDED, SESSION_DATE)

FIELDS = ["course_id", "title", "category", "category_name", "subcategory", "level", "course_type",
          "awarding_body", "official_exam_code", "exam_status", "prerequisites", "est_learner_hours",
          "assessment_hours", "practice_exams_required", "question_formats", "pathway_ids",
          "priority_wave", "curriculum_status", "verification_status", "verified_on", "source_ids",
          "youtube_playlist_id", "caption_langs", "content_version", "instructor_owner",
          "approval_status", "certificate_type", "disclaimer_id", "assessment_note"]

REGISTRY = os.path.join(OUT, "catalog", "legacy-id-registry.json")  # v1 IDs, frozen; never reused

NON_MCQ_NOTE = {
    "LNG": "Official test includes productive skills (writing/speaking) that MCQ cannot assess; course covers MCQ-assessable knowledge and receptive skills only.",
    "CPA": "Official exam includes task-based simulations; Mastemy covers them only via MCQ/MR knowledge items.",
    "ACCA": "Applied Skills/Strategic Professional exams include constructed-response questions; Mastemy covers knowledge via MCQ/MR only.",
    "CIMA": "Case-study / objective-test mix; case-study skills are only partly assessable via MCQ.",
    "PERF": "Official exam is performance-based (hands-on); Mastemy offers knowledge preparation only and cannot replicate lab tasks.",
}
PERF_BASED = {"CKA", "CKAD", "CKS", "LFCS", "EX200", "EX294", "EX188"}
RETIRING = {"SY0-701": "Reported English retirement 2027-06-11 (secondary source); successor SY0-801 not yet in catalogue."}


def slugify(title):
    words = re.findall(r"[A-Za-z0-9]+", title)
    stop = {"and", "for", "the", "of", "a", "an", "in", "with", "to", "on", "by", "using"}
    core = [w for w in words if w.lower() not in stop] or words
    s = "".join(w[0].upper() if not w.isdigit() else w for w in core)[:8]
    return s or "X"


def load_registry():
    if os.path.exists(REGISTRY):
        with open(REGISTRY) as f:
            return json.load(f)
    return {}


def build_rows():
    registry = load_registry()
    used = set(registry.values())
    key_to_pw = {}
    for pid, (_n, _c, keys) in PATHWAYS.items():
        for k in keys:
            key_to_pw.setdefault(k, []).append(pid)
    prereq = {}
    for pid, (_n, _c, keys) in PATHWAYS.items():
        for a, b in zip(keys, keys[1:]):
            prereq.setdefault(b, a)

    entries = []
    for cat in CATEGORIES:
        for cert in CERTS.get(cat, []):
            key = f"{cat}:{cert['family']}:{cert['slug']}"
            entries.append((key, cat, "cert", cert, f"MST-{cat}-{cert['family']}-{cert['slug']}"))
        for sub, level, hrs, titles in SKILLS.get(cat, []):
            for t in titles:
                key = f"{cat}:{t}"
                d = dict(family="SK", slug=slugify(t), title=t, awarding_body="Mastemy (no external awarding body)",
                         official_exam_code="", level=level, subcategory=sub, hours=hrs)
                entries.append((key, cat, "skill", d, f"MST-{cat}-SK-{d['slug']}"))

    rows, keymap = [], {}
    for key, cat, kind, d, base in entries:
        if key in registry:
            cid = registry[key]
        else:
            n = 1
            while f"{base}-{n:03d}" in used:
                n += 1
            cid = f"{base}-{n:03d}"
            registry[key] = cid
            used.add(cid)
        code = d["official_exam_code"]
        if kind == "cert":
            ctype = "certification-prep"
            if code in OFFICIALLY_VERIFIED_CODES:
                vstat, von, src = "verified-official-source", SESSION_DATE, OFFICIALLY_VERIFIED_CODES[code]
                estat = "current"
            else:
                vstat, von = "unverified-needs-official-check", ""
                src = SECONDARY_CODES.get(code, "")
                estat = "retiring" if code in RETIRING else "unknown"
            mocks = 3
            disc = "DISC-CERTPREP-01"
        else:
            ctype = "foundation" if d["level"] == "foundation" else "skills"
            vstat, von, src, estat, mocks, disc = "n/a-no-official-syllabus", "", "", "n/a", 1, "DISC-GENERAL-01"
        note = ""
        if cat == "LNG" and kind == "cert" and "(MCQ-assessable skills)" in d["title"]:
            note = NON_MCQ_NOTE["LNG"]
        elif d["family"] in ("CPA", "ACCA", "CIMA"):
            note = NON_MCQ_NOTE[d["family"]]
        elif code in PERF_BASED:
            note = NON_MCQ_NOTE["PERF"]
        if code in RETIRING:
            note = (note + " " + RETIRING[code]).strip()
        hours = d["hours"]
        if key in BATCH1:
            wave, cstat = 1, "full-curriculum"
        elif kind == "cert" and d["level"] != "advanced":
            wave, cstat = 2, "inventory"
        elif kind == "cert":
            wave, cstat = 3, "inventory"
        elif d["level"] == "foundation":
            wave, cstat = 4, "inventory"
        else:
            wave, cstat = 5, "inventory"
        pre_key = prereq.get(key)
        rows.append(dict(
            course_id=cid, title=d["title"], category=cat, category_name=CATEGORIES[cat][0],
            subcategory=d["subcategory"], level=d["level"], course_type=ctype,
            awarding_body=d["awarding_body"], official_exam_code=code, exam_status=estat,
            prerequisites=pre_key or "none", est_learner_hours=hours,
            assessment_hours=round(hours * 0.2, 1), practice_exams_required=mocks,
            question_formats="mcq|multiple-response", pathway_ids="|".join(key_to_pw.get(key, [])),
            priority_wave=wave, curriculum_status=cstat, verification_status=vstat, verified_on=von,
            source_ids=src, youtube_playlist_id="", caption_langs="en", content_version="0.1.0",
            instructor_owner="", approval_status="draft", certificate_type="mastemy-completion-certificate",
            disclaimer_id=disc, assessment_note=note, _key=key))
        keymap[key] = cid
    # resolve prerequisite keys to IDs
    for r in rows:
        if r["prerequisites"] != "none":
            r["prerequisites"] = keymap.get(r["prerequisites"], "UNRESOLVED:" + r["prerequisites"])
    with open(REGISTRY, "w") as f:
        json.dump(dict(sorted(registry.items())), f, indent=1)
    return rows, keymap


def main():
    os.makedirs(os.path.join(OUT, "catalog"), exist_ok=True)
    legacy_rows, _keymap = build_rows()   # v1 inventory, rebuilt in memory (input to the crosswalk)
    import master_catalogue
    rows, packages = master_catalogue.run(legacy_rows)
    print(f"v1_rows={len(legacy_rows)} master_rows={len(rows)} packages={len(packages)}")
    import validate_catalogue
    sys.exit(validate_catalogue.main())


if __name__ == "__main__":
    main()
