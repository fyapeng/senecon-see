const download = "https://github.com/fyapeng/senecon-see/releases/download/v3.0.0/";

export const release = {
  version: "v3.0.0",
  date: "2026-11",
  url: "https://github.com/fyapeng/senecon-see/releases/tag/v3.0.0",
  textbook: `${download}StructuralEstimation_Textbook.pdf`,
  code: `${download}StructuralEstimation_Code_v3.0.0.zip`,
  chapter: (n) => `${download}StructuralEstimation_ch${String(n).padStart(2, "0")}.pdf`,
  appendix: (letter) => `${download}StructuralEstimation_appendix${letter}.pdf`,
};
