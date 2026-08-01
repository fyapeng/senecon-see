"""Export web reading content from the authoritative LaTeX textbook sources.

The generated files in ``src/content`` are deployment artifacts. Edit the
LaTeX sources, then rerun this script; never edit the generated copy by hand.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import tempfile
from pathlib import Path


PART_RE = re.compile(r"\\part\{([^}]+)\}")
INPUT_RE = re.compile(r"\\input\{chapters/(ch\d+)\.tex\}")
CHAPTER_RE = re.compile(r"\\chapter\{([^}]+)\}")
NUMBERED_MATH_RE = re.compile(
    r"\\begin\{(equation|align)\}(.*?)\\end\{\1\}",
    re.DOTALL,
)
LABEL_RE = re.compile(r"\\label\{([^}]+)\}")
EQREF_RE = re.compile(r"\\eqref\{([^}]+)\}")


def parse_structure(book_dir: Path) -> list[dict[str, object]]:
    main_text = (book_dir / "main.tex").read_text(encoding="utf-8")
    parts: list[dict[str, object]] = []
    current: dict[str, object] | None = None

    for line in main_text.splitlines():
        part_match = PART_RE.search(line)
        if part_match:
            current = {"title": part_match.group(1), "chapters": []}
            parts.append(current)
            continue

        input_match = INPUT_RE.search(line)
        if not input_match or current is None:
            continue

        chapter_file = book_dir / "chapters" / f"{input_match.group(1)}.tex"
        chapter_text = chapter_file.read_text(encoding="utf-8")
        chapter_match = CHAPTER_RE.search(chapter_text)
        if chapter_match is None:
            raise RuntimeError(f"Missing chapter title: {chapter_file}")
        number = int(input_match.group(1).removeprefix("ch"))
        current["chapters"].append({"number": number, "title": chapter_match.group(1)})

    if len(parts) != 6 or sum(len(part["chapters"]) for part in parts) != 21:
        raise RuntimeError("Expected six parts and twenty-one chapters")
    return parts


def normalize_preface(source: str) -> tuple[str, int]:
    labels: dict[str, int] = {}

    def number_equation(match: re.Match[str]) -> str:
        environment = match.group(1)
        body = match.group(2)
        label_match = LABEL_RE.search(body)
        if label_match is None:
            return match.group(0)
        number = len(labels) + 1
        labels[label_match.group(1)] = number
        body = LABEL_RE.sub(rf"\\tag{{{number}}}", body, count=1)
        return f"\\begin{{{environment}}}{body}\\end{{{environment}}}"

    normalized = NUMBERED_MATH_RE.sub(number_equation, source)
    normalized = EQREF_RE.sub(lambda match: f"({labels.get(match.group(1), '?')})", normalized)
    normalized = normalized.replace("\\begin{refsection}", "")
    normalized = normalized.replace("\\end{refsection}", "")
    normalized = re.sub(r"\\path\{([^}]+)\}", r"\\texttt{\1}", normalized)
    normalized = re.sub(r"\\markboth\{[^}]+\}\{[^}]+\}", "", normalized)
    normalized = re.sub(r"\\printbibliography\[[^]]*\]", "", normalized)
    return normalized, len(labels)


def find_pandoc(explicit: str | None) -> str:
    candidates = [
        explicit,
        shutil.which("pandoc"),
        r"C:\Users\ENAN\.conda\envs\evan\Library\bin\pandoc.exe",
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate
    raise RuntimeError("Pandoc was not found; pass --pandoc with its absolute path")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book-dir", type=Path, default=Path(__file__).resolve().parents[2] / "book")
    parser.add_argument("--pandoc")
    args = parser.parse_args()

    site_root = Path(__file__).resolve().parents[1]
    output_dir = site_root / "src" / "content"
    output_dir.mkdir(parents=True, exist_ok=True)

    book_dir = args.book_dir.resolve()
    preface_path = book_dir / "frontmatter" / "preface.tex"
    bibliography_path = book_dir / "bibliography" / "references.bib"
    preface_source = preface_path.read_text(encoding="utf-8")
    normalized, equation_count = normalize_preface(preface_source)
    source_hash = hashlib.sha256(preface_source.encode("utf-8")).hexdigest()[:12]

    with tempfile.TemporaryDirectory(prefix="senecon-preface-") as temporary_dir:
        temporary_path = Path(temporary_dir)
        normalized_path = temporary_path / "preface.normalized.tex"
        fragment_path = temporary_path / "preface.html"
        normalized_path.write_text(normalized, encoding="utf-8")
        subprocess.run(
            [
                find_pandoc(args.pandoc),
                str(normalized_path),
                "-f",
                "latex",
                "-t",
                "html5",
                "--mathjax",
                "--citeproc",
                f"--bibliography={bibliography_path}",
                "-M",
                "reference-section-title=前言参考文献",
                "-o",
                str(fragment_path),
            ],
            check=True,
        )
        fragment = fragment_path.read_text(encoding="utf-8")

    generated_comment = (
        f"<!-- Generated from book/frontmatter/preface.tex; source sha256 {source_hash}. "
        "Do not edit by hand. -->\n"
    )
    (output_dir / "preface.generated.html").write_text(
        generated_comment + fragment,
        encoding="utf-8",
    )

    structure = parse_structure(book_dir)
    structure_module = (
        "// Generated from book/main.tex and book/chapters/ch*.tex. Do not edit by hand.\n"
        f"export const bookParts = {json.dumps(structure, ensure_ascii=False, indent=2)};\n"
        f"export const prefaceMeta = {json.dumps({'sourceHash': source_hash, 'equationCount': equation_count, 'sectionCount': 9}, ensure_ascii=False)};\n"
    )
    (output_dir / "book.generated.js").write_text(structure_module, encoding="utf-8")

    print(f"Exported preface ({equation_count} numbered equations) and 21 chapter titles")


if __name__ == "__main__":
    main()
