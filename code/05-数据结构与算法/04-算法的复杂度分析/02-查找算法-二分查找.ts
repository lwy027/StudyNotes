function binarySearch(arr: number[], num: number) {
  //记录左右的位置
  let left = 0;
  let right = arr.length - 1;
  //只有当left的位置<=right时才会停止循环，因为
  while (left <= right) {
    //第一次去中间
    let mid = Math.floor((left + right) / 2);
    //中间值
    const midNum = arr[mid];
    //相等直接返回
    if (midNum === num) {
      return mid;
    } else if (midNum < num) {
      //中间值 < num 说明目标值在中间值的右边
      //所以改变left的值，并且中间值+1重新获取中间值
      left = mid + 1;
    } else {
      //中间值<num 说明目标值在中间值的左边
      //所以改变right的值，并且中间值-1重新获取中间值
      right = mid - 1;
    }
  }
}

const result = binarySearch([1, 2, 3, 55, 99, 111, 222, 333, 444, 555], 1);

console.log(result);

export {};
