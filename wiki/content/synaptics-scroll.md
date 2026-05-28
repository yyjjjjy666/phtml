---
title: synaptics touchpad scroll config
category: docs
tags: [linux, arch, config, touchpad]
---

## fix scroll direction on synaptics touchpad

```bash
sudo nano /etc/X11/xorg.conf.d/70-synaptics.conf
```

```conf
Section "InputClass"
    Identifier "touchpad"
    Driver "synaptics"
    MatchIsTouchpad "on"
    Option "VertScrollDelta" "-111"
    Option "HorizScrollDelta" "-111"
EndSection
```

```bash
reboot
```

the negative value inverts the scroll direction (natural scrolling).
