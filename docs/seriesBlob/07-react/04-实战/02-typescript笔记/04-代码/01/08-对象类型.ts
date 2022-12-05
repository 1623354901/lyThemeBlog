// 在ts中提供了一种新的语法：接口
// 接口就是专门用于提供对象的类型
// interface 接口的名字 {对象描述}
interface User {
  name: string
  age: number
  gender: boolean
  sayHi: () => void
  // add(n1: number, n2: number): number
  add: (n1: number, n2: number) => number
}

const user2: User = {
  name: '李思思',
  age: 30,
  gender: false,
  sayHi() {
    console.log('大家好')
  },
  add(n1, n2) {
    return n1 + n2
  },
}

// const user: User = {
//   name: '张三',
//   age: 18,
//   gender: true,
//   sayHi() {
//     console.log('哈哈哈')
//   },
//   add(n1, n2) {
//     return n1 + n2
//   },
// }
