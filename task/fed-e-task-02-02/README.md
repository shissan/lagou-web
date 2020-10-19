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
Loader：接收到数据（标识的文件，转换的loader）。告诉 webpack 碰到标识的文件后缀的相应文件时，在打包之前，先使用指定的 loader 转换一下，返回 JavaScript 代码。完成资源文件从输入到输出的转换。

Plugin：通过在生命周期的钩子中挂载函数实现扩展。开发一个插件就是实现一个函数或者是一个包含 apply 方法的对象，然后把他们挂载到相应的生命周期。

## 二、编程题
1. 使用 Webpack 实现 Vue 项目打包任务  
[code/vue-app-base](https://github.com/shissan/lagou-web/tree/master/task/fed-e-task-02-02/code/vue-app-base)

2. 项目说明文档
