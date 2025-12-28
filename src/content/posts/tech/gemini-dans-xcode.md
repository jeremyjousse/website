---
author: jeremy-jousse
title: Utiliser Gemini dans Xcode
publishedAt: '2025-12-28'
category: tech
subCategory: apple
tags:
  - xcode
  - gemini
  - ai
coverImageSlug: https://zottmann.org/uploads/2025/screenshot-2025-06-13-at-11.11.05.png
summary: Configurer Gemini comme assistant de code dans Xcode.
---

## La nouveauté

La version 26 de Xcode permet d'utiliser Gemini en tant qu'assistant de code.

## La configuration

Il faut d'abord créer une clé API dans [AiStudio](https://aistudio.google.com/api-keys).

Ensuite, il faut ajouter un nouveau fournisseur de modèle :

- **Type** : Internet Hosted
- **URL** : `https://generativelanguage.googleapis.com/v1beta/openai`
- **API Key** : `Bearer $apiKey` (remplacer `$apiKey` par la clé)
- **API Key Header** : `Authorization`
- **Description** : Gemini

## Le constat

La configuration est instable chez moi. Je dois ressaisir les informations à chaque fermeture de Xcode.
