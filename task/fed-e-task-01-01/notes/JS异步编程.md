# JS异步编程

## 一、采用单线程模式工作的原因
与它最早的设计初衷有关，最早JavaScript这门语言就是一门运行在浏览器端的脚本语言，它的目的是用来去实现页面上的动态交互。而实现页面交互的核心就是dom操作，那这也就决定了它必须使用单线程模式，否则就会出现很复杂的线程同步问题。

单线程指的是：JS执行环境中负责执行代码的线程只有一个


## 二、同步模式与异步模式
一次只能执行一个任务，多个任务就需要排队，优点是更安全、更简单。缺点是，如果遇到一个特别耗时的任务，后面的任务就必须排队等待这个任务的结束，就会导致整个程序的执行被拖延，进入假死状态。
为了解决耗时任务阻塞执行的问题，JavaScript将任务的执行模式分成了两种，分别是同步模式和异步模式。

同步模式：代码中的任务依次执行，后一个任务必须要等到前一个任务结束才能开始执行，代码执行顺序与我们代码编写顺序完全一致。在js中大多数任务都会以同步模式执行。

异步模式：不会去等待这个任务的结束才开始下一个任务，开启过后就立即往后执行下一个任务，后续逻辑一般会通过回调函数的方式定义。异步模式对js非常重要，没有它，单线程的js语言就无法同时处理大量耗时任务。

回调函数：所有异步编程方案的根基，可以理解为一件你想要做的事情。大量回调嵌套会导致回调地域


## 三、事件循环与消息队列
EventLoop 也就是事件循环，是JavaScript的执行机制。  
* 执行的代码是放到调用栈Stack中执行的，同步的代码会直接执行，如果是异步的就会放入消息队列中等待执行，等所有的代码执行完毕，EventLoop就会监听调用栈和消息队列中的任务。
* 当调用栈中所有的任务结束以后，调用栈Stack会清空。
* 它会从消息队列中依次取出位于队首的回调函数压入到调用栈Stack，开始执行，执行完后消息队列长度减1。
* 继续取出位于队首的任务，压入到调用栈Stack中执行，以此类推，直到把消息队列中所有的任务都执行完毕。如果在执行过程中，又产生了微任务，那么会加入到队列的末尾，也会在这个周期被调用执行。
* 当消息队列中的任务都执行完毕，此时消息队列为空队列，调用栈Stack也为空，也就是当前这个宏任务执行结束了
* 会去执行下一个宏任务，重复上面的步骤  
这个过程是循环进行的，所以整个这种运行机制称为EventLoop。

`Wikipedia这样定义：Event Loop是一个程序结构，用于等待和发送消息和事件。简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为'主线程'；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为'EventLoop线程'`

消息列队就是暂存异步任务的地方。


## 四、异步编程的几种方式
回到函数 -> Promise -> Generator -> Async/Await


## 五、Promise 异步方案、宏任务/微任务队列
Promise 对象代表了未来将要发生的事件，用来传递异步操作的消息。

有以下两个特点：  
1. 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：  
* pending：初始状态，不是成功或失败状态
* fulfilled：意味着操作成功完成
* rejected：意味着操作失败
只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是「承诺」，表示其他手段无法改变。

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 Pending 变为 Resolved 和从 Pending 变为 Rejected。

基本用法  
```
const promise = new Promise(function (resolve, reject) {
  // 这里用于兑现承诺

  resolve(100)  // 承诺达成

  // reject(new Error('promise rejected'))   // 承诺失败
})

promise.then(function (value) {   // 成功后的回调
  console.log('resolved', value)
}, function (error) {    // 失败后的回调
  consoleo.log('rejected', error)
})
```

使用 new 来调用 Promise 的构造器来进行实例化。Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 方法和 reject 方法。对于已经实例化过的 promise 对象可以调用 promise.then() 方法，传递 resolve 和 reject 方法作为回调。也可使用 promise.catch() 接收失败的回调。

本质  
也就是使用回调函数的方式去定义异步任务结束后所需要执行的任务，只不过这里的回调函数是通过then方法传递进去的。

常见误区  
嵌套使用的方式是使用 Promise 最常见的错误。借助于Promise then方法链式调用的特点，尽可能保证异步任务扁平化。

链式调用  
then 方法返回一个全新的 Promise 对象，目的是实现一个 Promise 链条。  
每一个then方法实际上是为上一个then返回的 Promise 对象添加状态明确过后的回调（即注册回调）。这些 Promise 会依次执行。  
前面的 then 方法中回调函数的返回值会作为后面的 then 方法回调的参数  
而且我们也可以在 then 的回调当中手动返回一个 Promise 对象，那后面 then 方法的回调会等待它的结束，then 的回调也可以返回一个普通的值。

异常处理  
then 方法的第二个参数 onRejected 回调  
catch 方法（建议使用）  

静态方法  
Promise.resolve()  
Promise.reject()  

并行执行  
Promise.all() 会等待所组合的所有 Promise 都结束，而且是成功结束才会成功完成  
Promise.race() 只会等待第一个结束的任务  

执行时序  
回调队列中的任务称之为**宏任务**，宏任务执行过程中可能临时加上一些额外需求，这些额外的需求可以选择作为一个新的宏任务进到队列中排队，也可以作为当前任务的**微任务**（直接在当前任务结束过后立即执行，提高整体的响应能力）。

Promise的回调会作为微任务执行。  
目前绝大多数异步调用都是作为宏任务执行


## 六、Generator 异步方案、Async/Await 语法糖

```
// 生成器函数由 function * 定义
function * foo() {
  try {
    console.log('start');
    const res = yield 'foo';
    console.log(res);
  } catch(exp) {
    // 可以通过catch进行异常的捕获
    console.log(exp);
  }
}

// 仅仅是创建了一个generator对象，还没有去执行它
const generator = foo();

// 直到手动调用生成器的.next()方法，函数体才会开始执行 
const result = generator.next();
console.log(result)

// yield返回的值，可以通过next()返回的对象的value中拿到
console.log(result.value)

// 如果在.next()方法中传递一个参数，在yield中的返回值中会接收到传入的参数
generator.next('bar');

// 通过throw抛出一个异常
generator.throw(new Error('error'))
```

函数体内可以随时通过yield关键词向外返回一个值，yield会暂停函数的执行，直到外界继续调用.next()方法，函数才会接着yield后面开始继续执行。可以用 yield 返回多次。

next()方法会执行generator的代码，然后，每次遇到yield x;就返回一个对象{value: x, done: true/false}，然后“暂停”。返回的value就是yield的返回值，done表示这个generator是否已经执行结束了。如果done为true，则value就是return的返回值，这个generator对象就已经全部执行完毕，不要再继续调用next()了。

如果 result.value 返回的是 Promise 对象，可以 result.value.then()。


Async/Await 语法糖  
* 语言层面的异步编程标准  
* Async函数就是生成器函数一种更方便的语法糖  
* Async函数返回一个 Promise 对象
