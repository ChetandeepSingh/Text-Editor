import React, { useState, useRef, useEffect } from "react";
import styles from "./TextEditor.module.css";

export default function TextEditor() {
  const [text, setText]             = useState("");
  const [jump, setJump]             = useState("");
  const [activeLine, setActiveLine] = useState(1);
  const [cursor, setCursor]         = useState({ line: 1, col: 1 });

  const textRef   = useRef(null);
  const gutterRef = useRef(null);
  const overlayRef= useRef(null);

  const lines = text.split("\n");

  // 1. Sync gutter+overlay scroll to textarea
  const syncScroll = () => {
    if (!textRef.current) return;
    const top = textRef.current.scrollTop;
    if (gutterRef.current) gutterRef.current.scrollTop = top;
    if (overlayRef.current) overlayRef.current.scrollTop = top;
  };

  // 2. Update cursor & active line + auto‑scroll
  const updateCursor = () => {
    if (!textRef.current) return;
    const pos    = textRef.current.selectionStart;
    const before = text.slice(0, pos);
    const lineNo = before.split("\n").length;
    const colNo  = pos - before.lastIndexOf("\n") - 1;
    setCursor({ line: lineNo, col: Math.max(1, colNo) });
    setActiveLine(lineNo);
    syncScroll();
  };

  // 3. Jump to line
  const jumpToLine = () => {
    const n = parseInt(jump, 10);
    if (isNaN(n) || n < 1 || n > lines.length) {
      alert(`Please enter a valid line number between 1 and ${lines.length}`);
      return;
    }
    setActiveLine(n);
    setJump("");
    
    // Calculate position for the line
    let pos = 0;
    for (let i = 0; i < n - 1; i++) {
      pos += lines[i].length + 1; // +1 for newline
    }
    
    // Set cursor position and focus
    textRef.current.setSelectionRange(pos, pos);
    textRef.current.focus();
    
    // Scroll to line
    const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
    textRef.current.scrollTop = (n - 1) * lineHeight;
    syncScroll();
  };

  // 4. Load .txt
  const loadFile = e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => {
      setText(ev.target.result);
      setActiveLine(1);
      setCursor({ line: 1, col: 1 });
    };
    r.readAsText(f);
  };

  // 5. Download .txt
  const downloadTxt = () => {
    if (!text.trim()) {
      alert("No text to download!");
      return;
    }
    const blob = new Blob([text], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "document.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // 6. Proxy wheel events so gutter never scrolls alone
  useEffect(() => {
    const g = gutterRef.current;
    const t = textRef.current;
    if (!g || !t) return;
    const onWheel = e => { 
      e.preventDefault();
      t.scrollTop += e.deltaY; 
    };
    g.addEventListener("wheel", onWheel, { passive: false });
    return () => g.removeEventListener("wheel", onWheel);
  }, []);

  // 7. Handle Enter key for jump
  const handleJumpKeyPress = (e) => {
    if (e.key === 'Enter') {
      jumpToLine();
    }
  };

  // 8. Force sync scroll on mount and text changes
  useEffect(() => {
    syncScroll();
  }, [text]);

  return (
    <div className={styles.container}>
      {/* TOOLBAR */}
      <div className={styles.toolbar}>
        <label className={styles.btn}>
          Load File
          <input type="file" accept=".txt" hidden onChange={loadFile} />
        </label>
        <button className={styles.btnAccent} onClick={downloadTxt}>
          Download .txt
        </button>
      </div>

      {/* EDITOR */}
      <div className={styles.editorOuter}>
        {/* GUTTER */}
        <div ref={gutterRef} className={styles.gutter}>
          {lines.map((_, i) => (
            <div
              key={i}
              className={
                activeLine === i + 1
                  ? styles.gutterLineActive
                  : styles.gutterLine
              }
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* TEXT+OVERLAY */}
        <div className={styles.textWrap}>
          <div ref={overlayRef} className={styles.overlay}>
            {lines.map((_, i) => (
              <div
                key={i}
                className={
                  activeLine === i + 1
                    ? styles.overlayLineActive
                    : styles.overlayLine
                }
              />
            ))}
          </div>

          <textarea
            ref={textRef}
            className={styles.textarea}
            value={text}
            onChange={e => setText(e.target.value)}
            onInput={updateCursor}
            onScroll={syncScroll}
            onClick={updateCursor}
            onKeyUp={updateCursor}
            onKeyDown={updateCursor}
            spellCheck="false"
            placeholder="Start typing here..."
          />
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className={styles.bottomBar}>
        <div className={styles.jumpContainer}>
          <input
            type="number"
            className={styles.jumpInput}
            placeholder="Line #"
            min="1"
            max={lines.length || 1}
            value={jump}
            onChange={e => setJump(e.target.value)}
            onKeyPress={handleJumpKeyPress}
          />
          <button className={styles.btnAccentSm} onClick={jumpToLine}>
            Jump
          </button>
        </div>
        <div className={styles.cursorIndicator}>
          Ln {cursor.line}, Col {cursor.col}
        </div>
      </div>
    </div>
  );
}