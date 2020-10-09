// 实现这个项目的构建任务

const { src, dest, series, parallel, watch } = require('gulp')
// 文件清除
const del = require('del')

// 自动加载gulp插件
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

// 开发服务器
const browserSync = require('browser-sync')
const bs = browserSync.create()

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

// 文件清除
const clean = () => {
  return del(['dist', 'temp'])
}

// 样式编译
const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
    .pipe(bs.reload( {stream: true} ))
}

// 脚本编译
const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
    .pipe(bs.reload( {stream: true} ))
}

// 页面模板编译
const page = () => {
  return src('src/*.html', {base: 'src'})
    .pipe(plugins.swig({ data, defaults: {cache: false}}))  // 防止缓存导致页面不能及时更新
    .pipe(dest('temp'))
    .pipe(bs.reload( {stream: true} ))
}

// 图片压缩
const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

// 字体文件压缩
const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

// 其他文件
const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

// 开发服务器
const serve = () => {
  // 监听变化
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  bs.init({
    notify: false,
    port: 2080,
    server: {
      baseDir: ['temp', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

// 文件引用处理
const useref = () => {
  return src('temp/*.html', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    // html js css 压缩
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('dist'))
}

// 部署
const deploy = () => {
  return plugins.gitDeploy({ remote: 'origin', name: 'master' })
}

// 检查js语法错误
const eslint = () => {
  return src('src/assets/scripts/*.js')
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError())
}

// 检查sass语法错误
const sassLint = () => {
  return src('src/assets/styles/*.scss')
    .pipe(plugins.sassLint())
    .pipe(plugins.sassLint.format())
}

const lint = parallel(eslint, sassLint)

// 组合任务
const compile = parallel(style, script, page)

// 上线之前执行的任务
const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

// 开发任务
const start = series(compile, serve)

module.exports = {
  clean,
  build,
  serve,
  start,
  lint,
  deploy
}
