---
sidebar_position: 1
title: Introduction
---

# Cheatsheet

## C'est quoi ?

Le **Cheatsheet** est un **dictionnaire de reference rapide**. Il regroupe toutes les commandes, outils et techniques que j'ai utilises au fil de mes writeups, organises par categorie.

C'est l'endroit ou tu vas quand tu sais **quel outil utiliser** mais que tu ne te rappelles plus de la **syntaxe exacte** ou des **flags**.

## Quelle difference avec la Methodologie ?

| | Cheatsheet | [Methodologie](/docs/methodologie) |
|---|---|---|
| **Question** | *"Comment j'utilise cet outil ?"* | *"Je vois X, je fais quoi ?"* |
| **Organisation** | Par outil / technique | Par situation / etape du pentest |
| **Format** | Commandes + flags + exemples | Checklists + arbres de decision |
| **Exemple** | "Voici la syntaxe de nmap -sC -sV" | "J'ai un port 80 ouvert, je fais quoi ?" |

**En resume** : la methodologie te dit **quoi faire**, le cheatsheet te dit **comment le faire**.

## Comment l'utiliser

1. Tu sais quel outil utiliser → **cherche la page de l'outil** dans la sidebar
2. Tu trouves la commande avec ses flags et un exemple concret
3. Chaque commande est taguee avec la **box d'origine** pour retrouver le contexte complet dans les [Writeups](/writeups)

## Comment l'alimenter

A chaque nouvelle box craquee :

1. **Identifier** les nouvelles commandes/techniques utilisees
2. **Trouver** la page correspondante dans la section appropriee
3. **Ajouter** la commande avec un commentaire et la box d'origine
4. Si c'est un **nouveau service ou technique**, creer une nouvelle page dans la bonne categorie

## Organisation

| Section | Contenu |
|---------|---------|
| **Reconnaissance** | Decouverte d'hotes (ping), scan de ports (nmap) |
| **Enumeration** | Web (gobuster, wappalyzer), SMB, FTP, bases de donnees, autres services |
| **Exploitation** | Credentials par defaut, SQLi, SSTI, LFI/RFI, brute-force (hydra), hash cracking (john) |
| **Post-Exploitation** | Pivoting (SSH port forwarding), acces distant (evil-winrm, SSH, RDP), extraction de donnees |
