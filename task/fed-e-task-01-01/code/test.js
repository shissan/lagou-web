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