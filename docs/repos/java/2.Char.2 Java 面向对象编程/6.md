---
title: Part 6 内部类
createTime: 2025/04/24 19:15:52
permalink: /java/oop/06/
---
类也可以定义在另一个类的内部，或者一个方法的内部。这种类叫做内部类。

## 1 成员内部类

成员内部类是最常见的内部类，它被定义在另一个类中。内部类可以直接访问外部类的成员（包括`private`）。

```java
public class Outer {
    private String msg = "Hello, World!";
    
    public class Inner {
        public void display() {
            System.out.println(msg);
        }
    }
}
```

在使用内部类`Inner`之前，要先实例化外部类`Outer`。

```java
public class Main {
    public static void main(String[] args) {
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();
        inner.display(); // Hello, World!
    }
}
```

外部类无法直接访问到内部类的成员变量和方法。

想要访问内部类成员，需要先创建一个内部类的对象再访问。

```java
public class Outer {
    private String msg = "Hello, World!";

    public class Inner {
        public void display() {
            System.out.println(msg);
        }
    }
    
    public void getInnerDisplay() {
        Inner inner = new Inner();
        inner.display();
    }
}
```

而如果外部类方法是静态的话，还需要先实例化外部类。

```java
public class Outer {
    private String msg = "Hello, World!";

    public class Inner {
        public void display() {
            System.out.println(msg);
        }
    }

    public static void getInnerDisplay() {
        Outer outer = new Outer();
        Inner inner = outer.new Inner();
        inner.display();
    }
}
```

## 2 静态内部类

静态内部类用`static`修饰，不用将外部类实例化即可访问。

```java
public class Outer {
    public static class Inner {
        public void print() {
            System.out.println("来自静态内部类的消息");
        }
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Outer.Inner inner = new Outer.Inner();
        inner.print(); // 来自静态内部类的消息
    }
}
```

## 3 局部内部类

局部内部类定义在成员方法中，当成员方法执行完毕时被销毁。

局部内部类不允许使用`public`修饰。

```java
public class Outer {
    public void aMethod(){
        class Inner {
            public void display() {
                System.out.println("来自局部内部类的消息");
            }
        }
        Inner inner = new Inner();
        inner.display();
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Outer outer = new Outer();
        outer.aMethod(); // 来自局部内部类的消息
    }
}
```

## 4 匿名内部类

没有名字的内部类，通常用于接口或抽象类的快速实现，常见于事件监听或回调。

```java
public class Main {
    public static void main(String[] args) {
        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println("来自匿名内部类的消息");
            }
        };
    }
}
```


