// 指定了一个接口
interface IPerson {
  name: string,
  age: number
}

type Person = {
  name: string,
  age: number
}


const user: IPerson = {
  name: '张三',
  age: 20
}