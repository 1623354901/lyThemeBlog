// const {
//   registerComponentsPlugin,
// } = require("@vuepress/plugin-register-components");
// const path = require("path");
module.exports = {
  title: "前端加油站",
  description: "卢卢的前端知识库",
  dest: "public",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  base: "/", // 这是部署到github相关的配置
  theme: "reco",
  themeConfig: {
    nav: [
      {
        text: "主页",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "前端基础",
        items: [
          {
            text: "HTMLCSS基础",
            items: [
              {
                text: "HTML基础",
                link: "/docs/seriesBlob/01-HTMLCSS/01-HTML基础",
              },
              { text: "CSS总结", link: "/docs/seriesBlob/02-CSS/01-CSS总结" },
              {
                text: "HTML5CSS3",
                link: "/docs/seriesBlob/03-移动WEB相关/01-HTML5CSS3",
              },
              {
                text: "移动web开发-布局",
                link: "/docs/seriesBlob/03-移动WEB相关/02-移动web开发-布局",
              },
            ],
          },
          {
            text: "JS基础",
            items: [
              {
                text: "JavaScript基础",
                link: "/docs/seriesBlob/04-JS/JavaScript基础笔记",
              },
              { text: "WebAPI", link: "/docs/seriesBlob/04-JS/WebAPIs" },
              {
                text: "JavaScript高级笔记",
                link: "/docs/seriesBlob/04-JS/JavaScript高级笔记",
              },
              {
                text: "ES6基础笔记",
                link: "/docs/seriesBlob/04-JS/ES6基础笔记",
              },
            ],
          },
          {
            text: "JQuery",
            items: [
              { text: "jQuery基础", link: "/docs/seriesBlob/05-jquery/jQuery" },
            ],
          },
          {
            text: "AJAX",
            items: [
              { text: "AJAX基础", link: "/docs/seriesBlob/10-ajax/ajax" },
            ],
          },
          {
            text: "GIT",
            items: [{ text: "GIT基础", link: "/docs/seriesBlob/11-Git/git" }],
          },
        ],
      },
      {
        text: "Vue相关",
        items: [
          {
            text: "Vue基础",
            items: [
              {
                text: "01-promise等同步异步任务相关",
                link: "/docs/seriesBlob/06-vue/day0-1-promise等同步异步任务相关",
              },
              {
                text: "02-webpack基础",
                link: "/docs/seriesBlob/06-vue/Day01_webpack",
              },
              {
                text: "03-vue基础",
                link: "/docs/seriesBlob/06-vue/day0-2-vue基础",
              },
              {
                text: "04-vue脚手架_基础API",
                link: "/docs/seriesBlob/06-vue/Day02_vue脚手架_基础API",
              },
              {
                text: "05-基础API_计算属性_过滤器_侦听器",
                link: "/docs/seriesBlob/06-vue/Day03_基础API_计算属性_过滤器_侦听器_品牌管理案例",
              },
              {
                text: "06-组件通信",
                link: "/docs/seriesBlob/06-vue/Day04_vue组件_组件通信_todo案例",
              },
              {
                text: "07-生命周期_组件进阶",
                link: "/docs/seriesBlob/06-vue/Day05_生命周期_组件进阶",
              },
              {
                text: "08-动态组件_插槽_自定义指令",
                link: "/docs/seriesBlob/06-vue/Day06_动态组件_插槽_自定义指令_tabbar案例",
              },
              {
                text: "09-路由_vant组件库使用",
                link: "/docs/seriesBlob/06-vue/Day07_路由_vant组件库使用",
              },
              // { text: 'Vuex', link: '/blog/06-vue/vuex' },docs\seriesBlob\06-vue\Day07_路由_vant组件库使用.md
            ],
          },
          { text: "Vuex基础", link: "/docs/seriesBlob/06-vue/vuex" },
          { text: "Vue3基础", link: "/docs/seriesBlob/06-vue/vue3" },
        ],
      },
      {
        text: "Node",
        items: [
          {
            text: "Node相关",
            items: [
              {
                text: "Node.js与内置模块",
                link: "/docs/seriesBlob/12-node/Node.js与内置模块",
              },
              {
                text: "模块化",
                link: "/docs/seriesBlob/12-node/模块化",
              },
              {
                text: "数据库与身份认证",
                link: "/docs/seriesBlob/12-node/数据库与身份认证",
              },
              {
                text: "express",
                link: "/docs/seriesBlob/12-node/express",
              },
            ],
          },
        ],
      },
      {
        text: "React相关",
        items: [
          {
            text: "React基础",
            items: [
              {
                text: "01-react基础",
                link: "/docs/seriesBlob/07-react/01-基础/01-React基础",
              },
              {
                text: "02-组件基础",
                link: "/docs/seriesBlob/07-react/01-基础/02-组件基础",
              },
              {
                text: "03-组件通讯",
                link: "/docs/seriesBlob/07-react/01-基础/03-组件通讯",
              },
              {
                text: "04-组件生命周期",
                link: "/docs/seriesBlob/07-react/01-基础/04-组件生命周期",
              },
              {
                text: "05-react原理揭秘",
                link: "/docs/seriesBlob/07-react/01-基础/05-react原理揭秘",
              },
              {
                text: "06-react路由",
                link: "/docs/seriesBlob/07-react/01-基础/06-react路由",
              },
            ],
          },
          {
            text: "hooks",
            items: [
              {
                text: "01-react-组件复用",
                link: "/docs/seriesBlob/07-react/02-hooks/01-react-组件复用",
              },
              {
                text: "02-hooks基本使用",
                link: "/docs/seriesBlob/07-react/02-hooks/02-hooks基本使用",
              },
              {
                text: "03-hooks进阶",
                link: "/docs/seriesBlob/07-react/02-hooks/03-hooks进阶",
              },
            ],
          },
          {
            text: "redux",
            items: [
              {
                text: "redux基础",
                link: "/docs/seriesBlob/07-react/03-redux/redux课程",
              },
            ],
          },
          {
            text: "react黑马极客园实战借鉴",
            items: [
              {
                text: "极客园移动端1",
                link: "/docs/seriesBlob/07-react/04-实战/极客园移动端1",
              },
              {
                text: "极客园移动端2",
                link: "/docs/seriesBlob/07-react/04-实战/极客园移动端2",
              },
            ],
          },
          {
            text: "TypeScript相关",
            items: [
              {
                text: "01-TypeScript介绍",
                link: "/docs/seriesBlob/07-react/04-实战/02-typescript笔记/01-TypeScript介绍",
              },
              {
                text: "02-TypeScript常用类型",
                link: "/docs/seriesBlob/07-react/04-实战/02-typescript笔记/02-TypeScript常用类型",
              },
              {
                text: "03-TypeScript高级类型",
                link: "/docs/seriesBlob/07-react/04-实战/02-typescript笔记/03-TypeScript高级类型",
              },
              {
                text: "04-在React项目中使用TS",
                link: "/docs/seriesBlob/07-react/04-实战/02-typescript笔记/04-在React项目中使用TS",
              },
              {
                text: "05-TypeScript类型声明文件",
                link: "/docs/seriesBlob/07-react/04-实战/02-typescript笔记/04-TypeScript类型声明文件",
              },
              {
                text: "06-使用Typescript改造项目",
                link: "/docs/seriesBlob/07-react/04-实战/02-typescript笔记/05-使用Typescript改造项目",
              },
              {
                text: "07-在React项目中使用TS",
                link: "/docs/seriesBlob/07-react/04-实战/02-typescript笔记/05-在React项目中使用TS",
              },
              {
                text: "06-使用Typescript改造项目",
                link: "/docs/seriesBlob/07-react/04-实战/02-typescript笔记/06-使用Typescript改造项目",
              },
            ],
          },
        ],
      },
      {
        text: "uniapp相关",
        items: [
          {
            text: "uniapp基础",
            link: "/docs/seriesBlob/08-uniapp/uniapp基础知识",
          },
          {
            text: "uniapp应用案例",
            link: "/docs/seriesBlob/08-uniapp/黑马商城",
          },
        ],
      },
      {
        text: "面试相关",
        items: [
          {
            text: "前端面试手册",
            link: "/docs/seriesBlob/13-面试/前端面试手册",
          },
          {
            text: "2023前端面试上岸手册-八股文",
            link: "/docs/seriesBlob/13-面试/2023前端面试上岸手册-八股文",
          },
          // {
          //   text: "2023React高频面试题讲解",
          //   link: "/docs/seriesBlob/13-面试/2023React高频面试题讲解",
          // },
          {
            text: "P8大佬的算法解题笔记",
            link: "/docs/seriesBlob/13-面试/P8大佬的算法解题笔记",
          },
        ],
      },
      // {
      //   'text':'关于',
      //   'link':'/README/',
      //   'icon':'reco-account'
      // },
      // {
      //   "text": "TimeLine",
      //   "link": "/timeline/",
      //   "icon": "reco-date"
      // },
      // {
      //   "text": "Docs",
      //   "icon": "reco-message",
      //   "items": [
      //     {
      //       "text": "vuepress-reco",
      //       "link": "/docs/theme-reco/"
      //     }
      //   ]
      // },
      {
        text: "相关链接",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/1623354901",
            icon: "reco-github",
          },
          {
            text: "csdn博客",
            link: "https://blog.csdn.net/lu123ying",
            icon: "reco-csdn",
          },
        ],
      },
    ],

    // "sidebar": {
    //   "/docs/theme-reco/": [
    //     "git初始化配置"
    //     // "",
    //     // "theme",
    //     // "plugin",
    //     // "api"
    //   ]
    // },
    type: "blog",
    blogConfig: {
      category: {
        location: 6,
        text: "分类",
      },
      // "tag": {
      //   "location": 6,
      //   "text": "标签"
      // }
    },
    friendLink: [
      {
        title: "vuepress官网",
        // "desc": "Enjoy when you can, and endure when you must.",
        // "email": "1156743527@qq.com",
        link: "https://vuepress.vuejs.org/",
      },
      {
        title: "vuepress-theme-reco",
        desc: "A simple and beautiful vuepress Blog & Doc theme.",
        avatar:
          "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: "https://vuepress-theme-reco.recoluan.com",
      },
    ],
    logo: "/avatar.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "",
    authorAvatar: "/avatar.png",
    record: "xxxx",
    startYear: "2017",
    sidebar: "auto",
    sidebarDepth: 2,
    // "noFoundPageByTencent": false,//关闭腾讯公益
  },
  markdown: {
    lineNumbers: true,
  },
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  // plugins: [
  //   registerComponentsPlugin({
  //     // 配置项
  //     componentsDir: path.resolve(__dirname, "./components"),
  //   }),
  // ],
};
