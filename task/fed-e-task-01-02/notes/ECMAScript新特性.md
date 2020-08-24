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

11. 剩余参数  

12. 展开数组  

13. 箭头函数  

14. 箭头函数与 this

15. 对象字面量的增强  

16. Object.assign  

17. Object.is  

18. Proxy  

19. 