# Notes – Expérimentations FAUXNET

**Diffusion : Interne**  
**Répertoire : /docs/notes/**  
**Référence : EXP-FAUXNET**

---

## 1. Objet

Ce document regroupe diverses observations réalisées lors d’expérimentations  
effectuées dans l’environnement FAUXNET.  
Il n’a pas vocation à produire une synthèse formelle,  
mais à consigner des retours d’expérience pour améliorer l’outil.

---

## 2. Scénarios testés

### 2.1 Navigation guidée
- Tests autour du faux navigateur interne.  
- Les utilisateurs s’orientent correctement si la sidebar est visible.  
- Les liens simulés reproduisent fidèlement les comportements attendus  
  (sélection de sources, impression de “réseau fermé”).

**Observation** : certains utilisateurs pensent initialement être  
dans un vrai intranet ; la présence d’un thème distinct limite l’ambiguïté.

---

### 2.2 Console de supervision
- Bonne compréhension des commandes `logs`, `sites`, `about`.  
- Le niveau de détail suffisant donne un sentiment de “transparence opérationnelle”,  
  sans divulguer de données sensibles.

**Point d’attention** : éviter la surabondance de jargon technique  
pour garantir un usage en formation débutant.

---

### 2.3 Terminal – commandes simplifiées
- L’effet “shell minimal” permet une approche progressive.  
- Commandes pédagogiques (`help`, `info`, `leak`) appréciées.

**Suggestion** : ajouter une commande `man [outil]`  
qui affiche une courte description d’un module FAUXNET.

---

## 3. Tests sur la bibliothèque Markdown

### Import local
- Fonctionne correctement avec des dossiers de plusieurs dizaines de fichiers.  
- Le tri par nom facilite la navigation.

### Bibliothèque interne (`docs/`)
- Les noms structurés (`xx-nom_niveau.md`) améliorent la lisibilité.  
- Les niveaux de diffusion intégrés dans le nom facilitent un éventuel filtrage.

**Proposition** : ajouter une couleur ou un pictogramme selon la classification.

---

## 4. Pistes d'amélioration

1. **Filtre de fichiers**  
   - par niveau (`public / internal / confidential / classified`),  
   - par type (`note`, `procédure`, `analyse`, `exercice`).

2. **Annotations temporaires**  
   Ajouter une fonction permettant d’ajouter des notes locales (non sauvegardées).

3. **Mode démo**  
   Un mode restreint pour montrer FAUXNET sans les fichiers internes de production.

4. **Fonction d’export complet**  
   Permettre d’exporter une arborescence Markdown complète dans un zip.

---

## 5. Commentaires libres

- FAUXNET est perçu comme “réaliste mais non menaçant”.  
- Les utilisateurs identifient bien la séparation entre contenus pédagogiques  
  et contenus organisationnels sérieux.  
- Les expérimentations ont montré que l’ajout d’un faux contexte de renseignement  
  améliore la compréhension des enjeux de classification et de diffusion.

Fin du document.
