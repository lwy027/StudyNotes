
//固定写法，使用keyOg表示获取的key必须是O类型中的key
function getObjectproperty<O, K extends keyof O>(obj: O, key: K) {
  return obj[key]
}

const obj = {
  name: "lwy",
  age: 20
}

getObjectproperty(obj, "name")



export { }