import {
  ArrowDown,
  ArrowRight,
  BookOpenText,
  CalendarBlank,
  Code,
  Copyright,
  FilePdf,
  FileText,
  GithubLogo,
  List,
  Stack,
  X,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { bookParts } from "./content/book.generated.js";

import { release } from "./content/release.js";

const base = import.meta.env.BASE_URL;
const repositoryUrl = "https://github.com/fyapeng/senecon-see";

const partNumbers = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ"];

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
        <a href="#introduction">简介</a>
        <a href={`${base}code/`}>配套代码</a>
        <a href="#updates">勘误与更新</a>
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
          <p className="eyebrow">研究生教材 · 2026</p>
          <h1>结构估计导论</h1>
          <div className="gold-rule" />
          <p className="english-title">INTRODUCTION TO<br />STRUCTURAL ESTIMATION</p>
          <p className="author">Axel·Sencium</p>
          <p className="hero-summary">从数据、模型与识别出发，理解机制与政策反事实。</p>
          <div className="hero-actions">
            <a className="button button-gold" href={release.code}>
              <Code size={25} weight="regular" />
              下载配套代码
            </a>
            <a className="button button-paper" href="#resources">
              <FileText size={24} weight="regular" />
              教材与习题解答
            </a>
            <a className="hero-reading-link" href={`${base}preface/`}><BookOpenText size={20} /> 阅读前言</a>
          </div>
        </div>
        <div className="book-stage">
          <img
            className="book-image"
            src={`${base}assets/book-mockup.png`}
            alt="《结构估计导论》立体书封展示"
          />
        </div>
      </div>
      <a className="scroll-cue" href="#version" aria-label="查看版本信息">
        <ArrowDown size={20} />
      </a>
    </section>
  );
}

function VersionStrip() {
  return (
    <section className="version-section page-shell" id="version" aria-labelledby="version-title">
      <div className="section-kicker">
        <span />
        <h2 id="version-title">版本信息</h2>
      </div>
      <div className="version-strip">
        <div>
          <CalendarBlank size={28} />
          <p><span>当前状态</span><strong>第二版 · 已发布</strong></p>
        </div>
        <div>
          <BookOpenText size={29} />
          <p><span>当前版本</span><strong>{release.version}</strong></p>
        </div>
        <div>
          <Stack size={29} />
          <p><span>内容结构</span><strong>21 章 · 418 道习题</strong></p>
        </div>
        <div>
          <Copyright size={29} />
          <p><span>使用许可</span><strong><a href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans" target="_blank" rel="noreferrer">CC BY-NC 4.0</a></strong></p>
        </div>
      </div>
    </section>
  );
}

function Preface() {
  return (
    <section className="preface-section page-shell" id="introduction" aria-labelledby="introduction-title">
      <div className="preface-copy">
        <div className="section-kicker">
          <span />
          <h2 id="introduction-title">简介</h2>
        </div>
        <blockquote>
          经济学的经验研究从可观察的数据出发，却很少止于对数据本身的概括。研究者通常希望知道，价格、收入、制度与市场环境的变化如何影响个人和企业的选择；这些选择如何汇聚为价格、数量、进入、退出与资源配置；当政策规则离开历史样本的支持范围时，经济主体与市场又将形成怎样的新均衡。
        </blockquote>
        <p>
          本书讨论从观测事实通向行为机制、均衡结果与政策反事实的路径，并把模型构建、识别、估计、推断、验证与应用放在同一方法链中。
        </p>
        <a className="text-link" href={`${base}preface/`}>
          阅读前言与完整目录 <ArrowRight size={18} />
        </a>
      </div>
      <div className="preface-art">
        <img src={`${base}assets/book-cover-front-v2.png`} alt="《结构估计导论》正面封面" />
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section className="resources-section" id="resources" aria-labelledby="resources-title">
      <div className="page-shell">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow eyebrow-dark">代码与维护</p>
            <h2 id="resources-title">配套材料</h2>
          </div>
          <p>教材、习题解答与配套程序按同一版本提供。教材与解答采用 CC BY-NC 4.0，原创代码采用 MIT；第三方适配保留原许可。</p>
        </div>
        <div className="resource-grid">
          <article>
            <Code size={34} />
            <h3>配套代码</h3>
            <p>二十一章 Python 实验、透明实现与数值验证代码。</p>
            <a href={`${base}code/`}>
              浏览代码总页 <ArrowRight size={18} />
            </a>
          </article>
          <article id="updates">
            <FileText size={34} />
            <h3>勘误与更新</h3>
            <p>2026-09-18 发布第二版，完成章级校订、教育主线整合与阅读查阅补充。</p>
            <a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">
              提交或查看反馈 <ArrowRight size={18} />
            </a>
          </article>
          <article>
            <FilePdf size={34} />
            <h3>教材 PDF</h3>
            <p>六部二十一章，1101 页；含阅读路线、数学查阅与中英文主题索引。</p>
            <a href={release.textbook}>
              下载教材 PDF <ArrowRight size={18} />
            </a>
          </article>
          <article>
            <FilePdf size={34} />
            <h3>习题解答手册</h3>
            <p>覆盖第1—21章的418道习题，325页；题号与教材对应，含计算与开放题说明。</p>
            <a href={release.solutions}>
              下载习题解答 PDF <ArrowRight size={18} />
            </a>
          </article>
        </div>
        <p className="download-note">需要跨书跳转时，<a href={release.bundle}>合并下载教材与解答</a>，解压后保持两个PDF在同一文件夹并保留文件名。也可查看<a href={release.url}>版本说明与文件校验值</a>。</p>
      </div>
    </section>
  );
}

function BookStructure() {
  return (
    <section className="structure-section page-shell" id="about" aria-labelledby="structure-title">
      <div className="section-kicker">
        <span />
        <h2 id="structure-title">全书结构</h2>
      </div>
      <p className="structure-intro">六部二十一章，从识别与估计基础进入个体选择、产业组织、动态模型和定量均衡。</p>
      <div className="catalogue-grid">
        {bookParts.map((part, index) => (
          <article className="catalogue-part" key={part.title}>
            <header>
              <span className="part-number">{partNumbers[index]}</span>
              <div>
                <h3>{part.title}</h3>
                <p>第 {part.chapters[0].number}—{part.chapters.at(-1).number} 章</p>
              </div>
            </header>
            <ol>
              {part.chapters.map((chapter) => (
                <li key={chapter.number}>
                  <span>第 {chapter.number} 章</span>
                  <strong>{chapter.title}</strong>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="page-shell footer-inner">
        <div>
          <strong>结构估计导论</strong>
          <span>Introduction to Structural Estimation</span>
        </div>
        <p>Axel·Sencium · 2026</p>
        <a href={repositoryUrl} target="_blank" rel="noreferrer" aria-label="访问 GitHub 仓库">
          <GithubLogo size={24} />
        </a>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <main>
      <Hero />
      <VersionStrip />
      <Preface />
      <Resources />
      <BookStructure />
      <Footer />
    </main>
  );
}
