---
title: Windows 注册表文件
createTime: 2025/04/16 20:27:14
permalink: /memo/reg/
---

Windows 的注册表完全就是屎山~各种杂七杂八的配置一股脑塞进注册表中，变成了一个完全的黑盒。

但是有些设置只能通过注册表来修改，直接使用注册表编辑器极易误操作，所以将一些用得到的注册表文件保存在这里，以备不时之需。

## 1 修复 LTSC 中资源管理器导航窗格中的 OneDrive 无法访问的问题

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FolderDescriptions\{A52BBA46-E9E1-435f-B3D9-28DAA648C0F6}]
"Attributes"=dword:00000001
"Category"=dword:00000004
"DefinitionFlags"=dword:00000040
"Icon"=hex(2):25,00,53,00,79,00,73,00,74,00,65,00,6d,00,52,00,6f,00,6f,00,74,\ 00,25,00,5c,00,73,00,79,00,73,00,74,00,65,00,6d,00,33,00,32,00,5c,00,69,00,\ 6d,00,61,00,67,00,65,00,72,00,65,00,73,00,2e,00,64,00,6c,00,6c,00,2c,00,2d,\ 00,31,00,30,00,34,00,30,00,00,00
"LocalizedName"=hex(2):40,00,25,00,53,00,79,00,73,00,74,00,65,00,6d,00,52,00,\ 6f,00,6f,00,74,00,25,00,5c,00,53,00,79,00,73,00,74,00,65,00,6d,00,33,00,32,\ 00,5c,00,53,00,65,00,74,00,74,00,69,00,6e,00,67,00,53,00,79,00,6e,00,63,00,\ 43,00,6f,00,72,00,65,00,2e,00,64,00,6c,00,6c,00,2c,00,2d,00,31,00,30,00,32,\ 00,34,00,00,00
"LocalRedirectOnly"=dword:00000001
"Name"="OneDrive"
"ParentFolder"="{5E6C858F-0E22-4760-9AFE-EA3317B67173}"
"ParsingName"="shell:::{018D5C66-4533-4307-9B53-224DE2ED1FE6}"
"RelativePath"="OneDrive"
```

## 2 Windows 11 资源管理器导航窗格中的图库的隐藏与恢复

::: tabs
@tab 隐藏图库
```
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Classes\CLSID\{e88865ea-0e1c-4e20-9aa6-edcd0212c87c}]
"System.IsPinnedToNameSpaceTree"=dword:00000000
```
@tab 恢复图库
```
Windows Registry Editor Version 5.00
 
[HKEY_CURRENT_USER\Software\Classes\CLSID\{e88865ea-0e1c-4e20-9aa6-edcd0212c87c}]
"System.IsPinnedToNameSpaceTree"=dword:00000001
```
:::

## 3 Windows 11 资源管理器导航窗格中的主文件夹的隐藏与恢复

::: tabs
@tab 隐藏主文件夹
```
Windows Registry Editor Version 5.00
 
[-HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace\{f874310e-b6b7-47dc-bc84-b9e6b38f5903}]
```
@tab 恢复主文件夹
```
Windows Registry Editor Version 5.00
 
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace\{f874310e-b6b7-47dc-bc84-b9e6b38f5903}]
@="CLSID_MSGraphHomeFolder"
```
:::