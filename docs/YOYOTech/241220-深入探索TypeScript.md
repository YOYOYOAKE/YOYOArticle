---
title: 深入探索TypeScript：不仅仅是JavaScript+Type
createTime: 2024/12/20 09:42:18
permalink: /article/9nbewde3/
tags:
  - JavaScript / TypeScript
---

> 在现代前端开发中，TypeScript已经成为了不可忽视的技术之一。作为JavaScript的超集，TypeScript不仅增强了类型系统，还提供了更好的开发工具支持。

> 不少开发者认为TypeScript只是为JavaScript加上类型系统。实际上，TypeScript在编译时类型检查、开发工具支持以及语言特性上拥有诸多优势。它通过静态类型检查、类型推导、接口和泛型等特性，帮助开发者在开发过程中减少错误、提高代码可读性，并更好地管理复杂的大型项目。

> 本文将介绍TypeScript中的类、接口、泛型和类型声明文件。

<!-- more -->

## 1 类

JavaScript在ES6中引入了类的概念，而TypeScript作为JavaScript的超集，同样支持这一特性。

### 1.1 TypeScript类

我们先简单设计一个类。

```typescript
class Person{
  name: string
  age: number

  constructor(name: string, age: number){
    this.name = name
    this.age = age
  }

  greet(){
    console.log(`你好，我叫${this.name}，今年${this.age}岁了`)
  }
}

const person1 = new Person('Ajohn', 18)
person1.greet() // 你好，我叫Ajohn，今年18岁了
```

在这个示例中，我们定义了一个名为 `Person` 的类，并使用 `constructor` 方法来初始化对象的属性。`greet` 方法是类的一个成员函数，可以通过类的实例来调用。

### 1.2 类的继承

与JavaScript类相同，TypeScript类也可以使用 `extends` 关键字来创建一个继承自另一个类的新类。

```typescript
class Student extends Person {
  sid: string

  constructor(name: string, age: number, sid: string){
    super(name, age)
    this.sid = sid
  }

  override greet(){
    console.log(`你好，我叫${this.name}，是个学生，今年${this.age}岁了`)
  }

  study(){
    console.log(`${this.name}正在学习中……`)
  }
}

const student1 = new Student('Ajohn', 18, '10086')
student1.greet() // 输出：你好，我叫Ajohn，是个学生，今年18岁了
student1.study() // 输出：Ajohn正在学习中……
```

在这个示例中，我们定义了一个继承自 `Person`、名为 `Student` 的类，并使用 `constructor` 方法来初始化对象的属性。而且为了贴合场景，我们还重写了父类的 `greet` 方法。

### 1.3 属性修饰符

与Java、C#等面向对象的语言不同，JavaScript不直接支持 `public` `private` `protected` `readonly` 属性修饰符。而在TypeScript中原生支持。

| 属性修饰符  |   含义   |        可见性        |
| :---------: | :------: | :------------------: |
|  `publid`   |  公开的  | 类内部、子类、类外部 |
| `protected` | 受保护的 |     类内部、子类     |
|  `private`  |  私有的  |        类内部        |
| `readonly`  |  只读的  |          -           |

回到我们的第一个示例。

```typescript
class Person{
  public name: string
  public age: number

  constructor(name: string, age: number){
    this.name = name
    this.age = age
  }

  public greet(){
    console.log(`你好，我叫${this.name}，今年${this.age}岁了`)
  }
}
```

### 1.4 TypeScript类中的简洁构造器语法

我们可以在构造器中直接声明和初始化类的成员变量。

```typescript
class Person{
  constructor(
    public name: string, 
    public age: number,
    private readonly id: string 
  ){}
}
```

### 1.5 TypeScript抽象类和抽象方法

抽象类无法被实例化，只能被继承。抽象类用于定义**类的结构和行为**。

抽象方法没有函数体，它被定义在抽象类中。**派生类必须实现其抽象类中的抽象方法**。

我们还是用一个经典实际问题来进一步解释抽象类。在物流中有各种各样的包裹，任何包裹都有其重量、尺寸、体积、运费等属性，但是不同类型的包裹有不同的运费计算方法，如标准快递和特快专递的运费计算方法肯定不同。

我们首先使用 `abstract` 关键字定义一个抽象类 `Package` ，它并不定义一个具体的类，而是规定其派生类的结构和行为。

```typescript
abstract class Package {
  constructor(
    public weight: number,
    public length: number,
    public width: number,
    public height: number,
  ){}

  // 抽象方法
  abstract getFreight(): number

  // 具体方法
  getVolume(): number {
    return this.length * this.width * this.height
  } 
}
```

我们在这个抽象类中定义了若干个公共成员变量，其中除了具体方法 `getVolume` 外，还有用 `abstract` 关键字定义的抽象方法 `getFreight`，它没有具体实现（也就是被花括号包裹的函数体）。

接下来我们实现一个标准快递的类 `StandardPackage`，它应该继承自抽象类 `Package`。我们假设标准快递的运费是按重量计算的。

```typescript
class StandardPackage extends Package {
  constructor(
    public weight: number,
    public length: number,
    public width: number,
    public height: number,
    public unitPrice: number,
  ){
    super(weight, length, width, height)
  }

  // 抽象方法在派生类中实现
  getFreight():number {
    return this.weight * this.unitPrice
  }
}
```

## 2 接口 Interface

接口为类、对象、函数等定义结构，确保代码一致性和类型安全。**接口中不能包含任何实现**。

定义接口的关键字为 `interface`。

### 2.1 定义类的结构

我们还是以第一个`Person`类的例子来示范接口的定义。

```typescript
interface PersonInterface {
  name: string,
  age: number,
  greet(): void
}
```

在这个接口中我们规定，所有使用这个接口的类必须包含`string`类型成员变量`name`、`number`类型成员变量`age`，以及一个不接收参数的、返回值为`void`的方法`greet()`。

一个类如果想使用这个接口，只需要用`implements`关键字。

```typescript
class Person implements PersonInterface {
  constructor(
    public name: string,
    public age: number
  ){}

  public greet(){
    console.log(`你好，我叫${this.name}，是个学生，今年${this.age}岁了`)
  }
}
```

与类的继承不同，一个类只能继承一个父类，而一个类可以实现自多个接口。

```typescript
class Cat implements PetInterface, CatchMouseInterface { ... }
```


### 2.2 定义对象结构

```typescript
interface UserInterface {
  name: string,
  gender: boolean,
  readonly id: string,
  age?: number,
  getInfo: () => void
}
```

在这个接口中，我们规定使用这个接口的对象必须拥有规定的上述属性。其中`readonly`关键字规定该属性为只读，而`?`说明这个属性是可选的，有或没有都可以。

声明一个使用该接口的对象也很简单，只需要像声明变量类型那样就可以了。

```typescript
const user: UserInterface = {
  name: 'Ajohn',
  gender: true,
  id: '10086',
  age: 18,
  getInfo(){
    console.log(`${this.name}，性别${this.gender ? '男' : '女'}，今年${this.age}岁`)
  }
}
```

### 2.3 定义函数结构

接口定义函数结构比较简单。

```typescript
interface AddInterface {
  (a: number, b: number): number
}

const add: AddInterface = (x, y) => x+y
```

### 2.4 接口的继承

接口可以使用 `extends` 关键字从一个已有接口中继承。

```typescript
interface PersonInterface {
  name: string,
  age: number
}

interface StudentInterface extends PersonInterface {
  sid: string
}
```

### 2.5 接口的合并

在TypeScript中，可以重复定义接口。重复定义的接口将合并二者的属性。

```typescript
interface PersonInterface {
  name: string,
  age: number,
  gender: string
}

interface PersonInterface {
  readonly id: string
}
```
将等效于

```typescript
interface PersonInterface{
  name: string,
  age: number,
  gender: string,
  readonly id: string
}
```

## 3 泛型

泛型允许我们再定义函数、接口或类时，使用**类型参数**来表示未被指定的类型。类型参数在具体使用时才被指定为具体的类型。泛型的加入能让同一段代码适用于多种类型，同时保持类型的安全性。

### 3.1 泛型函数

在开发中，我们通常会在控制台中打印出一段数据。

```typescript
const printData = (data):void => {
  console.log(data)
}

printData(someData)
```

在严格TypeScript模式下，这条语句是不被允许的，会报错“'data'具有隐式'any'类型”。因此我们需要明确指定参数 `data` 的类型。

但是假如我们并不能事先确定 `data` 的类型，或者 `data` 的类型不止一种，但是函数返回的类型又要和 `data` 保持一致，就需要用到泛型了。

```typescript
const printData = <T>(data: T): void => {
  console.log(data)
}
```

在这里我们将 `printData()` 修改为了泛型函数。其中的 `T` 就是上面提到的类型参数，它可以是任意大写字母。在加入泛型后，我们的需求即可得到实现。

```typescript
printData<number>(721) // 输出：721
printData<string>('Ajohn是最强的') // 输出："Ajohn是最强的"
```

泛型具有高度灵活性。一个泛型函数中可以有多个泛型。函数的返回值也支持泛型。

```typescript
const func = <T,U>(arg1: T, arg2: U): T | U => { ... }
```

### 3.2 泛型接口

```typescript
interface PersonInterface<T> {
  name: string,
  age: number,
  extraInfo: T
}

let person1: PersonInterface<string> {
  name: 'Ajohn',
  age: 18,
  extraInfo: '能文能武，长相十分英俊'
}

let person2: PersonInterface<number[]> {
  name: 'Ajohn',
  age: 18,
  extraInfo: [114514, 1919810]
}
```

### 3.3 泛型类

```typescript
class Person<T> {
  constructor(
    public name: string,
    public age: number,
    public extraInfo: T
  ){}

  greet(){
    console.log(`你好，我叫${this.name}，今年${this.age}岁了`)
  }
}
```

## 4 类型声明文件

类型声明文件以 `.d.ts` 为扩展名。

设想一个场景，我们在TypeScript项目 `demo.ts` 中引入一个JavaScript库 `demo.js`。

::: code-tabs

@tab demo.ts
```typescript
import { add, mul } from 'demo.js'

console.log(add(2,3))
console.log(mul(4,5))
```

@tab demo.js
```javascript
export const add = (x, y) => x + y
export const mul = (x, y) => x * y
```
:::



那么你的`ts`文件会在第一行引入时报错：“无法找到模块‘demo.js’的声明文件”和“‘demo.js’隐式具有"any"类型”。

这是因为我们引入的JavaScript库并没有类型定义。

对于一些我们自己写的一些小项目，我们大可以把JavaScript库移植到TypeScript中，但是对于大型项目或开源项目而言又不现实。于是我们有类型声明文件在外部声明其类型。

在 `demo.js` 的同级目录下，我们建立一个同名的 `.d.ts` 文件 `demo.d.ts`。

```typescript
declare const add = (x: number, y: number): number; 
declare const mul = (x: number, y: number): number; 

export { add, mul }
```

这样就可以解决上述问题。

