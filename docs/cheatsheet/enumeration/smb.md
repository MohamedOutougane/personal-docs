---
sidebar_position: 2
title: "SMB"
---

# SMB (Server Message Block)

**Port** : 445/tcp (+ 135, 139 associes)
**Outil** : `smbclient`

SMB est le protocole de partage de fichiers Windows. Une mauvaise configuration permet souvent une connexion anonyme (sans mot de passe).

## Lister les partages

```bash
smbclient -L <IP>
```

On appuie sur **Entree** sans rien ecrire quand le mot de passe est demande (connexion anonyme).

> Box : `Dancing`

### Sortie typique

```
 Sharename       Type      Comment
 ---------       ----      -------
 ADMIN$          Disk      Remote Admin
 C$              Disk      Default share
 IPC$            IPC       Remote IPC
 WorkShares      Disk
```

## Se connecter a un partage

```bash
smbclient \\\\<IP>\\<sharename>
```

### Partages classiques

| Partage | Description | Acces anonyme ? |
|---------|-------------|-----------------|
| `ADMIN$` | Administration a distance | Non (Access Denied) |
| `C$` | Racine du disque C: | Non (Access Denied) |
| `IPC$` | Communication inter-processus | Connexion OK mais vide |
| `WorkShares` | Partage custom | **Oui** |

> Box : `Dancing`

## Commandes dans le shell SMB

| Commande | Description |
|----------|-------------|
| `ls` | Lister les fichiers et dossiers |
| `cd <dir>` | Changer de repertoire |
| `get <file>` | Telecharger un fichier |
| `put <file>` | Uploader un fichier |
| `exit` | Quitter |

### Exemple complet

```bash
smb: \> ls
  Amy.J    D  0  Mon Mar 29 09:08:24 2021
  James.P  D  0  Thu Jun  3 08:38:03 2021

smb: \> cd James.P
smb: \James.P\> ls
  flag.txt  A  32  Mon Mar 29 09:26:57 2021

smb: \James.P\> get flag.txt
smb: \> exit
```

> Box : `Dancing`
