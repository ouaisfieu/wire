# Classification des données et des documents

**Diffusion : Interne**  
**Référence : CL-CVA-20**

---

## 1. Principes

La classification a pour but de :

- protéger les informations sensibles,  
- adapter les mesures de sécurité au niveau de risque,  
- éviter la sur-classification comme la sous-classification.

Le niveau appliqué doit être **justifié** par le contenu,  
et non par le niveau hiérarchique du rédacteur.

---

## 2. Niveaux de classification

### 2.1 Public

- Contenu : informations pouvant être diffusées sans risque notable.  
- Exemples : éléments institutionnels généraux, documents de présentation.  
- Mention : aucune ou `Public interne`.

### 2.2 Interne

- Contenu : informations utiles au fonctionnement du service,  
  dont la diffusion large pourrait créer une gêne limitée.  
- Exemples : modes opératoires simplifiés, retours d’expérience non sensibles.  
- Mention : `Interne`.

### 2.3 Confidentiel

- Contenu : informations dont la divulgation non autorisée est susceptible de  
  porter atteinte à la sécurité, à l’image ou aux intérêts de l’organisation.  
- Exemples : éléments de vulnérabilité, détails de procédures de sécurité,  
  analyses ciblées sur des acteurs précis.  
- Mention : `Confidentiel`.

### 2.4 Classifié

- Contenu : informations dont la divulgation aurait un impact significatif,  
  voire critique, sur les intérêts protégés.  
- Exemples : analyses stratégiques détaillées, scénarios sensibles,  
  corrélations entre données internes et renseignements externes.  
- Mention : `Classifié – Diffusion restreinte`.

---

## 3. Application dans FAUXNET

Les fichiers Markdown de la bibliothèque respectent la convention suivante :

- `*_public.md`       → Public / Public interne  
- `*_internal.md`     → Interne  
- `*_confidential.md` → Confidentiel  
- `*_classified.md`   → Classifié

Cette convention est destinée à faciliter :

- le **filtrage automatique** dans les outils,  
- la sensibilisation des utilisateurs à la notion de niveau de diffusion.
