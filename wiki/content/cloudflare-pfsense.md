---
title: cloudflare tunnel on pfsense
category: docs
tags: [network, pfsense, cloudflare, tunnel]
---

## setup cloudflared on pfsense

### enable freebsd packages

navigate to **Diagnostics > Edit File** and edit:

**`/usr/local/etc/pkg/repos/pfsense.conf`**
**`/usr/local/etc/pkg/repos/FreeBSD.conf`**

change `FreeBSD: { enabled: no }` → `FreeBSD: { enabled: yes }` in both files.

### install cloudflared

```bash
pkg update
pkg install cloudflared
```

### login

```bash
cloudflared tunnel login
```

if the binary path is not set correctly:

```bash
cd /usr/local/bin/cloudflared
./cloudflared tunnel login
```

a reboot of pfsense should fix the symbolic link issue.

### create tunnel

```bash
cloudflared tunnel create <tunnel-name>
```

this generates a credentials file. the tunnel will appear in the cloudflare zero trust dashboard.

### add route

```bash
cloudflared tunnel route ip add 100.64.0/10 <tunnel-name>
```

adjust the subnet as needed.

### enable warp routing

```bash
nano /usr/local/etc/cloudflared/config.yml
```

set `warp-routing: enabled: true`

credentials files are in `/root/.cloudflared/` or `/home/dean/.cloudflared/`

### run tunnel

```bash
cloudflared tunnel run <tunnel-name>
```

### create service

```bash
cloudflared service install
systemctl start cloudflared
systemctl enable cloudflared
```

### example config

```yaml
logDirectory: /var/log/cloudflared
warp-routing:
  enabled: true
credentials-file: /root/.cloudflared/<tunnel-id>.json
tunnel: <tunnel-id>
```

note: indentation matters in yaml.

### useful commands

```bash
cloudflared tunnel route ip add xxx.xxx.xxx.xxx/xx <tunnel-name>
cloudflared tunnel create <tunnel-name>
cloudflared tunnel run <tunnel-name>
systemctl status cloudflared
```

## ip forwarding

```bash
nano /etc/sysctl.conf
# add: net.ipv4.ip_forward = 1
sysctl -p /etc/sysctl.conf
```

## install cloudflared on linux (alternative)

```bash
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared jammy main' | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt-get update && sudo apt-get install cloudflared
```
