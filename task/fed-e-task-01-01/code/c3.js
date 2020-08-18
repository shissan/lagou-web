const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

// 练习1：使用 fp.add(x,y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1

/* 说明：函子是个容器，它的map方法可以运行一个函数对值进行处理，就是把容器里的值映射到传进来的函数执行，最后map会返回一个包含处理后的值的函子 */
let maybe = Maybe.of([5, 6, 1])
let ex1 = addNum => fp.map(fp.add(addNum))

console.log(maybe.map(ex1(2)))



// 练习2：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素

/* 说明： */
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = item => fp.first(item)

console.log(xs.map(ex2))



// 练习3：实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
})
let user = {id: 2, name: 'Albert'}
let ex3 = x => safeProp('name')(x).map(fp.first)

console.log(ex3(user))



// 练习4： 使用 Maybe 重写 ex4，不要有 if 语句
// let ex4 = function (n) {
//   if (n) {
//     return parseInt(n)
//   }
// }

let ex4 = n => Maybe.of(n).map(parseInt)

console.log(ex4('33'))
console.log(ex4())
