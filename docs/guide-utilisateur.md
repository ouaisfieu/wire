# Guide utilisateur – FAUXNET

**Version : 1.0**  
**Diffusion : Public interne**

---

## 1. Objet du guide

Ce document présente les fonctionnalités essentielles de FAUXNET,  
environnement de simulation destiné à :

- la formation des agents,
- la mise en situation sur scénarios informationnels,
- la consultation d’une bibliothèque documentaire interne,
- la démonstration d’outils (console, terminal, notes, visionneuse Markdown).

Il s’adresse à tout utilisateur amené à interagir avec FAUXNET dans  
un cadre pédagogique, de sensibilisation ou d'expérimentation contrôlée.

---

## 2. Navigation générale

L’interface comporte une **barre de navigation supérieure** donnant accès à :

- **Espace intégral** : affichage multi-outils dans une interface unique.  
- **Navigateur** : exploration des contenus simulés (sites internes).  
- **Console** : accès aux diagnostics, journaux et procédures internes.  
- **Terminal** : environnement d’exécution de commandes simplifiées.  
- **Markdown** : éditeur et visionneuse de fichiers `.md`.

Chaque module est autonome et peut être ouvert ou fermé sans impact  
sur les autres.

---

## 3. Visionneuse Markdown

La visionneuse permet deux usages :

### 3.1 Explorer les fichiers internes
Ces fichiers sont situés dans le dossier `docs/`.  
Le bouton **“Charger docs/ FAUXNET”** lit l’index `docs/index.json`  
et affiche la bibliothèque disponible.

Les fichiers internes comportent un niveau de diffusion indiqué dans leur  
nom (`_public`, `_internal`, `_confidential`, `_classified`).

### 3.2 Charger un dossier local
Le bouton **“Scanner un dossier local”** permet de parcourir un dossier  
du poste utilisateur (lecture seule), afin de consulter des fichiers `.md`.

Aucune donnée n’est transmise ni sauvegardée : l’opération se fait localement.

---

## 4. Console & Terminal

### Console
- accès aux journaux simulés,  
- consultation de procédures,  
- navigation entre modules (commande `open`).

### Terminal
- environnement minimaliste permettant d’exécuter des commandes simples,  
- exploration pédagogique de la structure FAUXNET.

---

## 5. Limitations techniques

FAUXNET est conçu comme un environnement statique :

- pas de connexion réseau obligatoire,  
- pas d’accès aux répertoires système en dehors des dossiers explicitement sélectionnés,  
- fonctionnel sur clé USB, serveur statique ou GitHub Pages.

Certaines opérations (listing de dossiers, accès fichiers internes)  
nécessitent des fichiers complémentaires (ex. `index.json`).

---

## 6. Usage recommandé

FAUXNET doit être utilisé pour :

- découvrir des mécanismes informationnels,  
- réaliser des exercices et simulations,  
- consulter des documents internes,  
- produire des notes pédagogiques.

Il ne doit pas être utilisé pour stocker ou manipuler des données réelles  
potentiellement sensibles.

---

## 7. Assistance

Pour toute question relative à FAUXNET :

- consulter les documents de la bibliothèque interne (`docs/`),  
- utiliser la commande `help` dans la console ou le terminal,  
- ou se référer au responsable de la formation numérique.
