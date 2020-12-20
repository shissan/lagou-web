# VueRouter原理实现

## 一、Vue Router 基础回顾
**使用步骤**  

1. 注册路由插件  
Vue.use 是用来注册插件，接收一个参数，如果参数是函数的话，内部直接调用这个函数，来注册插件。如果参数是对象的话，内部会调用这个对象的 install 方法，来注册插件。
```
Vue.use(VueRouter)
```

2. 创建 router 对象  
需要把路由规则（routes）传递进来
```
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]

const router = new VueRouter({
  routes
})

export default router
```

3. 注册 router 对象  
main.js
```
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

4. 创建路由组件的占位  
app.vue
```
<router-view />
```

5. 创建链接  
```
<router-link to="/">Index</router-link>
```

**动态路由**  
```
{
  path: '/detail/:id',
  name: 'Detail',
  // 开启 props，会把 URL 中的参数传递给组件
  // 在组件中通过 props 来接收 URL 参数
  props: true,
  // 路由懒加载
  component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
}
```
方式1：通过当前路由规则获取：{{ $route.params.id }}  
方式2：通过开启 props 获取：{{ id }} (建议使用)

**嵌套路由**  
```
{
  path: '/',
  component: Layout,
  children: [
    {
      ...
    },
    {
      ...
    }
  ]
}
```

**编程式导航**  
```
this.$router.push('/')
this.$router.push({name: 'Home'})
this.$router.push({name: 'Detail', params: {id: 1}})
this.$router.replace('/login')
this.$router.go(-2)
```

## 二、Hash 模式和 History 模式
都是客户端路由的实现方式，路径发生变化的后，不会向服务器发送请求，是用 js 监视路径的变化。然后根据不同的地址渲染不同的内容。

表现形式的区别  
* Hash 模式带#号，默认

原理的区别  
* Hash 模式是基于锚点，以及 onhashchange 事件  
* History 模式是基于 HTML5 中的 History API  
history.pushState() （IE10以后才支持）  
history.replaceState()

1. History 模式的使用  
mode: 'history'  
* History 需要服务器的支持  
* 单页应用中，服务端不存在 http://www.testurl.com/login 这样的地址，会返回找不到该页面  
* 在服务端应该配置除了静态资源外都返回单页应用的 index.html

2. History 模式 - Node.js  
app.js
```
// 注册处理 history 模式的中间件
app.use(history())
```

3. History 模式 - Nginx  
nginx.conf
```
server {
  ...
  location / {
    ...
    try_files $uri $uri/ /index.html
  }
}
```

## 三、模拟实现自己的 Vue Router
1. Vue Router 实现原理  
Vue Router 是前端路由，当路径切换的时候，在浏览器端判断当前路径，并加载当前路径对应的组件

Hash 模式  
* URL 中 # 后面的内容作为路径地址，可以直接通过 url 来切换浏览器中的地址，如果只改变了路径中 # 号后面的内容，浏览器不会像服务器请求这个地址，但是它会把这个地址记录到浏览器的访问历史中  
* 监听 hashchange 事件，当 hash 发生改变后，会触发 hashchange 这个事件，在这个事件中可以记录当前的路由地址  
* 根据当前路由地址找到对应组件重新渲染

History 模式  
* 通过 history.pushState() 方法改变地址栏，并把当前地址记录到浏览器的访问历史中，并不会真正跳转到指定的路径，也就是浏览器不会向服务器发送请求  
* 监听 popstate 事件，可以监听到浏览器历史操作的变化，在 popstate 事件的处理函数中可以记录改变后的地址。pushState() 或 replaceState() 不会触发该事件，当点击浏览器的前进或后退按钮的时候，该事件才会被触发  
* 根据当前路由地址找到对应组件重新渲染

1. 模拟实现  
实现一个 VueRouter 类，有一个静态的 install 方法，VueRouter 构造函数接收一个参数，并且是个对象的形式

**intall**

**构造函数**

**createRouteMap**

**router-link**

**完整版的vue**
vue.config.js
```
module.exports = {
  runtimeCompiler: true
}
```
完整版的vue包含运行时和编译器，里面的编译器的就是把template编译成render函数

运行时版的vue在组件中我们要自己写render函数，不支持template

**render**
运行时版本的vue不带编译器，也就是不支持组件中的template选项，而编译器的作用就是把template编译成render函数，但在运行时vue版本中，组件中可以直接写render函数

**router-view**

**initEvent**