# ECMAScript 新特性

## 一、ECMAScript 与 JavaScript
ECMAScript 通常看作 JavaScript 的标准化规范，实际上 JavaScript 是 ECMAScript 的扩展语言。ECMAScript 只提供了最基本的语法。JavaScript语言本身指的就是 ECMAScript，2015年开始 ES 保持每年一个版本的迭代。

## 二、ECMAScript 2015的新特性
1. 概述  
* 解决原有语法上的一些问题或者不足  
* 对原有语法进行增强  
* 全新的对象、全新的方法、全新的功能  
* 全新的数据类型和数据结构  

2. 准备工作  
Nodemon

3. let 与块级作用域  
全局作用域、函数作用域、块级作用域

4. const  
恒量/常量。  
最佳实践：不用var，主用const，配合let

5. 数组的解构  
```
const arr = [100, 200, 300]
const [foo, bar, baz] = arr
console.log(foo, bar, baz)  // 100 200 300

// const [, , baz] = arr
// console.log(baz)  // 300

// const [foo, ...rest] = arr  // 最后一个成员使用
// console.log(rest)  // [200, 300]

// const [foo, bar, baz = 123, more = 'default value'] = arr
// console.log(bar, more)  // 200 default value
```

6. 对象的解构  
```
const obj = {name: 'zce', age: 18}
const { name } = obj
console.log(name)  // zce

// const name = 'tom'
// const { name: objName } = obj
// const { name: objName = 'jack' } = obj
// console.log(name)
```

7. 模块字符串  
```
const name = `tom`
const msg = `hey, ${name}`
console.log(msg)
```

8. 带标签的模板字符串  
```
const name = 'tom'
const gender = false

function myTagFunc (strings, name, gender) {
  // console.log(strings, name, gender)  // [ 'hey, ', ' is a ', '.' ] tom true
  const sex = gender ? 'man' : 'woman'
  return string[0] + name + string[1] + sex + string[2]
}
const result = myTagFunc`hey, ${name} is a ${gender}.`

console.log(result) // hey, tom is a woman.
```

9. 字符串的扩展方法  
includes()、startsWith()、endsWith()
```
const message = 'Error: foo is not defined'
console.log(message.startsWith('Error'))  // true
console.log(message.endsWith('.'))  // true
console.log(message.includes('foo'))  // true
```

10. 参数默认值  
```
function foo (enable = true) {

}
```

11. 剩余参数  
```
// 只能出现在行参的最后一位，且只能出现一次
function foo (...args) {
  console.log(args)
}
foo(1, 2, 3, 4)
```

12. 展开数组  
```
const arr = ['foo', 'bar', 'baz']
console.log(...arr)  // foo bar baz
```

13. 箭头函数  
```
const inc = n => n + 1
console.log(inc(100))
```

14. 箭头函数与 this  
箭头函数不会改变this的指向  


15. 对象字面量的增强  
```
const obj = {
  foo: 123,
  bar,
  method1 () {
    console.log('hello')
  }
}
console.log(obj)
```

16. Object.assign  
将多个源对象中的属性复制到一个目标对象中  
```
const source1 = {
  a: 123,
  b: 123
}
const target = {
  a: 456,
  c: 456
}
const result = Object.assign(target, source1)

console.log(target)  // {a: 123, c: 456, b: 123}
console.log(result === target)  // true
```

17. Object.is  
判断两个值是否相等  
```
Object.is(NaN, NaN)  // true
```

18. Proxy  
专门为对象设置访问代理器的  
```
const person = {
  name: 'zce',
  age: 20
}
const personProxy = new Proxy(person, {
  get (target, property) {
    return property in target ? target[property] : 'default'
  },
  set (target, property, value) {
    console.log(target, property, value)
  }
})

personProxy.gender = true

console.log(personProxy.name)  // zce
console.log(personProxy.xxx)  // default
```

19. Proxy 对比 defineProperty  
Proxy 更强大，defineProperty 只能监视属性的读写，Proxy 能够监视到更多对象操作  
Proxy 更好的支持数组对象的监视  
Proxy 是以非侵入的方式监管了对象的读写  
```
const person = {
  name: 'zce',
  age: 20
}
const personProxy = new Proxy(person, {
  deleteProperty (target, property) {
    console.log('delete', property)
    delete target[property]
  }
})

delete personProxy.age
console.log(person)
```

20. Reflect  
统一提供一套用于操作对象的API  
Reflect 属于一个静态类  
Reflect 内部封装类一系列对对象的底层操作  
Reflect 成员方法就是 Proxy 处理对象的默认实现  
```
const obj = {
  name: 'zce',
  age: 20
}

console.log('name' in obj)
console.log(delete obj['age'])
console.log(Object.keys(obj))

console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))
```

21. Promise  
一种更优的异步编程解决方案，通过链式调用，解决了传统异步编程中回调函数嵌套过深的问题  

22. class 类  
```
class Person {
  constructor (name) {
    this.name = name
  }
  say () {
    console.log(`hello, ${this.name}`)
  }
}

const p = new Person('tom')
p.say()
```

23. 静态方法  
实例方法：就是需要通过这个类型构造的实例对象去调用  
静态方法：通过类型本身去调用  
ES2015中新增添加静态成员的 static 关键词  
```
class Person {
  constructor (name) {
    this.name = name
  }
  say () {
    console.log(`hello, ${this.name}`)
  }
  static create (name) {
    return new Person(name)
  }
}

const tom = Person.create('tom')
tom.say()
```
