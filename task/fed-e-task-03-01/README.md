# fed-e-task-03-01
大前端part3 Vue.js 框架源码与进阶  
模块一 手写 Vue Router、手写响应式实现、虚拟 DOM 和 Diff 算法  
作业

## 一、简答题
1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。  

不是响应式的。

Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。

可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property。即可以向根级别的下一级属性增加响应式 property。
例如
```
Vue.set(vm.someObject, 'b', 2)
// 或者
this.$set(this.someObject, 'b', 2)
```
内部原理  
set 里面调用了 defineReactive 把这个增加的属性转换成 getter/setter

2、请简述 Diff 算法的执行过程  

执行过程  
* 在进行同级别节点比较的时候，首先会对新老节点数组的开始和结尾节点设置标记索引，遍历的过程中移动索引  
* 在对开始和结束节点比较的时候，总共有四种情况  
    * oldStartVnode/newStartVnode (旧开始节点/新开始节点)  
    * oldEndVnode/newEndVnode (旧结束节点/新结束节点)  
    * oldStartVnode/newEndVnode (旧开始节点/新结束节点)  
    * oldEndVnode/newStartVnode (旧结束节点/新开始节点)  
* 开始节点和结束节点比较，这两种情况类似  
    * oldStartVnode/newStartVnode (旧开始节点/新开始节点)  
    * oldEndVnode/newEndVnode (旧结束节点/新结束节点)  
* 如果 oldStartVnode 和 newStartVnode 是 sameVnode（key 和 sel 相同）  
    * 调用 patchVnode() 对比和更新节点  
    * 把旧开始和新开始索引往后移动 oldStartIdx++ / oldEndIdx++  
* oldStartVnode/newEndVnode (旧开始节点/新结束节点) 相同  
    * 调用 patchVnode() 对比和更新节点  
    * 把 oldStartVnode 对应的 DOM 元素，移动到右边  
    * 更新索引  
* oldEndVnode/newStartVnode (旧结束节点/新开始节点) 相同
    * 调用 patchVnode() 对比和更新节点  
    * 把 oldEndVnode 对应的 DOM 元素，移动到左边  
    * 更新索引  
* 如果不是以上四种情况  
    * 遍历新节点，使用 newStartVnode 的 key 在老节点数组中找相同节点  
    * 如果没有找到，说明 newStartVnode 是新节点  
        * 创建新节点对应的 DOM 元素，插入到 DOM 树种  
    * 如果找到了  
        * 判断新节点和找到的老节点的 sel 选择器是否相同  
        * 如果不相同，说明节点被修改了  
            * 重新创建对应的 DOM 元素，插入到 DOM 树中  
        * 如果相同，把 elmToMove 对应的 DOM 元素，移动到左边  
* 循环结束  
    * 当老节点的所有子节点先遍历完（oldStartIdx > oldEndIdx），循环结束  
    * 当新节点的所有子节点先遍历完（newStartIdx > newEndIdx），循环结束  
* 如果老节点的数组先遍历完（oldStartIdx > oldEndIdx），说明新节点有剩余，把剩余节点批量插入到右边  
* 如果新节点的数组先遍历（newStartIdx > newEndIdx），说明老节点有剩余，把剩余节点批量删除


## 二、编程题
1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。  

hash模式主要通过 window.location.hash 和 hashchange 实现  

具体实现见代码  
[code/my-vue-router](https://github.com/shissan/lagou-web/tree/master/task/fed-e-task-03-01/code/my-vue-router/src/vue-router/index.js)

2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

compiler.js
```
update (node, key, attrName) {
  let updateFn
  // v-on:click="counter += 1"
  // v-on:click="greet" 方法名
  if (attrName.startsWith('on')) {
    let eventType = attrName.split(':')[1]
    updateFn = this.onUpdater
    updateFn && updateFn.call(this, node, this.vm[key], eventType)
  } else {
    // 其他
    updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }
}

// v-html
htmlUpdater (node, value, key) {
  node.innerHTML = value

  new Watcher(this.vm, key, (newValue) => {
    node.innerHTML = newValue
  })
}

// v-on
// 第一种情况：v-on:click="greet"
// 第二种情况：v-on:click="greet('test', $event)"
// 第三种情况：v-on:click="count += 1"
// 第四种情况：v-on:click="function(){count += 1}"
// 目前只会第一种
onUpdater (node, eventHandler, eventType) {
  node.addEventListener(eventType, eventHandler)
}
```
vue.js
```
constructor (options) {
  ...
  // 把methods中的方法注入到vue实例中
  // compiler里面有用到methods中的方法 所以得写在compiler前面
  this._proxyMethods(options.methods)
}
_proxyMethods(methods) {
  Object.keys(methods).forEach(key => {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get () {
        return methods[key]
      }
    })
  })
}
```
完整代码  
[code/my-vue](https://github.com/shissan/lagou-web/tree/master/task/fed-e-task-03-01/code/my-vue)

3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果

[code/snabbdom-demo](https://github.com/shissan/lagou-web/tree/master/task/fed-e-task-03-01/code/snabbdom-demo)
