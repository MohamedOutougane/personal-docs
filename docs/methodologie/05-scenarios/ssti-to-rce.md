---
sidebar_position: 5
title: "SSTI → RCE"
---

# Scenario : SSTI vers RCE

**Box** : `Bike`
**Chaine** : Detection SSTI → identification Handlebars → sandbox bypass → RCE

## Resume

```
HTTP (port 80)
    │
    ├── Champ "email" → valeur affichee dans la reponse
    ├── Test {{7*7}} → retourne 49 → SSTI !
    ├── Message d'erreur → Handlebars / Node.js
    │
    ├── {{require(...)}} → BLOQUE ("require is not defined")
    │
    ├── Bypass via process.mainModule.require
    │   → execSync('id') → RCE confirmee
    │
    ├── execSync('cat /root/flag.txt')
    └── FLAG
```

## Etapes

### 1. Reconnaissance

- nmap revele **port 22 (SSH)** et **port 80 (HTTP)**
- `/etc/hosts` → `bike.htb`

### 2. Identification de la vulnerabilite

- Le site a un champ de saisie (email) dont la valeur est **reflechie** dans la page
- Test : `{{7*7}}` → le serveur retourne **49** → SSTI confirmee
- Le message d'erreur revele le moteur : **Handlebars** sur **Node.js/Express**

### 3. Tentative d'exploitation naive

- `{{require('child_process').exec('id')}}` → **bloque**
- Erreur : `require is not defined` → le sandbox Handlebars empeche l'acces a `require`

### 4. Bypass du sandbox

- Utiliser l'objet global `process` pour acceder a `require` via `process.mainModule.require`
- Payload complet avec `{{#with ...}}` pour construire un constructeur de fonctions
- **URL-encoder** le tout via BurpSuite Decoder avant envoi

### 5. RCE

- Remplacer `'id'` par `'cat /root/flag.txt'` dans le payload
- Envoyer via BurpSuite Repeater → flag dans la reponse

## Lecon

1. **Un champ qui affiche l'input** → toujours tester SSTI avec `{{7*7}}`
2. **Le message d'erreur est ton ami** → il revele le moteur de template
3. **Un sandbox n'est pas infranchissable** → chercher des objets globaux (`process`, `self`, `this`) pour contourner
4. **BurpSuite est indispensable** pour manipuler les requetes et encoder les payloads

## Liens

- [Methodologie - Port 80 HTTP](../02-enumeration/port-80-http.md)
- [Methodologie - Application web](../03-exploitation/application-web.md)
- [Cheatsheet - SSTI](/docs/cheatsheet/exploitation/ssti)
