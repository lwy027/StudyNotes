

//1.数组类型

const arr: any[string | number] = ["lwy", 18, 1.88]
//不可以读取到具体的数据类型
const value = arr[2]

//2.元组
//可以读取到具体的数据类型
const tuple: [string, number] = ["元组", 1111]

const valueTu = tuple[1]
const valueTu1 = tuple[0]



export { }