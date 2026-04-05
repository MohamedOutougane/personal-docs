---
sidebar_position: 12
title: "Port 27017 - MongoDB"
---

# Port 27017 - MongoDB

**Service** : Base de donnees NoSQL
**Outil** : `mongosh`

## Checklist

### 1. Installer mongosh (si necessaire)

- [ ] Telecharger et extraire mongosh :

```bash
curl -O https://downloads.mongodb.com/compass/mongosh-2.3.2-linux-x64.tgz
tar xvf mongosh-2.3.2-linux-x64.tgz
```

:::tip
Utiliser la version **2.3.2** pour la compatibilite avec les vieilles instances MongoDB.
:::

### 2. Tenter une connexion sans authentification

- [ ] Se connecter directement :

```bash
./mongosh mongodb://<IP>:27017
```

- [ ] Verifier le warning : **"Access control is not enabled"** = jackpot

### 3. Explorer les bases de donnees

- [ ] `show dbs` → lister les bases
- [ ] Ignorer `admin`, `config`, `local` (bases systeme)
- [ ] **Cibler** les bases avec des noms suspects (`sensitive_information`, `users`, `webapp`, etc.)

### 4. Explorer les collections

- [ ] `use <database>`
- [ ] `show collections`
- [ ] `db.<collection>.find()` sur chaque collection

## Scenarios vecus

| Situation | Ce qui s'est passe | Box |
|-----------|-------------------|-----|
| MongoDB sans RBAC, base `sensitive_information` | Collection `flag` avec le flag | `MongoD` |

:::info Lecon
MongoDB, dans ses anciennes configurations, **n'active pas le controle d'acces par defaut**. Si un admin oublie de configurer le RBAC, tout est accessible.
:::

## Liens

- Commandes MongoDB : [Cheatsheet - Bases de donnees](/docs/cheatsheet/enumeration/databases)
