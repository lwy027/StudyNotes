# JS内存管理和闭包

## JavaScript的代码的执行流程

- 首先在执行前会现在堆内存中开辟一块空间(GO) 存放一些初始的值 如Number String等等
- 还有代码中定义的一些变量 函数(在parser转成AST树的过程中存放在GO中的 )并没有赋值
- 同时在执行代码时在执行上下文栈(ECS)中存放一个全局执行上下文(GEC) 用于执行代码
  - GO中对应的函数 也会在堆内存中开辟出空间 为 Function Object 初始一些数据(name length scope chain等)
- 开始执行代码
- 每个EC中有着三个重要的内容(VO scope chain 以及this)
- VO指向对应的作用域(全局作用域(GO) 函数作用域(AO))
- ...

## GO/AO/VO的理解以及作用域和作用域链的理解

GO

- Global Object JS代码在执行前会现在堆内存中创建一个全局对象(GO)
- 用于存放一些定义好的变量方法等包含Date Array String Number setTimeout等
- 同时有一个window属性指向自己
- 同时在语法分析转成AST的过程中也会将一些变量 函数 存放在GO中 只是变量的初始值为undefined

AO 

- 函数在执行前会先在堆内存中创建一个AO(Activation Object)对象 里面存放这arguments 对应函数的形参 以及在函数中定义的变量 初始值为undefined

VO

- Variable Object  在执行函数时 会在执行上下文栈(ECS)中进入一个函数执行上下文(FEC)其中有三个核心 核心之一是VO 指向的是该函数在内存中解析时创建的AO 而在全局执行上下文中指向的是GO

作用域,作用域链

- 当进入到一个执行上下文时 执行上下文会关联一个作用域链
- 通常作用域链在解析时就被确定 因此 作用域链域函数的定义位置有关 而与它的调用位置无关

## V8引擎的内存管理以及垃圾回收器

内存管理

- JavaScript的内存管理是自动的
- 关于原始数据类型 直接在栈内存中分配
- 关于复杂数据类型 在堆内存中分配

垃圾回收(GC)

- 因为内存大小是有限的 所以在内存不需要的时候 需要进行释放 用于腾出空间
- GC对于内存管理有着对应的算法
- 常见的算法
  - 引用计数(Reference Count) 
    - 当一个对象有引用指向它时 对应的引用计数+1 
    - 当没有对象指向它时 则为0 此时进行回收
    - 但是有一个严重的问题 - 会产生循环引用
  - 标记清除(Mark-Sweep)
    - 核心思路: 可达性
    - 有一个根对象 从该对象出发 开始引用到所用到的对象 对于根对象没有引用到的对象 认为是不可用的对象
    - 对于不可用的对象 则进行回收
    - 该算法有效的解决了循环引用的问题
    - 目前V8引擎采用的就是该算法
- V8引擎为了优化 在采用标记清除的过程中也引用了其他的算法
  - 标记整理
    - 和标记清除相似 不同的是回收时 会将保留下来的存储对象整合到连续的内存空间 避免内存碎片化
  - 分代收集(Generational Collection)
    - 将内存中的对象分为两组 新的空间 旧的空间
    - 对于长期存活的对象 会将该对象从新空间移到旧空间中 同时GC检查次数减少
    - 将新空间分为from和to 对象的GC查找之后从from移动到to空间中 然后to变为from from变为to 循环几次 对于依然存在的对象 移动到旧空间中
  - 增量收集(Increment Collection)
    - 如果存在许多对象 则GC试图一次性遍历所有的对象 可能会对性能造成一定的影响 
    - 所以引擎试图将垃圾收集工作分成几部分 然后这几部分逐一处理 这样会造成微小的延迟 而不是很大的延迟
  - 闲时收集(IdIe-time Collection)
    - GC只会在CPU空闲的时候运行 减少可能对代码执行造成的影响

## 如何理解闭包的,闭包到底是什么?

广义上讲 JavaScript的函数都是闭包

狭义上将 JavaScript中的函数如果访问了外层作用域中的变量 则称为闭包

实现上是一个函数与包含它的作用的引用绑定在了一起的组合



##  闭包为什么会产生内存泄露以及如何解决

- 闭包使得原本该销毁的作用域由于内部函数的引用没有销毁 始终存在在堆内存中 因此产生了内存泄露
- 解决
  - 将保存着上层作用域引用的函数在使用完之后置为null将它的引用销毁在GC的下一次检查中 对应的内存就会被销毁


# JavaScript函数的增强知识

## 理解纯函数以及编写自己的纯函数

纯函数：纯函数一般具有以下的特点：

- 确定的输入一定会有确定的输出（外部环境的任何变化不会影响函数内部的操作产生的结果）
- 纯函数的执行不会产生副作用。（函数内部的操作也不会对函数外部产生任何影响）

纯函数在react和redux中应用比较多。

编写纯函数：

```javascript
//一般的数学方法可以写成纯函数,例如相加
function sum(...args) {
  var result = args.reduce((perValue, item) => {
    return preValue + item
  }, 0)
  return result
}
```

## 理解函数柯里化以及说出柯里化的作用

函数的柯里化：将传入多个参数的函数转变成传入单个参数并且返回一个函数用于接收剩余的参数的函数。每一层函数都接收一个参数并对参数进行处理。

柯里化的作用：

- 单一职责：每一个函数只用处理传入的单个参数，每个函数的职责单一而且确定
- 参数复用：可以拿到每一层函数执行的返回值作为一个新的函数，复用已经传入过的参数。

## 理解组合函数以及组合函数的作用

组合函数：组合函数是将多个函数组合到一起，进行依次调用的函数使用模式。

组合函数的作用：

- 减少重复代码的编写，提高代码的复用性，便于开发。
- 可以对任意个函数进行组合，返回新的具有多个被组合函数功能的新函数

## 说说你对严格模式的理解

严格模式是一种JavaScript的限制模式，因为种种历史原因，JavaScript语言在非严格模式下是比较松散的。在JavaScript不断优化和加入新特性的过程中，为了兼容早期的JavaScript，一些错误和不规范的写法也被保留了下来。这些错误也不会被抛出。在开启了严格模式后，js引擎会以一种更严格的规范执行JavaScript代码，一些不规范的写法和错误也会直接抛出。

开启严格模式的方法：

- 对文件开启：在文件的开头写上"use strict"
- 对函数开启：在函数的开头写上"use strict"

严格模式下的语法限制：

- 不允许意外创建全局变量（不写var、let、const这种声明变量的关键字）
- 会对静默失败的赋值操作抛出异常
- 试图删除不可删除的属性
- 不允许函数参数有相同的名称
- 不允许只有0开头的八进制语法
- 不允许使用with
- 无法获取eval中定义的变量
- this绑定不会默认转成对象

# 对象的增强知识

## 什么是原型、原型链？

原型：在JavaScript中，每一个对象都会有一个属性[[prototype]]，这个属性就是对象的原型，这个属性的值也是一个对象，是原对象的原型对象。访问对象中属性时，会先在对象自身进行查找，如果没有找到，那么会去对象的原型对象上查找。

原型链：每个对象都有自己的原型对象，原型对象也有自己的原型对象。在访问对象的属性时，会沿着对象自身=>自身的原型对象=>原型对象的原型对象......这样的链条一路查找上去，这条链式结构就叫做原型链。原型链的尽头是Object的原型对象的[[prototype]]属性，值为null。

## 如何通过原型链实现继承？

 原型链继承：重写子类的显式原型对象，让子类的显式原型对象的隐式原型指向父类的显式原型对象。

ES5中继承的演变过程：原型链继承=> 构造函数继承=> 组合继承（原型链+构造函数继承）=> 寄生组合继承(原型链+寄生式函数+构造函数继承)

```javascript
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function inherit(Subtype, Supertype) {
  Subtype.prototype = createObject(Supertype.prototype)
  Object.defineProperty(Subtype.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: Subtype
  })
}
function Person() {}
function Student() {
  Person.call(this)
}
inherit(Student, Person)
```



## 继承的各个方案以及优缺点

方案一：直接将父类的prototype赋值给子类的prototype，父类和子类共享原型对象

缺点：在子类原型对象上添加方法和属性会影响到父类

```javascript
function Person() {}
function Student() {}
Student.prototype = Pesrson.prototype
```

方案二：通过new操作符创建一个新的对象，将这个对象作为子类的原型对象(显式原型)

缺点：

- 子类的实例对象继承过来的属性是在原型上的，无法打印
- 没有完美的实现属性的继承（子类的实对象可以从父类继承属性，也可以拥有自己的属性）

```javascript
function Person() {}
function Student() {}
var p = new Person()
Student.prototype = p
```

方案三：通过new操作符创建一个新的对象，将这个对象作为子类的原型对象(显式原型)，并且在子类的内部通过借用构造函数的方法实现属性的继承

缺点：父类构造函数会被调用两次，并且子类的实例对象总是有两份相同的属性，一份在自身，一份在其原型对象上

```javascript
function Person(arg1, arg2) {}
function Student() {
  Person.call(this, arg1, arg2)
}
var p = new Person()
Student.prototype = p
```

方案四：让子类的原型对象(显式原型)的原型对象(隐式原型)指向父类的原型对象(显式原型)

缺点：存在兼容性问题,`__proto__`属性只有部分游览器支持

```javascript
function Person() {}
function Student() {}
Student.prototype.__proto__ = Person.prototype
```

方案五：寄生组合式继承(ES5中实现继承的最终方案)

```javascript
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function inherit(Subtype, Supertype) {
  Subtype.prototype = createObject(Supertype.prototype)
  Object.defineProperty(Subtype.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: Subtype
  })
}
function Person() {}
function Student() {
  Person.call(this)
}
inherit(Student, Person)
```

## 最终ES5实现继承的方案

寄生组合式继承

```javascript
function createObject(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function inherit(Subtype, Supertype) {
  Subtype.prototype = createObject(Supertype.prototype)
  Object.defineProperty(Subtype.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: Subtype
  })
}
function Person() {}
function Student() {
  Person.call(this)
}
inherit(Student, Person)
```

01-多态

```js
<script>
      // 继承是多态的前提
      class Shape {
        getArea() {}
      }
      class Rectangle extends Shape {
        constructor(width, height) {
          super();
          this.width = width;
          this.height = height;
        }
        getArea() {
          return this.width * this.height;
        }
      }
      class Circle extends Shape {
        constructor(radius) {
          super();
          this.radius = radius;
        }
        getArea() {
          return this.radius * this.radius * Math.PI;
        }
      }
      var rect1 = new Rectangle(10, 20);
      var rect2 = new Rectangle(20, 50);
      var c1 = new Circle(10);
      var c2 = new Circle(20);

      function getShapeArea(shape) {
        console.log(shape.getArea());
      }
      getShapeArea(rect1);
      getShapeArea(c1);
      var obj = {
        getArea: function () {
          return 100;
        },
      };
      getShapeArea(obj);
</script>
```

02-函数对象原型关系

```js
<script>
      function foo(name, age) {
        console.log(name, age);
      }
      function test() {}
      console.log(Function.prototype === foo.__proto__);
      Function.prototype.message = "hello";
      console.log(foo.message);
      console.log(test.message);
      Function.prototype.hytest = function () {
        console.log("斤斤计较");
      };
      test.hytest();
      foo.hytest();
</script>
```

03-对象字面量的增强

```js
<script>
      var age = 90;
      var message = "hello";
      var key = "height" + age;
      var obj = {
        // 属性的简写
        age,
        message,
        // 方法的简写
        eating() {
          console.log("吃饭了");
        },
        [key]() {
          console.log("hhhh");
        },
        [message + "world"]: "你好",
      };
      console.log(obj);
      function foo() {
        const age = 22;
        const address = "北京";
        return { age, address };
      }
      let info = foo();
      console.log(info);
</script>
```

04-解构

```js
<script>
      //数组的解构
      //1.按顺序赋值
      var names = ["张三", "李四", "杨幂", undefined, "张杰"];
      var [name1, name2, name3] = names;
      console.log(name1, name2, names);
      //2.只想解构后面的元素
      var [, , item3] = names;
      console.log(item3);
      // 3.解构出一个元素,后面的元素放到新数组去
      var [item1, ...args] = names;
      console.log(args);
      //4.默认值
      var [item1, item2, item3, item4 = "默认值"] = names;
      console.log(item4);
      //二.对象的解构
      // 按Key赋值,没有顺序
      var obj = {
        age: 90,
        address: "北京",
        count: 20,
        size: undefined,
      };
      // var { age, count } = obj;
      // console.log(age, count);
      //1.只解构一个元素
      var { count } = obj;
      console.log(count);
      //2.重命名
      var { age: newAge } = obj;
      // console.log(age); //报错
      console.log(newAge);
      //3.默认值
      var { size = 20 } = obj;
      console.log(size);
      //4.重命名加默认值
      var {
        age: newAge1,
        address: newAddress,
        count: newCount,
        size: newSize = 2222,
        height: newHeight = 190,
      } = obj;
      console.log(newHeight, newSize);
      //5.对象的剩余内容
      var { age, ...otherObj } = obj;
      console.log(otherObj);
      //应用
      function getArea({ width, height }) {
        console.log(width, height);
      }
      getArea({ width: 111, height: 222 });
</script>
```

05-apply实现

```js
<script>
      function foo(name, age) {
        console.log(this, name, age);
      }
      // apply(this指向,数组)
      foo.apply({ info: "hello" }, ["张三", 28]);
      foo.apply("aaa", ["lisi", 22]);
      foo.apply(123, ["王五", 24]);
      // 手动实现apply
      //1.在Function的原型上添加
      //2.函数的参数
      Function.prototype.hyApply = function (thisArg, otherArgs) {
        //3.获取thisArg,并且确保是对象类型,注意null,undefined---window,数字--包装类
        thisArg =
          thisArg === null || thisArg === undefined ? window : Object(thisArg);
        // this--foo
        // thisArg.fn = this;
        //4.属性描述符添加属性
        Object.defineProperty(thisArg, "fn", {
          configurable: true,
          writable: false,
          enumerable: false,
          value: this,
        });
        //5.隐式绑定,调用
        thisArg.fn(...otherArgs);
        //6.删除
        delete thisArg.fn;
      };

      foo.hyApply("bbb", ["小红", 23]);
      foo.hyApply("123", ["小明", 23]);
      foo.hyApply({ info: "三生三世" }, ["小红2", 23]);
</script>
```

06-call实现

```js
<script>
      function foo(name, age) {
        console.log(this, name, age);
      }
      // call(this指向,参数列表)
      foo.call({ info: "hello" }, "张三", 28);
      foo.call("aaa", "lisi", 22);
      foo.call(123, "王五", 24);
      // 手动实现apply
      //1.在Function的原型上添加
      //2.函数的参数
      Function.prototype.hyCall = function (thisArg, ...otherArgs) {
        //3.获取thisArg,并且确保是对象类型,注意null,undefined---window,数字--包装类
        thisArg =
          thisArg === null || thisArg === undefined ? window : Object(thisArg);
        // this--foo
        // thisArg.fn = this;
        //4.属性描述符添加属性
        Object.defineProperty(thisArg, "fn", {
          configurable: true,
          writable: false,
          enumerable: false,
          value: this,
        });
        //5.隐式绑定,调用
        thisArg.fn(...otherArgs);
        //6.删除
        delete thisArg.fn;
      };

      foo.hyCall("bbb", "小红", 23);
      foo.hyCall("123", "小明", 23);
      foo.hyCall({ info: "三生三世" }, "小红2", 23);
</script>
```

07-apply,call抽取

```js
<script>
      function foo(name, age) {
        console.log(this, name, age);
      }
      // call(this指向,参数列表)
      foo.call({ info: "hello" }, "张三", 28);
      foo.call("aaa", "lisi", 22);
      foo.call(123, "王五", 24);
      // 封装方式一
      function execFn(thisArg, otherArgs, fn) {
        thisArg =
          thisArg === null || thisArg === undefined ? window : Object(thisArg);
        // this--foo
        // thisArg.fn = this;
        //4.属性描述符添加属性
        Object.defineProperty(thisArg, "fn", {
          configurable: true,
          writable: false,
          enumerable: false,
          value: fn,
        });
        //5.隐式绑定,调用
        thisArg.fn(...otherArgs);
        //6.删除
        delete thisArg.fn;
      }
      // 封装方式二
      Function.prototype.hyExec = function (thisArg, otherArgs) {
        thisArg =
          thisArg === null || thisArg === undefined ? window : Object(thisArg);
        // this--foo
        // thisArg.fn = this;
        //4.属性描述符添加属性
        Object.defineProperty(thisArg, "fn", {
          configurable: true,
          writable: false,
          enumerable: false,
          value: this,
        });
        //5.隐式绑定,调用
        thisArg.fn(...otherArgs);
        //6.删除
        delete thisArg.fn;
      };
      // 手动实现apply
      //1.在Function的原型上添加
      //2.函数的参数
      Function.prototype.hyCall = function (thisArg, ...otherArgs) {
        // this--foo
        // execFn(thisArg, otherArgs, this);
        this.hyExec(thisArg, ...otherArgs);
      };
      Function.prototype.hyApply = function (thisArg, otherArgs) {
        this.hyExec(thisArg, otherArgs);
      };
      foo.hyCall("bbb", "小红", 23);
      foo.hyCall("123", "小明", 23);
      foo.hyCall({ info: "三生三世" }, "小红2", 23);
      foo.hyApply({ info: "三生三世" }, ["小红2", 23]);
</script>
```

08-bind实现

```js
<script>
      function foo(name, age, height, score) {
        console.log(this, name, age, height, score);
      }
      var newFoo = foo.bind("abc", "张三", 23);
      newFoo(190, 220);
      // 自己实现bind
      Function.prototype.hyBind = function (thisArg, ...otherArgs) {
        // 获取thisArg,确保是对象
        thisArg =
          thisArg === null || thisArg === undefined ? window : Object(thisArg);
        //添加属性
        Object.defineProperty(thisArg, "fn", {
          configurable: true,
          enumerable: false,
          value: this,
        });
        // 返回新函数
        return (...args) => {
          // 合并参数
          var newArr = [...otherArgs, ...args];
          // 调用
          thisArg.fn(...newArr);
        };
      };
      var newFn = foo.hyBind("abc", "lili", 23, 111, 222);
      newFn();
      var newFn1 = foo.hyBind("abc", "lili");
      newFn1(23, 111, 222);
      var newFn2 = foo.hyBind("abc", "lili", 111, 222);
      newFn2(23);
</script>
```

09-let,const的使用

```js
<script>
      // ES6之前
      var num = 1;
      num = 23;
      num = 201;
      console.log(num);
      //ES6之后
      let message = "梦华录";
      message = "刘亦菲演员";
      message = "陈晓男主";
      console.log(message);
      //const 一旦被赋值,就不能被修改
      const age = 23;
      // age = 21;
      console.log(age);
      // const如果赋值的是引用类型,那可以通过引用找到对应的对象,修改对象的内容
      const info = {
        name: "lili",
        age: 10,
      };
      // info = {}; //报错,重新赋值了
      info.age = 99; //可以
      console.log(info);
</script>
```

10-重复声明

```
<script>
      // var 可以重复声明变量
      var age = 12;
      var age = 90;
      var age = 11;
      // let,const不可以重复声明变量
      let message = "hello";
      // let message = "hi";
      const info = "hi";
      // const info = "how are you";
</script>
```

11-作用域提升

```js
<script>
      // var 声明的变量会作用域提升
      console.log(age);
      var age = 10;
      // let/const声明的变量不会作用域提升,会先被创建但是在声明之前不能被访问
      // console.log(message); //报错
      let message = "hhh";
      console.log(info); //报错
      const info = "你好";
</script>
```

12-暂时性死区

```js
<script>
      // let,const定义的变量在声明之前不能被访问
      function bar() {
        //在暂时性死区
        // console.log(message, age);
        let message = "hello";
        let age = 90;
      }
      bar();
      //2.暂时性死区和定义的位置没有关系,和执行顺序有关
      function foo() {
        console.log(num); //90
      }
      let num = 90;
      foo();
      //暂时性死区形成之后,在该区域内这个标识符不能被访问
      // let count = 10;
      var count = 10;
      function fn() {
        console.log(count);
        let count = 99;
      }
      fn();

      // 1.形成的词法环境
      var message = "Hello World";
      var age = 18;
      function foo() {}
      let address = "广州市";

      {
        var height = 1.88;

        let title = "教师";
        let info = "了解真相~";
      }
</script>
```

13-let,const不添加window

```html
<script>
      //var 定义的变量会添加到window上
      var info = "哈哈哈哈";
      var num = 90;
      console.log(window.info, window.num);
      // let/const定义的变量不会添加到window上
      let age = 22;
      const address = "北京";
      console.log(window.age, window.address); //undefined
</script>
```

14-块级作用域

```js
<script>
      // 在ES5以及之前,只有函数和全局有自己的作用域
      {
        var message = "hhh";
      }
      console.log(message); //hhh
      //从ES6开始, 使用let/const/function/class声明的变量是有块级作用域
      console.log(info); //变量提升
      // foo(); //报错
      {
        var info = "hello";
        let age = 22;
        const name = "丽丽";
        class Person {
          constructor(name, age) {
            this.name = name;
            this.age = age;
          }
        }
        function foo() {
          console.log("999");
        }
      }
      // console.log(age); //报错
      // const p1 = new Person("王五", 23);
      foo();
      console.log(info);
</script>
```

15-块级作用域的应用

```js
<script>
      var btnEls = document.querySelectorAll("button");
      //第一种--用index
      for (var i = 0; i < btnEls.length; i++) {
        var btnEl = btnEls[i];
        btnEl.index = i;
        btnEl.onclick = function () {
          console.log(`点击了按钮${this.index}`);
        };
      }
      // 第二种-用立即执行函数
      for (var i = 0; i < btnEls.length; i++) {
        var btnEl = btnEls[i];
        (function (m) {
          btnEl.onclick = function () {
            console.log(`点击了按钮${m}`);
          };
        })(i);
      }
      // 第三种 -用let
      for (let i = 0; i < btnEls.length; i++) {
        var btnEl = btnEls[i];
        btnEl.onclick = function () {
          console.log(`点击了按钮${i}`);
        };
      }
</script>
```



##  说说你对面向对象多态的理解

- 当对不同的数据类型执行同一个操作时, 如果表现出来的行为(形态)不一样, 那么就是多态的体现
- 继承也是多态的前提

## 整理词法环境、环境记录等概念

- 词法环境是一种规范类型，用于在词法嵌套结构中定义关联的变量、函数等标识符
- 一个词法环境是由环境记录（Environment Record）和一个外部词法环境（outer Lexical Environment）组成
- 一个词法环境经常用于关联一个函数声明、代码块语句、try-catch语句，当它们的代码被执行时，词法环境被创建出来
- 环境记录分为声明式环境记录和对象式环境记录
  - 声明式环境记录：声明性环境记录用于定义ECMAScript语言语法元素的效果，如函数声明、变量声明和直接将标识符绑定与ECMAScript语言值关联起来的Catch子句
  - 对象式环境记录：对象环境记录用于定义ECMAScript元素的效果，例如WithStatement，它将标识符绑定与某些对象的属性关联起来

# ES6

## let、const和var的区别

- 作用域提升
  - var声明的变量是会进行作用域提升
  - let、const没有进行作用域提升，但是会在解析阶段被创建出来 
  - let,const具有暂时性死区
- 块级作用域
  - var不存在块级作用域
  - let和const存在块级作用域
- 重复声明
  - var允许重复声明变量
  - let和const在同一作用域不允许重复声明变量
- 修改声明的变量
  - let,var 可以修改声明的变量
  - const它表示保存的数据一旦被赋值，就不能被修改,但是如果赋值的是引用类型，那么可以通过引用找到对应的对象，修改对象的内容

## 理解let的块级作用域以及作用

- let/const/class/function会形成块级作用域
- 当点击按钮时,用let定义i,会具有块级作用域



## 整理ES6~ES11新增知识点

ES6 :

- 使用class用来定义类
  - constructor构造器
  - extends实现继承
  - super关键字代表继承的父类
- 对象字面量的增强
  - 属性的简写
  - 方法的简写
  - 计算属性名
- 解构
- let/const的使用
  - 不能重复声明变量
  - 不存在作用域提升
  - 存在暂时性死区
  - 不添加window
  - 存在块级作用域
- 字符串模板
  - 在模板字符串中，我们可以通过 ${expression} 来嵌入动态的内容
  - 标签模板字符串
- 函数的默认参数
- 函数的剩余参数
- 箭头函数
  - 没有显式原型prototype
  - 不绑定this、arguments、super参数
- 展开语法
  - 在函数调用时使用；
  - 在数组构造时使用；
  - 展开运算符其实是一种浅拷贝
  - 在构建对象字面量时，也可以使用展开运算符，这个是在ES2018（ES9）中添加的新特性；
- 规范了二进制和八进制的写法
- 新增Symbol
- Set、WeakSet、Map、WeakMap

ES7 :

- Array Includes
  - 通过includes来判断一个数组中是否包含一个指定的元素，根据情况，包含返回 true，否则返回false。
- 指数exponentiation运算符
  - **,对数字来计算乘方。

ES8 :

- Object values
  - 通过Object.values 来获取所有的value值
- Object entries
  - 通过 Object.entries 可以获取到一个数组，数组中会存放可枚举属性的键值对数组
- String Padding
  - padStart 和 padEnd 方法，分别对字符串的首尾进行填充的。
- Trailing Commas
  - 允许在函数定义和调用时多加一个逗号：
- Object.getOwnPropertyDescriptors

ES9 :

- 构建对象字面量时，可以使用展开运算符

ES10 :

- flat 
  - flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
- flatMap
  - flatMap是先进行map操作，再做flat的操作
  - flatMap中的flat相当于深度为1
- Object fromEntries
  - Object.formEntries将entries转换成一个对象
- trimStart trimEnd
  - 去除字符串前面或者后面的空格

ES11 :

- BigInt
  - BigInt，用于表示大的整数(超过最大安全整数)
  - BitInt的表示方法是在数值的后面加上n
- 空值合并操作符
  - ??当前面的值为null或者undefined是,显式??后面的值
- Optional Chaining
  - 可选链?.
  - 当?.前面的值为空时返回undefined
- Global This
  - JavaScript环境的全局对象
- for..in标准化
  - for...in遍历对象时遍历的是key

## Symbol的用法和作用

用法

- Symbol值是通过Symbol函数来生成的
- Symbol()表示生成一个独一无二的值
- 我们也可以在创建Symbol值的时候,在()里面传入一个description,描述当前的Symbol
- 获取Symbol,使用Object.getOwnPropertySymbols()获取当前对象的Symbol,结果为一个数组

作用

- 用于对象的属性名,表示一个唯一的属性名

相同值的Symbol:

- 使用Symbol.for()生成,当key一样的时候,生成表示相同的Symbol
- Symbol.keyFor(Symbol.for())获取对应的key

## Set、WeakSet、Map、WeakMap的特点

Set:

- 用来存储数据,类似于数组,
- 与数组的区别是元素不能重复,
- 可以使用forEach方法和使用for...of...遍历
- 常见属性和方法
  - size：返回Set中元素的个数
  - add(value)：添加某个元素，返回Set对象本身
  - delete(value)：从set中删除和这个值相等的元素，返回boolean类型
  - has(value)：判断set中是否存在某个元素，返回boolean类型
  - clear()：清空set中所有的元素
  - forEach(callback, [, thisArg])：通过forEach遍历set

WeakSet: 

- 只能存储对象类型,不能存放基本数据类型,
- 对对象的引用是一个弱引用,如果没有其他对对象的引用,那么相应对象会被GC进行清除,
- 不能遍历
- 常见的方法
  - add(value)：添加某个元素，返回WeakSet对象本身
  - delete(value)：从WeakSet中删除和这个值相等的元素，返回boolean类型
  - has(value)：判断WeakSet中是否存在某个元素，返回boolean类型

Map:

- 用于存储映射关系,存储的为键值对,
- 每个键值对为一个数组,
- 与对象的区别是存储的key可以为一个对象
- 可以使用forEach方法和使用for...of...遍历
- 常见属性和方法
  - size：返回Set中元素的个数
  - set(key, value)：在Map中添加key、value，并且返回整个Map对象
  - get(key)：根据key获取Map中的value
  - has(key)：判断是否包括某一个key，返回Boolean类型
  - delete(key)：根据key删除一个键值对，返回Boolean类型
  - clear()：清空所有的元素
  - forEach(callback, [, thisArg])：通过forEach遍历Map

WeakMap:

- 存储的key只能为对象,不允许是其他类型
- 对对象的引用是一个弱引用,如果没有其他对对象的引用,那么相应对象会被GC进行清除,
- 不能进行遍历
- 常见的方法
  - set(key, value)：在Map中添加key、value，并且返回整个Map对象
  - get(key)：根据key获取Map中的value
  - has(key)：判断是否包括某一个key，返回Boolean类型
  - delete(key)：根据key删除一个键值对，返回Boolean类型

## 掌握引用赋值-浅拷贝-深拷内存情况

引用赋值: 将一个变量中存储的对对象的引用地址赋值给另一个变量

```js
const obj = {}
const obj1 = obj
```

浅拷贝: 

- 使用...运算符展开一个对象时是一种浅拷贝,
- 只是将对像内的内容进行简单的复制,
- 如果对象中存储的内容为另一个对象时,并不是将另一个对象进行复制,
- 而是将外面对象内存储的对里面对象的引用进行复制

```js
const obj = {
    name: "xhf",
    foo: {
        name: "james"
    }
}
const obj1 = {...obj}
```

深拷贝:

- 完完全全的创建一个和原来的对象有相同结构的新的对象,
- 如果对象中存储的有其他的对象,在拷贝后的对象中也创建一个新的和里面对象除了内存地址不同,其他完全相同的对象
- 改变新对象中的任何内容,都不会对我们进行拷贝的对象造成任何影响

```js
const obj = {
    name: "xhf",
    foo: {
        name: "james"
    }
}
const obj1 = JSON.parse(JSON.stringify(obj))
```

## 说出Proxy和Object.defineProperty的区别

- Proxy的设计初衷就是监听对象的改变,并且提供了13中方法监听对象的操作,大大方便了和丰富了对对象的监听操作

  - 拦截和监视外部对对象的访问
  - 可以直接监听数组的变化

- Object.defineProperty

  - 该属性设计初衷是定义对象的属性,所以有些监听操作是监听不到的

  - 对于复杂的对象,层级很深的话,需要深度监听

  - 删除属性,添加属性是不能被监听的

  - 不能监听数组的变化

    - 本质上是数组的length属性的数据属性描述符:
    - configurable: false 意味着length属性不能被修改,不能将length属性修改为存取属性描述符
    - 所以数组长度的变化的不能被监听的

    ```js
    const num = [1,2,3]
    console.log(Object.getOwnPropertyDescriptors(num))
    {
      '0': { value: 1, writable: true, enumerable: true, configurable: true },    
      '1': { value: 2, writable: true, enumerable: true, configurable: true },    
      '2': { value: 3, writable: true, enumerable: true, configurable: true },    
      length: { value: 3, writable: true, enumerable: false, configurable: false }
    }
    ```

## 说说Reflect的作用和为什么需要使用它

- Reflect
  - 是一个对象
  - 提供了多种方法方便我们统一管理对象,在对对象进行操作时有些方法会有返回值,操作对象变的更加规范
  - Object作为构造函数,操作对象的方法放在它身上不是很合适,早期的设计不规范导致的
  - 在使用Proxy监听对象时,使用Reflect避免了对原对象的直接操作

## 说说Promise的作用和使用方法（各个回调的作用）

- Promise	
  - 异步编程的一种解决方案,比传统的解决方案--回调函数-更加合理和更强大
  - 是一个对象
  - 对象的状态不受外界影响
  - 一旦状态改变,就不会再变

```js
const promise = new Promise((resolve,reject) => {
  resolve(value) //该函数执行时会回调onFulfilled
  reject(reason) //该函数执行时会回调onRejected
  console.log("这个回调函数会被立即执行~")
})

// 监听promise对象的状态 方式一
promise.then(onFulfilled).catch(onRejected)
// 监听promise对象的状态 方式二
promise.then(onFulfilled,onRejected)
```



## 整理Promise的实例方法和类方法

- Promise的实例方法:
  - then(onFulfilled,onRejected)
    - onFulfilled ---->成功时的回调 
    - onRejected ----> 失败时的回调
    - 返回值是一个新的promise对象  所以promise支持链式调用的原因
  - catch(onRejected)
    - onRejected ---->失败时的回调
  - finally(callback)
    - callback ---->不管promise最后的状态,在执行完then或catch指定的回调函数后,都会执行的回调
- Promise的类方法
  - all() 
    - 接受一个数组作为参数,数组元素是promise对象,返回一个新的promise对象
    - 可以不是数组,但必须是可迭代对象,且返回的每一个成员都是Promise实例
    - 只有数组里所以的promise对象都是fulfilled状态时,返回的promsie的状态是fulfilled
    - 当数组中的promise对象有一个的rejected状态时,返回的promise的状态时rejected
  - race()
    - 接受一个数组作为参数,数组元素是promise对象,返回一个新的promise对象
    - 只要数组中的实例有一个率先改变,返回的promise对象就跟着改变
  - allSettled()
    - 接受一个数组作为参数,数组元素是promise对象,返回一个新的promise对象
    - 只有等数组中所有的promise对象都发生状态改变后,返回的promsie对象状态才会改变
    - 返回的promsie对象,一旦状态发生改变,状态总是fulfilled
  - any()
    - 接受一个数组作为参数,数组元素是promise对象,返回一个新的promise对象
    - 只要数组实例中有一个变成fulfilled状态,返回的promise对象就会变成fulfilled状态
    - 只有当数组中所有的promise实例都变成rejected状态,返回的promise 对象才变成rejected状态
  - resolve()
    - 将现有对象转为promsie实例
  - rejected()
    - 返回一个新的promsie实例,该实例的状态未为rejected

## 整理Promise的实例方法和类方法

- **实例方法       存放在Promise的prototype上**

  - **then方法       可以接收两个参数**
    - `fulfilled`的回调函数：当状态变成`fulfilled`时会回调的函数
    - `reject`的回调函数`reject`
  - **then方法多次调用**
    - 每次调用我们都可以传入对应的`fulfilled`回调
    - 当`Promise`变成的时候回调函数都会被执行
  - **catch方法      可以多次调用**
    - 每次调用我们都可以传入对应的`reject`回调
    - 当`Promise`的状态变成`reject`的时候，这些回调函数都会被执行
  - **finally方法** 
    - `Promise`对象无论变成`fulfilled `还是`rejected`状态, 最终都会被执行的代码
    - `finally`方法是不接收参数的，因为无论前面是`fulfilled`状态，还是`rejected`状态，它都会执行

- **类方法**

  - **resolve方法**

    - 有现成内容, 希望将其转成`Promise`来使用, 这个时候可以使用`Promise.resolve`方法来完成

      ```js
      //Promise.resolve的用法相当于new Promise，并且执行resolve操作
      Promise.resolve("YOYO")
      // 上面等价于下面的一行语句
      new Promise(resolve => {"YOYO"})
      ```

```
- 参数形态

  - 情况一:   如果`resolve`传入一个普通的值或者对象，那么这个值会作为`then`回调的参数；
  - 情况二：如果`rsolve`中传入的是另 外一个`Promise`，那么这个新`Promise`会决定原`Promise`的状态
  - 情况三:   如果`resolve`中传入的是一个对象, 并且这个对象有实现`then`方法, 那么会执行`then`方法, 并且根据`then`方法的结果来决定`Promise`的状态
```

- **reject方法**

  - `reject`方法类似于`resolve`方法，只是会将`Promise`对象的状态设置为`reject`状态。

  - `Promise.reject`的用法相当于`new Promise`，只是会调用`reject`

    ```js
    Promise.reject("YoYO")
    // 相当于
    new Promise((resolve, reject ) => reject("YOYO"))
    ```

```
- 参数形态

  - `Promise.reject`传入的参数无论是什么形态，都会直接作为`reject`状态的参数传递到`catch`的
```

- **all方法**

  - all方法有一个缺陷：当有其中一个`Promise`变成`reject`状态时，新`Promise`就会立即变成对应的`reject`状态

  - 作用是将多个`Promise`包裹在一起形成一个新的`Promise`

    - 新的`Promise`状态由包裹的所有`Promise`共同决定

      - 当所有的`Promise`状态变成`fulfilled`状态时，新的`Promise`状态为`fulfilled`，并且会将所有`Promise`的返回值组成一个数组

      - 当有一个`Promise`状态为reject时，新的`Promise`状态为`reject`，并且会将第一个`reject`的返回值作为参数

        ```js
        // all:全部/所有    p1, p2, p3 是new 出来的Promise对象
        Promise.all([p1, p2, p3]).then(res => {
            console.log("all promise res:", res)
        }).catch(err => {
            console.log("all promise err:", err)
        })
        ```

- **allSettled方法**

  - 该方法会在所有的`Promise`都有结果（`settled`），无论是`fulfilled`，还是`rejected`时，才会有最终的状态

  - 并且这个的结果一定是的

    ```js
    // 类方法: allSettled
    Promise.allSettled([p1, p2, p3]).then(res => {
        console.log("all settled:", res)
    })
    ```

- **race方法**

  - 多个Promise相互竞争，谁先有结果，那么就使用谁的结果

    ```js
    // 类方法: race方法
    // 特点: 会等到一个Promise有结果(无论这个结果是fulfilled还是rejected)
    Promise.race([p1, p2, p3]).then(res => {
        console.log("race promise:", res)
    }).catch(err => {
        console.log("race promise err:", err)
    })
    ```

- **any方法**

  - `any`方法会等到一个`fulfilled`状态，才会决定新`Promise`的状态；

  - 如果所有的`Promise`都是`reject`的，那么也会等到所有的`Promise`都变成`rejected`状态, 会报一个**`AggregateError`**的错误

    ```js
    / any promise err: AggregateError: All promises were rejected
    ```



## 什么是迭代器？什么是可迭代对象？

- **迭代器**

  - 迭代器是帮助我们对某个数据结构进行遍历的对象

  - 迭代器也是一个具体的对象，这个对象需要符合迭代器**协议**

    - 迭代器协议定义了产生一系列值（无论是有限还是无限个）的标准方式
    - 在`JavaScript`中这个标准就是一个特定的`next`方法

  - `next`方法的要求

    - 一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象：
    - `done`（`boolean`）
      - 如果迭代器可以产生序列中的下一个值，则为 `false`。（这等价于没有指定 `done `这个属性。）
      - 如果迭代器已将序列迭代完毕，则为 `true`。这种情况下，`value `是可选的，如果它依然存在，即为迭代结束之后的默认返回值。
    - `value`
      - 迭代器返回的任何 `JavaScript `值。`done `为 `true `时可省略

    ```js
    // 封装一个为数组创建迭代器的函数
    function createArrayIterator(arr) {
        let index = 0
        return {
            next: function() {
                if (index < arr.length) {
                    return { done: false, value: arr[index++] }
                } else {
                    return { done: true }
                }
            }
        }
    }
    ```


- **可迭代对象 **

  - 和迭代器不是一个概念

  - 当一个对象实现了`iterable protocol`协议时，它就是一个可迭代对象；

  - 这个对象的要求是必须实现 `@@iterator`方法，在代码中我们使用 `Symbol.iterator `访问该属性

  - 转成这样的好处

    - 当一个对象变成一个可迭代对象的时候，就可以进行某些迭代操作
    - 比如 `for...of` 操作时，其实就会调用它的` @@iterator` 方法

  - 实现可迭代协议的原生对象

    - `String`、`Array`、`Map`、`Set`、`arguments`对象、`NodeList`集合...

  - 可迭代对象的应用

    - JavaScript中语法：`for ...of`、展开语法（`spread syntax`）、`yield*`、解构赋值（`Destructuring_assignment`）
    - 创建一些对象时：`new Map([Iterable])、new WeakMap([iterable])、new
      Set([iterable])、new WeakSet([iterable])`
    - 一些方法的调用：`Promise.all(iterable)、Promise.race(iterable)、Array.from(iterable)`

  - 迭代器的中断

    - 比如遍历的过程中通过`break、return、throw`中断了循环操作
    - 比如在解构的时候，没有解构所有的值

  - 自定义类的迭代实现

    ```js
    class Person {
          constructor(name, age, height, friends) {
            this.name = name
    		...
          }
          // 实例方法
          running() {}
    /      [Symbol.iterator]() {
            let index = 0
            const iterator = {
              next: () => {
                if (index < this.friends.length) {
                  return { done: false, value: this.friends[index++] }
                } else {
                  return { done: true }
                }
              }
            }
            return iterator
          }
        }
    ```

## 什么是生成器？生成器和迭代器有什么关系？

- **生成器  (ES6新增)** 

  - 生成器函数也是一个函数，但是和普通的函数有一些区别

    - 首先，生成器函数需要在function的后面加一个符号：*
    - 其次，生成器函数可以通过yield关键字来控制函数的执行流程：
    - 最后，生成器函数的返回值是一个（生成器）
      - 生成器事实上是一种特殊的迭代器

  - 生成器函数

    ```js
    生成器函数: 
    1.function后面会跟上符号: *
    2.代码的执行可以被yield控制
    3.生成器函数默认在执行时, 返回一个生成器对象
        * 要想执行函数内部的代码, 需要生成器对象, 调用它的next操作
        * 当遇到yield时, 就会中断执行
    ```


- 生成器传递参数 -- next函数

  - 调用next函数的时候，可以给它传递参数，那么这个参数会作为上一个yield语句的返回值
  - 也就是说我们是为本次的函数代码块执行提供了一个值

- 生成器提前结束

  - return传值后这个生成器函数就会结束，之后调用next不会继续生成值

- 生成器抛出异常 -- throw函数

  - 抛出异常后我们可以在生成器函数中捕获异常
  - 但是在catch语句中不能继续yield新的值了，但是可以在catch语句外使用yield继续中断函数的执行

- 生成器替代迭代器

  - 使用yield来生产一个可迭代对象
  - 这个时候相当于是一种yield的语法糖，只不过会依次迭代这个可迭代对象，每次迭代其中的一个值

  ```js
  function* createArrayIterator(arr) {
      yield* arr
  }
  ```

- 自定义类迭代 -- 生成器实现

  ```js
  // 以Person为例  添加到实例方法
  *[Symbol.iterator]() {
      yield* this.friends
  }
  ```



## 异步函数和普通函数的区别

- **异步函数**

  - 使用`async`关键字声明的函数

    ```js
    // async function foo() {}

    // const bar = async function() {}

    // const baz = async () => {}

    // class Person {
    //   async running() {}
    // }
    ```

  - 异步函数的执行流程

    - 异步函数的内部代码执行过程和普通的函数是一致的，默认情况下也是会被同步执行
    - 返回值和普通函数的区别
      - 情况一：异步函数也可以有返回值，但是异步函数的返回值相当于被包裹到`Promise.resolve`中
      - 情况二：如果我们的异步函数的返回值是`Promise`，状态由会由`Promise`决定；
      - 情况三：如果我们的异步函数的返回值是一个对象并且实现了`thenable`，那么会由对象的方`then`法来决定
    - 如果在`async`函数中抛出异常
      - 并不会报错, 而是作为`Promise`的`reject`来传递



## 说说线程和进程的区别以及关系

- **进程**

  - 是`cpu`分配资源的最小单位；（是能拥有资源和独立运行的最小单位）
  - 计算机已经运行的程序，是操作系统管理程序的一种方式  (**官方说法**)
  - 可以认为启动一个应用程序，就会默认启动一个进程（也可能是多个进程）**(个人解释)**
  - 也可以说进程是线程的容器

- **线程**

  - 是`cpu`调度的最小单位；（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）
  - 操作系统能够运行运算调度的最小单位，通常情况下它被包含在进程中  **(官方说法)**
  - 每一个进程中，都会启动至少一个线程用来执行程序中的代码，这个线程被称之为主线程

- **操作系统的工作方式**

  - 如何做到同时让多个进程同时工作?
    - 因为`CPU`的运算速度非常快, 可以快速的在多个进程之间迅速的切换
    - 当进程中的线程获取到世间片时, 就可以快速执行我们编写的代码
    - 由于`CPU`执行速度过于变态, 对于用户来说是感受不到这种快速切换的

- **浏览器中`JavaScript`线程**

  - **`JavaScript`为什么是单线程的**

    ```js
    // 这主要和js的用途有关，js是作为浏览器的脚本语言，主要是实现用户与浏览器的交互，以及操作dom;这决定了它只能是单线程，否则会带来很复杂的同步问题。举个例子：如果js被设计了多线程，如果有一个线程要修改一个dom元素，另一个线程要删除这个dom元素，此时浏览器就会一脸茫然，不知所措。所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变
    ```

    - 进程容器是浏览器或者`Node`

  - **浏览器是多进程的?**

    ```js
    //  放在浏览器中，每打开一个tab页面，其实就是新开了一个进程，在这个进程中，还有ui渲染线程，js引擎线程，http请求线程等。所以，浏览器是一个多进程的。为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM.所以，这个新标准并没有改变JavaScript单线程的本质。
    ```

    - 目前多数浏览器都是多进程的,  打开一个`tab`页面就会开启一个新的进程,  防止因为一个页面的卡死导致浏览器的强制退出
    - 每个进程中又有很多的线程，其中包括执行`JavaScript`代码的线程

  - 线程中`JavaScript`代码的执行

    - 它是在一个单独的线程中执行的, 意味着`JavaScript`代码在同一时刻只能做一件事
    - 这**非常耗时**, 意味着当前线程会被阻塞

  - 所以耗时的操作并不是在`JavaScript`线程中执行的

    - 浏览器的每个进程是多线程的，那么其他线程可以来完成这个耗时的操作
    - 比如网络请求、定时器，只需要在特性的时候执行应该有的回调即可





## 说说你对事件队列、微任务、宏任务的理解

- **事件队列**
  - 事件队列是一种数据结构，可以存放要执行的任务。它符合**队列**“**先进先出**”的特点   
- **宏/微任务**
  - 首先它们都是异步任务
  - 宏任务列队
    - 用来保存待执行的宏任务（回调）
    - 如: `pajax、setTimeout、setInterval、DOM`监听、`UI Rendering`等 会被加入到宏列队
  - 微任务列队
    - 用来保存待执行的微任务（回调）
    - 如: `Promise`的`then`回调、 `Mutation Observer API、queueMicrotask()`等 会被加入到微列队
  - `JS`执行时会区别这两个队列
    - `JS`引擎首先必须先执行所有的初始化同步任务代码
    - 每次准备取出第一个宏任务执行前，都要将所有的微任务一个一个取出来执行，
    - 也就是优先级比宏任务高，且与微任务所处的代码位置无关
    - 也就是宏任务执行之前，必须保证微任务队列是空的；
    - 如果不为空，那么就优先执行微任务队列中的任务（回调）


## 正则表达式常见的规则练习

正则: 字符串匹配利器

创建正则

- new RegExp()
- //

使用方法

- 正则实例的方法
  - test 匹配则返回true否则返回false
  - exec 返回一个数组 未找到返回null
- 字符串方法
  - match 返回一个数组 未找到返回null
  - matchAll 返回迭代器 必须有修饰符g
  - search 返回匹配到的位置索引 失败时返回-1
  - replace/replaceAll 替换掉匹配掉的字符串
  - split 使用正则表达式(或固定字符串)分割一个字符串将分割后的字符串存到数组中返回

修饰符

- g (global)
- i (ignore 不分大小写)
- m(多行匹配)

规则

- 字符类
  - /d /D
    - /d => [0-9]
    - /D => [\^0-9]
  - /s /S
    - /s 空格符号 [ ]
    - /S 除/s匹配的值之外 [\^ ]
  - /w /W
    - /w => [a-zA-Z_0-9]
    - /W => [\^a-zA-Z_0-9]
  - .
    - 与除换行符之外的任意字符匹配
- 锚点
  - ^ 开头
  - $ 结尾
  - \b 词边界
- 转义字符串
  - \ 对特殊字符转义(如[] \ ^ $ . ? * + ())
- 集合(Sets) 范围(Ranges)
  - []
  - [2,] 
  - [2,6]
- 量词(Quantifiers)
  - 数量{n}
- 贪婪模式/ 惰性模式
  - 贪婪模式 默认匹配规则会匹配到符合条件的最后一个内容
  - 惰性模式 ? 匹配到第一个符合规则的正则就返回
- 捕获组
  - ()
  - (?:) 希望该)()中的内容去匹配但是不希望括号中的内容出现在结果中时
  - 起别名
    - (?^(别名))
  - | 或
    - (23|45)
- (?)

## LocalStorage和SessionStorage的区别

- LocalStorage提供一种永久性存储的方法 在网页关闭打开时 依然保留
- SessionStorage: 会话存储 再关闭该网页时 存储的内容被清除
- 区别: 
  - localStorage永久性存储 SessionStorage在关闭当前页面时存储的内容就会失效
  - SessionStorage只能被同一个窗口的同源页面共享 localStorage除非手动删除 否则一直存在

##  说说你对防抖、节流的理解，他们的区别，应用场景(面试)

防抖: 将多次执行函数变成最后一次执行 等待固定时间还没有事件触发时执行的函数 

- 应用场景

  - 按钮的点击
  - 屏幕滚动时的复杂计算
  - 输入框输入时进行搜索
  - 用户缩放浏览器的resize事件

- 简单的防抖函数实现

- ```js
  function myDebounce(execFn, delay) {
       let timer = 0
       
       function _debounce(...args) {
         if (timer) clearTimeout(timer)
         timer = setTimeout(() => {
           execFn.apply(this, args)
           timer = null
         }, delay)
       }
   
       return _debounce
  }
  ```

```
  



节流: 按照固定的时间频率(间隔)来执行对应的函数 

- 应用场景:  

  - 监听页面的滚动事件 通过节流来降低事件调用的频率
  - 鼠标移动
  - 用户频繁点击按钮的操作

- 简单实现

- ```js
    function myThrottle(execFn, interval) {
        let initTime = 0
    
        function throttle(...args) {
          let nowTime = Date.now()
          const waitTime = interval - (nowTime - initTime)
          if (waitTime <= 0) {
            execFn.apply(this, args)
            initTime = nowTime
          }
        }
        return throttle
      }
```

##  说说对象的引用赋值、浅拷贝、深拷贝的区别

对象的引用赋值

- 把源对象指向自身所在堆内存空间的指针给了新对象 两个对象所指向的内存空间是一样的 修改其中一个的值 另一个也会发生改变

对象的浅拷贝

- 可以通过{...obj}的方式进行对象的浅拷贝 (Object.assign({},obj))
- 对于obj中的值是原始数据类型的 将对应的值赋值给了newObj中对应的属性
- 对于obj中是复杂数据类型的值 把对应在内存中的指针赋值给了newObj中对应的key 对于复杂数据类型的value修改其中一个另一个也发生改变

对象的深拷贝(真实开发中使用非常少)

- newObj与obj中的属性值一样 但是是一个全新的对象 与元对象没有任何关系

- 默认情况下 js没有提供对应的深拷贝的方式 因为深拷贝是非常消耗内存的

- 有对应的库实现了深拷贝

- 实现深拷贝

  - JSON.parse(JSON.stringfy(obj))

    - 缺点: 对于某些属性如 undefined,Symbol,function,Symbol 会自动忽略; 对于set map 会转成对象

  - 自己实现(不带循环引用)

    - ```js
      function isObject(obj) {
           return obj !== null && (typeof obj === "object" || typeof obj === "function")
         }
       
         function deepClone(originValue) {
           // Symbol类型
           if (typeof originValue === "symbol") {
             return Symbol(originValue.description)
           }
       
           // 判断是否是对象
           if (!isObject(originValue)) return originValue;
       
           // set类型
           if (originValue instanceof Set) {
             const newSet = new Set()
             for (const setItem of originValue) {
               newSet.add(deepClone(setItem))
             }
             return newSet
           }
       
           // 判断是函数
           if (typeof originValue === "function") {
             return originValue
           }
       
           // 判断返回值是数组还是对象
           const newObj = Array.isArray(originValue) ? [] : {}
           if (Reflect) {
             for (let key of Reflect.ownKeys(originValue)) {
               {
                 let value = originValue[key]
                 // 让 SymbolKey的值不同
                 if (typeof key === "symbol") {
                   const newSymbolKey = Symbol(key.description)
                   // 将原来的值赋值给新生成的Symbol key
                   value = originValue[key]
                   key = newSymbolKey
                 }
                 newObj[key] = deepClone(value)
               }
             }
           } else {
             for (const key in originValue) {
               const value = originValue[key]
               newObj[key] = deepClone(value)
             }
       
             // 对于Symbol类型的key forin 无法便利出来
             const symbolKeys = Object.getOwnPropertySymbols(originValue)
              for (const symbolKey in symbolKeys) {
              const originSymbolValue = symbolKeys[symbolKey]
              const newSymbol = Symbol(originSymbolValue.description)
              newObj[newSymbol] = deepClone(originValue[originSymbolValue])
            }
          }
              return newObj
              }
      ```

  - 循环引用

    - ```js
          function isObject(obj) {
            return obj !== null && (typeof obj === "object" || typeof obj === "function")
          }

          function deepClone(originValue, map = new WeakMap()) {
            // Symbol类型
            if (typeof originValue === "symbol") {
              return Symbol(originValue.description)
            }

            // 判断是否是对象
            if (!isObject(originValue)) return originValue;

            if (map.has(originValue)) {
              return map.get(originValue)
            }
            // set类型
            if (originValue instanceof Set) {
              const newSet = new Set()
              for (const setItem of originValue) {
                newSet.add(deepClone(setItem, map))
              }
              return newSet
            }

            // 判断是函数
            if (typeof originValue === "function") {
              return originValue
            }

            // 判断返回值是数组还是对象
            const newObj = Array.isArray(originValue) ? [] : {}
            map.set(originValue, newObj)
            if (Reflect) {
              for (let key of Reflect.ownKeys(originValue)) {
                {
                  let value = originValue[key]
                  // 让 SymbolKey的值不同
                  if (typeof key === "symbol") {
                    const newSymbolKey = Symbol(key.description)
                    // 将原来的值赋值给新生成的Symbol key
                    value = originValue[key]
                    key = newSymbolKey
                  }
                  newObj[key] = deepClone(value, map)
                }
              }
            } else {
              for (const key in originValue) {
                const value = originValue[key]
                newObj[key] = deepClone(value, map)
              }

              // 对于Symbol类型的key forin 无法便利出来
              const symbolKeys = Object.getOwnPropertySymbols(originValue)
      ```


              for (const symbolKey in symbolKeys) {
                const originSymbolValue = symbolKeys[symbolKey]
                const newSymbol = Symbol(originSymbolValue.description)
                newObj[newSymbol] = deepClone(originValue[originSymbolValue], map)
              }
            }
    
    
    
            return newObj
          }
      ```
    
    - ​

## 事件总线的基本实现和使用(重点)
## 事件总线的基本实现和使用(重点)
##  事件总线的基本实现和使用(重点)

```js
class myEventBus {
  constructor() {
    this.eventBus = {};
  }

  on(eventName, eventFn) {
    let eventSet = this.eventBus[eventName];
    if (!eventSet) {
      eventSet = new Set();
      this.eventBus[eventName] = eventSet;
    }
    this.eventBus[eventName].add(eventFn);
  }

  off(eventName, eventFn) {
    if (!this.eventBus[eventName]) {
      return;
    }
    const eventSet = this.eventBus[eventName];
    if (eventSet.has(eventFn)) this.eventBus[eventName].delete(eventFn);

    // 如果删除函数后 该事件对应的set为空 则删除该事件
    if (!this.eventBus[eventName].size) {
      delete this.eventBus[eventName];
    }
  }

  emit(eventName, ...payload) {
    if (!this.eventBus[eventName]) {
      return;
    }
    for (const item of this.eventBus[eventName]) {
      item(...payload);
    }
  }
}

const mitt = new myEventBus();
mitt.on("wmm", () => {
  console.log("123");
});
const fn = () => {
  console.log("456");
};
mitt.on("wmm", fn);
mitt.on("wmm", () => {
  console.log("789");
});

setTimeout(() => {
  // 移除事件
  mitt.off("wmm", fn);
}, 1000);
setTimeout(() => {
  mitt.emit("wmm");
}, 2000);
// 123
// 789

```

# 网络请求

## 说说服务端渲染和前后端分离的区别

SSR(server side rendering) 服务端渲染

- 优点: 
  - 更快的响应时间 不用等待所有的js加载完成 也能显示比较完整的页面
  - 更好的SEO 可以将SEO的关键信息直接在后台渲染成html 保证了搜索引擎能爬取到关键数据
  - 无需占用客户端资源 解析模板交给后端工作 对于客户端的资源占用更少
- 缺点
  - 占用服务器资源 一个小小的页面的改动 都需要请求一次完整的html页面 有悖于程序员的=="DRY(Don`t repeat yourself)"==原则 如果短时间访问过多 对服务器造成一定的访问压力
  - ​
  - 一些常见的api需要先对运行环境判断再使用

前后端分离

- 优点: 
  - 前端专注于ui界面的开发 后端专注于api的开发 单一
  - 体验更好 
- 缺点: 
  - 第一次响应内容较慢 不如服务端渲染快
  - 不利于SEO优化 只是记录一个页面 对于SEO较差

## 说说你对HTTP协议的理解

http

- HyperText Transfer Protocol 超文本传输协议
- 超文本传输协议是一种用于分布式协作式的应用层协议
- 定义了客户端和服务器之间交换报文的格式和方式 默认为80端口
- 使用tcp作为传输层协议 保证了数据的可靠性

组成:`一个HTTP请求主要包括: 请求和响应`

- 请求

  - 主要包含: 请求行 请求头 请求体

  - 请求行:

    - 请求方法字段

    - URL字段

    - HTTP协议版本字段

    - ```js
      GET/index.html HTTP/1.1
      ```

  - 请求头:

    - 键值对组成
    - User-Agent: 对应展示的浏览器的类型
    - Content-type: 对应的请求内容的数据类型
      - application/x-www-form-urlencoded 数据以&分割 的键值对 键值对用=分割
      - application/json json类型
      - application/xml xml类型
      - text/plain 文本类型
      - multipart/form-data 表示上传文件
    - keep-alive

  - 请求体: get/post所带的内容

- 响应

  - 响应行

    - 由协议版本 状态码 状态码的原因短语组成

    - ```js
      HTTP/1.1 200 OK
      ```

  - 响应头

  - 响应体

请求方法

- get 向服务器获取数据
- post 将响应实体交给指定的资源
- head 请求一个与get请求响应相同的响应 没有实体
- put 上传文件 用于替换目标资源的所有
- patch 用于对资源的部分修改
- delete 删除指定的资源
- connect: 建立一个到目标资源标识的服务器的隧道 通常用于代理服务器
- track: 回显服务器收到的请求 主要用于测试和诊断

响应状态码

- 200 表示请求被服务器端正常处理
- 201 post请求 创建新的资源
- 301 永久重定向 表示资源被分配了新的URI 并返回该URI
- 4xx 表示客户端发生错误
  - 400 请求报文存在语法错误
  - 401 未授权的错误 必须携带身份信息
  - 403 没有权限访问
  - 404 服务器找不到请求资源
- 5xx 服务器错误
  - 500 
  - 503 服务器不可用 处于维护或重载状态





## 封装XMLHttpRequest网络请求

```js
function myAjax(url, {
      method = "GET",
      headers = {},
      timeout = 5000,
      data
    } = {}) {
      const xhr = new XMLHttpRequest()
      const promise = new Promise(function (resolve, reject) {
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({ status: xhr.status, data: xhr.response })
          } else {
            reject({ status: xhr.status, message: xhr.statusText })
          }
        }
        xhr.responseType = "json"
        xhr.timeout = timeout

        if (method.toUpperCase() === "GET") {
          if (Object.keys(data).length > 0) {
            const arr = []
            for (const key in data) {
              const value = data[key]
              arr.push(`${key}=${value}`)
            }
            url = url + "?" + arr.join("&")
          }
          xhr.open(method, url)
          if (Object.keys(headers).length > 0) {
            Object.keys(headers).forEach(key => {
              xhr.setRequestHeader(key, headers[key])
            })
          }
          xhr.send()
        } else {
          xhr.open(method, url)
          xhr.setRequestHeader("Content-Type", "application/json")
          if (Object.keys(headers).length > 0) {
            Object.keys(headers).forEach(key => {
              xhr.setRequestHeader(key, headers[key])
            })
          }

          xhr.send(JSON.stringify(data))
        }

      })
      promise.xhr = xhr
      return promise
    }

    // get
    myAjax("http://123.207.32.32:1888/02_param/get", {
      data: {
        name: "wmm",
        age: 18
      }
    }).then(res => {
      console.log(res);
    })
```



## 说说XMLHttpRequest和Fetch请求的异同

Fecth提供了一种更加现代的处理方案

- 比如返回一个值是`Promise` 
  - 在请求成功时调用resolve回调
- 与XMLHttpRequest不同 不用把所有操作放在同一个对象上
- 语法简单 更加语义化
- 基于标准的promise实现 支持async/await
- 更加底层

Fetch缺点

- 不支持abort(超时取消请求) 不支持超时控制 
- 没有办法检测请求进度 XHR可以
- 默认不会携带cookie

ajax缺点

- 使用起来比较繁琐


























































































































































































































































































