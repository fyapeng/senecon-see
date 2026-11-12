# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project decisions

- Visual identity: deep-teal structural field, paper-white lower surface, the three-dimensional book in the hero. Inner pages use a compact deep-teal header and the same serif headings.
- 2026-11-03: the author asked for a site for learning structural estimation, replacing the earlier "showcase and downloads only" decision. Pages: home (introduction, book map of two volumes and five parts, reading routes by field, materials), `/chapters/#n` (question, goals, contents, figures, paper cases, summary, programs, per-chapter PDF), `/cases/` (paper case library with part filter and search), `/code/` (install, run, tests, modules per chapter), `/preface/`.
- All book content on the site is exported one-way from the LaTeX source and the programs by `scripts/export_site_content.py` in the source repository (`src/content/*.json`, `public/figures/`). Never edit those files by hand; rerun the export.
- The book has no exercises. Learning on the site comes from chapter summaries, figures produced by the programs, paper cases and runnable code. Do not embed the PDF; link the full book and per-chapter PDFs from GitHub Releases.
- Publish as the `fyapeng/senecon-see` GitHub Pages project site under `/senecon-see/`. The public repository holds only the website; textbook LaTeX source is never published.
- Phase two (not built yet): three to five interactive demonstrations with results precomputed in Python (no models run in the browser).
- The second edition (21 chapters, exercises, solutions) was withdrawn on 2026-11-03, when its v2.0.0 release became a draft. The old release was deleted on 2026-11-12.
