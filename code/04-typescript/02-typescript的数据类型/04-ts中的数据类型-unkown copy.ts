let foo: unknown = "lll"





if (typeof foo === "string") {
  console.log(foo.length)
}


function bar(num: number): void {
  console.log(num)
}
bar(1)

export { }