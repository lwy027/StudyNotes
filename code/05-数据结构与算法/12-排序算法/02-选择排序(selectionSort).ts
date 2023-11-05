import { swap } from "hy-algokit";
import { testSort } from "./00-utils";

//核心思路：寻找当前数组中的最小值，把最小值与当前比较的位置进行交换进行排序，开始从第一个进行比较
function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  //外层循环，决定经过多少轮找到最小值
  for (let i = 0; i < n - 1; i++) {
    //默认第一位
    let minIndex = i;
    //内层循环，找到最小值的下标赋值给minIndex
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    //进行交换
    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }

  return arr;
}

testSort(selectionSort);
