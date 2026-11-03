import preface from "./content/preface.json";
import { Footer, Paper, Rich, SiteNav } from "./shared.jsx";

export function PrefacePage() {
  const headings = preface.blocks.filter((b) => b.kind === "h2");
  return (
    <>
      <SiteNav current="preface/" />
      <main className="page-shell preface-page">
        <aside className="preface-toc" aria-label="前言目录">
          <p>前言</p>
          <ol>
            {headings.map((h, i) => (
              <li key={i}><a href={`#s${preface.blocks.indexOf(h)}`}><Rich as="span" html={h.html} /></a></li>
            ))}
          </ol>
        </aside>
        <article className="preface-body">
          <h1>前言</h1>
          {preface.blocks.map((b, i) => {
            if (b.kind === "h2") return <div key={i} id={`s${i}`} className="anchor"><Rich as="h2" html={b.html} /></div>;
            if (b.kind === "h3") return <Rich key={i} as="h3" html={b.html} />;
            return b.html.map((p, j) => (p.startsWith("<table") ? <Rich key={`${i}-${j}`} html={p} className="table-wrap" /> : <Rich key={`${i}-${j}`} as="p" html={p} />));
          })}
          <h2>前言参考文献</h2>
          <ul className="reference-list">
            {preface.references.map((r) => <li key={r.key}><Paper paper={r} /></li>)}
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
