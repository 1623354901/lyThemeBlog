---
title: vue实现按钮权限显示与隐藏
date: 2023-05-16
tags:
    - Vue
categories:
    - Vue实例
    - 中金
publish: true
---

封装自定义指令：v-action

```js
import Vue from 'vue'
// import store from '@/store'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *  v-action="{ action:12369874 }"
 *
 *  @see https://github.com/sendya/ant-design-pro-vue/pull/53
 */
const action = Vue.directive('action', {
    inserted: function (el, binding, vnode) {
        // console.log(binding, 'binding')
        let actionName = binding.arg
        if (!actionName) {
            actionName = binding.value.action + ''
        }
        // this.loginName = JSON.parse(window.localStorage.getItem('myAccountInfo')).name || ''
        // console.log(JSON.parse(window.localStorage.getItem('myButtonRights')))
        const roles = JSON.parse(window.localStorage.getItem('myButtonRights'))
        // console.log('action-binding', binding);
        // console.log('action-roles', roles);
        // console.log('action-elVal', elVal);
        // console.log(actionName)
        if (!roles.includes(actionName)) {
            ;(el.parentNode && el.parentNode.removeChild(el)) ||
                (el.style.display = 'none')
        }
        // roles.forEach((p) => {
        //   if (p && p === actionName) {
        //   } else {
        //     ;(el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
        //   }
        // })
    },
})
console.log(action, 'action')
export default action
```

使用方法：

```vue
<div
    style="color: #276afe; float: right; cursor: pointer"
    @click="deleteRole"
    v-action:1004019901
>
    删除该角色
</div>
```
