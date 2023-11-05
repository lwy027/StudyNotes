var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.foo1()   //this执行新对象  person1
person1.foo1.call(person2)    //显示绑定 person2

person1.foo2()   //上层作用域 person1
person1.foo2.call(person2) //箭头函数没有this，所有指向新对象 person1

person1.foo3()() //默认绑定 window
person1.foo3.call(person2)() //默认绑定 window
person1.foo3().call(person2) //显示绑定 person2

person1.foo4()() //箭头函数没有this person1
person1.foo4.call(person2)() //箭头函数向上查找   person2
person1.foo4().call(person2) //箭头函数没有this  person1