---
sidebar_position: 2
title: "Scan de ports (Nmap)"
---

# Scan de ports avec Nmap

Nmap est l'outil incontournable pour decouvrir les ports ouverts et les services qui tournent sur une cible.

## Scans de base

### Scan avec detection de version

```bash
nmap -sV <IP>
```

Scanne les **1000 ports les plus courants** et tente d'identifier la version de chaque service.

> Boxes : `Meow`, `Fawn`, `Dancing`, `Redeemer`, `Explosion`, `MongoD`

### Scan avec scripts par defaut + version

```bash
nmap -sC -sV <IP>
```

- `-sC` : lance les scripts NSE par defaut (detection anonyme, infos supplementaires)
- `-sV` : detection de version

> Boxes : `Appointment`, `Sequel`, `Crocodile`, `Funnel`, `Ignition`

### Scan complet (tous les ports)

```bash
nmap -p- -sV <IP>
```

Scanne les **65535 ports TCP**. Indispensable quand le scan par defaut ne montre rien d'interessant.

> Boxes : `Redeemer`, `MongoD`, `Responder`

### Scan complet accelere

```bash
nmap -p- --min-rate=1000 -sV <IP>
```

`--min-rate` force un debit minimum de paquets pour accelerer le scan.

> Boxes : `MongoD`, `Responder`

### Scan de ports specifiques

```bash
nmap -p22,80 -sV -sC <IP>
```

Cible uniquement les ports indiques. Utile pour approfondir apres un premier scan.

> Boxes : `Bike`, `Ignition`

## Resume des flags

| Flag | Description |
|------|-------------|
| `-sV` | Detection de version des services |
| `-sC` | Scripts NSE par defaut |
| `-p-` | Scan de tous les 65535 ports |
| `-p <ports>` | Scan de ports specifiques (ex: `-p22,80,443`) |
| `--min-rate <n>` | Debit minimum de paquets/seconde |
| `-sS` | SYN scan (necessite root, plus discret) |
| `-A` | Scan agressif (OS + version + scripts + traceroute) |

## Ports et services courants rencontres

| Port | Service | Boxes |
|------|---------|-------|
| 21 | FTP | `Fawn`, `Crocodile`, `Funnel` |
| 22 | SSH | `MongoD`, `Funnel`, `Bike` |
| 23 | Telnet | `Meow` |
| 80 | HTTP | `Preignition`, `Appointment`, `Crocodile`, `Responder`, `Bike`, `Ignition` |
| 135 | MS-RPC | `Dancing`, `Explosion` |
| 139 | NetBIOS | `Dancing`, `Explosion` |
| 445 | SMB | `Dancing`, `Explosion` |
| 873 | Rsync | `Synced` |
| 3306 | MySQL/MariaDB | `Sequel` |
| 3389 | RDP | `Explosion` |
| 5985 | WinRM | `Responder` |
| 6379 | Redis | `Redeemer` |
| 27017 | MongoDB | `MongoD` |

:::info Reflexe
Si le scan des 1000 ports par defaut ne donne rien d'exploitable, **toujours relancer avec `-p-`** pour scanner tous les ports. C'est comme ca qu'on a trouve MongoDB sur `MongoD` et WinRM sur `Responder`.
:::
