---
sidebar_position: 3
title: "Port 22 - SSH"
---

# Port 22 - SSH

**Service** : Secure Shell
**Outil** : `ssh`

## Checklist

### 1. Ne PAS commencer par SSH

- [ ] SSH est rarement le point d'entree direct sur les boxes debutant
- [ ] **Chercher d'abord** des credentials sur les autres services (FTP, web, SMB)
- [ ] SSH devient utile **apres** avoir trouve un couple user/password

### 2. Si tu as des credentials

- [ ] Tenter une connexion directe :

```bash
ssh <user>@<IP>
```

### 3. Si tu as une liste d'utilisateurs + un mot de passe probable

- [ ] Lancer un **password spray** avec Hydra :

```bash
hydra -L usernames.txt -p '<password>' <IP> ssh
```

### 4. Une fois connecte

- [ ] Verifier les services locaux avec `ss -tl` → il peut y avoir des services caches (DB, etc.)
- [ ] Si un service local est trouve → [Port Forwarding](../04-post-exploitation/linux.md)

## Scenarios vecus

| Situation | Ce qui s'est passe | Box |
|-----------|-------------------|-----|
| FTP → email + PDF → password par defaut | Hydra SSH spray → acces christine | `Funnel` |
| SSH → `ss -tl` → PostgreSQL local (5432) | Port forwarding → extraction du flag dans la DB | `Funnel` |

## Liens

- Commandes SSH : [Cheatsheet - Acces distant](/docs/cheatsheet/post-exploitation/remote-access)
- Brute-force SSH : [Cheatsheet - Hydra](/docs/cheatsheet/exploitation/brute-force)
- Port forwarding : [Cheatsheet - Pivoting](/docs/cheatsheet/post-exploitation/pivoting)
