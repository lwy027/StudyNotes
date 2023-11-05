
//这里把传入的联合类型，给分发了，变成 string[]|number[]类型
//如果没有分发它是sting|number[]类型
type toArray<T> = T extends any ? T[] : never

type arr1 = toArray<number>
type arr2 = toArray<string | number>

