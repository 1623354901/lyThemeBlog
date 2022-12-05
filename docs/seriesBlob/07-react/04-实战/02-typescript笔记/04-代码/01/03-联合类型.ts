{
  //  | 称为联合类型
  let num: string | number = 18
  num = 20
  num = 'abc'

  let timer: number | null = null
  timer = setInterval(() => {}, 1000)

  // 定义一个数组，数组中可以有数字或者字符串
  let arr: (number | string)[] = [1, 'abc', 2]
}
