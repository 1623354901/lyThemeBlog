---
title: JS遍历对象的几种方式
date: 2023-03-20
tags:
    - JS
categories:
    - JS
    - 中金
publish: true
---

### JS 遍历对象的几种方式

#### 1、for in

for in 循环是最基础的遍历对象的方式，它还会得到对象原型链上的属性

```
const obj=Object.create({
  bar:'bar'
})
obj.foo='foo'
for(let key in obj){
  console.log(obj[key]);//foo,bar
}
//这个时候可以使用对象的  `hasOwnProperty`方法过滤掉原型链上的属性
for(let key in obj){
  if(obj.hasOwnProperty(key)){
    console.log(obj[key]);//foo,bar
  }
}
```

#### 2、Object.keys

Object.keys() 是 ES5 新增的一个对象方法，该方法返回对象自身属性名组成的数组，它会自动过滤掉原型链上的属性，然后可以通过数组的 forEach() 方法来遍历

```
Object.keys(obj).forEach((key) => {
 console.log(obj[key]) // foo
})
```

另外还有 Object.values() 方法和 Object.entries() 方法，这两方法的作用范围和 Object.keys() 方法类似

#### 3、Object.getOwnPropertyNames

Object.getOwnPropertyNames() 也是 ES5 新增的一个对象方法，该方法返回对象自身属性名组成的数组，包括不可枚举的属性，也可以通过数组的 forEach 方法来遍历
注意：for in 循环和 Object.keys() 方法都不会返回对象的不可枚举属性

```js
// 创建一个对象并指定其原型，bar 为原型上的属性
// baz 为对象自身的属性并且不可枚举
const obj = Object.create({
 bar: 'bar'
}, {
 baz: {
  value: 'baz',
  enumerable: false
 }
})

obj.foo = 'foo'

Object.keys(obj).forEach((key) => {
 console.log(obj[key]) // foo
})
Object.getOwnPropertyNames(obj).forEach((key) => {  console.log(obj[key]) // baz, foo })
```

#### 4、Object.getOwnPropertySymbols

ES2015 新增了 Symbol 数据类型，该类型可以作为对象的键，针对该类型 ES2015 同样新增 Object.getOwnPropertySymbols() 方法
Object.getOwnPropertySymbols() 方法返回对象自身的 Symbol 属性组成的数组，不包括字符串属性

```js
Object.getOwnPropertySymbols(obj).forEach((key) => {
    console.log(obj[key])
})
//什么都没有，因为该对象还没有 Symbol 属性
```

```js
// 给对象添加一个可枚举的 Symbol 属性
obj[Symbol('foo')] = 'Symbol foo'

Object.getOwnPropertySymbols(obj).forEach((key) => {
    console.log(obj[key]) // Symbol baz, Symbol foo
})
```

#### 5、Reflect.ownKeys

Reflect.ownKeys() 方法是 ES2015 新增的静态方法，该方法返回对象自身所有属性名组成的数组，包括不可枚举的属性和 Symbol 属性

```js
Reflect.ownKeys(obj).forEach((key) => {
    console.log(obj[key]) // baz, foo, Symbol baz, Symbol foo
})
```

| 方式                           | 基本属性 | 原型链 | 不可枚举 | Symbol |
| ------------------------------ | :------: | :----: | :------: | ------ |
| for in                         |    是    |   是   |    否    | 否     |
| Object.keys()                  |    是    |   否   |    否    | 否     |
| Object.getOwnPropertyNames()   |    是    |   否   |    是    | 否     |
| Object.getOwnPropertySymbols() |    否    |   否   |    是    | 是     |
| Reflect.ownKeys()              |    是    |   否   |    是    | 是     |
