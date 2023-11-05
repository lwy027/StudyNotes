import { bar, foo } from "./utils"

const sum1 = 200
const sum2 = 200

function sumFn(n, m) {
  return n + m
}


const sum = sumFn(sum1, sum2)
console.log(sum)

bar()
foo()