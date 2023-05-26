---
title: validate和validateField的使用及区别
date: 2023-05-18
tags:
    - Vue
categories:
    - Vue实例
    - 中金
publish: true
---

相同点：validate 和 validateField 都是对 form 表单进行校验的方法
不同点：

#### validate 方法回校验表单的整个树形，只要你给这个字段设置了 rule

```js
 this.$refs.表单名称.validate(async (valid) => {
        if (!valid) {
          //检验不通过走这里
          return;
        }
        //校验通过走这里
    }
```

#### validateField 有些时候我们只需要验证表单中的部分字段,其他字段不需要

使用 validateField 的注意事项

-   我们得知道，使用 validateField 部分校验数组的时候，数组有几位，就会回调几次。当也就是空的时候，表示验证通过，回调返回为“ ”，所以就是，你校验几个规则，就会返回几个结果，如果通过就为“”（空）

```js
 let validateFieldList = [];
      this.$refs.loginForm.validateField(
         //这里要放数组,数组中写上要校验的字段
        ["userName", "password", "mobilePhone"],
        async (valid) => {
          if (!valid) {
            //校验通过走这里,每通过一次,会往这个数组里加一个""
            validateFieldList.push(valid);

            //因为我这里总共校验了三个字段,所有最终三个字段都校验成功之后,数组中会有三个""
            if (
              validateFieldList.length == 3 &&
              validateFieldList.every((item) => item === "")
            ) {
              //这里写校验通过的业务逻辑
            }
            //校验不通过走这里
            return;
          }
        }
```
