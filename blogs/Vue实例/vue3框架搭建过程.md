---
title: Vue+AntDesignVue实现面包屑导航
date: 2023-12-6
tags:
  - Vue
categories:
  - Vue实例
  - Vue3
publish: true
---

### 1、技术选型

| 技术栈 | 描述 | 官网 |
| ------ | :--: | ---: |

vue3|渐进式 Javascript 框架|https://cn.vuejs.org/
Element plus |基于 Vue 3，面向设计师和开发者的组件库|https://element-plus.gitee.io/zh-CN/
Vite|前端开发与构建工具|https://cn.vitejs.dev/guide/
TypeScript|微软新推出的一种语言，是 JavaScript 的超集|https://www.tslang.cn/
Pinia|新一代状态管理工具|pinia.vuejs.org/
Vue Router|Vue.js 的官方路由|https://router.vuejs.org/zh/
wangEditor|Typescript 开发的 Web 富文本编辑器|https://www.wangeditor.com/
Echarts|一个基于 JavaScript 的开源可视化图表库|https://echarts.apache.org/zh/
VueUse|基于 Vue 组合式 API 的实用工具集(类比 HuTool 工具)|www.vueusejs.com/

参考：https://juejin.cn/post/7228990409909108793

### 2、准备工作

node 版本 我使用的是 20.10.0
node 版本通过 nvm 控制 （nvm 切换为 1.1.12 版本）
nvm 下载地址 https://github.com/coreybutler/nvm-windows/releases

```
//常用命令：
nvm ls
nvm list //查看本地安装版本
nvm install 版本号
nvm uninstall 版本号
nvm use 版本号
```

### 3、开始安装

```
npm init vite@latest 9999-BootWebTemplateFront --template vue-ts
```

然后输入自定义项目名称--》选择技术框架（vue）-选择 ts 模板（typeScript）
完成后，用 vscode 打开并执行以下命令：

```
npm install
npm run dev
```

### 4、配置 vite

#### 1、配置 vite.config.ts

(1) src 路径别名配置：使用@代替 src

```vue
import { defineConfig } from 'vite' import vue from '@vitejs/plugin-vue' import
path from 'path' const pathSrc=path.resolve(__dirname,'src') //
https://vitejs.dev/config/ export default defineConfig({ plugins: [vue()],
resolve:{ alias:{ "@":pathSrc } } })
```

'import path from 'path''报错，需要安装 node

```
npm install @types/node --save-dev
```
