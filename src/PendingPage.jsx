import { ArrowLeft } from "@phosphor-icons/react";

const base = import.meta.env.BASE_URL;

export function PendingPage({ title }) {
  return (
    <main className="pending-page">
      <div className="page-shell pending-inner">
        <p className="eyebrow eyebrow-dark">结构估计导论</p>
        <h1>{title}</h1>
        <p>新版正在准备中，教材、配套程序和这一页的内容将随新版一起发布。</p>
        <a className="text-link" href={base}>
          <ArrowLeft size={18} /> 返回首页
        </a>
      </div>
    </main>
  );
}
