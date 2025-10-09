---
title: Part 1 类与对象
createTime: 2025/04/24 18:59:04
permalink: /java/oop/01/
---

## 1 什么是类和对象

### 1.1 一些例子

我们可以用对象描述任何物体：一棵树、一个人、一只猫。一切皆对象，这也是 Java 的设计思想。

事物是无尽的，但是我们可以将它们按照特征归类。我和你都可被归类为人，而人、猫、狗都可被归类为动物；柳树和杨树都是树，它们又可以和花花草草归类为植物；最后，植物和动物都可被归类为生物。

所以类描述对象的共性。具体一点，类描述对象的属性和行为。

何为属性？我今年 22 岁，我的宠物狗的名字叫饺子，饺子的体重是二十斤，这都是事物的属性。

何为行为？我饿了要吃饭，每天要下楼遛狗，遛完狗之后狗要喝水，这是事物的行为。

### 1.2 声明一个类

假设我们找到了一类事物（暂且称为感兴趣之物，thing of interest）的共性，即**类**，就需要先使用`class`关键字**声明**它。

在 Java 中，我们使用大驼峰命名法为类命名。

```java
class ThingOfInterest {
    // 描述事物共有属性的代码
    // 描述事物共有行为的代码
}
```

### 1.3 实例化一个类

好的，现在我们已经找到了一个合适的、能描述我们的感兴趣之物的共有属性和方法的类`ThingOfInterest`。现在我们使用这个类去描述一个实际的感兴趣之物，即**对象**。

在需要使用这个对象的地方，使用`new`关键字去**实现**感兴趣之物的类，或者说，把这个类**实例化**。

```java
ThingOfInterest something = new ThingOfInterest();
```

这样我们就得到了一个感兴趣之物，或者说，感兴趣之物的类的**实例**。

当然，你也可以多声明几个。

```java
ThingOfInterest secondSomething = new ThingOfInterest();
ThingOfInterest thirdSomething = new ThingOfInterest();
```

就像地球上有八十亿人口，但是只有一种人类（生物学意义）。

## 2 成员变量

前面提到类描述一类事物的属性和行为。在 Java 中，我们将属性称为**成员变量**，行为称为**成员方法**。

成员变量也是变量，声明方式和[数据类型](/java/basic/01/)中提到的相似。不过，成员变量声明在类中，且无需初始化。

### 2.1 普通的成员变量

比如我们是一位图书管理员，需要使用`Book`类来描述书的属性。每本书都有书名、作者、出版年份等信息。

```java
class Book {
    String name;
    String author;
    int publishYear;
}
```

然后把它实例化成一本《三体》：

```java
Book threebody = new Book();
threebody.name = "三体";
threebody.author = "刘慈欣";
threebody.publishYear = 2006;
```

使用`new`关键字得到《三体》对象，然后使用`.`来访问对象的成员变量（属性）。

### 2.2 常量

上面说的成员变量都是可变的变量（~~似乎说了句废话~~）。但有些情况下，我们不希望它们被改变，例如一些数学常数。

使用`final`关键字声明常量。在 Java 中，常量使用大写字母命名。

```java
class Constant {
    final double PI = 3.14159;
    final double E = 2.71828;
}
```

实例化这个常数类并尝试改变其中的值：

```java
Constant cons = new Constant();
cons.PI = 4; // ERROR: 无法将值赋给 final 变量 'PI'
```

## 3 成员方法

成员方法就是其他语言中的函数，需要返回值、方法名、形参和方法体。

### 3.1 成员方法的声明和调用

例如我需要描述我的宠物狗饺子，那我就需要声明一个狗的类`Dog`，然后从中实例化出饺子。

当然，成员方法也可以传参。

```java
class Dog{
    String name;
    void bark(){
        System.out.println("汪汪汪");
    }
    void eat(String food){
        System.out.println("今天饺子吃了" + food);
    }
}
```

```java
Dog jiaozi = new Dog();
jiaozi.name = "饺子";
jiaozi.bark(); // 汪汪汪
jiaozi.eat("狗粮"); // 今天饺子吃了狗粮
```

### 3.2 带可变参数的成员方法

声明成员方法时需要随之确定参数的个数。但是有些情况下我们并不确定会有多少个参数传入，这时候就要使用可变参数。

可变参数允许方法使用任意多个、类型相同的值作为参数。当使用可变参数时，实际上是创建了一个数组，该数组的大小就是可变参数的个数，然后将参数放入数组当中，再将数组传递给被调用的方法。

可变参数只是在数据类型后添加了`...`，例如要传入整型的可变参数，只需要`int... args`。

例如我们模拟一个比较复古的打印机，它只能一个字一个字打印：

```java
class Printer {
    void print(char... chars){
        for (char c : chars)
            System.out.print(c);
    }
}
```

```java
Printer printer = new Printer();
char[] content = new char[]{'一', '段', '意', '义', '不', '明', '的', '文', '字'};
printer.print(content); // 一段意义不明的文字
```

需要注意的是，可变参数必须放置在参数列表的最后，否则就会报错。

```java
class Printer {
    void print(String source, char... chars) {
        System.out.println("来自" + source + "的文字");
        for (char c : chars)
            System.out.print(c);
    }
}

// 错误示范
class Printer {
    void print(char... chars, String source) { // ERROR: Vararg 形参必须为列表中的最后一个形参
        System.out.println("来自" + source + "的文字");
        for (char c : chars)
            System.out.print(c);
    }
}
```

## 4 构造方法

上边我们在创建《三体》对象时是这样做的：

```java
Book threebody = new Book();
threebody.name = "三体";
threebody.author = "刘慈欣";
threebody.publishYear = 2006;
```

倘若一个对象有二十个参数，逐个赋值也太麻烦了。因此有了构造方法，可以快速实例化一个我们想要的对象。

构造方法无返回值（连`void`也没有）、与类名同名、接收参数随意。

按照有无参数，分为无参构造和有参构造。

我们依然是以`Book`类为例。

### 4.1 无参构造

无参构造也称为默认构造。如果类中没有写构造方法的话，编译器会默认生成一个无参构造。

```java
class Book {
    String name;
    String author;
    int publishYear;

    public Book() {}
}
```

无参构造方法实例化出的对象的成员变量均为默认值：

```java
Book threebody = new Book();
System.out.println(threebody.name); // null
System.out.println(threebody.author); // null
System.out.println(threebody.publishYear); // 0
```

### 4.2 有参构造

有参构造需要你自己来写。有参构造接收几个参数，并按照你喜欢的方式处理这些参数。

一般有参构造用来为成员变量赋值。当然，它本质是个方法，你可以在方法体内部随意编程，例如设立验证条件、预处理参数等等。

```java
class Book {
    String name;
    String author;
    int publishYear;

    public Book(String name, String author, int publishYear) {
        this.name = name;
        this.author = author;
        this.publishYear = publishYear;
    }
}
```

因为有参构造需要参数，所以要在实例化时满足要求。

```java
Book threebody = new Book("三体", "刘慈欣", 2006);
System.out.println(threebody.name); // 三体
System.out.println(threebody.author); // 刘慈欣
System.out.println(threebody.publishYear); // 2006
```

## 5 `static`关键字

`static`关键字比较特殊，被它修饰的变量和方法称为**静态变量**和**静态方法**。

静态变量和静态方法不需要实例化类也能访问。[Java Arrays 工具类](/java/basic/04/#_4-java-arrays-工具类)中的方法就属于此类。

### 5.1 静态变量

例如我们上边提到的数学常数类：

```java
class Constant {
    final double PI = 3.14159;
    final double E = 2.71828;
}
```

我们当然不希望每次使用这些常数的时候都要实例化一次，那样对大脑和内存都不友好。使用静态变量就可以解决这个问题：

```java
class Constant {
    final static double PI = 3.14159;
    final static double E = 2.71828;
}
```

```java
System.out.println(Constant.PI); // 3.14159
System.out.println(Constant.E); // 2.71828
```

### 5.2 静态方法

例如将上边的`Printer`类中的`print`方法改为静态方法：

```java
class Printer {
    static void print(char... chars) {
        for (char c : chars)
            System.out.print(c);
    }
}
```

```java
char[] content = new char[]{'一', '段', '意', '义', '不', '明', '的', '文', '字'};
Printer.print(content); // 一段意义不明的文字
```

## 6 `this`关键字

在[有参构造](#_4-2-有参构造)中出现了一个关键字`this`。`this`关键字作用非常大。简单来说，它代指的是这个对象本身。

为了说明`this`的用法，我们从零设计一个数组类。

我们期望这个类有如下功能：

- 接收一个整型数组，并在构造完成后将这个数组打印为字符串，一并打印其对象地址
- 能实现按元素处理（如数组`[1, 2, 3]`在经过某种处理后变为`[10, 20, 30]`）
- 实现方法的链式调用

### 6.1 区分形参与实参

在构造方法中，我们需要将参数赋值给当前对象的属性，此时就用到了`this`来区分成员变量与形参。

```java
class MyArray {
    int[] data;

    MyArray(int[] data) {
        this.data = data; // `this.data`表示成员变量，`data`表示构造参数
    }
}
```

### 6.2 调用类中的其他方法

我们先实现能将数组打印为字符串的方法：

```java
void print() {
    System.out.print("[");
    for (int i = 0; i < data.length; i++) {
        System.out.print(data[i]);
        if (i != data.length - 1) {
            System.out.print(", ");
        }
    }
    System.out.println("]");
}
```

然后我们使用构造方法创建对象后，就把这个数组打印出来：

```java
MyArray(int[] data) {
    this.data = data;
    this.print();
}
```

### 6.3 作为参数在方法中传递

接下来我们实现打印对象地址的方法。由于数组是引用数据类型，那么我们直接打印这个数组。

```java
void getRamAddress(MyArray a) {
    System.out.println(a);
}
```

并在构造函数中调用：

```java
MyArray(int[] data) {
    this.data = data;
    this.print();
    this.getRamAddress(this);
}
```

### 6.4 作为方法的返回值

然后实现按元素处理和链式调用。

```java
MyArray multiply(int factor) {
    for (int i = 0; i < data.length; i++) {
        data[i] *= factor;
    }
    return this; // 这里将对象自身返回出去，以实现链式调用
}
```

### 6.5 整体设计

接下来看看整体代码：

```java
class MyArray {
    int[] data;

    MyArray(int[] data) {
        this.data = data;
        this.print();
        this.getRamAddress(this);
    }

    void print() {
        System.out.print("[");
        for (int i = 0; i < data.length; i++) {
            System.out.print(data[i]);
            if (i != data.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]");
    }

    void getRamAddress(MyArray a) {
        System.out.println(a);
    }

    MyArray multiply(int factor) {
        for (int i = 0; i < data.length; i++) {
            data[i] *= factor;
        }
        return this;
    }
}
```

我们初始化一个数组，并把它用`MyArray`封装，然后将它按元素乘 10 后再乘 5，再将最后的数组打印出来：

```java
MyArray myArray = new MyArray(new int[]{1, 2, 3, 4, 5}); // [1, 2, 3, 4, 5] // MyArray@1b6d3586
myArray.multiply(10).multiply(5).print(); // [50, 100, 150, 200, 250]
```

这样我们就以一个简单的例子说明了`this`的作用。

值得一提的是，`this`还可以调用类的构造方法，也可以在构造方法中作为参数传递。

实际项目中，我们也可以把`this`传给其他类或外部函数，用于处理当前对象。例如，传给日志模块、回调函数、数据库写入方法等。