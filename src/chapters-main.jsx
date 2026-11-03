import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChaptersPage } from "./ChaptersPage.jsx";
import "./styles.css";
import "./learn.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChaptersPage />
  </StrictMode>,
);
