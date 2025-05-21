---
title: Windows Terminal
createTime: 2025/01/25 11:33:10
permalink: /memo/wt/
---

## 1 配色方案

你可以在 [Windows Terminal Themes](https://windowsterminalthemes.dev/) 获取其他人分享的配色方案。

配色方案为类似于下方的 JSON 字符串，将其作为一个对象数组元素添加到配置文件`setting.json`的`schemes`中并保存。

::: code-tabs
@tab Solarized Dark Higher Contrast
```JSON
{
  "name": "Solarized Dark Higher Contrast",
  "black": "#002831",
  "red": "#d11c24",
  "green": "#6cbe6c",
  "yellow": "#a57706",
  "blue": "#2176c7",
  "purple": "#c61c6f",
  "cyan": "#259286",
  "white": "#eae3cb",
  "brightBlack": "#006488",
  "brightRed": "#f5163b",
  "brightGreen": "#51ef84",
  "brightYellow": "#b27e28",
  "brightBlue": "#178ec8",
  "brightPurple": "#e24d8e",
  "brightCyan": "#00b39e",
  "brightWhite": "#fcf4dc",
  "background": "#001e27",
  "foreground": "#9cc2c3",
  "selectionBackground": "#003748",
  "cursorColor": "#f34b00"
}
```
:::

## 2 字体与其他美化

在配置文件`setting.json`的`profiles.defaults`对象中如下配置。

::: code-tabs
@tab settings.json
```json
  "defaults": 
  {
      "colorScheme": "Solarized Dark Higher Contrast",
      "font": 
      {
          "face": "JetBrains Mono"
      },
      "opacity": 90,
      "padding": "50",
      "useAcrylic": true
  }
```
## 3 其他配置

直接在配置文件`setting.json`中添加以下配置：

::: code-tabs
@ setting.json
```json
  "copyFormatting": "none",
  "copyOnSelect": true,
  "initialCols": 90,
  "initialRows": 23,
```
:::

## 3 `Oh-My-Posh`配置

前往 Microsoft Store 下载最新的 PowerShell 7 和 Oh-My-Posh。

首先编辑 PowerShell 的配置文件。

```powershell
notepad $PROFILE
```

在弹出的记事本窗口中添加初始化命令。

```text
oh-my-posh init pwsh | Invoke-Expression
```

然后查看 Oh-My-Posh 提供的所有可用的主题。

```powershell
Get-PoshThemes
```

运行该命令后，会显示很多的主题，每个主题的名称会显示在主题的上方。

选择自己喜欢的主题后，重新打开配置文件，将初始化命令改为：

```text
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\<你的主题名字>.omp.json" | Invoke-Expression
```

例如我的主题名字为`pure`，那么：

```text
oh-my-posh init pwsh  --config "$env:POSH_THEMES_PATH/pure.omp.json" | Invoke-Expression
```

保存文件，然后重启终端，即可应用主题。