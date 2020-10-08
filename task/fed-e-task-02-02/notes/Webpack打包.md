# Webpack打包

## 一、模块打包工具的由来
ES Modules 存在环境兼容问题  
模块文件过多，网络请求频繁  
所有的前端资源都需要模块化  
无容置疑，模块化是必要的

* 新特性代码编译  
* 模块化 JavaScript 打包  
* 支持不同类型的资源模块

## 二、模块打包工具概要
Webpack  
模块打包器（Module bundler）  
模块加载器（Loader）  
代码拆分（Code Splitting）  
资源模块（Asset Module）

打包工具解决的是前端整体的模块化，并不单指 JavaScript 模块化

## 三、Webpack 快速上手
webpack.config.js
```
const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```
1. 资源模块加载  
Loader 是 Webpack 的核心特性，借助于 Loader 就可以加载任何类型的资源

2. 导入资源模块  
打包入口 -> 运行入口  
JavaScript 驱动整个前端应用的业务  
根据代码的需要动态导入资源，需要资源的不是应用，而是代码  
* 逻辑合理，JS 确实需要这些资源文件  
* 确保上线资源不缺失，都是必要的  
新事物的思想才是突破点

3. 文件资源加载器  
file-loader  
```
const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.png$/,
        use: 'file-loader'
      }
    ]
  }
}
```

4. URL 加载器  
Data URLs  
url-loader  
```
{
  test: /.png$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10 * 1024 // 10 KB
    }
  }
}
```
小文件使用 Data URLs，减少请求次数  
大文件单独提取存放，提高加载速度

5. 常用加载器分类  
* 编译转换类  
* 文件操作类  
* 代码检查类

6. 处理 ES2015  
因为模块打包需要，所以处理 import 和 export  
babel-loader @babel/core @babel/preset-env  
```
{
  test: /.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
},
```

* Webpack 只是打包工具  
* 加载器可以用来编译转换代码

7. 模块加载方式/加载资源的方式  
* 遵循 ES Modules 标准的 import 声明  
* 遵循 CommonJS 标准的 require 函数  
* 遵循 AMD 标准的 define 函数和 require 函数  

Loader 加载非 JavaScript 也会触发资源加载  
* 样式代码中的 @import 指令和 url 函数  
* HTML 代码中图片标签的 src 属性
```
{
  test: /.html$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: ['img:src', 'a:href']
    }
  }
}
```
8. 核心工作原理  
Loader 机制是 Webpack 的核心

9. Loader 的工作原理









