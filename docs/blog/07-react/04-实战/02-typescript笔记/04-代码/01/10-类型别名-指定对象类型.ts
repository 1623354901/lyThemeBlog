{
  type Teacher = {
    name: string
    age: number
    hobby?: string[],
    sayHi?(): void,
    // sleep(time: number): number,
    sleep?: (time: number) => number
  }
  
  let tea: Teacher = {
    name: '乔老师',
    age: 38,
    // hobby: ['洗脚', '大保健'],
    sayHi() {
      console.log('大家好')
    },
    // sleep(time) {
    //   return time + 1000
    // }
    sleep: (time: number) => {
      return 100
    }
  }

  let tea2: Teacher = {
    name: '刘老师',
    age: 30,
  }


}