---
title: Part 6 光线追踪
createTime: 2025/04/08 14:14:02
permalink: /graphics/p6/
---

至此，我们基本学习完了光栅化成像的内容。不可否认，光栅化成像符合直觉、计算效率高，但是如软阴影、多次光线反射、高质量渲染等场景下，光栅化成像就显得力不从心了。

而光线追踪可以解决这些问题。

在光线追踪中，有几个原则：

- 光沿直线传播；
- 光线与光线之间不会发生碰撞；
- 光线从光源出发，经过若干次反射、折射后进入人眼；
- 光路可逆。

## 1 光线追踪基本原理

一种常见的光线追踪算法称为光线投射。对于成像平面上的某一像素，从相机处投射一条视线穿过该像素，到达模型上的某一点。然后再从光源向该点处投射一条光线，若光线没有被遮挡，则该点可见，形成了一条有效的光路，此时即可着色。

::: center
![1744094133685.webp](https://oss.yoake.cc/yoyopics/graphphics/Part-6/1744094133685.webp){.h-300}
![1744094163334.webp](https://oss.yoake.cc/yoyopics/graphphics/Part-6/1744094163334.webp){.h-300}
:::

但是该算法只考虑了一次反射。作为该算法的改进，Whitted-Style 光线追踪会递归计算人眼投射出的视线的反射和折射，并将每次反射和折射的结果叠加计算作为像素的值。

::: center
![1744094962025.webp](https://oss.yoake.cc/yoyopics/graphphics/Part-6/1744094962025.webp){.h-300}
:::

容易看出，在光线追踪的计算中，关键在于折射和反射，也就是求解光线和模型的交点。

我们定义光线是一条射线，因此其具有起点和方向：

$$
\boldsymbol{r}(t) = \boldsymbol{o} + t \boldsymbol{d}
$$

其中$t \geq 0$。

曲面是若干点$\boldsymbol{p}$的集合，满足：

$$
f(\boldsymbol{p}) = 0
$$

交点即同时满足光线方程和曲面方程，将光线代入球面方程得到：

$$
f(\boldsymbol{o} + t \boldsymbol{d}) = 0
$$

解得$t$的值，代入光线方程$\boldsymbol{r}(t) = \boldsymbol{o} + t \boldsymbol{d}$即可得到交点坐标。

以上是一个数学曲面（平面也算曲面）。然而我们的模型都是三角形组成的，该如何求解光线与三角形的交点？

我们知道三点一定共面，因此我们只需要求解光线与平面的交点，然后判断该交点是否在三角形内即可。

::: tip
采用向量叉乘来判断点是否在三角形内。
:::

当然，还有一种直接给出交点重心坐标的 Möller Trumbore 算法：

我们把三角形$\boldsymbol{p}_0 \boldsymbol{p}_1 \boldsymbol{p}_2$用重心坐标表示：

$$
\boldsymbol{o} + t \boldsymbol{d} = (1-b_1-b_2)\boldsymbol{p}_0 + b_1 \boldsymbol{p}_1 + b_2 \boldsymbol{p}_2
$$

有：

$$
\begin{pmatrix} t \\ b_1 \\ b_2 \end{pmatrix} = 
\frac{1}{\boldsymbol{S} \cdot \boldsymbol{E}_1} 
\begin{pmatrix}
\boldsymbol{S}_2 \cdot \boldsymbol{E}_2 \\
\boldsymbol{S}_1 \cdot \boldsymbol{S} \\
\boldsymbol{S}_2 \cdot \boldsymbol{D}
\end{pmatrix}
$$

其中：

$$
\begin{align*}
\boldsymbol{E}_1 &= \boldsymbol{p}_1 - \boldsymbol{p}_0 \\
\boldsymbol{E}_2 &= \boldsymbol{p}_2 - \boldsymbol{p}_0 \\
\boldsymbol{S} &= \boldsymbol{o} - \boldsymbol{p}_0 \\
\boldsymbol{S}_1 &= \boldsymbol{d} \times \boldsymbol{E}_2 \\
\boldsymbol{S}_2 &= \boldsymbol{S} \times \boldsymbol{E}_1 
\end{align*}
$$

当$t, b_1, b_2$同时满足下列条件时，结果具有物理意义：

$$
t \geq 0 \\
0 \leq b_1 \leq 1 \\
0 \leq b_2 \leq 1 \\
0 \leq b_1 + b_2 \leq 1
$$

## 2 光线与曲面求交加速

### 2.1 轴对齐包围盒

在[三角形的光栅化](/graphics/p2/#_4-2-三角形的光栅化)中，我们不可能逐个判断所有像素是否在三角形内。而是计算三角形的包围盒，对包围盒内的像素进行判断。

同样，我们在计算光线和模型求交时，也不可能计算所有三角形，而是去计算包围盒内的三角形。

对于一个复杂形状的模型，我们用一个相对简单的包围盒包围。如果连包围盒都没有与光线的交点，那么模型一定也没有交点。

最常用的包围盒称为**轴对齐包围盒**（Axis-Aligned Bounding Box, AABB）。AABB 的每条边都与坐标轴平行，这可以显著减少计算量。

我们以一个二维 AABB 为例说明如何计算，三维同理。

::: center
![1744098560087.webp](https://oss.yoake.cc/yoyopics/graphphics/Part-6/1744098560087.webp){.h-300}
:::

二维 AABB 可以由$x_0, y_0, x_1, y_1$来表示。

我们先计算光线与两条纵向边界$x_0$和$x_1$的交点，得到对应的一组$t_{xmin}$和$t_{xmax}$。

然后计算光线与两条横向边界$y_0$和$y_1$的交点，得到另一组$t_{ymin}$和$t_{ymax}$。

比较$t_{xmin}$和$t_{ymin}$，取其较大者作为$t_{min}$；比较$t_{xmax}$和$t_{ymax}$，取其较小者作为$t_{max}$。

当$t_{min} \lt t_{max}$且$t_{max} \gt 0$时，说明光线与 AABB 有交点。

三维 AABB 同理。

## 3 辐射度量学

## 4 渲染方程

## 5 全局光照

## 6 蒙卡特洛积分与路径追踪