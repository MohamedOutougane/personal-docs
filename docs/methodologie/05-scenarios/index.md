---
sidebar_position: 1
title: Vue d'ensemble
---

# Scenarios (chaines d'attaque)

Cette section documente des **chaines d'attaque completes** rencontrees pendant les boxes. Chaque scenario montre comment plusieurs techniques s'enchainent de bout en bout.

## Pourquoi cette section ?

En pentest, les vulnerabilites ne sont presque jamais exploitees seules. C'est la **combinaison** de plusieurs faiblesses qui donne un acces complet. Ces scenarios te montrent comment les pieces s'assemblent.

## Index des scenarios

| Scenario | Chaine | Boxes |
|----------|--------|-------|
| [FTP vers login web](./ftp-to-web-login.md) | FTP anonyme → credentials → login web | `Crocodile` |
| [LFI vers WinRM](./lfi-to-winrm.md) | LFI → Responder → hash crack → Evil-WinRM | `Responder` |
| [SSH vers base de donnees interne](./ssh-to-internal-db.md) | FTP → creds → SSH → port forwarding → PostgreSQL | `Funnel` |
| [SSTI vers RCE](./ssti-to-rce.md) | Detection SSTI → sandbox bypass → RCE | `Bike` |

## Comment alimenter cette section

A chaque box ou la chaine d'attaque implique **2 etapes ou plus**, creer une page ici avec :
1. Le resume de la chaine
2. Les etapes detaillees avec les commandes
3. Les liens vers les pages de cheatsheet et methodologie correspondantes
