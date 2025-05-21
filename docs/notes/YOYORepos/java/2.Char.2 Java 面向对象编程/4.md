---
title: Part 4 多态
createTime: 2025/04/24 19:00:59
permalink: /java/oop/04/
---

多态是指在面向对象编程中，同一个类的对象在不同情况下表现出来的不同行为和状态。

例如，黑白打印机和彩色打印机都属于打印机`Printer`类，但是它们打印效果是不同的。

## 1 多态的实现

要实现多态，需要三个必要条件：

- 子类继承父类；
- 子类重写父类方法；
- 父类引用指向子类对象。

我们先设计一个`Printer`类，这个类定义了所有打印机对象的共同行为接口：都可以“打印”。：

```java
public class Printer {
    public void print() {
        System.out.println("Printer");
    }
}
```

接着为其继承出两个子类，黑白打印机`LegacyPrinter`和彩色打印机`ColorPrinter`：

```java
public class LegacyPrinter extends Printer {
    @Override
    public void print() {
        System.out.println("这是一台黑白打印机");
    }
}
```

```java
public class ColorPrinter extends Printer {
    @Override
    public void print() {
        System.out.println("这是一台彩色打印机");
    }
}
```

接下来我们想，黑白打印机和彩色打印机都属于`Printer`类，那么能否使用`Printer`来声明呢？

是可以的。

```java
public class Main {
    public static void main(String[] args) {
        Printer legacyPrinter = new LegacyPrinter();
        Printer colorPrinter = new ColorPrinter();

        legacyPrinter.print(); // 这是一台黑白打印机
        colorPrinter.print(); // 这是一台彩色打印机
    }
}
```

尽管`legacyPrinter`和`colorPrinter`的静态类型是`Printer`，但它们实际引用的对象是`LegacyPrinter`和`ColorPrinter`。当我们调用`print()`方法时，Java 会在运行时动态决定调用哪个子类的方法，这就叫做运行时多态。

## 2 转型和`instanceof`关键字

在`Printer legacyPrinter = new LegacyPrinter();`中，实际上涉及到了类型转换。按照转换方向的不同，可以分为向上转型和向下转型。

### 2.1 向上转型

我们刚才做的就属于向上转型。在`Printer legacyPrinter = new LegacyPrinter();`中，我们把`LegacyPrinter`类型的对象转换为了`Printer`类型的对象。

需要强调的是，尽管`legacyPrinter`是`Printer`类型，但在运行时调用的仍然是`LegacyPrinter`的方法，这就是多态。

向上转型便于使用统一的结构（父类）来操作不同的子类，简化代码。

而且得益于同一个静态类型，我们可以把不同的打印机放进同一个`Printer[]`数组中统一处理。

```java
public class Main {
    public static void main(String[] args) {
        Printer legacyPrinter = new LegacyPrinter();
        Printer colorPrinter = new ColorPrinter();
        
        Printer[] printers = {legacyPrinter, colorPrinter}; // 编译通过
    }
}
```

### 2.2 向下转型

向下转型刚好相反，是将父类类型转换为子类类型。

向下转型时需要使用强制类型转换。

```java
public class Main {
    public static void main(String[] args) {
        Printer printer = new ColorPrinter();
        ColorPrinter cp = (ColorPrinter) printer;
        cp.print(); // 这是一台彩色打印机
    }
}
```

向下转型的对象一定要符合子类的类型。如果我们把一个实际为`LegacyPrinter`类型、声明为`Printer`类型的对象，强制转型为`ColorPrinter`类型，则会报错：

```java
public class Main {
    public static void main(String[] args) {
        Printer printer = new LegacyPrinter();
        ColorPrinter lp = (ColorPrinter) printer; // Runtime ERROR: LegacyPrinter cannot be cast to ColorPrinter
        lp.print();
    }
} 
```

### 2.3 `instanceof`关键字

在进行向下转型前，为了避免类型不一致的问题，推荐使用`instanceof`关键字做判断：

```java
Printer printer = new LegacyPrinter();

if (printer instanceof LegacyPrinter) {
    LegacyPrinter lp = (LegacyPrinter) printer;
    lp.print(); // 编译通过，运行时安全调用
}
```