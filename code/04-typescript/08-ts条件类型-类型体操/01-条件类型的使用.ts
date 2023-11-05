

//使用条件类型判断返回值类型
function sum<T extends number | string>(num1: T, num2: T): T extends number ? number : string
function sum(num1: any, num2: any) {
  return num1 + num2
}


const res = sum(20, 30)
const res1 = sum("abc", "cba")


export { }