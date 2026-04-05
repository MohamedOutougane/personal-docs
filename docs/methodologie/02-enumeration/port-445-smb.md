---
sidebar_position: 6
title: "Port 445 - SMB"
---

# Port 445 - SMB

**Service** : Server Message Block (partage de fichiers Windows)
**Outil** : `smbclient`
**Ports associes** : 135 (RPC), 139 (NetBIOS)

## Checklist

### 1. Lister les partages

- [ ] Lister les partages disponibles (connexion anonyme) :

```bash
smbclient -L <IP>
# Password: (Entree, mot de passe vide)
```

### 2. Identifier les partages interessants

- [ ] **Ignorer** `ADMIN$`, `C$` (acces admin requis)
- [ ] **Ignorer** `IPC$` (generalement vide)
- [ ] **Cibler** les partages custom (noms inhabituels comme `WorkShares`, `Data`, `Backup`, etc.)

### 3. Se connecter et explorer

- [ ] Se connecter au partage interessant :

```bash
smbclient \\\\<IP>\\<sharename>
# Password: (Entree)
```

- [ ] `ls` → lister le contenu
- [ ] Explorer **chaque dossier** (`cd`)
- [ ] `get <fichier>` pour telecharger **tout** ce qui est accessible

### 4. Analyser les fichiers

- [ ] Fichiers texte → credentials, notes internes, to-do lists
- [ ] Documents → informations sensibles
- [ ] `flag.txt` → le flag !

## Scenarios vecus

| Situation | Ce qui s'est passe | Box |
|-----------|-------------------|-----|
| Partage `WorkShares` accessible en anonyme | 2 dossiers utilisateurs : Amy.J (worknotes.txt) et James.P (flag.txt) | `Dancing` |

:::info Reflexe
Meme si un fichier semble anodin (comme `worknotes.txt`), **telecharger tout**. Sur des machines avancees, ces fichiers contiennent souvent des indices pour la suite.
:::

## Liens

- Commandes SMB : [Cheatsheet - SMB](/docs/cheatsheet/enumeration/smb)
