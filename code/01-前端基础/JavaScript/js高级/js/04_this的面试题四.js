var name = 'window'
function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {

      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

// person1.obj.foo1()() //默认绑定 window
// person1.obj.foo1.call(person2)() //默认 window
// person1.obj.foo1().call(person2) //显示绑定 person2

// person1.obj.foo2()() //箭头函数向上层查找foo2()this指向obj obj
// person1.obj.foo2.call(person2)() //同上 person2
// person1.obj.foo2().call(person2) //同上上 obj