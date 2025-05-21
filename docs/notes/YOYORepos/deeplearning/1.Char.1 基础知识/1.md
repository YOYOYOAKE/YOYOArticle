---
title: Part 1 PyTorch 张量操作
createTime: 2025/05/12 17:23:02
permalink: /deeplearning/basic/01/
---

$n$维数组被称为张量。

在使用张量之前，首先需要导入`torch`包。

```python
import torch
```

## 1 创建张量

### 1.1 从 Python 数组中创建张量

使用`tensor()`来从 Python 数组中创建张量。

```python
x = torch.tensor([[1, 2, 3, 4],
                  [5, 6, 7, 8],
                  [9,10,11,12]])
```

在这里我们以二维数组的方式声明了一个 3×4 **形状**的张量，其**大小**为 12。

```python
print(x.shape) # torch.Size([3, 4])
print(x.numel()) # 12
```

### 1.2 创建行向量

使用`arange()`创建一个指定大小的行向量。

```python
x = torch.arange(12)

print(x) # tensor([ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11])
print(x.shape) # torch.Size([12])
print(x.numel()) # 12
```

`arange()`也支持设置数字的范围：

```python
x = torch.arange(13, 25)

print(x) # tensor([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
```

### 1.3 创建特殊元素的张量

PyTorch 中提供了 `zeros()` `ones()` `randn()`方法来创建元素全为 0、全为 1、全为随机数的张量。

其中`randn()`方法生成的张量中的每个元素都会从标准高斯分布中随机取值。

```python
# 全 0 张量
x = torch.zeros(3, 4)
print(x) # tensor([[0., 0., 0., 0.],
         #         [0., 0., 0., 0.],
         #         [0., 0., 0., 0.]])

# 全 1 张量
x = torch.ones(3, 4)
print(x) # tensor([[1., 1., 1., 1.],
         #         [1., 1., 1., 1.],
         #         [1., 1., 1., 1.]])

# 全随机数张量
x = torch.randn(3, 4)
print(x) # tensor([[ 0.6566,  1.5209, -1.5275,  1.9680],
         #         [-0.8391,  1.6261, -1.6762,  0.9822],
         #         [-0.1960,  0.3058,  1.1281, -1.9841]])
```

## 2 张量的形状

学过线性代数的都知道，矩阵的形状非常重要。于张量而言同理。

我们可以访问张量的`shape`属性获知张量的形状。例如对于我们最初创建的张量：

```python
x = torch.tensor([[1,2,3,4],
                  [5,6,7,8],
                  [9,10,11,12]])

print(x.shape) # torch.Size([3, 4])
```

PyTorch 中提供了`reshape()`方法用来改变张量的形状。

对于张量`x`，我们要将它更改为 4×3 形状的，只需要：

```python
y = x.reshape(4,3)

print(y) # tensor([[ 1,  2,  3],
         #         [ 4,  5,  6],
         #         [ 7,  8,  9],
         #         [10, 11, 12]])
print(y.shape) # torch.Size([4, 3])
```

事实上对于这样一个二维张量而言，只要确定了一个维度的大小，就可以计算出另一个维度。我们使用 -1 来让 PyTorch 自动计算：

```python
y = x.reshape(4,3)
z = x.reshape(-1,3)
w = x.reshape(4,-1)

print(y.shape == z.shape == w.shape) # True
```

因此我们要创建`x`这样一个张量，完全不必从 Python 数组中创建，只需要：

```python
x = torch.arange(12).reshape(3, 4)
```

即可。

## 3 张量的运算

### 3.1 按元素运算

若两个张量大小相同，则可以按元素运算。

#### 3.1.1 按元素的数值计算

```python
x = torch.tensor([1., 2., 3.])
y = torch.tensor([4., 5., 6.])

print(x + y) # tensor([5., 7., 9.])
print(x - y) # tensor([-3., -3., -3.])
print(x * y) # tensor([ 4., 10., 18.])
print(x / y) # tensor([0.2500, 0.4000, 0.5000])
print(x ** y) # tensor([  1.,  32., 729.])

print(torch.exp(x)) # tensor([ 2.7183,  7.3891, 20.0855])

print(x + 1) # tensor([2., 3., 4.])
```

#### 3.1.2 按元素的逻辑运算

除了算术运算符和指数函数之外，还有逻辑运算符。

```python
x = torch.tensor([[ 0,  1,  2,  3],
                  [ 4,  5,  6,  7],
                  [ 8,  9, 10, 11]])
y = torch.tensor([[ 4,  1,  2,  3],
                  [ 4,  2,  6,  9],
                  [ 10,  2, 10, 13]])

print(x == y) # tensor([[False,  True,  True,  True],
              #         [ True, False,  True, False],
              #         [False, False,  True, False]])
```

#### 3.1.3 对元素求和

还可以对张量中的所有元素求和：

```python
x = torch.tensor([[ 0,  1,  2,  3],
                  [ 4,  5,  6,  7],
                  [ 8,  9, 10, 11]])

print(x.sum()) # 66
```

#### 3.1.4 广播机制

上面提及的按元素运算都是针对两个相同形状的张量。若张量的形状不同，就会调用广播机制来执行按元素操作。

简单来说，就是通过适当的复制元素来扩展一个或两个张量，使其具有相同的形状。

大多数情况下，沿着长度为 1 的轴进行广播。

```python
x = torch.arange(6).reshape(3, 2)
y = torch.arange(7,13).reshape(2, 3)

print(x) # tensor([[0],
         #         [1],
         #         [2]])
print(y) # tensor([[0, 1]])

print(x + y) # tensor([[0, 1],
             #         [1, 2],
             #         [2, 3]])
```

在广播机制的作用下，$x+y$实际上等价于：

$$
\begin{pmatrix} 0 & 0 \\ 1 & 1 \\ 2 & 2 \end{pmatrix} +
\begin{pmatrix} 0 & 1 \\ 0 & 1 \\ 0 & 1 \end{pmatrix} =
\begin{pmatrix} 0 & 1 \\ 1 & 2 \\ 2 & 3 \end{pmatrix}
$$


### 3.2 线性代数运算

#### 3.2.1 转置

访问张量的`.T`属性得到它的转置。

```python
x = torch.arange(9).reshape(3, 3)

print(x) # tensor([[0, 1, 2],
         #         [3, 4, 5],
         #         [6, 7, 8]])
print(x.T) # tensor([[0, 3, 6],
           #         [1, 4, 7],
           #         [2, 5, 8]])
```

#### 3.2.2 点积

使用`.dot()`方法计算两个长度相同的向量的点积。它等价于两个向量按元素相乘再求和。

```python
x = torch.tensor([ 1, 2, 3])
y = torch.tensor([ 4, 5, 6])

print(torch.dot(x, y)) # tensor(32)
print(torch.sum(x * y)) # tensor(32)
```

#### 3.2.3 矩阵乘法

使用`.mm()`方法计算矩阵乘法。

```python
x = torch.arange(4).reshape(2, 2)
y = torch.arange(4,8).reshape(2, 2)

print(x) # tensor([[0, 1],
         #         [2, 3]])
print(y) # tensor([[4, 5],
         #         [6, 7]])
print(torch.mm(x, y)) # tensor([[ 6,  7],
                      #         [26, 31]])
```

## 4 张量的索引

和 Python 数组一样，张量也支持按照索引访问。

第一个元素的索引是 0、最后一个元素的索引是 -1。

```python
x = torch.arange(4,10).reshape(3, 2)

print(x) # tensor([[4, 5],
         #         [6, 7],
         #         [8, 9]])

print(x[0]) # tensor([4, 5])
print(x[-1]) # tensor([8, 9])
print(x[-2][0]) # tensor(6)
```

使用形如`[1:2]`的方式访问范围内的张量元素。特别地，`[:]`表示所有元素。

```python
print(x) # tensor([[4, 5],
         #         [6, 7],
         #         [8, 9]])

print(x[0:2]) # tensor([[4, 5],
              #         [6, 7]])

print(x[0:2, 0:1]) # tensor([[4],
                   #         [6]])

print(x[:, 0:1]) # tensor([[4],
                 #         [6],
                 #         [8]])
```