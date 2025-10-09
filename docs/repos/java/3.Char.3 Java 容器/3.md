---
title: Part 3 集合 Set
createTime: 2025/05/12 14:33:23
permalink: /java/container/03/
---

与列表相同，集合 Set 也保存一组相同数据类型的对象。不同之处在于，列表中的元素是可重复、有序的，而集合中的元素是不可重复、无序的。

常用的集合有 HashSet 和 TreeSet，分别基于哈希表和红黑树实现。HashSet 中的元素无序，而 TreeSet 内部是有序的。

## 1 HashSet

HashSet 基于 HashMap 实现，因此要求 HashSet 中的元素实现`hashCode()`和`equals()`方法。

在使用 HashSet 之前，需要先导入：

```java
import java.util.HashSet;
```

### 1.1 创建一个 HashSet

依然是相似的创建方式。

```java
HashSet<E> set = new HashSet<>();
```

与 ArrayList 和 LinkedList 相同的是，HashSet 也只能存储引用数据类型的元素。

### 1.2 添加元素

使用`.add()`方法向 HashSet 中添加元素。

```java
HashSet<String> set = new HashSet<>();

set.add("Java");
set.add("Python");
set.add("C++");

System.out.println(set.toString()); // [Java, C++, Python]
```

你可能已经注意到了集合实际打印出来的顺序和字母顺序、插入先后等都无关，这是因为在 HashSet 内部是按照哈希值排序的。

### 1.3 删除元素

使用`.remove()`方法从 HashSet 中删除元素。

```java
System.out.println(set.toString()); // [Java, C++, Python]

set.remove("Python");

System.out.println(set.toString()); // [Java, C++]
```

### 1.4 并集

使用`.addAll()`方法将另一个集合中的元素添加进集合。

```java
System.out.println(setA.toString()); // [Java, C++, Python]
System.out.println(setB.toString()); // [TypeScript, Python]

setA.addAll(setB);
System.out.println(setA.toString()); // [TypeScript, Java, C++, Python]
```

### 1.5 交集

使用`.retainAll()`方法保留与指定集合共有的元素。

```java
System.out.println(setA.toString()); // [Java, C++, Python]
System.out.println(setB.toString()); // [TypeScript, Python]

setA.retainAll(setB);
System.out.println(setA.toString()); // [Python]
```

### 1.6 差集

使用`.removeAll()`方法删除与指定集合共有的元素。

```java
System.out.println(setA.toString()); // [Java, C++, Python]
System.out.println(setB.toString()); // [TypeScript, Python]

setA.removeAll(setB);
System.out.println(setA.toString()); // [Java, C++]
```

## 2 TreeSet

TreeSet 和 HashSet 最大的不同是，TreeSet 内部的元素是有序的。因此 TreeSet 中的元素需要实现`Comparable`接口或提供`Comparator`比较器。

这就使得 TreeSet 中的元素是有序的。

```java
TreeSet<String> set = new TreeSet<>();

set.add("Java");
set.add("Python");
set.add("C++");
set.add("TypeScript");

System.out.println(set.toString()); // [C++, Java, Python, TypeScript]
```

除了在 HashSet 中提及的`.add()` `.remove()` `.addAll()` `.retainAll()` `.removeAll()`方法之外，TreeSet 还有自己特有的方法。

### 2.1 查找最大/最小元素

使用`.first()`和`.last()`查找 TreeSet 中的最大和最小元素。

```java
System.out.println(set.toString());

System.out.println(set.first()); // C++
System.out.println(set.last()); // TypeScript
```

### 2.2 在范围查找最大/最小元素

使用`.ceiling()`查找大于等于（>=）指定元素的最小元素。

使用`.floor()`查找小于等于（<=）指定元素的最大元素。

使用`.higher()`查找大于（>）指定元素的最小元素。

使用`.lower()`查找小于（<）指定元素的最大元素。

```java
System.out.println(set.toString()); // [C++, Java, Python, TypeScript]

System.out.println(set.ceiling("Python")); // Python
System.out.println(set.floor("Java")); // Java
System.out.println(set.higher("Python")); // TypeScript
System.out.println(set.lower("Java")); // C++
```