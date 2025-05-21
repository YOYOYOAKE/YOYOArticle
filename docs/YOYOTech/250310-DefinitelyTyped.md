---
title: 贡献开源代码：Definitely Typed 贡献小记
createTime: 2025/03/10 19:29:41
permalink: /article/mqdx10ex/
tags:
  - JavaScript / TypeScript
---
> TypeScript 开发者肯定对 `npm install @types/*`这个命令不陌生。是的，由于各种各样的原因，很多 npm 包并不是使用 TypeScript 编写的，这也就导致其缺少类型系统，难以获得 IDE 的类型推断支持。

> 因此出现了开源项目 `DefinitelyTyped`。该项目旨在为 JavaScript 编写的 npm 包提供高质量的 TypeScript 类型定义。任何人都可以为 JS npm 包添加类型定义，供社区中的所有人使用。

> 顺便，我也借着为 `@cesium-china/cesium-map`这个 JS npm 包添加类型定义的机会，阐述一下该如何规范地为开源项目贡献代码。

<!-- more -->

为开源项目贡献代码，不能直接在原项目上修改。而是要将开源项目仓库（称为上游仓库，upstream repo）fork 到你的账号下，成为你自己的仓库（称为远程仓库，remote repo）。然后将远程仓库 clone 到本地（称为本地仓库，local repo），在此基础上进行修改。

因此一个规范的贡献流程是：

::: steps

1. 将上游仓库 fork 到你的账号下，称为远程仓库。
2. 将远程仓库 clone 到本地，称为本地仓库。
3. 在本地仓库中创建一个开发分支，在开发分支上进行修改。
4. 在修改过程中，如果有远程需求，可以随时提交到远程仓库中（注意不是上游仓库）。
5. 在一切都修改、测试完成后，提交 PR 到上游仓库。

:::

## 1 创建开发分支

来到 [`DefinitelyTyped/DefinitelyTyped`](https://github.com/DefinitelyTyped/DefinitelyTyped) 仓库中，将其 fork 到你的账号下。

![1741607484816](https://oss.yoake.cc/yoyopics/article/250310-DefinitelyTyped/1741607484816.webp)

操作完成后，你的账号下应该会多一个 `<用户名>/DefinitelyTyped`仓库，并且显示该仓库“forked from DefinitelyTyped/DefinitelyTyped”。

![1741607593732](https://oss.yoake.cc/yoyopics/article/250310-DefinitelyTyped/1741607593732.webp)

使用 `git clone`命令将你的仓库克隆到本地，并使用 `git checkout -b`命令或者你喜欢的 Git 可视化工具创建一个新分支。

::: tip
再次进行三个仓库的辨析，因为这真的很重要。

此处的**上游仓库**为`DefinitelyTyped/DefinitelyTyped`仓库。

此处的**远程仓库**为`<用户名>/DefinitelyTyped`仓库。

此处的**本地仓库**为你克隆到本地的`<用户名>/DefinitelyTyped`仓库
:::

> 我真的推荐使用如 VSCode 或者 IDEA 等自带的 Git 可视化工具。2025年了，这些可视化工具已经能胜任绝大部分的 Git 任务，真没必要抱着命令行不放。

于 `DefinitelyTyped`而言，其分支命名应该被你所要添加类型定义的 JS npm 包来决定。如果这个包名不包含“@”和“/”，那就以这个包的名字为分支名；否则，你应该按照下面的示例命名分支。

| JS npm 包                | `DefinitelyTyped` 分支名 |
| ------------------------ | -------------------------- |
| example-package          | example-package            |
| @cesium-china/cesium-map | cesium-china__cesium-map   |

也就是去掉“@”字符，并将“/”转为双下划线“__”。

然后在本地仓库的开发分支中进行修改。

::: warning
任何时候都不要直接修改主分支的代码！

主分支代码只能通过 PR 或 Merge 进行修改。
:::

## 2 编写类型声明

按照`DefinitelyTyped`的规范，类型声明文件都应该存放至`/types/<Package-name>/`文件夹。

如我要贡献的`@cesium-china/cesium-map`的类型声明，其声明文件应该放在`/types/cesium-china__cesium-map/index.d.ts`中。

这里不建议自己添加类型声明文件，而是使用`dts-gen`来创建模板。

回到`DefinitelyTyped`，执行

```bash
pnpm install -g dts-gen
pnpx dts-gen –-dt –-name cesium-china__cesium-map -–template module
```

此时你会发现，在对应的包文件夹中出现了一系列的文件。

::: file-tree

- DefinitelyTyped
  - types
    - cesium-china__cesium-map
      - index.d.ts
      - cesium-china__cesium-map-test.ts
      - package.json
      - tsconfig.json
      - .npmignore
:::

- `index.d.ts`

  类型声明文件。所有的类型声明都应该在该文件中得到定义或者被导入。

- `cesium-china__cesium-map-test.ts`

  单元测试文件，你应该在其中编写类型测试。（实测只要能通过编译就行）

- `package.json`

  包含该包的元数据，包括其名称、版本和依赖关系。需要注意的是，其`version`字段应该始终以`9999`为结尾，如`1.0.9999`。

- `tsconfig.json`

  此文件允许你在软件包中运行`tsc`。

- `.npmignore`

  指定哪些文件应包含在包中。


## 3 正确处理外部依赖

我在外部依赖这方面踩了很多坑，因此不得不单独拿出来一部分来说明。

正如我的包名所言，其依赖于外部包`Cesium`中已经定义的类型。

因此我需要将其添加进`/types/cesium-china__cesium-map/package.json`的`dependencies`中。

::: code-tabs
@package.json
```json
  "dependencies": {
      "cesium": ">=1.122.0"
  },
```
:::

但是这样是无法通过后续的单元测试的，因为`Cesium`这个包并不在[允许的外部依赖项列表](https://github.com/microsoft/DefinitelyTyped-tools/blob/main/packages/definitions-parser/allowedPackageJsonDependencies.txt)中。

因此你需要向`microsoft/DefinitelyTyped-tools`这个仓库提交 PR，将`Cesium`添加进这个文件中。

审核完成后，该依赖项就会被允许，从而通过单元测试。

## 4 单元测试与格式化代码

在完成所有类型声明的编写后，需要进行单元测试，而后格式化代码。

回到`DifinitelyTyped`项目根目录下，安装项目及你的包所需的依赖。

```bash
pnpm install -w --filter "{./types/cesium-china__cesium-map}..."
```

::: warning
注意不能直接执行`pnpm install`，这会把这个仓库的依赖全部安装！
:::

然后进行单元测试：

```bash
pnpm test @cesium-china/cesium-map
```

测试结果会告知你是否通过，如果没有通过，会一并告知你原因。

单元测试通过后，还需要格式化代码。

```bash
pnpm dprint fmt -- '/types/cesium-china__cesium-map/*.ts'
```

这一步务必要执行，因为 DefinitelyTyped 十分严格，否则过不了 CI。

通过单元测试并格式化代码后，将你的代码 push 至远程仓库，准备提交 PR。

## 5 提交 PR、Code Review 与合并

提交 PR，会要求填写一份清单，按实际情况填写后提交即可。

然后 Github Actions 会自动运行 CI，没有问题的话，代码就会等待 Review，再之后就可以被合并进主分支。若 CI 未通过，则需要修复错误后重新提交。

代码完成合并的一到两个小时之内就会被发布到 npm 上。

此时即可使用`npm install --save @types/cesium-china__cesium-map`来为`@cesium-china/cesium-map`启用类型支持。

## 6 致谢

::: center
**再次为所有开源项目开发者、维护者、贡献者致以最诚恳的敬意。**
:::