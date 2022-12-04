// type a = 'up' | 'down'
// console.log(a)
// // 定义枚举类型
var Direction
;(function (Direction) {
  // 指定枚举类型的值

  Direction[(Direction['Up'] = 0)] = 'Up'
  Direction[(Direction['Down'] = 1)] = 'Down'
  Direction[(Direction['Left'] = 2)] = 'Left'
  Direction[(Direction['Right'] = 3)] = 'Right'
})(Direction || (Direction = {}))

function changeDirection(direction) {
  console.log(direction)
}
// ts中枚举：不仅仅是类型，还是值
