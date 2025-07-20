import React, { useState, useRef } from "react";

const EDITOR_BG = "#1e1e1e";
const GUTTER_BG = "#23272e";
const GUTTER_COLOR = "#6a7686";
const LINE_HIGHLIGHT_BG = "#2a2d3a";
const LINE_HIGHLIGHT_GUTTER = "#3b4252";
const FONT_FAMILY = "'Fira Mono', 'Consolas', 'Menlo', 'Monaco', 'monospace'";
const FONT_SIZE = 16;
const LINE_HEIGHT = 1.5;
const LINE_HEIGHT_PX = FONT_SIZE * LINE_HEIGHT;

const TextEditor = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const lineNumberRef = useRef(null);
  const [jumpLine, setJumpLine] = useState("");
  const [jumpError, setJumpError] = useState("");
  const [currentLine, setCurrentLine] = useState(0); // 0-based

  // Split text into lines
  const lines = text.split("\n");

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (lineNumberRef.current && textareaRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Get current line from textarea selection
  const updateCurrentLine = () => {
    if (textareaRef.current) {
      const pos = textareaRef.current.selectionStart;
      const before = text.slice(0, pos);
      const line = before.split("\n").length - 1;
      setCurrentLine(line);
    }
  };

  // Handle jump to line
  const handleJump = () => {
    const lineNum = parseInt(jumpLine, 10);
    if (isNaN(lineNum) || lineNum < 1 || lineNum > lines.length) {
      setJumpError(`Enter a valid line number (1-${lines.length})`);
      return;
    }
    setJumpError("");
    if (textareaRef.current) {
      textareaRef.current.scrollTop = (lineNum - 1) * LINE_HEIGHT_PX;
      textareaRef.current.focus();
      // Move cursor to start of that line
      let pos = 0, count = 1;
      for (let i = 0; i < text.length; i++) {
        if (count === lineNum) break;
        if (text[i] === '\n') count++;
        pos++;
      }
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd = pos;
      setCurrentLine(lineNum - 1);
    }
  };

  // Render lines for overlay highlight
  const renderOverlay = () => (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {lines.map((_, i) => (
        <div
          key={i}
          style={{
            background: i === currentLine ? LINE_HIGHLIGHT_BG : "transparent",
            height: LINE_HEIGHT_PX,
            width: "100%",
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 32,
      fontFamily: FONT_FAMILY,
      background: EDITOR_BG,
      minHeight: "100vh",
    }}>
      <h2 style={{ marginBottom: 16, color: "#fff", fontWeight: 500 }}>Text Editor</h2>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          background: EDITOR_BG,
          border: "1px solid #222",
          borderRadius: 8,
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          width: "fit-content",
          padding: 0,
          position: "relative",
        }}
      >
        <pre
          ref={lineNumberRef}
          style={{
            textAlign: "right",
            userSelect: "none",
            color: GUTTER_COLOR,
            background: GUTTER_BG,
            padding: "8px 8px 8px 12px",
            margin: 0,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE,
            lineHeight: LINE_HEIGHT,
            minWidth: 36,
            maxHeight: 320,
            height: 320,
            overflow: "hidden",
            pointerEvents: "none",
            borderRight: "1px solid #222",
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            position: "relative",
          }}
        >
          {lines.map((_, i) => (
            <div
              key={i}
              style={{
                background: i === currentLine ? LINE_HIGHLIGHT_GUTTER : "transparent",
                color: i === currentLine ? "#fff" : GUTTER_COLOR,
                borderRadius: 4,
                width: "100%",
                height: LINE_HEIGHT_PX,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontWeight: i === currentLine ? 700 : 400,
              }}
            >
              {i + 1}
            </div>
          ))}
        </pre>
        <div style={{ position: "relative", width: 0, flex: 1 }}>
          {renderOverlay()}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => { setText(e.target.value); updateCurrentLine(); }}
            onScroll={handleScroll}
            onClick={updateCurrentLine}
            onKeyUp={updateCurrentLine}
            onInput={updateCurrentLine}
            rows={20}
            cols={60}
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: FONT_SIZE,
              lineHeight: LINE_HEIGHT,
              resize: "none",
              border: "none",
              outline: "none",
              padding: 8,
              maxHeight: 320,
              height: 320,
              overflow: "auto",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              background: "transparent",
              color: "#fff",
              position: "relative",
              zIndex: 2,
            }}
          />
        </div>
      </div>
      {/* Jump to Line Controls */}
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="number"
          min={1}
          max={lines.length}
          value={jumpLine}
          onChange={e => setJumpLine(e.target.value)}
          placeholder="Line #"
          style={{ width: 80, padding: 4, fontSize: 16, borderRadius: 4, border: "1px solid #444", background: GUTTER_BG, color: "#fff" }}
        />
        <button
          onClick={handleJump}
          style={{ padding: "6px 16px", fontSize: 16, borderRadius: 4, border: "none", background: "#4f8cff", color: "#fff", cursor: "pointer", fontWeight: 600 }}
        >
          Jump
        </button>
        {jumpError && <span style={{ color: "#ff5c5c", marginLeft: 8, fontSize: 14 }}>{jumpError}</span>}
      </div>
    </div>
  );
};

export default TextEditor;