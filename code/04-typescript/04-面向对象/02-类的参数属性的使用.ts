

class Person {

  //相当于省略了定义属性和this参数的步骤。一种语法糖形式
  constructor(public name: string, private _age: number, readonly height: number) {
  }

  get age() {
    return this._age
  }
}


const p = new Person("lwy", 20, 1.88)

console.log(p.name)
console.log(p.age)
console.log(p.height)

export { }