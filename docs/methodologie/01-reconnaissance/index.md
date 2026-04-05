---
sidebar_position: 1
title: Checklist Reconnaissance
---

# Reconnaissance

La premiere phase de tout pentest. L'objectif : **identifier la cible, son OS et les services exposes**.

## Checklist

### 1. Decouverte d'hote

- [ ] **Ping la cible** pour confirmer qu'elle est en ligne
- [ ] **Analyser le TTL** pour deviner l'OS :
  - TTL ~63 → **Linux**
  - TTL ~127 → **Windows**

> Commande : voir [Cheatsheet - Decouverte d'hotes](/docs/cheatsheet/reconnaissance/network-discovery)

### 2. Scan de ports rapide (top 1000)

- [ ] **Lancer un scan nmap** avec detection de version (`-sV`)
- [ ] **Noter** tous les ports ouverts et les services detectes
- [ ] **Identifier** les services connus (FTP, SSH, HTTP, SMB, etc.)

```bash
nmap -sV <IP>
```

### 3. Scan de ports complet (si necessaire)

- [ ] Si le scan rapide ne montre **rien d'exploitable** ou **seulement SSH** → scanner tous les ports

```bash
nmap -p- --min-rate=1000 -sV <IP>
```

:::info Lecon apprise
Sur `MongoD`, le scan par defaut ne montrait que SSH. C'est le scan `-p-` qui a revele MongoDB sur le port 27017. Sur `Responder`, c'est `-p-` qui a revele WinRM sur le port 5985.
:::

### 4. Scan approfondi (scripts NSE)

- [ ] Sur les ports interessants, lancer un scan avec scripts par defaut

```bash
nmap -sC -sV -p<ports> <IP>
```

Les scripts NSE peuvent reveler :
- Si FTP accepte les connexions **anonymes**
- Les infos **mysql-info** (version, capabilities)
- Les certificats SSL
- Les partages SMB

### 5. Configuration DNS (si web)

- [ ] Si le site redirige vers un nom de domaine → **ajouter dans /etc/hosts**

```bash
sudo nano /etc/hosts
# Ajouter : <IP>    <hostname>
```

> Boxes concernees : `Responder` (unika.htb), `Bike` (bike.htb), `Ignition` (ignition.htb)

## Arbre de decision : et apres ?

Une fois les ports identifies, direction la phase **Enumeration** :

| Port trouve | Page a consulter |
|-------------|-----------------|
| 21 (FTP) | [Port 21 - FTP](../02-enumeration/port-21-ftp.md) |
| 22 (SSH) | [Port 22 - SSH](../02-enumeration/port-22-ssh.md) |
| 23 (Telnet) | [Port 23 - Telnet](../02-enumeration/port-23-telnet.md) |
| 80/443 (HTTP) | [Port 80 - HTTP](../02-enumeration/port-80-http.md) |
| 445 (SMB) | [Port 445 - SMB](../02-enumeration/port-445-smb.md) |
| 873 (Rsync) | [Port 873 - Rsync](../02-enumeration/port-873-rsync.md) |
| 3306 (MySQL) | [Port 3306 - MySQL](../02-enumeration/port-3306-mysql.md) |
| 3389 (RDP) | [Port 3389 - RDP](../02-enumeration/port-3389-rdp.md) |
| 6379 (Redis) | [Port 6379 - Redis](../02-enumeration/port-6379-redis.md) |
| 27017 (MongoDB) | [Port 27017 - MongoDB](../02-enumeration/port-27017-mongodb.md) |
