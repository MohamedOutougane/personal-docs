---
sidebar_position: 1
title: "Decouverte d'hotes"
---

# Decouverte d'hotes (Host Discovery)

## ping

Verifier qu'une machine est en ligne et deduire l'OS a partir du **TTL**.

```bash
ping <IP>
```

| TTL approximatif | OS probable |
|------------------|-------------|
| **63** | Linux |
| **127** | Windows |
| **255** | Equipement reseau (routeur, switch) |

### Exemples

```bash
# Box Linux (TTL = 63)
ping 10.129.228.30
# 64 bytes from 10.129.228.30: icmp_seq=1 ttl=63 time=59.3 ms
```
> Boxes : `Meow`, `Fawn`, `Redeemer`, `Preignition`, `MongoD`, `Synced`, `Appointment`, `Sequel`, `Crocodile`, `Funnel`, `Bike`, `Ignition`

```bash
# Box Windows (TTL = 127)
ping 10.129.63.29
# 64 bytes from 10.129.63.29: icmp_seq=1 ttl=127 time=14.4 ms
```
> Boxes : `Dancing`, `Explosion`, `Responder`

:::tip
Utilisez `Ctrl+C` pour arreter le ping apres quelques paquets. Sur Linux, `ping` tourne indefiniment par defaut.
:::
