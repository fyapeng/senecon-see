import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  Code,
  FilePdf,
  Files,
  GithubLogo,
  List,
  X,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import preface from "./content/preface.json";
import {
  base,
  book,
  chapterBlurb,
  chapterByNumber,
  chapterHref,
  Footer,
  paperCases,
  release,
  repositoryUrl,
  Rich,
} from "./shared.jsx";

const partNumbers = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ"];

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="site-header">
      <a className="author-mark" href="#top" aria-label="返回页首">
        Axel·Sencium
      </a>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? "关闭导航" : "打开导航"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={25} /> : <List size={25} />}
      </button>
      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="主导航">
        <a href={`${base}chapters/`}>章节</a>
        <a href={`${base}cases/`}>论文案例</a>
        <a href={`${base}code/`}>程序</a>
        <a href={`${base}preface/`}>前言</a>
        <a href={repositoryUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <Header />
      <div className="hero-field" aria-hidden="true" />
      <div className="hero-grid page-shell">
        <div className="hero-copy">
          <p className="eyebrow">研究生教材 · {release.version}</p>
          <h1>结构估计导论</h1>
          <div className="gold-rule" />
          <p className="english-title">INTRODUCTION TO<br />STRUCTURAL ESTIMATION</p>
          <p className="author">Axel·Sencium</p>
          <p className="hero-summary">从数据、模型与识别出发，理解机制与政策反事实。</p>
          <div className="hero-actions">
            <a className="button button-gold" href={release.textbook}>
              <FilePdf size={25} weight="regular" />
              下载全书 PDF
            </a>
            <a className="button button-paper" href={`${base}chapters/`}>
              <BookOpenText size={24} weight="regular" />
              浏览章节
            </a>
            <a className="hero-reading-link" href={`${base}preface/`}><BookOpenText size={20} /> 阅读前言</a>
          </div>
          <p className="hero-status">
            上下两册 · {book.chapters.length} 章与 {book.appendices.length} 个附录 · {book.pages} 页 · {paperCases.length} 个论文案例
          </p>
        </div>
        <div className="book-stage">
          <img className="book-image" src={`${base}assets/book-mockup.png`} alt="《结构估计导论》立体书封展示" />
        </div>
      </div>
      <a className="scroll-cue" href="#introduction" aria-label="查看简介">
        <ArrowDown size={20} />
      </a>
    </section>
  );
}

function Introduction() {
  const intro = preface.blocks[0].html[0].split("前言先说明")[0];
  return (
    <section className="preface-section page-shell" id="introduction" aria-labelledby="introduction-title">
      <div className="preface-copy">
        <div className="section-kicker">
          <span />
          <h2 id="introduction-title">简介</h2>
        </div>
        <Rich html={intro} as="blockquote" />
        <p>
          上册讲各领域共用的方法：识别、估计、计算、推断与模型评价，以及离散选择、自选择、潜在变量、动态选择和策略互动。下册按领域回顾文献：每章先讲这个领域的经济问题和常用模型，再逐篇讲解代表性的论文，并在一个已知真值的小经济中重演它们的估计。
        </p>
        <a className="text-link" href={`${base}preface/`}>
          阅读前言：为什么学习结构估计，以及这一方法的来历 <ArrowRight size={18} />
        </a>
      </div>
      <div className="preface-art">
        <img src={`${base}assets/book-cover-front-v2.png`} alt="《结构估计导论》正面封面" />
      </div>
    </section>
  );
}

function BookMap() {
  return (
    <section className="structure-section page-shell" id="map" aria-labelledby="map-title">
      <div className="section-kicker">
        <span />
        <h2 id="map-title">全书地图</h2>
      </div>
      <p className="structure-intro">上册讲基础，下册讲专题。点开任何一章，可以看到它回答的问题、目录、图形、论文案例、本章小结和程序。</p>
      {[["上册 · 基础", [0, 1]], ["下册 · 专题", [2, 3, 4]]].map(([volume, idx]) => (
        <div className="volume-block" key={volume}>
          <h3 className="volume-title">{volume}</h3>
          <div className="catalogue-grid">
            {idx.map((i) => {
              const part = book.parts[i];
              return (
                <article className="catalogue-part" key={part.title}>
                  <header>
                    <span className="part-number">{partNumbers[i]}</span>
                    <div>
                      <h3>{part.title}</h3>
                      <p>第 {part.chapters[0]}—{part.chapters.at(-1)} 章</p>
                    </div>
                  </header>
                  <ol className="map-chapters">
                    {part.chapters.map((n) => {
                      const ch = chapterByNumber[n];
                      return (
                        <li key={n}>
                          <a href={chapterHref(n)}>
                            <span>第 {n} 章</span>
                            <strong>{ch.title}</strong>
                            <small>{chapterBlurb(ch)}</small>
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

function Routes() {
  return (
    <section className="routes-section page-shell" id="routes" aria-labelledby="routes-title">
      <div className="section-kicker">
        <span />
        <h2 id="routes-title">按研究方向阅读</h2>
      </div>
      <p className="structure-intro">先读第 1 章和第 2 至 6 章的基础节，再按方向补上第二部分的工具，进入领域章。</p>
      <div className="routes-table" role="table">
        <div className="routes-row routes-head" role="row">
          <span role="columnheader">方向</span>
          <span role="columnheader">典型问题</span>
          <span role="columnheader">需要的工具</span>
          <span role="columnheader">领域章</span>
        </div>
        {book.routes.map((r) => (
          <div className="routes-row" role="row" key={r.field}>
            <strong role="cell">{r.field}</strong>
            <span role="cell">{r.questions}</span>
            <span role="cell">{r.tools}</span>
            <span role="cell" className="chip-row">
              {r.chapters.map((n) => (
                <a className="chip" key={n} href={chapterHref(n)} title={chapterByNumber[n].title}>{n}</a>
              ))}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Materials() {
  return (
    <section className="resources-section" id="materials" aria-labelledby="materials-title">
      <div className="page-shell">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow eyebrow-dark">学习材料</p>
            <h2 id="materials-title">论文、程序与下载</h2>
          </div>
          <p>本书不设习题。每章的程序演示是动手的入口：改一个有经济含义的参数，看选择、分布或均衡怎样变化。配套程序演示主要模型的计算与估计，具体实现与适用范围见各章说明。</p>
        </div>
        <div className="resource-grid">
          <article>
            <Files size={34} />
            <h3>论文案例</h3>
            <p>{paperCases.length} 个案例：原文的想法、关键方程、数据怎样变成矩，以及在已知真值的小经济中重演的估计。</p>
            <a href={`${base}cases/`}>浏览案例库 <ArrowRight size={18} /></a>
          </article>
          <article>
            <Code size={34} />
            <h3>配套程序</h3>
            <p>提供 Python 与 Julia 程序、测试和环境说明，便于运行演示、核对结果并尝试新的参数。</p>
            <a href={`${base}code/`}>安装与运行 <ArrowRight size={18} /></a>
          </article>
          <article>
            <FilePdf size={34} />
            <h3>全书 PDF</h3>
            <p>{book.pages} 页，含 4 个附录。各章也可以单独下载，在章节页面中。</p>
            <a href={release.textbook}>下载全书 PDF <ArrowRight size={18} /></a>
          </article>
          <article id="updates">
            <GithubLogo size={34} />
            <h3>勘误与反馈</h3>
            <p>{release.version} 于 2026 年 11 月发布。发现错误或有建议，请在 GitHub 上留言。</p>
            <a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">提交或查看反馈 <ArrowRight size={18} /></a>
          </article>
        </div>
        <p className="download-note">
          程序包：<a href={release.code}>StructuralEstimation_Code_{release.version}.zip</a>。版本说明与文件校验值见 <a href={release.url}>GitHub Release</a>。
        </p>
      </div>
    </section>
  );
}

export function App() {
  return (
    <main>
      <Hero />
      <Introduction />
      <BookMap />
      <Routes />
      <Materials />
      <Footer />
    </main>
  );
}
