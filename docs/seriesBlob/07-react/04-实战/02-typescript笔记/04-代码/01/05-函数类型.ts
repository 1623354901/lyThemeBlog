// 单独指定函数的参数和返回值的类型
// function 函数名(参数1: 参数1的类型 , 参数2:参数2的类型):返回值的类型 {
// 函数体
// }
function add(n1: number, n2: number): number {
  return n1 + n2
}

// const add2 = (n1: string, n2: string): string => {
//   return n1 + n2
// }

// 同时指定函数参数和返回值的类型
type Fn = (n1: number, n2: number) => number

const add2: Fn = (a, b) => {
  return a + b
}

const sub: Fn = (n1, n2) => {
  return n1 - n2
}

add(1, 2)
sub(200, 100)
