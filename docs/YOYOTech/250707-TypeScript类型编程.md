---
title: 深入探索 TypeScript：类型编程
createTime: 2025/07/07 08:50:58
permalink: /article/wm0esi3k/
---

> TypeScript 类型编程指的是使用泛型+条件类型+映射类型+递归类型等技术手段，**仅在类型层面完成复杂逻辑**。
>
> 也就是通常说的“类型体操”。

<!-- more -->

## 1 一个例子

我们要实现一个类型`MyPick<T,K>`，这个类型可以从对象类型`T`中挑选出一组类型`K`。

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

你可以这样使用：

```ts
type Person = {
  name: string;
  age: number;
  gender: string;
};

type Picked = MyPick<Person, 'name' | 'age'>;
```

于是得到类型`{ name: string; age: number; }`。

你可能有些云里雾里，这说的都是啥？

这就是 TypeScript 类型编程，旨在从类型级别完成代码级别的逻辑能力。

这个例子只是类型体操的入门级，更多进阶例子可能涉及：类型字符串处理（如反转字符串）、数组类型变换（如实现类型级的 Flatten、Zip）、类型级递归（如实现链式调用推导、Currying）。

## 2 TypeScript 类型语法

TypeScript 类型编程依靠一套独特的类型语法。

### 2.1 泛型 Generics

泛型是类型的**变量**。在定义函数或类型时，可以不指定具体类型，而是使用一个**类型参数**，等用的时候再传。

```ts
type Identity<T> = T

type A = Identity<string> // (type) A = string
type B = Identity<number[]> // (type) B = number[]
```

当然也可以使用多个类型参数。

```ts
type Pair<K, V> = {
  key: K,
  value: V
}

type MyPair = Pair<string, number> // (type) MyPair = { key: string; value: number; }
type AnotherPair = Pair<number, boolean> // (type) AnotherPair = { key: number; value: boolean; }
```

### 2.2 条件类型 Conditional Types

条件类型就像类型中的 if-else，根据类型是否满足条件来返回不同的类型。

其语法类似于三元表达式。

```ts
type IsString<T> = T extends string ? true : false

type A = IsString<'hello'> // (type) A = true 
type B = IsString<123> // (type) B = false
```

::: tip `extends` 关键字

`T extends U ? X : Y`中的`extends`即子类型判断。

例如：

```ts
type A = string extends string | number ? true : false // (type) A = true
type B = string | number extends string ? true : false // (type) B = false
```

`string`类型当然属于联合类型`string | number`的子类型，因此类型`A`为`true`。

而联合类型`string | number`明显不属于`string`类型的子类型，因此类型`B`为`false`。
:::

以及略微复杂的用法：

```ts
type A<T> = {
  value: T
}

type MagicType<T> = T extends string? A<T> : false

type MyType = MagicType<'hello'> // (type) MyType = { value: "hello" }
type AnotherType = MagicType<123> // (type) AnotherType = false
```

当条件类型的左边是一个联合类型时，TypeScript 会自动对联合类型中的每个成员进行判断，也被称为联合类型分发：

```ts
type ToArray<T> = T extends string | number ? T[] : never

type A = ToArray<1 | 'two' | false> // (type) A = 1[] | "two"[]
```

### 2.3 类型推断 Type Inference

在条件类型中，使用`infer`关键字提取一个类型的一部分，如函数参数、数组项等。

```ts
type ElementType<T> = T extends (infer U)[] ? U : never

type A = ElementType<number[]> // (type) A = number
type B = ElementType<string[]> // (type) B = string
```

类型`ElementType`的作用是：如果`T`是一个数组类型，比如`number[]` `string[]`，就提取出数组的元素类型，即`number` `string`。

而其中的核心部分`(infer U)[]`表示，如果`T`能匹配一个数组类型，那么就把数组中的元素类型推导为`U`。

又如：

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Fn = () => number
type A = ReturnType<Fn> // (type) A = number
```

类型`ReturnType`的作用是，如果`T`为一个函数类型，就提取出它的返回值类型作为`R`，否则返回`never`。

### 2.4 映射类型 Mapped Types

映射类型可以对类型的每一个属性进行处理，借助`keyof`和`in`关键字，我们可以遍历`T`的属性名。

这个类型`MyReadonly`可以把类型中的所有属性转换为只读。

```ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Person = { name: string; age: number };
type ReadonlyPerson = MyReadonly<Person>; 
// (type) ReadonlyPerson = { readonly name: string; readonly age: number; }
```

这里存在两个关键字`keyof`和`in`。

`keyof T`会提取类型`T`的所有键组成一个联合类型。对于本例，类型`keyof Person`的结果为联合类型`"name" | "age"`。

`in`关键字会遍历这个联合类型，结合`keyof Person`，等价于`K in "name" | "age"`。

以及索引访问类型`T[K]`可以访问类型中某个键的类型，对于本例，`T`为`Person`，`K`可以是`"name"`或`"age"`，因此`T[K]`等价于`Person["name"]`等价于`string`，或者`T[K]`等价于`Person["age"]`等价于`number`。

### 2.5 模板字符串类型 Template Literal Types

与 JavaScript 的模板字符串很像，但是基于类型层面。

```ts
type Greet<T extends string> = `Hello, ${T}!`

type A = Greet<'YOAKE'> // (type) A = "Hello, YOAKE!"
```

这里的`extends`充当了类型制约的作用，避免传入不属于`string`的类型。

结合`infer`还可以实现字符串提取：

```ts
type ExtractPrefix<T> = T extends `${infer P}_suffix` ? P : never

type A = ExtractPrefix<'hello_suffix'> // (type) A = "hello"
```