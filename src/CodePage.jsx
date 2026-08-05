import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  CheckCircle,
  Code,
  DownloadSimple,
  Flask,
  FolderOpen,
  GithubLogo,
  Package,
  TerminalWindow,
} from "@phosphor-icons/react";
import { bookParts } from "./content/book.generated.js";

const base = import.meta.env.BASE_URL;
const releaseAsset =
  "https://github.com/fyapeng/senecon-see/releases/download/v1.11.0/SenEcon-SEE-Companion-Code-v1.11.0.zip";
const releasePage = "https://github.com/fyapeng/senecon-see/releases/tag/v1.11.0";
const repositoryUrl = "https://github.com/fyapeng/senecon-see";
const partNumbers = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ"];

function CodeHeader() {
  return (
    <header className="code-site-header code-shell">
      <a className="code-brand" href={base}>Axel·Sencium</a>
      <nav aria-label="代码页导航">
        <a href={base}>首页</a>
        <a href={`${base}preface/`}>前言与目录</a>
        <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
      </nav>
    </header>
  );
}

function ChapterIndex() {
  return (
    <section className="code-index code-shell" aria-labelledby="code-index-title">
      <div className="section-kicker"><span /><h2 id="code-index-title">二十一章代码索引</h2></div>
      <p className="code-section-intro">
        章节编号与教材保持一致。每章目录以 <code>labs/chXX/</code> 为稳定入口，完整程序与测试随版本化代码包发布。
      </p>
      <div className="code-part-grid">
        {bookParts.map((part, partIndex) => (
          <article key={part.title}>
            <header>
              <span>{partNumbers[partIndex]}</span>
              <div><h3>{part.title}</h3><p>{part.chapters.length} 章</p></div>
            </header>
            <ol>
              {part.chapters.map((chapter) => (
                <li key={chapter.number}>
                  <code>labs/ch{String(chapter.number).padStart(2, "0")}/</code>
                  <strong>{chapter.title}</strong>
                  <span>{chapter.sections.length} 节正文</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CodePage() {
  return (
    <main className="code-page">
      <section className="code-hero">
        <CodeHeader />
        <div className="code-hero-inner code-shell">
          <div>
            <p className="eyebrow">结构估计导论 · Companion code</p>
            <h1>配套代码</h1>
            <p className="code-deck">从透明的 NumPy / SciPy 基准实现，进入自动微分、JIT、模拟估计与均衡求解。</p>
            <div className="code-hero-actions">
              <a className="button button-gold" href={releaseAsset}><DownloadSimple size={23} /> 下载 v1.11.0</a>
              <a className="code-release-link" href={releasePage} target="_blank" rel="noreferrer">查看发布记录 <ArrowRight size={18} /></a>
            </div>
          </div>
          <div className="code-package-card">
            <Package size={34} />
            <p>当前代码包</p>
            <strong>21 章 · 约 0.94 MB</strong>
            <span>ZIP · SHA-256 由 GitHub Release 记录</span>
          </div>
        </div>
      </section>

      <section className="code-principle code-shell" aria-labelledby="code-principle-title">
        <div className="section-kicker"><span /><h2 id="code-principle-title">网页索引与版本下载</h2></div>
        <div className="code-principle-grid">
          <div>
            <h3>这个页面是稳定入口</h3>
            <p>书中引用的 <code>senecon-see/code/</code> 指向这里，用于说明环境、章节结构、测试与当前版本。</p>
          </div>
          <div>
            <h3>完整代码由 Release 保存</h3>
            <p>代码包继续使用版本化下载，可以固定文件、校验摘要并保留历史版本；网页不复制出第二套会漂移的源代码。</p>
          </div>
        </div>
      </section>

      <section className="code-workflow" aria-labelledby="workflow-title">
        <div className="code-shell">
          <div className="section-kicker kicker-light"><span /><h2 id="workflow-title">建议使用顺序</h2></div>
          <div className="workflow-grid">
            <article><FolderOpen size={29} /><span>01</span><h3>解压代码包</h3><p>保持 <code>labs/</code>、<code>tests/</code> 与环境文件的相对路径。</p></article>
            <article><TerminalWindow size={29} /><span>02</span><h3>建立 Python 环境</h3><p>按根目录说明安装 NumPy、SciPy、JAX 与测试依赖。</p></article>
            <article><BookOpenText size={29} /><span>03</span><h3>先读 tutorial.py</h3><p>沿教材顺序理解状态、目标函数、估计和反事实对象。</p></article>
            <article><Flask size={29} /><span>04</span><h3>运行对应测试</h3><p>用解析结果、梯度、概率恒等式、固定点和均衡残差核验实现。</p></article>
          </div>
        </div>
      </section>

      <ChapterIndex />

      <section className="tests-explainer code-shell" aria-labelledby="tests-title">
        <div><CheckCircle size={35} /><p className="eyebrow eyebrow-dark">Numerical verification</p><h2 id="tests-title">tests 不是临时文件</h2></div>
        <div>
          <p>测试文件用于确认每章计算结果仍满足教材中的数学关系：概率是否加总为一、解析梯度是否与有限差分一致、Bellman 与固定点残差是否足够小、政策改变后是否重新求解均衡。</p>
          <p>它们应当随正式代码包保留。批量输出、缓存和临时图表则不属于需要长期维护的源码。</p>
        </div>
      </section>

      <section className="code-bottom-cta">
        <div className="code-shell">
          <div><p className="eyebrow">配套材料 v1.11.0</p><h2>下载完整代码后，从第 1 章开始运行。</h2></div>
          <div className="code-bottom-actions">
            <a className="button button-gold" href={releaseAsset}><DownloadSimple size={22} /> 下载代码包</a>
            <a href={base}><ArrowLeft size={18} /> 返回首页</a>
          </div>
        </div>
      </section>
    </main>
  );
}
