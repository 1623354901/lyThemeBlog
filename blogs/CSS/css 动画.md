---
title: js 用 window.open()方法跳转到新页面并且用post方式传参
date: 2023-04-05
tags:
    - CSS动画
categories:
    - CSS
    - 中金
publish: true
---

```
<!DOCTYPE html>
<html>
    <head>
        <style>
          div{width:100px;height:100px;background:red;animation:my 5s;}
          @keyframes my
         {
              0%{background:red;width:100px;}
              100%{background:blue;width:200px;}
         }
        </style>
    </head>
    <body>
        <div></div>
    </body>
</html>
```

最常用的几种属性有以下几种：
1、animation-name(动画名称)
animation-name 属性是必须存在的，因为 animation-name 的值默认是 none，没有动画。
2、animation-duration(动画执行一次所需时间)
animation-duration 属性也是必须存在的，因为 animation-duration 的值默认是 0，没有动画。
3、animation-delay(动画在开始前的延迟时间)
animation-delay 的值可以是秒（s）或者是毫秒（ms）,默认值是 0，没有延迟。
4、animation-timing-function(动画以何种运行轨迹完成一个周期)
animation-timing-function 的值是贝塞尔曲线，默认值是 ease,表示动画以低速开始，然后加速，最后在结束前变慢。 最常用的值有以下几个：
（1）linear:表示动画从头到尾的速度都是相同的。
（2）ease-in:表示动画以低速开始。
（3）ease-out:表示动画以低速结束。
（4）ease-in-out:表示动画以低速开始和结束。
如果没有想用的值，也可以直接使用三次贝塞尔函数，使用网站是http://cubic-bezier.com，可直接调试出自己想要的值；也可以在浏览器中直接调试，现在浏览器调试工具中都支持贝塞尔函数可视化调试。
5、animation-iteration-count(动画播放次数)
animation-iteration-count 属性值有两种：
（1）直接写数字，自定义想要播放动画的次数。
（2）infinite：设置动画无线循环播放。
6、animation-fill-mode(定义元素动画结束以后或者未开始的元素样式)
默认值为 none，标示，不会在动画结束或者未开始时给元素 添加样式
常用属性值为：
（1）forwards:表示动画结束后，元素直接接使用当前样式。
（2）backwards:表示在动画延迟时间元素使用关键帧中 from 的属性值或者 to 属性值（当 animation-direction 为 reverse 或者 alternate-reverse 时）  
7、animation-direction(是否轮流反向播放动画)
默认值是 normal，动画正常播放。如果动画只播放一次，则该属性无效。
常用的属性值为：
（1）reverse:表示动画反向播放。
（2）alternate:表示动画在奇数次播放时为正向播放，为偶数次播放时为反向播放。
（3）alternate-reverse: :表示动画在奇数次播放时为反向播放，为偶数次播放时为正向播放。  
animation 属性在书写通常合并在一起，除非需要单独设置的属性值，animation 属性的简写形式为：animation:code 2s 2s linear infinite alternate forwards;
