---
sidebar_position: 4
title: "Bases de donnees"
---

# Bases de donnees

## MariaDB / MySQL

**Port** : 3306/tcp

### Installation du client

```bash
sudo apt update && sudo apt install mysql*
```

### Connexion

```bash
mysql -h <IP> -u root
```

| Flag | Description |
|------|-------------|
| `-h` | Adresse IP de la cible |
| `-u` | Nom d'utilisateur |
| `--skip-ssl` | Ignorer les erreurs SSL |

> Box : `Sequel`

### Commandes SQL essentielles

```sql
-- Lister les bases de donnees
SHOW databases;

-- Selectionner une base
USE <database>;

-- Lister les tables
SHOW tables;

-- Afficher tout le contenu d'une table
SELECT * FROM <table>;

-- Afficher les colonnes d'une table
DESCRIBE <table>;
```

### Exemple complet (Sequel)

```sql
MariaDB [(none)]> SHOW databases;
+--------------------+
| Database           |
+--------------------+
| htb                |
| information_schema |
| mysql              |
| performance_schema |
+--------------------+

MariaDB [(none)]> USE htb;
MariaDB [htb]> SHOW tables;
+---------------+
| Tables_in_htb |
+---------------+
| config        |
| users         |
+---------------+

MariaDB [htb]> SELECT * FROM config;
+----+-----------------------+----------------------------------+
| id | name                  | value                            |
+----+-----------------------+----------------------------------+
|  1 | timeout               | 60s                              |
|  5 | flag                  | 7b4{...}da8                      |
+----+-----------------------+----------------------------------+
```

---

## MongoDB

**Port** : 27017/tcp
**Client** : `mongosh`

### Installation de mongosh

```bash
curl -O https://downloads.mongodb.com/compass/mongosh-2.3.2-linux-x64.tgz
tar xvf mongosh-2.3.2-linux-x64.tgz
cd mongosh-2.3.2-linux-x64/bin
```

### Connexion

```bash
./mongosh mongodb://<IP>:27017
```

> Box : `MongoD`

### Commandes MongoDB essentielles

```javascript
// Lister les bases de donnees
show dbs

// Selectionner une base
use <database>

// Lister les collections (= tables)
show collections

// Afficher le contenu d'une collection
db.<collection>.find()

// Chercher un document specifique
db.<collection>.find({ "key": "value" })
```

### Exemple complet (MongoD)

```javascript
test> show dbs
admin                   32.00 KiB
config                 108.00 KiB
local                   72.00 KiB
sensitive_information   32.00 KiB
users                   32.00 KiB

test> use sensitive_information
test> show collections
flag

test> db.flag.find()
[
  {
    _id: ObjectId('630e3dbcb82540ebbd1748c5'),
    flag: '1b6{...}6ea'
  }
]
```

---

## Redis

**Port** : 6379/tcp
**Client** : `redis-cli`

### Installation

```bash
sudo apt install redis-tools
```

### Connexion

```bash
redis-cli -h <IP>
```

> Box : `Redeemer`

### Commandes Redis essentielles

```bash
# Informations sur le serveur et les bases
info

# Selectionner une base (par index)
select 0

# Lister toutes les cles
keys *

# Recuperer la valeur d'une cle
get <key>
```

---

## PostgreSQL

**Port** : 5432/tcp (souvent en local uniquement)
**Client** : `psql`

### Installation

```bash
sudo apt install postgresql-client
```

### Connexion (via tunnel SSH)

```bash
psql -U <user> -h localhost -p <port_local>
```

> Box : `Funnel`

### Commandes psql essentielles

```sql
-- Lister les bases de donnees
\l

-- Se connecter a une base
\connect <database>

-- Lister les tables
\dt

-- Afficher le contenu d'une table
SELECT * FROM <table>;
```
