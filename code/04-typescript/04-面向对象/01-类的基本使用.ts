
class Person {

  //在ts中必须声明成员属性
  name: string
  age: number

  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

const p1 = new Person("lwy", 20)

export { }