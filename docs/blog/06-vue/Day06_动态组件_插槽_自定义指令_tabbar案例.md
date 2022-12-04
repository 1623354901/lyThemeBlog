# Day06

## 1. 组件进阶

### 1.0 组件进阶 - 动态组件

> 目标: 多个组件使用同一个挂载点，并动态切换，这就是动态组件

```vue
<template>
  <div>
      <button @click="comName = 'UserName'">账号密码填写</button>
      <button @click="comName = 'UserInfo'">个人信息填写</button>

      <p>下面显示注册组件-动态切换:</p>
      <div style="border: 1px solid red;">
          <component :is="comName"></component>
      </div>
  </div>
</template>

<script>
// 目标: 动态组件 - 切换组件显示
// 场景: 同一个挂载点要切换 不同组件 显示
// 1. 创建要被切换的组件 - 标签+样式
// 2. 引入到要展示的vue文件内, 注册
// 3. 变量-承载要显示的组件名
// 4. 设置挂载点<component :is="变量"></component>
// 5. 点击按钮-切换comName的值为要显示的组件名

import UserName from '../components/01/UserName'
import UserInfo from '../components/01/UserInfo'
export default {
    data(){
        return {
            comName: "UserName"
        }
    },
    components: {
        UserName,
        UserInfo
    }
}
</script>
```

> 总结: vue内置component组件, 配合is属性, 设置要显示的组件名字

### 1.1 组件进阶 - 组件缓存

> 目标: 组件切换会导致组件被频繁销毁和重新创建, 性能不高

使用Vue内置的keep-alive组件, 可以让包裹的组件保存在内存中不被销毁

演示1: 可以先给UserName.vue和UserInfo.vue 注册created和destroyed生命周期事件, 观察创建和销毁过程

演示2: 使用keep-alive内置的vue组件, 让动态组件缓存而不是销毁

语法:

​		Vue内置的keep-alive组件 包起来要频繁切换的组件

02_UseDynamic.vue

```vue
<div style="border: 1px solid red;">
    <!-- Vue内置keep-alive组件, 把包起来的组件缓存起来 -->
    <keep-alive>
        <component :is="comName"></component>
    </keep-alive>
</div>
```

补充生命周期:

* activated - 激活
* deactivated - 失去激活状态

> 总结: keep-alive可以提高组件的性能, 内部包裹的标签不会被销毁和重新创建, 触发激活和非激活的生命周期方法

### 1.2 组件进阶 - 激活和非激活

> 目标: 被缓存的组件不再创建和销毁, 而是激活和非激活

补充2个钩子方法名:

​	activated – 激活时触发

​	deactivated – 失去激活状态触发

### 1.3 组件进阶 - 组件插槽

> 目标: 用于实现组件的内容分发, 通过 slot 标签, 可以接收到写在组件标签内的内容

vue提供组件插槽能力, 允许开发者在封装组件时，把不确定的部分定义为插槽

语法口诀: 

1. 组件内用<slot></slot>占位
2. 使用组件时<Pannel></Pannel>夹着的地方, 传入标签替换slot

views/03_UseSlot.vue - 组件插槽使用

> 总结: 组件内容分发技术, slot占位, 使用组件时传入替换slot位置的标签

### 1.4 组件进阶 - 插槽默认内容

> 目标: 如果外面不给传, 想给个默认显示内容

口诀: <slot>夹着内容默认显示内容, 如果不给插槽slot传东西, 则使用<slot>夹着的内容在原地显示

```vue
<slot>默认内容</slot>
```

### 1.5 组件进阶 - 具名插槽

> 目标: 当一个组件内有2处以上需要外部传入标签的地方

传入的标签可以分别派发给不同的slot位置

要求: v-slot一般用跟template标签使用 (template是html5新出标签内容模板元素, 不会渲染到页面上, 一般被vue解析内部标签)

components/04/Pannel.vue - 留下具名slot

```vue
<template>
  <div>
    <!-- 按钮标题 -->
    <div class="title">
      <slot name="title"></slot>
      <span class="btn" @click="isShow = !isShow">
        {{ isShow ? "收起" : "展开" }}
      </span>
    </div>
    <!-- 下拉内容 -->
    <div class="container" v-show="isShow">
     <slot name="content"></slot>
    </div>
  </div>
</template>
```

views/04_UseSlot.vue使用

```vue
<template>
  <div id="container">
    <div id="app">
      <h3>案例：折叠面板</h3>
      <Pannel>
        <template v-slot:title>
          <h4>芙蓉楼送辛渐</h4>
        </template>
        <template v-slot:content>
          <img src="../assets/mm.gif" alt="">
          <span>我是内容</span>
        </template>
      </Pannel>
      <Pannel>
        <template #title>
          <span style="color: red;">我是标题</span>
        </template>
        <template #content>
          <p>寒雨连江夜入吴,</p>
          <p>平明送客楚山孤。</p>
          <p>洛阳亲友如相问，</p>
          <p>一片冰心在玉壶。</p>
        </template>
      </Pannel>
    </div>
  </div>
</template>

<script>
import Pannel from "../components/04/Pannel";
export default {
  components: {
    Pannel,
  },
};
</script>
```

==v-slot可以简化成#使用==

> v-bind可以省略成:    v-on: 可以省略成@   那么v-slot: 可以简化成#

> 总结: slot的name属性起插槽名, 使用组件时, template配合#插槽名传入具体标签

### 1.6 组件进阶 - 作用域插槽

> 目标: 子组件里值, 在给插槽赋值时在父组件环境下使用

复习: 插槽内slot中显示默认内容

例子: 默认内容在子组件中, 但是父亲在给插槽传值, 想要改变插槽显示的默认内容

口诀: 

1. 子组件, 在slot上绑定属性和子组件内的值
2. 使用组件, 传入自定义标签, 用template和v-slot="自定义变量名" 
3. scope变量名自动绑定slot上所有属性和值

components/05/Pannel.vue - 定义组件, 和具名插槽, 给slot绑定属性和值 

```vue
<template>
  <div>
    <!-- 按钮标题 -->
    <div class="title">
      <h4>芙蓉楼送辛渐</h4>
      <span class="btn" @click="isShow = !isShow">
        {{ isShow ? "收起" : "展开" }}
      </span>
    </div>
    <!-- 下拉内容 -->
    <div class="container" v-show="isShow">
     <slot :row="defaultObj">{{ defaultObj.defaultOne }}</slot>
    </div>
  </div>
</template>

<script>
// 目标: 作用域插槽
// 场景: 使用插槽, 使用组件内的变量
// 1. slot标签, 自定义属性和内变量关联
// 2. 使用组件, template配合v-slot="变量名"
// 变量名会收集slot身上属性和值形成对象
export default {
  data() {
    return {
      isShow: false,
      defaultObj: {
        defaultOne: "无名氏",
        defaultTwo: "小传同学"
      }
    };
  },
};
</script>
```

views/05_UseSlot.vue

```vue
<template>
  <div id="container">
    <div id="app">
      <h3>案例：折叠面板</h3>
      <Pannel>
        <!-- 需求: 插槽时, 使用组件内变量 -->
        <!-- scope变量: {row: defaultObj} -->
        <template v-slot="scope">
          <p>{{ scope.row.defaultTwo }}</p>
        </template>
      </Pannel>
    </div>
  </div>
</template>

<script>
import Pannel from "../components/05/Pannel";
export default {
  components: {
    Pannel,
  },
};
</script>
```

> 总结: 组件内变量绑定在slot上, 然后使用组件v-slot="变量"  变量上就会绑定slot身上属性和值

### 1.7 组件进阶 - 作用域插槽使用场景

> 目标: 了解作用域插槽使用场景, 自定义组件内标签+**内容**

案例: 封装一个表格组件, 在表格组件内循环产生单元格

准备MyTable.vue组件 – 内置表格, 传入数组循环铺设页面, 把对象每个内容显示在单元格里

准备UseTable.vue – 准备数据传入给MyTable.vue使用

components/06/MyTable.vue - 模板(==直接复制==)

```vue
<template>
  <div>
      <table border="1">
          <thead>
              <tr>
                  <th>序号</th>
                  <th>姓名</th>
                  <th>年龄</th>
                  <th>头像</th>
              </tr>
          </thead>
          <thead>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
          </thead>
      </table>
  </div>
</template>

<script>
export default {

}
</script>
```

views/06_UseTable.vue - 准备数据, 传入给MyTable.vue组件里循环使用

```js
list: [
    {
        name: "小传同学",
        age: 18,
        headImgUrl:
        "http://yun.itheima.com/Upload/./Images/20210303/603f2d2153241.jpg",
    },
    {
        name: "小黑同学",
        age: 25,
        headImgUrl:
        "http://yun.itheima.com/Upload/./Images/20210304/6040b101a18ef.jpg",
    },
    {
        name: "智慧同学",
        age: 21,
        headImgUrl:
        "http://yun.itheima.com/Upload/./Images/20210302/603e0142e535f.jpg",
    },
],
```

例子: 我想要给td内显示图片, 需要传入自定义的img标签

![image-20210511170436114](./images/image-20210511170436114.png)

正确做法:	

​	在MyTable.vue的td中准备<slot>占位, 但是外面需要把图片地址赋予给src属性,所以在slot上把obj数据绑定



​	在UseTable使用MyTable的时候, template上v-slot绑定变量, 传入img组件设置图片地址

```vue
<template>
  <div>
    <MyTable :arr="list"></MyTable>
    <MyTable :arr="list">
        <!-- scope: {row: obj} -->
       <template v-slot="scope">
            <a :href="scope.row.headImgUrl">{{ scope.row.headImgUrl }}</a>
       </template>
    </MyTable>
    <MyTable :arr="list">
       <template v-slot="scope">
            <img style="width: 100px;" :src="scope.row.headImgUrl" alt="">
       </template>
    </MyTable>
  </div>
</template>

<script>
import MyTable from "../components/06/MyTable";
export default {
  components: {
    MyTable,
  },
  data() {
    return {
      list: [
        {
          name: "小传同学",
          age: 18,
          headImgUrl:
            "http://yun.itheima.com/Upload/./Images/20210303/603f2d2153241.jpg",
        },
      ],
    };
  },
};
</script>
<style>
</style>
```

> 总结: 插槽可以自定义标签, 作用域插槽可以把组件内的值取出来自定义内容

## 2. 自定义指令

[自定义指令文档](https://www.vue3js.cn/docs/zh/guide/custom-directive.html)

除了核心功能默认内置的指令 (`v-model` 和 `v-show`)，Vue 也允许注册自定义指令。 `v-xxx`  

html+css的复用的主要形式是组件

你需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令

### 2.0 自定义指令-注册

> 目标: 获取标签, 扩展额外的功能

> ### 局部注册和使用

07_UseDirective.vue - 只能在当前组件.vue文件中使用

```vue
<template>
  <div>
      <!-- <input type="text" v-gfocus> -->
      <input type="text" v-focus>
      
  </div>
</template>

<script>
// 目标: 创建 "自定义指令", 让输入框自动聚焦
// 1. 创建自定义指令
// 全局 / 局部
// 2. 在标签上使用自定义指令  v-指令名
// 注意:
// inserted方法 - 指令所在标签, 被插入到网页上触发(一次)
// update方法 - 指令对应数据/标签更新时, 此方法执行
export default {
    data(){
        return {
            colorStr: 'red'
        }
    },
    directives: {
        focus: {
            inserted(el){
                el.focus()
            }
        }
    }
}
</script>

<style>

</style>
```

> ### 全局注册

在main.js用 Vue.directive()方法来进行注册, 以后随便哪个.vue文件里都可以直接用v-fofo指令

```js
// 全局指令 - 到处"直接"使用
Vue.directive("gfocus", {
  inserted(el) {
    el.focus() // 触发标签的事件方法
  }
})
```

> 总结: 全局注册自定义指令, 哪里都能用, 局部注册, 只能在当前vue文件里用

### 2.1 自定义指令-传值

> 目标: 使用自定义指令, 传入一个值

需求: 定义color指令-传入一个颜色, 给标签设置文字颜色

main.js定义处修改一下

```js
// 目标: 自定义指令传值
Vue.directive('color', {
  inserted(el, binding) {
    el.style.color = binding.value
  },
  update(el, binding) {
    el.style.color = binding.value
  }
})
```

Direct.vue处更改一下

```vue
<p v-color="colorStr" @click="changeColor">修改文字颜色</p>

<script>
  data() {
    return {
      theColor: "red",
    };
  },
  methods: {
    changeColor() {
      this.theColor = 'blue';
    },
  },
</script>
```

> 总结: v-xxx, 自定义指令, 获取原生DOM, 自定义操作

#### 3.8.0 点击按钮消失, 输入框出现

MyGoodsList.vue - 标签位置添加

注意: 每个tab按钮和input都是独立变量控制, 那么直接在row身上的属性控制即可

```vue
<input
          class="tag-input form-control"
          style="width: 100px;"
          type="text"
          v-if="scope.row.inputVisible"
          />
          <button 
          v-else 
          style="display: block;" 
          class="btn btn-primary btn-sm add-tag"
          @click="scope.row.inputVisible = true"
          >+Tag</button>

```

#### 3.8.1 input自动获取焦点

main.js - 定义全局自定义指令

```js
// 全局指令
Vue.directive("focus", {
  inserted(el){
    el.focus()
  }
})
```

MyGoodsList.vue - 使用 v-focus指令

#### 3.8.2 input失去焦点关闭input

监听input失去焦点事件, 让input消失

```js
@blur="scope.row.inputVisible = false"
```

#### 3.8.3 input回车新增tag

监听input的回车事件, 如果无数据拦截代码

```js
@keydown.enter="enterFn(scope.row)"
```

事件处理函数

```js
enterFn(obj){ // 回车
    // console.log(obj.inputValue);
    if (obj.inputValue.trim().length === 0) {
        alert('请输入数据')
        return
    }

    obj.tags.push(obj.inputValue) // 表单里的字符串状态tags数组
    obj.inputValue = ""
}
```

#### 3.8.4 input框esc清空内容

```js
@keydown.esc="scope.row.inputValue = ''"
```

## 今日总结

## 面试题

### 1. vue中solt的使用方式，以及solt作用域插槽的用法

   使用方式：当组件当做标签进行使用的时候，用slot可以用来接受组件标签包裹的内容，当给solt标签添加name属性的 时候，可以调换响应的位置
  (高级用法) 插槽作用域： 当传递的不是单一的标签, 例如需要循环时, 把要循环的标签传入, 组件内使用v-for在slot标签上, 内部可以v-bind:把值传出来, 再外面把值赋予进去, 看示例

```js
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>

// current-user组件, user属性和值, 绑定给slotProps上
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

> 扩展阅读: https://cn.vuejs.org/v2/guide/components-slots.html (了解即可, 一般用不上)

### 2. 跟keep-alive有关的生命周期是哪些？（必会）

​    **1****）前言：**在开发Vue项目的时候，大部分组件是没必要多次渲染的，所以Vue提供了一个内置组件keep-alive来缓存组件内部状态，避免重新渲染，在开发Vue项目的时候，大部分组件是没必要多次渲染的，所以Vue提供了一个内置组件keep-alive来缓存组件内部状态，避免重新渲染

​    **2****）生命周期函数：**在被keep-alive包含的组件/路由中，会多出两个生命周期的钩子:activated 与 deactivated。

​       **1****、activated钩子：**在在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用。

​       **2****、Activated钩子调用时机：** 第一次进入缓存路由/组件，在mounted后面，beforeRouteEnter守卫传给 next 的回调函数之前调用，并且给因为组件被缓存了，再次进入缓存路由、组件时，不会触发这些钩子函数，beforeCreate created beforeMount mounted 都不会触发

​       **1****、deactivated钩子：**组件被停用（离开路由）时调用。

​       **2****、deactivated钩子调用时机**：使用keep-alive就不会调用beforeDestroy(组件销毁前钩子)和destroyed(组件销毁)，因为组件没被销毁，被缓存起来了，这个钩子可以看作beforeDestroy的替代，如果你缓存了组件，要在组件销毁的的时候做一些事情，可以放在这个钩子里，组件内的离开当前路由钩子beforeRouteLeave => 路由前置守卫 beforeEach =>全局后置钩子afterEach => deactivated 离开缓存组件 => activated 进入缓存组件(如果你进入的也是缓存路由)

### 3. 自定义指令(v-check、v-focus)的方法有哪些?它有哪些钩子函数?还有哪些钩子函数参数?（必会）

​    全局定义指令：在vue对象的directive方法里面有两个参数，一个是指令名称，另外一个是函数。组件内定义指令：directives

​    钩子函数：bind(绑定事件触发)、inserted(节点插入的时候触发)、update(组件内相关更新)

​    钩子函数参数：el、binding

### 4. is这个特性你有用过吗？主要用在哪些方面？（高薪常问）

** 1****）动态组件**

​    <component :is="componentName"></component>， componentName可以是在本页面已经注册的局部组件名和全局组件名,也可以是一个组件的选项对象。 当控制componentName改变时就可以动态切换选择组件。

**  2****）is的用法**

​    有些HTML元素，诸如 <ul>、<ol>、<table>和<select>，对于哪些元素可以出现在其内部是有严格限制的。

​    而有些HTML元素，诸如 <li>、<tr> 和 <option>，只能出现在其它某些特定的元素内部。

​    <ul>

​      <card-list></card-list>

​    </ul>

​    所以上面<card-list></card-list>会被作为无效的内容提升到外部，并导致最终渲染结果出错。应该这么写：

​    <ul>

​      <li is="cardList"></li>

​     </ul>



