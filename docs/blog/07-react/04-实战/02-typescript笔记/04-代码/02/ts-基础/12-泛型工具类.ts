// ts给我们提供了很多工具方法 这些工具方法基于泛型实现的
// Partial
type User = {
  name: string
  age: number
  gender: string
}

// 接收一个类型，返回一个新类型，并且会让新类型中的所有属性变成可选的
// type PatialUser = Partial<User>

// // readonly  返回一个新类型，而且新类型中所有的属性都是只读的
// type ReadOnlyUser = Readonly<User>

// const user: ReadOnlyUser = {
//   name: 'zs',
//   age: 20,
//   gender: '男',
// }
// 从一个类型中选取某些属性
type PickUser = Pick<User, 'gender' | 'name'>

// 从一个类型中排除属性
type OmitUser = Omit<User, 'gender'>
