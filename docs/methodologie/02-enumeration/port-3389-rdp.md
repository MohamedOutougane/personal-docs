---
sidebar_position: 9
title: "Port 3389 - RDP"
---

# Port 3389 - RDP

**Service** : Remote Desktop Protocol (bureau a distance Windows)
**Outil** : `xfreerdp3`

## Checklist

### 1. Tenter une connexion Administrator sans mot de passe

- [ ] Tester l'acces direct :

```bash
xfreerdp3 /v:<IP> /cert:ignore /u:Administrator
# Password: (Entree)
```

### 2. Si ca marche

- [ ] Explorer le bureau → chercher `flag.txt`
- [ ] Ouvrir un terminal (cmd ou PowerShell)
- [ ] Explorer le systeme de fichiers

### 3. Si ca echoue

- [ ] Tester d'autres utilisateurs courants : `admin`, `user`, `guest`
- [ ] Chercher des credentials sur d'autres services
- [ ] Brute-force avec Hydra en dernier recours

## Scenarios vecus

| Situation | Ce qui s'est passe | Box |
|-----------|-------------------|-----|
| Administrator sans mot de passe | Connexion RDP directe, flag sur le bureau | `Explosion` |

## Liens

- Commandes RDP : [Cheatsheet - Autres services](/docs/cheatsheet/enumeration/autres-services)
