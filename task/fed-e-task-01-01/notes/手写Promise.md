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
let promise = new Promise((resolve, reject) => {
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
  // return 100;
  return other();
}, reason => {
  console.log(reason);
  return 200;
}).then(value => {
  console.log(value)
})
```


```
const
```