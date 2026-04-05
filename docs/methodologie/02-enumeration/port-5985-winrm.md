---
sidebar_position: 10
title: "Port 5985 - WinRM"
---

# Port 5985 - WinRM

**Service** : Windows Remote Management
**Outil** : `evil-winrm`

## Checklist

### 1. Ne PAS commencer par WinRM

- [ ] WinRM necessite des **credentials valides** (user + password ou hash NTLM)
- [ ] **Chercher d'abord** des credentials via d'autres vecteurs (LFI + Responder, brute-force, etc.)

### 2. Si tu as des credentials

- [ ] Se connecter avec Evil-WinRM :

```bash
evil-winrm -i <IP> -u <user> -p <password>
```

### 3. Si tu as un hash NTLM (Pass-the-Hash)

- [ ] Se connecter avec le hash :

```bash
evil-winrm -i <IP> -u <user> -H <hash>
```

### 4. Une fois connecte

- [ ] `cd C:\Users\Administrator\Desktop`
- [ ] `dir` → chercher `flag.txt`
- [ ] `type flag.txt`

## Scenarios vecus

| Situation | Ce qui s'est passe | Box |
|-----------|-------------------|-----|
| LFI → Responder capture hash → John craque le password | `evil-winrm -i IP -u administrator -p badminton` | `Responder` |

:::info
WinRM est presque toujours un **point d'arrivee**, pas un point de depart. Il faut d'abord trouver les credentials.
:::

## Liens

- Evil-WinRM : [Cheatsheet - Acces distant](/docs/cheatsheet/post-exploitation/remote-access)
- Hash cracking : [Cheatsheet - John](/docs/cheatsheet/exploitation/hash-cracking)
