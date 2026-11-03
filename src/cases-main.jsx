import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CasesPage } from "./CasesPage.jsx";
import "./styles.css";
import "./learn.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CasesPage />
  </StrictMode>,
);
