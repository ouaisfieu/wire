// Console FAUXNET — version optimisée et cohérente avec le terminal

(function () {
  const out = document.getElementById("console-output");
  const input = document.getElementById("console-input");
  const promptSpan = document.getElementById("console-prompt");
  const roleSpan = document.getElementById("console-role");

  if (!out || !input || !promptSpan || !roleSpan) {
    console.warn("Console FAUXNET : éléments manquants dans le DOM.");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const role = (params.get("role") || "invité").toLowerCase();

  const state = {
    history: [],
    historyIndex: -1,
  };

  function setPrompt() {
    // Ex : [invité] >
    promptSpan.textContent = `[${role}] >`;
    roleSpan.textContent = role;
  }

  function println(text = "") {
    out.textContent += text + "\n";
    out.scrollTop = out.scrollHeight;
  }

  function showBanner() {
    println("=== MEGACORP // CONSOLE DE SUPERVISION ===");
    println(`Profil connecté : ${role}`);
    println("");
    println("Tape 'help' pour la liste des commandes disponibles.");
    println("");
  }

  function cmdHelp() {
    println("Commandes disponibles :");
    println("  help          - affiche cette aide");
    println("  clear         - efface l'écran");
    println("  sites         - liste les services FAUXNET officiels");
    println("  about         - à propos de MegaCorp et FAUXNET");
    println("  logs          - affiche un extrait des journaux internes");
    println("  leak          - affiche des informations non-autorisées");
    println("  open [outil]  - ouvre un module (browser, terminal, workspace)");
    println("  echo [texte]  - répète le texte");
    println("  exit          - retour au portail FAUXNET");
  }

  function cmdSites() {
    println("Services FAUXNET autorisés :");
    println("  https://search.corp   - moteur de recherche officiel");
    println("  https://news.corp     - information vérifiée et apaisante");
    println("  https://social.corp   - réseau social à sens unique");
    println("");
    println("Note interne : d'autres services existent, mais leur visibilité");
    println("est jugée 'non-stratégique' pour l'équilibre psychologique.");
  }

  function cmdAbout() {
    println("À PROPOS DE MEGACORP :");
    println("  - Gestion centralisée de l'information");
    println("  - Interface unique pour toutes vos décisions");
    println("  - Réduction active de la surcharge cognitive");
    println("");
    println("Slogan officiel : 'Vous n'avez plus besoin de chercher.'");
  }

  function cmdLogs() {
    const now = new Date();
    const ts = now.toISOString().slice(0, 19).replace("T", " ");
    println("=== EXTRAIT DES JOURNAUX (VISUALISATION LIMITÉE) ===");
    println(`${ts} [INFO]  Synchronisation des préférences d'affichage.`);
    println(`${ts} [INFO]  Filtre de contenu : mode 'confort émotionnel'.`);
    println(`${ts} [WARN]  Tentative d'accès à un domaine non-certifié.`);
    println(
      `${ts} [INFO]  Redirection transparente vers une source approuvée.`
    );
    println(
      `${ts} [DEBUG] Champ 'curiosité' de l'utilisateur réduit à 37%.`
    );
    println("");
    println("Astuce : certains logs ne sont pas affichés par défaut.");
  }

  function cmdLeak() {
    println("=== FUITE D'INFORMATIONS (NON DIFFUSABLE) ===");
    println(
      "- Les résultats de search.corp sont triés par impact commercial,"
    );
    println("  puis par conformité narrative, jamais par pertinence brute.");
    println(
      "- Les articles de news.corp sont générés à partir de 'grilles de"
    );
    println("  sérénité' : tout ce qui inquiète trop est minimisé ou reporté.");
    println(
      "- social.corp ne montre que les publications qui renforcent le"
    );
    println("  sentiment que rien ne peut réellement changer.");
    println("");
    println(
      "Indice : certains fichiers du faux Internet contiennent des messages"
    );
    println(
      "cachés dans les commentaires HTML. Tu peux ouvrir le code source."
    );
    println("");
    println(
      "Rappel : cette commande ne devrait pas être accessible à un rôle '" +
        role +
        "'."
    );
  }

  function cmdOpen(arg) {
    const tool = (arg || "").toLowerCase();
    switch (tool) {
      case "browser":
      case "navigateur":
        window.location.href = "browser.html";
        break;
      case "terminal":
        window.location.href = "terminal.html?user=" + encodeURIComponent(role);
        break;
      case "workspace":
      case "espace":
        window.location.href = "workspace.html";
        break;
      case "":
        println("Utilisation : open [browser|terminal|workspace]");
        break;
      default:
        println(`Outil inconnu : ${tool}`);
        println("Utilisation : open [browser|terminal|workspace]");
    }
  }

  function handleCommand(raw) {
    const line = raw.trim();
    if (!line) return;

    const [command, ...rest] = line.split(/\s+/);
    const arg = rest.join(" ");

    switch (command.toLowerCase()) {
      case "help":
        cmdHelp();
        break;

      case "clear":
        out.textContent = "";
        break;

      case "sites":
        cmdSites();
        break;

      case "about":
        cmdAbout();
        break;

      case "logs":
        cmdLogs();
        break;

      case "leak":
        cmdLeak();
        break;

      case "open":
        cmdOpen(arg);
        break;

      case "echo":
        println(arg);
        break;

      case "exit":
        window.location.href = "index.html";
        break;

      default:
        println(`Commande inconnue : ${command}`);
        println("Tape 'help' pour la liste des commandes.");
    }
  }

  // Initialisation
  setPrompt();
  showBanner();
  cmdHelp();
  println("");

  input.focus();

  // Gestion clavier + historique
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value;
      // Affiche la commande
      println(`${promptSpan.textContent} ${value}`);

      if (value.trim()) {
        state.history.push(value);
        state.historyIndex = state.history.length;
      }

      handleCommand(value);
      input.value = "";
    } else if (e.key === "ArrowUp") {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        input.value = state.history[state.historyIndex] || "";
        setTimeout(() => {
          input.setSelectionRange(input.value.length, input.value.length);
        }, 0);
      }
    } else if (e.key === "ArrowDown") {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        input.value = state.history[state.historyIndex] || "";
      } else {
        state.historyIndex = state.history.length;
        input.value = "";
      }
    }
  });
})();
