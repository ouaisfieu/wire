// Terminal FAUXNET — version simplifiée et robuste

(function () {
  const output = document.getElementById("term-output");
  const input = document.getElementById("term-input");
  const promptSpan = document.getElementById("term-prompt");
  const container = document.getElementById("terminal");

  // Sécurité : si le DOM ne correspond pas, on ne fait rien
  if (!output || !input || !promptSpan || !container) {
    console.warn("Terminal FAUXNET : éléments manquants dans le DOM.");
    return;
  }

  // Lecture éventuelle du user dans l'URL : ?user=alice
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user") || "user";

  const state = {
    history: [],
    historyIndex: -1,
  };

  function setPrompt() {
    promptSpan.textContent = `${user}@fauxnet:~$`;
  }

  function println(text = "") {
    output.textContent += text + "\n";
    output.scrollTop = output.scrollHeight;
  }

  function showWelcome() {
    println("FAUXNET shell v1.0");
    println("Environnement : simulation de terminal contrôlé par MegaCorp.");
    println("");
    println("Tape 'help' pour voir les commandes disponibles.");
    println("");
  }

  function handleCommand(raw) {
    const line = raw.trim();
    if (!line) return;

    const [command, ...rest] = line.split(/\s+/);
    const arg = rest.join(" ");

    switch (command.toLowerCase()) {
      case "help":
        println("Commandes disponibles :");
        println("  help       - affiche cette aide");
        println("  clear      - efface l'écran");
        println("  whoami     - affiche l'utilisateur courant");
        println("  info       - affiche le discours officiel de MegaCorp");
        println("  echo [txt] - répète le texte");
        println("  exit       - retourne au portail FAUXNET");
        break;

      case "clear":
        output.textContent = "";
        break;

      case "whoami":
        println(`${user}@fauxnet (profil : conformité standard)`);
        break;

      case "info":
        println("Version publique :");
        println("  MegaCorp protège votre expérience en filtrant les idées nuisibles.");
        println("");
        println("Annexe confidentielle (fuite) :");
        println("  - réduction de l'exposition à la complexité");
        println("  - encouragement de la passivité informationnelle");
        println("  - dépendance douce aux interfaces propriétaires");
        println("");
        println("Recommandation : garder ces informations pour toi.");
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
  showWelcome();
  input.focus();

  // Gestion du clavier
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value;
      // Affiche la commande tapée
      println(`${promptSpan.textContent} ${value}`);

      // Historique
      if (value.trim()) {
        state.history.push(value);
        state.historyIndex = state.history.length;
      }

      // Traite la commande
      handleCommand(value);

      input.value = "";
    } else if (e.key === "ArrowUp") {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        input.value = state.history[state.historyIndex] || "";
        // Place le curseur à la fin
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
