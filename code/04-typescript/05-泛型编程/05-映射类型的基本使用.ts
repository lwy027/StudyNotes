

interface Iperson {
  name: string
  age: number
}
//定义映射
type MapType<T> = {
  //映射类型写法
  //keyof 获取T中所有的key
  //返回布尔值
  //property变量代表要映射类型的key,名字任意
  [property in keyof T]: T[property]
  //这里相当于，对传来的<T>类型依次进行遍历，并放进来进行映射操作
}

type mapIperson = MapType<Iperson>

export { }