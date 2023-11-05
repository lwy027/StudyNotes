
interface Iperson {
  name: string
  age: number
  height?: number
}

type MapType<T> = {
  //可选和只读修饰符
  // readonly [property in keyof T]?: T[property]
  // 如果前面一个-号，表示把原类型中可选类型给去掉变成必填，默认是+号保留
  readonly [property in keyof T]-?: T[property]
}

type mapPerson = MapType<Iperson>


export { }