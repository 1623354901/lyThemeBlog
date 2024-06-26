---
title: Node.js与内置模块
date: 2023-05-14
tags:
  - Node
categories:
  - Node
publish: true
---

# 初识 Node.js

## 一、回顾与思考

#### 1、浏览器中的 JavaScript 的组成部分

<img src='./media/1.png'>

#### 2、为什么 JavaScript 可以在浏览器中被执行

<img src='./media/2.png'></br>
不同的浏览器使用不同的 JavaScript 解析引擎：</br>
⚫ Chrome 浏览器 => V8</br>
⚫ Firefox 浏览器 => OdinMonkey（奥丁猴）</br>
⚫ Safri 浏览器 => JSCore</br>
⚫ IE 浏览器 => Chakra（查克拉）</br>
⚫ etc...</br>
其中，Chrome 浏览器的 V8 解析引擎性能最好！

#### 3、为什么 JavaScript 可以操作 DOM 和 BOM

<img src='./media/3.png'></br>
每个浏览器都内置了 DOM、BOM 这样的 API 函数，因此，浏览器中的 JavaScript 才可以调用它们。

#### 4、 浏览器中的 JavaScript 运行环境

<font color='red'>运行环境</font>是指<font color='red' font-weight='bold'>代码正常运行所需的必要环境。</font>
<img src='./media/4.png'>
总结：</br>
① V8 引擎负责解析和执行 JavaScript 代码。</br>
② 内置 API 是由运行环境提供的特殊接口，</br>
只能在所属的运行环境中被调用

## 二、node 简介

### 1、 什么是 Node.js

Node.js 是一个基于 Chrome V8 引擎的 `JavaScript 运行环境`。
Node.js 的官网地址： https://nodejs.org/zh-cn/

### 2、Node.js 中的 JavaScript 运行环境

<img src='./media/5.png'>
注意：</br>
① 浏览器是 JavaScript 的`前端运行环境`。</br>
② Node.js 是 JavaScript 的`后端运行环境`。</br>
③ Node.js 中无法调用 DOM 和 BOM 等浏览器内置 API

### 3、Node.js 可以做什么

Node.js 作为一个 JavaScript 的运行环境，仅仅提供了基础的功能和 API。然而，基于 Node.js 提供的这些基础能，很多强大
的工具和框架如雨后春笋，层出不穷，所以学会了 Node.js ，可以让前端程序员胜任更多的工作和岗位：</br>
① 基于 Express 框架（http://www.expressjs.com.cn/），可以快速构建 Web 应用</br>
② 基于 Electron 框架（https://electronjs.org/），可以构建跨平台的桌面应用</br>
③ 基于 restify 框架（http://restify.com/），可以快速构建 API 接口项目</br>
④ 读写和操作数据库、创建实用的命令行工具辅助前端开发、etc…</br>
总之：Node.js 是大前端时代的“大宝剑”，有了 Node.js 这个超级 buff 的加持，前端程序员的行业竞争力会越来越强！</br>

### 4、 Node.js 怎么学

浏览器中的 JavaScript 学习路径：

- JavaScript 基础语法 + 浏览器内置 API（DOM + BOM） + 第三方库（jQuery、art-template 等）

Node.js 的学习路径：

- JavaScript 基础语法 + `Node.js 内置 API 模块`（fs、path、http 等）+ `第三方 API 模块`（express、mysql 等）

# fs 文件系统模块

### 1、 什么是 fs 文件系统模块

fs 模块是 Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件的操作需求。
例如：</br>
⚫ fs.readFile() 方法，用来读取指定文件中的内容</br>
⚫ fs.writeFile() 方法，用来向指定的文件中写入内容</br>
如果要在 JavaScript 代码中，使用 fs 模块来操作文件，则需要使用如下的方式先导入它：

```
const fs=require('fs')
```

### 2、读取指定文件中的内容

#### 2.1 fs.readFile() 的语法格式

使用 fs.readFile() 方法，可以读取指定文件中的内容，语法格式如下：

```
fs.readFile(path,[options],callback)
```

参数解读：</br>
⚫ 参数 1：必选参数，字符串，表示文件的路径。</br>
⚫ 参数 2：可选参数，表示以什么编码格式来读取文件。</br>
⚫ 参数 3：必选参数，文件读取完成后，通过回调函数拿到读取的结果。</br>

```js
const fs = require('fs')
fs.readFile('./files/11.txt','utf8' , function(err, result) {
  if (err) {
    //可以判断 err 对象是否为 null，从而知晓文件读取的结果
    return console.log(文件读取失败!  + err.message)
  }
  console.log('文件读取成功，内容是:' + result)
})
```

### 3、向指定的文件中写入内容

#### 3.1 fs.writeFile() 的语法格式

使用 fs.writeFile() 方法，可以向指定的文件中写入内容，语法格式如下：

```js
fs.writeFile(file, data, [options], callback);
```

⚫ 参数 1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。</br>
⚫ 参数 2：必选参数，表示要写入的内容。</br>
⚫ 参数 3：可选参数，表示以什么格式写入文件内容，默认值是 utf8。</br>
⚫ 参数 4：必选参数，文件写入完成后的回调函数</br>

```js
const fs = require('fs')
fs.writeFile('F:/files/2.txt'，"Hello Node.js!" , function(err) {
if (err) {
  //可以判断 err 对象是否为 null，从而知晓文件写入的结果
  return console.log('文件写入失败!' + err.message)
}
  console.log('文件写入成功!)
})
```

### 4、fs 模块 - 路径动态拼接的问题

在使用 fs 模块操作文件时，如果提供的操作路径是以 ./ 或 ../ 开头的`相对路径`时，很容易出现路径动态拼接错误的问题。</br>

- 原因：代码在运行的时候，`会以执行 node 命令时所处的目录`，动态拼接出被操作文件的完整路径。</br>
- 解决方案：在使用 fs 模块操作文件时，`直接提供完整的路径`，不要提供 ./ 或 ../ 开头的相对路径，从而防止路径动态拼接的问题。</br>

```js
// 不要使用 ./ 或 ../ 这样的相对路径
fs.readFile('./files/1.txt',"utf8", function(err, dataStr) {
  if (err) return console.log('读取文件失败!' + err.message)
  console.log(datastr)
})
//dirname 表示当前文件所处的目录
fs.readFile( dirname + '/files/1.txt,"utf8", function(err, dataStr) {
  if (err) return console.log('读取文件失败!，' + err.message)
  console.log(dataStr)
})
```

# path 路径模块

### 1、什么是 path 路径模块

path 模块是 Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。</br>
例如：</br>
⚫ path.join() 方法，用来将多个路径片段拼接成一个完整的路径字符串</br>
⚫ path.basename() 方法，用来从路径字符串中，将文件名解析出来</br>
如果要在 JavaScript 代码中，使用 path 模块来处理路径，则需要使用如下的方式先导入它：

```js
const path = require("path");
```

#### 1.1 路径拼接

##### （1） path.join() 的语法格式

使用 path.join() 方法，可以把多个路径片段拼接为完整的路径字符串，语法格式如下：

```js
path.join([...paths]);
```

参数解读：</br>
⚫ ...paths < string > 路径片段的序列</br>
⚫ 返回值: < string ></br>

##### (2) path.join() 的代码示例

使用 path.join() 方法，可以把多个路径片段拼接为完整的路径字符串：

```js
const pathStr = path.join( '/a','/b/c ,.. ,./d ,'e' )
console.log(pathstr) // 输出 a\b\d\e

const pathStr2 = path.join( dirname,./files/1.txt')
console.log(pathStr2) // 输出 当前文件所处目录\files\1.txt
```

注意：`今后凡是涉及到路径拼接的操作，都要使用 path.join() 方法进行处理`。不要直接使用 + 进行字符串的拼接。

#### 1.2 获取路径中的文件名

#### (1) path.basename() 的语法格式

使用 path.basename() 方法，可以获取路径中的最后一部分，经常通过这个方法获取路径中的文件名，语法格式如下：

```js
path.basename(path, [ext]);
```

参数解读：</br>
⚫ path <string> 必选参数，表示一个路径的字符串</br>
⚫ ext <string> 可选参数，表示文件扩展名</br>
⚫ 返回: <string> 表示路径中的最后一部分</br>

```js
const fpath = /a/b/c/index.html' // 文件的存放路径

var fullName = path.basename(fpath)
console.log(fullName) // 输出 index.html

var namewithoutExt = path.basename(fpath,' .html')
console.log(namewithoutExt) // 输出 index
```

### 1.3 获取路径中的文件扩展名

#### (1) path.extname() 的语法格式

使用 path.extname() 方法，可以获取路径中的扩展名部分，语法格式如下：

```js
path.extname(path);
```

参数解读：</br>
⚫ path < string >必选参数，表示一个路径的字符串</br>
⚫ 返回: < string > 返回得到的扩展名字符串</br>

```js
const fpath =/a/b/c/index.html’ // 路径字符串

const fext = path.extname(fpath)
console.log(fext) // 输出 .html
```

# http 模块

## 1、什么是 http 模块

回顾：什么是客户端、什么是服务器？

- 在网络节点中，负责消费资源的电脑，叫做客户端；负责对外提供网络资源的电脑，叫做服务器。

`http 模块`是 Node.js 官方提供的、用来`创建 web 服务器`的模块。通过 http 模块提供的 `http.createServer()` 方法，就
能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。
如果要希望使用 http 模块创建 Web 服务器，则需要先导入它：

```js
const http = require("http");
```

### 2、进一步理解 http 模块的作用

服务器和普通电脑的`区别`在于，服务器上安装了 `web 服务器软件`，例如：IIS、Apache 等。通过安装这些服务器软件，
就能把一台普通的电脑变成一台 web 服务器。
在 Node.js 中，我们不需要使用 IIS、Apache 等这些`第三方 web 服务器软件`。因为我们可以基于 Node.js 提供的
http 模块，`通过几行简单的代码，就能轻松的手写一个服务器软件`，从而对外提供 web 服务。

#### 2.1 IP 地址

`IP 地址`就是互联网上`每台计算机的唯一地址`，因此 IP 地址具有唯一性。如果把“个人电脑”比作“一台电话”，那么“IP 地
址”就相当于“电话号码”，只有在知道对方 IP 地址的前提下，才能与对应的电脑之间进行数据通信。</br>
IP 地址的格式：通常用`“点分十进制”`表示成（`a.b.c.d`）的形式，其中，a,b,c,d 都是 0~255 之间的十进制整数。例如：用
点分十进表示的 IP 地址（192.168.1.1）</br>
注意：</br>
① `互联网中每台 Web 服务器，都有自己的 IP 地址`，例如：大家可以在 Windows 的终端中运行 ping www.baidu.com 命
令，即可查看到百度服务器的 IP 地址。</br>
② 在开发期间，自己的电脑既是一台服务器，也是一个客户端，为了方便测试，可以在自己的浏览器中输入 127.0.0.1 这个
IP 地址，就能把自己的电脑当做一台服务器进行访问了。</br>

### 3、服务器相关的概念

#### 3.1 域名和域名服务器

尽管 IP 地址能够唯一地标记网络上的计算机，但 IP 地址是一长串数字，不直观，而且不便于记忆，于是人们又发明了另一套
`字符型`的`地址方案`，即所谓的`域名（Domain Name）地址`。</br>
IP 地址和域名是一一`对应的关系`，这份对应关系存放在一种叫做`域名服务器`(DNS，Domain name server)的电脑中。使用者
只需通过好记的域名访问对应的服务器即可，对应的转换工作由域名服务器实现。因此，`域名服务器就是提供 IP 地址和域名
之间的转换服务的服务器`。</br>
注意：</br>
① 单纯使用 IP 地址，互联网中的电脑也能够正常工作。但是有了域名的加持，能让互联网的世界变得更加方便。</br>
② 在开发测试期间， 127.0.0.1 对应的域名是 localhost，它们都代表我们自己的这台电脑，在使用效果上没有任何区别。</br>

#### 3.2 端口号

计算机中的端口号，就好像是现实生活中的门牌号一样。通过门牌号，外卖小哥可以在整栋大楼众多的房间中，准确把外卖
送到你的手中。</br>
同样的道理，在一台电脑中，可以运行成百上千个 web 服务。每个 web 服务都对应一个唯一的端口号。客户端发送过来的
网络请求，通过端口号，可以被准确地交给对应的 `web 服务`进行处理。
<img src='./media/6.png'>
注意：</br>
① 每个端口号不能同时被多个 web 服务占用。</br>
② 在实际应用中，URL 中的` 80 端口可以被省略`</br>

### 4、创建最基本的 web 服务器

#### 4.1 创建 web 服务器的基本步骤

① 导入 http 模块</br>
② 创建 web 服务器实例</br>
③ 为服务器实例绑定 request 事件，监听客户端的请求</br>
④ 启动服务器</br>

```js
//导入http模块
const http = require("http");
//调用 http.createServer() 方法，即可快速创建一个 web 服务器实例：
const server = http.createServer();
// 使用服务器实例的 .on() 方法，为服务器绑定一个 request 事件
server.on("request", (req, res) => {
  // 只要有客户端来请求我们自己的服务器，就会触发 request 事件，从而调用这个事件处理函数
  console.log("Someone visit our web server .");
});
// 调用 server.listen(端口号，cb回调) 方法，即可启动 web 服务器
server.listen(80，() => {
  console.log('http server running at http://127.0.0.1')
})
```

#### 4.2 req 请求对象

只要服务器接收到了客户端的请求，就会调用通过 server.on() 为服务器绑定的 request 事件处理函数。
如果想在事件处理函数中，访问与客户端相关的`数据`或`属性`，可以使用如下的方式：

```js
server.on('request',(req)=>{
//req 是请求对象，它包含了与客户端相关的数据和属性，例如:
//req.url 是客户端请求的 URL 地址
//req.method 是客户端的 method 请求类型
  const str = 'Your request url is ${reg.url}, and request method is ${reg.method}
  console.log(str)
})
```

#### 4.3 res 响应对象

在服务器的 request 事件处理函数中，如果想访问与服务器相关的`数据`或`属性`，可以使用如下的方式：

```js
server.on("request", (req, res) => {
  //res 是响应对象，它包含了与服务器相关的数据和属性，例如:
  //要发送到客户端的字符串
  const str =
    "Your request url is ${req.url}, and request method is ${req.method}";
  // res.end()方法的作用:
  // 向客户端发送指定的内容，并结束这次请求的处理过程
  res.end(str);
});
```

#### 4.4 解决中文乱码问题

当调用 res.end() 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动`设置内容的编码格式`：

```js
server.on("request", (req, res) => {
  // 发送的内容包含中文
  const str =
    "您请求的 url 地址是 ${req.url}，请求的 method 类型是 ${req.method}";
  //为了防止中文显示乱码的问题，需要设置响应头 Content-Type 的值为 text/html;charset=utf-8
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  //把包含中文的内容，响应给客户端
  res.end(str);
});
```

#### 4.5 根据不同的 url 响应不同的 html 内容

1. 核心实现步骤</br>
   ① 获取请求的 url 地址</br>
   ② 设置默认的响应内容为 404 Not found</br>
   ③ 判断用户请求的是否为 / 或 /index.html 首页</br>
   ④ 判断用户请求的是否为 /about.html 关于页面</br>
   ⑤ 设置 Content-Type 响应头，防止中文乱码</br>
   ⑥ 使用 res.end() 把内容响应给客户端</br>

```js
server.on("request", function (req, res) {
  const url = reg.url; //1.获取请求的 url 地址
  let content = "<h1>404 Not found!</h1>"; // 2.设置默认的内容为 404 Not found
  if (url === "/" || url === "/index.html") {
    content = "<h1>首页</h1>"; // 3.用户请求的是首页
  } else if (url === "/about.html") {
    content = "<h1>关于页面</h1>"; //4.用户请求的是关于页面
  }
  res.setHeader("content-Type", "text/html; charset=utf-8"); //5.设置 Content-Type 响应头，防止中文乱码
  res.end(content); // 6，把内容发送给客户端
});
```
