#!/usr/bin/env python3
"""Create a deployable zip: source only (no node_modules, .next, out, .git)."""
from __future__ import annotations

import os
import zipfile
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
OUT_DIR = REPO.parent

EXCLUDE_DIRS = frozenset({"node_modules", ".next", "out", "build", "dist", "coverage", ".git"})


def main() -> None:
    stamp = datetime.now().strftime("%Y%m%d-%H%M")
    dest = OUT_DIR / f"swiftiom-tms-eth-deploy-{stamp}.zip"
    root_name = REPO.name
    n = 0
    with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as z:
        for dirpath, dirnames, filenames in os.walk(REPO):
            dp = Path(dirpath)
            rel_parts = dp.relative_to(REPO).parts
            if any(p in EXCLUDE_DIRS for p in rel_parts):
                dirnames[:] = []
                continue
            dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
            for name in filenames:
                if name.endswith(".tsbuildinfo"):
                    continue
                fp = dp / name
                arc = Path(root_name) / fp.relative_to(REPO)
                z.write(fp, arc)
                n += 1
    print(dest.resolve())
    print(f"Files added: {n}, size: {dest.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
