"""Render website/assets/scandora-avv-dpa-template.docx to the matching .pdf.

The DOCX is the source of truth for the signable AVV/DPA template. The PDF must
never be edited on its own, or the two downloads offered by website/avv.html
section 9 start contradicting each other.

Usage (from the repo root):

    pip install python-docx weasyprint
    python3 website/scripts/build-avv-template-pdf.py

Styling is read from the DOCX's own style definitions, so a change to the
template's look only has to be made in the DOCX.
"""
import html
import sys
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.table import Table
from docx.text.paragraph import Paragraph
from weasyprint import HTML

REPO_ROOT = Path(__file__).resolve().parents[2]
DOCX_PATH = REPO_ROOT / "website" / "assets" / "scandora-avv-dpa-template.docx"
PDF_PATH = REPO_ROOT / "website" / "assets" / "scandora-avv-dpa-template.pdf"

SERIF_STACK = '"DejaVu Serif", Charter, Georgia, "Times New Roman", serif'
PAGE_BREAK_BEFORE = {
    "Deutsche Fassung (maßgeblich)",
    "English version (courtesy translation)",
    "Unterzeichnung / Signatures",
}
EMU_PER_PT = 12700
EMU_PER_INCH = 914400


def _pt(length):
    return round(length / EMU_PER_PT, 1)


def _inch(length):
    return round(length / EMU_PER_INCH, 3)


def _hex(font):
    if font.color is not None and font.color.type is not None and font.color.rgb is not None:
        return f"#{font.color.rgb}"
    return "#000000"


def _runs_html(paragraph):
    parts = []
    for run in paragraph.runs:
        text = html.escape(run.text)
        if run.bold:
            text = f"<strong>{text}</strong>"
        if run.italic:
            text = f"<em>{text}</em>"
        parts.append(text)
    return "".join(parts)


def _paragraph_html(paragraph):
    style = paragraph.style.name
    body = _runs_html(paragraph)
    if not body.strip():
        return '<p class="spacer">&nbsp;</p>'
    classes = []
    if paragraph.paragraph_format.alignment == WD_ALIGN_PARAGRAPH.CENTER:
        classes.append("center")
    if paragraph.text.strip() in PAGE_BREAK_BEFORE:
        classes.append("page-break")
    attr = f' class="{" ".join(classes)}"' if classes else ""
    tag = {"Title": "h1", "Heading 1": "h2", "Heading 2": "h3"}.get(style, "p")
    if tag == "h1":
        attr = f' class="title{" " + " ".join(classes) if classes else ""}"'
    return f"<{tag}{attr}>{body}</{tag}>"


def _table_html(table):
    rows = []
    for index, row in enumerate(table.rows):
        cell_tag = "th" if index == 0 else "td"
        cells = "".join(f"<{cell_tag}>{html.escape(cell.text)}</{cell_tag}>" for cell in row.cells)
        rows.append(f"<tr>{cells}</tr>")
    return f'<table>{"".join(rows)}</table>'


def _stylesheet(document):
    styles = document.styles
    section = document.sections[0]
    title, heading1, heading2, normal = (styles[name].font for name in ("Title", "Heading 1", "Heading 2", "Normal"))
    return f"""
@page {{
    size: {_inch(section.page_width)}in {_inch(section.page_height)}in;
    margin: {_inch(section.top_margin)}in {_inch(section.right_margin)}in
            {_inch(section.bottom_margin)}in {_inch(section.left_margin)}in;
}}
body {{
    font-family: {SERIF_STACK};
    font-size: {_pt(normal.size)}pt;
    line-height: 1.35;
    color: #000000;
}}
h1.title {{
    font-size: {_pt(title.size)}pt;
    color: {_hex(title)};
    font-weight: normal;
    text-align: center;
    border-bottom: 1pt solid {_hex(heading1)};
    padding-bottom: 6pt;
    margin: 0 0 12pt 0;
}}
h2 {{
    font-size: {_pt(heading1.size)}pt;
    color: {_hex(heading1)};
    margin: 16pt 0 4pt 0;
}}
h3 {{
    font-size: {_pt(heading2.size)}pt;
    color: {_hex(heading2)};
    margin: 12pt 0 3pt 0;
}}
p {{ margin: 0 0 8pt 0; }}
p.center {{ text-align: center; }}
p.spacer {{ margin: 0 0 14pt 0; }}
.page-break {{ break-before: page; }}
table {{
    width: 100%;
    border-collapse: collapse;
    margin: 6pt 0 12pt 0;
    break-inside: avoid;
}}
th, td {{
    border: 0.5pt solid {_hex(heading2)};
    padding: 4pt 6pt;
    text-align: left;
    vertical-align: top;
}}
th {{
    font-weight: bold;
    color: {_hex(heading1)};
    border-bottom: 1pt solid {_hex(heading1)};
}}
"""


def build_html(document):
    blocks = []
    for child in document.element.body.iterchildren():
        tag = child.tag.split("}")[-1]
        if tag == "p":
            blocks.append(_paragraph_html(Paragraph(child, document)))
        elif tag == "tbl":
            blocks.append(_table_html(Table(child, document)))
    body = "\n".join(block for block in blocks if block)
    return (
        '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8">'
        f"<title>{html.escape(document.paragraphs[0].text)}</title>"
        f"<style>{_stylesheet(document)}</style></head><body>{body}</body></html>"
    )


def main():
    if not DOCX_PATH.is_file():
        sys.exit(f"missing source: {DOCX_PATH}")
    document = Document(str(DOCX_PATH))
    HTML(string=build_html(document), base_url=str(REPO_ROOT)).write_pdf(str(PDF_PATH))
    print(f"wrote {PDF_PATH.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
