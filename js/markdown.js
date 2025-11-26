// js/markdown.js
// Parseur markdown simplifié + module éditeur FAUXNET

(function () {
  // ────────────────────────── PARSEUR MARKDOWN ──────────────────────────

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function parseInline(text) {
    // code inline
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    // gras
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    // italique
    text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    // liens [texte](url)
    text = text.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );
    return text;
  }

  function parseMarkdown(md) {
    const lines = md.replace(/\r\n/g, "\n").split("\n");
    let html = "";
    let inList = false;
    let listType = null;
    let inCodeBlock = false;
    let codeBuffer = [];

    function closeList() {
      if (!inList) return;
      html += listType === "ol" ? "</ol>" : "</ul>";
      inList = false;
      listType = null;
    }

    function closeCodeBlock() {
      if (!inCodeBlock) return;
      html += "<pre><code>" + escapeHtml(codeBuffer.join("\n")) + "</code></pre>";
      inCodeBlock = false;
      codeBuffer = [];
    }

    lines.forEach((rawLine) => {
      let line = rawLine;

      // Bloc de code (``` )
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          closeCodeBlock();
        } else {
          closeList();
          inCodeBlock = true;
          codeBuffer = [];
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Titres
      const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (hMatch) {
        closeList();
        const level = hMatch[1].length;
        const content = parseInline(escapeHtml(hMatch[2]));
        html += `<h${level}>${content}</h${level}>`;
        return;
      }

      // Listes
      const ulMatch = line.match(/^\s*[-*+]\s+(.+)$/);
      const olMatch = line.match(/^\s*\d+\.\s+(.+)$/);

      if (ulMatch || olMatch) {
        const item = parseInline(escapeHtml((ulMatch || olMatch)[1]));
        const currentType = ulMatch ? "ul" : "ol";

        if (!inList || listType !== currentType) {
          closeList();
          html += currentType === "ul" ? "<ul>" : "<ol>";
          inList = true;
          listType = currentType;
        }
        html += "<li>" + item + "</li>";
        return;
      }

      // Ligne vide
      if (!line.trim()) {
        closeList();
        html += "<br />";
        return;
      }

      // Paragraphe standard
      closeList();
      html += "<p>" + parseInline(escapeHtml(line)) + "</p>";
    });

    closeList();
    closeCodeBlock();
    return html;
  }

  // Rendre le parseur dispo pour d'autres modules
  window.FauxMarkdown = {
    parse: parseMarkdown,
  };

  // ────────────────────────── ÉDITEUR (markdown.html) ──────────────────────────

  function initEditor() {
    const editor = document.getElementById("md-editor");
    if (!editor) return; // on est sur la visionneuse, pas sur l'éditeur

    const textarea = document.getElementById("md-input");
    const preview = document.getElementById("md-preview");
    const toolbar = editor.querySelector(".md-toolbar");
    const importBtn = document.getElementById("md-import-btn");
    const exportBtn = document.getElementById("md-export-btn");
    const fileInput = document.getElementById("md-file-input");

    if (!textarea || !preview || !toolbar) return;

    function render() {
      const text = textarea.value;
      preview.innerHTML = parseMarkdown(text);
    }

    textarea.addEventListener("input", render);

    // Toolbar : insertion de syntaxe Markdown
    function surroundSelection(before, after) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      const selected = value.slice(start, end);
      const newText = before + selected + after;

      textarea.value = value.slice(0, start) + newText + value.slice(end);
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selected.length;
      render();
    }

    function insertAtLineStart(prefix) {
      const start = textarea.selectionStart;
      const value = textarea.value;

      // Trouver le début de la ligne
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      textarea.value =
        value.slice(0, lineStart) + prefix + value.slice(lineStart);
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + prefix.length;
      render();
    }

    toolbar.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-md]");
      if (!btn) return;
      const action = btn.dataset.md;

      switch (action) {
        case "h1":
          insertAtLineStart("# ");
          break;
        case "h2":
          insertAtLineStart("## ");
          break;
        case "bold":
          surroundSelection("**", "**");
          break;
        case "italic":
          surroundSelection("*", "*");
          break;
        case "link":
          surroundSelection("[texte](", ")");
          break;
        case "ul":
          insertAtLineStart("- ");
          break;
        case "code":
          surroundSelection("`", "`");
          break;
        case "quote":
          insertAtLineStart("> ");
          break;
      }
    });

    // Import de fichier .md
    if (importBtn && fileInput) {
      importBtn.addEventListener("click", () => fileInput.click());

      fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          textarea.value = e.target.result;
          render();
        };
        reader.readAsText(file);
      });
    }

    // Export en .md
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const content = textarea.value || "";
        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        const defaultName = "fauxnet-note.md";
        a.href = url;
        a.download = defaultName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    // Rendu initial
    render();
  }

  document.addEventListener("DOMContentLoaded", initEditor);
})();
