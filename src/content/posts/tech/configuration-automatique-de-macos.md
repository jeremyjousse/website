---
author: jeremy-jousse
title: Configuration automatique de macOS
publishedAt: "2023-09-20"
updatedAt: "2023-10-12"
category: tech
subCategory: terminal
tags:
  - terminal
  - macOS
  - bash
coverImageSlug: configuration-automatique-de-macos
coverImageWidth:
coverImageHeight:
coverImageCredit: https://unsplash.com/fr/photos/macbook-pro-sur-surface-blanche-WiONHd_zYI4
summary: J'ai créé un repos git avec toutes les configurations d'installation et de parametrage des outils de développement que j'utilise au quotidien.
---

## Le besoin

Travailler sur plusieurs postes informatiques (professionnel, personnel) peut demander de nombreuses
heures afin de les maintenir à jour et identiques au niveau des dépendances (logiciels et outils de dévéloppement).

## Les tests

Il y a quelques années j'avais entammé l'utilisation de [Nix](https://nixos.org/) sur mon MacBook Pro,
mais Nix est bien plus pertinant en tant que système d'exploitation, qu'en simple gestionnaire de packet
sur MacOS.

## Le résultat

En me replongeant dans les mieux jours, le mot [dotfiles](https://dotfiles.github.io/) est revenu à ma mémoire.

Les _dotfiles_ en français fichiers points sont des fichiers de configuration situés à la racine du dossier utilisateur
sur les systèmes unix. Préfixés par des points (dot) ils sont donc masqués dans les explorateurs de fichiers.

J'en codé une [version personnelle](https://github.com/jeremyjousse/dot-files) de dot-file adaptée
à mon travail de tous le jours qui installe l'ensemble de mes dépendances logicielles et les outils de développement
que j'utilise au quotidien.
