#!/usr/bin/env python3
"""Reproducible generator for the Mastemy course catalogue.

Usage:  python3 scripts/catalogue/build_catalogue.py
Emits into docs/catalogue/. Uses only the stdlib, plus openpyxl when it is
installed (if it is missing, the XLSX is skipped and the ledger says so).
Then runs validate_catalogue.py, which writes qa-report.md.
"""
import csv
import json
import math
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
from data_curricula import CURRICULA, OFFICIAL  # noqa: E402

FIELDS = ["course_id", "title", "category", "category_name", "subcategory", "level", "course_type",
          "awarding_body", "official_exam_code", "exam_status", "prerequisites", "est_learner_hours",
          "assessment_hours", "practice_exams_required", "question_formats", "pathway_ids",
          "priority_wave", "curriculum_status", "verification_status", "verified_on", "source_ids",
          "youtube_playlist_id", "caption_langs", "content_version", "instructor_owner",
          "approval_status", "certificate_type", "disclaimer_id", "assessment_note"]

REGISTRY = os.path.join(OUT, "id-registry.json")

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


def write_tables(rows):
    clean = [{k: r[k] for k in FIELDS} for r in rows]
    with open(os.path.join(OUT, "catalogue.csv"), "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(clean)
    with open(os.path.join(OUT, "catalogue.json"), "w") as f:
        json.dump({"generated_by": "scripts/catalogue/build_catalogue.py", "session_date": SESSION_DATE,
                   "count": len(clean), "courses": clean}, f, indent=1)
    try:
        import openpyxl
    except ImportError:
        return False
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "catalogue"
    ws.append(FIELDS)
    for r in clean:
        ws.append([r[k] for k in FIELDS])
    ws.freeze_panes = "A2"
    ws2 = wb.create_sheet("sources")
    ws2.append(["source_id", "family", "url", "publisher", "source_type", "method", "accessed_on", "finding"])
    for s in SOURCES:
        ws2.append(list(s))
    wb.properties.creator = "Mastemy catalogue generator"
    wb.save(os.path.join(OUT, "catalogue.xlsx"))
    return True


def write_sources():
    with open(os.path.join(OUT, "source-register.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["source_id", "family", "url", "publisher", "source_type", "method", "accessed_on", "finding"])
        w.writerows(SOURCES)
    with open(os.path.join(OUT, "retired-exams.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["exam_code", "vendor", "status", "source_id", "successor_in_catalogue"])
        w.writerows(RETIRED_EXCLUDED)


def write_pathways(keymap, rows):
    by_id = {r["course_id"]: r for r in rows}
    data = []
    for pid, (name, cat, keys) in PATHWAYS.items():
        data.append(dict(pathway_id=pid, name=name, category=cat,
                         courses=[keymap[k] for k in keys]))
    with open(os.path.join(OUT, "pathways.json"), "w") as f:
        json.dump(data, f, indent=1)
    lines = ["# Learning Pathways", "",
             "Generated by `scripts/catalogue/build_catalogue.py`. Each pathway is an ordered sequence; "
             "earlier courses are the recommended (not mandatory) prerequisites for later ones. "
             "Pathways describe Mastemy learning order only and do not represent any awarding body's "
             "official certification path unless the course row says it was verified.", "",
             f"Total pathways: {len(data)}", ""]
    for p in data:
        hrs = sum(by_id[c]["est_learner_hours"] for c in p["courses"])
        lines += [f"## {p['pathway_id']} - {p['name']} ({CATEGORIES[p['category']][0]})", "",
                  f"Total estimated learner hours: {hrs}", "", "| Step | Course ID | Title | Level | Hours |", "|---|---|---|---|---|"]
        for i, cid in enumerate(p["courses"], 1):
            r = by_id[cid]
            lines.append(f"| {i} | `{cid}` | {r['title']} | {r['level']} | {r['est_learner_hours']} |")
        lines.append("")
    with open(os.path.join(OUT, "pathways.md"), "w") as f:
        f.write("\n".join(lines))


def alloc_items(domains, bank):
    mids = []
    for _n, w, _l in domains:
        nums = [float(x) for x in re.findall(r"\d+", w)]
        mids.append(sum(nums) / len(nums))
    tot = sum(mids)
    out = [max(1, round(bank * m / tot)) for m in mids]
    return out


def write_curricula(rows):
    by_key = {r["_key"]: r for r in rows}
    sources = {s[0]: s for s in SOURCES}
    written = []
    for key in BATCH1:
        spec = CURRICULA[key]
        r = by_key[key]
        hours = r["est_learner_hours"]
        assess_min = round(hours * 60 * 0.2)
        mock_min = spec["mock"]["minutes"] * 3
        n_lessons = sum(len(d[2]) for d in spec["domains"])
        n_modules = len(spec["domains"])
        module_test_min = 15 * n_modules
        quiz_min = assess_min - mock_min - module_test_min
        if quiz_min < 5 * n_lessons:
            raise SystemExit(f"{key}: hours too low for 20% rule with 3 full mocks")
        quiz_items = min(20, quiz_min // n_lessons)  # ~1 min per item, capped at 20
        quiz_per_lesson = quiz_items
        drill_pool = quiz_min - quiz_items * n_lessons
        n_drills = drill_pool // 30
        quiz_rem = drill_pool - n_drills * 30
        instruct_min = hours * 60 - assess_min
        lesson_min = instruct_min // n_lessons
        bank = spec["mock"]["items"] * 3 + quiz_items * n_lessons + 15 * n_modules + n_drills * 30
        per_domain = alloc_items(spec["domains"], bank)
        src = sources[spec["source"]]
        label = ("VERIFIED against the official study guide" if spec["evidence"] == OFFICIAL
                 else "NOT officially verified - domain list/weights from search snippets only; official page was blocked")
        L = [f"# {r['title']}", "",
             f"> **Curriculum blueprint / specification - not finished lesson content or videos.** "
             f"Course `{r['course_id']}` | Batch 1 | content_version {r['content_version']} | approval_status: draft", "",
             "| Field | Value |", "|---|---|",
             f"| Official exam code | {spec['code']} |",
             f"| Awarding body | {r['awarding_body']} (no affiliation or endorsement) |",
             f"| Syllabus version used | {spec['effective']} |",
             f"| Evidence status | **{label}** |",
             f"| Source | {src[0]} - {src[2]} (accessed {src[6]}, method: {src[5]}) |",
             f"| Estimated learner hours | {hours} |",
             f"| Assessment hours (20%) | {assess_min/60:.1f} h ({assess_min} min) |",
             f"| Question formats | MCQ and multiple-response only |", "",
             "## Learning outcomes", ""]
        L += [f"{i}. {o}" for i, o in enumerate(spec["outcomes"], 1)]
        L += ["", "## Modules and lessons", "",
              f"Instructional time: {instruct_min} min across {n_lessons} lessons (~{lesson_min} min each: "
              "~60% video, ~40% worked examples/reading). Each lesson ends with a lesson quiz.", ""]
        lesson_ids = {}
        for mi, (dname, w, lessons) in enumerate(spec["domains"], 1):
            L += [f"### Module {mi}: {dname} ({w})", "", "| Lesson | Title | Duration (min) | Quiz items |", "|---|---|---|---|"]
            for li, ln in enumerate(lessons, 1):
                lid = f"M{mi}.L{li}"
                lesson_ids.setdefault(mi, []).append(lid)
                L.append(f"| {lid} | {ln} | {lesson_min} | {quiz_items} |")
            L += [f"| M{mi}.T | Module {mi} test | 15 | 15 |", ""]
        L += ["## Traceability matrix (official domain -> weighting -> module -> lessons -> assessment items)", "",
              f"Source: {src[2]} (accessed {src[6]}).", "",
              "| Official domain | Weighting | Module | Lessons | Bank items allocated | Items per mock |", "|---|---|---|---|---|---|"]
        mock_items = alloc_items(spec["domains"], spec["mock"]["items"])
        diff = spec["mock"]["items"] - sum(mock_items)
        mock_items[mock_items.index(max(mock_items))] += diff
        for mi, ((dname, w, _l), n_items, m_items) in enumerate(zip(spec["domains"], per_domain, mock_items), 1):
            L.append(f"| {dname} | {w} | M{mi} | {', '.join(lesson_ids[mi])} | {n_items} | {m_items} |")
        L += ["", f"Mock item total per form: {sum(mock_items)} (matches mock length {spec['mock']['items']}).", "",
              "## Assessment blueprint", "",
              "| Component | Count | Items each | Minutes each | Total minutes |", "|---|---|---|---|---|",
              f"| Lesson quizzes | {n_lessons} | {quiz_items} | {quiz_per_lesson} | {quiz_per_lesson*n_lessons} |",
              f"| Module tests | {n_modules} | 15 | 15 | {module_test_min} |",
              f"| Full-length mock exams (independent forms A/B/C) | 3 | {spec['mock']['items']} | {spec['mock']['minutes']} | {mock_min} |",
              f"| Topic drill sets (mixed-domain) | {n_drills} | 30 | 30 | {n_drills*30} |",
              f"| Review buffer | 1 | - | {quiz_rem} | {quiz_rem} |",
              f"| **Total** | | | | **{assess_min}** (= 20% of {hours*60} min) |", "",
              f"Mock length basis: {spec['mock']['basis']}", "",
              f"Minimum item bank: {bank} unique items (no item reused across mocks A/B/C). Every option of every item "
              "carries a rationale. Items are tagged to domain + lesson ID for analytics.", "",
              "## YouTube production notes", "",
              f"- One playlist per module ({n_modules} playlists) plus a course trailer; `youtube_playlist_id` stays empty until upload.",
              f"- Target video length about {int(lesson_min*0.6)} min per lesson; chapters in the description should match the lesson's sub-objectives.",
              "- Burned-in captions are not allowed. Upload an English SRT that has been reviewed by a person (caption_langs=en).",
              "- On-screen and description disclaimer: 'Independent exam preparation. Not affiliated with or endorsed by the awarding body.'",
              "- Do not use vendor logos or exam-provider trade dress. Product names are used only as references, under nominative fair use.",
              "- Do not reproduce real or recalled exam questions (brain dumps). Every item must be original.",
              "- Re-check the official skills outline before recording. If the outline changes, bump content_version and log it in the change log.", "",
              "## Sample MCQs (original items, illustrative)", ""]
        for qi, (stem, opts) in enumerate(spec["samples"], 1):
            L += [f"**Q{qi}.** {stem}", ""]
            for oi, (txt, ok, why) in enumerate(opts):
                L.append(f"- {'ABCD'[oi]}. {txt} {'**(correct)**' if ok else ''}  \n  _Rationale:_ {why}")
            L.append("")
        L += ["## Change log", "", f"- {SESSION_DATE}: Batch 1 blueprint created from {spec['source']}.", ""]
        path = os.path.join(OUT, "curricula", f"{r['course_id']}.md")
        with open(path, "w") as f:
            f.write("\n".join(L))
        written.append((r["course_id"], r["title"], spec["evidence"], bank))
    return written


def main():
    os.makedirs(os.path.join(OUT, "curricula"), exist_ok=True)
    rows, keymap = build_rows()
    xlsx = write_tables(rows)
    write_sources()
    write_pathways(keymap, rows)
    written = write_curricula(rows)
    with open(os.path.join(OUT, ".build-meta.json"), "w") as f:
        json.dump({"xlsx_written": xlsx, "batch1": written}, f, indent=1)
    print(f"courses={len(rows)} xlsx={xlsx} curricula={len(written)}")
    import validate_catalogue
    rc = validate_catalogue.main()
    sys.exit(rc)


if __name__ == "__main__":
    main()
