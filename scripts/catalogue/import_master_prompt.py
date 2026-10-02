#!/usr/bin/env python3
"""One-off importer: parse Appendix A (1,300 MST-NNNN rows) and Appendix B
(source register) of the user-supplied master prompt into committed CSVs under
scripts/catalogue/input/. The master prompt itself is not in the repo, so the
parsed CSVs are the reproducible input for build_catalogue.py.

Usage: python3 scripts/catalogue/import_master_prompt.py <master_prompt.txt>
"""
import csv, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "input")


def main(path):
    lines = open(path, encoding="utf-8").read().splitlines()
    cat_re = re.compile(r"^CATEGORY (\d{2}) \| (.+?) \| (\d+) OFFERINGS$")
    row_re = re.compile(r"^(\d{4})\. \[(MST-\d{4})\] (.+)$")
    rows, cats, cur = [], [], None
    in_b = False
    src, block = [], []
    for ln in lines:
        if ln.startswith("APPENDIX B"):
            in_b = True
            continue
        if in_b:
            if ln.strip():
                block.append(ln.strip())
            continue
        m = cat_re.match(ln)
        if m:
            cur = (m.group(1), m.group(2).title(), int(m.group(3)))
            cats.append(cur)
            continue
        m = row_re.match(ln)
        if m:
            assert cur, ln
            assert m.group(2) == f"MST-{m.group(1)}", ln
            rows.append([m.group(2), cur[0], cur[1], m.group(3).strip()])
    # Appendix B: groups of "KEY | Name", URL, "Status: ... Checked: ... Purpose: ..."
    for i in range(1, len(block)):
        if block[i].startswith("Status:") and " | " in block[i - 2]:
            key, name = block[i - 2].split(" | ", 1)
            st = re.match(r"Status: (.*?)\. Checked: (.*?)\. Purpose: (.*)$", block[i])
            src.append([key, name, block[i - 1], st.group(1), st.group(2), st.group(3)])
    for no, name, n in cats:
        got = sum(1 for r in rows if r[1] == no)
        assert got == n, (no, got, n)
    assert len(rows) == 1300, len(rows)
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, "appendix_a.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["mst_id", "category_no", "category_name", "title"])
        w.writerows(rows)
    with open(os.path.join(OUT, "appendix_b_sources.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["key", "name", "url", "prompt_status", "prompt_checked", "purpose"])
        w.writerows(src)
    print(f"appendix_a rows={len(rows)} categories={len(cats)} appendix_b sources={len(src)}")


if __name__ == "__main__":
    main(sys.argv[1])
