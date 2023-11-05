function maxprofit(prices: number[]): number {
  const n = prices.length;
  if (n < 2) return 0;
  //初始化值
  let preValue = 0;
  //前面的最小值
  let minValue = prices[0];
  for (let i = 1; i < n; i++) {
    //比较昨天的最大利润和今天卖出的最大利润
    preValue = Math.max(preValue, prices[i] - minValue);
    minValue = Math.min(minValue, prices[i]);
  }

  return preValue;
}

console.log(maxprofit([7, 1, 5, 3, 6, 0, 4]));
export {};
