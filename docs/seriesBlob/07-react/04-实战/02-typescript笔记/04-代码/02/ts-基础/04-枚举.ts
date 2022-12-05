// type a = 'up' | 'down'
// console.log(a)

// // 定义枚举类型
enum Direction {
  // 指定枚举类型的值
  Up,
  Down,
  Left,
  Right,
}

function changeDirection(direction: Direction) {
  console.log(direction)
}

// ts中枚举：不仅仅是类型，还是值
console.log(Direction[0])
changeDirection(Direction.Up)
changeDirection(Direction.Down)
