
//相当于定义<T>参数，由使用者决定类型
function foo<T>(arg: T): T {

  return arg
}

//明确传入的类型
foo<number>(11)
foo<string>("aaa")
foo<Object>({ name: "lwy", age: 20 })


export { }