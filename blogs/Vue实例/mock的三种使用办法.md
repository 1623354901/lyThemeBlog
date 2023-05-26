---
title: mock的三种使用办法
date: 2023-04-18
tags:
    - mock
categories:
    - mock
    - Vue实例
    - 中金
publish: true
---

mock 数据有三种方案

-   yapi
-   本地 mock
-   mock 服务器 https://www.cnblogs.com/wfblog/p/9583843.html

> 使用 mock 是为了解决以下问题：

1. 后端接口未开发完成时，前端写页面使用假数据后期需要改，在后端维护好接口和字段时，就可以先按照约定好的先写
2. 后端接口开发好，但是 测试环境数据有限，生产环境数据比较全。通过代理本地是可以直接使用生产环境的数据。但是如果生产环境代码有认证系统，认证通过，由服务器决定跳转到指定的 生产上的域名地址。页面没有跳转到本地的域名的地址，无法调试开发。

> 三种 mock 方案区别：

1. yapi

-   在服务端搭建 yapi 服务，这样我们的接口可以维护到 yapi 上，同时，yapi 可以通过我们维护的接口自动生成假数据，我们可以直接连接 yapi 联调
-   优点：链接 yapi 时，控制台有请求，可以看到请求和响应
-   缺点：非必须字段 yapi 经常不返回，而且遇到一些约定字段判断处理的时候，yapi 还需要特别配置，例如 status=10 和 status=20 时。这样不利于我们开发

2. 使用本地 mock

-   使用 mock 语言生成数据，然后使用 Mock.mock()
    -   Mock.mock(url,templete)拦截到匹配 url 的 ajax 请求时，根据数据模板 templete 生成模拟数据作为 i 响应值返回
    -   Mock.mock( rurl, function( options ) ) ，当拦截到匹配 rurl 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
-   优点：直接使用 mockjs 作为假数据，在某些地方还是很好用的。比如返回多种不一样的随机数（需要过一会就变化的动态数据）。使用 mockjs 自带的接口可以很方便。
-   缺点：在控制台没有请求，我们看不到传参和响应值

3. mock.js

-   mock.js 的优势在于可以通过 js 程序生成 任意数量且随机的数据（如果数据条数很多，js 用一个循环就可以生成，这样就提现出优势来了）；

4. mock 服务器

-   服务器生成 mock 数据【推荐这种】：webpack 里面自带 express，让 express 执行 Mock 的 JS 文件就可以了
-   优点：mock 服务器 的数据需要自己对应一个一个输入，使用这种方式完全不需要去配置，很方便，而且是完全接近真实运行环境的。（推荐这种方式，开发时很少会用到大量的数据，自己设置字段也不会很复杂）

```js
// 模拟数据来源: 本地=local; 远程=remote
// const mockType = 'local'
const mockType = 'remote'

devServer: {
    open: true,
    // development server port 8000
    port: 8000,
    // client: {
    //   overlay: {
    //     //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
    //     warnings: false,
    //     errors: true
    //   }
    // },
    proxy: mockType === 'remote' && {
      // 配置跨域
      '/api': {
        target: 'http://172.31.1.185:3000/mock/84',
        // ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
      // '/api': {
      //   // target: 'http://192.168.140.117:8080/',
      //   // target: 'http://192.168.140.120:8080/',
      //   // target: 'http://192.168.140.117:8080/', // 赵松--未加密
      //   target: 'http://192.168.140.117:8151/', // 赵松-加密
      //   // target: 'http://192.168.140.25:8080/', // 赵强
      //   //  target: 'http://192.168.140.116:18154', // 王江江
      //   // ws: true,
      //   changOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/',
      //   },
      // },
    },
    // before: devServer => {}
    before: (app) => {
      mockType === 'local' &&
        app.all(/api/, function (req, res) {
          // 导入之前清除缓存, 避免 mock 数据不能实时更新
          Object.keys(require.cache).forEach((key) => {
            if (key.indexOf('mock') > -1) {
              delete require.cache[key]
            }
          })
          // 先在 mockDataMap 中查找是否存在对应的 mock 数据
          const mockDataMap = require('./src/mock/index.js')
          const apiKey = req.path.replace('/api', '')
          const mockData = mockDataMap[apiKey]
          if (typeof mockData === 'function') {
            let body = ''
            req.on('data', (chunk) => {
              body += chunk
            })
            req.on('end', () => {
              const data = mockData(body)
              setTimeout(() => {
                return res.json(data)
              }, data.timeout || 500)
            })
          } else {
            setTimeout(() => {
              return res.status(200).json(mockData)
            }, 500)
          }
        })
    },
  },
```

链接：https://www.cnblogs.com/wfblog/p/9583843.html
