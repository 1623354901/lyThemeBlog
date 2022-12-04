// interface ILength {
//   length: number
// }
// // function fn<Type>(value: Type): Type {
// function fn<Type extends ILength>(value: Type): Type {
//   // Type类型必须由length
//   console.log(value.length)
//   return value
// }

// fn('abc')
// fn([1, 2, 3])

// fn(132)
// function setElement<Type extends HTMLElement>(element: Type): Type {
//   console.log(element.innerText)
//   return element
// }

// const a = document.createElement('a')
// setElement(a)

// 指定多个泛型类型
// keyof 可以获取到一个类型 接口 所有的key的联合类型
// keyof {name:'zs',age: 18}   'name'|'age'

// key的取值只能是 Type类型中所有的key
function getProperty<Type extends object, Key extends keyof Type>(
  obj: Type,
  key: Key
) {
  return obj[key]
}
// 封装一些通用方法

getProperty({ name: 'zs', age: 18 }, 'name')

getProperty({ a: 'b', c: 'd' }, 'c')

// getProperty(1, 'toFixed')
// getProperty(1, 'toString')

// 获取一个dom对象的样式
// getStyle(dom, '指定的样式名称')
