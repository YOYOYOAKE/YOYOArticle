---
title: Part 2 梯度与自动微分
createTime: 2025/05/13 14:50:55
permalink: /deeplearning/basic/02/
---

## 1 导数和偏导数

通过非常基础的高等数学知识我们知道，导数是一元函数$y=f(x)$中某个点处的瞬时变化率，即：

$$
\frac{\mathrm{d} y}{\mathrm{d} x} = \lim_{h \to 0} \frac{f(x+h)-f(x)}{h} 
$$

而偏导数将一元函数扩展到了多元函数，对于包含$n$个自变量的多元函数$y=f(x_1, x_2, \cdots, x_n)$而言，其关于第$i$个自变量的偏导数为：

$$
\frac{\partial y}{\partial x_i} =  \lim_{h \to 0} \frac{f(x_1, x_2, \cdots, x_i + h, \cdots x_n) - f(x_1, x_2, \cdots, x_i, \cdots x_n)}{h}
$$

## 2 梯度

每次写$y=f(x_1, x_2, \cdots, x_n)$都显得太冗长了。我们将其改写为这样一个表达式：

$$
y = f(\boldsymbol{x})
$$

这里的函数$f(\boldsymbol{x})$接收的并非是一组数，而是一个列向量$\boldsymbol{x} = [x_1, x_2, \cdots, x_n]^T$

对于这样一个接收$n$维向量为自变量的函数，它的梯度是一个包含$n$个偏导数的向量。

$$
\nabla_{x}f(\boldsymbol{x}) = \left[ \frac{\partial y}{\partial x_1}, \frac{\partial y}{\partial x_2}, \cdots, \frac{\partial y}{\partial x_n} \right]^T
$$

## 3 链式法则

在深度学习中，多元函数通常是复合的。

假设函数$y=f(u_1, u_2, \cdots, u_m)$可微，其中任意中间变量$u_i$都可被可微函数$u_i = g(x_1, x_2, \cdots, x_n)$表示，则$y$对于任意$x_i$的导数可由下列链式法则给出：

$$
\frac{\mathrm{d} y}{\mathrm{d} x_i} = 
\frac{\partial y}{\partial u_1} \frac{\partial u_1}{\partial x_i} +
\frac{\partial y}{\partial u_2} \frac{\partial u_2}{\partial x_i} +
\cdots +
\frac{\partial y}{\partial u_m} \frac{\partial u_m}{\partial x_i}
$$

## 4 自动微分

深度学习框架通过自动微分计算导数。

在实际过程中，根据设计好的模型，系统会构建一个计算图，来跟踪计算哪些数据通过哪种操作组合起来产生输出。自动微分系统能够跟踪整个计算图填充每个参数的偏导数，即反向传播。

我们先对一个简单的函数$y=2\boldsymbol{x}^T \boldsymbol{x}$进行求导。

```python
import torch

x = torch.arange(4., requires_grad=True) # `requires_grad=True`用于指定需要为该张量计算梯度。

print(x.grad) # None。这是一片单独的内存空间用于存储梯度。此时因为尚未计算梯度，所以为`None`。

y = 2 * torch.dot(x, x)

y.backward() # 反向传播，计算梯度。在反向传播的过程中，PyTorch会自动计算`y`对`x`的梯度，并将结果存储在`x.grad`中。
print(x.grad) # tensor([0., 2., 4., 6.])。计算完成。
```