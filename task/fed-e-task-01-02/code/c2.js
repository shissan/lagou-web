// 二、请说出下列最终的执行结果，并解释为什么

var tmp = 123;

if (true) {
  console.log(tmp)
  let tmp
}

// 会报错

// ES6规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。这在语法上，称为“暂时性死区”。
// 总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的，凡是在声明之前就使用这些变量，就会报错
// let和const 没有变量提升
