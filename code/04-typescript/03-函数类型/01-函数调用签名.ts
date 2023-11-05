
interface Ibar {
  name: string,
  age: number,
  (num: number): number
}

const bar: Ibar = (num): number => {

  const name = "kobe"
  const age = 20
  return age
}

bar.name = "aa"
bar.age = 20
bar(20)