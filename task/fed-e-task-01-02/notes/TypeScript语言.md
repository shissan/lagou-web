# TypeScript 语言

## 一、概述
解决 JavaScript 类型系统的问题，大大提高代码的可靠程度  

## 二、强类型与弱类型（类型安全）
语言层面限制函数的实参类型必须与行参类型相同  
强类型有更强的类型约束，而弱类型中几乎没有什么约束  
强类型语言中不允许任意的隐式类型转换，而弱类型语言则允许任意的数据隐式类型转换  
变量类型允许随时改变的特点，不是强弱类型的差异  

## 三、静态类型与动态类型（类型检查）
静态类型：一个变量声明时它的类型就是明确的，声明过后，它的类型就不允许再修改  
动态类型：运行阶段才能够明确变量类型，而且变量的类型随时可以改变  
动态类型语言中的变量没有类型，变量中存放的值是有类型的  

## 四、JavaScript 自有类型系统的问题  
JavaScript 类型系统特征：弱类型且动态类型。灵活多变，缺失了类型系统的可靠性  
为什么 JavaScript 不是强类型/静态类型 ？  
早前的 JavaScript 应用简单，JavaScript 没有编译环节
大规模应用下，这种优势就变成了短板

1. 弱类型的问题  
程序中一些类型异常要等到运行时才能发现  
类型不明确，就会造成函数的功能有可能发生改变  
造成对象索引器的一种用法错误  
君子约定有隐患，强制要求有保障

2. 强类型的优势  
错误更早暴露  
代码更智能，编码更准确  
重构更牢靠  
减少不必要的类型判断

## 五、Flow 静态类型检查方案  
Flow 是 JavaScript 的类型检查器
Flow 只是一个小工具

## 六、TypeScript 语言规范与基本应用
JavaScript 的超集，任何一种 JavaScript 运行环境都支持  
* 功能更为强大，生态也更健全、更完善  
* 前端领域中的第二语言  
* 属于渐进式  
可以编译转换es的一些新特性、提供了一套更强大的类型系统

缺点：语言本身多了很多概念，项目初期，TypeScript会增加一些成本  

1. 原始数据类型  
boolean、number、string、null、undefined 以及 ES6 中的新类型 Symbol  

2. 任意值  
any 用来表示允许赋值为任意类型 （尽量少用）  
```
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

3. 类型推论  
在没有明确的指定类型的时候推测出一个类型  
```
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

4. 联合类型  
使用 | 分隔每个类型  
```
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

5. 对象的类型——接口  
Interfaces  
赋值的时候，变量的形状必须和接口的形状保持一致（定义的变量比接口少了一些或多一些属性是不允许的）  
一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集  
```
interface Person {
  name: string;
  age?: number;  // 可选属性
  [propName: string]: any;  // 任意属性
}

// interface Person {
//   name: string;
//   age?: number;  // 可选属性
//   [propName: string]: string;  // 写成string会报错，可选属性age的值是 number，number 不是 string 的子属性，所以报错了
//   [propName: string]: string | number;  // 这样就不会报错了
// }

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};
```

6. 数组的类型  
「类型 + 方括号」表示法  
```
let fibonacci: number[] = [1, 1, 2, 3, 5];
```
数组泛型: Array<elemType>  
```
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

7. 函数的类型  
一个函数有输入和输出  
输入多余的（或者少于要求的）参数，是不被允许的  
```
function sum(x: number, y: number): number {
  return x + y;
}
sum(1, 2, 3);

// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target.
```
可选参数后面不允许再出现必需参数了
```
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```
会将添加了默认值的参数识别为可选参数  
```
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```
此时就不受「可选参数必须接在必需参数后面」的限制了
```
function buildName(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');
```

8. 类型断言  
可以用来手动指定一个值的类型  
'值 as 类型'  或  '<类型>值'，建议使用前面的

9. 内置对象  
ECMAScript 标准提供的内置对象有：Boolean、Error、Date、RegExp 等  
DOM 和 BOM 提供的内置对象有：Document、HTMLElement、Event、NodeList 等  
```
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;

let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

