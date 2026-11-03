import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/senecon-see/",
  build: {
    outDir: "dist/client",
    rollupOptions: {
      input: {
        home: path.resolve(root, "index.html"),
        preface: path.resolve(root, "preface/index.html"),
        code: path.resolve(root, "code/index.html"),
        chapters: path.resolve(root, "chapters/index.html"),
        cases: path.resolve(root, "cases/index.html"),
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx", "./src/preface-main.jsx", "./src/code-main.jsx", "./src/chapters-main.jsx", "./src/cases-main.jsx"],
    },
  },
  plugins: [react()],
});
