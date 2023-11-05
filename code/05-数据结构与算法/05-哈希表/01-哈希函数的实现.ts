function hashFunc(str: string, max: number) {
  //1.初始化hashcode
  let hashCode = 0;
  //霍纳计算，计算hashCode的值
  for (let i = 0; i < str.length; i++) {
    hashCode = 31 * hashCode + str.charCodeAt(i);
  }
  //通过取模计算索引值
  let index = hashCode % max;
  return index;
}

console.log(hashFunc("abc", 7));
console.log(hashFunc("kkk", 7));
console.log(hashFunc("nba", 7));

export default hashFunc;
