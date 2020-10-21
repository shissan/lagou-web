# fed-e-task-02-02
大前端part2 前端工程化实战
模块二 模块化开发与规范化标准  
作业

## 一、简答题
1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。  
构建流程  
1. 根据配置，识别入口文件；
2. 从 entry 开始，递归解析 entry 依赖的所有 module；
3. 每找到一个 module，就会根据 module.rules 里配置的 Loader 规则进行相应的转换处理，对 module 进行转换后，再解析出当前 module 依赖的 module，这些 module 会以 entry 为单位进行分组，即为一个chunk。一个chunk，就是一个 entry 及其所有依赖的 module 合并的结果；
4. 将所有的 chunk 转换成文件输出 output；
5. 在整个构建流程中，Webpack 会在恰当的时机执行 plugin 里定义的逻辑，从而完成 plugin 插件的优化任务。

2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。  
不同  
Loader：可以将所有类型的文件转换为 webpack 能够处理的有效模块（webpack 自身只理解 JavaScript）。

Plugin：可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

思路  
Loader：每个 Loader 都需要导出一个函数，接收的参数是加载到的资源文件的内容，返回的是此次加工过后的结果。webpack 加载资源的过程，类似一个工作管道，可以依次使用多个 Loader，但是最终这个管道的工作结果必须是一段 JavaScript 代码。完成资源文件从输入到输出的转换。

Plugin：通过在生命周期的钩子中挂载函数实现扩展。开发一个插件就是实现一个函数或者是一个包含 apply 方法的对象，然后把他们挂载到相应的生命周期。

## 二、编程题
1. 使用 Webpack 实现 Vue 项目打包任务  
[code/vue-app-base](https://github.com/shissan/lagou-web/tree/master/task/fed-e-task-02-02/code/vue-app-base)

2. 项目说明文档
* 不同环境对应不同配置文件  
webpack.common.js 为公共配置  
webpack.dev.js 为开发环境配置  
webpack.prod.js 为生产环境配置

* vue-loader 与 vue-template-compiler 处理 vue 文件  
* babel-loader 与 @babel/preset-env 处理js文件  
* less、less-loader、css-loader、style-loader 处理 css 与 less 文件  
* file-loader 与 url-loader 处理文件、图片等静态资源  
* eslint-loader 是 eslint 需要的  
* VueLoaderPlugin 配合处理 vue 文件中的 script  
* mini-css-extract-plugin，提取 css 到单个文件  
* html-webpack-plugin 自动生成 HTML，绑定模板中使用的变量  
* DefinePlugin 可以指定代码中使用到的全局变量  
* webpack-dev-server 使用在开发环境，配置执行后自动在浏览器打开，并额外为开发服务器指定查找资源目录。开启 HMR 模块热替换  
* source-map 方便定位到源码错误，在开发环境使用  
* clean-webpack-plugin 在每次打包之前清除 dist 目录，在生产环境使用  
* copy-webpack-plugin 不需要构建的静态文件拷贝到 dist 目录，在生产环境使用
