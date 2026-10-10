---
description: Transforme un texte brut de recette de cuisine en article markdown dans src/content/posts/cuisine/
agent: recipe-to-markdown
---

Transforme la recette brute fournie ci-dessous en un article markdown conforme au format du blog cuisine (`src/content/posts/cuisine/<slug>.md`) en utilisant l'agent `recipe-to-markdown`.

Applique les règles suivantes :

- **Langue** : français.
- **Conjugaison** : infinitif pour tous les verbes (« Verser », « Mélanger », « Ajouter »), jamais d'impératif ni de tu/vous.
- **Style** : phrases courtes et simples, une action par phrase.
- **Quantités** : format compact (`250g`, `25 cl`, `1 cuillère à soupe`).
- **Auteur** : `jeremy-jousse`.
- **Date** : obtenir la date du jour au format `YYYY-MM-DD` via `date +%Y-%m-%d`.
- **coverImageSlug** : `''`.
- **subCategory** : choisir parmi `dessert`, `plat`, `aperitif`, `accompagnement`, `technique`.
- **Slug** : kebab-case dérivé du titre (ex: `galettes-de-sarrasin.md`).
- **Fichier de destination** : créer le fichier dans `src/content/posts/cuisine/<slug>.md`.

Texte brut de la recette :

```text
$ARGUMENTS
```
