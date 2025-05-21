---
title: Part 5 贝塞尔曲线和贝塞尔曲面
createTime: 2025/03/21 10:47:28
permalink: /graphics/p5/
---

## 1 贝塞尔曲线

贝塞尔曲线通常用来定义可被无限放大的光滑曲线，在计算机图形学中常被用来描述各种物体的运动路径。

下图是一条由四个控制点定义的三阶贝塞尔曲线。$\boldsymbol{p}_0$和$\boldsymbol{p}_3$决定了曲线的起终点，而曲线并不直接通过$\boldsymbol{p}_1$和$\boldsymbol{p}_2$，这两个点只是提供了曲线的走向信息。曲线在起终点的斜率与直线$\boldsymbol{p}_0 \boldsymbol{p}_1$和$\boldsymbol{p}_2 \boldsymbol{p}_3$的斜率相同。

::: center
![1742525118466](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742525118466.webp){.h-200}
:::

### 1.1 确定贝塞尔曲线

最简单的贝塞尔曲线是由两个控制点确定的，在这种情况下，贝塞尔曲线就是连接两个控制点的直线。

三个控制点可以确定一条二阶贝塞尔曲线，我们以其为例说明贝塞尔曲线的确定过程。

三个控制点连接成两条线段，并规定一个比例系数$t$，其中$0 \leq t \leq 1$。在线段$\boldsymbol{b}_0 \boldsymbol{b}_1$上，依据比例系数$t$可以得到一个点$\boldsymbol{b}_0^1$。同理在线段$\boldsymbol{b}_1 \boldsymbol{b}_2$上有点$\boldsymbol{b}_1^1$。

::: center
![1742526215811](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742526215811.webp){.h-200}
:::

连接$\boldsymbol{b}_0^1 \boldsymbol{b}_1^1$，按照同样的比例系数$t$得到$\boldsymbol{b}_0^2$。

::: center
![1742526282654](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742526282654.webp){.h-200}
:::

此时我们发现只有一条直线和一个点了，因此停止操作，得到由这个三个控制点确定的、一条二阶贝塞尔曲线的、在比例系数$t$下的一个点。

计算$t$从 0 到 1 的所有值，就可以得到一条二阶贝塞尔曲线。

::: info
$n$个控制点最多可确定$n-1$阶的贝塞尔曲线。
:::

::: center
![1742526693491](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742526693491.webp){.h-200}
:::

由四个控制点确定的三阶贝塞尔曲线也是一样的。

::: center
![1742526748577](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742526748577.webp){.h-200}
:::

以下是几个动画帮助理解。

二阶贝塞尔曲线：

::: center
![1742526865092](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742526865092.gif){.h-200}
:::

三阶贝塞尔曲线：

::: center
![1742526873092](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742526873092.gif){.h-200}
:::

四阶贝塞尔曲线：

::: center
![1742526880752](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742526880752.gif){.h-200}
:::

五阶贝塞尔曲线：

::: center
![1742526897557](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742526897557.gif){.h-200}
:::

### 1.2 贝塞尔曲线的数学表达式

还是回到最简单的二阶贝塞尔曲线。

容易得到，第一次取点：

$$
\begin{align*}
  \boldsymbol{b}_0^1 &= (1-t) \boldsymbol{b}_0 + t\boldsymbol{b}_1 \\
  \boldsymbol{b}_1^1 &= (1-t) \boldsymbol{b}_1 + t\boldsymbol{b}_2
\end{align*}
$$

第二次取点：

$$
\begin{align*}
\boldsymbol{b}_0^2
  &= (1-t) \boldsymbol{b}_0^1 + t\boldsymbol{b}_1^1 \\
  &= (1-t)^2\boldsymbol{b}_0 + 2t(1-t)\boldsymbol{b}_1 + t^2\boldsymbol{b}_2
\end{align*}
$$

一般地，对于$n$阶贝塞尔曲线$\boldsymbol{b}(t), 0 \leq t \leq 1$，其一般形式为：

$$
\boldsymbol{b}^n(t) = \boldsymbol{b}_0^n(t) = \sum_{j=0}^n \boldsymbol{b}_j B_j^n(t)
$$

其中$B_j^n(t)$为贝塞尔多项式：

$$
\begin{align*}
B_j^n(t)
  &= \begin{pmatrix} n \\ i \end{pmatrix} t^i (1-t)^{n-i} \\
  &= \frac{n!}{i!(n-i)!} t^i (1-t)^{n-i}
\end{align*}
$$

当$n=3$时，为四个控制点确定的三阶贝塞尔曲线：

$$
\boldsymbol{b}^3(t) = \boldsymbol{b}_0 \cdot (1-t)^3 + \boldsymbol{b}_1 \cdot 3t(1-t)^2 + \boldsymbol{b}_2 \cdot 3t^2(1-t) + \boldsymbol{b}_3 \cdot t^3
$$

由此，可以得出三阶贝塞尔曲线的两条重要性质：

$$
\begin{align*}
  \boldsymbol{b}(0) &= \boldsymbol{b}_0 \\
  \boldsymbol{b}(1) &= \boldsymbol{b}_3 \\
\end{align*}
$$

$$
\begin{align*}
  \boldsymbol{b}'(0) &= 3(\boldsymbol{b}_1 - \boldsymbol{b}_0) \\
  \boldsymbol{b}'(1) &= 3(\boldsymbol{b}_3 - \boldsymbol{b}_2) \\
\end{align*}
$$


### 1.3 分段贝塞尔曲线

我们知道，贝塞尔曲线的控制点只提供位置信息，而不精确控制其走向。因此面对高阶贝塞尔曲线，想调整其形状是非常困难的。各个控制点之间相互联系，容易“牵一发而动全身”。

所以我们对贝塞尔曲线进行分段处理。

行业中通常使用多段三阶贝塞尔曲线，因为可以使用前两个点控制其起点走向，后两个点控制其终点走向。

将三阶贝塞尔曲线首尾相连，就可达到高阶贝塞尔曲线的效果。

::: center
![1742537242541](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742537242541.webp){.h-200}
:::

这种仅满足$\boldsymbol{a}_n = \boldsymbol{b}_0$的连续，称其为$C_0$连续。

::: center
![1742537378180](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742537378180.webp){.h-200}
:::

而像这样满足$\boldsymbol{a}_n = \boldsymbol{b}_0 = \frac{1}{2} \boldsymbol{a}_{n-1} + \boldsymbol{b}_1$的连续，称为$C_1$连续。

## 2 贝塞尔曲面

贝塞尔曲面是贝塞尔曲线在三维空间中的推广。业界中通常使用$4 \times 4$个控制点去确定一个贝塞尔曲面。

::: center
![1742540146425](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742540146425.webp){.h-200}
:::

要确定一个贝塞尔曲面，首先需要确定贝塞尔曲线。我们将$4 \times 4$个控制点按行横向分为四组，每组4个控制点，分别确定四条三阶贝塞尔曲线。

然后在列方向上纵向切片，四条贝塞尔曲线共得到四个点，然后用这四个点得到一条纵向的三阶贝塞尔曲线。

按照这种方式对所有切片求其纵向贝塞尔曲线，即可得到一个贝塞尔曲面。

::: center
![1742540205549](https://oss.yoake.cc/yoyopics/graphics/Part-5/1742540205549.webp){.h-200}
:::

