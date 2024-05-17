---
title: 模块化
date: 2023-05-16
tags:
  - express
categories:
  - Node
  - express
publish: true
---

### 初识 express

### 1、express 简介

#### 1.1 什么是 Express

- 官方给出的概念：Express 是`基于 Node.js 平台`，快速、开放、极简的` Web 开发框架`。
- 通俗的理解：Express 的作用和 Node.js 内置的 http 模块类似，是`专门用来创建 Web 服务器的`。
- `Express 的本质`：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法
- Express 的中文官网：http://www.expressjs.com.cn/

  <img src='./media/12.png'>

#### 1.2 Express 能做什么

对于前端程序员来说，最常见的两种服务器，分别是：</br>
⚫`Web 网站服务器`：专门对外提供 Web 网页资源的服务器。</br>
⚫`API 接口服务器`：专门对外提供 API 接口的服务器。</br>
使用 Express，我们可以方便、快速的创建 `Web 网站`的服务器或 `API 接口`的服务器。</br>

#### 1.3 Express 的基本使用

1. 安装

```
npm i express@4.17.1
```

2. 创建基本的 Web 服务器

```js
//1.导入express
const express = require("express");
//2. 创建web服务器
const app = express();

// 3.调用app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
  console.log("express server running at http://127.0.0.1");
});
```

3. 监听 Get 请求

通过 app.get() 方法，可以监听客户端的 GET 请求，具体的语法格式如下：

```js
// 参数1:客户端请求的 URL 地址
// 参数2:请求对应的处理函数
// req:请求对象(包含了与请求相关的属性与方法)
// res:响应对象(包含了与响应相关的属性与方法)
app.get('请求URL'，function(req,res){/*处理函数*/})
```

4. 监听 post 请求

```js
// 参数1:客户端请求的 URL 地址
// 参数2:请求对应的处理函数
// req:请求对象(包含了与请求相关的属性与方法)
// res:响应对象(包含了与响应相关的属性与方法)
app.post('请求URL'，function(req，res){/*处理函数*/})
```

5. 把内容响应给客户端

通过`res.send()` 方法，可以把处理好的内容，发送给客户端：

```js
app.get('/user',(req,res)=>{
  //向客户端发送 JSON 对象
  res.send({ name:'zs',age:20,gender:男'})
})
app.post('/user',(req,res)=> {
  //向客户端发送文本内容
  res.send('请求成功')
})
```

6. 获取 URL 中携带的查询参数

通过`req.query`对象，可以访问到客户端通过`查询字符串`的形式，发送到服务器的参数：

```js
app.get("/", (req, res) => {
  // req.query 默认是一个空对象!
  //客户端使用 ?name=zs&age=20 这种查询字符串形式，发送到服务器的参数,
  //可以通过 req.query 对象访问到，例如:
  // req.query.namereq.query.age
  console.log(req.query);
});
```

7. 获取 URL 中的动态参数

通过`req.params`对象，可以访问到 URL 中，通过`:`匹配到的`动态参数`：

````js
// URL 地址中，可以通过 :参数名 的形式，匹配动态参数值
app.get('/user/:id',(req,res)=> {
  // req.params 默认是一个空对象
  //里面存放着通过 : 动态匹配到的参数值
  console.log(req.params)
})```
````

#### 1.4 托管静态资源

1. express.static()

express 提供了一个非常好用的函数，叫做`express.static()`，通过它，我们可以`非常方便地创建`一个`静态资源服务器`，例如，通过如下代码就可以将 public 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：

```js
app.use(express.static("public"));
```

在，你就可以访问 public 目录中的所有文件了：</br>
http://localhost:3000/images/bg.jpg</br>
http://localhost:3000/css/style.css</br>
http://localhost:3000/js/login.js</br>

注意：Express 在`指定的`静态目录中查找文件，并对外提供资源的访问路径。因此，`存放静态文件的目录名不会出现在URL 中`。

2. 托管多个静态资源目录

如果要托管多个静态资源目录，请多次调用 express.static() 函数：

```js
app.use(express.static("public"));
app.use(express.static("files"));
```

访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件。

3. 挂载路径前缀
   如果希望在托管的`静态资源访问路径`之前，`挂载路径前缀`，则可以使用如下的方式：

```js
app.use("/public", express.static("public"));
```

现在，你就可以通过带有/public 前缀地址来访问 public 目录中的文件了：</br>
http://localhost:3000/public/images/kitten.jpg</br>
http://localhost:3000/public/css/style.css</br>
http://localhost:3000/public/js/app.js</br>

#### 1.5 nodemon

1. 为什么要使用 nodemon

   在编写调试 Node.js 项目的时候，如果修改了项目的代码，则需要频繁的手动 close 掉，然后再重新启动，非常繁琐。现在，我们可以使用 nodemon（https://www.npmjs.com/package/nodemon）这个工具，它能够`监听项目文件的变动`，当代码被修改后，nodemon会`自动帮我们重启项目`，极大方便了开发和调试。

2. 安装 nodemon

```js
npm install -g nodemon
```

3. 使用 nodemon

当基于 Node.js 编写了一个网站应用的时候，传统的方式，是运行`node app.js `命令，来启动项目。这样做的坏处是：代码被修改之后，需要手动重启项目。
现在，我们可以将 node 命令替换为 nodemon 命令，使用`nodemon app.js` 来启动项目。这样做的好处是：代码
被修改之后，会被 nodemon 监听到，从而实现自动重启项目的效果。

```js
node app.js
nodemon app.js
```

### 2、express 路由

路由：广义上来讲，路由就是映射关系。
<img src='./media/13.png'>

#### 2.1 Express 中的路由

在 Express 中，路由指的是`客户端的请求`与`服务器处理函数`之间的映射关系。
Express 中的路由分 3 部分组成，分别是`请求的类型`、`请求的URL 地址`、`处理函数`，格式如下：

```js
app.METHOD(PATH, HANDLER);
```

```js
// 匹配 GET 请求，且请求 URL 为 /
app.get("/", function (req, res) {
  res.send("Hello World!");
});
// 匹配 POST 请求，且请求 URL 为 /
app.post("/", function (req, res) {
  res.send("Got a PosT request");
});
```

1. 路由的匹配过程

每当一个请求到达服务器之后，`需要先经过路由的匹配`，只有匹配成功之后，才会调用对应的处理函数。
在匹配时，会按照路由的顺序进行匹配，如果`请求类型`和`请求的 URL `同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理。
<img src='./media/14.png'>

路由匹配的`注意点`：</br>
① 按照定义的先后顺序进行匹配</br>
② 请求类型和请求的 URL 同时匹配成功，才会调用对应的处理函数</br>

2.  最简单的用法

在 Express 中使用路由最简单的方式，就是把路由挂载到 app 上，示例代码如下：

```js
const express = require('express')
// 创建 Web 服务器，命名为 app
const app = express()
// 挂载路由
app.get('/',(req,res)=>{ res.send('Hello World.')})7 app.post('/',(req,res)=> { res.send('Post Request.')})
// 启动 Web 服务器
app.listen(80,()=>{ console.log('server running at http://127.0.0.1')})
```

3. 模块化路由

为了方便对路由进行模块化的管理，Express 不建议将路由直接挂载到 app 上，而是推荐将路由抽离为单独的模块。将路由抽离为单独模块的步骤如下：</br>
① 创建路由模块对应的.js 文件</br>
② 调用 express.Router() 函数创建路由对象</br>
③ 向路由对象上挂载具体的路由</br>
④ 使用 module.exports 向外共享路由对象</br>
⑤ 使用 app.use() 函数注册路由模块</br>

```js
//1.导入 express
var express = require('express')
//2.创建路由对象
var router = express.Router()
// 3.挂载获取用户列表的路由
router.get('/user/list'，function(req,res){
  res.send('Get user list.')
})
// 4.挂载添加用户的路由
router.post('/user/add'，function(req，res){
  res.send('Add new user.')8
})
// 5.向外导出路由对象
module.exports = router
// 6.导入路由模块
const userRouter = require('./router/user.js')
// 7.使用 app.use()注册路由模块
app.use(userRouter)
```

5. 为路由模块添加前缀

类似于托管静态资源时，为静态资源统一挂载访问前缀一样，路由模块添加前缀的方式也非常简单：

```js
// 1.导入路由模块
const userRouter = require( ./router/user.js')
// 2.使用 app.use() 注册路由模块，并添加统一的访问前缀 /api
app.use('/api ,userRouter)
```

### 3、express 中间件

#### 3.1 中间件的概念

1. 概念

中间件（Middleware ），特指`业务流程`的<font color='red'>中间处理环节。</font>

2. 现实生活中的例子

在处理污水的时候，一般都要经过`三个处理环节`，从而保证处理过后的废水，达到排放标准。
<img src='./media/15.png'>
处理污水的这三个中间处理环节，就可以叫做中间件。

3. Express 中间件的调用流程

当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行`预处理`。
<img src='./media/16.png'>

4. Express 中间件的格式

Express 的中间件，本质上就是一个`function 处理函数`，Express 中间件的格式如下：
<img src='./media/17.png'>
注意：中间件函数的形参列表中，`必须包含next 参数`。而路由处理函数中只包含 req 和 res。

5. next 函数的作用

   <font color='red'>next 函数</font>是实现<font color='red'>多个中间件连续调用</font>的关键，它表示把流转关系<font color='red'>转交</font>
   给`下一个中间件`或`路由`。
   <img src='./media/18.png'>

### 3.2 Express 中间件的初体验

1. 定义中间件函数
   可以通过如下的方式，定义一个最简单的中间件函数：

```js
//常量 mw 所指向的，就是一个中间件函数
const mw = function (req, res, next) {
  console.log("这是一个最简单的中间件函数')
  // 注意: 在当前中间件的业务处理完毕后，必须调用 next() 函数
  //表示把流转关系转交给下一个中间件或路由
  next()
}
```

2. 全局生效的中间件
   客户端发起的<font color='red'>任何请求</font>，到达服务器之后，<font color='red'>都会触发的中间件</font>，叫做全局生效的中间件。通过调用<font color='red'>app.use(中间件函数)</font>，即可定义一个<font color='red'>全局生效</font>的中间件，示例代码如下：

```js
// 常量 mw 所指向的，就是一个中间件函数
const mw = function (req, res,next){
  console.log("这是一个最简单的中间件函数)
  next()
}
//全局生效的中间件
app.use(mw)
```

3. 定义全局中间件的简化形式

```js
//全局生效的中间件
app.use(function (req, res, next) {
  console.log("这是一个最简单的中间件函数')
  next()
})
```

4. 中间件的作用

多个中间件之间，<font color='red'>共享同一份 req 和 res</font>。基于这样的特性，我们可以在<font color='red'>上游</font>的中间件中，<font color='red'>统一</font>为 req 或 res 对象添加自定义的属性或方法，供<font color='red'>下游</font>的中间件或路由进行使用。
<img src='./media/19.png'>

5. 定义多个全局中间件
   可以使用 app.use() <font color='red'>连续定义多个</font>全局中间件。客户端请求到达服务器之后，会按照中间件<font color='red'>定义的先后顺序</font>依次进行调用，示例代码如下：

```js
app.use(function(req，res，next){ // 第1个全局中间件
  console.log('调用了第1个全局中间件 )
  next()
}
app.use(function(req，res，next) { // 第2个全局中间件
  console.log(调用了第2个全局中间件 )
  next()
}
app.get('/user'，(req，res) =>{ / 请求这个路由，会依次触发上述两个全局中间件
  res.send('Home page .')
})
```

6. 局部生效的中间件
   不使用 `app.use() `定义的中间件，叫做局部生效的中间件，示例代码如下：

```js
//定义中间件函数 mw1
const mw1 = function(req, res, next) {
  console.log("这是中间件函数)
  next()
})
// mw1 这个中间件只在”当前路由中生效”，这种用法属于"局部生效的中间件"
app.get('/ ，mw1, function(req, res) {
  res.send(' Home page .')
})
// mw1 这个中间件不会影响下面这个路由 、
app.get('/user' ,function(req,res)  res.send('User page.') })
```

7. 定义多个局部中间件
   可以在路由中，通过如下两种`等价`的方式，`使用多个局部中间件`：

```js
//以下两种写法是"完全等价”的，可根据自己的喜好，选择任意一种方式进行使用
app.get('/' ,mw1 , mw2, (req, res) => [ res.send('Home page.') })
app.get('/'，[mw1, mw2]， (req, res) => [ res.send('Home page.') )
```

8. 了解中间件的 5 个使用注意事项</br>
   ① 一定要在路由之前注册中间件</br>
   ② 客户端发送过来的请求，可以连续调用多个中间件进行处理</br>
   ③ 执行完中间件的业务代码之后，不要忘记调用 next() 函数</br>
   ④ 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码</br>
   ⑤ 连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象</br>

#### 3.3 中间件的分类

为了方便大家理解和记忆中间件的使用，Express 官方把常见的中间件用法，分成了 5 大类，分别是：</br>
① <font color='red'>应用级别</font>的中间件</br>
② <font color='red'>路由级别</font>的中间件</br>
③ <font color='red'>错误级别</font>的中间件</br>
④ <font color='red'>Express 内置</font>的中间件</br>
⑤ <font color='red'>第三方</font>的中间件</br>

1. 应用级别的中间件
   通过 app.use() 或 app.get() 或 app.post() ，`绑定到 app 实例上的中间件`，叫做应用级别的中间件，代码示例如下：

```js
//应用级别的中间件《全局中间件)
app.use((req, res, next) => {
  next()
})
//应用级别的中间件《局部中间件)
app.get('/'，m1. (req, res) => {
  res.send('Home page .')
})
```

2. 路由级别的中间件
   绑定到 `express.Router() `实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，`应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上`，代码示例如下：

```js
var app = express()
var router = express.Router( )
// 路由级别的中间件
router.use(function (req, res, next) {
  console.log('Time: , Date.now( ))
  next()
})
app.use('/'，router)
```

3. 错误级别的中间件
   错误级别中间件的`作用`：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。
   格式：错误级别中间件的 function 处理函数中，`必须有 4 个形参`，形参顺序从前到后，分别是(`err`, req, res, next)。

```js
// 1。路由
app.get('/' ,function (req, res) {
  // 1.1 抛出一个自定义的错误
  throw new Error('服务器内部发生了错误!)
  res . send( 'Home Page . ' )
})
app.use(function (err，req，res，next) [ // 2.错误级别的中间件
  console.log("发生了错误:"  + err.message)// 2.1 在服务器打打印错误消息
  res .send('Error!' + err .message)//2.2 向客户端响应错误相关的内容
})
```

注意：错误级别的中间件， <font color='red'>必须注册在所有路由之后！</font>

4. Express 内置的中间件
   自 Express 4.16.0 版本开始，Express 内置了 `3` 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：</br>
   ①`express.static` 快速托管静态资源的内置中间件，例如：HTML 文件、图片、CSS 样式等（无兼容性）</br>
   ②`express.json` 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）</br>
   ③`express.urlencoded `解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）</br>

```js
//配置解析 application/json 格式数据的内置中间件
app.use(express.json( ))
// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false ))
```

5. 第三方的中间件
   非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中，大家可以按需下载并配置第三方中间件，从而提高项目的开发效率。</br>
   例如：在express@4.16.0 之前的版本中，经常使用 body-parser 这个第三方中间件，来解析请求体数据。使用步骤如下：</br>
   ① 运行 npm install body-parser 安装中间件</br>
   ② 使用 require 导入中间件</br>
   ③ 调用 app.use() 注册并使用中间件</br>
   ` 注意`：Express 内置的 express.urlencoded 中间件，就是基于 body-parser 这个第三方中间件进一步封装出来的。

#### 3.4 自定义中间件

1. 需求描述与实现步骤
   自己手动模拟一个类似于 express.urlencoded 这样的中间件，来解析 POST 提交到服务器的表单数据。实现步骤：</br>
   ① 定义中间件</br>
   ② 监听 req 的 data 事件</br>
   ③ 监听 req 的 end 事件</br>
   ④ 使用 querystring 模块解析请求体数据</br>
   ⑤ 将解析出来的数据对象挂载为 req.body</br>
   ⑥ 将自定义中间件封装为模块</br>
2. 定义中间件
   使用 app.use() 来定义全局生效的中间件，代码如下：

```js
app.use(function (req, res, next) {
  //中间件的业务逻辑
});
```

3. 监听 req 的 data 事件
   在中间件中，需要监听 req 对象的 data 事件，来获取客户端发送到服务器的数据。</br>
   如果数据量比较大，无法一次性发送完毕，则客户端会`把数据切割后，分批发送到服务器`。所以 data 事件可能会触发多次，每一次触发 data 事件时，`获取到数据只是完整数据的一部分`，需要手动对接收到的数据进行拼接。

```js
//定义变量，用来存储客户端发送过来的请求体数据
let str = !!
//监听 reg 对象的 data 事件 (客户端发送过来的新的请求体数据)
req.on( 'data',(chunk) => [
//拼接请求体数据，隐式转换为字符串
  str += chunk
})
```

4. 监听 req 的 end 事件
   当请求体数据接收完毕之后，会自动触发 req 的 end 事件。</br>
   因此，我们可以在 req 的 end 事件中，拿到并处理完整的请求体数据。示例代码如下：

```js
//监听 reg 对象的 end 事件 (请求体发送完毕后自动触发
req.on( 'end'，() =>
  //打印完整的请求体数据
  console.log(str)
  //TODO: 把字符串格式的请求体数据，解析成对象格式
})
```

5. 使用 querystring 模块解析请求体数据
   Node.js 内置了一个`querystring`模块，`专门用来处理查询字符串`。通过这个模块提供的`parse()` 函数，可以轻松把查询字符串，解析成对象的格式。示例代码如下：

```js
//导入处理 querystring 的 Node.js 内置模块
const qs = require("querystring");
// 调用 qs.parse()方法，把查询字符串解析为对象
const body = qs.parse(str);
```

6. 将解析出来的数据对象挂载为 req.body
   上游的中间件和下游的中间件及路由之间，`共享同一份 req 和 res`。因此，我们可以将解析出来的数据，挂载为 req 的自定义属性，命名为 req.body，供下游使用。示例代码如下：

   ```js
   req.on('end',()=> (
      const body = qs.parse(str) // 调用 qs.parse() 方法，把查询字符串解析为对象
      req.body = body //将解析出来的请求体对象，挂载为 reg.body 属性
      next() // 最后，一定要调用 next() 函数，执行后续的业务逻辑
    })
   ```

7. 将自定义中间件封装为模块
   为了优化代码的结构，我们可以把自定义的中间件函数，`封装为独立的模块`，示例代码如下：

```js
// custom-body-parser.js 模块中的代码
const qs = require( 'querystring')
function bodyParser(req，res，next) [ /* 省略其它代码 */ }
module.exports = bodyParser // 向外导出解析请求体数据的中间件函数
//--------------------分割线--------------------
//1，导入自定义的中间件模块
const myBodyParser = require( ' custom-body-parser')
// 2.注册自定义的中间件模块
app.use(myBodyParser )
```

### 4、使用 Express 写接口

#### 4.1 创建基本的服务器

```js
// 导入 express 模块
const express = require( 'express')
// 创建 express 的服务器实例
const app = express()
  // write your code here...
  // 调用 app.listen 方法，指定端口号并启动web服务器
  app.listen(80，function () {
  console.log('Express server running at http://127.0.0.1')
})
```

#### 4.2 创建 API 路由模块

```js
// apiRouter.js [路由模块]
const express = require( 'express')
const apiRouter = express .Router()
// bind your router here...
module.exports = apiRouter
// app.js[导入并注册路由模块)]
const apiRouter = require('./apiRouter.js')
app.use('/api'，apiRouter)
```

#### 4.3 编写 GET 接口

```js
apiRouter.get('/get',(req, res)
  //1获取到客户端通过查询字符串，发送到服务器的数据
  const query = req.query
  // 2.调用 res.send() 方法，把数据响应给客户端
  res . send({
    status: 0
    // 状态，0 表示成功，1 表示失败
    msg:GET请求成功!
    // 状态描述
    data: query
    //需要响应给客户端的具体数据
  })
})
```

#### 4.4 编写 POST 接口

```js
apiRouter.post('/post',(req, res) =>
  // 1.获取客户端通过请求体，发送到服务器的 URL-encoded 数据
  const body = req.body
  // 2.调用 res.send() 方法，把数据响应给客户端
  res . send({
    status: 0,
    // 状态，0 表示成功，1 表示失败
    msg:POST请求成功!
    //状态描述消息
    data: body
    //需要响应给客户端的具体数据
  })
})
```

注意：如果要获取 URL-encoded 格式的请求体数据，必须配置中间件 `app.use(express.urlencoded({ extended: false }))`

#### 4.5 CORS 跨域资源共享

1. 接口的跨域问题
   刚才编写的 GET 和 POST 接口，存在一个很严重的问题：`不支持跨域请求`。</br>
   解决接口跨域问题的方案主要有两种：</br>
   ①`CORS`（主流的解决方案，推荐使用）</br>
   ②`JSONP`（有缺陷的解决方案：只支持 GET 请求）</br>
2. 使用 cors 中间件解决跨域问题
   cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。</br>
   使用步骤分为如下 3 步：</br>
   ① 运行 npm install cors 安装中间件</br>
   ② 使用 const cors= require('cors') 导入中间件</br>
   ③ 在路由之前调用 app.use(cors()) 配置中间件</br>
3. 什么是 CORS
   CORS （Cross-Origin Resource Sharing，跨域资源共享）由一系列<font color='red'> HTTP 响应头</font>组成，<font color='red'>这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源。</font></br>
   浏览器的<font color='red'>同源安全策略</font>默认会阻止网页“跨域”获取资源。但如果接口服务器<font color='red'>配置了 CORS 相关的 HTTP 响应头</font>，就可以<font color='red'>解除浏览器端的跨域访问限制</font>。
   <img src='./media/20.png'>
4. CORS 的注意事项
   ①CORS 主要在<font color='red'>服务器端进行配置</font>。。客户端浏览器<font color='red'>无须做任何额外的配置</font>。，即可请求开启了 CORS 的接口。</br>
   ②CORS 在浏览器中有<font color='red'>兼容性</font>。。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。</br>
5. CORS 响应头部-Access-Control-Allow-Origin
   <img src='./media/21.png'>
   如果指定了 Access-Control-Allow-Origin 字段的值为通配符\*，表示允许来自任何域的请求，示例代码如下：

```js
res.setHeader("Access-Control-Allow-Origin", "*");
```

6. CORS 响应头部-Access-Control-Allow-Headers
   默认情况下，CORS 仅支持客户端向服务器发送如下的 <font color='red'> 9 个请求头</font>：
   Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）</br>
   如果客户端向服务器<font color='red'> 发送了额外的请求头信息</font>，则需要在<font color='red'> 服务器端</font>，通过 Access-Control-Allow-Headers<font color='red'> 对额外
   的请求头进行声明</font>，否则这次请求会失败！

```js
//允许客户端额外向服务器发送 Content-Type 请求头和 X-Custom-Header 请求头
/注意:多个请求头之间使用英文的逗号进行分割
res. setHeader('Access-Control-Allow-Headers''Content-Type,X-Custom-Header')
```

7. CORS 响应头部-Access-Control-Allow-Methods
   默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。
   如果客户端希望通过<font color='red'>PUT</font>、<font color='red'>DELETE</font>等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods<font color='red'> 来指明实际请求所允许使用的 HTTP 方法。</font>
   示例代码如下：

```js
//只允许 POST、GET、DELETE、HEAD 请求方法
res. setHeader('Access-Control-Allow-Methods'，'pOST，GET，DELETE，HEAD')
//允许所有的 HTTP 请求方法
res.setHeader('Access-Control-A1low-Methods', "*")
```

8. CORS 请求的分类

客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类，分别是：</br>
① 简单请求</br>
② 预检请求</br>

9. 简单请求
   同时满足以下两大条件的请求，就属于简单请求：</br>
   ① 请求方式：GET、POST、HEAD 三者之一</br>
   ②HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain）</br>

10. 预检请求

只要符合以下任何一个条件的请求，都需要进行预检请求：</br>
① 请求方式为 GET、POST、HEAD 之外的请求 Method 类型</br>
② 请求头中包含自定义头部字段</br>
③ 向服务器发送了 application/json 格式的数据</br>
在浏览器与服务器正式通信之前，浏览器会<font color='red'>先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求</font>，所以这一次的 OPTION 请求称为“预检请求”。<font color='red'>服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据</font>。</br>

11. 简单请求和预检请求的区别

    `简单请求的特点`：客户端与服务器之间只会发生一次请求。
    `预检请求的特点`：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求。

#### 4.6 JSONP 接口

1. 回顾 JSONP 的概念与特点

   概念：浏览器端通过<script> 标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP。</br>
   特点：</br>
   ①JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象。</br>
   ②JSONP 仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求。</br>

2. 创建 JSONP 接口的注意事项
   如果项目中`已经配置了 CORS 跨域资源共享`，为了`防止冲突`，`必须在配置 CORS 中间件之前声明 JSONP 的接口`。否则 JSONP 接口会被处理成开启了 CORS 的接口。示例代码如下：

```js
// 优先创建 JSONP 接口[这个接口不会被处理成 CORS 接口]
app.get('/api/jsonp',(req,res) => [ })
//再配置 CORS 中间件[后续的所有接口，都会被处理成 CORS 接口]
app.use(cors())
// 这是一个开启了 CORS 的接口
app.get('/api/get',(req, res) => { })
```

3. 实现 JSONP 接口的步骤

① 获取客户端发送过来的回调函数的名字</br>
② 得到要通过 JSONP 形式发送给客户端的数据</br>
③ 根据前两步得到的数据，拼接出一个函数调用的字符串</br>
④ 把上一步拼接得到的字符串，响应给客户端的<script> 标签进行解析执行</br>

4. 实现 JSONP 接口的具体代码

```js
app.get('/api/jsonp',(req，res) => {
  //1.获取客户端发送过来的回调函数的名字
  const funcName = req.query.callback
  // 2.得到要通过 JSONP 形式发送给客户端的数据
  const data = { name: 'zs', age: 22 }
  // 3.根据前两步得到的数据，拼接出一个函数调用的字符串
  const scriptStr ='${funcName}(${JSON.stringify(data)})'
  //4.把上一步拼接得到的字符串，响应给客户端的 <script> 标签进行解析执行
  res .send(scriptstr)
})
```

5. 在网页中使用 jQuery 发起 JSONP 请求
   调用$.ajax() 函数，提供 JSONP 的配置选项，从而发起 JSONP 请求，示例代码如下：

```js
$('#btnJSONP').on('click', function () {
  $.ajax({
    method:'GET'
    url: "http://127.0.0.1/api/jsonp',
    dataType:'jsonp'，// 表示要发起 JSONP 的请求
    success: function (res) {
      console.log(res)
    }
  })
})
```
