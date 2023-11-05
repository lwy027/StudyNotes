
interface person {
  name: string,
  age: number,
  adress: string
}
//把person中的属性全部变成可选的
type myPartial = Partial<person>

const obj: myPartial = {
}


//本质,使用映射并且使用?修饰符，把全部属性变成可选
type Wypartial<T> = {
  [k in keyof T]?: T[k]
}




