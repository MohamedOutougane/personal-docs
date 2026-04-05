---
sidebar_position: 11
title: "Port 6379 - Redis"
---

# Port 6379 - Redis

**Service** : Base de donnees cle-valeur en memoire
**Outil** : `redis-cli`

## Checklist

### 1. Tenter une connexion sans authentification

- [ ] Se connecter directement :

```bash
redis-cli -h <IP>
```

### 2. Recuperer les infos du serveur

- [ ] Lancer la commande `info` pour voir la configuration et les bases disponibles
- [ ] Reperer la section `Keyspace` → elle indique quelles bases contiennent des donnees

### 3. Explorer les donnees

- [ ] Selectionner la base qui contient des donnees :

```bash
select 0
```

- [ ] Lister toutes les cles :

```bash
keys *
```

- [ ] Recuperer la valeur de chaque cle :

```bash
get <key>
```

## Scenarios vecus

| Situation | Ce qui s'est passe | Box |
|-----------|-------------------|-----|
| Redis sans auth, base 0 avec une cle `flag` | `get flag` → flag recupere | `Redeemer` |

## Liens

- Commandes Redis : [Cheatsheet - Bases de donnees](/docs/cheatsheet/enumeration/databases)
