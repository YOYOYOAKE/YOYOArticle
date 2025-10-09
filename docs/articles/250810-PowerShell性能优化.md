---
title: 下一阶段的 PowerShell 美化与性能优化
createTime: 2025/08/10 12:07:20
permalink: /article/affxl6db/
tags:
  - Others
---

> 我在之前写过一篇关于 PowerShell 美化的博客，其中用到了 Oh-My-Posh 这个组件。
>
> 这个组件实在是太慢了，如果好巧不巧你还使用 Conda，那么一次冷启动的时间将会达到 10 秒！
>
> 趁着最近有空，决定优化一下启动速度。

<!-- more -->

在我加入了 Oh-My-Posh 组件、使用了`conda init powershell`命令后，每次启动 PowerShell 时：

```txt
Loading personal and system profiles took 10786ms.
```

这也太慢了！

尽管超过一万毫秒的情况并不多见，但是平时启动速度也在 2500 毫秒左右。

在解决性能问题之外，还要保留一定的美化，至少不能素颜出镜。

## 1 性能优化

### 1.1 Oh-My-Posh 替代：Starship

和 Oh-My-Posh 一样，[Starship](https://starship.rs/zh-CN/) 也是一个终端提示符。不同的是 Starship 使用 Rust 编写，跨平台、且超快。

你可以从 WinGet 中获取 Starship：

```powershell
winget install Starship.Starship
```

然后在配置文件`$PROFILE`中，将 Oh-My-Posh 的配置替换为 Starship。

```ps1
oh-my-posh init pwsh --config "xxx.omp.json" | Invoke-Expression # [!code --]
Invoke-Expression (& starship init powershell) # [!code ++]
```

::: tip
`$PROFILE$`文件一般存放在文档文件夹中，你可以从命令行打开：

```powershell
# 使用记事本
notepad $PROFILE$

# 使用 VSCode
code $PROFILE$
```
:::

保存文件。

### 1.2 Conda 启动优化

在执行`conda init powershell`后，我们可以方便地从 PowerShell 中执行 Conda 命令，而不用从 Anaconda PowerShell Prompt 中启动。这是因为 Conda 自动在 PowerShell 配置目录下生成了一个脚本`profile.ps1`：

```powershell
#region conda initialize
# !! Contents within this block are managed by 'conda init' !!
If (Test-Path "C:\ProgramData\miniconda3\Scripts\conda.exe") {
    (& "C:\ProgramData\miniconda3\Scripts\conda.exe" "shell.powershell" "hook") | Out-String | ?{$_} | Invoke-Expression
}
#endregion
```

这段代码每次启动 PowerShell 都会去调用`conda.exe shell.powershell hook`，而`conda.exe`是 Python 启动的，冷启动就要几百毫秒到几秒。

因此我们希望设置一种“懒加载”的逻辑：启动 PowerShell 时不调用 Conda 以加速启动，而仅当我们第一次输入 Conda 命令后，才调用 Conda。

我们先来到 PowerShell 文件夹（一般为`%USERPROFILE%\文档\PowerShell`）中删除`profile.ps1`文件。

::: file-tree
- 文档
  - PowerShell
    - Microsoft.PowerShell_profile.ps1
    - -- profile.ps1 删除这个文件
    - ...
  - ...
:::

然后打开`Microsoft.PowerShell_profile.ps1`，向其中添加内容：

```powershell
Invoke-Expression (& starship init powershell)

function conda { # [!code ++]
    Remove-Item function:conda -Force）# [!code ++]
    if (Test-Path "C:\ProgramData\miniconda3\Scripts\conda.exe") { # [!code ++]
        (& "C:\ProgramData\miniconda3\Scripts\conda.exe" "shell.powershell" "hook") | Out-String |  Where-Object { $_ } | Invoke-Expression # [!code ++]
    } # [!code ++]
    & conda @args # [!code ++]
} # [!code ++]
```

保存，然后重新启动终端，速度应该会得到明显的提升。

为了得到更精确的数据，我们可以加入启动计时器：

```powershell
$startTime = Get-Date # [!code ++]

# Starship
$env:STARSHIP_CONFIG = "$HOME\OneDrive\文档\PowerShell\starship.toml"
Invoke-Expression (& starship init powershell)

# 懒加载 Conda
function conda {
    Remove-Item function:conda -Force
    if (Test-Path "C:\ProgramData\miniconda3\Scripts\conda.exe") {
        (& "C:\ProgramData\miniconda3\Scripts\conda.exe" "shell.powershell" "hook") | Out-String | Where-Object { $_ } | Invoke-Expression
    }
    & conda @args
}

$elapsed = (Get-Date) - $startTime # [!code ++]
Write-Host ("Loading personal and system profiles took {0}ms." -f [math]::Round($elapsed.TotalMilliseconds)) -ForegroundColor Yellow # [!code ++]
```

重新启动终端：

```txt
Loading personal and system profiles took 223ms.
```

几乎是秒开。

## 2 Starship 美化

你可以在 [Starship 配置](https://starship.rs/zh-CN/config/) 中获取全部的配置项。

我需要的功能有：用户名、目录、Git 分支、Conda 环境、Python 版本号、Node.js 版本号。

自己写挺麻烦的，所以这里拜托 GPT-5 了：

```toml :collapsed-lines
# ~/.config/starship.toml

# 全局格式
format = """\
$username\
$directory\
$git_branch\
$conda\
$python\
$nodejs\
$line_break\
$character\
"""

add_newline = false  # 不在每条命令后多加空行

# 用户名
[username]
show_always = true
style_user = "bold yellow"
style_root = "bold yellow"
format = "$user "

# Conda 环境
[conda]
format = '[$symbol$environment](dimmed green) '
ignore_base = false
style = "yellow"

# Python 版本
[python]
format = "[$symbol$version]($style) "
symbol = "\ue73c "
style = "cyan"
python_binary = "python"

# Node.js 版本
[nodejs]
format = "[$symbol$version]($style) "
symbol = "\ued0d "
style = "green"

# 当前目录
[directory]
style = "blue"
format = "[$symbol$path]($style) "
truncate_to_repo = false

# Git 分支
[git_branch]
symbol = "\uf418 "
style = "purple"
format = "[$symbol$branch]($style) "

# 命令提示符箭头
[character]
success_symbol = "[➜](bold green) "
error_symbol = "[➜](bold red) "
```

最后呈现的效果如下：

::: center
![1754802033554.webp](https://oss.yoake.cc/art/article/1754802033554.webp) 
:::

非常简洁、优雅、美观。