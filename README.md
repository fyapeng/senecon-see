# 结构估计导论 · 官方配套页面

《结构估计导论》（*Introduction to Structural Estimation*）的展示、配套代码、勘误与版本更新入口。

网站提供书目介绍、前言与目录、全书、分章与附录 PDF、配套代码和勘误入口。教材以 LaTeX 书稿为唯一权威来源，计算材料以 Python 实现为唯一权威来源；LaTeX 源码不随 PDF 公开。

## 本地预览

```powershell
npm install
npm run dev
```

## 发布

推送到 `main` 后，GitHub Actions 构建并发布 `dist/client` 到 GitHub Pages。

当前版本v3.0.1（2026-11）。网站内容由源码仓库的`scripts/export_site_content.py`从LaTeX书稿和程序单向导出到`src/content/*.json`与`public/figures/`，不在网站中另行编辑。下载地址维护于`src/content/release.js`；PDF与程序包放在GitHub Release。第二版v2.0.0于2026-11-03撤下（Release转为草稿），并于2026-11-12删除旧Release。
