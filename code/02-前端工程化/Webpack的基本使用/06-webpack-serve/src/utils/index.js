function foo() {
  console.log('执行foo')
}
function bar() {
  console.log('指向bar')
}

module.exports = {
  foo,
  bar
}