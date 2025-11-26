// js/markdown-viewer.js
// Visionneuse avancée : bibliothèque locale + dossier docs/

(function () {
  const viewer = document.getElementById("mdv-content");
  const fileListEl = document.getElementById("mdv-file-list");
  const scanLocalBtn = document.getElementById("mdv-scan-local");
  const dirInput = document.getElementById("mdv-dir-input");
  const loadDocsBtn = document.getElementById("mdv-load-docs");

  if (!viewer || !fileListEl) return;

  const parse = window.FauxMarkdown?.parse || ((t) => t);

  // Conteneurs pour les fichiers
  let localFiles = {}; // chemin -> File
  let docsFiles = []; // tableau de chemins (strings)

  function clearList() {
    fileListEl.innerHTML = "";
  }

  function createSectionTitle(label) {
    const li = document.createElement("li");
    li.className = "mdv-section-title";
    li.textContent = label;
    return li;
  }

  function createFileItem(source, path, displayName) {
    const li = document.createElement("li");
    li.className = "mdv-file-item";
    li.dataset.source = source; // "local" ou "docs"
    li.dataset.path = path;
    li.textContent = displayName || path;
    li.title = path;
    return li;
  }

  function renderFileList() {
    clearList();
    let hasSomething = false;

    if (Object.keys(localFiles).length > 0) {
      fileListEl.appendChild(createSectionTitle("Dossier local"));
      Object.keys(localFiles)
        .sort()
        .forEach((p) => {
          fileListEl.appendChild(createFileItem("local", p, p));
        });
      hasSomething = true;
    }

    if (docsFiles.length > 0) {
      fileListEl.appendChild(createSectionTitle("docs/ FAUXNET"));
      docsFiles
        .slice()
        .sort()
        .forEach((p) => {
          fileListEl.appendChild(
            createFileItem("docs", p, "docs/" + p.replace(/^\.?\//, ""))
          );
        });
      hasSomething = true;
    }

    if (!hasSomething) {
      const li = document.createElement("li");
      li.className = "mdv-empty";
      li.textContent = "Aucun fichier indexé. Utilise les boutons ci-dessus.";
      fileListEl.appendChild(li);
    }
  }

  function showContent(text) {
    viewer.innerHTML = parse(text);
    viewer.classList.remove("md-viewer-empty");
  }

  // ─────────── Scan dossier local (utilisateur) ───────────

  if (scanLocalBtn && dirInput) {
    scanLocalBtn.addEventListener("click", () => dirInput.click());

    dirInput.addEventListener("change", () => {
      const files = Array.from(dirInput.files || []);
      localFiles = {};
      files.forEach((file) => {
        const path = file.webkitRelativePath || file.name;
        if (/\.(md|markdown|txt)$/i.test(path)) {
          localFiles[path] = file;
        }
      });
      renderFileList();
    });
  }

  // ─────────── Chargement docs/ FAUXNET via docs/index.json ───────────

  async function loadDocsIndex() {
    try {
      const res = await fetch("docs/index.json");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      if (Array.isArray(data.files)) {
        docsFiles = data.files;
      } else if (typeof data === "object" && Array.isArray(data)) {
        docsFiles = data;
      } else {
        docsFiles = [];
      }
      renderFileList();
    } catch (e) {
      console.warn("Impossible de charger docs/index.json :", e);
      docsFiles = [];
      renderFileList();
      viewer.innerHTML =
        "<p class='muted'>Impossible de charger <code>docs/index.json</code>. Vérifie qu'il existe et qu'il contient un tableau <code>files</code>.</p>";
    }
  }

  if (loadDocsBtn) {
    loadDocsBtn.addEventListener("click", loadDocsIndex);
  }

  // ─────────── Chargement initial via ?path=docs/... ───────────

  const params = new URLSearchParams(window.location.search);
  const pathParam = params.get("path");
  if (pathParam) {
    // On considère que c'est un fichier dans docs/
    docsFiles = [pathParam.replace(/^docs\//, "")];
    renderFileList();
    // on le charge tout de suite
    loadFromDocs(pathParam.replace(/^docs\//, ""));
  }

  // ─────────── Gestion des clics sur la liste ───────────

  async function loadFromLocal(path) {
    const file = localFiles[path];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      showContent(e.target.result);
    };
    reader.readAsText(file);
  }

  async function loadFromDocs(path) {
    const fullPath = "docs/" + path.replace(/^\.?\//, "");
    try {
      const res = await fetch(fullPath);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const text = await res.text();
      showContent(text);
    } catch (e) {
      console.warn("Erreur chargement docs/ :", e);
      viewer.innerHTML =
        "<p class='muted'>Impossible de charger <code>" +
        fullPath +
        "</code>.</p>";
    }
  }

  fileListEl.addEventListener("click", (e) => {
    const item = e.target.closest(".mdv-file-item");
    if (!item) return;
    const source = item.dataset.source;
    const path = item.dataset.path;

    if (source === "local") {
      loadFromLocal(path);
    } else if (source === "docs") {
      loadFromDocs(path);
    }
  });
})();
