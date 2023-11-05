


// type WyPick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }
// interface IPerson {
//   name: string
//   age: number
//   height: number
// }

// type IKun = Pick<IPerson, "name" | "age">

// //如果每次都如ick可能类型太多了
// //本质
// type WyOmit<T, K> = {
//   [P in keyof T as P extends K ? never : P]: T[P]
// }
// interface IPerson {
//   name: string
//   age: number
//   height: number
// }
// //少了hright
// type IKun = Omit<IPerson, "height">

// type WyExclude<T, U> = T extends U ? never : T
// type HYOmit<T, K> = Pick<T, WyExclude<keyof T, K>>

// type PropertyTypes = "name" | "age" | "height"
// //把height给排除了
// type PropertyTypes2 = WyExclude<PropertyTypes, "height">

// type WyExtract<T, U> = T extends U ? T : never
// type PropertyTypes = "name" | "age" | "height"
// //获取"name|"age
// type PropertyTypes2 = WyExtract<PropertyTypes, "name" | "age">

//本质
type WyNonNullable<T> = T extends undefined | null ? never : T
type unionType = string | number | undefined | null
type unionType2 = WyNonNullable<unionType>





export { }



