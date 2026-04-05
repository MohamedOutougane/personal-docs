---
sidebar_position: 1
title: Vue d'ensemble
---

# Enumeration

Tu as tes ports ouverts grace a la [Reconnaissance](../01-reconnaissance/). Maintenant il faut **creuser chaque service** pour trouver un vecteur d'attaque.

## Reflexe general

Pour chaque port ouvert :

1. **Identifier le service** (nmap l'a normalement fait)
2. **Aller sur la page du port** correspondant ci-dessous
3. **Suivre la checklist** de cette page

## Index des ports

| Port | Service | Page |
|------|---------|------|
| 21 | FTP | [Port 21 - FTP](./port-21-ftp.md) |
| 22 | SSH | [Port 22 - SSH](./port-22-ssh.md) |
| 23 | Telnet | [Port 23 - Telnet](./port-23-telnet.md) |
| 80 / 443 | HTTP(S) | [Port 80 - HTTP](./port-80-http.md) |
| 445 | SMB | [Port 445 - SMB](./port-445-smb.md) |
| 873 | Rsync | [Port 873 - Rsync](./port-873-rsync.md) |
| 3306 | MySQL / MariaDB | [Port 3306 - MySQL](./port-3306-mysql.md) |
| 3389 | RDP | [Port 3389 - RDP](./port-3389-rdp.md) |
| 5985 | WinRM | [Port 5985 - WinRM](./port-5985-winrm.md) |
| 6379 | Redis | [Port 6379 - Redis](./port-6379-redis.md) |
| 27017 | MongoDB | [Port 27017 - MongoDB](./port-27017-mongodb.md) |

:::tip Priorite
Commence par les services les plus **"bavards"** : HTTP (port 80), FTP (port 21), SMB (port 445). Ce sont souvent eux qui donnent le point d'entree initial. SSH (port 22) est rarement le point d'entree direct sur les boxes debutant.
:::
