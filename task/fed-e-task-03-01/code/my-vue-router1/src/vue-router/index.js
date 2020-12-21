let _Vue = null
class VueRouter {
  static install (Vue) {
    // 1 判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2 把Vue的构造函数记录在全局
    _Vue = Vue
    // 3 把创建Vue的实例传入的router对象注入到Vue实例
    // _Vue.prototype.$router = this.$options.router
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    // 路由模式
    this.mode = this.options.mode || 'hash'
    this.routeMap = {}

    // 有不是在首页刷新的情况，需记录当前url
    let currentPath = ''
    if (this.mode === 'hash') {
      currentPath = window.location.hash.substr(1) || '/'
      window.location.hash = '#' + currentPath
    } else {
      currentPath = window.location.pathname
    }

    // observable
    this.data = _Vue.observable({
      current: currentPath || '/'
    })

    this.init()
  }

  init () {
    this.createRouteMap()
    this.initComponent(_Vue)
    this.initEvent()
  }

  createRouteMap () {
    // 遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponent (Vue) {
    const self = this

    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickhander
          }
        }, [this.$slots.default])
      },
      methods: {
        clickhander (e) {
          if (self.mode === 'hash') {
            window.location.hash = '#' + this.to
          } else {
            history.pushState({}, '', this.to)
          }
          // 点击页面按钮记录current
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
      // template:"<a :href='to'><slot></slot><>"
    })

    Vue.component('router-view', {
      render (h) {
        // self.data.current
        const cm = self.routeMap[self.data.current]
        return h(cm)
      }
    })
  }

  initEvent () {
    // 操作浏览器前进或者后退按钮时，记录current
    if (this.mode === 'hash') {
      window.addEventListener('hashchange', () => {
        this.data.current = window.location.hash.substr(1)
      })
    } else {
      window.addEventListener('popstate', () => {
        this.data.current = window.location.pathname
      })
    }
  }
}

export default VueRouter
