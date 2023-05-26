---
title: js 用 window.open()方法跳转到新页面并且用post方式传参
date: 2023-03-25
tags:
    - JS
categories:
    - JS
    - 中金
publish: true
---

### js 用 window.open()方法跳转到新页面并且用 post 方式传参

1.一般地，如果想打开新页面跳转到某网页，这么做：window.open(url, '\_blank');。 2.如果要求传参，则：window.open(url+'?id=1', '\_blank');。 3.如果要求 post 传参，则需要构建 form 进行 submit 了：

```js
openPostWindow('http://localhost:8082/Report/a.jsp', {
    id: 1,
    userName: 'zs',
    password: '123',
    loginUrl: 'aaa',
    reportUrl: 'bbb',
})

function openPostWindow(url, params) {
    var tempForm = document.createElement('form')
    tempForm.id = 'tempForm1'
    tempForm.method = 'post'
    tempForm.action = url
    tempForm.target = '_blank' //打开新页面

    for (var key in params) {
        tempForm.appendChild(generateInput(key, params))
    }
    if (document.all) {
        tempForm.attachEvent('onsubmit', function () {}) //IE
    } else {
        var subObj = tempForm.addEventListener('submit', function () {}, false) //firefox
    }
    document.body.appendChild(tempForm)
    if (document.all) {
        tempForm.fireEvent('onsubmit')
    } else {
        tempForm.dispatchEvent(new Event('submit'))
    }
    tempForm.submit()
    document.body.removeChild(tempForm)
}

function generateInput(key, params) {
    var hideInput = document.createElement('input')
    hideInput.type = 'hidden'
    hideInput.name = key
    hideInput.value = params[key]
    return hideInput
}
```

### 通过 window.open post 传参后，在新页面取值的思路

我们把原页面叫做 a,新页面叫做 b
a->b
1、通过 localstorage,在 a 页面存值，在 b 取值
2、通过接口：在 a 页面时把数据给接口，传到后端，在 b 页面在通过接口取值
3、postMessage

    - 原理：https://blog.csdn.net/rongliang_chen/article/details/109840093
    - 官方使用文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage
    - 示例：https://blog.csdn.net/cold_Blooder/article/details/119417682
