---
title: arch linux installation guide
category: docs
tags: [linux, arch, install]
---

## disk partitioning

use `cfdisk` to partition the disk:

| partition | size | type |
|-----------|------|------|
| `/dev/sda1` | 1G | EFI System |
| `/dev/sda2` | = RAM (e.g. 16G) | Linux Swap |
| `/dev/sda3` | ≥ 40G | Linux Filesystem (/) |
| `/dev/sda4` | remaining | Linux Filesystem (/home) |

## format & mount

```bash
mkfs.vfat /dev/sda1
mkswap /dev/sda2
mkfs.ext4 /dev/sda3
mkfs.ext4 /dev/sda4

mount /dev/sda3 /mnt
swapon /dev/sda2
mkdir /mnt/home /mnt/efi
mount /dev/sda4 /mnt/home
mount /dev/sda1 /mnt/efi
lsblk
```

## mirrorlist

```bash
nano /etc/pacman.d/mirrorlist
```

add estonian mirrors:

```
Server = https://mirror.cspacehostings.com/archlinux/$repo/os/$arch
Server = https://repo.br.ee/arch/$repo/os/$arch
Server = https://mirrors.xtom.ee/archlinux/$repo/os/$arch
```

```bash
pacman -Syy
```

## base install

```bash
pacstrap -K /mnt base base-devel linux linux-firmware sof-firmware neofetch nano efibootmgr dhcpcd wpa_supplicant grub sudo iwctl
genfstab -U /mnt >> /mnt/etc/fstab
arch-chroot /mnt
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

## locale & hostname

```bash
nano /etc/locale.gen
locale-gen

nano /etc/locale.conf
# LANG=en_US.UTF-8

nano /etc/hostname
passwd          # set root password
exit
shutdown now
```

## post-install

```bash
systemctl enable dhcpcd
systemctl start dhcpcd

useradd -m main
passwd main
nano /etc/sudoers
```

## graphics & DE

refer to [wayland on arch guide](https://www.debugpoint.com/wayland-arch-linux/)

```bash
git clone https://aur.archlinux.org/yay-bin.git
cd yay-bin
makepkg -i

sudo pacman -S --needed wayland
yay -S sddm-git

sudo pacman -S --needed xorg-xwayland xorg-xlsclients qt5-wayland glfw-wayland
sudo pacman -S --needed plasma-wayland-session

yay -S brave-bin
sudo systemctl enable sddm
```

configure sddm theme:

```bash
sudo nano /usr/lib/sddm/sddm.conf.d/default.conf
# [Theme]
# Current=breeze

reboot
```

## additional

```bash
sudo nano /etc/pacman.conf
# enable multilib

sudo pacman -S intel-ucode
sudo nano /etc/default/grub
# GRUB_TIMEOUT_STYLE=hidden
sudo grub-mkconfig -o /boot/grub/grub.cfg
reboot

sudo pacman -S unzip ufw p7zip thunderbird krita vlc libreoffice linux-lts linux-lts-headers

yay -S preload
sudo systemctl enable preload
sudo systemctl start preload
```
