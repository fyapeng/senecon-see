import React from "react";
import { createRoot } from "react-dom/client";
import { PrefacePage } from "./PrefacePage.jsx";
import "./styles.css";
import "./preface.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrefacePage />
  </React.StrictMode>,
);
