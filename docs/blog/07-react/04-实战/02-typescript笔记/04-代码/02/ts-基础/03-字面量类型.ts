// str的类型：string
// let str: string = 'hello'

// str = 'abc'

// str2的类型：hello  字面量类型
// const str2: 'hello' = 'hello'

// let str3: 'abc' = 'abc'

// let num: 1 = 1

// var num = 12
// 变量：值可以发生改变的量
// 字面量，直接量：通过字面的意思就能够看懂这个值的类型  'abc' 199 {} [] true

// 字面量类型一般要配合联合类型一起使用 |
// 贪吃蛇游戏

type Direction = 'up' | 'down' | 'left' | 'right'

// action-types: const action

function changeDirection(direction: Direction): void {
  console.log(direction)
}

changeDirection('down')
changeDirection('up')

// 性别
interface User {
  name: string
  age: number
  gender: 'Man' | 'Women'
}

const user: User = {
  name: '张三',
  age: 18,
  gender: 'Women',
}

type ActionType = 'ADD_TODO' | 'DEL_TODO' | 'UPDATE_TODO' | 'GET_TODO'

let t: ActionType = 'DEL_TODO'
