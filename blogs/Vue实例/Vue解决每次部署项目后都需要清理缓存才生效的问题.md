---
title: Vue解决每次部署项目后都需要清理缓存才生效的问题
date: 2023-05-22
tags:
    - Vue
categories:
    - Vue实例
    - 中金
publish: true
---

解决办法：vue 中给打包的文件指定自定义文件名以及加上[哈希]值解决每次打包上线存在缓存问题

高版本 vue-cli 脚手架自动解决了这个问题

低版本 vue-cli 或者 webpack 需要自己配置

```js
在output中给文件命名加上hash:8
output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash:8].js'),
    chunkFilename: utils.assetsPath('js/[id].[hash:8].js')
  },
  响应的css文件输出时也加上hash:8
  new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[hash:8].css'),
      allChunks: true
    }),

```

```js

module.exports = {
  filenameHashing: true, // 打包后为文件名增加hash值
  chainWebpack: config => {
    config.output.filename('js/[name].[hash].js').end()

    // 如果filenameHashing设置为了false，可以通过这段代码给打包出的css文件增加hash值
    // config.plugin('extract-css').tap(args => [{
    //   filename: 'assets/css/[name].[hash].css',
    //   chunkFilename: 'assets/css/[name].[hash].css'
    // }])
  }
```
