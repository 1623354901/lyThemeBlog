---
title: Vue+AntDesignVue实现面包屑导航
date: 2023-04-18
tags:
    - Vue
categories:
    - Vue实例
    - AntDesignVue
    - 中金
publish: true
---

### Vue+AntDesignVue 实现面包屑导航

页面代码

```vue
<a-breadcrumb>
    <a-breadcrumb-item v-for="(item,i) in breadList" :key="i" :to="{ path: item.path||item.meta.path }">
      <router-link :to="item.path||item.meta.path" v-if="i!==0&&i!==breadList.length-1">
        {{ item.title||item.meta.title }}
      </router-link>
      <span v-else>
        {{ item.title||item.meta.title }}
      </span>

    </a-breadcrumb-item>
</a-breadcrumb>
```

```js
export default {
    data() {
        return {
            breadList: [],
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        },
    },
    // computed: {
    //     menuData() {
    //         console.log(getConstantMenu())
    //         return getConstantMenu()
    //     },
    // },
    created() {
        this.getBreadcrumb()
    },
    mounted() {
        // console.log(this.$router);
        // console.log(this.$router);
        // this.menuData.forEach((item) => {
        //     item.icon = this.getImageUrl(item.icon)
        //     item.activeIcon = this.getImageUrl(item.activeIcon)
        // })
    },
    methods: {
        getBreadcrumb() {
            if (
                this.$route.matched[this.$route.matched.length - 1].meta
                    .breadList
            ) {
                this.breadList =
                    this.$route.matched[
                        this.$route.matched.length - 1
                    ].meta.breadList
            } else {
                this.breadList = this.$route.matched.slice(1)
            }
            //   console.log(this.$route.matched);
        },
    },
}
```

-   主要通过**this.$route.matched**中的 meta 拿取当前嵌套的路由.
    实现面包屑点击跳转思路：

1. 需要找到面包屑层级中每个 meta title 所对应的 route，才能实现跳转
2. 因此我们在处理路由表中的 meta 时就把数据存进去

```js
{
      path: 'settings/myInformation/changePassword',
      name: 'changePassword',
      meta: {
        title: '修改密码',
        breadList: [
          { title: '设置', path: '/settings' },
          { title: '我的信息', path: '/settings/myInformation/' },
          { title: '修改密码', path: '/settings/myInformation/changePassword' },
        ],
      },
      component: constantRouterComponents.ChangePassword,
    },
```
