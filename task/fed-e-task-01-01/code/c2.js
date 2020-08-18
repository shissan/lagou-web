const fp = require('lodash/fp')

const cars = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 185000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]

// 练习1：使用函数组合 fp.flowRight() 重新实现下面这个函数

// let isLastInStock = function (cars) {
//   let last_car = fp.last(cars)
//   return fp.prop('in_stock', last_car)
// }

/* 说明：flowRight 从右到左执行， 执行last获取最后一条数据 把结果传给prop1 再取到对应的属性值 */
const isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)

console.log(isLastInStock(cars))



// 练习2：使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name

/* 说明：flowRight 从右到左执行， 执行first获取第一条数据 把结果传给prop2 再取到对应的属性值 */
const isFirstName = fp.flowRight(fp.prop('name'), fp.first)

console.log(isFirstName(cars))



// 练习3：使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现

/* 说明：用map循环数组 取到dollar_value并返回，得到dollar_value数组，再传给_average求平均值 */
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}
// let averageDollarValue = function (cars) {
//   let dollar_values = fp.map(function (car) {
//     return car.dollar_value
//   }, cars)
//   return _average(dollar_values)
// }

let averageDollarValue = fp.flowRight(_average, fp.map(c => c.dollar_value))

console.log(averageDollarValue(cars))





// 练习4：使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串，把数组中的 name 转换为这种形式：
// 例如：sanitizeNames(["Hello World"]) => ["hello_world"]

/* 说明：map循环数组，把每一项item的name 先转成小写再用下划线替换空格，最后返回item */
let _underscore = fp.replace(/\W+/g, '_')
let _sanitizeName = fp.flowRight(_underscore, fp.toLower)
let fn = item => {
  item.name = _sanitizeName(item.name)
  return item
}
let sanitizeNames = cars => fp.map(fn, cars)

console.log(sanitizeNames(cars))