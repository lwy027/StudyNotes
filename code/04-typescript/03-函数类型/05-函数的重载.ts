


//编写不同类型的重载签名
function sum(num1: string, num2: string): string
function sum(num1: number, num2: number): number
//在编写一个通用的
function sum(sum1: any, sum2: any) {
  console.log(sum1 + sum2)
  return sum1 + sum2
}

sum(10, 20)
sum("aaa", "bbbb")
// sum({ name: "lwiwi" }, { age: 20 })


export { }