
### 1、ES6模块化
  （1）模块化开发有AMD,CMD,common.js以及最新的ES6模块化
      - AMD,CMD,common.js有开发者自己开发的，有局限性
      - AMD,CMD用于浏览器的模块化开发
      - COMMON.js 用于服务器端的模块化开发
      - node.js中的导出 const 变量=exports('模块名'),导入module.require={},沿用的common.js中的模块化方法

      - ES6 用来替代上述三种，
  （2）ES6 模块化开发
      有三种导出导入方式：默认导入导出，按需导入导出，直接导入
      1> 默认导入导出
        - 默认导入：export default{默认导出的成员}
        - 默认导出：inport 接收名称 from ‘模块标识符’。模块标识符：路径或模块名
        - 默认导出只能有一个export default
        - 默认导入接收名称可以任意名称，只要是合法的成员名称
      2> 按需导入导出
        - 按需导入：export let a1=10;export let a2=10;
        - 按需导出：inport {a1} from './m1.js' 
        - 每个模块中可以多次按需导出
        - 按需导入成员名称和导出的名称应一致
        - 按需导入可以使用as关键字重命名 import {a1 as aa} from './m1.js'
        - 按需导入和默认导入可以一起使用 import info {a1} from './m1.js'
      3> 直接导入并执行模块代码
        - import './m1.js'
    （3）ES6模块化开发注意事项
### 2、promise
    (1) 回调地狱：多层回调函数的项目嵌套，形成回调地狱
        缺点：
        - 代码耦合性太强，难以维护
        - 代码冗余，可读性差
    (2) promise :解决回调地狱
        1> promise是一个构造函数，
          - 实例：const p=new Promise() p为promise的实例，new出来一个实例代表一个异步操作
        2> promise的prototype包含.then(),.catch(),.finally();
          - 都可以通过原型链的方式访问到.then()方法。p.then();
        3> .then()方法用预先指定成功和失败的回调函数,成功的失败必传，失败的回调可选传与不传
          p.then(成功的回调函数，失败的回调函数)
          p.then(result=>{},error=>{})
    (3) then-fs读取文件
        node.js fd读取文件仅支持回调地狱读取文件，不支持promise的调用方式，我们可以按照then-fs包，基于promise的方式读取文件,
        ```
        npm install then-fs
        import thenFs from 'then-fs'
        thenFs.readFile('./1.txt','utf8').then(r1=>{},err1=>{console.err1.message});.then(成功的回调，失败的回调)
        thenFs.readFile('./2.txt','utf8').then(r1=>{},err1=>{console.err1.message});
        thenFs.readFile('./3.txt','utf8').then(r1=>{},err1=>{console.err1.message});
        ```
        上述无法保证文件读取顺序
    (4) 基于promise按顺序读取文件
        promise支持链式调用，解决回调地狱的问题
    (5) Promise.prototype.catch() 用来捕获和处理错误
        .catch()如果放在.then后面，如果报错，会导致.then()中的代码无法实行。
        如果不希望前面的错误导致后续的.then无法正常执行，则可以将.catch()的调用提前，示例代码如下：
        ```
        thenfs.readFile('/files/11.txt','utf8')
        .catch(err=>{
          console.log(err.message)
        })
        .then(r1=>{
          console.log("111");
        })
        .then(r2=>{
          console.log("222");
        })
        //11.txt文件不存在，catch捕捉到错误，打印，后面继续输出111，222
        ```
    (6)Promise.all()
      用来发起并行的Promise异步操作，等所有的异步操作全部结束后才会执行下一步的.then()操作(等待机制)
      ```
      import thenFs from 'then-fs'
      const promiseArr=[
        thenfs.readFile('./files/1.txt','utf8'),
        thenfs.readFile('./files/2.txt','utf8'),
        thenfs.readFile('./files/2.txt','utf8'),
      ];
      //需注意，数组中的顺序就是最终结果的顺序
      Promise.all(promiseArr).then(result=>{
        console.log(result)//所有文件读取成功才执行下一个.then()，等待机制
      }).catch(err=>{//捕获promise异步操作中的错误。
    
      })
      ```
    (7)Promise.race()赛跑机制，
      ```
      Promise.race(promiseArr).then(result=>{
      console.log(result)//只要任何一个读取完后就可以执行下一个.then(),赛跑机制
      }).catch(err=>{//捕获promise异步操作中的错误。
    
      })
      ```
    (8)基于Promise封装异步读取文件的方法
      要求：
      - 方法名称getFile
      - 方法接收一个形参fpath,表示要读取的文件的路径
      - 方法返回值为Promise实例对象
      ```
      // return new Promise()无法明确是ajax||文件，只是创建了一个形式上的异步操作
      //如果想要创建具体的异步操作，需要在new Promise()构造函数期间，传递一个funciton函数，将具体的异步操作定义到function函数中
      var that=this;
      function getFile(fpath){
        return new Promise(function(resolve,reject){
          false.readFile(fpath,'utf-8',(err,dataStr)=>{
            if(err){
              return reject(err)
            }
            resolve(dataStr)
          })
        })
      }
      //通过.then指定成功和失败的回调函数，可以在function的形参中进行接收
      getFile('./files/1.txt').then(dataStr=>{
      //成功的回调函数，传给形参resolve用的
        console.log(dataStr)
      },err=>{
      //失败的回调函数，传给形参reject用的
        console.log(err)
      }).catch(err=>{
        
      })
      ```
### 3、async,await
    是ES8引入的新语法，用来简化promise异步操作，解决.then()代码冗余，阅读性差，不易理解的问题
    如果某个方法的返回值promise实例对象，那么可以用await 用来修饰，修饰完成之后，这个方法变成一个值。
    如果某个方法用await修饰，那么方法名必须用async修饰
    ```
    import thenFs from 'then-fs';
    getFile(){
      var r=thenFs.readFile('./files/1.txt','utf8);
      console.log(r)//r为一个promise实例对象    
    }
    async function getFile(){
      var r1= await thenFs.readFile('./files/1.txt','utf8);
      console.log(r1)//r为一个promise实例对象    
      var r2= await thenFs.readFile('./files/2.txt','utf8);
      console.log(r2)
      var r3= await thenFs.readFile('./files/2.txt','utf8);
      console.log(r3)
    }
    ```
    注意事项
    - 如果function中使用了await,那么function必须被async修饰
    - 在async 方法中，第一个await之前的代码会同步执行，await之后的代码会异步执行
    ```
    console.log('A');
    async function getFile(){
      console.log('B');
      到这之后异步执行，主线程退出当前方法，打印D,然后r1,r2,r3,执行完之后执行log(r1,r2,r3)，最后打印C
      var r1= await thenFs.readFile('./files/1.txt','utf8);
      var r2= await thenFs.readFile('./files/2.txt','utf8);
      var r3= await thenFs.readFile('./files/2.txt','utf8);
      console.log(r1,r2,r3);
      console.log('C');
    }
    getFile();
    console.log('D');
    //打印顺序
    //A,B,D,(111,222,333),C


    ```
### 4、EventLoop
     (1) javaSCript是一门单线程执行的编程语言，同一时间只能做一件事情
        单线程执行队列任务的问题：如果前一个任务非常耗时，则后续的任务就不得不一直等待，从而导致程序假死的问题
     (2)同步任务和异步任务
        为了防止某个`耗时任务`导致`程序假死`的问题，javaScript把待执行的任务分为了两类：
        - 同步任务：
          - 又叫做`非耗时任务`，指的是在主线程上执行的那些任务
          - 只有前一个任务执行我完毕，才能执行后一个任务
        - 异步任务：
          - 又叫做`耗时任务`,异步任务由javaScript`委托给宿主环境`进行执行
          - 当异步任务执行完成后，会`通知javaScript主线程`执行异步任务的`回调函数`
     (3)同步任务和异步任务的执行过程
        1> 同步任务由主线程执行
        2> 异步任务交给宿主环境去执行，
        3> 已完成的异步任务`对应的回调函数`，会被加入到任务队列中等待执行
        4> JavaScript主线程的执行栈被清空后，会读取任务队列中的回调函数，放到栈中，次序执行
        5> javaScript 主线程不断重复上面的第4步
        ```
        consloe.log("A");同步任务
        fs.readFile('./files/1.txt',utf8,cbA)//异步任务，在宿主环境中执行
        setTimeout(cbC,1000);//异步任务，在宿主环境中执行
        consloe.log("C");同步任务
        //执行顺序：A,C,cbC,cbA。(cbA和cbC谁先执行完，谁先放到队列中)
        ``` 
      EventLoop概念：`javaScript主线程从"任务队列"中读取异步任务的回调函数，放到执行栈中依次执行。`这个过程是循环不断的，所有整个的这种运行机制又称为EventLoop（事件循环）
### 5、宏任务和微任务
      （1）JavaScript把异步任务又做了进一步划分，异步任务又分为两种：宏任务，微任务
          1> 宏任务
          - 异步Ajax请求
          - setTimeout,setInterval
          - 文件操作
          - 其他宏任务
          2> 微任务
          - Promise.then,.catch和.finally
          - process.nextTick
          - 其他微任务操作
      （2）宏任务和微任务的执行顺序：
                                    ------------------无---------------
                                  +                                    +
          宏任务==>执行完成==>是否有微任务--有-->执行完所有的微任务==>执行下一个宏任务
            +                                                           +
              ----------------------------------------------------------
          每个宏任务执行完成之后，都会检查`是否存在待执行的微任务`，如果有，则执行完所有微任务之后，再执行下一个宏任务
       （3）宏任务微任务业务场景--银行业务
          1> 小云和小腾去银行办理业务，首先取号排队                         --宏任务队列 
          2> 该银行网点只有一个柜员，小云在办理存款业务时，小腾只能等待       --单线程，宏任务按次序执行
          3> 小云办完存款业务之后，柜员询问他是否还想办理其他业务             --当前宏任务执行完，检查是否有微任务
          4> 小云告诉柜员：想要理财产品，办一张信用卡，最后再兑换点马年纪念币  -- 执行微任务，宏任务被推迟
          5> 小云离开柜台之后，柜员开始为小腾办理业务                        -- 所有微任务完成，开始执行下一个宏任务
       （4）面试题
          ```
            setTimeout(function(){
              console.log("1");
            });
            new Promise(function(resolve){//同步任务，只要new一个Promise实例，里面的function就会立即执行
              console.log("2");
              resolve();
            }).then(function(){//微任务
              console.log("3")
            })
            console.log("4")
            //同步任务（2，4）---》检查待执行的微任务（3）---》没有待执行的微任务，执行下一个宏任务（1）
            //2，4，3，1
    
          ```
          ```
          console.log("1");
          setTimeout(function(){
              console.log("2");
              new Promise(function(resolve){
              console.log("3");
              resolve();
            }).then(function(){
              console.log("4")
            })
          });
          new Promise(function(resolve){
              console.log("5");
              resolve();
          }).then(function(){
              console.log("6")
          })
          setTimeout(function(){
              console.log("7");
              new Promise(function(resolve){
              console.log("8");
              resolve();
            }).then(function(){
              console.log("9")
            })
          });
          //1,5,6,2,3,4,7,8,9
    
          console.log("1");                                   // 1 5 6 2 3 7 8 4 9
            setTimeout(function(){
                setTimeout(() => {
                    console.log("2");
                });
                new Promise(function(resolve){
                setTimeout(() => {
                    console.log("3");
                });
                resolve();
                }).then(function(){
                    console.log("4")
                })
            });
            new Promise(function(resolve){
                console.log("5");
                resolve();
            }).then(function(){
                console.log("6")
            })
            setTimeout(function(){
                console.log("7");
                new Promise(function(resolve){
                console.log("8");
                setTimeout(() => {
                    resolve();
                });
            }).then(function(){
                console.log("9")
            })
            });
          ```

## vue相关

## vue及脚手架

## webpack

### webpack基本概念，使用步骤

#### 1、webpack作用

```
- 减少文件数量
- 压缩代码体积
- 提交浏览器打开的速度
```

#### 2、webpack基本概述

```
本质是一个第三方模块包，用于分析，并打包代码
- 支持所有类型的文件
- 支持less/sass=>css
- 支持ES6/7/8=>ES5 代码降级处理，兼容通用
- 压缩代码，提高加载速度
```

#### 3、环境准备

```
- 初始化包环境-yarn init(yarn比npm快)
- 安装依赖包- yarn add webpack webpack-cli -D(-D:把两个包的版本记录到开发环境)
- package.json中加入
​```
"script":{
  "build":"webpack"
}
​```
```

### webpack配置

#### 1、修改默认入口和出口

- 默认配置文件：新建webpack.config.js
- 填入配置

```
   const path=require("path");//node内部核心模块，处理路径用的
   module.exports={
      enter:'./src/main.js',//入口
      output:{//出口
         path:path.resolve(__dirname,'dist'),//__dirname:获取当前项目绝对路径，//dist：出口文件夹名字
         filename:'bundle.js'//出口文件名称
      },
      
   }
```

- 同时修改入口文件名：index.js==>main.js

#### 2、打包流程

```
npm run build==>num run webpack==>根据配置文件得到配置参数，（如果没有配置文件，用默认的。）==>执行默认文件配置，找到入口==>先构建依赖关键图，编译各个模块的文件==>输出到指定出口文件
注意：`所有要被打包的资源都要跟入口产生直接/简介的引用关系`--所有文件都要引到入口文件中
```

#### 3、自动生成html文件

   html-webpack-plugin插件：简化html文件的创建

- 安装：npm install --save-dev html-webpack-plugin //--save-dev保存到开发环境
- 用法：先引入组件，在module.exports中的plugins中new一个新的HtmlWebpackPlugin并写明html文件

```
   const path=require("path");//node内部核心模块，处理路径用的
   const HtmlWebpackPlugin=require("html-webpack-plugin");
   module.exports={
    entry:'./src/main.js',//入口
    output:{//出口
        path:path.resolve(__dirname,'dist'),//__dirname:获取当前项目绝对路径，//dist：出口文件夹名字
        filename:'bundle.js'//出口文件名称
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'//告诉webpack使用插件时，以我们自己的html文件作为模板去生成dist/html文件
        })
    ]
    
}
```

#### 4、webpack加载器-打包css文件

   webpack默认只能处理js文件，所以需要引入加载器

- 安装：npm install --save-dev css-loader--让webpack能处理css类型的文件
  npm install --save-dev style-loader--把css插入到DOM中
  建议两个同时使用

```
   module: {//加载器
        rules: [//规则
          {//一个具体的规则
            test: /\.css$/i,//匹配.css结尾的文件，忽略大小写
            use: ["style-loader", "css-loader"],//让webpack使用这两个处理css文件
            //从右到左，所以两者位置不能颠倒
            //css-loader:webpack解析css文件-把css代码一起打包进js中
            // style-loader:css代码插入到DOM中(style标签)
          },
        ],
      },
```

#### 5、less-loader

   将less转为css

- 安装：npm install less less-loader --save-dev --下载less包及加载器

```
   module: {//加载器
        rules: [//规则
          {//一个具体的规则
            test: /\.css$/i,//匹配.css结尾的文件，忽略大小写
            use: ["style-loader", "css-loader"],//让webpack使用这两个处理css文件
            //从右到左，所以两者位置不能颠倒
            //css-loader:webpack解析css文件-把css代码一起打包进js中
            //style-loader:css代码插入到DOM中(style标签)
          },
          {//一个具体的规则
            test: /\.less$/i,
            use: ["style-loader", "css-loader","less-loader"],
          },
        ],
      },
```

#### 6、webpack处理图片--配置asset

   webpack5：

```
   //在module.rules下：
   {//图片文件的配置（仅适用于webpack5)
            test:/\.(jpg|gif|png|jpeg)/,
            type:'asset'//匹配上面的文件后，webpack会把他们当作静态资源处理打包

   }
   //如果设置的是asset模式，
   // 以8KB大小区分图片文件，
   // 小于8KB的，把图片文件转为base64,打包进js中
   // 大于8kb的，直接把图片文件输出到dist下
```

   webpack4及以下；用url-loader和file-loader

#### 7、webpack处理图片的优缺点：

- 图片翻译成base64，放到了js文件中：
  - 好处：浏览器不用发送请求了，直接可以读取，速度快
  - 坏处：图片太大，再转‘base64’就会让图片的体积增大30%左右，得不偿失

#### 8、webpack处理字体图标

```
   //在module.rules下：
   {
      test:/\.(eot|svg|ttf|woff|woff2)$/,
      type:'asset/resource',//所以的字体图标文件，都输出到dist下
      generator:{//生成文件的名字-定义规则
         filename:'fonts/[name].[hash:6][ext]'//fonts目录下原来自己的名字+六位随机哈希值+自己文件后缀
      }
      }
```

#### 9、webpack加载器-babel降级js语法

- babel:https://www.babeljs.cn/docs/
- babel-loader:https://webpack.docschina.org/loaders/babel-loader/
- 安装：npm install -D babel-loader @babel/core @babel/preset-env

```
   //在module.rules下
   {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,//不去匹配这些文件夹下的文见
      use: {
         loader: 'babel-loader',//使用这个loader处理js文件
         options: {//加载器选项
            presets: ['@babel/preset-env']//预设：@babel/preset-env降级规则-安装这里的规则降级我们的js语法
         }
      }
   }
```

### webpack开发服务器

- 减少打包时间，实时更新代码
- webpack-dev-server:https://webpack.docschina.org/configuration/dev-server/
- 下载安装:npm install -D webpack-dev-server
- 自定义webpack开发服务器启动命令serve--在package.json里

```
   "scripts": {
    "build": "webpack",
    "serve":"webpack serve"
   },
```

   在webpack.config.js

```
   //在module.exports下
   devServer:{
      port:3000,
    }
```

### vue

```
更少的时间，干更多的活，开发速度快
vue是渐进式框架：渐进：逐渐使用，逐渐进步
声明式渲染-组件系统-客户端路由-大规模状态管理-构建工具
```

### vue脚手架

```
搭建命令
​```
npm global install @vue/cli
vue creat vueli-demo
​```
运行命令
​```
npm run serve
​```
脚手架目录作用
- node_modules-下载的第三方包
- public 静态文件目录
  - index.html 网页浏览的页面
- src 业务文件夹
  - assets 静态文件
  - components 组件文件夹
  - app.vue 整个项目的根组件
  - main.js 入口js文件
- .gitignore git提交忽略配置
- babel.config.js babel设置
- package.json 依赖包列表
```

### vue开发服务器

```
在vue.config.js写入：
​```
modules.exports{
  devServer:{
    port:3000,
    open:true//浏览器自动打开
  }
}
​```
```

### vue-eslint

```
代码检查工具，如何关闭？在vue.config.js中加入配置
​```
modules.exports{
  devServer:{
    port:3000,
    open:true//浏览器自动打开
  },
  lintOnSave:false//关闭eslint校验
}
​```
```



1、差值表达式

```
- 在dom标签中，直接插入vue数据变量
- 又叫声明式渲染/文本差值
- 语法：{{表达式}}
```

### 2、MVVM设计模式

```
- 数据驱动视图
- 设计模式：对代码进行分层，引入一种框架的概念
- MVVM 是模型，视图，视图模型双向关联的一种设计模式
- M:数据层（data）,V:视图层（template），VM:调度者
```

### 3、v-bind绑定属性

```
- v-bind:属性名="vue变量"
- 简化：:bind:属性名="vue变量"
```

### 4、v-on绑定事件

```
- 语法：
  v-on:事件名="要执行的少量代码"
  v-on:事件名="methods里的函数名"
  v-on:事件名="methods里的函数名（参数）"
- 简写：@事件名="methods里的函数名"
- 接收事件对象
  1、@click="one"  ==>事件触发无传值，在方法中可以直接用形参接事件对象
    ```
    one(e){
      e.preventDefault()//阻止默认点击事件
    }
    ```
  2、@click="twe(10,$event)"  ==>事件触发有传值，需要手动传入$event
  ```
    twe(num e){
      e.preventDefault()
    }
    ```
```

### 5、修饰符

```
在事件后面.修饰符-给事件带来更强大的功能
- 语法：@事件名.修饰符="methods里的函数"
- 修饰符列表：
  - .stop：阻止事件冒泡
  - .preven：阻止默认行为
  - .once：程序运行期间，只触发一次事件处理函数
```

### 6、按键修饰符

```
@键盘事件.修饰符="methods里的函数名"

@keyup.enter="methods里的函数名"; --按下起来
@keydown.esc="methods里的函数名"--按下
更多修饰符：https://cn.vuejs.org/v2/guide/event.html
```

### 7、v-model

```
语法：v-model="Vue数据变量"
- 双向数据绑定
  - 变量变化--》视图自动同步
  - 视图变化--》变量自动同步

- 下拉菜单要绑定在select上，option中的value与v-model关联
- 复选框v-model的变量值：非数组-关联的是复选框的checked属性； 数组-关联的是复选框的value属性
- 单选框，同一组radio必须有同名的name值，与选中的value关联

v-model修饰符
语法：v-model.修饰符="vue数据变量"
- .number --以parseFloat转成数字类型
- .trim   --去除首尾空白字符
- .lazy   --在change时触发而非input时
```

### 8、v-text和v-html

```
innerText和innerHTML区别：前者当做普通字符串直接显示，后者当做标签进行解析再显示
- v-text:直接显示
- v-html:当成标签解析显示
两者会覆盖差值表达式
```

### 9、v-if和v-show

```
控制标签的隐藏和显示
区别：
v-if:DOM树上直接移除（移除不要）
v-show:通过设置display:none的值来控制（频繁切换，性能更好）
v-if和v-else能一起使用
```

### 10、v-for

```
语法：v-for="(值变量,索引变量) in 目标结构" 想要谁循环，放在谁身上
可以遍历 数组，对象，数字
对象语法：v-for="(value,key) in 对象"	
```

### 11、v-for更新检测，key作用

## 面试题

### 1. Vue的最大优势是什么?

​	简单易学, 轻量级整个源码js文件不大, 双向数据绑定, 数据驱动视图, 组件化, 数据和视图分离, 

​	vue负责关联视图和数据, 作者中国人(尤雨溪), 文档都是中文的, 入门教程非常多, 上手简单. 

​	相比传统网页, vue是单页面可以只刷新某一部分

### 2. Vue和jQuery区别是什么?

​	jQuery应该算是一个插件, 里面封装了各种易用的方法, 方便你使用更少的代码来操作dom标签

​	Vue是一套框架, 有自己的规则和体系与语法, 特别是设计思想MVVM, 让数据和视频关联绑定, 省略了很多DOM操作. 然后指令还给标签注入了更多的功能

### 3. mvvm和mvc区别是什么?

​	MVC: 也是一种设计模式, 组织代码的结构, 是model数据模型, view视图, Controller控制器, 在控制器这层里编写js代码, 来控制数据和视图关联

​	MVVM: 即Model-View-ViewModel的简写。即模型-视图-视图模型, VM是这个设计模式的核心, 连接v和m的桥梁, 内部会监听DOM事件, 监听数据对象变化来影响对方. 我们称之为数据绑定

### 4. Vue常用修饰符有哪些?

​    .prevent: 提交事件不再重载页面；

​	.stop: 阻止单击事件冒泡；

​	.once: 只执行一次这个事件

### 5. Vue2.x兼容IE哪个版本以上

​	不支持ie8及以下，部分兼容ie9 ，完全兼容10以上， 因为vue的响应式原理是基于es5的Object.defineProperty(),而这个方法不支持ie8及以下。

### 6. 对Vue渐进式的理解

​	渐进式代表的含义是：主张最少, 自底向上, 增量开发, 组件集合, 便于复用

### 7. v-show和v-if的区别

​	v-show和v-if的区别? 分别说明其使用场景?

​	v-show 和v-if都是true的时候显示，false的时候隐藏

​	但是：false的情况下，

​	v-show是采用的display:none   

​	v-if采用惰性加载

​	如果需要频繁切换显示隐藏需要使用v-show

### 8. 说出至少4个Vue指令及作用

​	v-for 根据数组的个数, 循环数组元素的同时还生成所在的标签

​	v-show 显示内容

​	v-if    显示与隐藏  

​	v-else  必须和v-if连用  不能单独使用  否则报错  

​	v-bind  动态绑定  作用： 及时对页面的数据进行更改, 可以简写成:分号

​	v-on  给标签绑定函数，可以缩写为@，例如绑定一个点击函数  函数必须写在methods里面

​	v-text  解析文本

​	v-html   解析html标签

### 9. 为什么避免v-for和v-if在一起使用

​	Vue 处理指令时，v-for 比 v-if 具有更高的优先级, 虽然用起来也没报错好使, 但是性能不高, 如果你有5个元素被v-for循环, v-if也会分别执行5次.      

  