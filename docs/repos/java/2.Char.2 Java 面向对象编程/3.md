---
title: Part 3 继承
createTime: 2025/04/24 19:00:34
permalink: /java/oop/03/
---

## 1 `extends`关键字

在[封装](/java/oop/02/)一节中我们提到了**子类**的概念，并第一次出现了`extends`关键字。

### 1.1 基本的继承

**子类**使用`extends`关键字**父类**中**继承**，获得父类所有的成员变量和方法。

与此同时，子类还可以拥有自己的成员变量和成员方法。

```java
// Base.java
// 父类`Base`
public class Base {
    private int a;

    public Base(int a) {
        this.a = a;
    }

    public int getA() {
        return a;
    }

    public void setA(int a) {
        this.a = a;
    }
}
```

```java
// Upper.java
// 子类`Upper`
public class Upper extends Base {
    private int b;
    
    public void aSpecialMethod(){
        System.out.println("子类方法");
    }
    
    public Upper(int a, int b) {
        super(a);
        this.b = b;
    }

    public int getB() {
        return b;
    }

    public void setB(int b) {
        this.b = b;
    }
}
```

我们实例化`Upper`子类，访问其成员变量和方法：

```java
public class Main {
    public static void main(String[] args) {
        Upper upper = new Upper(1, 20);
        System.out.println(upper.getA()); // 1
        System.out.println(upper.getB()); // 20
        upper.aSpecialMethod(); // 子类方法
    }
}
```

### 1.2 继承的注意事项

父类可以拥有多个子类：

```java
public class Base {
    // ...
}

public class Upper extends Base {
    // ...
}

public class AnotherUpper extends Base {
    // ...
}
```

子类也可以拥有子类：

```java
public class Base {
    // ...
}

public class Upper extends Base {
    // ...
}

public class UpUpper extends Upper {
    // ...
}
```

但是子类只能继承一个父类：

```java
public class Base {
    // ...
}

public class AnotherBase {
    // ...
}

public class Upper extends Base, AnotherBase { // ERROR: 类不能扩展多个类
    // ...
}
```

### 1.3 不可继承的类

`final`关键字修饰的类不能被继承。

```java
public final class Base {
    // ...
}

public class Upper extends Base { // ERROR: 无法继承自 final 类 'Base'
    // ...
}
```

不过，类是`final`的，但其中的成员变量和方法并不是。我们依然可以通过 getter/setter 访问其成员变量和方法。

## 2 方法重写

子类可以重写继承的父类方法。重写的方法必须具有相同的方法名和参数，并使用`@Override`注解（可以不写，但最好还是写）。

```java
public class Base {
    public void aSpecialMethod(){
        System.out.println("父类方法");
    }
}
```

```java
public class Upper extends Base {
    @Override
    public void aSpecialMethod(){
        System.out.println("子类方法");
    }
}
```

分别实例化并调用`aSpecialMethod()`。

```java
public class Main {
    public static void main(String[] args) {
        Base base = new Base();
        Upper upper = new Upper();

        base.aSpecialMethod(); // 父类方法
        upper.aSpecialMethod(); // 子类方法
    }
}
```

还有一些细节：

- 只能重写从父类继承的方法。`privite`方法不会被继承，因此也不能被重写。
- `final` `static`方法无法重写。
- 重写的方法必须具有相同的参数列表和返回值。
- 重写的方法不能使用更严格的访问控制修饰符。
- 构造方法无法重写。
- 抽象方法必须被重写。

## 3 `super`关键字

在[基本的继承](#_1-1-基本的继承)第一次出现了`super`关键字，它与`this`相似，不过用来指代父类对象。

### 3.1 区分子类和父类

如果子类和父类具有相同命名的成员变量和成员方法，就需要使用`super`加以区分。

```java
public class Base {
    // ...
    protected int a;

    public Base(int a) {
        this.a = a;
    }
    // ...
}
```

```java
public class Upper extends Base {
    // ...
    private int a;

    public int getA() {
        return a;
    }

    public int getBaseA(){
        System.out.println("通过`super`关键字区分父类和子类变量");
        return super.a;
    }
    // ...
}
```

### 3.2 调用父类方法

```java
public class Base {
    // ...
    private int a;

    public int getA() {
        return a;
    }
    // ...
}
```

```java
public class Upper extends Base {
    // ...
    private int a;

    public int getBaseA() {
        System.out.println("通过`super`关键字访问父类方法");
        return super.getA();
    }
    // ...
}
```

### 3.3 调用父类的构造方法

子类在实例化的同时实例化父类。

```java
public class Upper extends Base {
    // ...
    public Upper(int a, int a2) {
        super(a);
        this.a = a2;
    }
    // ...
}
```