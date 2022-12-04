// 基本使用
// 通过{}就可以指定对象的类型
// const user: { 
//   name: string
//   age: number
//   sayHi(): void
// } = {
//   name: '张三',
//   age: 20,
//   sayHi() {
//     console.log('123')
//   }
// }


// 老师的类型
// 姓名 字符串
// 年龄 数字
// 爱好  ['唱歌', '看剧']
// 方法  打招呼  睡觉
//  react的组件
// 父组件需要传递一个对象给子组件 prop-types


let tea: {
  name: string
  age: number
  hobby: string[],
  sayHi(): void,
  sleep(time: number): number
} = {
  name: '乔老师',
  age: 38,
  hobby: ['洗脚', '大保健'],
  sayHi() {
    console.log('大家好')
  },
  sleep(time) {
    return time + 1000
  }
}

