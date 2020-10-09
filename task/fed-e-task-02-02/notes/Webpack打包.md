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
Loader 负责资源文件从输入到输出的转换  
对于同一个资源可以依次使用多个 Loader  
Loader 返回 JavaScript 代码 或者 接着用 其他的 Loader 处理

10. 插件机制介绍  
增强 Webpack 自动化能力  
Loader 专注实现资源模块加载

Plugin 解决其他自动化工作  
* 清除 dist 目录  
* 拷贝静态文件至输出目录  
* 压缩输出代码

Webpack + Plugin 实现大多前端工程化工作

11. 常用插件  
自动清除输出目录的插件 clean-webpack-plugin  
自动生成HTML插件（自动生成使用bundle.js的HTML） html-webpack-plugin  
不需要构建的静态文件拷贝到输出目录 copy-webpack-plugin
需要 -> 关键词 -> 搜索

12. 开发一个插件  
相比于 Loader，Plugin 拥有更宽的能力范围  
Plugin 通过钩子机制实现  
插件：一个函数或者是一个包含 apply 方法的对象  
```
class MyPlugin {
  apply (compiler) {
    console.log('MyPlugin 启动')

    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        // console.log(name)
        // console.log(compilation.assets[name].source())
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length
          }
        }
      }
    })
  }
}
```
通过在生命周期的钩子中挂载函数实现扩展

13. 开发体验   
* 以 HTTP Server 运行  
* 自动编译 + 自动刷新  
* 提供 Source Map 支持

14. 如何增强 Webpack 开发体验  
**实现自动编译**  
wacth 工作模式（yarn webpack --watch）  
监听文件变化，自动重新打包  
**实现自动刷新浏览器**  
BrowserSync（browser-sync dist --files "**/*"）
操作麻烦，效率低  
webpack不断的将文件写入磁盘，BrowserSync再从磁盘中读出来

15. Webpack Dev Server
集成「自动编译」和「自动刷新浏览器」等功能  
打包结果暂时存放在内存当中











