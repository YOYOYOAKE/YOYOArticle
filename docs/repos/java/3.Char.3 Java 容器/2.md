---
title: Part 2 列表 List
createTime: 2025/05/07 15:37:53
permalink: /java/container/02/
---

Java 列表和数组非常相似，都是按顺序存储同一类型的元素。与数组不同，列表的长度并不固定，极大提高了灵活性。因此列表也可以看作一种动态数组。

列表可以由数组和链表分别实现。在 Java 中，基于数组实现的列表称为 ArrayList，基于链表实现的称为 LinkedList。

## 1 ArrayList 基本使用

在使用 ArrayList 之前，需要先导入：

```java
import java.util.ArrayList;
```

### 1.1 创建一个 ArrayList

ArrayList 支持泛型，因此可以在`< >`中指定 ArrayList 存储的数据类型。

```java
ArrayList<E> list = new ArrayList<E>();
ArrayList<E> list = new ArrayList<>(); // 简化写法
```

其中`E`表示泛型，只能为引用数据类型。

```java
ArrayList<String> stringList = new ArrayList<>();
ArrayList<int> numberList = new ArrayList<>(); // ERROR: 类型实参不能为基元类型
```

### 1.2 添加元素

`.add()`方法接收一个参数时，按顺序向 ArrayList 的末尾添加元素。

```java
ArrayList<String> stringList = new ArrayList<>();

stringList.add("Hello");
stringList.add("World");

// `.toString()`方法可以将 ArrayList 打印为字符串
System.out.println(stringList.toString()); // [Hello, World]
```

此外，`.add()`方法还可以接收两个参数，将元素插入到指定位置。

```java
ArrayList<String> stringList = new ArrayList<>();

stringList.add("Hello");
stringList.add("World");
// 将 "Java" 字符串添加到第二位（即索引 1）
stringList.add(1, "Java");

System.out.println(stringList.toString()); // [Hello, Java, World]
```

### 1.3 访问元素

使用`.get()`方法访问指定位置的元素。

```java
System.out.println(stringList.get(0)); // Hello
System.out.println(stringList.get(1)); // Java
System.out.println(stringList.get(2)); // World
```

如果不知道元素的索引，可以使用`.indexOf()`方法来查找。

```java
System.out.println(stringList.toString()); // [Hello, Java, Collection]
System.out.println(stringList.indexOf("Java")); // 1
```

### 1.4 修改元素

使用`.set()`方法修改指定位置的元素，并返回被修改的元素。

```java
System.out.println(stringList.toString()); // [Hello, Java, World]

String setted = stringList.set(2, "Collection");
System.out.println(setted); // World

System.out.println(stringList.toString()); // [Hello, Java, Collection]
```

### 1.5 删除元素

使用`.remove()`方法删除指定位置的元素，并返回被删除的元素。

```java
System.out.println(stringList.toString()); // [Hello, Java, Collection]

String removed = stringList.remove(0);
System.out.println(removed); // Hello

System.out.println(stringList.toString()); // [Java, Collection]
```

## 2 ArrayList 源码解析

待填坑……

## 3 LinkedList 基本使用

LinkedList 基于链表实现，因此其增删改查和 ArrayList 略有不同。

在使用 LinkedList 之前，需要先导入：

```java
import java.util.LinkedList;
```

### 3.1 创建一个 LinkedList

LinkedList 的创建与 ArrayList 相同：

```java
LinkedList<E> list = new LinkedList<>();
```

### 3.2 添加元素

依然可以使用`.add()`方法向 LinkedList 末尾添加元素。

```java
LinkedList<String> stringList = new LinkedList<>();

stringList.add("Hello");
stringList.add("World");

System.out.println(stringList.toString()); // [Hello, World]
```

也依然可以向`.add()`方法传入两个参数，在指定位置添加元素。

```java
System.out.println(stringList.toString()); // [Hello, World]
stringList.add(1, "Java");
System.out.println(stringList.toString()); // [Hello, Java, World]
```

但是受益于链表的性质，还可以使用`.addFirst()`和`.addLast()`方法向 ArrayList 的头部和尾部添加元素。

```java
LinkedList<String> stringList = new LinkedList<>();

stringList.add("Java");
System.out.println(stringList.toString()); // [Java]

stringList.addFirst("Hello");
stringList.addLast("World");
System.out.println(stringList.toString()); // [Hello, Java, World]
```

### 3.3 访问元素

和 ArrayList 一样，通过`.get()`方法访问指定位置的元素，通过`.indexOf()`方法获取元素索引。

```java
System.out.println(stringList.toString()); // [Hello, Java, World]
System.out.println(stringList.indexOf("Java")); // 1
System.out.println(stringList.get(1)); // Java
```

受益于链表的性质，可以使用`.getFirst()`和`.getLast()`方法访问 LinkedList 的头部和尾部元素。

```java
System.out.println(stringList.toString()); // [Hello, Java, World]
System.out.println(stringList.getFirst()); // Hello
System.out.println(stringList.getLast()); // World
```

### 3.4 修改元素

和 ArrayList 一致，通过`.set()`方法修改指定位置的元素，并返回被替换的新元素。

```java
System.out.println(stringList.toString()); // [Hello, Java, World]

String setted = stringList.set(2, "Collection");
System.out.println(setted); // World

System.out.println(stringList.toString()); // [Hello, Java, Collection]
```

### 3.5 删除元素

和 ArrayList 一样，使用`.remove()`方法删除指定位置的元素，并返回删除的元素。

```java
System.out.println(stringList.toString()); // [Hello, Java, Collection]

String removed = stringList.remove(0);
System.out.println(removed); // Hello

System.out.println(stringList.toString()); // [Java, Collection]
```

受益于链表的性质，可以使用`.removeFirst()`和`.removeLast()`删除 LinkedList 的头部和尾部元素，并返回删除的元素。

```java
System.out.println(stringList.toString()); // [Hello, Java, Collection]

String first = stringList.removeFirst();
System.out.println(first); // Hello

String last = stringList.removeLast();
System.out.println(last); // Collection

System.out.println(stringList.toString()); // [Java]
```

## 4 LinkedList 源码解析

待填坑……