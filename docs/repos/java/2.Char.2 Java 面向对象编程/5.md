---
title: Part 5 抽象
createTime: 2025/04/24 19:01:26
permalink: /java/oop/05/
---

## 1 抽象类与抽象方法

### 1.1 抽象类

所有对象都是由类描述的，但并不是所有的类都是用来描述对象的。如果一个类的信息不足以描述对象，那么就称这个类为**抽象类**。

在 Java 中使用`abstract`关键字声明一个抽象类。抽象类通常用`Abstract`开头命名。

```java
public abstract class AbstractPrinter {
    public void print() {
        System.out.println("这是一台打印机");
    }
}
```

因为抽象类中的信息不足以描述一个具体的对象，因此抽象类无法被实例化。

```java
public class Main {
    public static void main(String[] args) {
        AbstractPrinter printer = new AbstractPrinter(); // ERROR: 'Printer' 为 abstract；无法实例化
    }
}
```

抽象类只能被继承后实例化。

```java
public class ColorPrinter extends AbstractPrinter {
    // ...
}
```

```java
public class Main {
    public static void main(String[] args) {
        Printer printer = new ColorPrinter();
        printer.print(); // 这是一台打印机
    }
}
```

### 1.2 抽象方法

如果你想设计这样一个类，该类包含一个特殊的成员方法，该方法在父类中没有具体实现，而由它的子类确定，那么你可以在父类用`abstract`来声明一个抽象方法。

抽象方法和普通方法相似，都有返回值类型、方法名、参数，不同的是抽象方法没有方法体。

我们把`Printer`中的`print()`方法改为抽象方法，并在子类`ColorPrinter`中实现。

```java
public abstract class AbstractPrinter {
    public abstract void print();
}
```

```java
public class ColorPrinter extends AbstractPrinter {
    @Override
    public void print() {
        System.out.println("这是一台彩色打印机");
    }
}
```

所有的抽象方法必须在子类中重写，除非子类也是抽象类。

```java
public class LegacyPrinter extends Printer { // ERROR: 类“LegacyPrinter”必须声明为抽象，或为实现“Printer”中的抽象方法“print()”
    // 不实现`print()`抽象方法
}
```

```java
public abstract class AbstractLegacyPrinter extends Printer {
    // 不实现`print()`抽象方法
}
```

抽象类中不一定包含抽象方法，但是有抽象方法的类必定是抽象类。

构造方法、静态方法不能声明为抽象方法。

## 2 接口

接口是一系列抽象方法的集合。一个类通过**实现**接口的方式，从而来**实现**接口的抽象方法。

类描述对象的属性和方法而接口则包含类要实现的方法。除非实现接口的类是抽象类，否则该类要定义接口中的所有方法。

### 2.1 接口的声明与实现

使用`interface`来声明一个接口，通常接口命名以`I`开头。

接口是天然抽象的，因此声明接口时不必使用`abstract`。

接口中的方法也都是抽象的，因此声明方法时也不需要`abstract`关键字。

接口中的方法都是公有的，因此`public`也可以缺省。并且不能使用其他的修饰符控制权限。

```java
public interface IPrinter {
    void print();
}
```

然后使用`implements`来把这个接口实现为一个类。同样地，除非你实现的是一个抽象类，否则必须重写接口中的所有方法。

```java
public class Printer implements IPrinter {
    @Override
    public void print(){
        System.out.println("这是一台打印机");
    };
}
```

### 2.2 接口的继承

一个类能继承另一个类，一个接口也能继承另一个接口。同样使用`extends`关键字。

继承的接口拥有被继承的接口的所有抽象方法。

```java
public interface IColorPrinter extends IPrinter {
    void ColorfulPrint();
}
```

```java
public class ColorPrinter implements IColorPrinter {
    // 重写接口`IPrinter`的方法
    @Override
    public void print() {
        System.out.println("这是一台打印机");
    }

    // 重写接口`IColorPrinter`的方法
    @Override
    public void ColorfulPrint() {
        System.out.println("这还是一台彩色打印机");
    }
}
```

与类不同，一个接口可以继承多个接口，继承的接口拥有所有被继承的接口的所有抽象方法。

```java
public interface IBase {
    void baseMethod();
}
```

```java
public interface IAnotherBase {
    void anotherBaseMethod();
}
```

```java
public interface IUpper extends IBase, IAnotherBase {
    void upperMethod();
}
```

```java
public class Upper implements IUpper{
    @Override
    public void baseMethod() {
        // ...
    }

    @Override
    public void anotherBaseMethod() {
        // ...
    }

    @Override
    public void upperMethod() {
        // ...
    }
}
```

### 2.3 在接口中声明变量

只能声明常量字段，这些字段隐式地为`public static final`，并且必须初始化。

```java
interface Base {
    int number = 666;
}
```

## 3 抽象类与接口的区别

- 抽象类可以包含抽象方法，也可以包含具体方法。接口只能包含抽象方法，除非是默认方法或者静态方法。
- 抽象类可以有成员变量，但接口只能声明`public static final`的变量。
- 抽象类有构造方法，而接口无构造方法。
- 抽象类只能单继承，而接口可以多继承。

抽象类更适合用来描述具有共同属性或行为的类的共性，并提供部分实现。

接口更适合用于定义类应该具备的行为，但不关心具体如何实现，尤其适合解决多继承问题。