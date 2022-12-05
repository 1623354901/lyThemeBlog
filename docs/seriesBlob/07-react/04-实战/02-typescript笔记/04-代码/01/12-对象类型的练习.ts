type IUser = {
  name: string
  age: number
  sayHi: (name: string) => void
}

function printInfo (user: IUser) :void {
  console.log(user.name)
  console.log(user.age)
  user.sayHi('abc')
}

printInfo({
  name: '张三',
  age: 100,
  sayHi() {
    console.log('哈哈哈')
  }
 })


