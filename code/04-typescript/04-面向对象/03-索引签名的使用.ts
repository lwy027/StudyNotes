

interface Icollection {
  //index:number规定使用什么类型获取索引，:string规则获取索引后的返回值类型
  [index: number]: string

  length: number
}

function iteractorCollect(collection: Icollection) {
  //使用numbei类型获取索引，返回值为string
  collection[0]
  collection[1]
}


const tuple: [string, string] = ["200", "200"]

iteractorCollect(tuple)
// iteractorCollect({ name: "lwy", age: 20, length: 20 })



export { }