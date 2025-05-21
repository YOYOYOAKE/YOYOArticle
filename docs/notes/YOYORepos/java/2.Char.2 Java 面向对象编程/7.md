---
title: Part 7 枚举类
createTime: 2025/04/25 19:23:41
permalink: /java/oop/07/
---

枚举类通常表示一组常量。

它提供了比传统`int`或`String`常量更安全、更有组织的方式，以避免传入非法值。

而且每个枚举值是唯一的，自动被添加`final`和`static`。

## 1 声明

使用`enum`关键字声明枚举类。

```java
public enum Status {
    SUCCESS, FAILURE, PENDING;
}
```

```java
public class Main {
    public static void main(String[] args) {
        Status s = Status.SUCCESS;
        System.out.println(s); // SUCCESS
    }
}
```

## 2 遍历

枚举表示的是一组常量的集合，那么就会有遍历枚举的需求。

```java
public class Main {
    public static void main(String[] args) {
        for (Status s : Status.values()) {
            System.out.println(s); // SUCCESS // FAILURE // PENDING
        }
    }
}
```

## 3 switch-case 语句

枚举可以用于 switch-case 语句：

```java
public class Main {
    public static void main(String[] args) {
        Status s = Status.SUCCESS;

        switch (s) {
            case SUCCESS:
                System.out.println("成功");
                break;
            case FAILURE:
                System.out.println("失败");
                break;
            case PENDING:
                System.out.println("待处理");
                break;
            default:
                System.out.println("未知错误");
        } // 成功
    }
}
```

## 4 带构造方法和成员变量的枚举

从这里我们可以看到枚举常量的本质。

```java
public enum Status {
    SUCCESS(200, "成功"),
    FAILURE(500, "失败"),
    PENDING(102, "待处理");

    private final int code;
    private final String message;

    Status(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
```

在`SUCCESS(200, "成功")`这里，实际上是调用构造函数并传入参数，创建了一个`Status`类型的对象`SUCCES`。

枚举类的构造函数是`private`的。因为枚举的实例是固定的，不能让外部随意创建，只能通过预定义的常量来构造，所以构造函数默认就是`private`，即使你不写。

编译器自动执行了如下操作：

```java
public static final Status SUCCESS = new Status(200, "成功");
```

它的意义在于，枚举常量不仅仅是一个简单的名称`SUCCESS`，它还可以将其他的信息存储在成员变量中。

```java
public class Main {
    public static void main(String[] args) {
        Status s = Status.SUCCESS;
        System.out.println(s); // SUCCESS
        System.out.println(s.getCode()); // 200
        System.out.println(s.getMessage()); // 成功
    }
} 
```