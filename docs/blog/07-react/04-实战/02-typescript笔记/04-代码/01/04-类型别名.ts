{
  // type 自定义的类型别名 = 类型
  type CustomArray = (number | string)[]
  // type 数字 = number
  // type 字符串 = string

  // let 姓名: 字符串 = '中国人'
  // console.log(姓名)

  // 如果某一个复杂的类型，使用的次数特别多，可以使用类型别名
  const list: CustomArray = [1, 'abc', 2]

  const list2: CustomArray = ['abc', 100, 200]
}
