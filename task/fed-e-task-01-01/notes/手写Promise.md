# 手写 Promise

1. Promise 就是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行  
2. Promise 中有三种状态，分别为成功（fulfilled）、失败（rejected）、等待（pending）  
 pending -> fulfilled  
 pending -> rejected  
一旦状态确定就不可更改  
3. resolve 和 reject 函数是用来更改状态的  
 resolve：fulfilled  
 reject：rejected  
4. then 方法内部做的事情就判断状态，如果状态是成功，调用成功的回调函数，如果状态是失败，调用失败的回调函数，then 方法是被定义在原型对象中的  
5. then 成功回调有一个参数，表示成功之后的值，then 失败回调有一个参数，表示失败后的原因  
6. 同一个promise对象下面的then方法是可以被调用多次的
7. then 方法是可以被链式调用的，后面then方法的回调函数拿到的值是上一个then方法的回调函数的返回值  
8. then 方法的参数为可选参数  
9. finally 方法无论当前这个promise对象最终的状态是成功的还是失败的，finally方法中的这个回调函数始终会被执行一次
10. 在 finally 方法的后面，我们可以链式调用 then 方法来拿到当前这个promise对象最终返回的结果  
11. catch 处理当前这个 promise 对象最终状态为失败的情况，就是说当我们调用then方法的时候是可以不传递失败回调的，如果不传递失败回调，这个失败回调就会被catch方法所捕获


```
// test.js
const MyPromise = require('./c4.js')

let promise = new MyPromise((resolve, reject) => {
  resolve('成功');
  // throw new Error('executor error');
  // reject('失败');
})

function other () {
  return new MyPromise((resolve, reject) => {
    resolve('other');
  })
}

promise.then(value => {
  console.log(value);
  // 可以返回一个普通值，也可以返回一个promise对象
  // return 200;
  return other();
}, reason => {
  console.log(reason);
  return 200;
}).then(value => {
  console.log(value)
})

const res = MyPromise.resolve(20);
res.then(value => {
  console.log(value);
})

const err = MyPromise.reject('错误');
err.then(value => {
  console.log('s:', value);
}, reason => {
  console.log('e:', reason);
})

const arr = ['s1', 's2', 's3', res, err];
// MyPromise.all(arr).then(value => {
//   console.log('s:', value);
// }, reason => {
//   console.log('e:', reason);
// })
MyPromise.race(arr).then(value => {
  console.log('s:', value);
}, reason => {
  console.log('e:', reason);
})
```


```
// MyPromise.js

const PENDING = 'pending';  // 等待
const FULFILLED = 'fulfilled';  // 成功
const REJECTED = 'rejected';  // 失败

class MyPromise {
  constructor (executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  // promise 状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) {
      return;
    }
    // 将状态改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // 判断成功回调是否存在，如果存在即调用
    // this.successCallback && this.successCallback(this.value);
    while (this.successCallback.length) {
      // this.successCallback.shift()(this.value)
      this.successCallback.shift()()
    }
  }

  reject = reason => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) {
      return;
    }
    // 将状态改为失败
    this.status = REJECTED;
    // 保存失败后原因
    this.reason = reason;
    // 判断失败回调是否存在，如果存在即调用
    // this.failCallback && this.failCallback(this.reason);
    while (this.failCallback.length) {
      // this.failCallback.shift()(this.reason)
      this.failCallback.shift()()
    }
  }

  then (successCallback, failCallback) {
    // then方法的可以不传参数，会依次传给后面的then，直到碰到有回调函数的
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => { throw reason };

    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        // 为了拿到promise2，需异步执行
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else {
        // 异步？等待
        // 将成功回调和失败回调保存起来
        // this.successCallback.push(successCallback);
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        // this.failCallback.push(failCallback);
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    // 当then方法返回Promise，后面才能链式调用
    return promise2;
  }

  finally (callback) {
    // 要返回一个promise对象，因为要链式调用
    return this.then(value => {
      // callback();
      // return 让下一个then方法拿到这个value
      // return value;
      // 异步处理
      return MyPromise.resolve(callback()).then(() => value);
    }, reason => {
      // callback();
      // throw reason;
      // 异步处理
      return MyPromise.resolve(callback()).then(() => { throw reason });
    })
  }

  catch (failCallback) {
    return this.then(undefined, failCallback);
  }

  static all (array) {
    let results = [];
    let index = 0;
    return new MyPromise ((resolve, reject) => {
      function addData (key, value) {
        results[key] = value;
        index++;
        // 等所有的异步操作都完成再resolve
        if (index === array.length) {
          resolve(results);
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          // promise 对象
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          // 普通值
          addData(i, current);
        }
      }
    })
  }

  static resolve (value) {
    // 把给到的值转换成promise对象
    if (value instanceof MyPromise) {
      return;
    }
    return new Promise(resolve => resolve(value));
  }
}


// 判断x的值是普通值还是promise对象
// 如果是普通值，直接调用resolve
// 如果是promise对象，查看promise对象返回的结果
// 再根据promise对象返回的结果，决定调用resolve，还是调用reject

function resolvePromise (promise2, x, resolve, reject) {
  // 防止then的回调函数中返回then返回的promise对象，就是自己返回自己
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (x instanceof MyPromise) {
    // promise 对象
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

module.exports = MyPromise;
```