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
//   // 获取最后一条数据
//   let last_car = fp.last(cars)
//   // 获取最后一条数据的 in_stock 属性值
//   return fp.prop('in_stock', last_car)
// }

const last = cars => fp.last(cars)
const prop1 = last_car => fp.prop('in_stock', last_car)
const isLastInStock = fp.flowRight(prop1, last)

console.log(isLastInStock(cars))



// 练习2：使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name

const first = cars => fp.first(cars)
const prop2 = first_car => fp.prop('name', first_car)
const isFirstName = fp.flowRight(prop2, first)

console.log(isFirstName(cars))



// 练习3：使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现

let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}
let averageDollarValue = function (cars) {
  let dollar_values = fp.map(function (car) {
    return car.dollar_value
  }, cars)
  return _average(dollar_values)
}

console.log(averageDollarValue(cars))



// 练习4：使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串，把数组中的 name 转换为这种形式：
// 例如：sanitizeNames(["Hello World"]) => ["hello_world"]

let _underscore = fp.replace(/\w+/g, '_')
let map = cars => fp.map((item) => {
  item.name = fp.toLower(item.name)
  return item
}, cars)
let sanitizeNames = cars => fp.flowRight(_underscore, map)