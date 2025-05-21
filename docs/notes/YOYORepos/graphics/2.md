---
title: Part 2 光栅化成像
createTime: 2025/03/11 18:15:26
permalink: /graphics/p2/
---

## 1 模型视图变换

成像中必不可少的就是相机。相机位置可以由三个属性定义：

- 位置 $\boldsymbol{e}$
- 视线方向 $\hat{\boldsymbol{g}}$
- 向上方向 $\hat{\boldsymbol{t}}$

相机的位置自然是自由的，但是对于计算成像来说就不太舒服了。你可能遇到乱七八糟的坐标和方向，对人类和计算机都不太友好。

因此我们通常保持物体模型和相机的相对位置不变，而整体移动模型和相机，使相机达到标准位置。在这种情况下，相机应该位于原点，视线方向为$z$轴负方向，向上方向为$y$轴正方向。

将一个任意位置、任意方向的相机移动到标准位置，需要经过以下步骤：

::: steps
1. 将相机移动到原点
   $$
   T_{view} = \begin{pmatrix}
   1 & 0 & 0 & -x_{\boldsymbol{e}} \\
   0 & 1 & 0 & -y_{\boldsymbol{e}} \\
   0 & 0 & 1 & -z_{\boldsymbol{e}} \\
   0 & 0 & 0 & 1 
   \end{pmatrix}
   $$
2. 将$\hat{ \boldsymbol{g}}$旋转到$-z$轴
3. 将$\hat{ \boldsymbol{t}}$旋转到$y$轴
4. 将$\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}$旋转到$x$轴
:::
::: center
![1741689227708](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741689227708.webp){.h-200}
:::

理论很简单，但是将任意向量旋转至坐标轴上并不容易，因此可以反向思维：

::: steps
1. 将相机移动到原点
2. 将$x$轴旋转到$\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}$
3. 将$y$轴旋转到$\hat{ \boldsymbol{t}}$
4. 将$-z$轴旋转到$\hat{ \boldsymbol{g}}$
:::

因此有

$$
R_{view}^{-1} = \begin{pmatrix}
	x_{\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}} & x_t & x_{-g} & 0 \\
	y_{\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}} & y_t & y_{-g} & 0 \\
	z_{\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}} & z_t & z_{-g} & 0 \\
  0 & 0 & 0 & 1
\end{pmatrix}
$$

容易验证$R_{view}^{-1}$正交，于是：

$$
R_{view} = (R_{view}^{-1})^{-1} = (R_{view}^{-1})^T = \begin{pmatrix}
	x_{\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}} & y_{\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}} & z_{\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}} & 0 \\
	x_t & y_t & z_t & 0 \\
	x_{-g} & y_{-g} & z_{-g} & 0 \\
  0 & 0 & 0 & 1
\end{pmatrix}
$$

因此模型视图变换矩阵为：

$$
M_{view} = R_{view} T_{view} =
\begin{pmatrix}
	x_{\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}} & y_{\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}} & z_{\hat{ \boldsymbol{g}} \times \hat{ \boldsymbol{t}}} & 0 \\
	x_t & y_t & z_t & 0 \\
	x_{-g} & y_{-g} & z_{-g} & 0 \\
  0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
   1 & 0 & 0 & -x_{\boldsymbol{e}} \\
   0 & 1 & 0 & -y_{\boldsymbol{e}} \\
   0 & 0 & 1 & -z_{\boldsymbol{e}} \\
   0 & 0 & 0 & 1 
   \end{pmatrix}
$$

## 2 投影变换

### 2.1 正交投影

正交投影不满足现实生活中“近大远小”的规律，更像是整个场景被“拍”进了平面中。

::: center
![1741689975931](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741689975931.webp){.h-200}
:::

正交投影可以由下述操作得到：

::: steps
1. 将相机和物体变换至标准位置
2. 将物体置于标准立方体中
3. 令$z=0$ 
:::

::: center
![1741690198589](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741690198589.webp){.h-200}
:::

当一个边长为2的立方体的中心位于原点，且所有边都与坐标轴平行时，即为标准立方体，也即$[-1,1]^3$。

将任意立方体$[l,r] \times [b,t] \times [f,n]$变换到标准立方体分为两步：

::: steps
1. 将立方体中心移动到原点
$$
T =
\begin{pmatrix}
   1 & 0 & 0 & -\frac{r+l}{2} \\
   0 & 1 & 0 & -\frac{t+b}{2} \\
   0 & 0 & 1 & -\frac{n+f}{2} \\
   0 & 0 & 0 & 1 
\end{pmatrix}
$$

2. 将立方体的各条边都缩放至2
$$
R =
\begin{pmatrix}
	\frac{2}{r-l} & 0 & 0 & 0 \\
	0 & \frac{2}{t-b} & 0 & 0 \\
	0 & 0 & \frac{2}{n-f} & 0 \\
  0 & 0 & 0 & 1
\end{pmatrix}
$$
:::

最后的变换矩阵为
$$
M_{ortho} = R  T
$$

### 2.2 透视投影

人眼接收到世界的画面就是透视投影。在这种情况下，画面符合“近大远小”的规则，并且所有的投影线都将汇聚于一点。

相机接收到的画面应该是从镜头处发散出去形成一个四棱锥体，再截取远近平面之内的物体，形成一个四棱台。

然后将四棱台“挤压”成一个立方体，剩下的就是正交投影的内容了。

::: center
![1741761334610](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741761334610.webp){.h-200}
:::

所以透视投影的关键在于将棱台变换为立方体。

我们先沿着$x$轴方向从正向负观察模型：

::: center
![1741761695503](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741761695503.webp){.h-200}
:::

$n$代表近平面到原点的距离，$z$代表远平面到原点的距离。为了避免混淆，我们将远平面距离用$f$来表示。

由相似三角形：

$$
y' = \frac{n}{f} y
$$

$$
x' = \frac{n}{f} x
$$

改写为齐次坐标：

$$
\begin{pmatrix}
	x' \\ y' \\ z' \\ 1
\end{pmatrix}
=
\begin{pmatrix}
	\frac{nx}{f} \\ \frac{ny}{f} \\ ? \\ 1
\end{pmatrix}
=
\begin{pmatrix}
	nx \\ ny \\ ? \\ f
\end{pmatrix}
=
M_{persp \rightarrow ortho}
\begin{pmatrix}
	x \\ y \\ z \\ 1
\end{pmatrix}
$$

我们可以很容易地看出变换矩阵$M_{persp \rightarrow ortho}$的第 1、2、4 行，但是由于我们不知道$z$坐标的变换，所以第三行我们写不出来。

$$
\begin{pmatrix}
	nx \\ ny \\ ? \\ z
\end{pmatrix}
=
\begin{pmatrix}
	n & 0 & 0 & 0 \\
	0 & n & 0 & 0 \\
	? & ? & ? & ? \\
	0 & 0 & 1 & 0
\end{pmatrix}
\begin{pmatrix}
	x \\ y \\ z \\ 1
\end{pmatrix}
$$

进一步观察模型发现：变换前后，近平面上的点$(x,y,n,1)$没有发生任何变化；远平面上的点$(x,y,f,1)$尽管$x$和$y$坐标发生改变，但是$z$坐标没有发生变化。

首先考虑规律 1：变换前后，近平面上的点没有发生任何变化。

$$
\begin{pmatrix}
	x \\ y \\ n \\ 1
\end{pmatrix}
=
\begin{pmatrix}
	nx \\ ny \\ n^2 \\ n
\end{pmatrix}
=
\begin{pmatrix}
	n & 0 & 0 & 0 \\
	0 & n & 0 & 0 \\
	? & ? & ? & ? \\
	0 & 0 & 1 & 0
\end{pmatrix}
\begin{pmatrix}
	x \\ y \\ n \\ 1
\end{pmatrix}
$$

只看第三行，发现$n$的变换与$x$和$y$无关。（尽管这里没有严谨证明，但是我们先大胆假设一下）

于是：

$$
n^2 =
\begin{pmatrix}
	0 & 0 & A & B
\end{pmatrix} 
\begin{pmatrix}
	x \\ y \\ n \\1
\end{pmatrix}
= An + B
$$

同理由规律 2 可得：

$$
f^2 =
\begin{pmatrix}
	0 & 0 & A & B
\end{pmatrix} 
\begin{pmatrix}
	fx \\ fy \\ f \\ 1
\end{pmatrix}
= Af + B
$$

联立方程解得：

$$
\begin{align*}
A &= n+f \\
B &= -nf
\end{align*}
$$

于是

$$
M_{persp \rightarrow ortho} = \begin{pmatrix}
	n & 0 & 0 & 0 \\
	0 & n & 0 & 0 \\
	0 & 0 & n+f & -nf \\
	0 & 0 & 1 & 0
\end{pmatrix}
$$

最终的透视投影矩阵为：

$$
M_{persp} = M_{ortho} M_{persp \rightarrow ortho}= \\
\begin{pmatrix}
	\frac{2}{r-l} & 0 & 0 & 0 \\
	0 & \frac{2}{t-b} & 0 & 0 \\
	0 & 0 & \frac{2}{n-f} & 0 \\
	0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
	1 & 0 & 0 & -\frac{r+l}{2} \\
	0 & 1 & 0 & -\frac{t+b}{2} \\
	0 & 1 & 1 & -\frac{n+f}{2} \\
	0 & 0 & 0 & 1 
\end{pmatrix}
\begin{pmatrix}
	n & 0 & 0 & 0 \\
	0 & n & 0 & 0 \\
	0 & 0 & n+f & -nf \\
	0 & 0 & 1 & 0
\end{pmatrix}
$$

这个矩阵可以将任意一个

- 远近平面垂直于$z$轴，平行于$xOy$平面
- 远近平面的边都与$x$轴和$y$轴平行
- 远近平面的中心连线平行于$z$轴

的四棱台变换到标准立方体中。

### 2.2.3 视场角与长宽比

刚才我们得到了透视投影矩阵，但是其中的参数$l,r,b,t$无法直接求得。

因此引入视场角$fov$和长宽比$Aspect Ratio$的概念。

::: center
![1741764876759](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741764876759.webp){.h-200}
![1741765231125](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741765231125.webp){.h-200}
:::

由此得到：

$$
\begin{align*}
t &= n \tan{f_{ov}} \\
b &= -t \\
r &= A_{spectRatio} t \\
l &= -r
\end{align*}
$$



## 3 视口变换

刚才我们已经将模型通过透视投影转换成为了标准立方体，接下来就要将三维模型显示在二维屏幕上的问题。

首先我们对模型的标准立方体进行正交投影，即令$z$坐标为$0$，此时其投影位于平面$[-1,1]^2$内。

然后把$[-1,1]^2$平面映射到屏幕$[0,w] \times [0,h]$中：

$$
M_{viewport} = \begin{pmatrix}
	\frac{w}{2} & 0 & 0 & \frac{w}{2} \\
	0 & \frac{h}{2} & 0 & \frac{h}{2} \\
	0 & 0 & 1 & 0 \\
	0 & 0 & 0 & 1
\end{pmatrix}
$$

这个变换称为视口变换。

## 4 光栅化成像

### 4.1 屏幕与像素

对于图形学来说，屏幕可以抽象为一个像素的二维数组。

像素是一个**单色**的正方形，其颜色可以由红、绿、蓝三种颜色来表示。

我们使用的屏幕坐标系是以右下角为原点，向右为$x$轴正方向的右手系，宽高分别为$w$个像素和$h$个像素。

像素的坐标用其左下角的点的坐标来代替，因此像素坐标的取值范围为$(0,0)$到$(w - 1, h - 1)$之间的整数格点，像素$(x,y)$中心坐标为$(x+0.5, y+0.5)$。

如下图中蓝色像素的坐标可以被表示为$(2,1)$，其中心为$(2.5,1.5)$。

::: center
![1741766388570](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741766388570.webp){.h-200}
:::

### 4.2 三角形的光栅化

光栅化可以理解为把物体显示在屏幕上的过程。

得益于三角形的诸多良好性质，图形学中通常用三角形近似表示复杂物体。因此各种模型的光栅化均等同于为三角形的光栅化。

例如，我们要将下图所示的三角形光栅化到屏幕上，直观上可以认为：**中心**落在三角形内部的像素将其涂色，而**中心**落在三角形外部的像素不作处理。

::: center
![1741766566312](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741766566312.webp){.h-200}
![1741766720797](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741766720797.webp){.h-200}
![1741766811242](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741766811242.webp){.h-200}
:::

于是我们就完成了一个非常简单的光栅化。

:::: info 

向量积可用来判断“左和右”。假设下图中的向量$\boldsymbol{a}$和$\boldsymbol{b}$在 $xOy$平面上，则根据右手定则，$\boldsymbol{a} \times \boldsymbol{b}$ 指向$z$轴正方向，那么我们认为$\boldsymbol{b}$在$\boldsymbol{a}$的左侧；同理，$\boldsymbol{b} \times \boldsymbol{a}$指向$z$轴负方向，那么我们认为$\boldsymbol{a}$在$\boldsymbol{b}$的右侧。

进一步，向量积还可判断“内与外”。依次作$\vec{AP}\times\vec{AB}, \vec{BP}\times\vec{BC}, \vec{CP}\times\vec{CA}$，若以上向量积指向的方向相同，则$P$点在三角形$ABC$的内侧，否则在外侧。

::: center
![1741767271598](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741767271598.webp){.h-200}
![1741767362921](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741767362921.webp){.h-200}
:::

::::

:::: tip

在编写程序中，我们采用遍历的形式依次决定像素是否被涂色。这对于高分辨率的屏幕会带来无意义的消耗（每光栅化一个三角形就要遍历所有像素）。因此我们会计算这个三角形的包围盒（Bounding Box），只遍历包围盒中的像素，从而加速光栅化。

::: center
![1741767048683](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741767048683.webp){.h-200}
:::

::::

## 5 抗锯齿

到这里，你已经能看出问题了：光栅化得到的图像会形成锯齿。因为像素并不能完全描述原有的三角形。

可以这么简单理解：三角形是连续的，而像素是不连续的。在采样过程中发生了信息丢失。

### 5.1 采样和走样

现实世界中的信息几乎都是连续的，声音、电磁波、光信号等，它们以特定的频率和波形传播信息。

我们知道，任何一列波形都可以使用傅立叶级数展开成为一系列正弦函数、余弦函数和常数项的线性组合。

例如，下面这个函数可以近似表示一个方波：

$$
f(x) = \frac{A}{2} - \frac{2A\cos(3t\omega)}{3\pi} + \frac{2A\cos(5t\omega)}{5\pi} - \frac{2A\cos(7t\omega)}{7\pi} + \dots
$$

::: center
![1741853736057](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741853736057.webp){.h-200}
:::

因此下面的分析就以最简单的正弦函数和余弦函数来举例。

我们在学习绘制函数图像的时候学习过描点法，其思想是：在寻找若干个具有代表性的、在函数上的点，并将其一一连接，得到一段折线。这段折线就可以近似描述任何复杂函数。采样点越多，折线和函数越近似；采样点越少，折线越失真。

观察下面这组波，从上到下变化频率依次增加，但是采样点的数目并没有变化。因此第 1 和第 2 列波描点采样后形成的折线能够基本反映波的形状；第 3 列波采样结果开始失真；第 4 和第 5 列波基本完全不能反映原波了。

::: center
![1741853977188](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741853977188.webp){.h-200}
:::

自然而言得出结论：采样频率应该与真实频率相近。

特殊地，像下面这种情况，即在某个频率采样下，两条频率完全不同的波采样得到的结果是相同的。

::: center
![1741854288451](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741854288451.webp){.h-200}
:::

显然，符合满足一组采样的波总是不止一条（会有各种各样的波通过各种各样的方式完美穿过你的所有采样点），使得我们想要形状被另一种无关的形状替换。这种情况我们就称之为走样。

摩尔纹就是一种典型的走样。

::: center
![1741854509890](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741854509890.webp){.h-200}
:::

### 5.2 频域和滤波

应用傅立叶变换，我们可以画出任意图像的频域图。频域图描述了这幅图像中各个频率的信息的占比。越接近中心，代表频率越低（一般为大块、均匀、变化不明显的区域）；越接近外侧，代表频率越高（一般为细小、破碎、变化剧烈的区域）。其占比使用亮度表示，即亮度越高，信息占比越多，反之占比越少。

下面这幅图中低频信息较多，而高频信息较少，因此在频域图呈现出中心亮而周围暗的状态。

::: center
![1741855436271](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741855436271.webp){.h-200}
:::

我们可以认为屏蔽掉某些频率的波，使得图像变为我们想要的样子。

例如，屏蔽掉所有低频信息，只留下变化剧烈的边界：

::: center
![1741855573320](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741855573320.webp){.h-200}
:::

屏蔽掉所有高频信息，只留下变化不明显的大块色块：

::: center
![1741855612008](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741855612008.webp){.h-200}
:::

前者过滤掉所有的低频信息，只允许高频信息通过，我们称之为高通滤波器。后者称为低通滤波器。

当然，为了提取出一些不明显的信息，还有各种各样的滤波器：

::: center
![1741855716500](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741855716500.webp){.h-200}
:::

### 5.3 多重采样抗锯齿（MSAA）

经过上面的分析，我们知道了造成走样的原因是因为高频信号不匹配低频采样。既然如此，我们使用低通滤波器处理原图像，再进行采样，就可以解决问题了。

我们通常使用这个低通滤波器处理图像：

$$
\frac{1}{9}
\begin{pmatrix}
  1 & 1 & 1 \\
  1 & 1 & 1 \\
  1 & 1 & 1
\end{pmatrix}
$$

这个滤波器每次处理一个像素和它周围的八个像素，中心像素的值等于周围八个像素与它自身的平均值.

自然，经过滤波之后，每个像素的值都由原来的 0 和 1 变成了一个浮点数，视觉上就是从“非黑即白”变成了具有灰度的图像。

::: center
![1741856271258](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741856271258.webp){.h-200}
:::

直白地说，就是三角形覆盖到这个像素的比例。

因此我们直接计算这个比例就好了。但是精确求解三角形覆盖的像素面积比例需要消耗过多的计算资源，因此提出了一种近似方法。

这种方法将一个完整的像素划分为若干个子像素，判断每个子像素的中心是否在三角形内. 统计在三角形内的子像素的比例，即可得到近似值。

下图是将每个像素划分为 4 个子像素，每个像素的取值为 0、0.25、0.5、0.75、1。

::: center
![1741856504031](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741856504031.webp){.h-200}
![1741856577909](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741856577909.webp){.h-200}
:::

这就是**多重采样抗锯齿（MSAA）**的基本思想。

## 6 深度缓冲

深度缓冲用来解决不同远近、相互遮挡的三角形应如何在屏幕上显示的问题。

类比地说，在作油画时，画家们通常先画远处的物体，然后再一层一层画近处的物体. 这被称为画家算法.

但是对于下面这种情况，画家算法显然不太适用：

::: center
![1741858226572](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741858226572.webp){.h-200}
:::

为了解决这个问题，引入深度缓冲的概念。

在生成图像时，同步生成两张图像。一张用于记录颜色，一张用于记录深度。

基本思想是，初始化一个和屏幕像素数量相匹配的颜色数组和深度数组，并将深度数组的元素都置为无穷大。

然后遍历所有三角形中的所有像素，如果对应位置的像素的深度小于当前深度数组中所记录的值，就更新深度数组记录的当前像素深度，同时更新颜色数组中记录的当前像素颜色，否则不做操作。

如下图所示。

::: center
![1741858615848](https://oss.yoake.cc/yoyopics/graphics/Part-2/1741858615848.webp){.h-250}
:::