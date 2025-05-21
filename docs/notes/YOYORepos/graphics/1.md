---
title: Part 1 变换与齐次坐标
createTime: 2025/03/11 17:37:35
permalink: /graphics/p1/
---

> 本篇在二维空间推导大部分结论，三维空间同理。

## 1 线性变换

线性变换包括**缩放**、**切变**和**旋转**三种基本变换。因其新坐标是原坐标$(x,y)$的线性组合，都可被写成矩阵乘法的形式。

缩放变换，其中$s_x$和$s_y$为缩放因子：

$$
\begin{pmatrix}
x' \\ y'
\end{pmatrix}
 = 
\begin{pmatrix}
s_x & 0 \\
0 & s_y
\end{pmatrix}

\begin{pmatrix}
x \\ y
\end{pmatrix}
$$

切变变换，可以想象成一个矩形框架被拉伸成平行四边形：

$$
\begin{pmatrix}
x' \\ y'
\end{pmatrix}
 = 
\begin{pmatrix}
1 & a \\
0 & 1
\end{pmatrix}

\begin{pmatrix}
x \\ y
\end{pmatrix}
$$

旋转变换，其中$\theta$为旋转角度（约定为逆时针）：

$$
\begin{pmatrix}
x' \\ y'
\end{pmatrix}
 = 
\begin{pmatrix}
\cos \theta & -\sin \theta \\
\sin \theta & \cos \theta
\end{pmatrix}

\begin{pmatrix}
x \\ y
\end{pmatrix}
$$

## 2 平移变换

平移变换不是线性变换，因为它不能写成矩阵乘法的形式：

$$
\begin{pmatrix}
x' \\ y'
\end{pmatrix}
 = 
\begin{pmatrix}
x \\ y
\end{pmatrix} 
+
\begin{pmatrix}
t_x \\ t_y
\end{pmatrix}
$$

## 3 变换组合与逆变换

### 3.1 变换组合

若对图形做多个连续线性变换，则应该按照变换的顺序依次左乘原坐标，顺序不能颠倒。因为矩阵乘法不满足交换律。

如，对原坐标进行先切变在旋转和先旋转再切变得到的结果的不同的。

$$
\begin{pmatrix}
\cos \theta & -\sin \theta \\
\sin \theta & \cos \theta
\end{pmatrix}

\begin{pmatrix}
1 & a \\
0 & 1
\end{pmatrix}

\begin{pmatrix}
x \\ y
\end{pmatrix}

\neq

\begin{pmatrix}
1 & a \\
0 & 1
\end{pmatrix}

\begin{pmatrix}
\cos \theta & -\sin \theta \\
\sin \theta & \cos \theta
\end{pmatrix}

\begin{pmatrix}
x \\ y
\end{pmatrix} 
$$

同样，线性变换和平移的组合也有顺序之分。

如，对原坐标进行先旋转再平移和先平移再旋转得到的结果是不同的。

$$
\begin{pmatrix}
\cos \theta & -\sin \theta \\
\sin \theta & \cos \theta
\end{pmatrix}

\begin{pmatrix}
x \\ y
\end{pmatrix} 
+
\begin{pmatrix}
t_x \\ t_y
\end{pmatrix}

\neq

\begin{pmatrix}
\cos \theta & -\sin \theta \\
\sin \theta & \cos \theta
\end{pmatrix}

\left(
\begin{pmatrix}
x \\ y
\end{pmatrix} 
+
\begin{pmatrix}
t_x \\ t_y
\end{pmatrix}
\right)
$$

### 2.2 逆变换

要将一个经过线性变换后的坐标还原，只需要求解其逆矩阵。

$$
\begin{pmatrix}
x' \\ y'
\end{pmatrix}
 = 
M
\begin{pmatrix}
x \\ y
\end{pmatrix}
$$

$$
\begin{pmatrix}
x \\ y
\end{pmatrix}
 = 
M^{-1}
\begin{pmatrix}
x' \\ y'
\end{pmatrix}
$$

## 3 齐次坐标与仿射变换

上面提到，平移并非线性变换，因其新坐标不是原坐标的线性组合。这给实际应用带来了不便。

为了把平移变换纳入线性变换中，引入齐次坐标。

令一个二维点$(x,y)^T$的坐标为：

$$
(x,y,1)^T
$$

而令一个平面向量$(x,y)^T$的坐标为：

$$
(x,y,0)^T
$$

这种形式的坐标称为齐次坐标。注意，齐次坐标$(x,y,w)^T$是表示的是一个平面点或平面向量的坐标，而非三维。

在齐次坐标下，平移变换可以被简单地表达为：

$$
\begin{pmatrix} x' \\ y' \\ w' \end{pmatrix} = 
\begin{pmatrix} 
	1 & 0 & t_x \\
	0 & 1 & t_y \\
	0 & 0 & 1
\end{pmatrix} 
\begin{pmatrix} x \\ y \\ 1 \end{pmatrix} =
\begin{pmatrix} x + t_x \\ y + t_y \\ 1 \end{pmatrix}
$$

在齐次坐标下，求由点$A=(x_a,y_a)^T$指向点$B=(x_b,y_b)^T$的向量$\boldsymbol{c}$依然可以被表示为：

$$
\boldsymbol{c} = B-A= 
\begin{pmatrix} x_b \\ y_b \\ 1 \end{pmatrix} -
\begin{pmatrix} x_a \\ y_a \\ 1 \end{pmatrix} =
\begin{pmatrix} x_b - x_a \\ y_b - y_a \\ 0 \end{pmatrix}
$$

类比可得：

- 两个向量之和为一个向量；
- 一个点和一个向量之和为一个点；

规定：如果一个齐次坐标为$(x,y,w)^T$，其中$w \neq 0$，则这个坐标与$(\frac{x}{w}, \frac{y}{w}, 1)^T$等价。

因此，两个点之和为这两个点的中点：

$$
\begin{pmatrix} x_a \\ y_a \\ 1 \end{pmatrix} +
\begin{pmatrix} x_b \\ y_b \\ 1 \end{pmatrix} =
\begin{pmatrix} x_a + x_b \\ y_a + y_b \\ 2 \end{pmatrix} =
\begin{pmatrix} \frac{x_a + x_b}{2} \\ \frac{y_a + y_b}{2} \\ 1 \end{pmatrix}
$$

引入齐次坐标后，变换

$$
\begin{pmatrix}
x' \\ y'
\end{pmatrix}
 = 
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}

\begin{pmatrix}
x \\ y
\end{pmatrix} 
+
\begin{pmatrix}
t_x \\ t_y
\end{pmatrix}
$$

可以写成：

$$
\begin{pmatrix} x' \\ y' \\ 1 \end{pmatrix} = 
\begin{pmatrix} 
	a & b & t_x \\
	c & d & t_y \\
	0 & 0 & 1
\end{pmatrix} 
\begin{pmatrix} x \\ y \\ 1 \end{pmatrix}
$$

称之为**仿射变换**。