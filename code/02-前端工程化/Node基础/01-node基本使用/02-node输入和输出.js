



const num1 = 100
const num2 = 200
console.log(num1 + num2)
//内置对象process,在内置对象中有个argv属性，可以获取参数 
//输入参数： node 02-node输入和输出.js 20 30  后面2位是参数，以空格隔开
const argv1 = process.argv[2]
const argv2 = process.argv[3]


// console.log(process)
console.log(process.argv)
console.log(argv1, argv2)