import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CodePage } from "./CodePage.jsx";
import "./styles.css";
import "./code.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CodePage />
  </StrictMode>,
);
