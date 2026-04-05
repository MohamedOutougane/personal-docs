---
sidebar_position: 2
title: "Port 21 - FTP"
---

# Port 21 - FTP

**Service** : File Transfer Protocol
**Outil** : `ftp`

## Checklist

### 1. Tester la connexion anonyme

- [ ] Se connecter avec l'utilisateur `anonymous` et un mot de passe vide

```bash
ftp <IP>
# Name: anonymous
# Password: (Entree)
```

- **Si ca marche** → passer a l'etape 2
- **Si ca echoue** → chercher des credentials ailleurs (autre service, brute-force)

### 2. Lister et telecharger les fichiers

- [ ] `ls` pour voir le contenu
- [ ] `cd` pour naviguer dans les dossiers
- [ ] `get <fichier>` pour telecharger chaque fichier interessant

### 3. Analyser les fichiers recuperes

- [ ] **Fichiers texte** (.txt, .eml) → chercher des noms d'utilisateurs, mots de passe, indices
- [ ] **Fichiers PDF** → politique de mots de passe, documentation interne
- [ ] **Listes** → userlist, password list → utiliser sur un autre service (SSH, web login)

## Scenarios vecus

| Situation | Ce qui s'est passe | Action suivante | Box |
|-----------|-------------------|-----------------|-----|
| FTP anonyme + `flag.txt` | Flag directement accessible | Recuperer le flag | `Fawn` |
| FTP anonyme + listes d'users/passwords | Credentials en clair | Les utiliser sur le login web (port 80) | `Crocodile` |
| FTP anonyme + email + PDF | Mot de passe par defaut dans le PDF | Password spray SSH avec Hydra | `Funnel` |

## Liens

- Commandes FTP : [Cheatsheet - FTP](/docs/cheatsheet/enumeration/ftp)
- Brute-force : [Cheatsheet - Hydra](/docs/cheatsheet/exploitation/brute-force)
