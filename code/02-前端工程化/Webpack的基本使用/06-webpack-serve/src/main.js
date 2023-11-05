import { bar, foo } from "./utils"
import '../src/conponent/div_cnt.js'

const sum1 = 200
const sum2 = 200

function sumFn(n, m) {
  return n + m
}


const sum = sumFn(sum1, sum2)
console.log(sum)

const arrow = () => {
  console.log('我是箭头汉纳树')
}
console.log('aaaaa')
arrow()
bar()
foo()