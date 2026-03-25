# personal-docs

Documentation technique de pentest — propulsée par [Hugo](https://gohugo.io/) avec le thème [Hugo Book](https://github.com/alex-shpak/hugo-book).

Hébergée sur [docs.mohamedoutougane.com](https://docs.mohamedoutougane.com)

## Prérequis

- [Git](https://git-scm.com/)
- [Hugo Extended](https://gohugo.io/installation/) — version **extended** obligatoire (SCSS)

## Installation

### Clone avec le thème

```bash
git clone --recurse-submodules https://github.com/MohamedOutougane/personal-docs.git
cd personal-docs
```

Si déjà cloné sans le thème :
```bash
git submodule update --init --recursive
```

### Lancer en local

```bash
hugo server -D
# → http://localhost:1313
```

## Structure

```
.
├── assets/
│   ├── _variables.scss   # Override variables Hugo Book (couleurs, tailles)
│   └── _custom.scss      # Styles custom (dark theme Congo, Ubuntu font)
├── content/
│   ├── methodologie/     # Méthodologie pentest (phases & domaines)
│   └── cheatsheet/       # Commandes, outils, ressources
└── themes/hugo-book/     # Thème (git submodule)
```

## Ajouter une page

Créer un fichier `.md` dans le dossier approprié :

```bash
# Exemple : nouvelle page dans exploitation/web
hugo new content/methodologie/exploitation/web/nouvelle-technique.md
```

Front matter minimal :
```yaml
---
title: "Titre de la page"
weight: 60   # ordre dans la sidebar
---
```

## Déploiement

Push sur `main` → GitHub Actions build et deploy automatiquement sur GitHub Pages.

## Intégration dans ravenbreach-blog (submodule)

Ce repo est ajouté comme submodule dans `ravenbreach-blog` :

```bash
# Dans ravenbreach-blog/
git submodule add https://github.com/MohamedOutougane/personal-docs.git personal-docs
git commit -m "feat: add personal-docs as submodule"
```

## Configurer le sous-domaine

Dans les paramètres DNS de ton domaine, ajoute :
```
CNAME  docs  mohamedoutougane.github.io
```

Puis dans les Settings GitHub du repo `personal-docs` → Pages → Custom domain : `docs.mohamedoutougane.com`
