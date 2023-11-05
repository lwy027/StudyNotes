

// import { lll as name, age, foo } from './foo.js'
// console.log(name, age, foo())
//给整个导出模块起别名放在一个对象中，可以访问到模块中的属性
import * as foo from './foo.js'
console.log(import.meta)
console.log(foo.name)
console.log(foo.age)
console.log(foo.foo())