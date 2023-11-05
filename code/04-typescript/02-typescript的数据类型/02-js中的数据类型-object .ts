

// type infons = {
//   name: string,
//   age: number
// }


// let person: infons = {
//   name: "小明",
//   age: 20
// }

// let person2: infons = {
//   name: "小ll",
//   age: 20
// }


type printType = { x: number, y: number, z?: number }

function printCoordinate(point: printType) {

  console.log(point.x, point.y, point.z)
}

printCoordinate({ x: 111, y: 222 })




export { }