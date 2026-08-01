# Design QA

- Source visual truth: `C:\Users\ENAN\.codex\generated_images\019fbe6e-1a33-7f82-8248-d0a7cd693438\exec-f8dcf4b9-fc38-4356-9c6e-a8a4538f2f18.png`
- Final implementation screenshot: `E:\StructuralEstimation\site\implementation-desktop-v2.png`
- Side-by-side evidence: `E:\StructuralEstimation\site\design-qa-comparison-v2.png`
- Responsive evidence: `E:\StructuralEstimation\site\implementation-mobile-closed.png`
- Intended desktop viewport: 1024 × 1792 CSS px; browser capture returned 1009 × 1233 px after application chrome and scrollbar allocation.
- Source pixels: 864 × 1821. Implementation pixels: 1009 × 1233. Comparison preserves each capture at native density without resampling.
- Mobile viewport: 390 × 844 CSS px; document client width 375 px with no horizontal overflow (`scrollWidth = clientWidth = 375`).
- State: public landing page, navigation closed for visual comparison; mobile menu tested in both open and closed states.

## Full-view comparison evidence

The final side-by-side comparison shows the selected deep-teal structural field, warm-paper curved boundary, asymmetric editorial title block, upright three-dimensional book, gold primary action, restrained secondary action, and three-column version ledger. The hero hierarchy, palette, image subject, and top-level proportions follow the selected mock. The implementation extends the mock into a responsive page with preface, resources, and six-part book structure below the captured first viewport.

## Focused comparison evidence

A separate crop was not required because the side-by-side image renders the hero typography, generated book asset, CTA treatment, curved boundary, and version ledger at readable scale. The transparent book asset was also inspected independently at original resolution for edge quality and correct cover text.

## Required fidelity surfaces

- Fonts and typography: Chinese display text uses an installed Noto/Source Han serif stack with Songti/SimSun fallback; navigation and metadata use a matching CJK sans stack. Weight, line height, tracking, and wrapping reproduce the source hierarchy without clipping.
- Spacing and layout rhythm: desktop uses the source's two-column hero, generous left margin, large title block, right-side book, and low-density version ledger. Mobile collapses without horizontal overflow and retains practical tap targets.
- Colors and tokens: deep ink teal, structural teal, warm paper, and restrained gold map directly to the book's visual specification and selected mock.
- Image quality and asset fidelity: the hero field and book are real raster assets generated from the authoritative cover background and selected mock. The book has a clean alpha edge, correct subject, legible title, and no placeholder or CSS-drawn substitute.
- Copy and content: title, author, version, page count, chapter count, exercise count, preface excerpt, and authority statement match current project sources.
- Icons and interactions: Phosphor outline icons form one consistent family. Header anchors, responsive menu open/close, resource navigation, download URL, issue URL, and repository URL are present and keyboard-focusable.
- Accessibility: semantic headings and regions, image alt text, labelled mobile menu, visible focus treatment, reduced-motion handling, and adequate text contrast are present.

## Comparison history

### Pass 1

- [P2] The implementation used a flat hero-to-paper transition and did not reproduce the selected mock's broad curved paper boundary.
- Fix: generated a dedicated text-free hero field from the authoritative cover motif and selected mock, then replaced the flat background with that asset.
- Post-fix evidence: `design-qa-comparison-v2.png` shows the restored paper curve, structural rings, and network-node field behind the same live typography and book asset.

### Pass 2

- No actionable P0, P1, or P2 mismatch remains. The implementation keeps the selected direction while using real project content and responsive behavior.

## Browser checks

- Primary interactions tested: mobile menu open, mobile menu close, navigation to the companion-materials section, and visible destination section.
- Console errors and warnings checked before and after interaction: none.
- Desktop and mobile captures opened and inspected.

## Follow-up polish

- [P3] Platform font rendering varies slightly when Noto CJK fonts are not installed; the current serif and sans fallbacks preserve hierarchy.

## Scoped introduction update · 2026-08-02

- User reference: `C:\Users\ENAN\AppData\Local\Temp\codex-clipboard-15db1392-27db-43fc-890f-1fbc1c7996c7.png`
- Desktop implementation: `E:\StructuralEstimation\site\implementation-introduction-desktop.png`
- Mobile implementation: `E:\StructuralEstimation\site\implementation-introduction-mobile.png`
- Same-state comparison: `E:\StructuralEstimation\site\design-qa-comparison-introduction.png`
- Requested change: renamed the visible navigation item and section heading from “前言” to “简介”; replaced the text-free LaTeX field with a complete front cover rendered from the authoritative current PDF.
- Desktop result: the existing two-column editorial composition, copy measure, colors, and spacing are preserved. The full title, English subtitle, and author remain legible, with no cover cropping.
- Mobile result: the cover scales within the content column without distortion or horizontal overflow (`scrollWidth = clientWidth`).
- Accessibility result: the section keeps its labelled region semantics and the new cover has descriptive alternative text.
- Console and build result: production build succeeds; no browser console errors were observed.

final result: passed

## Scoped formula, catalogue, and code update · 2026-08-02

- Formula source: `C:\Users\ENAN\AppData\Local\Temp\codex-clipboard-7ff488ce-15f3-4ef1-ab55-5b06ea669657.png`
- Formula implementation: `E:\StructuralEstimation\site\implementation-formula-fixed-focused.png`
- Same-state formula comparison: `E:\StructuralEstimation\site\design-qa-comparison-formula-fix.png`
- Code-page mobile implementation: `E:\StructuralEstimation\site\implementation-code-mobile.png`
- Viewport: 390 × 844 CSS px at device scale 1. Source formula screenshot is 504 × 476 px; the fixed formula region was cropped from the mobile implementation and normalized without changing aspect ratio.
- Formula result: the `align` source is now emitted as a numbered `equation` containing `aligned`, placing `\tag{7}` outside the aligned environment. Browser rendering produced 206 MathJax containers and zero `mjx-merror` elements. The long formula scrolls inside its own block while the document has zero horizontal overflow.
- Catalogue result: all 21 chapters expose 176 numbered section-level entries generated from the authoritative chapter sources. Chapter disclosures open and preserve the PDF-style hierarchy without making the catalogue permanently thousands of pixels longer.
- Code-page result: `/code/` provides the stable route named in the preface, 21 chapter paths, environment and test guidance, release metadata, and the complete v1.10.0 download. Immutable source remains in GitHub Releases to avoid a second drifting copy.
- Interactions checked: code-page navigation, release download URL, chapter catalogue disclosures, and mobile layout. No Vite runtime overlay was present.
- Required fidelity surfaces: the new page reuses the established serif/sans hierarchy, warm-paper/deep-teal/gold tokens, original hero field, Phosphor icon family, and real book asset. Copy and paths match the current release and textbook structure.

final result: passed

## Scoped reading-page update · 2026-08-02

- User reference: `C:\Users\ENAN\AppData\Local\Temp\codex-clipboard-cb4a6b58-245d-4e03-81df-a8f8e3b445e7.png`
- Hero implementation: `E:\StructuralEstimation\site\implementation-hero-actions.png`
- Same-state comparison: `E:\StructuralEstimation\site\design-qa-comparison-reading-button.png`
- Reading-page desktop: `E:\StructuralEstimation\site\implementation-reading-desktop.png`
- Equation rendering: `E:\StructuralEstimation\site\implementation-reading-equations.png`
- Reading-page mobile: `E:\StructuralEstimation\site\implementation-reading-mobile-fixed.png`
- Requested change: removed the preface from primary navigation and replaced the low-contrast secondary link beside “下载配套代码” with a paper-white “阅读部分内容” button.
- Content result: the new reading route contains all nine sections of the authoritative LaTeX preface, 22 numbered equation groups, references, and the complete six-part/21-chapter catalogue. Generated HTML and chapter metadata are one-way build artifacts and remain visibly marked as non-authoritative.
- Desktop result: the new secondary action keeps the selected hero hierarchy and has clear contrast against the deep-teal field. The long-form page uses an editorial reading measure, sticky local contents, a real front-cover asset, and restrained section rhythm.
- Mobile result: the hero actions stack into full tap targets; long bibliography URLs wrap; display equations remain horizontally scrollable inside their own container. Final document width is exact (`scrollWidth = clientWidth = 375`) at a 390 × 844 viewport.
- Interaction result: “阅读部分内容” reaches `/senecon-see/preface/`; the “完整目录” control resolves to `#contents` with all 21 chapter rows visible; the code download remains available from both pages.
- Runtime result: MathJax rendered 206 containers from the 22 numbered equation groups, no unresolved equation labels remained, and no Vite runtime error overlay was present.
- Comparison result: the combined source/implementation image confirms that the illegible white text link has been replaced by a distinct, readable button without changing the selected palette, primary CTA, curve, or book composition.

final result: passed
