---
sidebar_position: 7
title: "Port 873 - Rsync"
---

# Port 873 - Rsync

**Service** : Rsync (synchronisation de fichiers a distance)
**Outil** : `rsync`

## Checklist

### 1. Lister les modules disponibles

- [ ] Verifier quels modules sont accessibles :

```bash
rsync --list-only <IP>::
```

### 2. Explorer le contenu d'un module

- [ ] Lister les fichiers du module :

```bash
rsync --list-only <IP>::<module>
```

### 3. Telecharger les fichiers

- [ ] Telecharger les fichiers interessants :

```bash
rsync <IP>::<module>/<fichier> .
```

## Scenarios vecus

| Situation | Ce qui s'est passe | Box |
|-----------|-------------------|-----|
| Module `public` accessible sans auth | `flag.txt` directement telechargeable | `Synced` |

## Liens

- Commandes Rsync : [Cheatsheet - Autres services](/docs/cheatsheet/enumeration/autres-services)
