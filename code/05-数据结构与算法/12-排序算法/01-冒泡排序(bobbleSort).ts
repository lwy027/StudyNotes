//核心思路：相邻的两个数进行比较，大的数放在最后，一直进行查找，直到最后

import { swap } from "hy-algokit";
import { testSort } from "./00-utils";

function bubbleSort(arr: number[]): number[] {
  //记录数组长度
  const n = arr.length;
  //优化
  let isBreak = false;

  //外层循环，内层循环只是把一个最大数放在最后面，所以需要外层循环，持续从头比较，
  for (let i = 0; i < n; i++) {
    //内层循环，对相邻2数进行比较，大的排后面
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        isBreak = true;
      }
    }
    //如果为false就不进行操作，说明了一直都是前一个数字比后一个小
    if (!isBreak) break;
  }

  return arr;
}

testSort(bubbleSort);
