import React from "react";
import { createRoot } from "react-dom/client";
import { PendingPage } from "./PendingPage.jsx";
import "./styles.css";
import "./preface.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PendingPage title="前言与目录" />
  </React.StrictMode>,
);
