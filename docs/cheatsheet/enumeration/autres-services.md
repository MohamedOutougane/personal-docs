---
sidebar_position: 5
title: "Autres services"
---

# Autres services

## Telnet

**Port** : 23/tcp

```bash
telnet <IP>
```

Protocole ancien et non chiffre. Quand l'authentification est mal configuree, on peut se connecter directement en **root**.

> Box : `Meow`

### Utilisateurs a tester

| Utilisateur | Resultat |
|-------------|----------|
| `admin` | Echec |
| `root` | **Succes** (pas de mot de passe) |

---

## Rsync

**Port** : 873/tcp

Rsync permet de synchroniser des fichiers a distance. Un module mal configure permet un acces anonyme.

### Lister les modules disponibles

```bash
rsync --list-only <IP>::
```

### Lister les fichiers d'un module

```bash
rsync --list-only <IP>::<module>
```

### Telecharger un fichier

```bash
rsync <IP>::<module>/<fichier> <destination_locale>
```

> Box : `Synced`

---

## RDP (Remote Desktop Protocol)

**Port** : 3389/tcp
**Outil** : `xfreerdp3`

### Connexion basique

```bash
xfreerdp3 /v:<IP> /cert:ignore /u:<username>
```

| Flag | Description |
|------|-------------|
| `/v:` | Adresse IP de la cible |
| `/cert:ignore` | Ignorer la validation du certificat |
| `/u:` | Nom d'utilisateur |
| `/p:` | Mot de passe (optionnel) |

### Connexion sans mot de passe (Explosion)

```bash
xfreerdp3 /v:<IP> /cert:ignore /u:Administrator
```

Quand le mot de passe est demande, appuyer sur **Entree**.

> Box : `Explosion`

---

## WinRM (Windows Remote Management)

**Port** : 5985/tcp
**Outil** : `evil-winrm`

Voir la page [Acces distant](../post-exploitation/remote-access.md) pour les details.
