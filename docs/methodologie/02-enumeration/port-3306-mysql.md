---
sidebar_position: 8
title: "Port 3306 - MySQL"
---

# Port 3306 - MySQL / MariaDB

**Service** : Base de donnees relationnelle
**Outil** : `mysql`

## Checklist

### 1. Tenter une connexion root sans mot de passe

- [ ] Tester l'acces direct :

```bash
mysql -h <IP> -u root
```

- [ ] Si erreur SSL → ajouter `--skip-ssl`
- **Si ca marche** → passer a l'etape 2
- **Si ca echoue** → chercher des credentials ailleurs

### 2. Explorer les bases de donnees

- [ ] `SHOW databases;` → lister les bases
- [ ] Ignorer `information_schema`, `mysql`, `performance_schema` (bases systeme)
- [ ] **Cibler** les bases avec des noms custom (`htb`, `webapp`, `users`, etc.)

### 3. Explorer les tables

- [ ] `USE <database>;`
- [ ] `SHOW tables;`
- [ ] `SELECT * FROM <table>;` sur chaque table interessante

### 4. Chercher les donnees sensibles

- [ ] Tables `config` → flags, parametres
- [ ] Tables `users` → credentials
- [ ] Tables avec des noms suspects

## Scenarios vecus

| Situation | Ce qui s'est passe | Box |
|-----------|-------------------|-----|
| Root sans password, base `htb` | Table `config` avec 7 lignes dont le flag | `Sequel` |

## Liens

- Commandes SQL : [Cheatsheet - Bases de donnees](/docs/cheatsheet/enumeration/databases)
