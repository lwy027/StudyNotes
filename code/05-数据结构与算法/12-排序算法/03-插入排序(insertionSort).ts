import { testSort } from "hy-algokit";
//核心思路:先把第一个元素看成是有序的，把后的元素与前面元素进行比较
//如果前面元素大于后面，则把后面的元素插入到前面
function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    //newNum为第一个元素后面的元素，用于与前面的元素进行比较
    let newNum = arr[i];
    //j为第一个元素，把他看成是有序的数组
    let j = i - 1;
    //当第一个元素大于后面的元素时，进行循环
    while (arr[j] > newNum && j >= 0) {
      //把大的元素，赋值给后面的元素，进行换位操作，大的元素会一直往后移
      arr[j + 1] = arr[j];
      j--;
    }
    //这里的j === - 1 或者是前面没有比它大的元素下标，所以要+1往后面一位进行插入操作
    arr[j + 1] = newNum;
  }

  return arr;
}

testSort(insertionSort);
