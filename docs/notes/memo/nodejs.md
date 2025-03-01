---
title: 前端开发第一步：Node.js 开箱配置
createTime: 2025/01/24 22:19:19
permalink: /memo/nodejs/
tags: 
  - Node.js
---

> Node.js 是一个 JavaScript 运行时，使得 JavaScript 能够脱离浏览器而在桌面环境中运行，是现代前端开发中不可或缺的基础设施。

> Node.js 每年发布两个大版本，且不同版本的支持时长、兼容性等不尽相同，常常出现一个项目需要版本14而另一个需要版本22的情况。因此我推荐使用 NVM 接管 Node.js 安装。

> NVM 全称为 Node.js Version Manager，用来方便地安装、切换不同版本的 Node.js。

<!-- more -->

## 1 NVM 安装

在安装NVM之前，卸载已经安装的Node.js。

在这里 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 下载最新的 `nvm-setup.exe`。

在安装向导中配置NVM和Node.js的安装位置。

![1737775914060](https://cdn.jsdelivr.net/gh/YOYOYOAKE/YOYOPics/articles/250124-Nodejs开箱配置/1737775914060.png)

![1737775923676](https://cdn.jsdelivr.net/gh/YOYOYOAKE/YOYOPics/articles/250124-Nodejs开箱配置/1737775923676.png)

安装完成后在任意位置打开命令行，输入命令`nvm -v`，若输出当前NVM版本号，则说明安装成功。

## 2 NVM 基本使用

### 2.1 配置 Node.js 镜像

由于众所周知的原因，Node.js 官网的访问可能受限，因此需要配置国内镜像源。

```bash
nvm node_mirror https://npmmirror.com/mirrors/node/
```

### 2.2 安装指定版本的 Node.js

上面提到过，Node.js 一年发布两个大版本，而只有偶数版本提供长期支持，因此我们一般只安装长期支持版本。

可以在 [Node.js Release](https://nodejs.org/en/about/previous-releases) 查看当前维护的 LTS 版本。

以安装 Node.js 20 的最新 LTS 版本为例，我们只需要指定大版本号即可。

```bash
nvm install 20
```

也可以指定精确的小版本号安装，如安装 Node.js 22.13.1。

```bash
nvm install 22.13.1
```

### 2.3 切换不同版本的 Node.js

首先输入命令查看当前安装的所有 Node.js 版本。

```bash
nvm list

# 输出
#   22.13.1
#   20.18.2
# * 18.20.6 (Currently using 64-bit executable)
```

然后切换到指定版本。

```bash
nvm use 22.13.1

# 或者

nvm use 22

# 输出：
# Now using node v22.13.1 (64-bit)
```

查看当前 Node.js 版本。

```bash
node -v

# 输出：
# v22.13.1
```

## 3 配置 NPM 镜像源

由于众所周知的原因，NPM官方镜像源基本处于不可用的状态，因此需要配置国内镜像。

### 3.1 使用淘宝镜像源

```bash
npm config set registry https://registry.npmmirror.com
```

### 3.2 恢复官方镜像源

```bash
npm config set registry https://registry.npmjs.org/
```

### 3.3 查看当前使用的镜像源

```bash
npm config get registry
```
