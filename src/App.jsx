import {
  ArrowDown,
  ArrowRight,
  GithubLogo,
  List,
  X,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const base = import.meta.env.BASE_URL;
const repositoryUrl = "https://github.com/fyapeng/senecon-see";

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
        <a href="#status">新版</a>
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
          <p className="hero-status">新版正在准备中，教材 PDF 与配套程序即将在此发布。</p>
        </div>
        <div className="book-stage">
          <img
            className="book-image"
            src={`${base}assets/book-mockup.png`}
            alt="《结构估计导论》立体书封展示"
          />
        </div>
      </div>
      <a className="scroll-cue" href="#introduction" aria-label="查看简介">
        <ArrowDown size={20} />
      </a>
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
          结构估计把经济理论写成可以估计的模型：研究者写出经济主体的偏好、技术、信息和约束，以及市场和制度怎样把他们的选择连在一起，用数据确定这些对象，再在数据中没有出现过的环境里重新求解，回答政策和福利问题。
        </blockquote>
        <p>
          本书先讲这套方法共同的概念和工具，再回顾产业组织、劳动与公共经济、宏观与贸易等领域的文献怎样用它研究各自的问题。
        </p>
        <p className="status-note" id="status">
          新版正在准备中。如有问题或建议，可以在 GitHub 上留言。
        </p>
        <a className="text-link" href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">
          提交反馈 <ArrowRight size={18} />
        </a>
      </div>
      <div className="preface-art">
        <img src={`${base}assets/book-cover-front-v2.png`} alt="《结构估计导论》正面封面" />
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
      <Preface />
      <Footer />
    </main>
  );
}
