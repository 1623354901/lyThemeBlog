---
title: Vue路由表写法
date: 2023-04-12
tags:
    - Vue路由表
categories:
    - Vue实例
    - 中金
publish: true
---

```js
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: constantRouterComponents.Login,
    meta: { title: '登录' }
  },
  {
    path: '/',
    name: 'index',
    component: constantRouterComponents.Index,
    meta: { title: '首页' },
    children: [
      {
        path: '/merchantTransactionManagement',
        meta: { title: '商户交易管理' },
        component: { render: e => e('router-view') },
        children: [
          {
            path: 'transationQuery',
            name: 'transationQuery',
            meta: { title: '交易查询' },
            component: constantRouterComponents.TransationQuery
          },
          {
            path: 'billManagement',
            name: 'billManagement',
            meta: { title: '账单管理' },
            component: constantRouterComponents.BillManagement
          }
        ]
      },
      {
        path: '/settings',
        meta: { title: '设置' },
        component: { render: e => e('router-view') },
        redirect: '/settings',
        children: [
          {
            path: 'myInformation',
            name: 'myInformation',
            meta: { title: '我的信息' },
            component: { render: e => e('router-view') },
            children: [
              {
                path: '/',
                name: 'myInformation',
                meta: { title: '我的信息' },
                component: constantRouterComponents.MyInformation
              },
              {
                path: 'changePassword',
                name: 'changePassword',
                meta: { title: '修改密码' },
                component: constantRouterComponents.ResetPassword
              },
              {
                path: 'resetPassword',
                name: 'resetPassword',
                meta: { title: '重置密码' },
                component: constantRouterComponents.ChangePassword
              },
              {
                path: 'changePhone',
                name: 'changePhone',
                meta: { title: '修改手机号' },
                component: constantRouterComponents.ChangePhone
              },
              {
                path: 'otherChangePhone',
                name: 'otherChangePhone',
                meta: { title: '其他方式修改手机号' },
                component: constantRouterComponents.OtherChangePhone
              }
            ]
          },
          {
            path: 'bankAccount',
            name: 'bankAccount',
            meta: { title: '银行账户' },
            component: constantRouterComponents.BankAccount
          }
        ]
      }
    ]
  }
]
```

注意事项：

-   想要所有的菜单和顶部展示，不跳转新页面，路由必须放在 path 为/的 children 里
-   一级菜单只展示不对应页面时：component 为空报错，这样写：component: { render: e => e('router-view')
-   路由不跳转：https://blog.csdn.net/ccqsss/article/details/127122644

### 动态路由写法

src\router\router.config.js

```js
const menuCate = {}
/**
 * 动态生成路由表
 */
export const getConstantRouterMap = () => {
  const RouterMapObj = JSON.parse(localStorage.getItem('myRightTree'))
  // console.log(RouterMapObj)
  if (RouterMapObj) {
    rootRouter.children.push(...listToRoute(RouterMapObj))
  }
  const routers = []
  routers.push(...loginRouter)
  routers.push(rootRouter)
  routers.push(redirectRouter)
  // console.log(routers)
  menuCate.routers = routers
  return menuCate.routers
}
/*
递归处理vue路由表结构
*/
const listToRoute = (children) => {
  const arr = []
  children.forEach((item) => {
    const obj = {}
    obj.path = item.path
    obj.meta = { title: item.title, path: item.route }
    if (item.level === 1) {
      if (item.path) {
        obj.name = item.path.replace('/', '')
      }
      obj.component = { render: (e) => e('router-view') }
      obj.children = listToRoute(item.children)
    } else if (item.level === 2) {
      obj.name = item.path
      obj.leafMenu = item.leafMenu
      //   obj.component = constantRouterComponents[item.components]
      if (item.leafMenu) {
        // 为true:是叶子节点，route和components有值，为false时children有值
        obj.component = constantRouterComponents[item.component]
      } else {
        obj.component = constantRouterComponents['SecondLayout']
        if (item.children) {
          // 二级菜单有子菜单，此时leafMenu为false==>为了点击二级菜单拿到三级菜单
          obj.meta.children = listToMenu(item.children)
          obj.children = listToRoute(item.children)
        } else {
          obj.children = []
        }
      }
    } else if (item.level === 3) {
      obj.name = item.path
      obj.name = item.path
      obj.component = constantRouterComponents[item.component]
    }
    arr.push(obj)
  })
  return arr
}
// 动态生成菜单
export const getConstantMenu = () => {
  // console.log('getConstantMenu')
  const RouterMapObj = JSON.parse(localStorage.getItem('myRightTree'))
  // console.log(RouterMapObj)
  if (RouterMapObj) {
    menuCate.menus = listToMenu(RouterMapObj)
  } else {
    menuCate.menus = []
  }
  //   getMenus(RouterMapObj, menuCate)
  return menuCate.menus
}
const listToMenu = (children) => {
  const menus = []
  children.forEach((item) => {
    const obj = {}
    obj.name = item.path
    obj.level = item.level
    obj.title = item.title
    if (item.level === 1) {
      obj.icon = item.icon
      obj.activeIcon = item.activeIcon
    } else {
      if (item.route && item.route.length > 0) {
        obj.route = item.route
      } else {
        obj.route = '/'
      }
    }
    if (item.level === 1 && item.children) {
      obj.children = listToMenu(item.children)
    }
    menus.push(obj)
  })
  // console.log(menus)
  return menus
}

// 抛出路由表
export const constantRouterMap = [].concat(getConstantRouterMap())
// 抛出菜单
export const constantMenu = getConstantMenu()

```

src\router\index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(Router)

export default new Router({
  //   mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
})

```

### 登录后 localstorage 和 router.js 同时加载导致菜单无法渲染的解决办法：

在登陆后存储 localStorage 的后面重新刷新一下接口

```js
router.matcher = new Router({
    routes: getConstantRouterMap(),
}).matcher
//拼接动态路由的方法
// Router.addRoute(getConstantRouterMap())
```
