class Compiler {
  constructor (vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }

  // 编译模板，处理文本节点和元素节点
  compile (el) {
    let childNodes = el.childNodes // 伪数组
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)

      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node)
      }

      // 判断node节点，是否有子节点，如果有子节点，要递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点，处理指令
  compileElement (node) {
    // console.log(node.attributes)
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      // 获取指令名称 name
      let attrName = attr.name

      // 判断是否是指令
      if (this.isDirective(attrName)) {
        // v-text --> text
        attrName = attrName.substr(2)
        // 获取指令值就是data中的属性 value
        let key = attr.value

        this.update(node, key, attrName)
      }
    })
  }

  update (node, key, attrName) {
    let updateFn
    // v-on:click
    if (attrName.startsWith('on')) {
      let eventType = attrName.split(':')[1]
      updateFn = this.onUpdater
      updateFn && updateFn.call(this, node, this.vm[key], key, eventType)
    } else {
      // 其他
      updateFn = this[attrName + 'Updater']
      updateFn && updateFn.call(this, node, this.vm[key], key)
    }
  }

  // 处理 v-text 指令
  textUpdater (node, value, key) {
    node.textContent = value

    // 创建watch对象，当数据改变更新视图
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }

  // 处理 v-model 指令
  modelUpdater (node, value, key) {
    node.value = value

    // 创建watch对象，当数据改变更新视图
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })

    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

  // v-html
  htmlUpdater (node, value, key) {
    node.innerHTML = value

    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue
    })
  }

  // 第一种情况：v-on:click="greet"
  // 第二种情况：v-on:click="greet('test', $event)"
  // 第三种情况：v-on:click="count += 1"
  // 第四种情况：v-on:click="function(){count += 1}"
  onUpdater (node, eventHandler, key, eventType) {
    // 目前只能想到第一种
    if (eventHandler) {
      node.addEventListener(eventType, eventHandler)
    } else {

    }
  }

  // 编译文本节点，处理差值表达式
  compileText (node) {
    // console.dir(node)
    // {{msg }}
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
    
      // 创建watch对象，当数据改变更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }

  // 判断元素属性是否是指令
  isDirective (attrName) {
    return attrName.startsWith('v-')
  }

  // 判断节点是否是文本节点
  isTextNode (node) {
    return node.nodeType === 3
  }

  // 判断节点是否是元素节点
  isElementNode (node) {
    return node.nodeType === 1
  }
}