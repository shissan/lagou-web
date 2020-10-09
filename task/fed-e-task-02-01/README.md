# fed-e-task-02-01
大前端part2 前端工程化实战
模块一 开发脚手架及封装自动化构建工作流
作业

## 简单题
### 一、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。
认识  
web业务日益复杂化和多元化，各种问题也随之而来。前端工程化是使用软件工程的技术和方法来进行前端的开发流程、技术、工具、经验等规范化、标准化，其主要目的为了提高效率和降低成本，即提高开发过程中的开发效率，减少不必要的重复工作时间。

解决的问题或者带来的价值  
1. 传统语言或语法的弊端  
2. 无法使用模块化/组件化  
3. 重复的机械式工作  
4. 代码风格统一、质量保证  

### 二、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？
提高了项目规范和约定，利于维护

## 编程题
### 一、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具
脚手架实现的过程  
1. 通过命令行交互询问用户问题  
2. 根据用户回答的结果生成文件  
* 将模板下的文件全部转换到目标目录  
* 通过模板引擎渲染文件  
* 将结果写入目标文件路径

小型脚手架工具地址
[code/simple-node-cli](https://github.com/shissan/lagou-web/blob/master/task/fed-e-task-02-01/code/simple-node-cli)

### 二、尝试使用 Gulp 完成项目的自动化构建
[code/pages-boilerplate](https://github.com/shissan/lagou-web/blob/master/task/fed-e-task-02-01/code/pages-boilerplate)

### 三、使用 Grunt 完成项目的自动化构建
后面补上

## 项目说明文档
构建过程核心工作原理: 读取流(src()) -> 转换流(插件) -> 写入流(dest())  

1. 自动加载 gulp 插件  
使用 gulp-load-plugins 可以自动加载 gulp 插件，不用每次都require

2. 样式编译  
使用 gulp-sass 对 sass 进行解析

3. 脚本编译  
使用 gulp-babel、@babel/core、@babel/preset-env 对 es6 进行转换

4. 页面模板编译  
使用 gulp-swig 对模板进行解析

5. 图片与字体  
使用 gulp-imagemin 进行压缩处理

6. 清除  
使用del，完成一些不用的代码的清除工作

7. 开发服务器  
使用 browser-sync 启动项目进行预览调试，使用 gulp 的 watch 方法 和 browserSync.create().reload 实现热更新

8. 文件引用处理  
使用 gulp-useref 处理对生成代码中 html 文件引用路径问题，然后使用 gulp-if 和不同的压缩工具 gulp-uglify（压缩js），gulp-clean-css（压缩css），gulp-htmlmin（压缩html）对生成代码进行压缩

9. lint  
使用 gulp-sass-lint, gulp-eslint 对样式和 js 文件进行代码检测

10. 部署  
使用 gulp-git-deploy 进行 git 部署

11. 构建  
使用 gulp 提供的 parallel, series 方法组合任务，完成整个项目自动化构建
