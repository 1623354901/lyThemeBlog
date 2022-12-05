// console.log(typeof 11)

// interface Obj {
//   x: number
//   y: number
// }

// let obj = {
//   x: 10,
//   y: 20,
// }

// // 将来调用一些第三方库，，，，第三方库的配置对象
// // 因为第三方库基本都是基于ts

// type Obj = typeof obj

// function show(obj: Obj) {
//   console.log(obj.x)
//   console.log(obj.y)
// }

// show({
//   x: 12,
//   y: 12,
// })

const obj = {
  username: 'zs',
  age: 19,
  sayHi() {
    console.log('哈哈')
  },
}
type Obj = typeof obj

function get(obj: Obj) {
  console.log(obj.username)
  console.log(obj.sayHi())
}
