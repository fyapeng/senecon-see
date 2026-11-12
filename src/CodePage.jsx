import { Code } from "@phosphor-icons/react";
import { book, chapterHref, Footer, release, SiteNav } from "./shared.jsx";

const nModules = book.chapters.reduce((s, c) => s + c.code.python.length, 0);

export function CodePage() {
  return (
    <>
      <SiteNav current="code/" />
      <main className="page-shell code-page">
        <header className="page-head">
          <p className="eyebrow eyebrow-dark">配套程序</p>
          <h1>程序与结果</h1>
          <p>
            配套程序演示主要模型的计算与估计。Python 是权威实现，主要用 NumPy 和 SciPy，需要自动微分的地方用 JAX；许多计算另有独立写成的 Julia 实现，可用配套测试核对两种语言的结果。全书共 {nModules} 个 Python 模块，具体实现、输入数据与适用范围见各章说明。
          </p>
          <a className="button button-gold small" href={release.code}><Code size={20} /> 下载程序包（{release.version}）</a>
        </header>

        <section className="chapter-block">
          <h2>安装</h2>
          <p>解压程序包，在解压目录中建立 Python 环境（Python 3.11，CPU 即可）：</p>
          <pre className="code-block"><code>{`conda env create -f v3/labs/python/environment.yml
conda activate se3`}</code></pre>
          <p>需要跨语言核对时安装 Julia 1.12，再准备 Julia 环境；没有 Julia 时，跨语言测试会自动跳过：</p>
          <pre className="code-block"><code>{`julia --project=v3/labs/julia -e "using Pkg; Pkg.instantiate()"`}</code></pre>
        </section>

        <section className="chapter-block">
          <h2>运行一章</h2>
          <p>每章的演示在 <code>v3/labs/python</code> 下以模块方式运行，输出对应教学例子的计算结果；<code>figures</code> 模块生成配套图形。</p>
          <pre className="code-block"><code>{`cd v3/labs/python
python -m se3.ch06.enrollment     # 第6章：补贴与入学
python -m se3.ch22.progresa       # 第22章：PROGRESA的两种用法
python -m se3.ch06.figures`}</code></pre>
          <p>改一个有经济含义的参数再运行，比如补贴额度、折现率或成本冲击的方差，看选择、分布或均衡怎样变化。论文案例的小经济知道真值，可以直接看到估计量在什么条件下恢复真值、在什么条件下偏离。</p>
        </section>

        <section className="chapter-block">
          <h2>测试</h2>
          <pre className="code-block"><code>{`python -m pytest -q v3/tests`}</code></pre>
          <p>配套测试检查教学计算、相关恒等式、估计量在模拟数据上的表现，以及已有双语言实现的结果一致性。具体检查项见各章测试文件，运行时间取决于硬件和所安装的环境。</p>
        </section>

        <section className="chapter-block">
          <h2>各章程序</h2>
          <div className="code-chapters">
            {book.chapters.map((ch) => (
              <details key={ch.number} className="case-card">
                <summary>
                  <span className="case-chapter">第 {ch.number} 章</span>
                  <span>{ch.title}</span>
                  <small>{ch.code.python.length} 个模块</small>
                </summary>
                <table className="module-table">
                  <tbody>
                    {ch.code.python.map((m) => (
                      <tr key={m.module}><td><code>{m.module}</code></td><td>{m.doc}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p className="module-note">
                  Julia：{ch.code.julia.map((f) => <code key={f}>{f}</code>)}　测试：{ch.code.tests.map((f) => <code key={f}>{f}</code>)}　·　<a href={chapterHref(ch.number)}>章节页</a>
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="chapter-block">
          <h2>许可</h2>
          <p>原创程序及其说明采用 MIT 许可，教材采用 CC BY-NC 4.0。程序包不含第三方源码；依赖的软件包各自保留许可。论文案例使用已知真值的小经济和模拟数据，不是原论文的实证复现。</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
