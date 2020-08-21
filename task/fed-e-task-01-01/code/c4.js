const PENDING = 'pending';  // 等待
const FULFILLED = 'fulfilled';  // 成功
const REJECTED = 'rejected';  // 失败

class MyPromise {
  // 需要传递一个执行器进去，执行器会立即执行
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

  static race (array) {
    return new MyPromise ((resolve, reject) => {
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        // 哪个先完成就返回哪个
        if (current instanceof MyPromise) {
          // promise 对象
          current.then(value => resolve(value), reason => reject(reason))
        } else {
          // 普通值
          resolve(current);
        }
      }
    })
  }

  static resolve (value) {
    // 把给到的值转换成promise对象
    if (value instanceof MyPromise) {
      return;
    }
    return new MyPromise((resolve, reject) => resolve(value));
  }

  static reject (reason) {
    return new MyPromise((resolve, reject) => reject(reason));
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