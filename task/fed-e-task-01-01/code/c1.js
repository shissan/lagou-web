// 将下面异步代码使用 Promise 的方式改进

// setTimeout(function () {
//   var a = 'hello'
//   setTimeout(function () {
//     var b = 'lagou'
//     setTimeout(function () {
//       var c = 'I ❤ U'
//       console.log(a + b + c)
//     }, 10)
//   }, 10)
// }, 10)


let p = new Promise((resolve, reject) => {
  var a = 'hello'
  resolve(a)
})

p.then((data) => {
  var b = 'lagou'
  return data + b
})
.then((data) => {
  var c = 'I ❤ U'
  console.log(data + c)
})
