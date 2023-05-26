---
title: js关于replaceAll()的兼容性处理
date: 2023-05-12
tags:
    - 兼容性
categories:
    - JS
    - 中金
    - 兼容性
publish: true
---

在一个项目中（SHXJ）,上线后，发现部分用户无法点击按钮。
经排查发现是 replaceAll()方法不兼容老版本浏览器。
因此需要改用 replace 的方式：

```js
//原先写法
var str = '5218feeergfdvfsdad+fwsefergg/frwerfegreg='
str.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
//降为replace之后的写法：
// 注意特殊符号需要转义，例如：+，/
str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
//总结：
// 第一种写法：
string.replace(/oldString/g, newString)     replace 默认只会匹配替换到匹配到的第一个，因此要加 /g
//第二种写法：
string.replace( new  RegExp( "oldString", "gm" ),  "newString" )
// 也可以放到原型上-重写replaceAll方法
String.prototype.replaceAll = function (newString, oldString) {
    return this.replace(new RegExp('oldString', 'gm'), 'newString')
}
```
