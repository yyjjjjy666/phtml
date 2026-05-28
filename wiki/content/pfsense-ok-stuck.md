---
title: pfsense "OK" stuck in console fix
category: docs
tags: [network, pfsense, console, fix]
---

when pfsense boots and gets stuck on "OK" in the console:

```bash
lsdev
set currdev=disk0p2
boot
```
