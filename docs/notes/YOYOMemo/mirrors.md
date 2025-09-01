---
title: 开发中的常用镜像站
createTime: 2025/09/01 14:25:53
permalink: /memo/mirrors/
---

## 1 npm

设置 npm 为[淘宝镜像](https://npmmirror.com/)：

```bash
npm config set registry https://registry.npmmirror.com
```

## 2 pip

设置 pip 为[清华镜像](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/)：

```bash
pip config set global.index-url https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
```

设置 pip 为[中科大镜像](https://mirrors.ustc.edu.cn/help/pypi.html)：

```bash
pip config set global.index-url https://mirrors.ustc.edu.cn/pypi/simple
```

## 3 Conda

设置 Conda 为[清华镜像](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/)。在`~/.condarc`文件中写入一下内容：

```yaml
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```

特别地，对于 Windows，需要先执行`conda config --set show_channel_urls yes`创建该文件。

## 4 apt

这里以 [Debian 清华源](https://mirrors.tuna.tsinghua.edu.cn/help/debian/)和 [Ubuntu 清华源](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)为例。

### 4.1 Debian <= 12

Debian 12 及之前的版本，apt 源保存在`/etc/apt/sources.list`中。

注意将命令中的`<suite>`替换为发行代号，如 bookworm（Debian 12）/bullseye（Debian 11）/buster（Debian 10）。

```text
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ <suite> main contrib non-free non-free-firmware
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ <suite>-updates main contrib non-free non-free-firmware
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ <suite>-backports main contrib non-free non-free-firmware
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security/ <suite>-security main contrib non-free non-free-firmware
```

### 4.2 Debian 13

Debian 13 后，apt 源保存在`/etc/apt/sources.list.d/debian.sources`中。

```text
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/debian/
Suites: trixie trixie-updates trixie-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/debian-security/
Suites: trixie-security
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
```

### 4.3 Ubuntu <= 22.04 LTS

Ubuntu 22.04 LTS 及之前的版本，apt 源保存在`/etc/apt/sources.list`中。

注意将命令中的`<suite>`替换为发行代号，如 jammy（Ubuntu 22.04 LTS）/focal（Ubuntu 20.04 LTS）/bionic（Ubuntu 18.04 LTS）

```text
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ <suite> main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ <suite>-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ <suite>-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ <suite>-security main restricted universe multiverse
```

### 4.4 Ubuntu 24.04 LTS

Ubuntu 24.04 LTS 后，apt 源保存在`/etc/apt/sources.list.d/ubuntu.sources`中。

```text
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

## 5 Docker

在[这里](https://www.coderjia.cn/archives/dba3f94c-a021-468a-8ac6-e840f85867ea)找到目前国内可用的 Docker 镜像源。

### 5.1 临时生效

拉取镜像时使用镜像站域名拼接上官方镜像名，如通过镜像站`docker-0.unsee.tech`拉取`istio/distroless`镜像：

```bash
docker pull docker-0.unsee.tech/istio/distroless
```

### 5.2 长期生效

将镜像站写入`/etc/docker/daemon.json`文件：

```json
{
  "registry-mirrors": ["https://docker-0.unsee.tech"]
}
```
