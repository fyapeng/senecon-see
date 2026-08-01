import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Clock,
  DownloadSimple,
  ListBullets,
} from "@phosphor-icons/react";
import { useEffect } from "react";
import { bookParts, prefaceMeta } from "./content/book.generated.js";
import prefaceHtml from "./content/preface.generated.html?raw";

const base = import.meta.env.BASE_URL;
const releaseBase = "https://github.com/fyapeng/senecon-see/releases/download/v1.10.0";
const releaseAsset = `${releaseBase}/SenEcon-SEE-Companion-Code-v1.10.0.zip`;
const textbookPdf = `${releaseBase}/SenEcon-SEE-Textbook-v1.10.0.pdf`;
const partNumbers = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ"];
const readingSections = [
  ["定量研究中的结构问题", "定量研究中的结构问题"],
  ["结构计量的形成", "结构计量的形成"],
  ["结构方法在不同领域的展开", "结构方法在不同领域的展开"],
  ["约简式证据与结构模型", "约简式证据与结构模型"],
  ["大学补贴同一问题的多种经验路径", "大学补贴：同一问题的多种经验路径"],
  ["本书的范围与写法", "本书的范围与写法"],
  ["全书安排与阅读方法", "全书安排与阅读方法"],
  ["代码复现与人工智能工具", "代码、复现与人工智能工具"],
  ["勘误与更新", "勘误与更新"],
];

function useMathJax() {
  useEffect(() => {
    window.MathJax = {
      tex: { inlineMath: [["\\(", "\\)"]], displayMath: [["\\[", "\\]"]] },
      chtml: { scale: 0.95 },
      options: { enableMenu: false },
    };

    const typeset = () => window.MathJax?.typesetPromise?.();
    const existing = document.getElementById("mathjax-script");
    if (existing) {
      typeset();
      return undefined;
    }

    const script = document.createElement("script");
    script.id = "mathjax-script";
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js";
    script.async = true;
    script.onload = typeset;
    document.head.appendChild(script);
    return undefined;
  }, []);
}

function ReadingHeader() {
  return (
    <header className="reading-site-header page-shell">
      <a className="reading-brand" href={base}>Axel·Sencium</a>
      <nav aria-label="阅读页导航">
        <a href={base}>首页</a>
        <a href="#contents">完整目录</a>
        <a href={`${base}code/`}>配套代码</a>
      </nav>
    </header>
  );
}

function ReadingContents() {
  return (
    <aside className="reading-rail" aria-label="前言目录">
      <p><ListBullets size={19} /> 本页目录</p>
      <ol>
        {readingSections.map(([id, title], index) => (
          <li key={id}>
            <a href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{title}</a>
          </li>
        ))}
      </ol>
      <a className="rail-home-link" href={base}><ArrowLeft size={17} /> 返回首页</a>
    </aside>
  );
}

function FullCatalogue() {
  return (
    <section className="reading-catalogue" id="contents" aria-labelledby="contents-title">
      <div className="section-kicker">
        <span />
        <h2 id="contents-title">完整目录</h2>
      </div>
      <p className="reading-catalogue-intro">六部二十一章，从结构估计基础进入个体选择、产业组织、动态模型与定量均衡。</p>
      <div className="reading-catalogue-grid">
        {bookParts.map((part, index) => (
          <article key={part.title}>
            <header>
              <span>{partNumbers[index]}</span>
              <div>
                <h3>{part.title}</h3>
                <p>第 {part.chapters[0].number}—{part.chapters.at(-1).number} 章</p>
              </div>
            </header>
            <div className="catalogue-chapter-details">
              {part.chapters.map((chapter) => (
                <details key={chapter.number}>
                  <summary>
                    <span>{String(chapter.number).padStart(2, "0")}</span>
                    <strong>{chapter.title}</strong>
                    <small>{chapter.sections.length} 节</small>
                  </summary>
                  <ol>
                    {chapter.sections.map((section, sectionIndex) => (
                      <li key={`${chapter.number}-${sectionIndex}`}>
                        <span>{chapter.number}.{sectionIndex + 1}</span>
                        <span>{section}</span>
                      </li>
                    ))}
                  </ol>
                </details>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PrefacePage() {
  useMathJax();

  return (
    <main className="reading-page">
      <section className="reading-hero">
        <ReadingHeader />
        <div className="reading-hero-inner page-shell">
          <div>
            <p className="eyebrow">结构估计导论 · 阅读</p>
            <h1>前言</h1>
            <p className="reading-deck">从观测事实通向行为机制、均衡结果与政策反事实。</p>
            <div className="reading-meta">
              <span><Clock size={18} /> 约 25 分钟</span>
              <span><BookOpenText size={18} /> 9 节 · {prefaceMeta.equationCount} 组编号公式</span>
            </div>
          </div>
          <img src={`${base}assets/book-cover-front-v2.png`} alt="《结构估计导论》正面封面" />
        </div>
      </section>

      <div className="reading-layout page-shell">
        <ReadingContents />
        <article className="preface-content" dangerouslySetInnerHTML={{ __html: prefaceHtml }} />
      </div>

      <FullCatalogue />

      <section className="reading-cta">
        <div className="page-shell">
          <div>
            <p className="eyebrow">配套材料</p>
            <h2>从阅读进入计算实验</h2>
          </div>
          <div className="reading-cta-actions">
            <a className="button button-paper" href={textbookPdf}>
              <DownloadSimple size={23} /> 下载教材 PDF
            </a>
            <a className="button button-gold" href={releaseAsset}>
              <DownloadSimple size={23} /> 下载配套代码
            </a>
            <a className="reading-back" href={base}>返回首页 <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
