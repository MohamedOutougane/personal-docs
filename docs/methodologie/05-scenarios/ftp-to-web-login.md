---
sidebar_position: 2
title: "FTP → Login web"
---

# Scenario : FTP anonyme vers login web

**Box** : `Crocodile`
**Chaine** : FTP anonyme → recuperation de credentials → login sur le panel web

## Resume

```
FTP (port 21)              HTTP (port 80)
    │                          │
    ├── anonymous login        ├── Gobuster → /login.php
    ├── get allowed.userlist   │
    ├── get allowed.userlist.passwd
    │                          │
    └────── credentials ──────→├── Login avec admin / rKXM59ESxesUFHAd
                               └── FLAG
```

## Etapes

### 1. Reconnaissance

- nmap revele **port 21 (FTP)** et **port 80 (HTTP)**

### 2. Enumeration FTP

- Connexion anonyme → `ls` → 2 fichiers :
  - `allowed.userlist` → liste d'utilisateurs (dont `admin`)
  - `allowed.userlist.passwd` → mots de passe associes

### 3. Enumeration Web

- Gobuster avec `-x php,html` → decouvre `/login.php`

### 4. Exploitation

- Combiner les credentials FTP avec le formulaire `/login.php`
- `admin` + le bon mot de passe → acces + flag

## Lecon

**Toujours croiser les informations entre les services.** Des fichiers trouves sur un service (FTP) peuvent debloquer un autre service (web).

## Liens

- [Methodologie - Port 21 FTP](../02-enumeration/port-21-ftp.md)
- [Methodologie - Port 80 HTTP](../02-enumeration/port-80-http.md)
- [Cheatsheet - FTP](/docs/cheatsheet/enumeration/ftp)
