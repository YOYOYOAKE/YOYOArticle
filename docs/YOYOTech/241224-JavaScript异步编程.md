---
title: 从Promise到Async/Await：解析JavaScript异步编程 
createTime: 2024/12/24 14:01:11
permalink: /article/b75jy61l/
tags:
  - JavaScript / TypeScript
---
> 异步（Asynchronous, Async）和同步（Synchronous, Sync）是相对的概念。在传统的单线程编程中，编写的代码按照顺序被执行并返回数据。这种模式称为“同步”编程。同步编程符合人类认知、容易理解，但是在如网络数据请求、大文件I/O操作等要消耗大量时间，从而**阻塞**后面任务的执行。

> 异步编程应运而生。

<!-- more -->

## 1 异步编程

### 1.1 模拟一个异步编程

正如在前言中所说，同步编程会等到上一个任务执行完成后才会执行下一个任务。异步编程与其不同的是，异步任务会在开始后直接执行下一个任务，并不会等到执行完成。

我们先使用 `setTimeout()`方法模拟一个最简单的异步编程。

```javascript
setTimeout(() => {
  console.log('3000')
}, 3000)
setTimeout(() => {
  console.log('2000')
}, 2000)
setTimeout(() => {
  console.log('1000')
}, 1000)
console.log('开始加速咯！')

/** Console Output
  '开始加速咯！'
  '1000'
  '2000'
  '3000'
*/
```

运行这段代码，控制台输出的顺序不同于代码的顺序，因为 `setTimeout()`方法是异步的。

也就是说，`setTimeout()`方法开始执行后，并没有等待一定的时间才执行下一个任务，而是立刻返回并执行下一个任务，直到时间结束才打印控制台。

### 1.2 回调地狱 Callback Hell

通常在异步任务执行完成后，我们通常给它传入一个回调函数告诉它在执行完成后应该做些什么。这样一来，我们就不用关注异步的状态了，它会自己照顾好自己。

就像上面这个简单的例子一样，我们传入一个回调函数，告诉这些任务在时间结束后打印控制台。

但是如果我们想多次调用异步函数呢？或者说，我想先等待一秒，在控制台中打印一段文字，然后再等待两秒，再在控制台中打印第二段文字，然后再等待三秒，然后再打印第三段文字呢？

下面这段代码应该符合我们的要求。

```javascript
setTimeout(() => {
    console.log('1000')
  setTimeout(() => {
      console.log('2000')
    setTimeout(() => {
        console.log('3000')
    }, 3000)
  }, 2000)
}, 1000)
```

但是这段代码是在回调函数中再次使用了回调。可想而知，在大型项目中，这样的代码无论是维护还是处理异常都是一件掉san的事情。这种情况就是经常说的**回调地狱（Callback Hell）**。

那么，有没有更优雅的方式呢？

## 2 Promise

为了解决回调地狱的问题，CommonJS社区首先提出了Promise方案，并在ES6（ES2015）中被标准化，成为了JavaScript的新特性之一。

Promise的释义为“承诺”，即承诺在执行结束后会做出特定的动作。Promise有三种状态，分别是Pending、 Fulfilled、Rejected，分别代表进行中、成功完成、执行失败。

例如老板画的年底给你涨100%工资的大饼，就是一个Promise。在年底之前，这个Promise是Pending状态，因为你仍在等待大饼的实现。如果年底老板兑现承诺给你涨了工资，那么这个Promise就是Fulfilled状态；但如果不管是什么原因，最后老板没给你涨工资，就是Rejected状态。

### 2.1 Promise基本用法

Promise是一个ES6提供的对象，我们可以使用 `new`关键字创建一个 `Promise`实例。

我们先以一个简单的例子说明 `Promise`的实例化。

```javascript
const promise = new Promise((resolve, reject) => {
  if (Math.random() < 0.5) {
    resolve('Success')
  } else {
    reject('Error')
  }
```

`Promise`构造函数接受一个函数作为参数，该函数是同步的并且会被立即执行，称之为起始函数。起始函数包含两个参数 `resolve`和 `reject`，分别表示 `Promise`成功和失败的状态。

在这个例子中，当随机数小于0.5时，`Promise`被设置为Fulfilled状态；否则，被设置为Rejected状态。需要注意的是，`Promise`只能被设置一次状态，因此 `resolve()`和 `reject()`只能有一个被执行。

### 2.2 Promise成员方法

`Promise`对象中有三个成员方法，分别是 `Promise.then()` `Promise.catch()` `Promise.finally()`。

`Promise.then()`和 `Promise.catch()`方法分别会在 `Promise`执行成功和失败后执行；而 `Promise.finally()`方法无论什么情况下都会执行。

得益于这三个方法，我们可以从回调地狱中解脱出来。

如果我们想在异步任务执行结束后，再执行任务，只需要链式调用就可以了。

```javascript
const promise = new Promise((resolve, reject) => {
  if (Math.random() < 0.5) {
    resolve('Success')
  } else {
    reject('Error')
  }
})

promise.then((result) => {
  console.log(result)
}).catch((error)=> {
  console.log(error)
})
```

不难看出，`Promise`也是通过回调函数的方式去指定异步任务结束后的操作，只不过这个回调函数是传进 `Promise.then()`方法中的。

`Promise.then()`方法可以接收两个回调，分别指定成功和失败后的操作。

```javascript
promise.then((value) => {
  console.log('onFulfilled', value)
}, (error) => {
  console.log('onRejected', error)
})
```

### 2.3 案例：使用Promise封装AJAX

AJAX的全称为Asynchronous Javascript And XML，也就是异步JavaScript和XML。AJAX是浏览器与服务器之间的一种异步通信方式。

下面我们使用 `Promise`封装AJAX。

```javascript
const ajax = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject(xhr.statusText)
      }
    }
    xhr.send()
  })
}
```

在函数 `ajax`中，我们传入形参 `url`作为请求资源的地址，在内部通过 `XMLHttpRequest`发起一个 `GET`请求，在 `onload`回调中，如果HTTP代码为200，则通过 `resolve`把获取到的内容返回，否则调用 `reject`发送错误信息。最后调用 `xhr.send()`发送请求。

```javascript
ajax('https://jsonplaceholder.typicode.com/posts').then((res) => {
  console.log(res)
}, (error) => {
  console.log(error)
})
```

这段代码调用前面定义的 `ajax`函数向指定URL发送 `GET`请求，并在请求成功时通过 `Promise.then()`打印响应数据 `res`，在请求失败时打印错误信息 `error`。

### 2.4 Promise链式调用

如果仅限于此的话，在连续调用需求中Promise同样会陷入类似“回调地狱”的嵌套结构，那这样还不如写回调函数呢。

事实上，`Promise.then()`方法返回一个全新的 `Promise`对象。

```javascript
const promise = new Promise((resolve, reject) => {
  if (Math.random() < 0.5) {
    resolve('Success')
  } else {
    reject('Error')
  }
})

const promiseInner = promise.then(...)

console.log(promiseInner)
console.log(promiseInner === promise)

/** Console Output
  Promise {<Pending>}
  false
*/
```

由此，我们可以在 `.then()`后面再次 `.then()`，形成链式调用。

```javascript
const promise = new Promise((resolve, reject) => {
  if (Math.random() < 0.5) {
    resolve('Success')
  } else {
    reject('Error')
  }
})

promise.then(() => { console.log('111') })
  .then(() => { console.log('222') })
  .then(() => { console.log('333') })
  .then(() => { console.log('444') })
  .finally(() => { console.log('调用结束') })

/** Console Output
  '111'
  '222'
  '333'
  '444'
  '调用结束'
*/
```

每一个 `then()`方法都是在为上一个 `then()`方法返回的已经确定状态的 `Promise`对象添加回调。这显然增加了代码的可读性。

事实上，我们可以手动去指定 `then()`返回一个任意的、非 `undefined`的值或对象（并不一定是 `Promise`对象）来作为下一个 `then()`方法接收到的参数。

```javascript
promise.then(() => {
  return 'a'
}).then((value) => {
  console.log(value)
})

/** Console Output
  'a'
*/
```

### 2.5 Promise异常处理

上文提及，`Promise.then()`方法可以接收两个回调，分别指定成功和失败后的操作。执行失败回调可以捕获程序中出现或手动抛出的错误和异常，但实际上我们有更加简洁的方式，也就是 `Promise.catch()`方法。

```javascript
const promise = new Promise((resolve, reject) => {
  if (Math.random() < 0.5) {
    resolve('Success')
  } else {
    reject('Error')
  }
})

promise.then((value) => {
  console.log('onFulfilled', value)
}).catch((error) => {
  console.log('onRejected', error)
})

/** Console Output - Succeed
  'onFulfilled' 'Success'
*/

/** Console Output - Failed
  'onRejected' 'Error'
*/
```

### 2.6 Promise静态方法

在 `Promise`对象中还有几个静态方法。

- `Promise.resolve()`

  `Promise.resolve()`可以将一个值转换为状态为Fulfilled的 `Promise`对象。

  ```javascript
  Promise.resolve('str').then((value) => {
    console.log(value)
  })

  /** Console Output
  'str'
  */
  ```

  这种方式完全等价于 `new Promise()`。

  ```javascript
  new Promise((resolve, reject) => {
    resolve('str')
  })
  ```

  一个有意思的现象是，当我们用 `Promise.resolve()`去包装一个已有的 `Promise`对象时，新包装的 `Promise`对象和原来的是完全相等的。

  ```javascript
  const promise = new Promise((resolve, reject) => {
    resolve('str')
  })

  const promise2 = Promise.resolve(promise)

  console.log(promise === promise2)

  /** Console Output
    true
  */
  ```

  除了上述传参之外，我们还可以向 `Promise.resolve()`方法中传入一个**有 `then`方法**的对象，就像下面这样。

  ```javascript
  Promise.resolve({
    then: (onFulfilled, onRejected) => {
      onFulfilled('str')
    }
  }).then((value) => {
    console.log(value)
  })

  /** Console Output
    'str'
  */
  ```

  这中带有 `then`方法的对象其实是实现了一个 `thenable`的接口，也就是声明这是一个可以被then的对象。
- `Promise.reject()`

  与 `Promise.resolve()`类似，也是将某个值包装为 `Promise`对象，不同的是，`Promise.reject()`包装的对象永远为Rejected状态。

  ```javascript
  Promise.reject('rejected or fulfilled?').catch((error) => {
    console.log(error)
  })

  /** Console Output
    'rejected or fulfilled?'
  */
  ```

### 2.7 Promise并行执行

我们回到最初的那个模拟异步编程的例子。

```javascript
setTimeout(() => {
  console.log('3000')
}, 3000)
setTimeout(() => {
  console.log('2000')
}, 2000)
setTimeout(() => {
  console.log('1000')
}, 1000)
console.log('开始加速咯！')

/** Console Output
  '开始加速咯！'
  '1000'
  '2000'
  '3000'
*/
```

不同于上述所讲的一个异步任务执行完后再接着执行另一个任务，Promise针对多个异步任务并行执行的情况也有很好的解决方案。

在实际开发中，我们经常遇到需要同时请求多个网络资源的情况。如果这些资源之间没有依赖，那最好的方法就是同时请求。

```javascript
const ajax = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject(xhr.statusText)
      }
    }
    xhr.send()
  })
}

ajax('https://jsonplaceholder.typicode.com/posts').then((res) => { console.log(res) })
ajax('/url/01').then((res) => { console.log(res) })
ajax('/url/01').then((res) => { console.log(res) })
```

同时也带来了一个新的问题：我们如何判断这些请求都已经结束了？

当然可以对每一个请求都进行 `.catch()`，但是这样会带来肉眼可见的麻烦。

`Promise`对象中的静态方法 `Promise.all()`就是用来解决这种问题。

`Promise.all()`方法接收一个以异步请求为元素的数组，并返回一个 `Promise`对象。

```javascript
const promiseAll = Promise.all([
  ajax('https://jsonplaceholder.typicode.com/posts'),
  ajax(url1),
  ajax(url2)
])

promiseAll.then((values) => {
  console.log(values)
}).catch((error) => {
  console.log(error)
})
```

当数组中的全部请求都执行成功后，`Promise.all`的 `.then()`方法才会被执行，否则执行 `.catch()`方法。

和 `Promise.all()`类似，`Promise.race()`方法也是并行处理所有的异步请求。不同的是，`Promise.all()`方法会等待所有任务都结束后才会结束，而 `Promise.race()`只会等待第一个任务结束。

### 2.8 小结

`Promise`异步方案避免了传统回调函数的层层嵌套，其链式调用使得代码通过 `.then()`方法向下方扩展而不是向右。

```javascript
promise
  .then(() => { console.log('111') })
  .then(() => { console.log('222') })
  .then(() => { console.log('333') })
  .then(() => { console.log('444') })
  .catch((error) => { console.log(error) })
  .finally(() => { console.log('调用结束') })
```

但是这种依然摆脱不了回调函数，我们希望能使用类似于同步编程的语法来写异步编程。

```javascript
try {
  const value1 = ajax('http://some.url.1')
  console.log(value1)
  const value2 = ajax('http://some.url.2')
  console.log(value2)
  const value3 = ajax('http://some.url.3')
  console.log(value3)
  const value4 = ajax('http://some.url.4')
  console.log(value4)
} catch (err) {
  console.error(err)
}
```

如果能实现这种写法，异步代码就变得更加容易理解。

## 3 Generator异步方案

在ES6中提出了使用 `function*`关键字定义的生成器函数 `Generator`。

```javascript
function* foo() {
  console.log('start')
}

const generator = foo()

generator.next()
```

`Generator`会返回一个 `Generator`对象。`Generator`的函数体不会立即执行，而是调用其 `.next()`方法后才会执行。

在 `Generator`函数体中我们可以随时用 `yield`关键字向外返回一个值，作为 `.next()`方法返回的结果。

```javascript
function* foo() {
  console.log('start')
  yield 'SSS'
}

const generator = foo()

const res = generator.next()

console.log(res)

/** Console Output
  'start'
  { value: 'SSS', done: false }
*/
```

`.next()`返回的是一个对象，除了我们期望的 `value`之外，还有一个表示这个 `Generator`是否执行完毕的 `done`属性。

不同于 `return`，`Generator`在执行到 `yield`语句时，并不会立即停止执行，而是先暂停执行，等待下一次调用 `.next()`方法时才会接着 `yield`后面的语句执行。

```javascript
function* foo() {
  console.log('start')
  yield 'SSS'
  console.log(middle)
  yield 'DDD'
  console.log(end)
  yield 'FFF'
}

const generator = foo()

const res1 = generator.next()
console.log(res1)

const res2 = generator.next()
console.log(res2)

const res3 = generator.next()
console.log(res3)

const res4 = generator.next()
console.log(res4)

/** Console Output
  'start'
  { value: 'SSS', done: false }
  { value: 'DDD', done: false }
  { value: 'FFF', done: false }
  { value: undefined, done: true }
*/
```

`.next()`方法可以被传参，传入的参数将作为此次结束处的 `yield`的返回值。

```javascript
function* foo() {
  console.log('start')
  const yieldRes = yield 'SSS'
  console.log('yieldRes',yieldRes)
}

const generator = foo()

const res = generator.next()
console.log('res',res)

generator.next('DDD')

/** Console Output
  'start'
  res { value: 'SSS', done: false }
  yieldRes DDD
*/
```

我们还是分析一个AJAX案例。

```javascript
const ajax = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject(xhr.statusText)
      }
    }
    xhr.send()
  })
}

function* gen() {
  const res = yield ajax('https://jsonplaceholder.typicode.com/posts')
  console.log(res)
}

const g = gen()
const result = g.next()
result.value.then((res) => {
  g.next(res)
})
```

结合 `Generator`，我们就可以彻底消灭 `Promise`的回调函数，实现类似于同步编程的语法。

但是当我们还是连续调用的时候，又会出现类似回调地狱的问题。

```javascript
function* gen() {
  const res1 = yield ajax('https://jsonplaceholder.typicode.com/posts')
  console.log(res1)
  const res2 = yield ajax('https://jsonplaceholder.typicode.com/users')
  console.log(res2)
  const res3 = yield ajax('https://jsonplaceholder.typicode.com/albums')
  console.log(res3)
}

const g = gen()
const result1 = g.next()
result1.value.then((res) => {
  const result2 = g.next(res)

  if (result2.done) return
  result2.value.then((res) => {
    const result3 = g.next(res)
  
    if (result3.done) return
    result3.value.then((res) => {
      g.next(res)
    })
  })
})
```

但和回调地狱不同的是，这些调用都有相同的结构，因此我们可以用递归来优雅地逐次调用。

```javascript
const g = gen()

const run = (result) => {
  if (result.done) return
  result.value.then((data) => {
    run(g.next(data))
  }).catch((err) => {
    console.log(err)
  })
}

run(g.next())
```

这样我们就得到了一个执行任意次调用的 `Generator`触发器，并且可以把它封装成为一个公共方法，需要的时候把 `Generator`函数作为参数传入，提高开发效率。

```javascript
const runGenerator = (geneartor) => {
  const g = geneartor()

  const run = (result) => {
    if (result.done) return
    result.value.then((data) => {
      run(g.next(data))
    }).catch((err) => {
      console.log(err)
    })
  }

  run(g.next())
}

runGenerator(gen)
```

## 4 Async/Await语法糖

`Generator`虽然方便，但我们还要手动编写触发器。而ES8中新增了 `Generator`的语法糖，即Async/Await，作为作为一种语法层面的异步编程标准，体验更加接近于同步编程。

和 `Generator`类似，我们只需要把函数用 `async`标记为异步函数，然后将所有的 `yield`替换为 `await`，这个函数就可以直接被执行，而无需触发器调用。

```javascript
const gen = async () => {
  const res1 = await ajax('https://jsonplaceholder.typicode.com/posts')
  console.log(res1)
  const res2 = await ajax('https://jsonplaceholder.typicode.com/users')
  console.log(res2)
  const res3 = await ajax('https://jsonplaceholder.typicode.com/albums')
  console.log(res3)
}

gen()
```

`async`函数同样有返回值，返回的是一个 `Promise`对象。

```javascript
const asyncRes = gen()
asyncRes.then(() => {
  console.log('All requests are done')
})
```
