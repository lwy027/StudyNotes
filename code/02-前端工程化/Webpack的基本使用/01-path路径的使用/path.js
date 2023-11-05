const path = require("path")

const path1 = "./abc/sss.text"
const path2 = "./cba/ddd.text"
// console.log(path.dirname(path1))
// console.log(path.basename(path1))
// console.log(path.extname(path1))
// console.log(__dirname)
// console.log(__filename)

// //path.join()
// console.log(path.join(path1, path2))


console.log(path.resolve('/aaa/bbb', './bbb/ccc', './llll'))