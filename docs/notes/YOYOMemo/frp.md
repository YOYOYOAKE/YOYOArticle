---
title: frp 内网穿透
createTime: 2025/02/17 19:46:57
permalink: /memo/frp/
---

## 1 `frp`安装与配置


你可以在 [Github Release](https://github.com/fatedier/frp/releases) 页面下载最新的适用于 Linux 的 frp 二进制文件，并从 [frp 官方文档](https://gofrp.org/zh-cn/docs/)中获取绝大部分的使用说明。

`frp` 为 C/S 架构，因此你需要在服务端部署 `frps`，在客户端部署 `frpc`。

> frps 的意思就是 frp server。同理 frpc 就是 frp client。

一对典型的`fprs`与`frpc`配置是这样的：

::: code-tabs
@tab frps.toml
```toml
bindPort = 7000
```
@tab frpc.toml
```toml
serverAddr = "Your Server IP"
serverPort = 7000

[[proxies]]
name = "example_remote-desktop"
type = "tcp"
localIP = "127.0.0.1"
localPort = 3389
remotePort = 33890
```
:::

## 2 `frp`管理

### 2.1 Linux 环境下使用`systemd`管理

一般 Linux 系统通常自带`systemd`。这里以服务端`fprs`为例，客户端同理。

::: code-tabs

@tab Ubuntu / Debian
```bash
apt install systemd
```

@tab CentOS / RHEL
```bash
yum install systemd
```
:::

使用你喜欢的文本编辑器在`/etc/systemd/system`下创建一个`frps.service`文件，用于配置 frps 服务。

::: code-tabs
@tab frps.service
```
[Unit]
# 服务名称，可自定义
Description = frp server
After = network.target syslog.target
Wants = network.target

[Service]
Type = simple
# 启动 frps 的命令，需修改为您的 frps 的安装路径。务必保证这两个路径是正确的！
ExecStart = /path/to/frps -c /path/to/frps.toml

[Install]
WantedBy = multi-user.target
```
:::

然后就可以使用`systemd`来优雅地管理 frps 了。

::: code-tabs

@tab 启动 frps
```bash
sudo systemctl start frps
```

@tab  停止 frps
```bash
sudo systemctl stop frps
```

@tab  重启 frps
```bash
sudo systemctl restart frps
```
:::

使用这个命令查看 frps 状态：

```bash
sudo systemctl status frps
```

如果你不想每次重启服务器就要重新执行`sudo systemctl start frps`的话，建议配置自启动：
```bash
sudo systemctl enable frps
```

### 2.1 Windows系统下使用系统服务管理

为了方便地管理`frpc`，我们使用`nssm`工具将其注册为系统服务。`fprs`同理。

首先我们使用`winget`获取`nssm`。

```powershell
winget install nssm
```

然后使用`nssm`将`frpc`注册为系统服务：

```powershell
nssm install frpc
```

在弹出的窗口中填写`frpc.exe`的路径（`Path`）、`frpc.exe`所在的文件夹（`Startup directory`），以及启动参数`-c frpc.toml`（`Arguments`）。然后点击`Install`按钮。

按下 Win + R 组合键，打开运行窗口，输入`services.msc`，回车运行。找到我们刚刚注册的`frpc`服务，双击打开其属性，查看服务状态是否为`正在运行`，启动类型是否为`自动`。

完成之后，可以重启电脑测试自启动是否正常。