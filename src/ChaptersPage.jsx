import { ArrowLeft, ArrowRight, FilePdf } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  base,
  book,
  chapterByNumber,
  chapterHref,
  Footer,
  Paper,
  partOfChapter,
  release,
  Rich,
  SiteNav,
} from "./shared.jsx";

const last = book.chapters.length;

function currentChapter() {
  const n = parseInt(window.location.hash.replace("#", ""), 10);
  return n >= 1 && n <= last ? n : 1;
}

function Sidebar({ n }) {
  return (
    <aside className="chapter-sidebar" aria-label="章节列表">
      {book.parts.map((part) => (
        <div key={part.title} className="sidebar-part">
          <p>{part.title}</p>
          <ol>
            {part.chapters.map((k) => (
              <li key={k}>
                <a href={chapterHref(k)} aria-current={k === n ? "page" : undefined}>
                  <span>{k}</span> {chapterByNumber[k].title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <div className="sidebar-part">
        <p>附录</p>
        <ol>
          {book.appendices.map((a, i) => (
            <li key={a.title}>
              <a href={release.appendix("ABCD"[i])}><span>{"ABCD"[i]}</span> {a.title}</a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

function Contents({ ch }) {
  return (
    <ol className="toc-list">
      {ch.sections.map((s) => (
        <li key={s.number || s.title}>
          <span className="toc-num">{s.number}</span>
          <Rich as="span" html={s.title} />
          {s.subsections.length > 0 && (
            <ol>
              {s.subsections.map((u) => (
                <li key={(u.number || "") + u.title}>
                  <span className="toc-num">{u.number}</span>
                  <Rich as="span" html={u.title} />
                </li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ol>
  );
}

function Programs({ ch }) {
  const { python, julia, tests } = ch.code;
  return (
    <>
      {ch.programs.length > 0 && <pre className="code-block"><code>{ch.programs.join("\n")}</code></pre>}
      <table className="module-table">
        <thead><tr><th>Python 模块</th><th>内容</th></tr></thead>
        <tbody>
          {python.map((m) => (
            <tr key={m.module}><td><code>{m.module}</code></td><td>{m.doc}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="module-note">
        Julia：{julia.map((f) => <code key={f}>{f}</code>)}　测试：{tests.map((f) => <code key={f}>{f}</code>)}
      </p>
    </>
  );
}

function Chapter({ ch }) {
  const part = partOfChapter[ch.number];
  const prev = ch.number > 1 ? chapterByNumber[ch.number - 1] : null;
  const next = ch.number < last ? chapterByNumber[ch.number + 1] : null;
  const cases = ch.cases;
  return (
    <article className="chapter-main">
      <header className="chapter-head">
        <p className="eyebrow eyebrow-dark">{part.title} · 第 {ch.number} 章</p>
        <h1>{ch.title}</h1>
        <div className="chapter-actions">
          <a className="button button-gold small" href={release.chapter(ch.number)}>
            <FilePdf size={20} /> 下载本章 PDF
          </a>
          <span>全书第 {ch.pages[0]}—{ch.pages[1]} 页（PDF 页码）</span>
        </div>
      </header>

      {ch.opening.map((p, i) => <Rich key={i} html={p} as="p" className="lead" />)}

      {ch.goals.length > 0 && (
        <section className="chapter-block">
          <h2>学习目标</h2>
          <ul className="goal-list">{ch.goals.map((g, i) => <Rich key={i} as="li" html={g} />)}</ul>
          {ch.prereq && <p className="prereq"><strong>前置知识：</strong><Rich as="span" html={ch.prereq} /></p>}
        </section>
      )}

      <section className="chapter-block">
        <h2>本章目录</h2>
        <Contents ch={ch} />
      </section>

      {ch.figures.length > 0 && (
        <section className="chapter-block">
          <h2>图形</h2>
          <p className="block-note">这些图由本章的程序生成。</p>
          <div className="figure-grid">
            {ch.figures.map((f) => (
              <figure key={f.files[0]}>
                {f.files.map((src) => (
                  <a key={src} href={`${base}${src}`} target="_blank" rel="noreferrer">
                    <img src={`${base}${src}`} alt={`图 ${f.number}`} loading="lazy" />
                  </a>
                ))}
                <figcaption><strong>图 {f.number}</strong> <Rich as="span" html={f.caption} /></figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {cases.length > 0 && (
        <section className="chapter-block">
          <h2>论文案例</h2>
          {ch.casesIntro && <Rich html={ch.casesIntro} as="p" />}
          {cases.map((c) => (
            <details className="case-card" key={c.title}>
              <summary>
                <Rich as="span" html={c.title} />
              </summary>
              <Paper paper={c.paper} />
              {c.intro && <Rich html={c.intro} />}
              <p className="case-more">完整的推导、原文表格、小经济的估计和注意事项见本章 PDF。</p>
            </details>
          ))}
        </section>
      )}

      {ch.summary.length > 0 && (
        <section className="chapter-block summary-block">
          <h2>本章小结</h2>
          {ch.summary.map((p, i) => <Rich key={i} html={p} as="p" />)}
        </section>
      )}

      <section className="chapter-block">
        <h2>程序</h2>
        <p className="block-note">在 <code>v3/labs/python</code> 下运行。安装方法见<a href={`${base}code/`}>程序页</a>。</p>
        <Programs ch={ch} />
      </section>

      <nav className="chapter-pager" aria-label="上一章与下一章">
        {prev ? <a href={chapterHref(prev.number)}><ArrowLeft size={18} /> 第 {prev.number} 章 {prev.title}</a> : <span />}
        {next ? <a href={chapterHref(next.number)}>第 {next.number} 章 {next.title} <ArrowRight size={18} /></a> : <span />}
      </nav>
    </article>
  );
}

export function ChaptersPage() {
  const [n, setN] = useState(currentChapter);
  useEffect(() => {
    const onHash = () => {
      setN(currentChapter());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const ch = chapterByNumber[n];
  useEffect(() => {
    document.title = `第 ${n} 章 ${ch.title.replace(/<[^>]+>/g, "")} · 结构估计导论`;
  }, [n, ch]);
  return (
    <>
      <SiteNav current="chapters/" />
      <main className="page-shell chapter-layout">
        <Sidebar n={n} />
        <Chapter ch={ch} key={n} />
      </main>
      <Footer />
    </>
  );
}
