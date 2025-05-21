---
title: Part 2 封装
createTime: 2025/04/24 19:00:08
permalink: /java/oop/02/
---

在面向对象编程中，封装是一种将属性和方法（成员变量和成员方法）打包在一起的机制。

既然已经打包好了，我们肯定不希望属性和方法还是像散装的那样，可以被随意访问和修改。

封装的核心思想是“隐藏实现细节，暴露必要接口”。通过将成员变量设置为私有，并通过公共的 getter/setter 方法来访问和修改，可以防止外部代码直接操作对象的内部状态，从而更好地控制数据合法性。

## 1 访问控制修饰符

Java 提供了访问控制符来帮助我们控制类的成员对外暴露的程度，以增强代码的安全性和可维护性。

|  访问修饰符  | 当前类 | 同包类 | 子类（不同包） | 其他类 |
| :----------: | :----: | :----: | :------------: | :----: |
|  `private`   |   ✅   |   ❌   |       ❌       |   ❌   |
| 默认（不写） |   ✅   |   ✅   |       ❌       |   ❌   |
| `protected`  |   ✅   |   ✅   |       ✅       |   ❌   |
|   `public`   |   ✅   |   ✅   |       ✅       |   ✅   |

例如我们有一个`Demo`类，其中分别有四个被不同的访问控制修饰符修饰的变量`a` `b` `c` `d`。为了方便引用，这里将其设为`static`。

```java
public class Demo {
    static private int a;
    static int b;
    static protected int c;
    static public int d;
}
```

### 1.1 `private`

被`private`修饰的变量和方法称之为**私有**。

私有变量和方法只能在当前类中访问，子类也不能访问私有变量（即使处在同一个包中）。

```java
public class Demo {
    // ...
    void p(){
        System.out.println(a); // 编译通过
    }
}

public class UpperDemo extends Demo {
    void q(){
        System.out.println(a); // ERROR: 'a' 在 'Demo' 中具有 private 访问权限
    }
}
```

### 1.2 默认（不写）

默认访问权限的变量和方法可以在当前类、同一个包的子类、同一个包的其他类中访问，即包内访问，而其他包中不能访问。

```java
package cc.yoake.demo;

// 子类
class UpperDemo extends Demo {
    void q() {
        System.out.println(b); // 编译通过
    }
}

// 同一包的其他类
class Demo2 {
    void q() {
        System.out.println(Demo.b); // 编译通过
    }
}
```

```java
package cc.yoake.demo2;
import cc.yoake.demo.Demo;

// 另一个软件包中的子类
class UpperDemo2 extends Demo {
    void r() {
        System.out.println(Demo.b); // ERROR: 'b' 在 'cc.yoake.demo.Demo' 中不为 public。无法从外部软件包访问
    }
}

// 另一个软件包中的其他类
class Demo2 {
    void r(){
        System.out.println(Demo.b); // ERROR: 'b' 在 'cc.yoake.demo.Demo' 中不为 public。无法从外部软件包访问
    }
}
```

### 1.3 `protected`

被`protected`修饰的变量和方法称为**受保护的**。

受保护的变量和方法可以被同一包中的类与其他包的子类访问，而其他包的其他类不能访问。

```java
package cc.yoake.demo2;
import cc.yoake.demo.Demo;

class UpperDemo2 extends Demo {
    void r() {
        System.out.println(Demo.c); // 编译通过
    }
}

class Demo2 {
    void r() {
        System.out.println(Demo.c); // ERROR: 'c' 在 'cc.yoake.demo.Demo' 中具有 protected 访问权限
    }
}
```

### 1.4 `public`

被`public`修饰的变量和方法被称为**公有**。

公有变量和方法可以在任何地方被访问。

```java
package cc.yoake.demo2;
import cc.yoake.demo.Demo;

class Demo2 {
    void s() {
        System.out.println(Demo.d); // 编译通过
    }
}
```

## 2 getter/setter

在实际开发中，我们为了成员变量不被外部随意修改，通常会将其设为`private`。这样一来外部就无法访问内部成员变量。

但实际上我们依然需要能够有一种方式访问到成员变量，所以就有了 getter/setter。

getter/setter 本质上是一个成员方法，只不过它是公有的。

以`Book`类为例：

```java
class Book {
    private String name;
    private String author;
    private int publishYear;

    public Book(String name, String author, int publishYear) {
        this.name = name;
        this.author = author;
        this.publishYear = publishYear;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getPublishYear() {
        return publishYear;
    }

    public void setPublishYear(int publishYear) {
        this.publishYear = publishYear;
    }
}
```

这里我们将成员变量`name` `author` `publishYear`全都设为了私有，也就意味着无法直接从外部访问。

```java
System.out.println(threebody.name); // 'name' 在 'Book' 中具有 private 访问权限
System.out.println(threebody.author); // 'author 在 'Book' 中具有 private 访问权限
System.out.println(threebody.publishYear); // 'publishYear' 在 'Book' 中具有 private 访问权限
```

此时就需要用到 getter/setter。getter 以“get”开头，setter 以“set”开头，并且都为公有。

使用 getter 访问成员变量：

```java
System.out.println(threebody.getAuthor()); // 三体
System.out.println(threebody.getName()); // 刘慈欣
System.out.println(threebody.getPublishYear()); // 2006
```

使用 setter 为成员变量赋值：

```java
threebody.setName("三个身体");
threebody.setAuthor("刘电工");
threebody.setPublishYear(2403);

System.out.println(threebody.getAuthor()); // 三个身体
System.out.println(threebody.getName()); // 刘电工
System.out.println(threebody.getPublishYear()); // 2403
```

在 getter 中也可以添加校验条件，只允许符合条件的数据通过：

```java
class Book {
    // ...
    public void setPublishYear(int publishYear) {
        if (publishYear >= 2403) {
            System.out.println("太阳系都被二维化了你糊弄鬼呢");
        } else {
            this.publishYear = publishYear;
        }
    }
    // ...
}
```

```java
threebody.setPublishYear(2403); // 太阳系都被二维化了你糊弄鬼呢
```

## 3 类的访问控制修饰符

类的访问控制修饰符只有两种：默认（不写）和`publish`。

默认（不写）表示该类只对同一个包中的类可见。

`public`修饰的类表示该类对所有类都可见。

需要注意的是，`public`类要声明在单独的同名`.java`文件中。

```java
// Demo.java
public class Base { // ERROR: 类 'Base' 为 public，应在文件 'Base.java' 中声明
    private int a;
}
```