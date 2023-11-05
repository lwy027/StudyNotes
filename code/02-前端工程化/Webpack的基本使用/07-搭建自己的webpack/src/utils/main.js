function sum(m, n) {
  return m + n
}
function foo() {
  console.log("foo函数被 execution")
}

function bar() {
  console.log("foo函数被 execution")
}
const arrow = () => {
  console.log("箭头函数被执行")
}
console.log('-----------------')



module.exports = {
  sum,
  foo,
  bar,
  arrow
}