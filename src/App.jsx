import React, { useState } from "react";
import TextEditor from "./TextEditor";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <>
      {/* NAV BAR */}
      <nav className="nav" data-theme={theme}>
        <div className="nav-title">Text Editor Pro</div>
        <div className="nav-actions">
          <button
            className="themeBtn"
            onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
          <a
            href="https://github.com/ChetandeepSingh/Text-Editor"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* MAIN */}
      <main className="app" data-theme={theme}>
        <div className="editor-wrapper">
          <TextEditor />
        </div>
      </main>
    </>
  );
}