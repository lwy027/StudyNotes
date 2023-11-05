

class Person {

}

interface IctPerson {
  //声明一个类
  new(): Person
}

function factory(fn: IctPerson) {
  return new fn()
}

factory(Person)

export { }