---
sidebar_position: 3
title: "FTP"
---

# FTP (File Transfer Protocol)

**Port** : 21/tcp
**Service courant** : vsftpd 3.0.3

## Connexion anonyme

```bash
ftp <IP>
```

- **Utilisateur** : `anonymous`
- **Mot de passe** : (vide, appuyer sur Entree)

> Boxes : `Fawn`, `Crocodile`, `Funnel`

## Commandes FTP

| Commande | Description |
|----------|-------------|
| `ls` / `dir` | Lister les fichiers |
| `cd <dir>` | Changer de repertoire |
| `get <file>` | Telecharger un fichier |
| `mget *` | Telecharger plusieurs fichiers |
| `put <file>` | Uploader un fichier |
| `binary` | Passer en mode binaire (pour fichiers non-texte) |
| `exit` / `bye` | Quitter |

## Fichiers sensibles trouves via FTP

| Fichier | Contenu | Box |
|---------|---------|-----|
| `flag.txt` | Flag HTB | `Fawn` |
| `allowed.userlist` | Liste d'utilisateurs | `Crocodile` |
| `allowed.userlist.passwd` | Mots de passe | `Crocodile` |
| `mail_from_john.eml` | Email avec indices | `Funnel` |
| `password_policy.pdf` | Politique de mots de passe | `Funnel` |

:::info Reflexe
Quand nmap montre un service FTP, testez **toujours** la connexion anonyme. C'est la premiere chose a verifier.
:::
