import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PendingPage } from "./PendingPage.jsx";
import "./styles.css";
import "./code.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PendingPage title="配套代码" />
  </StrictMode>,
);
