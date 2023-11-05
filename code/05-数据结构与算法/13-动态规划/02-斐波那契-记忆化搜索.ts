function feib(n: number, memo: number[] = []): number {
  if (n <= 1) return n;

  //如果存在，则返回，减少次数
  if (memo[n]) {
    return memo[n];
  }
  const res = feib(n - 1, memo) + feib(n - 2, memo);
  memo[n] = res;
  return res;
}
console.log(feib(10));
console.log(feib(50));
export {};
