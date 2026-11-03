import { useEffect, useRef, useState } from "react";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";
import { GithubLogo, List, X } from "@phosphor-icons/react";
import book from "./content/book.json";
import macros from "./content/macros.json";
import { release } from "./content/release.js";

export const base = import.meta.env.BASE_URL;
export const repositoryUrl = "https://github.com/fyapeng/senecon-see";
export { book, release };

export const chapterHref = (n) => `${base}chapters/#${n}`;
export const chapterByNumber = Object.fromEntries(book.chapters.map((c) => [c.number, c]));
export const partOfChapter = Object.fromEntries(
  book.parts.flatMap((p, i) => p.chapters.map((n) => [n, { ...p, index: i }])),
);
export const paperCases = book.chapters.flatMap((c) =>
  c.cases.filter((k) => k.paper).map((k) => ({ ...k, chapter: c.number, chapterTitle: c.title })),
);

/** HTML exported from the LaTeX book, with $...$ and $$...$$ typeset by KaTeX. */
export function Rich({ html, as: Tag = "div", className }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    renderMathInElement(ref.current, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      macros: { ...macros },
      throwOnError: false,
      strict: "ignore",
    });
  }, [html]);
  return <Tag ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** The chapter's question in one sentence: the first opening sentence that does not just point to other chapters. */
export function chapterBlurb(ch, max = 66) {
  const text = ch.opening.join("").replace(/<[^>]+>/g, "").replace(/\$[^$]*\$/g, "…");
  const sentences = text.match(/[^。？]+[。？]/g) || [text];
  const pick = sentences.find((s) => s.length >= 12 && !/第\s*\d+\s*(?:至\s*\d+\s*)?章|上一章|前[几四三两]?章|本章/.test(s));
  const s = (pick || firstSentence(ch.goals[0] || "", max)).trim();
  return s.length > max ? s.slice(0, max) + "…" : s;
}

/** First sentence of an exported paragraph, without markup, for compact listings. */
export function firstSentence(html, max = 90) {
  const text = html.replace(/<[^>]+>/g, "").replace(/\$[^$]*\$/g, "…");
  const end = text.search(/[。；]/);
  const s = end > 0 ? text.slice(0, end + 1) : text;
  return s.length > max ? s.slice(0, max) + "…" : s;
}

export function Paper({ paper }) {
  if (!paper) return null;
  const link = paper.doi ? `https://doi.org/${paper.doi}` : paper.url;
  return (
    <p className="paper-ref">
      {paper.authors} ({paper.year}). {link ? <a href={link} target="_blank" rel="noreferrer">{paper.title}</a> : paper.title}
      {paper.venue ? <em>. {paper.venue}</em> : null}
    </p>
  );
}

const navItems = [
  ["首页", ""],
  ["章节", "chapters/"],
  ["论文案例", "cases/"],
  ["程序", "code/"],
  ["前言", "preface/"],
];

export function SiteNav({ current }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sub-header">
      <div className="sub-header-inner">
        <a className="sub-brand" href={base}>结构估计导论</a>
        <button className="menu-button sub-menu" type="button" aria-label={open ? "关闭导航" : "打开导航"}
          aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={24} /> : <List size={24} />}
        </button>
        <nav className={open ? "sub-links is-open" : "sub-links"} aria-label="主导航">
          {navItems.slice(1).map(([label, path]) => (
            <a key={path} href={`${base}${path}`} aria-current={current === path ? "page" : undefined}>{label}</a>
          ))}
          <a className="sub-download" href={release.textbook}>下载 PDF</a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="page-shell footer-inner">
        <div>
          <strong>结构估计导论</strong>
          <span>Introduction to Structural Estimation · {release.version}</span>
        </div>
        <p>
          Axel·Sencium · 2026 · 教材 <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans" target="_blank" rel="noreferrer">CC BY-NC 4.0</a> · 程序 MIT ·{" "}
          <a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">勘误与反馈</a>
        </p>
        <a href={repositoryUrl} target="_blank" rel="noreferrer" aria-label="访问 GitHub 仓库">
          <GithubLogo size={24} />
        </a>
      </div>
    </footer>
  );
}
