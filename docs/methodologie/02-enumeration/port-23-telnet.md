---
sidebar_position: 4
title: "Port 23 - Telnet"
---

# Port 23 - Telnet

**Service** : Telnet (protocole non chiffre)
**Outil** : `telnet`

## Checklist

### 1. Tenter une connexion

- [ ] Se connecter au service :

```bash
telnet <IP>
```

### 2. Tester des logins sans mot de passe

- [ ] Tester ces utilisateurs courants avec un **mot de passe vide** :

| Utilisateur | Priorite |
|-------------|----------|
| `root` | Haute |
| `admin` | Haute |
| `administrator` | Moyenne |
| `user` | Basse |

### 3. Si connecte en root

- [ ] `whoami` pour confirmer
- [ ] `ls` → chercher `flag.txt`
- [ ] `cat flag.txt`

## Scenarios vecus

| Situation | Ce qui s'est passe | Box |
|-----------|-------------------|-----|
| Telnet ouvert, pas de password sur root | Login direct en root | `Meow` |

:::warning
Telnet est un protocole **ancien et non chiffre**. En vrai pentest, c'est un finding critique a lui seul.
:::

## Liens

- Commandes : [Cheatsheet - Autres services](/docs/cheatsheet/enumeration/autres-services)
