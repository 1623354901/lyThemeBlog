// <img id="img">
// <div id="box"></div>
// 类型断言，告诉ts， box的类型是HTMLImageElement
// const box = document.getElementById('img') as HTMLImageElement

// console.log(box.src)
// console.log(box.alt)
const box = document.getElementById('a') as HTMLAnchorElement
console.log(box.href)
