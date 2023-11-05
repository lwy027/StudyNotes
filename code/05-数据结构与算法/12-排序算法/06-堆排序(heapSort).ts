//核心思路:创建一个最大堆，是最大值永远都是第一个元素
//把最大值放在最后，然后在对堆进行下滤操作，变成一个最大推，

import { cbtPrint, swap, testSort } from "hy-algokit";

//在取出最大值，重复上面操作
function heapSort(arr: number[]): number[] {
  const n = arr.length;
  //原地建堆操作，拿到当前数组，非叶子节点的下标
  const start = Math.floor(n / 2 - 1);
  for (let i = start; i >= 0; i--) {
    //对非叶子节点进行下滤操作
    heapity_Down(arr, n, i);
  }
  //把最大堆的最大值，与最后一位交换位置，在重新进行下滤操作重新建堆
  for (let i = n - 1; i > 0; i--) {
    swap(arr, 0, i);
    //对0位置重新进行下滤操作
    heapity_Down(arr, i, 0);
  }

  return arr;
}

/**
 *
 * @param arr 操作的数组
 * @param n   //数组的下表
 * @param i   对哪个非叶子节点进行下滤操作
 */
function heapity_Down(arr: number[], n: number, index: number) {
  //小于数组的长度说明，还没有遍历到最后 ， 这里2*index+1是左节点
  while (2 * index + 1 < n) {
    //非叶子节点的左右2个子节点
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;

    //记录最大的那一个节点
    let larageIndex = leftChildIndex;
    if (rightChildIndex < n && arr[rightChildIndex] > arr[leftChildIndex]) {
      larageIndex = rightChildIndex;
    }

    //对非叶子节点和它2个子节点值进行判断，如果 >子节点 break ,否则与大的那个子节点进行交换位置
    if (arr[index] >= arr[larageIndex]) {
      break;
    }

    swap(arr, index, larageIndex);
    //对index进行重新赋值，进行下一次循环
    index = larageIndex;
  }
}
testSort(heapSort);
