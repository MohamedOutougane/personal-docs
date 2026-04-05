---
sidebar_position: 5
title: "Port 80 - HTTP"
---

# Port 80 - HTTP(S)

**Service** : Serveur web
**Outils** : navigateur, Gobuster, Wappalyzer, BurpSuite

## Checklist

### 1. Acceder au site

- [ ] Ouvrir `http://<IP>` dans le navigateur
- [ ] **Le site redirige vers un domaine ?** → Ajouter dans `/etc/hosts`

```bash
sudo nano /etc/hosts
# <IP>    <hostname>
```

> Boxes : `Responder` (unika.htb), `Bike` (bike.htb), `Ignition` (ignition.htb)

### 2. Identifier les technologies

- [ ] Utiliser **Wappalyzer** (extension navigateur) pour fingerprinter :
  - Serveur web (Apache, nginx, IIS)
  - Langage (PHP, Node.js, Python)
  - CMS (Magento, WordPress, etc.)
  - Framework (Express, Laravel, etc.)

| Techno detectee | Implication | Box |
|-----------------|-------------|-----|
| PHP | Tester LFI, chercher des `.php` | `Crocodile`, `Appointment` |
| Node.js + Handlebars | Tester SSTI | `Bike` |
| Magento | Chercher `/admin`, creds par defaut | `Ignition` |
| nginx page par defaut | Gobuster obligatoire | `Preignition` |

### 3. Brute-force de repertoires

- [ ] Lancer **Gobuster** pour trouver des pages cachees :

```bash
gobuster dir -w /usr/share/wordlists/common.txt -u http://<IP>
```

- [ ] Si PHP detecte, ajouter `-x php,html`

| Page trouvee | Type | Box |
|-------------|------|-----|
| `/admin.php` | Panel admin | `Preignition` |
| `/login.php` | Formulaire login | `Crocodile` |
| `/admin` | Panel admin Magento | `Ignition` |

### 4. Analyser les formulaires

- [ ] **Formulaire de login trouve ?** → Aller a [Exploitation - Formulaire login](../03-exploitation/formulaire-login.md)
- [ ] **Champ de saisie qui affiche l'input ?** → Tester SSTI : `{{7*7}}`
- [ ] **Parametre dans l'URL** (`page=`, `file=`, `include=`) ? → Tester LFI

### 5. Inspecter le code source

- [ ] Clic droit → "View source" → chercher des commentaires, chemins, credentials

## Arbre de decision

```
Port 80 ouvert
├── Redirection vers un domaine ? → /etc/hosts
├── Wappalyzer → identifier technos
├── Gobuster → pages cachees
│   ├── Formulaire de login → Exploitation/formulaire-login
│   ├── Panel admin → tester creds par defaut
│   └── Page avec parametre URL → tester LFI
├── Champ de saisie visible → tester SSTI {{7*7}}
└── FTP aussi ouvert ? → verifier si des creds FTP marchent ici
```

## Liens

- Gobuster / Wappalyzer : [Cheatsheet - Web](/docs/cheatsheet/enumeration/web)
- SQLi : [Cheatsheet - SQL Injection](/docs/cheatsheet/exploitation/sqli)
- SSTI : [Cheatsheet - SSTI](/docs/cheatsheet/exploitation/ssti)
- LFI : [Cheatsheet - LFI/RFI](/docs/cheatsheet/exploitation/lfi-rfi)
