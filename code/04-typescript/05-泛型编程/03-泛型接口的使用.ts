

//接收传过来的额类型
interface Ikun<T> {
  name: T
  age: number
  slogan: T
}
//定义类型
const Ikun1: Ikun<string> = {
  name: "一号",
  age: 20,
  slogan: "hahahahah"
}




export { }