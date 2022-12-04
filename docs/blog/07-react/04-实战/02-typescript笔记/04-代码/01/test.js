function printInfo (user) {
  console.log(user.name)
  console.log(user.age)
  user.sayHi()
}

printInfo({
  sayHi() {
    console.log('123')
  }
})