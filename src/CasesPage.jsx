import { useMemo, useState } from "react";
import { book, chapterHref, Footer, Paper, paperCases, paperCount, partOfChapter, Rich, SiteNav } from "./shared.jsx";

export function CasesPage() {
  const [part, setPart] = useState("all");
  const [query, setQuery] = useState("");
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return paperCases.filter((c) => {
      if (part !== "all" && partOfChapter[c.chapter].title !== part) return false;
      if (!q) return true;
      const hay = [c.title, c.chapterTitle, c.paper?.authors, c.paper?.title, c.paper?.venue, c.intro]
        .join(" ").replace(/<[^>]+>/g, "").toLowerCase();
      return hay.includes(q);
    });
  }, [part, query]);

  return (
    <>
      <SiteNav current="cases/" />
      <main className="page-shell cases-page">
        <header className="page-head">
          <p className="eyebrow eyebrow-dark">论文案例</p>
          <h1>{paperCases.length} 个论文案例</h1>
          <p>
            每个案例先说明原文要解决的问题和它的想法，再写出关键方程，交代数据怎样变成回归或矩，列出原文的结果，并在一个已知真值的小经济中用原文的估计方法重算一遍。这些案例涉及 {paperCount} 篇论文，有几篇在不同章节从不同角度出现。下面是每个案例的开头一段；完整内容在对应章节的 PDF 中，小经济的程序在配套程序包里。
          </p>
        </header>
        <div className="case-filters">
          <label>
            部分
            <select value={part} onChange={(e) => setPart(e.target.value)}>
              <option value="all">全部</option>
              {book.parts.map((p) => <option key={p.title} value={p.title}>{p.title}</option>)}
            </select>
          </label>
          <label className="case-search">
            搜索
            <input type="search" value={query} placeholder="作者、题目或关键词" onChange={(e) => setQuery(e.target.value)} />
          </label>
          <span className="case-count">{shown.length} 个</span>
        </div>
        <div className="case-list">
          {shown.map((c) => (
            <details className="case-card" key={`${c.chapter}-${c.title}`}>
              <summary>
                <span className="case-chapter">第 {c.chapter} 章</span>
                <Rich as="span" html={c.title} />
              </summary>
              <Paper paper={c.paper} />
              {c.intro && <Rich html={c.intro} />}
              <p className="case-more">
                所在章节：<a href={chapterHref(c.chapter)}>第 {c.chapter} 章 {c.chapterTitle}</a>
              </p>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
