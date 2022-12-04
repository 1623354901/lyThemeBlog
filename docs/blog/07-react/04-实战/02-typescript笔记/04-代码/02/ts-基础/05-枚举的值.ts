// enum Direction {
//   Up = 3,
//   Down = 8,
//   Left = 10,
//   Right = 11,
// }

// 发送请求，，，需要用户的性别 '男':'女'   0  1
enum Gender {
  Women = 'Women',
  Man = 'Man',
}
function send(gender: Gender) {
  // 发送请求，传递给后台
  console.log(gender)
}

send(Gender.Man)
send(Gender.Women)

/* 
  enum Direction {
    Up,
    Down,
    Left,
    Right
  }

  enum Direction {
    Up = 10,
    Down,
    Left,
    Right
  }

  enum Direction {
    Up = 8,
    Down = 10,
    Left,
    Right
  }

  enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = "Left",
    Right = 'Right'
  }

  // 枚举既可以是类型，也可以是值
  function changeDirection(direction: Direction) {

  }
  changeDirection(Direction.Up)

*/
