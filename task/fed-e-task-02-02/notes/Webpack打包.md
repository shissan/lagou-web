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
不需要构建的静态文件拷贝到输出目录 copy-webpack-plugin  // 开发阶段最好不要使用这个插件
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

Dev Server 默认只会 serve 打包输出文件  
只要是 Webpack 输出的文件，都可以直接被访问  
其他静态资源文件也需要 serve，需要额外的告诉 Webpack Dev Server

Webpack Dev Server 支持配置代理  
将 API 代理到开发服务器

```
devServer: {
  contentBase: './public'  // 额外为开发服务器指定查找资源目录
  proxy: {
    '/api': {
      // http://localhost:8080/api/users -> https://api.github.com/api/users
      target: 'https://api.github.com',
      // http://localhost:8080/api/users -> https://api.github.com/users
      pathRewrite: {
        '^/api': ''
      },
      // 不能使用 localhost:8080 作为请求 Github 的主机名
      changeOrigin: true
    }
  }
}
```

16. Source Map  
运行代码与源代码之间完全不同  
如果调试应用，错误信息无法定位，调试和报错都是基于运行代码（转换过后的代码）  
Source Map（源代码地图）：用来映射转换后的代码与源代码之间的关系  
Source Map 解决了源代码与运行代码不一致所产生的调试的问题  
配置：
```
devtool: 'source-map'
```
Webpack 支持12种不同的方式，每种方式生成的 Source Map 的效率和效果各不相同  

开发模式：cheap-module-eval-source-map  
生产打包：none  
Source Map 会暴露源代码，调试是开发阶段的事情

17. 自动刷新问题  
自动刷新导致的页面状态丢失  
最好的情况：页面不刷新的前提下，模块也可以及时更新

18. HMR 模块热替换  
热拔插：在一个正在运行的机器上随时插拔设备  
应用运行过程中实时替换某个模块，应用运行状态不受影响  
热替换只将修改的模块实时替换至应用中  
HMR 是 Webpack 中最强大的功能之一  
极大程度的提高了开发者的工作效率  

19. 开启 HMR  
集成在 Webpack Dev Server 中  
执行命令：webpack-dev-server --hot  
也可以通过配置文件开启
```
devServer: {
  hot: true
}
...
plugins: [
  ...
  new webpack.HotModuleReplacementPlugin()
]
```
Webpack 中的 HMR 并不可以开箱即用，需要手动处理模块热替换逻辑  
通过脚手架创建的项目内部都集成了 HMR 方案  
总结：样式文件的热更新可以开箱即用，JS 模块更新后的热替换需要手动处理

20. HMR APIs  
main.js
```
module.hot.accept('./editor', () => {
  console.log('editor 模块更新了，需要这里手动处理热替换逻辑')
})
```
处理 JS 模块热替换

处理图片模块热替换  

21. HMR 注意事项  
* 处理 HMR 的代码报错会导致自动刷新  
解决：
```
devServer: {
  hotOnly: true
}
```
* 没启用 HMR 的情况下，HMR API 会报错  
* 代码中多了一些与业务无关的代码

22. 生产环境优化  
生产环境和开发环境有很大的差异  
生产环境注重运行效率  
开发环境注重开发效率

模式（mode）  
为不同的工作环境创建不同的配置  
* 配置文件根据环境不同导出不同配置  
* 一个环境对应一个配置文件  
```
webpack.config.js

module.exports = (env, argv) => {
  const config = {
    // 开发模式
  }

  if (env === 'production') {
    config.mode = 'production'
    config.devtool = false
    config.plugins = [
      ...config.plugins,
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin(['public'])
    ]
  }

  return config
}

// 执行命令 yarn webpack --env production
```

23. 多配置文件  
不同环境对应不同配置文件  
webpack.common.js  
webpack.dev.js  
webpack.prod.js  
运行命令：yarn webpack --config webpack.prod.js

24. DefinePlugin  
为代码注入全局成员  
process.env.NODE_ENV  
```
plugins: [
  new webpack.DefinePlugin({
    API_BASE_URL: JSON.stringify('https://api.example.com')
  })
]
```

25. Tree Shaking  
「摇掉」代码中未引用部分  
未引用代码（dead-code）  
生产模式下自动开启  
Tree Shaking 不是指某个配置选项，是一组功能搭配使用后的优化效果  
```
// webpack.config.js

optimization: {
  usedExports: true,  // 复制标记「枯树叶」
  minimize: true  // 负责「摇掉」它们
}
``` 

26. 合并模块  
concatenateModules  
尽可能的将所有模块合并并输出到一个函数中  
既提升了运行效率，又减少了代码的体积  
又称为 Scope Hoisting（作用域提升）  
```
// webpack.config.js

optimization: {
  usedExports: true,
  concatenateModules: true,
  minimize: true
}
``` 

27. Tree Shaking 与 Babel  
Tree Shaking 前提是 ES Modules  
由 Webpack 打包的代码必须使用 ESM  
为了转换代码中的 ECMAScript 新特性，很多时候会选择 babel-loader 去处理 js  
babel 在转换代码时，可能处理掉我们代码中的 ES Modules，转换为 CommonJS，Tree Shaking可能不生效  
最新版本的 babel-loader 自动关闭了 ES Modules 转换的插件，不会导致 Tree Shaking失效  
老版本处理：
```
presets: [
  ['@babel/preset-env', {modules: false}]
]
```

28. sideEffects 副作用  
副作用：模块执行时除了导出成员之外所作的事情  
sideEffects 一般用于 npm 包标记是否有副作用  
```
// webpack.config.js

optimization: {
  sideEffects: true
}

// package.json
"sideEffects": false
``` 
注意：确保你的代码真的没有副作用

29. Code Spliting 代码分割  
bundle 体积过大  
并不是每个模块在启动时都是必要的  
分包，按需加载  

HTTP 1.1 缺陷  
* 同域并行请求限制  
* 每次请求都会有一定的延迟  
* 请求的 Header 浪费带宽流量

模块打包是必要的  

30. 多入口打包  
多页应用程序  
一个页面对应一个打包入口  
公共部分单独提取  
```
// webpack.config.js

entry: {
  index: './src/index.js',
  album: './src/album.js'
},
output: {
  filename: '[name].bundle.js'
},
plungins: [
  new HtmlWebpackPlugin({
    title: 'Multi Entry',
    template: './src/index.html',
    filename: 'index.html',
    chunks: ['index']  // 在输出的html中指定我们需要注入的bundle
  }),
  new HtmlWebpackPlugin({
    title: 'Multi Entry',
    template: './src/album.html',
    filename: 'album.html',
    chunks: ['album']
  })
]
```
不同入口中肯定会有公共模块  
提取公共模块  
```
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```

31. 动态导入  
按需加载  
需要用到某个模块时，再加载这个模块  

动态导入的模块会被自动分包  
```
import('./posts/posts').then(({ default: posts}) => {
  mainElement.appendChild(post())
})
```

32. 魔法注释  
```
import(/* webpackChunkName: 'posts' */'./posts/posts').then(({ default: posts}) => {
  mainElement.appendChild(post())
})
```

33. MiniCssExtractPlugin  
提取 css 到单个文件  
MiniCssExtractPlugin.loader

34. OptimizeCssAssetsWebpackPlugin  
压缩 css  
```
optimization: {
  minimizer: {
    new TerserWebpackPlugin(),  // 压缩 js
    new OptimizeCssAssetsWebpackPlugin()
  }
}
```

35. 输出文件名 Hash  
生产模式下，文件名使用 Hash  
```
// filename: '[name]-[hash].bundle.css'
// filename: '[name]-[chunkhash].bundle.css'  // 解决缓存问题的最好的方式
// filename: '[name]-[contenthash].bundle.css'
// filename: '[name]-[contenthash:8].bundle.css'
```












