
type myFn = (...arg: any[]) => number

function foo(...arg: any[]) {
  return "123"
}

//ReturnType为ts内置工具，可以帮我们获取函数返回值类型
type myFooType = ReturnType<typeof foo>
type myFnType = ReturnType<myFn>

//我们这里封装个自己的returnType工具，因为我们需要传入函数类型，所以T继承与函数类型
//使用infer进行函数返回值类型推断，推断出什么类型，把类型返回
type wyReturnType<T extends (...arg: any[]) => any> = T extends (...any: any[]) => infer R ? R : false

//这里就可以正确的推导出函数返回值类型
type myFooType2 = wyReturnType<typeof foo>


export { }