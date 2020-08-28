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
let 声明的变量只在 let 命令所在的代码块内有效。

4. const  
恒量/常量。  
const 声明一个只读的常量，一旦声明，常量的值就不能改变。  
其实 const 其实保证的不是变量的值不变，而是保证变量指向的内存地址所保存的数据不允许改动。  
最佳实践：不用var，主用const，配合let

5. 数组的解构  
```
const arr = [100, 200, 300]
const [foo, bar, baz] = arr
console.log(foo, bar, baz)  // 100 200 300

// const [, , baz] = arr
// console.log(baz)  // 300

// const [foo, ...rest] = arr  // 剩余运算符 最后一个成员使用
// console.log(rest)  // [200, 300]

// const [foo, bar, baz = 123, more = 'default value'] = arr  // 解构默认值
// console.log(bar, more)  // 200 default value  // 结果为 undefined ，触发默认值
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
用于取出参数对象所有可遍历属性然后拷贝到当前对象  
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
箭头函数体中的 this 对象，是定义函数时的对象，而不是使用函数时的对象。  
```
const f = v => v;
// 等价于
// const f = function(a){
//  return a;
// }
f(1);  // 1
```

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
将多个源对象中的所有可枚举属性复制到一个目标对象中  
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
判断两个值是否严格相等，与（===）基本类似  
```
Object.is(1, 1);  // true
Object.is({a: 1}, {a: 1});  // false
Object.is(NaN, NaN)  // true
NaN === NaN  // false
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

24. 类的继承（extends）  
相比原型继承更方便、更清楚  
```
class Person {
  constructor (name) {
    this.name = name
  }
  say () {
    console.log(`hello, ${this.name}`)
  }
}
class Student extends Person {
  constructor (name, number) {
    super(name)
    this.number = number
  }
  hello () {
    super.say()
    console.log(`my school number is ${this.number}`)
  }
}

const s = new Student('jack', '100')
s.hello()  
// hello, jack
// my school number is 100
```

25. Set  
数据结构，可以把它理解为集合  
Set内部的成员是不允许重复的  
```
const s = new Set()
s.add(1).add(2).add(3).add(4).add(2)

console.log(s)  // Set {1, 2, 3, 4}

for (let i of s) {
  console.log(i)
}

console.log(s.size)  // 4

console.log(s.has(100))   // false
console.log(s.has(1))   // true

console.log(s.delete(3))  // true
console.log(s)   // Set {1, 2, 4}

s.clear()
console.log(s)  // Set {}

const arr = [1, 2, 1, 3, 4, 1]
const result1 = new Set(arr)
const result2 = Array.from(new Set(arr))
const result3 = [...new Set(arr)]

console.log(result1)  // Set {1, 2, 3, 4}
console.log(result2)  // [1, 2, 3, 4]
console.log(result3)  // [1, 2, 3, 4]
```

26. Map  
数据结构，跟ECMAScript的对象十分类似，本质上都是键值对集合，这种对象结构中键只能是字符串类型(不是字符串就会调用toString方法)  
Map 可以使用任意类型的数据作为键  
```
const m = new Map()
const tom = {name: 'tom'}

m.set(tom, 90)
console.log(m)  // Map { {name: 'tom'} => 90}
console.log(m.get(tom))  // 90

// m.has()
// m.delete()
// m.clear()


```

27. Symbol（符号）  
一种全新的原始数据类型，表示一个独一无二的值 
最主要的作用就是为对象添加独一无二的属性名  
```
const s = Symbol()
console.log(s)  // Symbol()
console.log(typeof s)  // symbol

console.log(Symbol() === Symbol())  // false

console.log(Symbol('foo'))  // Symbol(foo)
console.log(Symbol('bar'))  // Symbol(bar)

const obj = {}
obj[Symbol()] = '123'
obj[Symbol()] = '456'

console.log(obj)  // {[Symbol()]: '123', [Symbol()]: '456'}

// 可以用Symbol创建私有成员的属性名
const name = Symbol()
const person = {
  [name]: 'zce',
  say () {
    console.log(this.[name])
  }
}

person.say()  // zce

```

28. Symbol 补充  
```
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')

console.log(s1 === s2)  // true
// 不是字符串自动转成字符串
console.log(Symbol.for(true) === Symbol.for('true'))  // true

// console.log(Symbol.iterator)
// console.log(Symbol.hasInstance)

const obj = {}
console.log(obj.toString())  // [object object]

const obj1 = {
  [Symbol.toStringTag]: 'XObject'
}
console.log(obj1.toString())  // [object XObject]

// 使用 for in 循环、 Object.keys()、JSON.stringify() 都无法获取到 Symbol 类型的属性名  
// Symbol 类型的属性名特别适用作为对象的私有属性

const obj2 = {
  [Symbol()]: 'symbol value',
  foo: 'normal value'
}

// 类似Object.keys()，但是Object.keys()获取到的都是字符串类型的属性名，Object.getOwnPropertySymbols()获取到的都是Symbol类型的属性名
console.log(Object.keys(obj2))  // foo
console.log(Object.getOwnPropertySymbols(obj2))  // [Symbol()]
```

29. for...of 循环  
作为遍历所有数据结构的统一方式  
```
const s = new Set(['foo', 'bar'])

for (const item of s) {
  console.log(item)
}

const m = new Map()
m.set('foo', '123')
m.set('bar', '345')

for (const item of m) {
  console.log(item)
}
for (const [key, value] of m) {
  console.log(key, value)
}
```

30. 可迭代接口(Iterable)  
ES 中能够表示有结构的数据类型越来越多，为了给各种各样的数据结构提供统一遍历方式，ES2015 提供了 Iterable 接口  
实现 Iterable 接口就是 for...of 的前提  
```
const set = new Set(['foo', 'bar', 'baz'])
const iterator = set[Symbol.iterator]()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
```

31. 实现可迭代接口  
```
// const obj = {
//  [Symbol.iterator]: function() {
//    return {
//      next: function () {
//        return {
//          value: 'zce',
//          done: true
//      }
//      }
//    }
//  }
//}
const obj = {
  store = ['foo', 'bar', 'baz'],

  [Symbol.iterator]: function() {
    let index = 0
    const self = this

    return {
      next: function () {
        const result = {
          value: self.store[index],
          done: index >= self.store.length
        }
        index++
        return result
      }
    }
  }
}

for (const item of obj) {
  console.log('循环体', item)
}
```

32. 迭代器模式  
```
const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  work: ['喝茶'],

  // 提供统一遍历访问接口
  each: function (callback) {
    const all = [].concat(this.life, this.learn, this.work)
    for (const item of all) {
      callback(item)
    }
  },

  // 提供迭代器（ES2015 统一遍历访问接口）
  [Symbol.iterator]: function () {
    const all = [...this.life, ...this.learn, ...this.work]
    let index = 0
    return {
      next: function () {
        return {
          value: all[index],
          done: index++ >= all.length
        }
      }
    }
  }
}

// for (const item of todos.life) {
//   console.log(item)
// }
// for (const item of todos.learn) {
//   console.log(item)
// }
// for (const item of todos.work) {
//   console.log(item)
// }

todos.each(function (item) {
  console.log(item)
})

console.log('-------------------------------')

for (const item of todos) {
  console.log(item)
}
```

33. 生成器（Generator）  
避免异步编程中回调嵌套过深，提供更好的异步编程解决方案  
```
function * foo () {
  console.log('1111')
  yield 100
  console.log('2222')
  yield 200
  console.log('3333')
  yield 300
}

const generator = foo()

console.log(generator.next()) // 第一次调用，函数体开始执行，遇到第一个 yield 暂停
console.log(generator.next()) // 第二次调用，从暂停位置继续，直到遇到下一个 yield 再次暂停
console.log(generator.next()) // 。。。
console.log(generator.next()) // 第四次调用，已经没有需要执行的内容了，所以直接得到 undefined
```

34. 生成器应用  
```
// 案例1：发号器

function * createIdMaker () {
  let id = 1
  while (true) {
    yield id++
  }
}

const idMaker = createIdMaker()

console.log(idMaker.next().value)
console.log(idMaker.next().value)
console.log(idMaker.next().value)
console.log(idMaker.next().value)

// 案例2：使用 Generator 函数实现 iterator 方法

const todos = {
  life: ['吃饭', '睡觉', '打豆豆'],
  learn: ['语文', '数学', '外语'],
  work: ['喝茶'],
  [Symbol.iterator]: function * () {
    const all = [...this.life, ...this.learn, ...this.work]
    for (const item of all) {
      yield item
    }
  }
}

for (const item of todos) {
  console.log(item)
}
```

35. ES Modules  
语言层面的模块化标准

36. 概述  
ES2016: includes()、Math.pow()  
ES2017:   
* Object.values()  // 遍历键值  
* Object.keys()  // 遍历键名  
* Object.entries()  // 遍历键值对  
* Object.getOwnPropertyDescriptors  
* String.prototype.padStart  
* String.prototype.padEnd  
* 在函数参数中添加尾逗号  
* Async/Await  

