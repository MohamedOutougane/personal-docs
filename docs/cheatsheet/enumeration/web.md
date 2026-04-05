---
sidebar_position: 1
title: "Web"
---

# Enumeration Web

## Gobuster - Brute-force de repertoires

Gobuster permet de decouvrir des pages et repertoires caches sur un serveur web.

### Scan basique

```bash
sudo gobuster dir -w /usr/share/wordlists/common.txt -u http://<IP>
```

> Boxes : `Preignition`, `Ignition`

### Scan avec extensions de fichiers

```bash
gobuster dir --url http://<IP>/ --wordlist /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt -x php,html
```

Le flag `-x` permet de tester des extensions specifiques. Indispensable quand on sait que le serveur utilise PHP.

> Box : `Crocodile`

### Resume des flags

| Flag | Description |
|------|-------------|
| `dir` | Mode brute-force de repertoires |
| `-w` / `--wordlist` | Chemin vers la wordlist |
| `-u` / `--url` | URL cible |
| `-x` | Extensions a tester (ex: `php,html,txt`) |
| `-t` | Nombre de threads (defaut: 10) |
| `-o` | Sauvegarder les resultats dans un fichier |

### Pages decouvertes

| Page | Type | Box |
|------|------|-----|
| `/admin.php` | Panel admin | `Preignition` |
| `/login.php` | Formulaire de login | `Crocodile` |
| `/admin` | Panel admin Magento | `Ignition` |

### Wordlists utiles

| Wordlist | Chemin |
|----------|--------|
| common.txt | `/usr/share/wordlists/common.txt` |
| directory-list-2.3-small | `/usr/share/wordlists/dirbuster/directory-list-2.3-small.txt` |
| rockyou.txt | `/usr/share/wordlists/rockyou.txt` |

---

## Wappalyzer - Fingerprinting web

Extension navigateur pour identifier les technologies d'un site (CMS, framework, langage, serveur).

| Technologie detectee | Box |
|---------------------|-----|
| PHP | `Crocodile` |
| Magento / PHP / MySQL | `Ignition` |
| Node.js / Express / Handlebars | `Bike` |

---

## Virtual Hosting (configuration DNS locale)

Quand un site web repond avec un nom de domaine specifique, il faut ajouter une entree dans `/etc/hosts`.

```bash
sudo nano /etc/hosts
```

Ajouter la ligne :

```
<IP>    <hostname>
```

### Exemples

```bash
# Responder
10.129.X.X    unika.htb

# Bike
10.129.X.X    bike.htb

# Ignition
10.129.X.X    ignition.htb
```

> Boxes : `Responder`, `Bike`, `Ignition`

:::info Reflexe
Si un site web renvoie une redirection vers un nom de domaine ou affiche une page d'erreur, pensez a configurer `/etc/hosts`.
:::
