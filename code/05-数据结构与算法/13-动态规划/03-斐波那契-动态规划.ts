function feib(n: number): number {
  //1.定义状态
  const memo: number[] = [];
  //3.初始化值
  memo[0] = 0;
  memo[1] = 1;

  //2.确定状态转移方程
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  //4.计算问题解
  return memo[n];
}
console.log(feib(10));
console.log(feib(50));
export {};
