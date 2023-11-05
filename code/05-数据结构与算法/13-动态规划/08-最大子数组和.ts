function maxSum(arr: number[]): number {
  const n = arr.length;
  //记录与前一个值或者子数组比较的最大值
  let preValue = arr[0];

  //记录最大值
  let max = preValue;
  for (let i = 1; i < n; i++) {
    //数组中的值，与前一个值相加比较，获取最大值
    preValue = Math.max(arr[i], arr[i] + preValue);
    //当前的值和前一个值做比较
    max = Math.max(max, preValue);
  }

  return max;
}
console.log(maxSum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
export {};
