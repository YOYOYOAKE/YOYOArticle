---
title: Node.js, NPM & NVM
createTime: 2025/01/24 22:19:19
permalink: /memo/nodejs/
---

## 1 `NVM`命令

推荐使用`NVM`来管理`Node.js`版本。在安装NVM之前，卸载已经安装的Node.js。

在这里 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 下载最新的 `nvm-setup.exe`。

```bash
# 查看 NVM 版本
nvm -v 
nvm --version
```

```bash
# 查看安装在计算机上版本
nvm list

# 查看所有可被下载的版本
nvm list available
```

```bash
# 安装指定版本
nvm install 20.18.3

# 安装指定大版本中最新版本
nvm install 20

# 安装最新版本
nvm install lateset
```

```bash
# 切换到指定版本
nvm use 20.18.3

# 或者使用大版本号
nvm use 20
```

```bash
# 卸载指定版本
nvm uninstall 20.18.3
```

```bash
# 查看当前计算机使用的版本
nvm current
```

由于众所周知的原因，Node.js 官网的访问可能受限，因此可能需要配置国内镜像源。

```bash
nvm node_mirror https://npmmirror.com/mirrors/node/
```

## 2 配置`NPM`镜像

由于众所周知的原因，NPM官方源基本处于不可用的状态，因此需要配置国内镜像。

```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com
```

```bash
# 恢复官方源
npm config set registry https://registry.npmjs.org/
```

```bash
# 查看当前镜像
npm config get registry
```
